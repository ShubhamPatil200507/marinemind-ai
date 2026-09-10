// frontend/src/components/AnalyticsView.tsx
import React from 'react';
import { BarChart3, Thermometer, Waves, Droplet } from 'lucide-react';
import { getTranslation } from '../services/i18n';

interface AnalyticsViewProps {
  selectedLanguage?: string;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ selectedLanguage = 'en' }) => {
  const t = getTranslation(selectedLanguage);

  const sstPoints = [
    { time: '04:00', val: 27.6 },
    { time: '08:00', val: 28.1 },
    { time: '12:00', val: 28.8 },
    { time: '16:00', val: 28.9 },
    { time: '20:00', val: 28.4 }
  ];

  const chloroLayers = [
    { depth: `0${t.common.m} Surface`, val: 2.15, status: t.analytics.bloom_status, width: '85%' },
    { depth: `10${t.common.m} Shelf`, val: 2.45, status: t.analytics.optimal_range, width: '95%' },
    { depth: `25${t.common.m} Mid-water`, val: 1.60, status: t.analytics.optimal_range, width: '65%' },
    { depth: `50${t.common.m} Deep`, val: 0.85, status: t.common.moderate, width: '35%' },
    { depth: `80${t.common.m} Benthic`, val: 0.20, status: t.common.safe, width: '15%' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs">
        <div className="text-[11px] font-mono text-blue-600 font-semibold uppercase tracking-wider mb-1">
          {t.analytics.title}
        </div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
          {t.analytics.title}
        </h1>
        <p className="text-xs text-slate-500 mt-1 max-w-2xl">
          {t.analytics.desc}
        </p>
      </div>

      {/* Grid of Clean Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Chart 1: SST */}
        <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-blue-600" />
              <span className="font-bold text-xs text-slate-900 uppercase tracking-wide">
                {t.analytics.sst_heading}
              </span>
            </div>
            <span className="font-mono text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
              Mean: 28.36°C
            </span>
          </div>

          <div className="h-40 flex items-end justify-between gap-4 pt-4 px-3 border-b border-slate-200 bg-slate-50/50 rounded-lg">
            {sstPoints.map((pt, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <span className="font-mono text-[10px] text-blue-700 font-bold">{pt.val}°C</span>
                <div
                  className="w-full max-w-[36px] bg-blue-500 hover:bg-blue-600 rounded-t transition-all"
                  style={{ height: `${((pt.val - 26) / 4) * 100}%` }}
                ></div>
                <span className="font-mono text-[10px] text-slate-400 mt-1">{pt.time}</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            {t.analytics.sst_desc}
          </p>
        </div>

        {/* Chart 2: Chlorophyll-a */}
        <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Droplet className="w-4 h-4 text-emerald-600" />
              <span className="font-bold text-xs text-slate-900 uppercase tracking-wide">
                {t.analytics.chl_heading}
              </span>
            </div>
            <span className="font-mono text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              {t.analytics.optimal_range}
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {chloroLayers.map((layer, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-600">{layer.depth}</span>
                  <span className="font-bold text-slate-900">{layer.val} mg/m³</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all"
                    style={{ width: layer.width }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            {t.analytics.chl_desc}
          </p>
        </div>
      </div>
    </div>
  );
};
