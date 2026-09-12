import React from 'react';
import { clsx } from 'clsx';

interface KPICardProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: { value: string; direction: 'up' | 'down' | 'neutral'; isPositive?: boolean };
  icon?: string;
  accent?: 'default' | 'ok' | 'warn' | 'critical' | 'ai' | 'info';
  subLabel?: string;
  className?: string;
  onClick?: () => void;
}

const ACCENT_MAP = {
  default:  { icon: 'text-secondary',      bar: 'bg-secondary'      },
  ok:       { icon: 'text-status-ok',      bar: 'bg-status-ok'      },
  warn:     { icon: 'text-status-warn',    bar: 'bg-status-warn'    },
  critical: { icon: 'text-status-critical',bar: 'bg-status-critical'},
  ai:       { icon: 'text-status-ai',      bar: 'bg-status-ai'      },
  info:     { icon: 'text-status-info',    bar: 'bg-status-info'    },
};

const TREND_COLORS = {
  'up-positive':    'text-status-ok',
  'up-negative':    'text-status-critical',
  'down-positive':  'text-status-ok',
  'down-negative':  'text-status-critical',
  'neutral-true':   'text-on-surface-variant',
  'neutral-false':  'text-on-surface-variant',
};

const TREND_ICONS = {
  up:      'arrow_upward',
  down:    'arrow_downward',
  neutral: 'remove',
};

export const KPICard: React.FC<KPICardProps> = ({
  label,
  value,
  unit,
  trend,
  icon,
  accent = 'default',
  subLabel,
  className,
  onClick,
}) => {
  const acc = ACCENT_MAP[accent];

  let trendColorKey = 'neutral-false';
  if (trend) {
    const dir = trend.direction;
    const pos = trend.isPositive ?? true;
    trendColorKey = `${dir}-${pos}`;
  }
  const trendColor = TREND_COLORS[trendColorKey as keyof typeof TREND_COLORS] ?? 'text-on-surface-variant';

  return (
    <div
      className={clsx(
        'relative bg-surface-container-lowest rounded-lg border border-outline-variant/60',
        'p-4 flex flex-col gap-2 overflow-hidden',
        'transition-shadow duration-150',
        onClick ? 'cursor-pointer hover:shadow-md hover:border-outline-variant' : '',
        className,
      )}
      onClick={onClick}
    >
      {/* Top accent bar */}
      <div className={clsx('absolute top-0 left-0 right-0 h-0.5', acc.bar)} />

      {/* Header row */}
      <div className="flex items-center justify-between">
        <span className="ops-label">{label}</span>
        {icon && (
          <span className={clsx('material-symbols-outlined text-[20px]', acc.icon)}>
            {icon}
          </span>
        )}
      </div>

      {/* Value */}
      <div className="flex items-baseline gap-1.5">
        <span className="data-value text-[1.875rem] font-bold text-on-surface leading-none">
          {value}
        </span>
        {unit && (
          <span className="text-[13px] text-on-surface-variant font-medium">{unit}</span>
        )}
      </div>

      {/* Bottom row: sub-label or trend */}
      <div className="flex items-center justify-between mt-auto">
        {subLabel && (
          <span className="text-[11px] text-on-surface-variant">{subLabel}</span>
        )}
        {trend && (
          <span className={clsx('flex items-center gap-0.5 text-[11px] font-semibold', trendColor)}>
            <span className="material-symbols-outlined text-[13px]">
              {TREND_ICONS[trend.direction]}
            </span>
            {trend.value}
          </span>
        )}
      </div>
    </div>
  );
};
