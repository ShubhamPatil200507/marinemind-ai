# backend/agents/risk_agent.py
from typing import Dict, Any
from backend.models.schemas import WeatherData, OceanData, GeofenceCheckResult, MarineRiskAssessment, EvidenceItem
from backend.services.risk_engine import calculate_marine_risk

class RiskAgent:
    """Marine Risk Assessment Agent: fuses atmospheric, hydrodynamic, and spatial boundaries."""
    def __init__(self):
        self.name = "Risk Assessment Agent"

    def execute(
        self,
        weather: WeatherData,
        ocean: OceanData,
        geofence: GeofenceCheckResult
    ) -> Dict[str, Any]:
        assessment = calculate_marine_risk(weather, ocean, geofence)
        evidence = [
            EvidenceItem(
                source_agent=self.name,
                factor="Composite Marine Risk Score",
                value=f"{assessment.overall_score}/100 ({assessment.risk_level})",
                impact=assessment.recommendation,
                confidence=assessment.confidence
            )
        ]
        for factor in assessment.major_factors[:3]:
            evidence.append(
                EvidenceItem(
                    source_agent=self.name,
                    factor=f"Risk Factor: {factor['factor']}",
                    value=f"+{factor['points']} pts ({factor['description']})",
                    impact="Weighted risk contribution",
                    confidence=0.88
                )
            )

        return {
            "status": "completed",
            "risk_assessment": assessment,
            "evidence": evidence,
            "summary": f"Marine Risk: {assessment.risk_level} ({assessment.overall_score}/100). {assessment.recommendation}"
        }