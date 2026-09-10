// frontend/src/components/LocationModal.tsx
import React, { useState } from 'react';
import { MapPin, Navigation, Compass, X, Check, Crosshair, AlertCircle } from 'lucide-react';
import { getTranslation } from '../services/i18n';

interface LocationModalProps {
  selectedLanguage?: string;
  isOpen: boolean;
  onClose: () => void;
  currentLocation: { latitude: number; longitude: number; name?: string; heading_deg?: number };
  onUpdateLocation: (loc: { latitude: number; longitude: number; name: string; heading_deg?: number }) => void;
}

const COASTAL_PRESETS = [
  {
    name: 'Mumbai (Sassoon Docks)',
    state: 'Maharashtra',
    latitude: 18.9220,
    longitude: 72.8347,
    type: 'Major Harbor'
  },
  {
    name: 'Mirkarwada Harbor (Ratnagiri)',
    state: 'Maharashtra',
    latitude: 16.9902,
    longitude: 73.2848,
    type: 'Deep Sea Port'
  },
  {
    name: 'Veraval Fishing Harbor',
    state: 'Gujarat',
    latitude: 20.9077,
    longitude: 70.3679,
    type: 'Trawler Fleet Hub'
  },
  {
    name: 'Porbandar Port',
    state: 'Gujarat',
    latitude: 21.6417,
    longitude: 69.6093,
    type: 'Coastal Base'
  },
  {
    name: 'Kutch / Jakhau Port',
    state: 'Gujarat (Near IMBL)',
    latitude: 22.8500,
    longitude: 68.4900,
    type: 'Border Sector'
  },
  {
    name: 'Kochi Thoppumpady Harbor',
    state: 'Kerala',
    latitude: 9.9312,
    longitude: 76.2673,
    type: 'Major Pelagic Hub'
  },
  {
    name: 'Kasimedu Harbor (Chennai)',
    state: 'Tamil Nadu',
    latitude: 13.1250,
    longitude: 80.2980,
    type: 'East Coast Terminal'
  },
  {
    name: 'Rameswaram Fishing Jetty',
    state: 'Tamil Nadu (Palk Strait)',
    latitude: 9.2876,
    longitude: 79.3129,
    type: 'Border & Island Hub'
  },
  {
    name: 'Visakhapatnam Harbor',
    state: 'Andhra Pradesh',
    latitude: 17.6868,
    longitude: 83.2185,
    type: 'Bay of Bengal Base'
  }
];

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  currentLocation,
  onUpdateLocation,
  selectedLanguage = "en"
}) => {
  const t = getTranslation(selectedLanguage);
  const [latInput, setLatInput] = useState(currentLocation.latitude.toString());
  const [lonInput, setLonInput] = useState(currentLocation.longitude.toString());
  const [nameInput, setNameInput] = useState(currentLocation.name || t.map.custom_waypoint);
  const [isLocating, setIsLocating] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDeviceGPS = () => {
    if (!navigator.geolocation) {
      setGpsError('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setGpsError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        const lat = parseFloat(position.coords.latitude.toFixed(4));
        const lon = parseFloat(position.coords.longitude.toFixed(4));
        const accuracy = Math.round(position.coords.accuracy);

        setLatInput(lat.toString());
        setLonInput(lon.toString());
        const gpsLabel = `Live Device GPS (±${accuracy}m)`;
        setNameInput(gpsLabel);

        onUpdateLocation({
          latitude: lat,
          longitude: lon,
          name: gpsLabel,
          heading_deg: currentLocation.heading_deg || 245
        });
        onClose();
      },
      (err) => {
        setIsLocating(false);
        if (err.code === err.PERMISSION_DENIED) {
          setGpsError('Location permission denied. Please allow access or select a coastal port preset.');
        } else {
          setGpsError('Unable to acquire satellite GPS lock. Select a coastal port below or enter coordinates manually.');
        }
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleApplyManual = (e: React.FormEvent) => {
    e.preventDefault();
    const lat = parseFloat(latInput);
    const lon = parseFloat(lonInput);

    if (isNaN(lat) || isNaN(lon)) {
      setGpsError('Please enter valid numeric latitude and longitude coordinates.');
      return;
    }

    if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      setGpsError('Coordinates out of range. Latitude: -90 to 90, Longitude: -180 to 180.');
      return;
    }

    onUpdateLocation({
      latitude: lat,
      longitude: lon,
      name: nameInput.trim() || `${lat.toFixed(4)}°N, ${lon.toFixed(4)}°E`,
      heading_deg: currentLocation.heading_deg || 245
    });
    onClose();
  };

  const handleSelectPreset = (preset: typeof COASTAL_PRESETS[0]) => {
    onUpdateLocation({
      latitude: preset.latitude,
      longitude: preset.longitude,
      name: `${preset.name} (${preset.state})`,
      heading_deg: currentLocation.heading_deg || 245
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white border border-slate-200 rounded-xl shadow-xl space-y-4 p-6 no-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-sm text-slate-900 tracking-tight">
                {t.locationModal.title}
              </h2>
              <p className="text-[11px] text-slate-500">
                {t.locationModal.current_label} {currentLocation.name || t.map.custom_waypoint} ({currentLocation.latitude.toFixed(4)}°N, {currentLocation.longitude.toFixed(4)}°E)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* GPS Error Banner */}
        {gpsError && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2 text-amber-800 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
            <span>{gpsError}</span>
          </div>
        )}

        {/* Option 1: Live Browser GPS Geolocation */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50/70 to-indigo-50/70 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="font-bold text-xs text-blue-900 flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5 text-blue-600" />
              <span>{t.locationModal.use_device_gps}</span>
            </div>
            <p className="text-[11px] text-blue-700 mt-0.5">
              {t.locationModal.device_gps_desc}
            </p>
          </div>
          <button
            onClick={handleDeviceGPS}
            disabled={isLocating}
            className="h-8 px-3.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors inline-flex items-center justify-center gap-1.5 leading-none shrink-0"
          >
            {isLocating ? (
              <>
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>{t.locationModal.acquiring_lock}</span>
              </>
            ) : (
              <>
                <Crosshair className="w-3.5 h-3.5" />
                <span>{t.locationModal.acquire_gps}</span>
              </>
            )}
          </button>
        </div>

        {/* Option 2: Indian Coastal Fishing Ports Preset Grid */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 font-mono">
              {t.locationModal.harbors_heading}
            </span>
            <span className="text-[10px] text-slate-400">{t.locationModal.click_to_deploy}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {COASTAL_PRESETS.map((preset) => {
              const isSelected =
                Math.abs(preset.latitude - currentLocation.latitude) < 0.01 &&
                Math.abs(preset.longitude - currentLocation.longitude) < 0.01;

              return (
                <button
                  key={preset.name}
                  onClick={() => handleSelectPreset(preset)}
                  className={`p-2.5 rounded-lg border text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-blue-50/80 border-blue-400 shadow-2xs'
                      : 'bg-white hover:bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1">
                    <span className="font-semibold text-xs text-slate-900 line-clamp-1">
                      {preset.name}
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />}
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                    <span>{preset.state}</span>
                    <span className="text-slate-400">{preset.latitude.toFixed(2)}°N</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Option 3: Manual Decimal Coordinates Entry */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-700 font-mono mb-2">
            {t.locationModal.manual_heading}
          </div>

          <form onSubmit={handleApplyManual} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">
                  {t.locationModal.latitude}
                </label>
                <input
                  type="number"
                  step="any"
                  value={latInput}
                  onChange={(e) => setLatInput(e.target.value)}
                  placeholder="e.g. 18.9220"
                  className="w-full h-8 px-2.5 text-xs bg-white border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">
                  {t.locationModal.longitude}
                </label>
                <input
                  type="number"
                  step="any"
                  value={lonInput}
                  onChange={(e) => setLonInput(e.target.value)}
                  placeholder="e.g. 72.8347"
                  className="w-full h-8 px-2.5 text-xs bg-white border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">
                  {t.locationModal.sector_label}
                </label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="e.g. Off Ratnagiri Shelf"
                  className="w-full h-8 px-2.5 text-xs bg-white border border-slate-300 rounded-md focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
              <span className="text-[11px] text-slate-500">
                {t.locationModal.reposition_tip}
              </span>
              <button
                type="submit"
                className="w-full sm:w-auto h-8 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors leading-none shrink-0 cursor-pointer"
              >
                Apply Coordinates
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
