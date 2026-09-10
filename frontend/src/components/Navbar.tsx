// frontend/src/components/Navbar.tsx
import React from 'react';
import {
  Compass, Anchor, ShieldAlert, Navigation, Bell,
  BarChart3, Globe, AlertTriangle, Radio, ShieldCheck, MapPin
} from 'lucide-react';
import { getTranslation } from '../services/i18n';

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
  onOpenLocationModal
}) => {
  const t = getTranslation(selectedLanguage);

  const navItems = [
    { id: 'dashboard', label: t.nav.dashboard, icon: Compass },
    { id: 'copilot', label: t.nav.copilot, icon: Navigation },
    { id: 'pfz', label: t.nav.pfz, icon: Anchor },
    { id: 'risk', label: t.nav.risk, icon: ShieldAlert },
    { id: 'routes', label: t.nav.routes, icon: MapPin },
    { id: 'geofence', label: t.nav.geofence, icon: ShieldCheck },
    { id: 'alerts', label: t.nav.alerts, icon: Bell },
    { id: 'analytics', label: t.nav.analytics, icon: BarChart3 }
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-[100] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 gap-2">
          {/* Logo & Product Title */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs shrink-0">
              <Compass className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm tracking-tight text-white whitespace-nowrap">
                MarineMind AI
              </span>
              <span className="text-[11px] text-slate-400 hidden 2xl:inline-block whitespace-nowrap">
                • Fishery & Sea Safety
              </span>
            </div>
          </div>

          {/* Navigation Tabs (Responsive & strictly bounded to container width) */}
          <nav className="hidden lg:flex items-center gap-0.5 bg-slate-800/80 p-1 rounded-lg border border-slate-700/60 shrink-0">
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
                  <span className="leading-none hidden xl:inline">{item.label}</span>
                  <span className="leading-none xl:hidden">{isActive ? item.label : ''}</span>
                </button>
              );
            })}
          </nav>

          {/* Controls: Location, Mode, Language, Notice (Exact matching heights: h-8) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Location Button */}
            <button
              onClick={onOpenLocationModal}
              title="Set Vessel Location & Operating Sector"
              className="h-8 px-2 sm:px-2.5 inline-flex items-center justify-center gap-1 sm:gap-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-medium transition-colors shrink-0 max-w-[85px] sm:max-w-[130px] xl:max-w-[170px]"
            >
              <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span className="truncate leading-none">
                {vesselLocation?.name ? vesselLocation.name.split('(')[0].trim() : `${vesselLocation?.latitude.toFixed(2)}°N`}
              </span>
            </button>

            {/* Mode Toggle */}
            <button
              onClick={() => setIsDemoMode(!isDemoMode)}
              title={isDemoMode ? 'Mode: Simulated Stream' : 'Mode: Live Stream'}
              className={`h-8 px-2 sm:px-2.5 rounded-lg text-xs font-mono inline-flex items-center justify-center gap-1 sm:gap-1.5 border transition-colors leading-none shrink-0 ${
                isDemoMode
                  ? 'bg-amber-950/40 border-amber-500/50 text-amber-300'
                  : 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
              }`}
            >
              <Radio className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden xl:inline leading-none">{isDemoMode ? 'Simulated' : 'Live Stream'}</span>
            </button>

            {/* Language Select (Aligned height & baseline) */}
            <div className="h-8 inline-flex items-center bg-slate-800 border border-slate-700 rounded-lg px-1.5 sm:px-2 text-xs shrink-0">
              <Globe className="w-3.5 h-3.5 text-slate-400 mr-1 shrink-0 hidden xs:inline" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer leading-none py-0 m-0 border-0 pr-1"
              >
                <option value="en" className="bg-slate-900 text-white">English</option>
                <option value="hi" className="bg-slate-900 text-white">हिन्दी</option>
                <option value="mr" className="bg-slate-900 text-white">मराठी</option>
                <option value="ta" className="bg-slate-900 text-white">தமிழ்</option>
              </select>
            </div>

            {/* Advisory Warning Modal Trigger */}
            <button
              onClick={onOpenNotice}
              title="Official Advisory Notice"
              className="h-8 w-8 inline-flex items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 transition-colors shrink-0"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sub-Navigation */}
      <div className="lg:hidden bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center gap-1 overflow-x-auto no-scrollbar text-xs">
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