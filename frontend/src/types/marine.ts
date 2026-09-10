export interface Coordinates {
  latitude: number;
  longitude: number;
  name?: string;
  heading_deg?: number;
}

export interface WeatherData {
  temperature_c: number;
  wind_speed_kmh: number;
  wind_speed_knots: number;
  wind_direction: string;
  wind_gust_kmh: number;
  rain_probability: number;
  visibility: string;
  lightning_risk: string;
  cyclone_alert: boolean;
  wave_height_m: number;
  wave_period_s: number;
  sea_state: string;
  risk_level: string;
  forecast_summary: string;
}

export interface OceanData {
  sst_c: number;
  chlorophyll_mg_m3: number;
  current_speed_ms: number;
  current_direction: string;
  tide_height_m: number;
  tide_state: string;
  ocean_productivity_score: number;
  productivity_breakdown: Record<string, number>;
  analysis: string;
}

export interface PFZZone {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  distance_km: number;
  productivity_score: number;
  sst_c: number;
  chlorophyll_mg_m3: number;
  wave_risk: string;
  weather_risk: string;
  geofence_risk: string;
  recommendation_score: number;
  recommendation: 'RECOMMENDED' | 'HIGHLY_RECOMMENDED' | 'PROCEED_WITH_CAUTION' | 'AVOID' | 'RESTRICTED' | string;
  target_species: string[];
  ocean_depth_m: number;
  description: string;
  valid_until?: string;
}

export interface GeofenceZone {
  id: string;
  name: string;
  category: string;
  restriction_level: string;
  coordinates: [number, number][];
  description: string;
  buffer_km: number;
}

export interface GeofenceCheckResult {
  is_inside: boolean;
  is_approaching: boolean;
  nearest_zone_name: string;
  nearest_zone_category: string;
  distance_to_boundary_km: number;
  alert_level: 'SAFE' | 'CAUTION' | 'WARNING' | 'CRITICAL' | string;
  warning_message: string;
  recommended_action: string;
}

export interface RouteOption {
  id: string;
  name: string;
  is_recommended: boolean;
  distance_km: number;
  travel_time_mins: number;
  risk_level: string;
  risk_score: number;
  waypoints: [number, number][];
  warnings: string[];
  why_chosen_or_avoided: string;
}

export interface RouteRecommendation {
  source: Record<string, any>;
  destination: Record<string, any>;
  routes: RouteOption[];
  recommended_route_id: string;
  explanation: string;
}

export interface EvidenceItem {
  source_agent: string;
  factor: string;
  value: string;
  impact: string;
  confidence: number;
}

export interface ExecutionStep {
  step_id: number;
  step_name: string;
  description: string;
  agent_assigned: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed' | string;
  result_summary?: string;
}

export interface ExecutionPlan {
  intent: string;
  detected_language: string;
  location: Coordinates;
  time_window: string;
  activity: string;
  required_agents: string[];
  execution_strategy: string;
  steps: ExecutionStep[];
}

export interface ExplainableRecommendation {
  action_recommendation: string;
  confidence_score: number;
  why_bullets: string[];
  key_evidence: EvidenceItem[];
  critical_safety_notice: string;
}

export interface MarineAdvisory {
  id: string;
  advisory_type: string;
  severity: 'INFO' | 'CAUTION' | 'WARNING' | 'CRITICAL' | string;
  region_name: string;
  latitude: number;
  longitude: number;
  radius_km: number;
  description: string;
  start_time: string;
  end_time: string;
}

export interface DemoScenario {
  id: string;
  title: string;
  query: string;
  expected_agents: string[];
  summary: string;
}

export interface ChatResponse {
  conversation_id: string;
  query: string;
  detected_language: string;
  answer: string;
  action_recommendation: string;
  risk_score: number;
  risk_level: string;
  confidence: number;
  execution_plan: ExecutionPlan;
  agent_statuses: {
    agent: string;
    status: string;
    summary: string;
    badge?: string;
  }[];
  evidence: EvidenceItem[];
  explainability: ExplainableRecommendation;
  map_focus: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  active_layers: string[];
  pfz_zones: PFZZone[];
  routes: RouteOption[];
  geofence_status: GeofenceCheckResult;
  alerts: MarineAdvisory[];
}
export const MARINE_VERSION = '1.0.0';
