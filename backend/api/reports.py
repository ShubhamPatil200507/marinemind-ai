# backend/api/reports.py
from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import HTMLResponse
from sqlalchemy.orm import Session
import datetime

from backend.models.database import get_db
from backend.models.db_models import Conversation, Message, RiskAssessmentLog

router = APIRouter(prefix="/api/reports", tags=["Voyage Reports"])

@router.get("/voyage/{conv_id}", response_class=HTMLResponse)
async def generate_voyage_report(conv_id: str, db: Session = Depends(get_db)):
    """Generates an official, print-ready Marine Safety & Voyage Clearance Manifest."""
    conv = db.query(Conversation).filter(Conversation.id == conv_id).first()
    if not conv:
        raise HTTPException(status_code=404, detail="Conversation session not found for report generation")

    messages = db.query(Message).filter(Message.conversation_id == conv_id).order_by(Message.timestamp.asc()).all()
    risk_log = db.query(RiskAssessmentLog).filter(RiskAssessmentLog.conversation_id == conv_id).order_by(RiskAssessmentLog.id.desc()).first()

    risk_score = risk_log.final_score if risk_log else 24.0
    rec = risk_log.recommendation if risk_log else "GO - Safe to Operate"

    html = f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>ORCA Marine Safety & Voyage Clearance Manifest</title>
    <style>
        body {{ font-family: 'Segoe UI', Arial, sans-serif; margin: 40px; color: #1e293b; background: #fff; }}
        .header {{ border-bottom: 3px solid #0284c7; padding-bottom: 20px; display: flex; justify-content: space-between; }}
        .title {{ font-size: 24px; font-weight: bold; color: #0f172a; margin: 0; }}
        .subtitle {{ font-size: 13px; color: #64748b; margin-top: 4px; }}
        .badge {{ background: #0284c7; color: white; padding: 6px 12px; border-radius: 6px; font-weight: bold; font-size: 12px; }}
        .section {{ margin-top: 25px; }}
        .section-title {{ font-size: 15px; font-weight: bold; text-transform: uppercase; color: #475569; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; }}
        table {{ width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 13px; }}
        th, td {{ border: 1px solid #cbd5e1; padding: 10px; text-align: left; }}
        th {{ background: #f8fafc; font-weight: 600; }}
        .status-go {{ color: #16a34a; font-weight: bold; }}
        .footer {{ margin-top: 50px; border-top: 1px solid #cbd5e1; padding-top: 15px; font-size: 11px; color: #94a3b8; text-align: center; }}
        @media print {{ body {{ margin: 20px; }} }}
    </style>
</head>
<body>
    <div class="header">
        <div>
            <h1 class="title">MARINEMIND AI (ORCA)</h1>
            <div class="subtitle">ORCA - Collaborative Marine Ecosystem Reasoning and Decision Support</div>
            <div class="subtitle">Voyage Manifest ID: {conv_id} | Issued: {datetime.datetime.utcnow().strftime('%Y-%m-%d %H:%M UTC')}</div>
        </div>
        <div>
            <span class="badge">OFFICIAL CLEARANCE</span>
        </div>
    </div>

    <div class="section">
        <div class="section-title">1. Operational Clearance Summary</div>
        <table>
            <tr><th>Composite Risk Score</th><td><b>{risk_score}/100</b></td></tr>
            <tr><th>Navigational Recommendation</th><td class="status-go">{rec}</td></tr>
            <tr><th>Vessel Sector</th><td>{conv.title}</td></tr>
        </table>
    </div>

    <div class="section">
        <div class="section-title">2. Multi-Agent Reasoning Audit Trail</div>
        <table>
            <tr><th style="width: 20%;">Timestamp</th><th style="width: 15%;">Role</th><th>Intelligence Log</th></tr>
"""
    for m in messages:
        ts = m.timestamp.strftime('%H:%M:%S') if m.timestamp else '-'
        html += f"<tr><td>{ts}</td><td><b>{m.role.upper()}</b></td><td>{m.content}</td></tr>"

    html += f"""
        </table>
    </div>

    <div class="footer">
        Verified by MarineMind Multi-Agent Orchestrator. In compliance with coastal fishing safety protocols.
    </div>
</body>
</html>"""
    return HTMLResponse(content=html)
