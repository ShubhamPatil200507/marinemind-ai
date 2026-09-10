# backend/tools/advisory_tools.py
from typing import List, Dict, Any
from backend.data.seed_data import SEED_ADVISORIES

def get_active_marine_advisories(severity_filter: str = None) -> List[Dict[str, Any]]:
    """Fetches active government and meteorological marine advisories."""
    if not severity_filter:
        return SEED_ADVISORIES
    return [a for a in SEED_ADVISORIES if a.get("severity", "").upper() == severity_filter.upper()]