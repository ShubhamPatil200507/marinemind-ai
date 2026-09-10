import pytest
from backend.services.risk_engine import calculate_marine_risk
from backend.models.schemas import WeatherData, OceanData, GeofenceCheckResult

def test_low_risk_scenario():
    w = WeatherData(
        temperature_c=28.0, wind_speed_kmh=14.0, wind_speed_knots=7.5,
        wind_direction="NW", wind_gust_kmh=18.0, rain_probability=10,
        visibility="Good", lightning_risk="Low", cyclone_alert=False,
        wave_height_m=0.8, wave_period_s=7.0, sea_state="Calm",
        risk_level="LOW", forecast_summary="Calm"
    )
    o = OceanData(sst_c=28.2, chlorophyll_mg_m3=2.1, current_speed_ms=0.3, current_direction="SW", tide_height_m=1.2, tide_state="Ebb", ocean_productivity_score=85.0, productivity_breakdown={}, analysis="")
    g = GeofenceCheckResult(is_inside=False, is_approaching=False, nearest_zone_name="IMBL", nearest_zone_category="Boundary", distance_to_boundary_km=25.0, alert_level="SAFE", warning_message="", recommended_action="")

    risk = calculate_marine_risk(w, o, g)
    assert risk.risk_level == "LOW"
    assert risk.overall_score < 30.0
    assert "Safe" in risk.recommendation or "GO" in risk.recommendation

def test_high_risk_wave_scenario():
    w = WeatherData(
        temperature_c=29.0, wind_speed_kmh=42.0, wind_speed_knots=22.5,
        wind_direction="WNW", wind_gust_kmh=55.0, rain_probability=60,
        visibility="Poor", lightning_risk="High", cyclone_alert=True,
        wave_height_m=3.2, wave_period_s=5.5, sea_state="High",
        risk_level="HIGH", forecast_summary="Dangerous"
    )
    o = OceanData(sst_c=27.5, chlorophyll_mg_m3=1.2, current_speed_ms=0.8, current_direction="W", tide_height_m=2.1, tide_state="Flood", ocean_productivity_score=40.0, productivity_breakdown={}, analysis="")
    g = GeofenceCheckResult(is_inside=False, is_approaching=True, nearest_zone_name="IMBL", nearest_zone_category="Boundary", distance_to_boundary_km=3.2, alert_level="WARNING", warning_message="Border proximity", recommended_action="")

    risk = calculate_marine_risk(w, o, g)
    assert risk.risk_level in ["HIGH", "SEVERE", "CRITICAL"]
    assert risk.overall_score >= 60.0
