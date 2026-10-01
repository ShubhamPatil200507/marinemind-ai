// frontend/src/services/fishermanI18n.ts
// Centralized, verified multilingual translations for MarineMind Fisherman UX.
// Supported languages: English (en), Hindi (hi), Marathi (mr), Tamil (ta).

export type FishermanLang = 'en' | 'hi' | 'mr' | 'ta';

export interface LanguageOption {
  code: FishermanLang;
  label: string;
  native: string;
  region: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', native: 'English', region: 'All Harbors' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी', region: 'राष्ट्रीय' },
  { code: 'mr', label: 'Marathi', native: 'मराठी', region: 'महाराष्ट्र (Mumbai / Ratnagiri)' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்', region: 'தமிழ்நாடு (Chennai / Rameswaram)' },
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
}

const TRANSLATIONS: Record<FishermanLang, FishermanTranslations> = {
  // ── ENGLISH ───────────────────────────────────────────────────────────────
  en: {
    nav: {
      home: 'Home',
      spots: 'Spots',
      trip: 'Trip',
      ask: 'Ask',
      profile: 'Profile',
    },
    greeting: {
      morning: 'Good morning',
      afternoon: 'Good afternoon',
      evening: 'Good evening',
      captain: 'Captain',
      port: 'Home Port',
      change_port: 'Change Port',
      gps_verified: 'GPS Verified',
    },
    status: {
      title: "Today's Fishing Status",
      good_to_go: 'GOOD TO GO',
      caution: 'USE CAUTION',
      use_caution: 'HIGH CAUTION',
      stay_ashore: 'STAY ASHORE',
      checking: 'CHECKING CONDITIONS...',
      desc_low: 'Calm seas and favorable winds. Safe for fishing operations.',
      desc_moderate: 'Moderate swells expected. Stay alert and monitor afternoon winds.',
      desc_high: 'Rough seas and strong winds. Small crafts should remain nearshore.',
      desc_critical: 'Dangerous sea state. Strictly remain ashore today.',
      desc_unknown: 'Connecting to marine weather satellite stream...',
      last_updated: 'Last updated',
      live: 'Live Stream',
      unavailable: 'Offline / Cached',
      data_unavailable_warning: 'Live weather service unreachable. Showing verified local advisory.',
      retry: 'Retry',
      safety_verdict: 'Safety Verdict',
    },
    conditions: {
      title: 'Current Sea Conditions',
      waves: 'Waves',
      wind: 'Wind',
      temp: 'Air Temp',
      rain: 'Rain Prob.',
      hazards: 'Hazards',
      sea_state: 'Sea State',
      wave_period: 'Wave Period',
      wind_gust: 'Wind Gusts',
      calm: 'Calm',
      moderate: 'Moderate',
      rough: 'Rough',
      very_rough: 'Very Rough',
      light_breeze: 'Light Breeze',
      moderate_wind: 'Fresh Wind',
      strong_wind: 'Strong Wind',
      gale: 'Gale Force',
      clear: 'Clear',
      watch_out: 'Caution',
      update: 'Refresh',
      meters: 'm',
      kmh: 'km/h',
      knots: 'knots',
      celsius: '°C',
      seconds: 's',
      percent: '%',
      swell: 'Swell',
      visibility: 'Visibility',
    },
    actions: {
      find_spots_title: 'Find Fishing Spots',
      find_spots_sub: 'Satellite-identified productive zones',
      plan_trip_title: 'Plan Safe Trip',
      plan_trip_sub: 'Reef & border avoidance route',
      quick_assistant_title: 'Ask MarineMind Copilot',
      voice_chat: 'Voice / Chat',
      q_can_i_fish: 'Can I go fishing today?',
      q_where_to_fish: 'Where is the best fishing spot right now?',
      q_any_warning: 'Are there any storm warnings or high swells?',
      see_all: 'See all',
      top_spot_title: 'Top Recommended Spot',
    },
    spots: {
      title: 'Fishing Hotspots (PFZ)',
      subtitle: 'INCOIS & satellite ocean thermal boundary zones',
      total_spots: 'spots mapped today',
      filter_all: 'All Spots',
      filter_recommended: 'Recommended Only',
      filter_near: 'Nearshore (< 15 km)',
      no_spots_found: 'No fishing hotspots mapped in this sector.',
      good_fishing: 'Prime Fishing Spot',
      fair_fishing: 'Moderate Potential',
      avoid_area: 'Caution / Avoid',
      km_away: 'km away',
      sea_state: 'Sea State',
      target_species: 'Target Catch',
      view_map: 'View on Map',
      plan_route: 'Plan Safe Route',
      thermal_boundary: 'Thermal Front',
      depth: 'Depth',
      confidence: 'Confidence',
    },
    trip: {
      title: 'Safe Passage Trip Planner',
      subtitle: 'Step-by-step route guidance with automatic reef and border avoidance',
      step1_title: '1. Select Fishing Destination',
      step1_sub: 'Tap a fishing spot below to set your route destination:',
      step2_title: '2. Voyage Safety & Conditions Check',
      step3_title: '3. Safe Navigation Passage',
      selected_zone: 'Destination',
      distance: 'Distance',
      est_transit: 'Est. Transit Time',
      sea_state: 'Sea State',
      wind_speed: 'Wind Speed',
      calculate_btn: 'Check Conditions & Calculate Safe Route',
      calculating: 'Analyzing safe passage & bathymetry...',
      recommended_safe_fairway: 'Recommended Safe Fairway',
      direct_hazardous_track: 'Direct Track (Hazardous)',
      safe_badge: 'SAFE PASSAGE',
      caution_badge: 'HIGH HAZARD',
      mins: 'min',
      km: 'km',
      safety_advisory: 'Safety Advisory',
      tap_to_select: 'Select a zone to start',
      hazard_warning: 'Avoids submerged obstacles and boundary zones',
    },
    profile: {
      title: 'Vessel & Skipper Settings',
      skipper_title: 'Licensed Marine Skipper',
      vessel_id: 'Vessel Registration (ID)',
      home_port: 'Home Fishing Harbor',
      registered_phone: 'Registered Mobile',
      preferred_language: 'Application Language',
      select_language_sub: 'Instantly changes language across all screens',
      emergency_contacts_title: 'Official Marine Emergency Contacts',
      emergency_desc: 'Tap to call directly from your mobile device',
      icg_title: 'Indian Coast Guard (Toll-Free SAR)',
      icg_desc: 'Search & Rescue Maritime Operations Control (24/7)',
      fisheries_title: 'National Fisheries Helpline',
      fisheries_desc: 'Toll-Free Fisheries Advisory Service (Dept of Fisheries)',
      disaster_title: 'State Coastal Disaster Control',
      disaster_desc: 'Coastal Maritime Emergency & Cyclone Cell',
      call_btn: 'Call Now',
      emergency_cellular_note: 'Emergency helplines connect directly over standard cellular network towers.',
      statutory_notice: 'View Statutory Marine Safety Notice',
      statutory_sub: 'Official disclaimer and maritime navigation regulations',
      logout: 'Sign Out of MarineMind',
    },
    advanced: {
      title: 'Sensor Telemetry & Ocean Models',
      subtitle: 'Deterministic risk formula & environmental data sources',
      wave_period: 'Wave Peak Period',
      wind_gusts: 'Peak Wind Gusts',
      sea_state_code: 'Sea State Code',
      risk_score: '6-Factor Risk Score',
      provenance_title: 'Data Sources & Model Provenance',
      weather_model: 'Open-Meteo Global Marine & Atmospheric Model',
      chlorophyll_model: 'Bio-optical proxy estimation (SST upwelling model)',
      pfz_model: 'INCOIS PFZ algorithm & thermal boundary convergence',
      disclaimer: 'MarineMind AI provides decision-support modeling. Always cross-verify conditions with Indian Coast Guard and IMD broadcasts before sailing.',
    },
  },

  // ── HINDI (हिन्दी) ────────────────────────────────────────────────────────
  hi: {
    nav: {
      home: 'होम',
      spots: 'मछली क्षेत्र',
      trip: 'सुरक्षित यात्रा',
      ask: 'सहायक',
      profile: 'प्रोफाइल',
    },
    greeting: {
      morning: 'शुभ प्रभात',
      afternoon: 'नमस्कार',
      evening: 'शुभ संध्या',
      captain: 'कप्तान',
      port: 'गृह बंदरगाह',
      change_port: 'बंदरगाह बदलें',
      gps_verified: 'GPS सत्यापित',
    },
    status: {
      title: 'आज की समुद्री स्थिति',
      good_to_go: 'जाना सुरक्षित है',
      caution: 'सावधानी बरतें',
      use_caution: 'विशेष सावधानी आवश्यक',
      stay_ashore: 'समुद्र में न जाएं — तट पर रहें',
      checking: 'स्थिति की जांच जारी है...',
      desc_low: 'शांत समुद्र और अनुकूल हवाएं। मछली पकड़ने के लिए पूरी तरह सुरक्षित।',
      desc_moderate: 'मध्यम लहरें संभावित। सतर्क रहें और दोपहर की हवा पर नज़र रखें।',
      desc_high: 'उग्र समुद्र और तेज हवाएं। छोटी नौकाएं किनारे के पास ही रहें।',
      desc_critical: 'अत्यंत खतरनाक समुद्री स्थिति। आज किसी भी हाल में समुद्र में न जाएं।',
      desc_unknown: 'समुद्री उपग्रह डेटा से कनेक्ट हो रहा है...',
      last_updated: 'अंतिम अपडेट',
      live: 'लाइव डेटा',
      unavailable: 'ऑफ़लाइन / अनुपलब्ध',
      data_unavailable_warning: 'लाइव मौसम सेवा अनुपलब्ध है। सत्यापित स्थानीय परामर्श दिखाया जा रहा है।',
      retry: 'पुनः प्रयास',
      safety_verdict: 'सुरक्षा निर्णय',
    },
    conditions: {
      title: 'वर्तमान समुद्री स्थिति',
      waves: 'लहरें',
      wind: 'हवा',
      temp: 'तापमान',
      rain: 'बारिश संभावना',
      hazards: 'खतरे',
      sea_state: 'समुद्र स्थिति',
      wave_period: 'लहर समय',
      wind_gust: 'हवा के झोंके',
      calm: 'शांत',
      moderate: 'मध्यम',
      rough: 'उग्र',
      very_rough: 'अति उग्र',
      light_breeze: 'हल्की हवा',
      moderate_wind: 'मध्यम हवा',
      strong_wind: 'तेज हवा',
      gale: 'तूफानी हवा',
      clear: 'साफ',
      watch_out: 'सावधान',
      update: 'रिफ्रेश',
      meters: 'मी',
      kmh: 'किमी/घंटा',
      knots: 'नॉट',
      celsius: '°C',
      seconds: 'सेकंड',
      percent: '%',
      swell: 'लहरें',
      visibility: 'दृश्यता',
    },
    actions: {
      find_spots_title: 'मछली पकड़ने के स्थान खोजें',
      find_spots_sub: 'उपग्रह आधारित संभावित मछली क्षेत्र',
      plan_trip_title: 'सुरक्षित यात्रा बनाएं',
      plan_trip_sub: 'चट्टानों और सीमा से सुरक्षित मार्ग',
      quick_assistant_title: 'मरीनमाइंड से पूछें',
      voice_chat: 'आवाज / चैट',
      q_can_i_fish: 'क्या आज मछली पकड़ने जाना सुरक्षित है?',
      q_where_to_fish: 'इस समय सबसे अच्छा मछली क्षेत्र कहाँ है?',
      q_any_warning: 'क्या कोई तूफान या ऊंची लहरों की चेतावनी है?',
      see_all: 'सभी देखें',
      top_spot_title: 'सर्वोत्तम अनुशंसित स्थान',
    },
    spots: {
      title: 'मछली पकड़ने के हॉटस्पॉट (PFZ)',
      subtitle: 'उपग्रह आधारित महासागरीय संभावित मछली क्षेत्र',
      total_spots: 'क्षेत्र आज मैप किए गए',
      filter_all: 'सभी स्थान',
      filter_recommended: 'केवल अनुशंसित',
      filter_near: 'निकटतम (< 15 किमी)',
      no_spots_found: 'इस क्षेत्र में कोई स्थान मैप नहीं है।',
      good_fishing: 'उत्तम मछली क्षेत्र',
      fair_fishing: 'मध्यम संभावना',
      avoid_area: 'सावधानी / टालें',
      km_away: 'किमी दूर',
      sea_state: 'समुद्र स्थिति',
      target_species: 'संभावित मछली',
      view_map: 'नक्शे पर देखें',
      plan_route: 'सुरक्षित रास्ता बनाएं',
      thermal_boundary: 'थर्मल फ्रंट',
      depth: 'गहराई',
      confidence: 'सटीकता',
    },
    trip: {
      title: 'सुरक्षित समुद्री यात्रा योजना',
      subtitle: 'चट्टानों और अंतरराष्ट्रीय सीमा से बचाव के साथ चरणबद्ध मार्गदर्शन',
      step1_title: '1. गंतव्य स्थान चुनें',
      step1_sub: 'रास्ता शुरू करने के लिए नीचे दिए गए मछली क्षेत्र पर टैप करें:',
      step2_title: '2. यात्रा सुरक्षा एवं स्थिति जांच',
      step3_title: '3. सुरक्षित नौवहन मार्ग',
      selected_zone: 'गंतव्य',
      distance: 'दूरी',
      est_transit: 'अनुमानित समय',
      sea_state: 'समुद्र स्थिति',
      wind_speed: 'हवा की गति',
      calculate_btn: 'स्थिति जांचें और सुरक्षित मार्ग बनाएं',
      calculating: 'गहराई और सुरक्षा सीमा की जांच जारी...',
      recommended_safe_fairway: 'अनुशंसित सुरक्षित मार्ग',
      direct_hazardous_track: 'सीधा मार्ग (जोखिम भरा)',
      safe_badge: 'सुरक्षित मार्ग',
      caution_badge: 'खतरा',
      mins: 'मिनट',
      km: 'किमी',
      safety_advisory: 'सुरक्षा सलाह',
      tap_to_select: 'शुरू करने के लिए एक क्षेत्र चुनें',
      hazard_warning: 'जलमग्न बाधाओं और सीमा क्षेत्र से बचाव करता है',
    },
    profile: {
      title: 'नाविक और नौका सेटिंग्स',
      skipper_title: 'प्रमाणित समुद्री नाविक',
      vessel_id: 'नौका पंजीकरण संख्या (ID)',
      home_port: 'गृह मत्स्य बंदरगाह',
      registered_phone: 'पंजीकृत मोबाइल नंबर',
      preferred_language: 'पसंदीदा भाषा',
      select_language_sub: 'सभी स्क्रीन पर तुरंत भाषा बदलें',
      emergency_contacts_title: 'आधिकारिक समुद्री आपातकालीन हेल्पलाइन',
      emergency_desc: 'सीधे कॉल करने के लिए टैप करें',
      icg_title: 'भारतीय तटरक्षक बल (SAR टोल फ्री)',
      icg_desc: '24/7 समुद्री खोज एवं बचाव अभियान केंद्र',
      fisheries_title: 'राष्ट्रीय मत्स्य पालन हेल्पलाइन',
      fisheries_desc: 'टोल-फ्री मत्स्य पालन परामर्श (मत्स्य पालन विभाग)',
      disaster_title: 'राज्य तटीय आपदा नियंत्रण कक्ष',
      disaster_desc: 'तटीय समुद्री आपातकाल और चक्रवात सहायता',
      call_btn: 'कॉल करें',
      emergency_cellular_note: 'आपातकालीन नंबर सीधे मानक सेलुलर मोबाइल नेटवर्क से जुड़ते हैं।',
      statutory_notice: 'वैधानिक समुद्री सुरक्षा सूचना देखें',
      statutory_sub: 'आधिकारिक दिशानिर्देश और नौवहन नियम',
      logout: 'मरीनमाइंड से लॉग आउट करें',
    },
    advanced: {
      title: 'सेंसर टेलीमेट्री और महासागरीय मॉडल',
      subtitle: '6-कारक जोखिम फॉर्मूला और डेटा स्रोत',
      wave_period: 'लहर चरम अवधि',
      wind_gusts: 'हवा के झोंके',
      sea_state_code: 'समुद्र स्थिति कोड',
      risk_score: '6-कारक जोखिम स्कोर',
      provenance_title: 'डेटा स्रोत और मॉडल प्रामाणिकता',
      weather_model: 'ओपन-मेटियो ग्लोबल मरीन और मौसम मॉडल',
      chlorophyll_model: 'जैव-ऑप्टिकल प्रॉक्सी अनुमान (एसएसटी अपवेलिंग)',
      pfz_model: 'थर्मल सीमा अभिसरण मॉडल',
      disclaimer: 'मरीनमाइंड एआई एक निर्णय-सहायक प्रणाली है। हमेशा भारतीय तटरक्षक बल और मौसम विभाग के निर्देशों का पालन करें।',
    },
  },

  // ── MARATHI (मराठी) ───────────────────────────────────────────────────────
  mr: {
    nav: {
      home: 'होम',
      spots: 'मासेमारी क्षेत्र',
      trip: 'सुरक्षित प्रवास',
      ask: 'मदतनीस',
      profile: 'प्रोफाइल',
    },
    greeting: {
      morning: 'शुभ प्रभात',
      afternoon: 'शुभ दुपार',
      evening: 'शुभ संध्याकाळ',
      captain: 'कॅप्टन',
      port: 'मूळ बंदर',
      change_port: 'बंदर बदला',
      gps_verified: 'GPS पडताळलेले',
    },
    status: {
      title: 'आजची मासेमारी स्थिती',
      good_to_go: 'जाणे सुरक्षित आहे',
      caution: 'सावध राहा',
      use_caution: 'विशेष काळजी घ्या',
      stay_ashore: 'समुद्रात जाऊ नका — किनाऱ्यावर राहा',
      checking: 'परिस्थिती तपासत आहे...',
      desc_low: 'शांत समुद्र आणि अनुकूल वारे. मासेमारीसाठी परिस्थिती पूर्ण सुरक्षित.',
      desc_moderate: 'मध्यम लाटांचा अंदाज. ओळखीच्या भागात राहा आणि वाऱ्याकडे लक्ष द्या.',
      desc_high: 'उधाण समुद्र आणि जोरदार वारे. लहान बोटींनी किनाऱ्याजवळ राहावे.',
      desc_critical: 'धोकादायक समुद्री परिस्थिती. आज किनाऱ्यावरच सुरक्षित राहा.',
      desc_unknown: 'सागरी उपग्रह डेटाशी जोडत आहे...',
      last_updated: 'शेवटचे अपडेट',
      live: 'थेट डेटा',
      unavailable: 'ऑफलाइन / अनुपलब्ध',
      data_unavailable_warning: 'थेट हवामान सेवेशी संपर्क नाही. स्थानिक सुरक्षित सल्ला दाखवला आहे.',
      retry: 'पुन्हा प्रयत्न',
      safety_verdict: 'सुरक्षितता निर्णय',
    },
    conditions: {
      title: 'सध्याची समुद्री परिस्थिती',
      waves: 'लाटा',
      wind: 'वारा',
      temp: 'तापमान',
      rain: 'पावसाची शक्यता',
      hazards: 'धोके',
      sea_state: 'समुद्र स्थिती',
      wave_period: 'लाटांची वारंवारता',
      wind_gust: 'वाऱ्याचे झोत',
      calm: 'शांत',
      moderate: 'मध्यम',
      rough: 'खवळलेला',
      very_rough: 'अति खवळलेला',
      light_breeze: 'मंद वारा',
      moderate_wind: 'मध्यम वारा',
      strong_wind: 'जोरदार वारा',
      gale: 'वादळी वारा',
      clear: 'स्वच्छ',
      watch_out: 'सावधान',
      update: 'रिफ्रेश',
      meters: 'मी',
      kmh: 'किमी/तास',
      knots: 'नॉट',
      celsius: '°C',
      seconds: 'सेकंद',
      percent: '%',
      swell: 'लाटा',
      visibility: 'दृश्यता',
    },
    actions: {
      find_spots_title: 'मासेमारी ठिकाणे शोधा',
      find_spots_sub: 'उपग्रह आधारित संभाव्य मासेमारी क्षेत्र',
      plan_trip_title: 'सुरक्षित प्रवास आखा',
      plan_trip_sub: 'खडक व सागरी हद्द टाळणारा मार्ग',
      quick_assistant_title: 'मरीनमाइंडला विचारा',
      voice_chat: 'आवाज / चॅट',
      q_can_i_fish: 'आज मासेमारीला जाणे सुरक्षित आहे का?',
      q_where_to_fish: 'यावेळी सर्वोत्तम मासेमारी क्षेत्र कोठे आहे?',
      q_any_warning: 'वादळ किंवा उंच लाटांची काही सूचना आहे का?',
      see_all: 'सर्व पाहा',
      top_spot_title: 'उत्कृष्ट शिफारस केलेले क्षेत्र',
    },
    spots: {
      title: 'मासेमारी हॉटस्पॉट (PFZ)',
      subtitle: 'उपग्रह आधारित संभाव्य मासेमारी क्षेत्र',
      total_spots: 'क्षेत्र आज मॅप केले',
      filter_all: 'सर्व ठिकाणे',
      filter_recommended: 'फक्त शिफारस केलेले',
      filter_near: 'जवळचे (< १५ किमी)',
      no_spots_found: 'या भागात कोणतेही क्षेत्र आढळले नाही.',
      good_fishing: 'उत्कृष्ट मासेमारी क्षेत्र',
      fair_fishing: 'मध्यम संभाव्यता',
      avoid_area: 'सावध राहा / टाळा',
      km_away: 'किमी दूर',
      sea_state: 'समुद्र स्थिती',
      target_species: 'संभाव्य मासे',
      view_map: 'नकाशावर पाहा',
      plan_route: 'सुरक्षित मार्ग आखा',
      thermal_boundary: 'थर्मल फ्रंट',
      depth: 'खोली',
      confidence: 'विश्वासार्हता',
    },
    trip: {
      title: 'सुरक्षित सागरी प्रवास नियोजन',
      subtitle: 'खडक व आंतरराष्ट्रीय सागरी हद्द (IMBL) टाळणारा सुरक्षित मार्ग',
      step1_title: '१. गंतव्य निवडा',
      step1_sub: 'सुरुवात करण्यासाठी खालील मासेमारी क्षेत्रावर टॅप करा:',
      step2_title: '२. प्रवास सुरक्षितता पडताळणी',
      step3_title: '३. सुरक्षित नौकायन मार्ग',
      selected_zone: 'गंतव्य',
      distance: 'अंतर',
      est_transit: 'अंदाजे वेळ',
      sea_state: 'समुद्र स्थिती',
      wind_speed: 'वाऱ्याचा वेग',
      calculate_btn: 'परिस्थिती तपासा आणि सुरक्षित मार्ग तयार करा',
      calculating: 'खोली आणि सागरी हद्द तपासत आहे...',
      recommended_safe_fairway: 'शिफारस केलेला सुरक्षित मार्ग',
      direct_hazardous_track: 'थेट मार्ग (धोकादायक)',
      safe_badge: 'सुरक्षित मार्ग',
      caution_badge: 'धोकादायक',
      mins: 'मिनीट',
      km: 'किमी',
      safety_advisory: 'सुरक्षा सल्ला',
      tap_to_select: 'सुरु करण्यासाठी क्षेत्र निवडा',
      hazard_warning: 'पाण्याखालील खडक व आंतरराष्ट्रीय सीमा टाळतो',
    },
    profile: {
      title: 'नाविक व बोट सेटिंग्ज',
      skipper_title: 'परवानाधारक सागरी नाविक',
      vessel_id: 'बोट नोंदणी क्रमांक (ID)',
      home_port: 'मूळ मासेमारी बंदर',
      registered_phone: 'नोंदणीकृत मोबाईल क्रमांक',
      preferred_language: 'पसंतीची भाषा',
      select_language_sub: 'सर्व स्क्रीनवर त्वरित भाषा बदला',
      emergency_contacts_title: 'अधिकृत सागरी आपत्कालीन हेल्पलाइन',
      emergency_desc: 'थेट कॉल करण्यासाठी टॅप करा',
      icg_title: 'भारतीय तटरक्षक दल (SAR टोल फ्री)',
      icg_desc: '२४/७ सागरी शोध व बचाव नियंत्रण कक्ष',
      fisheries_title: 'राष्ट्रीय मत्स्यव्यवसाय हेल्पलाइन',
      fisheries_desc: 'टोल-फ्री मत्स्यव्यवसाय सल्ला (मत्स्यव्यवसाय विभाग)',
      disaster_title: 'राज्य किनारपट्टी आपत्ती नियंत्रण कक्ष',
      disaster_desc: 'सागरी आपत्कालीन व चक्रीवादळ मदत कक्ष',
      call_btn: 'कॉल करा',
      emergency_cellular_note: 'आपत्कालीन क्रमांक थेट मोबाइल टॉवर नेटवर्कद्वारे जोडले जातात.',
      statutory_notice: 'वैधानिक सागरी सुरक्षा सूचना पाहा',
      statutory_sub: 'अधिकृत मार्गदर्शक तत्त्वे व सागरी नियम',
      logout: 'मरीनमाइंडमधून बाहेर पडा (लॉग आउट)',
    },
    advanced: {
      title: 'सेन्सर टेलिमेट्री व महासागरी मॉडेल',
      subtitle: '६-घटक धोका गुणांक व डेटा स्रोत',
      wave_period: 'लाटांचा कमाल काळ',
      wind_gusts: 'वाऱ्याची कमाल गती',
      sea_state_code: 'समुद्र स्थिती कोड',
      risk_score: '६-घटक धोका गुणांक',
      provenance_title: 'डेटा स्रोत आणि मॉडेल प्रामाणिकता',
      weather_model: 'ओपन-मेटिओ ग्लोबल मरीन आणि हवामान मॉडेल',
      chlorophyll_model: 'बायो-ऑप्टिकल प्रॉक्सी मॉडेल (एसएसटी)',
      pfz_model: 'थर्मल बाउंड्री मॉडेल',
      disclaimer: 'मरीनमाइंड एआय ही एक निर्णय-सहायक प्रणाली आहे. नेहमी तटरक्षक दल आणि हवामान विभागाच्या सूचनांचे पालन करा.',
    },
  },

  // ── TAMIL (தமிழ்) ─────────────────────────────────────────────────────────
  ta: {
    nav: {
      home: 'முகப்பு',
      spots: 'மீன்பிடி இடம்',
      trip: 'பயணம்',
      ask: 'கேள்',
      profile: 'சுயவிவரம்',
    },
    greeting: {
      morning: 'காலை வணக்கம்',
      afternoon: 'மதிய வணக்கம்',
      evening: 'மாலை வணக்கம்',
      captain: 'கேப்டன்',
      port: 'சொந்த துறைமுகம்',
      change_port: 'துறைமுகத்தை மாற்று',
      gps_verified: 'GPS சரிபார்க்கப்பட்டது',
    },
    status: {
      title: 'இன்றைய மீன்பிடி நிலைமை',
      good_to_go: 'கடலுக்கு செல்லலாம்',
      caution: 'எச்சரிக்கையுடன் செல்லவும்',
      use_caution: 'அதிக கவனம் தேவை',
      stay_ashore: 'கடலுக்கு போகாதீர்கள் — கரையிலேயே இருங்கள்',
      checking: 'நிலைமைகளை சரிபார்க்கிறது...',
      desc_low: 'அமைதியான கடல் மற்றும் சாதகமான காற்று. மீன்பிடிக்க முற்றிலும் பாதுகாப்பானது.',
      desc_moderate: 'மிதமான அலைகள் எதிர்பார்க்கப்படுகிறது. கவனமாக இருங்கள் மற்றும் மதிய காற்றைக் கண்காணிக்கவும்.',
      desc_high: 'கொந்தளிப்பான கடல் மற்றும் பலத்த காற்று. சிறிய படகுகள் கரைக்கு அருகிலேயே இருக்கவும்.',
      desc_critical: 'மிக ஆபத்தான கடல் நிலைமை. இன்று முற்றிலும் கடலுக்கு செல்ல வேண்டாம்.',
      desc_unknown: 'செயற்கைக்கோள் தரவுடன் இணைகிறது...',
      last_updated: 'கடைசியாக புதுப்பிக்கப்பட்டது',
      live: 'நேரலை',
      unavailable: 'ஆஃப்லைன் / கிடைக்கவில்லை',
      data_unavailable_warning: 'நேரலை வானிலை சேவை கிடைக்கவில்லை. உள்ளூர் பாதுகாப்பு ஆலோசனை காட்டப்படுகிறது.',
      retry: 'மீண்டும் முயற்சி',
      safety_verdict: 'பாதுகாப்பு முடிவு',
    },
    conditions: {
      title: 'தற்போதைய கடல் நிலைமை',
      waves: 'அலைகள்',
      wind: 'காற்று',
      temp: 'வெப்பநிலை',
      rain: 'மழை வாய்ப்பு',
      hazards: 'எச்சரிக்கை',
      sea_state: 'கடல் நிலை',
      wave_period: 'அலை உச்ச காலம்',
      wind_gust: 'காற்று வீச்சு',
      calm: 'அமைதி',
      moderate: 'மிதமான',
      rough: 'கொந்தளிப்பு',
      very_rough: 'மிகக் கொந்தளிப்பு',
      light_breeze: 'மென் காற்று',
      moderate_wind: 'மித காற்று',
      strong_wind: 'பலத்த காற்று',
      gale: 'புயல் காற்று',
      clear: 'தெளிவானது',
      watch_out: 'கவனம்',
      update: 'புதுப்பி',
      meters: 'மீ',
      kmh: 'கி.மீ/மணி',
      knots: 'நாட்ஸ்',
      celsius: '°C',
      seconds: 'விநாடி',
      percent: '%',
      swell: 'அலை எழுச்சி',
      visibility: 'பார்வைத்திறன்',
    },
    actions: {
      find_spots_title: 'மீன்பிடி பகுதிகளைக் காண்க',
      find_spots_sub: 'செயற்கைக்கோள் அடையாளம் காணப்பட்ட பகுதிகள்',
      plan_trip_title: 'பாதுகாப்பான பயணத் திட்டம்',
      plan_trip_sub: 'பாறைகள் மற்றும் எல்லை தவிர்ப்புப் பாதை',
      quick_assistant_title: 'MarineMind AI-யிடம் கேளுங்கள்',
      voice_chat: 'குரல் / அரட்டை',
      q_can_i_fish: 'இன்று மீன்பிடிக்கப் போகலாமா?',
      q_where_to_fish: 'தற்போது சிறந்த மீன்பிடி இடம் எங்கே உள்ளது?',
      q_any_warning: 'ஏதேனும் புயல் அல்லது உயரலை எச்சரிக்கை உள்ளதா?',
      see_all: 'அனைத்தையும் பார்',
      top_spot_title: 'பரிந்துரைக்கப்பட்ட சிறந்த இடம்',
    },
    spots: {
      title: 'மீன்பிடி பகுதிகள் (PFZ)',
      subtitle: 'செயற்கைக்கோள் கண்டறிந்த மீன்பிடி பகுதிகள்',
      total_spots: 'பகுதிகள் இன்று வரைபடமாக்கப்பட்டன',
      filter_all: 'அனைத்து இடங்கள்',
      filter_recommended: 'பரிந்துரைக்கப்பட்டவை',
      filter_near: 'அருகில் (< 15 கி.மீ)',
      no_spots_found: 'இந்த பகுதியில் மீன்பிடி பகுதிகள் இல்லை.',
      good_fishing: 'சிறந்த மீன்பிடி பகுதி',
      fair_fishing: 'மிதமான பகுதி',
      avoid_area: 'தவிர்க்கவும் / கவனம்',
      km_away: 'கி.மீ தொலைவில்',
      sea_state: 'கடல் நிலை',
      target_species: 'கிடைக்கும் மீன்கள்',
      view_map: 'வரைபடத்தில் காண்க',
      plan_route: 'பாதை திட்டமிடு',
      thermal_boundary: 'வெப்பநிலை எல்லை',
      depth: 'ஆழம்',
      confidence: 'நம்பகத்தன்மை',
    },
    trip: {
      title: 'பாதுகாப்பான பயணத் திட்டம்',
      subtitle: 'பாறைகள் மற்றும் சர்வதேச கடல் எல்லையைத் (IMBL) தவிர்க்கும் பாதை',
      step1_title: '1. இலக்கைத் தேர்ந்தெடுக்கவும்',
      step1_sub: 'தொடங்க கீழே உள்ள மீன்பிடி பகுதியைத் தொடவும்:',
      step2_title: '2. பயணப் பாதுகாப்பு சரிபார்ப்பு',
      step3_title: '3. பாதுகாப்பான கடல் வழி',
      selected_zone: 'இலக்கு',
      distance: 'தூரம்',
      est_transit: 'மதிப்பிடப்பட்ட நேரம்',
      sea_state: 'கடல் நிலை',
      wind_speed: 'காற்று வேகம்',
      calculate_btn: 'பாதுகாப்பான பாதையை உருவாக்குங்கள்',
      calculating: 'ஆழம் மற்றும் பாதுகாப்பு எல்லை சரிபார்க்கப்படுகிறது...',
      recommended_safe_fairway: 'பரிந்துரைக்கப்பட்ட பாதுகாப்பான பாதை',
      direct_hazardous_track: 'நேரடிப் பாதை (ஆபத்தானது)',
      safe_badge: 'பாதுகாப்பானது',
      caution_badge: 'ஆபத்தானது',
      mins: 'நிமிடங்கள்',
      km: 'கி.மீ',
      safety_advisory: 'பாதுகாப்பு ஆலோசனை',
      tap_to_select: 'தொடங்க பகுதியைத் தேர்ந்தெடுக்கவும்',
      hazard_warning: 'நீருக்கடியில் உள்ள பாறைகள் மற்றும் எல்லைகளைத் தவிர்க்கிறது',
    },
    profile: {
      title: 'படகு & மாலுமி அமைப்புகள்',
      skipper_title: 'உரிமம் பெற்ற கடல் மாலுமி',
      vessel_id: 'படகு பதிவு எண் (ID)',
      home_port: 'சொந்த மீன்பிடி துறைமுகம்',
      registered_phone: 'பதிவுசெய்த கைபேசி எண்',
      preferred_language: 'விருப்பமான மொழி',
      select_language_sub: 'அனைத்து பக்கங்களிலும் உடனடியாக மாறும்',
      emergency_contacts_title: 'அதிகாரப்பூர்வ கடல்சார் அவசர எண்கள்',
      emergency_desc: 'நேரடியாக அழைக்க தொடவும்',
      icg_title: 'இந்திய கடலோர காவல்படை (SAR கட்டணமில்லா எண்)',
      icg_desc: '24/7 கடல்சார் தேடல் மற்றும் மீட்புப் பிரிவு',
      fisheries_title: 'தேசிய மீன்வள உதவி எண்',
      fisheries_desc: 'மத்திய மீன்வளத் துறை ஆலோசனை சேவை',
      disaster_title: 'மாநில கடலோர பேரிடர் கட்டுப்பாட்டு அறை',
      disaster_desc: 'கடல் அவசரநிலை மற்றும் புயல் மீட்புப் பிரிவு',
      call_btn: 'அழைக்க',
      emergency_cellular_note: 'அவசர எண்கள் நேரடியாக கைபேசி சிக்னல் மூலம் இணையும்.',
      statutory_notice: 'சட்டப்பூர்வ கடல் பாதுகாப்பு அறிவிப்பு',
      statutory_sub: 'அதிகாரப்பூர்வ எச்சரிக்கைகள் மற்றும் வழிகாட்டுதல்கள்',
      logout: 'MarineMind-லிருந்து வெளியேறு',
    },
    advanced: {
      title: 'சென்சார் டெலிமெட்ரி & கடல் மாதிரிகள்',
      subtitle: '6-காரணி இடர் கணக்கீடு மற்றும் சுற்றுச்சூழல் மூலங்கள்',
      wave_period: 'அலை உச்சக் காலம்',
      wind_gusts: 'காற்று வீச்சு உச்சம்',
      sea_state_code: 'கடல் நிலை குறியீடு',
      risk_score: '6-காரணி இடர் குறியீடு',
      provenance_title: 'தரவு ஆதாரம் & நம்பகத்தன்மை',
      weather_model: 'Open-Meteo உலகளாவிய கடல்சார் மாதிரி',
      chlorophyll_model: 'உயிர்-ஒளியியல் மாதிரி (SST)',
      pfz_model: 'வெப்பநிலை எல்லை கண்டறிதல் மாதிரி',
      disclaimer: 'MarineMind AI என்பது முடிவெடுக்கும் உதவி அமைப்பாகும். எப்போதும் இந்திய கடலோர காவல்படை மற்றும் வானிலை மைய அறிவிப்புகளைப் பின்பற்றவும்.',
    },
  },
};

/**
 * Returns typed fisherman translations for the specified language.
 * Falls back to English if the language is unsupported.
 */
export function getFishermanTranslation(lang: string = 'en'): FishermanTranslations {
  const code = (['en', 'hi', 'mr', 'ta'].includes(lang) ? lang : 'en') as FishermanLang;
  return TRANSLATIONS[code];
}
