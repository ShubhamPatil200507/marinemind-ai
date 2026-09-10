# backend/agents/geospatial_agent.py
from typing import Dict, Any, List
from backend.models.schemas import GeofenceCheckResult, EvidenceItem
from backend.tools.gis_tools import check_all_geofences
from backend.data.seed_data import SEED_GEOFENCES

class GeospatialAgent:
    """Geospatial reasoning, boundary auditing, and geofence agent."""
    def __init__(self):
        self.name = "Geospatial Reasoning Agent"

    def execute(self, lat: float, lon: float) -> Dict[str, Any]:
        result_dict = check_all_geofences(lat, lon, SEED_GEOFENCES)
        geofence_result = GeofenceCheckResult(**result_dict)

        evidence = [
            EvidenceItem(
                source_agent=self.name,
                factor="Boundary Proximity",
                value=f"{geofence_result.distance_to_boundary_km} km to {geofence_result.nearest_zone_name}",
                impact=geofence_result.alert_level,
                confidence=0.95
            ),
            EvidenceItem(
                source_agent=self.name,
                factor="Restricted Water Containment",
                value="Inside Zone: False" if not geofence_result.is_inside else "INSIDE RESTRICTED PERIMETER",
                impact="Territorial compliance verified" if not geofence_result.is_inside else "CRITICAL VIOLATION",
                confidence=0.98
            )
        ]

        return {
            "status": "completed",
            "geofence_status": geofence_result,
            "evidence": evidence,
            "summary": geofence_result.warning_message
        }