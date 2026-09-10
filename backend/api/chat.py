# backend/api/chat.py
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List, Dict, Any

from backend.models.schemas import UserQuery, ChatResponse
from backend.models.database import get_db
from backend.models.db_models import Conversation, Message
from backend.agents.orchestrator import Orchestrator

router = APIRouter(prefix="/api/chat", tags=["ORCA AI Copilot"])
orchestrator = Orchestrator()

@router.post("", response_model=ChatResponse)
async def process_chat(user_query: UserQuery, db: Session = Depends(get_db)):
    """Primary chat endpoint executing full collaborative agent pipeline with SQLite persistence."""
    try:
        response = orchestrator.process_query(user_query, db_session=db)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Orchestration processing failure: {str(e)}")

@router.get("/history")
async def list_conversations(db: Session = Depends(get_db)):
    """Retrieves all historical conversations stored in SQLite database."""
    convs = db.query(Conversation).order_by(Conversation.updated_at.desc()).limit(30).all()
    return [
        {
            "id": c.id,
            "title": c.title,
            "created_at": c.created_at.isoformat() if c.created_at else None,
            "updated_at": c.updated_at.isoformat() if c.updated_at else None,
            "message_count": len(c.messages)
        }
        for c in convs
    ]

@router.get("/history/{conv_id}")
async def get_conversation_history(conv_id: str, db: Session = Depends(get_db)):
    """Retrieves all message turns for a specific conversation session."""
    conv = db.query(Conversation).filter(Conversation.id == conv_id).first()
    if not conv:
        raise HTTPException(status_code=404, detail="Conversation session not found")

    messages = db.query(Message).filter(Message.conversation_id == conv_id).order_by(Message.timestamp.asc()).all()
    return {
        "conversation_id": conv.id,
        "title": conv.title,
        "created_at": conv.created_at.isoformat() if conv.created_at else None,
        "messages": [
            {
                "id": m.id,
                "role": m.role,
                "content": m.content,
                "structured_data": m.structured_data,
                "timestamp": m.timestamp.isoformat() if m.timestamp else None
            }
            for m in messages
        ]
    }

@router.delete("/history/{conv_id}")
async def delete_conversation(conv_id: str, db: Session = Depends(get_db)):
    """Deletes a conversation and its messages from SQLite."""
    conv = db.query(Conversation).filter(Conversation.id == conv_id).first()
    if not conv:
        raise HTTPException(status_code=404, detail="Conversation session not found")
    db.delete(conv)
    db.commit()
    return {"status": "success", "message": "Conversation deleted successfully"}
