import React from 'react';
import { TimeframeRange } from './ETAAnalyticsHeader';
import { Train } from '../../types/train';

interface ModelPerformanceCardsProps {
  timeframe: TimeframeRange;
  trains: Train[];
}

interface MetricDef {
  label: string;
  sublabel: string;
  value: string;
  unit: string;
  explanation: string;
  icon: string;
  borderAccent: string;
  badgeBg: string;
  badgeText: string;
}

export const ModelPerformanceCards: React.FC<ModelPerformanceCardsProps> = ({ timeframe, trains }) => {
  // Derive average delay deviation dynamically from active fleet
  const activeAvgDelay = trains.length > 0
    ? (trains.reduce((acc, t) => acc + Math.max(0, t.currentDelayMinutes), 0) / trains.length).toFixed(1)
    : '15.5';

  const metricsByTimeframe: Record<TimeframeRange, { mae: string; rmse: string; bias: string; avgDev: string }> = {
    Today: { mae: '3.2', rmse: '4.7', bias: '+0.6', avgDev: `+${activeAvgDelay}` },
    '7 Days': { mae: '3.6', rmse: '5.1', bias: '+0.8', avgDev: '+13.8' },
    '30 Days': { mae: '4.1', rmse: '5.8', bias: '+1.1', avgDev: '+14.5' },
    Custom: { mae: '3.5', rmse: '4.9', bias: '+0.7', avgDev: '+14.0' },
  };

  const current = metricsByTimeframe[timeframe];

  const cards: MetricDef[] = [
    {
      label: 'Mean Absolute Error (MAE)',
      sublabel: 'Average Prediction Variance',
      value: current.mae,
      unit: 'min',
      explanation: 'Average absolute gap between predicted arrival time and actual destination handover.',
      icon: 'straighten',
      borderAccent: 'border-l-primary',
      badgeBg: 'bg-primary/10',
      badgeText: 'text-primary',
    },
    {
      label: 'Root Mean Square Error (RMSE)',
      sublabel: 'Penalized Outlier Deviation',
      value: current.rmse,
      unit: 'min',
      explanation: 'Measures sensitivity to extreme sectional disruptions and unscheduled signal halts.',
      icon: 'calculate',
      borderAccent: 'border-l-indigo-600',
      badgeBg: 'bg-indigo-500/10',
      badgeText: 'text-indigo-700',
    },
    {
      label: 'Mean Prediction Bias',
      sublabel: 'Systematic Drift Tendency',
      value: current.bias,
      unit: 'min',
      explanation: 'Slight positive conservative buffer prioritizing cautionary dispatch safety over underestimating delay.',
      icon: 'balance',
      borderAccent: 'border-l-amber-500',
      badgeBg: 'bg-amber-500/10',
      badgeText: 'text-amber-800',
    },
    {
      label: 'Avg Timetable Deviation',
      sublabel: 'Dynamic vs Published Schedule',
      value: current.avgDev,
      unit: 'min',
      explanation: 'Actual timetable delay across active rakes, demonstrating why dynamic ETA is necessary.',
      icon: 'schedule',
      borderAccent: 'border-l-error',
      badgeBg: 'bg-error-container/30',
      badgeText: 'text-error',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {cards.map((c) => (
        <div
          key={c.label}
          className={`bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/25 shadow-sm border-l-4 ${c.borderAccent} flex flex-col justify-between hover:shadow-md transition-shadow`}
        >
          <div>
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                {c.sublabel}
              </span>
              <span className={`material-symbols-outlined text-[18px] p-1 rounded-md ${c.badgeBg} ${c.badgeText}`}>
                {c.icon}
              </span>
            </div>

            <h3 className="font-bold text-xs text-on-surface leading-tight mb-2">
              {c.label}
            </h3>

            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-black font-mono text-on-surface tracking-tight">
                {c.value}
              </span>
              <span className="text-xs font-bold text-on-surface-variant font-mono">
                {c.unit}
              </span>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-outline-variant/15 flex flex-col gap-1">
            <p className="text-[10px] text-outline leading-relaxed">
              {c.explanation}
            </p>
            <span className="text-[9px] font-mono font-bold text-on-surface-variant uppercase tracking-wider self-end mt-0.5">
              PROTOTYPE VALIDATION METRIC
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
