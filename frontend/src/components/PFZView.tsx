// frontend/src/components/PFZView.tsx
import React, { useState } from 'react';
import { Anchor, ArrowRight, CheckCircle2, AlertOctagon, MapPin, Fish, Navigation } from 'lucide-react';
import type { PFZZone } from '../types/marine';
import { getTranslation } from '../services/i18n';

interface PFZViewProps {
  zones: PFZZone[];
  vesselLocation?: { latitude: number; longitude: number; name?: string };
  onPlotRoute?: (zone: PFZZone) => void;
  selectedLanguage?: string;
}

export const PFZView: React.FC<PFZViewProps> = ({
  zones = [],
  vesselLocation,
  onPlotRoute,
  selectedLanguage = 'en'
}) => {
  const t = getTranslation(selectedLanguage);
  const [filter, setFilter] = useState<'all' | 'recommended' | 'safe'>('all');
  const [selectedZoneId, setSelectedZoneId] = useState<string>(zones[0]?.id || '');

  const filteredZones = zones.filter((z) => {
    if (filter === 'recommended') return z.recommendation === 'HIGHLY_RECOMMENDED' || z.recommendation === 'RECOMMENDED';
    if (filter === 'safe') return z.wave_risk === 'LOW';
    return true;
  });

  const activeZone = zones.find((z) => z.id === selectedZoneId) || zones[0] || null;
  const topZone = zones.find((z) => z.recommendation === 'HIGHLY_RECOMMENDED') || zones[0];
  const hazardZone = zones.find((z) => z.recommendation === 'AVOID');

  return (
    <div className="space-y-5">
      {/* Header Bar */}
      <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">
              {t.pfz.title}
            </h1>
            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              {zones.length} {t.pfz.zones_available}
            </span>
          </div>
          <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>
              {t.pfz.sector_label}: <strong>{vesselLocation?.name || 'Local Waters'}</strong>
              {vesselLocation && ` (${vesselLocation.latitude.toFixed(2)}°N, ${vesselLocation.longitude.toFixed(2)}°E)`}
            </span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 self-start sm:self-auto bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs overflow-x-auto max-w-full no-scrollbar">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-2.5 sm:px-3 py-1 rounded-md font-medium transition-all shrink-0 ${
              filter === 'all' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.pfz.all_zones}
          </button>
          <button
            type="button"
            onClick={() => setFilter('recommended')}
            className={`px-2.5 sm:px-3 py-1 rounded-md font-medium transition-all shrink-0 ${
              filter === 'recommended' ? 'bg-white text-emerald-700 shadow-2xs font-semibold' : 'text-slate-600 hover:text-emerald-700'
            }`}
          >
            {t.pfz.recommended_filter}
          </button>
          <button
            type="button"
            onClick={() => setFilter('safe')}
            className={`px-2.5 sm:px-3 py-1 rounded-md font-medium transition-all shrink-0 ${
              filter === 'safe' ? 'bg-white text-blue-700 shadow-2xs font-semibold' : 'text-slate-600 hover:text-blue-700'
            }`}
          >
            {t.pfz.calm_waters}
          </button>
        </div>
      </div>

      {/* Recommended vs Hazard Quick Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {topZone && (
          <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-emerald-200/60 mb-2.5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-bold text-sm text-slate-900">{topZone.name}</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 shrink-0">
                  {t.common.recommended.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono mb-2.5">
                <div className="p-1.5 sm:p-2 rounded bg-white border border-emerald-200/80">
                  <div className="text-[10px] text-slate-400">{t.pfz.th_distance}</div>
                  <div className="font-bold text-slate-900">{topZone.distance_km} {t.common.km}</div>
                </div>
                <div className="p-1.5 sm:p-2 rounded bg-white border border-emerald-200/80">
                  <div className="text-[10px] text-slate-400">{t.pfz.score_label}</div>
                  <div className="font-bold text-emerald-700">{topZone.productivity_score}/100</div>
                </div>
                <div className="p-1.5 sm:p-2 rounded bg-white border border-emerald-200/80">
                  <div className="text-[10px] text-slate-400">{t.risk.th_status}</div>
                  <div className="font-bold text-emerald-700 truncate">{topZone.wave_risk === 'LOW' ? `${t.common.safe} (1.2${t.common.m})` : t.common.moderate}</div>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                {t.pfz.contrast_recommended_desc}
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-emerald-200/60 flex items-center justify-between gap-2">
              <span className="text-xs text-emerald-800 font-medium truncate max-w-[140px] sm:max-w-[240px]">
                {topZone.target_species.slice(0, 3).join(', ')}
              </span>
              <button
                type="button"
                onClick={() => onPlotRoute?.(topZone)}
                className="px-2.5 sm:px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors inline-flex items-center gap-1.5 shrink-0"
              >
                <span>{t.pfz.inspect_map}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        {hazardZone && (
          <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-rose-200/60 mb-2.5">
                <div className="flex items-center gap-2">
                  <AlertOctagon className="w-4 h-4 text-rose-600 shrink-0" />
                  <span className="font-bold text-sm text-slate-900">{hazardZone.name}</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-300">
                  {t.common.avoid.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono mb-2.5">
                <div className="p-1.5 sm:p-2 rounded bg-white border border-rose-200/80">
                  <div className="text-[10px] text-slate-400">{t.pfz.th_distance}</div>
                  <div className="font-bold text-slate-900">{hazardZone.distance_km} {t.common.km}</div>
                </div>
                <div className="p-1.5 sm:p-2 rounded bg-white border border-rose-200/80">
                  <div className="text-[10px] text-slate-400">{t.pfz.score_label}</div>
                  <div className="font-bold text-slate-700">{hazardZone.productivity_score}/100</div>
                </div>
                <div className="p-1.5 sm:p-2 rounded bg-white border border-rose-200/80">
                  <div className="text-[10px] text-slate-400">{t.risk.factor_waves}</div>
                  <div className="font-bold text-rose-600 truncate">{t.common.high_risk}</div>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                {t.pfz.contrast_avoid_desc}
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-rose-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-xs text-rose-800 font-medium">
                {t.dashboard.scenario_highlights.s2}
              </span>
              <span className="text-xs font-bold text-rose-700 shrink-0">{t.common.avoid.toUpperCase()}</span>
            </div>
          </div>
        )}
      </div>

      {/* Main Grid: Forecast Zone Cards & Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left 2 Cols: Zone Forecast Cards */}
        <div className="lg:col-span-2 space-y-3">
          {filteredZones.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-slate-500 text-xs">
              {t.pfz.all_zones}
            </div>
          ) : (
            filteredZones.map((zone) => {
              const isAvoid = zone.recommendation === 'AVOID';
              const isSelected = (activeZone?.id === zone.id);

              return (
                <div
                  key={zone.id}
                  onClick={() => setSelectedZoneId(zone.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-blue-50/40 border-blue-400 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <Anchor className={`w-4 h-4 ${isAvoid ? 'text-rose-500' : 'text-emerald-600'} shrink-0`} />
                      <span className="font-bold text-sm text-slate-900">{zone.name}</span>
                      <span className="font-mono text-xs text-slate-500 font-normal">
                        ({zone.distance_km.toFixed(1)} {t.common.km})
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                        isAvoid
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      {isAvoid ? t.common.avoid.toUpperCase() : t.common.recommended.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono mb-2">
                    <div className="bg-slate-50 p-1.5 rounded border border-slate-100">
                      <div className="text-[10px] text-slate-400">{t.pfz.score_label}</div>
                      <div className="font-bold text-slate-800">{zone.productivity_score}/100</div>
                    </div>
                    <div className="bg-slate-50 p-1.5 rounded border border-slate-100">
                      <div className="text-[10px] text-slate-400">{t.pfz.th_sst}</div>
                      <div className="font-bold text-slate-800">{zone.sst_c}°C</div>
                    </div>
                    <div className="bg-slate-50 p-1.5 rounded border border-slate-100">
                      <div className="text-[10px] text-slate-400">{t.pfz.th_chl}</div>
                      <div className="font-bold text-slate-800">{zone.chlorophyll_mg_m3} mg/m³</div>
                    </div>
                    <div className="bg-slate-50 p-1.5 rounded border border-slate-100">
                      <div className="text-[10px] text-slate-400">{t.risk.th_risk}</div>
                      <div className={`font-bold ${isAvoid ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {isAvoid ? t.common.high_risk : t.common.safe}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 pt-1 gap-1">
                    <span className="truncate max-w-full sm:max-w-[70%]">
                      {t.pfz.th_species}: <strong className="text-slate-700 font-medium">{zone.target_species.join(', ')}</strong>
                    </span>
                    <span className="font-mono text-[11px] text-slate-400 shrink-0">
                      {t.pfz.th_depth}: {zone.ocean_depth_m}{t.common.m}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right 1 Col: Detailed Zone Inspector */}
        {activeZone && (
          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-4 h-fit">
            <div className="pb-3 border-b border-slate-100">
              <div className="text-[10px] font-mono text-slate-400 uppercase">{t.pfz.th_zone}</div>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">{activeZone.name}</h3>
              <div className="text-xs font-mono text-slate-500 mt-0.5">
                {activeZone.latitude.toFixed(4)}°N, {activeZone.longitude.toFixed(4)}°E
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">{t.pfz.th_distance}</span>
                <span className="font-mono font-bold text-slate-800">{activeZone.distance_km.toFixed(1)} {t.common.km}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">{t.pfz.score_label}</span>
                <span className="font-mono font-bold text-emerald-600">{activeZone.productivity_score} / 100</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">{t.pfz.th_sst}</span>
                <span className="font-mono font-bold text-slate-800">{activeZone.sst_c}°C</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">{t.pfz.th_chl}</span>
                <span className="font-mono font-bold text-slate-800">{activeZone.chlorophyll_mg_m3} mg/m³</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">{t.pfz.th_depth}</span>
                <span className="font-mono font-bold text-slate-800">{activeZone.ocean_depth_m} {t.common.m}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">{t.risk.th_status}</span>
                <span className={`font-mono font-bold ${activeZone.wave_risk === 'HIGH' ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {activeZone.wave_risk === 'HIGH' ? t.common.high_risk : t.common.safe}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs">
              <div className="font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <Fish className="w-3.5 h-3.5 text-blue-600" />
                <span>{t.pfz.target_species}:</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {activeZone.target_species.map((sp, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-white border border-slate-200 text-slate-700 text-[11px] rounded font-medium">
                    {sp}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {activeZone.recommendation === 'AVOID' ? t.pfz.contrast_avoid_desc : t.pfz.contrast_recommended_desc}
            </p>

            {activeZone.recommendation !== 'AVOID' ? (
              <button
                type="button"
                onClick={() => onPlotRoute?.(activeZone)}
                className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>{t.pfz.plot_route}</span>
              </button>
            ) : (
              <div className="w-full py-2 text-center text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 rounded-lg">
                {t.common.avoid.toUpperCase()}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
