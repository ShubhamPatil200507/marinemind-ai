// frontend/src/components/HomeTab.tsx
import React from 'react';
import {
  MapPin, Anchor, Navigation, MessageCircle, Mic, RefreshCw,
  ArrowRight, ShieldAlert, Sparkles, Compass
} from 'lucide-react';
import { StatusCard } from './StatusCard';
import { ConditionCards } from './ConditionCards';
import { FishingSpotCard } from './FishingSpotCard';
import { WarningBanner } from './WarningBanner';
import { AdvancedDetails } from './AdvancedDetails';
import type { WeatherData, PFZZone, MarineAdvisory } from '../types/marine';

interface HomeTabProps {
  weather: WeatherData;
  pfzZones: PFZZone[];
  alerts: MarineAdvisory[];
  riskScore: number;
  riskLevel: string;
  vesselLocation: { latitude: number; longitude: number; name?: string };
  language: string;
  dataStatus: 'LIVE' | 'UNAVAILABLE' | 'UNKNOWN';
  lastUpdated?: string;
  onNavigate: (tab: 'home' | 'spots' | 'trip' | 'ask' | 'profile') => void;
  onSendQuickMessage: (msg: string) => void;
  onRefresh: () => void;
  onOpenLocationModal?: () => void;
}

const GREETINGS: Record<string, { morning: string; afternoon: string; evening: string }> = {
  en: { morning: 'Good morning', afternoon: 'Good afternoon', evening: 'Good evening' },
  hi: { morning: 'शुभ प्रभात', afternoon: 'नमस्कार', evening: 'शुभ संध्या' },
  mr: { morning: 'शुभ प्रभात', afternoon: 'शुभ दुपार', evening: 'शुभ संध्याकाळ' },
  ta: { morning: 'காலை வணக்கம்', afternoon: 'மதிய வணக்கம்', evening: 'மாலை வணக்கம்' },
};

const LABELS: Record<string, Record<string, string>> = {
  captain:             { en: 'Captain', hi: 'कप्तान', mr: 'कॅप्टन', ta: 'கேப்டன்' },
  todays_conditions:   { en: "Today's Fishing Conditions", hi: 'आज की समुद्री स्थिति', mr: 'आजची मासेमारी स्थिती', ta: 'இன்றைய மீன்பிடி நிலைமை' },
  find_spots:          { en: 'Find Fishing Spots', hi: 'मछली पकड़ने के स्थान खोजें', mr: 'मासेमारी ठिकाणे शोधा', ta: 'மீன்பிடி பகுதிகளைக் காண்க' },
  plan_trip:           { en: 'Plan Safe Trip', hi: 'सुरक्षित यात्रा योजना बनाएं', mr: 'सुरक्षित प्रवास आखा', ta: 'பாதுகாப்பான பயணம்' },
  ask_assistant:       { en: 'Ask MarineMind Copilot', hi: 'मरीनमाइंड से पूछें', mr: 'मरीनमाइंडला विचारा', ta: 'MarineMind-யிடம் கேட்கவும்' },
  nearby_spot:         { en: 'Nearby Fishing Opportunity', hi: 'निकटतम मछली क्षेत्र', mr: 'जवळचे मासेमारी क्षेत्र', ta: 'அருகிலுள்ள மீன்பிடி பகுதி' },
  quick_questions:     { en: 'Quick Inquiries', hi: 'त्वरित प्रश्न', mr: 'जलद प्रश्न', ta: 'விரைவு கேள்விகள்' },
  q_can_i_fish:        { en: 'Can I go fishing today?', hi: 'क्या आज मछली पकड़ने जाना सुरक्षित है?', mr: 'आज मासेमारीला जाऊ का?', ta: 'இன்று மீன்பிடிக்கப் போகலாமா?' },
  q_where_to_fish:     { en: 'Where should I go fishing?', hi: 'मुझे कहाँ जाना चाहिए?', mr: 'कोणत्या दिशेला जाऊ?', ta: 'எங்கு மீன்பிடிக்க வேண்டும்?' },
  q_any_warning:       { en: 'Are there any storm warnings?', hi: 'क्या कोई चेतावनी है?', mr: 'काही धोक्याची सूचना आहे का?', ta: 'ஏதேனும் புயல் எச்சரிக்கை உள்ளதா?' },
  change_location:     { en: 'Change Port / Sector', hi: 'बंदरगाह बदलें', mr: 'बंदर बदला', ta: 'துறைமுகத்தை மாற்று' },
};

export const HomeTab: React.FC<HomeTabProps> = ({
  weather,
  pfzZones,
  alerts,
  riskScore,
  riskLevel,
  vesselLocation,
  language,
  dataStatus,
  lastUpdated,
  onNavigate,
  onSendQuickMessage,
  onRefresh,
  onOpenLocationModal
}) => {
  const lang = ['en', 'hi', 'mr', 'ta'].includes(language) ? language : 'en';

  const hour = new Date().getHours();
  const timePeriod = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';
  const greeting = GREETINGS[lang]?.[timePeriod] ?? GREETINGS['en'][timePeriod];

  // Best recommended spot
  const recommendedSpot = pfzZones.find(z =>
    z.recommendation?.toUpperCase() === 'HIGHLY_RECOMMENDED' ||
    z.recommendation?.toUpperCase() === 'RECOMMENDED'
  ) || pfzZones[0];

  // Filter high priority alerts
  const criticalAlerts = alerts.filter(a =>
    a.severity?.toUpperCase() === 'CRITICAL' ||
    a.severity?.toUpperCase() === 'WARNING' ||
    a.severity?.toUpperCase() === 'CAUTION'
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-5 space-y-5">
      {/* ── Top Header / Sector & Greeting ── */}
      <header className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            {greeting}, {LABELS.captain[lang]}
          </p>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
            {LABELS.todays_conditions[lang]}
          </h1>
        </div>

        {/* Change Location Button */}
        <button
          type="button"
          onClick={onOpenLocationModal}
          className="flex items-center gap-1.5 px-3 py-2 bg-white rounded-xl border border-slate-200 shadow-xs hover:bg-slate-50 transition-colors text-slate-700 text-xs font-semibold shrink-0 min-h-[44px]"
          title={LABELS.change_location[lang]}
        >
          <MapPin className="w-4 h-4 text-blue-600" />
          <span className="max-w-[130px] truncate text-slate-800 font-medium">
            {vesselLocation.name || `${vesselLocation.latitude.toFixed(2)}°N`}
          </span>
        </button>
      </header>

      {/* ── Active Warning Banners ── */}
      {criticalAlerts.length > 0 && (
        <section aria-label="Marine Safety Advisories" className="space-y-2">
          {criticalAlerts.slice(0, 2).map((alt) => (
            <WarningBanner
              key={alt.id}
              severity={alt.severity?.toUpperCase() === 'CRITICAL' ? 'CRITICAL' : 'WARNING'}
              title={alt.advisory_type}
              message={alt.description}
            />
          ))}
        </section>
      )}

      {/* ── Primary Action Status Card (Level 1: What Should I Do?) ── */}
      <section aria-label="Primary Fishing Status">
        <StatusCard
          riskLevel={(riskLevel as any) || 'MODERATE'}
          riskScore={riskScore}
          dataStatus={dataStatus}
          lastUpdated={lastUpdated}
          language={lang}
          onRetry={onRefresh}
        />
      </section>

      {/* ── Primary Action Touch Targets (Large touch-friendly buttons) ── */}
      <section aria-label="Primary Quick Actions" className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onNavigate('spots')}
          className="w-full flex items-center justify-between px-5 py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-2xl shadow-sm transition-all min-h-[58px]"
        >
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Anchor className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="block font-bold text-base leading-tight">
                {LABELS.find_spots[lang]}
              </span>
              <span className="text-xs text-blue-100">
                {pfzZones.length > 0 ? `${pfzZones.length} zones mapped today` : 'View satellite hotspots'}
              </span>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 opacity-80" />
        </button>

        <button
          type="button"
          onClick={() => onNavigate('trip')}
          className="w-full flex items-center justify-between px-5 py-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-2xl shadow-sm transition-all min-h-[58px]"
        >
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Navigation className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="block font-bold text-base leading-tight">
                {LABELS.plan_trip[lang]}
              </span>
              <span className="text-xs text-emerald-100">
                Border & reef avoidance
              </span>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 opacity-80" />
        </button>
      </section>

      {/* ── Condition Overview Cards (Level 2: At a glance sea metrics) ── */}
      <section aria-label="Current Marine Conditions">
        <div className="flex items-center justify-between mb-2 px-1">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            {LABELS.todays_conditions[lang]}
          </h2>
          <button
            type="button"
            onClick={onRefresh}
            className="flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-800"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Update</span>
          </button>
        </div>
        <ConditionCards weather={weather} language={lang} />
      </section>

      {/* ── Recommended Spot Preview ── */}
      {recommendedSpot && (
        <section aria-label="Top Recommended Fishing Spot" className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {LABELS.nearby_spot[lang]}
            </h2>
            <button
              type="button"
              onClick={() => onNavigate('spots')}
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              See all ({pfzZones.length})
            </button>
          </div>
          <FishingSpotCard
            zone={recommendedSpot}
            onViewMap={() => onNavigate('spots')}
            onPlanRoute={() => onNavigate('trip')}
            language={lang}
          />
        </section>
      )}

      {/* ── Quick Ask Row (Fisherman Friendly Prompts) ── */}
      <section aria-label="Quick Fisherman Assistant" className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">
              {LABELS.ask_assistant[lang]}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('ask')}
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-semibold transition-colors"
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Voice / Chat</span>
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {[
            LABELS.q_can_i_fish[lang],
            LABELS.q_where_to_fish[lang],
            LABELS.q_any_warning[lang]
          ].map((promptText, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onSendQuickMessage(promptText)}
              className="w-full text-left px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 active:bg-blue-50 border border-slate-200/60 text-slate-700 text-xs font-medium flex items-center justify-between transition-colors min-h-[44px]"
            >
              <span>{promptText}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-2" />
            </button>
          ))}
        </div>
      </section>

      {/* ── Advanced Technical Details (Level 4: Hidden by default) ── */}
      <section aria-label="Technical Details Accordion">
        <AdvancedDetails
          weather={weather}
          riskScore={riskScore}
          riskLevel={riskLevel}
          zones={pfzZones}
          language={lang}
        />
      </section>
    </div>
  );
};
