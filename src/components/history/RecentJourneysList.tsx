import React from 'react';
import { HistoricalJourney } from '../../types/history';

interface RecentJourneysListProps {
  journeys: HistoricalJourney[];
  onSelectJourney: (journey: HistoricalJourney) => void;
  selectedJourneyId?: string;
}

export const RecentJourneysList: React.FC<RecentJourneysListProps> = ({
  journeys,
  onSelectJourney,
  selectedJourneyId,
}) => {
  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/25 p-4 sm:p-5 shadow-sm flex flex-col gap-3.5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">list_alt</span>
            <h2 className="text-sm font-bold text-on-surface">
              Evaluated Previous Journeys Log
            </h2>
          </div>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Click any journey row to inspect full station dwell progression, delay accumulation curve, and dynamic ETA evolution.
          </p>
        </div>

        <div className="text-xs font-semibold text-on-surface-variant">
          {journeys.length} journeys displayed
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-outline-variant/25">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-surface-container-low/60 text-on-surface-variant text-[11px] font-bold uppercase tracking-wider border-b border-outline-variant/25">
              <th className="py-2.5 px-3">Journey Date</th>
              <th className="py-2.5 px-3">Train</th>
              <th className="py-2.5 px-3">Corridor</th>
              <th className="py-2.5 px-3 text-center">Timetable Arrival</th>
              <th className="py-2.5 px-3 text-center">Actual Arrival</th>
              <th className="py-2.5 px-3 text-center">Final Delay</th>
              <th className="py-2.5 px-3 text-center">ETA Error</th>
              <th className="py-2.5 px-3 text-center">Punctuality</th>
              <th className="py-2.5 px-3 text-right">Inspection</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/15">
            {journeys.map((j) => {
              const isSelected = selectedJourneyId === j.id;
              return (
                <tr
                  key={j.id}
                  onClick={() => onSelectJourney(j)}
                  className={`hover:bg-surface-container-low/60 transition-colors cursor-pointer ${
                    isSelected ? 'bg-primary/5 border-l-4 border-l-primary' : ''
                  }`}
                >
                  <td className="py-3 px-3 font-mono font-medium text-on-surface">
                    {j.journeyDate}
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-primary font-bold">#{j.trainNumber}</span>
                      <span className="font-bold text-on-surface">{j.trainName}</span>
                    </div>
                    <div className="text-[10px] text-on-surface-variant font-mono">
                      {j.origin} → {j.destination}
                    </div>
                  </td>
                  <td className="py-3 px-3 text-on-surface-variant max-w-xs truncate">
                    {j.routeName}
                  </td>
                  <td className="py-3 px-3 text-center font-mono text-on-surface">
                    {j.scheduledArrival}
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-on-surface">
                    {j.actualArrival}
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-bold">
                    <span className={j.finalDelayMinutes > 15 ? 'text-rose-700' : j.finalDelayMinutes > 0 ? 'text-amber-700' : 'text-emerald-700'}>
                      {j.finalDelayMinutes === 0 ? 'On Time' : `+${j.finalDelayMinutes}m`}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-indigo-700">
                    ±{j.finalEtaErrorMinutes}m
                  </td>
                  <td className="py-3 px-3 text-center">
                    {j.onTime ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-800 border border-emerald-500/25">
                        ON TIME
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-800 border border-amber-500/25">
                        DELAYED
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectJourney(j);
                      }}
                      className="px-2.5 py-1 rounded text-xs font-semibold bg-primary text-on-primary hover:bg-primary/90 transition-colors shadow-2xs cursor-pointer inline-flex items-center gap-1"
                    >
                      <span>Inspect</span>
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
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
