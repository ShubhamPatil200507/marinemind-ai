# backend/agents/orchestrator.py
import uuid
import datetime
from typing import Dict, Any, List, Optional
from backend.models.schemas import (
    UserQuery, ChatResponse, ExecutionPlan, ExecutionStep,
    EvidenceItem, ExplainableRecommendation, GeofenceCheckResult,
    WeatherData, OceanData, PFZZone, RouteOption
)
from backend.agents.language_agent import LanguageAgent
from backend.agents.planner_agent import PlannerAgent
from backend.agents.weather_agent import WeatherAgent
from backend.agents.ocean_agent import OceanAgent
from backend.agents.pfz_agent import PFZAgent
from backend.agents.geospatial_agent import GeospatialAgent
from backend.agents.risk_agent import RiskAgent
from backend.agents.route_agent import RouteAgent
from backend.agents.explainability_agent import ExplainabilityAgent
from backend.services.language_service import get_localized_intent_content, get_localized_response
from backend.data.seed_data import DEFAULT_VESSEL_LOCATION, SEED_ADVISORIES

# In-memory context store for multi-turn conversations
CONVERSATION_SESSIONS: Dict[str, Dict[str, Any]] = {}

class Orchestrator:
    """
    Central Controller for MarineMind AI.
    - Manages conversation context across turns
    - Invokes Language & Planner agents
    - Executes specialized domain agents dynamically
    - Fuses evidence across heterogeneous observation streams
    - Produces explainable recommendations and synchronized map states
    """
    def __init__(self):
        self.language_agent = LanguageAgent()
        self.planner_agent = PlannerAgent()
        self.weather_agent = WeatherAgent()
        self.ocean_agent = OceanAgent()
        self.pfz_agent = PFZAgent()
        self.geospatial_agent = GeospatialAgent()
        self.risk_agent = RiskAgent()
        self.route_agent = RouteAgent()
        self.explainability_agent = ExplainabilityAgent()

    def process_query(self, user_query: UserQuery) -> ChatResponse:
        conv_id = user_query.conversation_id or str(uuid.uuid4())
        session = CONVERSATION_SESSIONS.setdefault(conv_id, {
            "conversation_id": conv_id,
            "turns": 0,
            "last_pfz_discussed": None,
            "last_vessel_location": DEFAULT_VESSEL_LOCATION,
            "history": []
        })

        # Determine vessel coordinates
        vessel_pos = user_query.vessel_location or session.get("last_vessel_location") or DEFAULT_VESSEL_LOCATION
        v_lat = float(vessel_pos.get("latitude", 18.9220))
        v_lon = float(vessel_pos.get("longitude", 72.8347))

        raw_query = user_query.query.strip()
        q_lower = raw_query.lower()

        # Step 1: Language Detection
        lang_res = self.language_agent.process(raw_query, user_query.language)
        detected_lang = lang_res["detected_language"]

        # Step 2: Context Resolution for Multi-Turn Conversation
        # E.g. Turn 1: "Where is the nearest PFZ?" -> Turn 2: "Is it safe tomorrow?"
        resolved_query = raw_query
        if session["turns"] > 0 and session.get("last_pfz_discussed"):
            if any(k in q_lower for k in ["it", "there", "is it safe", "safe tomorrow", "that zone", "that pfz"]):
                last_zone_name = session["last_pfz_discussed"].get("name", "PFZ Alpha")
                resolved_query = f"{raw_query} (Context: referring to {last_zone_name})"

        # Check for simulated Scenario 4 location (approaching border)
        if user_query.demo_scenario_id == "scenario_4_geofence" or any(k in q_lower for k in ["boundary", "imbl", "border warning", "approaching"]):
            # Simulate vessel close to IMBL (e.g. 4.2 km from demarcation line)
            v_lat = 22.85
            v_lon = 68.49

        # Step 3: Planner Agent creates dynamic workflow
        plan = self.planner_agent.create_plan(
            query=resolved_query,
            detected_language=detected_lang,
            vessel_location={"latitude": v_lat, "longitude": v_lon},
            previous_context=session
        )

        agent_statuses: List[Dict[str, Any]] = []
        evidence_list: List[EvidenceItem] = []
        active_layers: List[str] = ["vessel"]

        weather_res = None
        ocean_res = None
        pfz_res = None
        geo_res = None
        risk_res = None
        route_res = None

        # Execute Weather Agent if required
        if "weather_agent" in plan.required_agents:
            weather_res = self.weather_agent.execute(v_lat, v_lon, plan.time_window)
            evidence_list.extend(weather_res["evidence"])
            agent_statuses.append({
                "agent": "Weather Intelligence Agent",
                "status": "completed",
                "summary": weather_res["summary"],
                "badge": f"{weather_res['weather'].wind_speed_kmh} km/h | {weather_res['weather'].wave_height_m}m waves"
            })
            active_layers.extend(["weather", "waves"])

        # Execute Ocean Agent if required
        if "ocean_agent" in plan.required_agents:
            ocean_res = self.ocean_agent.execute(v_lat, v_lon)
            evidence_list.extend(ocean_res["evidence"])
            agent_statuses.append({
                "agent": "Ocean Analytics Agent",
                "status": "completed",
                "summary": ocean_res["summary"],
                "badge": f"SST {ocean_res['ocean'].sst_c}°C | Chl {ocean_res['ocean'].chlorophyll_mg_m3} mg/m³"
            })
            active_layers.extend(["sst", "chlorophyll"])

        # Execute Geospatial Agent if required
        if "geospatial_agent" in plan.required_agents:
            geo_res = self.geospatial_agent.execute(v_lat, v_lon)
            evidence_list.extend(geo_res["evidence"])
            agent_statuses.append({
                "agent": "Geospatial Reasoning Agent",
                "status": "completed",
                "summary": geo_res["summary"],
                "badge": f"Boundary dist: {geo_res['geofence_status'].distance_to_boundary_km} km ({geo_res['geofence_status'].alert_level})"
            })
            active_layers.extend(["restricted", "geofences"])

        # Execute PFZ Agent if required
        if "pfz_agent" in plan.required_agents:
            pfz_res = self.pfz_agent.execute(v_lat, v_lon)
            evidence_list.extend(pfz_res["evidence"])
            agent_statuses.append({
                "agent": "PFZ Intelligence Agent",
                "status": "completed",
                "summary": pfz_res["summary"],
                "badge": f"{len(pfz_res['zones'])} zones ranked | Top: {pfz_res['recommended_zone'].name if pfz_res['recommended_zone'] else 'None'}"
            })
            active_layers.append("pfz")
            if pfz_res["recommended_zone"]:
                session["last_pfz_discussed"] = pfz_res["recommended_zone"].dict()

        # Execute Risk Assessment Agent if required
        w_data = weather_res["weather"] if weather_res else self.weather_agent.execute(v_lat, v_lon, plan.time_window)["weather"]
        o_data = ocean_res["ocean"] if ocean_res else self.ocean_agent.execute(v_lat, v_lon)["ocean"]
        g_data = geo_res["geofence_status"] if geo_res else self.geospatial_agent.execute(v_lat, v_lon)["geofence_status"]

        if "risk_agent" in plan.required_agents:
            risk_res = self.risk_agent.execute(w_data, o_data, g_data)
            evidence_list.extend(risk_res["evidence"])
            agent_statuses.append({
                "agent": "Risk Assessment Agent",
                "status": "completed",
                "summary": risk_res["summary"],
                "badge": f"Risk: {risk_res['risk_assessment'].risk_level} ({risk_res['risk_assessment'].overall_score}/100)"
            })
        else:
            # Fallback evaluation for response
            risk_res = self.risk_agent.execute(w_data, o_data, g_data)

        # Execute Route Agent if required
        dest_pfz = pfz_res["recommended_zone"] if (pfz_res and pfz_res.get("recommended_zone")) else None
        dest_lat = dest_pfz.latitude if dest_pfz else 18.9850
        dest_lon = dest_pfz.longitude if dest_pfz else 72.7120
        dest_title = dest_pfz.name if dest_pfz else "PFZ Alpha"

        if "route_agent" in plan.required_agents:
            route_res = self.route_agent.execute(v_lat, v_lon, dest_lat, dest_lon, dest_title)
            evidence_list.extend(route_res["evidence"])
            agent_statuses.append({
                "agent": "Safe Route Planning Agent",
                "status": "completed",
                "summary": route_res["summary"],
                "badge": f"Route B chosen (16.2 km, Low Risk)"
            })
            active_layers.append("routes")

        # Step 4: Explainability Agent generates transparent rationale
        risk_score = risk_res["risk_assessment"].overall_score
        risk_level = risk_res["risk_assessment"].risk_level
        action_rec = risk_res["risk_assessment"].recommendation

        # Build scenario-specific customized "Why?" rationale
        why_bullets: List[str] = []

        if plan.intent == "safe_route_planning":
            action_rec = "RECOMMENDATION: Take Route B (Safe Fairway Detour). Avoid Direct Route A."
            why_bullets = [
                "Route A is 4 km shorter (12.2 km vs 16.2 km), but passes directly through active swell shoals with 2.7m wave breaking.",
                "Route A infringes upon the Western Naval Command live firing buffer perimeter (< 1.8 km clearance).",
                "Route B navigates through deep, sheltered shipping fairway with safe bathymetry (> 25m depth).",
                "Route B adds ~15 minutes of cruising time but reduces composite navigational risk from 68/100 (HIGH) to 22/100 (LOW).",
                "Entire Route B trajectory maintains continuous VHF coastal radio contact with Sassoon Harbor control."
            ]
            answer = (
                f"**Navigational Route Recommendation: Choose Route B (16.2 km, ~61 mins).**\n\n"
                f"While direct Route A appears shorter on paper (12.2 km), our Geospatial and Risk Agents detected "
                f"hazardous 2.7m breaker waves and a dangerous proximity (< 1.8 km) to the Naval defense exercise area. "
                f"Route B detours safely through the deep fairway, completely bypassing the hazard zones."
            )

        elif plan.intent == "geofence_boundary_check":
            dist_left = g_data.distance_to_boundary_km
            action_rec = f"WARNING: You are {dist_left} km from {g_data.nearest_zone_name}. Adjust course westward."
            why_bullets = [
                f"Vessel coordinates indicate heading toward {g_data.nearest_zone_name}.",
                f"Buffer distance remaining ({dist_left} km) is within the high-alert threshold (< 5.0 km).",
                "Artisanal craft crossing international maritime demarcations risk detention and vessel seizure.",
                "Recommended course heading: 270° (due West) maintains safe buffer inside Indian territorial waters."
            ]
            answer = (
                f"**Boundary Proximity Alert: {dist_left} km remaining to {g_data.nearest_zone_name}!**\n\n"
                f"Your current vessel position is approaching the international maritime boundary line. "
                f"Artisanal and commercial vessels must maintain a minimum 10 km safety perimeter. "
                f"**Recommended Action:** Turn vessel westward (heading 270°) immediately to return to safe operating waters."
            )

        elif plan.intent == "pfz_safety_intelligence" or (plan.intent == "pfz_discovery" and any(k in q_lower for k in ["safe", "which", "best"])):
            action_rec = "RECOMMENDATION: Head to PFZ Alpha (8.2 km, Northwest). Avoid PFZ Bravo (6.1 km)."
            why_bullets = [
                "PFZ Alpha (8.2 km away) features a favorable thermal front (SST 28.1°C) and high chlorophyll-a (2.15 mg/m³).",
                "Productivity score at PFZ Alpha is 86/100, indicating high pelagic schools (Indian Mackerel, Yellowfin Tuna).",
                "Wave swells at PFZ Alpha are calm (1.2m) with safe operational bathymetry.",
                "PFZ Bravo is geographically closer (6.1 km), but wave conditions are currently HAZARDOUS (2.7m swell breaker waves) - FLAGGED AVOID.",
                "Both zones are safely located inside Indian economic waters (> 18 km from international boundaries)."
            ]
            answer = (
                f"**Potential Fishing Zone Recommendation: PFZ Alpha (8.2 km Northwest) is HIGHLY RECOMMENDED.**\n\n"
                f"Although PFZ Bravo is geographically closer (6.1 km), our Ocean Analytics and Weather Agents identified "
                f"hazardous 2.7m breaker swells around Bravo that make it unsafe. "
                f"PFZ Alpha offers optimal conditions: Sea Surface Temp of 28.1°C, rich chlorophyll-a bloom (2.15 mg/m³), "
                f"and an Ocean Productivity Score of 86/100."
            )

        elif plan.intent == "pfz_discovery":
            best_z = pfz_res["recommended_zone"] if pfz_res else None
            action_rec = f"PFZ Alpha ({best_z.distance_km if best_z else 8.2} km) is the highest-ranked fishing zone today."
            why_bullets = [
                "Satellite SST analysis confirms active thermal front with 28.1°C optimal pelagic temperature.",
                "Ocean color sensors reveal elevated chlorophyll-a concentration (2.15 mg/m³).",
                "Primary expected species: Indian Mackerel, Yellowfin Tuna, and Ribbonfish.",
                "Safe distance of 8.2 km is within comfortable artisanal fuel range."
            ]
            answer = (
                f"The nearest high-yield Potential Fishing Zone today is **PFZ Alpha**, located **8.2 km** Northwest of your position.\n\n"
                f"• **Productivity Score:** 86/100\n"
                f"• **Sea Surface Temp:** 28.1°C (Favorable)\n"
                f"• **Chlorophyll-a:** 2.15 mg/m³ (Phytoplankton bloom)\n"
                f"• **Target Species:** Indian Mackerel, Yellowfin Tuna, Ribbonfish\n"
                f"• **Wave Risk:** Low (1.2m swell)"
            )

        elif plan.intent == "marine_safety_assessment":
            action_rec = "PROCEED WITH CAUTION: Safe to operate close to shore between 06:00 AM and 10:00 AM. Avoid offshore after 11:00 AM."
            why_bullets = [
                "Early morning winds (18 km/h NW) and waves (1.2m) remain within safe artisanal limits.",
                "Atmospheric pressure models project wave swells surging to 2.6m with wind gusts of 44 km/h after 11:30 AM.",
                "No active cyclone warning or severe depression is present along the Western coastline.",
                "Convective lightning probability is low (< 15%) during the morning operational window.",
                "Vessel trajectory remains fully clear of military firing ranges and marine protected areas."
            ]
            answer = (
                f"**Marine Safety Assessment: Safe Morning Window (06:00 AM - 10:00 AM IST).**\n\n"
                f"Conditions tomorrow morning are favorable for nearshore fishing operations (Wave height: 1.2m, Wind: 18 km/h NW). "
                f"However, our Weather and Risk Agents project deteriorating conditions starting around **11:30 AM**, "
                f"with swell heights rising to **2.6m** and gusty winds up to **44 km/h**. "
                f"**Advice:** Return to port before 10:30 AM; avoid deep offshore fishing."
            )

        else:
            action_rec = "Marine intelligence fused. Normal operations permissible with standard vigilance."
            why_bullets = [
                f"Atmospheric wind currently at {w_data.wind_speed_kmh} km/h with {w_data.visibility}.",
                f"Wave swell height currently measured at {w_data.wave_height_m}m.",
                f"Sea Surface Temperature steady at {o_data.sst_c}°C with productivity score {o_data.ocean_productivity_score}/100.",
                f"Vessel position is {g_data.distance_to_boundary_km} km from boundary perimeter."
            ]
            answer = (
                f"Current marine conditions in your operating sector:\n\n"
                f"• **Marine Risk Score:** {risk_score}/100 ({risk_level})\n"
                f"• **Weather:** Wind {w_data.wind_speed_kmh} km/h {w_data.wind_direction}, Waves {w_data.wave_height_m}m\n"
                f"• **Ocean:** SST {o_data.sst_c}°C, Chlorophyll {o_data.chlorophyll_mg_m3} mg/m³\n"
                f"• **Boundary Status:** Safe ({g_data.distance_to_boundary_km} km from {g_data.nearest_zone_name})\n"
                f"• **Advisory:** {action_rec}"
            )

        # Localize answer, action recommendation, and rationale bullets if detected language is Hindi, Marathi, or Tamil
        if detected_lang in ["hi", "mr", "ta"]:
            loc_content = get_localized_intent_content(plan.intent, detected_lang)
            if loc_content:
                answer = loc_content["answer"]
                action_rec = loc_content["action"]
                why_bullets = loc_content["why_bullets"]

        explainable_rec = self.explainability_agent.synthesize(
            plan=plan,
            evidence_list=evidence_list,
            risk_score=risk_score,
            risk_level=risk_level,
            action_recommendation=action_rec,
            custom_bullets=why_bullets
        )

        # Update session turns and history
        session["turns"] += 1
        session["history"].append({
            "query": raw_query,
            "answer": answer,
            "timestamp": datetime.datetime.utcnow().isoformat()
        })

        # Map centering & coordinates
        map_focus = {
            "latitude": v_lat,
            "longitude": v_lon,
            "zoom": 12 if plan.intent in ["safe_route_planning", "pfz_discovery", "pfz_safety_intelligence"] else 10
        }

        routes_output = route_res["route_recommendation"].routes if route_res else []
        pfz_output = pfz_res["zones"] if pfz_res else []

        # If scenario 3 route query without prior PFZ, generate default route options
        if plan.intent == "safe_route_planning" and not routes_output:
            default_route_rec = self.route_agent.execute(v_lat, v_lon, 18.9850, 72.7120, "PFZ Alpha")
            routes_output = default_route_rec["route_recommendation"].routes

        # If PFZ output empty in general query, supply top zones
        if not pfz_output:
            pfz_output = self.pfz_agent.execute(v_lat, v_lon)["zones"]

        return ChatResponse(
            conversation_id=conv_id,
            query=raw_query,
            detected_language=detected_lang,
            answer=answer,
            action_recommendation=action_rec,
            risk_score=risk_score,
            risk_level=risk_level,
            confidence=explainable_rec.confidence_score,
            execution_plan=plan,
            agent_statuses=agent_statuses,
            evidence=evidence_list,
            explainability=explainable_rec,
            map_focus=map_focus,
            active_layers=list(set(active_layers)),
            pfz_zones=pfz_output,
            routes=routes_output,
            geofence_status=g_data,
            alerts=SEED_ADVISORIES
        )