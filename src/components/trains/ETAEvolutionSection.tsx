import React, { useMemo, useState } from 'react';
import { Train, EtaHistoryPoint } from '../../types/train';
import { clsx } from 'clsx';

interface ETAEvolutionSectionProps {
  train: Train;
}

export const ETAEvolutionSection: React.FC<ETAEvolutionSectionProps> = ({ train }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const history: EtaHistoryPoint[] = useMemo(() => {
    return train.etaHistory && train.etaHistory.length > 0 ? train.etaHistory : [];
  }, [train.etaHistory]);

  const scheduledEta = train.previousEta;

  // Compute chart coordinates
  const W = 680;
  const H = 200;
  const PAD = { top: 28, right: 24, bottom: 36, left: 50 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  // Convert "HH:MM" to minutes for numeric plotting
  const parseTime = (t: string) => {
    const [h, m] = t.split(':').map(Number);
    return (h || 0) * 60 + (m || 0);
  };

  const schedMins = parseTime(scheduledEta);
  const dataPoints = history.map((pt) => ({
    ...pt,
    predMins: parseTime(pt.predictedEta),
  }));

  // Min and max for Y-axis (include scheduled baseline and predicted points)
  const allMins = [schedMins, ...dataPoints.map((d) => d.predMins)];
  const minMins = Math.min(...allMins) - 5;
  const maxMins = Math.max(...allMins) + 5;
  const rangeMins = Math.max(maxMins - minMins, 10);

  const toX = (i: number) =>
    PAD.left + (i / Math.max(dataPoints.length - 1, 1)) * chartW;
  const toY = (mins: number) =>
    PAD.top + chartH - ((mins - minMins) / rangeMins) * chartH;

  const baselineY = toY(schedMins);

  const points = dataPoints.map((d, i) => ({
    x: toX(i),
    y: toY(d.predMins),
    ...d,
  }));

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const areaPath = points.length > 0
    ? `${linePath} L ${points[points.length - 1].x.toFixed(1)},${PAD.top + chartH} L ${points[0].x.toFixed(1)},${PAD.top + chartH} Z`
    : '';

  // Trend determination
  const firstPt = dataPoints[0];
  const lastPt = dataPoints[dataPoints.length - 1];
  const netDrift = firstPt && lastPt ? lastPt.delayMinutes - firstPt.delayMinutes : 0;

  return (
    <section aria-label="ETA Evolution Visualization" className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 flex flex-col gap-4 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-outline-variant/30">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[20px]">show_chart</span>
            <h3 className="text-base font-bold text-on-surface">
              ETA Evolution Visualization
            </h3>
            <span className="text-[10px] font-bold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
              TIME-SERIES
            </span>
          </div>
          <p className="text-[11px] text-on-surface-variant mt-0.5">
            Historical progression of dynamically forecasted arrival times vs. static timetable baseline
          </p>
        </div>

        {/* Trend badge */}
        <div className="flex items-center gap-2">
          <span
            className={clsx(
              'text-[11px] font-bold px-2.5 py-1 rounded-full border',
              netDrift < 0
                ? 'bg-emerald-500/10 text-emerald-700 border-emerald-500/30'
                : netDrift > 0
                ? 'bg-amber-500/10 text-amber-700 border-amber-500/30'
                : 'bg-slate-500/10 text-slate-700 border-slate-500/30',
            )}
          >
            {netDrift < 0
              ? `▼ ${Math.abs(netDrift)} min recovered`
              : netDrift > 0
              ? `▲ ${Math.abs(netDrift)} min delay added`
              : '→ Consistent forecast'}
          </span>
          <span className="text-[10px] text-on-surface-variant bg-surface-container px-2 py-1 rounded font-mono">
            {dataPoints.length} snapshots recorded
          </span>
        </div>
      </div>

      {/* SVG Chart */}
      <div className="w-full bg-[#0a1626] rounded-xl p-3 border border-[#1e3d57] shadow-inner overflow-hidden">
        <div className="flex justify-between items-center px-3 py-1 text-[11px] text-slate-400 border-b border-slate-800">
          <div className="flex items-center gap-4">
            {/* Scheduled Baseline Legend */}
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-0.5 bg-amber-400 border-dashed border-t border-amber-400" />
              <span className="text-amber-300 font-semibold text-[11px]">Scheduled Baseline ({scheduledEta})</span>
            </div>
            {/* AI Predicted Line Legend */}
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#38bdf8] flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              </span>
              <span className="text-sky-300 font-semibold text-[11px]">Dynamic AI Prediction</span>
            </div>
          </div>

          <span className="text-[10px] text-slate-400 hidden sm:inline">
            Hover over nodes for inspection
          </span>
        </div>

        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-48 md:h-56" preserveAspectRatio="none">
          <defs>
            <linearGradient id="etaAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0.25, 0.5, 0.75].map((pct) => (
            <line
              key={pct}
              x1={PAD.left}
              y1={PAD.top + chartH * pct}
              x2={PAD.left + chartW}
              y2={PAD.top + chartH * pct}
              stroke="#1e3a5f"
              strokeWidth="0.8"
              strokeDasharray="3 3"
            />
          ))}

          {/* Scheduled Baseline (Dashed horizontal line) */}
          <line
            x1={PAD.left}
            y1={baselineY}
            x2={PAD.left + chartW}
            y2={baselineY}
            stroke="#f59e0b"
            strokeWidth="1.8"
            strokeDasharray="5 4"
          />
          <text
            x={PAD.left + 8}
            y={baselineY - 5}
            fill="#fbbf24"
            fontSize="10"
            fontWeight="bold"
            fontFamily="monospace"
          >
            SCHEDULED: {scheduledEta}
          </text>

          {/* Area fill */}
          {areaPath && <path d={areaPath} fill="url(#etaAreaGrad)" />}

          {/* Prediction Line */}
          {linePath && (
            <path
              d={linePath}
              fill="none"
              stroke="url(#lineGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Data Points */}
          {points.map((p, idx) => {
            const isHovered = hoveredIdx === idx;
            const isLast = idx === points.length - 1;
            return (
              <g
                key={idx}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Outer halo */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isHovered ? 8 : isLast ? 6 : 4}
                  fill={isLast ? '#38bdf8' : '#0284c7'}
                  fillOpacity={isHovered ? 0.9 : 0.6}
                  stroke="#ffffff"
                  strokeWidth={isHovered ? 2 : 1}
                />
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isHovered ? 4 : isLast ? 3 : 2}
                  fill="#ffffff"
                />

                {/* X-axis timestamp label */}
                <text
                  x={p.x}
                  y={PAD.top + chartH + 18}
                  fill="#94a3b8"
                  fontSize="9"
                  textAnchor="middle"
                  fontFamily="monospace"
                >
                  {p.timestamp}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hovered point details card */}
        {hoveredIdx !== null && points[hoveredIdx] && (
          <div className="mt-2 bg-slate-800/90 border border-slate-700 rounded-lg p-2.5 flex flex-wrap items-center justify-between gap-3 text-[11px] text-white">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-sky-400">schedule</span>
              <span>Time: <strong className="font-mono text-sky-200">{points[hoveredIdx].timestamp}</strong></span>
            </div>
            <div>
              Predicted ETA: <strong className="font-mono text-white text-xs">{points[hoveredIdx].predictedEta}</strong>
            </div>
            <div>
              Delay at Time: <strong className={clsx('font-mono', points[hoveredIdx].delayMinutes > 20 ? 'text-red-400' : 'text-amber-400')}>
                +{points[hoveredIdx].delayMinutes} min
              </strong>
            </div>
            <div>
              Confidence: <strong className="font-mono text-emerald-400">{points[hoveredIdx].confidence}%</strong>
            </div>
          </div>
        )}
      </div>

      {/* Evolution Step Breakdown Table (Exact format requested by prompt) */}
      <div className="border border-outline-variant/40 rounded-lg overflow-hidden">
        <div className="bg-surface-container-low px-4 py-2 border-b border-outline-variant/30 flex justify-between items-center">
          <span className="ops-label text-[10px] text-on-surface-variant font-bold">
            Prediction Change Over Time (Chronological Evolution)
          </span>
          <span className="text-[10px] text-on-surface-variant">
            Static Schedule Baseline: <strong className="font-mono text-on-surface">{scheduledEta}</strong>
          </span>
        </div>

        <div className="divide-y divide-outline-variant/20 overflow-x-auto">
          {dataPoints.map((pt, idx) => {
            const delay = pt.delayMinutes;
            const isLate = delay > 0;
            return (
              <div
                key={idx}
                className="px-4 py-2.5 flex items-center justify-between gap-4 text-[12px] hover:bg-surface-container-low/50 transition-colors"
              >
                {/* Evolution timestamp format: 16:00 → 18:28 */}
                <div className="flex items-center gap-2 font-mono font-bold text-on-surface">
                  <span className="text-on-surface-variant bg-surface-container px-2 py-0.5 rounded text-[11px]">
                    {pt.timestamp}
                  </span>
                  <span className="text-secondary text-base">→</span>
                  <span className="text-primary text-sm font-black bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                    {pt.predictedEta}
                  </span>
                </div>

                <div className="flex items-center gap-4 flex-wrap">
                  <span
                    className={clsx(
                      'font-mono text-[11px] font-bold px-2 py-0.5 rounded',
                      delay > 20
                        ? 'text-red-700 bg-red-100'
                        : delay > 5
                        ? 'text-amber-700 bg-amber-100'
                        : 'text-emerald-700 bg-emerald-100',
                    )}
                  >
                    {isLate ? `+${delay}m delay` : 'On Time'}
                  </span>

                  <span className="text-[11px] text-on-surface-variant font-mono hidden sm:inline">
                    {pt.confidence}% confidence
                  </span>

                  <span className="text-[10px] text-on-surface-variant italic">
                    {idx === dataPoints.length - 1 ? 'Latest forecast' : `Snapshot ${idx + 1}`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
