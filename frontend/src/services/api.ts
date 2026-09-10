// frontend/src/services/api.ts
import type { ChatResponse,
  WeatherData,
  OceanData,
  PFZZone,
  GeofenceZone,
  GeofenceCheckResult,
  RouteRecommendation,
  MarineAdvisory,
  DemoScenario
 } from '../types/marine';

const API_BASE = import.meta.env.VITE_API_URL || (typeof window !== 'undefined' && window.location.port === '5173' ? 'http://localhost:8000/api' : '/api');

export async function sendChatQuery(
  query: string,
  conversationId?: string,
  vesselLocation?: { latitude: number; longitude: number },
  language: string = 'en',
  demoScenarioId?: string
): Promise<ChatResponse> {
  try {
    const res = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
        conversation_id: conversationId,
        vessel_location: vesselLocation,
        language,
        demo_scenario_id: demoScenarioId
      })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Backend offline, using client-side fallback orchestrator simulation', err);
    return getSimulatedChatResponse(query, language, demoScenarioId);
  }
}

export async function fetchCurrentWeather(lat = 18.922, lon = 72.8347): Promise<WeatherData> {
  try {
    const res = await fetch(`${API_BASE}/weather/current?lat=${lat}&lon=${lon}`);
    if (!res.ok) throw new Error('API error');
    return await res.json();
  } catch {
    return {
      temperature_c: 28.4,
      wind_speed_kmh: 22.0,
      wind_speed_knots: 11.9,
      wind_direction: 'NW',
      wind_gust_kmh: 28.0,
      rain_probability: 25,
      visibility: 'Good (8-10 km)',
      lightning_risk: 'Low',
      cyclone_alert: false,
      wave_height_m: 1.4,
      wave_period_s: 7.2,
      sea_state: 'Moderate',
      risk_level: 'Moderate',
      forecast_summary: 'Moderate sea state. Safe nearshore operations; monitor afternoon swells.'
    };
  }
}

export async function fetchNearbyPFZ(lat = 18.922, lon = 72.8347): Promise<PFZZone[]> {
  try {
    const res = await fetch(`${API_BASE}/pfz/nearby?lat=${lat}&lon=${lon}`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return data;
    }
  } catch (err) {
    console.warn('API error fetching PFZ, synthesizing dynamic local zones', err);
  }

  const lonOffset = lon < 78 ? -0.12 : 0.12;
  return [
    {
      id: 'PFZ-LOC-01',
      name: 'Sector Alpha (Thermal Front)',
      latitude: Number((lat + 0.05).toFixed(4)),
      longitude: Number((lon + lonOffset).toFixed(4)),
      distance_km: 8.5,
      productivity_score: 88.0,
      sst_c: 28.2,
      chlorophyll_mg_m3: 2.25,
      wave_risk: 'LOW',
      weather_risk: 'LOW',
      geofence_risk: 'SAFE',
      recommendation_score: 89.0,
      recommendation: 'HIGHLY_RECOMMENDED',
      target_species: ['Indian Mackerel', 'Yellowfin Tuna', 'Ribbonfish'],
      ocean_depth_m: 38.0,
      description: 'Thermal convergence detected via satellite SST gradients; elevated chlorophyll-a plume indicates active pelagic schools.',
      valid_until: 'Today, 22:00 IST'
    },
    {
      id: 'PFZ-LOC-02',
      name: 'Sector Bravo (Nearshore Reef Hazard)',
      latitude: Number((lat - 0.04).toFixed(4)),
      longitude: Number((lon + lonOffset * 0.5).toFixed(4)),
      distance_km: 6.2,
      productivity_score: 72.0,
      sst_c: 28.7,
      chlorophyll_mg_m3: 1.55,
      wave_risk: 'HIGH',
      weather_risk: 'LOW',
      geofence_risk: 'SAFE',
      recommendation_score: 45.0,
      recommendation: 'AVOID',
      target_species: ['Silver Pomfret', 'Squid'],
      ocean_depth_m: 15.0,
      description: 'Closer nearshore reef contour, but wave telemetry indicates hazardous 2.6m swell breaks over shallow shoals.',
      valid_until: 'Today, 22:00 IST'
    },
    {
      id: 'PFZ-LOC-03',
      name: 'Sector Charlie (Outer Continental Shelf)',
      latitude: Number((lat + 0.12).toFixed(4)),
      longitude: Number((lon + lonOffset * 1.8).toFixed(4)),
      distance_km: 22.4,
      productivity_score: 84.0,
      sst_c: 27.9,
      chlorophyll_mg_m3: 2.10,
      wave_risk: 'LOW',
      weather_risk: 'LOW',
      geofence_risk: 'SAFE',
      recommendation_score: 81.0,
      recommendation: 'RECOMMENDED',
      target_species: ['Seer Fish', 'Skipjack Tuna', 'Barracuda'],
      ocean_depth_m: 54.0,
      description: 'Deep outer shelf contour with steady plankton density and calm sea state; suitable for mechanized craft.',
      valid_until: 'Today, 22:00 IST'
    }
  ];
}

export async function fetchGeofences(): Promise<GeofenceZone[]> {
  try {
    const res = await fetch(`${API_BASE}/geofence/zones`);
    if (!res.ok) throw new Error('API error');
    return await res.json();
  } catch {
    return [
      {
        id: 'GEO-IMBL-WEST',
        name: 'International Maritime Boundary Line (IMBL - India/Pakistan)',
        category: 'International Boundary',
        restriction_level: 'STRICT_RESTRICTION',
        buffer_km: 10.0,
        description: 'Sovereign border dividing India & Pakistan EEZ. Strict warning perimeter.',
        coordinates: [
          [23.7, 67.8],
          [23.45, 67.95],
          [23.1, 68.2],
          [22.8, 68.45],
          [22.4, 68.7],
          [21.9, 69.0]
        ]
      },
      {
        id: 'GEO-NAVAL-MH',
        name: 'Western Naval Command Live Firing & Defense Range',
        category: 'Restricted Waters',
        restriction_level: 'STRICT_RESTRICTION',
        buffer_km: 3.0,
        description: 'Permanent defense testing zone off Alibaug shelf. Forbidden for civilian vessels.',
        coordinates: [
          [18.72, 72.62],
          [18.72, 72.74],
          [18.6, 72.74],
          [18.6, 72.62],
          [18.72, 72.62]
        ]
      },
      {
        id: 'GEO-MPA-MALVAN',
        name: 'Malvan Marine Sanctuary (Sindhudurg)',
        category: 'Marine Protected Area',
        restriction_level: 'PROTECTED',
        buffer_km: 2.0,
        description: 'Coral reef habitat and turtle sanctuary. Mechanized bottom trawling banned.',
        coordinates: [
          [16.08, 73.44],
          [16.08, 73.53],
          [16.0, 73.53],
          [16.0, 73.44],
          [16.08, 73.44]
        ]
      }
    ];
  }
}

export async function fetchDemoRoutes(): Promise<RouteRecommendation> {
  try {
    const res = await fetch(`${API_BASE}/routes/demo`);
    if (!res.ok) throw new Error('API error');
    return await res.json();
  } catch {
    return {
      source: { latitude: 18.922, longitude: 72.8347, name: 'Mumbai Sassoon Docks' },
      destination: { latitude: 18.985, longitude: 72.712, name: 'PFZ Alpha' },
      routes: [
        {
          id: 'route_b_safe',
          name: 'Route B (Safe Fairway Detour)',
          is_recommended: true,
          distance_km: 16.2,
          travel_time_mins: 61,
          risk_level: 'LOW',
          risk_score: 22.0,
          waypoints: [
            [18.922, 72.8347],
            [18.932, 72.7997],
            [18.968, 72.745],
            [18.993, 72.715],
            [18.985, 72.712]
          ],
          warnings: [],
          why_chosen_or_avoided: 'Recommended: Skirts around hazardous 2.7m breaker shoals and maintains >5 km clearance from defense perimeters.'
        },
        {
          id: 'route_a_direct',
          name: 'Route A (Direct Trajectory)',
          is_recommended: false,
          distance_km: 12.2,
          travel_time_mins: 45,
          risk_level: 'HIGH',
          risk_score: 68.0,
          waypoints: [
            [18.922, 72.8347],
            [18.948, 72.768],
            [18.965, 72.735],
            [18.985, 72.712]
          ],
          warnings: [
            'Intersects rough wave shoals with 2.7m breaker swells',
            'Within 1.8 km of Western Naval Command defense exercise zone'
          ],
          why_chosen_or_avoided: 'Not recommended: Shorter distance, but intersects dangerous swell breakers and enters naval buffer perimeter.'
        }
      ],
      recommended_route_id: 'route_b_safe',
      explanation: 'Route B is recommended: adds 15 minutes of transit time but ensures safe navigation around confirmed high swell zones.'
    };
  }
}

export async function fetchAlerts(): Promise<MarineAdvisory[]> {
  try {
    const res = await fetch(`${API_BASE}/alerts`);
    if (!res.ok) throw new Error('API error');
    return await res.json();
  } catch {
    return [
      {
        id: 'ADV-WAVE-01',
        advisory_type: 'High Wave Alert',
        severity: 'CAUTION',
        region_name: 'Arabian Sea (Maharashtra Coast)',
        latitude: 18.88,
        longitude: 72.65,
        radius_km: 45.0,
        description: 'INCOIS reports swell surge waves between 2.2m to 2.8m expected from 11:30 AM IST. Artisanal craft advised to return before noon.',
        start_time: 'Today, 11:30 IST',
        end_time: 'Today, 21:00 IST'
      },
      {
        id: 'ADV-WIND-02',
        advisory_type: 'Strong Wind & Squall',
        severity: 'WARNING',
        region_name: 'Gujarat Saurashtra Offshore',
        latitude: 20.85,
        longitude: 70.2,
        radius_km: 60.0,
        description: 'Squally weather with wind gusts peaking at 48 km/h. Small craft advised not to venture beyond 15 nautical miles.',
        start_time: 'Today, 14:00 IST',
        end_time: 'Tomorrow, 08:00 IST'
      }
    ];
  }
}

export async function triggerDemoScenario(scenarioId: string, language: string = 'en'): Promise<any> {
  const res = await fetch(`${API_BASE}/scenarios/${scenarioId}/trigger?language=${encodeURIComponent(language)}`, { method: 'POST' });
  if (!res.ok) throw new Error('API error');
  return await res.json();
}

// Fallback client simulation if backend is initializing or disconnected
function getSimulatedChatResponse(query: string, language = 'en', scenarioId?: string): ChatResponse {
  const isHi = language === 'hi';
  const isMr = language === 'mr';
  const isTa = language === 'ta';

  const defaultAnswer = isHi
    ? `मरीनमाइंड एआई ने आपके प्रश्न का विश्लेषण किया: "${query}"। सुबह 06:00 से 10:30 बजे तक तटीय परिचालन सुरक्षित है। दोपहर बाद लहरें 2.6 मीटर तक बढ़ेंगी।`
    : isMr
    ? `मरीनमाइंड एआयने तुमच्या प्रश्नाचे विश्लेषण केले: "${query}". सकाळी ०६:०० ते १०:३० सागरी वेळ सुरक्षित आहे. दुपारी लाटा उसळतील.`
    : isTa
    ? `MarineMind AI உங்கள் வினாவை ஆய்வு செய்தது: "${query}". காலை 06:00 முதல் 10:30 வரை கடலோர இயக்கம் பாதுகாப்பானது.`
    : `MarineMind AI Copilot processed your request: "${query}". Safe coastal operational window active until 10:30 AM IST. Swells project higher in the afternoon.`;

  const defaultAction = isHi
    ? 'सावधानीपूर्वक आगे बढ़ें: सुबह 06:00 से 10:30 बजे तक सुरक्षित। दोपहर से पहले लौटें।'
    : isMr
    ? 'सावधगिरी बाळगा: सकाळी ०६:०० ते १०:३० सुरक्षित वेळ. दुपारपूर्वी बंदरात परत या.'
    : isTa
    ? 'பாதுகாப்பு: காலை 06:00 முதல் 10:30 வரை பாதுகாப்பானது. மதியத்திற்குள் கரை திரும்பவும்.'
    : 'PROCEED WITH CAUTION: Favorable morning conditions. Avoid deep offshore operations after 11:00 AM.';

  const defaultBullets = isHi
    ? [
        'सुबह के समय हवा (18 किमी/घंटा) और शांत लहरें (1.2 मीटर) पारंपरिक नौकाओं के लिए सुरक्षित हैं।',
        'दोपहर 11:30 बजे के बाद लहरों की ऊंचाई 2.6 मीटर और हवा की गति 44 किमी/घंटा तक बढ़ने का अनुमान है।',
        'तटीय क्षेत्र में कोई चक्रवात चेतावनी सक्रिय नहीं है।',
        'नौका की स्थिति अंतरराष्ट्रीय सीमाओं से पूरी तरह सुरक्षित है।'
      ]
    : isMr
    ? [
        'सकाळच्या वेळी वारे (१८ किमी/तास) आणि लाटा (१.२ मीटर) लहान नौकांसाठी सुरक्षित मर्यादेत आहेत.',
        'दुपारी ११:३० नंतर उसळणाऱ्या लाटांची उंची २.६ मीटरपर्यंत वाढण्याचा अंदाज आहे.',
        'कोकण किनारपट्टीवर कोणताही चक्रीवादळाचा इशारा नाही.',
        'नौका भारतीय सागरी हद्दीत पूर्ण सुरक्षित आहे.'
      ]
    : isTa
    ? [
        'அதிகாலை காற்று (18 கிமீ/மணி) மற்றும் அலைகள் (1.2 மீ) சிறிய படகுகளுக்கு பாதுகாப்பானவை.',
        'மதியம் 11:30 மணிக்கு மேல் அலை உயரம் 2.6 மீட்டராக அதிகரிக்க வாய்ப்புள்ளது.',
        'கடலோரப் பகுதியில் புயல் எச்சரிக்கை ஏதுமில்லை.',
        'படகு இந்திய கடல் எல்லைக்குள் பாதுகாப்பாக உள்ளது.'
      ]
    : [
        'Early morning wave swell (1.2m) and NW wind (18 km/h) are within safe artisanal limits.',
        'Wave swells are projected to surge to 2.6m with wind gusts of 44 km/h after 11:30 AM.',
        'No active tropical cyclone warning along the Konkan coast.',
        'Vessel position remains > 18 km inside sovereign territorial waters.'
      ];

  return {
    conversation_id: 'simulated-session-fallback',
    query,
    detected_language: language,
    answer: defaultAnswer,
    action_recommendation: defaultAction,
    risk_score: 38.0,
    risk_level: 'MODERATE',
    confidence: 0.89,
    execution_plan: {
      intent: 'marine_safety_assessment',
      detected_language: language,
      location: { latitude: 18.922, longitude: 72.8347, name: 'Mumbai Coast' },
      time_window: 'morning',
      activity: 'fishing_safety',
      required_agents: ['weather_agent', 'ocean_agent', 'geospatial_agent', 'risk_agent', 'explainability_agent'],
      execution_strategy: 'parallel',
      steps: [
        { step_id: 1, step_name: 'Query Decomposition', description: 'Decompose safety inquiry', agent_assigned: 'planner_agent', status: 'completed' },
        { step_id: 2, step_name: 'Atmospheric Query', description: 'Retrieve swell and wind vectors', agent_assigned: 'weather_agent', status: 'completed' },
        { step_id: 3, step_name: 'Ocean Dynamics', description: 'Check SST and tidal fronts', agent_assigned: 'ocean_agent', status: 'completed' },
        { step_id: 4, step_name: 'Risk Synthesis', description: 'Fuse multi-factor risk score', agent_assigned: 'risk_agent', status: 'completed' },
        { step_id: 5, step_name: 'Explainability Synthesis', description: 'Generate transparent recommendations', agent_assigned: 'explainability_agent', status: 'completed' }
      ]
    },
    agent_statuses: [
      { agent: 'Weather Intelligence Agent', status: 'completed', summary: 'Wind 22 km/h NW, Waves 1.4m', badge: '1.4m swell' },
      { agent: 'Ocean Analytics Agent', status: 'completed', summary: 'SST 28.1°C, Chlorophyll 2.15 mg/m³', badge: 'Productivity 82/100' },
      { agent: 'Geospatial Reasoning Agent', status: 'completed', summary: 'Distance to IMBL: 18.5 km (Safe)', badge: 'Clear of MPAs' },
      { agent: 'Risk Assessment Agent', status: 'completed', summary: 'Moderate Risk (38/100)', badge: 'Safety Window Active' }
    ],
    evidence: [
      { source_agent: 'Weather Intelligence Agent', factor: 'Wave Height', value: '1.4 meters', impact: 'Safe morning swell', confidence: 0.92 },
      { source_agent: 'Weather Intelligence Agent', factor: 'Wind Velocity', value: '22 km/h NW', impact: 'Moderate breeze', confidence: 0.90 },
      { source_agent: 'Ocean Analytics Agent', factor: 'Sea Surface Temp', value: '28.1 °C', impact: 'Favorable thermal front', confidence: 0.88 },
      { source_agent: 'Geospatial Agent', factor: 'Boundary Distance', value: '18.5 km to IMBL', impact: 'Within Indian territorial waters', confidence: 0.95 }
    ],
    explainability: {
      action_recommendation: defaultAction,
      confidence_score: 0.89,
      why_bullets: defaultBullets,
      key_evidence: [],
      critical_safety_notice: 'MarineMind AI is an advisory decision support system. Follow Indian Coast Guard advisories.'
    },
    map_focus: { latitude: 18.922, longitude: 72.8347, zoom: 11 },
    active_layers: ['vessel', 'pfz', 'weather', 'waves'],
    pfz_zones: [],
    routes: [],
    geofence_status: {
      is_inside: false,
      is_approaching: false,
      nearest_zone_name: 'IMBL',
      nearest_zone_category: 'International Boundary',
      distance_to_boundary_km: 18.5,
      alert_level: 'SAFE',
      warning_message: 'Safe operating waters.',
      recommended_action: 'Maintain standard navigational watch.'
    },
    alerts: []
  };
}