# backend/api/scenarios.py
from fastapi import APIRouter, HTTPException
from backend.data.seed_data import DEMO_SCENARIOS, DEFAULT_VESSEL_LOCATION
from backend.agents.orchestrator import Orchestrator
from backend.models.schemas import UserQuery

router = APIRouter(prefix="/api/scenarios", tags=["Hackathon Demo Scenarios"])
orchestrator = Orchestrator()

@router.get("")
async def list_demo_scenarios():
    """Lists the 4 verified hackathon demo scenarios."""
    return DEMO_SCENARIOS

@router.post("/{scenario_id}/trigger")
async def trigger_scenario(scenario_id: str, language: str = "en"):
    """Triggers autonomous execution of one of the 4 hackathon demo scenarios with localization support."""
    scenarios_dict = {s["id"]: s for s in DEMO_SCENARIOS}
    target_scenario = scenarios_dict.get(scenario_id)
    if not target_scenario:
        raise HTTPException(status_code=404, detail=f"Demo scenario {scenario_id} not found")

    vessel_loc = DEFAULT_VESSEL_LOCATION.copy()
    if scenario_id == "scenario_4_geofence":
        # Place vessel close to IMBL
        vessel_loc = {"latitude": 22.85, "longitude": 68.49, "name": "Kutch Sector (Near IMBL)", "heading_deg": 245}

    query_payload = UserQuery(
        query=target_scenario["query"],
        demo_scenario_id=scenario_id,
        vessel_location=vessel_loc,
        language=language
    )
    result = orchestrator.process_query(query_payload)
    return {
        "scenario": target_scenario,
        "execution_result": result
    }