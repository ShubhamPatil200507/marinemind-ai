import React, { useState } from 'react';
import {
  Navigation, CheckCircle2, AlertTriangle, ShieldCheck,
  Compass, ShieldAlert, Waves, Check, Map as MapIcon, List
} from 'lucide-react';
import type { PFZZone, WeatherData, RouteOption } from '../types/marine';
import { getFishermanTranslation } from '../services/fishermanI18n';

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

export const TripTab: React.FC<TripTabProps> = ({
  zones,
  weather,
  routes,
  language,
  selectedZone: initialZone,
  mapElement,
  onPlanRoute,
}) => {
  const t = getFishermanTranslation(language);

  const [activeZone, setActiveZone] = useState<PFZZone | null>(
    initialZone || zones[0] || null
  );
  const [isCalculating, setIsCalculating] = useState(false);
  const [mobileView, setMobileView] = useState<'plan' | 'map'>('plan');

  const handleSelectZone = (zone: PFZZone) => {
    setActiveZone(zone);
  };

  const handleExecutePlan = async () => {
    if (!activeZone) return;
    setIsCalculating(true);
    try {
      await onPlanRoute(activeZone);
      setMobileView('map');
    } finally {
      setIsCalculating(false);
    }
  };

  // Estimated travel time assuming ~12 knots (22 km/h) fishing trawler cruising speed
  const estMins = activeZone ? Math.round((activeZone.distance_km / 22) * 60) : 45;

  // Step indicator state
  const currentStep = routes.length > 0 ? 3 : activeZone ? 2 : 1;

  return (
    <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-3.5 sm:py-5 space-y-3.5 sm:space-y-5">
      {/* ── Header with Mobile View Switcher ── */}
      <header className="bg-white p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              <Navigation className="w-5 h-5 text-blue-600" />
              <span>{t.trip.title}</span>
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {t.trip.subtitle}
            </p>
          </div>

          {/* Mobile-only Segmented View Switcher: Plan vs Map */}
          {mapElement && (
            <div className="flex lg:hidden bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0">
              <button
                type="button"
                onClick={() => setMobileView('plan')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  mobileView === 'plan'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>{t.trip.view_plan}</span>
              </button>
              <button
                type="button"
                onClick={() => setMobileView('map')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  mobileView === 'map'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span>{t.trip.view_route}</span>
              </button>
            </div>
          )}
        </div>

        {/* ── 3-Step Visual Progress Stepper ── */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-100">
          <div
            className={`flex items-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition-colors ${
              currentStep >= 1
                ? 'bg-blue-50 text-blue-800 border border-blue-200'
                : 'bg-slate-50 text-slate-400'
            }`}
          >
            <span
              className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-[9px] sm:text-[10px] font-black shrink-0 ${
                currentStep > 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-200 text-blue-800'
              }`}
            >
              {currentStep > 1 ? <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> : '1'}
            </span>
            <span className="truncate">{t.trip.step1_title}</span>
          </div>

          <div
            className={`flex items-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition-colors ${
              currentStep >= 2
                ? 'bg-blue-50 text-blue-800 border border-blue-200'
                : 'bg-slate-50 text-slate-400'
            }`}
          >
            <span
              className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-[9px] sm:text-[10px] font-black shrink-0 ${
                currentStep > 2
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-200 text-blue-800'
              }`}
            >
              {currentStep > 2 ? <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> : '2'}
            </span>
            <span className="truncate">{t.trip.step2_title}</span>
          </div>

          <div
            className={`flex items-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition-colors ${
              currentStep === 3
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-slate-50 text-slate-400'
            }`}
          >
            <span
              className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-[9px] sm:text-[10px] font-black shrink-0 ${
                currentStep === 3
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-200 text-slate-500'
              }`}
            >
              3
            </span>
            <span className="truncate">{t.trip.step3_title}</span>
          </div>
        </div>
      </header>

      {/* ── Responsive Route Navigation Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-6 items-start">
        {/* Route Map Section (Always on Desktop, conditional on Mobile) */}
        {mapElement && (
          <section
            aria-label="Route Navigation Map"
            className={`lg:col-span-7 xl:col-span-8 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-slate-200/90 shadow-2xs w-full relative bg-slate-100 lg:sticky lg:top-4 ${
              mobileView === 'map' ? 'block h-[calc(100dvh-190px)] min-h-[460px]' : 'hidden lg:block lg:h-[620px]'
            }`}
          >
            {mapElement}
          </section>
        )}

        {/* Workflow Steps 1, 2, 3 (Always on Desktop, conditional on Mobile) */}
        <div
          className={`space-y-4 ${
            mapElement ? 'lg:col-span-5 xl:col-span-4' : 'lg:col-span-12'
          } ${mobileView === 'plan' ? 'block' : 'hidden lg:block'}`}>
          {/* STEP 1: Select Destination Zone */}
          <section
            aria-label="Step 1 Destination Selection"
            className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-3.5 shadow-2xs"
          >
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {t.trip.step1_title}
          </h2>
          {activeZone && (
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
              ✓ {activeZone.name}
            </span>
          )}
        </div>

        <p className="text-xs text-slate-600 font-medium">
          {t.trip.step1_sub}
        </p>

        {/* Spot selection grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {zones.map((zone) => {
            const isSelected = activeZone?.id === zone.id;
            return (
              <button
                key={zone.id}
                type="button"
                onClick={() => handleSelectZone(zone)}
                className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between min-h-[56px] ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/80 shadow-xs ring-2 ring-blue-600'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div>
                  <h3
                    className={`text-sm font-bold leading-tight ${
                      isSelected ? 'text-blue-950' : 'text-slate-900'
                    }`}
                  >
                    {zone.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 font-medium">
                    <span>📍 {zone.distance_km.toFixed(1)} km</span>
                    <span>•</span>
                    <span>
                      🌊 {zone.wave_risk === 'LOW' ? t.conditions.calm : t.conditions.moderate}
                    </span>
                  </div>
                </div>

                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border-2 shrink-0 ${
                    isSelected
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-slate-300'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── STEP 2: Voyage Safety & Conditions Check ── */}
      {activeZone && (
        <section
          aria-label="Step 2 Voyage Summary"
          className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-4 shadow-2xs"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t.trip.step2_title}
            </h2>
            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full">
              {activeZone.name}
            </span>
          </div>

          {/* 4 Summary metric boxes */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                {t.trip.distance}
              </span>
              <strong className="text-slate-900 text-base font-black">
                {activeZone.distance_km.toFixed(1)} km
              </strong>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                {t.trip.est_transit}
              </span>
              <strong className="text-slate-900 text-base font-black">
                ~{estMins} {t.trip.mins}
              </strong>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                {t.trip.sea_state}
              </span>
              <strong className="text-slate-900 text-base font-black">
                {(weather.wave_height_m ?? 1.2).toFixed(1)} m
              </strong>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                {t.trip.wind_speed}
              </span>
              <strong className="text-slate-900 text-base font-black">
                {Math.round(weather.wind_speed_kmh ?? 20)} km/h
              </strong>
            </div>
          </div>

          {/* Calculate button */}
          <button
            type="button"
            onClick={handleExecutePlan}
            disabled={isCalculating}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-400 text-white rounded-2xl font-black text-sm sm:text-base shadow-xs transition-all min-h-[56px]"
          >
            <Compass className={`w-5 h-5 ${isCalculating ? 'animate-spin' : ''}`} />
            <span>{isCalculating ? t.trip.calculating : t.trip.calculate_btn}</span>
          </button>
        </section>
      )}

      {/* ── STEP 3: Route Options Result (Safe Fairway vs Direct Hazardous) ── */}
      {routes.length > 0 && (
        <section aria-label="Step 3 Calculated Routes" className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
            {t.trip.step3_title}
          </h2>

          <div className="space-y-3">
            {routes.map((rt) => {
              const isRecommended = rt.is_recommended;
              return (
                <div
                  key={rt.id}
                  className={`p-4 sm:p-5 rounded-2xl border-2 transition-all ${
                    isRecommended
                      ? 'bg-emerald-50/80 border-emerald-500 shadow-2xs'
                      : 'bg-amber-50/70 border-amber-400'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                          isRecommended
                            ? 'bg-emerald-600 text-white'
                            : 'bg-amber-500 text-white'
                        }`}
                      >
                        {isRecommended ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <AlertTriangle className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <h3
                          className={`text-base font-black leading-tight ${
                            isRecommended ? 'text-emerald-950' : 'text-amber-950'
                          }`}
                        >
                          {isRecommended
                            ? t.trip.recommended_safe_fairway
                            : t.trip.direct_hazardous_track}
                        </h3>
                        <p className="text-xs text-slate-600 font-medium">{rt.name}</p>
                      </div>
                    </div>

                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-black tracking-wide ${
                        isRecommended
                          ? 'bg-emerald-200 text-emerald-900 border border-emerald-300'
                          : 'bg-amber-200 text-amber-900 border border-amber-300'
                      }`}
                    >
                      {isRecommended ? t.trip.safe_badge : t.trip.caution_badge}
                    </span>
                  </div>

                  {/* Route metrics */}
                  <div className="flex items-center gap-5 text-xs font-bold text-slate-800 my-3 py-2 border-y border-black/10">
                    <span>📏 {rt.distance_km.toFixed(1)} km</span>
                    <span>⏱ ~{rt.travel_time_mins} min</span>
                  </div>

                  {/* Avoidance rationale */}
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {rt.why_chosen_or_avoided}
                  </p>

                  {/* Warnings list */}
                  {rt.warnings && rt.warnings.length > 0 && (
                    <div className="mt-3 text-xs text-amber-950 bg-amber-100/90 p-3 rounded-xl border border-amber-300 flex items-start gap-2">
                      <ShieldAlert className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                      <span className="font-semibold">{rt.warnings.join(' • ')}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}
        </div>
      </div>
    </div>
  );
};
