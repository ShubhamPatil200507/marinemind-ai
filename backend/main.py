# backend/main.py
import os
import logging
import uvicorn
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from fastapi.exceptions import RequestValidationError
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from backend.models.database import init_db
from backend.api import chat, marine, weather, pfz, routes, geofence, alerts, scenarios, auth, reports

logging.basicConfig(
    level=os.environ.get("LOG_LEVEL", "INFO").upper(),
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger(__name__)

# Rate limiter — key by IP address
limiter = Limiter(key_func=get_remote_address)

app = FastAPI(
    title="MarineMind AI API",
    description="Agentic AI Marine Intelligence Platform: Multi-Agent Orchestration and Explainable Navigation Decision Support.",
    version="1.1.0"
)

# Attach rate limiter
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS — controlled by FRONTEND_URL env var (never wildcard + credentials)
_FRONTEND_URL = os.environ.get("FRONTEND_URL", "http://localhost:5173")
_ALLOWED_ORIGINS = [o.strip() for o in _FRONTEND_URL.split(",") if o.strip()]
# Always allow localhost for local dev
if "http://localhost:5173" not in _ALLOWED_ORIGINS:
    _ALLOWED_ORIGINS.append("http://localhost:5173")
if "http://127.0.0.1:5173" not in _ALLOWED_ORIGINS:
    _ALLOWED_ORIGINS.append("http://127.0.0.1:5173")

app.add_middleware(
    CORSMiddleware,
    allow_origins=_ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type", "Accept"],
)

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """Return clean validation errors — never expose stack traces."""
    return JSONResponse(
        status_code=422,
        content={
            "error": "Validation failed",
            "detail": exc.errors(),
            "hint": "Check your request parameters and try again."
        }
    )

@app.on_event("startup")
async def startup_event():
    init_db()
    logger.info("[MarineMind AI] Starting up...")
    logger.info(f"[MarineMind AI] CORS allowed origins: {_ALLOWED_ORIGINS}")
    logger.info("[MarineMind AI] JWT authentication: enforced (no default fallback)")
    logger.info("[MarineMind AI] Database: SQLite initialized")
    logger.info("[MarineMind AI] All systems ready.")

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
        "version": "1.1.0",
        "database": "sqlite_connected",
        "ai_engine": "autonomous_hybrid",
        "data_sources": {
            "weather": "Open-Meteo (LIVE when available, UNAVAILABLE status if not)",
            "chlorophyll": "MODELED — bio-optical SST proxy (not satellite)",
            "pfz": "DEMO — algorithmic estimation (not live INCOIS)",
            "cyclone": "UNKNOWN — no real-time cyclone API integrated",
            "geofence": "STATIC seed data"
        },
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
