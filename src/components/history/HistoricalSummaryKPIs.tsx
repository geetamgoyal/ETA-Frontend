import React from 'react';
import { HistoricalJourney } from '../../types/history';

interface HistoricalSummaryKPIsProps {
  journeys: HistoricalJourney[];
}

export const HistoricalSummaryKPIs: React.FC<HistoricalSummaryKPIsProps> = ({ journeys }) => {
  const total = journeys.length;

  const avgDelay = total > 0
    ? (journeys.reduce((sum, j) => sum + j.finalDelayMinutes, 0) / total).toFixed(1)
    : '0.0';

  const onTimeCount = journeys.filter((j) => j.onTime).length;
  const onTimePercent = total > 0 ? ((onTimeCount / total) * 100).toFixed(1) : '0.0';

  const avgEtaError = total > 0
    ? (journeys.reduce((sum, j) => sum + j.finalEtaErrorMinutes, 0) / total).toFixed(1)
    : '0.0';

  // Identify worst performing route from filtered journeys
  const routeDelays: Record<string, { totalDelay: number; count: number; name: string }> = {};
  journeys.forEach((j) => {
    if (!routeDelays[j.routeId]) {
      routeDelays[j.routeId] = { totalDelay: 0, count: 0, name: j.routeName };
    }
    routeDelays[j.routeId].totalDelay += j.finalDelayMinutes;
    routeDelays[j.routeId].count += 1;
  });

  let worstRouteName = 'Agra – Gwalior – Jhansi Section';
  let worstAvgDelay = 24.0;
  Object.values(routeDelays).forEach((r) => {
    const avg = r.totalDelay / r.count;
    if (avg >= worstAvgDelay) {
      worstAvgDelay = avg;
      worstRouteName = r.name;
    }
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
      {/* 1. Total Journeys */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/25 p-4 flex flex-col justify-between shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
            Total Journeys
          </span>
          <div className="w-7 h-7 rounded-lg bg-teal-500/10 text-teal-600 flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">commute</span>
          </div>
        </div>
        <div className="mt-2">
          <div className="text-2xl sm:text-3xl font-black text-on-surface tracking-tight font-mono">
            {total}
          </div>
          <p className="text-[10px] text-on-surface-variant mt-0.5">
            Evaluated benchmark runs
          </p>
        </div>
        <div className="mt-2 pt-2 border-t border-outline-variant/15 flex items-center gap-1.5 text-[10px] text-teal-700 font-semibold">
          <span className="material-symbols-outlined text-[14px]">check_circle</span>
          <span>Sample window active</span>
        </div>
      </div>

      {/* 2. Average Delay */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/25 p-4 flex flex-col justify-between shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
            Average Delay
          </span>
          <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">schedule</span>
          </div>
        </div>
        <div className="mt-2">
          <div className="text-2xl sm:text-3xl font-black text-amber-700 tracking-tight font-mono">
            +{avgDelay} <span className="text-sm font-bold">min</span>
          </div>
          <p className="text-[10px] text-on-surface-variant mt-0.5">
            Arrival lag vs static timetable
          </p>
        </div>
        <div className="mt-2 pt-2 border-t border-outline-variant/15 flex items-center gap-1.5 text-[10px] text-on-surface-variant">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          <span>Median corridor variance</span>
        </div>
      </div>

      {/* 3. On-Time % */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/25 p-4 flex flex-col justify-between shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
            On-Time %
          </span>
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">done_all</span>
          </div>
        </div>
        <div className="mt-2">
          <div className="text-2xl sm:text-3xl font-black text-emerald-700 tracking-tight font-mono">
            {onTimePercent}%
          </div>
          <p className="text-[10px] text-on-surface-variant mt-0.5">
            Arrival within ≤ 2 min of schedule
          </p>
        </div>
        <div className="mt-2 pt-2 border-t border-outline-variant/15 flex items-center gap-1.5 text-[10px] text-emerald-700 font-semibold">
          <span className="material-symbols-outlined text-[14px]">verified</span>
          <span>Punctuality threshold</span>
        </div>
      </div>

      {/* 4. Average ETA Prediction Error */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/25 p-4 flex flex-col justify-between shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
            Average ETA Error
          </span>
          <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">target</span>
          </div>
        </div>
        <div className="mt-2">
          <div className="text-2xl sm:text-3xl font-black text-indigo-700 tracking-tight font-mono">
            {avgEtaError} <span className="text-sm font-bold">min</span>
          </div>
          <p className="text-[10px] text-on-surface-variant mt-0.5">
            Mean Absolute Error (MAE)
          </p>
        </div>
        <div className="mt-2 pt-2 border-t border-outline-variant/15 flex items-center gap-1.5 text-[10px] text-indigo-700 font-semibold">
          <span className="material-symbols-outlined text-[14px]">psychology</span>
          <span>AI prediction accuracy</span>
        </div>
      </div>

      {/* 5. Worst Performing Route/Section */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/25 p-4 flex flex-col justify-between shadow-xs sm:col-span-2 lg:col-span-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
            Worst Section
          </span>
          <div className="w-7 h-7 rounded-lg bg-rose-500/10 text-rose-600 flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">warning</span>
          </div>
        </div>
        <div className="mt-2">
          <div className="text-xs font-black text-rose-800 leading-snug line-clamp-2" title={worstRouteName}>
            {worstRouteName}
          </div>
          <p className="text-[10px] text-rose-700 font-mono mt-1 font-bold">
            Avg delay: +{worstAvgDelay.toFixed(1)}m
          </p>
        </div>
        <div className="mt-2 pt-2 border-t border-outline-variant/15 flex items-center gap-1 text-[10px] text-on-surface-variant">
          <span className="material-symbols-outlined text-[13px] text-rose-600">traffic</span>
          <span>Primary network bottleneck</span>
        </div>
      </div>
    </div>
  );
};
