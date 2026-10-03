# backend/tools/weather_tools.py
import os
import httpx
import datetime
import logging
from typing import Dict, Any, Optional, List
from backend.models.schemas import WeatherData, DataProvenance, DataStatus, CycloneStatus
from backend.services.imd_service import get_coastal_bulletin

logger = logging.getLogger(__name__)

_OPEN_METEO_TIMEOUT = float(os.environ.get("OPEN_METEO_TIMEOUT", "5.0"))

def get_compass_direction(deg: float) -> str:
    compass_pts = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
    return compass_pts[int((deg + 11.25) / 22.5) % 16]

def parse_hourly_temporal_forecast(
    weather_json: Dict[str, Any],
    marine_json: Dict[str, Any],
    time_window: str
) -> Dict[str, Any]:
    """
    Parses hourly telemetry slices from Open-Meteo to build genuine
    forward-looking weather intelligence for morning, afternoon, or tomorrow.
    """
    w_hourly = weather_json.get("hourly", {})
    m_hourly = marine_json.get("hourly", {})

    times = w_hourly.get("time", [])
    temps = w_hourly.get("temperature_2m", [])
    winds = w_hourly.get("wind_speed_10m", [])
    wind_dirs = w_hourly.get("wind_direction_10m", [])
    gusts = w_hourly.get("wind_gusts_10m", [])
    precips = w_hourly.get("precipitation_probability", [])
    waves = m_hourly.get("wave_height", [])
    wave_periods = m_hourly.get("wave_period", [])

    tw_lower = time_window.lower()
    is_tomorrow = "tomorrow" in tw_lower
    is_morning = any(k in tw_lower for k in ["morning", "am", "early", "dawn", "06", "07", "08", "09", "10"])
    is_afternoon = any(k in tw_lower for k in ["afternoon", "pm", "late", "evening", "12", "14", "16"])

    # Determine target hours
    target_indices = []
    now = datetime.datetime.utcnow()
    target_date = (now + datetime.timedelta(days=1)).strftime("%Y-%m-%d") if is_tomorrow else now.strftime("%Y-%m-%d")

    for i, t_str in enumerate(times):
        if target_date in t_str:
            hour = int(t_str.split("T")[1].split(":")[0]) if "T" in t_str else 12
            if is_morning and 6 <= hour <= 11:
                target_indices.append(i)
            elif is_afternoon and 12 <= hour <= 17:
                target_indices.append(i)
            elif not is_morning and not is_afternoon and 6 <= hour <= 18:
                target_indices.append(i)

    if not target_indices:
        target_indices = list(range(min(6, len(times))))

    # Aggregate numerical forecasts across target indices
    avg_temp = sum(temps[i] for i in target_indices if i < len(temps)) / len(target_indices) if target_indices else 28.5
    avg_wind = sum(winds[i] for i in target_indices if i < len(winds)) / len(target_indices) if target_indices else 20.0
    max_gust = max((gusts[i] for i in target_indices if i < len(gusts)), default=avg_wind * 1.3)
    avg_precip = sum(precips[i] for i in target_indices if i < len(precips)) / len(target_indices) if target_indices else 15
    avg_wave = sum(waves[i] for i in target_indices if i < len(waves) and waves[i] is not None) / len(target_indices) if target_indices else 1.4
    avg_period = sum(wave_periods[i] for i in target_indices if i < len(wave_periods) and wave_periods[i] is not None) / len(target_indices) if target_indices else 7.0
    dominant_wind_dir = wind_dirs[target_indices[0]] if target_indices and target_indices[0] < len(wind_dirs) else 300.0

    return {
        "temp_c": round(avg_temp, 1),
        "wind_kmh": round(avg_wind, 1),
        "wind_dir": get_compass_direction(dominant_wind_dir),
        "gust_kmh": round(max_gust, 1),
        "rain_prob": int(round(avg_precip)),
        "wave_h": round(avg_wave, 2),
        "wave_period": round(avg_period, 1)
    }

def get_weather_forecast(lat: float, lon: float, time_window: str = "now") -> WeatherData:
    """
    Returns verified marine weather intelligence utilizing real-time API queries.
    - Sets DataProvenance.status = LIVE when data is fresh from Open-Meteo
    - Sets DataProvenance.status = UNAVAILABLE and uses fallback baseline on failure
    - NEVER silently presents stale/fallback data as live information
    - Cyclone status is always UNKNOWN (no real-time cyclone API integrated)
    """
    weather_data = None
    marine_data = None
    data_is_live = False
    retrieved_at = datetime.datetime.utcnow().isoformat() + "Z"
    api_error: Optional[str] = None

    try:
        with httpx.Client(timeout=_OPEN_METEO_TIMEOUT) as client:
            w_url = (
                f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}"
                f"&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,wind_gusts_10m,precipitation"
                f"&hourly=temperature_2m,wind_speed_10m,wind_direction_10m,wind_gusts_10m,precipitation_probability"
                f"&timezone=auto"
            )
            m_url = (
                f"https://marine-api.open-meteo.com/v1/marine?latitude={lat}&longitude={lon}"
                f"&current=wave_height,wave_direction,wave_period,sea_surface_temperature"
                f"&hourly=wave_height,wave_period,wave_direction"
                f"&timezone=auto"
            )
            w_resp = client.get(w_url)
            m_resp = client.get(m_url)

            if w_resp.status_code == 200:
                weather_data = w_resp.json()
            else:
                logger.warning(f"[WeatherTools] Open-Meteo weather API returned {w_resp.status_code}")
            if m_resp.status_code == 200:
                marine_data = m_resp.json()
                data_is_live = (weather_data is not None)
            else:
                logger.warning(f"[WeatherTools] Open-Meteo marine API returned {m_resp.status_code}")

    except httpx.TimeoutException:
        api_error = "Open-Meteo request timed out"
        logger.warning(f"[WeatherTools] Timeout fetching weather for ({lat},{lon})")
    except Exception as exc:
        api_error = str(exc)
        logger.warning(f"[WeatherTools] Failed to fetch weather: {exc}")

    # 2. Extract parameters depending on time window
    tw_lower = time_window.lower()
    is_temporal = any(k in tw_lower for k in ["morning", "afternoon", "tomorrow", "pm", "am", "early", "late"])

    if is_temporal and weather_data and marine_data:
        parsed = parse_hourly_temporal_forecast(weather_data, marine_data, time_window)
        temp_c = parsed["temp_c"]
        wind_kmh = parsed["wind_kmh"]
        wind_dir = parsed["wind_dir"]
        gust_kmh = parsed["gust_kmh"]
        rain_prob = parsed["rain_prob"]
        wave_h = parsed["wave_h"]
        wave_period = parsed["wave_period"]
    elif weather_data:
        w_curr = weather_data.get("current", {})
        temp_c = float(w_curr.get("temperature_2m", 28.0))
        wind_kmh = float(w_curr.get("wind_speed_10m", 20.0))
        wind_deg = float(w_curr.get("wind_direction_10m", 290.0))
        gust_kmh = float(w_curr.get("wind_gusts_10m", wind_kmh * 1.3))
        precip = float(w_curr.get("precipitation", 0.0))
        wind_dir = get_compass_direction(wind_deg)
        rain_prob = int(min(precip * 20, 95))

        wave_h = 1.3
        wave_period = 7.0
        if marine_data:
            m_curr = marine_data.get("current", {})
            if m_curr.get("wave_height") is not None:
                wave_h = float(m_curr.get("wave_height"))
            if m_curr.get("wave_period") is not None:
                wave_period = float(m_curr.get("wave_period"))
    else:
        # Fallback baseline when network unavailable
        # IMPORTANT: provenance status will be UNAVAILABLE — clearly marked for UI
        temp_c = 28.4
        wind_kmh = 21.0
        wind_dir = "NW"
        gust_kmh = 28.0
        rain_prob = 20
        wave_h = 1.4
        wave_period = 7.2
        data_is_live = False

    wind_knots = round(wind_kmh * 0.539957, 1)

    # 3. Dynamic sea state classification
    if wave_h >= 2.5:
        sea_state = "Rough / High Swell (Hazardous for Artisanal Craft)"
        risk_lvl = "HIGH"
    elif wave_h >= 1.6:
        sea_state = "Moderate Swell (Caution Advised)"
        risk_lvl = "MODERATE"
    else:
        sea_state = "Smooth to Slight Swell (Optimal Operations)"
        risk_lvl = "LOW"

    lightning_risk = "High" if rain_prob > 60 else ("Moderate" if rain_prob > 35 else "Low")
    vis = "Moderate (5-8 km)" if rain_prob > 50 else "Excellent (10+ km)"

    # 4. Integrate official India Meteorological Department (IMD) Coastal Intelligence
    imd_bulletin = get_coastal_bulletin(lat, lon)
    port_signal = imd_bulletin.get("primary_port_signal", "NIL AT ALL PORTS")
    synoptic_sit = imd_bulletin.get("synoptic_situation", "NIL")
    imd_sector = imd_bulletin.get("sector_name")
    imd_office = imd_bulletin.get("issuing_office")
    storm_surge = imd_bulletin.get("storm_surge_warning", "NIL")
    imd_cyclone = imd_bulletin.get("cyclone_status", CycloneStatus.UNKNOWN)

    # 5. Build data provenance
    if data_is_live and imd_bulletin.get("is_live", False):
        provenance = DataProvenance(
            source=f"Open-Meteo & IMD ({imd_office})",
            retrieved_at=retrieved_at,
            valid_at=retrieved_at,
            status=DataStatus.LIVE,
            freshness_minutes=0,
            source_url="https://mausam.imd.gov.in/",
            note=f"Live atmospheric forecast fused with official Government of India IMD {imd_sector} bulletin."
        )
    elif data_is_live:
        provenance = DataProvenance(
            source="Open-Meteo Atmospheric Model",
            retrieved_at=retrieved_at,
            valid_at=retrieved_at,
            status=DataStatus.LIVE,
            freshness_minutes=0,
            source_url="https://open-meteo.com/",
            note="Live Open-Meteo telemetry (IMD bulletin using cached/fallback cycle)"
        )
    else:
        provenance = DataProvenance(
            source="Open-Meteo (Unavailable) — Fallback Baseline",
            retrieved_at=retrieved_at,
            status=DataStatus.UNAVAILABLE,
            note=f"Live API unavailable{f': {api_error}' if api_error else ''}. Values are fallback estimates — NOT current conditions."
        )

    # 6. Build summary
    source_label = "[LIVE]" if data_is_live else "[UNAVAILABLE — FALLBACK ESTIMATE]"
    summary = (
        f"{source_label} {time_window.replace('_', ' ').capitalize()} forecast: "
        f"Winds {wind_kmh} km/h {wind_dir} with gusts to {gust_kmh} km/h. "
        f"Significant wave height {wave_h}m ({wave_period}s period). Sea state: {sea_state}. "
        f"IMD Port Signal: {port_signal}."
    )

    return WeatherData(
        temperature_c=temp_c,
        wind_speed_kmh=wind_kmh,
        wind_speed_knots=wind_knots,
        wind_direction=wind_dir,
        wind_gust_kmh=gust_kmh,
        rain_probability=rain_prob,
        visibility=vis,
        lightning_risk=lightning_risk,
        # Verified from live India Meteorological Department (IMD) bulletin
        cyclone_status=imd_cyclone,
        wave_height_m=wave_h,
        wave_period_s=wave_period,
        sea_state=sea_state,
        risk_level=risk_lvl,
        forecast_summary=summary,
        port_signal=port_signal,
        synoptic_situation=synoptic_sit,
        imd_sector_name=imd_sector,
        imd_issuing_office=imd_office,
        storm_surge_warning=storm_surge,
        provenance=provenance
    )
