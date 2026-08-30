import React from 'react';
import { Train } from '../../types/train';

interface AIFactorBreakdownProps {
  train: Train;
}

export const AIFactorBreakdown: React.FC<AIFactorBreakdownProps> = ({ train }) => {
  const factors = train.factors || {
    initialDelayMinutes: 18,
    speedRecoveryMinutes: -4,
    routeCongestionMinutes: -3,
    historicalPatternsMinutes: -2,
    scheduledHaltStatus: 'Normal',
    finalForecastDelayMinutes: 9,
  };

  return (
    <section className="bg-white rounded-xl border border-outline-variant/30 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <span className="material-symbols-outlined text-primary text-[22px]">analytics</span>
        <h4 className="text-lg font-bold text-primary">How AI Predicted This ETA</h4>
      </div>

      <div className="space-y-4">
        {/* Factor 1: Current Operational Delay */}
        <div className="flex justify-between items-center p-3 bg-surface-container-low rounded-lg border border-outline-variant/20">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-error material-symbols-filled text-[20px]">
              warning
            </span>
            <span className="text-sm font-semibold text-on-surface">
              Current Operational Delay
            </span>
          </div>
          <span className="font-mono-data text-error font-bold text-base">
            +{factors.initialDelayMinutes}m
          </span>
        </div>

        {/* 4 Factor Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex justify-between items-center p-3 bg-surface-container-low rounded-lg border-l-4 border-secondary border-y border-r border-outline-variant/10">
            <span className="text-xs font-semibold text-on-surface">Speed Recovery Profile</span>
            <span className="font-mono-data text-secondary font-bold text-sm">
              {factors.speedRecoveryMinutes}m
            </span>
          </div>

          <div className="flex justify-between items-center p-3 bg-surface-container-low rounded-lg border-l-4 border-secondary border-y border-r border-outline-variant/10">
            <span className="text-xs font-semibold text-on-surface">Route Clearance / Congestion</span>
            <span className="font-mono-data text-secondary font-bold text-sm">
              {factors.routeCongestionMinutes}m
            </span>
          </div>

          <div className="flex justify-between items-center p-3 bg-surface-container-low rounded-lg border-l-4 border-secondary border-y border-r border-outline-variant/10">
            <span className="text-xs font-semibold text-on-surface">Historical Run Patterns</span>
            <span className="font-mono-data text-secondary font-bold text-sm">
              {factors.historicalPatternsMinutes}m
            </span>
          </div>

          <div className="flex justify-between items-center p-3 bg-surface-container-low rounded-lg border border-outline-variant/10">
            <span className="text-xs font-semibold text-on-surface">Scheduled Halt Buffer</span>
            <span className="font-mono-data text-on-surface-variant text-xs font-semibold">
              {factors.scheduledHaltStatus}
            </span>
          </div>
        </div>

        {/* Mathematical Equation Banner */}
        <div className="mt-6 p-4 bg-primary text-white rounded-xl flex flex-wrap items-center justify-center gap-4 text-center shadow-md">
          <div>
            <div className="text-[11px] opacity-70 uppercase tracking-wider font-semibold">
              Initial Delay
            </div>
            <div className="text-xl font-bold font-mono-data">+{factors.initialDelayMinutes}m</div>
          </div>
          <span className="text-xl opacity-50 font-bold">+</span>
          <div>
            <div className="text-[11px] opacity-70 uppercase tracking-wider font-semibold">
              AI Dynamic Recovery
            </div>
            <div className="text-xl font-bold text-secondary-container font-mono-data">
              -9m
            </div>
          </div>
          <span className="text-xl opacity-50 font-bold">=</span>
          <div>
            <div className="text-[11px] opacity-70 uppercase tracking-wider font-semibold">
              Final Forecast Delay
            </div>
            <div className="text-2xl font-black text-secondary-fixed font-mono-data">
              +{factors.finalForecastDelayMinutes}m ({train.aiPredictedEta})
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
