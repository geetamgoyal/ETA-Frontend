import React from 'react';

interface AlertsHeaderProps {
  onConfigureClick: () => void;
}

export const AlertsHeader: React.FC<AlertsHeaderProps> = ({ onConfigureClick }) => {
  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/25 shadow-sm p-4 sm:p-5 flex flex-col gap-3">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/25 flex items-center justify-center text-red-600">
              <span className="material-symbols-outlined text-[20px]">notifications_active</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-on-surface tracking-tight">
              Alerts &amp; Incident Management
            </h1>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-red-600 text-white tracking-wider font-mono">
              OPERATIONAL RADAR
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-1 max-w-2xl">
            Real-time anomaly detection, ETA deviation prioritization, and decision-support incident mitigation for coaching train operations.
          </p>
        </div>

        {/* Prototype Simulation Notice & Actions */}
        <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-auto">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span className="uppercase tracking-wider text-[10px] font-black text-amber-900">
              PROTOTYPE INCIDENT INTELLIGENCE · DEMO SIMULATION
            </span>
            <span
              className="material-symbols-outlined text-[14px] text-amber-700 cursor-help"
              title="Alerts are dynamically generated from prototype block telemetry and ETA deviation thresholds for SIH 2026 evaluation. Does not issue commands to actual Indian Railways interlocking systems."
            >
              info
            </span>
          </div>

          <button
            onClick={onConfigureClick}
            className="px-3 py-1.5 rounded-lg bg-surface-container-low border border-outline-variant/30 text-xs font-bold text-on-surface hover:bg-surface-container transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <span className="material-symbols-outlined text-[16px]">tune</span>
            <span>Configure Thresholds</span>
          </button>
        </div>
      </div>
    </div>
  );
};
