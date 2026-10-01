// frontend/src/components/SpotsTab.tsx
import React, { useState } from 'react';
import { FishingSpotCard } from './FishingSpotCard';
import { Anchor, MapPin, Filter, Layers, Navigation } from 'lucide-react';
import type { PFZZone } from '../types/marine';

interface SpotsTabProps {
  zones: PFZZone[];
  vesselLocation: { latitude: number; longitude: number; name?: string };
  language: string;
  mapElement?: React.ReactNode;
  onViewZoneOnMap: (zone: PFZZone) => void;
  onPlanRoute: (zone: PFZZone) => void;
}

const LABELS: Record<string, Record<string, string>> = {
  title:        { en: 'Fishing Hotspots', hi: 'मछली पकड़ने के हॉटस्पॉट', mr: 'मासेमारी हॉटस्पॉट', ta: 'மீன்பிடி இடங்கள்' },
  subtitle:     { en: 'Satellite-identified productive zones and safe waters', hi: 'उपग्रह आधारित संभावित मछली क्षेत्र', mr: 'उपग्रह आधारित संभाव्य मासेमारी क्षेत्र', ta: 'செயற்கைக்கோள் அடையாளம் காணப்பட்ட பகுதிகள்' },
  filter_all:   { en: 'All Spots', hi: 'सभी स्थान', mr: 'सर्व ठिकाणे', ta: 'அனைத்து இடங்கள்' },
  filter_rec:   { en: 'Recommended Only', hi: 'केवल अनुशंसित', mr: 'फक्त शिफारस केलेले', ta: 'பரிந்துரைக்கப்பட்டவை' },
  filter_near:  { en: 'Closest (< 15 km)', hi: 'निकटतम (< 15 किमी)', mr: 'जवळचे (< १५ किमी)', ta: 'மிக அருகில் (< 15 கி.மீ)' },
  no_zones:     { en: 'No fishing hotspots mapped in this sector.', hi: 'इस क्षेत्र में कोई स्थान नहीं मिला।', mr: 'या भागात कोणतेही क्षेत्र आढळले नाही.', ta: 'இந்த பகுதியில் மீன்பிடி பகுதிகள் இல்லை.' },
  map_view:     { en: 'Map Overview', hi: 'मानचित्र', mr: 'नकाशा', ta: 'வரைபடம்' },
  list_view:    { en: 'Zone Cards', hi: 'सूची', mr: 'यादी', ta: 'பட்டியல்' },
};

export const SpotsTab: React.FC<SpotsTabProps> = ({
  zones,
  vesselLocation,
  language,
  mapElement,
  onViewZoneOnMap,
  onPlanRoute
}) => {
  const lang = ['en', 'hi', 'mr', 'ta'].includes(language) ? language : 'en';
  const [filterMode, setFilterMode] = useState<'all' | 'rec' | 'near'>('all');

  // Filter & sort zones
  const filteredZones = zones.filter(z => {
    if (filterMode === 'rec') {
      const r = z.recommendation?.toUpperCase();
      return r === 'RECOMMENDED' || r === 'HIGHLY_RECOMMENDED';
    }
    if (filterMode === 'near') {
      return z.distance_km <= 15.0;
    }
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 space-y-4">
      {/* ── Header ── */}
      <header className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <Anchor className="w-5 h-5 text-blue-600" />
            <span>{LABELS.title[lang]}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold">
              {zones.length}
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {LABELS.subtitle[lang]}
          </p>
        </div>
      </header>

      {/* ── Interactive Map Section (Prominent) ── */}
      {mapElement && (
        <section aria-label="Marine Geospatial Map" className="rounded-2xl overflow-hidden border border-slate-200 shadow-xs h-[300px] sm:h-[380px] w-full relative">
          {mapElement}
        </section>
      )}

      {/* ── Filter Bar ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
        <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <button
          type="button"
          onClick={() => setFilterMode('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors min-h-[38px] ${
            filterMode === 'all'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          {LABELS.filter_all[lang]} ({zones.length})
        </button>
        <button
          type="button"
          onClick={() => setFilterMode('rec')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors min-h-[38px] ${
            filterMode === 'rec'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          {LABELS.filter_rec[lang]}
        </button>
        <button
          type="button"
          onClick={() => setFilterMode('near')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors min-h-[38px] ${
            filterMode === 'near'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          {LABELS.filter_near[lang]}
        </button>
      </div>

      {/* ── Zones List ── */}
      <section aria-label="Fishing Spot Cards" className="space-y-3">
        {filteredZones.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-2">
            <Anchor className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-sm font-semibold text-slate-600">{LABELS.no_zones[lang]}</p>
          </div>
        ) : (
          filteredZones.map((zone) => (
            <FishingSpotCard
              key={zone.id}
              zone={zone}
              onViewMap={() => {
                onViewZoneOnMap(zone);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onPlanRoute={() => onPlanRoute(zone)}
              language={lang}
            />
          ))
        )}
      </section>
    </div>
  );
};
