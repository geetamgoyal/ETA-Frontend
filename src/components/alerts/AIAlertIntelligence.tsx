import React from 'react';
import { useNavigate } from 'react-router-dom';

export const AIAlertIntelligence: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-ambient overflow-hidden flex flex-col border border-outline-variant/30 h-full">
      {/* Header */}
      <div className="p-lg border-b border-outline-variant/50 bg-gradient-to-r from-[#F8FAFC] to-[#F1F5F9]">
        <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-[#8B5CF6]">auto_awesome</span>
          AI Alert Intelligence
        </h3>
        <p className="font-body-md text-xs text-on-surface-variant mt-1">
          Recommended real-time actions based on dynamic network conditions.
        </p>
      </div>

      {/* Action Cards */}
      <div className="p-lg flex flex-col gap-md bg-surface-container-lowest flex-1 overflow-y-auto">
        {/* Card 1: Critical */}
        <div className="border-l-4 border-alert-critical bg-alert-critical-bg/40 p-4 rounded-r-lg border-y border-r border-outline-variant/20 hover:shadow-sm transition-shadow relative overflow-hidden group">
          <div className="flex items-start gap-2.5 mb-2 relative z-10">
            <span className="material-symbols-outlined text-alert-critical mt-0.5 text-[20px]">
              warning
            </span>
            <div>
              <h4 className="font-label-md text-xs text-on-surface font-bold">
                Investigate Gatiman Express stoppage
              </h4>
              <p className="font-body-md text-xs text-on-surface-variant mt-1 leading-relaxed">
                Check signal and track clearance status immediately to prevent cascading delays on the Jhansi route.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/train/12050')}
            className="mt-2 ml-7 bg-white border border-alert-critical/30 text-alert-critical hover:bg-alert-critical hover:text-white px-3 py-1 rounded text-xs font-bold transition-colors flex items-center gap-1 shadow-xs cursor-pointer"
          >
            Investigate <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>

        {/* Card 2: Warning */}
        <div className="border-l-4 border-alert-warning bg-alert-warning-bg/40 p-4 rounded-r-lg border-y border-r border-outline-variant/20 hover:shadow-sm transition-shadow relative overflow-hidden group">
          <div className="flex items-start gap-2.5 relative z-10">
            <span className="material-symbols-outlined text-alert-warning mt-0.5 text-[20px]">
              insights
            </span>
            <div>
              <h4 className="font-label-md text-xs text-on-surface font-bold">
                Monitor Kanpur – Prayagraj congestion
              </h4>
              <p className="font-body-md text-xs text-on-surface-variant mt-1 leading-relaxed">
                AI suggests prioritizing route clearance for delayed premium trains to minimize overall network penalty.
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Recovery */}
        <div className="border-l-4 border-alert-recovery bg-alert-recovery-bg/40 p-4 rounded-r-lg border-y border-r border-outline-variant/20 hover:shadow-sm transition-shadow relative overflow-hidden group">
          <div className="flex items-start gap-2.5 relative z-10">
            <span className="material-symbols-outlined text-alert-recovery mt-0.5 text-[20px]">
              check_circle
            </span>
            <div>
              <h4 className="font-label-md text-xs text-on-surface font-bold">
                Rajdhani Express showing recovery
              </h4>
              <p className="font-body-md text-xs text-on-surface-variant mt-1 leading-relaxed">
                Maintain current operational priority. Expected to arrive within 2 minutes of original ETA at Kanpur.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
