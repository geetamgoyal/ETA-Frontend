import React from 'react';
import { useTrains, ToastMessage, ToastSeverity } from '../../context/TrainContext';

// ── Toast severity config ─────────────────────────────────────────────────────
const SEVERITY_CONFIG: Record<
  ToastSeverity,
  { icon: string; barColor: string; iconColor: string; bg: string; border: string }
> = {
  critical: {
    icon: 'warning',
    barColor: 'bg-status-critical',
    iconColor: 'text-status-critical',
    bg: 'bg-white',
    border: 'border-status-critical-border',
  },
  warn: {
    icon: 'schedule',
    barColor: 'bg-status-warn',
    iconColor: 'text-status-warn',
    bg: 'bg-white',
    border: 'border-status-warn-border',
  },
  ok: {
    icon: 'check_circle',
    barColor: 'bg-status-ok',
    iconColor: 'text-status-ok',
    bg: 'bg-white',
    border: 'border-status-ok-border',
  },
  info: {
    icon: 'info',
    barColor: 'bg-status-info',
    iconColor: 'text-status-info',
    bg: 'bg-white',
    border: 'border-status-info-border',
  },
};

// ── Single Toast Item ─────────────────────────────────────────────────────────
const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: (id: string) => void }> = ({
  toast,
  onDismiss,
}) => {
  const cfg = SEVERITY_CONFIG[toast.severity];
  return (
    <div
      className={`toast-item flex items-start gap-0 rounded-lg border shadow-md overflow-hidden ${cfg.bg} ${cfg.border}`}
      role="alert"
      aria-live="assertive"
    >
      {/* Left color bar */}
      <div className={`w-1 self-stretch flex-shrink-0 ${cfg.barColor}`} />

      <div className="flex items-start gap-3 px-3 py-3 flex-1 min-w-0">
        {/* Icon */}
        <span className={`material-symbols-outlined text-[20px] flex-shrink-0 mt-0.5 ${cfg.iconColor}`}>
          {cfg.icon}
        </span>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-bold text-on-surface leading-tight truncate">{toast.title}</p>
          <p className="text-[12px] text-on-surface-variant mt-0.5 leading-snug">{toast.body}</p>
        </div>

        {/* Dismiss */}
        <button
          onClick={() => onDismiss(toast.id)}
          className="flex-shrink-0 text-on-surface-variant hover:text-on-surface transition-colors p-0.5 rounded"
          aria-label="Dismiss notification"
        >
          <span className="material-symbols-outlined text-[16px]">close</span>
        </button>
      </div>
    </div>
  );
};

// ── Toast Container (portals into fixed position via CSS class) ───────────────
export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useTrains();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-label="Notifications">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={dismissToast} />
      ))}
    </div>
  );
};
