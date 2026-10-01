import React from 'react';
import { Map, Navigation } from 'lucide-react';
import type { PFZZone } from '../types/marine';

interface FishingSpotCardProps {
  zone: PFZZone;
  onViewMap: () => void;
  onPlanRoute: () => void;
  language: string;
}

// ─── i18n ────────────────────────────────────────────────────────────────────

const TEXT: Record<string, Record<string, string>> = {
  good_fishing:      { en: 'Good Fishing Area',              hi: 'अच्छा मछली पकड़ने का क्षेत्र', mr: 'चांगले मासेमारी क्षेत्र',          ta: 'நல்ல மீன்பிடி பகுதி'         },
  fishing_possible:  { en: 'Fishing Possible — Be Careful',  hi: 'मछली पकड़ना संभव — सावधान रहें', mr: 'मासेमारी शक्य — काळजी घ्या',      ta: 'மீன்பிடிக்கலாம் — கவனமாக இருங்கள்' },
  avoid:             { en: 'Avoid This Area',                hi: 'इस क्षेत्र से बचें',              mr: 'हा परिसर टाळा',                   ta: 'இந்த பகுதியை தவிர்க்கவும்'   },
  km_away:           { en: 'km away',                        hi: 'किमी दूर',                        mr: 'किमी दूर',                        ta: 'கி.மீ தொலைவில்'              },
  sea:               { en: 'Sea',                            hi: 'समुद्र',                           mr: 'समुद्र',                          ta: 'கடல்'                        },
  calm:              { en: 'Calm',                           hi: 'शांत',                            mr: 'शांत',                            ta: 'அமைதி'                       },
  rough:             { en: 'Rough',                          hi: 'उग्र',                            mr: 'खडबडीत',                         ta: 'கரடுமுரடான'                  },
  moderate:          { en: 'Moderate',                       hi: 'मध्यम',                           mr: 'मध्यम',                           ta: 'மிதமான'                      },
  target_species:    { en: 'Fish here',                      hi: 'यहाँ मछलियाँ',                   mr: 'इथे मासे',                        ta: 'இங்கு மீன்கள்'               },
  view_map:          { en: 'View on Map',                    hi: 'मानचित्र पर देखें',              mr: 'नकाशावर पाहा',                    ta: 'வரைபடத்தில் பார்க்கவும்'     },
  plan_route:        { en: 'Plan Route',                     hi: 'रास्ता बनाएं',                   mr: 'मार्ग तयार करा',                  ta: 'வழி திட்டமிடுங்கள்'           },
};

const t = (key: string, lang: string): string =>
  TEXT[key]?.[lang] ?? TEXT[key]?.['en'] ?? key;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function recommendationInfo(rec: string, lang: string): { label: string; textColor: string; borderColor: string; badgeBg: string } {
  const r = rec?.toUpperCase() ?? '';
  if (r === 'HIGHLY_RECOMMENDED' || r === 'RECOMMENDED') {
    return { label: t('good_fishing', lang), textColor: 'text-emerald-700', borderColor: 'border-l-emerald-500', badgeBg: 'bg-emerald-100' };
  }
  if (r === 'PROCEED_WITH_CAUTION') {
    return { label: t('fishing_possible', lang), textColor: 'text-amber-700', borderColor: 'border-l-amber-500', badgeBg: 'bg-amber-100' };
  }
  return { label: t('avoid', lang), textColor: 'text-red-700', borderColor: 'border-l-red-500', badgeBg: 'bg-red-100' };
}

function waveRiskLabel(risk: string, lang: string) {
  const r = risk?.toLowerCase() ?? '';
  if (r === 'low' || r === 'none') return t('calm', lang);
  if (r === 'moderate' || r === 'medium') return t('moderate', lang);
  return t('rough', lang);
}

// ─── Component ───────────────────────────────────────────────────────────────

export function FishingSpotCard({ zone, onViewMap, onPlanRoute, language }: FishingSpotCardProps) {
  const lang = ['en', 'hi', 'mr', 'ta'].includes(language) ? language : 'en';
  const { label, textColor, borderColor, badgeBg } = recommendationInfo(zone.recommendation, lang);
  const topSpecies = zone.target_species.slice(0, 2);
  const seaCondition = waveRiskLabel(zone.wave_risk, lang);

  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-slate-100 border-l-4 ${borderColor} overflow-hidden`}>
      <div className="p-4">
        {/* Status badge */}
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${badgeBg} ${textColor} mb-2`}>
          {label}
        </span>

        {/* Zone name */}
        <h3 className="text-base font-semibold text-slate-800 mb-3 leading-tight">{zone.name}</h3>

        {/* Meta row */}
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex items-center gap-1">
            <span className="text-slate-400 text-xs">📍</span>
            <span className="text-sm text-slate-600">
              {zone.distance_km.toFixed(1)} {t('km_away', lang)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-slate-400 text-xs">🌊</span>
            <span className="text-sm text-slate-600">
              {t('sea', lang)}: {seaCondition}
            </span>
          </div>
          {topSpecies.length > 0 && (
            <div className="flex items-center gap-1">
              <span className="text-slate-400 text-xs">🐟</span>
              <span className="text-sm text-slate-600">
                {t('target_species', lang)}: {topSpecies.join(', ')}
              </span>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            onClick={onViewMap}
            className="flex-1 flex items-center justify-center gap-1.5 min-h-[48px] border border-blue-500 text-blue-600 rounded-xl text-sm font-semibold active:bg-blue-50 transition-colors"
          >
            <Map size={16} />
            {t('view_map', lang)}
          </button>
          <button
            onClick={onPlanRoute}
            className="flex-1 flex items-center justify-center gap-1.5 min-h-[48px] bg-blue-600 text-white rounded-xl text-sm font-semibold active:bg-blue-700 transition-colors"
          >
            <Navigation size={16} />
            {t('plan_route', lang)}
          </button>
        </div>
      </div>
    </div>
  );
}
