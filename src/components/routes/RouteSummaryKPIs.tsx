import React from 'react';

export const RouteSummaryKPIs: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Card 1: Remaining Stations */}
      <div className="bg-surface-container-lowest rounded-xl p-5 shadow-ambient border border-outline-variant/20 flex flex-col justify-between hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-2">
          <p className="font-label-md text-xs text-on-surface-variant uppercase font-semibold">
            Remaining Stations
          </p>
          <span className="material-symbols-outlined text-outline">location_on</span>
        </div>
        <div>
          <p className="font-headline-lg text-headline-lg font-bold text-on-surface">4</p>
          <p className="font-body-md text-xs text-on-surface-variant mt-1">201 km remaining</p>
        </div>
      </div>

      {/* Card 2: Current Delay */}
      <div className="bg-surface-container-lowest rounded-xl p-5 shadow-ambient border border-outline-variant/20 flex flex-col justify-between hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-2">
          <p className="font-label-md text-xs text-on-surface-variant uppercase font-semibold">
            Current Delay
          </p>
          <span className="material-symbols-outlined text-error">timer</span>
        </div>
        <div>
          <p className="font-headline-lg text-headline-lg font-bold text-error">+18 min</p>
          <p className="font-body-md text-xs text-on-surface-variant mt-1">At Kanpur Central</p>
        </div>
      </div>

      {/* Card 3: Predicted Final Delay (Violet accent) */}
      <div className="bg-surface-container-lowest rounded-xl p-5 shadow-ambient border border-outline-variant/20 flex flex-col justify-between ai-card-border hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-2">
          <p className="font-label-md text-xs text-on-surface-variant uppercase flex items-center gap-1 font-bold">
            <span className="material-symbols-outlined text-[14px] text-[#7c3aed]">auto_awesome</span>
            Predicted Final Delay
          </p>
        </div>
        <div>
          <p className="font-headline-lg text-headline-lg font-bold text-on-surface">+12 min</p>
          <p className="font-body-md text-xs text-[#7c3aed] mt-1 font-bold bg-[#7c3aed]/10 inline-block px-2 py-0.5 rounded">
            Expected recovery: 6 min
          </p>
        </div>
      </div>

      {/* Card 4: Final AI ETA (Navy Hero) */}
      <div className="bg-primary rounded-xl p-5 shadow-ambient flex flex-col justify-between relative overflow-hidden text-white hover:shadow-md transition-shadow">
        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary opacity-20 rounded-full -mr-10 -mt-10 blur-xl pointer-events-none"></div>
        <div className="relative z-10 flex items-start justify-between mb-2">
          <p className="font-label-md text-xs text-primary-fixed uppercase tracking-wider font-bold">
            FINAL AI ETA
          </p>
          <span className="material-symbols-outlined text-primary-fixed">event_available</span>
        </div>
        <div className="relative z-10">
          <p className="font-display-lg text-headline-lg lg:text-display-lg font-black text-on-primary font-mono-data">
            18:42
          </p>
          <p className="font-body-md text-xs text-primary-fixed mt-1 flex items-center gap-1 font-semibold">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            Confidence: 94%
          </p>
        </div>
      </div>
    </div>
  );
};
