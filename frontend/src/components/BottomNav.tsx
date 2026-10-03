// frontend/src/components/BottomNav.tsx
// Fixed bottom navigation bar with 56px thumb targets and tactile feedback
import React from 'react';
import { Home, Anchor, Navigation, MessageCircle, User } from 'lucide-react';
import { getFishermanTranslation } from '../services/fishermanI18n';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  language: string;
}

const TABS = [
  { id: 'home', Icon: Home },
  { id: 'spots', Icon: Anchor },
  { id: 'trip', Icon: Navigation },
  { id: 'ask', Icon: MessageCircle },
  { id: 'profile', Icon: User },
] as const;

export function BottomNav({ activeTab, onTabChange, language }: BottomNavProps) {
  const t = getFishermanTranslation(language);

  const tabLabels: Record<string, string> = {
    home: t.nav.home,
    spots: t.nav.spots,
    trip: t.nav.trip,
    ask: t.nav.ask,
    profile: t.nav.profile,
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-lg border-t border-slate-200/90 flex items-stretch shadow-[0_-4px_20px_rgba(15,23,42,0.06)] pb-[max(0.35rem,env(safe-area-inset-bottom))] pt-1"
      aria-label="Marine navigation tabs"
    >
      {TABS.map(({ id, Icon }) => {
        const isActive = activeTab === id;
        const label = tabLabels[id] || id;

        return (
          <button
            key={id}
            type="button"
            onClick={() => onTabChange(id)}
            className={`flex-1 flex flex-col items-center justify-center min-h-[54px] py-1 px-1 transition-all select-none active:scale-95 ${
              isActive
                ? 'text-blue-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
            aria-label={label}
            aria-current={isActive ? 'page' : undefined}
          >
            <div
              className={`flex flex-col items-center justify-center w-full max-w-[64px] py-0.5 rounded-xl transition-all ${
                isActive ? 'bg-blue-50/90 font-bold' : ''
              }`}
            >
              <Icon
                size={21}
                strokeWidth={isActive ? 2.5 : 1.9}
                className={`transition-transform duration-200 ${isActive ? 'scale-105 text-blue-600' : 'text-slate-500'}`}
              />
              <span
                className={`text-[10px] sm:text-[11px] leading-tight mt-0.5 truncate tracking-tight ${
                  isActive ? 'font-black text-blue-700' : 'font-medium text-slate-500'
                }`}
              >
                {label}
              </span>
            </div>
          </button>
        );
      })}
    </nav>
  );
}
