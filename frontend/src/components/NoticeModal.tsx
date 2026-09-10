// frontend/src/components/NoticeModal.tsx
import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface NoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NoticeModal: React.FC<NoticeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="relative w-full max-w-lg p-6 bg-white border border-slate-200 rounded-xl shadow-xl space-y-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          <h2 className="font-bold text-sm text-slate-900 uppercase tracking-wide">
            Statutory Maritime Safety Notice
          </h2>
        </div>

        <div className="text-xs text-slate-600 space-y-3 leading-relaxed">
          <p>
            <strong>MarineMind AI</strong> is an enterprise <strong>Maritime Decision Support System (DSS)</strong> designed for coastal fisheries, fleet navigation safety, and maritime operations.
            It provides fused estimations derived from satellite oceanography, hydrodynamic wave telemetry, and sovereign geospatial boundaries.
          </p>

          <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg text-amber-900 space-y-1">
            <div className="font-bold">Mandatory Operational Directives:</div>
            <div className="text-[11px] leading-snug">
              This system does not replace statutory navigational warnings issued by INCOIS, IMD, or the Indian Coast Guard.
              Always obtain harbor master clearance prior to departure.
            </div>
          </div>

          <ul className="list-disc list-inside space-y-1 text-slate-500 text-[11px]">
            <li>Maintain continuous VHF radio watch on Channel 16.</li>
            <li>Maintain a minimum 5 km navigational safety buffer from the International Maritime Boundary Line (IMBL).</li>
          </ul>
        </div>

        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            Acknowledge & Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};