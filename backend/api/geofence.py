# backend/api/geofence.py
from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Dict, Any
from backend.data.seed_data import SEED_GEOFENCES
from backend.tools.gis_tools import check_all_geofences

router = APIRouter(prefix="/api/geofence", tags=["Geofencing & Boundary Guardian"])

class GeofenceCheckRequest(BaseModel):
    latitude: float = 18.9220
    longitude: float = 72.8347

@router.get("/zones")
async def get_all_geofences():
    """Fetches all registered maritime boundaries, naval exercise areas, and MPAs."""
    return SEED_GEOFENCES

@router.post("/check")
async def check_vessel_boundary(body: GeofenceCheckRequest):
    """Performs spatial proximity and polygon intersection checks for vessel coordinates."""
    return check_all_geofences(body.latitude, body.longitude, SEED_GEOFENCES)