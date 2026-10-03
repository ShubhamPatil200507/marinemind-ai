# backend/services/imd_service.py
"""
Official India Meteorological Department (IMD) Marine Bulletin & Alert Service.

Dual-Mode Architecture:
1. Mode A: Direct REST calls to https://api.imd.gov.in/api/v1/ with x-api-key header
   (when IMD_API_KEY environment variable is configured).
2. Mode B: Real-time official coastal bulletin parser directly from IMD's official
   marine forecast portal: https://mausam.imd.gov.in/Forecast/coastal_bulletin_new.php?id={sector_id}
   (publicly accessible without an API key, providing genuine Government of India
   synoptic situations, wind direction/knots/gusts, sea conditions, port signals, and tidal warnings).

Covers all 7 Indian Coastal Marine Sectors:
- Sector 1: West Bengal & North Bay of Bengal (ACWC Kolkata)
- Sector 2: Kerala, Karnataka & Lakshadweep (CWC Thiruvananthapuram)
- Sector 3: Gujarat & North Arabian Sea (MC Ahmedabad)
- Sector 4: Maharashtra & Goa (ACWC Mumbai)
- Sector 5: Odisha Coast (CWC Bhubaneswar)
- Sector 6: Tamil Nadu & Puducherry Coast (ACWC Chennai)
- Sector 7: Andhra Pradesh Coast (CWC Visakhapatnam)
"""

import os
import time
import math
import logging
from typing import Dict, Any, List, Optional, Tuple
import httpx
from bs4 import BeautifulSoup

from backend.models.schemas import CycloneStatus, DataProvenance, DataStatus

logger = logging.getLogger(__name__)

# Config
IMD_API_KEY = os.environ.get("IMD_API_KEY", "").strip()
IMD_API_BASE = "https://api.imd.gov.in/api/v1"
MAUSAM_COASTAL_URL = "https://mausam.imd.gov.in/Forecast/coastal_bulletin_new.php"
CACHE_TTL_SECONDS = 900.0  # 15-minute cache

# In-memory cache: sector_id -> (timestamp, data_dict)
_BULLETIN_CACHE: Dict[int, Tuple[float, Dict[str, Any]]] = {}

# Sector Definitions & Spatial Centers
SECTORS: Dict[int, Dict[str, Any]] = {
    1: {
        "name": "West Bengal Coast",
        "office": "Area Cyclone Warning Centre (ACWC), Kolkata",
        "center": (21.6, 88.0),
        "states": ["West Bengal", "Andaman & Nicobar Islands"]
    },
    2: {
        "name": "Kerala & Karnataka Coast",
        "office": "Cyclone Warning Centre (CWC), Thiruvananthapuram",
        "center": (10.5, 75.8),
        "states": ["Kerala", "Karnataka", "Lakshadweep"]
    },
    3: {
        "name": "Gujarat Coast",
        "office": "Meteorological Centre (MC), Ahmedabad",
        "center": (21.5, 70.0),
        "states": ["Gujarat", "Daman & Diu"]
    },
    4: {
        "name": "Maharashtra & Goa Coast",
        "office": "Area Cyclone Warning Centre (ACWC), Mumbai",
        "center": (18.0, 72.8),
        "states": ["Maharashtra", "Goa"]
    },
    5: {
        "name": "Odisha Coast",
        "office": "Cyclone Warning Centre (CWC), Bhubaneswar",
        "center": (20.0, 86.0),
        "states": ["Odisha"]
    },
    6: {
        "name": "Tamil Nadu & Puducherry Coast",
        "office": "Area Cyclone Warning Centre (ACWC), Chennai",
        "center": (10.8, 79.8),
        "states": ["Tamil Nadu", "Puducherry"]
    },
    7: {
        "name": "Andhra Pradesh Coast",
        "office": "Cyclone Warning Centre (CWC), Visakhapatnam",
        "center": (16.5, 82.2),
        "states": ["Andhra Pradesh"]
    }
}


def resolve_coastal_sector(lat: float, lon: float) -> int:
    """
    Resolves the closest official IMD coastal bulletin sector (1-7)
    for a given geographical coordinate along India's coastline.
    """
    # 1. Geographic bounding boxes
    if lat >= 20.5 and lon >= 86.8:
        return 1  # West Bengal / North Bay
    if 18.2 <= lat < 21.5 and lon >= 83.5:
        return 5  # Odisha
    if 13.5 <= lat < 18.2 and lon >= 79.8:
        return 7  # Andhra Pradesh
    if 7.5 <= lat < 13.5 and lon >= 77.5:
        return 6  # Tamil Nadu / Puducherry
    if 7.5 <= lat < 15.0 and lon < 77.5:
        return 2  # Kerala / Karnataka / Lakshadweep
    if 15.0 <= lat < 20.2 and lon < 74.5:
        return 4  # Maharashtra & Goa
    if lat >= 20.2 and lon < 73.5:
        return 3  # Gujarat

    # 2. Fallback: Minimum Euclidean distance to sector centers
    best_sector = 4
    min_dist = float("inf")
    for s_id, s_info in SECTORS.items():
        c_lat, c_lon = s_info["center"]
        d = math.hypot(lat - c_lat, lon - c_lon)
        if d < min_dist:
            min_dist = d
            best_sector = s_id
    return best_sector


def _derive_cyclone_status(synoptic: str, port_signal: str) -> CycloneStatus:
    """
    Evaluates authentic IMD bulletin text to determine official cyclone alert status.
    """
    syn_upper = synoptic.upper()
    sig_upper = port_signal.upper()

    if any(k in syn_upper for k in ["CYCLONIC STORM", "SUPER CYCLONE", "VERY SEVERE CYCLONE", "EXTREMELY SEVERE"]):
        return CycloneStatus.ACTIVE_CYCLONE

    if any(k in sig_upper for k in ["SIGNAL NUMBER VII", "SIGNAL NUMBER VIII", "SIGNAL NUMBER IX", "SIGNAL NUMBER X", "GREAT DANGER"]):
        return CycloneStatus.ACTIVE_CYCLONE

    if any(k in syn_upper for k in ["DEEP DEPRESSION", "CYCLONE WARNING"]):
        return CycloneStatus.WARNING

    if any(k in sig_upper for k in ["SIGNAL NUMBER IV", "SIGNAL NUMBER V", "SIGNAL NUMBER VI", "DANGER SIGNAL"]):
        return CycloneStatus.WARNING

    if any(k in syn_upper for k in ["CYCLONIC CIRCULATION", "DEPRESSION", "LOW PRESSURE AREA"]):
        return CycloneStatus.WATCH

    if any(k in sig_upper for k in ["SIGNAL NUMBER III", "SIGNAL NO. 3", "LOCAL CAUTIONARY", "SIGNAL NUMBER I", "SIGNAL NUMBER II"]):
        return CycloneStatus.WATCH

    return CycloneStatus.NO_ACTIVE_ALERT


def _parse_html_bulletin(html_content: str, sector_id: int) -> Dict[str, Any]:
    """
    Parses tables from https://mausam.imd.gov.in/Forecast/coastal_bulletin_new.php.
    """
    soup = BeautifulSoup(html_content, "html.parser")
    meta = SECTORS.get(sector_id, SECTORS[4])

    bulletin: Dict[str, Any] = {
        "sector_id": sector_id,
        "sector_name": meta["name"],
        "issuing_office": meta["office"],
        "synoptic_situation": "NIL",
        "time_of_issue": "",
        "sub_sectors": [],
        "primary_wind": "Light to Moderate",
        "primary_sea": "Smooth to Slight",
        "primary_port_signal": "NIL AT ALL PORTS",
        "storm_surge_warning": "NIL",
        "cyclone_status": CycloneStatus.NO_ACTIVE_ALERT,
        "is_live": True,
        "source_url": f"{MAUSAM_COASTAL_URL}?id={sector_id}"
    }

    tables = soup.find_all("table")
    for table in tables:
        rows = table.find_all("tr")
        row_dict: Dict[str, str] = {}
        for row in rows:
            cols = [c.get_text(strip=True) for c in row.find_all(["td", "th"])]
            if len(cols) == 2:
                key, val = cols[0].strip().lower(), cols[1].strip()
                row_dict[key] = val
            elif len(cols) == 1 and "synoptic" in cols[0].lower():
                pass

        for k, v in row_dict.items():
            if "synoptic" in k and v:
                bulletin["synoptic_situation"] = v
            if ("time of issue" in k or "date" in k) and v:
                bulletin["time_of_issue"] = v

        if "wind" in row_dict or "sea condition" in row_dict or "port signal" in row_dict:
            bulletin["sub_sectors"].append({
                "wind": row_dict.get("wind", "N/A"),
                "weather": row_dict.get("weather", "N/A"),
                "visibility": row_dict.get("visibility", "N/A"),
                "sea_condition": row_dict.get("sea condition", "N/A"),
                "port_signal": row_dict.get("port signal", "NIL AT ALL PORTS"),
                "storm_surge": row_dict.get("storm surge/tidal warning", "NIL")
            })

    # Consolidate primary fields from sub-sectors
    if bulletin["sub_sectors"]:
        first = bulletin["sub_sectors"][0]
        bulletin["primary_wind"] = first.get("wind", "Light to Moderate")
        bulletin["primary_sea"] = first.get("sea_condition", "Smooth to Slight")
        bulletin["primary_port_signal"] = first.get("port_signal", "NIL AT ALL PORTS")
        bulletin["storm_surge_warning"] = first.get("storm_surge", "NIL")

        # If any subsector has an active warning signal, escalate
        for sub in bulletin["sub_sectors"]:
            sig = sub.get("port_signal", "")
            if sig and "NIL" not in sig.upper():
                bulletin["primary_port_signal"] = sig
            surge = sub.get("storm_surge", "")
            if surge and "NIL" not in surge.upper():
                bulletin["storm_surge_warning"] = surge

    bulletin["cyclone_status"] = _derive_cyclone_status(
        bulletin["synoptic_situation"],
        bulletin["primary_port_signal"]
    )

    return bulletin


def get_coastal_bulletin(lat: float, lon: float) -> Dict[str, Any]:
    """
    Fetches real-time official IMD Coastal Bulletin for the sector covering (lat, lon).
    Uses caching (15-min TTL) to avoid hammering IMD servers.
    Falls back gracefully if IMD servers are momentarily unreachable.
    """
    sector_id = resolve_coastal_sector(lat, lon)
    now = time.time()

    # Check cache
    if sector_id in _BULLETIN_CACHE:
        cached_time, cached_data = _BULLETIN_CACHE[sector_id]
        if (now - cached_time) < CACHE_TTL_SECONDS:
            return cached_data

    # Mode A: If IMD_API_KEY is configured, try the official REST API first
    if IMD_API_KEY:
        try:
            with httpx.Client(timeout=6.0) as client:
                res = client.get(
                    f"{IMD_API_BASE}/coastalbulletin",
                    headers={"x-api-key": IMD_API_KEY, "User-Agent": "MarineMind-AI/1.0"}
                )
                if res.status_code == 200:
                    api_json = res.json()
                    # If valid JSON returned, parse REST response
                    meta = SECTORS.get(sector_id, SECTORS[4])
                    bulletin = {
                        "sector_id": sector_id,
                        "sector_name": meta["name"],
                        "issuing_office": meta["office"],
                        "synoptic_situation": str(api_json.get("synoptic", "NIL")),
                        "time_of_issue": str(api_json.get("date", "")),
                        "sub_sectors": [],
                        "primary_wind": str(api_json.get("wind", "Moderate")),
                        "primary_sea": str(api_json.get("sea_condition", "Slight to Moderate")),
                        "primary_port_signal": str(api_json.get("port_signal", "NIL AT ALL PORTS")),
                        "storm_surge_warning": "NIL",
                        "cyclone_status": CycloneStatus.NO_ACTIVE_ALERT,
                        "is_live": True,
                        "source_url": f"{IMD_API_BASE}/coastalbulletin"
                    }
                    _BULLETIN_CACHE[sector_id] = (now, bulletin)
                    return bulletin
        except Exception as e:
            logger.warning(f"[IMDService] REST API call failed, falling back to public bulletin portal: {e}")

    # Mode B: Live public coastal bulletin portal
    try:
        url = f"{MAUSAM_COASTAL_URL}?id={sector_id}"
        with httpx.Client(timeout=8.0, follow_redirects=True) as client:
            resp = client.get(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) MarineMind/1.0"})
            if resp.status_code == 200:
                bulletin = _parse_html_bulletin(resp.text, sector_id)
                _BULLETIN_CACHE[sector_id] = (now, bulletin)
                return bulletin
            else:
                logger.warning(f"[IMDService] Public bulletin returned status {resp.status_code}")
    except Exception as e:
        logger.error(f"[IMDService] Failed to fetch IMD coastal bulletin for sector {sector_id}: {e}")

    # Fallback when network is offline
    meta = SECTORS.get(sector_id, SECTORS[4])
    fallback = {
        "sector_id": sector_id,
        "sector_name": meta["name"],
        "issuing_office": meta["office"],
        "synoptic_situation": "IMD Portal momentarily unreachable. Verify at mausam.imd.gov.in.",
        "time_of_issue": "Offline Baseline",
        "sub_sectors": [],
        "primary_wind": "Seasonal coastal winds",
        "primary_sea": "Moderate",
        "primary_port_signal": "CHECK LOCAL PORT AUTHORITY",
        "storm_surge_warning": "NIL",
        "cyclone_status": CycloneStatus.UNKNOWN,
        "is_live": False,
        "source_url": f"{MAUSAM_COASTAL_URL}?id={sector_id}"
    }
    return fallback


def get_active_imd_alerts(lat: Optional[float] = None, lon: Optional[float] = None) -> List[Dict[str, Any]]:
    """
    Generates genuine official Government Advisories directly from IMD bulletins
    for the specified vessel location or coastal sectors.
    """
    alerts: List[Dict[str, Any]] = []

    target_sectors = [resolve_coastal_sector(lat, lon)] if (lat is not None and lon is not None) else [4, 6, 2, 3]

    for s_id in target_sectors:
        c_lat, c_lon = SECTORS[s_id]["center"]
        bulletin = get_coastal_bulletin(c_lat, c_lon)
        s_name = bulletin["sector_name"]
        office = bulletin["issuing_office"]
        time_str = bulletin.get("time_of_issue") or "Current IMD Cycle"

        # 1. Port Signal Warning (Critical for fishermen)
        port_sig = bulletin.get("primary_port_signal", "NIL")
        if port_sig and "NIL" not in port_sig.upper() and "CHECK" not in port_sig.upper():
            is_critical = any(k in port_sig.upper() for k in ["IV", "V", "VI", "VII", "VIII", "IX", "X", "DANGER"])
            alerts.append({
                "id": f"ADV-IMD-PORT-{s_id}",
                "advisory_type": f"IMD Port Warning: {port_sig}",
                "severity": "CRITICAL" if is_critical else "WARNING",
                "region_name": s_name,
                "latitude": c_lat,
                "longitude": c_lon,
                "radius_km": 50.0,
                "description": (
                    f"Official IMD Warning ({office}): {port_sig}. "
                    f"Sea: {bulletin.get('primary_sea')}. Wind: {bulletin.get('primary_wind')}. "
                    f"Small artisanal craft advised to exercise extreme caution or remain in harbor."
                ),
                "start_time": time_str,
                "end_time": "Valid until next official IMD bulletin",
                "source": f"India Meteorological Department ({office})",
                "verified": True
            })

        # 2. Storm Surge / Ocean Currents Alert
        surge = bulletin.get("storm_surge_warning", "NIL")
        if surge and "NIL" not in surge.upper():
            alerts.append({
                "id": f"ADV-IMD-SURGE-{s_id}",
                "advisory_type": "IMD / INCOIS Ocean Currents & Surge Alert",
                "severity": "CAUTION",
                "region_name": s_name,
                "latitude": c_lat,
                "longitude": c_lon,
                "radius_km": 40.0,
                "description": f"Official Coastal Alert ({office}): {surge}",
                "start_time": time_str,
                "end_time": "Next 24 Hours",
                "source": f"India Meteorological Department ({office})",
                "verified": True
            })

        # 3. Active Cyclonic Circulation / Depression Notice
        syn = bulletin.get("synoptic_situation", "NIL")
        if any(k in syn.upper() for k in ["CYCLONIC CIRCULATION", "DEPRESSION", "LOW PRESSURE"]):
            # Extract first sentence or snippet
            syn_snip = syn.split(".")[0] if "." in syn else syn[:150]
            alerts.append({
                "id": f"ADV-IMD-SYN-{s_id}",
                "advisory_type": "IMD Synoptic Weather Advisory",
                "severity": "CAUTION" if bulletin["cyclone_status"] == CycloneStatus.WATCH else "WARNING",
                "region_name": s_name,
                "latitude": c_lat,
                "longitude": c_lon,
                "radius_km": 60.0,
                "description": f"Official Synoptic Situation ({office}): {syn_snip}. Wind: {bulletin.get('primary_wind')}.",
                "start_time": time_str,
                "end_time": "Next IMD Bulletin",
                "source": f"India Meteorological Department ({office})",
                "verified": True
            })

    return alerts
