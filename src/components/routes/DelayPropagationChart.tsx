import React from 'react';
import { Train } from '../../types/train';

interface DelayPropagationChartProps {
  train: Train;
}

export const DelayPropagationChart: React.FC<DelayPropagationChartProps> = ({ train }) => {
  const stations = train.stations || [];
  const maxDelay = Math.max(...stations.map((s) => s.predictedDelayMinutes), 10);
  const minDelay = Math.min(...stations.map((s) => s.predictedDelayMinutes), 0);
  const delaySpread = Math.max(maxDelay - minDelay, 5);

  const initialDelay = stations[0]?.predictedDelayMinutes ?? train.currentDelayMinutes;
  const destDelay = stations[stations.length - 1]?.predictedDelayMinutes ?? train.currentDelayMinutes;
  const netRecovery = Math.max(0, initialDelay - destDelay);

  // Compute SVG polyline points on a 100 x 100 viewBox
  const points = stations.map((st, i) => {
    const x = stations.length > 1 ? Math.round((i / (stations.length - 1)) * 100) : 50;
    // Higher delay = smaller y (higher in chart)
    const normalized = (st.predictedDelayMinutes - minDelay) / delaySpread;
    const y = Math.round(78 - normalized * 52);
    return { ...st, x, y };
  });

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ');
  const areaPath = points.length > 0
    ? `${linePath} L ${points[points.length - 1].x},90 L ${points[0].x},90 Z`
    : '';

  return (
    <div className="bg-surface-container-lowest rounded-xl p-5 shadow-ambient border border-outline-variant/20 ai-card-border">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-headline-sm text-headline-sm font-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-[#7c3aed]">timeline</span>
            Delay Propagation &amp; Recovery Curve
          </h3>
          <p className="text-[11px] text-on-surface-variant mt-0.5">
            Dynamic sectional delay progression across route stops for {train.trainNumber}
          </p>
        </div>
        <div className="text-right">
          <p className="font-label-md text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">Forecasted Recovery</p>
          <p className={`font-body-md text-sm font-bold ${netRecovery > 0 ? 'text-[#059669]' : 'text-on-surface'}`}>
            {netRecovery > 0 ? `▼ ${netRecovery} minutes` : 'Nominal schedule'}
          </p>
        </div>
      </div>

      <div className="h-52 w-full bg-surface relative rounded-lg border border-outline-variant/10 overflow-hidden px-2 pt-4 pb-8">
        {/* Horizontal Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between py-6 px-4 pointer-events-none">
          <div className="w-full border-t border-outline-variant/15 flex justify-between text-[9px] text-on-surface-variant/60 font-mono-data">
            <span>+{maxDelay}m</span>
          </div>
          <div className="w-full border-t border-outline-variant/15 flex justify-between text-[9px] text-on-surface-variant/60 font-mono-data">
            <span>+{Math.round((maxDelay + minDelay) / 2)}m</span>
          </div>
          <div className="w-full border-t border-outline-variant/15 flex justify-between text-[9px] text-on-surface-variant/60 font-mono-data">
            <span>{minDelay >= 0 ? `+${minDelay}m` : `${minDelay}m`}</span>
          </div>
        </div>

        {/* SVG Path Area Chart */}
        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <defs>
            <linearGradient id="routeDelayGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#006399" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#006399" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          {areaPath && (
            <path
              d={areaPath}
              fill="url(#routeDelayGradient)"
            />
          )}
          {linePath && (
            <path
              d={linePath}
              fill="none"
              stroke="#006399"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
            />
          )}
          {/* Data Points */}
          {points.map((p) => {
            const isDeparted = p.status === 'Departed';
            const isCurrent = p.status === 'Current';
            return (
              <circle
                key={p.stationCode}
                cx={p.x}
                cy={p.y}
                fill={isCurrent ? '#ba1a1a' : isDeparted ? '#64748b' : '#006399'}
                r={isCurrent ? 3.5 : 2.5}
                stroke="#fff"
                strokeWidth="1"
              >
                <title>{`${p.stationName} (${p.stationCode}): Delay +${p.predictedDelayMinutes}m, ETA ${p.actualOrPredictedArrival}`}</title>
              </circle>
            );
          })}
        </svg>

        {/* Dynamic Station Labels & Values */}
        <div className="absolute bottom-1.5 inset-x-2 flex justify-between items-center pointer-events-none">
          {points.map((p) => (
            <div
              key={p.stationCode}
              className="flex flex-col items-center text-center"
              style={{ minWidth: `${Math.floor(100 / Math.max(points.length, 1))}%` }}
            >
              <span className={`text-[10px] font-mono-data font-bold ${p.status === 'Current' ? 'text-error' : 'text-on-surface-variant'}`}>
                {p.stationCode}
              </span>
              <span className="text-[9px] font-mono-data text-on-surface-variant/80">
                {p.predictedDelayMinutes > 0 ? `+${p.predictedDelayMinutes}m` : '0m'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
