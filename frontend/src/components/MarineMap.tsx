import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import type { PFZZone, RouteOption, GeofenceZone, GeofenceCheckResult } from '../types/marine';
import { Layers, Compass, Navigation, AlertTriangle, MapPin, Check, Crosshair } from 'lucide-react';
import { getTranslation } from '../services/i18n';

interface MarineMapProps {
  selectedLanguage?: string;
  vesselLocation: { latitude: number; longitude: number; heading_deg?: number; name?: string };
  pfzZones: PFZZone[];
  routes: RouteOption[];
  geofences: GeofenceZone[];
  geofenceStatus?: GeofenceCheckResult;
  mapFocus?: { latitude: number; longitude: number; zoom: number };
  activeLayers?: string[];
  onSelectZone?: (zone: PFZZone) => void;
  onUpdateLocation?: (loc: { latitude: number; longitude: number; name: string; heading_deg?: number }) => void;
  onOpenLocationModal?: () => void;
}

export const MarineMap: React.FC<MarineMapProps> = ({
  selectedLanguage = "en",
  vesselLocation,
  pfzZones,
  routes,
  geofences,
  geofenceStatus,
  mapFocus,
  onSelectZone,
  onUpdateLocation,
  onOpenLocationModal
}) => {
  const t = getTranslation(selectedLanguage);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [relocatedToast, setRelocatedToast] = useState<string | null>(null);
  const [isPinMode, setIsPinMode] = useState(false);
  const isPinModeRef = useRef(isPinMode);
  useEffect(() => {
    isPinModeRef.current = isPinMode;
  }, [isPinMode]);

  const onUpdateLocationRef = useRef(onUpdateLocation);
  useEffect(() => {
    onUpdateLocationRef.current = onUpdateLocation;
  }, [onUpdateLocation]);

  // Layer toggles
  const [isLayerControlOpen, setIsLayerControlOpen] = useState(false);
  const [showPFZ, setShowPFZ] = useState(true);
  const [showRoutes, setShowRoutes] = useState(true);
  const [showBoundaries, setShowBoundaries] = useState(true);
  const [showWaveHazards, setShowWaveHazards] = useState(true);
  const [showSSTOverlay, setShowSSTOverlay] = useState(true);

  // Layer groups
  const layersRef = useRef<{
    vessel?: L.LayerGroup;
    pfz?: L.LayerGroup;
    routes?: L.LayerGroup;
    boundaries?: L.LayerGroup;
    hazards?: L.LayerGroup;
    sst?: L.LayerGroup;
  }>({});

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    if ((mapContainerRef.current as any)._leaflet_id) {
      (mapContainerRef.current as any)._leaflet_id = null;
    }

    const map = L.map(mapContainerRef.current, {
      center: [vesselLocation.latitude, vesselLocation.longitude],
      zoom: 11,
      zoomControl: false
    });

    // Standard OpenStreetMap tiles - 100% free, no API key required
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    layersRef.current.vessel = L.layerGroup().addTo(map);
    layersRef.current.pfz = L.layerGroup().addTo(map);
    layersRef.current.routes = L.layerGroup().addTo(map);
    layersRef.current.boundaries = L.layerGroup().addTo(map);
    layersRef.current.hazards = L.layerGroup().addTo(map);
    layersRef.current.sst = L.layerGroup().addTo(map);

    // Interactive map click to relocate vessel (only when pin mode is explicitly active)
    map.on('click', (e: L.LeafletMouseEvent) => {
      if (!isPinModeRef.current) return;
      const lat = parseFloat(e.latlng.lat.toFixed(4));
      const lon = parseFloat(e.latlng.lng.toFixed(4));
      if (onUpdateLocationRef.current) {
        onUpdateLocationRef.current({
          latitude: lat,
          longitude: lon,
          name: `${t.map.custom_waypoint} (${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E)`,
          heading_deg: 245
        });
        setRelocatedToast(`${t.map.reposition_toast} ${lat.toFixed(4)}°N, ${lon.toFixed(4)}°E`);
        setTimeout(() => setRelocatedToast(null), 3500);
        setIsPinMode(false);
      }
    });

    mapInstanceRef.current = map;

    const timer = setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 200);

    const resizeObserver = new ResizeObserver(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    });
    if (mapContainerRef.current) {
      resizeObserver.observe(mapContainerRef.current);
    }

    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      if (mapContainerRef.current) {
        (mapContainerRef.current as any)._leaflet_id = null;
      }
    };
  }, []);

  // Sync Map Focus
  useEffect(() => {
    if (!mapInstanceRef.current || !mapFocus) return;
    mapInstanceRef.current.flyTo([mapFocus.latitude, mapFocus.longitude], mapFocus.zoom || 11, {
      duration: 1.0
    });
  }, [mapFocus]);

  // Render Vessel Marker
  useEffect(() => {
    const group = layersRef.current.vessel;
    if (!group) return;
    group.clearLayers();

    const heading = vesselLocation.heading_deg || 245;

    const vesselIcon = L.divIcon({
      className: 'vessel-marker-icon',
      html: `
        <div style="transform: rotate(${heading}deg); width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.25));">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e40af" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="12 2 19 21 12 17 5 21 12 2" fill="#2563eb" fill-opacity="0.9"/>
          </svg>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    const marker = L.marker([vesselLocation.latitude, vesselLocation.longitude], { icon: vesselIcon })
      .bindPopup(`
        <div style="font-family: inherit; font-size: 12px; color: #0f172a;">
          <div style="font-weight: 700; color: #1d4ed8; margin-bottom: 4px;">${t.map.popup_vessel_telemetry}</div>
          <div><strong>${t.map.popup_location}</strong> ${vesselLocation.name || t.map.popup_current_position}</div>
          <div><strong>${t.map.popup_coordinates}</strong> ${vesselLocation.latitude.toFixed(4)}°N, ${vesselLocation.longitude.toFixed(4)}°E</div>
          <div><strong>${t.map.popup_heading}</strong> ${heading}° | <strong>${t.map.popup_status}</strong> ${t.common.ais_active}</div>
        </div>
      `);

    group.addLayer(marker);
  }, [vesselLocation]);

  // Render PFZ Zones
  useEffect(() => {
    const group = layersRef.current.pfz;
    if (!group) return;
    group.clearLayers();
    if (!showPFZ) return;

    pfzZones.forEach((z) => {
      const isAvoid = z.recommendation === 'AVOID';
      const isCaution = z.recommendation === 'PROCEED_WITH_CAUTION';
      const strokeColor = isAvoid ? '#e11d48' : isCaution ? '#d97706' : '#059669';

      const circle = L.circle([z.latitude, z.longitude], {
        radius: 2000,
        color: strokeColor,
        weight: 2,
        fillColor: strokeColor,
        fillOpacity: isAvoid ? 0.15 : 0.2
      });

      const iconMarker = L.circleMarker([z.latitude, z.longitude], {
        radius: 6,
        color: '#ffffff',
        weight: 2,
        fillColor: strokeColor,
        fillOpacity: 1
      });

      const popupContent = `
        <div style="font-family: inherit; font-size: 12px; min-width: 220px; color: #0f172a;">
          <div style="font-weight: 700; color: ${strokeColor}; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; margin-bottom: 6px;">
            ${z.name} (${isAvoid ? t.common.avoid : isCaution ? t.common.moderate : t.common.recommended})
          </div>
          <div><strong>${t.map.popup_distance}</strong> ${z.distance_km} ${t.common.km}</div>
          <div><strong>${t.map.popup_productivity}</strong> ${z.productivity_score}/100</div>
          <div><strong>${t.map.popup_sst}</strong> ${z.sst_c}°C | <strong>${t.map.popup_chla}</strong> ${z.chlorophyll_mg_m3} mg/m³</div>
          <div><strong>${t.map.popup_wave_risk}</strong> ${z.wave_risk === 'LOW' ? t.common.safe : isAvoid ? t.common.high_risk : t.common.moderate}</div>
          <div style="font-size: 11px; color: #475569; margin-top: 6px; padding-top: 4px; border-top: 1px dashed #e2e8f0;">
            ${z.description}
          </div>
        </div>
      `;

      circle.bindPopup(popupContent);
      iconMarker.bindPopup(popupContent);

      if (onSelectZone) {
        circle.on('click', () => onSelectZone(z));
        iconMarker.on('click', () => onSelectZone(z));
      }

      group.addLayer(circle);
      group.addLayer(iconMarker);
    });
  }, [pfzZones, showPFZ, onSelectZone]);

  // Render Routes
  useEffect(() => {
    const group = layersRef.current.routes;
    if (!group) return;
    group.clearLayers();
    if (!showRoutes || !routes || routes.length === 0) return;

    routes.forEach((r) => {
      const isRec = r.is_recommended;
      const color = isRec ? '#059669' : '#dc2626';
      const dashArray = isRec ? undefined : '6, 6';

      const polyline = L.polyline(r.waypoints, {
        color: color,
        weight: isRec ? 4 : 2.5,
        opacity: isRec ? 0.95 : 0.8,
        dashArray: dashArray,
        lineCap: 'round',
        lineJoin: 'round'
      });

      polyline.bindPopup(`
        <div style="font-family: inherit; font-size: 12px; min-width: 200px; color: #0f172a;">
          <div style="font-weight: 700; color: ${color}; margin-bottom: 4px;">
            ${isRec ? t.map.popup_rec_route : t.map.popup_avoid_route}
          </div>
          <div><strong>${t.map.popup_distance}</strong> ${r.distance_km} ${t.common.km} (~${r.travel_time_mins} min)</div>
          <div><strong>${t.map.popup_risk_score}</strong> ${r.risk_score}/100 (${r.risk_level === 'LOW' ? t.common.safe : r.risk_level === 'HIGH' ? t.common.high_risk : t.common.moderate})</div>
          <div style="font-size: 11px; color: #475569; margin-top: 4px;">
            ${r.why_chosen_or_avoided}
          </div>
        </div>
      `);

      group.addLayer(polyline);

      r.waypoints.forEach((pt, idx) => {
        if (idx === 0 || idx === r.waypoints.length - 1) return;
        const wp = L.circleMarker(pt, {
          radius: 4,
          color: color,
          fillColor: '#ffffff',
          fillOpacity: 1,
          weight: 2
        });
        group.addLayer(wp);
      });
    });
  }, [routes, showRoutes]);

  // Render Geofences & Boundaries
  useEffect(() => {
    const group = layersRef.current.boundaries;
    if (!group) return;
    group.clearLayers();
    if (!showBoundaries) return;

    geofences.forEach((fence) => {
      const isPoly = fence.coordinates.length > 2 && fence.coordinates[0][0] === fence.coordinates[fence.coordinates.length - 1][0];

      if (isPoly) {
        const color = fence.restriction_level === 'STRICT_RESTRICTION' ? '#dc2626' : '#2563eb';
        const poly = L.polygon(fence.coordinates, {
          color: color,
          weight: 1.5,
          fillColor: color,
          fillOpacity: 0.12,
          dashArray: '4, 4'
        }).bindPopup(`
          <div style="font-family: inherit; font-size: 12px; color: #0f172a;">
            <div style="font-weight: 700; color: ${color};">${fence.category}</div>
            <div><strong>${fence.name}</strong></div>
            <div style="color: #475569; margin-top: 2px;">${fence.description}</div>
          </div>
        `);
        group.addLayer(poly);
      } else {
        const line = L.polyline(fence.coordinates, {
          color: '#d97706',
          weight: 3,
          dashArray: '8, 6',
          opacity: 0.9
        }).bindPopup(`
          <div style="font-family: inherit; font-size: 12px; color: #0f172a;">
            <div style="font-weight: 700; color: #d97706;">${t.map.popup_imbl}</div>
            <div><strong>${fence.name}</strong></div>
            <div style="color: #475569; margin-top: 2px;">${fence.description}</div>
          </div>
        `);
        group.addLayer(line);
      }
    });
  }, [geofences, showBoundaries]);

  // Render Wave Hazards
  useEffect(() => {
    const group = layersRef.current.hazards;
    if (!group) return;
    group.clearLayers();
    if (!showWaveHazards) return;

    const hazardPolygon = [
      [18.87, 72.72],
      [18.87, 72.79],
      [18.81, 72.79],
      [18.81, 72.72],
      [18.87, 72.72]
    ] as [number, number][];

    const poly = L.polygon(hazardPolygon, {
      color: '#ea580c',
      weight: 1.5,
      fillColor: '#ea580c',
      fillOpacity: 0.18,
      dashArray: '5, 5'
    }).bindPopup(`
      <div style="font-family: inherit; font-size: 12px; color: #0f172a;">
        <div style="font-weight: 700; color: #ea580c;">${t.map.popup_hazard_zone}</div>
        <div>${t.map.popup_hazard_desc}</div>
      </div>
    `);

    group.addLayer(poly);
  }, [showWaveHazards]);

  // Render SST Overlay
  useEffect(() => {
    const group = layersRef.current.sst;
    if (!group) return;
    group.clearLayers();
    if (!showSSTOverlay) return;

    const sstFront = [
      [19.04, 72.64],
      [19.04, 72.76],
      [18.94, 72.75],
      [18.94, 72.63],
      [19.04, 72.64]
    ] as [number, number][];

    const poly = L.polygon(sstFront, {
      color: '#0284c7',
      weight: 1.2,
      fillColor: '#0284c7',
      fillOpacity: 0.12
    }).bindTooltip(t.map.popup_thermal_front, { permanent: false, direction: 'top' });

    group.addLayer(poly);
  }, [showSSTOverlay]);

  return (
    <div className={`relative isolate z-0 w-full h-full min-h-[440px] bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-xs ${isPinMode ? 'cursor-crosshair' : ''}`}>
      <div ref={mapContainerRef} className="w-full h-full min-h-[440px]" />

      {/* Pin Mode Indicator Banner */}
      {isPinMode && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 bg-blue-600 text-white px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-md border border-blue-400 flex items-center gap-2 animate-bounce">
          <Crosshair className="w-3.5 h-3.5" />
          <span>{t.map.reposition_pin_hint}</span>
          <button
            type="button"
            onClick={() => setIsPinMode(false)}
            className="ml-1 text-[11px] bg-blue-700 hover:bg-blue-800 rounded-full px-1.5 py-0.5 leading-none"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Modern GIS Layer Control Toolbar (Collapsible for phone & desktop) */}
      <div className="absolute top-3 right-3 z-20 flex flex-col items-end">
        <button
          type="button"
          onClick={() => setIsLayerControlOpen(!isLayerControlOpen)}
          title={t.map.toggle_layers_tooltip}
          className="h-8 px-2.5 rounded-lg bg-white/95 backdrop-blur-md hover:bg-white text-slate-800 font-semibold text-xs border border-slate-300 inline-flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
        >
          <Layers className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span className="leading-none text-[11px]">{t.map.layers}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0"></span>
        </button>

        {isLayerControlOpen && (
          <div className="mt-1.5 bg-white/95 backdrop-blur-md border border-slate-200 rounded-lg p-3 shadow-lg text-xs space-y-2 w-48 animate-in fade-in slide-in-from-top-1 duration-150">
            <div className="font-bold text-slate-800 flex items-center justify-between pb-1.5 border-b border-slate-100 text-[11px] uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-blue-600" />
                <span>{t.map.chart_layers}</span>
              </span>
              <button
                type="button"
                onClick={() => setIsLayerControlOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-xs font-bold px-1"
              >
                ✕
              </button>
            </div>

            <label className="flex items-center gap-2 cursor-pointer text-slate-700 hover:text-slate-900">
              <input
                type="checkbox"
                checked={showPFZ}
                onChange={(e) => setShowPFZ(e.target.checked)}
                className="rounded border-slate-300 text-emerald-600 focus:ring-0"
              />
              <span className="flex items-center gap-1.5 text-[11px] font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                {t.map.layer_pfz}
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-slate-700 hover:text-slate-900">
              <input
                type="checkbox"
                checked={showRoutes}
                onChange={(e) => setShowRoutes(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-0"
              />
              <span className="flex items-center gap-1.5 text-[11px] font-medium">
                <span className="w-2.5 h-1 rounded bg-blue-600"></span>
                {t.map.layer_routes}
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-slate-700 hover:text-slate-900">
              <input
                type="checkbox"
                checked={showBoundaries}
                onChange={(e) => setShowBoundaries(e.target.checked)}
                className="rounded border-slate-300 text-amber-600 focus:ring-0"
              />
              <span className="flex items-center gap-1.5 text-[11px] font-medium">
                <span className="w-2.5 h-1 rounded bg-amber-500"></span>
                {t.map.layer_borders}
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-slate-700 hover:text-slate-900">
              <input
                type="checkbox"
                checked={showWaveHazards}
                onChange={(e) => setShowWaveHazards(e.target.checked)}
                className="rounded border-slate-300 text-orange-600 focus:ring-0"
              />
              <span className="flex items-center gap-1.5 text-[11px] font-medium">
                <span className="w-2.5 h-2.5 rounded bg-orange-400 opacity-60"></span>
                {t.map.layer_swell}
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-slate-700 hover:text-slate-900">
              <input
                type="checkbox"
                checked={showSSTOverlay}
                onChange={(e) => setShowSSTOverlay(e.target.checked)}
                className="rounded border-slate-300 text-sky-600 focus:ring-0"
              />
              <span className="flex items-center gap-1.5 text-[11px] font-medium">
                <span className="w-2.5 h-2.5 rounded bg-sky-400 opacity-60"></span>
                {t.map.layer_thermal}
              </span>
            </label>
          </div>
        )}
      </div>

      {/* Recenter & Location Controls */}
      <div className="absolute bottom-3 left-3 z-20 flex flex-wrap items-center gap-1.5 sm:gap-2 max-w-[calc(100%-20px)]">
        <button
          type="button"
          onClick={() => {
            if (mapInstanceRef.current) {
              mapInstanceRef.current.flyTo([vesselLocation.latitude, vesselLocation.longitude], 12);
            }
          }}
          className="h-7 sm:h-8 px-2 sm:px-3 rounded-lg bg-white/95 backdrop-blur-md hover:bg-slate-50 text-slate-700 font-semibold text-[11px] sm:text-xs border border-slate-300 inline-flex items-center justify-center gap-1 sm:gap-1.5 shadow-sm transition-colors leading-none"
        >
          <Compass className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-blue-600 shrink-0" />
          <span className="leading-none">{t.map.vessel}</span>
        </button>

        <button
          type="button"
          onClick={() => {
            if (mapInstanceRef.current && pfzZones.length > 0) {
              mapInstanceRef.current.flyTo([pfzZones[0].latitude, pfzZones[0].longitude], 12);
            }
          }}
          className="h-7 sm:h-8 px-2 sm:px-3 rounded-lg bg-white/95 backdrop-blur-md hover:bg-slate-50 text-slate-700 font-semibold text-[11px] sm:text-xs border border-slate-300 inline-flex items-center justify-center gap-1 sm:gap-1.5 shadow-sm transition-colors leading-none"
        >
          <Navigation className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-emerald-600 shrink-0" />
          <span className="leading-none">{t.map.top_pfz}</span>
        </button>

        {onOpenLocationModal && (
          <button
            type="button"
            onClick={onOpenLocationModal}
            className="h-7 sm:h-8 px-2 sm:px-3 rounded-lg bg-white/95 backdrop-blur-md hover:bg-blue-50 text-blue-700 font-semibold text-[11px] sm:text-xs border border-blue-200 inline-flex items-center justify-center gap-1 sm:gap-1.5 shadow-sm transition-colors leading-none"
          >
            <MapPin className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-blue-600 shrink-0" />
            <span className="leading-none">{t.map.gps_sector}</span>
          </button>
        )}

        <button
          type="button"
          onClick={() => setIsPinMode(!isPinMode)}
          title={t.map.set_pin_tooltip}
          className={`h-7 sm:h-8 px-2 sm:px-3 rounded-lg backdrop-blur-md font-semibold text-[11px] sm:text-xs border inline-flex items-center justify-center gap-1 sm:gap-1.5 shadow-sm transition-colors leading-none ${
            isPinMode
              ? 'bg-blue-600 text-white border-blue-700'
              : 'bg-white/95 hover:bg-slate-50 text-slate-700 border-slate-300'
          }`}
        >
          <Crosshair className={`w-3 sm:w-3.5 h-3 sm:h-3.5 shrink-0 ${isPinMode ? 'text-white animate-spin' : 'text-slate-600'}`} />
          <span className="leading-none">{t.map.set_pin}</span>
        </button>
      </div>

      {/* Relocation Notification Toast */}
      {relocatedToast && (
        <div className="absolute top-3 right-3 z-30 bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-mono shadow-lg border border-slate-700 flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span>{relocatedToast}</span>
        </div>
      )}

      {/* Boundary Alert Pill if within warning */}
      {geofenceStatus && (geofenceStatus.is_inside || geofenceStatus.alert_level === 'WARNING' || geofenceStatus.alert_level === 'CRITICAL') && (
        <div className="absolute top-3 left-3 z-20 bg-rose-50 border border-rose-300 text-rose-900 px-3.5 py-2 rounded-lg text-xs max-w-sm shadow-md inline-flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div className="leading-snug">
            <span className="font-bold text-rose-800">{geofenceStatus.alert_level}: </span>
            <span>{geofenceStatus.warning_message}</span>
          </div>
        </div>
      )}
    </div>
  );
};