import React from 'react';

export const AlertsKPIs: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-lg mb-lg">
      {/* 1. Active Alerts */}
      <div className="bg-white rounded-lg p-lg shadow-ambient border-l-4 border-primary hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-sm">
          <span className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
            Active Alerts
          </span>
          <span className="material-symbols-outlined text-primary">notifications_active</span>
        </div>
        <div className="font-display-lg text-3xl lg:text-display-lg font-bold text-on-surface mb-xs">
          12
        </div>
        <div className="font-body-md text-xs text-on-surface-variant">Across monitored network</div>
      </div>

      {/* 2. Critical */}
      <div className="bg-white rounded-lg p-lg shadow-ambient border-l-4 border-alert-critical hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-sm">
          <span className="font-label-md text-xs text-alert-critical uppercase tracking-wider font-bold">
            Critical
          </span>
          <span className="material-symbols-outlined text-alert-critical">error</span>
        </div>
        <div className="font-display-lg text-3xl lg:text-display-lg font-bold text-on-surface mb-xs">
          3
        </div>
        <div className="font-body-md text-alert-critical bg-alert-critical-bg px-2 py-0.5 inline-block rounded text-xs font-bold mt-1">
          Immediate attention required
        </div>
      </div>

      {/* 3. Warning */}
      <div className="bg-white rounded-lg p-lg shadow-ambient border-l-4 border-alert-warning hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-sm">
          <span className="font-label-md text-xs text-alert-warning uppercase tracking-wider font-bold">
            Warning
          </span>
          <span className="material-symbols-outlined text-alert-warning">warning</span>
        </div>
        <div className="font-display-lg text-3xl lg:text-display-lg font-bold text-on-surface mb-xs">
          6
        </div>
        <div className="font-body-md text-alert-warning bg-alert-warning-bg px-2 py-0.5 inline-block rounded text-xs font-bold mt-1">
          Potential delay impact
        </div>
      </div>

      {/* 4. AI Resolved */}
      <div className="bg-white rounded-lg p-lg shadow-ambient border-l-4 border-alert-recovery hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-sm">
          <span className="font-label-md text-xs text-alert-recovery uppercase tracking-wider font-bold">
            AI Resolved
          </span>
          <span className="material-symbols-outlined text-alert-recovery">auto_awesome</span>
        </div>
        <div className="font-display-lg text-3xl lg:text-display-lg font-bold text-on-surface mb-xs">
          18
        </div>
        <div className="font-body-md text-alert-recovery bg-alert-recovery-bg px-2 py-0.5 inline-block rounded text-xs font-bold mt-1">
          Automatically identified recovery
        </div>
      </div>
    </div>
  );
};
