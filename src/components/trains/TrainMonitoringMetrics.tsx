import React from 'react';

export const TrainMonitoringMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-md mb-lg">
      {/* Total Monitored */}
      <div className="bg-surface-container-lowest rounded-xl p-md border border-outline-variant/30 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-2">
          <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
            Total Monitored
          </span>
          <span className="material-symbols-outlined text-primary text-[20px]">monitoring</span>
        </div>
        <div className="flex items-end gap-2">
          <span className="font-display-lg text-headline-lg lg:text-display-lg font-bold text-primary">
            128
          </span>
          <span className="font-body-md text-sm text-on-surface-variant mb-1">Active</span>
        </div>
      </div>

      {/* On Time */}
      <div className="bg-surface-container-lowest rounded-xl p-md border border-outline-variant/30 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-2">
          <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
            On Time
          </span>
          <span className="material-symbols-outlined text-[#0f766e] text-[20px]">check_circle</span>
        </div>
        <div className="flex items-end gap-2">
          <span className="font-display-lg text-headline-lg lg:text-display-lg font-bold text-on-surface">
            82
          </span>
          <span className="font-body-md text-[#0f766e] mb-1 font-semibold bg-[#ccfbf1] px-2 py-0.5 rounded text-xs">
            64%
          </span>
        </div>
      </div>

      {/* Minor Delays */}
      <div className="bg-surface-container-lowest rounded-xl p-md border border-outline-variant/30 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-2">
          <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
            Minor Delays
          </span>
          <span className="material-symbols-outlined text-[#b45309] text-[20px]">schedule</span>
        </div>
        <div className="flex items-end gap-2">
          <span className="font-display-lg text-headline-lg lg:text-display-lg font-bold text-on-surface">
            34
          </span>
          <span className="font-body-md text-[#b45309] mb-1 font-semibold bg-[#fef3c7] px-2 py-0.5 rounded text-xs">
            &lt; 30m
          </span>
        </div>
      </div>

      {/* Critical Risks */}
      <div className="bg-surface-container-lowest rounded-xl p-md border border-error/30 shadow-sm flex flex-col justify-between relative overflow-hidden hover:shadow-md transition-shadow">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-error"></div>
        <div className="flex justify-between items-start mb-2 pl-2">
          <span className="font-label-md text-label-md text-error font-bold uppercase tracking-wider">
            Critical Risks
          </span>
          <span className="material-symbols-outlined text-error text-[20px] material-symbols-filled">
            warning
          </span>
        </div>
        <div className="flex items-end gap-2 pl-2">
          <span className="font-display-lg text-headline-lg lg:text-display-lg font-bold text-error">
            12
          </span>
          <span className="font-body-md text-error mb-1 font-bold bg-error-container px-2 py-0.5 rounded text-xs">
            Require Action
          </span>
        </div>
      </div>
    </div>
  );
};
