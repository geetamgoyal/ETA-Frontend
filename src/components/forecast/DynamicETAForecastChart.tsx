import React, { useMemo } from 'react';
import { Train, EtaHistoryPoint } from '../../types/train';
import { clsx } from 'clsx';

interface DynamicETAForecastChartProps {
  train: Train;
}

export const DynamicETAForecastChart: React.FC<DynamicETAForecastChartProps> = ({ train }) => {
  const history: EtaHistoryPoint[] = useMemo(() => {
    return (train.etaHistory ?? []).slice(-8); // show last 8 points
  }, [train.etaHistory]);

  if (history.length === 0) {
    return (
      <section className="bg-surface-container-lowest rounded-lg border border-outline-variant/60 p-4">
        <p className="text-[12px] text-on-surface-variant text-center py-8">No ETA history available.</p>
      </section>
    );
  }

  // ── Compute chart bounds ──────────────────────────────────────────────────
  const delays = history.map((p) => p.delayMinutes);
  const minDelay = Math.min(...delays, 0);
  const maxDelay = Math.max(...delays, 5);
  const delayRange = Math.max(maxDelay - minDelay, 5);

  // Chart dimensions (SVG viewBox)
  const W = 600;
  const H = 160;
  const PAD = { top: 16, right: 12, bottom: 28, left: 40 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  // Map data → screen coordinates
  const toX = (idx: number) =>
    PAD.left + (idx / Math.max(history.length - 1, 1)) * chartW;
  const toY = (delay: number) =>
    PAD.top + chartH - ((delay - minDelay) / delayRange) * chartH;

  // Build SVG path
  const points = history.map((p, i) => ({ x: toX(i), y: toY(p.delayMinutes) }));
  const pathD = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(' ');

  // Gradient fill area
  const areaD = `${pathD} L${points[points.length - 1].x.toFixed(1)},${(PAD.top + chartH).toFixed(1)} L${PAD.left.toFixed(1)},${(PAD.top + chartH).toFixed(1)} Z`;

  // Current (last) point
  const current = history[history.length - 1];
  const currentX = points[points.length - 1].x;
  const currentY = points[points.length - 1].y;

  // Trend: positive = delay improving
  const trend = history.length >= 2
    ? history[0].delayMinutes - current.delayMinutes
    : 0;
  const isImproving = trend > 0;

  return (
    <section className="bg-surface-container-lowest rounded-lg border border-outline-variant/60 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-outline-variant/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-[18px]">monitoring</span>
          <div>
            <h4 className="text-[13px] font-bold text-on-surface">ETA Prediction History</h4>
            <p className="text-[11px] text-on-surface-variant">
              AI forecast evolution — last {history.length} model updates
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={clsx(
              'text-[11px] font-bold px-2 py-0.5 rounded border',
              isImproving
                ? 'text-status-ok-text bg-status-ok-bg border-status-ok-border'
                : 'text-status-warn-text bg-status-warn-bg border-status-warn-border',
            )}
          >
            {isImproving
              ? `▼ ${Math.abs(trend).toFixed(0)} min recovered`
              : trend < 0
              ? `▲ ${Math.abs(trend).toFixed(0)} min added`
              : '→ Stable'}
          </span>
          <span className="text-[11px] font-bold text-secondary px-2 py-0.5 rounded border border-secondary/20 bg-secondary/5">
            LIVE TREND
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="px-4 pb-4 pt-2">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full"
          style={{ height: '160px' }}
          aria-label="ETA prediction history chart"
        >
          <defs>
            <linearGradient id={`etaGrad-${train.id}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={isImproving ? '#16a34a' : '#d97706'} stopOpacity="0.15" />
              <stop offset="100%" stopColor={isImproving ? '#16a34a' : '#d97706'} stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Y-axis grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((frac) => {
            const y = PAD.top + chartH * (1 - frac);
            const delayVal = minDelay + frac * delayRange;
            return (
              <g key={frac}>
                <line
                  x1={PAD.left}
                  x2={W - PAD.right}
                  y1={y}
                  y2={y}
                  stroke="#e2e8f0"
                  strokeWidth="1"
                />
                <text
                  x={PAD.left - 6}
                  y={y + 4}
                  fontSize="9"
                  fill="#94a3b8"
                  textAnchor="end"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {delayVal.toFixed(0)}m
                </text>
              </g>
            );
          })}

          {/* Zero line (on-time) */}
          {minDelay <= 0 && (
            <line
              x1={PAD.left}
              x2={W - PAD.right}
              y1={toY(0)}
              y2={toY(0)}
              stroke="#16a34a"
              strokeWidth="1"
              strokeDasharray="4 3"
              opacity="0.5"
            />
          )}

          {/* Gradient fill */}
          <path d={areaD} fill={`url(#etaGrad-${train.id})`} />

          {/* Main line */}
          <path
            d={pathD}
            fill="none"
            stroke={isImproving ? '#16a34a' : '#d97706'}
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Data points */}
          {points.map((p, i) => {
            const isCurrent = i === points.length - 1;
            return (
              <g key={i}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isCurrent ? 5 : 3}
                  fill={isCurrent ? (isImproving ? '#16a34a' : '#d97706') : 'white'}
                  stroke={isImproving ? '#16a34a' : '#d97706'}
                  strokeWidth={isCurrent ? 2 : 1.5}
                />
                {/* X-axis label */}
                <text
                  x={p.x}
                  y={H - PAD.bottom + 14}
                  fontSize="9"
                  fill="#94a3b8"
                  textAnchor="middle"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {history[i].timestamp}
                </text>
              </g>
            );
          })}

          {/* Current ETA callout */}
          <rect
            x={currentX - 28}
            y={currentY - 22}
            width={56}
            height={16}
            rx="3"
            fill={isImproving ? '#16a34a' : '#d97706'}
          />
          <text
            x={currentX}
            y={currentY - 11}
            fontSize="10"
            fill="white"
            textAnchor="middle"
            fontFamily="JetBrains Mono, monospace"
            fontWeight="700"
          >
            {current.predictedEta}
          </text>
        </svg>

        {/* Legend */}
        <div className="flex items-center justify-between mt-1 px-1">
          <span className="text-[10px] text-on-surface-variant font-mono">
            ← {history[0]?.timestamp} (2h ago)
          </span>
          <div className="flex items-center gap-3 text-[10px] text-on-surface-variant">
            <span className="flex items-center gap-1">
              <span className="w-3 h-0.5 bg-status-ok inline-block rounded" />
              On time line
            </span>
            <span className="flex items-center gap-1">
              <span
                className={clsx(
                  'w-3 h-0.5 inline-block rounded',
                  isImproving ? 'bg-status-ok' : 'bg-status-warn',
                )}
              />
              AI ETA trend
            </span>
          </div>
          <span className="text-[10px] text-on-surface-variant font-mono">
            Now →
          </span>
        </div>
      </div>
    </section>
  );
};
