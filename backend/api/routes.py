# backend/api/routes.py
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from backend.services.route_optimizer import calculate_safe_routes

router = APIRouter(prefix="/api/routes", tags=["Safe Route Navigation"])

class RouteRequest(BaseModel):
    start_lat: float = 18.9220
    start_lon: float = 72.8347
    dest_lat: float = 18.9850
    dest_lon: float = 72.7120
    dest_name: Optional[str] = "PFZ Alpha"

@router.post("/calculate")
async def calculate_route_endpoint(body: RouteRequest):
    """Calculates Route A (Direct / Hazardous) vs Route B (Safe Detour)."""
    return calculate_safe_routes(body.start_lat, body.start_lon, body.dest_lat, body.dest_lon, body.dest_name)

@router.get("/demo")
async def get_demo_routes():
    """Returns standard comparative routes for Mumbai Coast to PFZ Alpha."""
    return calculate_safe_routes(18.9220, 72.8347, 18.9850, 72.7120, "PFZ Alpha (Arabian Sea NW)")