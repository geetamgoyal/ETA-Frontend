import React from 'react';

export const NetworkDelayTrendChart: React.FC = () => {
  return (
    <div className="lg:col-span-2 bg-surface p-lg rounded-xl shadow-sm border border-surface-container-highest flex flex-col justify-between">
      <div className="flex justify-between items-start mb-lg">
        <div>
          <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
            Network Delay Trend
          </h3>
          <p className="font-body-md text-xs text-on-surface-variant">
            Average delay across the monitored railway network (Current vs Previous Week)
          </p>
        </div>
        <div className="text-right">
          <span className="text-accent-green font-bold text-xs sm:text-sm bg-green-50 border border-green-200 px-2.5 py-1 rounded">
            Overall delay reduced by 8%
          </span>
        </div>
      </div>

      <div className="flex-1 h-64 relative">
        <svg className="w-full h-full" viewBox="0 0 700 200" preserveAspectRatio="none">
          <defs>
            <linearGradient id="analyticsBlueGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#006399" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#006399" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <g className="text-outline-variant/30" stroke="currentColor" strokeWidth="1">
            <line x1="0" x2="700" y1="0" y2="0" />
            <line x1="0" x2="700" y1="50" y2="50" />
            <line x1="0" x2="700" y1="100" y2="100" />
            <line x1="0" x2="700" y1="150" y2="150" />
          </g>

          {/* Previous Week Dashed Line */}
          <path
            d="M0,100 L100,110 L200,90 L300,120 L400,100 L500,110 L600,105 L700,95"
            fill="none"
            stroke="#87a0cd"
            strokeWidth="2"
            strokeDasharray="4 4"
          />

          {/* Current Week Area & Solid Line */}
          <path
            d="M0,120 L100,150 L200,140 L300,180 L400,160 L500,190 L600,180 L700,185 L700,200 L0,200 Z"
            fill="url(#analyticsBlueGradient)"
          />
          <path
            d="M0,120 L100,150 L200,140 L300,180 L400,160 L500,190 L600,180 L700,185"
            fill="none"
            stroke="#006399"
            strokeWidth="3"
          />
        </svg>

        <div className="flex justify-between mt-4 font-label-md text-xs font-mono-data text-outline">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </div>

      <div className="flex gap-6 mt-4 pt-2 border-t border-surface-container">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-secondary"></div>
          <span className="font-label-md text-xs text-on-surface-variant font-medium">
            Current Week
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-[2px] bg-on-primary-container"></div>
          <span className="font-label-md text-xs text-on-surface-variant font-medium">
            Previous Week
          </span>
        </div>
      </div>
    </div>
  );
};
