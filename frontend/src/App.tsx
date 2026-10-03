// frontend/src/App.tsx
// Fisherman-First redesign: 5-tab mobile navigation
// Preserves all existing backend capabilities; reorganizes for non-technical users.

import React, { useState, useEffect, useCallback } from 'react';
import { AuthLanding, type UserProfile } from './components/AuthLanding';
import { MarineMap } from './components/MarineMap';
import { AICopilot } from './components/AICopilot';
import { NoticeModal } from './components/NoticeModal';
import { LocationModal } from './components/LocationModal';
import { ErrorBoundary } from './components/ErrorBoundary';

// New fisherman-first tabs
import { BottomNav } from './components/BottomNav';
import { HomeTab } from './components/HomeTab';
import { SpotsTab } from './components/SpotsTab';
import { TripTab } from './components/TripTab';
import { ProfileTab } from './components/ProfileTab';
import { OfflineBanner } from './components/OfflineBanner';
import { useNetworkStatus, saveOfflineBundle, getOfflineBundle } from './services/offlineCache';

import {
  sendChatQuery,
  fetchCurrentWeather,
  fetchNearbyPFZ,
  fetchGeofences,
  fetchDemoRoutes,
  fetchAlerts
} from './services/api';

import type {
  WeatherData,
  PFZZone,
  GeofenceZone,
  RouteRecommendation,
  MarineAdvisory,
  ChatResponse
} from './types/marine';

type TabId = 'home' | 'spots' | 'trip' | 'ask' | 'profile';

const DEFAULT_WEATHER: WeatherData = {
  temperature_c: 28.4,
  wind_speed_kmh: 22.0,
  wind_speed_knots: 11.9,
  wind_direction: 'NW',
  wind_gust_kmh: 28.0,
  rain_probability: 25,
  visibility: 'Good (8-10 km)',
  lightning_risk: 'Low',
  cyclone_alert: false,
  wave_height_m: 1.4,
  wave_period_s: 7.2,
  sea_state: 'Moderate',
  risk_level: 'Moderate',
  forecast_summary: 'Moderate sea state. Safe nearshore operations; monitor afternoon swells.'
};

// Helper: Reconciles atmospheric telemetry, IMD port signals, and active marine advisories
function deriveConsensusRisk(
  w: WeatherData,
  alts: MarineAdvisory[],
  chat: ChatResponse | null
): { score: number; level: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL'; advisory?: string } {
  const portSig = (w.port_signal || '').toUpperCase();
  const isPortDanger = ['IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'DANGER', 'GREAT DANGER'].some(k => portSig.includes(k));
  const isPortCaution = ['SIGNAL NUMBER III', 'SIGNAL NO. 3', 'LOCAL CAUTIONARY', 'SQUALL'].some(k => portSig.includes(k));

  const criticalAlert = alts?.find(a => a.severity?.toUpperCase() === 'CRITICAL');
  const warningAlert = alts?.find(a => a.severity?.toUpperCase() === 'WARNING');
  const cautionAlert = alts?.find(a => a.severity?.toUpperCase() === 'CAUTION');

  // Match authoritative advisory text if present
  let advisory: string | undefined;
  if (criticalAlert) {
    advisory = criticalAlert.description || criticalAlert.advisory_type;
  } else if (w.cyclone_alert) {
    advisory = 'Active IMD Coastal Cyclone Warning';
  } else if (isPortDanger) {
    advisory = `Official Port Danger Signal: ${w.port_signal}`;
  } else if (warningAlert) {
    advisory = warningAlert.description || warningAlert.advisory_type;
  } else if (isPortCaution) {
    advisory = `Official Port Cautionary Signal: ${w.port_signal}`;
  } else if (cautionAlert) {
    advisory = cautionAlert.description || cautionAlert.advisory_type;
  }

  // 1. Critical Overrides (Cyclone alert, Port danger signal IV-X, or Critical advisory)
  if (w.cyclone_alert || isPortDanger || !!criticalAlert) {
    return {
      score: Math.max(chat?.risk_score ?? 90, 88),
      level: 'CRITICAL',
      advisory
    };
  }

  // 2. High Risk / Warning Overrides (Port Caution Signal III, Squall, Warning advisory, High waves/winds)
  if (isPortCaution || !!warningAlert || w.wind_speed_kmh >= 38 || w.wave_height_m >= 2.5) {
    return {
      score: Math.max(chat?.risk_score ?? 68, 65),
      level: 'HIGH',
      advisory
    };
  }

  // 3. Chat copilot response if available
  if (chat?.risk_score !== undefined && chat?.risk_level) {
    const raw = chat.risk_level.toUpperCase();
    const lvl = (['LOW', 'MODERATE', 'HIGH', 'CRITICAL'].includes(raw) ? raw : 'MODERATE') as 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
    return {
      score: chat.risk_score,
      level: lvl,
      advisory
    };
  }

  // 4. Weather baseline
  const rawW = (w.risk_level || '').toUpperCase();
  if (rawW === 'CRITICAL') return { score: 88, level: 'CRITICAL', advisory };
  if (rawW === 'HIGH') return { score: 68, level: 'HIGH', advisory };
  if (rawW === 'LOW' && w.wave_height_m <= 1.2 && w.wind_speed_kmh <= 20) {
    return { score: 18, level: 'LOW', advisory };
  }
  return { score: 38, level: 'MODERATE', advisory };
}

export function App() {
  // ── Auth ──────────────────────────────────────────────────────────────────
  // Fresh visits land directly on the Login & Registration portal
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = sessionStorage.getItem('marinemind_user');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  const handleLogin = (user: UserProfile) => {
    setCurrentUser(user);
    try {
      sessionStorage.setItem('marinemind_user', JSON.stringify(user));
      localStorage.setItem('marinemind_user', JSON.stringify(user));
      if (user.token) {
        sessionStorage.setItem('marinemind_token', user.token);
        localStorage.setItem('marinemind_token', user.token);
      }
    } catch {}
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      sessionStorage.removeItem('marinemind_user');
      sessionStorage.removeItem('marinemind_token');
      localStorage.removeItem('marinemind_user');
      localStorage.removeItem('marinemind_token');
    } catch {}
  };

  // Listen for session expiry from any API call across the application
  useEffect(() => {
    const onAuthExpired = () => {
      handleLogout();
    };
    window.addEventListener('marinemind:auth-expired', onAuthExpired);
    return () => window.removeEventListener('marinemind:auth-expired', onAuthExpired);
  }, []);

  // ── Language ──────────────────────────────────────────────────────────────
  const [selectedLanguage, setSelectedLanguageState] = useState<string>(() => {
    try { return localStorage.getItem('marinemind_lang') || 'en'; } catch { return 'en'; }
  });

  const setSelectedLanguage = (lang: string) => {
    setSelectedLanguageState(lang);
    try { localStorage.setItem('marinemind_lang', lang); } catch {}
  };

  // ── Navigation ────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState<TabId>('home');

  // ── Vessel location ───────────────────────────────────────────────────────
  const [vesselLocation, setVesselLocation] = useState(() => {
    try {
      const saved = localStorage.getItem('marinemind_location');
      return saved ? JSON.parse(saved) : {
        latitude: 18.922,
        longitude: 72.8347,
        name: 'Mumbai Sassoon Docks',
        heading_deg: 245
      };
    } catch {
      return { latitude: 18.922, longitude: 72.8347, name: 'Mumbai Sassoon Docks', heading_deg: 245 };
    }
  });

  // ── Marine data state ─────────────────────────────────────────────────────
  const [weather, setWeather] = useState<WeatherData>(DEFAULT_WEATHER);
  const [pfzZones, setPfzZones] = useState<PFZZone[]>([]);
  const [geofences, setGeofences] = useState<GeofenceZone[]>([]);
  const [routesData, setRoutesData] = useState<RouteRecommendation>({
    source: {}, destination: {}, routes: [], recommended_route_id: '', explanation: ''
  });
  const [alerts, setAlerts] = useState<MarineAdvisory[]>([]);
  const [currentChatResponse, setCurrentChatResponse] = useState<ChatResponse | null>(null);
  const [isLoadingChat, setIsLoadingChat] = useState<boolean>(false);
  const [mapFocus, setMapFocus] = useState({ latitude: 18.922, longitude: 72.8347, zoom: 11 });
  const isOnline = useNetworkStatus();
  const [dataStatus, setDataStatus] = useState<'LIVE' | 'UNAVAILABLE' | 'UNKNOWN' | 'CACHED'>('UNKNOWN');
  const [lastUpdated, setLastUpdated] = useState<string | undefined>(undefined);

  // ── Modals ────────────────────────────────────────────────────────────────
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  // ── Map focus zone (for Spots → Ask navigation) ───────────────────────────
  const [focusedZone, setFocusedZone] = useState<PFZZone | null>(null);

  // ── Authoritative Risk Consensus (reconciles weather, IMD bulletins & advisories) ──
  const consensusRisk = deriveConsensusRisk(weather, alerts, currentChatResponse);
  const riskScore = consensusRisk.score;
  const riskLevel = consensusRisk.level;
  const activeAdvisory = consensusRisk.advisory;

  // ── Load initial marine datasets ──────────────────────────────────────────
  const loadData = useCallback(async (lat?: number, lon?: number) => {
    const activeLat = lat ?? vesselLocation.latitude;
    const activeLon = lon ?? vesselLocation.longitude;

    // Fast-path: When deep-sea offline, immediately restore pre-voyage cache without network timeouts
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      const cached = getOfflineBundle();
      if (cached) {
        setWeather(cached.weather);
        setPfzZones(cached.pfzZones);
        setGeofences(cached.geofences);
        setRoutesData(cached.routesData);
        setAlerts(cached.alerts);
        setDataStatus('CACHED');
        setLastUpdated(cached.timestamp ? new Date(cached.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : undefined);
        return;
      }
    }

    try {
      const [w, pfz, geo, r, alt] = await Promise.all([
        fetchCurrentWeather(activeLat, activeLon),
        fetchNearbyPFZ(activeLat, activeLon),
        fetchGeofences(),
        fetchDemoRoutes(),
        fetchAlerts(activeLat, activeLon)
      ]);
      setWeather(w);
      setPfzZones(pfz);
      setGeofences(geo);
      setRoutesData(r);
      setAlerts(alt);

      // Save pre-voyage offline bundle into local persistent storage
      saveOfflineBundle({
        weather: w,
        pfzZones: pfz,
        geofences: geo,
        routesData: r,
        alerts: alt,
        vesselLocation: {
          latitude: activeLat,
          longitude: activeLon,
          name: vesselLocation.name,
          heading_deg: vesselLocation.heading_deg
        }
      });

      // Check provenance from response if available
      const wAny = w as any;
      if (wAny?.provenance?.status === 'LIVE') {
        setDataStatus('LIVE');
        setLastUpdated(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }));
      } else if (wAny?.provenance?.status === 'UNAVAILABLE') {
        setDataStatus('UNAVAILABLE');
      } else {
        setDataStatus('UNKNOWN');
      }
    } catch (err) {
      console.warn('Network fetch failed, checking offline bundle fallback:', err);
      const cached = getOfflineBundle();
      if (cached) {
        setWeather(cached.weather);
        setPfzZones(cached.pfzZones);
        setGeofences(cached.geofences);
        setRoutesData(cached.routesData);
        setAlerts(cached.alerts);
        setDataStatus('CACHED');
        setLastUpdated(cached.timestamp ? new Date(cached.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : undefined);
      } else {
        setDataStatus('UNAVAILABLE');
      }
    }
  }, [vesselLocation.latitude, vesselLocation.longitude, vesselLocation.name, vesselLocation.heading_deg]);

  // Auto-sync when signal restores
  useEffect(() => {
    if (isOnline) {
      loadData();
    }
  }, [isOnline]);

  // ── Detect Live Hardware GPS ───────────────────────────────────────────────
  const handleDetectGPS = useCallback(() => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your device browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = parseFloat(pos.coords.latitude.toFixed(4));
        const lon = parseFloat(pos.coords.longitude.toFixed(4));
        const acc = Math.round(pos.coords.accuracy);
        const newLoc = {
          latitude: lat,
          longitude: lon,
          name: `Live Device GPS (±${acc}m)`,
          heading_deg: 245
        };
        setVesselLocation(newLoc);
        setMapFocus({ latitude: lat, longitude: lon, zoom: 12 });
        try { localStorage.setItem('marinemind_location', JSON.stringify(newLoc)); } catch {}
        loadData(lat, lon);
      },
      (err) => {
        console.warn('GPS detection failed or permission denied:', err);
        // Fall back to saved/default location
        loadData();
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  }, [loadData]);

  // On mount: Auto-detect GPS if first visit, or load saved location
  useEffect(() => {
    const hasSavedLocation = !!localStorage.getItem('marinemind_location');
    if (!hasSavedLocation && navigator.geolocation) {
      handleDetectGPS();
    } else {
      loadData();
    }
  }, []);

  // ── Update vessel location ────────────────────────────────────────────────
  const handleUpdateLocation = async (loc: { latitude: number; longitude: number; name?: string; heading_deg?: number }) => {
    const newLoc = {
      latitude: loc.latitude,
      longitude: loc.longitude,
      name: loc.name || `${loc.latitude.toFixed(2)}°N, ${loc.longitude.toFixed(2)}°E`,
      heading_deg: loc.heading_deg || 245
    };
    setVesselLocation(newLoc);
    setMapFocus({ latitude: loc.latitude, longitude: loc.longitude, zoom: 11 });
    try { localStorage.setItem('marinemind_location', JSON.stringify(newLoc)); } catch {}
    await loadData(loc.latitude, loc.longitude);
  };


  // ── Chat / AI query handler ───────────────────────────────────────────────
  const handleSendMessage = async (query: string): Promise<ChatResponse> => {
    setIsLoadingChat(true);

    let activeLat = vesselLocation.latitude;
    let activeLon = vesselLocation.longitude;

    // Natural-language location detection
    const coordMatch = query.match(/(-?\d{1,2}\.\d+)[,\s]+(-?\d{1,3}\.\d+)/);
    const qLower = query.toLowerCase();

    if (coordMatch) {
      const pLat = parseFloat(coordMatch[1]);
      const pLon = parseFloat(coordMatch[2]);
      if (pLat >= -90 && pLat <= 90 && pLon >= -180 && pLon <= 180) {
        activeLat = pLat; activeLon = pLon;
        handleUpdateLocation({ latitude: pLat, longitude: pLon });
      }
    } else if (qLower.includes('ratnagiri')) {
      activeLat = 16.9902; activeLon = 73.2848;
      handleUpdateLocation({ latitude: 16.9902, longitude: 73.2848, name: 'Mirkarwada Harbor, Ratnagiri' });
    } else if (qLower.includes('veraval')) {
      activeLat = 20.9077; activeLon = 70.3679;
      handleUpdateLocation({ latitude: 20.9077, longitude: 70.3679, name: 'Veraval Harbor, Gujarat' });
    } else if (qLower.includes('kochi') || qLower.includes('cochin')) {
      activeLat = 9.9312; activeLon = 76.2673;
      handleUpdateLocation({ latitude: 9.9312, longitude: 76.2673, name: 'Kochi Thoppumpady Harbor' });
    } else if (qLower.includes('chennai') || qLower.includes('kasimedu')) {
      activeLat = 13.1250; activeLon = 80.2980;
      handleUpdateLocation({ latitude: 13.1250, longitude: 80.2980, name: 'Kasimedu Harbor, Chennai' });
    } else if (qLower.includes('rameswaram')) {
      activeLat = 9.2876; activeLon = 79.3129;
      handleUpdateLocation({ latitude: 9.2876, longitude: 79.3129, name: 'Rameswaram Jetty' });
    } else if (qLower.includes('porbandar')) {
      activeLat = 21.6417; activeLon = 69.6093;
      handleUpdateLocation({ latitude: 21.6417, longitude: 69.6093, name: 'Porbandar Port' });
    }

    try {
      const response = await sendChatQuery(
        query,
        currentChatResponse?.conversation_id,
        { latitude: activeLat, longitude: activeLon },
        selectedLanguage
      );
      setCurrentChatResponse(response);
      if (response.map_focus) setMapFocus(response.map_focus);
      if (response.pfz_zones?.length > 0) setPfzZones(response.pfz_zones);
      if (response.routes?.length > 0) setRoutesData(prev => ({ ...prev, routes: response.routes }));
      return response;
    } finally {
      setIsLoadingChat(false);
    }
  };

  const handleFocusZoneFromChat = (zone: PFZZone) => {
    setFocusedZone(zone);
    setMapFocus({ latitude: zone.latitude, longitude: zone.longitude, zoom: 12 });
    setActiveTab('spots');
  };

  // ── Quick message from Home tab ───────────────────────────────────────────
  const handleQuickMessage = async (msg: string) => {
    setActiveTab('ask');
    // Small delay to let tab transition happen
    setTimeout(() => handleSendMessage(msg), 100);
  };

  // ── Show AuthLanding if not logged in ─────────────────────────────────────
  if (!currentUser) {
    return (
      <AuthLanding
        onLogin={handleLogin}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />
    );
  }

  // ── Map element (shared across tabs) ─────────────────────────────────────
  const mapElement = (
    <MarineMap
      vesselLocation={vesselLocation}
      pfzZones={pfzZones}
      routes={routesData.routes}
      geofences={geofences}
      geofenceStatus={currentChatResponse?.geofence_status}
      mapFocus={focusedZone ? { latitude: focusedZone.latitude, longitude: focusedZone.longitude, zoom: 13 } : mapFocus}
      activeLayers={currentChatResponse?.active_layers}
      onSelectZone={(zone) => { setFocusedZone(zone); }}
      onUpdateLocation={handleUpdateLocation}
      onOpenLocationModal={() => setIsLocationModalOpen(true)}
      selectedLanguage={selectedLanguage}
    />
  );

  return (
    <div className="flex flex-col h-[100dvh] min-h-[100dvh] bg-slate-50 overflow-hidden">
      {/* ── Offline-first maritime banner for deep-sea fishing ─────────── */}
      <OfflineBanner isOffline={!isOnline} isCachedData={dataStatus === 'CACHED'} language={selectedLanguage} />

      {/* ── Main content area (scrollable) ─────────────────────────────── */}
      <main className={`flex-1 overflow-y-auto ${activeTab === 'ask' ? 'pb-16 flex flex-col min-h-0' : 'pb-24 sm:pb-20'}`}>
        <ErrorBoundary>
          {/* HOME TAB */}
          {activeTab === 'home' && (
            <HomeTab
              weather={weather}
              pfzZones={pfzZones}
              alerts={alerts}
              riskScore={riskScore}
              riskLevel={riskLevel}
              vesselLocation={vesselLocation}
              language={selectedLanguage}
              dataStatus={dataStatus}
              lastUpdated={lastUpdated}
              onNavigate={setActiveTab}
              onSendQuickMessage={handleQuickMessage}
              onRefresh={() => loadData()}
              onOpenLocationModal={() => setIsLocationModalOpen(true)}
              onDetectGPS={handleDetectGPS}
              activeAdvisory={activeAdvisory}
            />
          )}

          {/* SPOTS TAB */}
          {activeTab === 'spots' && (
            <SpotsTab
              zones={pfzZones}
              vesselLocation={vesselLocation}
              language={selectedLanguage}
              mapElement={mapElement}
              onViewZoneOnMap={(zone) => {
                setFocusedZone(zone);
                setMapFocus({ latitude: zone.latitude, longitude: zone.longitude, zoom: 13 });
              }}
              onPlanRoute={(zone) => {
                setFocusedZone(zone);
                setActiveTab('trip');
              }}
            />
          )}

          {/* TRIP TAB */}
          {activeTab === 'trip' && (
            <TripTab
              zones={pfzZones}
              vesselLocation={vesselLocation}
              weather={weather}
              routes={routesData.routes}
              language={selectedLanguage}
              selectedZone={focusedZone}
              mapElement={mapElement}
              onPlanRoute={async (zone) => {
                setFocusedZone(zone);
                await handleSendMessage(`Plan a safe route to ${zone.name}`);
              }}
            />
          )}

          {/* ASK TAB (AI Copilot + Map) */}
          {activeTab === 'ask' && (
            <div className="flex flex-col flex-1 min-h-0 h-full">
              <AICopilot
                onSendMessage={handleSendMessage}
                currentResponse={currentChatResponse}
                isLoading={isLoadingChat}
                vesselLocation={vesselLocation}
                onFocusMapZone={handleFocusZoneFromChat}
                selectedLanguage={selectedLanguage}
                onOpenLocationModal={() => setIsLocationModalOpen(true)}
              />
            </div>
          )}

          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <ProfileTab
              user={currentUser}
              language={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
              onLogout={handleLogout}
              onOpenNotice={() => setIsNoticeOpen(true)}
            />
          )}
        </ErrorBoundary>
      </main>

      {/* ── Bottom Navigation ─────────────────────────────────────────────── */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={(tab) => { setActiveTab(tab as TabId); setFocusedZone(null); }}
        language={selectedLanguage}
      />

      {/* ── Modals ────────────────────────────────────────────────────────── */}
      <NoticeModal
        isOpen={isNoticeOpen}
        onClose={() => setIsNoticeOpen(false)}
        selectedLanguage={selectedLanguage}
      />
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        currentLocation={vesselLocation}
        onUpdateLocation={handleUpdateLocation}
        selectedLanguage={selectedLanguage}
      />
    </div>
  );
}

export default App;