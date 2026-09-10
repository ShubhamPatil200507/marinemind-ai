// frontend/src/services/i18n.ts

export type LanguageCode = 'en' | 'hi' | 'mr' | 'ta';

export interface TranslationSchema {
  common: {
    live: string;
    simulated: string;
    ais_active: string;
    change: string;
    safe: string;
    moderate: string;
    high_risk: string;
    critical: string;
    recommended: string;
    highly_recommended: string;
    avoid: string;
    transit: string;
    clearance: string;
    confidence: string;
    km: string;
    m: string;
    knots: string;
    depth_unit: string;
  };
  nav: {
    dashboard: string;
    copilot: string;
    pfz: string;
    risk: string;
    routes: string;
    geofence: string;
    alerts: string;
    analytics: string;
    short_ops: string;
    short_copilot: string;
    short_pfz: string;
    short_risk: string;
    short_routes: string;
    short_geofence: string;
    short_alerts: string;
    short_analytics: string;
  };
  scenarios: {
    label: string;
    s1: string;
    s2: string;
    s3: string;
    s4: string;
  };
  copilot: {
    title: string;
    pipeline_online: string;
    welcome: string;
    inquiries_label: string;
    inquiries: string[];
    input_placeholder: string;
    send_btn: string;
    assessing: string;
    rationale_title: string;
    key_factors: string;
    focus_map: string;
    risk_index: string;
    confidence: string;
    operator: string;
  };
  dashboard: {
    sector: string;
    safe_window_active: string;
    title: string;
    subtitle: string;
    launch_copilot: string;
    pfz_directory: string;
    demo_heading: string;
    demo_subheading: string;
    scenarios_count: string;
    telemetry_heading: string;
    run_flow: string;
    risk_title: string;
    risk_summary: string;
    top_pfz_title: string;
    hydro_title: string;
    hydro_summary: string;
    advisories_title: string;
    active_bulletins: string;
    advisories_summary: string;
    sst_label: string;
    chl_label: string;
    swell_label: string;
    scenario_badges: {
      s1: string;
      s2: string;
      s3: string;
      s4: string;
    };
    scenario_metrics: {
      s1: string;
      s2: string;
      s3: string;
      s4: string;
    };
    scenario_highlights: {
      s1: string;
      s2: string;
      s3: string;
      s4: string;
    };
  };
  map: {
    vessel: string;
    top_pfz: string;
    gps_sector: string;
    set_pin: string;
    layers: string;
    mobile_copilot: string;
    mobile_map: string;
    mobile_both: string;
    layer_thermal: string;
    layer_chloro: string;
    layer_swell: string;
    layer_pfz: string;
    layer_borders: string;
    layer_routes: string;
    layer_fairways: string;
  };
  pfz: {
    title: string;
    zones_available: string;
    sector_label: string;
    all_zones: string;
    recommended_filter: string;
    calm_waters: string;
    contrast_title: string;
    contrast_recommended_desc: string;
    contrast_avoid_desc: string;
    th_zone: string;
    th_coords: string;
    th_distance: string;
    th_sst: string;
    th_chl: string;
    th_species: string;
    th_depth: string;
    th_status: string;
    th_action: string;
    plot_route: string;
    inspect_map: string;
    score_label: string;
    reasons_title: string;
    target_species: string;
  };
  risk: {
    matrix_subtitle: string;
    title: string;
    desc: string;
    category_label: string;
    overall_gauge: string;
    factor_waves: string;
    factor_wind: string;
    factor_lightning: string;
    factor_cyclone: string;
    factor_visibility: string;
    factor_buffer: string;
    hourly_heading: string;
    hourly_desc: string;
    th_time: string;
    th_wave: string;
    th_wind: string;
    th_risk: string;
    th_status: string;
    safe_badge: string;
    advisory_badge: string;
  };
  routes: {
    title: string;
    desc: string;
    route_a_name: string;
    route_a_desc: string;
    route_b_name: string;
    route_b_desc: string;
    recommended_tag: string;
    high_risk_tag: string;
    waypoints_title: string;
    fuel_delta: string;
    transit_time: string;
    hazard_clearance: string;
    action_navigate: string;
    th_waypoint: string;
    th_lat: string;
    th_lon: string;
    th_heading: string;
    th_speed: string;
    th_nav_hazard: string;
  };
  geofence: {
    title: string;
    desc: string;
    imbl_label: string;
    status_safe: string;
    status_warning: string;
    distance_to_border: string;
    buffer_threshold: string;
    simulate_proximity: string;
    reset_position: string;
    safety_instruction: string;
    mpa_label: string;
    naval_label: string;
  };
  alerts: {
    title: string;
    desc: string;
    all_filter: string;
    critical_filter: string;
    warning_filter: string;
    advisory_filter: string;
    source_incois: string;
    source_imd: string;
    source_coastguard: string;
    status_active: string;
    issued_at: string;
  };
  analytics: {
    title: string;
    desc: string;
    sst_heading: string;
    sst_desc: string;
    chl_heading: string;
    chl_desc: string;
    correlation_heading: string;
    correlation_desc: string;
    optimal_range: string;
    bloom_status: string;
  };
  locationModal: {
    title: string;
    desc: string;
    select_preset: string;
    custom_gps: string;
    latitude: string;
    longitude: string;
    heading: string;
    cancel: string;
    save: string;
  };
  noticeModal: {
    title: string;
    dept: string;
    body: string;
    compliance: string;
    acknowledge: string;
  };
  footer: {
    agents_online: string;
    position: string;
    mode: string;
    prototype_edition: string;
    statutory_notice: string;
  };
  auth: {
    welcome_title: string;
    welcome_subtitle: string;
    badge_government: string;
    badge_live_satellite: string;
    sign_in_tab: string;
    register_tab: string;
    vessel_id_label: string;
    vessel_id_placeholder: string;
    phone_label: string;
    phone_placeholder: string;
    password_label: string;
    password_placeholder: string;
    name_label: string;
    name_placeholder: string;
    harbor_label: string;
    harbor_placeholder: string;
    sign_in_btn: string;
    register_btn: string;
    instant_access_btn: string;
    instant_access_desc: string;
    demo_credentials_hint: string;
    logout_btn: string;
    logged_in_as: string;
    platform_capabilities_heading: string;
    feature_agents_title: string;
    feature_agents_desc: string;
    feature_satellite_title: string;
    feature_satellite_desc: string;
    feature_imbl_title: string;
    feature_imbl_desc: string;
  };
}

export const TRANSLATIONS: Record<LanguageCode, TranslationSchema> = {
  en: {
    common: {
      live: 'Live Stream',
      simulated: 'Simulated',
      ais_active: 'AIS Active',
      change: 'Change',
      safe: 'Safe',
      moderate: 'Moderate',
      high_risk: 'High Risk',
      critical: 'Critical',
      recommended: 'Recommended',
      highly_recommended: 'Highly Recommended',
      avoid: 'Avoid',
      transit: 'Transit',
      clearance: 'Clearance',
      confidence: 'Confidence',
      km: 'km',
      m: 'm',
      knots: 'kts',
      depth_unit: 'm'
    },
    nav: {
      dashboard: 'Operations',
      copilot: 'Copilot & Map',
      pfz: 'PFZ Forecasts',
      risk: 'Risk Matrix',
      routes: 'Safe Routes',
      geofence: 'Boundaries',
      alerts: 'Advisories',
      analytics: 'Oceanography',
      short_ops: 'Ops',
      short_copilot: 'Copilot',
      short_pfz: 'PFZ',
      short_risk: 'Risk',
      short_routes: 'Routes',
      short_geofence: 'Bounds',
      short_alerts: 'Alerts',
      short_analytics: 'Ocean'
    },
    scenarios: {
      label: 'Quick Scenarios:',
      s1: '1. Safety Decision (06:00-10:00 Window)',
      s2: '2. PFZ Alpha vs Bravo',
      s3: '3. Fairway Detour (Route B)',
      s4: '4. IMBL Proximity (4.2 km)'
    },
    copilot: {
      title: 'Maritime AI Copilot',
      pipeline_online: 'Online',
      welcome: 'MarineMind AI is ready. Select an inquiry or ask about fishing zones, wave forecasts, safe routes, or boundaries.',
      inquiries_label: 'Inquiries:',
      inquiries: [
        'Is it safe to go fishing tomorrow morning?',
        'Where is the nearest PFZ today?',
        'What is the safest route to PFZ Alpha?',
        'Am I approaching a restricted or international boundary?'
      ],
      input_placeholder: 'Type query or select an inquiry...',
      send_btn: 'Send',
      assessing: 'Analyzing satellite oceanography and hydrodynamic waves...',
      rationale_title: 'Key Assessment Factors:',
      key_factors: 'Key Assessment Factors:',
      focus_map: 'Focus PFZ Alpha on Map',
      risk_index: 'Risk Index',
      confidence: 'Confidence',
      operator: 'Operator'
    },
    dashboard: {
      sector: 'OPERATIONAL SECTOR: ARABIAN SEA',
      safe_window_active: 'Safe Window Active (06:00 - 10:30 IST)',
      title: 'Marine Intelligence & Safety Operations',
      subtitle: 'Autonomous decision-support fusing satellite SST, optical chlorophyll, hydrodynamic waves, and maritime boundary safety.',
      launch_copilot: 'Launch Copilot',
      pfz_directory: 'View PFZ Zones',
      demo_heading: 'Quick Scenario Launchers',
      demo_subheading: 'Demonstrate multi-agent decision support with 1-click presets',
      scenarios_count: '4 Scenarios',
      telemetry_heading: 'Live Coastal Telemetry & Environmental Status',
      run_flow: 'Run Flow',
      risk_title: 'Marine Risk Assessment',
      risk_summary: 'Nearshore operations safe; swell rises significantly afternoon.',
      top_pfz_title: 'Nearest Potential Fishing Zone',
      hydro_title: 'Hydrodynamic Sea State',
      hydro_summary: 'Calm morning conditions; wave breaker shoals active offshore.',
      advisories_title: 'Active Coastal Advisories',
      active_bulletins: 'Active Bulletins',
      advisories_summary: 'High wave small craft alert active for outer fairway.',
      sst_label: 'SST',
      chl_label: 'Chl',
      swell_label: 'swell',
      scenario_badges: {
        s1: 'TEMPORAL RISK',
        s2: 'RESOURCE FUSION',
        s3: 'NAVIGATION OPTIMIZER',
        s4: 'SOVEREIGNTY GUARDIAN'
      },
      scenario_metrics: {
        s1: 'Safe Window: 06:00 - 10:30 AM',
        s2: 'PFZ Alpha (8.2 km) - 86/100',
        s3: 'Route B: Low Risk (+15 min transit)',
        s4: '4.2 km remaining (< 5 km buffer)'
      },
      scenario_highlights: {
        s1: 'Swell surge increases to 2.6m after 11:30 AM',
        s2: 'PFZ Bravo (6.1 km) rejected due to 2.7m breaker shoals',
        s3: 'Route A rejected: passes through firing range & shoals',
        s4: 'Audible warning & course correction recommendation (270°)'
      }
    },
    map: {
      vessel: 'Vessel',
      top_pfz: 'Top PFZ',
      gps_sector: 'GPS Sector',
      set_pin: 'Set Pin',
      layers: 'Layers',
      mobile_copilot: 'Copilot Chat',
      mobile_map: 'Interactive Map',
      mobile_both: 'Split View',
      layer_thermal: 'Thermal Fronts (SST)',
      layer_chloro: 'Chlorophyll Plumes',
      layer_swell: 'High Swell Hazard',
      layer_pfz: 'PFZ Fish Density',
      layer_borders: 'Border & Restricted Zones',
      layer_routes: 'Optimal Safe Routes',
      layer_fairways: 'Commercial Fairways'
    },
    pfz: {
      title: 'Potential Fishing Zones (PFZ)',
      zones_available: 'Zones Available',
      sector_label: 'Sector',
      all_zones: 'All Zones',
      recommended_filter: 'Recommended',
      calm_waters: 'Calm Waters',
      contrast_title: 'Top Recommendation vs Avoid Hazard Analysis',
      contrast_recommended_desc: 'PFZ Alpha (8.2 km): Optimal thermal front with safe 1.2m hydrodynamic swell. Highly recommended.',
      contrast_avoid_desc: 'PFZ Bravo (6.1 km): Physically closer but hazardous 2.8m shallow breaker shoals. Avoid.',
      th_zone: 'Zone Name',
      th_coords: 'Coordinates',
      th_distance: 'Distance',
      th_sst: 'SST (°C)',
      th_chl: 'Chlorophyll',
      th_species: 'Target Species',
      th_depth: 'Depth',
      th_status: 'Assessment',
      th_action: 'Action',
      plot_route: 'Plot Safe Route',
      inspect_map: 'Inspect on Map',
      score_label: 'Productivity Score',
      reasons_title: 'Analysis Rationale',
      target_species: 'Expected Catch'
    },
    risk: {
      matrix_subtitle: 'Hazard Assessment Matrix',
      title: 'Marine Risk Analysis & Sea Safety',
      desc: 'Real-time multi-factor evaluation integrating wind velocity, swell periods, convective lightning, and boundary safety margins.',
      category_label: 'Risk Category',
      overall_gauge: 'Overall Risk Index',
      factor_waves: 'Swell Wave Height',
      factor_wind: 'Surface Wind Speed',
      factor_lightning: 'Convective Lightning',
      factor_cyclone: 'Cyclone Advisory',
      factor_visibility: 'Navigational Visibility',
      factor_buffer: 'Boundary Buffer Margin',
      hourly_heading: 'Hourly Swell Surge & Sea Condition Forecast',
      hourly_desc: 'Hydrodynamic model projection over 12 operational hours',
      th_time: 'Time (IST)',
      th_wave: 'Wave Height',
      th_wind: 'Wind Speed',
      th_risk: 'Risk Assessment',
      th_status: 'Safety Status',
      safe_badge: 'SAFE TO OPERATE',
      advisory_badge: 'HAZARDOUS SWELL'
    },
    routes: {
      title: 'Safe Marine Route Navigation',
      desc: 'Autonomous hydrodynamic fairway pathfinding avoiding high-swell shoals, naval firing polygons, and restricted borders.',
      route_a_name: 'Route A (Direct Geometric Line)',
      route_a_desc: '12.0 km straight path. Bisects active naval firing sector and 2.7m breaker shoals. High risk of capsizing.',
      route_b_name: 'Route B (Certified Safe Fairway Detour)',
      route_b_desc: '16.2 km detour route. Maintains 2.5 km buffer from hazard polygons. Certified calm water fairway.',
      recommended_tag: 'RECOMMENDED ROUTE',
      high_risk_tag: 'HIGH RISK - HAZARDS',
      waypoints_title: 'Turn-by-Turn Navigation Waypoints',
      fuel_delta: 'Fuel Consumption Delta',
      transit_time: 'Est. Transit Time',
      hazard_clearance: 'Hazard Buffer Clearance',
      action_navigate: 'Deploy Route to GPS',
      th_waypoint: 'Waypoint',
      th_lat: 'Latitude',
      th_lon: 'Longitude',
      th_heading: 'Heading',
      th_speed: 'Target Speed',
      th_nav_hazard: 'Hazard Clearance'
    },
    geofence: {
      title: 'Territorial Waters & Boundary Guardian',
      desc: 'Real-time proximity monitoring auditing distance to the International Maritime Boundary Line (IMBL) and Marine Protected Areas.',
      imbl_label: 'International Maritime Boundary Line (IMBL)',
      status_safe: 'SAFE DISTANCE (> 15 km)',
      status_warning: 'BORDER PROXIMITY ALERT (< 5 km)',
      distance_to_border: 'Distance to International Boundary',
      buffer_threshold: 'Statutory Safety Buffer Threshold',
      simulate_proximity: 'Simulate Near-Border Position (4.2 km)',
      reset_position: 'Reset to Home Harbor',
      safety_instruction: 'Maintain heading 270° West to remain safely within Indian sovereign waters.',
      mpa_label: 'Marine Protected Area (Eco-Sensitive)',
      naval_label: 'Naval Restricted Practice Zone'
    },
    alerts: {
      title: 'Coastal Advisories & Safety Bulletins',
      desc: 'Real-time official maritime bulletins categorized by severity and operational priority.',
      all_filter: 'All Bulletins',
      critical_filter: 'Critical Warnings',
      warning_filter: 'Warnings',
      advisory_filter: 'Advisories',
      source_incois: 'INCOIS Marine Forecast',
      source_imd: 'IMD Cyclone Wing',
      source_coastguard: 'Indian Coast Guard',
      status_active: 'ACTIVE ADVISORY',
      issued_at: 'Issued'
    },
    analytics: {
      title: 'Oceanographic Earth Observation Analytics',
      desc: 'Satellite ocean color radiometers and infrared Sea Surface Temperature diurnal regression trends.',
      sst_heading: 'Diurnal Sea Surface Temperature (SST) Curve',
      sst_desc: 'Hourly infrared satellite observation indicating thermal front formation',
      chl_heading: 'Optical Chlorophyll-a Depth Stratification',
      chl_desc: 'Photometric concentration across bathymetric water column',
      correlation_heading: 'Wind-Wave Hydrodynamic Coupling',
      correlation_desc: 'Empirical relationship between surface wind stress and wave swell growth',
      optimal_range: 'Optimal Pelagic Feeding Range',
      bloom_status: 'Phytoplankton Plume Active'
    },
    locationModal: {
      title: 'Set Operating Sector & Vessel Location',
      desc: 'Select a major coastal fishing harbor or enter custom GPS coordinates for real-time telemetry.',
      select_preset: 'Choose Coastal Harbor / Sector',
      custom_gps: 'Custom GPS Coordinates',
      latitude: 'Latitude (°N)',
      longitude: 'Longitude (°E)',
      heading: 'Vessel Heading (°)',
      cancel: 'Cancel',
      save: 'Save & Update Telemetry'
    },
    noticeModal: {
      title: 'Official Maritime Safety Notice',
      dept: 'Ministry of Ports, Shipping and Waterways',
      body: 'MarineMind AI is an autonomous decision-support system. While models fuse real-time satellite earth observation and hydrodynamic wave models, skippers retain statutory command over their vessel safety.',
      compliance: 'Compliant with DG Shipping Safety Circulars & INCOIS Bulletins',
      acknowledge: 'Understood & Proceed'
    },
    footer: {
      agents_online: 'All 10 Specialized Marine Agents Online',
      position: 'GPS Verified',
      mode: 'Live Marine Stream',
      prototype_edition: 'MarineMind AI Enterprise Edition',
      statutory_notice: 'Statutory Maritime Safety Notice'
    }
  },

  hi: {
    common: {
      live: 'लाइव स्ट्रीम',
      simulated: 'सिम्युलेटेड',
      ais_active: 'AIS सक्रिय',
      change: 'बदलें',
      safe: 'सुरक्षित',
      moderate: 'मध्यम',
      high_risk: 'उच्च जोखिम',
      critical: 'गंभीर',
      recommended: 'अनुशंसित',
      highly_recommended: 'अत्यधिक अनुशंसित',
      avoid: 'बचें',
      transit: 'यात्रा समय',
      clearance: 'निकासी दूरी',
      confidence: 'विश्वास',
      km: 'किमी',
      m: 'मी',
      knots: 'नॉट्स',
      depth_unit: 'मी'
    },
    nav: {
      dashboard: 'परिचालन',
      copilot: 'कोपायलट और मानचित्र',
      pfz: 'मत्स्य क्षेत्र (PFZ)',
      risk: 'जोखिम मैट्रिक्स',
      routes: 'सुरक्षित मार्ग',
      geofence: 'समुद्री सीमाएं',
      alerts: 'चेतावनी बुलेटिन',
      analytics: 'समुद्र विज्ञान',
      short_ops: 'परिचालन',
      short_copilot: 'कोपायलट',
      short_pfz: 'PFZ',
      short_risk: 'जोखिम',
      short_routes: 'मार्ग',
      short_geofence: 'सीमाएं',
      short_alerts: 'सूचनाएं',
      short_analytics: 'समुद्र'
    },
    scenarios: {
      label: 'त्वरित परिदृश्य:',
      s1: '1. सुरक्षा निर्णय (सुबह 06:00-10:00 समय)',
      s2: '2. PFZ Alpha बनाम Bravo तुलना',
      s3: '3. सुरक्षित चक्करदार मार्ग (Route B)',
      s4: '4. अंतरराष्ट्रीय सीमा निकटता (4.2 किमी)'
    },
    copilot: {
      title: 'समुद्री एआई कोपायलट',
      pipeline_online: 'सक्रिय (ऑनलाइन)',
      welcome: 'मरीनमाइंड एआई तैयार है। मछली पकड़ने के क्षेत्र, लहरों के पूर्वानुमान, सुरक्षित मार्ग या सीमा के बारे में पूछें।',
      inquiries_label: 'सुझाए गए प्रश्न:',
      inquiries: [
        'क्या कल सुबह मछली पकड़ने जाना सुरक्षित है?',
        'आज सबसे नजदीकी मत्स्य क्षेत्र (PFZ) कहाँ है?',
        'PFZ Alpha तक जाने का सबसे सुरक्षित मार्ग क्या है?',
        'क्या मैं किसी प्रतिबंधित या अंतरराष्ट्रीय सीमा के करीब हूँ?'
      ],
      input_placeholder: 'अपना प्रश्न लिखें या ऊपर से चुनें...',
      send_btn: 'भेजें',
      assessing: 'उपग्रह डेटा और समुद्री लहरों का विश्लेषण किया जा रहा है...',
      rationale_title: 'मूल्यांकन के मुख्य कारक:',
      key_factors: 'मूल्यांकन के मुख्य कारक:',
      focus_map: 'मानचित्र पर PFZ Alpha देखें',
      risk_index: 'जोखिम सूचकांक',
      confidence: 'विश्वास रेटिंग',
      operator: 'ऑपरेटर (नाविक)'
    },
    dashboard: {
      sector: 'परिचालन क्षेत्र: अरब सागर',
      safe_window_active: 'सुरक्षित समय सक्रिय (सुबह 06:00 - 10:30 IST)',
      title: 'समुद्री बुद्धिमत्ता और सुरक्षा परिचालन',
      subtitle: 'उपग्रह समुद्र तापमान, क्लोरोफिल, लहरों और अंतरराष्ट्रीय सीमा सुरक्षा का वास्तविक समय विश्लेषण।',
      launch_copilot: 'कोपायलट शुरू करें',
      pfz_directory: 'मत्स्य क्षेत्र देखें',
      demo_heading: 'त्वरित परिदृश्य परीक्षण',
      demo_subheading: '1-क्लिक में मल्टी-एजेंट समुद्री निर्णय सहायता का अनुभव करें',
      scenarios_count: '4 परिदृश्य',
      telemetry_heading: 'लाइव तटीय टेलीमेट्री और पर्यावरणीय स्थिति',
      run_flow: 'जांचें',
      risk_title: 'समुद्री जोखिम मूल्यांकन',
      risk_summary: 'तट के पास परिचालन सुरक्षित है; दोपहर बाद लहरें बढ़ेंगी।',
      top_pfz_title: 'निकटतम संभावित मत्स्य क्षेत्र',
      hydro_title: 'समुद्री लहरों की स्थिति',
      hydro_summary: 'सुबह शांत स्थिति; गहरे समुद्र में ऊंची लहरें सक्रिय।',
      advisories_title: 'सक्रिय तटीय चेतावनियां',
      active_bulletins: 'सक्रिय बुलेटिन',
      advisories_summary: 'बाहरी समुद्री मार्ग के लिए छोटी नौकाओं हेतु चेतावनी जारी।',
      sst_label: 'तापमान',
      chl_label: 'क्लोरोफिल',
      swell_label: 'लहरें',
      scenario_badges: {
        s1: 'समय-आधारित जोखिम',
        s2: 'मत्स्य संसाधन',
        s3: 'मार्ग अनुकूलक',
        s4: 'सीमा रक्षक'
      },
      scenario_metrics: {
        s1: 'सुरक्षित समय: सुबह 06:00 - 10:30',
        s2: 'PFZ Alpha (8.2 किमी) - 86/100',
        s3: 'Route B: कम जोखिम (+15 मिनट)',
        s4: '4.2 किमी शेष (< 5 किमी बफर)'
      },
      scenario_highlights: {
        s1: 'सुबह 11:30 के बाद लहरें बढ़कर 2.6 मीटर हो जाएंगी',
        s2: 'PFZ Bravo (6.1 किमी) खतरनाक 2.7 मीटर लहरों के कारण अस्वीकृत',
        s3: 'Route A अस्वीकृत: नौसेना अभ्यास क्षेत्र और उथली चट्टानों से गुजरता है',
        s4: 'श्रव्य चेतावनी और सुरक्षित दिशा परिवर्तन की सिफारिश (270°)'
      }
    },
    map: {
      vessel: 'नाव (जहाज)',
      top_pfz: 'शीर्ष PFZ',
      gps_sector: 'जीपीएस सेक्टर',
      set_pin: 'पिन लगाएं',
      layers: 'परतें',
      mobile_copilot: 'कोपायलट चैट',
      mobile_map: 'मानचित्र',
      mobile_both: 'विभाजित दृश्य',
      layer_thermal: 'थर्मल फ्रंट्स (SST)',
      layer_chloro: 'क्लोरोफिल क्षेत्र',
      layer_swell: 'ऊंची लहरों का खतरा',
      layer_pfz: 'मछली घनत्व (PFZ)',
      layer_borders: 'सीमा और प्रतिबंधित क्षेत्र',
      layer_routes: 'सुरक्षित नौवहन मार्ग',
      layer_fairways: 'वाणिज्यिक जलमार्ग'
    },
    pfz: {
      title: 'संभाव्य मत्स्य क्षेत्र (PFZ)',
      zones_available: 'क्षेत्र उपलब्ध',
      sector_label: 'सेक्टर',
      all_zones: 'सभी क्षेत्र',
      recommended_filter: 'अनुशंसित',
      calm_waters: 'शांत जल',
      contrast_title: 'शीर्ष अनुशंसित बनाम खतरनाक क्षेत्र की तुलना',
      contrast_recommended_desc: 'PFZ Alpha (8.2 किमी): अनुकूल तापमान और शांत 1.2 मीटर लहरें। अत्यधिक अनुशंसित।',
      contrast_avoid_desc: 'PFZ Bravo (6.1 किमी): पास है परंतु 2.8 मीटर खतरनाक उथली लहरें हैं। जाने से बचें।',
      th_zone: 'क्षेत्र का नाम',
      th_coords: 'निर्देशांक',
      th_distance: 'दूरी',
      th_sst: 'समुद्र तापमान (°C)',
      th_chl: 'क्लोरोफिल',
      th_species: 'प्रमुख मछलियां',
      th_depth: 'गहराई',
      th_status: 'स्थिति',
      th_action: 'कार्रवाई',
      plot_route: 'सुरक्षित मार्ग बनाएं',
      inspect_map: 'मानचित्र पर देखें',
      score_label: 'उत्पादकता स्कोर',
      reasons_title: 'विश्लेषण कारण',
      target_species: 'संभावित मछली पकड़'
    },
    risk: {
      matrix_subtitle: 'खतरा मूल्यांकन मैट्रिक्स',
      title: 'समुद्री जोखिम विश्लेषण और सुरक्षा',
      desc: 'हवा की गति, लहरों की ऊंचाई, आसमानी बिजली और समुद्री सीमा बफर का वास्तविक समय विश्लेषण।',
      category_label: 'जोखिम श्रेणी',
      overall_gauge: 'समग्र जोखिम सूचकांक',
      factor_waves: 'लहरों की ऊंचाई',
      factor_wind: 'सतह हवा की गति',
      factor_lightning: 'आसमानी बिजली का खतरा',
      factor_cyclone: 'चक्रवात चेतावनी',
      factor_visibility: 'नेविगेशन दृश्यता',
      factor_buffer: 'सीमा बफर मार्जिन',
      hourly_heading: 'प्रति घंटा समुद्री स्थिति और लहरों का पूर्वानुमान',
      hourly_desc: 'अगले 12 घंटों के लिए हाइड्रोडायनामिक पूर्वानुमान',
      th_time: 'समय (IST)',
      th_wave: 'लहर की ऊंचाई',
      th_wind: 'हवा की गति',
      th_risk: 'जोखिम स्तर',
      th_status: 'सुरक्षा स्थिति',
      safe_badge: 'परिचालन सुरक्षित',
      advisory_badge: 'खतरनाक लहरें'
    },
    routes: {
      title: 'सुरक्षित समुद्री मार्ग योजना',
      desc: 'खतरनाक उथले क्षेत्रों, नौसैनिक फायरिंग रेंज और अंतरराष्ट्रीय सीमाओं से बचाते हुए सुरक्षित मार्ग।',
      route_a_name: 'मार्ग A (सीधा ज्यामितीय मार्ग)',
      route_a_desc: '12.0 किमी सीधा रास्ता। नौसेना अभ्यास क्षेत्र और 2.7 मीटर खतरनाक लहरों से होकर गुजरता है। पलटने का भारी खतरा।',
      route_b_name: 'मार्ग B (प्रमाणित सुरक्षित चक्करदार मार्ग)',
      route_b_desc: '16.2 किमी चक्करदार रास्ता। सभी खतरों से 2.5 किमी की सुरक्षित दूरी बनाए रखता है। शांत जल मार्ग।',
      recommended_tag: 'अनुशंसित सुरक्षित मार्ग',
      high_risk_tag: 'उच्च जोखिम - खतरे',
      waypoints_title: 'चरण-दर-चरण नेविगेशन वेपॉइंट्स',
      fuel_delta: 'ईंधन खपत अंतर',
      transit_time: 'अनुमानित यात्रा समय',
      hazard_clearance: 'खतरों से सुरक्षित दूरी',
      action_navigate: 'GPS पर मार्ग भेजें',
      th_waypoint: 'वेपॉइंट',
      th_lat: 'अक्षांश',
      th_lon: 'देशांतर',
      th_heading: 'दिशा',
      th_speed: 'गति',
      th_nav_hazard: 'खतरे से दूरी'
    },
    geofence: {
      title: 'क्षेत्रीय जल और सीमा सुरक्षा गार्डियन',
      desc: 'अंतरराष्ट्रीय समुद्री सीमा रेखा (IMBL) और समुद्री संरक्षित क्षेत्रों की वास्तविक समय निगरानी।',
      imbl_label: 'अंतरराष्ट्रीय समुद्री सीमा रेखा (IMBL)',
      status_safe: 'सुरक्षित दूरी (> 15 किमी)',
      status_warning: 'सीमा चेतावनी - बहुत करीब (< 5 किमी)',
      distance_to_border: 'अंतरराष्ट्रीय सीमा से दूरी',
      buffer_threshold: 'कानूनी सुरक्षा बफर सीमा',
      simulate_proximity: 'सीमा के पास की स्थिति जांचें (4.2 किमी)',
      reset_position: 'गृह बंदरगाह पर वापस सेट करें',
      safety_instruction: 'भारतीय संप्रभु जल में रहने के लिए 270° पश्चिम की ओर दिशा बनाए रखें।',
      mpa_label: 'समुद्री संरक्षित पर्यावरण क्षेत्र',
      naval_label: 'नौसेना प्रतिबंधित अभ्यास क्षेत्र'
    },
    alerts: {
      title: 'तटीय चेतावनियां और सुरक्षा बुलेटिन',
      desc: 'प्राथमिकता और गंभीरता के आधार पर वर्गीकृत आधिकारिक समुद्री बुलेटिन।',
      all_filter: 'सभी बुलेटिन',
      critical_filter: 'गंभीर चेतावनियां',
      warning_filter: 'चेतावनियां',
      advisory_filter: 'परामर्श',
      source_incois: 'INCOIS समुद्री पूर्वानुमान',
      source_imd: 'IMD चक्रवात प्रभाग',
      source_coastguard: 'भारतीय तटरक्षक बल',
      status_active: 'सक्रिय चेतावनी',
      issued_at: 'जारी किया गया'
    },
    analytics: {
      title: 'समुद्र विज्ञान उपग्रह अवलोकन विश्लेषण',
      desc: 'उपग्रह इंफ्रारेड समुद्र तापमान (SST) और ऑप्टिकल क्लोरोफिल घनत्व का गहन विश्लेषण।',
      sst_heading: 'दैनिक समुद्र सतह तापमान (SST) वक्र',
      sst_desc: 'घंटेवार इंफ्रारेड उपग्रह डेटा जो थर्मल फ्रंट बनने का संकेत देता है',
      chl_heading: 'ऑप्टिकल क्लोरोफिल-ए गहराई स्तरीकरण',
      chl_desc: 'विभिन्न जल गहराइयों पर पादप प्लवक का वितरण',
      correlation_heading: 'हवा और लहरों का हाइड्रोडायनामिक संबंध',
      correlation_desc: 'सतह हवा और लहरों के विकास के बीच का संबंध',
      optimal_range: 'मछलियों के अनुकूल आहार सीमा',
      bloom_status: 'फाइटोप्लांकटन घनत्व सक्रिय'
    },
    locationModal: {
      title: 'परिचालन सेक्टर और नौका स्थिति सेट करें',
      desc: 'तटीय बंदरगाह चुनें या वास्तविक समय डेटा के लिए कस्टम जीपीएस निर्देशांक दर्ज करें।',
      select_preset: 'तटीय बंदरगाह / सेक्टर चुनें',
      custom_gps: 'कस्टम जीपीएस निर्देशांक',
      latitude: 'अक्षांश (°N)',
      longitude: 'देशांतर (°E)',
      heading: 'नाव की दिशा (°)',
      cancel: 'रद्द करें',
      save: 'सहेजें और अपडेट करें'
    },
    noticeModal: {
      title: 'आधिकारिक समुद्री सुरक्षा सूचना',
      dept: 'पत्तन, पोत परिवहन और जलमार्ग मंत्रालय',
      body: 'मरीनमाइंड एआई एक स्वायत्त निर्णय-सहायता प्रणाली है। उपग्रह डेटा और लहरों के मॉडल पर आधारित होने के बावजूद, नौका की सुरक्षा का अंतिम दायित्व नाविक (कप्तान) पर होता है।',
      compliance: 'डीजी शिपिंग सुरक्षा दिशानिर्देशों और INCOIS बुलेटिन के अनुरूप',
      acknowledge: 'समझ गया, आगे बढ़ें'
    },
    footer: {
      agents_online: 'सभी 10 विशेष समुद्री एजेंट ऑनलाइन',
      position: 'GPS सत्यापित',
      mode: 'लाइव समुद्री स्ट्रीम',
      prototype_edition: 'मरीनमाइंड एआई संस्करण',
      statutory_notice: 'वैधानिक समुद्री सुरक्षा सूचना'
    },
    auth: {
      welcome_title: 'मरीनमाइंड एआई: तटीय समुद्री सुरक्षा एवं मत्स्य प्रणाली',
      welcome_subtitle: 'भारतीय क्षेत्रीय जलक्षेत्र में पारंपरिक मछुआरों और वाणिज्यिक नौकाओं के लिए स्वायत्त एआई निर्णय-सहायता प्रणाली।',
      badge_government: 'INCOIS एवं पोत परिवहन मंत्रालय प्रमाणित',
      badge_live_satellite: 'लाइव उपग्रह टेलीमेट्री ऑनलाइन',
      sign_in_tab: 'नाविक / कप्तान लॉगिन',
      register_tab: 'नई नौका पंजीकरण',
      vessel_id_label: 'नौका पंजीकरण संख्या या मोबाइल नंबर',
      vessel_id_placeholder: 'उदा. IND-MH-01-MM-8492 या 9820145892',
      phone_label: 'पंजीकृत मोबाइल नंबर',
      phone_placeholder: '10 अंकों का मोबाइल नंबर',
      password_label: 'सुरक्षा पासवर्ड / समुद्री पिन',
      password_placeholder: 'अपना पासवर्ड दर्ज करें',
      name_label: 'कप्तान / मालिक का पूरा नाम',
      name_placeholder: 'उदा. रमेश पाटिल',
      harbor_label: 'मूल मछली पकड़ने का बंदरगाह',
      harbor_placeholder: 'उदा. मुंबई (ससून डॉक)',
      sign_in_btn: 'कंसोल में साइन इन करें',
      register_btn: 'पंजीकरण करें और शुरू करें',
      instant_access_btn: 'परीक्षकों के लिए 1-क्लिक त्वरित प्रवेश',
      instant_access_desc: 'सत्यापित नाविक क्रेडेंशियल्स के साथ बिना टाइप किए तुरंत कंसोल में प्रवेश करें।',
      demo_credentials_hint: 'डेमो क्रेडेंशियल: IND-MH-01-MM-8492 | पासवर्ड: marinepassword',
      logout_btn: 'साइन आउट',
      logged_in_as: 'नाविक कंसोल',
      platform_capabilities_heading: 'प्रमुख परिचालन क्षमताएं',
      feature_agents_title: '१० विशेष एआई एजेंट्स',
      feature_agents_desc: 'मौसम, लहरों, संभावित मछली क्षेत्रों और मार्ग सुरक्षा के लिए समन्वित स्वायत्त एजेंट।',
      feature_satellite_title: 'वास्तविक समय उपग्रह निरीक्षण',
      feature_satellite_desc: 'सीधे उपग्रह से समुद्र का तापमान, हवा की दिशा और लहरों का लाइव विश्लेषण।',
      feature_imbl_title: 'अंतर्राष्ट्रीय सीमा रक्षक',
      feature_imbl_desc: 'अंतर्राष्ट्रीय सीमा या प्रतिबंधित क्षेत्र में प्रवेश से पहले 5 किमी बफर चेतावनी।'
    }
  },

  mr: {
    common: {
      live: 'थेट प्रवाह (लाइव्ह)',
      simulated: 'सिम्युलेटेड',
      ais_active: 'AIS सक्रिय',
      change: 'बदला',
      safe: 'सुरक्षित',
      moderate: 'मध्यम',
      high_risk: 'उच्च धोका',
      critical: 'गंभीर धोका',
      recommended: 'शिफारस केलेले',
      highly_recommended: 'अत्यंत शिफारस केलेले',
      avoid: 'टाळा',
      transit: 'प्रवास वेळ',
      clearance: 'अंतर',
      confidence: 'विश्वासार्हता',
      km: 'किमी',
      m: 'मी',
      knots: 'नॉट्स',
      depth_unit: 'मी'
    },
    nav: {
      dashboard: 'परिचालन',
      copilot: 'कोपायलट आणि नकाशा',
      pfz: 'मासेमारी क्षेत्र (PFZ)',
      risk: 'धोका मॅट्रिक्स',
      routes: 'सुरक्षित मार्ग',
      geofence: 'सागरी हद्द',
      alerts: 'सागरी सूचना',
      analytics: 'समुद्र विज्ञान',
      short_ops: 'परिचालन',
      short_copilot: 'कोपायलट',
      short_pfz: 'PFZ',
      short_risk: 'धोका',
      short_routes: 'मार्ग',
      short_geofence: 'हद्द',
      short_alerts: 'सूचना',
      short_analytics: 'समुद्र'
    },
    scenarios: {
      label: 'त्वरित परिदृश्ये:',
      s1: '१. सुरक्षा निर्णय (सकाळी ०६:००-१०:०० वेळ)',
      s2: '२. PFZ Alpha विरूद्ध Bravo तुलना',
      s3: '३. सुरक्षित वळण मार्ग (Route B)',
      s4: '४. आंतरराष्ट्रीय सीमा निकटता (४.२ किमी)'
    },
    copilot: {
      title: 'सागरी एआय कोपायलट',
      pipeline_online: 'ऑनलाइन (सक्रिय)',
      welcome: 'मरीनमाइंड एआय सज्ज आहे. संभाव्य मासेमारी क्षेत्रे, लाटांचे अंदाज, सुरक्षित मार्ग किंवा सागरी हद्दीबाबत विचारा.',
      inquiries_label: 'सुचवलेले प्रश्न:',
      inquiries: [
        'उद्या सकाळी मासेमारीला जाणे सुरक्षित आहे का?',
        'आज सर्वात जवळचे संभाव्य मासेमारी क्षेत्र कुठे आहे?',
        'PFZ Alpha कडे जाण्यासाठी सर्वात सुरक्षित मार्ग कोणता?',
        'मी कोणत्याही प्रतिबंधित किंवा आंतरराष्ट्रीय सीमेच्या जवळ जात आहे का?'
      ],
      input_placeholder: 'प्रश्न विचारा किंवा वरून निवडा...',
      send_btn: 'पाठवा',
      assessing: 'उपग्रह निरीक्षण आणि सागरी लाटांचे विश्लेषण सुरू आहे...',
      rationale_title: 'मूल्यांकनाचे मुख्य घटक:',
      key_factors: 'मूल्यांकनाचे मुख्य घटक:',
      focus_map: 'नकाशावर PFZ Alpha पहा',
      risk_index: 'धोका निर्देशांक',
      confidence: 'विश्वासार्हता',
      operator: 'ऑपरेटर (खलाशी)'
    },
    dashboard: {
      sector: 'कार्यक्षेत्र: अरबी समुद्र',
      safe_window_active: 'सुरक्षित वेळ सुरू (सकाळी ०६:०० - १०:३० IST)',
      title: 'सागरी बुद्धिमत्ता आणि सुरक्षा परिचालन',
      subtitle: 'उपग्रह समुद्र तापमान, हरितद्रव्य, लाटा आणि सागरी सीमा सुरक्षिततेचे थेट विश्लेषण.',
      launch_copilot: 'कोपायलट सुरू करा',
      pfz_directory: 'मासेमारी क्षेत्रे पहा',
      demo_heading: 'त्वरित परिदृश्य चाचणी',
      demo_subheading: '१-क्लिकमध्ये बहु-एजंट सागरी निर्णय प्रणालीचा अनुभव घ्या',
      scenarios_count: '४ परिदृश्ये',
      telemetry_heading: 'थेट किनारपट्टी टेलिमेट्री आणि पर्यावरणीय स्थिती',
      run_flow: 'तपासा',
      risk_title: 'सागरी धोका मूल्यांकन',
      risk_summary: 'किनाऱ्याजवळ कामकाज सुरक्षित; दुपारनंतर लाटांची उंची वाढेल.',
      top_pfz_title: 'सर्वात जवळचे संभाव्य मासेमारी क्षेत्र',
      hydro_title: 'सागरी लाटांची स्थिती',
      hydro_summary: 'सकाळी शांत समुद्र; खोल समुद्रात धोकादायक लाटा सक्रिय.',
      advisories_title: 'सक्रिय सागरी इशारे',
      active_bulletins: 'सक्रिय बुलेटिन',
      advisories_summary: 'बाहेरील सागरी मार्गासाठी लहान नौकांसाठी इशारा जारी.',
      sst_label: 'तापमान',
      chl_label: 'हरितद्रव्य',
      swell_label: 'लाटा',
      scenario_badges: {
        s1: 'वेळ-आधारित धोका',
        s2: 'मत्स्य संपत्ती',
        s3: 'मार्ग अनुकूलक',
        s4: 'सीमा रक्षक'
      },
      scenario_metrics: {
        s1: 'सुरक्षित वेळ: सकाळी ०६:०० - १०:३०',
        s2: 'PFZ Alpha (८.२ किमी) - ८६/१००',
        s3: 'Route B: कमी धोका (+१५ मिनिटे)',
        s4: '४.२ किमी शिल्लक (< ५ किमी बफर)'
      },
      scenario_highlights: {
        s1: 'सकाळी ११:३० नंतर लाटा वाढून २.६ मीटर होतील',
        s2: 'PFZ Bravo (६.१ किमी) धोकादायक २.७ मीटर लाटांमुळे नाकारले',
        s3: 'Route A नाकारले: नौदल सराव क्षेत्र आणि खडकांमधून जाते',
        s4: 'धोक्याची सूचना आणि सुरक्षित दिशा बदलण्याची शिफारस (२७०°)'
      }
    },
    map: {
      vessel: 'नौका (बोट)',
      top_pfz: 'प्रमुख PFZ',
      gps_sector: 'GPS सेक्टर',
      set_pin: 'पिन सेट करा',
      layers: 'थर (लेयर्स)',
      mobile_copilot: 'कोपायलट चॅट',
      mobile_map: 'परस्पर नकाशा',
      mobile_both: 'विभाजित दृश्य',
      layer_thermal: 'थर्मल फ्रंट्स (SST)',
      layer_chloro: 'हरितद्रव्य क्षेत्र',
      layer_swell: 'मोठ्या लाटांचा धोका',
      layer_pfz: 'मासे घनता (PFZ)',
      layer_borders: 'सीमा आणि प्रतिबंधित क्षेत्र',
      layer_routes: 'सुरक्षित नौकानयन मार्ग',
      layer_fairways: 'व्यापारी जलमार्ग'
    },
    pfz: {
      title: 'संभाव्य मासेमारी क्षेत्र (PFZ)',
      zones_available: 'क्षेत्रे उपलब्ध',
      sector_label: 'सेक्टर',
      all_zones: 'सर्व क्षेत्रे',
      recommended_filter: 'शिफारस केलेले',
      calm_waters: 'शांत समुद्र',
      contrast_title: 'उत्कृष्ट शिफारस विरूद्ध धोकादायक क्षेत्राची तुलना',
      contrast_recommended_desc: 'PFZ Alpha (८.२ किमी): अनुकूल तापमान आणि शांत १.२ मीटर लाटा. अत्यंत शिफारस केलेले.',
      contrast_avoid_desc: 'PFZ Bravo (६.१ किमी): जवळ आहे पण २.८ मीटर धोकादायक लाटा आहेत. जाणे टाळा.',
      th_zone: 'क्षेत्राचे नाव',
      th_coords: 'निर्देशांक',
      th_distance: 'अंतर',
      th_sst: 'समुद्र तापमान (°C)',
      th_chl: 'हरितद्रव्य',
      th_species: 'प्रमुख मासे',
      th_depth: 'खोली',
      th_status: 'स्थिती',
      th_action: 'कृती',
      plot_route: 'सुरक्षित मार्ग आखा',
      inspect_map: 'नकाशावर पहा',
      score_label: 'उत्पादकता गुण',
      reasons_title: 'विश्लेषणाची कारणे',
      target_species: 'अपेक्षित मासे'
    },
    risk: {
      matrix_subtitle: 'धोका मूल्यांकन मॅट्रिक्स',
      title: 'सागरी धोका विश्लेषण आणि सुरक्षितता',
      desc: 'वाऱ्याचा वेग, लाटांची उंची, विजांचा कडकडाट आणि सागरी सीमा अंतराचे थेट विश्लेषण.',
      category_label: 'धोका श्रेणी',
      overall_gauge: 'एकूण धोका निर्देशांक',
      factor_waves: 'लाटांची उंची',
      factor_wind: 'पृष्ठभागावरील वाऱ्याचा वेग',
      factor_lightning: 'विजांचा धोका',
      factor_cyclone: 'चक्रीवादळ इशारा',
      factor_visibility: 'दिशादर्शन दृश्यमानता',
      factor_buffer: 'सीमा सुरक्षित अंतर',
      hourly_heading: 'तासनिहाय सागरी स्थिती आणि लाटांचा अंदाज',
      hourly_desc: 'पुढील १२ तासांसाठी लाटांचे थेट प्रक्षेपण',
      th_time: 'वेळ (IST)',
      th_wave: 'लाटेची उंची',
      th_wind: 'वाऱ्याचा वेग',
      th_risk: 'धोका पातळी',
      th_status: 'सुरक्षा स्थिती',
      safe_badge: 'कामकाज सुरक्षित',
      advisory_badge: 'धोकादायक लाटा'
    },
    routes: {
      title: 'सुरक्षित सागरी मार्ग नियोजन',
      desc: 'धोकादायक खडक, नौदल सराव क्षेत्र आणि आंतरराष्ट्रीय सीमा टाळून सुरक्षित जलमार्ग.',
      route_a_name: 'मार्ग A (थेट मार्ग)',
      route_a_desc: '१२.० किमी थेट मार्ग. नौदल सराव क्षेत्र आणि २.७ मीटर धोकादायक लाटांमधून जातो. बोट उलटण्याचा मोठा धोका.',
      route_b_name: 'मार्ग B (प्रमाणित सुरक्षित वळण मार्ग)',
      route_b_desc: '१६.२ किमी वळणाचा मार्ग. सर्व धोक्यांपासून २.५ किमी सुरक्षित अंतर राखतो. शांत पाण्याचा मार्ग.',
      recommended_tag: 'शिफारस केलेला सुरक्षित मार्ग',
      high_risk_tag: 'अति धोकादायक - धोके',
      waypoints_title: 'टप्प्याटप्प्याने नेव्हिगेशन वेपॉईंट्स',
      fuel_delta: 'इंधन फरक',
      transit_time: 'अंदाजे प्रवास वेळ',
      hazard_clearance: 'धोक्यांपासून सुरक्षित अंतर',
      action_navigate: 'GPS वर मार्ग पाठवा',
      th_waypoint: 'वेपॉईंट',
      th_lat: 'अक्षांश',
      th_lon: 'रेखांश',
      th_heading: 'दिशा',
      th_speed: 'वेग',
      th_nav_hazard: 'धोक्यापासून अंतर'
    },
    geofence: {
      title: 'सागरी हद्द आणि आंतरराष्ट्रीय सीमा रक्षक',
      desc: 'आंतरराष्ट्रीय सागरी सीमा रेषा (IMBL) आणि संरक्षित सागरी क्षेत्रांचे थेट निरीक्षण.',
      imbl_label: 'आंतरराष्ट्रीय सागरी सीमा रेषा (IMBL)',
      status_safe: 'सुरक्षित अंतर (> १५ किमी)',
      status_warning: 'सीमा धोक्याचा इशारा (< ५ किमी)',
      distance_to_border: 'आंतरराष्ट्रीय सीमेपासून अंतर',
      buffer_threshold: 'कायदेशीर सुरक्षित अंतर मर्यादा',
      simulate_proximity: 'सीमेजवळील स्थिती तपासा (४.२ किमी)',
      reset_position: 'मूळ बंदरावर पूर्ववत करा',
      safety_instruction: 'भारतीय सागरी हद्दीत सुरक्षित राहण्यासाठी २७०° पश्चिमेकडे दिशा ठेवा.',
      mpa_label: 'संरक्षित सागरी पर्यावरण क्षेत्र',
      naval_label: 'नौदल प्रतिबंधित सराव क्षेत्र'
    },
    alerts: {
      title: 'किनारपट्टी इशारे आणि सुरक्षा सूचना',
      desc: 'गांभीर्य आणि प्राधान्यानुसार वर्गीकृत अधिकृत सागरी बुलेटिन.',
      all_filter: 'सर्व सूचना',
      critical_filter: 'अतिदक्षतेचे इशारे',
      warning_filter: 'इशारे',
      advisory_filter: 'साधारण सूचना',
      source_incois: 'INCOIS सागरी अंदाज',
      source_imd: 'IMD चक्रीवादळ विभाग',
      source_coastguard: 'भारतीय तटरक्षक दल',
      status_active: 'सक्रिय इशारा',
      issued_at: 'जारी वेळ'
    },
    analytics: {
      title: 'समुद्र विज्ञान उपग्रह निरीक्षण विश्लेषण',
      desc: 'उपग्रह इन्फ्रारेड समुद्र तापमान (SST) आणि ऑप्टिकल हरितद्रव्य घनतेचे सखोल विश्लेषण.',
      sst_heading: 'दैनिक सागरी पृष्ठभाग तापमान (SST) वक्र',
      sst_desc: 'तासनिहाय इन्फ्रारेड उपग्रह निरीक्षण',
      chl_heading: 'ऑप्टिकल हरितद्रव्य खोली स्तर',
      chl_desc: 'विविध पाण्याच्या खोलीवर प्लवक वितरण',
      correlation_heading: 'वारा आणि लाटांचा जलगतिकीय संबंध',
      correlation_desc: 'वाऱ्याचा वेग आणि लाटांची वाढ यामधील संबंध',
      optimal_range: 'माशांसाठी अनुकूल आहार क्षेत्र',
      bloom_status: 'प्लवक घनता सक्रिय'
    },
    locationModal: {
      title: 'कार्यक्षेत्र आणि नौकेचे स्थान निवडा',
      desc: 'किनारपट्टीचे बंदर निवडा किंवा थेट डेटासाठी स्वतःचे GPS निर्देशांक प्रविष्ट करा.',
      select_preset: 'किनारपट्टी बंदर / सेक्टर निवडा',
      custom_gps: 'स्वतःचे GPS निर्देशांक',
      latitude: 'अक्षांश (°N)',
      longitude: 'रेखांश (°E)',
      heading: 'नौकेची दिशा (°)',
      cancel: 'रद्द करा',
      save: 'जतन करा आणि अपडेट करा'
    },
    noticeModal: {
      title: 'अधिकृत सागरी सुरक्षा सूचना',
      dept: 'बंदरे, नौवहन आणि जलमार्ग मंत्रालय',
      body: 'मरीनमाइंड एआई ही एक स्वयंचलित निर्णय-सहाय्य प्रणाली आहे. उपग्रह डेटावर आधारित असली तरी, नौकेच्या सुरक्षेची अंतिम जबाबदारी खलाशावर (कॅप्टन) असते.',
      compliance: 'डीजी शिपिंग सुरक्षा नियम आणि INCOIS बुलेटिननुसार',
      acknowledge: 'समजले, पुढे चला'
    },
    footer: {
      agents_online: 'सर्व १० विशेष सागरी एजंट ऑनलाइन',
      position: 'GPS प्रमाणित',
      mode: 'थेट सागरी प्रवाह',
      prototype_edition: 'मरीनमाइंड एआय आवृत्ती',
      statutory_notice: 'वैधानिक सागरी सुरक्षा सूचना'
    },
    auth: {
      welcome_title: 'मरीनमाइंड एआय: सागरी नौका नियंत्रण व सुरक्षा प्रणाली',
      welcome_subtitle: 'भारतीय किनारपट्टीवरील पारंपरिक मच्छीमार आणि नौकांसाठी स्वयंचलित उपग्रह निर्णय-सहाय्य प्रणाली.',
      badge_government: 'INCOIS व बंदरे मंत्रालय प्रमाणित',
      badge_live_satellite: 'थेट उपग्रह प्रवाह कार्यरत',
      sign_in_tab: 'खलाशी / कॅप्टन लॉगिन',
      register_tab: 'नवीन नौका नोंदणी',
      vessel_id_label: 'नौका नोंदणी क्रमांक किंवा मोबाईल नंबर',
      vessel_id_placeholder: 'उदा. IND-MH-01-MM-8492 किंवा 9820145892',
      phone_label: 'नोंदणीकृत मोबाईल नंबर',
      phone_placeholder: '१० अंकी मोबाईल नंबर',
      password_label: 'सुरक्षा पासवर्ड / पिन',
      password_placeholder: 'पासवर्ड प्रविष्ट करा',
      name_label: 'कॅप्टन / मालकाचे पूर्ण नाव',
      name_placeholder: 'उदा. रमेश पाटील',
      harbor_label: 'मूळ मासेमारी बंदर',
      harbor_placeholder: 'उदा. मुंबई (ससून डॉक)',
      sign_in_btn: 'कन्सोलमध्ये साइन इन करा',
      register_btn: 'नोंदणी करा आणि सुरू करा',
      instant_access_btn: 'परीक्षकांसाठी १-क्लिक थेट प्रवेश',
      instant_access_desc: 'प्रमाणित कॅप्टन खात्यासह थेट कन्सोलमध्ये प्रवेश करा.',
      demo_credentials_hint: 'डेमो लॉगिन: IND-MH-01-MM-8492 | पासवर्ड: marinepassword',
      logout_btn: 'बाहेर पडा (साइन आउट)',
      logged_in_as: 'कॅप्टन कन्सोल',
      platform_capabilities_heading: 'प्रमुख प्रणाली वैशिष्ट्ये',
      feature_agents_title: '१० स्वायत्त सागरी एजंट्स',
      feature_agents_desc: 'हवामान, लाटा, मासेमारी क्षेत्र (PFZ) आणि सुरक्षा मार्गदर्शक स्वयंचलित एजंट्स.',
      feature_satellite_title: 'थेट उपग्रह निरीक्षण',
      feature_satellite_desc: 'थेट उपग्रहावरून समुद्राचे तापमान आणि लाटांचा रिअल-टाइम डेटा.',
      feature_imbl_title: 'आंतरराष्ट्रीय सागरी सीमा रक्षक',
      feature_imbl_desc: 'आंतरराष्ट्रीय सीमा (IMBL) जवळ आल्यास स्वयंचलित सुरक्षा सूचना.'
    }
  },

  ta: {
    common: {
      live: 'நேரடி',
      simulated: 'மாதிரி',
      ais_active: 'AIS செயலில் உள்ளது',
      change: 'மாற்று',
      safe: 'பாதுகாப்பானது',
      moderate: 'மிதமான',
      high_risk: 'அதிக ஆபத்து',
      critical: 'மிக ஆபத்தானது',
      recommended: 'பரிந்துரைக்கப்படுகிறது',
      highly_recommended: 'மிகவும் பரிந்துரைக்கப்படுகிறது',
      avoid: 'தவிர்க்கவும்',
      transit: 'பயண நேரம்',
      clearance: 'இடைவெளி',
      confidence: 'நம்பகத்தன்மை',
      km: 'கி.மீ',
      m: 'மீ',
      knots: 'நாட்ஸ்',
      depth_unit: 'மீ'
    },
    nav: {
      dashboard: 'செயல்பாடுகள்',
      copilot: 'துணை இயக்கி',
      pfz: 'PFZ மண்டலம்',
      risk: 'ஆபத்து அணி',
      routes: 'பாதுகாப்பான பாதை',
      geofence: 'கடல் எல்லைகள்',
      alerts: 'எச்சரிக்கைகள்',
      analytics: 'கடலியல்',
      short_ops: 'செயல்பாடு',
      short_copilot: 'துணை',
      short_pfz: 'PFZ',
      short_risk: 'ஆபத்து',
      short_routes: 'பாதை',
      short_geofence: 'எல்லை',
      short_alerts: 'எச்சரிக்கை',
      short_analytics: 'கடலியல்'
    },
    scenarios: {
      label: 'விரைவு காட்சிகள்:',
      s1: '1. பாதுகாப்பு முடிவு (காலை 06:00-10:00 நேரம்)',
      s2: '2. PFZ Alpha மற்றும் Bravo ஒப்பீடு',
      s3: '3. பாதுகாப்பான சுற்றுப்பாதை (Route B)',
      s4: '4. சர்வதேச எல்லை அருகாமை (4.2 கி.மீ)'
    },
    copilot: {
      title: 'கடல்சார் AI துணை இயக்கி',
      pipeline_online: 'இணைப்பில் உள்ளது (ஆன்லைன்)',
      welcome: 'மரைன்மைண்ட் AI தயாராக உள்ளது. மீன்பிடி மண்டலங்கள், அலை முன்னறிவிப்புகள் அல்லது எல்லைகள் பற்றி கேளுங்கள்.',
      inquiries_label: 'பரிந்துரைக்கப்பட்ட கேள்விகள்:',
      inquiries: [
        'நாளை காலை கடலுக்கு மீன்பிடிக்கச் செல்வது பாதுகாப்பானதா?',
        'இன்று அருகில் உள்ள மீன்பிடி மண்டலம் எங்குள்ளது?',
        'PFZ Alpha செல்வதற்கான பாதுகாப்பான பாதை எது?',
        'நான் ஏதேனும் தடைசெய்யப்பட்ட அல்லது சர்வதேச கடல் எல்லைக்கு அருகில் செல்கிறேனா?'
      ],
      input_placeholder: 'கேள்வியைத் தட்டச்சு செய்க அல்லது தேர்ந்தெடுக்கவும்...',
      send_btn: 'அனுப்பு',
      assessing: 'செயற்கைக்கோள் தரவு மற்றும் கடல் அலைகள் ஆய்வு செய்யப்படுகின்றன...',
      rationale_title: 'மதிப்பீட்டின் முக்கிய காரணிகள்:',
      key_factors: 'மதிப்பீட்டின் முக்கிய காரணிகள்:',
      focus_map: 'வரைபடத்தில் PFZ Alpha-வை பார்',
      risk_index: 'ஆபத்து குறியீடு',
      confidence: 'நம்பகத்தன்மை',
      operator: 'இயக்குனர் (மீனவர்)'
    },
    dashboard: {
      sector: 'செயல்பாட்டு மண்டலம்: அரபிக்கடல்',
      safe_window_active: 'பாதுகாப்பான நேரம் செயலில் உள்ளது (காலை 06:00 - 10:30 IST)',
      title: 'கடல் நுண்ணறிவு மற்றும் பாதுகாப்பு செயல்பாடுகள்',
      subtitle: 'செயற்கைக்கோள் கடல் வெப்பநிலை, பச்சையம், அலைகள் மற்றும் எல்லைப் பாதுகாப்பின் நேரடி பகுப்பாய்வு.',
      launch_copilot: 'துணை இயக்கியைத் தொடங்கு',
      pfz_directory: 'மீன்பிடி மண்டலங்களைப் பார்',
      demo_heading: 'விரைவு மாதிரி காட்சிகள்',
      demo_subheading: 'ஒரே கிளிக்கில் பல முகவர் கடல் முடிவெடுக்கும் அமைப்பை அனுபவியுங்கள்',
      scenarios_count: '4 காட்சிகள்',
      telemetry_heading: 'நேரடி கடலோர கண்காணிப்பு மற்றும் சுற்றுச்சூழல் நிலை',
      run_flow: 'இயக்கு',
      risk_title: 'கடல் ஆபத்து மதிப்பீடு',
      risk_summary: 'கரைக்கு அருகில் மீன்பிடிக்க பாதுகாப்பானது; மதியத்திற்குப் பிறகு அலைகள் உயரும்.',
      top_pfz_title: 'அருகில் உள்ள மீன்பிடி மண்டலம்',
      hydro_title: 'கடல் அலைகளின் நிலை',
      hydro_summary: 'காலையில் அமைதியான கடல்; ஆழ்கடலில் ஆபத்தான அலைகள் செயலில் உள்ளன.',
      advisories_title: 'செயலில் உள்ள கடலோர எச்சரிக்கைகள்',
      active_bulletins: 'செயலில் உள்ள அறிக்கைகள்',
      advisories_summary: 'வெளிக்கடல் பகுதிக்கு சிறிய படகுகளுக்கு எச்சரிக்கை விடுக்கப்பட்டுள்ளது.',
      sst_label: 'வெப்பநிலை',
      chl_label: 'பச்சையம்',
      swell_label: 'அலைகள்',
      scenario_badges: {
        s1: 'நேர ஆபத்து',
        s2: 'வள ஒதுக்கீடு',
        s3: 'பாதை மேம்பாடு',
        s4: 'எல்லைக் காவல்'
      },
      scenario_metrics: {
        s1: 'பாதுகாப்பான நேரம்: காலை 06:00 - 10:30',
        s2: 'PFZ Alpha (8.2 கி.மீ) - 86/100',
        s3: 'Route B: குறைந்த ஆபத்து (+15 நிமிடம்)',
        s4: '4.2 கி.மீ மீதமுள்ளது (< 5 கி.மீ எல்லை)'
      },
      scenario_highlights: {
        s1: 'காலை 11:30 மணிக்குப் பிறகு அலைகள் 2.6 மீட்டராக உயரும்',
        s2: 'PFZ Bravo (6.1 கி.மீ) 2.7 மீ ஆபத்தான அலைகள் காரணமாக நிராகரிக்கப்பட்டது',
        s3: 'Route A நிராகரிக்கப்பட்டது: கடற்படை பயிற்சி மண்டலம் வழியாக செல்கிறது',
        s4: 'ஒலி எச்சரிக்கை மற்றும் பாதுகாப்பான திசைமாற்ற பரிந்துரை (270°)'
      }
    },
    map: {
      vessel: 'படகு',
      top_pfz: 'முதன்மை PFZ',
      gps_sector: 'GPS மண்டலம்',
      set_pin: 'பின் வைக்கவும்',
      layers: 'அடுக்குகள்',
      mobile_copilot: 'துணை இயக்கி அரட்டை',
      mobile_map: 'ஊடாடும் வரைபடம்',
      mobile_both: 'பிளவு பார்வை',
      layer_thermal: 'வெப்ப மண்டலங்கள் (SST)',
      layer_chloro: 'பச்சைய மண்டலங்கள்',
      layer_swell: 'உயர்ந்த அலை ஆபத்து',
      layer_pfz: 'மீன் அடர்த்தி (PFZ)',
      layer_borders: 'எல்லை & தடை செய்யப்பட்ட பகுதிகள்',
      layer_routes: 'பாதுகாப்பான வழிசெலுத்தல் பாதைகள்',
      layer_fairways: 'வணிக கப்பல் பாதைகள்'
    },
    pfz: {
      title: 'சாத்தியமான மீன்பிடி மண்டலங்கள் (PFZ)',
      zones_available: 'மண்டலங்கள் உள்ளன',
      sector_label: 'மண்டலம்',
      all_zones: 'அனைத்து மண்டலங்களும்',
      recommended_filter: 'பரிந்துரைக்கப்பட்டவை',
      calm_waters: 'அமைதியான கடல்',
      contrast_title: 'சிறந்த பரிந்துரை மற்றும் தவிர்க்க வேண்டிய பகுதியின் ஒப்பீடு',
      contrast_recommended_desc: 'PFZ Alpha (8.2 கி.மீ): சிறந்த கடல் வெப்பநிலை மற்றும் 1.2 மீ பாதுகாப்பான அலைகள். மிகவும் பரிந்துரைக்கப்படுகிறது.',
      contrast_avoid_desc: 'PFZ Bravo (6.1 கி.மீ): அருகில் இருந்தாலும் 2.8 மீ ஆபத்தான அலைகள் உள்ளன. செல்வதைத் தவிர்க்கவும்.',
      th_zone: 'மண்டலத்தின் பெயர்',
      th_coords: 'அமைவிடம்',
      th_distance: 'தூரம்',
      th_sst: 'கடல் வெப்பநிலை (°C)',
      th_chl: 'பச்சையம்',
      th_species: 'முக்கிய மீன் வகைகள்',
      th_depth: 'ஆழம்',
      th_status: 'நிலை',
      th_action: 'நடவடிக்கை',
      plot_route: 'பாதுகாப்பான பாதை அமை',
      inspect_map: 'வரைபடத்தில் பார்',
      score_label: 'உற்பத்தித்திறன் மதிப்பெண்',
      reasons_title: 'பகுப்பாய்வு காரணங்கள்',
      target_species: 'எதிர்பார்க்கப்படும் மீன்கள்'
    },
    risk: {
      matrix_subtitle: 'ஆபத்து மதிப்பீட்டு அணி',
      title: 'கடல் ஆபத்து பகுப்பாய்வு & பாதுகாப்பு',
      desc: 'காற்றின் வேகம், அலை உயரம், இடி மின்னல் மற்றும் சர்வதேச எல்லை இடைவெளியின் நேரடி மதிப்பீடு.',
      category_label: 'ஆபத்து வகை',
      overall_gauge: 'ஒட்டுமொத்த ஆபத்து குறியீடு',
      factor_waves: 'அலை உயரம்',
      factor_wind: 'காற்றின் வேகம்',
      factor_lightning: 'இடி மின்னல் ஆபத்து',
      factor_cyclone: 'புயல் எச்சரிக்கை',
      factor_visibility: 'வழிசெலுத்தல் தெரிவுநிலை',
      factor_buffer: 'எல்லை பாதுகாப்பு இடைவெளி',
      hourly_heading: 'மணிநேர கடல் நிலை மற்றும் அலை முன்னறிவிப்பு',
      hourly_desc: 'அடுத்த 12 மணிநேரத்திற்கான கடல் அலை கணிப்பு',
      th_time: 'நேரம் (IST)',
      th_wave: 'அலை உயரம்',
      th_wind: 'காற்றின் வேகம்',
      th_risk: 'ஆபத்து அளவு',
      th_status: 'பாதுகாப்பு நிலை',
      safe_badge: 'மீன்பிடிக்க பாதுகாப்பானது',
      advisory_badge: 'ஆபத்தான அலைகள்'
    },
    routes: {
      title: 'பாதுகாப்பான கடல் வழிசெலுத்தல்',
      desc: 'ஆபத்தான பாறைகள், கடற்படை பயிற்சி பகுதிகள் மற்றும் சர்வதேச எல்லைகளைத் தவிர்த்து பாதுகாப்பான பாதை.',
      route_a_name: 'பாதை A (நேரடி பாதை)',
      route_a_desc: '12.0 கி.மீ நேரடி பாதை. கடற்படை பயிற்சி மண்டலம் மற்றும் 2.7 மீ உயர அலைகள் வழியாக செல்கிறது. படகு கவிழும் ஆபத்து.',
      route_b_name: 'பாதை B (பாதுகாப்பான சுற்றுப்பாதை)',
      route_b_desc: '16.2 கி.மீ மாற்றுப் பாதை. அனைத்து ஆபத்துகளிலிருந்தும் 2.5 கி.மீ பாதுகாப்பான தூரத்தைப் பராமரிக்கிறது. அமைதியான கடல்.',
      recommended_tag: 'பரிந்துரைக்கப்பட்ட பாதுகாப்பான பாதை',
      high_risk_tag: 'அதி ஆபத்து - ஆபத்துகள்',
      waypoints_title: 'படி படியான வழிசெலுத்தல் புள்ளிகள்',
      fuel_delta: 'எரிபொருள் பயன்பாட்டு வேறுபாடு',
      transit_time: 'தோராயமான பயண நேரம்',
      hazard_clearance: 'ஆபத்து இடைவெளி',
      action_navigate: 'GPS-க்கு பாதையை அனுப்பு',
      th_waypoint: 'புள்ளி',
      th_lat: 'அட்சரேகை',
      th_lon: 'தீர்க்கரேகை',
      th_heading: 'திசை',
      th_speed: 'வேகம்',
      th_nav_hazard: 'ஆபத்திலிருந்து தூரம்'
    },
    geofence: {
      title: 'கடல் எல்லை மற்றும் பாதுகாப்பு காவலாளி',
      desc: 'சர்வதேச கடல் எல்லைக் கோடு (IMBL) மற்றும் கடல்சார் பாதுகாக்கப்பட்ட பகுதிகளின் தூரத்தை நேரடியாகக் கண்காணித்தல்.',
      imbl_label: 'சர்வதேச கடல் எல்லைக் கோடு (IMBL)',
      status_safe: 'பாதுகாப்பான தூரம் (> 15 கி.மீ)',
      status_warning: 'எல்லை எச்சரிக்கை - மிக அருகில் (< 5 கி.மீ)',
      distance_to_border: 'சர்வதேச எல்லைக்கான தூரம்',
      buffer_threshold: 'சட்டரீதியான பாதுகாப்பு எல்லை வரம்பு',
      simulate_proximity: 'எல்லை அருகாமை நிலையை உருவகப்படுத்து (4.2 கி.மீ)',
      reset_position: 'சொந்த துறைமுகத்திற்கு மீட்டமை',
      safety_instruction: 'இந்திய கடல் எல்லைக்குள் இருக்க 270° மேற்கு நோக்கி திசையை வைக்கவும்.',
      mpa_label: 'சுற்றுச்சூழல் பாதுகாக்கப்பட்ட கடல் பகுதி',
      naval_label: 'கடற்படை தடைசெய்யப்பட்ட பயிற்சி மண்டலம்'
    },
    alerts: {
      title: 'கடலோர எச்சரிக்கைகள் மற்றும் பாதுகாப்பு அறிவிப்புகள்',
      desc: 'முக்கியத்துவம் மற்றும் ஆபத்தின் அடிப்படையில் வகைப்படுத்தப்பட்ட அதிகாரப்பூர்வ கடல் அறிக்கைகள்.',
      all_filter: 'அனைத்து அறிக்கைகளும்',
      critical_filter: 'முக்கிய எச்சரிக்கைகள்',
      warning_filter: 'எச்சரிக்கைகள்',
      advisory_filter: 'ஆலோசனைகள்',
      source_incois: 'INCOIS கடல் முன்னறிவிப்பு',
      source_imd: 'IMD புயல் பிரிவு',
      source_coastguard: 'இந்திய கடலோரக் காவல் படை',
      status_active: 'செயலில் உள்ள எச்சரிக்கை',
      issued_at: 'வெளியிடப்பட்ட நேரம்'
    },
    analytics: {
      title: 'கடலியல் புவி கண்காணிப்பு பகுப்பாய்வு',
      desc: 'செயற்கைக்கோள் அகச்சிவப்பு கடல் வெப்பநிலை (SST) மற்றும் ஒளியியல் பச்சையத்தின் ஆழமான பகுப்பாய்வு.',
      sst_heading: 'தினசரி கடல் மேற்பரப்பு வெப்பநிலை (SST) வளைவு',
      sst_desc: 'வெப்பநிலை மாற்றத்தைக் காட்டும் மணிநேர செயற்கைக்கோள் தரவு',
      chl_heading: 'ஒளியியல் பச்சையம்-ஏ ஆழ அடுக்கு',
      chl_desc: 'வெவ்வேறு கடல் ஆழங்களில் தாவர மிதவை நுண்ணுயிரிகளின் பரவல்',
      correlation_heading: 'காற்று மற்றும் அலைகளின் தொடர்பு',
      correlation_desc: 'மேற்பரப்புக் காற்று மற்றும் அலை வளர்ச்சியின் தொடர்பு',
      optimal_range: 'மீன்கள் உணவளிக்கும் உகந்த பகுதி',
      bloom_status: 'நுண்ணுயிர் பெருக்கம் செயலில் உள்ளது'
    },
    locationModal: {
      title: 'செயல்பாட்டு மண்டலம் மற்றும் படகின் அமைவிடம்',
      desc: 'கடலோர துறைமுகத்தைத் தேர்வுசெய்க அல்லது நேரடித் தரவுகளுக்கு விருப்ப GPS அமைவிடத்தை உள்ளிடவும்.',
      select_preset: 'துறைமுகம் / மண்டலத்தைத் தேர்வுசெய்க',
      custom_gps: 'விருப்ப GPS அமைவிடம்',
      latitude: 'அட்சரேகை (°N)',
      longitude: 'தீர்க்கரேகை (°E)',
      heading: 'படகு திசை (°)',
      cancel: 'ரத்துசெய்',
      save: 'சேமித்து புதுப்பிக்கவும்'
    },
    noticeModal: {
      title: 'அதிகாரப்பூர்வ கடல் பாதுகாப்பு அறிவிப்பு',
      dept: 'துறைமுகங்கள், கப்பல் போக்குவரத்து மற்றும் நீர்வழி அமைச்சகம்',
      body: 'மரைன்மைண்ட் AI என்பது ஒரு தன்னாட்சி முடிவெடுக்கும் ஆதரவு அமைப்பாகும். செயற்கைக்கோள் தரவுகளின் அடிப்படையில் இயங்கினாலும், படகின் பாதுகாப்பிற்கான இறுதிப் பொறுப்பு படகோட்டியிடமே (கேப்டன்) இருக்கும்.',
      compliance: 'டிஜி ஷிப்பிங் பாதுகாப்பு வழிகாட்டுதல்கள் மற்றும் INCOIS அறிக்கைகளின்படி',
      acknowledge: 'புரிந்தது, தொடரவும்'
    },
    footer: {
      agents_online: 'அனைத்து 10 கடல்சார் முகவர்களும் ஆன்லைனில் உள்ளனர்',
      position: 'GPS சரிபார்க்கப்பட்டது',
      mode: 'நேரடி கடல் ஸ்ட்ரீம்',
      prototype_edition: 'மரைன்மைண்ட் AI பதிப்பு',
      statutory_notice: 'சட்டப்பூர்வ கடல் பாதுகாப்பு அறிவிப்பு'
    }
  }
};

export function getTranslation(lang: string = 'en'): TranslationSchema {
  const code = (lang as LanguageCode) in TRANSLATIONS ? (lang as LanguageCode) : 'en';
  return TRANSLATIONS[code];
}
