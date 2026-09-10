// frontend/src/components/GeofenceView.tsx
import React, { useState } from 'react';
import { ShieldAlert, Radio, AlertTriangle, Compass, ArrowRight, CheckCircle2 } from 'lucide-react';
import type { GeofenceZone, GeofenceCheckResult } from '../types/marine';
import { getTranslation } from '../services/i18n';

interface GeofenceViewProps {
  geofences: GeofenceZone[];
  currentStatus: GeofenceCheckResult;
  selectedLanguage?: string;
}

export const GeofenceView: React.FC<GeofenceViewProps> = ({
  geofences,
  currentStatus,
  selectedLanguage = 'en'
}) => {
  const t = getTranslation(selectedLanguage);
  const [simulatedDistance, setSimulatedDistance] = useState<number>(4.2);

  const isWarning = simulatedDistance < 5.0;
  const isCaution = simulatedDistance < 10.0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-mono text-blue-600 font-semibold uppercase tracking-wider mb-1">
            {t.geofence.title}
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            {t.geofence.title}
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            {t.geofence.desc}
          </p>
        </div>

        <span className={`px-3 py-1 rounded-lg font-mono text-xs font-bold border self-start sm:self-auto ${
          isWarning
            ? 'bg-rose-50 border-rose-200 text-rose-700'
            : 'bg-emerald-50 border-emerald-200 text-emerald-700'
        }`}>
          {isWarning ? t.geofence.status_warning : t.geofence.status_safe}
        </span>
      </div>

      {/* Interactive Proximity Simulation */}
      <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {t.scenarios.s4}
            </span>
          </div>
          <span className="font-mono text-xs text-slate-500">{t.geofence.imbl_label}</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600">{t.geofence.distance_to_border}:</span>
            <span className={`font-mono text-base font-black ${isWarning ? 'text-rose-600' : 'text-emerald-600'}`}>
              {simulatedDistance.toFixed(1)} {t.common.km}
            </span>
          </div>

          <input
            type="range"
            min="1.0"
            max="25.0"
            step="0.2"
            value={simulatedDistance}
            onChange={(e) => setSimulatedDistance(parseFloat(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
          />

          <div className="flex justify-between text-[10px] font-mono text-slate-400">
            <span>1.0 {t.common.km} ({t.common.critical})</span>
            <span>5.0 {t.common.km} ({t.common.high_risk})</span>
            <span>10.0 {t.common.km} ({t.common.moderate})</span>
            <span>25.0 {t.common.km} ({t.common.safe})</span>
          </div>
        </div>

        {/* Dynamic Alert Banner */}
        <div className={`p-4 rounded-xl border text-xs flex items-start gap-3 transition-colors ${
          isWarning
            ? 'bg-rose-50 border-rose-300 text-rose-900'
            : isCaution
            ? 'bg-amber-50 border-amber-300 text-amber-900'
            : 'bg-emerald-50 border-emerald-300 text-emerald-900'
        }`}>
          {isWarning ? (
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          ) : isCaution ? (
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          )}

          <div className="space-y-1">
            <div className="font-bold text-sm">
              {isWarning
                ? t.geofence.status_warning
                : isCaution
                ? t.common.moderate
                : t.geofence.status_safe}
            </div>
            <p className="leading-relaxed">
              {isWarning
                ? t.geofence.safety_instruction
                : t.geofence.status_safe}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
