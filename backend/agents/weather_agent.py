# backend/agents/weather_agent.py
from typing import Dict, Any
from backend.models.schemas import WeatherData, EvidenceItem
from backend.tools.weather_tools import get_weather_forecast

class WeatherAgent:
    """Atmospheric and sea-state intelligence agent."""
    def __init__(self):
        self.name = "Weather Intelligence Agent"

    def execute(self, lat: float, lon: float, time_window: str = "now") -> Dict[str, Any]:
        weather_data = get_weather_forecast(lat, lon, time_window)
        evidence = [
            EvidenceItem(
                source_agent=self.name,
                factor="Wind Velocity",
                value=f"{weather_data.wind_speed_kmh} km/h ({weather_data.wind_direction})",
                impact="Favorable sea breeze" if weather_data.wind_speed_kmh < 25 else "Moderate wind turbulence",
                confidence=0.92
            ),
            EvidenceItem(
                source_agent=self.name,
                factor="Wave Height / Swell",
                value=f"{weather_data.wave_height_m} meters (Period: {weather_data.wave_period_s}s)",
                impact="Safe artisanal threshold" if weather_data.wave_height_m < 1.6 else "Hazardous breaker surge",
                confidence=0.90
            ),
            EvidenceItem(
                source_agent=self.name,
                factor="Cyclone Alert Status",
                value="Active Alert: False" if not weather_data.cyclone_alert else "CYCLONE WARNING",
                impact="Clear of tropical cyclonic depression",
                confidence=0.95
            )
        ]
        return {
            "status": "completed",
            "weather": weather_data,
            "evidence": evidence,
            "summary": weather_data.forecast_summary
        }