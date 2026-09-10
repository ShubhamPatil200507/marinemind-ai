// frontend/src/components/AlertCenter.tsx
import React, { useState } from 'react';
import { Bell, ShieldAlert, AlertTriangle, Info, Clock, ExternalLink } from 'lucide-react';
import type { MarineAdvisory } from '../types/marine';
import { getTranslation } from '../services/i18n';

interface AlertCenterProps {
  alerts: MarineAdvisory[];
  selectedLanguage?: string;
}

export const AlertCenter: React.FC<AlertCenterProps> = ({ alerts, selectedLanguage = 'en' }) => {
  const t = getTranslation(selectedLanguage);
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
            {t.alerts.title}
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            {t.alerts.title}
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            {t.alerts.desc}
          </p>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs overflow-x-auto max-w-full no-scrollbar">
          {[
            { id: 'ALL', label: t.alerts.all_filter },
            { id: 'CRITICAL', label: t.alerts.critical_filter },
            { id: 'WARNING', label: t.alerts.warning_filter },
            { id: 'INFO', label: t.alerts.advisory_filter }
          ].map((sev) => (
            <button
              key={sev.id}
              onClick={() => setFilterSeverity(sev.id)}
              className={`px-2.5 sm:px-3 py-1 rounded-md text-[11px] font-semibold transition-colors shrink-0 ${
                filterSeverity === sev.id
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {sev.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bulletins Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAlerts.map((alert) => {
          const isCrit = alert.severity === 'CRITICAL';
          const isWarn = alert.severity === 'WARNING';

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
                  <div className="flex items-center gap-2">
                    {isCrit ? (
                      <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                    )}
                    <span className="font-bold text-xs text-slate-900 uppercase tracking-wide">
                      {alert.category}
                    </span>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                    isCrit ? 'bg-rose-100 text-rose-800 border-rose-300' : 'bg-amber-100 text-amber-800 border-amber-300'
                  }`}>
                    {alert.severity}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-slate-900">{alert.title}</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{alert.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>{t.alerts.source_incois}</span>
                <span>{alert.issued_at}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
