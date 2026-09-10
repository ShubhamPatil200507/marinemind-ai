# backend/data/seed_data.py
"""
Seed datasets for Indian coastal maritime operations: Maharashtra (Mumbai/Ratnagiri),
Gujarat (Veraval), Tamil Nadu (Rameswaram/Chennai), and Kerala (Kochi).
"""

DEFAULT_VESSEL_LOCATION = {
    "latitude": 18.9220,
    "longitude": 72.8347,
    "name": "Mumbai Sassoon Docks",
    "heading_deg": 245
}

SEED_LOCATIONS = [
    {"id": "LOC_MUMBAI", "name": "Mumbai Sassoon Docks", "latitude": 18.9220, "longitude": 72.8347, "location_type": "major_fishing_harbor"},
    {"id": "LOC_FERRY_WHARF", "name": "Bhaucha Dhakka (Ferry Wharf)", "latitude": 18.9560, "longitude": 72.8520, "location_type": "fishing_dock"},
    {"id": "LOC_RATNAGIRI", "name": "Mirkarwada Harbor, Ratnagiri", "latitude": 16.9902, "longitude": 73.2848, "location_type": "fishing_harbor"},
    {"id": "LOC_VERAVAL", "name": "Veraval Fishing Harbor, Gujarat", "latitude": 20.9077, "longitude": 70.3679, "location_type": "major_fishing_harbor"},
    {"id": "LOC_KOCHI", "name": "Kochi Thoppumpady Harbor, Kerala", "latitude": 9.9312, "longitude": 76.2673, "location_type": "major_fishing_harbor"},
    {"id": "LOC_RAMESWARAM", "name": "Rameswaram Fishing Jetty, Tamil Nadu", "latitude": 9.2876, "longitude": 79.3129, "location_type": "coastal_landing_center"},
    {"id": "LOC_CHENNAI", "name": "Kasimedu Fishing Harbor, Chennai", "latitude": 13.1250, "longitude": 80.2980, "location_type": "major_fishing_harbor"}
]

SEED_PFZ_ZONES = [
    {
        "id": "PFZ-MH-01",
        "name": "PFZ Alpha (Arabian Sea Northwest)",
        "latitude": 18.9850,
        "longitude": 72.7120,
        "distance_km": 8.2,
        "productivity_score": 86.0,
        "sst_c": 28.1,
        "chlorophyll_mg_m3": 2.15,
        "wave_risk": "LOW",
        "weather_risk": "MODERATE",
        "geofence_risk": "SAFE",
        "recommendation_score": 88.5,
        "recommendation": "RECOMMENDED",
        "target_species": ["Indian Mackerel", "Yellowfin Tuna", "Ribbonfish"],
        "ocean_depth_m": 38.5,
        "description": "Distinct thermal front intersecting high chlorophyll-a plume from continental shelf runoff. High pelagic aggregation.",
        "valid_until": "Today, 20:00 IST"
    },
    {
        "id": "PFZ-MH-02",
        "name": "PFZ Bravo (South Offshore Edge)",
        "latitude": 18.8420,
        "longitude": 72.7650,
        "distance_km": 6.1,
        "productivity_score": 74.0,
        "sst_c": 28.6,
        "chlorophyll_mg_m3": 1.62,
        "wave_risk": "HIGH",
        "weather_risk": "HIGH",
        "geofence_risk": "SAFE",
        "recommendation_score": 46.0,
        "recommendation": "AVOID",
        "target_species": ["Silver Pomfret", "Squid", "Anchovy"],
        "ocean_depth_m": 28.0,
        "description": "Geographically closer, but subjected to converging high swells (2.7m) and turbulent wave breaking along shallow shoals.",
        "valid_until": "Today, 18:00 IST"
    },
    {
        "id": "PFZ-MH-03",
        "name": "PFZ Charlie (Deep Continental Slope)",
        "latitude": 18.9100,
        "longitude": 72.4800,
        "distance_km": 28.5,
        "productivity_score": 91.0,
        "sst_c": 27.8,
        "chlorophyll_mg_m3": 2.45,
        "wave_risk": "HIGH",
        "weather_risk": "HIGH",
        "geofence_risk": "SAFE",
        "recommendation_score": 52.0,
        "recommendation": "AVOID",
        "target_species": ["Skipjack Tuna", "King Mackerel", "Mahi Mahi"],
        "ocean_depth_m": 85.0,
        "description": "High oceanic upwelling productivity, but offshore distance exceeds safe artisanal threshold under afternoon wind advisory.",
        "valid_until": "Tomorrow, 06:00 IST"
    },
    {
        "id": "PFZ-MH-04",
        "name": "PFZ Delta (Alibaug Inshore Sector)",
        "latitude": 18.7900,
        "longitude": 72.8200,
        "distance_km": 14.8,
        "productivity_score": 68.0,
        "sst_c": 28.8,
        "chlorophyll_mg_m3": 1.35,
        "wave_risk": "LOW",
        "weather_risk": "LOW",
        "geofence_risk": "SAFE",
        "recommendation_score": 71.0,
        "recommendation": "PROCEED_WITH_CAUTION",
        "target_species": ["Prawns / Shrimps", "Croaker", "Sole Fish"],
        "ocean_depth_m": 22.0,
        "description": "Sheltered inshore corridor with calm sea state; moderate chlorophyll density suitable for small motorized craft.",
        "valid_until": "Today, 22:00 IST"
    },
    {
        "id": "PFZ-RT-01",
        "name": "PFZ Ratnagiri Offshore (Mirkarwada West)",
        "latitude": 16.9850,
        "longitude": 73.1800,
        "distance_km": 11.2,
        "productivity_score": 88.0,
        "sst_c": 28.2,
        "chlorophyll_mg_m3": 2.30,
        "wave_risk": "LOW",
        "weather_risk": "LOW",
        "geofence_risk": "SAFE",
        "recommendation_score": 89.2,
        "recommendation": "HIGHLY_RECOMMENDED",
        "target_species": ["Kingfish (Surmai)", "Indian Mackerel", "Yellowfin Tuna"],
        "ocean_depth_m": 42.0,
        "description": "Active coastal upwelling thermal front with high pelagic concentration along the 40m depth contour.",
        "valid_until": "Today, 22:00 IST"
    },
    {
        "id": "PFZ-RT-02",
        "name": "PFZ Jaigad Bank",
        "latitude": 17.1800,
        "longitude": 73.1200,
        "distance_km": 24.5,
        "productivity_score": 81.0,
        "sst_c": 28.4,
        "chlorophyll_mg_m3": 1.95,
        "wave_risk": "LOW",
        "weather_risk": "LOW",
        "geofence_risk": "SAFE",
        "recommendation_score": 82.5,
        "recommendation": "RECOMMENDED",
        "target_species": ["Silver Pomfret", "Ribbonfish", "Squid"],
        "ocean_depth_m": 36.0,
        "description": "Stable continental shelf corridor outside estuary turbulence with favorable chlorophyll plume.",
        "valid_until": "Today, 20:00 IST"
    },
    {
        "id": "PFZ-RT-03",
        "name": "PFZ Ranpar Reef (Breaker Hazard)",
        "latitude": 16.8900,
        "longitude": 73.2200,
        "distance_km": 12.8,
        "productivity_score": 68.0,
        "sst_c": 28.9,
        "chlorophyll_mg_m3": 1.45,
        "wave_risk": "HIGH",
        "weather_risk": "MODERATE",
        "geofence_risk": "SAFE",
        "recommendation_score": 48.0,
        "recommendation": "AVOID",
        "target_species": ["Rock Perch", "Catfish"],
        "ocean_depth_m": 16.0,
        "description": "Shallow submerged reef produces treacherous 2.6m swell breaks; high grounding risk for fishing vessels.",
        "valid_until": "Today, 18:00 IST"
    },
    {
        "id": "PFZ-GJ-01",
        "name": "PFZ Veraval Deep Shelf",
        "latitude": 20.8200,
        "longitude": 70.2400,
        "distance_km": 16.5,
        "productivity_score": 90.0,
        "sst_c": 27.5,
        "chlorophyll_mg_m3": 2.65,
        "wave_risk": "LOW",
        "weather_risk": "LOW",
        "geofence_risk": "SAFE",
        "recommendation_score": 91.5,
        "recommendation": "HIGHLY_RECOMMENDED",
        "target_species": ["Silver Pomfret", "Ribbonfish", "Cuttlefish"],
        "ocean_depth_m": 48.0,
        "description": "Strong thermal gradient at Arabian Sea shelf edge with dense chlorophyll aggregation.",
        "valid_until": "Today, 22:00 IST"
    },
    {
        "id": "PFZ-KL-01",
        "name": "PFZ Kochi Outer Shelf",
        "latitude": 9.9100,
        "longitude": 76.1100,
        "distance_km": 17.8,
        "productivity_score": 89.0,
        "sst_c": 28.4,
        "chlorophyll_mg_m3": 2.50,
        "wave_risk": "LOW",
        "weather_risk": "LOW",
        "geofence_risk": "SAFE",
        "recommendation_score": 90.0,
        "recommendation": "HIGHLY_RECOMMENDED",
        "target_species": ["Oil Sardines", "Indian Mackerel", "Karikkadi Prawns"],
        "ocean_depth_m": 40.0,
        "description": "Prolific mudbank runoff thermal front with abundant pelagic baitfish schools.",
        "valid_until": "Today, 22:00 IST"
    },
    {
        "id": "PFZ-TN-01",
        "name": "PFZ Kasimedu Offshore",
        "latitude": 13.1600,
        "longitude": 80.4100,
        "distance_km": 13.4,
        "productivity_score": 86.0,
        "sst_c": 28.8,
        "chlorophyll_mg_m3": 2.15,
        "wave_risk": "LOW",
        "weather_risk": "LOW",
        "geofence_risk": "SAFE",
        "recommendation_score": 87.5,
        "recommendation": "HIGHLY_RECOMMENDED",
        "target_species": ["Seer Fish (Vanjaram)", "Yellowfin Tuna", "Barracuda"],
        "ocean_depth_m": 35.0,
        "description": "Bay of Bengal coastal divergence zone creating sustained phytoplankton bloom.",
        "valid_until": "Today, 21:00 IST"
    },
    {
        "id": "PFZ-RM-01",
        "name": "PFZ Mandapam Bay",
        "latitude": 9.2400,
        "longitude": 79.1800,
        "distance_km": 15.6,
        "productivity_score": 85.0,
        "sst_c": 28.9,
        "chlorophyll_mg_m3": 2.05,
        "wave_risk": "LOW",
        "weather_risk": "LOW",
        "geofence_risk": "SAFE",
        "recommendation_score": 86.0,
        "recommendation": "HIGHLY_RECOMMENDED",
        "target_species": ["Blue Swimming Crab", "Squid", "Sardinella"],
        "ocean_depth_m": 22.0,
        "description": "Protected Gulf of Mannar waters with high benthic richness and calm sea state.",
        "valid_until": "Today, 22:00 IST"
    },
    {
        "id": "PFZ-PB-01",
        "name": "PFZ Porbandar Shelf Front",
        "latitude": 21.5800,
        "longitude": 69.4500,
        "distance_km": 18.2,
        "productivity_score": 87.0,
        "sst_c": 27.6,
        "chlorophyll_mg_m3": 2.30,
        "wave_risk": "LOW",
        "weather_risk": "LOW",
        "geofence_risk": "SAFE",
        "recommendation_score": 88.0,
        "recommendation": "HIGHLY_RECOMMENDED",
        "target_species": ["Croaker", "Ribbonfish", "Pomfret"],
        "ocean_depth_m": 44.0,
        "description": "Clear thermal boundary off Porbandar headland supporting high demersal and pelagic biomass.",
        "valid_until": "Today, 22:00 IST"
    },
    {
        "id": "PFZ-AP-01",
        "name": "PFZ Vizag Continental Shelf",
        "latitude": 17.6200,
        "longitude": 83.3800,
        "distance_km": 19.1,
        "productivity_score": 88.0,
        "sst_c": 28.3,
        "chlorophyll_mg_m3": 2.40,
        "wave_risk": "LOW",
        "weather_risk": "LOW",
        "geofence_risk": "SAFE",
        "recommendation_score": 89.0,
        "recommendation": "HIGHLY_RECOMMENDED",
        "target_species": ["Skipjack Tuna", "Indian Mackerel", "Tiger Prawns"],
        "ocean_depth_m": 52.0,
        "description": "Steep continental slope upwelling providing steady nutrient flux and pelagic aggregation.",
        "valid_until": "Today, 22:00 IST"
    },
    {
        "id": "PFZ-KT-01",
        "name": "PFZ Jakhau Southern Sector",
        "latitude": 23.1200,
        "longitude": 68.6100,
        "distance_km": 21.4,
        "productivity_score": 82.0,
        "sst_c": 27.3,
        "chlorophyll_mg_m3": 2.10,
        "wave_risk": "LOW",
        "weather_risk": "LOW",
        "geofence_risk": "SAFE",
        "recommendation_score": 83.0,
        "recommendation": "RECOMMENDED",
        "target_species": ["Silver Pomfret", "Ghol Fish", "Brown Shrimp"],
        "ocean_depth_m": 26.0,
        "description": "High nutrient runoff from Gulf of Kutch; coordinates strictly maintain 12+ km buffer from sovereign border.",
        "valid_until": "Today, 21:00 IST"
    }
]

SEED_GEOFENCES = [
    {
        "id": "GEO-IMBL-WEST",
        "name": "International Maritime Boundary Line (IMBL - India/Pakistan)",
        "category": "International Boundary",
        "restriction_level": "STRICT_RESTRICTION",
        "buffer_km": 10.0,
        "description": "Sovereign border dividing India & Pakistan exclusive economic zones in the Arabian Sea. Strict warning perimeter.",
        "coordinates": [
            [23.70, 67.80],
            [23.45, 67.95],
            [23.10, 68.20],
            [22.80, 68.45],
            [22.40, 68.70],
            [21.90, 69.00]
        ]
    },
    {
        "id": "GEO-IMBL-SOUTH",
        "name": "International Maritime Boundary Line (IMBL - India/Sri Lanka)",
        "category": "International Boundary",
        "restriction_level": "STRICT_RESTRICTION",
        "buffer_km": 5.0,
        "description": "Palk Strait / Gulf of Mannar delimitation treaty line. Crossing prohibited without bilateral clearances.",
        "coordinates": [
            [10.05, 79.85],
            [9.70, 79.65],
            [9.40, 79.52],
            [9.15, 79.35],
            [8.85, 79.15]
        ]
    },
    {
        "id": "GEO-NAVAL-MH",
        "name": "Western Naval Command Live Firing & Defense Range",
        "category": "Restricted Waters",
        "restriction_level": "STRICT_RESTRICTION",
        "buffer_km": 3.0,
        "description": "Permanent military defense testing zone off Alibaug-Mumbai shelf. Strictly forbidden for civilian fishing vessels.",
        "coordinates": [
            [18.720, 72.620],
            [18.720, 72.740],
            [18.600, 72.740],
            [18.600, 72.620],
            [18.720, 72.620]
        ]
    },
    {
        "id": "GEO-MPA-MALVAN",
        "name": "Malvan Marine Sanctuary (Sindhudurg)",
        "category": "Marine Protected Area",
        "restriction_level": "PROTECTED",
        "buffer_km": 2.0,
        "description": "Rich coral reef habitat and sea turtle nesting sanctuary. Mechanized trawling prohibited under Wildlife Protection Act.",
        "coordinates": [
            [16.080, 73.440],
            [16.080, 73.530],
            [16.000, 73.530],
            [16.000, 73.440],
            [16.080, 73.440]
        ]
    },
    {
        "id": "GEO-MPA-MANNAR",
        "name": "Gulf of Mannar Biosphere Reserve Core Zone",
        "category": "Marine Protected Area",
        "restriction_level": "PROTECTED",
        "buffer_km": 3.0,
        "description": "Dugong and seagrass conservation area with 21 coral islands. Heavy anchor dropping strictly regulated.",
        "coordinates": [
            [9.250, 79.100],
            [9.250, 79.280],
            [9.100, 79.280],
            [9.100, 79.100],
            [9.250, 79.100]
        ]
    }
]

SEED_ADVISORIES = [
    {
        "id": "ADV-WAVE-01",
        "advisory_type": "High Wave Alert",
        "severity": "CAUTION",
        "region_name": "Arabian Sea (Maharashtra Coast)",
        "latitude": 18.88,
        "longitude": 72.65,
        "radius_km": 45.0,
        "description": "INCOIS reports swell surge waves between 2.2m to 2.8m expected from 11:30 AM IST. Artisanal fishermen advised to return before noon.",
        "start_time": "Today, 11:30 IST",
        "end_time": "Today, 21:00 IST"
    },
    {
        "id": "ADV-WIND-02",
        "advisory_type": "Strong Wind & Squall",
        "severity": "WARNING",
        "region_name": "Gujarat Saurashtra Offshore",
        "latitude": 20.85,
        "longitude": 70.20,
        "radius_km": 60.0,
        "description": "Squally weather with wind gusts peaking at 48 km/h. Small motorboats advised not to venture beyond 15 nautical miles.",
        "start_time": "Today, 14:00 IST",
        "end_time": "Tomorrow, 08:00 IST"
    },
    {
        "id": "ADV-PORT-03",
        "advisory_type": "Vessel Traffic Restriction",
        "severity": "INFO",
        "region_name": "Mumbai Harbor Deep Water Channel",
        "latitude": 18.94,
        "longitude": 72.82,
        "radius_km": 10.0,
        "description": "Commercial container vessel transit active in Main Channel. Fishing craft must maintain at least 500m clearance from VLCC tankers.",
        "start_time": "Continuous",
        "end_time": "Permanent"
    }
]

DEMO_SCENARIOS = [
    {
        "id": "scenario_1_safety",
        "title": "Scenario 1: Safe Fishing Decision",
        "query": "Is it safe to go fishing tomorrow morning?",
        "expected_agents": ["planner_agent", "weather_agent", "ocean_agent", "geospatial_agent", "risk_agent", "explainability_agent"],
        "summary": "Demonstrates multi-source temporal risk assessment identifying a safe morning window (6am-10am) before afternoon wave swell surge."
    },
    {
        "id": "scenario_2_pfz",
        "title": "Scenario 2: PFZ Multi-Criteria Recommendation",
        "query": "Where is the nearest Potential Fishing Zone today?",
        "expected_agents": ["planner_agent", "pfz_agent", "ocean_agent", "weather_agent", "geospatial_agent", "risk_agent", "explainability_agent"],
        "summary": "Demonstrates that the closest zone (PFZ Bravo, 6.1 km) is flagged AVOID due to high wave hazards, recommending PFZ Alpha (8.2 km)."
    },
    {
        "id": "scenario_3_route",
        "title": "Scenario 3: Safe Route Planning vs Direct Hazards",
        "query": "What is the safest route to PFZ Alpha?",
        "expected_agents": ["planner_agent", "route_agent", "geospatial_agent", "risk_agent", "explainability_agent"],
        "summary": "Compares direct Route A (12 km, traverses shallow reef hazard & naval perimeter) against recommended Route B (16 km safe fairway detour)."
    },
    {
        "id": "scenario_4_geofence",
        "title": "Scenario 4: Geofence Boundary Warning (IMBL)",
        "query": "Am I approaching a restricted or international maritime boundary?",
        "expected_agents": ["planner_agent", "geospatial_agent", "risk_agent", "explainability_agent"],
        "summary": "Simulates vessel movement toward border perimeter: detects proximity under 5 km, calculates exact distance remaining, and issues course correction."
    }
]