# backend/tools/gis_tools.py
import math
from typing import List, Tuple, Dict, Any, Optional
from shapely.geometry import Point, Polygon, LineString

def haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Calculates great-circle distance between two geographic coordinates in kilometers."""
    R = 6371.0 # Earth's radius in km
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = (math.sin(dlat / 2.0) ** 2 +
         math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) *
         math.sin(dlon / 2.0) ** 2)
    c = 2.0 * math.atan2(math.sqrt(a), math.sqrt(1.0 - a))
    return round(R * c, 2)

def calculate_bearing(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Calculates forward azimuth / bearing from point 1 to point 2 in degrees (0-360)."""
    phi1 = math.radians(lat1)
    phi2 = math.radians(lat2)
    delta_lambda = math.radians(lon2 - lon1)
    y = math.sin(delta_lambda) * math.cos(phi2)
    x = (math.cos(phi1) * math.sin(phi2) -
         math.sin(phi1) * math.cos(phi2) * math.cos(delta_lambda))
    bearing = (math.degrees(math.atan2(y, x)) + 360.0) % 360.0
    return round(bearing, 1)

def point_in_polygon(lat: float, lon: float, polygon_coords: List[List[float]]) -> bool:
    """Checks if a lat/lon point is inside a polygon boundary using Shapely."""
    try:
        # Shapely coordinates are (x, y) = (lon, lat)
        poly = Polygon([(p[1], p[0]) for p in polygon_coords])
        pt = Point(lon, lat)
        return poly.contains(pt)
    except Exception:
        return False

def distance_to_linestring(lat: float, lon: float, linestring_coords: List[List[float]]) -> float:
    """Calculates perpendicular distance in km from a point to a segmented boundary line (e.g. IMBL)."""
    pt = Point(lon, lat)
    min_dist_km = float('inf')
    for i in range(len(linestring_coords) - 1):
        p1 = linestring_coords[i]
        p2 = linestring_coords[i+1]
        line = LineString([(p1[1], p1[0]), (p2[1], p2[0])])
        # Project distance in degrees converted to approximate km (1 deg ~ 111 km at tropics)
        proj_dist_deg = line.distance(pt)
        # Accurate midpoint latitude conversion
        mid_lat = (p1[0] + p2[0]) / 2.0
        dist_km = proj_dist_deg * 111.32 * math.cos(math.radians(mid_lat))
        if dist_km < min_dist_km:
            min_dist_km = dist_km
    return round(max(min_dist_km, 0.0), 2)

def distance_to_polygon(lat: float, lon: float, polygon_coords: List[List[float]]) -> float:
    """Calculates distance in km from a point to a polygon boundary."""
    try:
        poly = Polygon([(p[1], p[0]) for p in polygon_coords])
        pt = Point(lon, lat)
        if poly.contains(pt):
            return 0.0
        dist_deg = poly.exterior.distance(pt)
        dist_km = dist_deg * 111.0
        return round(dist_km, 2)
    except Exception:
        return 999.0

def route_intersects_polygon(route_points: List[List[float]], polygon_coords: List[List[float]]) -> bool:
    """Checks if a route line intersects a hazard or restricted polygon."""
    try:
        route_line = LineString([(p[1], p[0]) for p in route_points])
        poly = Polygon([(p[1], p[0]) for p in polygon_coords])
        return route_line.intersects(poly)
    except Exception:
        return False

def check_all_geofences(lat: float, lon: float, geofences: List[Dict[str, Any]]) -> Dict[str, Any]:
    """Comprehensive spatial check against all geofence records."""
    closest_fence = None
    min_distance = float('inf')
    is_inside_any = False
    inside_fence_name = ""

    for fence in geofences:
        coords = fence['coordinates']
        category = fence.get('category', '')
        # Check if polygon or line
        is_poly = len(coords) > 2 and coords[0] == coords[-1]

        if is_poly:
            inside = point_in_polygon(lat, lon, coords)
            dist = distance_to_polygon(lat, lon, coords)
            if inside:
                is_inside_any = True
                inside_fence_name = fence['name']
        else:
            dist = distance_to_linestring(lat, lon, coords)

        if dist < min_distance:
            min_distance = dist
            closest_fence = fence

    # Alert level classification
    if is_inside_any:
        alert_level = 'CRITICAL'
        warning_msg = f'DANGER: Vessel has entered restricted zone: {inside_fence_name}. Immediate course correction required.'
        recommended_action = 'Turn vessel around immediately and exit the perimeter.'
    elif min_distance < 5.0:
        alert_level = 'WARNING'
        warning_msg = f'WARNING: You are {min_distance} km from {closest_fence["name"]}. Approaching boundary limit.'
        recommended_action = 'Adjust heading westward toward Indian territorial waters.'
    elif min_distance < 15.0:
        alert_level = 'CAUTION'
        warning_msg = f'CAUTION: {closest_fence["name"]} is {min_distance} km away. Monitor GPS navigation.'
        recommended_action = 'Maintain safe buffer above 10 km from international demarcation.'
    else:
        alert_level = 'SAFE'
        warning_msg = f'Safe operating waters. Nearest boundary ({closest_fence["name"] if closest_fence else "Border"}) is {min_distance} km away.'
        recommended_action = 'Proceed with planned fishing operations.'

    return {
        'is_inside': is_inside_any,
        'is_approaching': min_distance < 10.0,
        'nearest_zone_name': closest_fence['name'] if closest_fence else 'None',
        'nearest_zone_category': closest_fence.get('category', 'Standard') if closest_fence else 'None',
        'distance_to_boundary_km': min_distance,
        'alert_level': alert_level,
        'warning_message': warning_msg,
        'recommended_action': recommended_action
    }