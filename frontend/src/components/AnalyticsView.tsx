// frontend/src/components/AnalyticsView.tsx
import React from 'react';
import { BarChart3, Thermometer, Waves, Droplet } from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const sstPoints = [
    { time: '04:00', val: 27.6 },
    { time: '08:00', val: 28.1 },
    { time: '12:00', val: 28.8 },
    { time: '16:00', val: 28.9 },
    { time: '20:00', val: 28.4 }
  ];

  const wavePoints = [
    { hour: '06:00', wave: 1.1, wind: 16 },
    { hour: '08:00', wave: 1.2, wind: 18 },
    { hour: '10:00', wave: 1.4, wind: 22 },
    { hour: '12:00', wave: 2.2, wind: 32 },
    { hour: '14:00', wave: 2.6, wind: 38 },
    { hour: '16:00', wave: 2.8, wind: 42 },
    { hour: '18:00', wave: 2.4, wind: 34 }
  ];

  const chloroLayers = [
    { depth: '0m Surface', val: 2.15, status: 'Phytoplankton Bloom', width: '85%' },
    { depth: '10m Shelf', val: 2.45, status: 'Subsurface Maximum', width: '95%' },
    { depth: '25m Mid-water', val: 1.60, status: 'Optimal Pelagic Layer', width: '65%' },
    { depth: '50m Deep', val: 0.85, status: 'Declining Light Penetration', width: '35%' },
    { depth: '80m Benthic', val: 0.20, status: 'Upwelling Base', width: '15%' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs">
        <div className="text-[11px] font-mono text-blue-600 font-semibold uppercase tracking-wider mb-1">
          Oceanographic Remote Sensing Observations
        </div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
          Hydrodynamic Observations & Remote Sensing Profiles
        </h1>
        <p className="text-xs text-slate-500 mt-1 max-w-2xl">
          Satellite radiometer SST records, fluorometer chlorophyll-a vertical columns, and hydrodynamic swell surge predictions.
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
                Diurnal Sea Surface Temperature (SST)
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
                <span className="font-mono text-[10px] text-slate-500 pt-1 border-t border-slate-200 w-full text-center">
                  {pt.time}
                </span>
              </div>
            ))}
          </div>

          <div className="text-[11px] text-slate-500 leading-relaxed">
            Thermal front delta reaches <strong>+0.8°C</strong> near the offshore 20m depth contour, generating optimal upwelling conditions for pelagic fish shoals.
          </div>
        </div>

        {/* Chart 2: Swell vs Wind */}
        <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Waves className="w-4 h-4 text-cyan-600" />
              <span className="font-bold text-xs text-slate-900 uppercase tracking-wide">
                Wave Swell Surge & Wind Forecast
              </span>
            </div>
            <span className="font-mono text-xs font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              Peak: 2.8m @ 16:00
            </span>
          </div>

          <div className="h-40 flex items-end justify-between gap-2 pt-4 px-2 border-b border-slate-200 bg-slate-50/50 rounded-lg">
            {wavePoints.map((pt, i) => {
              const isHigh = pt.wave > 2.0;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                  <span className={`font-mono text-[10px] font-bold ${isHigh ? 'text-rose-600' : 'text-emerald-700'}`}>
                    {pt.wave}m
                  </span>
                  <div
                    className={`w-full max-w-[28px] rounded-t transition-all ${
                      isHigh ? 'bg-rose-500' : 'bg-emerald-500'
                    }`}
                    style={{ height: `${(pt.wave / 3.0) * 100}%` }}
                  ></div>
                  <span className="font-mono text-[10px] text-slate-500 pt-1 border-t border-slate-200 w-full text-center">
                    {pt.hour}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="text-[11px] text-slate-500 leading-relaxed">
            Wave surge doubles after 11:30 AM due to diurnal sea breeze reinforcement. Small craft should unmoor early and return before 11:00 AM.
          </div>
        </div>
      </div>

      {/* Vertical Water Column Chlorophyll-a Profile */}
      <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Droplet className="w-4 h-4 text-emerald-600" />
            <span className="font-bold text-xs text-slate-900 uppercase tracking-wide">
              Vertical Water Column Chlorophyll-a Profile (Fluorometer Sensor)
            </span>
          </div>
          <span className="font-mono text-xs text-slate-500">Sensor: Bio-Argo Float 29012</span>
        </div>

        <div className="space-y-3">
          {chloroLayers.map((layer, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between gap-4 text-xs">
              <div className="w-28 font-mono font-bold text-slate-800 shrink-0">{layer.depth}</div>
              <div className="flex-1">
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: layer.width }}></div>
                </div>
              </div>
              <div className="font-mono font-bold text-emerald-700 w-24 text-right shrink-0">{layer.val} mg/m³</div>
              <div className="text-slate-500 text-[11px] w-48 text-right shrink-0 hidden sm:block">{layer.status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};