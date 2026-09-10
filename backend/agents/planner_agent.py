# backend/agents/planner_agent.py
import re
from typing import Dict, Any, List
from backend.models.schemas import ExecutionPlan, ExecutionStep

class PlannerAgent:
    """
    Autonomous Intent and Planning Agent.
    - Analyzes natural language query
    - Extracts spatial entities (coordinates/port names)
    - Extracts temporal entities (morning, tomorrow, now)
    - Identifies user activity (fishing, navigation, boundary check)
    - Dynamically selects required specialized agents
    - Decomposes request into discrete execution steps
    """
    def __init__(self):
        self.name = "Intent & Planning Agent"

    def create_plan(
        self,
        query: str,
        detected_language: str,
        vessel_location: Dict[str, Any],
        previous_context: Dict[str, Any] = None
    ) -> ExecutionPlan:
        q_lower = query.lower()

        # Natural language location / coordinate extraction from query text
        active_location = dict(vessel_location) if vessel_location else {"latitude": 18.9220, "longitude": 72.8347, "name": "Mumbai Offshore"}
        coord_match = re.search(r'(-?\d{1,2}\.\d+)[,\s]+(-?\d{1,3}\.\d+)', query)
        if coord_match:
            p_lat = float(coord_match.group(1))
            p_lon = float(coord_match.group(2))
            if -90 <= p_lat <= 90 and -180 <= p_lon <= 180:
                active_location = {"latitude": p_lat, "longitude": p_lon, "name": f"Coordinates ({p_lat:.2f}°N, {p_lon:.2f}°E)"}
        elif any(k in q_lower for k in ["ratnagiri", "रत्नागिरी", "ரத்னகிரி"]):
            active_location = {"latitude": 16.9902, "longitude": 73.2848, "name": "Mirkarwada Harbor, Ratnagiri"}
        elif any(k in q_lower for k in ["veraval", "वेरावल", "வேராவல்"]):
            active_location = {"latitude": 20.9077, "longitude": 70.3679, "name": "Veraval Harbor, Gujarat"}
        elif any(k in q_lower for k in ["kochi", "cochin", "कोच्चि", "கொச்சி"]):
            active_location = {"latitude": 9.9312, "longitude": 76.2673, "name": "Kochi Harbor, Kerala"}
        elif any(k in q_lower for k in ["chennai", "kasimedu", "चेन्नई", "சென்னை", "காசிமேடு"]):
            active_location = {"latitude": 13.1250, "longitude": 80.2980, "name": "Kasimedu Harbor, Chennai"}
        elif any(k in q_lower for k in ["rameswaram", "रामेश्वरम", "ராமேஸ்வரம்", "தனுஷ்கோடி"]):
            active_location = {"latitude": 9.2876, "longitude": 79.3129, "name": "Rameswaram Jetty, Tamil Nadu"}
        elif any(k in q_lower for k in ["kutch", "jakhau", "कच्छ", "जखाऊ", "கட்ச்"]):
            active_location = {"latitude": 22.8500, "longitude": 68.4900, "name": "Kutch Sector (Near Border)"}
        elif any(k in q_lower for k in ["porbandar", "पोरबंदर", "போர்பந்தர்"]):
            active_location = {"latitude": 21.6417, "longitude": 69.6093, "name": "Porbandar Port, Gujarat"}
        elif any(k in q_lower for k in ["visakhapatnam", "vizag", "विशाखापट्टनम", "விசாகப்பட்டினம்"]):
            active_location = {"latitude": 17.6868, "longitude": 83.2185, "name": "Visakhapatnam Harbor, Andhra Pradesh"}
        elif any(k in q_lower for k in ["mumbai", "मुंबई", "மும்பை", "bombay"]):
            active_location = {"latitude": 18.9220, "longitude": 72.8347, "name": "Mumbai Sassoon Docks"}

        # Multi-turn context recognition
        is_context_dependent = any(w in q_lower for w in ["it", "there", "that", "this zone", "that pfz", "same area", "तेथे", "तिथे", "அது", "அங்கு"])
        context_target = previous_context.get("last_pfz_discussed") if previous_context else None

        # Temporal extraction (English, Hindi, Marathi, Tamil)
        if any(w in q_lower for w in ["tomorrow", "कल", "उद्या", "நாளை", "நாளைய"]):
            time_window = "tomorrow_morning" if any(w in q_lower for w in ["morning", "सुबह", "सकाळी", "காலை", "விடியல்"]) else "tomorrow"
        elif any(w in q_lower for w in ["morning", "सुबह", "सकाळी", "காலை", "விடியல்"]):
            time_window = "morning"
        elif any(w in q_lower for w in ["afternoon", "दोपहर", "दुपारी", "மதியம்", "பிற்பகல்"]):
            time_window = "afternoon"
        else:
            time_window = "now"

        # Define multi-lingual intent keywords before condition chain
        route_keywords = [
            "route", "मार्ग", "रास्ता", "safest route", "way to", "navigate",
            "दिशा", "பாதை", "வழி", "வழிகாட்டல்", "செல்லும் வழி", "திசை", "ரஸ்தா",
            "रस्ता", "फेअरवे", "fairway"
        ]
        boundary_keywords = [
            "boundary", "border", "geofence", "restricted", "imbl", "सीमा", "सीमेपासून",
            "प्रतिबंधित", "सरहद", "हद्द", "எல்லை", "சர்வதேச", "தடை", "நெருங்கி", "approaching"
        ]
        pfz_tokens = ["pfz", "zone", "मत्स्य क्षेत्र", "मासेमारी क्षेत्र", "झोन", "மண்டலம்", "மீன்பிடி மண்டலம்", "alpha", "bravo"]
        comparison_tokens = [
            "which", "safest", "best", "compare", "vs", "बनाम", "वि", "எந்த", "சிறந்த", "ஒப்பீடு", "कोणता झोन", "कौन सा ज़ोन"
        ]
        is_pfz_comparison = any(t in q_lower for t in pfz_tokens) and any(c in q_lower for c in comparison_tokens)

        discovery_keywords = [
            "where is", "nearest pfz", "find pfz", "potential fishing zone",
            "मत्स्य क्षेत्र", "मासेमारी क्षेत्र", "कहाँ है", "कुठे आहे", "नजदीकी", "जवळचे",
            "எங்கே", "அருகிலுள்ள", "மீன்பிடி பகுதி", "எங்கு உள்ளது", "மீன்பிடி மையம்"
        ]
        safety_keywords = [
            "safe", "safety", "सुरक्षित", "danger", "weather", "हवामान", "मौसम", "venture",
            "cyclone", "storm", "tide", "तूफान", "लाटा", "लहरें", "हवा", "वारा", "धोका", "खतरा",
            "பாதுகாப்பானதா", "பாதுகாப்பு", "வானிலை", "புயல்", "அலை", "காற்று", "கடலுக்கு", "செல்லலாமா"
        ]

        # Check 1: Route Planning intent
        if any(w in q_lower for w in route_keywords):
            intent = "safe_route_planning"
            activity = "route_navigation"
            required_agents = ["route_agent", "geospatial_agent", "weather_agent", "risk_agent", "explainability_agent"]
            steps = [
                ExecutionStep(step_id=1, step_name="Parse Navigation Intent", description="Identify origin coordinates and destination fishing zone", agent_assigned="planner_agent"),
                ExecutionStep(step_id=2, step_name="Query Spatial Hazards", description="Scan active swell polygons, shallow shoals, and naval restricted zones", agent_assigned="geospatial_agent"),
                ExecutionStep(step_id=3, step_name="Generate Route Trajectories", description="Compute Direct Route A vs Fairway Detour Route B", agent_assigned="route_agent"),
                ExecutionStep(step_id=4, step_name="Multi-Factor Risk Scoring", description="Calculate route safety indices against 2.7m breaker zones", agent_assigned="risk_agent"),
                ExecutionStep(step_id=5, step_name="Synthesize Navigation Advice", description="Construct explainable comparative route recommendation", agent_assigned="explainability_agent")
            ]

        # Check 2: Geofence / Boundary warning intent
        elif any(w in q_lower for w in boundary_keywords):
            intent = "geofence_boundary_check"
            activity = "border_patrol_surveillance"
            required_agents = ["geospatial_agent", "risk_agent", "explainability_agent"]
            steps = [
                ExecutionStep(step_id=1, step_name="Extract Spatial Position", description="Fetch current vessel GPS coordinates and course vector", agent_assigned="planner_agent"),
                ExecutionStep(step_id=2, step_name="Spatial Distance Computation", description="Calculate perpendicular distance to IMBL and restricted polygons", agent_assigned="geospatial_agent"),
                ExecutionStep(step_id=3, step_name="Boundary Violation Assessment", description="Evaluate proximity alerts and buffer zones (< 5 km warning)", agent_assigned="risk_agent"),
                ExecutionStep(step_id=4, step_name="Actionable Course Guidance", description="Generate evasive heading correction and visual boundary overlay", agent_assigned="explainability_agent")
            ]

        # Check 3: Query specifically about WHICH zone is safe/best (PFZ safety intelligence)
        elif is_pfz_comparison:
            intent = "pfz_safety_intelligence"
            activity = "sustainable_harvesting"
            required_agents = ["pfz_agent", "weather_agent", "ocean_agent", "geospatial_agent", "risk_agent", "explainability_agent"]
            steps = [
                ExecutionStep(step_id=1, step_name="Extract Target Zone Query", description="Parse multi-criteria zone safety request", agent_assigned="planner_agent"),
                ExecutionStep(step_id=2, step_name="Query Satellite Earth Observation", description="Fetch SST thermal fronts and Chlorophyll-a density grids", agent_assigned="ocean_agent"),
                ExecutionStep(step_id=3, step_name="Filter & Rank PFZ Polygons", description="Correlate ocean productivity with distance and local bathymetry", agent_assigned="pfz_agent"),
                ExecutionStep(step_id=4, step_name="Cross-Reference Wave & Wind Hazards", description="Evaluate localized swell turbulence across candidate zones", agent_assigned="weather_agent"),
                ExecutionStep(step_id=5, step_name="Perform Boundary Compliance Check", description="Audit distance to military firing ranges and marine sanctuaries", agent_assigned="geospatial_agent"),
                ExecutionStep(step_id=6, step_name="Calculate Unified Safety Score", description="Synthesize composite safety index across all evaluated PFZs", agent_assigned="risk_agent"),
                ExecutionStep(step_id=7, step_name="Synthesize Multi-Criteria Recommendation", description="Recommend PFZ Alpha (8.2km) while filtering out hazardous PFZ Bravo (6.1km)", agent_assigned="explainability_agent")
            ]

        # Check 4: General PFZ discovery ("Where is nearest PFZ?")
        elif any(w in q_lower for w in discovery_keywords) and not any(w in q_lower for w in ["is it safe", "सुरक्षित", "பாதுகாப்பானதா"]):
            intent = "pfz_discovery"
            activity = "pelagic_search"
            required_agents = ["pfz_agent", "geospatial_agent", "explainability_agent"]
            steps = [
                ExecutionStep(step_id=1, step_name="Identify Fishing Inquiries", description="Extract search radius around vessel coordinates", agent_assigned="planner_agent"),
                ExecutionStep(step_id=2, step_name="Retrieve PFZ Coordinates", description="Load nearest INCOIS advisory polygons and pelagic species targets", agent_assigned="pfz_agent"),
                ExecutionStep(step_id=3, step_name="Calculate Geographic Proximity", description="Compute haversine nautical distances and bearings", agent_assigned="geospatial_agent"),
                ExecutionStep(step_id=4, step_name="Output Ranked Zones", description="Display prioritized zone cards with SST and chlorophyll metrics", agent_assigned="explainability_agent")
            ]

        # Check 5: General Marine Safety ("Is it safe to go fishing tomorrow morning?")
        elif any(w in q_lower for w in safety_keywords):
            intent = "marine_safety_assessment"
            activity = "fishing_safety_evaluation"
            required_agents = ["weather_agent", "ocean_agent", "geospatial_agent", "risk_agent", "explainability_agent"]
            steps = [
                ExecutionStep(step_id=1, step_name="Decompose Safety Query", description=f"Analyze temporal target ({time_window}) and vessel harbor sector", agent_assigned="planner_agent"),
                ExecutionStep(step_id=2, step_name="Retrieve Atmospheric & Wave Intelligence", description="Query swell height, wind gusts, lightning risk, and IMD advisories", agent_assigned="weather_agent"),
                ExecutionStep(step_id=3, step_name="Analyze Sea State & Currents", description="Extract SST gradient, tidal currents, and frontal turbulence", agent_assigned="ocean_agent"),
                ExecutionStep(step_id=4, step_name="Perform Geospatial Boundary Audit", description="Verify distance to restricted maritime polygons and coral sanctuaries", agent_assigned="geospatial_agent"),
                ExecutionStep(step_id=5, step_name="Compute Weighted Marine Risk", description="Execute 6-factor weighted risk engine (Wave 30%, Wind 20%, etc.)", agent_assigned="risk_agent"),
                ExecutionStep(step_id=6, step_name="Generate Explainable Decision", description="Formulate time-window advisory (safe 6am-10am vs hazardous afternoon)", agent_assigned="explainability_agent")
            ]

        # General consultation fallback
        else:
            intent = "general_marine_consultation"
            activity = "general_intelligence"
            required_agents = ["weather_agent", "ocean_agent", "geospatial_agent", "risk_agent", "explainability_agent"]
            steps = [
                ExecutionStep(step_id=1, step_name="Parse Marine Consultation", description="Interpret maritime context from user input", agent_assigned="planner_agent"),
                ExecutionStep(step_id=2, step_name="Query Multi-Domain Providers", description="Fetch unified weather, ocean, and geospatial status", agent_assigned="weather_agent"),
                ExecutionStep(step_id=3, step_name="Fuse Marine Intelligence", description="Integrate evidence into coherent situational awareness", agent_assigned="risk_agent"),
                ExecutionStep(step_id=4, step_name="Deliver Contextual Answer", description="Format localized response with interactive map view", agent_assigned="explainability_agent")
            ]

        return ExecutionPlan(
            intent=intent,
            detected_language=detected_language,
            location=active_location,
            time_window=time_window,
            activity=activity,
            required_agents=required_agents,
            execution_strategy="parallel",
            steps=steps
        )