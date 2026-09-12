import React, { useState, useMemo } from 'react';
import { useTrains } from '../../context/TrainContext';
import { TimeframeRange } from './ETAAnalyticsHeader';

interface ValidationPoint {
  id: string;
  trainNumber: string;
  trainName: string;
  section: string;
  actualDelayMin: number;
  predictedDelayMin: number;
  scheduledTime: string;
  actualTime: string;
  predictedTime: string;
  isLive?: boolean;
}

interface PredictedVsActualChartProps {
  timeframe: TimeframeRange;
}

export const PredictedVsActualChart: React.FC<PredictedVsActualChartProps> = ({ timeframe }) => {
  const { trains } = useTrains();
  const [hoveredPoint, setHoveredPoint] = useState<ValidationPoint | null>(null);

  // Generate validation points combining live trains with prototype run records
  const points: ValidationPoint[] = useMemo(() => {
    // 1. Live active trains
    const livePoints: ValidationPoint[] = trains.map((t) => {
      const scheduled = t.previousEta;
      const predicted = t.aiPredictedEta;
      const actual = t.currentDelayMinutes;
      // Slight simulated actual vs predicted variance
      const predictedMin = Math.max(0, actual + (t.id === '12002' ? 1 : t.id === '12274' ? 2 : 0));

      return {
        id: `live-${t.id}`,
        trainNumber: t.trainNumber,
        trainName: t.trainName,
        section: t.currentLocation,
        actualDelayMin: actual,
        predictedDelayMin: predictedMin,
        scheduledTime: scheduled,
        actualTime: scheduled,
        predictedTime: predicted,
        isLive: true,
      };
    });

    // 2. Completed historical validation runs based on timeframe
    const historicalRuns: ValidationPoint[] = [
      { id: 'h-1', trainNumber: '12424', trainName: 'Dibrugarh Rajdhani', section: 'CNB – PRYJ', actualDelayMin: 22, predictedDelayMin: 24, scheduledTime: '13:10', actualTime: '13:32', predictedTime: '13:34' },
      { id: 'h-2', trainNumber: '12004', trainName: 'Lucknow Shatabdi', section: 'NDLS – CNB', actualDelayMin: 5, predictedDelayMin: 4, scheduledTime: '12:45', actualTime: '12:50', predictedTime: '12:49' },
      { id: 'h-3', trainNumber: '22439', trainName: 'Vande Bharat Katra', section: 'NDLS – UMB', actualDelayMin: 0, predictedDelayMin: 1, scheduledTime: '14:00', actualTime: '14:00', predictedTime: '14:01' },
      { id: 'h-4', trainNumber: '12260', trainName: 'Sealdah Duronto', section: 'PRYJ – MGS', actualDelayMin: 34, predictedDelayMin: 32, scheduledTime: '15:20', actualTime: '15:54', predictedTime: '15:52' },
      { id: 'h-5', trainNumber: '12953', trainName: 'August Kranti Tejas', section: 'BRC – KOTA', actualDelayMin: 11, predictedDelayMin: 13, scheduledTime: '16:15', actualTime: '16:26', predictedTime: '16:28' },
      { id: 'h-6', trainNumber: '12019', trainName: 'Howrah Shatabdi', section: 'ASN – HWH', actualDelayMin: 8, predictedDelayMin: 7, scheduledTime: '17:05', actualTime: '17:13', predictedTime: '17:12' },
    ];

    if (timeframe === 'Today') {
      return [...livePoints, historicalRuns[0], historicalRuns[1]];
    } else if (timeframe === '7 Days') {
      return [...livePoints, ...historicalRuns];
    } else {
      return [
        ...livePoints,
        ...historicalRuns,
        { id: 'h-7', trainNumber: '12301', trainName: 'Howrah Rajdhani', section: 'MGS – GAYA', actualDelayMin: 15, predictedDelayMin: 16, scheduledTime: '11:20', actualTime: '11:35', predictedTime: '11:36' },
        { id: 'h-8', trainNumber: '12006', trainName: 'Kalka Shatabdi', section: 'PNP – NDLS', actualDelayMin: 3, predictedDelayMin: 3, scheduledTime: '10:15', actualTime: '10:18', predictedTime: '10:18' },
      ];
    }
  }, [trains, timeframe]);

  // Chart coordinate mapping (0 to 50 min delay space)
  const maxAxisMin = 50;
  const mapCoord = (val: number, size: number, padding: number) => {
    const clamped = Math.min(maxAxisMin, Math.max(0, val));
    return padding + (clamped / maxAxisMin) * (size - padding * 2);
  };

  const svgWidth = 520;
  const svgHeight = 320;
  const pad = 40;

  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/25 shadow-sm p-4 flex flex-col justify-between">
      {/* Chart Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-2.5 border-b border-outline-variant/15">
        <div>
          <h3 className="font-bold text-xs sm:text-sm text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[18px]">scatter_plot</span>
            Predicted ETA vs. Observed Actual ETA
          </h3>
          <p className="text-[11px] text-on-surface-variant">
            Correlation analysis: points closer to the 45° diagonal line indicate higher forecast precision
          </p>
        </div>
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-surface-container text-on-surface-variant self-start sm:self-auto">
          y = x Reference Line
        </span>
      </div>

      {/* SVG Scatter Plot */}
      <div className="relative my-2 flex justify-center">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto max-h-[300px]"
          aria-label="Scatter plot of Predicted vs Actual ETA"
        >
          {/* Background Grid */}
          {[0, 10, 20, 30, 40, 50].map((val) => {
            const x = mapCoord(val, svgWidth, pad);
            const y = svgHeight - mapCoord(val, svgHeight, pad);
            return (
              <g key={val}>
                {/* Vertical line */}
                <line x1={x} y1={pad} x2={x} y2={svgHeight - pad} stroke="#1e293b" strokeWidth="0.75" strokeDasharray="3 3" />
                {/* Horizontal line */}
                <line x1={pad} y1={y} x2={svgWidth - pad} y2={y} stroke="#1e293b" strokeWidth="0.75" strokeDasharray="3 3" />
                {/* X Axis Label */}
                <text x={x} y={svgHeight - pad + 14} fontSize="8" fill="#64748b" textAnchor="middle" fontFamily="JetBrains Mono, monospace">
                  +{val}m
                </text>
                {/* Y Axis Label */}
                <text x={pad - 6} y={y + 3} fontSize="8" fill="#64748b" textAnchor="end" fontFamily="JetBrains Mono, monospace">
                  +{val}m
                </text>
              </g>
            );
          })}

          {/* Axis Labels */}
          <text x={svgWidth / 2} y={svgHeight - 6} fontSize="9" fill="#94a3b8" textAnchor="middle" fontWeight="bold">
            Observed / Actual Handover Delay (Minutes) →
          </text>
          <text
            x={-svgHeight / 2}
            y="12"
            fontSize="9"
            fill="#94a3b8"
            textAnchor="middle"
            fontWeight="bold"
            transform="rotate(-90)"
          >
            AI Dynamically Predicted Delay (Minutes) →
          </text>

          {/* 45-Degree Line of Identity (Ideal Accuracy) */}
          <line
            x1={pad}
            y1={svgHeight - pad}
            x2={svgWidth - pad}
            y2={pad}
            stroke="#38bdf8"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="opacity-70"
          />

          {/* ±5 min tolerance band */}
          <polygon
            points={`
              ${pad},${svgHeight - pad}
              ${pad + 25},${svgHeight - pad}
              ${svgWidth - pad},${pad + 25}
              ${svgWidth - pad},${pad}
              ${svgWidth - pad - 25},${pad}
              ${pad},${svgHeight - pad - 25}
            `}
            fill="#38bdf8"
            fillOpacity="0.04"
          />

          {/* Plotted Data Points */}
          {points.map((p) => {
            const cx = mapCoord(p.actualDelayMin, svgWidth, pad);
            const cy = svgHeight - mapCoord(p.predictedDelayMin, svgHeight, pad);
            const isHovered = hoveredPoint?.id === p.id;

            return (
              <g
                key={p.id}
                className="cursor-pointer transition-transform"
                onMouseEnter={() => setHoveredPoint(p)}
                onMouseLeave={() => setHoveredPoint(null)}
              >
                {/* Hover ring */}
                {isHovered && (
                  <circle cx={cx} cy={cy} r="10" fill="none" stroke="#38bdf8" strokeWidth="1.5" className="animate-ping" />
                )}

                {/* Point dot */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? 6 : p.isLive ? 5 : 4}
                  fill={p.isLive ? '#0ea5e9' : '#10b981'}
                  stroke="#ffffff"
                  strokeWidth={isHovered ? 2 : 1}
                  className="transition-all"
                />

                {/* Train number label above point */}
                <text
                  x={cx}
                  y={cy - 7}
                  fontSize="7.5"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="bold"
                  fill={p.isLive ? '#38bdf8' : '#cbd5e1'}
                  textAnchor="middle"
                >
                  #{p.trainNumber}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Hover Info Tooltip Banner */}
      <div className="min-h-[44px] bg-surface-container-low p-2 rounded-lg border border-outline-variant/20 flex items-center justify-between text-xs">
        {hoveredPoint ? (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-primary">#{hoveredPoint.trainNumber}</span>
              <span className="font-bold text-on-surface truncate">{hoveredPoint.trainName}</span>
              <span className="text-[10px] text-outline">({hoveredPoint.section})</span>
            </div>
            <div className="flex items-center gap-3 font-mono text-[11px]">
              <span>Actual: <b className="text-on-surface">+{hoveredPoint.actualDelayMin}m</b></span>
              <span>Predicted: <b className="text-primary">+{hoveredPoint.predictedDelayMin}m</b></span>
              <span className="px-1.5 py-0.5 rounded bg-surface-container font-bold text-emerald-700">
                Δ {Math.abs(hoveredPoint.predictedDelayMin - hoveredPoint.actualDelayMin)}m error
              </span>
            </div>
          </div>
        ) : (
          <span className="text-[11px] text-outline italic">
            Hover over any plotted train point to inspect observed vs. predicted timetable delay
          </span>
        )}
      </div>
    </div>
  );
};
