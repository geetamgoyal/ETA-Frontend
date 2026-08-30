import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: React.ReactNode;
  icon?: string;
  iconColorClass?: string;
  isAiAccent?: boolean;
  isErrorBorder?: boolean;
  className?: string;
  valueSuffix?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  iconColorClass = 'text-primary',
  isAiAccent = false,
  isErrorBorder = false,
  className = '',
  valueSuffix,
}) => {
  return (
    <div
      className={`bg-surface-container-lowest rounded-lg p-lg shadow-sm border border-outline-variant/20 flex flex-col justify-between hover:shadow-md transition-shadow ${
        isAiAccent
          ? 'ai-border-accent bg-gradient-to-br from-surface-container-lowest to-surface-container-high/30'
          : ''
      } ${isErrorBorder ? 'border-l-4 border-l-error' : ''} ${className}`}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider flex items-center gap-1">
          {title}
        </span>
        {icon && (
          <span className={`material-symbols-outlined ${iconColorClass}`}>
            {icon}
          </span>
        )}
      </div>
      <div>
        <div className="flex items-baseline gap-1">
          <span className="font-display-lg text-headline-lg lg:text-display-lg font-bold text-on-surface">
            {value}
          </span>
          {valueSuffix && (
            <span className="font-body-md text-body-md text-on-surface-variant font-normal">
              {valueSuffix}
            </span>
          )}
        </div>
        {subtitle && <div className="mt-1 text-sm">{subtitle}</div>}
      </div>
    </div>
  );
};
