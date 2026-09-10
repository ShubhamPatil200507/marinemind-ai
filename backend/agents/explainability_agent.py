# backend/agents/explainability_agent.py
from typing import List, Dict, Any
from backend.models.schemas import ExplainableRecommendation, EvidenceItem, ExecutionPlan

class ExplainabilityAgent:
    """
    Synthesizes all domain intelligence into transparent, verifiable reasoning.
    Explicitly answers: 'WHY was this recommendation generated?'
    """
    def __init__(self):
        self.name = "Explainability Agent"

    def synthesize(
        self,
        plan: ExecutionPlan,
        evidence_list: List[EvidenceItem],
        risk_score: float,
        risk_level: str,
        action_recommendation: str,
        custom_bullets: List[str] = None
    ) -> ExplainableRecommendation:
        if custom_bullets:
            why_bullets = custom_bullets
        else:
            why_bullets = []
            for ev in evidence_list[:5]:
                why_bullets.append(f"{ev.factor}: {ev.value} - {ev.impact}.")

        # Compute aggregate confidence
        avg_confidence = round(
            sum(e.confidence for e in evidence_list) / max(len(evidence_list), 1),
            2
        ) if evidence_list else 0.85

        return ExplainableRecommendation(
            action_recommendation=action_recommendation,
            confidence_score=avg_confidence,
            why_bullets=why_bullets,
            key_evidence=evidence_list,
            critical_safety_notice="Decision Support Notice: MarineMind AI is an advisory copilot. Fishermen must always obey official INCOIS, IMD, and Indian Coast Guard warnings before departing port."
        )