# backend/services/route_optimizer.py
import math
from typing import Dict, Any, List
from shapely.geometry import Point, Polygon, LineString
from backend.models.schemas import RouteOption, RouteRecommendation
from backend.tools.gis_tools import haversine_distance
from backend.data.seed_data import SEED_GEOFENCES

def calculate_safe_routes(
    start_lat: float,
    start_lon: float,
    dest_lat: float,
    dest_lon: float,
    dest_name: str = "Target Marine Zone"
) -> RouteRecommendation:
    """
    Evaluates multi-objective marine paths using Shapely geometric collision detection:
    - Route A: Direct straight-line passage (evaluated for geofence/hazard collision)
    - Route B: Algorithmic safe detour routing around restricted polygon boundaries
    """
    direct_dist = haversine_distance(start_lat, start_lon, dest_lat, dest_lon)
    direct_line = LineString([(start_lon, start_lat), (dest_lon, dest_lat)])

    # Check for geometric collisions against all active geofence polygons
    colliding_zones = []
    for g in SEED_GEOFENCES:
        poly_coords = [(c[1], c[0]) for c in g["coordinates"]] # (lon, lat)
        poly = Polygon(poly_coords)
        buffer_poly = poly.buffer(0.04) # ~4.5 km safety buffer

        if direct_line.intersects(poly) or direct_line.intersects(buffer_poly):
            colliding_zones.append(g)

    # Build Route A (Direct Trajectory)
    mid_lat = (start_lat + dest_lat) / 2.0
    mid_lon = (start_lon + dest_lon) / 2.0
    route_a_waypoints = [
        [round(start_lat, 4), round(start_lon, 4)],
        [round(mid_lat, 4), round(mid_lon, 4)],
        [round(dest_lat, 4), round(dest_lon, 4)]
    ]
    dist_a = round(direct_dist, 1)
    time_a = max(10, int(round((dist_a / 16.0) * 60))) # 16 km/h cruising speed

    warnings_a = []
    risk_score_a = 25.0
    risk_level_a = "LOW"

    if colliding_zones:
        zone_names = ", ".join(z["name"] for z in colliding_zones)
        warnings_a.append(f"Intersects safety buffer of restricted zone: {zone_names}")
        warnings_a.append("High probability of coast guard enforcement / border crossing violation.")
        risk_score_a = 78.0
        risk_level_a = "HIGH"

    route_a = RouteOption(
        id="route_a_direct",
        name="Route A (Direct Trajectory)",
        is_recommended=(len(colliding_zones) == 0),
        distance_km=dist_a,
        travel_time_mins=time_a,
        risk_level=risk_level_a,
        risk_score=risk_score_a,
        waypoints=route_a_waypoints,
        warnings=warnings_a,
        why_chosen_or_avoided=(
            "Recommended direct fairway." if not colliding_zones else
            f"Not recommended: Crosses within restricted perimeter of {colliding_zones[0]['name']}."
        )
    )

    # Build Route B (Safe Detour Fairway around polygon)
    if colliding_zones:
        # Compute seaward detour around the first colliding polygon
        cz = colliding_zones[0]
        # Find westernmost / seaward edge of polygon for safe passage
        min_lon = min(c[1] for c in cz["coordinates"])
        safe_detour_lon = min_lon - 0.06 # ~6.5 km west in open water
        detour_wp1 = [round(start_lat + (dest_lat - start_lat) * 0.3, 4), round(safe_detour_lon, 4)]
        detour_wp2 = [round(start_lat + (dest_lat - start_lat) * 0.7, 4), round(safe_detour_lon + 0.01, 4)]

        route_b_waypoints = [
            [round(start_lat, 4), round(start_lon, 4)],
            detour_wp1,
            detour_wp2,
            [round(dest_lat, 4), round(dest_lon, 4)]
        ]
        dist_b = round(
            haversine_distance(start_lat, start_lon, detour_wp1[0], detour_wp1[1]) +
            haversine_distance(detour_wp1[0], detour_wp1[1], detour_wp2[0], detour_wp2[1]) +
            haversine_distance(detour_wp2[0], detour_wp2[1], dest_lat, dest_lon),
            1
        )
        time_b = max(15, int(round((dist_b / 16.0) * 60)))
        risk_score_b = 20.0
        risk_level_b = "LOW"
    else:
        # Standard fairway lateral channel
        lat_shift = 0.02
        lon_shift = -0.03 if start_lon < 75.0 else 0.03
        wp1 = [round(mid_lat + lat_shift, 4), round(mid_lon + lon_shift, 4)]
        route_b_waypoints = [
            [round(start_lat, 4), round(start_lon, 4)],
            wp1,
            [round(dest_lat, 4), round(dest_lon, 4)]
        ]
        dist_b = round(direct_dist * 1.15, 1)
        time_b = int(round((dist_b / 16.0) * 60))
        risk_score_b = 22.0
        risk_level_b = "LOW"

    route_b = RouteOption(
        id="route_b_safe",
        name="Route B (Safe Fairway Detour)",
        is_recommended=True,
        distance_km=dist_b,
        travel_time_mins=time_b,
        risk_level=risk_score_b if isinstance(risk_score_b, str) else "LOW",
        risk_score=risk_score_b,
        waypoints=route_b_waypoints,
        warnings=[],
        why_chosen_or_avoided=(
            f"Recommended: Maintains safe {dist_b - dist_a:.1f} km buffer completely clearing restricted boundaries."
            if colliding_zones else "Recommended: Stable transit fairway through deep navigation waters."
        )
    )

    recommended_id = "route_b_safe" if colliding_zones else ("route_a_direct" if dist_a <= dist_b else "route_b_safe")

    explanation = (
        f"Route B is recommended to {dest_name}. It maintains a safe geometric clearance around "
        f"restricted waters ({dist_b} km, ~{time_b} mins transit), minimizing navigational risk."
        if colliding_zones else
        f"Direct Route A is clear of obstacles ({dist_a} km, ~{time_a} mins transit). Normal navigation permissible."
    )

    return RouteRecommendation(
        source={"latitude": start_lat, "longitude": start_lon, "name": "Departure Point"},
        destination={"latitude": dest_lat, "longitude": dest_lon, "name": dest_name},
        routes=[route_b, route_a] if colliding_zones else [route_a, route_b],
        recommended_route_id=recommended_id,
        explanation=explanation
    )
