# backend/agents/pfz_agent.py
from typing import Dict, Any, List
from backend.models.schemas import PFZZone, EvidenceItem
from backend.tools.pfz_tools import get_ranked_pfz_zones

class PFZAgent:
    """Potential Fishing Zone intelligence and ranking agent."""
    def __init__(self):
        self.name = "PFZ Intelligence Agent"

    def execute(self, lat: float, lon: float, max_dist_km: float = 60.0) -> Dict[str, Any]:
        zones = get_ranked_pfz_zones(lat, lon, max_dist_km)
        best_zone = zones[0] if zones else None

        evidence = []
        if best_zone:
            evidence.append(
                EvidenceItem(
                    source_agent=self.name,
                    factor="Top Recommended PFZ",
                    value=f"{best_zone.name} ({best_zone.distance_km} km away)",
                    impact=f"Productivity Score: {best_zone.productivity_score}/100, Wave Risk: {best_zone.wave_risk}",
                    confidence=0.91
                )
            )

        # Contrast evidence if closer zone is avoided
        avoided_zones = [z for z in zones if z.recommendation == "AVOID"]
        if avoided_zones:
            av = avoided_zones[0]
            evidence.append(
                EvidenceItem(
                    source_agent=self.name,
                    factor="Hazardous Proximity Zone",
                    value=f"{av.name} ({av.distance_km} km)",
                    impact=f"Avoid: Flagged hazardous due to high swell break waves despite shorter distance",
                    confidence=0.93
                )
            )

        return {
            "status": "completed",
            "zones": zones,
            "recommended_zone": best_zone,
            "evidence": evidence,
            "summary": f"Identified {len(zones)} potential fishing zones. {best_zone.name if best_zone else 'None'} ranked highest."
        }