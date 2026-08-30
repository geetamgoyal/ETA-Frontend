import React from 'react';

export const OnTimePerformanceDonut: React.FC = () => {
  return (
    <div className="bg-surface p-lg rounded-xl shadow-sm border border-surface-container-highest flex flex-col justify-between">
      <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-lg">
        On-Time Performance
      </h3>

      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Radial SVG Gauge */}
        <div className="relative w-40 h-40">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <circle
              cx="18"
              cy="18"
              r="15.9"
              fill="none"
              stroke="#e5eeff"
              strokeWidth="3.2"
            />
            <circle
              cx="18"
              cy="18"
              r="15.9"
              fill="none"
              stroke="#006399"
              strokeDasharray="64 100"
              strokeDashoffset="0"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display-lg text-3xl font-black text-on-surface font-mono-data">
              64%
            </span>
            <span className="font-label-md text-[10px] text-outline uppercase font-bold tracking-wider">
              On-Time Rate
            </span>
          </div>
        </div>

        {/* Legend Breakdown List */}
        <div className="w-full mt-lg space-y-2 text-xs">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-secondary"></div>
              <span className="font-body-md text-on-surface-variant font-medium">On Time</span>
            </div>
            <span className="font-mono-data font-bold text-on-surface">82 trains</span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-accent-green"></div>
              <span className="font-body-md text-on-surface-variant font-medium">Minor Delay</span>
            </div>
            <span className="font-mono-data font-bold text-on-surface">34 trains</span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-error"></div>
              <span className="font-body-md text-on-surface-variant font-medium">Critical Delay</span>
            </div>
            <span className="font-mono-data font-bold text-error">12 trains</span>
          </div>
        </div>
      </div>
    </div>
  );
};
