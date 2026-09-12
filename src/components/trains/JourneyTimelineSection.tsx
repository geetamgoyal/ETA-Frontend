import React from 'react';
import { Train, StationStop } from '../../types/train';
import { clsx } from 'clsx';

interface JourneyTimelineSectionProps {
  train: Train;
}

export const JourneyTimelineSection: React.FC<JourneyTimelineSectionProps> = ({ train }) => {
  const stations: StationStop[] = train.stations || [];

  return (
    <section aria-label="Journey Timeline" className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 flex flex-col gap-4 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-outline-variant/30">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[20px]">alt_route</span>
            <h3 className="text-base font-bold text-on-surface">
              Journey Station-by-Station Timeline
            </h3>
          </div>
          <p className="text-[11px] text-on-surface-variant mt-0.5">
            Origin → Departed Stations → Current Position → Upcoming Halts → Terminus
          </p>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-on-surface-variant">
          <span className="bg-surface-container px-2 py-0.5 rounded font-mono">
            {stations.length} Station Stops
          </span>
          <span className="text-secondary font-bold">
            {Math.round(train.journeyProgressPercent)}% Traversed
          </span>
        </div>
      </div>

      {/* Timeline List / Stepper */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-outline-variant/40">
        {stations.map((st, idx) => {
          const isDeparted = st.status === 'Departed' || (idx === 0 && train.journeyProgressPercent > 5);
          const isCurrent = st.status === 'Current' || st.stationName.toLowerCase().includes(train.currentLocation.toLowerCase());
          const isDestination = st.status === 'Destination' || idx === stations.length - 1;
          const isUpcoming = !isDeparted && !isCurrent;

          return (
            <div key={st.stationCode} className="relative flex items-start gap-4">
              {/* Timeline Marker Node */}
              <div
                className={clsx(
                  'absolute -left-6 sm:-left-8 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 z-10 transition-all',
                  isCurrent
                    ? 'bg-primary border-white text-white shadow-md ring-4 ring-primary/20 scale-110'
                    : isDeparted
                    ? 'bg-emerald-500 border-white text-white'
                    : isDestination
                    ? 'bg-indigo-600 border-white text-white'
                    : 'bg-surface-container-high border-outline-variant text-on-surface-variant',
                )}
              >
                {isCurrent ? (
                  <span className="material-symbols-outlined text-[16px] animate-pulse">
                    directions_subway
                  </span>
                ) : isDeparted ? (
                  <span className="material-symbols-outlined text-[14px]">check</span>
                ) : isDestination ? (
                  <span className="material-symbols-outlined text-[14px]">flag</span>
                ) : (
                  <span className="text-[10px] font-bold font-mono">{idx + 1}</span>
                )}
              </div>

              {/* Station Details Card */}
              <div
                className={clsx(
                  'flex-1 border rounded-xl p-3.5 sm:p-4 transition-all',
                  isCurrent
                    ? 'bg-primary/5 border-primary/40 shadow-xs ring-1 ring-primary/20'
                    : isDestination
                    ? 'bg-indigo-500/5 border-indigo-500/30'
                    : 'bg-surface-container-low/50 border-outline-variant/30',
                )}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  {/* Station Name & Code */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="data-value text-xs font-black px-2 py-0.5 rounded bg-surface-container text-on-surface border border-outline-variant/40">
                      {st.stationCode}
                    </span>
                    <h4 className={clsx('text-sm font-bold', isCurrent ? 'text-primary' : 'text-on-surface')}>
                      {st.stationName}
                    </h4>

                    {isCurrent && (
                      <span className="bg-primary text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-xs animate-pulse">
                        <span>🚆 Current Location ({train.currentSpeedKmH} km/h)</span>
                      </span>
                    )}

                    {isDeparted && (
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded flex items-center gap-1">
                        <span>✓ Completed</span>
                      </span>
                    )}

                    {isDestination && (
                      <span className="text-[11px] font-bold text-indigo-800 bg-indigo-100 border border-indigo-300 px-2 py-0.5 rounded flex items-center gap-1">
                        <span>○ Destination</span>
                      </span>
                    )}

                    {isUpcoming && !isDestination && (
                      <span className="text-[11px] font-bold text-slate-700 bg-slate-100 border border-slate-300 px-2 py-0.5 rounded flex items-center gap-1">
                        <span>○ Upcoming</span>
                      </span>
                    )}
                  </div>

                  {/* Distance & Platform */}
                  <div className="text-[11px] text-on-surface-variant font-mono">
                    {st.distanceKm} km from origin {st.platform ? `• ${st.platform}` : ''}
                  </div>
                </div>

                {/* Timings Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 pt-2.5 border-t border-outline-variant/20 text-[11px]">
                  {/* Scheduled Arrival */}
                  <div>
                    <span className="text-on-surface-variant block text-[10px]">Scheduled Arr:</span>
                    <span className="font-mono font-semibold text-on-surface">
                      {st.scheduledArrival}
                    </span>
                  </div>

                  {/* Scheduled Departure */}
                  <div>
                    <span className="text-on-surface-variant block text-[10px]">Scheduled Dep:</span>
                    <span className="font-mono font-semibold text-on-surface">
                      {st.scheduledDeparture}
                    </span>
                  </div>

                  {/* Actual / Predicted Arrival */}
                  <div>
                    <span className="text-on-surface-variant block text-[10px]">
                      {isDeparted ? 'Actual Arrival:' : 'AI Predicted Arr:'}
                    </span>
                    <span className={clsx('font-mono font-black', isDeparted ? 'text-on-surface' : 'text-primary')}>
                      {st.actualOrPredictedArrival}
                    </span>
                  </div>

                  {/* Delay at Station */}
                  <div>
                    <span className="text-on-surface-variant block text-[10px]">Station Delay:</span>
                    <span
                      className={clsx(
                        'font-mono font-bold px-1.5 py-0.5 rounded text-[10px]',
                        st.predictedDelayMinutes > 20
                          ? 'text-red-700 bg-red-100'
                          : st.predictedDelayMinutes > 2
                          ? 'text-amber-700 bg-amber-100'
                          : 'text-emerald-700 bg-emerald-100',
                      )}
                    >
                      {st.predictedDelayMinutes <= 0 ? 'On Time' : `+${st.predictedDelayMinutes} min`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
