# tests/test_imd_service.py
import pytest
from backend.services.imd_service import (
    resolve_coastal_sector,
    _derive_cyclone_status,
    _parse_html_bulletin,
    get_active_imd_alerts
)
from backend.models.schemas import CycloneStatus
from backend.tools.weather_tools import get_weather_forecast

def test_sector_resolution():
    # Mumbai -> Sector 4 (Maharashtra & Goa)
    assert resolve_coastal_sector(18.9220, 72.8347) == 4
    # Ratnagiri -> Sector 4 (Maharashtra & Goa)
    assert resolve_coastal_sector(16.9902, 73.2848) == 4
    # Veraval -> Sector 3 (Gujarat)
    assert resolve_coastal_sector(20.9077, 70.3679) == 3
    # Kochi -> Sector 2 (Kerala & Karnataka)
    assert resolve_coastal_sector(9.9312, 76.2673) == 2
    # Chennai -> Sector 6 (Tamil Nadu & Puducherry)
    assert resolve_coastal_sector(13.1250, 80.2980) == 6
    # Visakhapatnam -> Sector 7 (Andhra Pradesh)
    assert resolve_coastal_sector(17.6868, 83.2185) == 7
    # Digha / Kolkata -> Sector 1 (West Bengal)
    assert resolve_coastal_sector(21.6266, 87.5096) == 1

def test_derive_cyclone_status():
    # Active cyclone
    assert _derive_cyclone_status("VERY SEVERE CYCLONIC STORM OVER EASTCENTRAL ARABIAN SEA", "NIL") == CycloneStatus.ACTIVE_CYCLONE
    assert _derive_cyclone_status("NIL", "GREAT DANGER SIGNAL NUMBER VIII") == CycloneStatus.ACTIVE_CYCLONE

    # Warning
    assert _derive_cyclone_status("DEEP DEPRESSION OVER NORTH BAY OF BENGAL", "NIL") == CycloneStatus.WARNING
    assert _derive_cyclone_status("NIL", "LOCAL WARNING SIGNAL NUMBER IV") == CycloneStatus.WARNING

    # Watch
    assert _derive_cyclone_status("UPPER AIR CYCLONIC CIRCULATION OVER ARABIAN SEA", "NIL") == CycloneStatus.WATCH
    assert _derive_cyclone_status("NIL", "LOCAL CAUTIONARY SIGNAL NUMBER III") == CycloneStatus.WATCH

    # Clear / Normal
    assert _derive_cyclone_status("NIL", "NIL AT ALL PORTS") == CycloneStatus.NO_ACTIVE_ALERT
    assert _derive_cyclone_status("WEATHER SEASONAL OVER ARABIAN SEA", "NIL") == CycloneStatus.NO_ACTIVE_ALERT

def test_parse_html_bulletin_structure():
    mock_html = """
    <html>
      <table>
        <tr><td>Synoptic Situation</td><td>THE CYCLONIC CIRCULATION OVER ARABIAN SEA PERSISTS.</td></tr>
      </table>
      <table>
        <tr><td>Wind</td><td>NORTHERLY 15 TO 20 KNOTS GUSTING TO 25 KNOTS.</td></tr>
        <tr><td>Weather</td><td>SCATTERED RAIN/THUNDERSTORM.</td></tr>
        <tr><td>Visibility</td><td>MODERATE BECOMING POOR IN RAIN.</td></tr>
        <tr><td>Sea Condition</td><td>MODERATE TO ROUGH.</td></tr>
        <tr><td>Port Signal</td><td>LOCAL CAUTIONARY SIGNAL NUMBER III</td></tr>
        <tr><td>Storm Surge/Tidal Warning</td><td>SURGE OF 0.5M EXPECTED AT HIGH TIDE.</td></tr>
      </table>
      <table>
        <tr><td>Time of Issue</td><td>21:00 IST of 2026-10-03</td></tr>
      </table>
    </html>
    """
    parsed = _parse_html_bulletin(mock_html, sector_id=4)
    assert parsed["sector_id"] == 4
    assert parsed["sector_name"] == "Maharashtra & Goa Coast"
    assert "CYCLONIC CIRCULATION" in parsed["synoptic_situation"]
    assert "NORTHERLY" in parsed["primary_wind"]
    assert parsed["primary_sea"] == "MODERATE TO ROUGH."
    assert "SIGNAL NUMBER III" in parsed["primary_port_signal"]
    assert "0.5M" in parsed["storm_surge_warning"]
    assert parsed["cyclone_status"] == CycloneStatus.WATCH

def test_weather_tools_with_imd_bulletin():
    w = get_weather_forecast(18.9220, 72.8347)
    assert w is not None
    assert w.port_signal is not None
    assert w.imd_issuing_office is not None
    assert "ACWC" in w.imd_issuing_office or "Mumbai" in w.imd_issuing_office
    assert w.cyclone_status in [CycloneStatus.NO_ACTIVE_ALERT, CycloneStatus.WATCH, CycloneStatus.WARNING, CycloneStatus.ACTIVE_CYCLONE]
