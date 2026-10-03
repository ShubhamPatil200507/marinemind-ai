# backend/api/alerts.py
from fastapi import APIRouter, Query
from typing import Optional
from backend.tools.advisory_tools import get_active_marine_advisories

router = APIRouter(prefix="/api/alerts", tags=["Marine Alert Center"])

@router.get("")
async def get_alerts(
    severity: Optional[str] = None,
    lat: Optional[float] = Query(None, description="Vessel latitude for localized IMD coastal bulletins"),
    lon: Optional[float] = Query(None, description="Vessel longitude for localized IMD coastal bulletins")
):
    """Retrieves active marine advisories (IMD Port Warnings, Cyclone Status, Squall, Navigational)."""
    return get_active_marine_advisories(severity_filter=severity, lat=lat, lon=lon)