// frontend/src/components/Dashboard.tsx
import React from 'react';
import {
  ShieldAlert, Anchor, Waves, Wind, Bell, Compass,
  ArrowRight, CheckCircle2, Play, Navigation, AlertTriangle, Radio
} from 'lucide-react';
import type { WeatherData, PFZZone, MarineAdvisory } from '../types/marine';
import { getTranslation } from '../services/i18n';

interface DashboardProps {
  weather: WeatherData;
  pfzZones: PFZZone[];
  alerts: MarineAdvisory[];
  onTriggerScenario: (scenarioId: string) => void;
  onNavigateTab: (tab: string) => void;
  selectedLanguage?: string;
}

export const Dashboard: React.FC<DashboardProps> = ({
  weather,
  pfzZones,
  alerts,
  onTriggerScenario,
  onNavigateTab,
  selectedLanguage = 'en'
}) => {
  const t = getTranslation(selectedLanguage);
  const topPFZ = pfzZones[0];

  const demoScenarios = [
    {
      id: 'scenario_1_safety',
      title: t.scenarios.s1,
      badge: t.dashboard.scenario_badges.s1,
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      keyMetric: t.dashboard.scenario_metrics.s1,
      highlight: t.dashboard.scenario_highlights.s1,
      query: t.copilot.inquiries[0]
    },
    {
      id: 'scenario_2_pfz',
      title: t.scenarios.s2,
      badge: t.dashboard.scenario_badges.s2,
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      keyMetric: t.dashboard.scenario_metrics.s2,
      highlight: t.dashboard.scenario_highlights.s2,
      query: t.copilot.inquiries[1]
    },
    {
      id: 'scenario_3_route',
      title: t.scenarios.s3,
      badge: t.dashboard.scenario_badges.s3,
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      keyMetric: t.dashboard.scenario_metrics.s3,
      highlight: t.dashboard.scenario_highlights.s3,
      query: t.copilot.inquiries[2]
    },
    {
      id: 'scenario_4_geofence',
      title: t.scenarios.s4,
      badge: t.dashboard.scenario_badges.s4,
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
      keyMetric: t.dashboard.scenario_metrics.s4,
      highlight: t.dashboard.scenario_highlights.s4,
      query: t.copilot.inquiries[3]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-slate-100 text-slate-700 border border-slate-200">
              {t.dashboard.sector}
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              {t.dashboard.safe_window_active}
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            {t.dashboard.title}
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            {t.dashboard.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => onNavigateTab('copilot')}
            className="h-9 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors inline-flex items-center justify-center gap-1.5 leading-none shrink-0"
          >
            <Compass className="w-4 h-4 shrink-0" />
            <span className="leading-none">{t.dashboard.launch_copilot}</span>
          </button>
          <button
            onClick={() => onNavigateTab('pfz')}
            className="h-9 px-3.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium border border-slate-300 transition-colors inline-flex items-center justify-center gap-1.5 leading-none shrink-0"
          >
            <Anchor className="w-4 h-4 text-slate-500 shrink-0" />
            <span className="leading-none">{t.dashboard.pfz_directory}</span>
          </button>
        </div>
      </div>

      {/* Quick Prototype Evaluation Scenarios (Showcase for Evaluators) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              {t.dashboard.demo_heading}
            </h2>
            <p className="text-[11px] text-slate-500">
              {t.dashboard.demo_subheading}
            </p>
          </div>
          <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
            {t.dashboard.scenarios_count}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {demoScenarios.map((sc) => (
            <div
              key={sc.id}
              onClick={() => onTriggerScenario(sc.id)}
              className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-sm cursor-pointer transition-all flex flex-col justify-between group min-w-0 overflow-hidden"
            >
              <div className="min-w-0">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border leading-none inline-flex items-center truncate ${sc.badgeColor}`}>
                    {sc.badge}
                  </span>
                  <div className="w-5 h-5 rounded-full bg-slate-100 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                    <Play className="w-2.5 h-2.5 fill-current text-slate-600 group-hover:text-white shrink-0" />
                  </div>
                </div>

                <div className="font-bold text-xs text-slate-900 group-hover:text-blue-600 transition-colors break-words">
                  {sc.title}
                </div>

                <div className="mt-2 text-xs font-semibold text-slate-800 break-words">
                  {sc.keyMetric}
                </div>

                <div className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed break-words">
                  {sc.highlight}
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-blue-600 leading-none">
                <span className="leading-none">{t.dashboard.run_flow}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Environmental & Hydrodynamic Observations (Visual Metric Cards) */}
      <div>
        <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
          {t.dashboard.telemetry_heading}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Card 1: Marine Risk */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-mono text-[11px] font-semibold">{t.dashboard.risk_title}</span>
              <ShieldAlert className="w-4 h-4 text-amber-500" />
            </div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-baseline gap-1.5 leading-none">
                <span className="text-2xl font-black text-amber-600 font-mono leading-none">42</span>
                <span className="text-xs text-slate-400 font-mono leading-none">/ 100</span>
              </div>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 leading-none">
                {t.common.moderate}
              </span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2.5 overflow-hidden">
              <div className="bg-amber-500 h-full rounded-full" style={{ width: '42%' }}></div>
            </div>
            <div className="text-[11px] text-slate-600 mt-2.5 pt-2 border-t border-slate-100">
              {t.dashboard.risk_summary}
            </div>
          </div>

          {/* Card 2: Nearest PFZ */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-mono text-[11px] font-semibold">{t.dashboard.top_pfz_title}</span>
              <Anchor className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-2xl font-black text-slate-900 font-mono leading-none">
                {topPFZ ? `${topPFZ.distance_km} ${t.common.km}` : `8.2 ${t.common.km}`}
              </span>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 leading-none">
                {topPFZ ? `${topPFZ.score}/100` : '86/100'} {t.common.confidence}
              </span>
            </div>
            <div className="text-xs font-semibold text-slate-800 mt-2">
              {topPFZ ? topPFZ.name : 'PFZ Alpha'}
            </div>
            <div className="text-[11px] text-slate-600 mt-1 pt-2 border-t border-slate-100 flex items-center justify-between">
              <span>{t.dashboard.sst_label}: {topPFZ ? topPFZ.sst_c : '28.1'}°C</span>
              <span>{t.dashboard.chl_label}: {topPFZ ? topPFZ.chlorophyll_mg_m3 : '2.15'} mg/m³</span>
            </div>
          </div>

          {/* Card 3: Waves & Swell */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-mono text-[11px] font-semibold">{t.dashboard.hydro_title}</span>
              <Waves className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-baseline gap-1.5 leading-none">
                <span className="text-2xl font-black text-slate-900 font-mono leading-none">
                  {weather.wave_height_m} {t.common.m}
                </span>
                <span className="text-xs text-slate-400 font-mono leading-none">{t.dashboard.swell_label}</span>
              </div>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 leading-none">
                T: {weather.wave_period_s}s
              </span>
            </div>
            <div className="text-xs font-semibold text-slate-800 mt-2 flex items-center gap-1">
              <Wind className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span>{weather.wind_speed_kmh} {t.common.km}/h {weather.wind_direction}</span>
            </div>
            <div className="text-[11px] text-slate-600 mt-1 pt-2 border-t border-slate-100">
              {t.dashboard.hydro_summary}
            </div>
          </div>

          {/* Card 4: Coastal Alerts */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-mono text-[11px] font-semibold">{t.dashboard.advisories_title}</span>
              <Bell className="w-4 h-4 text-rose-500" />
            </div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-2xl font-black text-slate-900 font-mono leading-none">
                {alerts.length} {t.alerts.status_active}
              </span>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 leading-none">
                {t.alerts.source_coastguard}
              </span>
            </div>
            <div className="text-xs font-semibold text-slate-800 mt-2 truncate">
              {alerts[0]?.title || t.dashboard.advisories_summary}
            </div>
            <div className="text-[11px] text-slate-600 mt-1 pt-2 border-t border-slate-100 flex items-center justify-between">
              <span>{t.geofence.distance_to_border}: 18.5 {t.common.km}</span>
              <span className="text-emerald-600 font-semibold">{t.common.safe}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Operational Highlights Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Fairway Routing Summary */}
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                {t.routes.title}
              </span>
            </div>
            <span className="text-[11px] font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              {t.routes.recommended_tag}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-200">
              <div className="text-[10px] font-bold text-emerald-800 uppercase">{t.routes.route_b_name}</div>
              <div className="text-sm font-bold text-slate-900 mt-1">16.2 {t.common.km} (~61 min)</div>
              <div className="text-[11px] text-emerald-700 mt-1">
                {t.routes.route_b_desc}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-rose-50/60 border border-rose-200">
              <div className="text-[10px] font-bold text-rose-800 uppercase">{t.routes.route_a_name}</div>
              <div className="text-sm font-bold text-slate-900 mt-1">12.2 {t.common.km} (~45 min)</div>
              <div className="text-[11px] text-rose-700 mt-1">
                {t.routes.route_a_desc}
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('routes')}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 pt-1"
          >
            <span>{t.routes.waypoints_title}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Boundary & Geofencing Summary */}
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-100 gap-2">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                {t.geofence.title}
              </span>
            </div>
            <span className="text-[11px] font-mono text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded border border-blue-200 self-start sm:self-auto">
              {t.copilot.pipeline_online.toUpperCase()}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200 gap-1.5">
              <div>
                <div className="font-semibold text-slate-900">{t.geofence.imbl_label}</div>
                <div className="text-[11px] text-slate-500 font-mono">18.9220°N, 72.8347°E</div>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 self-start sm:self-auto">
                {t.geofence.status_safe}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200 gap-1.5">
              <div>
                <div className="font-semibold text-slate-900">{t.scenarios.s4}</div>
                <div className="text-[11px] text-slate-500 font-mono">{t.geofence.distance_to_border}: 4.2 {t.common.km}</div>
              </div>
              <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 self-start sm:self-auto">
                {t.geofence.status_warning}
              </span>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('geofence')}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 pt-1"
          >
            <span>{t.geofence.simulate_proximity}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};