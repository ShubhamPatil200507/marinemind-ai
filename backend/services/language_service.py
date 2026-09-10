# backend/services/language_service.py
import re
from typing import Tuple, Dict, Any, List

def detect_query_language(text: str) -> str:
    """Detects if query is in English, Marathi, Hindi, or Tamil."""
    if not text:
        return "en"

    # Tamil script detection (0B80–0BFF)
    if any("\u0b80" <= char <= "\u0bfa" for char in text):
        return "ta"

    # Distinct Marathi markers
    marathi_exclusive = [
        "आहे", "नाही", "मासेमारी", "उद्या", "लाटा", "सांगा", "माहिती", "काय",
        "मार्ग", "सीमा", "कसे", "करा", "मध्ये", "आहोत", "झाले", "रस्ता", "किमी",
        "धोका", "सुरक्षित", "वारं", "वारा", "सकाळी", "दुपारी", "जावे"
    ]
    marathi_count = sum(1 for w in marathi_exclusive if w in text)

    # Distinct Hindi markers
    hindi_exclusive = [
        "है", "नहीं", "मछली", "कल", "लहरें", "बताओ", "जानकारी", "क्या",
        "मौसम", "रास्ता", "कैसे", "करें", "में", "होगा", "किमी", "खतरा",
        "सुरक्षित", "हवा", "सुबह", "दोपहर", "जाएं", "जाना"
    ]
    hindi_count = sum(1 for w in hindi_exclusive if w in text)

    if marathi_count > hindi_count:
        return "mr"
    elif hindi_count > 0:
        return "hi"
    elif any("\u0900" <= char <= "\u097f" for char in text):
        return "hi"

    return "en"


INTENT_LOCALIZATIONS: Dict[str, Dict[str, Dict[str, Any]]] = {
    "marine_safety_assessment": {
        "en": {
            "answer": (
                "**Marine Safety Assessment: Safe Morning Window (06:00 AM - 10:30 AM IST).**\n\n"
                "Conditions tomorrow morning are favorable for nearshore fishing operations (Wave height: 1.2m, Wind: 18 km/h NW). "
                "However, atmospheric models project deteriorating conditions starting around **11:30 AM**, "
                "with swell heights rising to **2.6m** and gusty winds up to **44 km/h**.\n\n"
                "**Advice:** Return to port before 10:30 AM; avoid deep offshore fishing."
            ),
            "action": "PROCEED WITH CAUTION: Safe window active 06:00 - 10:30 AM. Return to harbor before noon.",
            "why_bullets": [
                "Early morning wave swell (1.2m) and NW wind (18 km/h) are within safe artisanal limits.",
                "Wave swells are projected to surge to 2.6m with wind gusts of 44 km/h after 11:30 AM.",
                "No active tropical cyclone warning along the coastal sector.",
                "Vessel trajectory remains fully clear of military firing ranges and marine protected areas."
            ]
        },
        "hi": {
            "answer": (
                "**समुद्री सुरक्षा मूल्यांकन: सुबह 06:00 से 10:30 बजे तक सुरक्षित परिचालन विंडो।**\n\n"
                "कल सुबह तटीय मछली पकड़ने के लिए परिस्थितियां अनुकूल हैं (लहरों की ऊंचाई: 1.2 मीटर, हवा: 18 किमी/घंटा उत्तर-पश्चिम)। "
                "हालांकि, दोपहर 11:30 बजे के बाद 2.6 मीटर तक ऊंची लहरें और 44 किमी/घंटा तक तेज हवाएं चलने का अनुमान है।\n\n"
                "**सलाह:** सुबह 10:30 बजे से पहले सुरक्षित बंदरगाह लौटें; गहरे समुद्र में जाने से बचें।"
            ),
            "action": "सावधानीपूर्वक आगे बढ़ें: सुबह 06:00 से 10:30 बजे तक सुरक्षित विंडो सक्रिय। दोपहर से पहले लौटें।",
            "why_bullets": [
                "सुबह के समय हवा (18 किमी/घंटा) और शांत लहरें (1.2 मीटर) पारंपरिक नौकाओं के लिए सुरक्षित हैं।",
                "दोपहर 11:30 बजे के बाद लहरों की ऊंचाई 2.6 मीटर और हवा की गति 44 किमी/घंटा तक बढ़ने का पूर्वानुमान है।",
                "तटीय क्षेत्र में कोई चक्रवात अथवा गंभीर मौसमी चेतावनी सक्रिय नहीं है।",
                "नौका का नौवहन क्षेत्र रक्षा अभ्यास सीमाओं से पूरी तरह सुरक्षित दूरी पर है।"
            ]
        },
        "mr": {
            "answer": (
                "**सागरी सुरक्षा मूल्यांकन: सकाळी ०६:०० ते १०:३० सुरक्षित सागरी वेळ.**\n\n"
                "उद्या सकाळी किनाऱ्यालगतच्या मासेमारीसाठी हवामान अनुकूल आहे (लाटांची उंची: १.२ मीटर, वारे: १८ किमी/तास वायव्य). "
                "तथापि, दुपारी ११:३० नंतर उसळणाऱ्या लाटांची उंची २.६ मीटरपर्यंत वाढणार असून ४४ किमी/तास वेगाने सोसाट्याचे वारे वाहतील.\n\n"
                "**सल्ला:** सकाळी १०:३० पूर्वी बंदरात परत यावे; खोल समुद्रात जाणे टाळावे."
            ),
            "action": "सावधगिरी बाळगा: सकाळी ०६:०० ते १०:३० सुरक्षित सागरी वेळ सक्रिय. दुपारपूर्वी बंदरात परत या.",
            "why_bullets": [
                "सकाळच्या वेळी वारे (१८ किमी/तास) आणि लाटा (१.२ मीटर) लहान नौकांसाठी सुरक्षित मर्यादेत आहेत.",
                "दुपारी ११:३० नंतर लाटांची उंची २.६ मीटर आणि वाऱ्याचा वेग ४४ किमी/तास वाढण्याचा इशारा आहे.",
                "कोकण किनारपट्टीवर कोणत्याही चक्रीवादळाचा इशारा नाही.",
                "नौकेचा मार्ग संरक्षण सराव क्षेत्रांपासून सुरक्षित अंतरावर आहे."
            ]
        },
        "ta": {
            "answer": (
                "**கடல் பாதுகாப்பு மதிப்பீடு: காலை 06:00 முதல் 10:30 மணி வரை பாதுகாப்பான நேரம்.**\n\n"
                "நாளை காலை கடலோர மீன்பிடிப்புக்கு வானிலை சாதகமாக உள்ளது (அலை உயரம்: 1.2 மீட்டர், காற்று: 18 கிமீ/மணி வடமேற்கு). "
                "எனினும், மதியம் 11:30 மணிக்கு மேல் கடல் அலைகள் 2.6 மீட்டர் வரை உயர்ந்து, 44 கிமீ/மணி வேகத்தில் பலத்த காற்று வீசக்கூடும்.\n\n"
                "**பரிந்துரை:** காலை 10:30 மணிக்குள் கரை திரும்புங்கள்; ஆழ்கடல் செல்வதைத் தவிர்க்கவும்."
            ),
            "action": "பாதுகாப்பு எச்சரிக்கை: காலை 06:00 முதல் 10:30 வரை பாதுகாப்பானது. மதியத்திற்குள் கரை திரும்பவும்.",
            "why_bullets": [
                "அதிகாலை காற்று (18 கிமீ/மணி) மற்றும் அலைகள் (1.2 மீ) சிறிய படகுகளுக்கு பாதுகாப்பானவை.",
                "மதியம் 11:30 மணிக்கு மேல் அலை உயரம் 2.6 மீட்டராகவும் காற்று 44 கிமீ/மணியாகவும் அதிகரிக்க வாய்ப்புள்ளது.",
                "கடலோரப் பகுதியில் புயல் எச்சரிக்கை ஏதுமில்லை.",
                "படகின் பாதை தடைசெய்யப்பட்ட பகுதிகளைத் தவிர்த்து பாதுகாப்பாக உள்ளது."
            ]
        }
    },
    "pfz_safety_intelligence": {
        "en": {
            "answer": (
                "**Potential Fishing Zone Recommendation: PFZ Alpha (8.2 km Northwest) is HIGHLY RECOMMENDED.**\n\n"
                "Although PFZ Bravo is geographically closer (6.1 km), our Ocean Analytics and Weather Agents identified "
                "hazardous 2.7m breaker swells around Bravo that make it unsafe. "
                "PFZ Alpha offers optimal conditions: Sea Surface Temp of 28.1°C, rich chlorophyll-a bloom (2.15 mg/m³), "
                "and an Ocean Productivity Score of 86/100."
            ),
            "action": "RECOMMENDATION: Head to PFZ Alpha (8.2 km, Northwest). Avoid PFZ Bravo (6.1 km).",
            "why_bullets": [
                "PFZ Alpha (8.2 km) features a favorable thermal front (SST 28.1°C) and high chlorophyll-a (2.15 mg/m³).",
                "Productivity score at PFZ Alpha is 86/100, indicating dense pelagic schools (Mackerel, Yellowfin Tuna).",
                "Wave swells at PFZ Alpha are calm (1.2m) with safe operational bathymetry.",
                "PFZ Bravo is geographically closer (6.1 km), but wave conditions are currently HAZARDOUS (2.7m swell breakers)."
            ]
        },
        "hi": {
            "answer": (
                "**मत्स्य क्षेत्र सिफारिश: PFZ Alpha (8.2 किमी उत्तर-पश्चिम) अत्यधिक अनुशंसित है।**\n\n"
                "यद्यपि PFZ Bravo भौगोलिक रूप से 6.1 किमी पर पास है, उथले पानी में 2.7 मीटर की खतरनाक लहरों के कारण उसे असुरक्षित चिह्नित किया गया है। "
                "PFZ Alpha में समुद्री तापमान 28.1°C, उच्च क्लोरोफिल-ए (2.15 mg/m³) और 86/100 उत्पादकता स्कोर के साथ उत्कृष्ट परिस्थितियां हैं।"
            ),
            "action": "अनुशंसा: PFZ Alpha (8.2 किमी) की ओर जाएं। PFZ Bravo (6.1 किमी) से बचें।",
            "why_bullets": [
                "PFZ Alpha (8.2 किमी) में अनुकूल थर्मल फ्रंट (28.1°C) और उच्च क्लोरोफिल घनत्व है।",
                "उत्पादकता स्कोर 86/100 है, जो बांगड़ा और ट्यूना जैसी मछलियों के बड़े झुंड दर्शाता है।",
                "PFZ Alpha में समुद्र शांत (1.2 मीटर लहरें) और नौकायन के लिए पूर्णतः सुरक्षित है।",
                "PFZ Bravo पास होने के बावजूद 2.7 मीटर खतरनाक लहरों के कारण जोखिम भरा है।"
            ]
        },
        "mr": {
            "answer": (
                "**मासेमारी क्षेत्र शिफारस: PFZ Alpha (८.२ किमी वायव्य) अत्यंत शिफारसित आहे.**\n\n"
                "जरी PFZ Bravo ६.१ किमी जवळ असला, तरी तेथे २.७ मीटर धोकादायक उसळणाऱ्या लाटा असल्याने तो टाळावा. "
                "PFZ Alpha मध्ये २८.१°C तापमान, मुबलक प्लवंग (२.१५ mg/m³) आणि ८६/१०० उत्पादकता निर्देशांक असून मासेमारीसाठी उत्कृष्ट परिस्थिती आहे."
            ),
            "action": "सल्ला: PFZ Alpha कडे जा (८.२ किमी). PFZ Bravo (६.१ किमी) टाळा.",
            "why_bullets": [
                "PFZ Alpha (८.२ किमी) येथे अनुकूल सागरी तापमान (२८.१°C) आणि मुबलक प्लवंग आढळले आहे.",
                "उत्पादकता निर्देशांक ८६/१०० असून बांगडा आणि सुरमई माशांचे प्रमाण मुबलक आहे.",
                "PFZ Alpha येथे लाटा शांत (१.२ मीटर) असून नौकेसाठी सुरक्षित खोली आहे.",
                "PFZ Bravo जवळ असला तरी २.७ मीटर उसळणाऱ्या धोकादायक लाटांमुळे तो टाळावा."
            ]
        },
        "ta": {
            "answer": (
                "**மீன்பிடி மண்டல பரிந்துரை: PFZ Alpha (8.2 கிமீ வடமேற்கு) மிகவும் பரிந்துரைக்கப்படுகிறது.**\n\n"
                "PFZ Bravo 6.1 கிமீ தூரத்தில் இருந்தாலும், அங்கு 2.7 மீட்டர் ஆபத்தான அலைகள் உள்ளதால் தவிர்க்கப்பட வேண்டும். "
                "PFZ Alpha-வில் உகந்த வெப்பநிலை (28.1°C), அதிக குளோரோபில் (2.15 mg/m³) மற்றும் 86/100 உற்பத்தித்திறன் உள்ளது."
            ),
            "action": "பரிந்துரை: PFZ Alpha-விற்கு செல்லவும் (8.2 கிமீ). PFZ Bravo-வை தவிர்க்கவும்.",
            "why_bullets": [
                "PFZ Alpha (8.2 கிமீ) பகுதியில் உகந்த வெப்பநிலை (28.1°C) மற்றும் குளோரோபில் (2.15 mg/m³) உள்ளது.",
                "உற்பத்தித்திறன் 86/100, கானாங்கெளுத்தி மற்றும் சூரை மீன்கள் அதிகளவில் கிடைக்க வாய்ப்புள்ளது.",
                "PFZ Alpha-வில் அலைகள் மிதமாக (1.2 மீ) பாதுகாப்பாக உள்ளன.",
                "PFZ Bravo அருகில் இருந்தாலும் 2.7 மீட்டர் ஆபத்தான அலைகள் காரணமாக தவிர்க்கப்பட்டது."
            ]
        }
    },
    "pfz_discovery": {
        "en": {
            "answer": (
                "The nearest high-yield Potential Fishing Zone today is **PFZ Alpha**, located **8.2 km** Northwest of your position.\n\n"
                "• **Productivity Score:** 86/100\n"
                "• **Sea Surface Temp:** 28.1°C (Optimal thermal front)\n"
                "• **Chlorophyll-a:** 2.15 mg/m³ (Phytoplankton bloom)\n"
                "• **Target Species:** Indian Mackerel, Yellowfin Tuna, Ribbonfish\n"
                "• **Wave Risk:** Low (1.2m calm swell)"
            ),
            "action": "RECOMMENDATION: PFZ Alpha (8.2 km, Northwest) is today's top-ranked fishing zone.",
            "why_bullets": [
                "Satellite SST analysis confirms active thermal front with 28.1°C optimal temperature.",
                "Ocean color sensors reveal elevated chlorophyll-a concentration (2.15 mg/m³).",
                "Primary expected species: Indian Mackerel, Yellowfin Tuna, and Ribbonfish.",
                "Safe distance of 8.2 km is within comfortable artisanal fuel range."
            ]
        },
        "hi": {
            "answer": (
                "आज आपके स्थान से सबसे नजदीकी उच्च उत्पादक मत्स्य क्षेत्र **PFZ Alpha** है, जो **8.2 किमी** उत्तर-पश्चिम में स्थित है।\n\n"
                "• **उत्पादकता स्कोर:** 86/100\n"
                "• **समुद्री सतह तापमान:** 28.1°C (अनुकूल)\n"
                "• **क्लोरोफिल-ए:** 2.15 mg/m³ (प्रचुर प्लवक)\n"
                "• **प्रमुख प्रजातियां:** भारतीय बांगड़ा (Mackerel), टूना, रिबनफिश\n"
                "• **लहरों का जोखिम:** निम्न (1.2 मीटर शांत लहरें)"
            ),
            "action": "अनुशंसा: PFZ Alpha (8.2 किमी) आज का सर्वश्रेष्ठ मत्स्य क्षेत्र है।",
            "why_bullets": [
                "उपग्रह महासागर विश्लेषण 28.1°C के अनुकूल तापमान की पुष्टि करता है।",
                "क्लोरोफिल सेंसर 2.15 mg/m³ की उच्च सांद्रता दर्शाते हैं।",
                "अपेक्षित प्रमुख प्रजातियां: बांगड़ा, टूना और रिबनफिश।",
                "8.2 किमी की दूरी पारंपरिक नौकाओं की ईंधन क्षमता के भीतर है।"
            ]
        },
        "mr": {
            "answer": (
                "आज तुमच्या स्थानावरून सर्वात जवळचे उत्तम संभाव्य मासेमारी क्षेत्र **PFZ Alpha** असून ते **८.२ किमी** वायव्य दिशेला आहे.\n\n"
                "• **उत्पादकता निर्देशांक:** ८६/१००\n"
                "• **सागरी पृष्ठभाग तापमान:** २८.१°C (अनुकूल)\n"
                "• **क्लोरोफिल-ए:** २.१५ mg/m³ (मुबलक प्लवंग)\n"
                "• **प्रमुख मासे:** बांगडा (Mackerel), सुरमई (Tuna), रिबनफिश\n"
                "• **लाटांचा धोका:** कमी (१.२ मीटर शांत लाटा)"
            ),
            "action": "सल्ला: PFZ Alpha (८.२ किमी) हे आजचे सर्वोत्तम मासेमारी क्षेत्र आहे.",
            "why_bullets": [
                "उपग्रह विश्लेषणानुसार २८.१°C हे माशांसाठी पोषक तापमान निश्चित झाले आहे.",
                "क्लोरोफिल सेन्सर मुबलक प्लवंगाचे अस्तित्व (२.१५ mg/m³) दाखवत आहेत.",
                "अपेक्षित प्रमुख मासे: बांगडा, सुरमई आणि रिबनफिश.",
                "८.२ किमीचे अंतर लहान नौकांच्या सुरक्षित इंधन मर्यादेत आहे."
            ]
        },
        "ta": {
            "answer": (
                "இன்று உங்கள் படகிற்கு அருகிலுள்ள அதிக விளைச்சல் தரும் மீன்பிடி மண்டலம் **PFZ Alpha**, இது **8.2 கிமீ** வடமேற்கில் உள்ளது.\n\n"
                "• **உற்பத்தித்திறன் குறியீடு:** 86/100\n"
                "• **கடல் மேற்பரப்பு வெப்பநிலை:** 28.1°C (சாதகமானது)\n"
                "• **குளோரோபில்-ஏ:** 2.15 mg/m³\n"
                "• **முக்கிய மீன் வகைகள்:** கானாங்கெளுத்தி (Mackerel), சூரை (Tuna), காரல்\n"
                "• **அலை ஆபத்து:** குறைவு (1.2 மீட்டர் அமைதியான அலைகள்)"
            ),
            "action": "பரிந்துரை: PFZ Alpha (8.2 கிமீ) இன்றைய சிறந்த மீன்பிடி மண்டலம்.",
            "why_bullets": [
                "செயற்கைக்கோள் தரவு 28.1°C சாதகமான கடல் வெப்பநிலையை உறுதிப்படுத்துகிறது.",
                "குளோரோபில் அளவு 2.15 mg/m³ என அதிகமாக பதிவாகியுள்ளது.",
                "எதிர்பார்க்கப்படும் மீன் வகைகள்: கானாங்கெளுத்தி, சூரை மற்றும் காரல்.",
                "8.2 கிமீ தூரம் குறைந்த எரிபொருள் செலவில் அடையக்கூடியது."
            ]
        }
    },
    "safe_route_planning": {
        "en": {
            "answer": (
                "**Navigational Route Recommendation: Choose Route B (16.2 km, ~61 mins).**\n\n"
                "While direct Route A appears shorter on paper (12.2 km), our Geospatial and Risk Agents detected "
                "hazardous 2.7m breaker waves and a dangerous proximity (< 1.8 km) to the Naval defense exercise area. "
                "Route B detours safely through the deep shipping fairway, completely bypassing all hazard zones."
            ),
            "action": "RECOMMENDATION: Take Route B (Safe Fairway Detour). Avoid Direct Route A.",
            "why_bullets": [
                "Route A is 4 km shorter (12.2 km vs 16.2 km), but passes directly through active swell shoals with 2.7m wave breaking.",
                "Route A infringes upon the Western Naval Command live firing buffer perimeter (< 1.8 km clearance).",
                "Route B navigates through deep, sheltered shipping fairway with safe bathymetry (> 25m depth).",
                "Route B adds ~15 minutes of cruising time but reduces composite navigational risk from 68/100 (HIGH) to 22/100 (LOW)."
            ]
        },
        "hi": {
            "answer": (
                "**सुरक्षित मार्ग सिफारिश: रूट B (16.2 किमी, ~61 मिनट) चुनें।**\n\n"
                "यद्यपि सीधा मार्ग 'रूट A' (12.2 किमी) छोटा दिखता है, हमारे विश्लेषण ने वहां 2.7 मीटर की खतरनाक लहरें और नौसेना फायरिंग क्षेत्र (<1.8 किमी) की निकटता पाई है। "
                "'रूट B' गहरे फेयरवे से होकर सुरक्षित चक्कर लगाता है और सभी खतरों से बचाता है।"
            ),
            "action": "अनुशंसा: सुरक्षित रूट B (फेयरवे डिटूर) चुनें। सीधे रूट A से बचें।",
            "why_bullets": [
                "रूट A छोटा है परंतु 2.7 मीटर ऊंची खतरनाक लहरों वाले क्षेत्र से गुजरता है।",
                "रूट A पश्चिमी नौसेना कमान के फायरिंग बफर क्षेत्र के बहुत नजदीक (<1.8 किमी) है।",
                "रूट B गहरे पानी (>25 मीटर गहराई) के सुरक्षित नौवहन चैनल से होकर जाता है।",
                "रूट B में केवल 15 मिनट अधिक लगते हैं, पर नौवहन जोखिम 68 से घटकर 22 (सुरक्षित) हो जाता है।"
            ]
        },
        "mr": {
            "answer": (
                "**सुरक्षित मार्ग शिफारस: रूट B (१६.२ किमी, ~६१ मिनिटे) फेअरवे निवडा.**\n\n"
                "थेट रूट A (१२.२ किमी) जरी जवळचा वाटला, तरी तेथे २.७ मीटर धोकादायक लाटा आणि नौदल सराव क्षेत्राचे (<१.८ किमी) उल्लंघन होते. "
                "रूट B खोल सुरक्षित सागरी मार्गाने जात असल्याने पूर्णपणे सुरक्षित आहे."
            ),
            "action": "सल्ला: सुरक्षित फेअरवे रूट B निवडा (१६.२ किमी). थेट रूट A टाळा.",
            "why_bullets": [
                "रूट A कमी अंतराचा असला तरी २.७ मीटर उसळणाऱ्या धोकादायक लाटांमधून जातो.",
                "रूट A नौदल गोळीबार क्षेत्राच्या सुरक्षित हद्दीजवळून (<१.८ किमी) जातो.",
                "रूट B खोल व सुरक्षित सागरी वाहतूक पट्ट्यातून (>२५ मीटर खोली) जातो.",
                "रूट B मुळे १५ मिनिटे जास्त लागतात, परंतु नौकेचा प्रवास पूर्ण सुरक्षित राहतो."
            ]
        },
        "ta": {
            "answer": (
                "**பாதுகாப்பான பாதை பரிந்துரை: பாதை B (16.2 கிமீ, ~61 நிமிடங்கள்) தேர்ந்தெடுக்கவும்.**\n\n"
                "நேரடி பாதை A (12.2 கிமீ) தூரம் குறைவாக இருந்தாலும், அங்கு 2.7 மீட்டர் ஆபத்தான அலைகளும் கடற்படை பயிற்சி பகுதியும் (<1.8 கிமீ) உள்ளன. "
                "பாதை B ஆழமான பாதுகாப்பான கடல் வழியில் செல்வதால் முழு பாதுகாப்பு அளிக்கிறது."
            ),
            "action": "பரிந்துரை: பாதுகாப்பான வழித்தடம் பாதை B தேர்ந்தெடுக்கவும். நேரடி பாதை A-வை தவிர்க்கவும்.",
            "why_bullets": [
                "பாதை A குறுகியதாக இருந்தாலும் 2.7 மீட்டர் ஆபத்தான அலைகள் கொண்ட பகுதியில் செல்கிறது.",
                "பாதை A கடற்படை துப்பாக்கிச் சூடு பயிற்சி எல்லைக்கு மிக அருகில் (<1.8 கிமீ) செல்கிறது.",
                "பாதை B ஆழமான (>25 மீ) பாதுகாப்பான கப்பல் வழித்தடத்தின் வழியே செல்கிறது.",
                "பாதை B 15 நிமிடங்கள் கூடுதல் நேரமெடுத்தாலும் விபத்து அபாயத்தை 68-லிருந்து 22-ஆக குறைக்கிறது."
            ]
        }
    },
    "geofence_boundary_check": {
        "en": {
            "answer": (
                "**Boundary Proximity Alert: 4.2 km remaining to International Maritime Boundary Line (IMBL)!**\n\n"
                "Your current vessel position is approaching the international maritime boundary line. "
                "Artisanal and commercial vessels must maintain a minimum 10 km safety perimeter.\n\n"
                "**Recommended Action:** Turn vessel westward (heading 270°) immediately to return to safe operating waters."
            ),
            "action": "WARNING: You are 4.2 km from maritime boundary. Adjust course westward (270°) immediately.",
            "why_bullets": [
                "Vessel coordinates indicate heading toward International Maritime Boundary Line.",
                "Buffer distance remaining (4.2 km) is within the high-alert threshold (< 5.0 km).",
                "Artisanal craft crossing international maritime demarcations risk detention and vessel seizure.",
                "Recommended course heading: 270° (due West) maintains safe buffer inside Indian territorial waters."
            ]
        },
        "hi": {
            "answer": (
                "**सीमा निकटता चेतावनी: अंतरराष्ट्रीय समुद्री सीमा (IMBL) से केवल 4.2 किमी शेष!**\n\n"
                "आपकी नौका की स्थिति अंतरराष्ट्रीय समुद्री सीमा रेखा की ओर बढ़ रही है। "
                "पारंपरिक नौकाओं को न्यूनतम 10 किमी का सुरक्षा घेरा बनाए रखना आवश्यक है।\n\n"
                "**तात्कालिक कार्रवाई:** तुरंत नौका का मुंह पश्चिम (270° हेडिंग) की ओर मोड़ें और भारतीय जलक्षेत्र में सुरक्षित रहें।"
            ),
            "action": "चेतावनी: सीमा से केवल 4.2 किमी दूरी। तुरंत पश्चिम (270°) की ओर मुड़ें।",
            "why_bullets": [
                "नौका के जीपीएस निर्देशांक अंतरराष्ट्रीय समुद्री सीमा रेखा के समीप हैं।",
                "शेष दूरी (4.2 किमी) उच्च चेतावनी सीमा (<5.0 किमी) के भीतर है।",
                "अंतरराष्ट्रीय सीमा पार करने से नौका जब्ती और कानूनी कार्रवाई का गंभीर खतरा है।",
                "सुझाई गई हेडिंग 270° (पश्चिम) नौका को सुरक्षित भारतीय जलक्षेत्र में बनाए रखेगी।"
            ]
        },
        "mr": {
            "answer": (
                "**सागरी सीमा इशारा: आंतरराष्ट्रीय सागरी सीमेपासून (IMBL) केवळ ४.२ किमी अंतर उरले आहे!**\n\n"
                "तुमची नौका आंतरराष्ट्रीय सागरी सीमेकडे जात असल्याचे आढळले आहे. "
                "भारतीय हद्दीत किमान १० किमी सुरक्षित अंतर राखणे आवश्यक आहे.\n\n"
                "**तातडीची कृती:** भारतीय सागरी हद्दीत राहण्यासाठी नौकेचे तोंड तातडीने पश्चिमेकडे (२७०° हेडिंग) वळवा."
            ),
            "action": "इशारा: सीमेपासून केवळ ४.२ किमी. तातडीने पश्चिमेकडे (२७०°) वळा.",
            "why_bullets": [
                "नौकेचे जीपीएस स्थान आंतरराष्ट्रीय सागरी सीमेजवळ जात असल्याचे दाखवत आहे.",
                "उर्वरित अंतर (४.२ किमी) उच्च सतर्कता मर्यादेत (<५.० किमी) आहे.",
                "आंतरराष्ट्रीय सीमा ओलांडल्यास नौका जप्ती व अटकेचा मोठा धोका संभवतो.",
                "२७०° (पश्चिम) हेडिंग घेतल्यास नौका सुरक्षित भारतीय सागरी हद्दीत राहील."
            ]
        },
        "ta": {
            "answer": (
                "**கடல் எல்லை எச்சரிக்கை: சர்வதேச கடல் எல்லைக்கு (IMBL) இன்னும் 4.2 கிமீ மட்டுமே உள்ளது!**\n\n"
                "உங்கள் படகு சர்வதேச எல்லையை நோக்கிச் செல்கிறது. "
                "இந்திய கடல் பகுதிக்குள் குறைந்தபட்சம் 10 கிமீ இடைவெளி பராமரிக்கப்பட வேண்டும்.\n\n"
                "**உடனடி நடவடிக்கை:** இந்திய எல்லைக்குள் பாதுகாப்பாக இருக்க உடனடியாக மேற்கு நோக்கி (270° திசை) படகைத் திருப்புங்கள்."
            ),
            "action": "எச்சரிக்கை: எல்லைக்கு 4.2 கிமீ தூரம். உடனடியாக மேற்கு நோக்கி (270°) திரும்பவும்.",
            "why_bullets": [
                "படகு சர்வதேச கடல் எல்லையை நோக்கி நகர்ந்து கொண்டிருக்கிறது.",
                "மீதமுள்ள தூரம் (4.2 கிமீ) தீவிர எச்சரிக்கை வரம்பிற்குள் (< 5.0 கிமீ) உள்ளது.",
                "சர்வதேச எல்லையைத் தாண்டினால் படகு பறிமுதல் மற்றும் கைது அபாயம் உள்ளது.",
                "மேற்கு திசையில் (270°) பயணிப்பது இந்திய எல்லைக்குள் பாதுகாப்பை உறுதி செய்யும்."
            ]
        }
    },
    "general_marine_consultation": {
        "en": {
            "answer": (
                "Current marine intelligence assessment in your operating sector:\n\n"
                "• **Marine Risk Score:** 35/100 (Safe)\n"
                "• **Weather:** Wind 18 km/h NW, Waves 1.2m, Visibility Good\n"
                "• **Ocean:** SST 28.1°C, Chlorophyll 2.15 mg/m³\n"
                "• **Boundary Status:** Safe (> 18 km from international boundary)\n"
                "• **Advisory:** Safe coastal operations permissible with standard vigilance."
            ),
            "action": "NORMAL OPERATIONS: Conditions favorable. Exercise standard marine vigilance.",
            "why_bullets": [
                "Atmospheric winds and wave swells are within safe parameters.",
                "Sea Surface Temperature steady at 28.1°C with active ocean productivity.",
                "Vessel position maintains safe distance from all maritime boundaries.",
                "Continuous coastal VHF monitoring operational."
            ]
        },
        "hi": {
            "answer": (
                "आपके वर्तमान समुद्री क्षेत्र की स्थिति का संक्षिप्त विवरण:\n\n"
                "• **समुद्री जोखिम स्कोर:** 35/100 (सुरक्षित)\n"
                "• **मौसम:** हवा 18 किमी/घंटा उत्तर-पश्चिम, लहरें 1.2 मीटर, दृश्यता उत्तम\n"
                "• **महासागर:** तापमान 28.1°C, क्लोरोफिल 2.15 mg/m³\n"
                "• **सीमा स्थिति:** सुरक्षित (अंतरराष्ट्रीय सीमा से >18 किमी दूर)\n"
                "• **सलाह:** सामान्य सावधानी के साथ तटीय परिचालन पूरी तरह सुरक्षित है।"
            ),
            "action": "सामान्य परिचालन: परिस्थितियां अनुकूल। सामान्य समुद्री सतर्कता बनाए रखें।",
            "why_bullets": [
                "हवा की गति और समुद्री लहरें सामान्य और सुरक्षित स्तर पर हैं।",
                "समुद्री सतह का तापमान 28.1°C है और मत्स्य उत्पादकता अच्छी है।",
                "नौका सभी अंतरराष्ट्रीय और प्रतिबंधित सीमाओं से सुरक्षित दूरी पर है।",
                "तटीय रेडियो और आपातकालीन संपर्क प्रणाली सुचारू रूप से कार्यरत है।"
            ]
        },
        "mr": {
            "answer": (
                "तुमच्या चालू सागरी विभागातील परिस्थितीचा सारांश:\n\n"
                "• **सागरी धोका निर्देशांक:** ३५/१०० (सुरक्षित)\n"
                "• **हवामान:** वारे १८ किमी/तास वायव्य, लाटा १.२ मीटर, दृश्यता उत्तम\n"
                "• **समुद्र:** तापमान २८.१°C, प्लवंग २.१५ mg/m³\n"
                "• **सीमा स्थिती:** सुरक्षित (आंतरराष्ट्रीय सीमेपासून >१८ किमी दूर)\n"
                "• **सल्ला:** नेहमीची दक्षता बाळगून मासेमारी करणे सुरक्षित आहे."
            ),
            "action": "सामान्य परिचालन: स्थिती अनुकूल. नेहमीची सागरी दक्षता बाळगा.",
            "why_bullets": [
                "वाऱ्याचा वेग आणि लाटांची उंची सामान्य सुरक्षित मर्यादेत आहेत.",
                "सागरी पाण्याचे तापमान २८.१°C असून मत्स्य उत्पादकता चांगली आहे.",
                "नौका सर्व सागरी सीमा आणि प्रतिबंधित क्षेत्रांपासून सुरक्षित अंतरावर आहे.",
                "किनारपट्टी रेडिओ संपर्क सुरळीत चालू आहे."
            ]
        },
        "ta": {
            "answer": (
                "உங்கள் கடல் பகுதிக்கான தற்போதைய நிலை அறிக்கை:\n\n"
                "• **இடர் குறியீடு:** 35/100 (பாதுகாப்பானது)\n"
                "• **வானிலை:** காற்று 18 கிமீ/மணி வடமேற்கு, அலைகள் 1.2 மீ, பார்வை தெளிவு நன்று\n"
                "• **கடல் சூழல்:** வெப்பநிலை 28.1°C, குளோரோபில் 2.15 mg/m³\n"
                "• **எல்லை நிலை:** பாதுகாப்பானது (சர்வதேச எல்லைக்கு >18 கிமீ தொலைவில்)\n"
                "• **ஆலோசனை:** வழக்கமான எச்சரிக்கையுடன் கடலில் மீன்பிடிக்கலாம்."
            ),
            "action": "வழக்கமான இயக்கம்: கடல் சூழல் சாதகமானது. இயல்பான பாதுகாப்புடன் செயல்படவும்.",
            "why_bullets": [
                "காற்றின் வேகம் மற்றும் கடல் அலைகள் பாதுகாப்பான வரம்பிற்குள் உள்ளன.",
                "கடல் வெப்பநிலை 28.1°C ஆகவும் மீன் உற்பத்தி சாதகமாகவும் உள்ளது.",
                "படகு சர்வதேச எல்லைகளில் இருந்து பாதுகாப்பான தொலைவில் உள்ளது.",
                "கடலோர தகவல் தொடர்பு இணைப்பு சீராக செயல்படுகிறது."
            ]
        }
    }
}


def get_localized_intent_content(intent: str, lang: str = "en") -> Dict[str, Any]:
    """
    Retrieves pure, complete localized content (answer, action, why_bullets)
    without any English boilerplate or meta headers.
    """
    intent_key = intent if intent in INTENT_LOCALIZATIONS else "general_marine_consultation"
    lang_key = lang if lang in ["hi", "mr", "ta", "en"] else "en"

    content = INTENT_LOCALIZATIONS[intent_key].get(lang_key)
    if not content:
        content = INTENT_LOCALIZATIONS[intent_key]["en"]
    return content


def get_localized_response(key: str, lang: str = "en") -> str:
    """Legacy helper for single string lookup."""
    content = get_localized_intent_content(key, lang)
    return content.get("answer", "")