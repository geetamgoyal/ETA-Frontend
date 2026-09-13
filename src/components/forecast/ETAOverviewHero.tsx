import React from 'react';
import { Train } from '../../types/train';
import { getTrainDelayFactors } from '../../utils/trainFactors';

interface ETAOverviewHeroProps {
  train: Train;
}

export const ETAOverviewHero: React.FC<ETAOverviewHeroProps> = ({ train }) => {
  const analysis = getTrainDelayFactors(train);

  return (
    <div className="flex flex-wrap gap-4 p-4">
      {/* Conventional Estimate Card */}
      <div className="flex min-w-[240px] flex-1 flex-col gap-2 rounded-xl p-6 bg-white border border-outline-variant/30 shadow-sm justify-between">
        <div className="flex justify-between items-center">
          <p className="text-on-surface-variant text-xs font-bold uppercase tracking-wider">
            Conventional Static Arrival
          </p>
          <span className="text-[10px] font-mono-data bg-surface-container px-2 py-0.5 rounded text-on-surface-variant">
            WTT: {train.previousEta}
          </span>
        </div>
        <p className="text-error tracking-tight text-3xl sm:text-4xl font-black font-mono-data">
          {analysis.conventionalEta}
        </p>
        <div className="flex items-center gap-2">
          <p className="text-error text-xs font-bold px-2.5 py-0.5 bg-error-container rounded-full w-fit">
            +{train.currentDelayMinutes}m Delay
          </p>
          <span className="text-[11px] text-on-surface-variant">Fixed linear extrapolation</span>
        </div>
      </div>

      {/* AI Predicted ETA Card (Hero Gradient) */}
      <div className="flex min-w-[280px] flex-[1.6] flex-col gap-2 rounded-xl p-6 prediction-gradient text-white shadow-lg ring-2 ring-primary ring-offset-2 justify-between">
        <div className="flex justify-between items-start">
          <p className="text-primary-fixed text-xs font-black uppercase tracking-widest flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
            AI PREDICTED DYNAMIC ETA
          </p>
          <span className="bg-secondary-container text-on-secondary-container text-xs font-black px-2.5 py-1 rounded shadow-xs">
            {train.confidencePercent}% CONFIDENCE
          </span>
        </div>

        <div className="my-1">
          <p className="tracking-tight text-4xl sm:text-5xl font-black font-mono-data">
            {train.aiPredictedEta}
          </p>
          <p className="text-secondary-fixed text-xs font-semibold mt-1">
            {analysis.deltaVsConventionalMinutes < 0
              ? `${Math.abs(analysis.deltaVsConventionalMinutes)} minutes earlier than conventional estimate (Speed recovery active)`
              : analysis.deltaVsConventionalMinutes > 0
              ? `${analysis.deltaVsConventionalMinutes} minutes later than conventional estimate (Sectional congestion active)`
              : 'Tracking nominal schedule running time'}
          </p>
        </div>

        <div className="mt-2 pt-2 border-t border-white/15 flex justify-between text-xs">
          <span className="opacity-75">AI Confidence Range:</span>
          <span className="font-bold text-secondary-fixed font-mono-data">
            {train.expectedEtaRange.min} — {train.expectedEtaRange.max}
          </span>
        </div>
      </div>
    </div>
  );
};
