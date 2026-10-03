// frontend/src/components/WarningBanner.tsx
// High-visibility marine warning banner for outdoor daylight conditions
import React from 'react';
import { AlertTriangle, Info, XCircle, X } from 'lucide-react';

import type { FishermanLang } from '../services/fishermanI18n';

interface WarningBannerProps {
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  title: string;
  message: string;
  badgeText?: string;
  language?: string;
  onDismiss?: () => void;
}

const BADGE_MAP: Record<FishermanLang, Record<'INFO' | 'WARNING' | 'CRITICAL', string>> = {
  en: { INFO: 'NOTICE', WARNING: 'ADVISORY', CRITICAL: 'STORM WARNING' },
  hi: { INFO: 'सूचना', WARNING: 'तटीय चेतावनी', CRITICAL: 'तूफान चेतावनी' },
  mr: { INFO: 'सूचना', WARNING: 'सागरी इशारा', CRITICAL: 'वादळ इशारा' },
  gu: { INFO: 'સૂચના', WARNING: 'દરિયાઈ ચેતવણી', CRITICAL: 'વાવાઝોડું ચેતવણી' },
  ta: { INFO: 'அறிவிப்பு', WARNING: 'கடல் எச்சரிக்கை', CRITICAL: 'புயல் எச்சரிக்கை' },
  ml: { INFO: 'അറിയിപ്പ്', WARNING: 'തീരദേശ മുന്നറിയിപ്പ്', CRITICAL: 'ചുഴലിക്കാറ്റ് മുന്നറിയിപ്പ്' },
  te: { INFO: 'నోటీసు', WARNING: 'తీరప్రాంత హెచ్చరిక', CRITICAL: 'తుఫాను హెచ్చరిక' },
  kn: { INFO: 'ಸೂಚನೆ', WARNING: 'ಕರಾವಳಿ ಎಚ್ಚರಿಕೆ', CRITICAL: 'ಬಿರುಗಾಳಿ ಎಚ್ಚರಿಕೆ' },
  bn: { INFO: 'বিজ্ঞপ্তি', WARNING: 'উপকূলীয় সতর্কতা', CRITICAL: 'ঝড় সতর্কতা' }
};

const CONFIG = {
  INFO: {
    bg: 'bg-blue-50/90',
    border: 'border-blue-500',
    text: 'text-blue-950',
    badge: 'bg-blue-200 text-blue-900',
    Icon: Info,
    badgeText: 'NOTICE',
  },
  WARNING: {
    bg: 'bg-amber-50/90',
    border: 'border-amber-500',
    text: 'text-amber-950',
    badge: 'bg-amber-200 text-amber-900',
    Icon: AlertTriangle,
    badgeText: 'ADVISORY',
  },
  CRITICAL: {
    bg: 'bg-red-50/95',
    border: 'border-red-600',
    text: 'text-red-950',
    badge: 'bg-red-600 text-white',
    Icon: XCircle,
    badgeText: 'STORM WARNING',
  },
};

export const WarningBanner: React.FC<WarningBannerProps> = ({
  severity,
  title,
  message,
  badgeText,
  language = 'en',
  onDismiss,
}) => {
  const conf = CONFIG[severity] ?? CONFIG.INFO;
  const { Icon } = conf;
  const code = (['en', 'hi', 'mr', 'gu', 'ta', 'ml', 'te', 'kn', 'bn'].includes(language)
    ? language
    : 'en') as FishermanLang;
  const displayBadge = badgeText || BADGE_MAP[code]?.[severity] || conf.badgeText;

  return (
    <div
      className={`${conf.bg} border-2 ${conf.border} rounded-2xl p-4 shadow-xs flex items-start gap-3 transition-all`}
      role="alert"
    >
      <div className="p-1.5 bg-white rounded-xl shadow-2xs shrink-0 mt-0.5">
        <Icon className={`w-5 h-5 ${severity === 'CRITICAL' ? 'text-red-600' : severity === 'WARNING' ? 'text-amber-600' : 'text-blue-600'}`} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${conf.badge}`}>
            {displayBadge}
          </span>
          <h4 className={`font-bold text-sm ${conf.text} leading-tight`}>{title}</h4>
        </div>
        <p className={`text-xs ${conf.text} leading-snug font-medium`}>{message}</p>
      </div>

      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className={`${conf.text} opacity-60 hover:opacity-100 shrink-0 p-1 rounded-lg hover:bg-black/5`}
          aria-label="Dismiss notice"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
