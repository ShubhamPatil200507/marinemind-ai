# backend/services/risk_engine.py
from typing import Dict, Any, List
from backend.models.schemas import WeatherData, OceanData, GeofenceCheckResult, MarineRiskAssessment

def calculate_marine_risk(
    weather: WeatherData,
    ocean: OceanData,
    geofence: GeofenceCheckResult,
    custom_weights: Dict[str, float] = None
) -> MarineRiskAssessment:
    """
    Computes holistic marine risk score (0-100) using configurable multi-criteria weighting:
    - Wave Risk: 30%
    - Wind Risk: 20%
    - Lightning Risk: 15%
    - Cyclone Risk: 20%
    - Visibility Risk: 5%
    - Geofence Risk: 10%
    """
    weights = custom_weights or {
        "wave": 0.30,
        "wind": 0.20,
        "lightning": 0.15,
        "cyclone": 0.20,
        "visibility": 0.05,
        "geofence": 0.10
    }

    # 1. Wave Risk Component (0 - 100)
    # < 1.2m: low (10-25); 1.2 - 2.0m: moderate (30-60); > 2.0m: high/hazardous (75-100)
    wh = weather.wave_height_m
    if wh >= 2.5:
        wave_component = 95.0
        wave_label = f"Hazardous Wave Swells ({wh}m)"
    elif wh >= 1.8:
        wave_component = 70.0
        wave_label = f"Rough Wave Swells ({wh}m)"
    elif wh >= 1.3:
        wave_component = 45.0
        wave_label = f"Moderate Wave Height ({wh}m)"
    else:
        wave_component = 18.0
        wave_label = f"Calm Waves ({wh}m)"

    # 2. Wind Risk Component (0 - 100)
    ws = weather.wind_speed_kmh
    if ws >= 40.0:
        wind_component = 90.0
        wind_label = f"Gale / Strong Wind ({ws} km/h)"
    elif ws >= 28.0:
        wind_component = 65.0
        wind_label = f"Brisk / Gusty Wind ({ws} km/h)"
    elif ws >= 18.0:
        wind_component = 35.0
        wind_label = f"Moderate Sea Breeze ({ws} km/h)"
    else:
        wind_component = 12.0
        wind_label = f"Light Breeze ({ws} km/h)"

    # 3. Lightning Risk Component (0 - 100)
    lr = weather.lightning_risk.lower()
    if "high" in lr:
        lightning_component = 85.0
        lightning_label = "Elevated Lightning Strike Probability"
    elif "moderate" in lr:
        lightning_component = 40.0
        lightning_label = "Convective Cloud Lightning Potential"
    else:
        lightning_component = 8.0
        lightning_label = "Low Lightning Probability"

    # 4. Cyclone Risk Component (0 - 100)
    if weather.cyclone_alert:
        cyclone_component = 100.0
        cyclone_label = "ACTIVE CYCLONE WARNING"
    else:
        cyclone_component = 0.0
        cyclone_label = "No Active Cyclone Alert"

    # 5. Visibility Risk Component (0 - 100)
    if "poor" in weather.visibility.lower():
        visibility_component = 75.0
        vis_label = "Restricted Visibility (< 3 km)"
    else:
        visibility_component = 10.0
        vis_label = "Clear Navigational Visibility (> 8 km)"

    # 6. Geofence Risk Component (0 - 100)
    if geofence.is_inside:
        geofence_component = 100.0
        geo_label = f"Inside Restricted Perimeter ({geofence.nearest_zone_name})"
    elif geofence.distance_to_boundary_km < 5.0:
        geofence_component = 75.0
        geo_label = f"Boundary Warning: {geofence.distance_to_boundary_km} km to Border"
    elif geofence.distance_to_boundary_km < 12.0:
        geofence_component = 35.0
        geo_label = f"Border Caution: {geofence.distance_to_boundary_km} km from IMBL"
    else:
        geofence_component = 5.0
        geo_label = "Safe Territorial Waters (> 15 km from Border)"

    # Calculate weighted final score
    final_score = round(
        wave_component * weights["wave"] +
        wind_component * weights["wind"] +
        lightning_component * weights["lightning"] +
        cyclone_component * weights["cyclone"] +
        visibility_component * weights["visibility"] +
        geofence_component * weights["geofence"],
        1
    )

    # Classify Risk Category
    if final_score <= 25.0:
        risk_category = "LOW"
        recommendation = "Safe marine conditions. Favorable for full-day coastal and offshore operations."
    elif final_score <= 50.0:
        risk_category = "MODERATE"
        recommendation = "Proceed with caution. Safe close to shore (06:00 - 10:30 AM); avoid offshore operations after 11:00 AM as swell increases."
    elif final_score <= 75.0:
        risk_category = "HIGH"
        recommendation = "Avoid offshore operations. Hazardous wave and wind conditions present."
    else:
        risk_category = "CRITICAL"
        recommendation = "Do not venture into the sea. Extreme marine hazards active. Heed official Coast Guard advisories."

    # Major contributing factors breakdown
    major_factors = [
        {"factor": "Wave Height", "points": round(wave_component * weights["wave"], 1), "description": wave_label, "raw_component": wave_component},
        {"factor": "Wind Speed", "points": round(wind_component * weights["wind"], 1), "description": wind_label, "raw_component": wind_component},
        {"factor": "Lightning Index", "points": round(lightning_component * weights["lightning"], 1), "description": lightning_label, "raw_component": lightning_component},
        {"factor": "Cyclone Advisory", "points": round(cyclone_component * weights["cyclone"], 1), "description": cyclone_label, "raw_component": cyclone_component},
        {"factor": "Geofence Proximity", "points": round(geofence_component * weights["geofence"], 1), "description": geo_label, "raw_component": geofence_component},
        {"factor": "Visibility", "points": round(visibility_component * weights["visibility"], 1), "description": vis_label, "raw_component": visibility_component}
    ]

    return MarineRiskAssessment(
        overall_score=final_score,
        risk_level=risk_category,
        confidence=0.88,
        wave_risk=wave_component,
        wind_risk=wind_component,
        lightning_risk=lightning_component,
        cyclone_risk=cyclone_component,
        geofence_risk=geofence_component,
        visibility_risk=visibility_component,
        major_factors=major_factors,
        recommendation=recommendation,
        safety_window="06:00 AM - 10:30 AM IST (Safe Window)" if final_score <= 50.0 else "Conditions Hazardous throughout day"
    )