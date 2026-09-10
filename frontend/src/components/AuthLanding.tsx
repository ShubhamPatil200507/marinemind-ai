// frontend/src/components/AuthLanding.tsx
import React, { useState } from 'react';
import {
  Compass, Anchor, ShieldCheck, Waves, Globe, Radio,
  ArrowRight, KeyRound, User, Phone, MapPin, CheckCircle2, AlertCircle, ChevronDown, ShieldAlert
} from 'lucide-react';
import { getTranslation } from '../services/i18n';

export interface UserProfile {
  id: string;
  name: string;
  vessel_id: string;
  phone: string;
  home_port: string;
  role?: string;
  token?: string;
}

interface AuthLandingProps {
  onLogin: (user: UserProfile) => void;
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
}

export const AuthLanding: React.FC<AuthLandingProps> = ({
  onLogin,
  selectedLanguage,
  setSelectedLanguage
}) => {
  const t = getTranslation(selectedLanguage);
  const [activeTab, setActiveTab] = useState<'signin' | 'register'>('signin');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sign In Form State
  const [signInIdentifier, setSignInIdentifier] = useState('IND-MH-01-MM-8492');
  const [signInPassword, setSignInPassword] = useState('marinepassword');

  // Register Form State
  const [regName, setRegName] = useState('');
  const [regVesselId, setRegVesselId] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regHarbor, setRegHarbor] = useState('Mumbai (Sassoon Docks)');
  const [regPassword, setRegPassword] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const resp = await fetch('http://127.0.0.1:8000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: signInIdentifier.trim(),
          password: signInPassword.trim()
        })
      });

      if (resp.ok) {
        const data: UserProfile = await resp.json();
        onLogin(data);
      } else {
        const errData = await resp.json().catch(() => ({}));
        setErrorMsg(errData.detail || 'Authentication failed. Please check your credentials.');
      }
    } catch {
      setErrorMsg('Cannot connect to authentication service. Please ensure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regVesselId.trim() || !regPhone.trim() || !regPassword.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }
    setErrorMsg(null);
    setLoading(true);

    try {
      const resp = await fetch('http://127.0.0.1:8000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: regName.trim(),
          vessel_id: regVesselId.trim().toUpperCase(),
          phone: regPhone.trim(),
          home_port: regHarbor.trim(),
          password: regPassword.trim()
        })
      });

      if (resp.ok) {
        const data: UserProfile = await resp.json();
        onLogin(data);
      } else {
        const errData = await resp.json().catch(() => ({}));
        setErrorMsg(errData.detail || 'Registration failed. Please try again.');
      }
    } catch {
      setErrorMsg('Cannot connect to authentication service. Please ensure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleInstantAccess = async () => {
    setErrorMsg(null);
    setLoading(true);
    try {
      const resp = await fetch('http://127.0.0.1:8000/api/auth/guest-access', { method: 'POST' });
      if (resp.ok) {
        const data: UserProfile = await resp.json();
        onLogin(data);
      } else {
        const errData = await resp.json().catch(() => ({}));
        setErrorMsg(errData.detail || 'Quick access failed. Please use standard sign in.');
      }
    } catch {
      setErrorMsg('Cannot connect to authentication service. Please ensure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Header Bar (Unified matching main Navbar design) */}
      <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs shrink-0">
              <Compass className="w-4 h-4" />
            </div>
            <div className="leading-none">
              <span className="font-bold text-sm tracking-tight text-white block leading-tight">
                MarineMind AI
              </span>
              <span className="text-[10px] text-slate-400 font-medium hidden sm:block leading-none mt-0.5">
                {t.auth.badge_government}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Live Telemetry Indicator */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/40 border border-emerald-500/50 text-emerald-300 text-xs font-mono font-medium leading-none h-8">
              <Radio className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline leading-none">{t.auth.badge_live_satellite}</span>
            </div>

            {/* Language Selector (Matching Navbar language pill) */}
            <div className="relative h-8 inline-flex items-center bg-slate-800 hover:bg-slate-700/80 border border-slate-700 hover:border-slate-600 rounded-lg text-xs transition-colors shrink-0 group">
              <Globe className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-400 ml-2 mr-1 shrink-0 pointer-events-none transition-colors" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                aria-label="Select Language"
                className="bg-transparent text-slate-200 font-medium text-xs focus:outline-none cursor-pointer leading-none py-0 pl-0 pr-6 border-0 appearance-none h-full"
              >
                <option value="en" className="bg-slate-900 text-white">English</option>
                <option value="hi" className="bg-slate-900 text-white">हिन्दी</option>
                <option value="mr" className="bg-slate-900 text-white">मराठी</option>
                <option value="ta" className="bg-slate-900 text-white">தமிழ்</option>
              </select>
              <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-white absolute right-1.5 pointer-events-none transition-colors" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-10 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Platform Capabilities & Hero */}
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold leading-none">
              <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0"></span>
              <span>{t.auth.mopsw_badge}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
              {t.auth.welcome_title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
              {t.auth.welcome_subtitle}
            </p>

            {/* Feature Cards matching Dashboard styling */}
            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                  <Compass className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900">
                    {t.auth.feature_agents_title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed break-words">
                    {t.auth.feature_agents_desc}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                  <Waves className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900">
                    {t.auth.feature_satellite_title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed break-words">
                    {t.auth.feature_satellite_desc}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900">
                    {t.auth.feature_imbl_title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed break-words">
                    {t.auth.feature_imbl_desc}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Authentication Card matching app light theme */}
          <div className="lg:col-span-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs">
              {/* Quick Evaluator Access Banner */}
              <div className="mb-5 p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-blue-900 uppercase tracking-wider font-mono">
                    {t.auth.eval_badge}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-blue-100 text-blue-800 border border-blue-300">
                    {t.auth.one_click}
                  </span>
                </div>
                <p className="text-xs text-blue-800 leading-relaxed">
                  {t.auth.instant_access_desc}
                </p>
                <button
                  type="button"
                  onClick={handleInstantAccess}
                  disabled={loading}
                  className="w-full h-10 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{loading ? t.auth.authenticating : t.auth.instant_access_btn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="relative flex items-center justify-center my-4">
                <div className="border-t border-slate-200 w-full"></div>
                <span className="bg-white px-3 text-[11px] text-slate-400 uppercase tracking-wider font-mono shrink-0">
                  {t.auth.or_divider}
                </span>
              </div>

              {/* Tab Selector */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 mb-4">
                <button
                  type="button"
                  onClick={() => { setActiveTab('signin'); setErrorMsg(null); }}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'signin'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t.auth.sign_in_tab}
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveTab('register'); setErrorMsg(null); }}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'register'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t.auth.register_tab}
                </button>
              </div>

              {errorMsg && (
                <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">{errorMsg}</span>
                </div>
              )}

              {/* Sign In Form */}
              {activeTab === 'signin' && (
                <form onSubmit={handleSignIn} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.auth.vessel_id_label}
                    </label>
                    <div className="relative">
                      <Anchor className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={signInIdentifier}
                        onChange={(e) => setSignInIdentifier(e.target.value)}
                        placeholder={t.auth.vessel_id_placeholder}
                        className="w-full h-9 pl-9 pr-3 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.auth.password_label}
                    </label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                      <input
                        type="password"
                        required
                        value={signInPassword}
                        onChange={(e) => setSignInPassword(e.target.value)}
                        placeholder={t.auth.password_placeholder}
                        className="w-full h-9 pl-9 pr-3 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-500 font-mono bg-slate-50 p-2 rounded-lg border border-slate-200">
                    {t.auth.demo_credentials_hint}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-10 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer mt-1"
                  >
                    <span>{loading ? t.auth.authenticating : t.auth.sign_in_btn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* Register Form */}
              {activeTab === 'register' && (
                <form onSubmit={handleRegister} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.auth.name_label}
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder={t.auth.name_placeholder}
                        className="w-full h-9 pl-9 pr-3 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {t.auth.vessel_id_label}
                      </label>
                      <div className="relative">
                        <Anchor className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                        <input
                          type="text"
                          required
                          value={regVesselId}
                          onChange={(e) => setRegVesselId(e.target.value)}
                          placeholder="IND-MH-01-MM-XXXX"
                          className="w-full h-9 pl-9 pr-3 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {t.auth.phone_label}
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                        <input
                          type="tel"
                          required
                          value={regPhone}
                          onChange={(e) => setRegPhone(e.target.value)}
                          placeholder={t.auth.phone_placeholder}
                          className="w-full h-9 pl-9 pr-3 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.auth.harbor_label}
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                      <select
                        value={regHarbor}
                        onChange={(e) => setRegHarbor(e.target.value)}
                        className="w-full h-9 pl-9 pr-3 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                      >
                        <option value="Mumbai (Sassoon Docks)">Mumbai (Sassoon Docks), Maharashtra</option>
                        <option value="Mirkarwada Harbor, Ratnagiri">Mirkarwada Harbor, Ratnagiri, Maharashtra</option>
                        <option value="Veraval Fishing Harbor">Veraval Fishing Harbor, Gujarat</option>
                        <option value="Rameswaram Fishing Jetty">Rameswaram Fishing Jetty, Tamil Nadu</option>
                        <option value="Kasimedu Fishing Harbor, Chennai">Kasimedu Fishing Harbor, Chennai, Tamil Nadu</option>
                        <option value="Kochi Thoppumpady Harbor">Kochi Thoppumpady Harbor, Kerala</option>
                        <option value="Visakhapatnam Harbor">Visakhapatnam Harbor, Andhra Pradesh</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.auth.password_label}
                    </label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                      <input
                        type="password"
                        required
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder={t.auth.password_placeholder}
                        className="w-full h-9 pl-9 pr-3 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-10 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer mt-1"
                  >
                    <span>{loading ? t.auth.authenticating : t.auth.register_btn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer Bar matching platform footer */}
      <footer className="bg-white border-t border-slate-200 py-3 px-4 sm:px-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>{t.auth.footer_left}</span>
          <span>{t.auth.footer_right}</span>
        </div>
      </footer>
    </div>
  );
};
