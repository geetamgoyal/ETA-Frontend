import React from 'react';
import { AlertSeverity } from '../../types/alert';

interface SeverityBadgeProps {
  severity: AlertSeverity;
}

export const SeverityBadge: React.FC<SeverityBadgeProps> = ({ severity }) => {
  switch (severity) {
    case 'CRITICAL':
      return (
        <span className="inline-flex items-center gap-1 bg-alert-critical-bg text-alert-critical border border-alert-critical/20 px-2 py-0.5 rounded font-label-md text-[10px] font-bold tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-alert-critical animate-pulse"></span>
          CRITICAL
        </span>
      );
    case 'HIGH':
      return (
        <span className="inline-flex items-center gap-1 bg-orange-50 text-orange-600 border border-orange-200 px-2 py-0.5 rounded font-label-md text-[10px] font-bold tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
          HIGH
        </span>
      );
    case 'WARNING':
      return (
        <span className="inline-flex items-center gap-1 bg-alert-warning-bg text-alert-warning border border-alert-warning/20 px-2 py-0.5 rounded font-label-md text-[10px] font-bold tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-alert-warning"></span>
          WARNING
        </span>
      );
    case 'RECOVERY':
      return (
        <span className="inline-flex items-center gap-1 bg-alert-recovery-bg text-alert-recovery border border-alert-recovery/20 px-2 py-0.5 rounded font-label-md text-[10px] font-bold tracking-wider">
          <span className="material-symbols-outlined text-[12px]">auto_awesome</span>
          RECOVERY
        </span>
      );
    case 'NETWORK':
      return (
        <span className="inline-flex items-center gap-1 bg-surface-container text-on-surface border border-outline-variant/30 px-2 py-0.5 rounded font-label-md text-[10px] font-bold tracking-wider">
          <span className="material-symbols-outlined text-[12px]">hub</span>
          NETWORK
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1 bg-surface-container-low text-on-surface-variant border border-outline-variant/20 px-2 py-0.5 rounded font-label-md text-[10px] font-medium">
          {severity}
        </span>
      );
  }
};
