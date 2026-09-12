import React, { useState } from 'react';
import { StationBottleneckSummary } from '../../types/history';

interface StationBottleneckAnalysisProps {
  stations: StationBottleneckSummary[];
  onSelectStation: (stationCode: string) => void;
  selectedStationCode?: string;
}

export const StationBottleneckAnalysis: React.FC<StationBottleneckAnalysisProps> = ({
  stations,
  onSelectStation,
  selectedStationCode,
}) => {
  const [activeTab, setActiveTab] = useState<'ALL' | 'MAJOR' | 'HIGH_DWELL'>('ALL');

  const filteredStations = stations.filter((s) => {
    if (activeTab === 'MAJOR') return s.delayFrequencyPercent >= 60;
    if (activeTab === 'HIGH_DWELL') return s.dwellVarianceMinutes >= 2.0;
    return true;
  });

  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/25 p-4 sm:p-5 shadow-sm flex flex-col gap-3.5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">location_on</span>
            <h2 className="text-sm font-bold text-on-surface">
              Junction &amp; Station Bottleneck Analysis
            </h2>
          </div>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Dwell time variations, arrival delay escalations, delay frequencies, and ETA prediction deviations across key junctions.
          </p>
        </div>

        {/* View Filters */}
        <div className="flex items-center bg-surface-container-low rounded-lg p-0.5 border border-outline-variant/30 text-xs font-semibold">
          {[
            { id: 'ALL', label: 'All Junctions' },
            { id: 'MAJOR', label: 'High Delay Freq (≥60%)' },
            { id: 'HIGH_DWELL', label: 'Dwell Variance (≥+2m)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-2.5 py-1 rounded-md text-[11px] transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-surface text-primary font-bold shadow-2xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-outline-variant/25">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-surface-container-low/60 text-on-surface-variant text-[11px] font-bold uppercase tracking-wider border-b border-outline-variant/25">
              <th className="py-2.5 px-3">Station / Junction</th>
              <th className="py-2.5 px-3 text-center">Avg Dwell (Sched vs Act)</th>
              <th className="py-2.5 px-3 text-center">Dwell Variance</th>
              <th className="py-2.5 px-3 text-center">Avg Arrival Delay</th>
              <th className="py-2.5 px-3 text-center">Delay Frequency</th>
              <th className="py-2.5 px-3 text-center">Prediction Deviation</th>
              <th className="py-2.5 px-3">Primary Operational Cause</th>
              <th className="py-2.5 px-3 text-right">Filter</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/15">
            {filteredStations.map((s) => {
              const isSelected = selectedStationCode === s.stationCode;
              return (
                <tr
                  key={s.stationCode}
                  className={`hover:bg-surface-container-low/50 transition-colors ${
                    isSelected ? 'bg-primary/5 border-l-4 border-l-primary' : ''
                  }`}
                >
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded bg-surface-container border border-outline-variant/30 flex items-center justify-center font-mono font-bold text-xs text-primary">
                        {s.stationCode}
                      </div>
                      <div>
                        <div className="font-bold text-on-surface">
                          {s.stationName}
                        </div>
                        <div className="text-[10px] text-on-surface-variant font-mono">
                          {s.zone} · {s.throughputRank}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-3 text-center font-mono">
                    <span className="font-semibold text-on-surface">{s.avgDwellMinutes.toFixed(1)}m</span>
                    <span className="text-[10px] text-on-surface-variant ml-1">({s.scheduledDwellMinutes.toFixed(0)}m sched)</span>
                  </td>

                  <td className="py-3 px-3 text-center font-mono font-bold">
                    <span className={s.dwellVarianceMinutes > 2 ? 'text-rose-700' : s.dwellVarianceMinutes > 0 ? 'text-amber-700' : 'text-emerald-700'}>
                      {s.dwellVarianceMinutes > 0 ? `+${s.dwellVarianceMinutes.toFixed(1)}m` : '0.0m'}
                    </span>
                  </td>

                  <td className="py-3 px-3 text-center font-mono font-bold text-amber-800">
                    +{s.avgDelayArrivalMinutes.toFixed(1)}m
                  </td>

                  <td className="py-3 px-3 text-center">
                    <div className="flex items-center justify-center gap-1.5 font-mono">
                      <span className={`font-bold ${s.delayFrequencyPercent >= 60 ? 'text-rose-700' : s.delayFrequencyPercent >= 40 ? 'text-amber-700' : 'text-emerald-700'}`}>
                        {s.delayFrequencyPercent}%
                      </span>
                      <div className="w-12 h-1.5 rounded-full bg-surface-container-high overflow-hidden hidden sm:block">
                        <div
                          className={`h-full ${s.delayFrequencyPercent >= 60 ? 'bg-rose-500' : s.delayFrequencyPercent >= 40 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                          style={{ width: `${s.delayFrequencyPercent}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-3 text-center font-mono font-bold text-indigo-700">
                    ±{s.avgPredictionDeviationMinutes.toFixed(1)}m
                  </td>

                  <td className="py-3 px-3 text-[11px] text-on-surface-variant max-w-xs leading-relaxed">
                    {s.cause}
                  </td>

                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => onSelectStation(s.stationCode)}
                      className="px-2.5 py-1 rounded text-xs font-semibold bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Filter →
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
