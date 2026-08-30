import React from 'react';

export const AnalyticsKPIs: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter mb-xl">
      {/* KPI 1: Average Network Delay */}
      <div className="bg-surface p-lg rounded-xl shadow-sm border border-surface-container-highest flex flex-col justify-between hover:shadow-md transition-shadow">
        <p className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider mb-2 font-semibold">
          Average Network Delay
        </p>
        <div className="flex items-end justify-between">
          <div className="flex items-baseline gap-1">
            <span className="font-display-lg text-3xl lg:text-display-lg font-bold text-on-surface font-mono-data">
              12
            </span>
            <span className="font-body-md text-sm text-on-surface-variant">min</span>
          </div>
          <div className="flex items-center text-accent-green bg-accent-green/10 px-2 py-1 rounded font-mono-data text-xs font-bold">
            <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
            8%
          </div>
        </div>
        <p className="font-label-md text-xs text-outline mt-2 text-right">vs last week</p>
      </div>

      {/* KPI 2: On-Time Performance */}
      <div className="bg-surface p-lg rounded-xl shadow-sm border border-surface-container-highest flex flex-col justify-between hover:shadow-md transition-shadow">
        <p className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider mb-2 font-semibold">
          On-Time Performance
        </p>
        <div className="flex items-end justify-between">
          <div className="flex items-baseline gap-1">
            <span className="font-display-lg text-3xl lg:text-display-lg font-bold text-on-surface font-mono-data">
              64
            </span>
            <span className="font-body-md text-sm text-on-surface-variant">%</span>
          </div>
          <div className="flex items-center text-accent-green bg-accent-green/10 px-2 py-1 rounded font-mono-data text-xs font-bold">
            <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
            5.2%
          </div>
        </div>
        <p className="font-label-md text-xs text-outline mt-2 text-right">vs last week</p>
      </div>

      {/* KPI 3: AI ETA Accuracy (Violet Accent) */}
      <div className="bg-surface p-lg rounded-xl shadow-sm border border-surface-container-highest flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary-container"></div>
        <div className="flex items-center gap-1.5 mb-2 pl-2">
          <span className="material-symbols-outlined text-secondary text-[18px]">auto_awesome</span>
          <p className="font-label-md text-xs text-secondary font-bold uppercase tracking-wider">
            AI ETA Accuracy
          </p>
        </div>
        <div className="flex items-end justify-between pl-2">
          <div className="flex items-baseline gap-1">
            <span className="font-display-lg text-3xl lg:text-display-lg font-bold text-on-surface font-mono-data">
              94.8
            </span>
            <span className="font-body-md text-sm text-on-surface-variant">%</span>
          </div>
          <div className="flex items-center text-secondary bg-secondary-container/20 px-2 py-1 rounded font-mono-data text-xs font-bold">
            <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
            2.1%
          </div>
        </div>
        <p className="font-label-md text-xs text-outline mt-2 text-right">vs last week</p>
      </div>

      {/* KPI 4: Trains Analyzed */}
      <div className="bg-surface p-lg rounded-xl shadow-sm border border-surface-container-highest flex flex-col justify-between hover:shadow-md transition-shadow">
        <p className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider mb-2 font-semibold">
          Trains Analyzed
        </p>
        <div className="flex items-end justify-between mt-auto">
          <div className="flex items-baseline gap-1">
            <span className="font-display-lg text-3xl lg:text-display-lg font-bold text-on-surface font-mono-data">
              128
            </span>
          </div>
          <span className="material-symbols-outlined text-outline-variant text-[32px]">train</span>
        </div>
        <p className="font-label-md text-xs text-outline mt-2 text-right">Across monitored network</p>
      </div>
    </div>
  );
};
