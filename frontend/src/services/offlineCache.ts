// frontend/src/services/offlineCache.ts
// Offline-first data persistence and network state management for fishermen at sea.
import { useState, useEffect } from 'react';
import type { WeatherData, PFZZone, MarineAdvisory, RouteRecommendation, GeofenceZone } from '../types/marine';

const CACHE_KEY = 'marinemind_offline_bundle_v1';

export interface OfflineBundle {
  timestamp: string;
  weather: WeatherData;
  pfzZones: PFZZone[];
  alerts: MarineAdvisory[];
  routesData: RouteRecommendation;
  geofences: GeofenceZone[];
  vesselLocation: { latitude: number; longitude: number; name?: string; heading_deg?: number };
}

/**
 * Persists the latest marine intelligence into localStorage for deep-sea offline access.
 */
export function saveOfflineBundle(bundle: Omit<OfflineBundle, 'timestamp'>): void {
  try {
    const payload: OfflineBundle = {
      ...bundle,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch (err) {
    console.warn('[OfflineCache] Failed to save offline bundle to localStorage:', err);
  }
}

/**
 * Retrieves the pre-voyage cached marine dataset when out of cellular range.
 */
export function getOfflineBundle(): OfflineBundle | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as OfflineBundle;
  } catch (err) {
    console.warn('[OfflineCache] Failed to read offline bundle:', err);
    return null;
  }
}

/**
 * React hook that monitors real-time browser online/offline status.
 */
export function useNetworkStatus(): boolean {
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  });

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}
