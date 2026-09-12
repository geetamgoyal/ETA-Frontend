import React from 'react';
import { Train } from '../../types/train';
import { clsx } from 'clsx';

interface RouteSummaryKPIsProps {
  train?: Train;
}

export const RouteSummaryKPIs: React.FC<RouteSummaryKPIsProps> = ({ train }) => {
  if (!train) return null;

  const upcomingStops = train.stations.filter(
    (s) => s.status === 'Upcoming' || s.status === 'Current',
  ).length;

  const completedStops = train.stations.filter((s) => s.status === 'Departed').length;
  const totalStops = train.stations.length;

  const avgDelay = train.stations.length > 0
    ? Math.round(
        train.stations
          .filter((s) => s.status !== 'Departed')
          .reduce((acc, s) => acc + s.predictedDelayMinutes, 0) /
          Math.max(1, train.stations.filter((s) => s.status !== 'Departed').length),
      )
    : 0;

  const maxStationRisk = train.stations
    .filter((s) => s.status !== 'Departed')
    .reduce((max, s) => Math.max(max, s.predictedDelayMinutes), 0);

  const kpis = [
    {
      label: 'Remaining Stops',
      value: String(upcomingStops),
      sub: `${completedStops} of ${totalStops} completed`,
      icon: 'pin_drop',
      accent: 'info' as const,
    },
    {
      label: 'Avg Forward Delay',
      value: avgDelay > 0 ? `+${avgDelay} min` : 'On Time',
      sub: 'Predicted across remaining stops',
      icon: 'schedule',
      accent: avgDelay === 0 ? ('ok' as const) : avgDelay <= 15 ? ('warn' as const) : ('critical' as const),
    },
    {
      label: 'Peak Risk Station',
      value: maxStationRisk > 0 ? `+${maxStationRisk} min` : 'None',
      sub: 'Maximum delay at a single stop',
      icon: 'warning',
      accent: maxStationRisk === 0 ? ('ok' as const) : maxStationRisk <= 15 ? ('warn' as const) : ('critical' as const),
    },
    {
      label: 'AI Forecast Confidence',
      value: `${train.confidencePercent}%`,
      sub: 'Model reliability score',
      icon: 'psychology',
      accent: train.confidencePercent >= 90 ? ('ok' as const) : train.confidencePercent >= 78 ? ('warn' as const) : ('critical' as const),
    },
  ];

  const ACCENT_BAR: Record<string, string> = {
    ok:       'bg-status-ok',
    warn:     'bg-status-warn',
    critical: 'bg-status-critical',
    info:     'bg-status-info',
  };

  const ACCENT_TEXT: Record<string, string> = {
    ok:       'text-status-ok-text',
    warn:     'text-status-warn-text',
    critical: 'text-status-critical-text',
    info:     'text-status-info-text',
  };

  const ACCENT_ICON: Record<string, string> = {
    ok:       'text-status-ok',
    warn:     'text-status-warn',
    critical: 'text-status-critical',
    info:     'text-status-info',
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {kpis.map((kpi) => (
        <div
          key={kpi.label}
          className="relative bg-surface-container-lowest rounded-lg border border-outline-variant/60 p-4 overflow-hidden"
        >
          {/* Top accent bar */}
          <div className={clsx('absolute top-0 left-0 right-0 h-0.5', ACCENT_BAR[kpi.accent])} />

          <div className="flex items-start justify-between mb-2">
            <span className="ops-label">{kpi.label}</span>
            <span
              className={clsx(
                'material-symbols-outlined text-[18px]',
                ACCENT_ICON[kpi.accent],
              )}
            >
              {kpi.icon}
            </span>
          </div>

          <p
            className={clsx(
              'data-value text-[1.5rem] font-bold leading-none mb-1',
              ACCENT_TEXT[kpi.accent],
            )}
          >
            {kpi.value}
          </p>

          <p className="text-[11px] text-on-surface-variant leading-snug">{kpi.sub}</p>
        </div>
      ))}
    </div>
  );
};
