// frontend/src/components/WarningBanner.tsx
import React from 'react';
import { AlertTriangle, Info, XCircle, X } from 'lucide-react';

interface WarningBannerProps {
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  title: string;
  message: string;
  onDismiss?: () => void;
}

const CONFIG = {
  INFO:     { bg: 'bg-blue-50',   border: 'border-blue-500',  text: 'text-blue-900',  Icon: Info          },
  WARNING:  { bg: 'bg-amber-50',  border: 'border-amber-500', text: 'text-amber-900', Icon: AlertTriangle  },
  CRITICAL: { bg: 'bg-red-100',   border: 'border-red-600',   text: 'text-red-900',   Icon: XCircle        }
};

export const WarningBanner: React.FC<WarningBannerProps> = ({ severity, title, message, onDismiss }) => {
  const { bg, border, text, Icon } = CONFIG[severity] ?? CONFIG.INFO;

  return (
    <div className={`${bg} border-l-4 ${border} rounded-r-xl p-4 flex gap-3 items-start`}>
      <Icon className={`${text} mt-0.5 shrink-0`} size={20} />
      <div className="flex-1 min-w-0">
        <p className={`font-semibold text-sm ${text}`}>{title}</p>
        <p className={`text-sm mt-0.5 ${text} opacity-90 leading-snug`}>{message}</p>
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className={`${text} opacity-60 hover:opacity-100 shrink-0 p-1`}
          aria-label="Dismiss"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};
