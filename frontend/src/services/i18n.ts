// frontend/src/services/i18n.ts

export type LanguageCode = 'en' | 'hi' | 'mr' | 'ta';

export interface TranslationSchema {
  nav: {
    dashboard: string;
    copilot: string;
    pfz: string;
    risk: string;
    routes: string;
    geofence: string;
    alerts: string;
    analytics: string;
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
    telemetry_heading: string;
    run_flow: string;
    risk_title: string;
    top_pfz_title: string;
    hydro_title: string;
    advisories_title: string;
  };
  footer: {
    agents_online: string;
    position: string;
    mode: string;
    prototype_edition: string;
    statutory_notice: string;
  };
}

export const TRANSLATIONS: Record<LanguageCode, TranslationSchema> = {
  en: {
    nav: {
      dashboard: 'Operations',
      copilot: 'Copilot & Map',
      pfz: 'PFZ Forecasts',
      risk: 'Risk Matrix',
      routes: 'Safe Routes',
      geofence: 'Boundaries',
      alerts: 'Advisories',
      analytics: 'Oceanography'
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
      confidence: 'Advisory Confidence',
      operator: 'Operator'
    },
    dashboard: {
      sector: 'SECTOR: MUMBAI OFFSHORE (18.92°N, 72.83°E)',
      safe_window_active: 'SAFE WINDOW ACTIVE',
      title: 'Marine Intelligence & Sea Safety',
      subtitle: 'Real-time multi-source fusion of satellite oceanography, hydrodynamic waves, and marine boundaries for coastal fisheries.',
      launch_copilot: 'Launch Copilot & Map',
      pfz_directory: 'PFZ Forecast',
      demo_heading: 'Featured Scenarios',
      demo_subheading: 'Select a scenario to inspect real-time marine safety advisories.',
      telemetry_heading: 'Hydrodynamic & Environmental Telemetry',
      run_flow: 'Run Scenario',
      risk_title: 'RISK ASSESSMENT',
      top_pfz_title: 'TOP PFZ ZONE',
      hydro_title: 'HYDRODYNAMICS',
      advisories_title: 'ADVISORIES'
    },
    footer: {
      agents_online: '10 Specialized AI Agents Online',
      position: 'Position',
      mode: 'Telemetry: Active Hydrodynamic Stream',
      prototype_edition: 'MarineMind AI • Maritime Operations Platform',
      statutory_notice: 'Statutory Notice'
    }
  },
  hi: {
    nav: {
      dashboard: 'परिचालन (Operations)',
      copilot: 'कोपायलट व चार्ट (Copilot)',
      pfz: 'मत्स्य क्षेत्र (PFZ)',
      risk: 'जोखिम विश्लेषण (Risk)',
      routes: 'सुरक्षित मार्ग (Routes)',
      geofence: 'सागरी सीमाएं (EEZ)',
      alerts: 'चेतावनियां (Alerts)',
      analytics: 'महासागर विज्ञान'
    },
    scenarios: {
      label: 'त्वरित परिदृश्य:',
      s1: '1. सुरक्षा निर्णय (सुबह 06:00-10:00)',
      s2: '2. मत्स्य क्षेत्र: Alpha बनाम Bravo',
      s3: '3. सुरक्षित फेयरवे मार्ग (Route B)',
      s4: '4. सीमा चेतावनी (4.2 किमी शेष)'
    },
    copilot: {
      title: 'समुद्री एआई कोपायलट',
      pipeline_online: 'ऑनलाइन',
      welcome: 'मरीनमाइंड एआई तैयार है। मत्स्य क्षेत्र, समुद्री लहरों, सुरक्षित नौवहन या सीमा सुरक्षा से संबंधित कोई भी प्रश्न पूछें।',
      inquiries_label: 'त्वरित प्रश्न:',
      inquiries: [
        'क्या कल सुबह मछली पकड़ने जाना सुरक्षित है?',
        'आज सबसे नजदीकी मत्स्य क्षेत्र (PFZ) कहाँ है?',
        'PFZ Alpha तक जाने का सबसे सुरक्षित रास्ता क्या है?',
        'क्या मैं किसी प्रतिबंधित या अंतरराष्ट्रीय सीमा के करीब हूँ?'
      ],
      input_placeholder: 'अपना प्रश्न लिखें या नीचे से चुनें...',
      send_btn: 'भेजें',
      assessing: 'समुद्री व उपग्रहीय मौसम डेटा का विश्लेषण जारी है...',
      rationale_title: 'प्रमुख मूल्यांकन कारक:',
      key_factors: 'प्रमुख मूल्यांकन कारक:',
      focus_map: 'नक्शे पर PFZ Alpha देखें',
      risk_index: 'जोखिम सूचकांक',
      confidence: 'सलाह सटीकता',
      operator: 'ऑपरेटर'
    },
    dashboard: {
      sector: 'क्षेत्र: मुंबई अपतटीय (18.92°N, 72.83°E)',
      safe_window_active: 'सुरक्षित परिचालन विंडो सक्रिय',
      title: 'समुद्री बुद्धिमत्ता एवं सुरक्षा केंद्र',
      subtitle: 'उपग्रह डेटा, समुद्री लहरों के पूर्वानुमान और अंतरराष्ट्रीय सीमा निगरानी का एकीकरण।',
      launch_copilot: 'कोपायलट व मैप खोलें',
      pfz_directory: 'मत्स्य क्षेत्र सूची',
      demo_heading: 'विशेष परिदृश्य',
      demo_subheading: 'वास्तविक समय समुद्री सलाह का परीक्षण करने के लिए परिदृश्य चुनें।',
      telemetry_heading: 'समुद्री एवं जलगतिकीय अवलोकन',
      run_flow: 'परिदृश्य देखें',
      risk_title: 'जोखिम मूल्यांकन',
      top_pfz_title: 'शीर्ष मत्स्य क्षेत्र',
      hydro_title: 'समुद्री लहरें व हवा',
      advisories_title: 'सक्रिय चेतावनियां'
    },
    footer: {
      agents_online: '10 विशेषज्ञ एआई एजेंट ऑनलाइन',
      position: 'स्थिति',
      mode: 'टेलीमेट्री: लाइव हाइड्रोग्राफिक स्ट्रीम',
      prototype_edition: 'मरीनमाइंड एआई • समुद्री परिचालन प्लेटफॉर्म',
      statutory_notice: 'वैधानिक सूचना'
    }
  },
  mr: {
    nav: {
      dashboard: 'परिचालन (Operations)',
      copilot: 'कोपायलट आणि नकाशा',
      pfz: 'मासेमारी क्षेत्रे (PFZ)',
      risk: 'धोका विश्लेषण (Risk)',
      routes: 'सुरक्षित मार्ग (Routes)',
      geofence: 'सागरी हद्द (EEZ)',
      alerts: 'सागरी इशारे (Alerts)',
      analytics: 'महासागर विज्ञान'
    },
    scenarios: {
      label: 'सागरी परिदृश्य:',
      s1: '1. सुरक्षा निर्णय (सकाळी ०६:००-१०:००)',
      s2: '2. मासेमारी क्षेत्र: Alpha वि Bravo',
      s3: '3. सुरक्षित फेअरवे मार्ग (Route B)',
      s4: '4. सागरी सीमा इशारा (४.२ किमी)'
    },
    copilot: {
      title: 'सागरी एआई कोपायलट',
      pipeline_online: 'ऑनलाइन',
      welcome: 'मरीनमाइंड एआय सज्ज आहे. मासेमारी क्षेत्र, लाटांची स्थिती, सुरक्षित मार्ग किंवा सागरी सीमा याबद्दल विचारा.',
      inquiries_label: 'त्वरित प्रश्न:',
      inquiries: [
        'उद्या सकाळी मासेमारीला जाणे सुरक्षित आहे का?',
        'आज सर्वात जवळचे संभाव्य मासेमारी क्षेत्र कुठे आहे?',
        'PFZ Alpha कडे जाण्यासाठी सर्वात सुरक्षित मार्ग कोणता?',
        'मी कोणत्याही प्रतिबंधित किंवा आंतरराष्ट्रीय सीमेच्या जवळ जात आहे का?'
      ],
      input_placeholder: 'येथे प्रश्न विचारा किंवा खालील पर्याय निवडा...',
      send_btn: 'पाठवा',
      assessing: 'सागरी व उपग्रह माहितीचे विश्लेषण चालू आहे...',
      rationale_title: 'महत्त्वाचे मूल्यांकन घटक:',
      key_factors: 'महत्त्वाचे मूल्यांकन घटक:',
      focus_map: 'नकाशावर PFZ Alpha पहा',
      risk_index: 'धोका निर्देशांक',
      confidence: 'सल्ला विश्वासार्हता',
      operator: 'चालक'
    },
    dashboard: {
      sector: 'विभाग: मुंबई सागरी हद्द (18.92°N, 72.83°E)',
      safe_window_active: 'सुरक्षित सागरी वेळ सुरू',
      title: 'सागरी बुद्धिमत्ता आणि सुरक्षा केंद्र',
      subtitle: 'उपग्रह निरीक्षणे, लाटांचे मॉडेल आणि सागरी सीमा सुरक्षेचे एकात्मिक विश्लेषण.',
      launch_copilot: 'कोपायलट व नकाशा उघडा',
      pfz_directory: 'PFZ यादी',
      demo_heading: 'खास सागरी परिदृश्य',
      demo_subheading: 'थेट सागरी सल्ला पाहण्यासाठी परिदृश्य निवडा.',
      telemetry_heading: 'समुद्र व लाटांचे थेट निरीक्षण',
      run_flow: 'परिदृश्य पहा',
      risk_title: 'धोका मूल्यांकन',
      top_pfz_title: 'उत्तम मासेमारी क्षेत्र',
      hydro_title: 'लाटा आणि वारे',
      advisories_title: 'सागरी इशारे'
    },
    footer: {
      agents_online: '१० विशेष एआई एजंट कार्यरत',
      position: 'स्थान',
      mode: 'टेलीमेट्री: थेट सागरी प्रवाह',
      prototype_edition: 'मरीनमाइंड एआई • सागरी सुरक्षा प्लॅटफॉर्म',
      statutory_notice: 'वैधानिक सूचना'
    }
  },
  ta: {
    nav: {
      dashboard: 'செயல்பாடுகள்',
      copilot: 'கோபைலட் & வரைபடம்',
      pfz: 'மீன்பிடி பகுதி (PFZ)',
      risk: 'இடர் ஆய்வு (Risk)',
      routes: 'பாதுகாப்பான பாதை',
      geofence: 'கடல் எல்லைகள் (EEZ)',
      alerts: 'எச்சரிக்கைகள்',
      analytics: 'கடல் பகுப்பாய்வு'
    },
    scenarios: {
      label: 'முக்கிய சூழ்நிலைகள்:',
      s1: '1. பாதுகாப்பு முடிவு (காலை 06:00-10:00)',
      s2: '2. மீன்பிடி மண்டலம்: Alpha vs Bravo',
      s3: '3. பாதுகாப்பான வழித்தடம் (Route B)',
      s4: '4. சர்வதேச எல்லை எச்சரிக்கை (4.2 கிமீ)'
    },
    copilot: {
      title: 'கடல்சார் AI கோபைலட்',
      pipeline_online: 'இணைப்பில்',
      welcome: 'MarineMind AI தயார். மீன்பிடி பகுதிகள், கடல் அலைகள், பாதுகாப்பான வழிகள் மற்றும் கடல் எல்லைகள் பற்றி கேளுங்கள்.',
      inquiries_label: 'விரைவு வினாக்கள்:',
      inquiries: [
        'நாளை காலை கடலுக்கு மீன்பிடிக்கச் செல்வது பாதுகாப்பானதா?',
        'இன்று அருகில் உள்ள மீன்பிடி மண்டலம் எங்குள்ளது?',
        'PFZ Alpha செல்வதற்கான பாதுகாப்பான பாதை எது?',
        'நான் ஏதேனும் தடைசெய்யப்பட்ட அல்லது சர்வதேச கடல் எல்லைக்கு அருகில் செல்கிறேனா?'
      ],
      input_placeholder: 'வினாவை தட்டச்சு செய்க அல்லது தேர்ந்தெடுக்கவும்...',
      send_btn: 'அனுப்பு',
      assessing: 'கடல் மற்றும் செயற்கைக்கோள் தரவு பகுப்பாய்வு செய்யப்படுகிறது...',
      rationale_title: 'முக்கிய மதிப்பீட்டுக் காரணிகள்:',
      key_factors: 'முக்கிய மதிப்பீட்டுக் காரணிகள்:',
      focus_map: 'வரைபடத்தில் PFZ Alpha பார்க்க',
      risk_index: 'இடர் குறியீடு',
      confidence: 'நம்பகத்தன்மை',
      operator: 'இயக்குபவர்'
    },
    dashboard: {
      sector: 'மண்டலம்: மும்பை கடல் பகுதி (18.92°N, 72.83°E)',
      safe_window_active: 'பாதுகாப்பான நேரம் செயலில் உள்ளது',
      title: 'கடல்சார் நுண்ணறிவு & பாதுகாப்பு மையம்',
      subtitle: 'செயற்கைக்கோள் தரவு மற்றும் கடல் அலை அவதானிப்புகளின் நேரடி பகுப்பாய்வு.',
      launch_copilot: 'கோபைலட் திறக்க',
      pfz_directory: 'PFZ பட்டியல்',
      demo_heading: 'முக்கிய சூழ்நிலைகள்',
      demo_subheading: 'நேரடி கடல்சார் ஆலோசனைகளைப் பெற சூழ்நிலையைத் தேர்ந்தெடுக்கவும்.',
      telemetry_heading: 'கடல் சூழல் அவதானிப்புகள்',
      run_flow: 'பார்',
      risk_title: 'இடர் மதிப்பீடு',
      top_pfz_title: 'சிறந்த மீன்பிடி பகுதி',
      hydro_title: 'அலைகள் மற்றும் காற்று',
      advisories_title: 'கடலோர எச்சரிக்கைகள்'
    },
    footer: {
      agents_online: '10 சிறப்பு AI முகவர்கள் தயார்',
      position: 'நிலை',
      mode: 'டெலிமெட்ரி: நேரடி கடல்சார் ஸ்ட்ரீம்',
      prototype_edition: 'MarineMind AI • கடல்சார் செயல்பாட்டு தளம்',
      statutory_notice: 'சட்டப்பூர்வ அறிவிப்பு'
    }
  }
};

export function getTranslation(lang: string = 'en'): TranslationSchema {
  const code = (lang as LanguageCode) in TRANSLATIONS ? (lang as LanguageCode) : 'en';
  return TRANSLATIONS[code];
}
