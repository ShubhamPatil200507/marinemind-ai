// frontend/src/components/GeofenceView.tsx
import React, { useState } from 'react';
import { ShieldAlert, Radio, AlertTriangle, Compass, ArrowRight, CheckCircle2 } from 'lucide-react';
import type { GeofenceZone, GeofenceCheckResult } from '../types/marine';

interface GeofenceViewProps {
  geofences: GeofenceZone[];
  currentStatus: GeofenceCheckResult;
}

export const GeofenceView: React.FC<GeofenceViewProps> = ({ geofences, currentStatus }) => {
  const [simulatedDistance, setSimulatedDistance] = useState<number>(4.2);

  const isWarning = simulatedDistance < 5.0;
  const isCaution = simulatedDistance < 10.0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-mono text-blue-600 font-semibold uppercase tracking-wider mb-1">
            Maritime Boundary & Compliance Guardian
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Boundaries, EEZ, and Restricted Defense Waters
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Real-time vector proximity auditing against the International Maritime Boundary Line (IMBL), naval exercise perimeters, and marine sanctuaries.
          </p>
        </div>

        <span className={`px-3 py-1 rounded-lg font-mono text-xs font-bold border self-start sm:self-auto ${
          isWarning
            ? 'bg-rose-50 border-rose-200 text-rose-700'
            : 'bg-emerald-50 border-emerald-200 text-emerald-700'
        }`}>
          {isWarning ? 'ALERT: 4.2 KM TO IMBL BUFFER' : 'TERRITORIAL WATERS SAFE'}
        </span>
      </div>

      {/* Interactive Proximity Simulation (Scenario 4 Evaluator) */}
      <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Vessel Proximity Simulator (Scenario 4 Evaluation)
            </span>
          </div>
          <span className="font-mono text-xs text-slate-500">Target: IMBL Kutch Sector</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600">Simulated distance to sovereign boundary line:</span>
            <span className={`font-mono text-base font-black ${isWarning ? 'text-rose-600' : 'text-emerald-600'}`}>
              {simulatedDistance.toFixed(1)} km
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
            <span>1.0 km (Critical Violation)</span>
            <span>5.0 km (Warning Threshold)</span>
            <span>10.0 km (Caution Zone)</span>
            <span>25.0 km (Safe Sovereign)</span>
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
                ? 'CRITICAL BOUNDARY PROXIMITY ALERT'
                : isCaution
                ? 'CAUTION: APPROACHING 10 KM BUFFER'
                : 'SAFE CRUISING RANGE'}
            </div>
            <p className="text-xs opacity-90 leading-relaxed">
              {isWarning
                ? 'Vessel trajectory is projected to breach the International Maritime Boundary Line within 18 minutes. Turn vessel immediately westward (heading 270°) to remain in sovereign territorial waters.'
                : isCaution
                ? 'Vessel is within 10 km buffer of restricted waters. Keep continuous radio watch on VHF Ch 16 and verify GPS lock.'
                : 'Vessel is operating well within standard Indian sovereign waters with greater than 10 km clearance to all restricted polygons.'}
            </p>
          </div>
        </div>
      </div>

      {/* Geofence Zones Directory */}
      <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Active Geofence Boundaries & Restricted Polygons
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {geofences.map((fence) => {
            const isStrict = fence.restriction_level === 'STRICT_RESTRICTION';
            return (
              <div key={fence.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <div className="font-bold text-xs text-slate-900">{fence.name}</div>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${
                    isStrict
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : 'bg-blue-50 text-blue-700 border-blue-200'
                  }`}>
                    {fence.category}
                  </span>
                </div>

                <p className="text-xs text-slate-600">{fence.description}</p>

                <div className="text-[11px] font-mono text-slate-500 pt-1 flex justify-between">
                  <span>Enforcement: {fence.restriction_level.replace(/_/g, ' ')}</span>
                  <span>Alert Radius: 5.0 km</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};