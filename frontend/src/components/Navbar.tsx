// frontend/src/components/Navbar.tsx
import React from 'react';
import {
  Compass, Anchor, ShieldAlert, Navigation, Bell,
  BarChart3, Globe, AlertTriangle, Radio, ShieldCheck, MapPin, ChevronDown, LogOut, User as UserIcon
} from 'lucide-react';
import { getTranslation } from '../services/i18n';
import type { UserProfile } from './AuthLanding';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
  isDemoMode: boolean;
  setIsDemoMode: (val: boolean) => void;
  onOpenNotice: () => void;
  vesselLocation?: { latitude: number; longitude: number; name?: string };
  onOpenLocationModal?: () => void;
  currentUser?: UserProfile | null;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedLanguage,
  setSelectedLanguage,
  isDemoMode,
  setIsDemoMode,
  onOpenNotice,
  vesselLocation,
  onOpenLocationModal,
  currentUser,
  onLogout
}) => {
  const t = getTranslation(selectedLanguage);

  const navItems = [
    { id: 'dashboard', label: t.nav.dashboard, shortLabel: t.nav.short_ops, icon: Compass },
    { id: 'copilot', label: t.nav.copilot, shortLabel: t.nav.short_copilot, icon: Navigation },
    { id: 'pfz', label: t.nav.pfz, shortLabel: t.nav.short_pfz, icon: Anchor },
    { id: 'risk', label: t.nav.risk, shortLabel: t.nav.short_risk, icon: ShieldAlert },
    { id: 'routes', label: t.nav.routes, shortLabel: t.nav.short_routes, icon: MapPin },
    { id: 'geofence', label: t.nav.geofence, shortLabel: t.nav.short_geofence, icon: ShieldCheck },
    { id: 'alerts', label: t.nav.alerts, shortLabel: t.nav.short_alerts, icon: Bell },
    { id: 'analytics', label: t.nav.analytics, shortLabel: t.nav.short_analytics, icon: BarChart3 }
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-[100] shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-14 gap-1.5 sm:gap-2 w-full min-w-0">
          {/* Logo & Product Title */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs shrink-0">
              <Compass className="w-4 h-4" />
            </div>
            <span className="font-bold text-sm tracking-tight text-white whitespace-nowrap hidden sm:inline">
              MarineMind AI
            </span>
            <span className="font-bold text-xs tracking-tight text-white whitespace-nowrap sm:hidden">
              MarineMind
            </span>
          </div>

          {/* Navigation Tabs (Responsive & strictly bounded within max-w-7xl, no overflow in Tamil) */}
          <nav className="hidden lg:flex items-center gap-0.5 bg-slate-800/80 p-1 rounded-lg border border-slate-700/60 min-w-0 flex-shrink">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  title={item.label}
                  className={`h-8 px-2 xl:px-2.5 rounded-md text-xs font-medium transition-all inline-flex items-center justify-center gap-1.5 whitespace-nowrap leading-none ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className={`leading-none ${isActive ? 'inline max-w-[130px] truncate' : 'hidden 2xl:inline'}`}>
                    {isActive ? item.label : item.shortLabel}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Controls: Location, Mode, Language, Profile, Notice */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            {/* Location Button */}
            <button
              onClick={onOpenLocationModal}
              title={t.locationModal.title}
              className="h-8 px-1.5 sm:px-2 inline-flex items-center justify-center gap-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-medium transition-colors shrink-0 max-w-[75px] sm:max-w-[120px] xl:max-w-[140px]"
            >
              <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span className="truncate leading-none">
                {vesselLocation?.name ? vesselLocation.name.split('(')[0].trim() : `${vesselLocation?.latitude.toFixed(2)}°N`}
              </span>
            </button>

            {/* Mode Toggle */}
            <button
              onClick={() => setIsDemoMode(!isDemoMode)}
              title={isDemoMode ? t.common.simulated : t.common.live}
              className={`h-8 px-2 sm:px-2.5 rounded-lg text-xs font-mono inline-flex items-center justify-center gap-1 border transition-colors leading-none shrink-0 ${
                isDemoMode
                  ? 'bg-amber-950/40 border-amber-500/50 text-amber-300'
                  : 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
              }`}
            >
              <Radio className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden md:inline leading-none">{isDemoMode ? t.common.simulated : t.common.live}</span>
            </button>

            {/* Language Select */}
            <div className="relative h-8 inline-flex items-center bg-slate-800 hover:bg-slate-700/80 border border-slate-700 hover:border-slate-600 rounded-lg text-xs transition-colors shrink-0 group">
              <Globe className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-400 ml-1.5 sm:ml-2 mr-1 shrink-0 pointer-events-none transition-colors" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                aria-label="Select Language"
                className="bg-transparent text-slate-200 font-medium text-xs focus:outline-none cursor-pointer leading-none py-0 pl-0 pr-5 border-0 appearance-none h-full"
              >
                <option value="en" className="bg-slate-900 text-white">English</option>
                <option value="hi" className="bg-slate-900 text-white">हिन्दी</option>
                <option value="mr" className="bg-slate-900 text-white">मराठी</option>
                <option value="ta" className="bg-slate-900 text-white">தமிழ்</option>
              </select>
              <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-white absolute right-1.5 pointer-events-none transition-colors" />
            </div>

            {/* Advisory Notice Modal Trigger */}
            <button
              onClick={onOpenNotice}
              title={t.footer.statutory_notice}
              className="h-8 w-8 inline-flex items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 transition-colors shrink-0"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
            </button>

            {/* User Profile & Sign Out */}
            {currentUser && (
              <div className="flex items-center gap-1.5 pl-1.5 border-l border-slate-800 shrink-0">
                <div className="hidden xl:flex flex-col text-right leading-none max-w-[110px]">
                  <span className="text-[11px] font-bold text-white truncate">{currentUser.name}</span>
                  <span className="text-[9px] text-slate-400 font-mono truncate">{currentUser.vessel_id}</span>
                </div>
                {onLogout && (
                  <button
                    type="button"
                    onClick={onLogout}
                    title={t.auth.logout_btn}
                    className="h-8 px-2 rounded-lg bg-slate-800 hover:bg-rose-950/60 hover:text-rose-300 hover:border-rose-700/50 text-slate-300 border border-slate-700 text-xs font-medium transition-colors inline-flex items-center gap-1 leading-none shrink-0"
                  >
                    <LogOut className="w-3.5 h-3.5 shrink-0" />
                    <span className="hidden sm:inline leading-none">{t.auth.logout_btn}</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sub-Navigation */}
      <div className="lg:hidden bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-1.5 flex items-center gap-1 overflow-x-auto no-scrollbar text-xs">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`h-7 px-2.5 rounded-md whitespace-nowrap text-xs inline-flex items-center gap-1.5 leading-none shrink-0 ${
                  isActive
                    ? 'bg-blue-600 text-white font-medium'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3 h-3 shrink-0" />
                <span className="leading-none">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
