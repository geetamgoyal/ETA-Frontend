import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrains } from '../../context/TrainContext';

export const SelectedTrainTrackingPanel: React.FC = () => {
  const navigate = useNavigate();
  const { trains, selectedTrainId } = useTrains();

  const train = trains.find((t) => t.id === selectedTrainId) || trains[0];

  if (!train) {
    return (
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/25 shadow-sm p-6 text-center text-on-surface-variant">
        Select a train to inspect real-time tracking data
      </div>
    );
  }

  const isOnTime = train.status === 'On Time' || train.status === 'Good';
  const isCritical = train.status === 'Critical Delay' || train.status === 'Critical';
  const isRecovering = train.status === 'Recovering';

  const scheduledEta = train.previousEta || '18:20';
  const predictedEta = train.aiPredictedEta || '18:37';
  const delayMins = train.currentDelayMinutes;

  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/25 shadow-sm flex flex-col h-[650px] lg:h-[720px] overflow-hidden">
      {/* Panel Header: Train Info & Badges */}
      <div className="p-4 border-b border-outline-variant/20 bg-surface-container-lowest">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-black px-2 py-0.5 rounded bg-primary text-white tracking-wider">
                #{train.trainNumber}
              </span>
              <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
                {train.type}
              </span>
            </div>
            <h2 className="text-base font-black text-on-surface tracking-tight mt-1 truncate">
              {train.trainName}
            </h2>
            <p className="text-[11px] text-on-surface-variant truncate mt-0.5">
              {train.source} → {train.destination}
            </p>
          </div>

          {/* Operational Status Pill */}
          <div
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold tracking-tight uppercase whitespace-nowrap self-start ${
              isOnTime
                ? 'bg-emerald-500/15 text-emerald-800 border border-emerald-500/30'
                : isCritical
                ? 'bg-red-500/15 text-red-800 border border-red-500/30 animate-pulse'
                : isRecovering
                ? 'bg-sky-500/15 text-sky-800 border border-sky-500/30'
                : 'bg-amber-500/15 text-amber-800 border border-amber-500/30'
            }`}
          >
            {train.status}
          </div>
        </div>

        {/* Operational Status Subtext */}
        {train.operationalStatusText && (
          <div className="mt-2 text-[11px] font-medium text-on-surface-variant flex items-center gap-1.5 bg-surface-container-low px-2.5 py-1 rounded border border-outline-variant/20">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
            <span className="truncate">{train.operationalStatusText}</span>
          </div>
        )}
      </div>

      {/* Scrollable Telemetry & Details Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* ── 1. HERO ETA & DELAY BLOCK ───────────────────────────── */}
        <div className="bg-surface-container-low/70 rounded-xl p-3.5 border border-outline-variant/30 space-y-3">
          <div className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant flex items-center justify-between">
            <span>Arrival Forecast</span>
            <span className="text-primary font-mono">{train.confidencePercent}% Confidence</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {/* Scheduled ETA */}
            <div className="bg-surface-container-lowest p-2.5 rounded-lg border border-outline-variant/20">
              <span className="text-[10px] uppercase font-bold text-on-surface-variant block">
                Scheduled ETA
              </span>
              <span className="text-xl font-black font-mono text-slate-700 block mt-0.5">
                {scheduledEta}
              </span>
              <span className="text-[10px] text-outline">Timetable baseline</span>
            </div>

            {/* AI Predicted ETA */}
            <div className="bg-primary/5 p-2.5 rounded-lg border border-primary/25">
              <span className="text-[10px] uppercase font-bold text-primary block flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">auto_awesome</span>
                Predicted ETA
              </span>
              <span className="text-xl font-black font-mono text-primary block mt-0.5">
                {predictedEta}
              </span>
              <span className="text-[10px] text-primary/80 font-bold">Dynamic forecast</span>
            </div>
          </div>

          {/* Expected Delay Strip */}
          <div className="flex items-center justify-between bg-surface-container-lowest px-3 py-2 rounded-lg border border-outline-variant/20 text-xs">
            <span className="text-on-surface-variant font-medium">Expected Delay</span>
            <span
              className={`font-mono font-bold text-sm ${
                isOnTime
                  ? 'text-emerald-700'
                  : isCritical
                  ? 'text-red-700'
                  : 'text-amber-800'
              }`}
            >
              {isOnTime ? 'On Time' : `+${delayMins} min`}
            </span>
          </div>
        </div>

        {/* ── 2. CURRENT TELEMETRY METRICS GRID ─────────────────────── */}
        <div className="grid grid-cols-2 gap-2.5 text-xs">
          {/* Current Location */}
          <div className="p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/20 col-span-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px] text-secondary">location_on</span>
              Current Location
            </span>
            <span className="text-xs font-bold text-on-surface block mt-1">
              {train.currentLocation}
            </span>
            {train.direction && (
              <span className="text-[10px] text-outline block mt-0.5">
                {train.direction}
              </span>
            )}
          </div>

          {/* Current Speed */}
          <div className="p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/20">
            <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px] text-outline">speed</span>
              Speed / MPS
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-base font-black font-mono text-on-surface">
                {train.currentSpeedKmH}
              </span>
              <span className="text-[10px] text-outline font-mono">
                / {train.maxSpeedKmH} km/h
              </span>
            </div>
          </div>

          {/* Next Station */}
          <div className="p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/20">
            <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px] text-outline">skip_next</span>
              Next Station
            </span>
            <span className="text-xs font-bold text-on-surface block mt-1 truncate">
              {train.nextStation.split('(')[0]}
            </span>
            <span className="text-[10px] text-outline block">
              {train.distanceToNextStationKm ? `${train.distanceToNextStationKm} km away` : 'Approaching'}
            </span>
          </div>

          {/* Remaining Distance & Progress */}
          <div className="p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/20 col-span-2">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
              <span>Journey Completion</span>
              <span className="font-mono text-on-surface">{Math.round(train.journeyProgressPercent)}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(0, train.journeyProgressPercent))}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-outline mt-1 font-mono">
              <span>{Math.round(train.totalDistanceKm - train.remainingDistanceKm)} km traveled</span>
              <span>{Math.round(train.remainingDistanceKm)} km left</span>
            </div>
          </div>
        </div>

        {/* ── 3. DETERMINISTIC ROUTE PROGRESSION CHAIN ──────────────── */}
        <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/20 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant block">
            Station &amp; Block Progression
          </span>
          <div className="space-y-1.5 text-xs">
            {train.stations && train.stations.slice(0, 4).map((st) => {
              const isDeparted = st.status === 'Departed';
              const isCurrent = st.status === 'Current';

              return (
                <div key={st.stationCode} className="flex items-center gap-2">
                  <div className="w-5 flex justify-center">
                    {isDeparted ? (
                      <span className="text-emerald-600 font-bold text-xs">✓</span>
                    ) : isCurrent ? (
                      <span className="text-[12px] animate-pulse">🚆</span>
                    ) : (
                      <span className="text-outline text-xs">○</span>
                    )}
                  </div>
                  <div className="flex-1 flex items-center justify-between min-w-0">
                    <span
                      className={`truncate ${
                        isCurrent
                          ? 'font-bold text-primary'
                          : isDeparted
                          ? 'text-on-surface-variant'
                          : 'text-outline'
                      }`}
                    >
                      {st.stationName}
                    </span>
                    <span className="font-mono text-[10px] text-outline shrink-0">
                      {st.scheduledArrival || st.actualOrPredictedArrival}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Panel Footer: CTA to Open Train Details */}
      <div className="p-3.5 border-t border-outline-variant/20 bg-surface-container-lowest flex flex-col gap-2">
        <button
          onClick={() => navigate(`/train/${train.id}`)}
          className="w-full py-2.5 px-4 rounded-lg bg-primary text-white font-bold text-xs hover:bg-primary-hover active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
        >
          <span>View Train Details &amp; Dynamic ETA</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>

        <div className="flex items-center justify-between text-[10px] text-outline px-1">
          <span>Last Telemetry Sync</span>
          <span className="font-mono text-on-surface-variant font-medium">
            {train.lastUpdatedAt
              ? new Date(train.lastUpdatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
              : 'Live (20s)'}
          </span>
        </div>
      </div>
    </div>
  );
};
