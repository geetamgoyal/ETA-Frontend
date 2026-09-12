import React from 'react';
import { Train } from '../../types/train';
import { clsx } from 'clsx';

interface ScheduledVsPredictedETAHeroProps {
  train: Train;
}

export const ScheduledVsPredictedETAHero: React.FC<ScheduledVsPredictedETAHeroProps> = ({ train }) => {
  const scheduledEta = train.previousEta;
  const predictedEta = train.aiPredictedEta;
  const delay = train.currentDelayMinutes;

  // Status & color coding
  const isMinor = delay > 2 && delay <= 25;
  const isOnTime = delay <= 2;
  const isRecovering = train.status === 'Recovering';

  const delayColor = isOnTime
    ? { text: 'text-emerald-700', bg: 'bg-emerald-500/10 border-emerald-500/30', label: 'On Time' }
    : isRecovering
    ? { text: 'text-sky-700', bg: 'bg-sky-500/10 border-sky-500/30', label: 'Recovering Delay' }
    : isMinor
    ? { text: 'text-amber-700', bg: 'bg-amber-500/10 border-amber-500/30', label: 'Minor Delay' }
    : { text: 'text-red-700', bg: 'bg-red-500/10 border-red-500/30', label: 'Critical Delay' };

  const completedKm = Math.max(0, Math.round(train.totalDistanceKm - train.remainingDistanceKm));

  return (
    <section aria-label="ETA Comparison Hero" className="flex flex-col gap-3">
      {/* 3-Card Core Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1. SCHEDULED ETA (Timetable Baseline) */}
        <div className="relative bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 flex flex-col justify-between overflow-hidden shadow-xs">
          <div className="absolute top-0 left-0 right-0 h-1 bg-slate-400" />
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="ops-label text-[11px] text-on-surface-variant font-bold">
                Scheduled ETA
              </span>
              <span className="text-[10px] text-on-surface-variant bg-surface-container px-2 py-0.5 rounded font-mono">
                Working Timetable
              </span>
            </div>
            <p className="text-[11px] text-on-surface-variant">
              Static baseline published schedule
            </p>
          </div>

          <div className="my-3">
            <div className="data-value text-4xl sm:text-5xl font-black text-slate-800 tracking-tight">
              {scheduledEta}
            </div>
            <p className="text-[11px] text-on-surface-variant mt-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">flag</span>
              Destination: {train.destination.split('(')[0].trim()}
            </p>
          </div>

          <div className="pt-2.5 border-t border-outline-variant/20 flex items-center justify-between text-[11px] text-on-surface-variant">
            <span>Schedule Delta Baseline</span>
            <span className="font-mono font-bold text-slate-700">±0 min reference</span>
          </div>
        </div>

        {/* 2. DYNAMICALLY PREDICTED ETA (AI Forecast) */}
        <div className="relative bg-gradient-to-br from-[#001b3d] to-[#0369a1] text-white border border-[#0284c7]/40 rounded-xl p-5 flex flex-col justify-between overflow-hidden shadow-md ring-1 ring-[#0284c7]/30">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#38bdf8]" />
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-black uppercase tracking-wider text-sky-200 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#38bdf8]">psychology</span>
                Dynamically Predicted ETA
              </span>
              <span className="bg-sky-400/20 text-sky-200 border border-sky-400/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                AI MODEL V2.4
              </span>
            </div>
            <p className="text-[11px] text-sky-200/90 font-medium leading-tight mt-0.5">
              The system is forecasting a different arrival time based on current conditions.
            </p>
          </div>

          <div className="my-3">
            <div className="data-value text-4xl sm:text-5xl font-black text-white tracking-tight flex items-baseline gap-2">
              <span>{predictedEta}</span>
            </div>
            <p className="text-[11px] text-sky-200 mt-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">nest_clock_farsight_analog</span>
              Confidence Range: <strong className="text-white font-mono">{train.expectedEtaRange.min} — {train.expectedEtaRange.max}</strong>
            </p>
          </div>

          <div className="pt-2.5 border-t border-white/15 flex items-center justify-between text-[11px] text-sky-100">
            <span>Model Confidence</span>
            <span className="font-bold text-white bg-sky-500/30 px-2 py-0.5 rounded font-mono">
              {train.confidencePercent}% Reliability
            </span>
          </div>
        </div>

        {/* 3. EXPECTED DELAY & RECOVERY */}
        <div className="relative bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 flex flex-col justify-between overflow-hidden shadow-xs">
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{
              backgroundColor: isOnTime ? '#10b981' : isRecovering ? '#0284c7' : isMinor ? '#f59e0b' : '#ef4444',
            }}
          />
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="ops-label text-[11px] text-on-surface-variant font-bold">
                Expected Delay
              </span>
              <span
                className={clsx(
                  'text-[10px] font-bold px-2 py-0.5 rounded border',
                  delayColor.bg,
                  delayColor.text,
                )}
              >
                {delayColor.label}
              </span>
            </div>
            <p className="text-[11px] text-on-surface-variant">
              Net departure deviation at destination
            </p>
          </div>

          <div className="my-3">
            <div
              className={clsx(
                'data-value text-4xl sm:text-5xl font-black tracking-tight',
                isOnTime ? 'text-emerald-600' : isRecovering ? 'text-sky-600' : isMinor ? 'text-amber-600' : 'text-red-600',
              )}
            >
              {delay <= 0 ? '0 min' : `+${delay} min`}
            </div>
            <p className="text-[11px] text-on-surface-variant mt-1">
              {isOnTime
                ? 'Operating strictly on timetable schedule'
                : isRecovering
                ? 'Speed recovery active on current block section'
                : isMinor
                ? 'Recoverable within scheduled timetable buffer'
                : 'Priority clearance required at upcoming junctions'}
            </p>
          </div>

          <div className="pt-2.5 border-t border-outline-variant/20 flex items-center justify-between text-[11px] text-on-surface-variant">
            <span>Live Section Speed</span>
            <span className="font-mono font-bold text-on-surface">{train.currentSpeedKmH} km/h (MPS {train.maxSpeedKmH})</span>
          </div>
        </div>
      </div>

      {/* Progress & Route Context Bar */}
      <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-xl p-4 flex flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between text-[12px] gap-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-secondary">linear_scale</span>
            <span className="font-bold text-on-surface">Journey Progress:</span>
            <span className="data-value font-bold text-primary">{Math.round(train.journeyProgressPercent)}% completed</span>
          </div>
          <div className="text-[11px] text-on-surface-variant font-mono">
            {completedKm} km traversed • {Math.round(train.remainingDistanceKm)} km to destination
          </div>
        </div>

        {/* Progress Track Bar */}
        <div className="w-full bg-surface-container h-2.5 rounded-full overflow-hidden relative">
          <div
            className="bg-secondary h-full rounded-full transition-all duration-700"
            style={{ width: `${train.journeyProgressPercent}%` }}
          />
        </div>

        <div className="flex justify-between items-center text-[11px] text-on-surface-variant pt-1">
          <span>{train.source.split('(')[0].trim()} (0 km)</span>
          <span className="font-semibold text-primary">● Active: {train.currentLocation}</span>
          <span>{train.destination.split('(')[0].trim()} ({train.totalDistanceKm} km)</span>
        </div>
      </div>
    </section>
  );
};
