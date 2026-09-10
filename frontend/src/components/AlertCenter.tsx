// frontend/src/components/AlertCenter.tsx
import React, { useState } from 'react';
import { Bell, ShieldAlert, AlertTriangle, Info, Clock, ExternalLink } from 'lucide-react';
import type { MarineAdvisory } from '../types/marine';

interface AlertCenterProps {
  alerts: MarineAdvisory[];
}

export const AlertCenter: React.FC<AlertCenterProps> = ({ alerts }) => {
  const [filterSeverity, setFilterSeverity] = useState<string>('ALL');

  const filteredAlerts = alerts.filter((a) => {
    if (filterSeverity === 'ALL') return true;
    return a.severity.toUpperCase() === filterSeverity.toUpperCase();
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-mono text-blue-600 font-semibold uppercase tracking-wider mb-1">
            Maritime Warning Broadcast
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Advisories & Coastal Bulletins
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Official alerts issued by INCOIS, India Meteorological Department (IMD), and coastal maritime authorities.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs overflow-x-auto max-w-full no-scrollbar">
          {['ALL', 'CRITICAL', 'WARNING', 'CAUTION', 'INFO'].map((sev) => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-2.5 sm:px-3 py-1 rounded-md text-[11px] font-semibold transition-colors shrink-0 ${
                filterSeverity === sev
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Bulletins Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAlerts.map((alert) => {
          const isCrit = alert.severity === 'CRITICAL';
          const isWarn = alert.severity === 'WARNING';
          const isCaution = alert.severity === 'CAUTION';

          return (
            <div
              key={alert.id}
              className={`p-5 rounded-xl border shadow-xs flex flex-col justify-between ${
                isCrit
                  ? 'bg-rose-50/50 border-rose-200'
                  : isWarn
                  ? 'bg-amber-50/50 border-amber-200'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase border ${
                    isCrit
                      ? 'bg-rose-100 text-rose-800 border-rose-300'
                      : isWarn
                      ? 'bg-amber-100 text-amber-800 border-amber-300'
                      : isCaution
                      ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
                      : 'bg-blue-100 text-blue-800 border-blue-300'
                  }`}>
                    {alert.severity} • {alert.category}
                  </span>

                  <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(alert.valid_until).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-slate-900 mb-1.5">{alert.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">{alert.description}</p>

                <div className="p-3 rounded-lg bg-white border border-slate-200 text-xs">
                  <div className="font-semibold text-slate-800">Action Recommended:</div>
                  <div className="text-slate-600 mt-0.5">{alert.recommended_action}</div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>Issuer: {alert.issuer}</span>
                <span>Area: {alert.affected_area}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};