import React from 'react';
import { RouteHistoricalSummary } from '../../types/history';

interface RoutePerformanceSectionProps {
  routes: RouteHistoricalSummary[];
  onSelectRoute: (routeId: string) => void;
  selectedRouteId?: string;
}

export const RoutePerformanceSection: React.FC<RoutePerformanceSectionProps> = ({
  routes,
  onSelectRoute,
  selectedRouteId,
}) => {
  const getTrendBadge = (trend: RouteHistoricalSummary['trend']) => {
    switch (trend) {
      case 'IMPROVING':
        return (
          <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            Improving
          </span>
        );
      case 'STABLE':
        return (
          <span className="flex items-center gap-1 text-[11px] font-bold text-sky-800 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
            <span className="material-symbols-outlined text-[14px]">trending_flat</span>
            Stable
          </span>
        );
      case 'DEGRADING':
        return (
          <span className="flex items-center gap-1 text-[11px] font-bold text-rose-800 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
            <span className="material-symbols-outlined text-[14px]">trending_down</span>
            Degrading
          </span>
        );
    }
  };

  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/25 p-4 sm:p-5 shadow-sm flex flex-col gap-3.5">
      <div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[20px]">alt_route</span>
          <h2 className="text-sm font-bold text-on-surface">
            Route &amp; Section Operational Reliability
          </h2>
        </div>
        <p className="text-xs text-on-surface-variant mt-0.5">
          Corridor delay progression, ETA prediction accuracy, affected journey proportions, and primary root bottlenecks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {routes.map((r) => {
          const isSelected = selectedRouteId === r.routeId;
          const affectedPercent = Math.round((r.affectedJourneys / r.totalJourneys) * 100);

          return (
            <div
              key={r.routeId}
              onClick={() => onSelectRoute(r.routeId)}
              className={`rounded-xl p-4 border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                isSelected
                  ? 'bg-primary/5 border-primary shadow-sm ring-1 ring-primary'
                  : 'bg-surface-container-low/30 border-outline-variant/25 hover:border-outline-variant hover:bg-surface-container-low/60'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-xs font-bold text-on-surface leading-tight">
                      {r.routeName}
                    </h3>
                    <p className="text-[10px] font-semibold text-on-surface-variant mt-0.5">
                      {r.zone}
                    </p>
                  </div>
                  {getTrendBadge(r.trend)}
                </div>

                <div className="grid grid-cols-3 gap-2 mt-3 pt-2.5 border-t border-outline-variant/15 text-center">
                  <div className="bg-surface-container-lowest rounded-lg p-2 border border-outline-variant/15">
                    <span className="text-[9px] font-bold text-on-surface-variant uppercase block">
                      Avg Delay
                    </span>
                    <span className="text-sm font-black font-mono text-amber-700">
                      +{r.avgDelayMinutes.toFixed(1)}m
                    </span>
                  </div>

                  <div className="bg-surface-container-lowest rounded-lg p-2 border border-outline-variant/15">
                    <span className="text-[9px] font-bold text-on-surface-variant uppercase block">
                      ETA Error
                    </span>
                    <span className="text-sm font-black font-mono text-indigo-700">
                      {r.avgEtaErrorMinutes.toFixed(1)}m
                    </span>
                  </div>

                  <div className="bg-surface-container-lowest rounded-lg p-2 border border-outline-variant/15">
                    <span className="text-[9px] font-bold text-on-surface-variant uppercase block">
                      Delayed Runs
                    </span>
                    <span className="text-sm font-black font-mono text-on-surface">
                      {affectedPercent}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-lowest/80 rounded-lg p-2.5 border border-outline-variant/15">
                <div className="flex items-center gap-1 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                  <span className="material-symbols-outlined text-[13px] text-amber-700">warning</span>
                  <span>Primary Bottleneck Cause</span>
                </div>
                <p className="text-[11px] text-on-surface leading-relaxed">
                  {r.primaryBottleneck}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
