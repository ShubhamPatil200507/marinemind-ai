// frontend/src/components/ProfileTab.tsx
import React from 'react';
import {
  User, Ship, Phone, MapPin, Globe, AlertOctagon, LogOut,
  ShieldCheck, FileText, Check, ChevronRight, HelpCircle
} from 'lucide-react';
import type { UserProfile } from './AuthLanding';

interface ProfileTabProps {
  user: UserProfile | null;
  language: string;
  onLanguageChange: (lang: string) => void;
  onLogout: () => void;
  onOpenNotice?: () => void;
}

const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' }
];

const LABELS: Record<string, Record<string, string>> = {
  title:        { en: 'Profile & Settings', hi: 'प्रोफाइल और सेटिंग्स', mr: 'प्रोफाइल आणि सेटिंग्ज', ta: 'சுயவிவரம் & அமைப்புகள்' },
  skipper_info: { en: 'Vessel & Skipper Information', hi: 'नौका एवं नाविक विवरण', mr: 'नौका व नाविक माहिती', ta: 'படகு மற்றும் மாலுமி தகவல்' },
  language_sel: { en: 'Preferred Language', hi: 'पसंदीदा भाषा', mr: 'पसंतीची भाषा', ta: 'விருப்பமான மொழி' },
  emergency:    { en: 'Official Marine Emergency Contacts', hi: 'आपातकालीन संपर्क', mr: 'तातडीचे संपर्क', ta: 'அவசர தொடர்பு எண்கள்' },
  icg:          { en: 'Indian Coast Guard (Toll Free SAR)', hi: 'भारतीय तटरक्षक बल', mr: 'भारतीय तटरक्षक दल', ta: 'இந்திய கடலோர காவல்படை' },
  toll_free:    { en: 'National Fisheries Helpline', hi: 'राष्ट्रीय मत्स्य पालन हेल्पलाइन', mr: 'राष्ट्रीय मत्स्यपालन हेल्पलाइन', ta: 'தேசிய மீன்வள உதவி எண்' },
  disaster:     { en: 'State Maritime Emergency Control', hi: 'राज्य आपदा नियंत्रण', mr: 'राज्य आपत्ती नियंत्रण कक्ष', ta: 'மாநில கடல்சார் கட்டுப்பாட்டு அறை' },
  statutory:    { en: 'View Statutory Marine Notice', hi: 'वैधानिक सूचना देखें', mr: 'वैधानिक सूचना पाहा', ta: 'சட்டரீதியான அறிவிப்பு' },
  logout:       { en: 'Log Out of MarineMind', hi: 'लॉग आउट', mr: 'लॉग आउट करा', ta: 'வெளியேறு' },
  offline_note: { en: 'Emergency numbers connect directly over standard mobile/cellular telecom networks.', hi: 'आपातकालीन नंबर सीधे सेलुलर नेटवर्क से जुड़ते हैं।', mr: 'तातडीचे क्रमांक थेट मोबाईल नेटवर्कद्वारे जोडले जातात.', ta: 'அவசர எண்கள் நேரடியாக மொபைல் நெட்வொர்க்கில் இணையும்.' },
};

export const ProfileTab: React.FC<ProfileTabProps> = ({
  user,
  language,
  onLanguageChange,
  onLogout,
  onOpenNotice
}) => {
  const lang = ['en', 'hi', 'mr', 'ta'].includes(language) ? language : 'en';

  return (
    <div className="max-w-2xl mx-auto px-4 py-5 space-y-5">
      {/* ── Header ── */}
      <header>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          <span>{LABELS.title[lang]}</span>
        </h1>
      </header>

      {/* ── Skipper / Vessel Details Card ── */}
      <section aria-label="Skipper Details" className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg border border-blue-100">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'C'}
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-900">{user?.name || 'Capt. Ramesh Patil'}</h2>
            <p className="text-xs text-slate-500 capitalize">{user?.role || 'Licensed Skipper / Fisherman'}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <Ship className="w-4 h-4 text-blue-600 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 font-medium block">Vessel Registration</span>
              <strong className="text-xs text-slate-800 font-mono">{user?.vessel_id || 'IND-MH-01-MM-8492'}</strong>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 font-medium block">Home Fishing Harbor</span>
              <strong className="text-xs text-slate-800">{user?.home_port || 'Mumbai (Sassoon Docks)'}</strong>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 sm:col-span-2">
            <Phone className="w-4 h-4 text-slate-500 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 font-medium block">Registered Mobile</span>
              <strong className="text-xs text-slate-800 font-mono">{user?.phone || '+91 98201 45892'}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* ── Language Selector (Large Touch Buttons) ── */}
      <section aria-label="Language Selector" className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-blue-600" />
          <h2 className="text-xs font-bold text-slate-600 uppercase tracking-wider">
            {LABELS.language_sel[lang]}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {LANGUAGES.map((item) => {
            const isSelected = language === item.code;
            return (
              <button
                key={item.code}
                type="button"
                onClick={() => onLanguageChange(item.code)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all min-h-[50px] ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold ring-1 ring-blue-600 shadow-xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="text-left">
                  <span className="block text-sm">{item.native}</span>
                  <span className="text-[10px] text-slate-400 font-normal">{item.label}</span>
                </div>
                {isSelected && (
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Emergency Help (Highly visible, genuine numbers) ── */}
      <section aria-label="Official Marine Emergency Contacts" className="bg-red-50/70 border border-red-200 rounded-2xl p-5 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <AlertOctagon className="w-5 h-5 text-red-600" />
          <h2 className="text-sm font-bold text-red-950">
            {LABELS.emergency[lang]}
          </h2>
        </div>

        <div className="space-y-2">
          <a
            href="tel:1554"
            className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-red-200 shadow-xs hover:bg-red-50/50 active:bg-red-100 transition-colors min-h-[54px]"
          >
            <div>
              <span className="block text-xs font-bold text-red-900">{LABELS.icg[lang]}</span>
              <span className="text-[11px] text-slate-500">Search and Rescue Operations</span>
            </div>
            <strong className="text-base font-extrabold text-red-600 font-mono">1554</strong>
          </a>

          <a
            href="tel:18001801407"
            className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-red-200 shadow-xs hover:bg-red-50/50 active:bg-red-100 transition-colors min-h-[54px]"
          >
            <div>
              <span className="block text-xs font-bold text-slate-800">{LABELS.toll_free[lang]}</span>
              <span className="text-[11px] text-slate-500">Toll Free Information Helpline</span>
            </div>
            <strong className="text-sm font-bold text-slate-800 font-mono">1800-180-1407</strong>
          </a>

          <a
            href="tel:1070"
            className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-red-200 shadow-xs hover:bg-red-50/50 active:bg-red-100 transition-colors min-h-[54px]"
          >
            <div>
              <span className="block text-xs font-bold text-slate-800">{LABELS.disaster[lang]}</span>
              <span className="text-[11px] text-slate-500">Disaster Management Helpline</span>
            </div>
            <strong className="text-sm font-bold text-slate-800 font-mono">1070</strong>
          </a>
        </div>

        <p className="text-[11px] text-red-800/80 leading-snug">
          ℹ️ {LABELS.offline_note[lang]}
        </p>
      </section>

      {/* ── Statutory Notice & Legal ── */}
      <section aria-label="Legal and Statutory Notices" className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
        <button
          type="button"
          onClick={onOpenNotice}
          className="w-full flex items-center justify-between text-left p-2 rounded-xl hover:bg-slate-50 transition-colors min-h-[44px]"
        >
          <div className="flex items-center gap-2.5 text-slate-700">
            <FileText className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-semibold">{LABELS.statutory[lang]}</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>
      </section>

      {/* ── Logout Button ── */}
      <section aria-label="User Account Session">
        <button
          type="button"
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-5 py-4 bg-slate-100 hover:bg-red-50 active:bg-red-100 text-slate-700 hover:text-red-700 border border-slate-200 rounded-2xl font-bold text-sm transition-colors min-h-[52px]"
        >
          <LogOut className="w-4 h-4" />
          <span>{LABELS.logout[lang]}</span>
        </button>
      </section>
    </div>
  );
};
