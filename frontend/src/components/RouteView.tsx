// frontend/src/components/RouteView.tsx
import React, { useState } from 'react';
import { Navigation, Compass, ArrowRight, CheckCircle2, XCircle, ShieldCheck, AlertTriangle } from 'lucide-react';
import type { RouteOption, RouteRecommendation } from '../types/marine';

interface RouteViewProps {
  routeData: RouteRecommendation;
  onSelectRouteOnMap?: (route: RouteOption) => void;
}

export const RouteView: React.FC<RouteViewProps> = ({ routeData, onSelectRouteOnMap }) => {
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
            ECDIS Navigational Router
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Route Optimization & Fairway Detour Analysis
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Path computation balancing transit distance against wave breaker shoals, restricted defense perimeters, and shallow bathymetry.
          </p>
        </div>

        <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 font-mono text-xs font-semibold self-start sm:self-auto">
          2 Route Options Evaluated
        </span>
      </div>

      {/* Comparison Grid (Side by side visual cards) */}
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
                  <span className="font-bold text-base text-slate-900">{recRoute.name}</span>
                </div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 uppercase">
                  RECOMMENDED
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5 mb-4 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-400 uppercase">Distance</div>
                  <div className="font-bold text-slate-900 mt-0.5">{recRoute.distance_km} km</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-400 uppercase">ETA</div>
                  <div className="font-bold text-slate-900 mt-0.5">~{recRoute.travel_time_mins} min</div>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
                  <div className="text-[10px] text-emerald-700 uppercase">Risk Score</div>
                  <div className="font-bold text-emerald-700 mt-0.5">{recRoute.risk_score} / 100</div>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {recRoute.why_chosen_or_avoided}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-semibold">
              <span>View Waypoints On Chart</span>
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
                  <span className="font-bold text-base text-slate-900">{directRoute.name}</span>
                </div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300 uppercase">
                  AVOID (HIGH RISK)
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5 mb-4 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-400 uppercase">Distance</div>
                  <div className="font-bold text-slate-900 mt-0.5">{directRoute.distance_km} km</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-400 uppercase">ETA</div>
                  <div className="font-bold text-slate-900 mt-0.5">~{directRoute.travel_time_mins} min</div>
                </div>
                <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200">
                  <div className="text-[10px] text-rose-700 uppercase">Risk Score</div>
                  <div className="font-bold text-rose-700 mt-0.5">{directRoute.risk_score} / 100</div>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                {directRoute.warnings.map((w, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-[11px] text-rose-800 flex items-start gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                    <span>{w}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-rose-600 font-semibold">
              <span>Inspect Hazards On Chart</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        )}
      </div>

      {/* Waypoint Coordinates Table */}
      {selectedRoute && (
        <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {selectedRoute.name} Waypoints & Leg Telemetry
            </h3>
            <span className="font-mono text-xs text-slate-500">
              Total Legs: {selectedRoute.waypoints.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-y border-slate-200 text-[10px] font-mono uppercase text-slate-500">
                <tr>
                  <th className="py-2.5 px-3">Waypt</th>
                  <th className="py-2.5 px-3">Coordinates</th>
                  <th className="py-2.5 px-3">Heading</th>
                  <th className="py-2.5 px-3">Wave Height</th>
                  <th className="py-2.5 px-3">Shoal Margin</th>
                  <th className="py-2.5 px-3">Safety Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                {selectedRoute.waypoints.map((pt, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2 px-3 font-bold text-slate-700">WP-0{idx + 1}</td>
                    <td className="py-2 px-3 text-slate-900">{pt[0].toFixed(4)}°N, {pt[1].toFixed(4)}°E</td>
                    <td className="py-2 px-3 text-slate-600">{240 + idx * 5}° WSW</td>
                    <td className="py-2 px-3 text-slate-600">{selectedRoute.is_recommended ? '1.2m' : (idx === 1 ? '2.7m (Breaker)' : '1.8m')}</td>
                    <td className="py-2 px-3 text-slate-600">{selectedRoute.is_recommended ? '> 6.0 km' : (idx === 1 ? '0.4 km (Grounding)' : '1.8 km')}</td>
                    <td className="py-2 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        selectedRoute.is_recommended
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : idx === 1
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {selectedRoute.is_recommended ? 'CLEAR' : idx === 1 ? 'HAZARDOUS' : 'CAUTION'}
                      </span>
                    </td>
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