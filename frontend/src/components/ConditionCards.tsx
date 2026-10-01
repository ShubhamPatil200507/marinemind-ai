import React from 'react';
import type { WeatherData } from '../types/marine';

interface ConditionCardsProps {
  weather: WeatherData;
  language: string;
}

// ─── i18n ────────────────────────────────────────────────────────────────────

const TEXT: Record<string, Record<string, string>> = {
  sea:      { en: 'Sea',       hi: 'समुद्र',   mr: 'समुद्र',    ta: 'கடல்'     },
  wind:     { en: 'Wind',      hi: 'हवा',      mr: 'वारा',      ta: 'காற்று'   },
  temp:     { en: 'Temp',      hi: 'तापमान',   mr: 'तापमान',   ta: 'வெப்பம்'  },
  rain:     { en: 'Rain',      hi: 'बारिश',    mr: 'पाऊस',     ta: 'மழை'      },
  alert:    { en: 'Alert',     hi: 'अलर्ट',    mr: 'अलर्ट',    ta: 'எச்சரிக்கை' },
  calm:     { en: 'Calm',      hi: 'शांत',     mr: 'शांत',     ta: 'அமைதி'    },
  moderate: { en: 'Moderate',  hi: 'मध्यम',    mr: 'मध्यम',    ta: 'மிதமான'   },
  rough:    { en: 'Rough',     hi: 'उग्र',     mr: 'खडबडीत',   ta: 'கரடுமுரடான' },
  light:    { en: 'Light',     hi: 'हल्की',    mr: 'हलका',     ta: 'இலேசான'   },
  strong:   { en: 'Strong',    hi: 'तेज',      mr: 'जोरदार',   ta: 'வலுவான'   },
  clear:    { en: 'Clear',     hi: 'साफ',      mr: 'स्वच्छ',   ta: 'தெளிவான'  },
  watch:    { en: 'Watch out', hi: 'ध्यान दें', mr: 'सावध राहा', ta: 'கவனமாக இருங்கள்' },
};

const t = (key: string, lang: string): string =>
  TEXT[key]?.[lang] ?? TEXT[key]?.['en'] ?? key;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function waveLabel(m: number, lang: string) {
  if (m <= 1.0) return { label: t('calm', lang),     color: 'text-emerald-600' };
  if (m <= 2.5) return { label: t('moderate', lang), color: 'text-amber-500'   };
  return             { label: t('rough', lang),      color: 'text-red-600'     };
}

function windLabel(kmh: number, lang: string) {
  if (kmh <= 20) return { label: t('light', lang),    color: 'text-emerald-600' };
  if (kmh <= 40) return { label: t('moderate', lang), color: 'text-amber-500'   };
  return              { label: t('strong', lang),    color: 'text-red-600'     };
}

function tempColor(c: number) {
  if (c < 20) return 'text-blue-500';
  if (c < 35) return 'text-emerald-600';
  return 'text-red-500';
}

function rainColor(pct: number) {
  if (pct < 30) return 'text-emerald-600';
  if (pct < 60) return 'text-amber-500';
  return 'text-red-600';
}

function lightningLabel(risk: string, lang: string) {
  const r = risk?.toLowerCase() ?? '';
  if (r === 'none' || r === 'low' || r === 'no') return { label: t('clear', lang), color: 'text-emerald-600' };
  return { label: t('watch', lang), color: 'text-red-600' };
}

// ─── Sub-card ────────────────────────────────────────────────────────────────

interface MetricCardProps {
  emoji: string;
  title: string;
  value: React.ReactNode;
  valueColor: string;
  subLabel?: string;
}

function MetricCard({ emoji, title, value, valueColor, subLabel }: MetricCardProps) {
  return (
    <div className="flex-shrink-0 w-[90px] bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center py-3 px-2 gap-1">
      <span className="text-2xl leading-none">{emoji}</span>
      <span className={`text-xl font-bold leading-tight ${valueColor}`}>{value}</span>
      {subLabel && <span className="text-[10px] text-slate-500 text-center leading-tight">{subLabel}</span>}
      <span className="text-[10px] text-slate-400 font-medium">{title}</span>
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export function ConditionCards({ weather, language }: ConditionCardsProps) {
  const lang = ['en', 'hi', 'mr', 'ta'].includes(language) ? language : 'en';

  const wave   = waveLabel(weather.wave_height_m, lang);
  const wind   = windLabel(weather.wind_speed_kmh, lang);
  const ltng   = lightningLabel(weather.lightning_risk, lang);

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 px-1 scrollbar-hide snap-x snap-mandatory">
      {/* Sea */}
      <div className="snap-start">
        <MetricCard
          emoji="🌊"
          title={t('sea', lang)}
          value={`${weather.wave_height_m.toFixed(1)}m`}
          valueColor={wave.color}
          subLabel={wave.label}
        />
      </div>

      {/* Wind */}
      <div className="snap-start">
        <MetricCard
          emoji="💨"
          title={t('wind', lang)}
          value={`${Math.round(weather.wind_speed_kmh)}`}
          valueColor={wind.color}
          subLabel={`${wind.label} km/h`}
        />
      </div>

      {/* Temp */}
      <div className="snap-start">
        <MetricCard
          emoji="🌡"
          title={t('temp', lang)}
          value={`${Math.round(weather.temperature_c)}°C`}
          valueColor={tempColor(weather.temperature_c)}
        />
      </div>

      {/* Rain */}
      <div className="snap-start">
        <MetricCard
          emoji="🌧"
          title={t('rain', lang)}
          value={`${Math.round(weather.rain_probability)}%`}
          valueColor={rainColor(weather.rain_probability)}
        />
      </div>

      {/* Lightning */}
      <div className="snap-start">
        <MetricCard
          emoji="⚡"
          title={t('alert', lang)}
          value={ltng.label}
          valueColor={ltng.color}
        />
      </div>
    </div>
  );
}
