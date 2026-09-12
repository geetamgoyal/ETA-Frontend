import React from 'react';

interface HistoricalHeaderProps {
  onExportClick: () => void;
}

export const HistoricalHeader: React.FC<HistoricalHeaderProps> = ({ onExportClick }) => {
  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/25 shadow-sm p-4 sm:p-5 flex flex-col gap-3">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/25 flex items-center justify-center text-teal-600">
              <span className="material-symbols-outlined text-[20px]">history</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-on-surface tracking-tight">
              Historical Performance &amp; Route Reliability
            </h1>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-teal-600 text-white tracking-wider font-mono">
              BENCHMARK EVALUATION
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-1 max-w-2xl">
            Evaluate recurring sectional delays, route reliability, junction dwell bottlenecks, and dynamic ETA forecast accuracy across past journeys.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-auto">
          {/* Data Honesty Disclaimer Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span className="uppercase tracking-wider text-[10px] font-black text-amber-900">
              PROTOTYPE SIMULATED HISTORY
            </span>
            <span
              className="material-symbols-outlined text-[14px] text-amber-700 cursor-help"
              title="Historical journey logs, station dwell metrics, and error rates reflect controlled multi-day simulation benchmarks for SIH 2026 evaluation. Not an official CRIS/FOIS audit."
            >
              info
            </span>
          </div>

          {/* Export Action */}
          <button
            onClick={onExportClick}
            className="px-3 py-1.5 rounded-lg bg-surface-container-low border border-outline-variant/30 text-xs font-bold text-on-surface hover:bg-surface-container transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            <span>Export Historical Log</span>
          </button>
        </div>
      </div>
    </div>
  );
};
