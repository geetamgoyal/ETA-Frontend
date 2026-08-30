import React from 'react';

interface ConfidenceBarProps {
  confidencePercent: number;
  showText?: boolean;
  barWidthClass?: string;
  size?: 'sm' | 'md';
}

export const ConfidenceBar: React.FC<ConfidenceBarProps> = ({
  confidencePercent,
  showText = true,
  barWidthClass = 'w-12',
  size = 'sm',
}) => {
  const isHigh = confidencePercent >= 90;
  const isMedium = confidencePercent >= 75 && confidencePercent < 90;

  const barColor = isHigh ? 'bg-secondary' : isMedium ? 'bg-[#0f766e]' : 'bg-error';
  const textColor = isHigh ? 'text-secondary' : isMedium ? 'text-[#0f766e]' : 'text-error';

  return (
    <div className="flex items-center gap-1.5">
      <div className={`${barWidthClass} ${size === 'sm' ? 'h-1.5' : 'h-2.5'} bg-outline-variant/30 rounded-full overflow-hidden`}>
        <div
          className={`h-full ${barColor} transition-all duration-500`}
          style={{ width: `${Math.min(100, Math.max(0, confidencePercent))}%` }}
        ></div>
      </div>
      {showText && (
        <span className={`text-[11px] font-mono-data font-semibold ${textColor}`}>
          {confidencePercent}%
        </span>
      )}
    </div>
  );
};
