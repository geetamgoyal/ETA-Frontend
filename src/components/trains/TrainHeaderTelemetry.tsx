import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Train, TrainStatus } from '../../types/train';
import { clsx } from 'clsx';

interface TrainHeaderTelemetryProps {
  train: Train;
  allTrains: Train[];
  onSelectTrain: (trainId: string) => void;
  lastUpdatedAt?: Date;
  isSimulating?: boolean;
}

function getStatusBadgeClass(status: TrainStatus): { bg: string; text: string; dot: string; label: string } {
  switch (status) {
    case 'On Time':
    case 'Good':
      return { bg: 'bg-emerald-500/10 border-emerald-500/30', text: 'text-emerald-700', dot: 'bg-emerald-500', label: 'Running on schedule' };
    case 'Minor Delay':
    case 'Warning':
    case 'Delayed':
      return { bg: 'bg-amber-500/10 border-amber-500/30', text: 'text-amber-700', dot: 'bg-amber-500', label: 'Running with predicted delay' };
    case 'Critical Delay':
    case 'Critical':
      return { bg: 'bg-red-500/10 border-red-500/30', text: 'text-red-700', dot: 'bg-red-500', label: 'Critical delay — operational hold' };
    case 'Recovering':
      return { bg: 'bg-sky-500/10 border-sky-500/30', text: 'text-sky-700', dot: 'bg-sky-500', label: 'Running with predicted delay (recovering)' };
    default:
      return { bg: 'bg-slate-500/10 border-slate-500/30', text: 'text-slate-700', dot: 'bg-slate-500', label: 'Active in transit' };
  }
}

export const TrainHeaderTelemetry: React.FC<TrainHeaderTelemetryProps> = ({
  train,
  allTrains,
  onSelectTrain,
  lastUpdatedAt,
  isSimulating = true,
}) => {
  const navigate = useNavigate();
  const statusStyle = getStatusBadgeClass(train.status);
  const statusText = train.operationalStatusText || statusStyle.label;
  const lastUpdStr = lastUpdatedAt
    ? lastUpdatedAt.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : '—';

  // Distance to next station calculation fallback
  const distToNext = train.distanceToNextStationKm ?? (
    train.stations && train.stations.length > 0
      ? Math.max(12, Math.round(train.remainingDistanceKm / (train.stations.length - 1)))
      : 45
  );

  return (
    <div className="flex flex-col gap-4 bg-surface-container-lowest border border-outline-variant/50 rounded-xl p-4 md:p-6 shadow-xs">
      {/* ── SECTION 1: TRAIN HEADER ────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 pb-4 border-b border-outline-variant/30">
        <div className="flex flex-col gap-2">
          {/* Back button + Quick switcher */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-1.5 text-[12px] font-semibold text-secondary hover:text-secondary/80 bg-surface-container hover:bg-surface-container-high px-3 py-1.5 rounded-lg border border-outline-variant/40 transition-colors"
              title="Return to Operations Dashboard"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Operations Dashboard
            </button>

            {/* Quick Train Selector Dropdown */}
            <div className="flex items-center gap-2 bg-surface-container-low border border-outline-variant/60 rounded-lg px-2.5 py-1 shadow-2xs">
              <span className="material-symbols-outlined text-secondary text-[16px]">train</span>
              <label htmlFor="train-header-switcher" className="sr-only">Switch Monitored Train</label>
              <select
                id="train-header-switcher"
                value={train.id}
                onChange={(e) => onSelectTrain(e.target.value)}
                className="bg-transparent text-[12px] font-bold text-primary outline-none cursor-pointer py-0.5"
              >
                {allTrains.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.trainNumber} — {t.trainName} ({t.status})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Primary Train Number, Name & Route */}
          <div className="mt-1">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="data-value text-xl md:text-2xl font-black px-3 py-0.5 rounded-lg bg-primary text-white tracking-wider">
                {train.trainNumber}
              </span>
              <h1 className="text-2xl md:text-3xl font-black text-on-surface tracking-tight">
                {train.trainName}
              </h1>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant uppercase tracking-wider">
                {train.type}
              </span>
            </div>

            {/* Origin → Destination */}
            <div className="flex items-center gap-2 mt-1.5 text-sm md:text-base font-semibold text-on-surface flex-wrap">
              <span className="text-primary font-bold">{train.source}</span>
              <span className="material-symbols-outlined text-[18px] text-secondary">trending_flat</span>
              <span className="text-primary font-bold">{train.destination}</span>
              <span className="text-outline-variant">•</span>
              <span className="text-xs font-medium text-on-surface-variant">{train.zone}</span>
            </div>

            {/* Operational Status Text Banner */}
            <div className="mt-2 flex items-center gap-2 flex-wrap">
              <div
                className={clsx(
                  'flex items-center gap-2 text-xs md:text-sm font-bold px-3 py-1 rounded-md border',
                  statusStyle.bg,
                  statusStyle.text,
                )}
              >
                <span className={clsx('w-2.5 h-2.5 rounded-full', statusStyle.dot, train.status === 'Critical Delay' && 'animate-pulse')} />
                <span>{statusText}</span>
              </div>
              <span className="text-xs text-on-surface-variant font-mono">
                Timetable Delay: <strong>{train.currentDelayMinutes > 0 ? `+${train.currentDelayMinutes} min` : 'On Schedule'}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Right: Live Telemetry Status & Clock */}
        <div className="flex flex-col items-start lg:items-end gap-2">
          <div className="flex items-center gap-2">
            {isSimulating && (
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>LIVE NCR TELEMETRY FEED</span>
              </div>
            )}
            <div className="text-[11px] text-on-surface-variant font-mono bg-surface-container px-2.5 py-1 rounded border border-outline-variant/30">
              Updated: {lastUpdStr}
            </div>
          </div>
          <p className="text-[10px] text-on-surface-variant text-right hidden lg:block">
            Automatic block signaling &amp; GPS tracking active
          </p>
        </div>
      </div>

      {/* ── SECTION 3: CURRENT TRAIN STATUS ────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="ops-label text-[11px] font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-secondary">sensors</span>
            Current Train Status &amp; Telemetry
          </h2>
          <span className="text-[10px] text-on-surface-variant">
            Direction: <strong className="font-mono text-on-surface">{train.direction || `Down (${train.source.split('(')[0].trim()} → ${train.destination.split('(')[0].trim()})`}</strong>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {/* 1. Current Location */}
          <div className="bg-surface-container-low/80 border border-outline-variant/40 rounded-lg p-3 flex flex-col justify-between">
            <span className="ops-label text-[10px] text-on-surface-variant">Current Location</span>
            <div className="my-1">
              <span className="font-bold text-[14px] text-primary block truncate" title={train.currentLocation}>
                {train.currentLocation}
              </span>
              <span className="text-[11px] text-on-surface-variant font-medium">
                {train.platform || 'Main Line Track'}
              </span>
            </div>
            <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> GPS Tracked
            </span>
          </div>

          {/* 2. Current Speed */}
          <div className="bg-surface-container-low/80 border border-outline-variant/40 rounded-lg p-3 flex flex-col justify-between">
            <span className="ops-label text-[10px] text-on-surface-variant">Current Speed</span>
            <div className="my-1 flex items-baseline gap-1">
              <span className="data-value text-2xl font-black text-on-surface">
                {train.currentSpeedKmH}
              </span>
              <span className="text-xs text-on-surface-variant font-semibold">km/h</span>
            </div>
            <span className="text-[10px] text-on-surface-variant font-mono">
              Section MPS: {train.maxSpeedKmH} km/h
            </span>
          </div>

          {/* 3. Next Station */}
          <div className="bg-surface-container-low/80 border border-outline-variant/40 rounded-lg p-3 flex flex-col justify-between">
            <span className="ops-label text-[10px] text-on-surface-variant">Next Station</span>
            <div className="my-1">
              <span className="font-bold text-[14px] text-on-surface block truncate" title={train.nextStation}>
                {train.nextStation}
              </span>
              <span className="text-[11px] text-on-surface-variant">
                Approaching block
              </span>
            </div>
            <span className="text-[10px] text-secondary font-semibold">
              Dist: {distToNext} km
            </span>
          </div>

          {/* 4. Distance to Next Station */}
          <div className="bg-surface-container-low/80 border border-outline-variant/40 rounded-lg p-3 flex flex-col justify-between">
            <span className="ops-label text-[10px] text-on-surface-variant">Distance to Next</span>
            <div className="my-1 flex items-baseline gap-1">
              <span className="data-value text-2xl font-black text-on-surface">
                {distToNext}
              </span>
              <span className="text-xs text-on-surface-variant font-semibold">km</span>
            </div>
            <span className="text-[10px] text-on-surface-variant font-mono">
              ~{Math.round((distToNext / Math.max(train.currentSpeedKmH, 40)) * 60)} min run time
            </span>
          </div>

          {/* 5. Current Delay */}
          <div className="bg-surface-container-low/80 border border-outline-variant/40 rounded-lg p-3 flex flex-col justify-between">
            <span className="ops-label text-[10px] text-on-surface-variant">Current Delay</span>
            <div className="my-1">
              <span
                className={clsx(
                  'data-value text-2xl font-black',
                  train.currentDelayMinutes > 20
                    ? 'text-red-600'
                    : train.currentDelayMinutes > 2
                    ? 'text-amber-600'
                    : 'text-emerald-600',
                )}
              >
                {train.currentDelayMinutes <= 0 ? '0 min' : `+${train.currentDelayMinutes} min`}
              </span>
            </div>
            <span className="text-[10px] text-on-surface-variant">
              {train.status === 'Recovering' ? '▼ Recovering delay' : train.currentDelayMinutes > 0 ? '▲ Delayed at section' : '● Strictly on schedule'}
            </span>
          </div>

          {/* 6. Last Update & Direction */}
          <div className="bg-surface-container-low/80 border border-outline-variant/40 rounded-lg p-3 flex flex-col justify-between">
            <span className="ops-label text-[10px] text-on-surface-variant">Direction &amp; Telemetry</span>
            <div className="my-1">
              <span className="text-xs font-bold text-on-surface block truncate">
                {train.direction ? train.direction.split('(')[0].trim() : 'Down Direction'}
              </span>
              <span className="text-[10px] text-on-surface-variant font-mono">
                Ping: {lastUpdStr}
              </span>
            </div>
            <span className="text-[10px] text-secondary font-bold truncate">
              {train.zone}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
