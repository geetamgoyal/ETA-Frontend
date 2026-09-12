import React, { useMemo } from 'react';
import { Train } from '../../types/train';
import { getTrainDelayFactors } from '../../utils/trainFactors';
import { clsx } from 'clsx';

interface WhyDidETAChangeSectionProps {
  train: Train;
}

export const WhyDidETAChangeSection: React.FC<WhyDidETAChangeSectionProps> = ({ train }) => {
  const analysis = useMemo(() => getTrainDelayFactors(train), [train]);

  return (
    <section aria-label="Why Did ETA Change" className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 flex flex-col gap-4 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-outline-variant/30">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[22px]">troubleshoot</span>
            <h3 className="text-base font-bold text-on-surface">
              Why Did ETA Change? — Delay Factor Decomposition
            </h3>
          </div>
          <p className="text-[11px] text-on-surface-variant mt-0.5">
            Operational contribution breakdown explaining the variance between scheduled baseline and dynamically predicted ETA
          </p>
        </div>

        <span className="text-[10px] font-bold text-amber-800 bg-amber-500/15 border border-amber-500/30 px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto">
          PROTOTYPE SIMULATION
        </span>
      </div>

      {/* Explicit Prototype Simulation Notice Box */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 flex items-start gap-2.5 text-[11px] text-amber-900">
        <span className="material-symbols-outlined text-amber-600 text-[18px] flex-shrink-0 mt-0.5">
          info
        </span>
        <div className="flex-1 leading-relaxed">
          <strong>Operational Factor Modeling:</strong> {analysis.disclaimer} Factors reflect real-time block constraints, section speeds, and station dwell logs.
        </div>
      </div>

      {/* 6 Supported Prototype Factors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {analysis.factors.map((f) => {
          const isAddedDelay = f.impactMinutes > 0;
          const isRecovery = f.impactMinutes < 0;

          return (
            <div
              key={f.id}
              className={clsx(
                'border rounded-xl p-3.5 flex flex-col justify-between transition-all bg-surface-container-lowest hover:border-secondary/50',
                f.severity === 'critical'
                  ? 'border-red-500/30 bg-red-500/5'
                  : f.severity === 'warn'
                  ? 'border-amber-500/30 bg-amber-500/5'
                  : 'border-outline-variant/40',
              )}
            >
              {/* Top row: Icon, Category & Impact */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className={clsx(
                      'material-symbols-outlined text-[20px]',
                      isAddedDelay ? 'text-red-600' : isRecovery ? 'text-emerald-600' : 'text-slate-600',
                    )}
                  >
                    {f.icon}
                  </span>
                  <div>
                    <h4 className="font-bold text-[13px] text-on-surface leading-tight">
                      {f.name}
                    </h4>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-on-surface-variant">
                      {f.category}
                    </span>
                  </div>
                </div>

                {/* Impact pill */}
                <span
                  className={clsx(
                    'data-value text-[12px] font-black px-2 py-0.5 rounded border flex-shrink-0',
                    isAddedDelay
                      ? 'bg-red-500/15 text-red-700 border-red-500/30'
                      : isRecovery
                      ? 'bg-emerald-500/15 text-emerald-700 border-emerald-500/30'
                      : 'bg-slate-500/10 text-slate-700 border-slate-500/20',
                  )}
                >
                  {isAddedDelay ? `+${f.impactMinutes}m` : isRecovery ? `${f.impactMinutes}m` : '0m'}
                </span>
              </div>

              {/* Metric label & value */}
              <div className="bg-surface-container-low px-2.5 py-1.5 rounded-lg mb-2 flex items-center justify-between text-[11px]">
                <span className="text-on-surface-variant font-medium">{f.metricLabel}:</span>
                <span className="font-mono font-bold text-on-surface">{f.metricValue}</span>
              </div>

              {/* Description */}
              <p className="text-[11px] text-on-surface-variant leading-normal">
                {f.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Explainability Factor Balance Table (Exact format requested) */}
      <div className="bg-surface-container-low border border-outline-variant/40 rounded-xl p-4 flex flex-col gap-1.5 font-mono text-xs">
        <div className="flex justify-between items-center pb-2 border-b border-outline-variant/30 text-[11px] font-bold text-on-surface-variant uppercase tracking-wider font-sans">
          <span>Operational Contributing Factor</span>
          <span>Forecast Impact</span>
        </div>
        {analysis.factors.map((f) => (
          <div key={f.id} className="flex justify-between items-center py-1 text-on-surface">
            <span className="font-sans font-medium text-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-secondary">{f.icon}</span>
              {f.name}
            </span>
            <span className={clsx('font-mono font-bold', f.impactMinutes > 0 ? 'text-red-600' : f.impactMinutes < 0 ? 'text-emerald-600' : 'text-slate-600')}>
              {f.impactMinutes > 0 ? `+${f.impactMinutes} min` : f.impactMinutes < 0 ? `${f.impactMinutes} min` : '0 min'}
            </span>
          </div>
        ))}
        <div className="pt-2 border-t-2 border-dashed border-outline-variant/50 flex justify-between items-center text-sm font-bold text-on-surface">
          <span className="font-sans font-bold">Net Operational Impact on ETA:</span>
          <span className={clsx('font-mono font-black text-base', analysis.finalForecastDelayMinutes > 20 ? 'text-red-600' : analysis.finalForecastDelayMinutes > 2 ? 'text-amber-600' : 'text-emerald-600')}>
            +{analysis.finalForecastDelayMinutes} min
          </span>
        </div>
      </div>

      {/* Factor Aggregation Equation Bar */}
      <div className="bg-primary text-white rounded-xl p-4 flex flex-wrap items-center justify-around gap-3 text-center shadow-md">
        <div className="flex flex-col">
          <span className="text-[10px] text-sky-200 uppercase tracking-wider font-semibold">
            Accumulated Delay
          </span>
          <span className="data-value text-xl font-black text-white">
            +{train.currentDelayMinutes}m
          </span>
        </div>

        <span className="text-xl font-bold opacity-60">+</span>

        <div className="flex flex-col">
          <span className="text-[10px] text-sky-200 uppercase tracking-wider font-semibold">
            Dynamic Adjustments
          </span>
          <span className={clsx('data-value text-xl font-black', analysis.totalFactorDelta < 0 ? 'text-emerald-300' : 'text-amber-300')}>
            {analysis.totalFactorDelta >= 0 ? `+${analysis.totalFactorDelta}m` : `${analysis.totalFactorDelta}m`}
          </span>
        </div>

        <span className="text-xl font-bold opacity-60">=</span>

        <div className="flex flex-col">
          <span className="text-[10px] text-sky-200 uppercase tracking-wider font-semibold">
            Net Predicted Destination Delay
          </span>
          <span className="data-value text-2xl font-black text-[#38bdf8]">
            +{train.factors?.finalForecastDelayMinutes ?? train.currentDelayMinutes}m ({train.aiPredictedEta})
          </span>
        </div>
      </div>
    </section>
  );
};
