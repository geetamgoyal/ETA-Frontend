import React, { useMemo } from 'react';
import { useTrains } from '../../context/TrainContext';

interface KPICardProps {
  label: string;
  value: string | number;
  sub?: string;
  icon: string;
  accentColor: string;
  trend?: { value: string; up: boolean; positive: boolean };
}

const KPICard: React.FC<KPICardProps> = ({ label, value, sub, icon, accentColor, trend }) => (
  <div className="relative bg-surface-container-lowest rounded-lg border border-outline-variant/60 p-4 overflow-hidden flex flex-col gap-2">
    {/* top accent */}
    <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: accentColor }} />
    <div className="flex items-center justify-between">
      <span className="ops-label">{label}</span>
      <span
        className="material-symbols-outlined text-[20px]"
        style={{ color: accentColor }}
      >
        {icon}
      </span>
    </div>
    <div className="flex items-baseline gap-1.5">
      <span className="data-value font-black text-[2rem] leading-none text-on-surface">{value}</span>
    </div>
    {(sub || trend) && (
      <div className="flex items-center justify-between mt-auto">
        {sub && <span className="text-[11px] text-on-surface-variant">{sub}</span>}
        {trend && (
          <span
            className="flex items-center gap-0.5 text-[11px] font-bold"
            style={{ color: trend.positive ? '#16a34a' : '#dc2626' }}
          >
            <span className="material-symbols-outlined text-[13px]">
              {trend.up ? 'arrow_upward' : 'arrow_downward'}
            </span>
            {trend.value}
          </span>
        )}
      </div>
    )}
  </div>
);

// ── Main KPIs component ───────────────────────────────────────────────────────
export const OperationalKPIs: React.FC = () => {
  const { trains } = useTrains();

  const kpis = useMemo(() => {
    const active      = trains.length;
    const onTime      = trains.filter((t) => t.currentDelayMinutes <= 2).length;
    const delayed     = trains.filter((t) => t.currentDelayMinutes > 2 && t.currentDelayMinutes <= 20).length;
    const critical    = trains.filter((t) => t.currentDelayMinutes > 20).length;
    const avgDelay    = Math.round(trains.reduce((s, t) => s + t.currentDelayMinutes, 0) / trains.length);
    const avgConf     = Math.round(trains.reduce((s, t) => s + t.confidencePercent, 0) / trains.length);

    return [
      {
        label: 'Active Trains',
        value: active,
        sub: 'On prototype feed',
        icon: 'train',
        accentColor: '#0369a1',
        trend: { value: '+0 vs prev hour', up: true, positive: true },
      },
      {
        label: 'On Time',
        value: onTime,
        sub: `${Math.round((onTime / active) * 100)}% punctuality`,
        icon: 'check_circle',
        accentColor: '#16a34a',
        trend: undefined,
      },
      {
        label: 'Minor Delay',
        value: delayed,
        sub: '2–20 min behind schedule',
        icon: 'schedule',
        accentColor: '#d97706',
        trend: undefined,
      },
      {
        label: 'Critical Delay',
        value: critical,
        sub: '>20 min, escalated',
        icon: 'warning',
        accentColor: '#dc2626',
        trend: critical > 0 ? { value: 'Escalated', up: true, positive: false } : undefined,
      },
      {
        label: 'Avg Delay',
        value: avgDelay > 0 ? `+${avgDelay}m` : '0m',
        sub: 'Across all active trains',
        icon: 'timer',
        accentColor: avgDelay > 15 ? '#dc2626' : avgDelay > 5 ? '#d97706' : '#16a34a',
        trend: undefined,
      },
      {
        label: 'Prediction Confidence',
        value: `${avgConf}%`,
        sub: 'Fleet confidence avg',
        icon: 'psychology',
        accentColor: '#7c3aed',
        trend: { value: '+2.4% vs baseline', up: true, positive: true },
      },
    ];
  }, [trains]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {kpis.map((kpi) => (
        <KPICard key={kpi.label} {...kpi} />
      ))}
    </div>
  );
};
