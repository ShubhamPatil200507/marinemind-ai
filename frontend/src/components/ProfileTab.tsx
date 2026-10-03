// frontend/src/components/ProfileTab.tsx
// Skipper Profile, 1-Tap Language Switcher, and Official Marine Emergency Contacts
import React from 'react';
import {
  User, Ship, Phone, MapPin, Globe, AlertOctagon, LogOut,
  FileText, Check, PhoneCall
} from 'lucide-react';
import type { UserProfile } from './AuthLanding';
import { EMERGENCY_CONTACTS } from '../constants/emergency';
import { getFishermanTranslation, SUPPORTED_LANGUAGES, type FishermanLang } from '../services/fishermanI18n';

interface ProfileTabProps {
  user: UserProfile | null;
  language: string;
  onLanguageChange: (lang: string) => void;
  onLogout: () => void;
  onOpenNotice?: () => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  user,
  language,
  onLanguageChange,
  onLogout,
  onOpenNotice,
}) => {
  const t = getFishermanTranslation(language);

  return (
    <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-3.5 sm:py-5 space-y-3.5 sm:space-y-6">
      {/* ── Header ── */}
      <header className="bg-white p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs">
        <h1 className="text-lg sm:text-2xl font-black text-slate-900 flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          <span>{t.profile.title}</span>
        </h1>
      </header>

      {/* ── Responsive 2-Column Grid (1 Column on Mobile, 2 Columns on Laptop/Desktop) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-6 items-start">
        {/* Left Column: Skipper Profile & Language Selector (6 cols on lg) */}
        <div className="lg:col-span-6 space-y-3.5 sm:space-y-6">
          {/* Skipper / Vessel Details Card */}
          <section
            aria-label="Skipper Details"
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-13 h-13 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-xl shadow-xs">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'C'}
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">
                  {user?.name || 'Capt. Ramesh Patil'}
                </h2>
                <p className="text-xs text-blue-700 font-bold">{t.profile.skipper_title}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <Ship className="w-4 h-4 text-blue-600 shrink-0" />
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    {t.profile.vessel_id}
                  </span>
                  <strong className="text-xs text-slate-900 font-mono font-bold truncate block">
                    {user?.vessel_id || 'IND-MH-01-MM-8492'}
                  </strong>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    {t.profile.home_port}
                  </span>
                  <strong className="text-xs text-slate-900 font-bold truncate block">
                    {user?.home_port || 'Mumbai Sassoon Docks'}
                  </strong>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 sm:col-span-2">
                <Phone className="w-4 h-4 text-slate-600 shrink-0" />
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    {t.profile.registered_phone}
                  </span>
                  <strong className="text-xs text-slate-900 font-mono font-bold truncate block">
                    {user?.phone || '+91 98201 45892'}
                  </strong>
                </div>
              </div>
            </div>
          </section>

          {/* 1-Tap Language Switcher (All Coastal Languages) */}
          <section
            aria-label="Language Selector"
            className="bg-white rounded-2xl border-2 border-blue-100 p-5 shadow-2xs space-y-3.5"
          >
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600" />
              <div>
                <h2 className="text-sm font-black text-slate-900">
                  {t.profile.preferred_language}
                </h2>
                <p className="text-[11px] text-slate-500 font-medium">
                  {t.profile.select_language_sub}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2.5">
              {SUPPORTED_LANGUAGES.map((item) => {
                const isSelected = language === item.code;
                return (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => onLanguageChange(item.code)}
                    className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all min-h-[56px] text-left ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/90 text-blue-950 font-black shadow-xs ring-2 ring-blue-600/30'
                        : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <div className="min-w-0 pr-1">
                      <span className="block text-sm sm:text-base font-bold leading-tight truncate">
                        {item.native}
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium block truncate">
                        {item.label}
                      </span>
                    </div>

                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center border-2 shrink-0 ${
                        isSelected
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-slate-300'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* Right Column: Emergency SOS Contacts & Legal (6 cols on lg) */}
        <div className="lg:col-span-6 space-y-6">

      {/* ── Official Marine Emergency Contacts (High visibility, direct 1-tap call) ── */}
      <section
        aria-label="Official Marine Emergency Contacts"
        className="bg-red-50/90 border-2 border-red-300 rounded-2xl p-5 shadow-xs space-y-3.5"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-black text-red-950">
              {t.profile.emergency_contacts_title}
            </h2>
            <p className="text-xs text-red-800 font-medium">
              {t.profile.emergency_desc}
            </p>
          </div>
        </div>

        <div className="space-y-2.5">
          {/* ICG SAR */}
          <a
            href={`tel:${EMERGENCY_CONTACTS.COAST_GUARD_SAR}`}
            className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-red-300 hover:border-red-500 hover:bg-red-50/40 active:bg-red-100 shadow-2xs transition-all min-h-[60px]"
          >
            <div>
              <span className="block text-xs sm:text-sm font-black text-red-950">
                {t.profile.icg_title}
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                {t.profile.icg_desc}
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0 ml-3">
              <span className="text-xl font-black text-red-600 font-mono tracking-wider">
                {EMERGENCY_CONTACTS.COAST_GUARD_SAR}
              </span>
              <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center">
                <PhoneCall className="w-4 h-4" />
              </div>
            </div>
          </a>

          {/* National Fisheries Helpline */}
          <a
            href={`tel:${EMERGENCY_CONTACTS.FISHERIES_HELPLINE}`}
            className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-red-200 hover:bg-red-50/30 active:bg-red-100 shadow-2xs transition-all min-h-[54px]"
          >
            <div>
              <span className="block text-xs font-bold text-slate-900">
                {t.profile.fisheries_title}
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                {t.profile.fisheries_desc}
              </span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0 ml-2">
              <span className="text-sm font-bold text-slate-800 font-mono">
                {EMERGENCY_CONTACTS.FISHERIES_HELPLINE}
              </span>
              <PhoneCall className="w-3.5 h-3.5 text-slate-500" />
            </div>
          </a>

          {/* Coastal Disaster Control */}
          <a
            href={`tel:${EMERGENCY_CONTACTS.DISASTER_CONTROL}`}
            className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-red-200 hover:bg-red-50/30 active:bg-red-100 shadow-2xs transition-all min-h-[54px]"
          >
            <div>
              <span className="block text-xs font-bold text-slate-900">
                {t.profile.disaster_title}
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                {t.profile.disaster_desc}
              </span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0 ml-2">
              <span className="text-sm font-bold text-slate-800 font-mono">
                {EMERGENCY_CONTACTS.DISASTER_CONTROL}
              </span>
              <PhoneCall className="w-3.5 h-3.5 text-slate-500" />
            </div>
          </a>
        </div>

        <p className="text-[11px] text-red-900/90 font-medium leading-relaxed pt-1">
          ℹ️ {t.profile.emergency_cellular_note}
        </p>
      </section>

      {/* ── Statutory Notice & Legal ── */}
      <section aria-label="Legal and Statutory Notices" className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs">
        <button
          type="button"
          onClick={onOpenNotice}
          className="w-full flex items-center justify-between text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors min-h-[48px]"
        >
          <div className="flex items-center gap-3 text-slate-800">
            <FileText className="w-5 h-5 text-blue-600 shrink-0" />
            <div>
              <span className="text-xs font-bold block">{t.profile.statutory_notice}</span>
              <span className="text-[10px] text-slate-400 font-medium block">
                {t.profile.statutory_sub}
              </span>
            </div>
          </div>
          <span className="text-blue-600 text-xs font-bold shrink-0">View</span>
        </button>
      </section>

      {/* ── Logout Button ── */}
      <section aria-label="User Account Session">
        <button
          type="button"
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-5 py-4 bg-slate-100 hover:bg-red-50 active:bg-red-100 text-slate-700 hover:text-red-700 border border-slate-200 hover:border-red-200 rounded-2xl font-black text-sm transition-colors min-h-[52px]"
        >
          <LogOut className="w-4 h-4" />
          <span>{t.profile.logout}</span>
        </button>
      </section>
        </div>
      </div>
    </div>
  );
};
