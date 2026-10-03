// frontend/src/services/fishermanI18n.ts
// Comprehensive multilingual translation engine for Indian coastal fishermen.
// Covers all 9 official Indian coastal languages:
// English (en), Hindi (hi), Marathi (mr), Gujarati (gu), Tamil (ta),
// Malayalam (ml), Telugu (te), Kannada (kn), Bengali (bn).

export type FishermanLang = 'en' | 'hi' | 'mr' | 'gu' | 'ta' | 'ml' | 'te' | 'kn' | 'bn';

export interface LanguageOption {
  code: FishermanLang;
  label: string;
  native: string;
  region: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', native: 'English', region: 'All Harbors / Universal' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी', region: 'राष्ट्रीय' },
  { code: 'mr', label: 'Marathi', native: 'मराठी', region: 'महाराष्ट्र (Mumbai / Ratnagiri)' },
  { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી', region: 'ગુજરાત (Veraval / Porbandar / Jakhau)' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்', region: 'தமிழ்நாடு (Chennai / Rameswaram)' },
  { code: 'ml', label: 'Malayalam', native: 'മലയാളം', region: 'കേരളം (Kochi / Kollam / Munambam)' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు', region: 'ఆంధ్రప్రదేశ్ (Visakhapatnam / Kakinada)' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ', region: 'ಕರ್ನಾಟಕ (Mangalore / Malpe / Karwar)' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা', region: 'পশ্চিমবঙ্গ ও ওড়িশা (Digha / Kakdwip)' },
];

export interface FishermanTranslations {
  nav: {
    home: string;
    spots: string;
    trip: string;
    ask: string;
    profile: string;
  };
  greeting: {
    morning: string;
    afternoon: string;
    evening: string;
    captain: string;
    port: string;
    change_port: string;
    gps_verified: string;
  };
  status: {
    title: string;
    good_to_go: string;
    caution: string;
    use_caution: string;
    stay_ashore: string;
    checking: string;
    desc_low: string;
    desc_moderate: string;
    desc_high: string;
    desc_critical: string;
    desc_unknown: string;
    last_updated: string;
    live: string;
    unavailable: string;
    data_unavailable_warning: string;
    retry: string;
    safety_verdict: string;
    official_advisory_match: string;
  };
  conditions: {
    title: string;
    waves: string;
    wind: string;
    temp: string;
    rain: string;
    hazards: string;
    sea_state: string;
    wave_period: string;
    wind_gust: string;
    calm: string;
    moderate: string;
    rough: string;
    very_rough: string;
    light_breeze: string;
    moderate_wind: string;
    strong_wind: string;
    gale: string;
    clear: string;
    watch_out: string;
    update: string;
    meters: string;
    kmh: string;
    knots: string;
    celsius: string;
    seconds: string;
    percent: string;
    swell: string;
    visibility: string;
  };
  actions: {
    find_spots_title: string;
    find_spots_sub: string;
    plan_trip_title: string;
    plan_trip_sub: string;
    quick_assistant_title: string;
    voice_chat: string;
    q_can_i_fish: string;
    q_where_to_fish: string;
    q_any_warning: string;
    see_all: string;
    top_spot_title: string;
  };
  spots: {
    title: string;
    subtitle: string;
    total_spots: string;
    filter_all: string;
    filter_recommended: string;
    filter_near: string;
    no_spots_found: string;
    good_fishing: string;
    fair_fishing: string;
    avoid_area: string;
    km_away: string;
    sea_state: string;
    target_species: string;
    view_map: string;
    plan_route: string;
    thermal_boundary: string;
    depth: string;
    confidence: string;
    view_list: string;
    view_chart: string;
  };
  trip: {
    title: string;
    subtitle: string;
    step1_title: string;
    step1_sub: string;
    step2_title: string;
    step3_title: string;
    selected_zone: string;
    distance: string;
    est_transit: string;
    sea_state: string;
    wind_speed: string;
    calculate_btn: string;
    calculating: string;
    recommended_safe_fairway: string;
    direct_hazardous_track: string;
    safe_badge: string;
    caution_badge: string;
    mins: string;
    km: string;
    safety_advisory: string;
    tap_to_select: string;
    hazard_warning: string;
    view_plan: string;
    view_route: string;
  };
  profile: {
    title: string;
    skipper_title: string;
    vessel_id: string;
    home_port: string;
    registered_phone: string;
    preferred_language: string;
    select_language_sub: string;
    emergency_contacts_title: string;
    emergency_desc: string;
    icg_title: string;
    icg_desc: string;
    fisheries_title: string;
    fisheries_desc: string;
    disaster_title: string;
    disaster_desc: string;
    call_btn: string;
    emergency_cellular_note: string;
    statutory_notice: string;
    statutory_sub: string;
    logout: string;
  };
  advanced: {
    title: string;
    subtitle: string;
    wave_period: string;
    wind_gusts: string;
    sea_state_code: string;
    risk_score: string;
    provenance_title: string;
    weather_model: string;
    chlorophyll_model: string;
    pfz_model: string;
    disclaimer: string;
  };
  bulletin: {
    title: string;
    verified: string;
    signal: string;
    all_ports_nil: string;
    active_advisories_count: string;
  };
  auth: {
    portal_title: string;
    network_sub: string;
    secure_badge: string;
    quick_skipper_title: string;
    vessel_id_label: string;
    vessel_id_placeholder: string;
    password_label: string;
    password_placeholder: string;
    sign_in_btn: string;
    register_btn: string;
    sign_in_tab: string;
    register_tab: string;
    name_label: string;
    name_placeholder: string;
    phone_label: string;
    phone_placeholder: string;
    harbor_label: string;
    authenticating: string;
    demo_hint: string;
    eval_badge: string;
    one_click: string;
    instant_access_desc: string;
    instant_access_btn: string;
    or_divider: string;
    mopsw_badge: string;
    welcome_title: string;
    welcome_subtitle: string;
    feature_agents_title: string;
    feature_agents_desc: string;
    feature_satellite_title: string;
    feature_satellite_desc: string;
    feature_imbl_title: string;
    feature_imbl_desc: string;
    footer_left: string;
    footer_right: string;
    err_required: string;
    err_password_len: string;
  };
  offline: {
    offshore_mode: string;
    cache_mode: string;
    offline_desc: string;
    cache_desc: string;
    local_cache_badge: string;
  };
}

const TRANSLATIONS: Record<FishermanLang, FishermanTranslations> = {
  // ── ENGLISH (en) ───────────────────────────────────────────────────────────
  en: {
    nav: { home: 'Home', spots: 'Spots', trip: 'Trip', ask: 'Ask', profile: 'Profile' },
    greeting: {
      morning: 'Good morning', afternoon: 'Good afternoon', evening: 'Good evening',
      captain: 'Captain', port: 'Home Port', change_port: 'Change Port', gps_verified: 'GPS Verified'
    },
    status: {
      title: "Today's Fishing Status", good_to_go: 'GOOD TO GO', caution: 'USE CAUTION',
      use_caution: 'HIGH CAUTION', stay_ashore: 'STAY ASHORE', checking: 'CHECKING CONDITIONS...',
      desc_low: 'Calm seas and favorable winds. Safe for fishing operations.',
      desc_moderate: 'Moderate swells expected. Stay alert and monitor afternoon winds.',
      desc_high: 'Rough seas and strong winds. Small crafts should remain nearshore.',
      desc_critical: 'Dangerous sea state. Strictly remain ashore today.',
      desc_unknown: 'Connecting to marine weather satellite stream...',
      last_updated: 'Last updated', live: 'Live Stream', unavailable: 'Offline / Cached',
      data_unavailable_warning: 'Live weather service unreachable. Showing verified local advisory.',
      retry: 'Retry', safety_verdict: 'Safety Verdict',
      official_advisory_match: 'Official Coastal Advisory Match'
    },
    conditions: {
      title: 'Current Sea Conditions', waves: 'Waves', wind: 'Wind', temp: 'Air Temp',
      rain: 'Rain Prob.', hazards: 'Hazards', sea_state: 'Sea State', wave_period: 'Wave Period',
      wind_gust: 'Wind Gusts', calm: 'Calm', moderate: 'Moderate', rough: 'Rough',
      very_rough: 'Very Rough', light_breeze: 'Light Breeze', moderate_wind: 'Fresh Wind',
      strong_wind: 'Strong Wind', gale: 'Gale Force', clear: 'Clear', watch_out: 'Caution',
      update: 'Refresh', meters: 'm', kmh: 'km/h', knots: 'knots', celsius: '°C',
      seconds: 's', percent: '%', swell: 'Swell', visibility: 'Visibility'
    },
    actions: {
      find_spots_title: 'Find Fishing Spots', find_spots_sub: 'Satellite-identified productive zones',
      plan_trip_title: 'Plan Safe Trip', plan_trip_sub: 'Reef & border avoidance route',
      quick_assistant_title: 'Ask MarineMind Copilot', voice_chat: 'Voice / Chat',
      q_can_i_fish: 'Can I go fishing today?', q_where_to_fish: 'Where is the best fishing spot right now?',
      q_any_warning: 'Are there any storm warnings or high swells?', see_all: 'See all',
      top_spot_title: 'Top Recommended Spot'
    },
    spots: {
      title: 'Fishing Hotspots (PFZ)', subtitle: 'INCOIS & satellite ocean thermal boundary zones',
      total_spots: 'spots mapped today', filter_all: 'All Spots', filter_recommended: 'Recommended Only',
      filter_near: 'Nearshore (< 15 km)', no_spots_found: 'No fishing hotspots mapped in this sector.',
      good_fishing: 'Prime Fishing Spot', fair_fishing: 'Moderate Potential', avoid_area: 'Caution / Avoid',
      km_away: 'km away', sea_state: 'Sea State', target_species: 'Target Catch', view_map: 'View on Map',
      plan_route: 'Plan Safe Route', thermal_boundary: 'Thermal Front', depth: 'Depth', confidence: 'Confidence',
      view_list: 'List', view_chart: 'Chart'
    },
    trip: {
      title: 'Safe Passage Trip Planner', subtitle: 'Step-by-step route guidance with automatic reef and border avoidance',
      step1_title: '1. Select Fishing Destination', step1_sub: 'Tap a fishing spot below to set your route destination:',
      step2_title: '2. Voyage Safety & Conditions Check', step3_title: '3. Safe Navigation Passage',
      selected_zone: 'Destination', distance: 'Distance', est_transit: 'Est. Transit Time',
      sea_state: 'Sea State', wind_speed: 'Wind Speed', calculate_btn: 'Check Conditions & Calculate Safe Route',
      calculating: 'Analyzing safe passage & bathymetry...', recommended_safe_fairway: 'Recommended Safe Fairway',
      direct_hazardous_track: 'Direct Track (Hazardous)', safe_badge: 'SAFE PASSAGE', caution_badge: 'HIGH HAZARD',
      mins: 'min', km: 'km', safety_advisory: 'Safety Advisory', tap_to_select: 'Select a zone to start',
      hazard_warning: 'Avoids submerged obstacles and boundary zones', view_plan: 'Plan', view_route: 'Route'
    },
    profile: {
      title: 'Vessel & Skipper Settings', skipper_title: 'Licensed Marine Skipper', vessel_id: 'Vessel Registration (ID)',
      home_port: 'Home Fishing Harbor', registered_phone: 'Registered Mobile', preferred_language: 'Application Language',
      select_language_sub: 'Instantly changes language across all screens',
      emergency_contacts_title: 'Official Marine Emergency Contacts', emergency_desc: 'Tap to call directly from your mobile device',
      icg_title: 'Indian Coast Guard (Toll-Free SAR)', icg_desc: 'Search & Rescue Maritime Operations Control (24/7)',
      fisheries_title: 'National Fisheries Helpline', fisheries_desc: 'Toll-Free Fisheries Advisory Service (Dept of Fisheries)',
      disaster_title: 'State Coastal Disaster Control', disaster_desc: 'Coastal Maritime Emergency & Cyclone Cell',
      call_btn: 'Call Now', emergency_cellular_note: 'Emergency helplines connect directly over standard cellular network towers.',
      statutory_notice: 'View Statutory Marine Safety Notice', statutory_sub: 'Official disclaimer and maritime navigation regulations',
      logout: 'Sign Out of MarineMind'
    },
    advanced: {
      title: 'Sensor Telemetry & Ocean Models', subtitle: 'Deterministic risk formula & environmental data sources',
      wave_period: 'Wave Peak Period', wind_gusts: 'Peak Wind Gusts', sea_state_code: 'Sea State Code',
      risk_score: '6-Factor Risk Score', provenance_title: 'Data Sources & Model Provenance',
      weather_model: 'Open-Meteo Global Marine & Atmospheric Model', chlorophyll_model: 'Bio-optical proxy estimation (SST upwelling model)',
      pfz_model: 'INCOIS PFZ algorithm & thermal boundary convergence',
      disclaimer: 'MarineMind AI provides decision-support modeling. Always cross-verify conditions with Indian Coast Guard and IMD broadcasts before sailing.'
    },
    bulletin: {
      title: 'IMD Marine Bulletin', verified: 'Govt Verified', signal: 'Signal:',
      all_ports_nil: 'NIL AT ALL PORTS', active_advisories_count: 'Active Coastal Advisories'
    },
    auth: {
      portal_title: 'Vessel Skipper Portal', network_sub: 'Indian Coastal Marine Safety Network', secure_badge: 'Secure Access',
      quick_skipper_title: 'Quick Skipper Login (1-Tap Select)', vessel_id_label: 'Vessel Registration ID / Mobile',
      vessel_id_placeholder: 'IND-MH-01-MM-8492 or Phone', password_label: 'Marine PIN / Password',
      password_placeholder: 'Enter secure password', sign_in_btn: 'Sign In to Vessel Terminal', register_btn: 'Register New Vessel',
      sign_in_tab: 'Sign In', register_tab: 'Register Vessel', name_label: 'Skipper / Owner Name',
      name_placeholder: 'e.g. Ramesh Patil', phone_label: 'Mobile Phone Number', phone_placeholder: '10-digit mobile number',
      harbor_label: 'Base Fishing Harbor', authenticating: 'Authenticating...',
      demo_hint: 'Verified demo credentials: IND-MH-01-MM-8492 / marinepassword',
      eval_badge: 'Quick Access', one_click: '1-Click Entry',
      instant_access_desc: 'Evaluate all features with pre-configured Mumbai Sassoon Docks test vessel profile.',
      instant_access_btn: 'Instant Guest Access', or_divider: 'or authenticate with credentials',
      mopsw_badge: 'Ministry of Ports, Shipping & Waterways Standards',
      welcome_title: 'Safer Seas, Smarter Catch, Zero Boundary Risk',
      welcome_subtitle: 'Autonomous multi-agent intelligence fusing atmospheric telemetry, satellite oceanography, and border geofencing for coastal fishermen.',
      feature_agents_title: 'Autonomous Multi-Agent AI System',
      feature_agents_desc: 'Specialized agents coordinate weather, ocean dynamics, and navigation into verified safety directives.',
      feature_satellite_title: 'Satellite PFZ & Ocean Dynamics',
      feature_satellite_desc: 'Daily thermal boundary fronts and chlorophyll proxies identify prime fishing grounds.',
      feature_imbl_title: 'Border & Restricted Zone Geofencing',
      feature_imbl_desc: 'Automated warnings keep skippers safe from international borders and naval perimeters.',
      footer_left: '© 2026 MarineMind AI — Autonomous Marine Ecosystem Copilot',
      footer_right: 'Government of India Meteorological & Hydrodynamic Standards',
      err_required: 'Please complete all required fields.',
      err_password_len: 'Password must be at least 8 characters long.'
    },
    offline: {
      offshore_mode: 'Offshore Mode (Offline)', cache_mode: 'Pre-Voyage Cache Active',
      offline_desc: 'You are out of cellular coverage at sea. Using cached IMD bulletins and vessel navigation waypoints.',
      cache_desc: 'Serving verified cached coastal bulletin. Live sync will resume automatically when signal restores.',
      local_cache_badge: 'Local Safe Cache'
    }
  },

  // ── HINDI (hi) ────────────────────────────────────────────────────────────
  hi: {
    nav: { home: 'होम', spots: 'मछली क्षेत्र', trip: 'सुरक्षित यात्रा', ask: 'सहायक', profile: 'प्रोफाइल' },
    greeting: {
      morning: 'शुभ प्रभात', afternoon: 'नमस्कार', evening: 'शुभ संध्या',
      captain: 'कप्तान', port: 'गृह बंदरगाह', change_port: 'बंदरगाह बदलें', gps_verified: 'GPS सत्यापित'
    },
    status: {
      title: 'आज की समुद्री स्थिति', good_to_go: 'जाना सुरक्षित है', caution: 'सावधानी बरतें',
      use_caution: 'विशेष सावधानी आवश्यक', stay_ashore: 'समुद्र में न जाएं — तट पर रहें', checking: 'स्थिति की जांच जारी है...',
      desc_low: 'शांत समुद्र और अनुकूल हवाएं। मछली पकड़ने के लिए पूरी तरह सुरक्षित।',
      desc_moderate: 'मध्यम लहरें संभावित। सतर्क रहें और दोपहर की हवा पर नज़र रखें।',
      desc_high: 'उग्र समुद्र और तेज हवाएं। छोटी नौकाएं किनारे के पास ही रहें।',
      desc_critical: 'अत्यंत खतरनाक समुद्री स्थिति। आज किसी भी हाल में समुद्र में न जाएं।',
      desc_unknown: 'समुद्री उपग्रह डेटा से कनेक्ट हो रहा है...',
      last_updated: 'अंतिम अपडेट', live: 'लाइव डेटा', unavailable: 'ऑफ़लाइन / अनुपलब्ध',
      data_unavailable_warning: 'लाइव मौसम सेवा अनुपलब्ध है। सत्यापित स्थानीय परामर्श दिखाया जा रहा है।',
      retry: 'पुनः प्रयास', safety_verdict: 'सुरक्षा निर्णय',
      official_advisory_match: 'आधिकारिक तटीय चेतावनी मेल'
    },
    conditions: {
      title: 'वर्तमान समुद्री स्थिति', waves: 'लहरें', wind: 'हवा', temp: 'तापमान',
      rain: 'बारिश संभावना', hazards: 'खतरे', sea_state: 'समुद्र स्थिति', wave_period: 'लहर समय',
      wind_gust: 'हवा के झोंके', calm: 'शांत', moderate: 'मध्यम', rough: 'उग्र',
      very_rough: 'अति उग्र', light_breeze: 'हल्की हवा', moderate_wind: 'मध्यम हवा',
      strong_wind: 'तेज हवा', gale: 'तूफानी हवा', clear: 'साफ', watch_out: 'सावधान',
      update: 'रिफ्रेश', meters: 'मी', kmh: 'किमी/घंटा', knots: 'नॉट', celsius: '°C',
      seconds: 'सेकंड', percent: '%', swell: 'लहरें', visibility: 'दृश्यता'
    },
    actions: {
      find_spots_title: 'मछली पकड़ने के स्थान खोजें', find_spots_sub: 'उपग्रह आधारित संभावित मछली क्षेत्र',
      plan_trip_title: 'सुरक्षित यात्रा बनाएं', plan_trip_sub: 'चट्टानों और सीमा से सुरक्षित मार्ग',
      quick_assistant_title: 'मरीनमाइंड से पूछें', voice_chat: 'आवाज / चैट',
      q_can_i_fish: 'क्या आज मछली पकड़ने जाना सुरक्षित है?', q_where_to_fish: 'इस समय सबसे अच्छा मछली क्षेत्र कहाँ है?',
      q_any_warning: 'क्या कोई तूफान या ऊंची लहरों की चेतावनी है?', see_all: 'सभी देखें',
      top_spot_title: 'सर्वोत्तम अनुशंसित स्थान'
    },
    spots: {
      title: 'मछली पकड़ने के हॉटस्पॉट (PFZ)', subtitle: 'उपग्रह आधारित महासागरीय संभावित मछली क्षेत्र',
      total_spots: 'क्षेत्र आज मैप किए गए', filter_all: 'सभी स्थान', filter_recommended: 'केवल अनुशंसित',
      filter_near: 'निकटतम (< 15 किमी)', no_spots_found: 'इस क्षेत्र में कोई स्थान मैप नहीं है।',
      good_fishing: 'उत्तम मछली क्षेत्र', fair_fishing: 'मध्यम संभावना', avoid_area: 'सावधानी / टालें',
      km_away: 'किमी दूर', sea_state: 'समुद्र स्थिति', target_species: 'संभावित मछली', view_map: 'नक्शे पर देखें',
      plan_route: 'सुरक्षित रास्ता बनाएं', thermal_boundary: 'थर्मल फ्रंट', depth: 'गहराई', confidence: 'सटीकता',
      view_list: 'सूची', view_chart: 'नक्शा'
    },
    trip: {
      title: 'सुरक्षित समुद्री यात्रा योजना', subtitle: 'चट्टानों और अंतरराष्ट्रीय सीमा से बचाव के साथ चरणबद्ध मार्गदर्शन',
      step1_title: '1. गंतव्य स्थान चुनें', step1_sub: 'रास्ता शुरू करने के लिए नीचे दिए गए मछली क्षेत्र पर टैप करें:',
      step2_title: '2. यात्रा सुरक्षा एवं स्थिति जांच', step3_title: '3. सुरक्षित नौवहन मार्ग',
      selected_zone: 'गंतव्य', distance: 'दूरी', est_transit: 'अनुमानित समय',
      sea_state: 'समुद्र स्थिति', wind_speed: 'हवा की गति', calculate_btn: 'स्थिति जांचें और सुरक्षित मार्ग बनाएं',
      calculating: 'गहराई और सुरक्षा सीमा की जांच जारी...', recommended_safe_fairway: 'अनुशंसित सुरक्षित मार्ग',
      direct_hazardous_track: 'सीधा मार्ग (जोखिम भरा)', safe_badge: 'सुरक्षित मार्ग', caution_badge: 'खतरा',
      mins: 'मिनट', km: 'किमी', safety_advisory: 'सुरक्षा सलाह', tap_to_select: 'शुरू करने के लिए एक क्षेत्र चुनें',
      hazard_warning: 'जलमग्न बाधाओं और सीमा क्षेत्र से बचाव करता है', view_plan: 'योजना', view_route: 'मार्ग'
    },
    profile: {
      title: 'नाविक और नौका सेटिंग्स', skipper_title: 'प्रमाणित समुद्री नाविक', vessel_id: 'नौका पंजीकरण संख्या (ID)',
      home_port: 'गृह मत्स्य बंदरगाह', registered_phone: 'पंजीकृत मोबाइल नंबर', preferred_language: 'पसंदीदा भाषा',
      select_language_sub: 'सभी स्क्रीन पर तुरंत भाषा बदलें',
      emergency_contacts_title: 'आधिकारिक समुद्री आपातकालीन हेल्पलाइन', emergency_desc: 'सीधे कॉल करने के लिए टैप करें',
      icg_title: 'भारतीय तटरक्षक बल (SAR टोल फ्री)', icg_desc: '24/7 समुद्री खोज एवं बचाव अभियान केंद्र',
      fisheries_title: 'राष्ट्रीय मत्स्य पालन हेल्पलाइन', fisheries_desc: 'टोल-फ्री मत्स्य पालन परामर्श (मत्स्य पालन विभाग)',
      disaster_title: 'राज्य तटीय आपदा नियंत्रण कक्ष', disaster_desc: 'तटीय समुद्री आपातकाल और चक्रवात सहायता',
      call_btn: 'कॉल करें', emergency_cellular_note: 'आपातकालीन नंबर सीधे मानक सेलुलर मोबाइल नेटवर्क से जुड़ते हैं।',
      statutory_notice: 'वैधानिक समुद्री सुरक्षा सूचना देखें', statutory_sub: 'आधिकारिक दिशानिर्देश और नौवहन नियम',
      logout: 'मरीनमाइंड से लॉग आउट करें'
    },
    advanced: {
      title: 'सेंसर टेलीमेट्री और महासागरीय मॉडल', subtitle: '6-कारक जोखिम फॉर्मूला और डेटा स्रोत',
      wave_period: 'लहर चरम अवधि', wind_gusts: 'हवा के झोंके', sea_state_code: 'समुद्र स्थिति कोड',
      risk_score: '6-कारक जोखिम स्कोर', provenance_title: 'डेटा स्रोत और मॉडल प्रामाणिकता',
      weather_model: 'ओपन-मेटियो ग्लोबल मरीन और मौसम मॉडल', chlorophyll_model: 'जैव-ऑप्टिकल प्रॉक्सी अनुमान (एसएसटी अपवेलिंग)',
      pfz_model: 'थर्मल सीमा अभिसरण मॉडल',
      disclaimer: 'मरीनमाइंड एआई एक निर्णय-सहायक प्रणाली है। हमेशा भारतीय तटरक्षक बल और मौसम विभाग के निर्देशों का पालन करें।'
    },
    bulletin: {
      title: 'आईएमडी समुद्री बुलेटिन', verified: 'सरकारी सत्यापित', signal: 'संकेत:',
      all_ports_nil: 'सभी बंदरगाहों पर कोई चेतावनी नहीं (सामान्य)', active_advisories_count: 'सक्रिय तटीय परामर्श'
    },
    auth: {
      portal_title: 'नाविक एवं नौका पोर्टल', network_sub: 'भारतीय तटीय समुद्री सुरक्षा तंत्र', secure_badge: 'सुरक्षित प्रवेश',
      quick_skipper_title: 'त्वरित नाविक लॉगिन (एक टैप चयन)', vessel_id_label: 'नौका पंजीकरण संख्या / मोबाइल',
      vessel_id_placeholder: 'IND-MH-01-MM-8492 या मोबाइल', password_label: 'मरीन पिन / पासवर्ड',
      password_placeholder: 'सुरक्षित पासवर्ड दर्ज करें', sign_in_btn: 'टर्मिनल में लॉगिन करें', register_btn: 'नई नौका पंजीकृत करें',
      sign_in_tab: 'लॉगिन करें', register_tab: 'पंजीकरण करें', name_label: 'नाविक / मालिक का नाम',
      name_placeholder: 'उदा. रमेश पाटिल', phone_label: 'मोबाइल फोन नंबर', phone_placeholder: '10 अंकों का मोबाइल नंबर',
      harbor_label: 'गृह मत्स्य बंदरगाह', authenticating: 'प्रमाणीकरण जारी है...',
      demo_hint: 'सत्यापित डेमो खाता: IND-MH-01-MM-8492 / marinepassword',
      eval_badge: 'त्वरित प्रवेश', one_click: '1-क्लिक एक्सेस',
      instant_access_desc: 'मुंबई ससून डॉक्स टेस्ट प्रोफाइल के साथ तुरंत सभी सुविधाओं का परीक्षण करें।',
      instant_access_btn: 'त्वरित अतिथि नाविक प्रवेश', or_divider: 'अथवा क्रेडेंशियल्स के साथ लॉगिन करें',
      mopsw_badge: 'पत्तन, पोत परिवहन और जलमार्ग मंत्रालय मानक',
      welcome_title: 'सुरक्षित समुद्र, बेहतर मछली, शून्य सीमा जोखिम',
      welcome_subtitle: 'तटीय नाविकों के लिए वायुमंडलीय डेटा, उपग्रह महासागर विज्ञान और सीमा सुरक्षा का स्वचालित संयोजन।',
      feature_agents_title: 'स्वचालित बहु-एजेंट एआई प्रणाली',
      feature_agents_desc: 'विशेषज्ञ एजेंट मौसम, समुद्री गतिशीलता और नेविगेशन को सत्यापित सुरक्षा निर्णयों में बदलते हैं।',
      feature_satellite_title: 'उपग्रह पीएफजेड और महासागर डेटा',
      feature_satellite_desc: 'दैनिक थर्मल सीमाएं और क्लोरोफिल विश्लेषण मछली के सर्वोत्तम क्षेत्रों की पहचान करते हैं।',
      feature_imbl_title: 'अंतरराष्ट्रीय सीमा सुरक्षा जियोफेंसिंग',
      feature_imbl_desc: 'स्वचालित चेतावनियां नौकाओं को अंतरराष्ट्रीय सीमाओं और नौसेना क्षेत्रों से सुरक्षित रखती हैं।',
      footer_left: '© 2026 मरीनमाइंड एआई — स्वायत्त समुद्री सुरक्षा कॉपायलट',
      footer_right: 'भारत सरकार मौसम विज्ञान एवं हाइड्रोग्राफिक मानक',
      err_required: 'कृपया सभी आवश्यक फ़ील्ड भरें।',
      err_password_len: 'पासवर्ड कम से कम 8 अक्षरों का होना चाहिए।'
    },
    offline: {
      offshore_mode: 'गहरे समुद्र मोड (ऑफ़लाइन)', cache_mode: 'पूर्व-यात्रा डेटा सक्रिय',
      offline_desc: 'आप समुद्र में मोबाइल नेटवर्क से बाहर हैं। सुरक्षित रूप से सहेजे गए आईएमडी डेटा का उपयोग हो रहा है।',
      cache_desc: 'सत्यापित तटीय बुलेटिन सक्रिय है। नेटवर्क मिलने पर स्वचालित लाइव सिंक होगा।',
      local_cache_badge: 'स्थानीय सुरक्षित कैश'
    }
  },

  // ── MARATHI (mr) ──────────────────────────────────────────────────────────
  mr: {
    nav: { home: 'होम', spots: 'मासेमारी क्षेत्र', trip: 'सुरक्षित प्रवास', ask: 'मदतनीस', profile: 'प्रोफाइल' },
    greeting: {
      morning: 'शुभ प्रभात', afternoon: 'शुभ दुपार', evening: 'शुभ संध्याकाळ',
      captain: 'कॅप्टन', port: 'मूळ बंदर', change_port: 'बंदर बदला', gps_verified: 'GPS पडताळलेले'
    },
    status: {
      title: 'आजची मासेमारी स्थिती', good_to_go: 'जाणे सुरक्षित आहे', caution: 'सावध राहा',
      use_caution: 'विशेष काळजी घ्या', stay_ashore: 'समुद्रात जाऊ नका — किनाऱ्यावर राहा', checking: 'परिस्थिती तपासत आहे...',
      desc_low: 'शांत समुद्र आणि अनुकूल वारे. मासेमारीसाठी परिस्थिती पूर्ण सुरक्षित.',
      desc_moderate: 'मध्यम लाटांचा अंदाज. ओळखीच्या भागात राहा आणि वाऱ्याकडे लक्ष द्या.',
      desc_high: 'उधाण समुद्र आणि जोरदार वारे. लहान बोटींनी किनाऱ्याजवळ राहावे.',
      desc_critical: 'धोकादायक समुद्री परिस्थिती. आज किनाऱ्यावरच सुरक्षित राहा.',
      desc_unknown: 'सागरी उपग्रह डेटाशी जोडत आहे...',
      last_updated: 'शेवटचे अपडेट', live: 'थेट डेटा', unavailable: 'ऑफलाइन / अनुपलब्ध',
      data_unavailable_warning: 'थेट हवामान सेवेशी संपर्क नाही. स्थानिक सुरक्षित सल्ला दाखवला आहे.',
      retry: 'पुन्हा प्रयत्न', safety_verdict: 'सुरक्षितता निर्णय',
      official_advisory_match: 'अधिकृत सागरी इशारा सुसंगत'
    },
    conditions: {
      title: 'सध्याची समुद्री परिस्थिती', waves: 'लाटा', wind: 'वारा', temp: 'तापमान',
      rain: 'पावसाची शक्यता', hazards: 'धोके', sea_state: 'समुद्र स्थिती', wave_period: 'लाटांची वारंवारता',
      wind_gust: 'वाऱ्याचे झोत', calm: 'शांत', moderate: 'मध्यम', rough: 'खवळलेला',
      very_rough: 'अति खवळलेला', light_breeze: 'मंद वारा', moderate_wind: 'मध्यम वारा',
      strong_wind: 'जोरदार वारा', gale: 'वादळी वारा', clear: 'स्वच्छ', watch_out: 'सावधान',
      update: 'रिफ्रेश', meters: 'मी', kmh: 'किमी/तास', knots: 'नॉट', celsius: '°C',
      seconds: 'सेकंद', percent: '%', swell: 'लाटा', visibility: 'दृश्यता'
    },
    actions: {
      find_spots_title: 'मासेमारी ठिकाणे शोधा', find_spots_sub: 'उपग्रह आधारित संभाव्य मासेमारी क्षेत्र',
      plan_trip_title: 'सुरक्षित प्रवास आखा', plan_trip_sub: 'खडक व सागरी हद्द टाळणारा मार्ग',
      quick_assistant_title: 'मरीनमाइंडला विचारा', voice_chat: 'आवाज / चॅट',
      q_can_i_fish: 'आज मासेमारीला जाणे सुरक्षित आहे का?', q_where_to_fish: 'यावेळी सर्वोत्तम मासेमारी क्षेत्र कोठे आहे?',
      q_any_warning: 'वादळ किंवा उंच लाटांची काही सूचना आहे का?', see_all: 'सर्व पाहा',
      top_spot_title: 'उत्कृष्ट शिफारस केलेले क्षेत्र'
    },
    spots: {
      title: 'मासेमारी हॉटस्पॉट (PFZ)', subtitle: 'उपग्रह आधारित संभाव्य मासेमारी क्षेत्र',
      total_spots: 'क्षेत्र आज मॅप केले', filter_all: 'सर्व ठिकाणे', filter_recommended: 'फक्त शिफारस केलेले',
      filter_near: 'जवळचे (< १५ किमी)', no_spots_found: 'या भागात कोणतेही क्षेत्र आढळले नाही.',
      good_fishing: 'उत्कृष्ट मासेमारी क्षेत्र', fair_fishing: 'मध्यम संभाव्यता', avoid_area: 'सावध राहा / टाळा',
      km_away: 'किमी दूर', sea_state: 'समुद्र स्थिती', target_species: 'संभाव्य मासे', view_map: 'नकाशावर पाहा',
      plan_route: 'सुरक्षित मार्ग आखा', thermal_boundary: 'थर्मल फ्रंट', depth: 'खोली', confidence: 'विश्वासार्हता',
      view_list: 'यादी', view_chart: 'नकाशा'
    },
    trip: {
      title: 'सुरक्षित सागरी प्रवास नियोजन', subtitle: 'खडक व आंतरराष्ट्रीय सागरी हद्द (IMBL) टाळणारा सुरक्षित मार्ग',
      step1_title: '१. गंतव्य निवडा', step1_sub: 'सुरुवात करण्यासाठी खालील मासेमारी क्षेत्रावर टॅप करा:',
      step2_title: '२. प्रवास सुरक्षितता पडताळणी', step3_title: '३. सुरक्षित नौकायन मार्ग',
      selected_zone: 'गंतव्य', distance: 'अंतर', est_transit: 'अंदाजे वेळ',
      sea_state: 'समुद्र स्थिती', wind_speed: 'वाऱ्याचा वेग', calculate_btn: 'परिस्थिती तपासा आणि सुरक्षित मार्ग तयार करा',
      calculating: 'खोली आणि सागरी हद्द तपासत आहे...', recommended_safe_fairway: 'शिफारस केलेला सुरक्षित मार्ग',
      direct_hazardous_track: 'थेट मार्ग (धोकादायक)', safe_badge: 'सुरक्षित मार्ग', caution_badge: 'धोकादायक',
      mins: 'मिनीट', km: 'किमी', safety_advisory: 'सुरक्षा सल्ला', tap_to_select: 'सुरु करण्यासाठी क्षेत्र निवडा',
      hazard_warning: 'पाण्याखालील खडक व आंतरराष्ट्रीय सीमा टाळतो', view_plan: 'प्लॅन', view_route: 'रूट'
    },
    profile: {
      title: 'नाविक व बोट सेटिंग्ज', skipper_title: 'परवानाधारक सागरी नाविक', vessel_id: 'बोट नोंदणी क्रमांक (ID)',
      home_port: 'मूळ मासेमारी बंदर', registered_phone: 'नोंदणीकृत मोबाईल क्रमांक', preferred_language: 'पसंतीची भाषा',
      select_language_sub: 'सर्व स्क्रीनवर त्वरित भाषा बदला',
      emergency_contacts_title: 'अधिकृत सागरी आपत्कालीन हेल्पलाइन', emergency_desc: 'थेट कॉल करण्यासाठी टॅप करा',
      icg_title: 'भारतीय तटरक्षक दल (SAR टोल फ्री)', icg_desc: '२४/७ सागरी शोध व बचाव नियंत्रण कक्ष',
      fisheries_title: 'राष्ट्रीय मत्स्यव्यवसाय हेल्पलाइन', fisheries_desc: 'टोल-फ्री मत्स्यव्यवसाय सल्ला (मत्स्यव्यवसाय विभाग)',
      disaster_title: 'राज्य किनारपट्टी आपत्ती नियंत्रण कक्ष', disaster_desc: 'सागरी आपत्कालीन व चक्रीवादळ मदत कक्ष',
      call_btn: 'कॉल करा', emergency_cellular_note: 'आपत्कालीन क्रमांक थेट मोबाइल टॉवर नेटवर्कद्वारे जोडले जातात.',
      statutory_notice: 'वैधानिक सागरी सुरक्षा सूचना पाहा', statutory_sub: 'अधिकृत मार्गदर्शक तत्त्वे व सागरी नियम',
      logout: 'मरीनमाइंडमधून बाहेर पडा (लॉग आउट)'
    },
    advanced: {
      title: 'सेन्सर टेलिमेट्री व महासागरी मॉडेल', subtitle: '६-घटक धोका गुणांक व डेटा स्रोत',
      wave_period: 'लाटांचा कमाल काळ', wind_gusts: 'वाऱ्याची कमाल गती', sea_state_code: 'समुद्र स्थिती कोड',
      risk_score: '६-घटक धोका गुणांक', provenance_title: 'डेटा स्रोत आणि मॉडेल प्रामाणिकता',
      weather_model: 'ओपन-मेटिओ ग्लोबल मरीन आणि हवामान मॉडेल', chlorophyll_model: 'बायो-ऑप्टिकल प्रॉक्सी मॉडेल (एसएसटी)',
      pfz_model: 'थर्मल बाउंड्री मॉडेल',
      disclaimer: 'मरीनमाइंड एआय ही एक निर्णय-सहायक प्रणाली आहे. नेहमी तटरक्षक दल आणि हवामान विभागाच्या सूचनांचे पालन करा.'
    },
    bulletin: {
      title: 'हवामान विभाग सागरी बुलेटिन', verified: 'शासकीय पडताळलेले', signal: 'इशारा बावटा:',
      all_ports_nil: 'सर्व बंदरांवर इशारा नाही (सामान्य)', active_advisories_count: 'सक्रिय किनारपट्टी इशारे'
    },
    auth: {
      portal_title: 'नाविक व नौका पोर्टल', network_sub: 'भारतीय सागरी सुरक्षा जाळे', secure_badge: 'सुरक्षित प्रवेश',
      quick_skipper_title: 'त्वरित नाविक लॉगिन (१-टॅप निवड)', vessel_id_label: 'बोट नोंदणी क्रमांक / मोबाईल',
      vessel_id_placeholder: 'IND-MH-01-MM-8492 किंवा मोबाईल', password_label: 'मरीन पिन / पासवर्ड',
      password_placeholder: 'सुरक्षित पासवर्ड टाका', sign_in_btn: 'टर्मिनलमध्ये लॉगिन करा', register_btn: 'नवीन नौका नोंदणी करा',
      sign_in_tab: 'लॉगिन करा', register_tab: 'नोंदणी करा', name_label: 'नाविक / मालकाचे नाव',
      name_placeholder: 'उदा. रमेश पाटील', phone_label: 'मोबाईल क्रमांक', phone_placeholder: '१० अंकी मोबाईल नंबर',
      harbor_label: 'मूळ मासेमारी बंदर', authenticating: 'पडताळणी सुरू आहे...',
      demo_hint: 'पडताळलेले डेमो खाते: IND-MH-01-MM-8492 / marinepassword',
      eval_badge: 'त्वरित प्रवेश', one_click: '१-क्लिक ॲक्सेस',
      instant_access_desc: 'मुंबई ससून डॉक्स टेस्ट प्रोफाईलसह त्वरित सर्व वैशिष्ट्ये तपासा.',
      instant_access_btn: 'त्वरित अतिथी नाविक प्रवेश', or_divider: 'किंवा क्रेडेंशियल्ससह लॉगिन करा',
      mopsw_badge: 'बंदरे, नौवहन आणि जलमार्ग मंत्रालय मानके',
      welcome_title: 'सुरक्षित समुद्र, भरघोस मासळी, शून्य सीमा धोका',
      welcome_subtitle: 'हवामान, उपग्रह सागरी विज्ञान आणि सीमा संरक्षणाचा आधुनिक संगम.',
      feature_agents_title: 'स्वायत्त मल्टी-एजंट एआय प्रणाली',
      feature_agents_desc: 'विशेष एजंट हवामान आणि नेव्हिगेशनचे विश्लेषण करून खात्रीशीर सल्ला देतात.',
      feature_satellite_title: 'उपग्रह पीएफझेड व सागरी स्थिती',
      feature_satellite_desc: 'दररोजचे थर्मल फ्रंट्स आणि क्लोरोफिल मासळी मिळणाऱ्या सर्वोत्तम जागा दाखवतात.',
      feature_imbl_title: 'आंतरराष्ट्रीय सागरी हद्द संरक्षण',
      feature_imbl_desc: 'स्वयंचलित इशारे नौकांना आंतरराष्ट्रीय सीमा आणि नौदल क्षेत्रांपासून सुरक्षित ठेवतात.',
      footer_left: '© २०२६ मरीनमाइंड एआय — स्वायत्त सागरी सुरक्षा कॉपायलट',
      footer_right: 'भारत सरकार हवामानशास्त्र व हायड्रोग्राफिक मानके',
      err_required: 'कृपया सर्व आवश्यक रकाने भरा.',
      err_password_len: 'पासवर्ड किमान ८ अक्षरांचा असावा.'
    },
    offline: {
      offshore_mode: 'खोल समुद्र मोड (ऑफलाइन)', cache_mode: 'प्रवासपूर्व डेटा सक्रिय',
      offline_desc: 'आपण समुद्रात मोबाइल नेटवर्कच्या बाहेर आहात. सेव्ह केलेल्या अधिकृत हवामान माहितीचा वापर होत आहे.',
      cache_desc: 'पडताळलेले सागरी बुलेटिन सक्रिय. नेटवर्क मिळताच थेट डेटा सुरू होईल.',
      local_cache_badge: 'स्थानिक सुरक्षित डेटा'
    }
  },

  // ── GUJARATI (gu) ─────────────────────────────────────────────────────────
  gu: {
    nav: { home: 'હોમ', spots: 'માછીમારી વિસ્તારો', trip: 'સુરક્ષિત સફર', ask: 'સહાયક', profile: 'પ્રોફાઇલ' },
    greeting: {
      morning: 'શુભ સવાર', afternoon: 'નમસ્કાર', evening: 'શુભ સાંજ',
      captain: 'કેપ્ટન', port: 'મૂળ બંદર', change_port: 'બંદર બદલો', gps_verified: 'GPS ચકાસાયેલ'
    },
    status: {
      title: 'આજની દરિયાઈ સ્થિતિ', good_to_go: 'જવું સુરક્ષિત છે', caution: 'સાવધાની રાખો',
      use_caution: 'વિશેષ સાવચેતી જરૂરી', stay_ashore: 'દરિયામાં ન જાઓ — કિનારે રહો', checking: 'પરિસ્થિતિ તપાસી રહ્યા છીએ...',
      desc_low: 'શાંત દરિયો અને અનુકૂળ પવન. માછીમારી માટે સંપૂર્ણ સલામત.',
      desc_moderate: 'મધ્યમ મોજાની સંભાવના. સાવચેત રહો અને બપોરના પવન પર નજર રાખો.',
      desc_high: 'તોફાની દરિયો અને ભારે પવન. નાની બોટોએ કિનારા પાસે જ રહેવું.',
      desc_critical: 'ખૂબ જ જોખમી દરિયાઈ સ્થિતિ. આજે કોઈપણ સંજોગોમાં દરિયામાં ન જવું.',
      desc_unknown: 'દરિયાઈ ઉપગ્રહ ડેટા સાથે જોડાઈ રહ્યું છે...',
      last_updated: 'છેલ્લું અપડેટ', live: 'લાઈવ ડેટા', unavailable: 'ઑફલાઇન / અનુપલબ્ધ',
      data_unavailable_warning: 'લાઈવ હવામાન સેવા ઉપલબ્ધ નથી. ચકાસાયેલ સ્થાનિક સલાહ દર્શાવેલ છે.',
      retry: 'ફરી પ્રયાસ', safety_verdict: 'સુરક્ષા નિર્ણય',
      official_advisory_match: 'સત્તાવાર દરિયાઈ ચેતવણી મેળ'
    },
    conditions: {
      title: 'વર્તમાન દરિયાઈ સ્થિતિ', waves: 'મોજા', wind: 'પવન', temp: 'તાપમાન',
      rain: 'વરસાદ સંભાવના', hazards: 'જોખમો', sea_state: 'દરિયાઈ સ્થિતિ', wave_period: 'મોજા સમય',
      wind_gust: 'પવનના ઝાપટા', calm: 'શાંત', moderate: 'મધ્યમ', rough: 'તોફાની',
      very_rough: 'અતિ તોફાની', light_breeze: 'હળવો પવન', moderate_wind: 'મધ્યમ પવન',
      strong_wind: 'ભારે પવન', gale: 'તોફાની પવન', clear: 'સ્વચ્છ', watch_out: 'સાવચેત',
      update: 'રિફ્રેશ', meters: 'મી', kmh: 'કિમી/કલાક', knots: 'નોટ્સ', celsius: '°C',
      seconds: 'સેકન્ડ', percent: '%', swell: 'મોજા', visibility: 'દૃશ્યતા'
    },
    actions: {
      find_spots_title: 'માછીમારી સ્થળો શોધો', find_spots_sub: 'ઉપગ્રહ આધારિત સંભવિત માછીમારી વિસ્તારો',
      plan_trip_title: 'સુરક્ષિત સફર બનાવો', plan_trip_sub: 'ખડકો અને સરહદથી સુરક્ષિત માર્ગ',
      quick_assistant_title: 'મરીનમાઇન્ડને પૂછો', voice_chat: 'અવાજ / ચેટ',
      q_can_i_fish: 'શું આજે માછીમારી માટે જવું સુરક્ષિત છે?', q_where_to_fish: 'અત્યારે સૌથી સારો માછીમારી વિસ્તાર ક્યાં છે?',
      q_any_warning: 'શું કોઈ વાવાઝોડું કે ઊંચા મોજાની ચેતવણી છે?', see_all: 'બધા જુઓ',
      top_spot_title: 'શ્રેષ્ઠ ભલામણ કરેલ વિસ્તાર'
    },
    spots: {
      title: 'માછીમારી હોટસ્પોટ્સ (PFZ)', subtitle: 'ઉપગ્રહ આધારિત મહાસાગરીય સંભવિત વિસ્તારો',
      total_spots: 'વિસ્તારો આજે મેપ થયા', filter_all: 'બધા સ્થળો', filter_recommended: 'માત્ર ભલામણ કરેલ',
      filter_near: 'નજીકના (< 15 કિમી)', no_spots_found: 'આ વિસ્તારમાં કોઈ સ્થળ મેપ થયેલ નથી.',
      good_fishing: 'ઉત્તમ માછીમારી વિસ્તાર', fair_fishing: 'મધ્યમ સંભાવના', avoid_area: 'સાવધાની / ટાળો',
      km_away: 'કિમી દૂર', sea_state: 'દરિયાઈ સ્થિતિ', target_species: 'સંભવિત માછલી', view_map: 'નકશા પર જુઓ',
      plan_route: 'સુરક્ષિત રસ્તો બનાવો', thermal_boundary: 'થર્મલ ફ્રન્ટ', depth: 'ઊંડાઈ', confidence: 'વિશ્વસનીયતા',
      view_list: 'યાદી', view_chart: 'નકશો'
    },
    trip: {
      title: 'સુરક્ષિત દરિયાઈ સફર યોજના', subtitle: 'ખડકો અને આંતરરાષ્ટ્રીય સરહદથી બચાવ સાથે માર્ગદર્શન',
      step1_title: '1. ગંતવ્ય સ્થળ પસંદ કરો', step1_sub: 'શરૂ કરવા માટે નીચે આપેલા માછીમારી વિસ્તાર પર ટેપ કરો:',
      step2_title: '2. સફર સુરક્ષા અને સ્થિતિ ચકાસણી', step3_title: '3. સુરક્ષિત નેવિગેશન માર્ગ',
      selected_zone: 'ગંતવ્ય', distance: 'અંતર', est_transit: 'અંદાજિત સમય',
      sea_state: 'દરિયાઈ સ્થિતિ', wind_speed: 'પવનની ગતિ', calculate_btn: 'સ્થિતિ તપાસો અને સુરક્ષિત માર્ગ બનાવો',
      calculating: 'ઊંડાઈ અને સુરક્ષા સરહદ તપાસી રહ્યા છીએ...', recommended_safe_fairway: 'ભલામણ કરેલ સુરક્ષિત માર્ગ',
      direct_hazardous_track: 'સીધો માર્ગ (જોખમી)', safe_badge: 'સુરક્ષિત માર્ગ', caution_badge: 'જોખમ',
      mins: 'મિનિટ', km: 'કિમી', safety_advisory: 'સુરક્ષા સલાહ', tap_to_select: 'શરૂ કરવા માટે એક વિસ્તાર પસંદ કરો',
      hazard_warning: 'પાણીની અંદરના અવરોધો અને સરહદ વિસ્તારથી બચાવે છે', view_plan: 'પ્લાન', view_route: 'રૂટ'
    },
    profile: {
      title: 'નાવિક અને બોટ સેટિંગ્સ', skipper_title: 'પ્રમાણિત દરિયાઈ નાવિક', vessel_id: 'બોટ નોંધણી નંબર (ID)',
      home_port: 'મૂળ મત્સ્ય બંદર', registered_phone: 'નોંધાયેલ મોબાઈલ નંબર', preferred_language: 'પસંદગીની ભાષા',
      select_language_sub: 'બધા સ્ક્રીન પર તરત જ ભાષા બદલો',
      emergency_contacts_title: 'સત્તાવાર દરિયાઈ ઈમરજન્સી હેલ્પલાઇન', emergency_desc: 'સીધા કૉલ કરવા માટે ટેપ કરો',
      icg_title: 'ભારતીય તટરક્ષક દળ (SAR ટોલ ફ્રી)', icg_desc: '24/7 દરિયાઈ શોધ અને બચાવ કામગીરી કેન્દ્ર',
      fisheries_title: 'રાષ્ટ્રીય મત્સ્યોદ્યોગ હેલ્પલાઇન', fisheries_desc: 'ટોલ-ફ્રી મત્સ્યોદ્યોગ સલાહ સેવા',
      disaster_title: 'રાજ્ય દરિયાકાંઠા આપત્તિ નિયંત્રણ કક્ષ', disaster_desc: 'દરિયાઈ કટોકટી અને વાવાઝોડું સહાય',
      call_btn: 'કૉલ કરો', emergency_cellular_note: 'ઇમરજન્સી નંબરો સીધા સેલ્યુલર મોબાઇલ નેટવર્ક દ્વારા જોડાય છે.',
      statutory_notice: 'કાનૂની દરિયાઈ સુરક્ષા સૂચના જુઓ', statutory_sub: 'સત્તાવાર માર્ગદર્શિકા અને નેવિગેશન નિયમો',
      logout: 'મરીનમાઇન્ડમાંથી લૉગ આઉટ કરો'
    },
    advanced: {
      title: 'સેન્સર ટેલિમેટ્રી અને મહાસાગરીય મોડેલો', subtitle: '6-પરિબળ જોખમ ફોર્મ્યુલા અને ડેટા સ્ત્રોતો',
      wave_period: 'મોજા મહત્તમ સમયગાળો', wind_gusts: 'પવનના ઝાપટા', sea_state_code: 'દરિયાઈ સ્થિતિ કોડ',
      risk_score: '6-પરિબળ જોખમ સ્કોર', provenance_title: 'ડેટા સ્ત્રોતો અને મોડેલ પ્રામાણિકતા',
      weather_model: 'ઓપન-મેટિઓ ગ્લોબલ મરીન અને વેધર મોડેલ', chlorophyll_model: 'બાયો-ઓપ્ટિકલ પ્રોક્સી અંદાજ (SST)',
      pfz_model: 'થર્મલ બાઉન્ડ્રી કન્વર્જન્સ મોડેલ',
      disclaimer: 'મરીનમાઇન્ડ એઆઇ એક નિર્ણય-સહાયક પ્રણાલી છે. હંમેશા તટરક્ષક દળ અને હવામાન વિભાગના નિર્દેશોનું પાલન કરો.'
    },
    bulletin: {
      title: 'હવામાન વિભાગ દરિયાઈ બુલેટિન', verified: 'સરકારી ચકાસાયેલ', signal: 'સિગ્નલ:',
      all_ports_nil: 'બધા બંદરો પર કોઈ ચેતવણી નથી (સામાન્ય)', active_advisories_count: 'સક્રિય દરિયાકાંઠા ચેતવણીઓ'
    },
    auth: {
      portal_title: 'નાવિક અને બોટ પોર્ટલ', network_sub: 'ભારતીય દરિયાઈ સુરક્ષા નેટવર્ક', secure_badge: 'સુરક્ષિત પ્રવેશ',
      quick_skipper_title: 'ઝડપી નાવિક લૉગિન (1-ટેપ પસંદગી)', vessel_id_label: 'બોટ નોંધણી નંબર / મોબાઈલ',
      vessel_id_placeholder: 'IND-MH-01-MM-8492 અથવા મોબાઈલ', password_label: 'મરીન પિન / પાસવર્ડ',
      password_placeholder: 'સુરક્ષિત પાસવર્ડ દાખલ કરો', sign_in_btn: 'ટર્મિનલમાં લૉગિન કરો', register_btn: 'નવી બોટ નોંધણી કરો',
      sign_in_tab: 'લૉગિન કરો', register_tab: 'નોંધણી કરો', name_label: 'નાવિક / માલિકનું નામ',
      name_placeholder: 'દા.ત. રમેશ પાટિલ', phone_label: 'મોબાઈલ નંબર', phone_placeholder: '10 અંકનો મોબાઈલ નંબર',
      harbor_label: 'મૂળ મત્સ્ય બંદર', authenticating: 'ચકાસણી ચાલુ છે...',
      demo_hint: 'ચકાસાયેલ ડેમો ખાતું: IND-MH-01-MM-8492 / marinepassword',
      eval_badge: 'ઝડપી પ્રવેશ', one_click: '1-ક્લિક એક્સેસ',
      instant_access_desc: 'મુંબઈ સસૂન ડૉક ટેસ્ટ પ્રોફાઇલ સાથે તમામ સુવિધાઓનું પરીક્ષણ કરો.',
      instant_access_btn: 'ઝડપી અતિથિ નાવિક પ્રવેશ', or_divider: 'અથવા વિગતો સાથે લૉગિન કરો',
      mopsw_badge: 'પોર્ટ, શિપિંગ અને જળમાર્ગ મંત્રાલયના ધોરણો',
      welcome_title: 'સુરક્ષિત દરિયો, ઉત્તમ પકડ, શૂન્ય સરહદ જોખમ',
      welcome_subtitle: 'દરિયાકાંઠાના નાવિકો માટે હવામાન ડેટા, ઉપગ્રહ વિજ્ઞાન અને સરહદ સુરક્ષાનું આપોઆપ સંયોજન.',
      feature_agents_title: 'સ્વાયત્ત મલ્ટિ-એજન્ટ AI સિસ્ટમ',
      feature_agents_desc: 'વિશેષ એજન્ટો હવામાન અને નેવિગેશનનું વિશ્લેષણ કરીને સચોટ સલાહ આપે છે.',
      feature_satellite_title: 'સેટેલાઇટ PFZ અને મહાસાગર ડેટા',
      feature_satellite_desc: 'દૈનિક થર્મલ ફ્રન્ટ્સ અને ક્લોરોફિલ માછલી પકડવાના શ્રેષ્ઠ વિસ્તારો દર્શાવે છે.',
      feature_imbl_title: 'આંતરરાષ્ટ્રીય દરિયાઈ સરહદ સુરક્ષા',
      feature_imbl_desc: 'ઓટોમેટેડ ચેતવણીઓ બોટોને આંતરરાષ્ટ્રીય સરહદો અને નૌકાદળ વિસ્તારોથી સુરક્ષિત રાખે છે.',
      footer_left: '© 2026 મરીનમાઇન્ડ એઆઇ — સ્વાયત્ત દરિયાઈ સુરક્ષા સહાયક',
      footer_right: 'ભારત સરકાર હવામાનશાસ્ત્ર અને હાઇડ્રોગ્રાફિક ધોરણો',
      err_required: 'કૃપા કરીને બધી જરૂરી વિગતો ભરો.',
      err_password_len: 'પાસવર્ડ ઓછામાં ઓછો 8 અક્ષરોનો હોવો જોઈએ.'
    },
    offline: {
      offshore_mode: 'ઊંડા દરિયા મોડ (ઑફલાઇન)', cache_mode: 'સફર પૂર્વેનો ડેટા સક્રિય',
      offline_desc: 'તમે દરિયામાં મોબાઈલ નેટવર્કની બહાર છો. સાચવેલ હવામાન માહિતીનો ઉપયોગ થઈ રહ્યો છે.',
      cache_desc: 'ચકાસાયેલ દરિયાઈ બુલેટિન સક્રિય છે. નેટવર્ક મળતા આપોઆપ લાઈવ સિંક થશે.',
      local_cache_badge: 'સ્થાનિક સુરક્ષિત કેશ'
    }
  },

  // ── TAMIL (ta) ────────────────────────────────────────────────────────────
  ta: {
    nav: { home: 'முகப்பு', spots: 'மீன்பிடி இடம்', trip: 'பயணம்', ask: 'கேள்', profile: 'சுயவிவரம்' },
    greeting: {
      morning: 'காலை வணக்கம்', afternoon: 'மதிய வணக்கம்', evening: 'மாலை வணக்கம்',
      captain: 'கேப்டன்', port: 'சொந்த துறைமுகம்', change_port: 'துறைமுகத்தை மாற்று', gps_verified: 'GPS சரிபார்க்கப்பட்டது'
    },
    status: {
      title: 'இன்றைய மீன்பிடி நிலைமை', good_to_go: 'கடலுக்கு செல்லலாம்', caution: 'எச்சரிக்கையுடன் செல்லவும்',
      use_caution: 'அதிக கவனம் தேவை', stay_ashore: 'கடலுக்கு போகாதீர்கள் — கரையிலேயே இருங்கள்', checking: 'நிலைமைகளை சரிபார்க்கிறது...',
      desc_low: 'அமைதியான கடல் மற்றும் சாதகமான காற்று. மீன்பிடிக்க முற்றிலும் பாதுகாப்பானது.',
      desc_moderate: 'மிதமான அலைகள் எதிர்பார்க்கப்படுகிறது. கவனமாக இருங்கள் மற்றும் மதிய காற்றைக் கண்காணிக்கவும்.',
      desc_high: 'கொந்தளிப்பான கடல் மற்றும் பலத்த காற்று. சிறிய படகுகள் கரைக்கு அருகிலேயே இருக்கவும்.',
      desc_critical: 'மிக ஆபத்தான கடல் நிலைமை. இன்று முற்றிலும் கடலுக்கு செல்ல வேண்டாம்.',
      desc_unknown: 'செயற்கைக்கோள் தரவுடன் இணைகிறது...',
      last_updated: 'கடைசியாக புதுப்பிக்கப்பட்டது', live: 'நேரலை', unavailable: 'ஆஃப்லைன் / கிடைக்கவில்லை',
      data_unavailable_warning: 'நேரலை வானிலை சேவை கிடைக்கவில்லை. உள்ளூர் பாதுகாப்பு ஆலோசனை காட்டப்படுகிறது.',
      retry: 'மீண்டும் முயற்சி', safety_verdict: 'பாதுகாப்பு முடிவு',
      official_advisory_match: 'அதிகாரப்பூர்வ கடல் எச்சரிக்கை பொருத்தம்'
    },
    conditions: {
      title: 'தற்போதைய கடல் நிலைமை', waves: 'அலைகள்', wind: 'காற்று', temp: 'வெப்பநிலை',
      rain: 'மழை வாய்ப்பு', hazards: 'எச்சரிக்கை', sea_state: 'கடல் நிலை', wave_period: 'அலை உச்ச காலம்',
      wind_gust: 'காற்று வீச்சு', calm: 'அமைதி', moderate: 'மிதமான', rough: 'கொந்தளிப்பு',
      very_rough: 'மிகக் கொந்தளிப்பு', light_breeze: 'மென் காற்று', moderate_wind: 'மித காற்று',
      strong_wind: 'பலத்த காற்று', gale: 'புயல் காற்று', clear: 'தெளிவானது', watch_out: 'கவனம்',
      update: 'புதுப்பி', meters: 'மீ', kmh: 'கி.மீ/மணி', knots: 'நாட்ஸ்', celsius: '°C',
      seconds: 'விநாடி', percent: '%', swell: 'அலை எழுச்சி', visibility: 'பார்வைத்திறன்'
    },
    actions: {
      find_spots_title: 'மீன்பிடி பகுதிகளைக் காண்க', find_spots_sub: 'செயற்கைக்கோள் அடையாளம் காணப்பட்ட பகுதிகள்',
      plan_trip_title: 'பாதுகாப்பான பயணத் திட்டம்', plan_trip_sub: 'பாறைகள் மற்றும் எல்லை தவிர்ப்புப் பாதை',
      quick_assistant_title: 'MarineMind AI-யிடம் கேளுங்கள்', voice_chat: 'குரல் / அரட்டை',
      q_can_i_fish: 'இன்று மீன்பிடிக்கப் போகலாமா?', q_where_to_fish: 'தற்போது சிறந்த மீன்பிடி இடம் எங்கே உள்ளது?',
      q_any_warning: 'ஏதேனும் புயல் அல்லது உயரலை எச்சரிக்கை உள்ளதா?', see_all: 'அனைத்தையும் பார்',
      top_spot_title: 'பரிந்துரைக்கப்பட்ட சிறந்த இடம்'
    },
    spots: {
      title: 'மீன்பிடி பகுதிகள் (PFZ)', subtitle: 'செயற்கைக்கோள் கண்டறிந்த மீன்பிடி பகுதிகள்',
      total_spots: 'பகுதிகள் இன்று வரைபடமாக்கப்பட்டன', filter_all: 'அனைத்து இடங்கள்', filter_recommended: 'பரிந்துரைக்கப்பட்டவை',
      filter_near: 'அருகில் (< 15 கி.மீ)', no_spots_found: 'இந்த பகுதியில் மீன்பிடி பகுதிகள் இல்லை.',
      good_fishing: 'சிறந்த மீன்பிடி பகுதி', fair_fishing: 'மிதமான பகுதி', avoid_area: 'தவிர்க்கவும் / கவனம்',
      km_away: 'கி.மீ தொலைவில்', sea_state: 'கடல் நிலை', target_species: 'கிடைக்கும் மீன்கள்', view_map: 'வரைபடத்தில் காண்க',
      plan_route: 'பாதை திட்டமிடு', thermal_boundary: 'வெப்பநிலை எல்லை', depth: 'ஆழம்', confidence: 'நம்பகத்தன்மை',
      view_list: 'பட்டியல்', view_chart: 'வரைபடம்'
    },
    trip: {
      title: 'பாதுகாப்பான பயணத் திட்டம்', subtitle: 'பாறைகள் மற்றும் சர்வதேச கடல் எல்லையைத் (IMBL) தவிர்க்கும் பாதை',
      step1_title: '1. இலக்கைத் தேர்ந்தெடுக்கவும்', step1_sub: 'தொடங்க கீழே உள்ள மீன்பிடி பகுதியைத் தொடவும்:',
      step2_title: '2. பயணப் பாதுகாப்பு சரிபார்ப்பு', step3_title: '3. பாதுகாப்பான கடல் வழி',
      selected_zone: 'இலக்கு', distance: 'தூரம்', est_transit: 'மதிப்பிடப்பட்ட நேரம்',
      sea_state: 'கடல் நிலை', wind_speed: 'காற்று வேகம்', calculate_btn: 'பாதுகாப்பான பாதையை உருவாக்குங்கள்',
      calculating: 'ஆழம் மற்றும் பாதுகாப்பு எல்லை சரிபார்க்கப்படுகிறது...', recommended_safe_fairway: 'பரிந்துரைக்கப்பட்ட பாதுகாப்பான பாதை',
      direct_hazardous_track: 'நேரடிப் பாதை (ஆபத்தானது)', safe_badge: 'பாதுகாப்பானது', caution_badge: 'ஆபத்தானது',
      mins: 'நிமிடங்கள்', km: 'கி.மீ', safety_advisory: 'பாதுகாப்பு ஆலோசனை', tap_to_select: 'தொடங்க பகுதியைத் தேர்ந்தெடுக்கவும்',
      hazard_warning: 'நீருக்கடியில் உள்ள பாறைகள் மற்றும் எல்லைகளைத் தவிர்க்கிறது', view_plan: 'திட்டம்', view_route: 'பாதை'
    },
    profile: {
      title: 'படகு & மாலுமி அமைப்புகள்', skipper_title: 'உரிமம் பெற்ற கடல் மாலுமி', vessel_id: 'படகு பதிவு எண் (ID)',
      home_port: 'சொந்த மீன்பிடி துறைமுகம்', registered_phone: 'பதிவுசெய்த கைபேசி எண்', preferred_language: 'விருப்பமான மொழி',
      select_language_sub: 'அனைத்து பக்கங்களிலும் உடனடியாக மாறும்',
      emergency_contacts_title: 'அதிகாரப்பூர்வ கடல்சார் அவசர எண்கள்', emergency_desc: 'நேரடியாக அழைக்க தொடவும்',
      icg_title: 'இந்திய கடலோர காவல்படை (SAR கட்டணமில்லா எண்)', icg_desc: '24/7 கடல்சார் தேடல் மற்றும் மீட்புப் பிரிவு',
      fisheries_title: 'தேசிய மீன்வள உதவி எண்', fisheries_desc: 'மத்திய மீன்வளத் துறை ஆலோசனை சேவை',
      disaster_title: 'மாநில கடலோர பேரிடர் கட்டுப்பாட்டு அறை', disaster_desc: 'கடல் அவசரநிலை மற்றும் புயல் மீட்புப் பிரிவு',
      call_btn: 'அழைக்க', emergency_cellular_note: 'அவசர எண்கள் நேரடியாக கைபேசி சிக்னல் மூலம் இணையும்.',
      statutory_notice: 'சட்டப்பூர்வ கடல் பாதுகாப்பு அறிவிப்பு', statutory_sub: 'அதிகாரப்பூர்வ எச்சரிக்கைகள் மற்றும் வழிகாட்டுதல்கள்',
      logout: 'MarineMind-லிருந்து வெளியேறு'
    },
    advanced: {
      title: 'சென்சார் டெலிமெட்ரி & கடல் மாதிரிகள்', subtitle: '6-காரணி இடர் கணக்கீடு மற்றும் சுற்றுச்சூழல் மூலங்கள்',
      wave_period: 'அலை உச்சக் காலம்', wind_gusts: 'காற்று வீச்சு உச்சம்', sea_state_code: 'கடல் நிலை குறியீடு',
      risk_score: '6-காரணி இடர் குறியீடு', provenance_title: 'தரவு ஆதாரம் & நம்பகத்தன்மை',
      weather_model: 'Open-Meteo உலகளாவிய கடல்சார் மாதிரி', chlorophyll_model: 'உயிர்-ஒளியியல் மாதிரி (SST)',
      pfz_model: 'வெப்பநிலை எல்லை கண்டறிதல் மாதிரி',
      disclaimer: 'MarineMind AI என்பது முடிவெடுக்கும் உதவி அமைப்பாகும். எப்போதும் இந்திய கடலோர காவல்படை மற்றும் வானிலை மைய அறிவிப்புகளைப் பின்பற்றவும்.'
    },
    bulletin: {
      title: 'வானிலை மைய கடல் அறிக்கை', verified: 'அரசு சரிபார்க்கப்பட்டது', signal: 'எச்சரிக்கை சிக்னல்:',
      all_ports_nil: 'அனைத்து துறைமுகங்களிலும் எச்சரிக்கை ஏதுமில்லை (வழக்கமான நிலை)', active_advisories_count: 'செயலில் உள்ள கடல் எச்சரிக்கைகள்'
    },
    auth: {
      portal_title: 'படகு & மாலுமி போர்டல்', network_sub: 'இந்திய கடலோர கடல் பாதுகாப்பு நெட்வொர்க்', secure_badge: 'பாதுகாப்பான நுழைவு',
      quick_skipper_title: 'விரைவு மாலுமி உள்நுழைவு (1-தொடுதல்)', vessel_id_label: 'படகு பதிவு எண் / கைபேசி',
      vessel_id_placeholder: 'IND-MH-01-MM-8492 அல்லது கைபேசி', password_label: 'மரைன் பின் / கடவுச்சொல்',
      password_placeholder: 'கடவுச்சொல்லை உள்ளிடவும்', sign_in_btn: 'முனையத்தில் உள்நுழைக', register_btn: 'புதிய படகை பதிவு செய்க',
      sign_in_tab: 'உள்நுழைக', register_tab: 'பதிவு செய்க', name_label: 'மாலுமி / உரிமையாளர் பெயர்',
      name_placeholder: 'எ.கா. ரமேஷ் பாட்டீல்', phone_label: 'கைபேசி எண்', phone_placeholder: '10 இலக்க கைபேசி எண்',
      harbor_label: 'சொந்த மீன்பிடி துறைமுகம்', authenticating: 'சரிபார்க்கிறது...',
      demo_hint: 'டெமோ கணக்கு: IND-MH-01-MM-8492 / marinepassword',
      eval_badge: 'விரைவு அணுகல்', one_click: '1-கிளிக் நுழைவு',
      instant_access_desc: 'மும்பை சாசூன் டாக் சோதனை சுயவிவரத்துடன் அனைத்து அம்சங்களையும் சோதிக்கவும்.',
      instant_access_btn: 'விருந்தினர் மாலுமி அணுகல்', or_divider: 'அல்லது விவரங்களுடன் உள்நுழையவும்',
      mopsw_badge: 'மத்திய துறைமுகங்கள், கப்பல் போக்குவரத்து அமைச்சக தரம்',
      welcome_title: 'பாதுகாப்பான கடல், அதிக மீன்பிடிப்பு, பூஜ்ஜிய எல்லை ஆபத்து',
      welcome_subtitle: 'கடலோர மீனவர்களுக்கான வானிலை தரவு, செயற்கைக்கோள் கடல்சார் அறிவியல் மற்றும் எல்லைப் பாதுகாப்பு.',
      feature_agents_title: 'தன்னாட்சி மல்டி-ஏஜென்ட் AI அமைப்பு',
      feature_agents_desc: 'வானிலை, கடல் இயக்கவியல் மற்றும் வழிகாட்டலை துல்லியமான பாதுகாப்பு முடிவுகளாக மாற்றுகிறது.',
      feature_satellite_title: 'செயற்கைக்கோள் PFZ & கடல் தரவு',
      feature_satellite_desc: 'தினசரி வெப்பநிலை எல்லைகள் மீன்கள் அதிகம் கிடைக்கும் பகுதிகளை அடையாளம் காட்டுகின்றன.',
      feature_imbl_title: 'சர்வதேச கடல் எல்லை பாதுகாப்பு (IMBL)',
      feature_imbl_desc: 'தானியங்கி எச்சரிக்கைகள் சர்வதேச எல்லைகளில் இருந்து படகுகளைப் பாதுகாக்கின்றன.',
      footer_left: '© 2026 MarineMind AI — தன்னாட்சி கடல்சார் பாதுகாப்பு உதவியாளர்',
      footer_right: 'இந்திய அரசு வானிலை ஆய்வு மற்றும் ஹைட்ரோகிராஃபிக் தரநிலைகள்',
      err_required: 'அனைத்து தேவையான விவரங்களையும் நிரப்பவும்.',
      err_password_len: 'கடவுச்சொல் குறைந்தது 8 எழுத்துக்கள் இருக்க வேண்டும்.'
    },
    offline: {
      offshore_mode: 'ஆழ்கடல் பயன்முறை (ஆஃப்லைன்)', cache_mode: 'பயணத்திற்கு முந்தைய தரவு',
      offline_desc: 'நீங்கள் கடலில் மொபைல் சிக்னல் எல்லைக்கு வெளியே உள்ளீர்கள். சேமிக்கப்பட்ட வானிலை அறிக்கை பயன்படுகிறது.',
      cache_desc: 'சரிபார்க்கப்பட்ட அறிக்கை செயலில் உள்ளது. சிக்னல் கிடைத்ததும் தானாக நேரலைக்கு மாறும்.',
      local_cache_badge: 'பாதுகாப்பான உள்ளூர் தரவு'
    }
  },

  // ── MALAYALAM (ml) ────────────────────────────────────────────────────────
  ml: {
    nav: { home: 'ഹോം', spots: 'മത്സ്യ മേഖല', trip: 'യാത്ര', ask: 'സഹായി', profile: 'പ്രൊഫൈൽ' },
    greeting: {
      morning: 'സുപ്രഭാതം', afternoon: 'നമസ്കാരം', evening: 'ശുഭസായാഹ്നം',
      captain: 'ക്യാപ്റ്റൻ', port: 'തുറമുഖം', change_port: 'തുറമുഖം മാറ്റുക', gps_verified: 'GPS ഉറപ്പുവരുത്തി'
    },
    status: {
      title: 'ഇന്നത്തെ കടൽ സുരക്ഷാ നില', good_to_go: 'കടലിൽ പോകാം', caution: 'ജാഗ്രത പാലിക്കുക',
      use_caution: 'പ്രത്യേക ജാഗ്രത വേണം', stay_ashore: 'കടലിൽ പോകരുത് — കരയിൽ നിൽക്കുക', checking: 'സാഹചര്യങ്ങൾ പരിശോധിക്കുന്നു...',
      desc_low: 'ശാന്തമായ കടലും അനുകൂല കാറ്റും. മീൻപിടുത്തത്തിന് തികച്ചും സുരക്ഷിതം.',
      desc_moderate: 'മിതമായ തിരമാലകൾക്ക് സാധ്യത. ജാഗ്രത പാലിക്കുകയും കാറ്റ് നിരീക്ഷിക്കുകയും ചെയ്യുക.',
      desc_high: 'പ്രക്ഷുബ്ധമായ കടലും ശക്തമായ കാറ്റും. ചെറിയ ബോട്ടുകൾ തീരത്തിനടുത്ത് നിൽക്കണം.',
      desc_critical: 'അത്യന്തം അപകടകരമായ കടൽ. ഇന്ന് യാതൊരു കാരണവശാലും കടലിൽ പോകരുത്.',
      desc_unknown: 'ഉപഗ്രഹ ഡാറ്റയുമായി ബന്ധിപ്പിക്കുന്നു...',
      last_updated: 'അവസാനം പുതുക്കിയത്', live: 'തത്സമയം', unavailable: 'ഓഫ്‌ലൈൻ',
      data_unavailable_warning: 'തത്സമയ കാലാവസ്ഥ ലഭ്യമല്ല. പ്രാദേശിക മുന്നറിയിപ്പ് കാണിക്കുന്നു.',
      retry: 'വീണ്ടും ശ്രമിക്കുക', safety_verdict: 'സുരക്ഷാ തീരുമാനം',
      official_advisory_match: 'ഔദ്യോഗിക തീരദേശ മുന്നറിയിപ്പ് പൊരുത്തം'
    },
    conditions: {
      title: 'നിലവിലെ കടൽ അവസ്ഥ', waves: 'തിരമാലകൾ', wind: 'കാറ്റ്', temp: 'താപനില',
      rain: 'മഴ സാധ്യത', hazards: 'അപകടങ്ങൾ', sea_state: 'കടൽ അവസ്ഥ', wave_period: 'തിര ദൈർഘ്യം',
      wind_gust: 'കാറ്റിന്റെ വേഗത', calm: 'ശാന്തം', moderate: 'മിതമായത്', rough: 'പ്രക്ഷുബ്ധം',
      very_rough: 'അതിപ്രക്ഷുബ്ധം', light_breeze: 'ഇളം കാറ്റ്', moderate_wind: 'മിതമായ കാറ്റ്',
      strong_wind: 'ശക്തമായ കാറ്റ്', gale: 'കൊടുങ്കാറ്റ്', clear: 'വ്യക്തം', watch_out: 'ജാഗ്രത',
      update: 'പുതുക്കുക', meters: 'മീറ്റർ', kmh: 'കി.മീ/മണിക്കൂർ', knots: 'നോട്ട്', celsius: '°C',
      seconds: 'സെക്കൻഡ്', percent: '%', swell: 'തിരമാല ഉയരം', visibility: 'കാഴ്ച പരിധി'
    },
    actions: {
      find_spots_title: 'മത്സ്യബന്ധന കേന്ദ്രങ്ങൾ കണ്ടെത്തുക', find_spots_sub: 'ഉപഗ്രഹം കണ്ടെത്തിയ മത്സ്യ കേന്ദ്രങ്ങൾ',
      plan_trip_title: 'സുരക്ഷിത പാത ആസൂത്രണം ചെയ്യുക', plan_trip_sub: 'പാറകളും അതിർത്തികളും ഒഴിവാക്കുന്ന വഴി',
      quick_assistant_title: 'MarineMind-നോട് ചോദിക്കുക', voice_chat: 'വോയ്‌സ് / ചാറ്റ്',
      q_can_i_fish: 'ഇന്ന് മീൻപിടിക്കാൻ പോകാമോ?', q_where_to_fish: 'ഏറ്റവും മികച്ച മത്സ്യ കേന്ദ്രം എവിടെയാണ്?',
      q_any_warning: 'കൊടുങ്കാറ്റ് മുന്നറിയിപ്പ് ഉണ്ടോ?', see_all: 'എല്ലാം കാണുക',
      top_spot_title: 'ഏറ്റവും മികച്ച കേന്ദ്രം'
    },
    spots: {
      title: 'മത്സ്യ കേന്ദ്രങ്ങൾ (PFZ)', subtitle: 'ഉപഗ്രഹ സാങ്കേതികവിദ്യ അടിസ്ഥാനമാക്കിയുള്ള മേഖലകൾ',
      total_spots: 'മേഖലകൾ മാപ്പ് ചെയ്തു', filter_all: 'എല്ലാ സ്ഥലങ്ങളും', filter_recommended: 'ശുപാർശ ചെയ്തവ മാത്രം',
      filter_near: 'തീരത്തിനടുത്ത് (< 15 കി.മീ)', no_spots_found: 'ഈ മേഖലയിൽ സ്ഥലങ്ങളൊന്നും കണ്ടെത്തിയില്ല.',
      good_fishing: 'മികച്ച മത്സ്യ കേന്ദ്രം', fair_fishing: 'മിതമായ സാധ്യത', avoid_area: 'ഒഴിവാക്കുക / ജാഗ്രത',
      km_away: 'കി.മീ അകലെ', sea_state: 'കടൽ അവസ്ഥ', target_species: 'പ്രതീക്ഷിക്കുന്ന മത്സ്യം', view_map: 'മാപ്പിൽ കാണുക',
      plan_route: 'സുരക്ഷിത പാത തയ്യാറാക്കുക', thermal_boundary: 'തെർമൽ ഫ്രണ്ട്', depth: 'ആഴം', confidence: 'കൃത്യത',
      view_list: 'പട്ടിക', view_chart: 'മാപ്പ്'
    },
    trip: {
      title: 'സുരക്ഷിത യാത്രാ പ്ലാനർ', subtitle: 'പാറകളും അതിർത്തികളും ഒഴിവാക്കിയുള്ള സുരക്ഷിത മാർഗ്ഗം',
      step1_title: '1. ലക്ഷ്യസ്ഥാനം തിരഞ്ഞെടുക്കുക', step1_sub: 'തുടങ്ങാൻ താഴെ കാണുന്ന കേന്ദ്രത്തിൽ തൊടുക:',
      step2_title: '2. യാത്രാ സുരക്ഷാ പരിശോധന', step3_title: '3. സുരക്ഷിത യാത്രാ പാത',
      selected_zone: 'ലക്ഷ്യസ്ഥാനം', distance: 'ദൂരം', est_transit: 'യാത്രാ സമയം',
      sea_state: 'കടൽ അവസ്ഥ', wind_speed: 'കാറ്റിന്റെ വേഗത', calculate_btn: 'സുരക്ഷിത പാത കണ്ടെത്തുക',
      calculating: 'ആഴവും സുരക്ഷയും പരിശോധിക്കുന്നു...', recommended_safe_fairway: 'ശുപാർശ ചെയ്യുന്ന സുരക്ഷിത പാത',
      direct_hazardous_track: 'നേരെയുള്ള വഴി (അപകടകരം)', safe_badge: 'സുരക്ഷിത പാത', caution_badge: 'അപകടം',
      mins: 'മിനിറ്റ്', km: 'കി.മീ', safety_advisory: 'സുരക്ഷാ നിർദ്ദേശം', tap_to_select: 'ഒരു പ്രദേശം തിരഞ്ഞെടുക്കുക',
      hazard_warning: 'അടിയൊഴുക്കുകളും അതിർത്തികളും ഒഴിവാക്കുന്നു', view_plan: 'പ്ലാൻ', view_route: 'റൂട്ട്'
    },
    profile: {
      title: 'ബോട്ട് & ക്യാപ്റ്റൻ ക്രമീകരണങ്ങൾ', skipper_title: 'ലൈസൻസുള്ള ബോട്ട് ക്യാപ്റ്റൻ', vessel_id: 'ബോട്ട് രജിസ്ട്രേഷൻ നമ്പർ (ID)',
      home_port: 'സ്വന്തം തുറമുഖം', registered_phone: 'രജിസ്റ്റർ ചെയ്ത മൊബൈൽ', preferred_language: 'തിരഞ്ഞെടുത്ത ഭാഷ',
      select_language_sub: 'എല്ലാ സ്ക്രീനുകളിലും ഭാഷ ഉടൻ മാറും',
      emergency_contacts_title: 'ഔദ്യോഗിക സമുദ്ര അടിയന്തര നമ്പറുകൾ', emergency_desc: 'വിളിക്കാൻ നേരിട്ട് സ്പർശിക്കുക',
      icg_title: 'ഇന്ത്യൻ കോസ്റ്റ് ഗാർഡ് (ടോൾ ഫ്രീ)', icg_desc: '24/7 രക്ഷാപ്രവർത്തന കൺട്രോൾ റൂം',
      fisheries_title: 'ദേശീയ ഫിഷറീസ് ഹെൽപ്പ്‌ലൈൻ', fisheries_desc: 'ഫിഷറീസ് വകുപ്പ് സൗജന്യ സേവനം',
      disaster_title: 'തീരദേശ ദുരന്തനിവാരണ വിഭാഗം', disaster_desc: 'സമുദ്ര അടിയന്തര ചുഴലിക്കാറ്റ് സഹായം',
      call_btn: 'വിളിക്കുക', emergency_cellular_note: 'അടിയന്തര നമ്പറുകൾ സാധാരണ മൊബൈൽ നെറ്റ്‌വർക്കിലൂടെ കണക്ട് ചെയ്യും.',
      statutory_notice: 'നിയമാനുസൃത സുരക്ഷാ അറിയിപ്പ്', statutory_sub: 'ഔദ്യോഗിക സമുദ്ര നാവിഗേഷൻ നിർദ്ദേശങ്ങൾ',
      logout: 'ലോഗ് ഔട്ട് ചെയ്യുക'
    },
    advanced: {
      title: 'സെൻസർ ടെലിമെട്രിയും സമുദ്ര മാതൃകകളും', subtitle: '6-ഘടക റിസ്ക് ഫോർമുലയും ഡാറ്റയും',
      wave_period: 'തിരമാല പീക്ക് സമയം', wind_gusts: 'കാറ്റിന്റെ വേഗത', sea_state_code: 'കടൽ കോഡ്',
      risk_score: '6-ഘടക റിസ്ക് സ്കോർ', provenance_title: 'ഡാറ്റാ ഉറവിടങ്ങൾ',
      weather_model: 'ഓപ്പൺ-മെറ്റിയോ ഗ്ലോബൽ മറൈൻ മോഡൽ', chlorophyll_model: 'ബയോ-ഒപ്റ്റിക്കൽ പ്രോക്സി മോഡൽ',
      pfz_model: 'ഇൻകോയിസ് തെർമൽ ബൗണ്ടറി മോഡൽ',
      disclaimer: 'MarineMind AI ഒരു തീരുമാന സഹായ സംവിധാനമാണ്. കോസ്റ്റ് ഗാർഡിന്റെയും കാലാവസ്ഥാ കേന്ദ്രത്തിന്റെയും നിർദ്ദേശങ്ങൾ എപ്പോഴും പാലിക്കുക.'
    },
    bulletin: {
      title: 'കാലാവസ്ഥാ നിരീക്ഷണ കേന്ദ്രം ബുള്ളറ്റിൻ', verified: 'സർക്കാർ അംഗീകൃതം', signal: 'സിഗ്നൽ:',
      all_ports_nil: 'എല്ലാ തുറമുഖങ്ങളിലും മുന്നറിയിപ്പില്ല (സാധാരണ നില)', active_advisories_count: 'സജീവ തീരദേശ മുന്നറിയിപ്പുകൾ'
    },
    auth: {
      portal_title: 'ക്യാപ്റ്റൻ & ബോട്ട് പോർട്ടൽ', network_sub: 'ഇന്ത്യൻ സമുദ്ര സുരക്ഷാ ശൃംഖല', secure_badge: 'സുരക്ഷിത പ്രവേശനം',
      quick_skipper_title: 'വേഗത്തിലുള്ള ലോഗിൻ (1-ടാപ്പ്)', vessel_id_label: 'ബോട്ട് രജിസ്ട്രേഷൻ ഐഡി / മൊബൈൽ',
      vessel_id_placeholder: 'IND-MH-01-MM-8492 അല്ലെങ്കിൽ മൊബൈൽ', password_label: 'മറൈൻ പിൻ / പാസ്‌വേഡ്',
      password_placeholder: 'പാസ്‌വേഡ് നൽകുക', sign_in_btn: 'ലോഗിൻ ചെയ്യുക', register_btn: 'പുതിയ ബോട്ട് രജിസ്റ്റർ ചെയ്യുക',
      sign_in_tab: 'ലോഗിൻ', register_tab: 'രജിസ്ട്രേഷൻ', name_label: 'ക്യാപ്റ്റന്റെ / ഉടമയുടെ പേര്',
      name_placeholder: 'ഉദാ. രമേഷ് പാട്ടീൽ', phone_label: 'മൊബൈൽ നമ്പർ', phone_placeholder: '10 അക്ക മൊബൈൽ നമ്പർ',
      harbor_label: 'തുറമുഖം', authenticating: 'പരിശോധിക്കുന്നു...',
      demo_hint: 'ഡെമോ അക്കൗണ്ട്: IND-MH-01-MM-8492 / marinepassword',
      eval_badge: 'പെട്ടെന്നുള്ള പ്രവേശനം', one_click: '1-ക്ലിക്ക് പ്രവേശനം',
      instant_access_desc: 'മുംബൈ സാസൂൺ ഡോക്ക് ടെസ്റ്റ് പ്രൊഫൈൽ വഴി എല്ലാ ഫീച്ചറുകളും പരീക്ഷിക്കുക.',
      instant_access_btn: 'ഗസ്റ്റ് ക്യാപ്റ്റൻ പ്രവേശനം', or_divider: 'അല്ലെങ്കിൽ പാസ്‌വേഡ് ഉപയോഗിച്ച് ലോഗിൻ ചെയ്യുക',
      mopsw_badge: 'തുറമുഖ, കപ്പൽ മന്ത്രാലയ നിലവാരം',
      welcome_title: 'സുരക്ഷിത കടൽ, കൂടുതൽ മത്സ്യം, അതിർത്തി സുരക്ഷ',
      welcome_subtitle: 'തീരദേശ മത്സ്യത്തൊഴിലാളികൾക്കായി കാലാവസ്ഥാ ശാസ്ത്രവും അതിർത്തി സുരക്ഷയും ചേർന്ന സംവിധാനം.',
      feature_agents_title: 'മൾട്ടി-ഏജന്റ് AI സംവിധാനം',
      feature_agents_desc: 'കാലാവസ്ഥയും കടലും പരിശോധിച്ച് ഉറപ്പുള്ള സുരക്ഷാ നിർദ്ദേശങ്ങൾ നൽകുന്നു.',
      feature_satellite_title: 'ഉപഗ്രഹ PFZ വിവരങ്ങൾ',
      feature_satellite_desc: 'ദിവസേനയുള്ള ഉപഗ്രഹ വിവരങ്ങൾ മത്സ്യങ്ങൾ ലഭിക്കാൻ സാധ്യതയുള്ള ഇടങ്ങൾ കാണിക്കുന്നു.',
      feature_imbl_title: 'അന്താരാഷ്ട്ര സമുദ്ര അതിർത്തി സുരക്ഷ',
      feature_imbl_desc: 'അതിർത്തി കടക്കാതിരിക്കാൻ ബോട്ടിന് ഓട്ടോമാറ്റിക് മുന്നറിയിപ്പ് നൽകുന്നു.',
      footer_left: '© 2026 MarineMind AI — സ്വയംഭരണ സമുദ്ര സുരക്ഷാ കോപൈലറ്റ്',
      footer_right: 'ഭാരത സർക്കാർ കാലാവസ്ഥാ ശാസ്ത്ര മാനദണ്ഡങ്ങൾ',
      err_required: 'ദയവായി എല്ലാ കോളങ്ങളും പൂരിപ്പിക്കുക.',
      err_password_len: 'പാസ്‌വേഡിന് കുറഞ്ഞത് 8 അക്ഷരങ്ങൾ വേണം.'
    },
    offline: {
      offshore_mode: 'ഡീപ്-സീ മോഡ് (ഓഫ്‌ലൈൻ)', cache_mode: 'മുൻകൂർ വിവരങ്ങൾ ലഭ്യമാണ്',
      offline_desc: 'മൊബൈൽ റേഞ്ച് ഇല്ലാത്ത മേഖലയിലാണ് നിങ്ങൾ. സേവ് ചെയ്ത വിവരങ്ങൾ ഉപയോഗിക്കുന്നു.',
      cache_desc: 'തീരദേശ ബുള്ളറ്റിൻ ലഭ്യമാണ്. റേഞ്ച് കിട്ടുമ്പോൾ ലൈവ് ഡാറ്റ അപ്‌ഡേറ്റ് ആകും.',
      local_cache_badge: 'ലോക്കൽ സുരക്ഷിത കാഷെ'
    }
  },

  // ── TELUGU (te) ───────────────────────────────────────────────────────────
  te: {
    nav: { home: 'హోమ్', spots: 'చేపల ప్రాంతాలు', trip: 'సురక్షిత ప్రయాణం', ask: 'సహాయకుడు', profile: 'ప్రొఫైల్' },
    greeting: {
      morning: 'శుభోదయం', afternoon: 'నమస్కారం', evening: 'శుభ సాయంత్రం',
      captain: 'కెప్టెన్', port: 'హార్బర్', change_port: 'హార్బర్ మార్చండి', gps_verified: 'GPS ధృవీకరించబడింది'
    },
    status: {
      title: 'నేటి సముద్ర భద్రతా స్థితి', good_to_go: 'వేటకు వెళ్ళవచ్చు', caution: 'జాగ్రత్త వహించండి',
      use_caution: 'అధిక జాగ్రత్త అవసరం', stay_ashore: 'సముద్రంలోకి వెళ్లవద్దు — తీరంలోనే ఉండండి', checking: 'పరిస్థితులను తనిఖీ చేస్తోంది...',
      desc_low: 'ప్రశాంతమైన సముద్రం మరియు అనుకూలమైన గాలులు. వేటకు వెళ్ళడం సురక్షితం.',
      desc_moderate: 'మితమైన అలలు ఉండే అవకాశం ఉంది. జాగ్రత్తగా ఉంటూ గాలులను గమనించండి.',
      desc_high: 'కల్లోల సముద్రం మరియు తీవ్రమైన గాలులు. చిన్న పడవలు తీరం దగ్గరే ఉండాలి.',
      desc_critical: 'అత్యంత ప్రమాదకరమైన సముద్ర పరిస్థితి. ఈ రోజు వేటకు వెళ్లవద్దు.',
      desc_unknown: 'శాటిలైట్ డేటాతో కనెక్ట్ అవుతోంది...',
      last_updated: 'చివరి అప్‌డేట్', live: 'లైవ్ డేటా', unavailable: 'ఆఫ్‌లైన్',
      data_unavailable_warning: 'లైవ్ వాతావరణం అందుబాటులో లేదు. స్థానిక సూచనలు చూపబడుతున్నాయి.',
      retry: 'మళ్లీ ప్రయత్నించండి', safety_verdict: 'భద్రతా నిర్ణయం',
      official_advisory_match: 'అధికారిక తీరప్రాంత హెచ్చరిక సరిపోలిక'
    },
    conditions: {
      title: 'ప్రస్తుత సముద్ర పరిస్థితులు', waves: 'అలలు', wind: 'గాలి', temp: 'ఉష్ణోగ్రత',
      rain: 'వర్ష సూచన', hazards: 'ప్రమాదాలు', sea_state: 'సముద్ర స్థితి', wave_period: 'అలల సమయం',
      wind_gust: 'గాలి వేగం', calm: 'శాంతం', moderate: 'మితమైన', rough: 'కల్లోల',
      very_rough: 'అత్యంత కల్లోల', light_breeze: 'తేలికపాటి గాలి', moderate_wind: 'మితమైన గాలి',
      strong_wind: 'బలమైన గాలి', gale: 'తుఫాను గాలి', clear: 'స్పష్టమైనది', watch_out: 'జాగ్రత్త',
      update: 'రిఫ్రెష్', meters: 'మీ', kmh: 'కి.మీ/గం', knots: 'నాట్స్', celsius: '°C',
      seconds: 'సెకన్లు', percent: '%', swell: 'అలల ఎత్తు', visibility: 'దృశ్యత'
    },
    actions: {
      find_spots_title: 'చేపల వేట ప్రాంతాలను కనుగొనండి', find_spots_sub: 'శాటిలైట్ గుర్తించిన అనుకూల ప్రాంతాలు',
      plan_trip_title: 'సురక్షిత ప్రయాణాన్ని ప్లాన్ చేయండి', plan_trip_sub: 'సరిహద్దులు మరియు బండరాళ్లను తప్పించే మార్గం',
      quick_assistant_title: 'MarineMind AI ని అడగండి', voice_chat: 'వాయిస్ / చాట్',
      q_can_i_fish: 'నేడు చేపల వేటకు వెళ్లవచ్చా?', q_where_to_fish: 'ప్రస్తుతం ఉత్తమమైన చేపల వేట ప్రాంతం ఎక్కడ ఉంది?',
      q_any_warning: 'తుఫాను లేదా ఎత్తైన అలల హెచ్చరికలు ఉన్నాయా?', see_all: 'అన్నీ చూడండి',
      top_spot_title: 'ఉత్తమ సూచించిన ప్రాంతం'
    },
    spots: {
      title: 'చేపల వేట ప్రాంతాలు (PFZ)', subtitle: 'శాటిలైట్ సముద్ర ఉష్ణోగ్రత ఆధారిత ప్రాంతాలు',
      total_spots: 'ప్రాంతాలు మ్యాప్ చేయబడ్డాయి', filter_all: 'అన్ని ప్రాంతాలు', filter_recommended: 'సూచించినవి మాత్రమే',
      filter_near: 'తీరం దగ్గర (< 15 కి.మీ)', no_spots_found: 'ఈ ప్రాంతంలో ఎటువంటి జోన్లు లేవు.',
      good_fishing: 'మంచి వేట ప్రాంతం', fair_fishing: 'మితమైన అవకాశం', avoid_area: 'జాగ్రత్త / వద్దు',
      km_away: 'కి.మీ దూరంలో', sea_state: 'సముద్ర స్థితి', target_species: 'దొరికే చేపలు', view_map: 'మ్యాప్‌లో చూడండి',
      plan_route: 'మార్గం ప్లాన్ చేయండి', thermal_boundary: 'థర్మల్ ఫ్రంట్', depth: 'లోతు', confidence: 'ఖచ్చితత్వం',
      view_list: 'జాబితా', view_chart: 'మ్యాప్'
    },
    trip: {
      title: 'సురక్షిత ప్రయాణ ప్రణాళిక', subtitle: 'బండరాళ్లు మరియు సరిహద్దులను తప్పించే సురక్షిత మార్గం',
      step1_title: '1. గమ్యస్థానాన్ని ఎంచుకోండి', step1_sub: 'ప్రారంభించడానికి దిగువన ఉన్న చేపల ప్రాంతాన్ని నొక్కండి:',
      step2_title: '2. ప్రయాణ భద్రతా తనిఖీ', step3_title: '3. సురక్షిత నావిగేషన్ మార్గం',
      selected_zone: 'గమ్యం', distance: 'దూరం', est_transit: 'అంచనా సమయం',
      sea_state: 'సముద్ర స్థితి', wind_speed: 'గాలి వేగం', calculate_btn: 'సురక్షిత మార్గాన్ని రూపొందించండి',
      calculating: 'లోతు మరియు భద్రతను తనిఖీ చేస్తోంది...', recommended_safe_fairway: 'సిఫార్సు చేయబడిన సురక్షిత మార్గం',
      direct_hazardous_track: 'నేరుగా వెళ్లే మార్గం (ప్రమాదకరం)', safe_badge: 'సురక్షితం', caution_badge: 'ప్రమాదం',
      mins: 'నిమిషాలు', km: 'కి.మీ', safety_advisory: 'భద్రతా సూచన', tap_to_select: 'ఒక ప్రాంతాన్ని ఎంచుకోండి',
      hazard_warning: 'సముద్రపు అడ్డంకులు మరియు సరిహద్దులను నివారిస్తుంది', view_plan: 'ప్లాన్', view_route: 'రూట్'
    },
    profile: {
      title: 'బోటు & కెప్టెన్ సెట్టింగులు', skipper_title: 'లైసెన్స్ పొందిన మెరైన్ కెప్టెన్', vessel_id: 'బోట్ రిజిస్ట్రేషన్ నంబర్ (ID)',
      home_port: 'హోమ్ హార్బర్', registered_phone: 'నమోదిత మొబైల్', preferred_language: 'ఎంచుకున్న భాష',
      select_language_sub: 'అన్ని స్క్రీన్లలో వెంటనే భాష మారుతుంది',
      emergency_contacts_title: 'అధికారిక సముద్ర అత్యవసర హెల్ప్‌లైన్లు', emergency_desc: 'కాల్ చేయడానికి నేరుగా నొక్కండి',
      icg_title: 'భారత తీర రక్షక దళం (టోల్ ఫ్రీ SAR)', icg_desc: '24/7 సముద్ర శోధన మరియు రక్షణ విభాగం',
      fisheries_title: 'జాతీయ మత్స్య హెల్ప్‌లైన్', fisheries_desc: 'మత్స్యశాఖ ఉచిత సలహా సేవ',
      disaster_title: 'తీరప్రాంత విపత్తు నిర్వహణ విభాగం', disaster_desc: 'సముద్ర అత్యవసర మరియు తుఫాను విభాగం',
      call_btn: 'కాల్ చేయండి', emergency_cellular_note: 'అత్యవసర నంబర్లు సాధారణ మొబైల్ నెట్‌వర్క్ ద్వారా కనెక్ట్ అవుతాయి.',
      statutory_notice: 'చట్టబద్ధమైన సముద్ర భద్రతా నోటీసు', statutory_sub: 'అధికారిక సలహాలు మరియు నావిగేషన్ నియమాలు',
      logout: 'లాగ్ అవుట్ చేయండి'
    },
    advanced: {
      title: 'సెన్సార్ టెలిమెట్రీ & సముద్ర నమూనాలు', subtitle: '6-కారకాల రిస్క్ ఫార్ములా మరియు సమాచారం',
      wave_period: 'అలల గరిష్ట సమయం', wind_gusts: 'గాలి వేగం', sea_state_code: 'సముద్ర కోడ్',
      risk_score: '6-కారకాల రిస్క్ స్కోరు', provenance_title: 'సమాచార మూలాలు',
      weather_model: 'ఓపెన్-మెటియో గ్లోబల్ మెరైన్ మోడల్', chlorophyll_model: 'బయో-ఆప్టికల్ ప్రాక్సీ మోడల్',
      pfz_model: 'ఇన్కోయిస్ థర్మల్ బౌండరీ మోడల్',
      disclaimer: 'MarineMind AI నిర్ణయ సహాయక వ్యవస్థ. ఎల్లప్పుడూ కోస్ట్ గార్డ్ మరియు వాతావరణ శాఖ సూచనలను పాటించండి.'
    },
    bulletin: {
      title: 'వాతావరణ కేంద్రం మెరైన్ బులెటిన్', verified: 'ప్రభుత్వ ధృవీకృతం', signal: 'సిగ్నల్:',
      all_ports_nil: 'అన్ని పోర్టులలో హెచ్చరికలు లేవు (సాధారణం)', active_advisories_count: 'క్రియాశీల తీరప్రాంత హెచ్చరికలు'
    },
    auth: {
      portal_title: 'కెప్టెన్ & బోట్ పోర్టల్', network_sub: 'భారత తీరప్రాంత సముద్ర భద్రతా నెట్‌వర్క్', secure_badge: 'సురక్షిత లాగిన్',
      quick_skipper_title: 'త్వరిత లాగిన్ (1-ట్యాప్ ఎంపిక)', vessel_id_label: 'బోట్ రిజిస్ట్రేషన్ ఐడీ / మొబైల్',
      vessel_id_placeholder: 'IND-MH-01-MM-8492 లేదా మొబైల్', password_label: 'మెరైన్ పిన్ / పాస్‌వర్డ్',
      password_placeholder: 'పాస్‌వర్డ్ నమోదు చేయండి', sign_in_btn: 'లాగిన్ అవ్వండి', register_btn: 'కొత్త బోటును నమోదు చేయండి',
      sign_in_tab: 'లాగిన్', register_tab: 'నమోదు', name_label: 'కెప్టెన్ / యజమాని పేరు',
      name_placeholder: 'ఉదా. రమేష్ పాటిల్', phone_label: 'మొబైల్ ఫోన్ నంబర్', phone_placeholder: '10 అంకెల మొబైల్ నంబర్',
      harbor_label: 'హోమ్ ఫిషింగ్ హార్బర్', authenticating: 'పరిశీలిస్తోంది...',
      demo_hint: 'డెమో ఖాతా: IND-MH-01-MM-8492 / marinepassword',
      eval_badge: 'త్వరిత యాక్సెస్', one_click: '1-క్లిక్ ఎంట్రీ',
      instant_access_desc: 'ముంబై సాసూన్ డాక్ టెస్ట్ ప్రొఫైల్‌తో అన్ని ఫీచర్లను పరీక్షించండి.',
      instant_access_btn: 'గెస్ట్ కెప్టెన్ ఎంట్రీ', or_divider: 'లేదా వివరాలతో లాగిన్ అవ్వండి',
      mopsw_badge: 'నౌకాశ్రయాలు, షిప్పింగ్ మరియు జలమార్గాల మంత్రిత్వ శాఖ ప్రమాణాలు',
      welcome_title: 'సురక్షిత సముద్రం, మంచి వేట, సరిహద్దు రక్షణ',
      welcome_subtitle: 'తీరప్రాంత మత్స్యకారుల కోసం వాతావరణం, ఉపగ్రహ సమాచారం మరియు సరిహద్దు భద్రత కలయిక.',
      feature_agents_title: 'మల్టీ-ఏజెంట్ AI వ్యవస్థ',
      feature_agents_desc: 'వాతావరణం మరియు సముద్ర పరిస్థితులను విశ్లేషించి కచ్చితమైన సలహాలను అందిస్తుంది.',
      feature_satellite_title: 'శాటిలైట్ PFZ & సముద్ర సమాచారం',
      feature_satellite_desc: 'చేపలు ఎక్కువగా లభించే ప్రాంతాలను శాటిలైట్ సమాచారం ద్వారా గుర్తిస్తుంది.',
      feature_imbl_title: 'అంతర్జాతీయ సముద్ర సరిహద్దు రక్షణ (IMBL)',
      feature_imbl_desc: 'పడవలు సరిహద్దులు దాటకుండా ఆటోమేటిక్ హెచ్చరికలను జారీ చేస్తుంది.',
      footer_left: '© 2026 MarineMind AI — స్వయంప్రతిపత్తి సముద్ర భద్రతా కోపైలట్',
      footer_right: 'భారత ప్రభుత్వ వాతావరణ శాస్త్ర ప్రమాణాలు',
      err_required: 'దయచేసి అన్ని అవసరమైన వివరాలను పూరించండి.',
      err_password_len: 'పాస్‌వర్డ్ కనీసం 8 అక్షరాలు ఉండాలి.'
    },
    offline: {
      offshore_mode: 'డీప్-సీ మోడ్ (ఆఫ్‌లైన్)', cache_mode: 'ముందస్తు సమాచారం సిద్ధంగా ఉంది',
      offline_desc: 'మీరు మొబైల్ సిగ్నల్ లేని సముద్ర ప్రాంతంలో ఉన్నారు. భద్రపరచబడిన సమాచారం ఉపయోగించబడుతోంది.',
      cache_desc: 'తీరప్రాంత బులెటిన్ అందుబాటులో ఉంది. సిగ్నల్ రాగానే లైవ్ డేటా అప్‌డేట్ అవుతుంది.',
      local_cache_badge: 'స్థానిక సురక్షిత డేటా'
    }
  },

  // ── KANNADA (kn) ──────────────────────────────────────────────────────────
  kn: {
    nav: { home: 'ಮುಖಪುಟ', spots: 'ಮೀನುಗಾರಿಕೆ ತಾಣಗಳು', trip: 'ಸುರಕ್ಷಿತ ಪಯಣ', ask: 'ಸಹಾಯಕ', profile: 'ಪ್ರೊಫೈಲ್' },
    greeting: {
      morning: 'ಶುಭೋದಯ', afternoon: 'ನಮಸ್ಕಾರ', evening: 'ಶುಭ ಸಂಜೆ',
      captain: 'ಕ್ಯಾಪ್ಟನ್', port: 'ಬಂದರು', change_port: 'ಬಂದರು ಬದಲಾಯಿಸಿ', gps_verified: 'GPS ದೃಢೀಕರಿಸಲಾಗಿದೆ'
    },
    status: {
      title: 'ಇಂದಿನ ಸಮುದ್ರ ಸುರಕ್ಷತಾ ಸ್ಥಿತಿ', good_to_go: 'ಸಮುದ್ರಕ್ಕೆ ಇಳಿಯಬಹುದು', caution: 'ಎಚ್ಚರಿಕೆ ವಹಿಸಿ',
      use_caution: 'ಹೆಚ್ಚಿನ ಜಾಗರೂಕತೆ ಅಗತ್ಯ', stay_ashore: 'ಸಮುದ್ರಕ್ಕೆ ಹೋಗಬೇಡಿ — ದಡದಲ್ಲೇ ಇರಿ', checking: 'ಪರಿಸ್ಥಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...',
      desc_low: 'ಶಾಂತ ಸಮುದ್ರ ಮತ್ತು ಅನುಕೂಲಕರ ಗಾಳಿ. ಮೀನುಗಾರಿಕೆಗೆ ಸಂಪೂರ್ಣ ಸುರಕ್ಷಿತ.',
      desc_moderate: 'ಮಧ್ಯಮ ಅಲೆಗಳ ಸಾಧ್ಯತೆ. ಎಚ್ಚರಿಕೆಯಿಂದಿರಿ ಮತ್ತು ಗಾಳಿಯ ದಿಕ್ಕನ್ನು ಗಮನಿಸಿ.',
      desc_high: 'ಪ್ರಕ್ಷುಬ್ಧ ಸಮುದ್ರ ಮತ್ತು ಬಲವಾದ ಗಾಳಿ. ಸಣ್ಣ ದೋಣಿಗಳು ದಡದ ಸಮೀಪದಲ್ಲೇ ಇರಬೇಕು.',
      desc_critical: 'ಅತ್ಯಂತ ಅಪಾಯಕಾರಿ ಸಮುದ್ರ ಪರಿಸ್ಥಿತಿ. ಇಂದು ಯಾವುದೇ ಕಾರಣಕ್ಕೂ ಸಮುದ್ರಕ್ಕೆ ಇಳಿಯಬೇಡಿ.',
      desc_unknown: 'ಉಪಗ್ರಹ ಡೇಟಾದೊಂದಿಗೆ ಸಂಪರ್ಕಿಸಲಾಗುತ್ತಿದೆ...',
      last_updated: 'ಕೊನೆಯ ನವೀಕರಣ', live: 'ಲೈವ್ ಡೇಟಾ', unavailable: 'ಆಫ್‌ಲೈನ್',
      data_unavailable_warning: 'ಲೈವ್ ಹವಾಮಾನ ಲಭ್ಯವಿಲ್ಲ. ಸ್ಥಳೀಯ ಎಚ್ಚರಿಕೆಗಳನ್ನು ತೋರಿಸಲಾಗುತ್ತಿದೆ.',
      retry: 'ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ', safety_verdict: 'ಸುರಕ್ಷತಾ ತೀರ್ಪು',
      official_advisory_match: 'ಅಧಿಕೃತ ಕರಾವಳಿ ಎಚ್ಚರಿಕೆ ಹೊಂದಾಣಿಕೆ'
    },
    conditions: {
      title: 'ಪ್ರಸ್ತುತ ಸಮುದ್ರ ಸ್ಥಿತಿ', waves: 'ಅಲೆಗಳು', wind: 'ಗಾಳಿ', temp: 'ತಾಪಮಾನ',
      rain: 'ಮಳೆಯ ಸಾಧ್ಯತೆ', hazards: 'ಅಪಾಯಗಳು', sea_state: 'ಸಮುದ್ರ ಸ್ಥಿತಿ', wave_period: 'ಅಲೆಯ ಅವಧಿ',
      wind_gust: 'ಗಾಳಿಯ ವೇಗ', calm: 'ಶಾಂತ', moderate: 'ಮಧ್ಯಮ', rough: 'ಪ್ರಕ್ಷುಬ್ಧ',
      very_rough: 'ಅತಿ ಪ್ರಕ್ಷುಬ್ಧ', light_breeze: 'ತಂಗಾಳಿ', moderate_wind: 'ಮಧ್ಯಮ ಗಾಳಿ',
      strong_wind: 'ಬಲವಾದ ಗಾಳಿ', gale: 'ಬಿರುಗಾಳಿ', clear: 'ಸ್ವಚ್ಛ', watch_out: 'ಎಚ್ಚರ',
      update: 'ನವೀಕರಿಸಿ', meters: 'ಮೀ', kmh: 'ಕಿ.ಮೀ/ಗಂ', knots: 'ನಾಟ್ಸ್', celsius: '°C',
      seconds: 'ಸೆಕೆಂಡುಗಳು', percent: '%', swell: 'ಅಲೆಯ ಎತ್ತರ', visibility: 'ಗೋಚರತೆ'
    },
    actions: {
      find_spots_title: 'ಮೀನುಗಾರಿಕಾ ತಾಣಗಳನ್ನು ಹುಡುಕಿ', find_spots_sub: 'ಉಪಗ್ರಹ ಆಧಾರಿತ ಮೀನುಗಾರಿಕಾ ಪ್ರದೇಶಗಳು',
      plan_trip_title: 'ಸುರಕ್ಷಿತ ಪಯಣ ರೂಪಿಸಿ', plan_trip_sub: 'ಬಂಡೆಗಳು ಮತ್ತು ಗಡಿಗಳನ್ನು ತಪ್ಪಿಸುವ ಮಾರ್ಗ',
      quick_assistant_title: 'MarineMind AI ಅನ್ನು ಕೇಳಿ', voice_chat: 'ಧ್ವನಿ / ಚಾಟ್',
      q_can_i_fish: 'ಇಂದು ಮೀನುಗಾರಿಕೆಗೆ ಹೋಗಬಹುದೇ?', q_where_to_fish: 'ಪ್ರಸ್ತುತ ಉತ್ತಮ ಮೀನುಗಾರಿಕಾ ಪ್ರದೇಶ ಎಲ್ಲಿದೆ?',
      q_any_warning: 'ಬಿರುಗಾಳಿ ಅಥವಾ ಎತ್ತರದ ಅಲೆಗಳ ಎಚ್ಚರಿಕೆ ಇದೆಯೇ?', see_all: 'ಎಲ್ಲವನ್ನೂ ನೋಡಿ',
      top_spot_title: 'ಉತ್ತಮ ಶಿಫಾರಸು ಮಾಡಿದ ತಾಣ'
    },
    spots: {
      title: 'ಮೀನುಗಾರಿಕಾ ತಾಣಗಳು (PFZ)', subtitle: 'ಉಪಗ್ರಹ ಸಮುದ್ರ ಉಷ್ಣತೆಯ ಆಧಾರಿತ ವಲಯಗಳು',
      total_spots: 'ತಾಣಗಳು ಲಭ್ಯವಿದೆ', filter_all: 'ಎಲ್ಲಾ ತಾಣಗಳು', filter_recommended: 'ಶಿಫಾರಸು ಮಾಡಿದವು ಮಾತ್ರ',
      filter_near: 'ಕರಾವಳಿಯ ಹತ್ತಿರ (< 15 ಕಿ.ಮೀ)', no_spots_found: 'ಯಾವುದೇ ತಾಣಗಳು ಕಂಡುಬಂದಿಲ್ಲ.',
      good_fishing: 'ಉತ್ತಮ ಮೀನುಗಾರಿಕಾ ತಾಣ', fair_fishing: 'ಮಧ್ಯಮ ಸಾಧ್ಯತೆ', avoid_area: 'ತಪ್ಪಿಸಿ / ಎಚ್ಚರ',
      km_away: 'ಕಿ.ಮೀ ದೂರ', sea_state: 'ಸಮುದ್ರ ಸ್ಥಿತಿ', target_species: 'ದೊರೆಯುವ ಮೀನುಗಳು', view_map: 'ನಕ್ಷೆಯಲ್ಲಿ ನೋಡಿ',
      plan_route: 'ಮಾರ್ಗ ಯೋಜಿಸಿ', thermal_boundary: 'ಥರ್ಮಲ್ ಫ್ರಂಟ್', depth: 'ಆಳ', confidence: 'ನಿಖರತೆ',
      view_list: 'ಪಟ್ಟಿ', view_chart: 'ನಕ್ಷೆ'
    },
    trip: {
      title: 'ಸುರಕ್ಷಿತ ಸಮುದ್ರ ಪಯಣ ಯೋಜನೆ', subtitle: 'ಬಂಡೆಗಳು ಮತ್ತು ಗಡಿಯನ್ನು ತಪ್ಪಿಸುವ ಹಂತ ಹಂತದ ಮಾರ್ಗದರ್ಶನ',
      step1_title: '1. ಗಮ್ಯಸ್ಥಾನವನ್ನು ಆಯ್ಕೆಮಾಡಿ', step1_sub: 'ಪ್ರಾರಂಭಿಸಲು ಕೆಳಗಿನ ತಾಣವನ್ನು ಸ್ಪರ್ಶಿಸಿ:',
      step2_title: '2. ಪ್ರಯಾಣ ಸುರಕ್ಷತಾ ತಪಾಸಣೆ', step3_title: '3. ಸುರಕ್ಷಿತ ಸಂಚಾರ ಮಾರ್ಗ',
      selected_zone: 'ಗಮ್ಯಸ್ಥಾನ', distance: 'ದೂರ', est_transit: 'ಅಂದಾಜು ಸಮಯ',
      sea_state: 'ಸಮುದ್ರ ಸ್ಥಿತಿ', wind_speed: 'ಗಾಳಿಯ ವೇಗ', calculate_btn: 'ಸುರಕ್ಷಿತ ಮಾರ್ಗವನ್ನು ಲೆಕ್ಕಹಾಕಿ',
      calculating: 'ಆಳ ಮತ್ತು ಸುರಕ್ಷತೆಯನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...', recommended_safe_fairway: 'ಶಿಫಾರಸು ಮಾಡಲಾದ ಸುರಕ್ಷಿತ ಮಾರ್ಗ',
      direct_hazardous_track: 'ನೇರ ಮಾರ್ಗ (ಅಪಾಯಕಾರಿ)', safe_badge: 'ಸುರಕ್ಷಿತ ಮಾರ್ಗ', caution_badge: 'ಅಪಾಯ',
      mins: 'ನಿಮಿಷಗಳು', km: 'ಕಿ.ಮೀ', safety_advisory: 'ಸುರಕ್ಷತಾ ಸಲಹೆ', tap_to_select: 'ಒಂದು ತಾಣವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
      hazard_warning: 'ನೀರಿನೊಳಗಿನ ಅಡೆತಡೆಗಳು ಮತ್ತು ಗಡಿಗಳನ್ನು ತಪ್ಪಿಸುತ್ತದೆ', view_plan: 'ಯೋಜನೆ', view_route: 'ಮಾರ್ಗ'
    },
    profile: {
      title: 'ದೋಣಿ & ನಾವಿಕನ ಸೆಟ್ಟಿಂಗ್‌ಗಳು', skipper_title: 'ಪರವಾನಗಿ ಪಡೆದ ಸಾಗರ ನಾವಿಕ', vessel_id: 'ದೋಣಿ ನೋಂದಣಿ ಸಂಖ್ಯೆ (ID)',
      home_port: 'ಮೂಲ ಬಂದರು', registered_phone: 'ನೋಂದಾಯಿತ ಮೊಬೈಲ್', preferred_language: 'ಆಯ್ಕೆಮಾಡಿದ ಭಾಷೆ',
      select_language_sub: 'ಎಲ್ಲಾ ಪರದೆಗಳಲ್ಲಿ ತಕ್ಷಣ ಭಾಷೆ ಬದಲಾಗುತ್ತದೆ',
      emergency_contacts_title: 'ಅಧಿಕೃತ ಸಮುದ್ರ ತುರ್ತು ಸಹಾಯವಾಣಿಗಳು', emergency_desc: 'ಕರೆ ಮಾಡಲು ನೇರವಾಗಿ ಸ್ಪರ್ಶಿಸಿ',
      icg_title: 'ಭಾರತೀಯ ಕರಾವಳಿ ಕಾವಲು ಪಡೆ (ಟೋಲ್ ಫ್ರೀ SAR)', icg_desc: '24/7 ಸಾಗರ ಶೋಧ ಮತ್ತು ರಕ್ಷಣಾ ನಿಯಂತ್ರಣ ಕೊಠಡಿ',
      fisheries_title: 'ರಾಷ್ಟ್ರೀಯ ಮೀನುಗಾರಿಕಾ ಸಹಾಯವಾಣಿ', fisheries_desc: 'ಮೀನುಗಾರಿಕಾ ಇಲಾಖೆಯ ಉಚಿತ ಸಲಹಾ ಸೇವೆ',
      disaster_title: 'ರಾಜ್ಯ ಕರಾವಳಿ ವಿಪತ್ತು ನಿಯಂತ್ರಣ ಕೊಠಡಿ', disaster_desc: 'ಕರಾವಳಿ ತುರ್ತು ಮತ್ತು ಚಂಡಮಾರುತ ಸಹಾಯ',
      call_btn: 'ಕರೆ ಮಾಡಿ', emergency_cellular_note: 'ತುರ್ತು ಸಂಖ್ಯೆಗಳು ಸಾಮಾನ್ಯ ಮೊಬೈಲ್ ನೆಟ್‌ವರ್ಕ್ ಮೂಲಕ ಸಂಪರ್ಕಗೊಳ್ಳುತ್ತವೆ.',
      statutory_notice: 'ಶಾಸನಬದ್ಧ ಸಮುದ್ರ ಸುರಕ್ಷತಾ ಸೂಚನೆ', statutory_sub: 'ಅಧಿಕೃತ ಮಾರ್ಗಸೂಚಿಗಳು ಮತ್ತು ಸಂಚಾರ ನಿಯಮಗಳು',
      logout: 'ಲಾಗ್ ಔಟ್ ಮಾಡಿ'
    },
    advanced: {
      title: 'ಸಂವೇದಕ ಟೆಲಿಮೆಟ್ರಿ & ಸಾಗರ ಮಾದರಿಗಳು', subtitle: '6-ಅಂಶಗಳ ಅಪಾಯ ಸೂತ್ರ ಮತ್ತು ಡೇಟಾ',
      wave_period: 'ಅಲೆಗಳ ಗರಿಷ್ಠ ಅವಧಿ', wind_gusts: 'ಗಾಳಿಯ ವೇಗ', sea_state_code: 'ಸಮುದ್ರ ಕೋಡ್',
      risk_score: '6-ಅಂಶಗಳ ರಿಸ್ಕ್ ಸ್ಕೋರ್', provenance_title: 'ಡೇಟಾ ಮೂಲಗಳು',
      weather_model: 'ಓಪನ್-ಮೆಟಿಯೋ ಜಾಗತಿಕ ಹವಾಮಾನ ಮಾದರಿ', chlorophyll_model: 'ಬಯೋ-ಆಪ್ಟಿಕಲ್ ಪ್ರಾಕ್ಸಿ ಮಾದರಿ',
      pfz_model: 'ಇನ್ಕೋಯಿಸ್ ಥರ್ಮಲ್ ಬೌಂಡರಿ ಮಾದರಿ',
      disclaimer: 'MarineMind AI ನಿರ್ಧಾರ ಬೆಂಬಲ ವ್ಯವಸ್ಥೆಯಾಗಿದೆ. ಯಾವಾಗಲೂ ಕೋಸ್ಟ್ ಗಾರ್ಡ್ ಮತ್ತು ಹವಾಮಾನ ಇಲಾಖೆಯ ಸೂಚನೆಗಳನ್ನು ಪಾಲಿಸಿ.'
    },
    bulletin: {
      title: 'ಹವಾಮಾನ ಇಲಾಖೆ ಸಮುದ್ರ ಬುಲೆಟಿನ್', verified: 'ಸರ್ಕಾರ ದೃಢೀಕರಿಸಿದೆ', signal: 'ಸಿಗ್ನಲ್:',
      all_ports_nil: 'ಎಲ್ಲಾ ಬಂದರುಗಳಲ್ಲಿ ಎಚ್ಚರಿಕೆ ಇಲ್ಲ (ಸಾಮಾನ್ಯ)', active_advisories_count: 'ಸಕ್ರಿಯ ಕರಾವಳಿ ಎಚ್ಚರಿಕೆಗಳು'
    },
    auth: {
      portal_title: 'ನಾವಿಕ ಮತ್ತು ದೋಣಿ ಪೋರ್ಟಲ್', network_sub: 'ಭಾರತೀಯ ಕರಾವಳಿ ಸಮುದ್ರ ಸುರಕ್ಷತಾ ಜಾಲ', secure_badge: 'ಸುರಕ್ಷಿತ ಪ್ರವೇಶ',
      quick_skipper_title: 'ತ್ವರಿತ ಲಾಗಿನ್ (1-ಟ್ಯಾಪ್ ಆಯ್ಕೆ)', vessel_id_label: 'ದೋಣಿ ನೋಂದಣಿ ಸಂಖ್ಯೆ / ಮೊಬೈಲ್',
      vessel_id_placeholder: 'IND-MH-01-MM-8492 ಅಥವಾ ಮೊಬೈಲ್', password_label: 'ಸಾಗರ ಪಿನ್ / ಪಾಸ್‌ವರ್ಡ್',
      password_placeholder: 'ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ', sign_in_btn: 'ಟರ್ಮಿನಲ್‌ಗೆ ಲಾಗಿನ್ ಮಾಡಿ', register_btn: 'ಹೊಸ ದೋಣಿ ನೋಂದಾಯಿಸಿ',
      sign_in_tab: 'ಲಾಗಿನ್', register_tab: 'ನೋಂದಣಿ', name_label: 'ನಾವಿಕ / ಮಾಲೀಕರ ಹೆಸರು',
      name_placeholder: 'ಉದಾ. ರಮೇಶ್ ಪಾಟೀಲ್', phone_label: 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ', phone_placeholder: '10 ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ',
      harbor_label: 'ಮೂಲ ಮೀನುಗಾರಿಕಾ ಬಂದರು', authenticating: 'ದೃಢೀಕರಿಸಲಾಗುತ್ತಿದೆ...',
      demo_hint: 'ಡೆಮೊ ಖಾತೆ: IND-MH-01-MM-8492 / marinepassword',
      eval_badge: 'ತ್ವರಿತ ಪ್ರವೇಶ', one_click: '1-ಕ್ಲಿಕ್ ಪ್ರವೇಶ',
      instant_access_desc: 'ಮುಂಬೈ ಸಾಸೂನ್ ಡಾಕ್ ಪರೀಕ್ಷಾ ಪ್ರೊಫೈಲ್‌ನೊಂದಿಗೆ ಎಲ್ಲಾ ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ.',
      instant_access_btn: 'ಅತಿಥಿ ನಾವಿಕ ಪ್ರವೇಶ', or_divider: 'ಅಥವಾ ವಿವರಗಳೊಂದಿಗೆ ಲಾಗಿನ್ ಮಾಡಿ',
      mopsw_badge: 'ಬಂದರುಗಳು, ಹಡಗು ಸಾರಿಗೆ ಸಚಿವಾಲಯದ ಮಾನದಂಡಗಳು',
      welcome_title: 'ಸುರಕ್ಷಿತ ಸಮುದ್ರ, ಉತ್ತಮ ಬೇಟೆ, ಶೂನ್ಯ ಗಡಿ ಅಪಾಯ',
      welcome_subtitle: 'ಕರಾವಳಿ ಮೀನುಗಾರರಿಗಾಗಿ ಹವಾಮಾನ ವಿಜ್ಞಾನ ಮತ್ತು ಗಡಿ ಸುರಕ್ಷತೆಯ ತಂತ್ರಜ್ಞಾನ.',
      feature_agents_title: 'ಮಲ್ಟಿ-ಏಜೆಂಟ್ AI ವ್ಯವಸ್ಥೆ',
      feature_agents_desc: 'ಹವಾಮಾನ ಮತ್ತು ಸಮುದ್ರ ಪರಿಸ್ಥಿತಿಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಿ ನಿಖರವಾದ ಸುರಕ್ಷತಾ ಸಲಹೆಗಳನ್ನು ನೀಡುತ್ತದೆ.',
      feature_satellite_title: 'ಉಪಗ್ರಹ PFZ & ಸಾಗರ ಮಾಹಿತಿ',
      feature_satellite_desc: 'ಮೀನುಗಳು ಹೇರಳವಾಗಿ ಸಿಗುವ ತಾಣಗಳನ್ನು ಉಪಗ್ರಹ ಮಾಹಿತಿಯ ಮೂಲಕ ಗುರುತಿಸುತ್ತದೆ.',
      feature_imbl_title: 'ಅಂತಾರಾಷ್ಟ್ರೀಯ ಸಾಗರ ಗಡಿ ರಕ್ಷಣೆ (IMBL)',
      feature_imbl_desc: 'ದೋಣಿಗಳು ಗಡಿ ದಾಟದಂತೆ ಸ್ವಯಂಚಾಲಿತ ಎಚ್ಚರಿಕೆಗಳನ್ನು ನೀಡುತ್ತದೆ.',
      footer_left: '© 2026 MarineMind AI — ಸ್ವಾಯತ್ತ ಸಾಗರ ಸುರಕ್ಷತಾ ಸಹಾಯಕ',
      footer_right: 'ಭಾರತ ಸರ್ಕಾರದ ಹವಾಮಾನ ಮತ್ತು ಹೈಡ್ರೋಗ್ರಾಫಿಕ್ ಮಾನದಂಡಗಳು',
      err_required: 'ದಯವಿಟ್ಟು ಎಲ್ಲಾ ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ.',
      err_password_len: 'ಪಾಸ್‌ವರ್ಡ್ ಕನಿಷ್ಠ 8 ಅಕ್ಷರಗಳಿರಬೇಕು.'
    },
    offline: {
      offshore_mode: 'ಡೀಪ್-ಸೀ ಮೋಡ್ (ಆಫ್‌ಲೈನ್)', cache_mode: 'ಪ್ರಯಾಣ ಪೂರ್ವ ಡೇಟಾ ಲಭ್ಯವಿದೆ',
      offline_desc: 'ನೀವು ಮೊಬೈಲ್ ನೆಟ್‌ವರ್ಕ್ ಇಲ್ಲದ ಸಮುದ್ರ ಪ್ರದೇಶದಲ್ಲಿದ್ದೀರಿ. ಉಳಿಸಲಾದ ಹವಾಮಾನ ಮಾಹಿತಿಯನ್ನು ಬಳಸಲಾಗುತ್ತಿದೆ.',
      cache_desc: 'ಕರಾವಳಿ ಬುಲೆಟಿನ್ ಲಭ್ಯವಿದೆ. ನೆಟ್‌ವರ್ಕ್ ಸಿಕ್ಕಿದ ತಕ್ಷಣ ಲೈವ್ ಡೇಟಾ ಅಪ್‌ಡೇಟ್ ಆಗುತ್ತದೆ.',
      local_cache_badge: 'ಸ್ಥಳೀಯ ಸುರಕ್ಷಿತ ಕ್ಯಾಶ್'
    }
  },

  // ── BENGALI (bn) ──────────────────────────────────────────────────────────
  bn: {
    nav: { home: 'হোম', spots: 'মৎস্য ক্ষেত্র', trip: 'নিরাপদ যাত্রা', ask: 'সহায়ক', profile: 'প্রোফাইল' },
    greeting: {
      morning: 'সুপ্রভাত', afternoon: 'নমস্কার', evening: 'শুভ সন্ধ্যা',
      captain: 'ক্যাপ্টেন', port: 'নিজ বন্দর', change_port: 'বন্দর পরিবর্তন', gps_verified: 'GPS যাচাইকৃত'
    },
    status: {
      title: 'আজকের সমুদ্র নিরাপত্তা পরিস্থিতি', good_to_go: 'সমুদ্রে যাওয়া নিরাপদ', caution: 'সতর্কতা অবলম্বন করুন',
      use_caution: 'বিশেষ সতর্কতা আবশ্যক', stay_ashore: 'সমুদ্রে যাবেন না — উপকূলে থাকুন', checking: 'পরিস্থিতি যাচাই করা হচ্ছে...',
      desc_low: 'শান্ত সমুদ্র এবং অনুকূল বাতাস। মাছ ধরার জন্য সম্পূর্ণ নিরাপদ।',
      desc_moderate: 'মাঝারি ঢেউয়ের সম্ভাবনা। সতর্ক থাকুন এবং বাতাসের গতির দিকে খেয়াল রাখুন।',
      desc_high: 'উত্তাল সমুদ্র ও দমকা বাতাস। ছোট ট্রলারগুলিকে উপকূলের কাছাকাছি থাকতে হবে।',
      desc_critical: 'অত্যন্ত বিপজ্জনক পরিস্থিতি। আজ কোনো অবস্থাতেই সমুদ্রে যাবেন না।',
      desc_unknown: 'উপগ্রহ তথ্যের সাথে সংযোগ স্থাপন করা হচ্ছে...',
      last_updated: 'সর্বশেষ আপডেট', live: 'সরাসরি তথ্য', unavailable: 'অফলাইন / অনুপলব্ধ',
      data_unavailable_warning: 'লাইভ পরিষেবা অনুপলব্ধ। স্থানীয় নিরাপদ পূর্বাভাস দেখানো হচ্ছে।',
      retry: 'পুনরায় চেষ্টা', safety_verdict: 'নিরাপত্তা রায়',
      official_advisory_match: 'সরকারি উপকূলীয় সতর্কতা মিল'
    },
    conditions: {
      title: 'বর্তমান সামুদ্রিক পরিস্থিতি', waves: 'ঢেউ', wind: 'বাতাস', temp: 'তাপমাত্রা',
      rain: 'বৃষ্টির সম্ভাবনা', hazards: 'বিপদসংকেত', sea_state: 'সমুদ্রের অবস্থা', wave_period: 'ঢেউয়ের ব্যবধান',
      wind_gust: 'দমকা বাতাস', calm: 'শান্ত', moderate: 'মাঝারি', rough: 'উত্তাল',
      very_rough: 'অতি উত্তাল', light_breeze: 'মৃদু বাতাস', moderate_wind: 'মাঝারি বাতাস',
      strong_wind: 'প্রবল বাতাস', gale: 'ঝড়ো বাতাস', clear: 'পরিষ্কার', watch_out: 'সাবধান',
      update: 'রিফ্রেশ', meters: 'মি.', kmh: 'কিমি/ঘণ্টা', knots: 'নটস', celsius: '°C',
      seconds: 'সেকেন্ড', percent: '%', swell: 'ঢেউয়ের উচ্চতা', visibility: 'দৃশ্যমানতা'
    },
    actions: {
      find_spots_title: 'মাছ ধরার স্থান খুঁজুন', find_spots_sub: 'উপগ্রহ চিহ্নিত সম্ভাব্য মাছের ক্ষেত্র',
      plan_trip_title: 'নিরাপদ জলপথ পরিকল্পনা', plan_trip_sub: 'চর ও আন্তর্জাতিক সীমান্ত এড়ানোর পথ',
      quick_assistant_title: 'MarineMind AI কে জিজ্ঞাসা করুন', voice_chat: 'ভয়েস / চ্যাট',
      q_can_i_fish: 'আজ কি মাছ ধরতে যাওয়া নিরাপদ?', q_where_to_fish: 'এই মুহূর্তে সেরা মাছের ক্ষেত্র কোথায়?',
      q_any_warning: 'কোনো ঝড় বা জলোচ্ছ্বাসের সতর্কতা আছে কি?', see_all: 'সব দেখুন',
      top_spot_title: 'সর্বোত্তম প্রস্তাবিত স্থান'
    },
    spots: {
      title: 'সম্ভাব্য মৎস্য ক্ষেত্র (PFZ)', subtitle: 'উপগ্রহ সমুদ্রতলের তাপমাত্রা ভিত্তিক ক্ষেত্র',
      total_spots: 'টি স্থান আজ চিহ্নিত', filter_all: 'সকল স্থান', filter_recommended: 'কেবল প্রস্তাবিত',
      filter_near: 'উপকূলের নিকটে (< ১৫ কিমি)', no_spots_found: 'এই অঞ্চলে কোনো ক্ষেত্র চিহ্নিত নেই।',
      good_fishing: 'সেরা মাছ ধরার স্থান', fair_fishing: 'মাঝারি সম্ভাবনা', avoid_area: 'সতর্কতা / এড়িয়ে চলুন',
      km_away: 'কিমি দূরে', sea_state: 'সমুদ্রের অবস্থা', target_species: 'সম্ভাব্য মাছ', view_map: 'মানচিত্রে দেখুন',
      plan_route: 'নিরাপদ রুট তৈরি করুন', thermal_boundary: 'থার্মাল ফ্রন্ট', depth: 'গভীরতা', confidence: 'নির্ভুলতা',
      view_list: 'তালিকা', view_chart: 'মানচিত্র'
    },
    trip: {
      title: 'নিরাপদ সমুদ্রযাত্রা পরিকল্পনা', subtitle: 'জলমগ্ন বাধা ও সীমান্ত এড়িয়ে ধাপে ধাপে নির্দেশনা',
      step1_title: '১. গন্তব্য নির্বাচন করুন', step1_sub: 'শুরু করতে নিচে যেকোনো মৎস্য ক্ষেত্রে ট্যাপ করুন:',
      step2_title: '২. যাত্রা নিরাপত্তা ও আবহাওয়া যাচাই', step3_title: '৩. নিরাপদ নৌপথ নির্দেশনা',
      selected_zone: 'গন্তব্য', distance: 'দূরত্ব', est_transit: 'আনুমানিক সময়',
      sea_state: 'সমুদ্রের অবস্থা', wind_speed: 'বাতাসের গতি', calculate_btn: 'নিরাপদ রুট তৈরি করুন',
      calculating: 'গভীরতা ও নিরাপত্তা যাচাই করা হচ্ছে...', recommended_safe_fairway: 'প্রস্তাবিত নিরাপদ জলপথ',
      direct_hazardous_track: 'সরাসরি রুট (ঝুঁকিপূর্ণ)', safe_badge: 'নিরাপদ পথ', caution_badge: 'ঝুঁকিপূর্ণ',
      mins: 'মিনিট', km: 'কিমি', safety_advisory: 'নিরাপত্তা পরামর্শ', tap_to_select: 'একটি ক্ষেত্র নির্বাচন করুন',
      hazard_warning: 'জলমগ্ন বাধা ও আন্তর্জাতিক সীমান্ত এড়িয়ে চলে', view_plan: 'পরিকল্পনা', view_route: 'রুট'
    },
    profile: {
      title: 'নৌকা ও নাবিক সেটিংস', skipper_title: 'লাইসেন্সধারী সামুদ্রিক নাবিক', vessel_id: 'নৌকা নিবন্ধন নম্বর (ID)',
      home_port: 'নিজ মৎস্য বন্দর', registered_phone: 'নিবন্ধিত মোবাইল নম্বর', preferred_language: 'পছন্দের ভাষা',
      select_language_sub: 'সব পাতায় তাৎক্ষণিকভাবে ভাষা পরিবর্তিত হবে',
      emergency_contacts_title: 'সরকারি সামুদ্রিক জরুরি নম্বর', emergency_desc: 'কল করতে সরাসরি স্পর্শ করুন',
      icg_title: 'ভারতীয় উপকূলরক্ষী বাহিনী (টোল ফ্রি SAR)', icg_desc: '২৪/৭ উদ্ধার ও অনুসন্ধান নিয়ন্ত্রণ কেন্দ্র',
      fisheries_title: 'জাতীয় মৎস্য হেল্পলাইন', fisheries_desc: 'মৎস্য দপ্তরের বিনামূল্যে পরামর্শ সেবা',
      disaster_title: 'রাজ্য উপকূলীয় বিপর্যয় নিয়ন্ত্রণ কক্ষ', disaster_desc: 'সামুদ্রিক জরুরি ও ঘূর্ণিঝড় সহায়তা সেল',
      call_btn: 'কল করুন', emergency_cellular_note: 'জরুরি নম্বরগুলি মোবাইল নেটওয়ার্কের মাধ্যমে সংযুক্ত হয়।',
      statutory_notice: 'বিধিবদ্ধ সামুদ্রিক নিরাপত্তা নোটিশ', statutory_sub: 'সরকারি নির্দেশিকা ও নৌচালনা বিধি',
      logout: 'লগ আউট করুন'
    },
    advanced: {
      title: 'সেন্সর টেলিমেট্রি ও সমুদ্রের মডেল', subtitle: '৬-ফ্যাক্টর ঝুঁকি সূত্র এবং পরিবেশগত উৎস',
      wave_period: 'ঢেউয়ের সর্বোচ্চ সময়', wind_gusts: 'দমকা বাতাসের গতি', sea_state_code: 'সমুদ্র কোড',
      risk_score: '৬-ফ্যাক্টর ঝুঁকি সূচক', provenance_title: 'তথ্যের উৎস ও নির্ভরযোগ্যতা',
      weather_model: 'ওপেন-মেটিও গ্লোবাল মেরিন মডেল', chlorophyll_model: 'বায়ো-অপটিক্যাল প্রক্সি মডেল',
      pfz_model: 'ইনকোইস থার্মাল বাউন্ডারি মডেল',
      disclaimer: 'MarineMind AI একটি সিদ্ধান্ত গ্রহণ সহায়ক ব্যবস্থা। সর্বদা কোস্ট গার্ড ও আবহাওয়া দপ্তরের বার্তা মেনে চলুন।'
    },
    bulletin: {
      title: 'আবহাওয়া দপ্তর সামুদ্রিক বুলেটিন', verified: 'সরকারি যাচাইকৃত', signal: 'সংকেত:',
      all_ports_nil: 'সকল বন্দরে কোনো সতর্কতা সংকেত নেই (স্বাভাবিক)', active_advisories_count: 'সক্রিয় উপকূলীয় সতর্কতা'
    },
    auth: {
      portal_title: 'নাবিক ও নৌকা পোর্টাল', network_sub: 'ভারতীয় উপকূলীয় সামুদ্রিক নিরাপত্তা নেটওয়ার্ক', secure_badge: 'নিরাপদ প্রবেশ',
      quick_skipper_title: 'দ্রুত নাবিক লগইন (১-ট্যাপ)', vessel_id_label: 'নৌকা নিবন্ধন নম্বর / মোবাইল',
      vessel_id_placeholder: 'IND-MH-01-MM-8492 বা মোবাইল নম্বর', password_label: 'সামুদ্রিক পিন / পাসওয়ার্ড',
      password_placeholder: 'পাসওয়ার্ড লিখুন', sign_in_btn: 'টার্মিনালে লগইন করুন', register_btn: 'নতুন নৌকা নিবন্ধন করুন',
      sign_in_tab: 'লগইন', register_tab: 'নিবন্ধন', name_label: 'নাবিক / মালিকের নাম',
      name_placeholder: 'উদাঃ রমেশ পাটিলে', phone_label: 'মোবাইল নম্বর', phone_placeholder: '১০ সংখ্যার মোবাইল নম্বর',
      harbor_label: 'নিজ মৎস্য বন্দর', authenticating: 'যাচাই করা হচ্ছে...',
      demo_hint: 'যাচাইকৃত ডেমো অ্যাকাউন্ট: IND-MH-01-MM-8492 / marinepassword',
      eval_badge: 'দ্রুত প্রবেশ', one_click: '১-ক্লিক এন্ট্রি',
      instant_access_desc: 'মুম্বই সাসুন ডক টেস্ট প্রোফাইলের সাথে সকল বৈশিষ্ট্য পরীক্ষা করুন।',
      instant_access_btn: 'অতিথি নাবিক প্রবেশ', or_divider: 'অথবা পাসওয়ার্ড দিয়ে লগইন করুন',
      mopsw_badge: 'বন্দর, জাহাজ চলাচল এবং জলপথ মন্ত্রণালয়ের মানদণ্ড',
      welcome_title: 'নিরাপদ সমুদ্র, অধিক মাছ, শূন্য সীমান্ত ঝুঁকি',
      welcome_subtitle: 'উপকূলীয় মৎস্যজীবীদের জন্য আবহাওয়া তথ্য, উপগ্রহ বিজ্ঞান এবং সীমান্ত সুরক্ষার আধুনিক সমন্বয়।',
      feature_agents_title: 'স্বয়ংক্রিয় মাল্টি-এজেন্ট AI সিস্টেম',
      feature_agents_desc: 'আবহাওয়া ও সমুদ্র পরিস্থিতি বিশ্লেষণ করে নির্ভরযোগ্য সুরক্ষা পরামর্শ প্রদান করে।',
      feature_satellite_title: 'স্যাটেলাইট PFZ ও সমুদ্র তথ্য',
      feature_satellite_desc: 'দৈনিক থার্মাল ফ্রন্ট মাছ পাওয়ার সেরা ক্ষেত্রগুলি চিহ্নিত করে।',
      feature_imbl_title: 'আন্তর্জাতিক সমুদ্রসীমা সুরক্ষা (IMBL)',
      feature_imbl_desc: 'নৌকাগুলিকে আন্তর্জাতিক সীমান্ত ও নিষিদ্ধ অঞ্চল থেকে দূরে রাখতে স্বয়ংক্রিয় সতর্কতা দেয়।',
      footer_left: '© ২০২৬ MarineMind AI — স্বায়ত্তশাসিত সামুদ্রিক নিরাপত্তা সহকারী',
      footer_right: 'ভারত সরকার আবহাওয়া ও হাইড্রোগ্রাফিক মানদণ্ড',
      err_required: 'অনুগ্রহ করে সকল প্রয়োজনীয় তথ্য পূরণ করুন।',
      err_password_len: 'পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।'
    },
    offline: {
      offshore_mode: 'গভীর সমুদ্র মোড (অফলাইন)', cache_mode: 'যাত্রাপূর্ব তথ্য সক্রিয়',
      offline_desc: 'আপনি সমুদ্রে মোবাইল নেটওয়ার্কের বাইরে আছেন। সংরক্ষিত আবহাওয়া তথ্য ব্যবহৃত হচ্ছে।',
      cache_desc: 'যাচাইকৃত সামুদ্রিক বুলেটিন সক্রিয়। নেটওয়ার্ক ফিরলে লাইভ ডেটা চালু হবে।',
      local_cache_badge: 'স্থানীয় নিরাপদ ক্যাশ'
    }
  }
};

/**
 * Returns typed fisherman translations for the specified language.
 * Falls back to English if the language is unsupported.
 */
export function getFishermanTranslation(lang: string = 'en'): FishermanTranslations {
  const code = (['en', 'hi', 'mr', 'gu', 'ta', 'ml', 'te', 'kn', 'bn'].includes(lang) ? lang : 'en') as FishermanLang;
  return TRANSLATIONS[code] || TRANSLATIONS['en'];
}

/**
 * Localizes any Government of India IMD Marine Advisory or Port Signal
 * into the fisherman's native coastal language.
 */
export function localizeAdvisory(
  advisory: string | { advisory_type?: string; description?: string; severity?: string },
  lang: string = 'en'
): { title: string; description: string; badgeText: string } {
  const code = (['en', 'hi', 'mr', 'gu', 'ta', 'ml', 'te', 'kn', 'bn'].includes(lang) ? lang : 'en') as FishermanLang;
  
  const rawType = typeof advisory === 'string' ? advisory : (advisory.advisory_type || advisory.description || '');
  const rawDesc = typeof advisory === 'string' ? advisory : (advisory.description || advisory.advisory_type || '');
  const sev = (typeof advisory === 'object' && advisory.severity ? advisory.severity : 'WARNING').toUpperCase();

  // Badges
  const badgeMap: Record<FishermanLang, Record<string, string>> = {
    en: { CRITICAL: 'STORM WARNING', WARNING: 'ADVISORY', INFO: 'NOTICE', CAUTION: 'CAUTION' },
    hi: { CRITICAL: 'तूफान चेतावनी', WARNING: 'तटीय चेतावनी', INFO: 'सूचना', CAUTION: 'सावधानी' },
    mr: { CRITICAL: 'वादळ इशारा', WARNING: 'सागरी इशारा', INFO: 'सूचना', CAUTION: 'सावधानता' },
    gu: { CRITICAL: 'વાવાઝોડું ચેતવણી', WARNING: 'દરિયાઈ ચેતવણી', INFO: 'સૂચના', CAUTION: 'સાવધાની' },
    ta: { CRITICAL: 'புயல் எச்சரிக்கை', WARNING: 'கடல் எச்சரிக்கை', INFO: 'அறிவிப்பு', CAUTION: 'கவனம்' },
    ml: { CRITICAL: 'ചുഴലിക്കാറ്റ് മുന്നറിയിപ്പ്', WARNING: 'തീരദേശ മുന്നറിയിപ്പ്', INFO: 'അറിയിപ്പ്', CAUTION: 'ജാഗ്രത' },
    te: { CRITICAL: 'తుఫాను హెచ్చరిక', WARNING: 'తీరప్రాంత హెచ్చరిక', INFO: 'నోటీసు', CAUTION: 'జాగ్రత్త' },
    kn: { CRITICAL: 'ಬಿರುಗಾಳಿ ಎಚ್ಚರಿಕೆ', WARNING: 'ಕರಾವಳಿ ಎಚ್ಚರಿಕೆ', INFO: 'ಸೂಚನೆ', CAUTION: 'ಎಚ್ಚರಿಕೆ' },
    bn: { CRITICAL: 'ঝড় সতর্কতা', WARNING: 'উপকূলীয় সতর্কতা', INFO: 'বিজ্ঞপ্তি', CAUTION: 'সাবধানতা' },
  };
  const badgeText = badgeMap[code]?.[sev] || badgeMap['en'][sev] || 'ADVISORY';

  // Advisory Type Translations
  let title = rawType;
  if (rawType.includes('IMD Port Warning')) {
    const portPart = rawType.replace('IMD Port Warning:', '').trim();
    const locPortSig = localizePortSignal(portPart, code);
    const titles: Record<FishermanLang, string> = {
      en: `IMD Port Warning: ${locPortSig}`,
      hi: `आईएमडी बंदरगाह चेतावनी: ${locPortSig}`,
      mr: `हवामान विभाग बंदर इशारा: ${locPortSig}`,
      gu: `હવામાન વિભાગ બંદર ચેતવણી: ${locPortSig}`,
      ta: `வானிலை மைய துறைமுக எச்சரிக்கை: ${locPortSig}`,
      ml: `കാലാവസ്ഥാ കേന്ദ്രം തുറമുഖ മുന്നറിയിപ്പ്: ${locPortSig}`,
      te: `వాతావరణ కేంద్రం పోర్ట్ హెచ్చరిక: ${locPortSig}`,
      kn: `ಹವಾಮಾನ ಇಲಾಖೆ ಬಂದರು ಎಚ್ಚರಿಕೆ: ${locPortSig}`,
      bn: `আবহাওয়া দফতর বন্দর সতর্কতা: ${locPortSig}`,
    };
    title = titles[code];
  } else if (rawType.includes('Synoptic')) {
    const synTitles: Record<FishermanLang, string> = {
      en: 'IMD Synoptic Weather Advisory',
      hi: 'आईएमडी मौसमी चक्रवात व वायु परामर्श',
      mr: 'हवामान विभाग चक्रीवादळ व वारे इशारा',
      gu: 'હવામાન વિભાગ ચક્રવાત અને પવન સલાહ',
      ta: 'வானிலை மைய வளிமண்டல சுழற்சி எச்சரிக்கை',
      ml: 'കാലാവസ്ഥാ നിരീക്ഷണ കേന്ദ്രം ചുഴലിക്കാറ്റ് അറിയിപ്പ്',
      te: 'వాతావరణ కేంద్రం తుఫాను మరియు వాయు సలహా',
      kn: 'ಹವಾಮಾನ ಇಲಾಖೆ ಚಂಡಮಾರುತ ಮತ್ತು ಗಾಳಿ ಸಲಹೆ',
      bn: 'আবহাওয়া দফতর সিনপটিক সামুদ্রিক সতর্কতা',
    };
    title = synTitles[code];
  } else if (rawType.includes('Surge') || rawType.includes('Ocean Currents')) {
    const surgeTitles: Record<FishermanLang, string> = {
      en: 'IMD / INCOIS Ocean Currents & Surge Alert',
      hi: 'आईएमडी / इनकोइस समुद्री धारा व लहर चेतावनी',
      mr: 'हवामान विभाग / इनकोइस सागरी प्रवाह व लाटांचा इशारा',
      gu: 'હવામાન વિભાગ / ઇન્કોઇસ દરિયાઈ મોજા ચેતવણી',
      ta: 'கடல் நீரோட்டம் மற்றும் அலை எழுச்சி எச்சரிக்கை',
      ml: 'സമുദ്ര പ്രവാഹങ്ങളും കടലാക്രമണ മുന്നറിയിപ്പും',
      te: 'సముద్రపు ప్రవాహాలు మరియు అలల హెచ్చరిక',
      kn: 'ಸಮುದ್ರ ಪ್ರವಾಹ ಮತ್ತು ಅಲೆಗಳ ಎಚ್ಚರಿಕೆ',
      bn: 'সমুদ্রের স্রোত ও জলোচ্ছ্বাস সতর্কতা',
    };
    title = surgeTitles[code];
  } else if (rawType.includes('Traffic') || rawType.includes('Vessel Traffic')) {
    const trafficTitles: Record<FishermanLang, string> = {
      en: 'Commercial Vessel Traffic Restriction',
      hi: 'वाणिज्यिक जहाज यातायात नियंत्रण (मुख्य चैनल)',
      mr: 'व्यापारी जहाज वाहतूक निर्बंध (मुख्य चॅनेल)',
      gu: 'વાણિજ્યિક જહાજ વાહનવ્યવહાર નિયંત્રણ',
      ta: 'வணிக கப்பல் போக்குவரத்து கட்டுப்பாடு',
      ml: 'വാണിജ്യ കപ്പൽ ഗതാഗത നിയന്ത്രണം',
      te: 'వాణిజ్య నౌకల రాకపోకల నియంత్రణ',
      kn: 'ವಾಣಿಜ್ಯ ಹಡಗು ಸಂಚಾರ ನಿರ್ಬಂಧ',
      bn: 'বাণিজ্যিক জাহাজ চলাচল নিয়ন্ত্রণ বিজ্ঞপ্তি',
    };
    title = trafficTitles[code];
  } else if (rawType.includes('Cyclone') || rawType.includes('cyclone')) {
    const cycTitles: Record<FishermanLang, string> = {
      en: 'Official IMD Coastal Cyclone Warning',
      hi: 'आधिकारिक आईएमडी तटीय चक्रवात चेतावनी',
      mr: 'अधिकृत हवामान विभाग सागरी चक्रीवादळ इशारा',
      gu: 'સત્તાવાર હવામાન વિભાગ તટીય વાવાઝોડું ચેતવણી',
      ta: 'அதிகாரப்பூர்வ வானிலை புயல் எச்சரிக்கை',
      ml: 'ഔദ്യോഗിക കാലാവസ്ഥാ കേന്ദ്രം ചുഴലിക്കാറ്റ് മുന്നറിയിപ്പ്',
      te: 'అధికారిక వాతావరణ తుఫాను హెచ్చరిక',
      kn: 'ಅಧಿಕೃತ ಹವಾಮಾನ ಬಿರುಗಾಳಿ ಎಚ್ಚರಿಕೆ',
      bn: 'সরকারি আবহাওয়া দফতর উপকূলীয় ঘূর্ণিঝড় সতর্কতা',
    };
    title = cycTitles[code];
  }

  // Description Content Translations
  let description = rawDesc;
  if (rawDesc.includes('Official Port') || rawDesc.includes('Port Cautionary Signal') || rawDesc.includes('Port Danger Signal')) {
    const isDanger = rawDesc.includes('Danger') || rawDesc.includes('IV') || rawDesc.includes('4');
    const portPart = rawDesc.replace(/Official Port (Danger|Cautionary) Signal:?/i, '').trim();
    const locSig = localizePortSignal(portPart, code);
    const prefixMap: Record<FishermanLang, { danger: string; caution: string }> = {
      en: { danger: 'Official Port Danger Signal', caution: 'Official Port Cautionary Signal' },
      hi: { danger: 'आधिकारिक बंदरगाह खतरा संकेत', caution: 'आधिकारिक बंदरगाह सावधानी संकेत' },
      mr: { danger: 'अधिकृत बंदर धोका बावटा', caution: 'अधिकृत बंदर सावधानतेचा बावटा' },
      gu: { danger: 'સત્તાવાર બંદર ભય સિગ્નલ', caution: 'સત્તાવાર બંદર સાવચેતી સિગ્નલ' },
      ta: { danger: 'அதிகாரப்பூர்வ துறைமுக ஆபத்து சிக்னல்', caution: 'அதிகாரப்பூர்வ துறைமுக எச்சரிக்கை சிக்னல்' },
      ml: { danger: 'ഔദ്യോഗിക തുറമുഖ അപകട സിഗ്നൽ', caution: 'ഔദ്യോഗിക തുറമുഖ ജാഗ്രതാ സിഗ്നൽ' },
      te: { danger: 'అధికారిక పోర్ట్ ప్రమాద సిగ్నల్', caution: 'అధికారిక పోర్ట్ హెచ్చరిక సిగ్నల్' },
      kn: { danger: 'ಅಧಿಕೃತ ಬಂದರು ಅಪಾಯದ ಸಂಕೇತ', caution: 'ಅಧಿಕೃತ ಬಂದರು ಮುನ್ನೆಚ್ಚರಿಕೆ ಸಂಕೇತ' },
      bn: { danger: 'সরকারি বন্দর বিপদ সংকেত', caution: 'সরকারি বন্দর সতর্ক সংকেত' },
    };
    const prefix = isDanger ? prefixMap[code].danger : prefixMap[code].caution;
    description = `${prefix}: ${locSig}`;
  } else if (rawDesc.includes('Commercial container vessel transit') || rawDesc.includes('VLCC tankers')) {
    const descMap: Record<FishermanLang, string> = {
      en: 'Commercial container vessel transit active in Main Channel. Fishing craft must maintain at least 500m clearance from VLCC tankers.',
      hi: 'मुख्य चैनल में बड़े वाणिज्यिक जहाजों का आवागमन जारी है। मछली पकड़ने वाली नावें बड़े जहाजों से कम से कम 500 मीटर की सुरक्षित दूरी बनाए रखें।',
      mr: 'मुख्य चॅनेलमध्ये व्यापारी मालवाहू जहाजांची ये-जा सुरू आहे. मासेमारी नौकांनी मोठ्या टँकरपासून किमान ५०० मीटर सुरक्षित अंतर ठेवावे.',
      gu: 'મુખ્ય ચેનલમાં મોટા વાણિજ્યિક જહાજોની અવરજવર ચાલુ છે. માછીમારી બોટોએ 500 મીટરનું સુરક્ષિત અંતર જાળવવું.',
      ta: 'முக்கிய கடல் வழியில் வணிக சரக்குக் கப்பல்கள் இயங்குகின்றன. மீன்பிடி படகுகள் பெரிய கப்பல்களிலிருந்து குறைந்தது 500 மீ பாதுகாப்பான தூரம் பராமரிக்க வேண்டும்.',
      ml: 'പ്രധാന ചാനലിൽ വലിയ ചരക്ക് കപ്പലുകൾ സഞ്ചരിക്കുന്നുണ്ട്. മത്സ്യബന്ധന ബോട്ടുകൾ 500 മീറ്റർ അകലം പാലിക്കണം.',
      te: 'ప్రధాన ఛానెల్‌లో వాణిజ్య నౌకలు ప్రయాణిస్తున్నాయి. చేపల వేట పడవలు కనీసం 500 మీటర్ల సురక్షిత దూరాన్ని పాటించాలి.',
      kn: 'ಮುಖ್ಯ ಚಾನಲ್‌ನಲ್ಲಿ ವಾಣಿಜ್ಯ ಹಡಗುಗಳ ಸಂಚಾರವಿದೆ. ಮೀನುಗಾರಿಕಾ ದೋಣಿಗಳು ಕನಿಷ್ಠ 500 ಮೀಟರ್ ಸುರಕ್ಷಿತ ಅಂತರವನ್ನು ಕಾಯ್ದುಕೊಳ್ಳಬೇಕು.',
      bn: 'প্রধান চ্যানেলে বাণিজ্যিক জাহাজ চলাচল করছে। মাছ ধরার নৌকাগুলিকে ৫০০ মিটার নিরাপদ দূরত্ব বজায় রাখতে হবে।',
    };
    description = descMap[code];
  } else if (rawDesc.includes('Cyclone Warning') || rawDesc.includes('Cyclone Alert') || rawDesc.includes('cyclone')) {
    const cycMap: Record<FishermanLang, string> = {
      en: 'Official IMD Cyclone Warning: High winds & cyclonic swell active. Artisanal craft strictly advised to remain nearshore.',
      hi: 'आधिकारिक आईएमडी चक्रवात चेतावनी: तेज समुद्री हवाएं व चक्रवाती लहरें सक्रिय। पारंपरिक नावें किनाारे के पास ही रहें।',
      mr: 'अधिकृत हवामान विभाग चक्रीवादळ इशारा: वादळी वारे व उसळणाऱ्या लाटा. लहान बोटींनी किनाऱ्याजवळ राहावे.',
      gu: 'સત્તાવાર હવામાન વિભાગ વાવાઝોડું ચેતવણી: ભારે પવન અને તોફાની મોજા. નાની બોટોએ કિનારા નજીક જ રહેવું.',
      ta: 'வானிலை மையம் புயல் எச்சரிக்கை: தீவிர காற்று மற்றும் சுழற்சி அலைகள். சிறிய படகுகள் கடலுக்கு செல்ல வேண்டாம்.',
      ml: 'കാലാവസ്ഥാ മുന്നറിയിപ്പ്: അതിശക്തമായ കാറ്റും കടലാക്രമണവും. ചെറിയ ബോട്ടുകൾ കരയ്ക്കടുത്ത് നിൽക്കുക.',
      te: 'వాతావరణ కేంద్రం తుఫాను హెచ్చరిక: తీవ్రమైన గాలులు మరియు అలలు. చిన్న పడవలు తీరానికి సమీపంలోనే ఉండాలి.',
      kn: 'ಹವಾಮಾನ ಬಿರುಗಾಳಿ ಎಚ್ಚರಿಕೆ: ಬಲವಾದ ಗಾಳಿ ಮತ್ತು ಚಂಡಮಾರುತದ ಅಲೆಗಳು. ಸಣ್ಣ ದೋಣಿಗಳು ದಡದಲ್ಲೇ ಇರಬೇಕು.',
      bn: 'আবহাওয়া দফতর ঘূর্ণিঝড় সতর্কতা: প্রবল ঝড়ো হাওয়া ও উত্তাল ঢেউ। ছোট ট্রলারগুলিকে উপকূলে থাকার পরামর্শ।',
    };
    description = cycMap[code];
  } else if (rawDesc.includes('CYCLONIC CIRCULATION') || rawDesc.includes('ARABIAN SEA') || rawDesc.includes('BAY OF BENGAL')) {
    const descMap: Record<FishermanLang, string> = {
      en: 'Official IMD Warning: Cyclonic circulation active over coastal waters with squally winds. Artisanal craft advised to operate nearshore and monitor port signals.',
      hi: 'आधिकारिक आईएमडी बुलेटिन: समुद्र के ऊपर चक्रवाती परिसंचरण सक्रिय। तेज हवाओं और ऊंची लहरों की संभावना। पारंपरिक नौकाएं सतर्क रहें और बंदरगाह निर्देशों का पालन करें।',
      mr: 'हवामान विभाग बुलेटिन: अरबी समुद्रावर चक्रीवादळाचे अभिसरण सक्रिय. वेगाने वाहणारे वारे आणि उसळणाऱ्या लाटा. लहान बोटींनी किनाऱ्याजवळ राहावे.',
      gu: 'સત્તાવાર હવામાન વિભાગ: દરિયામાં ચક્રવાતી પરિભ્રમણ સક્રિય. ભારે પવન અને ઊંચા મોજાની સંભાવના. નાની બોટોએ કિનારા નજીક જ રહેવું.',
      ta: 'அதிகாரப்பூர்வ வானிலை அறிக்கை: வளிமண்டல சுழற்சி காரணமாக பலத்த காற்று மற்றும் அலை எழுச்சி எச்சரிக்கை. சிறிய படகுகள் கடலுக்குச் செல்ல வேண்டாம்.',
      ml: 'കാലാവസ്ഥാ മുന്നറിയിപ്പ്: കടലിൽ ചുഴലിക്കാറ്റ് രൂപപ്പെടാൻ സാധ്യത. ശക്തമായ കാറ്റും തിരമാലകളും. ചെറിയ ബോട്ടുകൾ ജാഗ്രത പാലിക്കുക.',
      te: 'అధికారిక వాతావరణ బులెటిన్: సముద్రంలో తుఫాను గాలులు వీస్తున్నాయి. చిన్న పడవలు తీరానికి సమీపంలోనే ఉండాలి.',
      kn: 'ಅಧಿಕೃತ ಹವಾಮಾನ ಬುಲೆಟಿನ್: ಸಮುದ್ರದಲ್ಲಿ ಚಂಡಮಾರುತದ ಪರಿಚಲನೆ. ಬಿರುಗಾಳಿ ಮತ್ತು ಅಲೆಗಳ ಹೆಚ್ಚಳ. ಸಣ್ಣ ದೋಣಿಗಳು ದಡದಲ್ಲೇ ಇರಬೇಕು.',
      bn: 'সরকারি আবহাওয়া বুলেটিন: সমুদ্রের উপর ঘূর্ণাবর্তের কারণে উত্তাল হাওয়া ও ঢেউয়ের সম্ভাবনা। ছোট ট্রলারগুলিকে উপকূলে থাকার পরামর্শ।',
    };
    description = descMap[code];
  } else if (rawDesc.includes('Small artisanal craft advised to exercise extreme caution') || rawDesc.includes('remain in harbor')) {
    const descMap: Record<FishermanLang, string> = {
      en: 'Official IMD Port Warning: Squalls and high swell active. Artisanal and small crafts are strictly advised to remain in harbor.',
      hi: 'आधिकारिक आईएमडी बंदरगाह चेतावनी: उग्र समुद्र और तेज हवाएं। पारंपरिक और छोटी नौकाओं को बंदरगाह में ही रहने की सख्त सलाह दी जाती है।',
      mr: 'हवामान विभाग बंदर इशारा: वादळी वारे व खवळलेला समुद्र. लहान मच्छीमार बोटींनी खोल समुद्रात न जाता बंदरातच सुरक्षित राहावे.',
      gu: 'સત્તાવાર બંદર ચેતવણી: તોફાની દરિયો અને ભારે પવન. નાની માછીમારી બોટોને બંદરમાં જ રહેવાની કડક સલાહ આપવામાં આવે છે.',
      ta: 'துறைமுக எச்சரிக்கை: கொந்தளிப்பான கடல் மற்றும் பலத்த காற்று. சிறிய படகுகள் கடலுக்கு செல்லாமல் துறைமுகத்திலேயே இருக்க அறிவுறுத்தப்படுகிறது.',
      ml: 'തുറമുഖ ജാഗ്രതാ നിർദ്ദേശം: കടൽ പ്രക്ഷുബ്ധമാണ്. ചെറിയ ബോട്ടുകൾ കടലിൽ പോകരുതെന്നും തുറമുഖത്ത് തുടരണമെന്നും മുന്നറിയിപ്പ്.',
      te: 'పోర్ట్ హెచ్చరిక: కల్లోల సముద్రం మరియు తీవ్రమైన గాలులు. చిన్న పడవలు హార్బర్‌లోనే ఉండాలని ఆదేశించడమైనది.',
      kn: 'ಬಂದರು ಎಚ್ಚರಿಕೆ: ಪ್ರಕ್ಷುಬ್ಧ ಸಮುದ್ರ ಮತ್ತು ಬಿರುಗಾಳಿ. ಸಣ್ಣ ದೋಣಿಗಳು ಸಮುದ್ರಕ್ಕೆ ಇಳಿಯದೆ ಬಂದರಿನಲ್ಲೇ ಇರಲು ಕಟ್ಟುನಿಟ್ಟಿನ ಸೂಚನೆ.',
      bn: 'বন্দর সতর্কতা: উত্তাল সমুদ্র ও ঝড়ো হাওয়া। ছোট নৌকাগুলিকে সমুদ্রে না গিয়ে বন্দরে নিরাপদ আশ্রয়ে থাকার নির্দেশ দেওয়া হচ্ছে।',
    };
    description = descMap[code];
  }

  return { title, description, badgeText };
}

/**
 * Localizes official IMD Port Signals across all 9 coastal Indian languages.
 */
export function localizePortSignal(portSignal: string = '', lang: string = 'en'): string {
  const code = (['en', 'hi', 'mr', 'gu', 'ta', 'ml', 'te', 'kn', 'bn'].includes(lang) ? lang : 'en') as FishermanLang;
  const upper = portSignal.toUpperCase();

  if (!upper || upper.includes('NIL')) {
    const map: Record<FishermanLang, string> = {
      en: 'NIL AT ALL PORTS',
      hi: 'सभी बंदरगाहों पर कोई चेतावनी नहीं (सामान्य स्थिति)',
      mr: 'सर्व बंदरांवर कोणताही इशारा नाही (सामान्य)',
      gu: 'બધા બંદરો પર કોઈ ચેતવણી નથી (સામાન્ય)',
      ta: 'அனைத்து துறைமுகங்களிலும் எச்சரிக்கை ஏதுமில்லை',
      ml: 'എല്ലാ തുറമുഖങ്ങളിലും മുന്നറിയിപ്പില്ല',
      te: 'అన్ని పోర్టులలో హెచ్చరికలు లేవు',
      kn: 'ಎಲ್ಲಾ ಬಂದರುಗಳಲ್ಲಿ ಎಚ್ಚರಿಕೆ ಇಲ್ಲ',
      bn: 'সকল বন্দরে সতর্কতা নেই (স্বাভাবিক)',
    };
    return map[code];
  }

  if (upper.includes('SIGNAL NUMBER III') || upper.includes('SIGNAL NO. 3') || upper.includes('LOCAL CAUTIONARY') || upper.includes('LC-3')) {
    const map: Record<FishermanLang, string> = {
      en: 'Local Cautionary Signal No. III (Squalls)',
      hi: 'स्थानीय सावधानी संकेत संख्या 3 (तेज हवा व उग्र समुद्र)',
      mr: 'स्थानिक सावधानतेचा बावटा क्र. ३ (वादळी वारे)',
      gu: 'સ્થાનિક સાવચેતી સિગ્નલ નં. 3 (તોફાની પવન)',
      ta: 'உள்ளூர் எச்சரிக்கை சிக்னல் எண் 3 (காற்று மற்றும் கொந்தளிப்பு)',
      ml: 'മൂന്നാം നമ്പർ പ്രാദേശിക ജാഗ್ರതാ സിഗ്നൽ',
      te: 'స్థానిక హెచ్చరిక సిగ్నల్ నం. 3 (తీవ్ర గాలులు)',
      kn: 'ಸ್ಥಳೀಯ ಎಚ್ಚರಿಕೆಯ ಸಂಕೇತ ಸಂಖ್ಯೆ 3 (ಬಿರುಗಾಳಿ)',
      bn: '৩ নম্বর স্থানীয় সতর্ক সংকেত (ঝড়ো হাওয়া)',
    };
    return map[code];
  }

  if (upper.includes('SIGNAL NO. IV') || upper.includes('IV')) {
    const map: Record<FishermanLang, string> = {
      en: 'Port Warning Signal No. IV (Danger)',
      hi: 'बंदरगाह खतरा संकेत संख्या 4 (खतरनाक मौसम)',
      mr: 'बंदर धोका बावटा क्र. ४ (धोकादायक समुद्र)',
      gu: 'બંદર ભય સિગ્નલ નં. 4 (જોખમી દરિયો)',
      ta: 'துறைமுக ஆபத்து சிக்னல் எண் 4 (ஆபத்து)',
      ml: 'നാലാം നമ്പർ അപകട സിഗ്നൽ',
      te: '4వ నంబర్ ప్రమాద హెచ్చరిక సిగ్నల్',
      kn: '4ನೇ ಸಂಖ್ಯೆಯ ಅಪಾಯದ ಸಂಕೇತ',
      bn: '৪ নম্বর হুঁশিয়ারি সংকেত (বিপজ্জনক)',
    };
    return map[code];
  }

  return portSignal;
}

/**
 * Localizes standard WMO sea states.
 */
export function localizeSeaState(seaState: string = '', lang: string = 'en'): string {
  const code = (['en', 'hi', 'mr', 'gu', 'ta', 'ml', 'te', 'kn', 'bn'].includes(lang) ? lang : 'en') as FishermanLang;
  const s = seaState.toLowerCase();

  const map: Record<FishermanLang, { calm: string; moderate: string; rough: string; very_rough: string }> = {
    en: { calm: 'Calm', moderate: 'Moderate', rough: 'Rough', very_rough: 'Very Rough' },
    hi: { calm: 'शांत', moderate: 'मध्यम', rough: 'उग्र', very_rough: 'अति उग्र' },
    mr: { calm: 'शांत', moderate: 'मध्यम', rough: 'खवळलेला', very_rough: 'अति खवळलेला' },
    gu: { calm: 'શાંત', moderate: 'મધ્યમ', rough: 'તોફાની', very_rough: 'અતિ તોફાની' },
    ta: { calm: 'அமைதி', moderate: 'மிதமான', rough: 'கொந்தளிப்பு', very_rough: 'மிகக் கொந்தளிப்பு' },
    ml: { calm: 'ശാന്തം', moderate: 'മിതമായത്', rough: 'പ്രക്ഷുബ്ധം', very_rough: 'അതിപ്രക്ഷുബ്ധം' },
    te: { calm: 'శాంతం', moderate: 'మితమైన', rough: 'కల్లోల', very_rough: 'అత్యంత కల్లోల' },
    kn: { calm: 'ಶಾಂತ', moderate: 'ಮಧ್ಯಮ', rough: 'ಪ್ರಕ್ಷುಬ್ಧ', very_rough: 'ಅತಿ ಪ್ರಕ್ಷುಬ್ಧ' },
    bn: { calm: 'শান্ত', moderate: 'মাঝারি', rough: 'উত্তাল', very_rough: 'অতি উত্তাল' },
  };

  const entry = map[code] || map['en'];
  if (s.includes('very rough') || s.includes('extreme') || s.includes('cyclonic')) return entry.very_rough;
  if (s.includes('rough')) return entry.rough;
  if (s.includes('moderate')) return entry.moderate;
  if (s.includes('calm')) return entry.calm;
  return seaState;
}

/**
 * Localizes Compass Wind Directions.
 */
export function localizeWindDirection(dir: string = '', lang: string = 'en'): string {
  const code = (['en', 'hi', 'mr', 'gu', 'ta', 'ml', 'te', 'kn', 'bn'].includes(lang) ? lang : 'en') as FishermanLang;
  const d = dir.toUpperCase().trim();

  const dirMap: Record<FishermanLang, Record<string, string>> = {
    en: { N: 'N', NE: 'NE', E: 'E', SE: 'SE', S: 'S', SW: 'SW', W: 'W', NW: 'NW' },
    hi: { N: 'उत्तर', NE: 'उत्तर-पूर्व', E: 'पूर्व', SE: 'दक्षिण-पूर्व', S: 'दक्षिण', SW: 'दक्षिण-पश्चिम', W: 'पश्चिम', NW: 'उत्तर-पश्चिम' },
    mr: { N: 'उत्तर', NE: 'ईशान्य', E: 'पूर्व', SE: 'आग्नेय', S: 'दक्षिण', SW: 'नैऋत्य', W: 'पश्चिम', NW: 'वायव्य' },
    gu: { N: 'ઉત્તર', NE: 'ઉત્તર-પૂર્વ', E: 'પૂર્વ', SE: 'દક્ષિણ-પૂર્વ', S: 'દક્ષિણ', SW: 'દક્ષિણ-પશ્ચિમ', W: 'પશ્ચિમ', NW: 'ઉત્તર-પશ્ચિમ' },
    ta: { N: 'வடக்கு', NE: 'வடகிழக்கு', E: 'கிழக்கு', SE: 'தென்கிழக்கு', S: 'தெற்கு', SW: 'தென்மேற்கு', W: 'மேற்கு', NW: 'வடமேற்கு' },
    ml: { N: 'വടക്ക്', NE: 'വടക്ക്-കിഴക്ക്', E: 'കിഴക്ക്', SE: 'തെക്ക്-കിഴക്ക്', S: 'തെക്ക്', SW: 'തെക്ക്-പടിഞ്ഞാറ്', W: 'പടിഞ്ഞാറ്', NW: 'വടക്ക്-പടിഞ്ഞാറ്' },
    te: { N: 'ఉత్తరం', NE: 'ఈశాన్యం', E: 'తూర్పు', SE: 'ఆగ్నేయం', S: 'దక్షిణం', SW: 'నైరుతి', W: 'పడమర', NW: 'వాయువ్యం' },
    kn: { N: 'ಉತ್ತರ', NE: 'ಈಶಾನ್ಯ', E: 'ಪೂರ್ವ', SE: 'ಆಗ್ನೇಯ', S: 'ದಕ್ಷಿಣ', SW: 'ನೈಋತ್ಯ', W: 'ಪಶ್ಚಿಮ', NW: 'ವಾಯುವ್ಯ' },
    bn: { N: 'উত্তর', NE: 'উত্তর-পূর্ব', E: 'পূর্ব', SE: 'দক্ষিণ-পূর্ব', S: 'দক্ষিণ', SW: 'দক্ষিণ-পশ্চিম', W: 'পশ্চিম', NW: 'উত্তর-পশ্চিম' },
  };

  return dirMap[code]?.[d] || dir;
}

/**
 * Localizes fishing harbor and sector names.
 */
export function localizeHarborName(harborName: string = '', lang: string = 'en'): string {
  const code = (['en', 'hi', 'mr', 'gu', 'ta', 'ml', 'te', 'kn', 'bn'].includes(lang) ? lang : 'en') as FishermanLang;
  if (code === 'en') return harborName;

  const harbors: Record<string, Record<FishermanLang, string>> = {
    'Mumbai (Sassoon Docks)': {
      en: 'Mumbai (Sassoon Docks)', hi: 'मुंबई (ससून डॉक)', mr: 'मुंबई (ससून डॉक्स)',
      gu: 'મુંબઈ (સાસૂન ડૉક)', ta: 'மும்பை (சாசூன் டாக்)', ml: 'മുംബൈ (സാസൂൺ ഡോക്ക്)',
      te: 'ముంబై (సాసూన్ డాక్)', kn: 'ಮುಂಬೈ (ಸಾಸೂನ್ ಡಾಕ್)', bn: 'মুম্বই (সাসুন ডক)'
    },
    'Mirkarwada Harbor, Ratnagiri': {
      en: 'Mirkarwada Harbor, Ratnagiri', hi: 'मिरकरवाडा बंदर, रत्नागिरी', mr: 'मिरकरवाडा बंदर, रत्नागिरी',
      gu: 'મીરકરવાડા બંદર, રત્નાગિરી', ta: 'மிர்கார்வாடா துறைமுகம், ரத்னகிரி', ml: 'മിർക്കർവാഡ തുറമുഖം, രത്നഗിരി',
      te: 'మిర్కర్‌వాడ హార్బర్, రత్నగిరి', kn: 'ಮಿರ್ಕರ್ವಾಡ ಬಂದರು, ರತ್ನಗಿರಿ', bn: 'মিরকরওয়াদা বন্দর, রত্নগিরি'
    },
    'Veraval Fishing Harbor': {
      en: 'Veraval Fishing Harbor', hi: 'वेरावल मत्स्य बंदरगाह', mr: 'वेरावळ मासेमारी बंदर',
      gu: 'વેરાવળ મત્સ્ય બંદર', ta: 'வெராவல் மீன்பிடி துறைமுகம்', ml: 'വെരാവൽ ഫിഷിംഗ് തുറമുഖം',
      te: 'వెరావల్ ఫిషింగ్ హార్బర్', kn: 'ವೆರಾವಲ್ ಮೀನುಗಾರಿಕಾ ಬಂದರು', bn: 'ভেরাভাল মৎস্য বন্দর'
    },
    'Porbandar Fishing Harbor': {
      en: 'Porbandar Fishing Harbor', hi: 'पोरबंदर मत्स्य बंदरगाह', mr: 'पोरबंदर मासेमारी बंदर',
      gu: 'પોરબંદર મત્સ્ય બંદર', ta: 'போர்பந்தர் மீன்பிடி துறைமுகம்', ml: 'പോർബന്ദർ ഫിഷിംഗ് തുറമുഖം',
      te: 'పోర్‌బందర్ ఫిషింగ్ హార్బర్', kn: 'ಪೋರಬಂದರ್ ಮೀನುಗಾರಿಕಾ ಬಂದರು', bn: 'পোরবন্দর মৎস্য বন্দর'
    },
    'Rameswaram Fishing Jetty': {
      en: 'Rameswaram Fishing Jetty', hi: 'रामेश्वरम मत्स्य जेटी', mr: 'रामेश्वरम मासेमारी जेटी',
      gu: 'રામેશ્વરમ મત્સ્ય જેટી', ta: 'ராமேஸ்வரம் மீன்பிடி தளம்', ml: 'രാമേശ്വരം ഫിഷിംഗ് ജെട്ടി',
      te: 'రామేశ్వరం ఫిషింగ్ జెట్టీ', kn: 'ರಾಮೇಶ್ವರಂ ಮೀನುಗಾರಿಕಾ ಜೆಟ್ಟಿ', bn: 'রামেশ্বরম মৎস্য জেটি'
    },
    'Kasimedu Fishing Harbor, Chennai': {
      en: 'Kasimedu Fishing Harbor, Chennai', hi: 'कासिमेडू मत्स्य बंदरगाह, चेन्नई', mr: 'कासिमेडू मासेमारी बंदर, चेन्नई',
      gu: 'કાસીમેડુ મત્સ્ય બંદર, ચેન્નઈ', ta: 'காசிமேடு மீன்பிடி துறைமுகம், சென்னை', ml: 'കാസിമേട് ഫിഷിംഗ് തുറമുഖം, ചെന്നൈ',
      te: 'కాశీమేడు ఫిషింగ్ హార్బర్, చెన్నై', kn: 'ಕಾಸಿಮೇಡು ಮೀನುಗಾರಿಕಾ ಬಂದರು, ಚೆನ್ನೈ', bn: 'কাসিমেডু মৎস্য বন্দর, চেন্নাই'
    },
    'Kochi Thoppumpady Harbor': {
      en: 'Kochi Thoppumpady Harbor', hi: 'कोच्चि थोप्पुमपडी बंदरगाह', mr: 'कोची थोप्पुमपडी बंदर',
      gu: 'કોચી થોપ્પુમપડી બંદર', ta: 'கொச்சி தோப்பும்படி துறைமுகம்', ml: 'കൊച്ചി തോപ്പുംപടി തുറമുഖം',
      te: 'కొచ్చి తొప్పుంపడి హార్బర్', kn: 'ಕೊಚ್ಚಿ ತೋಪ್ಪುಂಪಡಿ ಬಂದರು', bn: 'কোচি থোপ্পুমপডি বন্দর'
    },
    'Visakhapatnam Harbor': {
      en: 'Visakhapatnam Harbor', hi: 'विशाखापट्टनम बंदरगाह', mr: 'विशाखापट्टणम बंदर',
      gu: 'વિશાખાપટ્ટનમ બંદર', ta: 'விசாகப்பட்டினம் துறைமுகம்', ml: 'വിശാഖപട്ടണം തുറമുഖം',
      te: 'విశాఖపట్నం ఫిషింగ్ హార్బర్', kn: 'ವಿಶಾಖಪಟ್ಟಣಂ ಬಂದರು', bn: 'বিশাখাপত্তনম বন্দর'
    },
    'Mangalore Old Port': {
      en: 'Mangalore Old Port', hi: 'मंगलुरु पुराना बंदरगाह', mr: 'मंगळुरू जुने बंदर',
      gu: 'મંગલોર જૂનું બંદર', ta: 'மங்களூரு பழைய துறைமுகம்', ml: 'മംഗലാപുരം പഴയ തുറമുഖം',
      te: 'మంగళూరు పాత పోర్టు', kn: 'ಮಂಗಳೂರು ಹಳೆಯ ಬಂದರು', bn: 'ম্যাঙ্গালোর পুরাতন বন্দর'
    },
    'Paradip Fishing Harbor': {
      en: 'Paradip Fishing Harbor', hi: 'पारादीप मत्स्य बंदरगाह', mr: 'पारादीप मासेमारी बंदर',
      gu: 'પારાદીપ મત્સ્ય બંદર', ta: 'பாராதீப் மீன்பிடி துறைமுகம்', ml: 'പാരദ്വീപ് ഫിഷിംഗ് തുറമുഖം',
      te: 'పారదీప్ ఫిషింగ్ హార్బర్', kn: 'ಪಾರಾದೀಪ್ ಮೀನುಗಾರಿಕಾ ಬಂದರು', bn: 'প্যারাডীপ মৎস্য বন্দর'
    },
  };

  for (const [key, valMap] of Object.entries(harbors)) {
    if (harborName.includes(key) || key.includes(harborName)) {
      return valMap[code] || harborName;
    }
  }

  return harborName;
}
