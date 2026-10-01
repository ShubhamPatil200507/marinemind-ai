# backend/agents/orchestrator.py
import uuid
import time
import datetime
import logging
from typing import Dict, Any, List, Optional
from sqlalchemy.orm import Session

from backend.models.schemas import (
    UserQuery, ChatResponse, ExecutionPlan, ExecutionStep,
    EvidenceItem, ExplainableRecommendation, GeofenceCheckResult,
    WeatherData, OceanData, PFZZone, RouteOption,
    AgentExecutionRecord, DataStatus, CycloneStatus, DataProvenance
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

logger = logging.getLogger(__name__)


def _run_agent(name: str, fn, *args, **kwargs):
    """
    Isolated agent executor. Returns (result, record).
    On failure: returns (None, AgentExecutionRecord with status='failed').
    On success: returns (result, AgentExecutionRecord with status='completed').
    """
    start = time.monotonic()
    try:
        result = fn(*args, **kwargs)
        duration = int((time.monotonic() - start) * 1000)
        record = AgentExecutionRecord(
            agent=name,
            status="completed",
            summary=result.get("summary", ""),
            badge=result.get("badge", ""),
            duration_ms=duration
        )
        return result, record
    except Exception as exc:
        duration = int((time.monotonic() - start) * 1000)
        logger.error(f"[Orchestrator] Agent '{name}' failed: {exc}", exc_info=True)
        record = AgentExecutionRecord(
            agent=name,
            status="failed",
            summary=f"Agent failed: {type(exc).__name__}",
            error=str(exc)[:200],
            duration_ms=duration
        )
        return None, record


class Orchestrator:
    """
    Central Controller for MarineMind AI (ORCA).

    - Selectively executes ONLY the agents listed in plan.required_agents
    - Isolates agent failures so partial results are returned instead of 500 errors
    - Tracks execution trace (which agents ran, which were skipped, which failed)
    - Manages persistent conversation context in SQLite
    - Logs assessment records for analytics
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

            # Validate coordinate ranges
            v_lat = max(-90.0, min(90.0, v_lat))
            v_lon = max(-180.0, min(180.0, v_lon))

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
                v_lat = max(-90.0, min(90.0, float(plan.location.get("latitude", v_lat))))
                v_lon = max(-180.0, min(180.0, float(plan.location.get("longitude", v_lon))))

            # =========================================================
            # SELECTIVE AGENT EXECUTION
            # Only agents listed in plan.required_agents are executed.
            # Each agent runs in isolation — failure = partial result.
            # =========================================================
            required = set(plan.required_agents)
            execution_trace: List[AgentExecutionRecord] = []
            evidence_list: List[EvidenceItem] = []
            active_layers: List[str] = ["vessel"]
            data_warnings: List[str] = []

            # Default fallback data structures
            w_data = WeatherData()
            o_data = OceanData()
            g_data = GeofenceCheckResult()
            pfz_res_full: Dict[str, Any] = {"zones": [], "recommended_zone": None, "evidence": [], "summary": "PFZ agent not executed"}
            routes_list: List[RouteOption] = []
            r_data = None

            # ── Weather Agent ─────────────────────────────────────────
            if "weather_agent" in required or not required:
                w_res, w_rec = _run_agent(
                    "Weather Intelligence Agent",
                    self.weather_agent.execute,
                    v_lat, v_lon, plan.time_window
                )
                execution_trace.append(w_rec)
                if w_res:
                    evidence_list.extend(w_res.get("evidence", []))
                    w_data = w_res["weather"]
                    w_rec.badge = f"{w_data.wind_speed_kmh} km/h | {w_data.wave_height_m}m waves"
                    active_layers.extend(["weather", "waves"])
                    # Warn if data is not live
                    if hasattr(w_data, 'provenance') and w_data.provenance.status != DataStatus.LIVE:
                        data_warnings.append(
                            f"Weather data status: {w_data.provenance.status.value} — {w_data.provenance.note or 'Not live'}"
                        )
                    # Warn about cyclone status
                    if w_data.cyclone_status == CycloneStatus.UNKNOWN:
                        data_warnings.append(
                            "Cyclone status: UNKNOWN — No real-time cyclone monitoring source integrated. "
                            "Check IMD (imd.gov.in) for official cyclone advisories."
                        )
                else:
                    data_warnings.append("Weather agent failed — using default fallback values. Do NOT rely on these for navigation.")
            else:
                execution_trace.append(AgentExecutionRecord(
                    agent="Weather Intelligence Agent", status="skipped",
                    summary="Not required for this query type"
                ))

            # ── Ocean Agent ───────────────────────────────────────────
            if "ocean_agent" in required or not required:
                o_res, o_rec = _run_agent(
                    "Ocean Analytics Agent",
                    self.ocean_agent.execute,
                    v_lat, v_lon
                )
                execution_trace.append(o_rec)
                if o_res:
                    evidence_list.extend(o_res.get("evidence", []))
                    o_data = o_res["ocean"]
                    o_rec.badge = f"SST {o_data.sst_c}°C | Chl {o_data.chlorophyll_mg_m3} mg/m³"
                    active_layers.extend(["sst", "chlorophyll"])
                    # Note chlorophyll is modeled, not satellite
                    data_warnings.append(
                        "Chlorophyll data: MODELED (bio-optical SST proxy) — not direct satellite-observed chlorophyll"
                    )
                else:
                    data_warnings.append("Ocean agent failed — using default ocean values.")
            else:
                execution_trace.append(AgentExecutionRecord(
                    agent="Ocean Analytics Agent", status="skipped",
                    summary="Not required for this query type"
                ))

            # ── Geospatial Agent ──────────────────────────────────────
            if "geospatial_agent" in required or not required:
                g_res, g_rec = _run_agent(
                    "Geospatial Reasoning Agent",
                    self.geospatial_agent.execute,
                    v_lat, v_lon
                )
                execution_trace.append(g_rec)
                if g_res:
                    evidence_list.extend(g_res.get("evidence", []))
                    g_data = g_res["geofence_status"]
                    g_rec.badge = f"Boundary dist: {g_data.distance_to_boundary_km} km ({g_data.alert_level})"
                    active_layers.extend(["restricted", "geofences"])
                else:
                    data_warnings.append("Geospatial agent failed — geofence status unknown. Manually verify boundaries.")
            else:
                execution_trace.append(AgentExecutionRecord(
                    agent="Geospatial Reasoning Agent", status="skipped",
                    summary="Not required for this query type"
                ))

            # ── PFZ Agent ─────────────────────────────────────────────
            if "pfz_agent" in required or not required:
                p_res, p_rec = _run_agent(
                    "PFZ Intelligence Agent",
                    self.pfz_agent.execute,
                    v_lat, v_lon
                )
                execution_trace.append(p_rec)
                if p_res:
                    pfz_res_full = p_res
                    evidence_list.extend(p_res.get("evidence", []))
                    target_pfz = p_res.get("recommended_zone")
                    p_rec.badge = f"{len(p_res['zones'])} zones | Top: {target_pfz.name if target_pfz else 'None'}"
                    active_layers.append("pfz")
                    # Note PFZ is demo data
                    data_warnings.append(
                        "PFZ zones: DEMO data — algorithmic estimation only. Not live INCOIS satellite PFZ advisory."
                    )
                else:
                    target_pfz = None
                    data_warnings.append("PFZ agent failed — fishing zone recommendations unavailable.")
            else:
                target_pfz = None
                execution_trace.append(AgentExecutionRecord(
                    agent="PFZ Intelligence Agent", status="skipped",
                    summary="Not required for this query type"
                ))

            # ── Risk Agent ────────────────────────────────────────────
            if "risk_agent" in required or not required:
                r_res, r_rec = _run_agent(
                    "Risk Assessment Agent",
                    self.risk_agent.execute,
                    w_data, o_data, g_data
                )
                execution_trace.append(r_rec)
                if r_res:
                    evidence_list.extend(r_res.get("evidence", []))
                    r_data = r_res["risk_assessment"]
                    r_rec.badge = f"Risk: {r_data.risk_level} ({r_data.overall_score}/100)"
                else:
                    data_warnings.append("Risk assessment failed — overall risk score unavailable.")
            else:
                execution_trace.append(AgentExecutionRecord(
                    agent="Risk Assessment Agent", status="skipped",
                    summary="Not required for this query type"
                ))

            # ── Route Agent ───────────────────────────────────────────
            if "route_agent" in required or not required:
                dest_lat = target_pfz.latitude if target_pfz else (v_lat + 0.08)
                dest_lon = target_pfz.longitude if target_pfz else (v_lon - 0.08)
                dest_name = target_pfz.name if target_pfz else "PFZ Alpha"
                rt_res, rt_rec = _run_agent(
                    "Safe Route Planning Agent",
                    self.route_agent.execute,
                    v_lat, v_lon, dest_lat, dest_lon, dest_name
                )
                execution_trace.append(rt_rec)
                if rt_res:
                    evidence_list.extend(rt_res.get("evidence", []))
                    routes_list = rt_res["route_recommendation"].routes
                    rt_rec.badge = f"Safe passage analyzed ({len(routes_list)} options)"
                    active_layers.append("routes")
            else:
                execution_trace.append(AgentExecutionRecord(
                    agent="Safe Route Planning Agent", status="skipped",
                    summary="Not required for this query type"
                ))

            # Step 4: Dynamic AI Synthesis via MarineAIService
            # Provide safe fallbacks if risk_agent didn't run
            if r_data is None:
                from backend.models.schemas import MarineRiskAssessment
                r_data = MarineRiskAssessment(
                    overall_score=0.0,
                    risk_level="UNKNOWN",
                    confidence=0.0,
                    wave_risk=0.0,
                    wind_risk=0.0,
                    lightning_risk=0.0,
                    cyclone_risk=0.0,
                    geofence_risk=0.0,
                    visibility_risk=0.0,
                    recommendation="Risk assessment unavailable — consult Coast Guard before departure.",
                    data_gaps=["Risk agent did not execute"]
                )

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

            # Append data warnings to answer if critical
            if data_warnings:
                critical_warnings = [w for w in data_warnings if "NOT" in w or "UNAVAILABLE" in w or "DEMO" in w]
                if critical_warnings:
                    answer += "\n\n⚠️ **Data Quality Notes:**\n" + "\n".join(f"• {w}" for w in critical_warnings[:3])

            explainable_rec = self.explainability_agent.synthesize(
                plan=plan,
                evidence_list=evidence_list,
                risk_score=r_data.overall_score,
                risk_level=r_data.risk_level,
                action_recommendation=action_rec,
                custom_bullets=why_bullets
            )

            # Step 5: Save Messages & Context to SQLite database
            try:
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
            except Exception as db_exc:
                logger.error(f"[Orchestrator] DB persistence failed: {db_exc}", exc_info=True)
                # Do not let DB errors block the response
                try:
                    db.rollback()
                except Exception:
                    pass

            # Build agent_statuses for backward compat (from execution_trace)
            agent_statuses = [
                {
                    "agent": rec.agent,
                    "status": rec.status,
                    "summary": rec.summary,
                    "badge": rec.badge
                }
                for rec in execution_trace
            ]

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
                pfz_zones=pfz_res_full.get("zones", []),
                routes=routes_list,
                geofence_status=g_data,
                alerts=SEED_ADVISORIES,
                execution_trace=execution_trace,
                data_warnings=data_warnings
            )
        finally:
            if close_db_on_exit:
                db.close()
