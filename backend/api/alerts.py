# backend/api/alerts.py
from fastapi import APIRouter, Query
from typing import Optional
from backend.data.seed_data import SEED_ADVISORIES
from backend.tools.advisory_tools import get_active_marine_advisories

router = APIRouter(prefix="/api/alerts", tags=["Marine Alert Center"])

@router.get("")
async def get_alerts(severity: Optional[str] = None):
    """Retrieves all active marine advisories (Cyclone, High Wave, Squall, Navigational)."""
    return get_active_marine_advisories(severity)