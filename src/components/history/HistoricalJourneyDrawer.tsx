import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HistoricalJourney } from '../../types/history';
import { useTrains } from '../../context/TrainContext';

interface HistoricalJourneyDrawerProps {
  journey: HistoricalJourney | null;
  isOpen: boolean;
  onClose: () => void;
}

export const HistoricalJourneyDrawer: React.FC<HistoricalJourneyDrawerProps> = ({
  journey,
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const { trains } = useTrains();

  if (!isOpen || !journey) return null;

  // Check if this train is currently active in live fleet
  const activeTrain = trains.find((t) => t.trainNumber === journey.trainNumber);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs transition-opacity animate-fade-in">
      <div
        className="w-full max-w-2xl bg-surface-container-lowest h-full shadow-2xl border-l border-outline-variant/30 flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-outline-variant/25 bg-surface-container-low/40 flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                #{journey.trainNumber}
              </span>
              <h2 className="text-base sm:text-lg font-black text-on-surface">
                {journey.trainName}
              </h2>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-semibold">
                {journey.type}
              </span>
            </div>
            <div className="text-xs text-on-surface-variant mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>Date: <strong className="text-on-surface font-mono">{journey.journeyDate}</strong></span>
              <span>•</span>
              <span>Corridor: <strong className="text-on-surface">{journey.routeName}</strong></span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-surface-container-low border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col gap-5">
          {/* 1. Scheduled vs Predicted vs Actual Arrival Comparison Hero */}
          <div className="grid grid-cols-3 gap-2.5 bg-surface-container-low/50 rounded-xl p-3.5 border border-outline-variant/25">
            <div className="bg-surface-container-lowest rounded-lg p-2.5 border border-outline-variant/15 text-center">
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                Scheduled Timetable
              </span>
              <span className="text-lg sm:text-xl font-black font-mono text-on-surface block mt-1">
                {journey.scheduledArrival}
              </span>
              <span className="text-[10px] text-on-surface-variant">Timetable Baseline</span>
            </div>

            <div className="bg-surface-container-lowest rounded-lg p-2.5 border border-indigo-500/25 text-center">
              <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider block">
                Predicted Arrival
              </span>
              <span className="text-lg sm:text-xl font-black font-mono text-indigo-700 block mt-1">
                {journey.stations[journey.stations.length - 1]?.predictedArrival || journey.actualArrival}
              </span>
              <span className="text-[10px] text-indigo-800 font-semibold font-mono">
                Error: ±{journey.finalEtaErrorMinutes}m
              </span>
            </div>

            <div className="bg-surface-container-lowest rounded-lg p-2.5 border border-outline-variant/15 text-center">
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                Observed Actual
              </span>
              <span className="text-lg sm:text-xl font-black font-mono text-on-surface block mt-1">
                {journey.actualArrival}
              </span>
              <span className={`text-[10px] font-bold font-mono ${journey.finalDelayMinutes > 0 ? 'text-amber-800' : 'text-emerald-800'}`}>
                {journey.finalDelayMinutes > 0 ? `+${journey.finalDelayMinutes}m Delay` : 'On Time'}
              </span>
            </div>
          </div>

          {/* 2. Station-by-Station Progression & Dwell Variances */}
          <div className="bg-surface-container-low/30 rounded-xl p-3.5 border border-outline-variant/25 flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[16px]">timeline</span>
                Station Schedule vs. Actual Dwell Progression
              </h3>
              <span className="text-[10px] font-mono text-on-surface-variant">
                {journey.stations.length} Station Stops
              </span>
            </div>

            <div className="overflow-x-auto rounded-lg border border-outline-variant/20">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-surface-container-low/80 text-on-surface-variant text-[10px] font-bold uppercase tracking-wider border-b border-outline-variant/20">
                    <th className="py-2 px-2.5">Station</th>
                    <th className="py-2 px-2 text-center">Sched Arr</th>
                    <th className="py-2 px-2 text-center">Act Arr</th>
                    <th className="py-2 px-2 text-center">Dwell (Act / Sched)</th>
                    <th className="py-2 px-2 text-center">Section Delay</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/15">
                  {journey.stations.map((s, idx) => (
                    <tr key={s.stationCode} className="hover:bg-surface-container-low/40">
                      <td className="py-2 px-2.5 font-medium text-on-surface">
                        <span className="font-mono font-bold text-primary mr-1.5">#{idx + 1}</span>
                        {s.stationName} ({s.stationCode})
                      </td>
                      <td className="py-2 px-2 text-center font-mono text-on-surface-variant">
                        {s.scheduledArrival}
                      </td>
                      <td className="py-2 px-2 text-center font-mono font-bold text-on-surface">
                        {s.actualArrival}
                      </td>
                      <td className="py-2 px-2 text-center font-mono">
                        <span className={s.actualDwellMinutes > s.scheduledDwellMinutes ? 'text-amber-700 font-bold' : 'text-on-surface'}>
                          {s.actualDwellMinutes}m
                        </span>
                        <span className="text-[10px] text-on-surface-variant ml-1">
                          ({s.scheduledDwellMinutes}m)
                        </span>
                      </td>
                      <td className="py-2 px-2 text-center font-mono font-bold">
                        <span className={s.delayMinutes > 10 ? 'text-rose-700' : s.delayMinutes > 0 ? 'text-amber-700' : 'text-emerald-700'}>
                          {s.delayMinutes > 0 ? `+${s.delayMinutes}m` : '0m'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 3. Delay Accumulation Progression */}
          <div className="bg-surface-container-low/30 rounded-xl p-3.5 border border-outline-variant/25 flex flex-col gap-2">
            <h3 className="text-xs font-bold text-on-surface flex items-center gap-1.5">
              <span className="material-symbols-outlined text-amber-600 text-[16px]">show_chart</span>
              Delay Accumulation Profile Across Corridor
            </h3>
            <p className="text-[11px] text-on-surface-variant">
              Accumulated delay progression at each block handover and station stop during this journey.
            </p>

            <div className="h-28 w-full relative mt-2">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 400 80" preserveAspectRatio="none">
                <line x1="0" y1="20" x2="400" y2="20" stroke="#94a3b8" strokeOpacity="0.15" strokeDasharray="2 2" />
                <line x1="0" y1="50" x2="400" y2="50" stroke="#94a3b8" strokeOpacity="0.15" strokeDasharray="2 2" />
                <line x1="0" y1="75" x2="400" y2="75" stroke="#94a3b8" strokeOpacity="0.2" />

                {/* Delay polyline */}
                {journey.stations.length > 1 && (
                  <polyline
                    points={journey.stations.map((s, i) => {
                      const maxD = Math.max(1, journey.finalDelayMinutes, 20);
                      const x = (i / (journey.stations.length - 1)) * 400;
                      const y = 75 - (s.delayMinutes / maxD) * 60;
                      return `${x},${y}`;
                    }).join(' ')}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}

                {/* Data points */}
                {journey.stations.map((s, i) => {
                  const maxD = Math.max(1, journey.finalDelayMinutes, 20);
                  const x = (i / (journey.stations.length - 1)) * 400;
                  const y = 75 - (s.delayMinutes / maxD) * 60;
                  return (
                    <g key={s.stationCode}>
                      <circle cx={x} cy={y} r="4" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
                      <text x={x} y={y - 7} fontSize="8" fontFamily="monospace" fontWeight="bold" fill="#78350f" textAnchor="middle">
                        +{s.delayMinutes}m
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="flex justify-between items-center text-[9px] font-mono text-on-surface-variant border-t border-outline-variant/15 pt-1.5">
              {journey.stations.map((s) => (
                <span key={s.stationCode}>{s.stationCode}</span>
              ))}
            </div>
          </div>

          {/* 4. Major Operational Events Log */}
          {journey.majorEvents.length > 0 && (
            <div className="bg-surface-container-low/30 rounded-xl p-3.5 border border-outline-variant/25 flex flex-col gap-2.5">
              <h3 className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                <span className="material-symbols-outlined text-rose-600 text-[16px]">report_problem</span>
                Major Operational Events Encountered ({journey.majorEvents.length})
              </h3>

              <div className="space-y-2">
                {journey.majorEvents.map((evt, idx) => (
                  <div key={idx} className="bg-surface-container-lowest rounded-lg p-2.5 border border-outline-variant/20 flex items-start gap-2.5">
                    <span className="font-mono text-[11px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                      {evt.time}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                        <span>{evt.location}</span>
                        <span className="text-[10px] font-mono px-1 rounded bg-amber-500/10 text-amber-800 font-semibold">
                          +{evt.delayImpactMinutes}m impact
                        </span>
                      </div>
                      <p className="text-[11px] text-on-surface-variant mt-0.5 leading-relaxed">
                        {evt.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. Dynamic ETA Changes During Journey */}
          {journey.etaEvolutionTicks.length > 0 && (
            <div className="bg-surface-container-low/30 rounded-xl p-3.5 border border-outline-variant/25 flex flex-col gap-2.5">
              <h3 className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                <span className="material-symbols-outlined text-indigo-600 text-[16px]">psychology</span>
                Dynamic ETA Recalculation History ({journey.etaEvolutionTicks.length} Ticks)
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {journey.etaEvolutionTicks.map((tick, idx) => (
                  <div key={idx} className="bg-surface-container-lowest rounded-lg p-2 border border-outline-variant/15 text-center">
                    <span className="text-[10px] font-mono text-on-surface-variant block">
                      at {tick.timestamp}
                    </span>
                    <span className="text-xs font-mono font-black text-indigo-700 block mt-0.5">
                      ETA {tick.predictedArrival}
                    </span>
                    <span className="text-[10px] font-mono text-on-surface-variant">
                      +{tick.delayMinutes}m ({tick.confidence}% conf)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer with Actions */}
        <div className="p-4 border-t border-outline-variant/25 bg-surface-container-low/50 flex flex-wrap items-center justify-between gap-2.5">
          {activeTrain ? (
            <button
              onClick={() => {
                onClose();
                navigate(`/train/${activeTrain.trainNumber}`);
              }}
              className="px-3.5 py-2 rounded-lg bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">insights</span>
              <span>Inspect Live Telemetry in Train Details →</span>
            </button>
          ) : (
            <div className="text-xs text-on-surface-variant">
              Train is not currently active on live tracking.
            </div>
          )}

          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-surface-container-low border border-outline-variant/30 text-xs font-bold text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
          >
            Close Drawer
          </button>
        </div>
      </div>
    </div>
  );
};
