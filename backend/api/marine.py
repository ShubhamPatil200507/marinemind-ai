# backend/api/marine.py
from fastapi import APIRouter, Query
from backend.tools.marine_tools import get_ocean_analytics
from backend.data.seed_data import SEED_LOCATIONS

router = APIRouter(prefix="/api/marine", tags=["Marine Analytics"])

@router.get("/overview")
async def get_marine_overview(lat: float = 18.9220, lon: float = 72.8347):
    """Fetches high-level oceanographic overview for vessel location."""
    ocean_data = get_ocean_analytics(lat, lon)
    return {
        "location": {"latitude": lat, "longitude": lon, "name": "Mumbai Offshore"},
        "ocean_data": ocean_data,
        "available_ports": SEED_LOCATIONS
    }

@router.get("/analytics")
async def get_marine_analytics():
    """Returns historical/forecast trend series for charts (SST, Chlorophyll, Swell, Tide)."""
    return {
        "sst_trend": [
            {"time": "04:00", "sst": 27.6, "benchmark": 28.0},
            {"time": "08:00", "sst": 28.1, "benchmark": 28.0},
            {"time": "12:00", "sst": 28.8, "benchmark": 28.0},
            {"time": "16:00", "sst": 28.9, "benchmark": 28.0},
            {"time": "20:00", "sst": 28.4, "benchmark": 28.0}
        ],
        "chlorophyll_trend": [
            {"depth_m": 0, "chlorophyll": 2.15, "status": "High bloom"},
            {"depth_m": 10, "chlorophyll": 2.45, "status": "Subsurface chlorophyll max"},
            {"depth_m": 25, "chlorophyll": 1.60, "status": "Optimal pelagic"},
            {"depth_m": 50, "chlorophyll": 0.85, "status": "Declining light penetration"},
            {"depth_m": 80, "chlorophyll": 0.20, "status": "Aphotic"}
        ],
        "wave_wind_correlation": [
            {"hour": "06:00", "wave_m": 1.1, "wind_kmh": 16},
            {"hour": "08:00", "wave_m": 1.2, "wind_kmh": 18},
            {"hour": "10:00", "wave_m": 1.4, "wind_kmh": 22},
            {"hour": "12:00", "wave_m": 2.2, "wind_kmh": 32},
            {"hour": "14:00", "wave_m": 2.6, "wind_kmh": 38},
            {"hour": "16:00", "wave_m": 2.8, "wind_kmh": 42},
            {"hour": "18:00", "wave_m": 2.4, "wind_kmh": 34}
        ]
    }