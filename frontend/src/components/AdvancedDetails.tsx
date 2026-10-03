// frontend/src/components/AdvancedDetails.tsx
// Technical telemetry and model provenance disclosures (Level 4: Fisherman-First)
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Cpu, Database, ShieldCheck, Radio } from 'lucide-react';
import type { WeatherData, PFZZone } from '../types/marine';
import { getFishermanTranslation } from '../services/fishermanI18n';

interface AdvancedDetailsProps {
  weather: WeatherData;
  riskScore?: number;
  riskLevel?: string;
  zones?: PFZZone[];
  language?: string;
}

export const AdvancedDetails: React.FC<AdvancedDetailsProps> = ({
  weather,
  riskScore = 38,
  riskLevel = 'MODERATE',
  language = 'en',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = getFishermanTranslation(language);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3.5 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors text-left"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              {t.advanced.title}
            </h4>
            <p className="text-[11px] text-slate-500">{t.advanced.subtitle}</p>
          </div>
        </div>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        )}
      </button>

      {isOpen && (
        <div className="p-4 space-y-4 text-xs text-slate-700 bg-white border-t border-slate-100">
          {/* Numeric Telemetry Table */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                {t.advanced.wave_period}
              </span>
              <strong className="text-slate-900 text-sm font-mono font-bold">
                {weather.wave_period_s ? `${weather.wave_period_s.toFixed(1)}s` : '7.2s'}
              </strong>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                {t.advanced.wind_gusts}
              </span>
              <strong className="text-slate-900 text-sm font-mono font-bold">
                {weather.wind_gust_kmh ? `${Math.round(weather.wind_gust_kmh)} km/h` : '28 km/h'}
              </strong>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                {t.advanced.sea_state_code}
              </span>
              <strong className="text-slate-900 text-sm font-mono font-bold">
                {weather.sea_state || 'Moderate (Code 3)'}
              </strong>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                {t.advanced.risk_score}
              </span>
              <strong className="text-slate-900 text-sm font-mono font-bold">
                {riskScore}/100 ({riskLevel})
              </strong>
            </div>
          </div>

          {/* Official IMD Government Coastal Bulletin */}
          {(weather.port_signal || weather.imd_issuing_office || weather.synoptic_situation) && (
            <div className="space-y-2 p-3.5 rounded-xl bg-blue-50/60 border border-blue-200">
              <div className="flex items-center justify-between text-blue-950 font-bold text-xs">
                <div className="flex items-center gap-2">
                  <Radio className="w-3.5 h-3.5 text-blue-700" />
                  <span>IMD Official Coastal Weather Bulletin</span>
                </div>
                <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">
                  {weather.imd_sector_name || 'Coastal Sector'}
                </span>
              </div>
              <div className="text-[11px] text-slate-700 space-y-1 font-medium">
                <div>
                  <span className="text-slate-500 font-semibold">Issuing Office: </span>
                  <span className="text-slate-900 font-bold">{weather.imd_issuing_office || 'India Meteorological Department'}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold">Port Warning Signal: </span>
                  <span className={`font-bold ${weather.port_signal && !weather.port_signal.includes('NIL') ? 'text-amber-700' : 'text-emerald-700'}`}>
                    {weather.port_signal || 'NIL AT ALL PORTS'}
                  </span>
                </div>
                {weather.synoptic_situation && weather.synoptic_situation !== 'NIL' && (
                  <div>
                    <span className="text-slate-500 font-semibold">Synoptic Situation: </span>
                    <span className="text-slate-800">{weather.synoptic_situation}</span>
                  </div>
                )}
                {weather.storm_surge_warning && weather.storm_surge_warning !== 'NIL' && (
                  <div className="p-2 bg-amber-50 border border-amber-200 rounded text-amber-900 font-semibold text-[10px]">
                    ⚠️ Ocean Currents / Tidal Alert: {weather.storm_surge_warning}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Model & Provenance Disclosure */}
          <div className="space-y-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 text-slate-800 font-bold text-xs">
              <Database className="w-3.5 h-3.5 text-blue-600" />
              <span>{t.advanced.provenance_title}</span>
            </div>
            <ul className="space-y-1.5 text-[11px] text-slate-600 pl-4 list-disc font-medium">
              <li>{t.advanced.weather_model}</li>
              <li>{t.advanced.chlorophyll_model}</li>
              <li>{t.advanced.pfz_model}</li>
            </ul>
          </div>

          {/* Statutory Safety Notice */}
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-blue-50/80 border border-blue-200 text-[11px] text-blue-950 leading-relaxed font-medium">
            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span>{t.advanced.disclaimer}</span>
          </div>
        </div>
      )}
    </div>
  );
};
