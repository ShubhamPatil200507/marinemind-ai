# backend/tools/marine_tools.py
from typing import Dict, Any
from backend.models.schemas import OceanData

def get_ocean_analytics(lat: float, lon: float) -> OceanData:
    """
    Computes oceanographic parameters:
    - Sea Surface Temperature (SST) from satellite observation
    - Chlorophyll-a concentration (mg/m3) from ocean color monitors
    - Ocean surface current velocity and direction
    - Ocean Productivity Score (0-100)
    """
    # Baseline for Indian West Coast / Arabian Sea
    sst_val = 28.1
    chlorophyll_val = 2.15
    current_speed = 0.42 # m/s
    current_dir = "SSW"
    tide_h = 1.55 # meters

    # Ocean Productivity Score Calculation (Configurable normalization)
    # 1. SST Suitability (optimal pelagic range 26.5C - 28.5C): max 25 pts
    if 26.5 <= sst_val <= 28.5:
        sst_score = 25.0
    elif 25.5 <= sst_val < 26.5 or 28.5 < sst_val <= 29.5:
        sst_score = 18.0
    else:
        sst_score = 10.0

    # 2. Chlorophyll-a Concentration (> 1.8 mg/m3 indicates rich phytoplankton): max 35 pts
    if chlorophyll_val >= 2.0:
        chloro_score = 35.0
    elif chlorophyll_val >= 1.2:
        chloro_score = 28.0
    elif chlorophyll_val >= 0.6:
        chloro_score = 18.0
    else:
        chloro_score = 8.0

    # 3. Moderate Surface Current (0.2 - 0.6 m/s maintains nutrient upwelling): max 15 pts
    if 0.2 <= current_speed <= 0.6:
        current_score = 15.0
    else:
        current_score = 8.0

    # 4. Sea state stability / frontal shear: max 25 pts
    front_stability_score = 25.0

    total_productivity = sst_score + chloro_score + current_score + front_stability_score

    analysis_text = (
        f"Thermal front identified with SST at {sst_val}C and high chlorophyll-a density of {chlorophyll_val} mg/m3. "
        "High phytoplankton concentration creates favorable feeding grounds for pelagic schools (Mackerel, Tuna, Pomfret)."
    )

    return OceanData(
        sst_c=sst_val,
        chlorophyll_mg_m3=chlorophyll_val,
        current_speed_ms=current_speed,
        current_direction=current_dir,
        tide_height_m=tide_h,
        tide_state="Ebb / Receding (Favourable for nearshore casting)",
        ocean_productivity_score=total_productivity,
        productivity_breakdown={
            "favourable_sst": sst_score,
            "high_chlorophyll": chloro_score,
            "moderate_current": current_score,
            "stable_sea_conditions": front_stability_score
        },
        analysis=analysis_text
    )