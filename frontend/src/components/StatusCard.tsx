// frontend/src/components/StatusCard.tsx
// High-contrast, outdoor-readable marine safety status card
import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, RefreshCw, Radio } from 'lucide-react';
import { getFishermanTranslation } from '../services/fishermanI18n';

type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL' | 'UNKNOWN';
type DataStatus = 'LIVE' | 'UNAVAILABLE' | 'UNKNOWN' | 'CACHED';

interface StatusCardProps {
  riskLevel: RiskLevel;
  riskScore: number;
  dataStatus: DataStatus;
  lastUpdated?: string;
  language: string;
  onRetry?: () => void;
  activeAdvisory?: string;
}

export function StatusCard({
  riskLevel,
  riskScore,
  dataStatus,
  lastUpdated,
  language,
  onRetry,
  activeAdvisory,
}: StatusCardProps) {
  const t = getFishermanTranslation(language);
  const normalizedLevel: RiskLevel = (
    ['LOW', 'MODERATE', 'HIGH', 'CRITICAL', 'UNKNOWN'].includes(riskLevel?.toUpperCase())
      ? riskLevel.toUpperCase()
      : 'UNKNOWN'
  ) as RiskLevel;

  // Visual configuration based on marine safety standard
  const config = {
    LOW: {
      cardBg: 'bg-emerald-50/70',
      border: 'border-emerald-500',
      badgeBg: 'bg-emerald-600 text-white',
      iconColor: 'text-emerald-600',
      headerBg: 'bg-emerald-100/80 text-emerald-950 border-emerald-300',
      title: t.status.good_to_go,
      desc: t.status.desc_low,
      Icon: CheckCircle2,
      accentBar: 'bg-emerald-500',
    },
    MODERATE: {
      cardBg: 'bg-amber-50/70',
      border: 'border-amber-500',
      badgeBg: 'bg-amber-500 text-white',
      iconColor: 'text-amber-600',
      headerBg: 'bg-amber-100/80 text-amber-950 border-amber-300',
      title: t.status.caution,
      desc: t.status.desc_moderate,
      Icon: AlertTriangle,
      accentBar: 'bg-amber-500',
    },
    HIGH: {
      cardBg: 'bg-orange-50/70',
      border: 'border-orange-500',
      badgeBg: 'bg-orange-600 text-white',
      iconColor: 'text-orange-600',
      headerBg: 'bg-orange-100/80 text-orange-950 border-orange-300',
      title: t.status.use_caution,
      desc: t.status.desc_high,
      Icon: AlertTriangle,
      accentBar: 'bg-orange-500',
    },
    CRITICAL: {
      cardBg: 'bg-red-50/80',
      border: 'border-red-600',
      badgeBg: 'bg-red-600 text-white',
      iconColor: 'text-red-600',
      headerBg: 'bg-red-100/90 text-red-950 border-red-300',
      title: t.status.stay_ashore,
      desc: t.status.desc_critical,
      Icon: XCircle,
      accentBar: 'bg-red-600',
    },
    UNKNOWN: {
      cardBg: 'bg-slate-50',
      border: 'border-slate-300',
      badgeBg: 'bg-slate-600 text-white',
      iconColor: 'text-slate-500',
      headerBg: 'bg-slate-100 text-slate-900 border-slate-200',
      title: t.status.checking,
      desc: t.status.desc_unknown,
      Icon: Radio,
      accentBar: 'bg-slate-400',
    },
  }[normalizedLevel];

  const { Icon } = config;

  return (
    <div
      className={`relative w-full rounded-2xl border-2 ${config.border} ${config.cardBg} shadow-xs overflow-hidden transition-all`}
    >
      {/* Top authoritative colored accent stripe */}
      <div className={`h-2 w-full ${config.accentBar}`} />

      <div className="p-3.5 sm:p-6 space-y-3 sm:space-y-4">
        {/* Main Verdict & Visual Icon */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div
            className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-white shadow-xs border border-black/5 flex items-center justify-center shrink-0 ${config.iconColor}`}
          >
            <Icon className="w-7 h-7 sm:w-9 sm:h-9" strokeWidth={2.4} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                {t.status.safety_verdict}
              </span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-black/5 text-slate-600">
                {riskScore}/100
              </span>
            </div>
            <h2
              className="text-lg sm:text-2xl font-black tracking-tight leading-tight text-slate-900"
            >
              {config.title}
            </h2>
          </div>
        </div>

        {/* Actionable Plain-Language Advice */}
        <div className="p-3 sm:p-3.5 bg-white/95 rounded-xl border border-black/5 shadow-2xs">
          <p className="text-xs sm:text-base font-semibold text-slate-800 leading-snug">
            {config.desc}
          </p>
        </div>

        {/* Authoritative Coastal Advisory Match */}
        {activeAdvisory && (
          <div className="p-3 bg-white/95 rounded-xl border border-amber-300 shadow-2xs flex items-start gap-2.5">
            <span className="text-base shrink-0">📢</span>
            <div className="min-w-0">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 block leading-tight">
                Official Coastal Advisory Match
              </span>
              <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug mt-0.5">
                {activeAdvisory}
              </p>
            </div>
          </div>
        )}

        {/* Data Unavailable / Reconnecting Banner */}
        {dataStatus === 'UNAVAILABLE' && (
          <div className="bg-amber-100/90 border border-amber-300 rounded-xl p-3 flex items-center justify-between gap-3 text-amber-950">
            <div className="flex items-center gap-2 min-w-0">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <p className="text-xs font-semibold leading-tight truncate">
                {t.status.data_unavailable_warning}
              </p>
            </div>
            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="flex items-center gap-1 text-xs font-bold bg-amber-200 hover:bg-amber-300 text-amber-900 px-3 py-1.5 rounded-lg shrink-0 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>{t.status.retry}</span>
              </button>
            )}
          </div>
        )}

        {/* Status Card Footer: Data Provenance & Timestamp */}
        <div className="flex items-center justify-between pt-2 border-t border-black/5 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">🕒</span>
            <span>
              {t.status.last_updated}: <strong className="text-slate-700">{lastUpdated || '06:00 IST'}</strong>
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                dataStatus === 'LIVE'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : dataStatus === 'CACHED'
                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                  : 'bg-slate-200 text-slate-700'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  dataStatus === 'LIVE'
                    ? 'bg-emerald-500 animate-pulse'
                    : dataStatus === 'CACHED'
                    ? 'bg-amber-500'
                    : 'bg-slate-400'
                }`}
              />
              {dataStatus === 'LIVE'
                ? t.status.live
                : dataStatus === 'CACHED'
                ? 'CACHED / OFFLINE'
                : t.status.unavailable}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
