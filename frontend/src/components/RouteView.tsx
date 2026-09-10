// frontend/src/components/RouteView.tsx
import React, { useState } from 'react';
import { Navigation, Compass, ArrowRight, CheckCircle2, XCircle, ShieldCheck, AlertTriangle } from 'lucide-react';
import type { RouteOption, RouteRecommendation } from '../types/marine';
import { getTranslation } from '../services/i18n';

interface RouteViewProps {
  routeData: RouteRecommendation;
  onSelectRouteOnMap?: (route: RouteOption) => void;
  selectedLanguage?: string;
}

export const RouteView: React.FC<RouteViewProps> = ({
  routeData,
  onSelectRouteOnMap,
  selectedLanguage = 'en'
}) => {
  const t = getTranslation(selectedLanguage);
  const routes = routeData.routes || [];
  const recRoute = routes.find((r) => r.is_recommended) || routes[0];
  const directRoute = routes.find((r) => !r.is_recommended);

  const [selectedRoute, setSelectedRoute] = useState<RouteOption>(recRoute);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-mono text-blue-600 font-semibold uppercase tracking-wider mb-1">
            {t.routes.title}
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            {t.routes.title}
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            {t.routes.desc}
          </p>
        </div>

        <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 font-mono text-xs font-semibold self-start sm:self-auto">
          2 {t.nav.routes}
        </span>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recRoute && (
          <div
            onClick={() => {
              setSelectedRoute(recRoute);
              onSelectRouteOnMap?.(recRoute);
            }}
            className={`p-6 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
              selectedRoute?.id === recRoute.id
                ? 'bg-emerald-50/40 border-emerald-500 shadow-sm'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="font-bold text-base text-slate-900">{t.routes.route_b_name}</span>
                </div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 uppercase">
                  {t.routes.recommended_tag}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5 mb-4 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-400 uppercase">{t.pfz.th_distance}</div>
                  <div className="font-bold text-slate-900 mt-0.5">{recRoute.distance_km} {t.common.km}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-400 uppercase">{t.routes.transit_time}</div>
                  <div className="font-bold text-slate-900 mt-0.5">~{recRoute.travel_time_mins} min</div>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
                  <div className="text-[10px] text-emerald-700 uppercase">{t.risk.overall_gauge}</div>
                  <div className="font-bold text-emerald-700 mt-0.5">{recRoute.risk_score} / 100</div>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {t.routes.route_b_desc}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-semibold">
              <span>{t.routes.waypoints_title}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        )}

        {directRoute && (
          <div
            onClick={() => {
              setSelectedRoute(directRoute);
              onSelectRouteOnMap?.(directRoute);
            }}
            className={`p-6 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
              selectedRoute?.id === directRoute.id
                ? 'bg-rose-50/40 border-rose-500 shadow-sm'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-rose-600" />
                  <span className="font-bold text-base text-slate-900">{t.routes.route_a_name}</span>
                </div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300 uppercase">
                  {t.routes.high_risk_tag}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5 mb-4 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-400 uppercase">{t.pfz.th_distance}</div>
                  <div className="font-bold text-slate-900 mt-0.5">{directRoute.distance_km} {t.common.km}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-400 uppercase">{t.routes.transit_time}</div>
                  <div className="font-bold text-slate-900 mt-0.5">~{directRoute.travel_time_mins} min</div>
                </div>
                <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200">
                  <div className="text-[10px] text-rose-700 uppercase">{t.risk.overall_gauge}</div>
                  <div className="font-bold text-rose-700 mt-0.5">{directRoute.risk_score} / 100</div>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {t.routes.route_a_desc}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-rose-600 font-semibold">
              <span>{t.routes.hazard_clearance}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        )}
      </div>

      {/* Selected Route Waypoint Inspector */}
      {selectedRoute && (
        <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {t.routes.waypoints_title}: {selectedRoute.is_recommended ? t.routes.route_b_name : t.routes.route_a_name}
            </h3>
            <button
              type="button"
              onClick={() => onSelectRouteOnMap?.(selectedRoute)}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
            >
              {t.routes.action_navigate}
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-y border-slate-200 text-slate-500 font-mono text-[11px]">
                <tr>
                  <th className="py-2.5 px-3">{t.routes.th_waypoint}</th>
                  <th className="py-2.5 px-3">{t.routes.th_lat}</th>
                  <th className="py-2.5 px-3">{t.routes.th_lon}</th>
                  <th className="py-2.5 px-3">{t.routes.th_heading}</th>
                  <th className="py-2.5 px-3">{t.routes.th_speed}</th>
                  <th className="py-2.5 px-3">{t.routes.th_nav_hazard}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {selectedRoute.waypoints.map((wp, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-3 font-bold text-slate-800">WP-{idx + 1}</td>
                    <td className="py-2.5 px-3 text-slate-600">{wp[0].toFixed(4)}°N</td>
                    <td className="py-2.5 px-3 text-slate-600">{wp[1].toFixed(4)}°E</td>
                    <td className="py-2.5 px-3 text-slate-600">{240 + idx * 8}°</td>
                    <td className="py-2.5 px-3 text-slate-600">8.5 {t.common.knots}</td>
                    <td className="py-2.5 px-3 text-emerald-600 font-bold">&gt; 2.5 {t.common.km} {t.common.clearance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
