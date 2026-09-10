// frontend/src/components/RiskCenter.tsx
import React from 'react';
import {
  ShieldAlert, AlertTriangle, Waves,
  Wind, Zap, Eye, Compass, Shield, CheckCircle2, XCircle
} from 'lucide-react';
import type { WeatherData } from '../types/marine';
import { getTranslation } from '../services/i18n';

interface RiskCenterProps {
  weather: WeatherData;
  selectedLanguage?: string;
}

export const RiskCenter: React.FC<RiskCenterProps> = ({ weather, selectedLanguage = 'en' }) => {
  const t = getTranslation(selectedLanguage);
  const riskScore = 42;
  const riskCategory = t.common.moderate;

  const riskFactors = [
    { name: t.risk.factor_waves, weight: '30%', score: 45, rawVal: `${weather.wave_height_m}${t.common.m} ${t.dashboard.swell_label}`, icon: Waves, color: 'bg-amber-500' },
    { name: t.risk.factor_wind, weight: '20%', score: 35, rawVal: `${weather.wind_speed_kmh} ${t.common.km}/h ${weather.wind_direction}`, icon: Wind, color: 'bg-blue-500' },
    { name: t.risk.factor_lightning, weight: '15%', score: 10, rawVal: weather.lightning_risk, icon: Zap, color: 'bg-emerald-500' },
    { name: t.risk.factor_cyclone, weight: '20%', score: 0, rawVal: weather.cyclone_alert ? t.common.critical : t.common.safe, icon: Shield, color: 'bg-emerald-500' },
    { name: t.risk.factor_visibility, weight: '5%', score: 10, rawVal: weather.visibility, icon: Eye, color: 'bg-blue-500' },
    { name: t.risk.factor_buffer, weight: '10%', score: 5, rawVal: `18.5 ${t.common.km}`, icon: Compass, color: 'bg-emerald-500' }
  ];

  const hourlyForecast = [
    { hour: '06:00', wave: `1.1${t.common.m}`, wind: `16 ${t.common.km}/h`, risk: t.common.safe, safe: true },
    { hour: '08:00', wave: `1.2${t.common.m}`, wind: `18 ${t.common.km}/h`, risk: t.common.safe, safe: true },
    { hour: '10:00', wave: `1.4${t.common.m}`, wind: `22 ${t.common.km}/h`, risk: t.common.moderate, safe: true },
    { hour: '12:00', wave: `2.2${t.common.m}`, wind: `32 ${t.common.km}/h`, risk: t.common.high_risk, safe: false },
    { hour: '14:00', wave: `2.6${t.common.m}`, wind: `38 ${t.common.km}/h`, risk: t.common.high_risk, safe: false },
    { hour: '16:00', wave: `2.8${t.common.m}`, wind: `42 ${t.common.km}/h`, risk: t.common.high_risk, safe: false },
    { hour: '18:00', wave: `2.4${t.common.m}`, wind: `34 ${t.common.km}/h`, risk: t.common.high_risk, safe: false }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-mono text-blue-600 font-semibold uppercase tracking-wider mb-1">
            {t.risk.matrix_subtitle}
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            {t.risk.title}
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            {t.risk.desc}
          </p>
        </div>

        <span className="px-3 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 font-mono text-xs font-bold self-start sm:self-auto">
          {t.risk.category_label}: {riskCategory}
        </span>
      </div>

      {/* Main Score & Advisory */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Score Card */}
        <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col items-center justify-center text-center">
          <div className="text-[11px] font-mono text-slate-400 uppercase font-semibold mb-2">{t.risk.overall_gauge}</div>
          <div className="text-5xl font-black text-amber-500 font-mono tracking-tight">
            {riskScore} <span className="text-xs text-slate-400 font-normal">/ 100</span>
          </div>
          <div className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 mt-2 uppercase tracking-wide">
            {t.common.moderate}
          </div>
          <div className="text-[11px] text-slate-500 mt-3 pt-2 border-t border-slate-100 w-full">
            {t.copilot.confidence}: <strong className="text-slate-800">88%</strong>
          </div>
        </div>

        {/* Advisory Synthesis Card */}
        <div className="md:col-span-2 p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">{t.risk.title}</span>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              {t.dashboard.safe_window_active}
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            {t.dashboard.risk_summary}
          </p>

          <div className="grid grid-cols-3 gap-2.5 pt-1 text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <div className="text-[10px] text-slate-400 uppercase">{t.risk.factor_waves}</div>
              <div className="font-bold text-slate-900 mt-0.5">+18 pts ({t.common.moderate})</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <div className="text-[10px] text-slate-400 uppercase">{t.risk.factor_wind}</div>
              <div className="font-bold text-slate-900 mt-0.5">+12 pts (22 {t.common.km}/h)</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <div className="text-[10px] text-slate-400 uppercase">{t.risk.factor_cyclone}</div>
              <div className="font-bold text-emerald-700 mt-0.5">0 pts ({t.common.safe})</div>
            </div>
          </div>
        </div>
      </div>

      {/* Factor Breakdown Bars */}
      <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          {t.risk.matrix_subtitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {riskFactors.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-slate-600" />
                    <span className="font-semibold text-slate-800">{f.name}</span>
                    <span className="text-[10px] font-mono text-slate-400">({f.weight})</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-900">{f.rawVal}</span>
                </div>

                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className={`${f.color} h-full rounded-full transition-all duration-500`}
                    style={{ width: `${Math.max(f.score, 4)}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hourly Timeline */}
      <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            {t.risk.hourly_heading}
          </h3>
          <span className="text-[11px] font-mono text-slate-500">{t.risk.hourly_desc}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {hourlyForecast.map((slot, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg border text-center font-mono ${
                slot.safe
                  ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900'
                  : 'bg-rose-50/50 border-rose-200 text-rose-900'
              }`}
            >
              <div className="text-xs font-bold">{slot.hour}</div>
              <div className="text-xs font-extrabold mt-1">{slot.wave}</div>
              <div className="text-[10px] opacity-75 mt-0.5">{slot.wind}</div>
              <div className="mt-2 pt-1 border-t border-current/20 flex items-center justify-center gap-1 text-[10px] font-bold">
                {slot.safe ? (
                  <span className="text-emerald-700">{t.common.safe}</span>
                ) : (
                  <span className="text-rose-700">{t.common.high_risk}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
