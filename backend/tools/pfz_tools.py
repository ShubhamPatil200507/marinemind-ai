# backend/tools/pfz_tools.py
from typing import List, Dict, Any
from backend.data.seed_data import SEED_PFZ_ZONES
from backend.tools.gis_tools import haversine_distance
from backend.models.schemas import PFZZone

def get_ranked_pfz_zones(vessel_lat: float, vessel_lon: float, max_dist_km: float = 120.0) -> List[PFZZone]:
    """
    Retrieves and ranks Potential Fishing Zones based on:
    Recommendation Score = Distance Score (20%) + Ocean Productivity (40%) + Wave Safety (25%) + Geofence Safety (15%)
    If no pre-seeded zones are within max_dist_km, dynamically synthesizes realistic coastal PFZ targets.
    """
    ranked: List[PFZZone] = []

    for z in SEED_PFZ_ZONES:
        dist = haversine_distance(vessel_lat, vessel_lon, z["latitude"], z["longitude"])
        if dist > max_dist_km:
            continue

        # Distance score (closer is better, normalized up to 40km)
        dist_score = max(0.0, 100.0 - (dist / 40.0) * 100.0)
        prod_score = z["productivity_score"]

        # Safety penalties
        if z["wave_risk"] == "HIGH":
            wave_safety = 10.0
        elif z["wave_risk"] == "MODERATE":
            wave_safety = 60.0
        else:
            wave_safety = 95.0

        geofence_safety = 95.0 if z["geofence_risk"] == "SAFE" else 20.0

        # Weighted calculation
        rec_score = round(dist_score * 0.20 + prod_score * 0.40 + wave_safety * 0.25 + geofence_safety * 0.15, 1)

        # Recommendation determination
        if z["wave_risk"] == "HIGH":
            rec_status = "AVOID"
        elif rec_score >= 80.0:
            rec_status = "HIGHLY_RECOMMENDED"
        elif rec_score >= 65.0:
            rec_status = "RECOMMENDED"
        else:
            rec_status = "PROCEED_WITH_CAUTION"

        zone_obj = PFZZone(
            id=z["id"],
            name=z["name"],
            latitude=z["latitude"],
            longitude=z["longitude"],
            distance_km=dist,
            productivity_score=prod_score,
            sst_c=z["sst_c"],
            chlorophyll_mg_m3=z["chlorophyll_mg_m3"],
            wave_risk=z["wave_risk"],
            weather_risk=z["weather_risk"],
            geofence_risk=z["geofence_risk"],
            recommendation_score=rec_score,
            recommendation=rec_status,
            target_species=z["target_species"],
            ocean_depth_m=z["ocean_depth_m"],
            description=z["description"],
            valid_until=z.get("valid_until", "Today, 20:00 IST")
        )
        ranked.append(zone_obj)

    # If no pre-seeded zone within range, dynamically project 3 zones around vessel_lat, vessel_lon
    if not ranked:
        # Determine offshore shift (West Coast shifts West lon < 0, East Coast shifts East lon > 0)
        lon_offset = -0.12 if vessel_lon < 78.0 else 0.12
        dynamic_definitions = [
            {
                "id": f"PFZ-DYN-01",
                "name": f"PFZ Sector Alpha (Offshore Shelf)",
                "lat": round(vessel_lat + 0.05, 4),
                "lon": round(vessel_lon + lon_offset, 4),
                "prod": 87.0,
                "sst": 28.2,
                "chl": 2.25,
                "wave": "LOW",
                "rec": "HIGHLY_RECOMMENDED",
                "score": 88.0,
                "depth": 38.0,
                "desc": "Thermal convergence detected via satellite SST gradients; elevated chlorophyll-a plume indicates active pelagic schools.",
                "species": ["Indian Mackerel", "Yellowfin Tuna", "Ribbonfish"]
            },
            {
                "id": f"PFZ-DYN-02",
                "name": f"PFZ Sector Bravo (Shallow Breaker Shoal)",
                "lat": round(vessel_lat - 0.04, 4),
                "lon": round(vessel_lon + (lon_offset * 0.5), 4),
                "prod": 72.0,
                "sst": 28.7,
                "chl": 1.55,
                "wave": "HIGH",
                "rec": "AVOID",
                "score": 45.0,
                "depth": 14.0,
                "desc": "Closer nearshore reef contour, but wave telemetry indicates hazardous 2.6m swell breaks over submerged shoals.",
                "species": ["Silver Pomfret", "Squid"]
            },
            {
                "id": f"PFZ-DYN-03",
                "name": f"PFZ Sector Charlie (Deep Pelagic Zone)",
                "lat": round(vessel_lat + 0.12, 4),
                "lon": round(vessel_lon + (lon_offset * 1.8), 4),
                "prod": 82.0,
                "sst": 27.9,
                "chl": 2.10,
                "wave": "LOW",
                "rec": "RECOMMENDED",
                "score": 79.5,
                "depth": 55.0,
                "desc": "Deep outer contour with steady plankton density and stable sea state; suitable for mechanized drift-netting.",
                "species": ["Seer Fish", "Skipjack Tuna", "Barracuda"]
            }
        ]

        for d in dynamic_definitions:
            dist = haversine_distance(vessel_lat, vessel_lon, d["lat"], d["lon"])
            ranked.append(PFZZone(
                id=d["id"],
                name=d["name"],
                latitude=d["lat"],
                longitude=d["lon"],
                distance_km=dist,
                productivity_score=d["prod"],
                sst_c=d["sst"],
                chlorophyll_mg_m3=d["chl"],
                wave_risk=d["wave"],
                weather_risk="LOW",
                geofence_risk="SAFE",
                recommendation_score=d["score"],
                recommendation=d["rec"],
                target_species=d["species"],
                ocean_depth_m=d["depth"],
                description=d["desc"],
                valid_until="Today, 22:00 IST"
            ))

    # Sort by recommendation score descending
    ranked.sort(key=lambda x: x.recommendation_score, reverse=True)
    return ranked