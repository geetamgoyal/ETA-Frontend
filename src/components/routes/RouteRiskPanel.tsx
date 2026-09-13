import React from 'react';
import { Train } from '../../types/train';

interface RouteRiskPanelProps {
  train: Train;
}

export const RouteRiskPanel: React.FC<RouteRiskPanelProps> = ({ train }) => {
  const stations = train.stations || [];
  const activeIdx = stations.findIndex((s) => s.status === 'Current');
  const currentStation = activeIdx !== -1 ? stations[activeIdx] : stations[0];
  const nextStation = activeIdx !== -1 && activeIdx + 1 < stations.length ? stations[activeIdx + 1] : stations[stations.length - 1];
  const subsequentStation = activeIdx !== -1 && activeIdx + 2 < stations.length ? stations[activeIdx + 2] : null;
  const destStation = stations[stations.length - 1];

  const isDelayHigh = train.currentDelayMinutes > 20;
  const isRecovering = train.status === 'Recovering' || (train.currentDelayMinutes > 0 && train.currentSpeedKmH > 85);

  return (
    <div className="bg-surface-container-lowest rounded-xl p-5 shadow-ambient border border-outline-variant/20">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-headline-sm text-headline-sm font-bold text-primary flex items-center gap-2">
          <span className="material-symbols-outlined text-on-surface-variant">warning</span>
          Route Risk Analysis
        </h3>
        <span className="text-[10px] font-bold text-on-surface-variant bg-surface-container px-2 py-0.5 rounded font-mono-data">
          {train.trainNumber}
        </span>
      </div>

      <div className="space-y-3">
        {/* Section 1: Immediate Active Block */}
        <div className="p-3 bg-surface rounded-lg border border-outline-variant/20 hover:border-outline-variant/50 transition-colors">
          <div className="flex justify-between items-center mb-1">
            <span className="font-body-md text-xs font-bold text-on-surface">
              {currentStation?.stationCode} → {nextStation?.stationCode} ({currentStation?.stationName} Section)
            </span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${isDelayHigh ? 'bg-red-500/10 text-red-700' : isRecovering ? 'bg-emerald-500/10 text-emerald-700' : 'bg-amber-500/10 text-amber-700'}`}>
              {isDelayHigh ? 'CRITICAL RISK' : isRecovering ? 'RECOVERY PATH' : 'MODERATE RISK'}
            </span>
          </div>
          <p className="font-label-md text-xs text-on-surface-variant leading-relaxed">
            {isDelayHigh
              ? `TSR and dense block headway active. Current speed ${train.currentSpeedKmH} km/h vs ${train.maxSpeedKmH} km/h MPS.`
              : isRecovering
              ? `Line clearance granted. High probability of speed recovery into ${nextStation?.stationName}.`
              : `Operating on normal signal cascade. Approaching ${nextStation?.stationName} block.`}
          </p>
        </div>

        {/* Section 2: Next Major Junction */}
        {subsequentStation && (
          <div className="p-3 bg-surface rounded-lg border border-outline-variant/20 hover:border-outline-variant/50 transition-colors">
            <div className="flex justify-between items-center mb-1">
              <span className="font-body-md text-xs font-bold text-on-surface">
                {nextStation?.stationCode} → {subsequentStation.stationCode} ({subsequentStation.stationName})
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#d97706]/10 text-[#d97706]">
                JUNCTION WATCH
              </span>
            </div>
            <p className="font-label-md text-xs text-on-surface-variant leading-relaxed">
              Junction throat occupancy and route interlocking buffer at {subsequentStation.stationName}. Potential dwell variation monitored.
            </p>
          </div>
        )}

        {/* Section 3: Terminal Approach Buffer */}
        <div className="p-3 bg-surface rounded-lg border border-outline-variant/20 hover:border-outline-variant/50 transition-colors">
          <div className="flex justify-between items-center mb-1">
            <span className="font-body-md text-xs font-bold text-on-surface">
              Terminal Approach ({destStation?.stationName || 'Destination'})
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#059669]/10 text-[#059669]">
              TERMINAL BUFFER
            </span>
          </div>
          <p className="font-label-md text-xs text-on-surface-variant leading-relaxed">
            Scheduled timetable buffer: {train.currentDelayMinutes > 0 ? `Dynamic recovery model projects +${destStation?.predictedDelayMinutes ?? train.currentDelayMinutes}m at destination.` : 'On-time arrival projected within published margin.'}
          </p>
        </div>
      </div>
    </div>
  );
};
