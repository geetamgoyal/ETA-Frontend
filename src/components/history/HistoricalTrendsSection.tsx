import React, { useState } from 'react';
import { DAILY_TRENDS } from '../../data/historicalData';
import { DailyTrendPoint } from '../../types/history';

export const HistoricalTrendsSection: React.FC = () => {
  const [hoveredTrend, setHoveredTrend] = useState<DailyTrendPoint | null>(null);

  const points = DAILY_TRENDS;
  const maxDelay = 20;
  const maxError = 5;

  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/25 p-4 sm:p-5 shadow-sm flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">trending_up</span>
            <h2 className="text-sm font-bold text-on-surface">
              Historical Operational &amp; Prediction Trends
            </h2>
          </div>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Daily delay progression, dynamic ETA prediction error convergence (MAE), and overall on-time punctuality rate.
          </p>
        </div>

        {hoveredTrend && (
          <div className="flex items-center gap-3 bg-surface-container-low px-3 py-1.5 rounded-lg border border-outline-variant/25 text-xs font-mono">
            <span className="font-bold text-on-surface">{hoveredTrend.label}:</span>
            <span className="text-amber-700 font-bold">Delay: +{hoveredTrend.avgDelayMinutes}m</span>
            <span className="text-indigo-700 font-bold">MAE: {hoveredTrend.avgEtaErrorMinutes}m</span>
            <span className="text-emerald-700 font-bold">On-Time: {hoveredTrend.onTimePercent}%</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* 1. Delay Over Time Chart */}
        <div className="bg-surface-container-low/40 rounded-lg p-3.5 border border-outline-variant/20 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span className="text-xs font-bold text-on-surface">Average Delay Over Time</span>
            </div>
            <span className="text-[10px] font-mono font-semibold text-on-surface-variant">Minutes</span>
          </div>

          <div className="h-36 w-full relative mt-1">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 320 120" preserveAspectRatio="none">
              <defs>
                <linearGradient id="delayGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="30" x2="320" y2="30" stroke="#94a3b8" strokeOpacity="0.15" strokeDasharray="3 3" />
              <line x1="0" y1="70" x2="320" y2="70" stroke="#94a3b8" strokeOpacity="0.15" strokeDasharray="3 3" />
              <line x1="0" y1="110" x2="320" y2="110" stroke="#94a3b8" strokeOpacity="0.15" />

              {/* Area path */}
              <polygon
                points={`
                  0,110
                  ${points.map((p, i) => `${(i / (points.length - 1)) * 320},${110 - (p.avgDelayMinutes / maxDelay) * 90}`).join(' ')}
                  320,110
                `}
                fill="url(#delayGrad)"
              />

              {/* Line path */}
              <polyline
                points={points.map((p, i) => `${(i / (points.length - 1)) * 320},${110 - (p.avgDelayMinutes / maxDelay) * 90}`).join(' ')}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Interactive points */}
              {points.map((p, i) => {
                const cx = (i / (points.length - 1)) * 320;
                const cy = 110 - (p.avgDelayMinutes / maxDelay) * 90;
                const isHovered = hoveredTrend?.date === p.date;
                return (
                  <g
                    key={p.date}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredTrend(p)}
                    onMouseLeave={() => setHoveredTrend(null)}
                  >
                    <circle cx={cx} cy={cy} r={isHovered ? 5 : 3.5} fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="flex justify-between items-center text-[9px] font-mono text-on-surface-variant mt-2 border-t border-outline-variant/15 pt-1.5">
            <span>05 Sep</span>
            <span>08 Sep</span>
            <span>12 Sep (Today)</span>
          </div>
        </div>

        {/* 2. ETA Prediction Error Over Time (MAE) */}
        <div className="bg-surface-container-low/40 rounded-lg p-3.5 border border-outline-variant/20 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
              <span className="text-xs font-bold text-on-surface">ETA Prediction Error (MAE)</span>
            </div>
            <span className="text-[10px] font-mono font-semibold text-on-surface-variant">Minutes</span>
          </div>

          <div className="h-36 w-full relative mt-1">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 320 120" preserveAspectRatio="none">
              <defs>
                <linearGradient id="errorGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="30" x2="320" y2="30" stroke="#94a3b8" strokeOpacity="0.15" strokeDasharray="3 3" />
              <line x1="0" y1="70" x2="320" y2="70" stroke="#94a3b8" strokeOpacity="0.15" strokeDasharray="3 3" />
              <line x1="0" y1="110" x2="320" y2="110" stroke="#94a3b8" strokeOpacity="0.15" />

              {/* Area path */}
              <polygon
                points={`
                  0,110
                  ${points.map((p, i) => `${(i / (points.length - 1)) * 320},${110 - (p.avgEtaErrorMinutes / maxError) * 90}`).join(' ')}
                  320,110
                `}
                fill="url(#errorGrad)"
              />

              {/* Line path */}
              <polyline
                points={points.map((p, i) => `${(i / (points.length - 1)) * 320},${110 - (p.avgEtaErrorMinutes / maxError) * 90}`).join(' ')}
                fill="none"
                stroke="#6366f1"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Points */}
              {points.map((p, i) => {
                const cx = (i / (points.length - 1)) * 320;
                const cy = 110 - (p.avgEtaErrorMinutes / maxError) * 90;
                const isHovered = hoveredTrend?.date === p.date;
                return (
                  <g
                    key={p.date}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredTrend(p)}
                    onMouseLeave={() => setHoveredTrend(null)}
                  >
                    <circle cx={cx} cy={cy} r={isHovered ? 5 : 3.5} fill="#6366f1" stroke="#ffffff" strokeWidth="1.5" />
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="flex justify-between items-center text-[9px] font-mono text-on-surface-variant mt-2 border-t border-outline-variant/15 pt-1.5">
            <span>3.8m baseline</span>
            <span className="text-indigo-700 font-bold">Stable convergence (~2.8–3.2m)</span>
            <span>3.2m latest</span>
          </div>
        </div>

        {/* 3. On-Time Performance Punctuality */}
        <div className="bg-surface-container-low/40 rounded-lg p-3.5 border border-outline-variant/20 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-bold text-on-surface">Daily Punctuality Rate</span>
            </div>
            <span className="text-[10px] font-mono font-semibold text-on-surface-variant">% On-Time</span>
          </div>

          <div className="h-36 w-full flex items-end justify-between gap-1.5 px-2 pt-4">
            {points.map((p) => {
              const isHovered = hoveredTrend?.date === p.date;
              const barHeightPercent = Math.max(15, (p.onTimePercent - 50) * 2); // scaled 50-100%
              return (
                <div
                  key={p.date}
                  className="flex-1 flex flex-col items-center gap-1 cursor-pointer group"
                  onMouseEnter={() => setHoveredTrend(p)}
                  onMouseLeave={() => setHoveredTrend(null)}
                >
                  <span className={`text-[9px] font-mono font-bold transition-opacity ${isHovered ? 'text-emerald-700 opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                    {Math.round(p.onTimePercent)}%
                  </span>
                  <div
                    className={`w-full rounded-t transition-all ${
                      isHovered ? 'bg-emerald-600 ring-2 ring-emerald-500/40' : 'bg-emerald-500/80 hover:bg-emerald-500'
                    }`}
                    style={{ height: `${barHeightPercent}%` }}
                  />
                  <span className="text-[8px] font-mono text-on-surface-variant truncate w-full text-center">
                    {p.label.split(' ')[0]}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center text-[9px] font-mono text-on-surface-variant mt-2 border-t border-outline-variant/15 pt-1.5">
            <span>7-day avg: 79.7%</span>
            <span className="text-emerald-700 font-bold">Benchmark target: 80%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
