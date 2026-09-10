import pytest
from backend.tools.weather_tools import get_weather_forecast, get_compass_direction

def test_compass_directions():
    assert get_compass_direction(0) == "N"
    assert get_compass_direction(90) == "E"
    assert get_compass_direction(180) == "S"
    assert get_compass_direction(270) == "W"

def test_weather_hourly_aggregation():
    wf_now = get_weather_forecast(18.9220, 72.8347, time_window="now")
    wf_morning = get_weather_forecast(18.9220, 72.8347, time_window="morning")
    assert wf_now.temperature_c > 15.0
    assert wf_now.wave_height_m >= 0.0
    assert wf_morning.forecast_summary != ""
