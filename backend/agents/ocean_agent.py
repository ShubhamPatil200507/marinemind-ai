# backend/agents/ocean_agent.py
from typing import Dict, Any
from backend.models.schemas import OceanData, EvidenceItem
from backend.tools.marine_tools import get_ocean_analytics

class OceanAgent:
    """Satellite oceanographic analytics agent (SST, Chlorophyll-a, Currents)."""
    def __init__(self):
        self.name = "Ocean Analytics Agent"

    def execute(self, lat: float, lon: float) -> Dict[str, Any]:
        ocean_data = get_ocean_analytics(lat, lon)
        evidence = [
            EvidenceItem(
                source_agent=self.name,
                factor="Sea Surface Temperature (SST)",
                value=f"{ocean_data.sst_c} °C",
                impact="Favorable thermal gradient (optimal 26.5 - 28.5 °C)",
                confidence=0.88
            ),
            EvidenceItem(
                source_agent=self.name,
                factor="Chlorophyll-a Density",
                value=f"{ocean_data.chlorophyll_mg_m3} mg/m³",
                impact="High phytoplankton bloom indicating high fish concentration",
                confidence=0.86
            ),
            EvidenceItem(
                source_agent=self.name,
                factor="Ocean Productivity Score",
                value=f"{ocean_data.ocean_productivity_score}/100",
                impact="High pelagic yield potential",
                confidence=0.89
            )
        ]
        return {
            "status": "completed",
            "ocean": ocean_data,
            "evidence": evidence,
            "summary": ocean_data.analysis
        }