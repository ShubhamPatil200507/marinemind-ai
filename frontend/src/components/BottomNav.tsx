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
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t-2 border-slate-200 flex items-stretch shadow-lg"
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
            className={`flex-1 flex flex-col items-center justify-center min-h-[58px] py-1.5 transition-all select-none ${
              isActive
                ? 'text-blue-600 bg-blue-50/40'
                : 'text-slate-500 hover:text-slate-700 active:bg-slate-50'
            }`}
            aria-label={label}
            aria-current={isActive ? 'page' : undefined}
          >
            {/* Top active indicator line */}
            <span
              className={`w-8 h-1 rounded-full mb-1 transition-all ${
                isActive ? 'bg-blue-600 scale-100' : 'bg-transparent scale-0'
              }`}
            />

            <Icon
              size={22}
              strokeWidth={isActive ? 2.6 : 2}
              className={`transition-transform ${isActive ? 'scale-110' : ''}`}
            />

            <span
              className={`text-[11px] leading-tight mt-0.5 ${
                isActive ? 'font-black text-blue-700' : 'font-semibold text-slate-500'
              }`}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
