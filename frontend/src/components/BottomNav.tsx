import React from 'react';
import { Home, Anchor, Navigation, MessageCircle, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  language: string;
}

const LABELS: Record<string, Record<string, string>> = {
  home:    { en: 'Home',    hi: 'होम',      mr: 'होम',      ta: 'வீடு'       },
  spots:   { en: 'Spots',   hi: 'स्थान',    mr: 'ठिकाण',   ta: 'இடம்'       },
  trip:    { en: 'Trip',    hi: 'यात्रा',   mr: 'प्रवास',  ta: 'பயணம்'      },
  ask:     { en: 'Ask',     hi: 'पूछें',    mr: 'विचारा',  ta: 'கேள்'       },
  profile: { en: 'Profile', hi: 'प्रोफाइल', mr: 'प्रोफाइल', ta: 'சுயவிவரம்' },
};

const TABS = [
  { id: 'home',    Icon: Home           },
  { id: 'spots',   Icon: Anchor         },
  { id: 'trip',    Icon: Navigation     },
  { id: 'ask',     Icon: MessageCircle  },
  { id: 'profile', Icon: User           },
] as const;

export function BottomNav({ activeTab, onTabChange, language }: BottomNavProps) {
  const lang = ['en', 'hi', 'mr', 'ta'].includes(language) ? language : 'en';

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 flex items-stretch">
      {TABS.map(({ id, Icon }) => {
        const isActive = activeTab === id;
        return (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`flex-1 flex flex-col items-center justify-center min-h-[56px] py-1 gap-0.5 transition-colors ${
              isActive ? 'text-blue-600' : 'text-slate-500'
            }`}
            aria-label={LABELS[id][lang]}
            aria-current={isActive ? 'page' : undefined}
          >
            {/* Active indicator dot */}
            <span
              className={`w-1.5 h-1.5 rounded-full mb-0.5 transition-all ${
                isActive ? 'bg-blue-600' : 'bg-transparent'
              }`}
            />
            <Icon
              size={22}
              strokeWidth={isActive ? 2.5 : 2}
              className="transition-all"
            />
            <span className={`text-[10px] font-medium leading-tight ${isActive ? 'font-semibold' : ''}`}>
              {LABELS[id][lang]}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
