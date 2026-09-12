import React from 'react';
import { TrainStatus } from '../../types/train';
import { clsx } from 'clsx';

// ── Variant types ─────────────────────────────────────────────────────────────
export type BadgeVariant =
  | 'ok'
  | 'warn'
  | 'critical'
  | 'info'
  | 'ai'
  | 'recovery'
  | 'neutral'
  | 'live';

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
}

// ── Variant styles ────────────────────────────────────────────────────────────
const VARIANTS: Record<BadgeVariant, string> = {
  ok:       'bg-status-ok-bg text-status-ok-text border-status-ok-border',
  warn:     'bg-status-warn-bg text-status-warn-text border-status-warn-border',
  critical: 'bg-status-critical-bg text-status-critical-text border-status-critical-border',
  info:     'bg-status-info-bg text-status-info-text border-status-info-border',
  ai:       'bg-status-ai-bg text-status-ai-text border-status-ai-border',
  recovery: 'bg-status-recovery-bg text-status-recovery-text border-status-recovery-border',
  neutral:  'bg-surface-container text-on-surface-variant border-outline-variant',
  live:     'bg-green-50 text-green-700 border-green-200',
};

const DOT_COLORS: Record<BadgeVariant, string> = {
  ok:       'bg-status-ok',
  warn:     'bg-status-warn',
  critical: 'bg-status-critical',
  info:     'bg-status-info',
  ai:       'bg-status-ai',
  recovery: 'bg-status-recovery',
  neutral:  'bg-on-surface-variant',
  live:     'bg-green-500',
};

export const Badge: React.FC<BadgeProps> = ({
  variant,
  children,
  size = 'md',
  dot = false,
  className,
}) => {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded border font-medium tracking-wide',
        size === 'sm'
          ? 'px-1.5 py-0.5 text-[10px] leading-none'
          : 'px-2 py-0.5 text-[11px] leading-none',
        VARIANTS[variant],
        className,
      )}
    >
      {dot && (
        <span
          className={clsx('w-1.5 h-1.5 rounded-full flex-shrink-0', DOT_COLORS[variant])}
        />
      )}
      {children}
    </span>
  );
};

// ── Convenience: derive badge variant from TrainStatus ────────────────────────
export function getStatusVariant(status: TrainStatus): BadgeVariant {
  switch (status) {
    case 'On Time':
    case 'Good':
      return 'ok';
    case 'Minor Delay':
    case 'Warning':
    case 'Delayed':
      return 'warn';
    case 'Critical Delay':
    case 'Critical':
      return 'critical';
    case 'Recovering':
      return 'recovery';
    default:
      return 'neutral';
  }
}

export const TrainStatusBadge: React.FC<{
  status: TrainStatus;
  size?: 'sm' | 'md';
}> = ({ status, size = 'md' }) => (
  <Badge variant={getStatusVariant(status)} size={size} dot>
    {status}
  </Badge>
);
