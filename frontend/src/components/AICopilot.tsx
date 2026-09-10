// frontend/src/components/AICopilot.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  Send, Mic, MicOff, MapPin, ArrowRight, CornerDownLeft,
  ShieldAlert, Clock, CheckCircle2, ChevronRight, Anchor, Navigation, FileText
} from 'lucide-react';
import type { ChatResponse, PFZZone } from '../types/marine';
import { AgentExecutionPanel } from './AgentExecutionPanel';
import { getTranslation } from '../services/i18n';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  responsePayload?: ChatResponse;
  timestamp: string;
}

interface AICopilotProps {
  onSendMessage: (query: string) => Promise<ChatResponse>;
  currentResponse?: ChatResponse | null;
  isLoading: boolean;
  onFocusMapZone?: (zone: PFZZone) => void;
  vesselLocation: { latitude: number; longitude: number; name?: string };
  selectedLanguage?: string;
  onOpenLocationModal?: () => void;
}

export const AICopilot: React.FC<AICopilotProps> = ({
  onSendMessage,
  currentResponse,
  isLoading,
  onFocusMapZone,
  vesselLocation,
  selectedLanguage = 'en',
  onOpenLocationModal
}) => {
  const t = getTranslation(selectedLanguage);
  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: t.copilot.welcome,
      timestamp: '06:00 IST'
    }
  ]);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = true;
        rec.maxAlternatives = 1;

        if (selectedLanguage === 'hi') rec.lang = 'hi-IN';
        else if (selectedLanguage === 'mr') rec.lang = 'mr-IN';
        else if (selectedLanguage === 'ta') rec.lang = 'ta-IN';
        else rec.lang = 'en-IN';

        rec.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0].transcript)
            .join('');
          setInputQuery(transcript);
        };

        rec.onerror = (event: any) => {
          console.warn('Speech recognition error:', event.error);
          setIsVoiceActive(false);
        };

        rec.onend = () => {
          setIsVoiceActive(false);
        };

        recognitionRef.current = rec;
      } catch (e) {
        console.warn('Speech recognition init error:', e);
      }
    }
  }, [selectedLanguage]);

  const toggleVoice = () => {
    if (!recognitionRef.current) {
      const msg = selectedLanguage === 'ta' ? 'உங்கள் உலாவியில் குரல் அறிதல் ஆதரிக்கப்படவில்லை' :
                  selectedLanguage === 'hi' ? 'आपके ब्राउज़र में वॉयस रिकग्निशन समर्थित नहीं है' :
                  selectedLanguage === 'mr' ? 'आपल्या ब्राउझरमध्ये व्हॉइस ओळख समर्थित नाही' :
                  'Web Speech API is not supported in this browser. Please use Google Chrome or Microsoft Edge.';
      alert(msg);
      return;
    }

    if (isVoiceActive) {
      try { recognitionRef.current.stop(); } catch (_) {}
      setIsVoiceActive(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsVoiceActive(true);
      } catch (err) {
        console.warn('Could not start speech recognition:', err);
        setIsVoiceActive(false);
      }
    }
  };

  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 1 && prev[0].id === 'welcome') {
        return [{
          id: 'welcome',
          sender: 'assistant',
          text: t.copilot.welcome,
          timestamp: '06:00 IST'
        }];
      }
      return prev;
    });
  }, [selectedLanguage, t.copilot.welcome]);

  const suggestedQuestions = t.copilot.inquiries;

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');

    try {
      const response = await onSendMessage(textToSend);
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: response.answer,
        responsePayload: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const errMsg: Message = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: t.copilot.service_unavailable,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errMsg]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden relative isolate z-0 min-h-0">
      {/* Header Bar */}
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div>
          <div className="font-bold text-xs text-slate-900 flex items-center gap-2 leading-none">
            <span className="leading-none">{t.copilot.title}</span>
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 leading-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
              <span>{t.copilot.online_status}</span>
            </span>
          </div>
          <button
            type="button"
            onClick={onOpenLocationModal}
            title={t.copilot.change_location_tooltip}
            className="text-[11px] font-mono text-slate-600 hover:text-blue-700 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-md px-2 py-1 flex items-center gap-1.5 mt-1.5 transition-all cursor-pointer group shadow-2xs text-left max-w-full"
          >
            <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0 group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-slate-800 truncate">{vesselLocation.name ? vesselLocation.name.split('(')[0].trim() : t.copilot.current_sector}:</span>
            <span className="text-slate-600 hidden sm:inline">{vesselLocation.latitude.toFixed(2)}°N, {vesselLocation.longitude.toFixed(2)}°E</span>
            <span className="text-[10px] text-blue-600 font-sans font-semibold underline group-hover:no-underline ml-0.5 shrink-0">{t.common.change}</span>
          </button>
        </div>

        <div className="text-right font-mono text-[10px] text-slate-400 flex items-center gap-1.5">
          {currentResponse?.conversation_id && (
            <button
              type="button"
              onClick={() => window.open(`/api/reports/voyage/${currentResponse.conversation_id}`, '_blank')}
              title="View Official Voyage Clearance Manifest"
              className="inline-flex items-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-700 px-2 py-1 rounded border border-blue-200 text-[10px] font-semibold transition-colors cursor-pointer"
            >
              <FileText className="w-3 h-3" />
              <span>Manifest</span>
            </button>
          )}
          <span className="inline-flex items-center gap-1 bg-slate-100 px-2 py-1 rounded border border-slate-200 text-slate-600">
            AIS Active
          </span>
        </div>
      </div>

      {/* Message Stream */}
      <div ref={chatContainerRef} className="flex-1 min-h-0 p-4 overflow-y-auto space-y-4 text-xs bg-slate-50/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[94%] rounded-xl p-3.5 shadow-xs ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
              }`}
            >
              <div className={`flex items-center justify-between gap-2 mb-1.5 pb-1 border-b text-[10px] font-mono ${
                msg.sender === 'user' ? 'border-blue-500/60 text-blue-100' : 'border-slate-100 text-slate-400'
              }`}>
                <span>{msg.sender === 'user' ? t.copilot.operator : 'MarineMind AI'}</span>
                <span>{msg.timestamp}</span>
              </div>

              {/* Message text with clear formatting */}
              <div className="whitespace-pre-line text-xs leading-relaxed font-normal">
                {msg.text}
              </div>

              {/* Structured Recommendation Block (Curated visual card) */}
              {msg.responsePayload && (
                <div className="mt-3 pt-3 border-t border-slate-100 space-y-2.5">
                  {/* Verdict Banner */}
                  <div className={`p-2.5 rounded-lg border text-xs ${
                    msg.responsePayload.risk_level === 'CRITICAL' || msg.responsePayload.risk_level === 'HIGH'
                      ? 'bg-rose-50 border-rose-200 text-rose-800'
                      : msg.responsePayload.risk_level === 'MODERATE'
                      ? 'bg-amber-50 border-amber-200 text-amber-800'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  }`}>
                    <div className="font-bold text-[11px] uppercase tracking-wide">
                      {msg.responsePayload.action_recommendation}
                    </div>
                    <div className="text-[10px] font-mono mt-0.5">
                      {t.copilot.risk_index}: {msg.responsePayload.risk_score}/100 ({msg.responsePayload.risk_level}) | {t.copilot.confidence}: {Math.round(msg.responsePayload.confidence * 100)}%
                    </div>
                  </div>

                  {/* Concise Rationale Bullets */}
                  {msg.responsePayload.explainability?.why_bullets?.length > 0 && (
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-[11px]">
                      <div className="font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-blue-600" />
                        <span>{t.copilot.key_factors}</span>
                      </div>
                      <ul className="space-y-1 text-slate-600">
                        {msg.responsePayload.explainability.why_bullets.slice(0, 3).map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 leading-snug">
                            <span className="text-blue-600 font-bold">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Visual Agent Execution Stepper */}
                  <AgentExecutionPanel
                    plan={msg.responsePayload.execution_plan}
                    agentStatuses={msg.responsePayload.agent_statuses}
                    evidence={msg.responsePayload.evidence}
                    confidence={msg.responsePayload.confidence}
                    selectedLanguage={selectedLanguage}
                  />

                  {/* Quick Action Shortcuts */}
                  {msg.responsePayload.pfz_zones && msg.responsePayload.pfz_zones.length > 0 && (
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => onFocusMapZone?.(msg.responsePayload!.pfz_zones[0])}
                        className="px-2.5 py-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-[11px] font-semibold flex items-center gap-1 transition-colors"
                      >
                        <Anchor className="w-3 h-3" />
                        <span>{t.copilot.focus_map}</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="bg-white border border-slate-200 rounded-xl p-3 text-xs flex items-center gap-2 text-slate-600 shadow-xs">
            <div className="w-3.5 h-3.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span>{t.copilot.assessing}</span>
          </div>
        )}

        <div />
      </div>

      {/* Suggested Inquiries (Prototype Showcase Chips) */}
      <div className="px-3.5 py-2 bg-slate-50 border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider shrink-0 leading-none">
          {t.copilot.inquiries_label}
        </span>
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            disabled={isLoading}
            className="h-7 px-2.5 rounded-md bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 transition-colors whitespace-nowrap shrink-0 inline-flex items-center gap-1 shadow-2xs text-[11px] font-medium leading-none"
          >
            <span className="leading-none">{q}</span>
            <ChevronRight className="w-3 h-3 opacity-50 shrink-0" />
          </button>
        ))}
      </div>

      {/* Input Form (All h-9 for pixel-perfect vertical alignment) */}
      <div className="p-3 bg-white border-t border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <button
            type="button"
            onClick={toggleVoice}
            title={isVoiceActive ? t.copilot.listening : t.copilot.voice_input}
            className={`h-9 w-9 rounded-lg border transition-colors inline-flex items-center justify-center shrink-0 ${
              isVoiceActive
                ? 'bg-rose-50 text-rose-700 border-rose-300'
                : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {isVoiceActive ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={onOpenLocationModal}
            title={t.copilot.set_location_tooltip}
            className="h-9 w-9 rounded-lg border bg-slate-50 text-slate-500 border-slate-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 transition-colors inline-flex items-center justify-center shrink-0 cursor-pointer"
          >
            <MapPin className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder={t.copilot.input_placeholder}
            disabled={isLoading}
            className="h-9 flex-1 min-w-0 bg-slate-50 border border-slate-300 rounded-lg px-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
          />

          <button
            type="submit"
            disabled={!inputQuery.trim() || isLoading}
            className="h-9 px-3 sm:px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors inline-flex items-center justify-center gap-1.5 leading-none shrink-0"
          >
            <span className="leading-none hidden sm:inline">{t.copilot.send_btn}</span>
            <Send className="w-3.5 h-3.5 shrink-0" />
          </button>
        </form>
      </div>
    </div>
  );
};