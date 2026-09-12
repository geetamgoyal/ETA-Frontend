import React, { useMemo } from 'react';
import { Train } from '../../types/train';
import { useTrains } from '../../context/TrainContext';

// ── Station layout on a 860×360 SVG canvas ───────────────────────────────────
// Coordinates are based on a schematic of North / Central Indian railway network
const STATIONS: Record<string, { x: number; y: number; label: string; shortName: string }> = {
  MMCT: { x: 70,  y: 290, label: 'Mumbai Central', shortName: 'MMCT' },
  BRC:  { x: 140, y: 255, label: 'Vadodara Jn',    shortName: 'BRC'  },
  KOTA: { x: 230, y: 195, label: 'Kota Jn',        shortName: 'KOTA' },
  RKMP: { x: 245, y: 325, label: 'Rani Kamlapati', shortName: 'RKMP' },
  JHS:  { x: 265, y: 278, label: 'Jhansi',         shortName: 'JHS'  },
  GWL:  { x: 285, y: 240, label: 'Gwalior Jn',     shortName: 'GWL'  },
  AGC:  { x: 320, y: 205, label: 'Agra Cantt',     shortName: 'AGC'  },
  MTJ:  { x: 360, y: 170, label: 'Mathura Jn',     shortName: 'MTJ'  },
  NZM:  { x: 400, y: 125, label: 'Hzt. Nizamuddin',shortName: 'NZM'  },
  NDLS: { x: 410, y: 95,  label: 'New Delhi',      shortName: 'NDLS' },
  CNB:  { x: 510, y: 145, label: 'Kanpur Central', shortName: 'CNB'  },
  PRYJ: { x: 570, y: 160, label: 'Prayagraj Jn',   shortName: 'PRYJ' },
  BSB:  { x: 625, y: 150, label: 'Varanasi Jn',    shortName: 'BSB'  },
  PNBE: { x: 690, y: 140, label: 'Patna Jn',       shortName: 'PNBE' },
  HWH:  { x: 780, y: 148, label: 'Howrah Jn',      shortName: 'HWH'  },
};

// ── Track segments ─────────────────────────────────────────────────────────────
// Each segment: from, to, corridor color
const SEGMENTS: { from: string; to: string; color: string; corridor: string }[] = [
  // East Corridor — blue
  { from: 'NDLS', to: 'CNB',  color: '#0ea5e9', corridor: 'east' },
  { from: 'CNB',  to: 'PRYJ', color: '#0ea5e9', corridor: 'east' },
  { from: 'PRYJ', to: 'BSB',  color: '#0ea5e9', corridor: 'east' },
  { from: 'BSB',  to: 'PNBE', color: '#0ea5e9', corridor: 'east' },
  { from: 'PNBE', to: 'HWH',  color: '#0ea5e9', corridor: 'east' },
  // Central Corridor — green
  { from: 'NDLS', to: 'MTJ',  color: '#22c55e', corridor: 'central' },
  { from: 'NZM',  to: 'MTJ',  color: '#22c55e', corridor: 'central' },
  { from: 'MTJ',  to: 'AGC',  color: '#22c55e', corridor: 'central' },
  { from: 'AGC',  to: 'GWL',  color: '#22c55e', corridor: 'central' },
  { from: 'GWL',  to: 'JHS',  color: '#22c55e', corridor: 'central' },
  { from: 'JHS',  to: 'RKMP', color: '#22c55e', corridor: 'central' },
  // Western Corridor — amber
  { from: 'MMCT', to: 'BRC',  color: '#f59e0b', corridor: 'western' },
  { from: 'BRC',  to: 'KOTA', color: '#f59e0b', corridor: 'western' },
  { from: 'KOTA', to: 'NDLS', color: '#f59e0b', corridor: 'western' },
];

// ── Train route definitions ────────────────────────────────────────────────────
const TRAIN_ROUTES: Record<string, string[]> = {
  '12309': ['NDLS', 'CNB', 'PRYJ', 'BSB', 'PNBE', 'HWH'],
  '12002': ['NDLS', 'MTJ', 'AGC', 'GWL', 'JHS', 'RKMP'],
  '12050': ['NZM',  'MTJ', 'AGC', 'GWL', 'JHS'],
  '12951': ['MMCT', 'BRC', 'KOTA', 'NDLS'],
  '22436': ['NDLS', 'CNB', 'PRYJ', 'BSB'],
  '12274': ['NDLS', 'CNB', 'PRYJ', 'BSB', 'HWH'],
};

// ── Status → color ─────────────────────────────────────────────────────────────
function trainStatusColor(train: Train): string {
  if (train.currentDelayMinutes <= 2) return '#10b981';
  if (train.currentDelayMinutes <= 20) return '#f59e0b';
  return '#ef4444';
}

// ── Compute position along route using journeyProgressPercent ─────────────────
function getTrainXY(train: Train): { x: number; y: number } | null {
  const route = TRAIN_ROUTES[train.id];
  if (!route || route.length < 2) return null;
  const progress = Math.min(0.99, train.journeyProgressPercent / 100);
  const segments = route.length - 1;
  const raw = progress * segments;
  const segIdx = Math.min(Math.floor(raw), segments - 1);
  const segProgress = raw - segIdx;
  const from = STATIONS[route[segIdx]];
  const to   = STATIONS[route[segIdx + 1]];
  if (!from || !to) return null;
  return {
    x: from.x + (to.x - from.x) * segProgress,
    y: from.y + (to.y - from.y) * segProgress,
  };
}

// ── Map Legend ─────────────────────────────────────────────────────────────────
const LEGEND = [
  { color: '#0ea5e9', label: 'East Corridor (NDLS–HWH)' },
  { color: '#22c55e', label: 'Central Corridor (NZM–RKMP)' },
  { color: '#f59e0b', label: 'Western Corridor (MMCT–NDLS)' },
];
const STATUS_LEGEND = [
  { color: '#10b981', label: 'On Time' },
  { color: '#f59e0b', label: 'Minor Delay' },
  { color: '#ef4444', label: 'Critical Delay' },
];

// ── Main Map Component ─────────────────────────────────────────────────────────
interface NetworkSchematicMapProps {
  selectedTrainId?: string;
  onSelectTrain: (id: string) => void;
}

export const NetworkSchematicMap: React.FC<NetworkSchematicMapProps> = ({
  selectedTrainId,
  onSelectTrain,
}) => {
  const { trains } = useTrains();

  // Precompute positions
  const trainPositions = useMemo(
    () =>
      trains.map((t) => ({ train: t, pos: getTrainXY(t), color: trainStatusColor(t) })),
    [trains],
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-[#1e3d57]">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#0ea5e9] text-[16px]">map</span>
          <span className="text-[11px] font-bold text-[#93c5fd] tracking-wider uppercase">
            Live Network — North/Central India Rail Corridor
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-subtle" />
          <span className="text-[10px] text-[#64748b] font-mono">PROTOTYPE FEED</span>
        </div>
      </div>

      {/* SVG Map */}
      <div className="flex-1 relative overflow-hidden">
        <svg
          viewBox="0 0 860 370"
          className="w-full h-full"
          style={{ minHeight: 280 }}
          aria-label="Railway network schematic map"
        >
          {/* Background grid */}
          <defs>
            <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0d2035" strokeWidth="0.5" />
            </pattern>
            {/* Glow filter for selected train */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Grid bg */}
          <rect width="860" height="370" fill="#060f1a" />
          <rect width="860" height="370" fill="url(#mapGrid)" />

          {/* Track segments */}
          {SEGMENTS.map((seg, i) => {
            const from = STATIONS[seg.from];
            const to   = STATIONS[seg.to];
            if (!from || !to) return null;
            return (
              <g key={i}>
                {/* Shadow track */}
                <line
                  x1={from.x} y1={from.y}
                  x2={to.x}   y2={to.y}
                  stroke={seg.color}
                  strokeWidth="6"
                  strokeOpacity="0.06"
                  strokeLinecap="round"
                />
                {/* Main track */}
                <line
                  x1={from.x} y1={from.y}
                  x2={to.x}   y2={to.y}
                  stroke={seg.color}
                  strokeWidth="2.5"
                  strokeOpacity="0.55"
                  strokeLinecap="round"
                />
                {/* Rail sleeper pattern */}
                <line
                  x1={from.x} y1={from.y}
                  x2={to.x}   y2={to.y}
                  stroke={seg.color}
                  strokeWidth="1"
                  strokeOpacity="0.85"
                  strokeDasharray="1 8"
                  strokeLinecap="round"
                />
              </g>
            );
          })}

          {/* Station dots */}
          {Object.entries(STATIONS).map(([code, st]) => {
            const isMajor = ['NDLS', 'HWH', 'MMCT', 'CNB', 'BSB'].includes(code);
            return (
              <g key={code}>
                {/* Outer ring for major stations */}
                {isMajor && (
                  <circle cx={st.x} cy={st.y} r={8} fill="none" stroke="#1e3d57" strokeWidth="1" />
                )}
                {/* Station dot */}
                <circle
                  cx={st.x} cy={st.y}
                  r={isMajor ? 4 : 2.5}
                  fill={isMajor ? '#94a3b8' : '#475569'}
                  stroke={isMajor ? '#cbd5e1' : '#64748b'}
                  strokeWidth={isMajor ? 1.5 : 1}
                />
                {/* Station label */}
                <text
                  x={st.x}
                  y={st.y - 9}
                  fontSize={isMajor ? 8 : 7}
                  fill={isMajor ? '#94a3b8' : '#475569'}
                  textAnchor="middle"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight={isMajor ? '700' : '400'}
                >
                  {st.shortName}
                </text>
              </g>
            );
          })}

          {/* Train markers */}
          {trainPositions.map(({ train, pos, color }) => {
            if (!pos) return null;
            const isSelected = train.id === selectedTrainId;
            return (
              <g
                key={train.id}
                style={{ cursor: 'pointer' }}
                onClick={() => onSelectTrain(train.id)}
              >
                {/* Pulse ring for critical trains */}
                {train.currentDelayMinutes > 20 && (
                  <circle
                    cx={pos.x} cy={pos.y} r={16}
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="1.5"
                    strokeOpacity="0.35"
                    className="animate-ping-slow"
                  />
                )}
                {/* Selection ring */}
                {isSelected && (
                  <circle
                    cx={pos.x} cy={pos.y} r={18}
                    fill="none"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeOpacity="0.6"
                    strokeDasharray="4 3"
                  />
                )}
                {/* Train body */}
                <circle
                  cx={pos.x} cy={pos.y} r={10}
                  fill={isSelected ? '#fff' : '#0f1f30'}
                  stroke={color}
                  strokeWidth={isSelected ? 2.5 : 2}
                  filter={isSelected ? 'url(#glow)' : undefined}
                />
                {/* Train icon */}
                <text
                  x={pos.x} y={pos.y + 1}
                  fontSize="9"
                  fill={isSelected ? color : color}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontFamily="Material Symbols Outlined"
                  fontWeight="400"
                >
                  ▶
                </text>
                {/* Train number label */}
                <text
                  x={pos.x}
                  y={pos.y + 18}
                  fontSize="8"
                  fill={color}
                  textAnchor="middle"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="700"
                >
                  {train.trainNumber}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Footer: Legend */}
      <div className="px-3 py-2 border-t border-[#1e3d57] flex flex-wrap items-center gap-x-4 gap-y-1">
        {LEGEND.map((l) => (
          <span key={l.label} className="flex items-center gap-1.5 text-[9px] text-[#64748b]">
            <span className="w-5 h-0.5 rounded inline-block" style={{ background: l.color, opacity: 0.7 }} />
            {l.label}
          </span>
        ))}
        <span className="flex-1" />
        {STATUS_LEGEND.map((l) => (
          <span key={l.label} className="flex items-center gap-1 text-[9px] text-[#64748b]">
            <span className="w-2 h-2 rounded-full inline-block" style={{ background: l.color }} />
            {l.label}
          </span>
        ))}
      </div>
    </div>
  );
};
