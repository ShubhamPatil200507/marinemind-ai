// frontend/src/App.tsx
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { MarineMap } from './components/MarineMap';
import { AICopilot } from './components/AICopilot';
import { PFZView } from './components/PFZView';
import { RiskCenter } from './components/RiskCenter';
import { RouteView } from './components/RouteView';
import { GeofenceView } from './components/GeofenceView';
import { AlertCenter } from './components/AlertCenter';
import { AnalyticsView } from './components/AnalyticsView';
import { NoticeModal } from './components/NoticeModal';
import { LocationModal } from './components/LocationModal';
import { AuthLanding, type UserProfile } from './components/AuthLanding';

import {
  sendChatQuery,
  fetchCurrentWeather,
  fetchNearbyPFZ,
  fetchGeofences,
  fetchDemoRoutes,
  fetchAlerts,
  triggerDemoScenario
} from './services/api';

import type {
  WeatherData,
  PFZZone,
  GeofenceZone,
  GeofenceCheckResult,
  RouteRecommendation,
  MarineAdvisory,
  ChatResponse
} from './types/marine';
import { Play, Compass, Navigation, Layers, MessageSquare } from 'lucide-react';
import { getTranslation } from './services/i18n';

export function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('marinemind_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [activeTab, setActiveTab] = useState<string>('copilot'); // Default to AI Copilot & Map
  const [selectedLanguage, setSelectedLanguageState] = useState<string>(() => {
    try {
      return localStorage.getItem('marinemind_lang') || 'en';
    } catch {
      return 'en';
    }
  });

  const setSelectedLanguage = (lang: string) => {
    setSelectedLanguageState(lang);
    try {
      localStorage.setItem('marinemind_lang', lang);
    } catch {}
  };

  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
  const [isNoticeOpen, setIsNoticeOpen] = useState<boolean>(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState<boolean>(false);
  const [mobileCopilotView, setMobileCopilotView] = useState<'both' | 'copilot' | 'map'>('both');

  const handleLogin = (user: UserProfile) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('marinemind_user', JSON.stringify(user));
    } catch {}
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('marinemind_user');
    } catch {}
  };

  const t = getTranslation(selectedLanguage);

  // Marine State
  const [vesselLocation, setVesselLocation] = useState({
    latitude: 18.922,
    longitude: 72.8347,
    name: 'Mumbai Sassoon Docks',
    heading_deg: 245
  });

  const [weather, setWeather] = useState<WeatherData>({
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
  });

  const [pfzZones, setPfzZones] = useState<PFZZone[]>([]);
  const [geofences, setGeofences] = useState<GeofenceZone[]>([]);
  const [routesData, setRoutesData] = useState<RouteRecommendation>({
    source: {},
    destination: {},
    routes: [],
    recommended_route_id: '',
    explanation: ''
  });
  const [alerts, setAlerts] = useState<MarineAdvisory[]>([]);
  const [currentChatResponse, setCurrentChatResponse] = useState<ChatResponse | null>(null);
  const [isLoadingChat, setIsLoadingChat] = useState<boolean>(false);
  const [mapFocus, setMapFocus] = useState<{ latitude: number; longitude: number; zoom: number }>({
    latitude: 18.922,
    longitude: 72.8347,
    zoom: 11
  });

  // Load Initial Marine Datasets
  useEffect(() => {
    async function loadData() {
      try {
        const [w, pfz, geo, r, alt] = await Promise.all([
          fetchCurrentWeather(vesselLocation.latitude, vesselLocation.longitude),
          fetchNearbyPFZ(vesselLocation.latitude, vesselLocation.longitude),
          fetchGeofences(),
          fetchDemoRoutes(),
          fetchAlerts()
        ]);
        setWeather(w);
        setPfzZones(pfz);
        setGeofences(geo);
        setRoutesData(r);
        setAlerts(alt);
      } catch (err) {
        console.error('Failed to load initial marine data', err);
      }
    }
    loadData();
  }, []);

  // Update Vessel Location Handler
  const handleUpdateLocation = async (loc: { latitude: number; longitude: number; name?: string; heading_deg?: number }) => {
    const newLoc = {
      latitude: loc.latitude,
      longitude: loc.longitude,
      name: loc.name || `Sector (${loc.latitude.toFixed(2)}°N, ${loc.longitude.toFixed(2)}°E)`,
      heading_deg: loc.heading_deg || 245
    };
    setVesselLocation(newLoc);
    setMapFocus({ latitude: loc.latitude, longitude: loc.longitude, zoom: 11 });

    // Immediately fetch localized PFZ and weather for new sector
    try {
      const [newPfz, newWeather] = await Promise.all([
        fetchNearbyPFZ(loc.latitude, loc.longitude),
        fetchCurrentWeather(loc.latitude, loc.longitude)
      ]);
      if (newPfz && newPfz.length > 0) setPfzZones(newPfz);
      if (newWeather) setWeather(newWeather);
    } catch (err) {
      console.warn('Error refreshing location data', err);
    }
  };

  // Send Chat Query handler
  const handleSendMessage = async (query: string): Promise<ChatResponse> => {
    setIsLoadingChat(true);

    // Natural-language coordinate / harbor detection
    let activeLat = vesselLocation.latitude;
    let activeLon = vesselLocation.longitude;
    const coordMatch = query.match(/(-?\d{1,2}\.\d+)[,\s]+(-?\d{1,3}\.\d+)/);
    const qLower = query.toLowerCase();

    if (coordMatch) {
      const parsedLat = parseFloat(coordMatch[1]);
      const parsedLon = parseFloat(coordMatch[2]);
      if (parsedLat >= -90 && parsedLat <= 90 && parsedLon >= -180 && parsedLon <= 180) {
        activeLat = parsedLat;
        activeLon = parsedLon;
        handleUpdateLocation({
          latitude: parsedLat,
          longitude: parsedLon,
          name: `Custom Waypoint (${parsedLat.toFixed(2)}°N, ${parsedLon.toFixed(2)}°E)`
        });
      }
    } else if (qLower.includes('ratnagiri')) {
      activeLat = 16.9902;
      activeLon = 73.2848;
      handleUpdateLocation({ latitude: 16.9902, longitude: 73.2848, name: 'Mirkarwada Harbor, Ratnagiri' });
    } else if (qLower.includes('veraval')) {
      activeLat = 20.9077;
      activeLon = 70.3679;
      handleUpdateLocation({ latitude: 20.9077, longitude: 70.3679, name: 'Veraval Fishing Harbor, Gujarat' });
    } else if (qLower.includes('kochi') || qLower.includes('cochin')) {
      activeLat = 9.9312;
      activeLon = 76.2673;
      handleUpdateLocation({ latitude: 9.9312, longitude: 76.2673, name: 'Kochi Thoppumpady Harbor, Kerala' });
    } else if (qLower.includes('chennai') || qLower.includes('kasimedu')) {
      activeLat = 13.1250;
      activeLon = 80.2980;
      handleUpdateLocation({ latitude: 13.1250, longitude: 80.2980, name: 'Kasimedu Harbor, Chennai' });
    } else if (qLower.includes('rameswaram')) {
      activeLat = 9.2876;
      activeLon = 79.3129;
      handleUpdateLocation({ latitude: 9.2876, longitude: 79.3129, name: 'Rameswaram Jetty, Tamil Nadu' });
    } else if (qLower.includes('porbandar')) {
      activeLat = 21.6417;
      activeLon = 69.6093;
      handleUpdateLocation({ latitude: 21.6417, longitude: 69.6093, name: 'Porbandar Port, Gujarat' });
    } else if (qLower.includes('visakhapatnam') || qLower.includes('vizag')) {
      activeLat = 17.6868;
      activeLon = 83.2185;
      handleUpdateLocation({ latitude: 17.6868, longitude: 83.2185, name: 'Visakhapatnam Harbor, Andhra Pradesh' });
    }

    try {
      const response = await sendChatQuery(
        query,
        currentChatResponse?.conversation_id,
        { latitude: activeLat, longitude: activeLon },
        selectedLanguage
      );

      setCurrentChatResponse(response);

      // Update map focus and layers from agent response
      if (response.map_focus) {
        setMapFocus(response.map_focus);
      }
      if (response.pfz_zones && response.pfz_zones.length > 0) {
        setPfzZones(response.pfz_zones);
      }
      if (response.routes && response.routes.length > 0) {
        setRoutesData((prev) => ({
          ...prev,
          routes: response.routes,
          recommended_route_id: response.routes.find((r) => r.is_recommended)?.id || ''
        }));
      }

      return response;
    } finally {
      setIsLoadingChat(false);
    }
  };

  // Trigger Operational Demo Scenario
  const handleTriggerScenario = async (scenarioId: string) => {
    setIsLoadingChat(true);
    setActiveTab('copilot'); // Switch directly to Copilot & Map view

    try {
      const data = await triggerDemoScenario(scenarioId, selectedLanguage);
      const res: ChatResponse = data.execution_result;
      setCurrentChatResponse(res);

      if (scenarioId === 'scenario_4_geofence') {
        // Update vessel position to Kutch / IMBL area
        const borderLoc = { latitude: 22.85, longitude: 68.49, name: 'Kutch Sector (Near Border)', heading_deg: 245 };
        setVesselLocation(borderLoc);
        setMapFocus({ latitude: 22.85, longitude: 68.49, zoom: 9 });
      } else {
        if (res.map_focus) setMapFocus(res.map_focus);
      }

      if (res.pfz_zones && res.pfz_zones.length > 0) setPfzZones(res.pfz_zones);
      if (res.routes && res.routes.length > 0) {
        setRoutesData((prev) => ({
          ...prev,
          routes: res.routes,
          recommended_route_id: res.routes.find((r) => r.is_recommended)?.id || ''
        }));
      }
    } catch (err) {
      console.warn('API error triggering scenario, executing simulated flow', err);
      const scenarioQueries: Record<string, string> = {
        scenario_1_safety: selectedLanguage === 'hi' ? 'क्या कल सुबह मछली पकड़ने जाना सुरक्षित है?' :
                           selectedLanguage === 'mr' ? 'उद्या सकाळी मासेमारीला जाणे सुरक्षित आहे का?' :
                           selectedLanguage === 'ta' ? 'நாளை காலை கடலுக்கு மீன்பிடிக்கச் செல்வது பாதுகாப்பானதா?' :
                           'Is it safe to go fishing tomorrow morning?',
        scenario_2_pfz: selectedLanguage === 'hi' ? 'आज सबसे नजदीकी मत्स्य क्षेत्र (PFZ) कहाँ है?' :
                        selectedLanguage === 'mr' ? 'आज सर्वात जवळचे संभाव्य मासेमारी क्षेत्र कुठे आहे?' :
                        selectedLanguage === 'ta' ? 'இன்று அருகில் உள்ள மீன்பிடி மண்டலம் எங்குள்ளது?' :
                        'Where is the nearest Potential Fishing Zone today?',
        scenario_3_route: selectedLanguage === 'hi' ? 'PFZ Alpha तक जाने का सबसे सुरक्षित मार्ग क्या है?' :
                          selectedLanguage === 'mr' ? 'PFZ Alpha कडे जाण्यासाठी सर्वात सुरक्षित मार्ग कोणता?' :
                          selectedLanguage === 'ta' ? 'PFZ Alpha செல்வதற்கான பாதுகாப்பான பாதை எது?' :
                          'What is the safest route to PFZ Alpha?',
        scenario_4_geofence: selectedLanguage === 'hi' ? 'क्या मैं किसी प्रतिबंधित या अंतरराष्ट्रीय सीमा के करीब हूँ?' :
                             selectedLanguage === 'mr' ? 'मी कोणत्याही प्रतिबंधित किंवा आंतरराष्ट्रीय सीमेच्या जवळ जात आहे का?' :
                             selectedLanguage === 'ta' ? 'நான் ஏதேனும் தடைசெய்யப்பட்ட அல்லது சர்வதேச கடல் எல்லைக்கு அருகில் செல்கிறேனா?' :
                             'Am I approaching a restricted or international maritime boundary?'
      };
      await handleSendMessage(scenarioQueries[scenarioId] || 'Is it safe to go fishing tomorrow morning?');
    } finally {
      setIsLoadingChat(false);
    }
  };

  const handleSelectZone = (zone: PFZZone) => {
    setMapFocus({ latitude: zone.latitude, longitude: zone.longitude, zoom: 12 });
  };

  const handleFocusZoneFromChat = (zone: PFZZone) => {
    setMapFocus({ latitude: zone.latitude, longitude: zone.longitude, zoom: 12 });
    if (typeof window !== 'undefined' && window.innerWidth < 1024 && mobileCopilotView === 'copilot') {
      setMobileCopilotView('map');
    }
  };

  const handlePlotRoute = (zone: PFZZone) => {
    setActiveTab('routes');
  };

  // If not authenticated, display the dedicated Multilingual Landing & Auth Page
  if (!currentUser) {
    return (
      <AuthLanding
        onLogin={handleLogin}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden w-full min-w-0">
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        isDemoMode={isDemoMode}
        setIsDemoMode={setIsDemoMode}
        onOpenNotice={() => setIsNoticeOpen(true)}
        vesselLocation={vesselLocation}
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Quick Evaluation Scenario Action Bar (Responsive on Phone & Desktop) */}
      <div className="bg-white border-b border-slate-200 sticky top-14 z-[90] shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center justify-between gap-2 text-xs text-slate-500 shrink-0 leading-none">
            <span className="font-bold text-[11px] uppercase tracking-wider text-slate-700 font-mono leading-none">
              {t.scenarios.label}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto py-0.5 scroll-smooth">
            <button
              onClick={() => handleTriggerScenario('scenario_1_safety')}
              className="h-7 px-2 sm:px-2.5 rounded-md bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 text-xs font-medium transition-colors whitespace-nowrap inline-flex items-center gap-1.5 leading-none shrink-0"
            >
              <Play className="w-3 h-3 fill-current text-blue-600 shrink-0" />
              <span className="leading-none">{t.scenarios.s1}</span>
            </button>

            <button
              onClick={() => handleTriggerScenario('scenario_2_pfz')}
              className="h-7 px-2 sm:px-2.5 rounded-md bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 text-xs font-medium transition-colors whitespace-nowrap inline-flex items-center gap-1.5 leading-none shrink-0"
            >
              <Play className="w-3 h-3 fill-current text-emerald-600 shrink-0" />
              <span className="leading-none">{t.scenarios.s2}</span>
            </button>

            <button
              onClick={() => handleTriggerScenario('scenario_3_route')}
              className="h-7 px-2 sm:px-2.5 rounded-md bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200 text-xs font-medium transition-colors whitespace-nowrap inline-flex items-center gap-1.5 leading-none shrink-0"
            >
              <Play className="w-3 h-3 fill-current text-indigo-600 shrink-0" />
              <span className="leading-none">{t.scenarios.s3}</span>
            </button>

            <button
              onClick={() => handleTriggerScenario('scenario_4_geofence')}
              className="h-7 px-2 sm:px-2.5 rounded-md bg-slate-50 hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-200 text-xs font-medium transition-colors whitespace-nowrap inline-flex items-center gap-1.5 leading-none shrink-0"
            >
              <Play className="w-3 h-3 fill-current text-rose-600 shrink-0" />
              <span className="leading-none">{t.scenarios.s4}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {/* Tab 1: AI Copilot & Interactive Geospatial Map (Dynamic for Phone & Desktop) */}
        {activeTab === 'copilot' && (
          <div className="space-y-3">
            {/* Mobile View Switcher (Visible on Phone/Tablet < lg, hidden on desktop >= lg) */}
            <div className="lg:hidden flex items-center bg-white p-1 rounded-lg border border-slate-200 shadow-2xs">
              <button
                type="button"
                onClick={() => setMobileCopilotView('copilot')}
                className={`flex-1 py-1.5 px-2 rounded-md text-xs font-medium inline-flex items-center justify-center gap-1.5 transition-all ${
                  mobileCopilotView === 'copilot'
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{t.map.mobile_copilot}</span>
              </button>

              <button
                type="button"
                onClick={() => setMobileCopilotView('map')}
                className={`flex-1 py-1.5 px-2 rounded-md text-xs font-medium inline-flex items-center justify-center gap-1.5 transition-all ${
                  mobileCopilotView === 'map'
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>{t.map.mobile_map}</span>
              </button>

              <button
                type="button"
                onClick={() => setMobileCopilotView('both')}
                className={`flex-1 py-1.5 px-2 rounded-md text-xs font-medium inline-flex items-center justify-center gap-1.5 transition-all ${
                  mobileCopilotView === 'both'
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{t.map.mobile_both}</span>
              </button>
            </div>

            {/* Grid Container (Desktop: side-by-side; Mobile: responsive height) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 lg:h-[calc(100vh-175px)] lg:min-h-[550px] min-h-0">
              {/* Left Col: Conversational Copilot & Execution Visualizer */}
              <div
                className={`lg:col-span-5 flex flex-col min-h-0 ${
                  mobileCopilotView === 'map' ? 'hidden lg:flex' : 'flex'
                } ${
                  mobileCopilotView === 'copilot'
                    ? 'h-[calc(100vh-230px)] min-h-[460px]'
                    : mobileCopilotView === 'both'
                    ? 'h-[460px] lg:h-full'
                    : 'h-full'
                }`}
              >
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

              {/* Right Col: Interactive Marine Geospatial Map */}
              <div
                className={`lg:col-span-7 flex flex-col min-h-0 ${
                  mobileCopilotView === 'copilot' ? 'hidden lg:flex' : 'flex'
                } ${
                  mobileCopilotView === 'map'
                    ? 'h-[calc(100vh-230px)] min-h-[460px]'
                    : mobileCopilotView === 'both'
                    ? 'h-[440px] lg:h-full'
                    : 'h-full'
                }`}
              >
                <MarineMap
                  vesselLocation={vesselLocation}
                  pfzZones={pfzZones}
                  routes={routesData.routes}
                  geofences={geofences}
                  geofenceStatus={currentChatResponse?.geofence_status}
                  mapFocus={mapFocus}
                  activeLayers={currentChatResponse?.active_layers}
                  onSelectZone={handleSelectZone}
                  onUpdateLocation={handleUpdateLocation}
                  onOpenLocationModal={() => setIsLocationModalOpen(true)}
                  selectedLanguage={selectedLanguage}
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Dashboard */}
        {activeTab === 'dashboard' && (
          <Dashboard
            weather={weather}
            pfzZones={pfzZones}
            alerts={alerts}
            onTriggerScenario={handleTriggerScenario}
            onNavigateTab={setActiveTab}
            selectedLanguage={selectedLanguage}
          />
        )}

        {/* Tab 3: Potential Fishing Zones (PFZ) */}
        {activeTab === 'pfz' && (
          <PFZView
            zones={pfzZones}
            vesselLocation={vesselLocation}
            selectedLanguage={selectedLanguage}
            onPlotRoute={(zone) => {
              setActiveTab('copilot');
              setMapFocus({ latitude: zone.latitude, longitude: zone.longitude, zoom: 12 });
            }}
          />
        )}

        {/* Tab 4: Safety & Marine Risk Center */}
        {activeTab === 'risk' && (
          <RiskCenter weather={weather} selectedLanguage={selectedLanguage} />
        )}

        {/* Tab 5: Safe Route Planning & Comparison */}
        {activeTab === 'routes' && (
          <RouteView
            routeData={routesData}
            selectedLanguage={selectedLanguage}
            onSelectRouteOnMap={(r) => {
              setActiveTab('copilot');
              if (r.waypoints.length > 0) {
                setMapFocus({ latitude: r.waypoints[0][0], longitude: r.waypoints[0][1], zoom: 11 });
              }
            }}
          />
        )}

        {/* Tab 6: Geofencing & Boundary Guardian */}
        {activeTab === 'geofence' && (
          <GeofenceView
            geofences={geofences}
            selectedLanguage={selectedLanguage}
            currentStatus={
              currentChatResponse?.geofence_status || {
                is_inside: false,
                is_approaching: false,
                nearest_zone_name: 'IMBL',
                nearest_zone_category: 'International Boundary',
                distance_to_boundary_km: 18.5,
                alert_level: 'SAFE',
                warning_message: 'Safe operating waters.',
                recommended_action: 'Maintain standard watch.'
              }
            }
          />
        )}

        {/* Tab 7: Marine Alert Center */}
        {activeTab === 'alerts' && (
          <AlertCenter alerts={alerts} selectedLanguage={selectedLanguage} />
        )}

        {/* Tab 8: Oceanographic Observation Analytics */}
        {activeTab === 'analytics' && (
          <AnalyticsView selectedLanguage={selectedLanguage} />
        )}
      </main>

      {/* Footer / Status Telemetry Bar */}
      <footer className="bg-white border-t border-slate-200 text-xs text-slate-500 py-2.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs">
          <div className="flex flex-wrap items-center gap-2.5 leading-none">
            <span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold bg-emerald-50 px-2 py-1 rounded border border-emerald-200 leading-none">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
              {t.footer.agents_online}
            </span>
            <span className="text-slate-300">•</span>
            <span className="leading-none text-slate-600">
              {t.footer.position}: <strong className="text-slate-900 font-mono">{vesselLocation.latitude.toFixed(4)}°N, {vesselLocation.longitude.toFixed(4)}°E</strong>
            </span>
            <span className="text-slate-300">•</span>
            <span className="leading-none text-slate-600">
              <strong className="text-slate-900">{isDemoMode ? t.footer.mode : `${t.common.telemetry}: ${t.common.live} ${t.common.satellite_stream}`}</strong>
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-500 leading-none">
            <span className="leading-none">{t.footer.prototype_edition}</span>
            <span className="text-slate-300">•</span>
            <button
              onClick={() => setIsNoticeOpen(true)}
              className="text-blue-600 hover:text-blue-800 underline transition-colors leading-none"
            >
              {t.footer.statutory_notice}
            </button>
          </div>
        </div>
      </footer>

      {/* Statutory Safety Notice Modal */}
      <NoticeModal isOpen={isNoticeOpen} onClose={() => setIsNoticeOpen(false)} selectedLanguage={selectedLanguage} />

      {/* Vessel Location & Sector Modal */}
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