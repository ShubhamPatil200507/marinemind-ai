// frontend/src/components/SpotsTab.tsx
// Map-first Potential Fishing Zones (PFZ) view for fishermen
import React, { useState } from 'react';
import { FishingSpotCard } from './FishingSpotCard';
import { Anchor, Filter, Map as MapIcon, List } from 'lucide-react';
import type { PFZZone } from '../types/marine';
import { getFishermanTranslation } from '../services/fishermanI18n';

interface SpotsTabProps {
  zones: PFZZone[];
  vesselLocation: { latitude: number; longitude: number; name?: string };
  language: string;
  mapElement?: React.ReactNode;
  onViewZoneOnMap: (zone: PFZZone) => void;
  onPlanRoute: (zone: PFZZone) => void;
}

export const SpotsTab: React.FC<SpotsTabProps> = ({
  zones,
  language,
  mapElement,
  onViewZoneOnMap,
  onPlanRoute,
}) => {
  const t = getFishermanTranslation(language);
  const [filterMode, setFilterMode] = useState<'all' | 'rec' | 'near'>('all');
  const [mobileView, setMobileView] = useState<'list' | 'map'>('list');
  const [selectedZoneOnMap, setSelectedZoneOnMap] = useState<PFZZone | null>(zones[0] || null);

  // Filter & sort zones
  const filteredZones = zones.filter((z) => {
    if (filterMode === 'rec') {
      const r = z.recommendation?.toUpperCase();
      return r === 'RECOMMENDED' || r === 'HIGHLY_RECOMMENDED';
    }
    if (filterMode === 'near') {
      return z.distance_km <= 15.0;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-3.5 sm:py-5 space-y-3.5 sm:space-y-5">
      {/* ── Header with Mobile View Switcher ── */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs">
        <div className="flex items-center justify-between w-full sm:w-auto">
          <div>
            <h1 className="text-lg sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              <Anchor className="w-5 h-5 text-blue-600" />
              <span>{t.spots.title}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold">
                {zones.length}
              </span>
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {t.spots.subtitle}
            </p>
          </div>

          {/* Mobile-only Segmented View Switcher: List vs Map */}
          {mapElement && (
            <div className="flex lg:hidden bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0">
              <button
                type="button"
                onClick={() => setMobileView('list')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  mobileView === 'list'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>List</span>
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
                <span>Chart</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* ── Responsive Chart & Spot Grid (Mobile Switchable, Desktop Split) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-6 items-start">
        {/* Marine Map Section (Always on Desktop, conditional on Mobile) */}
        {mapElement && (
          <section
            aria-label="Marine Geospatial Map"
            className={`lg:col-span-7 xl:col-span-8 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-slate-200/90 shadow-2xs w-full relative bg-slate-100 lg:sticky lg:top-4 ${
              mobileView === 'map' ? 'block h-[calc(100dvh-190px)] min-h-[460px]' : 'hidden lg:block lg:h-[620px]'
            }`}
          >
            {mapElement}
          </section>
        )}

        {/* Spot Cards & Filter Section (Always on Desktop, conditional on Mobile) */}
        <div
          className={`space-y-3.5 ${
            mapElement ? 'lg:col-span-5 xl:col-span-4' : 'lg:col-span-12'
          } ${mobileView === 'list' ? 'block' : 'hidden lg:block'}`}
        >
          {/* Filter Segmented Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold pl-1 shrink-0">
              <Filter className="w-3.5 h-3.5" />
            </div>

            <button
              type="button"
              onClick={() => setFilterMode('all')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors min-h-[42px] ${
                filterMode === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {t.spots.filter_all} ({zones.length})
            </button>

            <button
              type="button"
              onClick={() => setFilterMode('rec')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors min-h-[42px] ${
                filterMode === 'rec'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {t.spots.filter_recommended}
            </button>

            <button
              type="button"
              onClick={() => setFilterMode('near')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors min-h-[42px] ${
                filterMode === 'near'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {t.spots.filter_near}
            </button>
          </div>

          {/* Spot Cards List (Scrollable on desktop) */}
          <section aria-label="Fishing Spot Cards" className="space-y-3 lg:max-h-[555px] lg:overflow-y-auto lg:pr-1">
            {filteredZones.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-2">
                <Anchor className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-sm font-bold text-slate-600">
                  {t.spots.no_spots_found}
                </p>
              </div>
            ) : (
              filteredZones.map((zone) => (
                <FishingSpotCard
                  key={zone.id}
                  zone={zone}
                  onViewMap={() => {
                    setSelectedZoneOnMap(zone);
                    onViewZoneOnMap(zone);
                    setMobileView('map');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onPlanRoute={() => onPlanRoute(zone)}
                  language={language}
                />
              ))
            )}
          </section>
        </div>
      </div>
    </div>
  );
};
