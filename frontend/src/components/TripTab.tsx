// frontend/src/components/TripTab.tsx
import React, { useState } from 'react';
import {
  Navigation, CheckCircle2, AlertTriangle, ShieldCheck, MapPin,
  Clock, ArrowRight, Compass, ShieldAlert, Waves
} from 'lucide-react';
import type { PFZZone, WeatherData, RouteOption } from '../types/marine';

interface TripTabProps {
  zones: PFZZone[];
  vesselLocation: { latitude: number; longitude: number; name?: string };
  weather: WeatherData;
  routes: RouteOption[];
  language: string;
  selectedZone?: PFZZone | null;
  mapElement?: React.ReactNode;
  onPlanRoute: (zone: PFZZone) => Promise<void>;
}

const LABELS: Record<string, Record<string, string>> = {
  title:            { en: 'Safe Trip Planner', hi: 'सुरक्षित यात्रा योजना', mr: 'सुरक्षित प्रवास नियोजन', ta: 'பாதுகாப்பான பயணத் திட்டம்' },
  subtitle:         { en: 'Step-by-step route guidance with automatic reef & border avoidance', hi: 'चट्टानों और सीमा से बचने के लिए स्वचालित सुरक्षित मार्ग', mr: 'खडक आणि सागरी हद्द टाळणारा सुरक्षित मार्ग', ta: 'பாறைகள் மற்றும் எல்லைகளைத் தவிர்க்கும் பாதுகாப்பான வழி' },
  step1:            { en: '1. Select Fishing Destination', hi: '1. गंतव्य स्थान चुनें', mr: '१. गंतव्य निवडा', ta: '1. இலக்கைத் தேர்ந்தெடுக்கவும்' },
  step2:            { en: '2. Safety & Voyage Check', hi: '2. सुरक्षा जांच', mr: '२. सुरक्षितता तपासणी', ta: '2. பாதுகாப்பு சரிபார்ப்பு' },
  step3:            { en: '3. Safe Route Calculated', hi: '3. सुरक्षित मार्ग तैयार', mr: '३. सुरक्षित मार्ग तयार', ta: '3. பாதுகாப்பான பாதை' },
  est_time:         { en: 'Est. Transit Time', hi: 'अनुमानित यात्रा समय', mr: 'अंदाजे वेळ', ta: 'மதிப்பிடப்பட்ட நேரம்' },
  distance:         { en: 'Distance', hi: 'दूरी', mr: 'अंतर', ta: 'தூரம்' },
  sea:              { en: 'Sea State', hi: 'समुद्र स्थिति', mr: 'समुद्र स्थिती', ta: 'கடல் நிலை' },
  wind:             { en: 'Wind Speed', hi: 'हवा की गति', mr: 'वाऱ्याचा वेग', ta: 'காற்று வேகம்' },
  plan_btn:         { en: 'Check Conditions & Calculate Safe Route', hi: 'सुरक्षित मार्ग बनाएं', mr: 'सुरक्षित मार्ग तयार करा', ta: 'பாதுகாப்பான பாதையை உருவாக்குங்கள்' },
  calculating:      { en: 'Analyzing safe passage...', hi: 'मार्ग की जाँच हो रही है...', mr: 'सुरक्षित मार्ग तपासत आहे...', ta: 'பாதை கணக்கிடப்படுகிறது...' },
  recommended:      { en: 'Recommended Safe Route', hi: 'अनुशंसित सुरक्षित मार्ग', mr: 'शिफारस केलेला सुरक्षित मार्ग', ta: 'பரிந்துரைக்கப்பட்ட பாதை' },
  alternative:      { en: 'Direct Alternative', hi: 'सीधा विकल्प (जोखिम भरा)', mr: 'पर्यायी थेट मार्ग', ta: 'மாற்றுப் பாதை' },
  avoid_reason:     { en: 'Safety Advice', hi: 'सुरक्षा सलाह', mr: 'सुरक्षा सल्ला', ta: 'பாதுகாப்பு ஆலோசனை' },
  select_prompt:    { en: 'Tap a fishing zone below to begin navigation check:', hi: 'शुरू करने के लिए नीचे किसी क्षेत्र पर टैप करें:', mr: 'सुरु करण्यासाठी खालील क्षेत्रावर टॅप करा:', ta: 'தொடங்க கீழே உள்ள பகுதியைத் தட்டவும்:' },
};

export const TripTab: React.FC<TripTabProps> = ({
  zones,
  vesselLocation,
  weather,
  routes,
  language,
  selectedZone: initialZone,
  mapElement,
  onPlanRoute
}) => {
  const lang = ['en', 'hi', 'mr', 'ta'].includes(language) ? language : 'en';

  const [activeZone, setActiveZone] = useState<PFZZone | null>(
    initialZone || zones[0] || null
  );
  const [isCalculating, setIsCalculating] = useState(false);

  const handleSelectZone = (zone: PFZZone) => {
    setActiveZone(zone);
  };

  const handleExecutePlan = async () => {
    if (!activeZone) return;
    setIsCalculating(true);
    try {
      await onPlanRoute(activeZone);
    } finally {
      setIsCalculating(false);
    }
  };

  // Safe travel time estimation (assuming ~12 knots = 22 km/h)
  const estMins = activeZone ? Math.round((activeZone.distance_km / 22) * 60) : 45;

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 space-y-5">
      {/* ── Header ── */}
      <header>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
          <Navigation className="w-5 h-5 text-blue-600" />
          <span>{LABELS.title[lang]}</span>
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          {LABELS.subtitle[lang]}
        </p>
      </header>

      {/* ── Embedded Map Section ── */}
      {mapElement && (
        <section aria-label="Route Navigation Map" className="rounded-2xl overflow-hidden border border-slate-200 shadow-xs h-[260px] sm:h-[340px] w-full relative">
          {mapElement}
        </section>
      )}

      {/* ── Step 1: Select Destination ── */}
      <section aria-label="Step 1 Destination Selection" className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            {LABELS.step1[lang]}
          </h2>
          {activeZone && (
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              ✓ {activeZone.name}
            </span>
          )}
        </div>

        <p className="text-xs text-slate-600">{LABELS.select_prompt[lang]}</p>

        {/* Zone chips */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {zones.map((zone) => {
            const isSelected = activeZone?.id === zone.id;
            return (
              <button
                key={zone.id}
                type="button"
                onClick={() => handleSelectZone(zone)}
                className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between min-h-[52px] ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/80 shadow-xs ring-1 ring-blue-600'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div>
                  <h3 className={`text-sm font-bold ${isSelected ? 'text-blue-900' : 'text-slate-800'}`}>
                    {zone.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500">
                    <span>📍 {zone.distance_km.toFixed(1)} km</span>
                    <span>•</span>
                    <span>🌊 {zone.wave_risk === 'LOW' ? 'Calm' : 'Moderate'}</span>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center border shrink-0 ${
                  isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300'
                }`}>
                  {isSelected && <span className="text-xs">✓</span>}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Step 2: Trip Summary & Calculation ── */}
      {activeZone && (
        <section aria-label="Step 2 Voyage Summary" className="bg-white rounded-2xl border border-slate-200 p-4 space-y-4 shadow-xs">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            {LABELS.step2[lang]}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
              <span className="text-[11px] text-slate-400 font-medium block">{LABELS.distance[lang]}</span>
              <strong className="text-slate-800 text-base font-bold">{activeZone.distance_km.toFixed(1)} km</strong>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
              <span className="text-[11px] text-slate-400 font-medium block">{LABELS.est_time[lang]}</span>
              <strong className="text-slate-800 text-base font-bold">~{estMins} min</strong>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
              <span className="text-[11px] text-slate-400 font-medium block">{LABELS.sea[lang]}</span>
              <strong className="text-slate-800 text-base font-bold">{weather.wave_height_m.toFixed(1)} m</strong>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
              <span className="text-[11px] text-slate-400 font-medium block">{LABELS.wind[lang]}</span>
              <strong className="text-slate-800 text-base font-bold">{Math.round(weather.wind_speed_kmh)} km/h</strong>
            </div>
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={handleExecutePlan}
            disabled={isCalculating}
            className="w-full flex items-center justify-center gap-2 px-5 py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-400 text-white rounded-2xl font-bold text-base shadow-sm transition-all min-h-[56px]"
          >
            <Compass className={`w-5 h-5 ${isCalculating ? 'animate-spin' : ''}`} />
            <span>{isCalculating ? LABELS.calculating[lang] : LABELS.plan_btn[lang]}</span>
          </button>
        </section>
      )}

      {/* ── Step 3: Route Options Result (Level 1: Simple comparison) ── */}
      {routes.length > 0 && (
        <section aria-label="Step 3 Calculated Routes" className="space-y-3">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
            {LABELS.step3[lang]}
          </h2>

          <div className="space-y-3">
            {routes.map((rt) => {
              const isRecommended = rt.is_recommended;
              return (
                <div
                  key={rt.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isRecommended
                      ? 'bg-emerald-50/70 border-emerald-300 shadow-xs'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      {isRecommended ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                      )}
                      <div>
                        <h3 className={`text-base font-bold ${isRecommended ? 'text-emerald-950' : 'text-slate-800'}`}>
                          {isRecommended ? LABELS.recommended[lang] : LABELS.alternative[lang]}
                        </h3>
                        <p className="text-xs text-slate-500">{rt.name}</p>
                      </div>
                    </div>

                    <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                      isRecommended ? 'bg-emerald-200 text-emerald-900' : 'bg-amber-100 text-amber-900'
                    }`}>
                      {isRecommended ? 'SAFE PASSAGE' : 'HIGHER SWELL'}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-700 my-2.5 py-1.5 border-y border-black/5">
                    <span>📏 {rt.distance_km.toFixed(1)} km</span>
                    <span>⏱ ~{rt.travel_time_mins} min</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-snug">
                    {rt.why_chosen_or_avoided}
                  </p>

                  {rt.warnings.length > 0 && (
                    <div className="mt-2 text-xs text-amber-800 bg-amber-100/70 p-2.5 rounded-xl border border-amber-200 flex items-start gap-1.5">
                      <ShieldAlert className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                      <span>{rt.warnings.join(' • ')}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};
