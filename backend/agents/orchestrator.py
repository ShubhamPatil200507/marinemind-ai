# backend/agents/orchestrator.py
import uuid
import datetime
from typing import Dict, Any, List, Optional
from sqlalchemy.orm import Session

from backend.models.schemas import (
    UserQuery, ChatResponse, ExecutionPlan, ExecutionStep,
    EvidenceItem, ExplainableRecommendation, GeofenceCheckResult,
    WeatherData, OceanData, PFZZone, RouteOption
)
from backend.models.database import SessionLocal
from backend.models.db_models import Conversation, Message, RiskAssessmentLog
from backend.agents.language_agent import LanguageAgent
from backend.agents.planner_agent import PlannerAgent
from backend.agents.weather_agent import WeatherAgent
from backend.agents.ocean_agent import OceanAgent
from backend.agents.pfz_agent import PFZAgent
from backend.agents.geospatial_agent import GeospatialAgent
from backend.agents.risk_agent import RiskAgent
from backend.agents.route_agent import RouteAgent
from backend.agents.explainability_agent import ExplainabilityAgent
from backend.services.ai_service import marine_ai_service
from backend.data.seed_data import DEFAULT_VESSEL_LOCATION, SEED_ADVISORIES

class Orchestrator:
    """
    Central Controller for MarineMind AI (ORCA).
    - Manages persistent conversation context in SQLite
    - Invokes Language & Planner agents
    - Executes specialized domain agents dynamically
    - Fuses multi-source telemetry and calculates 6-factor risk
    - Dynamically synthesizes explainable advice via MarineAIService
    - Logs assessment records into SQLite database
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

    def process_query(self, user_query: UserQuery, db_session: Optional[Session] = None) -> ChatResponse:
        db = db_session or SessionLocal()
        close_db_on_exit = (db_session is None)

        try:
            conv_id = user_query.conversation_id or f"conv_{uuid.uuid4().hex[:12]}"
            
            # Load or create conversation in SQLite
            db_conv = db.query(Conversation).filter(Conversation.id == conv_id).first()
            if not db_conv:
                db_conv = Conversation(
                    id=conv_id,
                    title=user_query.query[:40] if user_query.query else "Marine Consultation",
                    last_context={}
                )
                db.add(db_conv)
                db.commit()
                db.refresh(db_conv)

            session_context = db_conv.last_context or {}

            # Determine vessel coordinates
            vessel_pos = user_query.vessel_location or session_context.get("last_vessel_location") or DEFAULT_VESSEL_LOCATION
            v_lat = float(vessel_pos.get("latitude", 18.9220))
            v_lon = float(vessel_pos.get("longitude", 72.8347))

            raw_query = user_query.query.strip()

            # Step 1: Language Detection
            lang_res = self.language_agent.process(raw_query, user_query.language)
            detected_lang = lang_res["detected_language"]

            # Step 2: Context Resolution for Multi-Turn Conversation
            resolved_query = raw_query
            last_pfz = session_context.get("last_pfz_discussed")
            if last_pfz and any(k in raw_query.lower() for k in ["it", "there", "is it safe", "safe tomorrow", "that zone"]):
                resolved_query = f"{raw_query} (Context: referring to {last_pfz.get('name', 'PFZ Alpha')})"

            # Step 3: Planner Agent creates dynamic workflow
            plan = self.planner_agent.create_plan(
                query=resolved_query,
                detected_language=detected_lang,
                vessel_location={"latitude": v_lat, "longitude": v_lon},
                previous_context=session_context
            )

            # Update coordinates if planner extracted a specific port or coordinate
            if plan.location:
                v_lat = float(plan.location.get("latitude", v_lat))
                v_lon = float(plan.location.get("longitude", v_lon))

            agent_statuses: List[Dict[str, Any]] = []
            evidence_list: List[EvidenceItem] = []
            active_layers: List[str] = ["vessel"]

            # Execute Weather Agent
            weather_res = self.weather_agent.execute(v_lat, v_lon, plan.time_window)
            evidence_list.extend(weather_res["evidence"])
            w_data = weather_res["weather"]
            agent_statuses.append({
                "agent": "Weather Intelligence Agent",
                "status": "completed",
                "summary": weather_res["summary"],
                "badge": f"{w_data.wind_speed_kmh} km/h | {w_data.wave_height_m}m waves"
            })
            active_layers.extend(["weather", "waves"])

            # Execute Ocean Agent
            ocean_res = self.ocean_agent.execute(v_lat, v_lon)
            evidence_list.extend(ocean_res["evidence"])
            o_data = ocean_res["ocean"]
            agent_statuses.append({
                "agent": "Ocean Analytics Agent",
                "status": "completed",
                "summary": ocean_res["summary"],
                "badge": f"SST {o_data.sst_c}°C | Chl {o_data.chlorophyll_mg_m3} mg/m³"
            })
            active_layers.extend(["sst", "chlorophyll"])

            # Execute Geospatial Agent
            geo_res = self.geospatial_agent.execute(v_lat, v_lon)
            evidence_list.extend(geo_res["evidence"])
            g_data = geo_res["geofence_status"]
            agent_statuses.append({
                "agent": "Geospatial Reasoning Agent",
                "status": "completed",
                "summary": geo_res["summary"],
                "badge": f"Boundary dist: {g_data.distance_to_boundary_km} km ({g_data.alert_level})"
            })
            active_layers.extend(["restricted", "geofences"])

            # Execute PFZ Agent
            pfz_res = self.pfz_agent.execute(v_lat, v_lon)
            evidence_list.extend(pfz_res["evidence"])
            target_pfz = pfz_res["recommended_zone"]
            agent_statuses.append({
                "agent": "PFZ Intelligence Agent",
                "status": "completed",
                "summary": pfz_res["summary"],
                "badge": f"{len(pfz_res['zones'])} zones ranked | Top: {target_pfz.name if target_pfz else 'None'}"
            })
            active_layers.append("pfz")

            # Execute Risk Assessment Agent
            risk_res = self.risk_agent.execute(w_data, o_data, g_data)
            evidence_list.extend(risk_res["evidence"])
            r_data = risk_res["risk_assessment"]
            agent_statuses.append({
                "agent": "Risk Assessment Agent",
                "status": "completed",
                "summary": risk_res["summary"],
                "badge": f"Risk: {r_data.risk_level} ({r_data.overall_score}/100)"
            })

            # Execute Route Agent
            dest_lat = target_pfz.latitude if target_pfz else (v_lat + 0.08)
            dest_lon = target_pfz.longitude if target_pfz else (v_lon - 0.08)
            dest_name = target_pfz.name if target_pfz else "PFZ Alpha"
            route_res = self.route_agent.execute(v_lat, v_lon, dest_lat, dest_lon, dest_name)
            evidence_list.extend(route_res["evidence"])
            routes_list = route_res["route_recommendation"].routes
            agent_statuses.append({
                "agent": "Safe Route Planning Agent",
                "status": "completed",
                "summary": route_res["summary"],
                "badge": f"Safe passage analyzed ({len(routes_list)} options)"
            })
            active_layers.append("routes")

            # Step 4: Dynamic AI Synthesis via MarineAIService
            ai_output = marine_ai_service.generate_marine_advice(
                query=raw_query,
                plan=plan,
                weather=w_data,
                ocean=o_data,
                geofence=g_data,
                risk=r_data,
                target_zone=target_pfz,
                routes=routes_list,
                language=detected_lang
            )

            answer = ai_output["answer"]
            action_rec = ai_output["action"]
            why_bullets = ai_output["why_bullets"]

            explainable_rec = self.explainability_agent.synthesize(
                plan=plan,
                evidence_list=evidence_list,
                risk_score=r_data.overall_score,
                risk_level=r_data.risk_level,
                action_recommendation=action_rec,
                custom_bullets=why_bullets
            )

            # Step 5: Save Messages & Context to SQLite database
            user_msg = Message(
                conversation_id=conv_id,
                role="user",
                content=raw_query,
                timestamp=datetime.datetime.utcnow()
            )
            bot_msg = Message(
                conversation_id=conv_id,
                role="assistant",
                content=answer,
                structured_data={
                    "risk_score": r_data.overall_score,
                    "risk_level": r_data.risk_level,
                    "action": action_rec
                },
                timestamp=datetime.datetime.utcnow()
            )
            db.add(user_msg)
            db.add(bot_msg)

            # Log risk assessment
            risk_log = RiskAssessmentLog(
                conversation_id=conv_id,
                latitude=v_lat,
                longitude=v_lon,
                weather_risk=r_data.wind_risk,
                wave_risk=r_data.wave_risk,
                lightning_risk=r_data.lightning_risk,
                cyclone_risk=r_data.cyclone_risk,
                geofence_risk=r_data.geofence_risk,
                final_score=r_data.overall_score,
                recommendation=r_data.recommendation
            )
            db.add(risk_log)

            # Update conversation context
            db_conv.last_context = {
                "last_pfz_discussed": target_pfz.dict() if target_pfz else None,
                "last_vessel_location": {"latitude": v_lat, "longitude": v_lon},
                "last_risk_score": r_data.overall_score
            }
            db.commit()

            # Centering & Map Response
            map_focus = {
                "latitude": v_lat,
                "longitude": v_lon,
                "zoom": 11
            }

            return ChatResponse(
                conversation_id=conv_id,
                query=raw_query,
                detected_language=detected_lang,
                answer=answer,
                action_recommendation=action_rec,
                risk_score=r_data.overall_score,
                risk_level=r_data.risk_level,
                confidence=explainable_rec.confidence_score,
                execution_plan=plan,
                agent_statuses=agent_statuses,
                evidence=evidence_list,
                explainability=explainable_rec,
                map_focus=map_focus,
                active_layers=list(set(active_layers)),
                pfz_zones=pfz_res["zones"],
                routes=routes_list,
                geofence_status=g_data,
                alerts=SEED_ADVISORIES
            )
        finally:
            if close_db_on_exit:
                db.close()
