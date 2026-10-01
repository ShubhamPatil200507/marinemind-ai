import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, HelpCircle, RefreshCw } from 'lucide-react';

type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL' | 'UNKNOWN';
type DataStatus = 'LIVE' | 'UNAVAILABLE' | 'UNKNOWN';

interface StatusCardProps {
  riskLevel: RiskLevel;
  riskScore: number;
  dataStatus: DataStatus;
  lastUpdated?: string;
  language: string;
  onRetry?: () => void;
}

// ─── i18n ───────────────────────────────────────────────────────────────────

const TEXT: Record<string, Record<string, string>> = {
  good_to_go:       { en: 'GOOD TO GO',    hi: 'जाना सुरक्षित है',  mr: 'जाणे सुरक्षित',   ta: 'போகலாம்'        },
  caution:          { en: 'CAUTION',        hi: 'सावधान',             mr: 'सावधान',           ta: 'எச்சரிக்கை'      },
  use_caution:      { en: 'USE CAUTION',    hi: 'ध्यान से जाएं',     mr: 'काळजी घ्या',      ta: 'கவனமாக போங்கள்' },
  stay_ashore:      { en: 'STAY ASHORE',    hi: 'समुद्र में न जाएं', mr: 'किनाऱ्यावर राहा', ta: 'கரையிலேயே இருங்கள்' },
  checking:         { en: 'CHECKING...',    hi: 'जाँच हो रही है...',  mr: 'तपासत आहे...',    ta: 'சரிபார்க்கிறது...' },
  desc_low:         { en: 'Sea conditions are suitable for fishing.',        hi: 'समुद्री स्थिति मछली पकड़ने के लिए उपयुक्त है।', mr: 'समुद्री परिस्थिती मासेमारीसाठी योग्य आहे।', ta: 'கடல் நிலைமைகள் மீன்பிடிக்க ஏற்றதாக உள்ளன.' },
  desc_moderate:    { en: 'Moderate winds expected — proceed with care.',    hi: 'मध्यम हवाएं अपेक्षित हैं — सावधानी से जाएं।', mr: 'मध्यम वारे अपेक्षित — काळजीने जा.', ta: 'மிதமான காற்று எதிர்பார்க்கப்படுகிறது — கவனமாக செல்லுங்கள்.' },
  desc_high:        { en: 'Strong winds expected — use caution.',            hi: 'तेज हवाएं अपेक्षित हैं — सावधानी बरतें।', mr: 'जोरदार वारे अपेक्षित — काळजी घ्या.', ta: 'கடுமையான காற்று எதிர்பார்க்கப்படுகிறது — கவனமாக இருங்கள்.' },
  desc_critical:    { en: 'Dangerous conditions — do not go to sea today.',  hi: 'खतरनाक स्थिति — आज समुद्र में न जाएं।', mr: 'धोकादायक परिस्थिती — आज समुद्रात जाऊ नका.', ta: 'ஆபத்தான நிலைமைகள் — இன்று கடலுக்கு போகாதீர்கள்.' },
  desc_unknown:     { en: 'Fetching latest conditions...',                    hi: 'नवीनतम स्थिति प्राप्त हो रही है...', mr: 'नवीनतम परिस्थिती मिळवत आहे...', ta: 'சமீபத்திய நிலைமைகளை பெறுகிறது...' },
  last_updated:     { en: 'Last updated',   hi: 'अंतिम अपडेट',  mr: 'शेवटचे अपडेट', ta: 'கடைசியாக புதுப்பிக்கப்பட்டது' },
  live:             { en: 'Live',           hi: 'लाइव',          mr: 'थेट',           ta: 'நேரடி'          },
  unavailable:      { en: 'Unavailable',    hi: 'उपलब्ध नहीं',  mr: 'उपलब्ध नाही',  ta: 'கிடைக்கவில்லை'  },
  data_unavailable: { en: 'Weather data unavailable — conditions could not be verified.', hi: 'मौसम डेटा उपलब्ध नहीं — स्थिति की पुष्टि नहीं हो सकी।', mr: 'हवामान डेटा उपलब्ध नाही — परिस्थितीची पुष्टी करता आली नाही.', ta: 'வானிலை தரவு கிடைக்கவில்லை — நிலைமைகளை சரிபார்க்க முடியவில்லை.' },
  retry:            { en: 'Retry',          hi: 'पुनः प्रयास',  mr: 'पुन्हा प्रयत्न', ta: 'மீண்டும் முயற்சி' },
};

const t = (key: string, lang: string): string =>
  TEXT[key]?.[lang] ?? TEXT[key]?.['en'] ?? key;

// ─── Config per risk level ───────────────────────────────────────────────────

type Config = {
  bg: string;
  border: string;
  iconColor: string;
  Icon: React.ElementType;
  label: string;
  descKey: string;
};

const CONFIG: Record<RiskLevel, Config> = {
  LOW:      { bg: 'bg-emerald-50', border: 'border-emerald-200', iconColor: 'text-emerald-500', Icon: CheckCircle2,   label: 'good_to_go',  descKey: 'desc_low'      },
  MODERATE: { bg: 'bg-amber-50',   border: 'border-amber-200',   iconColor: 'text-amber-500',   Icon: AlertTriangle,  label: 'caution',     descKey: 'desc_moderate' },
  HIGH:     { bg: 'bg-orange-50',  border: 'border-orange-200',  iconColor: 'text-orange-500',  Icon: AlertTriangle,  label: 'use_caution', descKey: 'desc_high'     },
  CRITICAL: { bg: 'bg-red-50',     border: 'border-red-200',     iconColor: 'text-red-600',     Icon: XCircle,        label: 'stay_ashore', descKey: 'desc_critical' },
  UNKNOWN:  { bg: 'bg-slate-50',   border: 'border-slate-200',   iconColor: 'text-slate-400',   Icon: HelpCircle,     label: 'checking',    descKey: 'desc_unknown'  },
};

// ─── Component ───────────────────────────────────────────────────────────────

export function StatusCard({ riskLevel, riskScore: _riskScore, dataStatus, lastUpdated, language, onRetry }: StatusCardProps) {
  const lang = ['en', 'hi', 'mr', 'ta'].includes(language) ? language : 'en';
  const level: RiskLevel = (['LOW', 'MODERATE', 'HIGH', 'CRITICAL', 'UNKNOWN'].includes(riskLevel) ? riskLevel : 'UNKNOWN') as RiskLevel;
  const { bg, border, iconColor, Icon, label, descKey } = CONFIG[level];

  return (
    <div className={`w-full rounded-2xl shadow-md border-2 p-6 ${bg} ${border}`}>
      {/* Status display */}
      <div className="flex flex-col items-center gap-3 mb-4">
        <Icon size={56} strokeWidth={1.8} className={iconColor} />
        <span className={`text-2xl font-extrabold tracking-wide ${iconColor}`}>
          {t(label, lang)}
        </span>
        <p className="text-sm text-slate-600 text-center leading-snug">
          {t(descKey, lang)}
        </p>
      </div>

      {/* Data unavailable banner */}
      {dataStatus === 'UNAVAILABLE' && (
        <div className="mt-3 mb-2 bg-amber-100 border border-amber-300 rounded-xl p-3 flex items-start gap-2">
          <AlertTriangle size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-xs text-amber-800 leading-snug">{t('data_unavailable', lang)}</p>
          </div>
          {onRetry && (
            <button
              onClick={onRetry}
              className="flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-200 rounded-lg px-2 py-1 active:bg-amber-300 min-h-[36px]"
            >
              <RefreshCw size={12} />
              {t('retry', lang)}
            </button>
          )}
        </div>
      )}

      {/* Footer: timestamp + live badge */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-black/10">
        <span className="text-[11px] text-slate-500">
          {t('last_updated', lang)}: {lastUpdated ?? '—'}
        </span>
        <span className={`flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${
          dataStatus === 'LIVE'
            ? 'bg-emerald-100 text-emerald-700'
            : 'bg-slate-100 text-slate-500'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${
            dataStatus === 'LIVE' ? 'bg-emerald-500' : 'bg-slate-400'
          }`} />
          {dataStatus === 'LIVE' ? t('live', lang) : t('unavailable', lang)}
        </span>
      </div>
    </div>
  );
}
