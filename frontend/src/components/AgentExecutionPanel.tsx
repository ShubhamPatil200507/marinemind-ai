// frontend/src/components/AgentExecutionPanel.tsx
import React, { useState } from 'react';
import type { ExecutionPlan, EvidenceItem } from '../types/marine';
import {
  CheckCircle2, ChevronDown, ChevronUp, Cpu,
  Database, ShieldAlert, CloudSun,
  Compass, Anchor
} from 'lucide-react';
import { getTranslation } from '../services/i18n';

interface AgentExecutionPanelProps {
  plan?: ExecutionPlan;
  agentStatuses?: {
    agent: string;
    status: string;
    summary: string;
    badge?: string;
  }[];
  evidence?: EvidenceItem[];
  confidence?: number;
  isExecuting?: boolean;
  selectedLanguage?: string;
}

export const AgentExecutionPanel: React.FC<AgentExecutionPanelProps> = ({
  plan,
  agentStatuses = [],
  evidence = [],
  confidence = 0.88,
  isExecuting = false,
  selectedLanguage = 'en'
}) => {
  const t = getTranslation(selectedLanguage);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'agents' | 'plan' | 'evidence'>('agents');

  if (!plan && agentStatuses.length === 0 && !isExecuting) {
    return null;
  }

  const getAgentIcon = (name: string) => {
    if (name.includes('Weather')) return <CloudSun className="w-3.5 h-3.5 text-blue-600" />;
    if (name.includes('Ocean')) return <Compass className="w-3.5 h-3.5 text-cyan-600" />;
    if (name.includes('PFZ')) return <Anchor className="w-3.5 h-3.5 text-emerald-600" />;
    if (name.includes('Geospatial')) return <Database className="w-3.5 h-3.5 text-indigo-600" />;
    if (name.includes('Risk')) return <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />;
    return <Cpu className="w-3.5 h-3.5 text-slate-600" />;
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg overflow-hidden shadow-xs mt-2 text-xs">
      {/* Header Bar */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="px-3 py-2 bg-slate-100/80 border-b border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors"
      >
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-blue-100 flex items-center justify-center text-blue-700">
            <Cpu className="w-3 h-3" />
          </div>
          <div>
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <span>{t.executionPanel.title}</span>
              <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-white text-slate-700 border border-slate-300 font-semibold">
                {plan?.execution_strategy === 'parallel' ? t.executionPanel.fusion_badge : t.executionPanel.advisory_badge}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
            {Math.round(confidence * 100)}% {t.executionPanel.confidence_suffix}
          </span>
          <button className="text-slate-400 hover:text-slate-600">
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Mini Stepper (Always visible, compact) */}
      <div className="p-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-white">
        {agentStatuses.slice(0, 5).map((ag, i) => (
          <div
            key={i}
            className="flex items-center gap-1 px-2 py-1 rounded bg-slate-50 border border-slate-200 text-[11px] font-medium text-slate-700 whitespace-nowrap shrink-0"
          >
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>{ag.agent.replace('Agent', '').trim()}</span>
          </div>
        ))}
        {agentStatuses.length > 5 && (
          <span className="text-[10px] text-slate-500 font-medium px-1">
            +{agentStatuses.length - 5} {t.executionPanel.more_suffix}
          </span>
        )}
      </div>

      {/* Expanded Details Drawer */}
      {isExpanded && (
        <div className="p-3 bg-white border-t border-slate-200 space-y-2">
          {/* Tab Switcher */}
          <div className="flex gap-1 border-b border-slate-200 pb-1.5 text-[11px]">
            <button
              onClick={() => setActiveTab('agents')}
              className={`px-2 py-0.5 rounded font-medium transition-colors ${
                activeTab === 'agents' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {t.executionPanel.tab_agents} ({agentStatuses.length})
            </button>
            <button
              onClick={() => setActiveTab('plan')}
              className={`px-2 py-0.5 rounded font-medium transition-colors ${
                activeTab === 'plan' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {t.executionPanel.tab_plan} ({plan?.steps.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('evidence')}
              className={`px-2 py-0.5 rounded font-medium transition-colors ${
                activeTab === 'evidence' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {t.executionPanel.tab_evidence} ({evidence.length})
            </button>
          </div>

          {/* Tab Content: Agents */}
          {activeTab === 'agents' && (
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {agentStatuses.map((item, idx) => (
                <div key={idx} className="p-2 rounded bg-slate-50 border border-slate-200 flex items-start gap-2">
                  <div className="mt-0.5">{getAgentIcon(item.agent)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-bold text-slate-800 text-[11px]">{item.agent}</span>
                      <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1 rounded border border-emerald-200">
                        {item.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 truncate mt-0.5">{item.summary}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab Content: Plan */}
          {activeTab === 'plan' && plan && (
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              <div className="text-[11px] font-mono text-slate-500">
                {t.executionPanel.intent_identified} <strong className="text-slate-800">{plan.intent}</strong>
              </div>
              {plan.steps.map((step, idx) => (
                <div key={idx} className="p-2 rounded bg-slate-50 border border-slate-200 flex items-start gap-2 text-[11px]">
                  <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0">
                    {step.step_number}
                  </span>
                  <div>
                    <div className="font-semibold text-slate-800">{step.agent}</div>
                    <div className="text-slate-500">{step.purpose}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab Content: Evidence */}
          {activeTab === 'evidence' && (
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {evidence.map((ev, idx) => (
                <div key={idx} className="p-2 rounded bg-slate-50 border border-slate-200 text-[11px]">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                    <span>{t.executionPanel.source} {ev.source_agent}</span>
                    <span>{t.common.confidence}: {Math.round(ev.confidence * 100)}%</span>
                  </div>
                  <div className="font-semibold text-slate-800 mt-0.5">{ev.claim}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
