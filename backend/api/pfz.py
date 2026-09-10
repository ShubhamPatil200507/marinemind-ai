# backend/api/pfz.py
from fastapi import APIRouter
from backend.tools.pfz_tools import get_ranked_pfz_zones
from backend.data.seed_data import SEED_PFZ_ZONES

router = APIRouter(prefix="/api/pfz", tags=["Potential Fishing Zones"])

@router.get("/nearby")
async def get_nearby_pfz(lat: float = 18.9220, lon: float = 72.8347, max_distance: float = 120.0):
    """Fetches ranked PFZ zones prioritized by ocean productivity and safety."""
    return get_ranked_pfz_zones(lat, lon, max_distance)

@router.get("/{pfz_id}")
async def get_pfz_detail(pfz_id: str):
    """Retrieves specific details for a PFZ zone."""
    for z in SEED_PFZ_ZONES:
        if z["id"].lower() == pfz_id.lower():
            return z
    return {"error": "PFZ Zone not found", "id": pfz_id}