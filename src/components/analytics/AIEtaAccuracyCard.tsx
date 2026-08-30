import React from 'react';

export const AIEtaAccuracyCard: React.FC = () => {
  return (
    <div className="bg-surface p-lg rounded-xl shadow-sm border border-surface-container-highest flex flex-col justify-between">
      <div className="flex justify-between items-start mb-lg">
        <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
          AI ETA Prediction Accuracy
        </h3>
        <span className="font-display-lg text-2xl font-black text-secondary font-mono-data">
          94.8%
        </span>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 bg-surface-container-low rounded-lg border border-outline-variant/15 text-center sm:text-left">
            <p className="font-label-md text-[10px] text-outline uppercase font-bold mb-1">
              Data Quality
            </p>
            <p className="font-body-md text-xs text-on-surface font-bold">Excellent</p>
          </div>
          <div className="p-3 bg-surface-container-low rounded-lg border border-outline-variant/15 text-center sm:text-left">
            <p className="font-label-md text-[10px] text-outline uppercase font-bold mb-1">
              Availability
            </p>
            <p className="font-body-md text-xs text-on-surface font-bold">98%</p>
          </div>
          <div className="p-3 bg-surface-container-low rounded-lg border border-outline-variant/15 text-center sm:text-left">
            <p className="font-label-md text-[10px] text-outline uppercase font-bold mb-1">
              Confidence
            </p>
            <p className="font-body-md text-xs text-on-surface font-bold">High</p>
          </div>
        </div>

        <div className="p-3.5 bg-secondary-container/10 border border-secondary-container/20 rounded-lg flex items-center gap-3">
          <span className="material-symbols-outlined text-secondary text-[20px]">auto_awesome</span>
          <p className="font-body-md text-xs text-on-secondary-container leading-relaxed">
            Prediction accuracy improved by 2.1% after incorporating real-time interlocking telemetry events.
          </p>
        </div>
      </div>
    </div>
  );
};
