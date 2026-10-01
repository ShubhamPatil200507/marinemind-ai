// frontend/src/components/ConditionCards.tsx
// Asymmetric marine conditions layout prioritizing Waves & Wind for fishermen
import React from 'react';
import { Waves, Wind, Thermometer, CloudRain, ShieldCheck, AlertTriangle } from 'lucide-react';
import type { WeatherData } from '../types/marine';
import { getFishermanTranslation } from '../services/fishermanI18n';

interface ConditionCardsProps {
  weather: WeatherData;
  language: string;
}

export function ConditionCards({ weather, language }: ConditionCardsProps) {
  const t = getFishermanTranslation(language);

  // Sea State classification & styling
  const waveHeight = weather.wave_height_m ?? 1.2;
  const waveStatus =
    waveHeight <= 1.0
      ? { label: t.conditions.calm, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' }
      : waveHeight <= 2.2
      ? { label: t.conditions.moderate, color: 'text-amber-700 bg-amber-50 border-amber-200' }
      : waveHeight <= 3.5
      ? { label: t.conditions.rough, color: 'text-orange-700 bg-orange-50 border-orange-200' }
      : { label: t.conditions.very_rough, color: 'text-red-700 bg-red-50 border-red-200' };

  // Wind classification & styling
  const windKmh = weather.wind_speed_kmh ?? 18;
  const windStatus =
    windKmh <= 20
      ? { label: t.conditions.light_breeze, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' }
      : windKmh <= 38
      ? { label: t.conditions.moderate_wind, color: 'text-amber-700 bg-amber-50 border-amber-200' }
      : windKmh <= 55
      ? { label: t.conditions.strong_wind, color: 'text-orange-700 bg-orange-50 border-orange-200' }
      : { label: t.conditions.gale, color: 'text-red-700 bg-red-50 border-red-200' };

  // Lightning / Hazard assessment
  const isHighRisk =
    weather.cyclone_alert ||
    weather.lightning_risk?.toLowerCase() === 'high' ||
    weather.lightning_risk?.toLowerCase() === 'critical';

  return (
    <div className="space-y-2.5">
      {/* ── PRIMARY CARDS: Waves & Wind (Dominant hierarchy for fishermen) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* WAVES CARD */}
        <div className="bg-white rounded-2xl border-2 border-slate-200 p-4 shadow-2xs hover:border-blue-400 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Waves className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {t.conditions.waves}
              </span>
            </div>
            <span
              className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${waveStatus.color}`}
            >
              {waveStatus.label}
            </span>
          </div>

          <div className="flex items-baseline justify-between mt-1">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {waveHeight.toFixed(1)}
              </span>
              <span className="text-sm font-bold text-slate-500">{t.conditions.meters}</span>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-slate-400 font-medium block">
                {t.conditions.wave_period}
              </span>
              <strong className="text-xs font-bold text-slate-700">
                {weather.wave_period_s ? `${weather.wave_period_s.toFixed(1)}s` : '7.0s'}
              </strong>
            </div>
          </div>
        </div>

        {/* WIND CARD */}
        <div className="bg-white rounded-2xl border-2 border-slate-200 p-4 shadow-2xs hover:border-blue-400 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
                <Wind className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {t.conditions.wind}
              </span>
            </div>
            <span
              className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${windStatus.color}`}
            >
              {windStatus.label}
            </span>
          </div>

          <div className="flex items-baseline justify-between mt-1">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {Math.round(windKmh)}
              </span>
              <span className="text-sm font-bold text-slate-500">{t.conditions.kmh}</span>
              <span className="text-xs text-slate-400 ml-1">
                ({(weather.wind_speed_knots ?? windKmh / 1.852).toFixed(1)} {t.conditions.knots})
              </span>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-slate-400 font-medium block">
                {t.conditions.wind_gust}
              </span>
              <strong className="text-xs font-bold text-slate-700">
                {weather.wind_gust_kmh ? `${Math.round(weather.wind_gust_kmh)} km/h` : '—'}
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECONDARY METRICS: Temp, Rain, Hazards (Clean compact row) ── */}
      <div className="grid grid-cols-3 gap-2.5">
        {/* TEMPERATURE */}
        <div className="bg-white rounded-xl border border-slate-200 p-3 text-center shadow-2xs">
          <div className="flex items-center justify-center gap-1 text-slate-400 mb-1">
            <Thermometer className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-[10px] font-bold uppercase tracking-wider">
              {t.conditions.temp}
            </span>
          </div>
          <p className="text-lg font-black text-slate-800 leading-tight">
            {Math.round(weather.temperature_c ?? 28)}°C
          </p>
        </div>

        {/* RAIN PROBABILITY */}
        <div className="bg-white rounded-xl border border-slate-200 p-3 text-center shadow-2xs">
          <div className="flex items-center justify-center gap-1 text-slate-400 mb-1">
            <CloudRain className="w-3.5 h-3.5 text-blue-500" />
            <span className="text-[10px] font-bold uppercase tracking-wider">
              {t.conditions.rain}
            </span>
          </div>
          <p className="text-lg font-black text-slate-800 leading-tight">
            {Math.round(weather.rain_probability ?? 10)}%
          </p>
        </div>

        {/* HAZARDS / ALERTS */}
        <div
          className={`rounded-xl border p-3 text-center shadow-2xs ${
            isHighRisk ? 'bg-red-50 border-red-200' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-center gap-1 text-slate-400 mb-1">
            {isHighRisk ? (
              <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
            ) : (
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            )}
            <span className="text-[10px] font-bold uppercase tracking-wider">
              {t.conditions.hazards}
            </span>
          </div>
          <p
            className={`text-sm font-black leading-tight truncate ${
              isHighRisk ? 'text-red-700' : 'text-emerald-700'
            }`}
          >
            {isHighRisk ? t.conditions.watch_out : t.conditions.clear}
          </p>
        </div>
      </div>
    </div>
  );
}
