import React from 'react';

export type TimeframeRange = 'Today' | '7 Days' | '30 Days' | 'Custom';

interface ETAAnalyticsHeaderProps {
  selectedTimeframe: TimeframeRange;
  onTimeframeChange: (range: TimeframeRange) => void;
  onExportClick: () => void;
}

export const ETAAnalyticsHeader: React.FC<ETAAnalyticsHeaderProps> = ({
  selectedTimeframe,
  onTimeframeChange,
  onExportClick,
}) => {
  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/25 shadow-sm p-4 sm:p-5 flex flex-col gap-3">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center text-indigo-600">
              <span className="material-symbols-outlined text-[20px]">analytics</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-on-surface tracking-tight">
              ETA Prediction Analytics &amp; Accuracy
            </h1>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-indigo-600 text-white tracking-wider font-mono">
              VALIDATION SUITE
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-1 max-w-2xl">
            Empirical validation metrics, scheduled vs predicted arrival deviations, error distribution curves, and route-level intelligence.
          </p>
        </div>

        {/* Prototype Validation Notice & Timeframe Filter */}
        <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-auto">
          {/* Prototype Simulation Disclaimer Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span className="uppercase tracking-wider text-[10px] font-black text-amber-900">
              PROTOTYPE / SIMULATION METRICS
            </span>
            <span
              className="material-symbols-outlined text-[14px] text-amber-700 cursor-help"
              title="Accuracy metrics and error distributions are calculated from prototype validation runs and simulated telemetry for SIH 2026 evaluation. Not an official CRIS/FOIS accuracy audit."
            >
              info
            </span>
          </div>

          {/* Timeframe Filter Buttons */}
          <div className="flex items-center bg-surface-container-low rounded-lg p-0.5 border border-outline-variant/30 text-xs font-bold">
            {(['Today', '7 Days', '30 Days', 'Custom'] as TimeframeRange[]).map((tf) => (
              <button
                key={tf}
                onClick={() => onTimeframeChange(tf)}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  selectedTimeframe === tf
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Export Report CTA */}
          <button
            onClick={onExportClick}
            className="px-3 py-1.5 rounded-lg bg-surface-container-low border border-outline-variant/30 text-xs font-bold text-on-surface hover:bg-surface-container transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            <span>Export Analytics</span>
          </button>
        </div>
      </div>
    </div>
  );
};
