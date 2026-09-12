import React from 'react';
import { Train } from '../../types/train';
import { clsx } from 'clsx';

interface JourneyVisualizerProps {
  train?: Train;
}

export const JourneyVisualizer: React.FC<JourneyVisualizerProps> = ({ train }) => {
  if (!train) return null;

  const { stations, journeyProgressPercent, trainName, currentDelayMinutes } = train;

  if (!stations || stations.length === 0) return null;

  const progress = Math.min(100, Math.max(0, journeyProgressPercent));

  // Milestone stations: source, key stops, destination
  const milestones = (() => {
    if (stations.length <= 4) return stations;
    // Always include first, last, and current + 1-2 surrounding
    const first = stations[0];
    const last = stations[stations.length - 1];
    const currentIdx = stations.findIndex((s) =>
      s.status === 'Current' || s.status === 'Upcoming',
    );
    const midIdx = currentIdx > 0 ? currentIdx : Math.floor(stations.length / 2);
    const mid = stations[midIdx];
    const before = midIdx > 1 ? stations[midIdx - 1] : null;
    const result = [first, before, mid, last].filter(Boolean);
    // deduplicate
    return result.filter((s, i, arr) => arr.indexOf(s) === i);
  })();

  const getStationStyle = (status: string) => {
    switch (status) {
      case 'Departed': return { dot: 'bg-secondary border-secondary', label: 'text-on-surface-variant' };
      case 'Current':  return { dot: 'bg-primary border-primary ring-2 ring-primary/20', label: 'text-primary font-bold' };
      case 'Destination': return { dot: 'bg-surface-container-highest border-outline-variant', label: 'text-secondary font-bold' };
      default: return { dot: 'bg-white border-outline-variant', label: 'text-on-surface-variant' };
    }
  };

  return (
    <div className="bg-surface-container-lowest rounded-lg border border-outline-variant/60 p-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-[13px] font-bold text-on-surface">{trainName} — Remaining Journey</h3>
          <p className="text-[11px] text-on-surface-variant mt-0.5">
            {train.source.split('(')[0].trim()} → {train.destination.split('(')[0].trim()}
          </p>
        </div>
        <div className="text-right">
          <p className="data-value text-[12px] font-bold text-on-surface">
            {train.remainingDistanceKm.toFixed(0)} km remaining
          </p>
          <p
            className={clsx(
              'text-[11px] font-semibold mt-0.5',
              currentDelayMinutes === 0
                ? 'text-status-ok-text'
                : currentDelayMinutes <= 15
                ? 'text-status-warn-text'
                : 'text-status-critical-text',
            )}
          >
            {currentDelayMinutes === 0
              ? 'Running on time'
              : `${currentDelayMinutes} min delay`}
          </p>
        </div>
      </div>

      {/* Progress track */}
      <div className="relative">
        {/* Background track */}
        <div className="h-2 bg-surface-container rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Animated train head */}
        <div
          className="absolute -top-3 -translate-x-1/2 transition-all duration-700"
          style={{ left: `${Math.min(Math.max(progress, 2), 98)}%` }}
        >
          <div className="w-8 h-8 rounded-md bg-primary text-white flex items-center justify-center shadow-md">
            <span className="material-symbols-outlined text-[16px]">directions_transit</span>
          </div>
        </div>

        {/* Station dots — evenly spaced across the track */}
        <div className="flex justify-between mt-4">
          {milestones.map((station) => {
            if (!station) return null;
            const style = getStationStyle(station.status);
            return (
              <div key={station.stationCode} className="flex flex-col items-center gap-1.5 relative">
                {/* Dot */}
                <div
                  className={clsx(
                    'w-3 h-3 rounded-full border-2 flex-shrink-0',
                    style.dot,
                  )}
                />

                {/* Station name */}
                <div className="text-center" style={{ maxWidth: '80px' }}>
                  <p
                    className={clsx(
                      'text-[10px] leading-tight',
                      style.label,
                    )}
                  >
                    {station.stationName.replace('(Dest)', '').trim()}
                  </p>
                  <p className="text-[9px] text-on-surface-variant/60 font-mono">
                    {station.stationCode}
                  </p>
                </div>

                {/* ETA badge for current/upcoming */}
                {(station.status === 'Current' || station.status === 'Upcoming') && (
                  <span className="text-[9px] font-bold text-primary bg-primary/8 border border-primary/20 px-1 py-0.5 rounded font-mono">
                    ETA {station.actualOrPredictedArrival}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Journey stats row */}
      <div className="grid grid-cols-4 gap-3 mt-5 pt-4 border-t border-outline-variant/30">
        {[
          { label: 'Journey Progress', value: `${progress.toFixed(0)}%`, icon: 'route' },
          { label: 'Current Speed', value: `${train.currentSpeedKmH} km/h`, icon: 'speed' },
          { label: 'AI Predicted ETA', value: train.aiPredictedEta, icon: 'schedule' },
          { label: 'Confidence', value: `${train.confidencePercent}%`, icon: 'psychology' },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <span className="material-symbols-outlined text-[16px] text-secondary block mb-1">
              {stat.icon}
            </span>
            <p className="data-value text-[14px] font-bold text-on-surface">{stat.value}</p>
            <p className="text-[9px] text-on-surface-variant mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
