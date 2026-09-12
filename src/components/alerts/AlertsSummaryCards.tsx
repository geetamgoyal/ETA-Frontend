import React from 'react';
import { useAlerts } from '../../context/AlertContext';
import { useTrains } from '../../context/TrainContext';

export const AlertsSummaryCards: React.FC = () => {
  const { alerts } = useAlerts();
  const { trains } = useTrains();

  const criticalCount = alerts.filter((a) => a.severity === 'CRITICAL' && a.status !== 'Resolved').length;
  const highCount = alerts.filter((a) => a.severity === 'HIGH' && a.status !== 'Resolved').length;
  const activeDelaysCount = trains.filter((t) => t.currentDelayMinutes > 0).length;
  const operationalEventsCount = alerts.reduce((acc, a) => acc + (a.timeline ? a.timeline.length : 1), 0);
  const resolvedCount = alerts.filter((a) => a.status === 'Resolved').length;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {/* 1. Critical Alarms */}
      <div className="bg-surface-container-lowest rounded-xl p-4 border border-red-500/30 shadow-sm relative overflow-hidden flex flex-col justify-between">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-600"></div>
        <div className="flex justify-between items-start mb-2 pl-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-red-800">
            Critical
          </span>
          <span className="material-symbols-outlined text-red-600 text-[20px] animate-pulse">
            error
          </span>
        </div>
        <div className="pl-1.5">
          <div className="text-2xl sm:text-3xl font-black font-mono text-red-600">
            {criticalCount}
          </div>
          <span className="text-[11px] font-bold text-red-700 block mt-0.5">
            Immediate attention
          </span>
        </div>
      </div>

      {/* 2. High Priority */}
      <div className="bg-surface-container-lowest rounded-xl p-4 border border-amber-500/30 shadow-sm relative overflow-hidden flex flex-col justify-between">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-amber-500"></div>
        <div className="flex justify-between items-start mb-2 pl-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
            High Priority
          </span>
          <span className="material-symbols-outlined text-amber-600 text-[20px]">
            warning
          </span>
        </div>
        <div className="pl-1.5">
          <div className="text-2xl sm:text-3xl font-black font-mono text-amber-600">
            {highCount}
          </div>
          <span className="text-[11px] font-medium text-amber-700 block mt-0.5">
            Heavy bottleneck risk
          </span>
        </div>
      </div>

      {/* 3. Active Delays (Derived from trains) */}
      <div className="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/25 shadow-sm relative overflow-hidden flex flex-col justify-between">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary"></div>
        <div className="flex justify-between items-start mb-2 pl-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
            Active Delays
          </span>
          <span className="material-symbols-outlined text-primary text-[20px]">
            schedule
          </span>
        </div>
        <div className="pl-1.5">
          <div className="text-2xl sm:text-3xl font-black font-mono text-on-surface">
            {activeDelaysCount}
          </div>
          <span className="text-[11px] font-medium text-on-surface-variant block mt-0.5">
            Rakes delayed &gt; 0m
          </span>
        </div>
      </div>

      {/* 4. Operational Events */}
      <div className="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/25 shadow-sm relative overflow-hidden flex flex-col justify-between">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-secondary"></div>
        <div className="flex justify-between items-start mb-2 pl-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
            Operational Events
          </span>
          <span className="material-symbols-outlined text-secondary text-[20px]">
            history
          </span>
        </div>
        <div className="pl-1.5">
          <div className="text-2xl sm:text-3xl font-black font-mono text-on-surface">
            {operationalEventsCount}
          </div>
          <span className="text-[11px] font-medium text-on-surface-variant block mt-0.5">
            Logged incidents &amp; pings
          </span>
        </div>
      </div>

      {/* 5. Resolved */}
      <div className="bg-surface-container-lowest rounded-xl p-4 border border-emerald-500/30 shadow-sm relative overflow-hidden flex flex-col justify-between col-span-2 sm:col-span-1">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-600"></div>
        <div className="flex justify-between items-start mb-2 pl-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
            Resolved
          </span>
          <span className="material-symbols-outlined text-emerald-600 text-[20px]">
            check_circle
          </span>
        </div>
        <div className="pl-1.5">
          <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-600">
            {resolvedCount}
          </div>
          <span className="text-[11px] font-medium text-emerald-700 block mt-0.5">
            Normalcy restored
          </span>
        </div>
      </div>
    </div>
  );
};
