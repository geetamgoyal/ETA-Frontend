import React from 'react';
import { useTrains } from '../../context/TrainContext';

export const LiveTrackingHeader: React.FC = () => {
  const { trains, simulationTick, lastUpdatedAt } = useTrains();

  const totalTrains = trains.length;
  const onTimeCount = trains.filter(
    (t) => t.status === 'On Time' || t.status === 'Good',
  ).length;
  const delayedCount = trains.filter(
    (t) => t.status === 'Minor Delay' || t.status === 'Recovering' || t.status === 'Delayed',
  ).length;
  const criticalCount = trains.filter(
    (t) => t.status === 'Critical Delay' || t.status === 'Critical',
  ).length;

  const totalDelay = trains.reduce((acc, t) => acc + Math.max(0, t.currentDelayMinutes), 0);
  const avgDelay = totalTrains > 0 ? (totalDelay / totalTrains).toFixed(1) : '0.0';

  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/25 shadow-sm p-4 sm:p-5 flex flex-col gap-4">
      {/* Top row: Title, Subtitle, and Prototype Simulation Disclaimer Badge */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/25 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">hub</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-on-surface tracking-tight">
              Live Train Tracking
            </h1>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-primary text-white tracking-wider font-mono">
              FLEET RADAR
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-1 max-w-2xl">
            Real-time sectional position, block occupancy, and dynamic ETA prediction across monitored Northern &amp; Central Railway corridors.
          </p>
        </div>

        {/* Prototype Simulation / Demo Data Notice */}
        <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-auto">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span className="uppercase tracking-wider text-[10px] font-black text-amber-900">
              PROTOTYPE SIMULATION · DEMO DATA
            </span>
            <span
              className="material-symbols-outlined text-[14px] text-amber-700 cursor-help"
              title="Telemetry and sectional movements are deterministically simulated for SIH 2026 prototype evaluation. Not an official CRIS/FOIS live feed."
            >
              info
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-surface-container-low border border-outline-variant/30 text-[11px] text-on-surface-variant font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Tick #{simulationTick}</span>
            <span className="text-outline">·</span>
            <span>20s Cadence</span>
          </div>
        </div>
      </div>

      {/* Bottom KPI Counters Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-3 border-t border-outline-variant/15 text-xs">
        {/* Total Rakes */}
        <div className="px-3 py-2 rounded-lg bg-surface-container-low border border-outline-variant/20 flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
            Monitored Rakes
          </span>
          <span className="text-lg font-black text-on-surface font-mono mt-0.5">
            {totalTrains} Active
          </span>
        </div>

        {/* On Time */}
        <div className="px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex flex-col">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
              On Time
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>
          <span className="text-lg font-black text-emerald-700 font-mono mt-0.5">
            {onTimeCount} Rakes
          </span>
        </div>

        {/* Delayed */}
        <div className="px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/25 flex flex-col">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
              Minor Delay
            </span>
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          </div>
          <span className="text-lg font-black text-amber-700 font-mono mt-0.5">
            {delayedCount} Rakes
          </span>
        </div>

        {/* Critical */}
        <div className="px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/25 flex flex-col">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-800">
              Critical
            </span>
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping-slow"></span>
          </div>
          <span className="text-lg font-black text-red-700 font-mono mt-0.5">
            {criticalCount} Rakes
          </span>
        </div>

        {/* Avg Delay */}
        <div className="px-3 py-2 rounded-lg bg-surface-container-low border border-outline-variant/20 flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
            Fleet Avg Delay
          </span>
          <span className="text-lg font-black text-on-surface font-mono mt-0.5">
            +{avgDelay} min
          </span>
        </div>

        {/* Last Sync */}
        <div className="px-3 py-2 rounded-lg bg-surface-container-low border border-outline-variant/20 flex flex-col justify-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
            Telemetry Feed
          </span>
          <span className="text-[11px] font-bold text-on-surface font-mono mt-0.5 truncate">
            {lastUpdatedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
};
