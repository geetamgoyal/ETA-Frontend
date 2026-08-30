import React from 'react';

export const DashboardKPIs: React.FC = () => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-md">
      {/* 1. Trains Monitored */}
      <div className="bg-surface-container-lowest rounded-lg p-lg shadow-sm border border-outline-variant/20 flex flex-col justify-between hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
            Trains Monitored
          </span>
          <span className="material-symbols-outlined text-primary">train</span>
        </div>
        <div className="flex flex-col mt-2">
          <span className="font-headline-lg text-headline-lg font-bold text-primary">128</span>
          <span className="font-label-md text-label-md text-on-surface-variant">+8 today</span>
        </div>
      </div>

      {/* 2. On-Time Trains */}
      <div className="bg-surface-container-lowest rounded-lg p-lg shadow-sm border border-outline-variant/20 flex flex-col justify-between hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
            On-Time Trains
          </span>
          <span className="material-symbols-outlined text-secondary">check_circle</span>
        </div>
        <div className="flex items-end gap-3 mt-2">
          <span className="font-headline-lg text-headline-lg font-bold text-primary">82</span>
          <span className="font-label-md text-label-md text-secondary mb-1 flex items-center font-medium">
            ↑ 5.2%
          </span>
        </div>
      </div>

      {/* 3. Delayed Trains */}
      <div className="bg-surface-container-lowest rounded-lg p-lg shadow-sm border border-outline-variant/20 flex flex-col justify-between hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
            Delayed Trains
          </span>
          <span className="material-symbols-outlined text-on-surface-variant">schedule</span>
        </div>
        <div className="flex flex-col mt-2">
          <span className="font-headline-lg text-headline-lg font-bold text-primary">34</span>
          <span className="font-label-md text-label-md text-on-surface-variant">↓ 3 from yesterday</span>
        </div>
      </div>

      {/* 4. Critical ETA Risks */}
      <div className="bg-surface-container-lowest rounded-lg p-lg shadow-sm border border-outline-variant/20 flex flex-col justify-between hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <span className="font-label-md text-label-md text-error uppercase tracking-wider font-semibold">
            Critical ETA Risks
          </span>
          <span className="material-symbols-outlined text-error">warning</span>
        </div>
        <div className="flex flex-col mt-2">
          <span className="font-headline-lg text-headline-lg font-bold text-error">12</span>
          <span className="font-label-md text-label-md text-error font-medium">3 require attention</span>
        </div>
      </div>

      {/* 5. AI Accuracy */}
      <div className="bg-surface-container-lowest rounded-lg p-lg shadow-sm border border-outline-variant/20 flex flex-col justify-between ai-border-accent hover:shadow-md transition-shadow bg-gradient-to-br from-surface-container-lowest to-surface-container-high/30">
        <div className="flex justify-between items-start">
          <span className="font-label-md text-label-md text-primary-container uppercase tracking-wider flex items-center gap-1 font-bold">
            <span className="material-symbols-outlined text-[16px] text-secondary">
              temp_preferences_custom
            </span>
            AI Accuracy
          </span>
        </div>
        <div className="flex flex-col mt-2">
          <span className="font-headline-lg text-headline-lg font-bold text-primary-container">
            94.2%
          </span>
          <span className="font-label-md text-label-md text-green-600 font-medium">↑ 2.1%</span>
        </div>
      </div>
    </section>
  );
};
