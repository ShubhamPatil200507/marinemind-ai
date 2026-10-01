// frontend/src/components/WarningBanner.tsx
// High-visibility marine warning banner for outdoor daylight conditions
import React from 'react';
import { AlertTriangle, Info, XCircle, X } from 'lucide-react';

interface WarningBannerProps {
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  title: string;
  message: string;
  onDismiss?: () => void;
}

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
  onDismiss,
}) => {
  const conf = CONFIG[severity] ?? CONFIG.INFO;
  const { Icon } = conf;

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
            {conf.badgeText}
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
