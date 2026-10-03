# backend/tools/advisory_tools.py
from typing import List, Dict, Any, Optional
from backend.data.seed_data import SEED_ADVISORIES
from backend.services.imd_service import get_active_imd_alerts

def get_active_marine_advisories(
    severity_filter: Optional[str] = None,
    lat: Optional[float] = None,
    lon: Optional[float] = None
) -> List[Dict[str, Any]]:
    """
    Fetches active government and meteorological marine advisories.
    Prioritizes real-time India Meteorological Department (IMD) port signals,
    coastal surge alerts, and synoptic warnings.
    """
    # 1. Fetch live IMD official alerts
    imd_alerts = get_active_imd_alerts(lat=lat, lon=lon)

    # 2. Add verified navigational safety notices (e.g. harbor traffic)
    navigational_notices = [
        a for a in SEED_ADVISORIES
        if "Traffic" in a.get("advisory_type", "") or "Naval" in a.get("description", "")
    ]

    combined = imd_alerts + [n for n in navigational_notices if n["id"] not in {x["id"] for x in imd_alerts}]

    # Fallback to seed advisories if live list is empty
    if not combined:
        combined = SEED_ADVISORIES

    if not severity_filter:
        return combined
    return [a for a in combined if a.get("severity", "").upper() == severity_filter.upper()]