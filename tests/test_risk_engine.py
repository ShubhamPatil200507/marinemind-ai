import pytest
from backend.services.risk_engine import calculate_marine_risk
from backend.models.schemas import (
    WeatherData, OceanData, GeofenceCheckResult,
    CycloneStatus, DataStatus, DataProvenance
)

def test_low_risk_scenario():
    w = WeatherData(
        temperature_c=28.0, wind_speed_kmh=14.0, wind_speed_knots=7.5,
        wind_direction="NW", wind_gust_kmh=18.0, rain_probability=10,
        visibility="Good", lightning_risk="Low",
        cyclone_status=CycloneStatus.NO_ACTIVE_ALERT,
        wave_height_m=0.8, wave_period_s=7.0, sea_state="Calm",
        risk_level="LOW", forecast_summary="Calm"
    )
    o = OceanData(sst_c=28.2, chlorophyll_mg_m3=2.1, current_speed_ms=0.3, current_direction="SW", tide_height_m=1.2, tide_state="Ebb", ocean_productivity_score=85.0, productivity_breakdown={}, analysis="")
    g = GeofenceCheckResult(is_inside=False, is_approaching=False, nearest_zone_name="IMBL", nearest_zone_category="Boundary", distance_to_boundary_km=25.0, alert_level="SAFE", warning_message="", recommended_action="")

    risk = calculate_marine_risk(w, o, g)
    assert risk.risk_level == "LOW"
    assert risk.overall_score <= 25.0
    assert "Safe" in risk.recommendation or "GO" in risk.recommendation

def test_high_risk_wave_scenario():
    w = WeatherData(
        temperature_c=29.0, wind_speed_kmh=42.0, wind_speed_knots=22.5,
        wind_direction="WNW", wind_gust_kmh=55.0, rain_probability=60,
        visibility="Poor", lightning_risk="High",
        cyclone_status=CycloneStatus.WARNING,
        wave_height_m=3.2, wave_period_s=5.5, sea_state="High",
        risk_level="HIGH", forecast_summary="Dangerous"
    )
    o = OceanData(sst_c=27.5, chlorophyll_mg_m3=1.2, current_speed_ms=0.8, current_direction="W", tide_height_m=2.1, tide_state="Flood", ocean_productivity_score=40.0, productivity_breakdown={}, analysis="")
    g = GeofenceCheckResult(is_inside=False, is_approaching=True, nearest_zone_name="IMBL", nearest_zone_category="Boundary", distance_to_boundary_km=3.2, alert_level="WARNING", warning_message="Border proximity", recommended_action="")

    risk = calculate_marine_risk(w, o, g)
    assert risk.risk_level in ["HIGH", "SEVERE", "CRITICAL"]
    assert risk.overall_score >= 60.0

def test_unknown_cyclone_status_is_conservative():
    w = WeatherData(
        temperature_c=27.0, wind_speed_kmh=15.0, wind_speed_knots=8.0,
        wind_direction="NW", wind_gust_kmh=20.0, rain_probability=15,
        visibility="Good", lightning_risk="Low",
        cyclone_status=CycloneStatus.UNKNOWN,
        wave_height_m=1.0, wave_period_s=7.0, sea_state="Calm",
        risk_level="LOW", forecast_summary="Calm"
    )
    o = OceanData(sst_c=28.0, chlorophyll_mg_m3=2.0, current_speed_ms=0.2, current_direction="S", tide_height_m=1.0, tide_state="Slack", ocean_productivity_score=80.0, productivity_breakdown={}, analysis="")
    g = GeofenceCheckResult(is_inside=False, is_approaching=False, nearest_zone_name="IMBL", nearest_zone_category="Boundary", distance_to_boundary_km=30.0, alert_level="SAFE", warning_message="", recommended_action="")

    risk = calculate_marine_risk(w, o, g)
    assert any("Cyclone" in gap or "imd.gov.in" in gap for gap in risk.data_gaps)
    # UNKNOWN adds conservative points
    cyclone_factor = next(f for f in risk.major_factors if f["factor"] == "Cyclone Advisory")
    assert cyclone_factor["raw_component"] > 0.0

def test_unavailable_weather_data_handling():
    w = WeatherData(
        temperature_c=28.4, wind_speed_kmh=22.0, wind_speed_knots=11.9,
        wind_direction="NW", wind_gust_kmh=28.0, rain_probability=25,
        visibility="Good", lightning_risk="Low",
        cyclone_status=CycloneStatus.UNKNOWN,
        wave_height_m=1.4, wave_period_s=7.2, sea_state="Moderate",
        risk_level="Moderate", forecast_summary="Fallback",
        provenance=DataProvenance(
            source="Unavailable Baseline",
            retrieved_at="2026-10-02T00:00:00Z",
            valid_at="2026-10-02T00:00:00Z",
            status=DataStatus.UNAVAILABLE,
            freshness_minutes=0,
            note="Sensor offline"
        )
    )
    o = OceanData(sst_c=28.0, chlorophyll_mg_m3=2.0, current_speed_ms=0.2, current_direction="S", tide_height_m=1.0, tide_state="Slack", ocean_productivity_score=80.0, productivity_breakdown={}, analysis="")
    g = GeofenceCheckResult(is_inside=False, is_approaching=False, nearest_zone_name="IMBL", nearest_zone_category="Boundary", distance_to_boundary_km=30.0, alert_level="SAFE", warning_message="", recommended_action="")

    risk = calculate_marine_risk(w, o, g)
    assert any("Weather telemetry source unavailable" in gap for gap in risk.data_gaps)

def test_border_breach_triggers_critical_alert():
    w = WeatherData(
        temperature_c=28.0, wind_speed_kmh=10.0, wind_speed_knots=5.4,
        wind_direction="N", wind_gust_kmh=12.0, rain_probability=0,
        visibility="Good", lightning_risk="Low",
        cyclone_status=CycloneStatus.NO_ACTIVE_ALERT,
        wave_height_m=0.5, wave_period_s=6.0, sea_state="Calm",
        risk_level="LOW", forecast_summary="Calm"
    )
    o = OceanData(sst_c=28.0, chlorophyll_mg_m3=2.0, current_speed_ms=0.2, current_direction="S", tide_height_m=1.0, tide_state="Slack", ocean_productivity_score=80.0, productivity_breakdown={}, analysis="")
    g = GeofenceCheckResult(
        is_inside=True,
        is_approaching=False,
        nearest_zone_name="Naval Firing Range",
        nearest_zone_category="Restricted",
        distance_to_boundary_km=0.0,
        alert_level="CRITICAL",
        warning_message="Inside restricted waters",
        recommended_action="Exit immediately"
    )

    risk = calculate_marine_risk(w, o, g)
    assert risk.overall_score >= 30.0
    geo_factor = next(f for f in risk.major_factors if f["factor"] == "Geofence Proximity")
    assert geo_factor["raw_component"] == 100.0
