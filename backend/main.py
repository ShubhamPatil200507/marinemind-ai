# backend/main.py
import os
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
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

# Mount and serve built frontend SPA across local, container, and Render environments
def find_frontend_dist() -> str:
    candidates = [
        os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "frontend", "dist"),
        os.path.join(os.getcwd(), "frontend", "dist"),
        os.path.join(os.getcwd(), "dist"),
        os.path.abspath("frontend/dist"),
        "/app/frontend/dist"
    ]
    for c in candidates:
        if os.path.exists(os.path.join(c, "index.html")):
            print(f"[MarineMind AI] Serving frontend SPA from: {c}")
            return c
    return candidates[0]

frontend_dist = find_frontend_dist()
assets_dir = os.path.join(frontend_dist, "assets")

if os.path.exists(assets_dir):
    app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

@app.get("/{full_path:path}")
async def serve_spa(full_path: str):
    # Check if specific static file exists in dist
    file_path = os.path.join(frontend_dist, full_path)
    if full_path and os.path.isfile(file_path):
        return FileResponse(file_path)
    # Return index.html for root and SPA routes
    index_path = os.path.join(frontend_dist, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    return {
        "platform": "MarineMind AI (ORCA)",
        "tagline": "An Agentic AI Copilot for Safer, Smarter and Sustainable Marine Decision-Making",
        "status": "online",
        "version": "1.1.0",
        "docs_url": "/docs",
        "notice": "Frontend dist is building or missing index.html."
    }

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("backend.main:app", host="0.0.0.0", port=port, reload=True)
