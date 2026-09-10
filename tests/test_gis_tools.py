# tests/test_gis_tools.py
import pytest
from shapely.geometry import Point, Polygon
from backend.tools.gis_tools import haversine_distance, check_all_geofences
from backend.data.seed_data import SEED_GEOFENCES
from backend.services.route_optimizer import calculate_safe_routes

def test_haversine_distance():
    # Mumbai (18.9220, 72.8347) to Ratnagiri (16.9902, 73.2848) ~ 219 km
    dist = haversine_distance(18.9220, 72.8347, 16.9902, 73.2848)
    assert 210 < dist < 230

def test_geofence_boundary_warning():
    # Point close to IMBL West (22.85, 68.49)
    status = check_all_geofences(22.85, 68.49, SEED_GEOFENCES)
    assert status["distance_to_boundary_km"] < 50.0
    assert status["nearest_zone_name"] != ""

def test_route_detour_around_naval_hazard():
    # Transit cutting directly through Western Naval Command range
    res = calculate_safe_routes(18.75, 72.68, 18.55, 72.68, "Alibag")
    assert res.recommended_route_id == "route_b_safe"
    assert len(res.routes) == 2
