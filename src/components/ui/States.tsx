import React from 'react';
import { clsx } from 'clsx';

// ── Empty State ───────────────────────────────────────────────────────────────
interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'search_off',
  title,
  description,
  action,
  className,
}) => (
  <div
    className={clsx(
      'flex flex-col items-center justify-center py-12 px-6 text-center',
      className,
    )}
  >
    <span className="material-symbols-outlined text-[40px] text-on-surface-variant/40 mb-3">
      {icon}
    </span>
    <p className="text-[14px] font-semibold text-on-surface-variant">{title}</p>
    {description && (
      <p className="text-[12px] text-on-surface-variant/70 mt-1 max-w-xs">{description}</p>
    )}
    {action && <div className="mt-4">{action}</div>}
  </div>
);

// ── Error State ───────────────────────────────────────────────────────────────
interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  description = 'An unexpected error occurred. Please try again.',
  onRetry,
  className,
}) => (
  <div
    className={clsx(
      'flex flex-col items-center justify-center py-12 px-6 text-center',
      className,
    )}
  >
    <span className="material-symbols-outlined text-[40px] text-status-critical mb-3">
      error_outline
    </span>
    <p className="text-[14px] font-semibold text-on-surface">{title}</p>
    <p className="text-[12px] text-on-surface-variant mt-1 max-w-xs">{description}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="mt-4 px-4 py-2 text-[12px] font-semibold text-secondary border border-secondary/30 rounded-md hover:bg-secondary/5 transition-colors"
      >
        Try Again
      </button>
    )}
  </div>
);

// ── Loading Spinner ───────────────────────────────────────────────────────────
interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZE_MAP = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-8 h-8 border-[3px]',
};

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md', className }) => (
  <div
    className={clsx(
      'rounded-full border-outline-variant border-t-secondary animate-spin',
      SIZE_MAP[size],
      className,
    )}
    role="status"
    aria-label="Loading"
  />
);

// ── Loading State (full section) ──────────────────────────────────────────────
interface LoadingStateProps {
  message?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading data...',
  className,
}) => (
  <div
    className={clsx(
      'flex flex-col items-center justify-center py-12 gap-3',
      className,
    )}
  >
    <Spinner size="lg" />
    <p className="text-[12px] text-on-surface-variant">{message}</p>
  </div>
);

// ── Status Dot (animated live indicator) ──────────────────────────────────────
interface StatusDotProps {
  status: 'live' | 'ok' | 'warn' | 'critical' | 'offline';
  pulse?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

const DOT_COLORS = {
  live:     'bg-green-500',
  ok:       'bg-status-ok',
  warn:     'bg-status-warn',
  critical: 'bg-status-critical',
  offline:  'bg-on-surface-variant/30',
};

export const StatusDot: React.FC<StatusDotProps> = ({
  status,
  pulse = false,
  size = 'md',
  className,
}) => (
  <span
    className={clsx(
      'inline-block rounded-full flex-shrink-0',
      size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2',
      DOT_COLORS[status],
      pulse && status !== 'offline' ? 'animate-pulse-subtle' : '',
      className,
    )}
  />
);

// ── Divider ────────────────────────────────────────────────────────────────────
export const Divider: React.FC<{ className?: string }> = ({ className }) => (
  <div className={clsx('h-px bg-outline-variant/40', className)} />
);

// ── Section Header (operational style) ────────────────────────────────────────
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  badge?: React.ReactNode;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  actions,
  badge,
  className,
}) => (
  <div className={clsx('flex items-start justify-between gap-4', className)}>
    <div>
      <div className="flex items-center gap-2">
        <h2 className="text-headline-md font-bold text-on-surface">{title}</h2>
        {badge}
      </div>
      {subtitle && (
        <p className="text-[12px] text-on-surface-variant mt-0.5 leading-snug">{subtitle}</p>
      )}
    </div>
    {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
  </div>
);
