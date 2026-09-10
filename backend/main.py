# backend/main.py
import os
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.models.database import init_db
from backend.api import chat, marine, weather, pfz, routes, geofence, alerts, scenarios, auth, reports

app = FastAPI(
    title="MarineMind AI API",
    description="Agentic AI Marine Intelligence Platform: Satellite Earth Observation, Multi-Agent Orchestration, and Explainable Navigation Decision Support.",
    version="1.1.0"
)

# Enable CORS for frontend Vite development server & production builds
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    init_db()
    print("[MarineMind AI] Multi-Agent Engine, SQLite DB, and JWT security initialized.")

# Register API Routers
app.include_router(auth.router)
app.include_router(chat.router)
app.include_router(marine.router)
app.include_router(weather.router)
app.include_router(pfz.router)
app.include_router(routes.router)
app.include_router(geofence.router)
app.include_router(alerts.router)
app.include_router(scenarios.router)
app.include_router(reports.router)

@app.get("/")
async def root():
    return {
        "platform": "MarineMind AI (ORCA)",
        "tagline": "An Agentic AI Copilot for Safer, Smarter and Sustainable Marine Decision-Making",
        "status": "online",
        "version": "1.1.0",
        "docs_url": "/docs"
    }

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "database": "sqlite_connected",
        "ai_engine": "autonomous_hybrid",
        "agents": [
            "orchestrator", "planner_agent", "language_agent",
            "weather_agent", "ocean_agent", "pfz_agent",
            "geospatial_agent", "risk_agent", "route_agent",
            "explainability_agent"
        ]
    }

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("backend.main:app", host="0.0.0.0", port=port, reload=True)
