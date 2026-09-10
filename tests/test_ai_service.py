import pytest
from backend.services.ai_service import marine_ai_service
from backend.models.schemas import (
    WeatherData, OceanData, GeofenceCheckResult,
    MarineRiskAssessment, ExecutionPlan, ExecutionStep
)

def test_local_marine_reasoner_multilingual():
    w = WeatherData(temperature_c=28.0, wind_speed_kmh=18.0, wind_speed_knots=9.7, wind_direction="NW", wind_gust_kmh=24.0, rain_probability=15, visibility="Good", lightning_risk="Low", cyclone_alert=False, wave_height_m=1.1, wave_period_s=7.0, sea_state="Slight", risk_level="LOW", forecast_summary="Optimal")
    o = OceanData(sst_c=28.4, chlorophyll_mg_m3=2.3, current_speed_ms=0.4, current_direction="SSW", tide_height_m=1.4, tide_state="Flood", ocean_productivity_score=88.0, productivity_breakdown={}, analysis="")
    g = GeofenceCheckResult(is_inside=False, is_approaching=False, nearest_zone_name="IMBL", nearest_zone_category="Boundary", distance_to_boundary_km=45.0, alert_level="SAFE", warning_message="", recommended_action="")
    r = MarineRiskAssessment(overall_score=15.0, risk_level="LOW", confidence=0.9, wave_risk=10.0, wind_risk=15.0, lightning_risk=5.0, cyclone_risk=0.0, geofence_risk=0.0, visibility_risk=5.0, major_factors=[], recommendation="GO - Safe Operations")
    plan = ExecutionPlan(intent="marine_safety", detected_language="en", location={"latitude": 18.92, "longitude": 72.83, "name": "Mumbai"}, time_window="now", activity="fishing", required_agents=["weather_agent"], steps=[])

    # English synthesis
    out_en = marine_ai_service.generate_marine_advice("Is it safe?", plan, w, o, g, r, None, [], "en")
    assert "Marine Operational Intelligence" in out_en["answer"]
    assert len(out_en["why_bullets"]) >= 3

    # Hindi synthesis
    out_hi = marine_ai_service.generate_marine_advice("क्या सुरक्षित है?", plan, w, o, g, r, None, [], "hi")
    assert "समुद्री सुरक्षा" in out_hi["answer"]

    # Tamil synthesis
    out_ta = marine_ai_service.generate_marine_advice("பாதுகாப்பானதா?", plan, w, o, g, r, None, [], "ta")
    assert "கடல்சார் பாதுகாப்பு" in out_ta["answer"]
