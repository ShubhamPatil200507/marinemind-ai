// frontend/src/components/OfflineBanner.tsx
import React from 'react';
import { WifiOff, Radio, ShieldCheck } from 'lucide-react';

interface OfflineBannerProps {
  isOffline: boolean;
  isCachedData?: boolean;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({ isOffline, isCachedData }) => {
  if (!isOffline && !isCachedData) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="bg-amber-600 text-white px-4 py-2 sm:py-2.5 text-xs font-bold flex items-center justify-between gap-2 shadow-sm transition-all"
    >
      <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
        {isOffline ? (
          <WifiOff className="w-4 h-4 shrink-0 text-amber-200 animate-pulse" />
        ) : (
          <Radio className="w-4 h-4 shrink-0 text-amber-200" />
        )}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 leading-tight">
          <span className="uppercase tracking-wider font-black text-amber-100 text-[10px]">
            {isOffline ? 'Offshore Mode (Offline)' : 'Pre-Voyage Cache Active'}
          </span>
          <span className="hidden sm:inline text-amber-300">·</span>
          <span className="text-white font-medium">
            {isOffline
              ? 'You are out of cellular coverage at sea. Using cached IMD bulletins and vessel navigation waypoints.'
              : 'Serving verified cached coastal bulletin. Live sync will resume automatically when signal restores.'}
          </span>
        </div>
        <div className="ml-auto shrink-0 hidden md:flex items-center gap-1 text-[10px] bg-amber-700/80 px-2 py-0.5 rounded text-amber-100 font-semibold border border-amber-500/50">
          <ShieldCheck className="w-3 h-3 text-amber-200" />
          <span>Local Safe Cache</span>
        </div>
      </div>
    </div>
  );
};
