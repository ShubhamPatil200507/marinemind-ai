# backend/api/weather.py
from fastapi import APIRouter
from backend.tools.weather_tools import get_weather_forecast

router = APIRouter(prefix="/api/weather", tags=["Weather Intelligence"])

@router.get("/current")
async def get_current_weather(lat: float = 18.9220, lon: float = 72.8347):
    """Fetches verified marine weather for specified coordinates."""
    return get_weather_forecast(lat, lon, "now")

@router.get("/forecast")
async def get_forecast(lat: float = 18.9220, lon: float = 72.8347, time_window: str = "tomorrow_morning"):
    """Fetches future temporal marine forecast."""
    return get_weather_forecast(lat, lon, time_window)