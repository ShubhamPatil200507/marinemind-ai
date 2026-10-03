// frontend/src/components/HomeTab.tsx
// Fisherman-First Home Screen: Immediate clarity on "Can I go fishing?"
import React from 'react';
import {
  MapPin, Anchor, Navigation, Sparkles, Mic, RefreshCw,
  ArrowRight, ShieldAlert, Waves, Crosshair
} from 'lucide-react';
import { StatusCard } from './StatusCard';
import { ConditionCards } from './ConditionCards';
import { FishingSpotCard } from './FishingSpotCard';
import { WarningBanner } from './WarningBanner';
import { AdvancedDetails } from './AdvancedDetails';
import type { WeatherData, PFZZone, MarineAdvisory } from '../types/marine';
import { getFishermanTranslation } from '../services/fishermanI18n';

interface HomeTabProps {
  weather: WeatherData;
  pfzZones: PFZZone[];
  alerts: MarineAdvisory[];
  riskScore: number;
  riskLevel: string;
  vesselLocation: { latitude: number; longitude: number; name?: string };
  language: string;
  dataStatus: 'LIVE' | 'UNAVAILABLE' | 'UNKNOWN' | 'CACHED';
  lastUpdated?: string;
  onNavigate: (tab: 'home' | 'spots' | 'trip' | 'ask' | 'profile') => void;
  onSendQuickMessage: (msg: string) => void;
  onRefresh: () => void;
  onOpenLocationModal?: () => void;
  onDetectGPS?: () => void;
}


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
  onOpenLocationModal,
  onDetectGPS,
}) => {
  const t = getFishermanTranslation(language);

  // Time period greeting
  const hour = new Date().getHours();
  const timeGreeting =
    hour < 12 ? t.greeting.morning : hour < 17 ? t.greeting.afternoon : t.greeting.evening;

  // Best recommended spot
  const recommendedSpot =
    pfzZones.find(
      (z) =>
        z.recommendation?.toUpperCase() === 'HIGHLY_RECOMMENDED' ||
        z.recommendation?.toUpperCase() === 'RECOMMENDED'
    ) || pfzZones[0];

  // Critical marine safety alerts
  const criticalAlerts = (alerts || []).filter(
    (a) =>
      a.severity?.toUpperCase() === 'CRITICAL' ||
      a.severity?.toUpperCase() === 'WARNING' ||
      a.severity?.toUpperCase() === 'CAUTION'
  );

  return (
    <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-3.5 sm:py-5 space-y-3.5 sm:space-y-6">
      {/* ── Top Maritime Header & Harbor Selector ── */}
      <header className="flex items-center justify-between gap-2.5 bg-white p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs">
        <div className="min-w-0">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-700 block truncate">
            {timeGreeting}, {t.greeting.captain}
          </span>
          <h1 className="text-lg sm:text-2xl font-black text-slate-900 leading-tight truncate">
            {t.status.title}
          </h1>
        </div>

        {/* Location & GPS action buttons (Compact on mobile) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {onDetectGPS && (
            <button
              type="button"
              onClick={onDetectGPS}
              className="flex items-center gap-1 px-2.5 sm:px-3.5 py-2 bg-blue-50 hover:bg-blue-100 active:bg-blue-200 text-blue-700 rounded-lg sm:rounded-xl text-xs font-bold border border-blue-200 transition-colors min-h-[38px] sm:min-h-[44px]"
              title="Auto-detect Live Device GPS"
            >
              <Crosshair className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
              <span className="hidden xs:inline text-[11px] sm:text-xs">GPS</span>
            </button>
          )}

          <button
            type="button"
            onClick={onOpenLocationModal}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 bg-slate-50 hover:bg-slate-100 active:bg-blue-50 rounded-lg sm:rounded-xl border border-slate-200 text-slate-800 text-xs font-bold shrink-0 min-h-[38px] sm:min-h-[44px] transition-colors max-w-[150px] sm:max-w-[220px]"
            title={t.greeting.change_port}
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </div>
            <div className="text-left min-w-0">
              <span className="text-[9px] text-slate-400 font-semibold uppercase block leading-none hidden sm:block">
                {t.greeting.port}
              </span>
              <span className="truncate text-slate-900 font-bold block text-[11px] sm:text-xs leading-tight">
                {vesselLocation.name || `${vesselLocation.latitude.toFixed(2)}°N`}
              </span>
            </div>
          </button>
        </div>
      </header>

      {/* ── Official Government of India IMD Marine Bulletin Ribbon ── */}
      {(weather.port_signal || weather.imd_issuing_office) && (
        <section aria-label="Official IMD Bulletin" className="flex items-center justify-between p-3 sm:p-4 bg-slate-900 text-white rounded-xl sm:rounded-2xl text-xs font-semibold shadow-2xs border border-blue-900/40">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-lg sm:text-xl shrink-0" role="img" aria-label="India Flag">🇮🇳</span>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-blue-300 font-black uppercase tracking-wider text-[9px] sm:text-[10px]">IMD Marine Bulletin</span>
                <span className="text-slate-500 text-[10px] hidden sm:inline">·</span>
                <span className="text-slate-300 text-[10px] sm:text-xs font-medium truncate">{weather.imd_issuing_office || 'Government of India'}</span>
              </div>
              <div className="text-white text-xs font-bold flex items-center gap-2 mt-0.5 flex-wrap">
                <span className="text-[11px] sm:text-xs">
                  Signal: <span className={weather.port_signal && !weather.port_signal.includes('NIL') ? 'text-amber-400 font-black' : 'text-emerald-400 font-bold'}>{weather.port_signal || 'NIL AT ALL PORTS'}</span>
                </span>
                <span className="text-slate-600 text-[10px]">|</span>
                <span className="text-slate-300 font-normal text-[11px] sm:text-xs">{weather.sea_state}</span>
              </div>
            </div>
          </div>
          <span className="hidden sm:inline-block px-2.5 py-1 bg-blue-950/80 border border-blue-500/40 text-blue-300 rounded text-[11px] font-bold shrink-0">
            Govt Verified
          </span>
        </section>
      )}

      {/* ── Full Display Responsive Grid (1 Column on Mobile, 12 Columns on Laptop/Desktop) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-6 items-start">
        {/* Primary / Action Column (7 cols on lg, 8 cols on xl) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-3.5 sm:space-y-6">
          {/* Primary Action Status Card: CAN I GO FISHING? */}
          <section aria-label="Primary Fishing Status">
            <StatusCard
              riskLevel={(riskLevel as any) || 'MODERATE'}
              riskScore={riskScore}
              dataStatus={dataStatus}
              lastUpdated={lastUpdated}
              language={language}
              onRetry={onRefresh}
            />
          </section>

          {/* Primary Action Touch Targets (Side-by-side on mobile for instant thumb access) */}
          <section aria-label="Primary Quick Actions" className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
            {/* SPOTS ACTION */}
            <button
              type="button"
              onClick={() => onNavigate('spots')}
              className="w-full flex items-center justify-between p-3 sm:p-5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl sm:rounded-2xl shadow-xs transition-all min-h-[58px] sm:min-h-[68px] active:scale-[0.98]"
            >
              <div className="flex items-center gap-2 sm:gap-3.5 text-left min-w-0">
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <Anchor className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="min-w-0">
                  <span className="block font-black text-sm sm:text-lg leading-tight truncate">
                    {t.actions.find_spots_title}
                  </span>
                  <span className="text-[10px] sm:text-xs text-blue-100 font-medium truncate block">
                    {pfzZones.length > 0
                      ? `${pfzZones.length} ${t.spots.total_spots}`
                      : t.actions.find_spots_sub}
                  </span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white/80 shrink-0 ml-1 hidden xs:block" />
            </button>

            {/* TRIP PLANNER ACTION */}
            <button
              type="button"
              onClick={() => onNavigate('trip')}
              className="w-full flex items-center justify-between p-3 sm:p-5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl sm:rounded-2xl shadow-xs transition-all min-h-[58px] sm:min-h-[68px] active:scale-[0.98]"
            >
              <div className="flex items-center gap-2 sm:gap-3.5 text-left min-w-0">
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <Navigation className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="min-w-0">
                  <span className="block font-black text-sm sm:text-lg leading-tight truncate">
                    {t.actions.plan_trip_title}
                  </span>
                  <span className="text-[10px] sm:text-xs text-emerald-100 font-medium truncate block">
                    {t.actions.plan_trip_sub}
                  </span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white/80 shrink-0 ml-1 hidden xs:block" />
            </button>
          </section>

          {/* Sea Condition Metrics */}
          <section aria-label="Current Marine Conditions" className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {t.conditions.title}
              </h2>
              <button
                type="button"
                onClick={onRefresh}
                className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 py-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{t.conditions.update}</span>
              </button>
            </div>
            <ConditionCards weather={weather} language={language} />
          </section>

          {/* Top Recommended Fishing Spot Preview */}
          {recommendedSpot && (
            <section aria-label="Top Recommended Fishing Spot" className="space-y-2.5">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {t.actions.top_spot_title}
                </h2>
                <button
                  type="button"
                  onClick={() => onNavigate('spots')}
                  className="text-xs font-bold text-blue-600 hover:underline"
                >
                  {t.actions.see_all} ({pfzZones.length})
                </button>
              </div>
              <FishingSpotCard
                zone={recommendedSpot}
                onViewMap={() => onNavigate('spots')}
                onPlanRoute={() => onNavigate('trip')}
                language={language}
              />
            </section>
          )}
        </div>

        {/* Secondary / Ancillary Column (5 cols on lg, 4 cols on xl) */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6">
          {/* Active Weather / Marine Advisories */}
          {criticalAlerts.length > 0 && (
            <section aria-label="Marine Safety Advisories" className="space-y-2.5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
                Active Coastal Advisories ({criticalAlerts.length})
              </h2>
              {criticalAlerts.map((alt) => (
                <WarningBanner
                  key={alt.id}
                  severity={alt.severity?.toUpperCase() === 'CRITICAL' ? 'CRITICAL' : 'WARNING'}
                  title={alt.advisory_type}
                  message={alt.description}
                />
              ))}
            </section>
          )}

          {/* Quick Ask Copilot Section */}
          <section
            aria-label="Quick Fisherman Questions"
            className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-3.5 shadow-2xs"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  {t.actions.quick_assistant_title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('ask')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold transition-colors"
              >
                <Mic className="w-3.5 h-3.5" />
                <span>{t.actions.voice_chat}</span>
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {[
                t.actions.q_can_i_fish,
                t.actions.q_where_to_fish,
                t.actions.q_any_warning,
              ].map((promptText, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => onSendQuickMessage(promptText)}
                  className="w-full text-left px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 active:bg-blue-50 border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold flex items-center justify-between transition-colors min-h-[46px]"
                >
                  <span className="truncate pr-2">{promptText}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                </button>
              ))}
            </div>
          </section>

          {/* Advanced Technical Details */}
          <section aria-label="Technical Details Accordion">
            <AdvancedDetails
              weather={weather}
              riskScore={riskScore}
              riskLevel={riskLevel}
              zones={pfzZones}
              language={language}
            />
          </section>
        </div>
      </div>
    </div>
  );
};
