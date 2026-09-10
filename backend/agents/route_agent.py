# backend/agents/route_agent.py
from typing import Dict, Any
from backend.models.schemas import RouteRecommendation, EvidenceItem
from backend.services.route_optimizer import calculate_safe_routes

class RouteAgent:
    """Safe route planning and multi-objective trajectory agent."""
    def __init__(self):
        self.name = "Safe Route Planning Agent"

    def execute(
        self,
        start_lat: float,
        start_lon: float,
        dest_lat: float,
        dest_lon: float,
        dest_name: str = "PFZ Alpha"
    ) -> Dict[str, Any]:
        recommendation = calculate_safe_routes(start_lat, start_lon, dest_lat, dest_lon, dest_name)
        recommended_route = next((r for r in recommendation.routes if r.is_recommended), recommendation.routes[0])
        direct_route = next((r for r in recommendation.routes if not r.is_recommended), None)

        evidence = [
            EvidenceItem(
                source_agent=self.name,
                factor="Recommended Trajectory",
                value=f"{recommended_route.name} ({recommended_route.distance_km} km, ~{recommended_route.travel_time_mins} min)",
                impact="Clear of 2.7m breaker shoals and maintains >5 km defense buffer",
                confidence=0.93
            )
        ]
        if direct_route:
            evidence.append(
                EvidenceItem(
                    source_agent=self.name,
                    factor="Avoided Trajectory",
                    value=f"{direct_route.name} ({direct_route.distance_km} km)",
                    impact="High Risk: Intersects swell breaking hazard corridor",
                    confidence=0.91
                )
            )

        return {
            "status": "completed",
            "route_recommendation": recommendation,
            "evidence": evidence,
            "summary": recommendation.explanation
        }