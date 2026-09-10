# backend/api/chat.py
from fastapi import APIRouter, HTTPException
from backend.models.schemas import UserQuery, ChatResponse
from backend.agents.orchestrator import Orchestrator, CONVERSATION_SESSIONS

router = APIRouter(prefix="/api/chat", tags=["Chat & Copilot"])
orchestrator = Orchestrator()

@router.post("", response_model=ChatResponse)
async def chat_endpoint(query_body: UserQuery):
    """
    Main Agentic AI Copilot entrypoint.
    Executes dynamic workflow, agent orchestration, evidence fusion, and explainability.
    """
    try:
        response = orchestrator.process_query(query_body)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Agent orchestration failed: {str(e)}")

@router.get("/history/{conversation_id}")
async def get_history(conversation_id: str):
    """Retrieves conversation history and state."""
    session = CONVERSATION_SESSIONS.get(conversation_id)
    if not session:
        return {"conversation_id": conversation_id, "turns": 0, "history": []}
    return session