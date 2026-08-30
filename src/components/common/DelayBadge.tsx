import React from 'react';

interface DelayBadgeProps {
  delayMinutes: number;
  className?: string;
}

export const DelayBadge: React.FC<DelayBadgeProps> = ({ delayMinutes, className = '' }) => {
  if (delayMinutes <= 0) {
    return (
      <span className={`font-mono-data text-mono-data text-[#0f766e] font-medium ${className}`}>
        0 min
      </span>
    );
  }

  if (delayMinutes > 30) {
    return (
      <span className={`font-mono-data text-mono-data font-bold text-error ${className}`}>
        +{delayMinutes} min
      </span>
    );
  }

  if (delayMinutes > 15) {
    return (
      <span className={`font-mono-data text-mono-data font-medium text-error ${className}`}>
        +{delayMinutes} min
      </span>
    );
  }

  return (
    <span className={`font-mono-data text-mono-data text-[#b45309] font-medium ${className}`}>
      +{delayMinutes} min
    </span>
  );
};
