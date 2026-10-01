// frontend/src/components/SpotsTab.tsx
// Map-first Potential Fishing Zones (PFZ) view for fishermen
import React, { useState } from 'react';
import { FishingSpotCard } from './FishingSpotCard';
import { Anchor, Filter } from 'lucide-react';
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
    <div className="max-w-4xl mx-auto px-4 py-4 space-y-4">
      {/* ── Header ── */}
      <header className="flex items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
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
      </header>

      {/* ── Map First: Prominent Interactive Marine Map ── */}
      {mapElement && (
        <section
          aria-label="Marine Geospatial Map"
          className="rounded-2xl overflow-hidden border-2 border-slate-200 shadow-2xs h-[300px] sm:h-[380px] w-full relative bg-slate-100"
        >
          {mapElement}
        </section>
      )}

      {/* ── Filter Segmented Bar ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
        <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold pl-1 shrink-0">
          <Filter className="w-3.5 h-3.5" />
        </div>

        <button
          type="button"
          onClick={() => setFilterMode('all')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors min-h-[42px] ${
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
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors min-h-[42px] ${
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
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors min-h-[42px] ${
            filterMode === 'near'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          {t.spots.filter_near}
        </button>
      </div>

      {/* ── Spot Cards List ── */}
      <section aria-label="Fishing Spot Cards" className="space-y-3">
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
                onViewZoneOnMap(zone);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onPlanRoute={() => onPlanRoute(zone)}
              language={language}
            />
          ))
        )}
      </section>
    </div>
  );
};
