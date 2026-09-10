from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
from enum import Enum

class RiskLevel(str, Enum):
    LOW = 'LOW'
    MODERATE = 'MODERATE'
    HIGH = 'HIGH'
    CRITICAL = 'CRITICAL'

class RecommendationStatus(str, Enum):
    RECOMMENDED = 'RECOMMENDED'
    PROCEED_WITH_CAUTION = 'PROCEED_WITH_CAUTION'
    AVOID = 'AVOID'
    RESTRICTED = 'RESTRICTED'

class AdvisorySeverity(str, Enum):
    INFO = 'INFO'
    CAUTION = 'CAUTION'
    WARNING = 'WARNING'
    CRITICAL = 'CRITICAL'

class Coordinates(BaseModel):
    lat: float
    lng: float
    name: Optional[str] = None

class WeatherData(BaseModel):
    temperature_c: float = 28.5
    wind_speed_kmh: float = 22.0
    wind_speed_knots: float = 11.9
    wind_direction: str = 'NW'
    wind_gust_kmh: float = 28.0
    rain_probability: int = 25
    visibility: str = 'Good (8-10 km)'
    lightning_risk: str = 'Low'
    cyclone_alert: bool = False
    wave_height_m: float = 1.4
    wave_period_s: float = 7.2
    sea_state: str = 'Moderate'
    risk_level: str = 'Moderate'
    forecast_summary: str = 'Calm sea conditions until mid-day; wave swell increasing in the afternoon.'

class OceanData(BaseModel):
    sst_c: float = 28.4
    chlorophyll_mg_m3: float = 1.85
    current_speed_ms: float = 0.42
    current_direction: str = 'SW'
    tide_height_m: float = 1.6
    tide_state: str = 'Ebb / Receding'
    ocean_productivity_score: float = 82.0
    productivity_breakdown: Dict[str, float] = Field(default_factory=lambda: {
        'sst_suitability': 25.0,
        'chlorophyll_density': 32.0,
        'current_stability': 12.0,
        'bathymetry_favourability': 13.0
    })
    analysis: str = 'Thermal front detected with elevated chlorophyll density, optimal for pelagic fish concentration.'

class PFZZone(BaseModel):
    id: str
    name: str
    latitude: float
    longitude: float
    distance_km: float
    productivity_score: float
    sst_c: float
    chlorophyll_mg_m3: float
    wave_risk: str
    weather_risk: str
    geofence_risk: str
    recommendation_score: float
    recommendation: str
    target_species: List[str] = Field(default_factory=list)
    ocean_depth_m: float = 40.0
    description: str = ''
    valid_until: str = 'Today, 18:00 IST'

class GeofenceZone(BaseModel):
    id: str
    name: str
    category: str  # International Boundary, Restricted Waters, Marine Protected Area
    restriction_level: str  # STRICT_RESTRICTION, CAUTION, PROTECTED
    coordinates: List[List[float]]
    description: str
    buffer_km: float = 5.0

class GeofenceCheckResult(BaseModel):
    is_inside: bool = False
    is_approaching: bool = False
    nearest_zone_name: str = 'International Maritime Boundary Line'
    nearest_zone_category: str = 'International Boundary'
    distance_to_boundary_km: float = 18.5
    alert_level: str = 'SAFE'  # SAFE, WARNING, CRITICAL
    warning_message: str = 'All routes are well within Indian territorial waters.'
    recommended_action: str = 'Continue standard navigational watch.'

class RouteOption(BaseModel):
    id: str
    name: str
    is_recommended: bool
    distance_km: float
    travel_time_mins: int
    risk_level: str
    risk_score: float
    waypoints: List[List[float]]
    warnings: List[str] = Field(default_factory=list)
    why_chosen_or_avoided: str

class RouteRecommendation(BaseModel):
    source: Dict[str, Any]
    destination: Dict[str, Any]
    routes: List[RouteOption]
    recommended_route_id: str
    explanation: str

class EvidenceItem(BaseModel):
    source_agent: str
    factor: str
    value: str
    impact: str
    confidence: float = 0.85

class ExecutionStep(BaseModel):
    step_id: int
    step_name: str
    description: str
    agent_assigned: str
    status: str = 'completed'  # pending, in_progress, completed, failed
    result_summary: str = ''

class ExecutionPlan(BaseModel):
    intent: str
    detected_language: str
    location: Dict[str, Any]
    time_window: str
    activity: str
    required_agents: List[str]
    execution_strategy: str = 'parallel'
    steps: List[ExecutionStep]

class MarineRiskAssessment(BaseModel):
    overall_score: float
    risk_level: str
    confidence: float = 0.88
    wave_risk: float
    wind_risk: float
    lightning_risk: float
    cyclone_risk: float
    geofence_risk: float
    visibility_risk: float
    major_factors: List[Dict[str, Any]] = Field(default_factory=list)
    recommendation: str
    safety_window: str = '06:00 - 10:30 IST'

class ExplainableRecommendation(BaseModel):
    action_recommendation: str
    confidence_score: float = 0.85
    why_bullets: List[str] = Field(default_factory=list)
    key_evidence: List[EvidenceItem] = Field(default_factory=list)
    critical_safety_notice: str = 'MarineMind AI is an assistive decision-support copilot. Always cross-reference with official Coast Guard and IMD advisories before departure.'

class UserQuery(BaseModel):
    query: str
    conversation_id: Optional[str] = None
    vessel_location: Optional[Dict[str, Any]] = None
    language: Optional[str] = 'en'
    demo_scenario_id: Optional[str] = None

class ChatResponse(BaseModel):
    conversation_id: str
    query: str
    detected_language: str
    answer: str
    action_recommendation: str
    risk_score: float
    risk_level: str
    confidence: float
    execution_plan: ExecutionPlan
    agent_statuses: List[Dict[str, Any]]
    evidence: List[EvidenceItem]
    explainability: ExplainableRecommendation
    map_focus: Dict[str, Any]
    active_layers: List[str]
    pfz_zones: List[PFZZone] = Field(default_factory=list)
    routes: List[RouteOption] = Field(default_factory=list)
    geofence_status: GeofenceCheckResult
    alerts: List[Dict[str, Any]] = Field(default_factory=list)
