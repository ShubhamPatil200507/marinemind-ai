// frontend/src/components/FishingSpotCard.tsx
// High-contrast, tactile fishing spot card for outdoor maritime use
import React from 'react';
import { Map, Navigation, Waves, Fish, Compass } from 'lucide-react';
import type { PFZZone } from '../types/marine';
import { getFishermanTranslation } from '../services/fishermanI18n';

interface FishingSpotCardProps {
  zone: PFZZone;
  onViewMap: () => void;
  onPlanRoute: () => void;
  language: string;
}

export function FishingSpotCard({
  zone,
  onViewMap,
  onPlanRoute,
  language,
}: FishingSpotCardProps) {
  const t = getFishermanTranslation(language);

  // Status configuration
  const rec = zone.recommendation?.toUpperCase() ?? '';
  const isRecommended = rec === 'HIGHLY_RECOMMENDED' || rec === 'RECOMMENDED';
  const isCaution = rec === 'PROCEED_WITH_CAUTION';

  const statusConfig = isRecommended
    ? {
        label: t.spots.good_fishing,
        badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        border: 'border-l-4 border-l-emerald-500',
      }
    : isCaution
    ? {
        label: t.spots.fair_fishing,
        badge: 'bg-amber-100 text-amber-800 border-amber-300',
        border: 'border-l-4 border-l-amber-500',
      }
    : {
        label: t.spots.avoid_area,
        badge: 'bg-red-100 text-red-800 border-red-300',
        border: 'border-l-4 border-l-red-500',
      };

  // Sea condition translation
  const waveRisk = (zone.wave_risk || '').toLowerCase();
  const seaLabel =
    waveRisk === 'low' || waveRisk === 'none'
      ? t.conditions.calm
      : waveRisk === 'moderate' || waveRisk === 'medium'
      ? t.conditions.moderate
      : t.conditions.rough;

  const topSpecies = (zone.target_species || []).slice(0, 3);

  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200 ${statusConfig.border} shadow-2xs hover:shadow-xs transition-all overflow-hidden`}
    >
      <div className="p-4 sm:p-5 space-y-3.5">
        {/* Top Header: Name & Recommendation Badge */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <span
              className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border ${statusConfig.badge} mb-1.5`}
            >
              {statusConfig.label}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
              {zone.name}
            </h3>
          </div>

          <div className="text-right shrink-0">
            <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded-lg border border-blue-200">
              📍 {zone.distance_km.toFixed(1)} {t.spots.km_away}
            </span>
          </div>
        </div>

        {/* Marine Attributes Row */}
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
          <div className="flex items-center gap-1.5">
            <Waves className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span>
              {t.spots.sea_state}: <strong className="text-slate-800">{seaLabel}</strong>
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
            <span>
              {t.spots.depth}: <strong className="text-slate-800">{zone.depth_m ?? 24}m</strong>
            </span>
          </div>
        </div>

        {/* Target Species List */}
        {topSpecies.length > 0 && (
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <Fish className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="font-semibold text-slate-700">{t.spots.target_species}:</span>
            <div className="flex flex-wrap gap-1">
              {topSpecies.map((species, i) => (
                <span
                  key={i}
                  className="bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded-md text-[11px]"
                >
                  {species}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Touch Targets (Minimum 48px tactile buttons) */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <button
            type="button"
            onClick={onViewMap}
            className="flex items-center justify-center gap-1.5 min-h-[48px] bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 rounded-xl text-xs sm:text-sm font-bold border border-slate-200 transition-colors"
          >
            <Map className="w-4 h-4 text-slate-600" />
            <span>{t.spots.view_map}</span>
          </button>

          <button
            type="button"
            onClick={onPlanRoute}
            className="flex items-center justify-center gap-1.5 min-h-[48px] bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-colors"
          >
            <Navigation className="w-4 h-4 text-white" />
            <span>{t.spots.plan_route}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
