import React from 'react';
import { Train } from '../../types/train';

interface AIRecommendationsPanelProps {
  train: Train;
}

export const AIRecommendationsPanel: React.FC<AIRecommendationsPanelProps> = ({ train }) => {
  const stations = train.stations || [];
  const activeIdx = stations.findIndex((s) => s.status === 'Current');
  const nextStation = activeIdx !== -1 && activeIdx + 1 < stations.length ? stations[activeIdx + 1] : stations[stations.length - 1];
  const destStation = stations[stations.length - 1];

  const hasDelay = train.currentDelayMinutes > 0;
  const isSevere = train.currentDelayMinutes >= 20;
  const speedDeficit = Math.max(0, train.maxSpeedKmH - train.currentSpeedKmH);

  return (
    <div className="bg-surface-container-lowest rounded-xl p-5 shadow-ambient border border-outline-variant/20 ai-card-border flex-1">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-headline-sm text-headline-sm font-bold text-primary flex items-center gap-2">
          <span className="material-symbols-outlined text-[#7c3aed]">lightbulb</span>
          AI Operational Guidance
        </h3>
        <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded font-mono-data">
          {train.trainNumber}
        </span>
      </div>

      <div className="space-y-3">
        {/* Rec 1: Speed Profile */}
        <div className="flex gap-3 items-start">
          <span className="material-symbols-outlined text-secondary text-lg mt-0.5">speed</span>
          <div>
            <p className="font-body-md text-xs font-bold text-on-surface">
              {hasDelay && speedDeficit > 15
                ? `Authorise MPS notch-up to ${train.maxSpeedKmH} km/h`
                : `Maintain cruising velocity at ${train.currentSpeedKmH} km/h`}
            </p>
            <p className="font-label-md text-xs text-on-surface-variant mt-0.5">
              {hasDelay
                ? `Expected Benefit: Recovers ~${Math.min(12, Math.round(train.currentDelayMinutes * 0.4))}m running time before ${nextStation?.stationName || 'next station'}.`
                : 'Nominal cruise speed matches section schedule profile.'}
            </p>
          </div>
        </div>

        <hr className="border-outline-variant/20" />

        {/* Rec 2: Block & Junction Clearance */}
        <div className="flex gap-3 items-start">
          <span className="material-symbols-outlined text-[#d97706] text-lg mt-0.5">alt_route</span>
          <div>
            <p className="font-body-md text-xs font-bold text-on-surface">
              {isSevere
                ? `Request priority loop bypass at ${nextStation?.stationCode || 'approaching junction'}`
                : `Monitor interlocking entry at ${nextStation?.stationName || 'next junction'}`}
            </p>
            <p className="font-label-md text-xs text-on-surface-variant mt-0.5">
              {isSevere
                ? 'Mitigates cascaded trailing delays for lower-priority goods trains.'
                : 'Section automatic block signalling allows smooth green-wave ingress.'}
            </p>
          </div>
        </div>

        <hr className="border-outline-variant/20" />

        {/* Rec 3: Destination Forecast Adjustment */}
        <div className="flex gap-3 items-start">
          <span className="material-symbols-outlined text-primary text-lg mt-0.5">update</span>
          <div>
            <p className="font-body-md text-xs font-bold text-on-surface">
              Target arrival window at {destStation?.stationName || 'Destination'}
            </p>
            <p className="font-label-md text-xs text-on-surface-variant mt-0.5">
              {hasDelay
                ? `Estimated Dynamic ETA ${destStation?.actualOrPredictedArrival || train.aiPredictedEta} (cascaded delay +${destStation?.predictedDelayMinutes ?? train.currentDelayMinutes}m).`
                : `On schedule for planned arrival at ${train.previousEta}.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
