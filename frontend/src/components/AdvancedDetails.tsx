// frontend/src/components/AdvancedDetails.tsx
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Cpu, Database, Activity, ShieldCheck } from 'lucide-react';
import type { WeatherData, PFZZone } from '../types/marine';

interface AdvancedDetailsProps {
  weather: WeatherData;
  riskScore?: number;
  riskLevel?: string;
  zones?: PFZZone[];
  language?: string;
}

const LABELS: Record<string, Record<string, string>> = {
  title:        { en: 'Advanced Technical Details', hi: 'उन्नत तकनीकी विवरण', mr: 'प्रगत तांत्रिक तपशील', ta: 'மேம்பட்ட தொழில்நுட்ப விவரங்கள்' },
  subtitle:     { en: 'Sensor telemetry, ocean models, and algorithm outputs', hi: 'सेंसर टेलीमेट्री और महासागरीय मॉडल', mr: 'सेन्सर टेलीमेट्री आणि महासागरी मॉडेल', ta: 'சென்சார் டெலிமெட்ரி மற்றும் கடல் மாதிரிகள்' },
  wave_period:  { en: 'Wave Peak Period', hi: 'लहर चरम अवधि', mr: 'लाटांचा कालावधी', ta: 'அலை உச்ச காலம்' },
  wind_gust:    { en: 'Wind Gusts Peak', hi: 'हवा के झोंके', mr: 'वाऱ्याची कमाल गती', ta: 'காற்று வீச்சு' },
  sea_state:    { en: 'Sea State Code', hi: 'समुद्र स्थिति कोड', mr: 'समुद्र स्थिती कोड', ta: 'கடல் நிலை குறியீடு' },
  risk_formula: { en: 'Deterministic 6-Factor Risk Score', hi: '6-कारक जोखिम स्कोर', mr: '६-घटक धोका गुणांक', ta: '6-காரணி இடர் மதிப்பெண்' },
  provenance:   { en: 'Data Source & Provenance', hi: 'डेटा स्रोत और स्थिति', mr: 'डेटा स्रोत आणि स्थिती', ta: 'தரவு ஆதாரம்' },
  weather_src:  { en: 'Open-Meteo Global Marine & Atmospheric Model', hi: 'ओपन-मेटियो मरीन मॉडल', mr: 'ओपन-मेटिओ मरीन मॉडेल', ta: 'Open-Meteo கடல் மாதிரி' },
  chl_src:      { en: 'Bio-optical proxy estimation (SST upwelling model)', hi: 'जैव-ऑप्टिकल प्रॉक्सी अनुमान', mr: 'बायो-ऑप्टिकल प्रॉक्सी मॉडेल', ta: 'உயிர்-ஒளியியல் ப்ராக்ஸி' },
  pfz_src:      { en: 'Algorithmic thermal boundary convergence zones', hi: 'थर्मल सीमा अभिसरण मॉडल', mr: 'थर्मल बाउंड्री मॉडेल', ta: 'வெப்ப எல்லை குவிப்பு' },
};

export const AdvancedDetails: React.FC<AdvancedDetailsProps> = ({
  weather,
  riskScore = 38,
  riskLevel = 'MODERATE',
  language = 'en'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const lang = ['en', 'hi', 'mr', 'ta'].includes(language) ? language : 'en';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3.5 flex items-center justify-between bg-slate-50/80 hover:bg-slate-100 transition-colors text-left"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2.5">
          <Cpu className="w-4 h-4 text-slate-500" />
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              {LABELS.title[lang]}
            </h4>
            <p className="text-[11px] text-slate-500">{LABELS.subtitle[lang]}</p>
          </div>
        </div>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        )}
      </button>

      {isOpen && (
        <div className="p-4 space-y-4 text-xs text-slate-600 bg-white border-t border-slate-100">
          {/* Numeric Telemetry Table */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-400 font-medium block">{LABELS.wave_period[lang]}</span>
              <strong className="text-slate-800 text-sm font-mono">{weather.wave_period_s ?? 7.2} s</strong>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-400 font-medium block">{LABELS.wind_gust[lang]}</span>
              <strong className="text-slate-800 text-sm font-mono">{weather.wind_gust_kmh ?? 28} km/h</strong>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-400 font-medium block">{LABELS.sea_state[lang]}</span>
              <strong className="text-slate-800 text-sm font-mono">{weather.sea_state || 'Moderate'}</strong>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-400 font-medium block">{LABELS.risk_formula[lang]}</span>
              <strong className="text-slate-800 text-sm font-mono">{riskScore}/100 ({riskLevel})</strong>
            </div>
          </div>

          {/* Model & Provenance Disclosure */}
          <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-1.5 text-slate-700 font-semibold text-[11px]">
              <Database className="w-3.5 h-3.5 text-blue-600" />
              <span>{LABELS.provenance[lang]}</span>
            </div>
            <ul className="space-y-1 text-[11px] text-slate-500 pl-5 list-disc">
              <li>{LABELS.weather_src[lang]}</li>
              <li>{LABELS.chl_src[lang]}</li>
              <li>{LABELS.pfz_src[lang]}</li>
            </ul>
          </div>

          {/* Safety Notice */}
          <div className="flex items-start gap-2 p-2.5 rounded-xl bg-blue-50/60 border border-blue-100 text-[11px] text-blue-900 leading-snug">
            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span>
              MarineMind AI provides decision-support modeling. Always cross-verify conditions with Indian Coast Guard and IMD broadcasts before sailing.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
