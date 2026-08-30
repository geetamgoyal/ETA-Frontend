import React from 'react';
import { TrainStatus } from '../../types/train';

interface StatusBadgeProps {
  status: TrainStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const normalized = status.toLowerCase();

  if (normalized.includes('on time') || normalized.includes('good')) {
    return (
      <span className="inline-flex items-center gap-1 bg-[#ccfbf1] text-[#0f766e] border border-[#99f6e4] px-2 py-0.5 rounded text-[11px] font-medium uppercase tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-[#0f766e]"></span>
        {status}
      </span>
    );
  }

  if (normalized.includes('recovering')) {
    return (
      <span className="inline-flex items-center gap-1 bg-secondary-fixed text-on-secondary-fixed-variant border border-secondary-fixed-dim px-2 py-0.5 rounded text-[11px] font-medium uppercase tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
        {status}
      </span>
    );
  }

  if (normalized.includes('critical')) {
    return (
      <span className="inline-flex items-center gap-1 bg-error-container text-on-error-container border border-error/30 px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider animate-pulse">
        <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
        {status}
      </span>
    );
  }

  if (normalized.includes('minor') || normalized.includes('warning') || normalized.includes('delay')) {
    return (
      <span className="inline-flex items-center gap-1 bg-[#fef3c7] text-[#b45309] border border-[#fde68a] px-2 py-0.5 rounded text-[11px] font-medium uppercase tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-[#b45309]"></span>
        {status}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 bg-surface-container-high text-on-surface border border-outline-variant/30 px-2 py-0.5 rounded text-[11px] font-medium">
      {status}
    </span>
  );
};
