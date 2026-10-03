import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Cpu, Database, ShieldCheck, Radio } from 'lucide-react';
import type { WeatherData, PFZZone } from '../types/marine';
import {
  getFishermanTranslation,
  localizePortSignal,
  localizeSeaState,
  localizeAdvisory
} from '../services/fishermanI18n';

const ADVANCED_BULLETIN: Record<string, {
  bulletin_title: string;
  coastal_sector: string;
  issuing_office: string;
  port_signal: string;
  synoptic_situation: string;
  surge_alert: string;
  govt_dept: string;
}> = {
  en: {
    bulletin_title: 'IMD Official Coastal Weather Bulletin',
    coastal_sector: 'Coastal Sector',
    issuing_office: 'Issuing Office:',
    port_signal: 'Port Warning Signal:',
    synoptic_situation: 'Synoptic Situation:',
    surge_alert: 'Ocean Currents / Tidal Alert:',
    govt_dept: 'India Meteorological Department'
  },
  hi: {
    bulletin_title: 'आईएमडी आधिकारिक तटीय मौसम बुलेटिन',
    coastal_sector: 'तटीय क्षेत्र',
    issuing_office: 'जारीकर्ता कार्यालय:',
    port_signal: 'बंदरगाह चेतावनी संकेत:',
    synoptic_situation: 'मौसमी स्थिति (सिनॉप्टिक):',
    surge_alert: 'सागरीय धारा / ज्वार चेतावनी:',
    govt_dept: 'भारत मौसम विज्ञान विभाग'
  },
  mr: {
    bulletin_title: 'हवामान विभाग अधिकृत सागरी हवामान बुलेटिन',
    coastal_sector: 'सागरी विभाग',
    issuing_office: 'जारी करणारे कार्यालय:',
    port_signal: 'बंदर इशारा बावटा:',
    synoptic_situation: 'हवामान स्थिती (सिनॉप्टिक):',
    surge_alert: 'सागरी प्रवाह / लाटांचा इशारा:',
    govt_dept: 'भारतीय हवामान विभाग'
  },
  gu: {
    bulletin_title: 'હવામાન વિભાગ સત્તાવાર દરિયાઈ બુલેટિન',
    coastal_sector: 'દરિયાઈ ક્ષેત્ર',
    issuing_office: 'જારી કરનાર કચેરી:',
    port_signal: 'બંદર ચેતવણી સિગ્નલ:',
    synoptic_situation: 'હવામાન સ્થિતિ (સિનોપ્ટિક):',
    surge_alert: 'દરિયાઈ પ્રવાહ / ભરતી ચેતવણી:',
    govt_dept: 'ભારતીય હવામાન વિભાગ'
  },
  ta: {
    bulletin_title: 'வானிலை மையம் அதிகாரப்பூர்வ கடல் அறிக்கை',
    coastal_sector: 'கடலோர பகுதி',
    issuing_office: 'வழங்கும் அலுவலகம்:',
    port_signal: 'துறைமுக எச்சரிக்கை சிக்னல்:',
    synoptic_situation: 'வளிமண்டல நிலை (சினோப்டிக்):',
    surge_alert: 'கடல் நீரோட்டம் / அலை எழுச்சி எச்சரிக்கை:',
    govt_dept: 'இந்திய வானிலை ஆய்வு மையம்'
  },
  ml: {
    bulletin_title: 'കാലാവസ്ഥാ നിരീക്ഷണ കേന്ദ്രം തീരദേശ ബുള്ളറ്റിൻ',
    coastal_sector: 'തീരദേശ മേഖല',
    issuing_office: 'പുറപ്പെടുവിച്ച ഓഫീസ്:',
    port_signal: 'തുറമുഖ ജാഗ്രതാ സിഗ്നൽ:',
    synoptic_situation: 'കാലാവസ്ഥാ സ്ഥിതി:',
    surge_alert: 'കടലാക്രമണ / അലമാല മുന്നറിയിപ്പ്:',
    govt_dept: 'കേന്ദ്ര കാലാവസ്ഥാ വകുപ്പ്'
  },
  te: {
    bulletin_title: 'వాతావరణ కేంద్రం అధికారిక తీరప్రాంత బులెటిన్',
    coastal_sector: 'తీరప్రాంత విభాగం',
    issuing_office: 'జారీ చేసిన కార్యాలయం:',
    port_signal: 'పోర్ట్ హెచ్చరిక సిగ్నల్:',
    synoptic_situation: 'వాతావరణ పరిస్థితి:',
    surge_alert: 'సముద్రపు ప్రవాహం / అలల హెచ్చరిక:',
    govt_dept: 'భారత వాతావరణ శాఖ'
  },
  kn: {
    bulletin_title: 'ಹವಾಮಾನ ಇಲಾಖೆ ಅಧಿಕೃತ ಕರಾವಳಿ ಹವಾಮಾನ ಬುಲೆಟಿನ್',
    coastal_sector: 'ಕರಾವಳಿ ವಲಯ',
    issuing_office: 'ಹೊರಡಿಸಿದ ಕಚೇರಿ:',
    port_signal: 'ಬಂದರು ಎಚ್ಚರಿಕೆಯ ಸಂಕೇತ:',
    synoptic_situation: 'ಹವಾಮಾನ ಪರಿಸ್ಥಿತಿ:',
    surge_alert: 'ಸಮುದ್ರ ಪ್ರವಾಹ / ಉಬ್ಬರವಿಳಿತದ ಎಚ್ಚರಿಕೆ:',
    govt_dept: 'ಭಾರತೀಯ ಹವಾಮಾನ ಇಲಾಖೆ'
  },
  bn: {
    bulletin_title: 'আবহাওয়া দফতর সরকারি উপকূলীয় বুলেটিন',
    coastal_sector: 'উপকূলীয় অঞ্চল',
    issuing_office: 'প্রকাশক দপ্তর:',
    port_signal: 'বন্দর সতর্ক সংকেত:',
    synoptic_situation: 'আবহাওয়া পরিস্থিতি (সিনপটিক):',
    surge_alert: 'সমুদ্রের স্রোত / জলোচ্ছ্বাস সতর্কতা:',
    govt_dept: 'ভারত আবহাওয়া বিভাগ'
  }
};

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
  const bl = ADVANCED_BULLETIN[language] || ADVANCED_BULLETIN.en;

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
                {localizeSeaState(weather.sea_state || 'Moderate', language)}
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
                  <span>{bl.bulletin_title}</span>
                </div>
                <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">
                  {weather.imd_sector_name || bl.coastal_sector}
                </span>
              </div>
              <div className="text-[11px] text-slate-700 space-y-1 font-medium">
                <div>
                  <span className="text-slate-500 font-semibold">{bl.issuing_office} </span>
                  <span className="text-slate-900 font-bold">{weather.imd_issuing_office || bl.govt_dept}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold">{bl.port_signal} </span>
                  <span className={`font-bold ${weather.port_signal && !weather.port_signal.includes('NIL') ? 'text-amber-700' : 'text-emerald-700'}`}>
                    {localizePortSignal(weather.port_signal || 'NIL AT ALL PORTS', language)}
                  </span>
                </div>
                {weather.synoptic_situation && weather.synoptic_situation !== 'NIL' && (
                  <div>
                    <span className="text-slate-500 font-semibold">{bl.synoptic_situation} </span>
                    <span className="text-slate-800">{localizeAdvisory(weather.synoptic_situation, language).description}</span>
                  </div>
                )}
                {weather.storm_surge_warning && weather.storm_surge_warning !== 'NIL' && (
                  <div className="p-2 bg-amber-50 border border-amber-200 rounded text-amber-900 font-semibold text-[10px]">
                    ⚠️ {bl.surge_alert} {localizeAdvisory(weather.storm_surge_warning, language).description}
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
