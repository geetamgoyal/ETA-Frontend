import React, { useState, useMemo } from 'react';
import { useTrains } from '../../context/TrainContext';

// ── Station layout coordinates (North / Central / Western Indian Corridors) ───
export const STATIONS: Record<string, { x: number; y: number; label: string; shortName: string; isMajor?: boolean }> = {
  MMCT: { x: 80,  y: 380, label: 'Mumbai Central',   shortName: 'MMCT', isMajor: true  },
  BRC:  { x: 150, y: 340, label: 'Vadodara Jn',      shortName: 'BRC'                  },
  KOTA: { x: 260, y: 260, label: 'Kota Jn',          shortName: 'KOTA'                 },
  RKMP: { x: 280, y: 410, label: 'Rani Kamlapati',   shortName: 'RKMP'                 },
  JHS:  { x: 300, y: 350, label: 'Jhansi',           shortName: 'JHS'                  },
  GWL:  { x: 320, y: 300, label: 'Gwalior Jn',       shortName: 'GWL'                  },
  AGC:  { x: 360, y: 250, label: 'Agra Cantt',       shortName: 'AGC'                  },
  MTJ:  { x: 410, y: 210, label: 'Mathura Jn',       shortName: 'MTJ'                  },
  NZM:  { x: 450, y: 155, label: 'Hzt. Nizamuddin',  shortName: 'NZM'                  },
  NDLS: { x: 460, y: 115, label: 'New Delhi',        shortName: 'NDLS', isMajor: true  },
  CNB:  { x: 580, y: 180, label: 'Kanpur Central',   shortName: 'CNB',  isMajor: true  },
  PRYJ: { x: 660, y: 200, label: 'Prayagraj Jn',     shortName: 'PRYJ'                 },
  BSB:  { x: 730, y: 190, label: 'Varanasi Jn',      shortName: 'BSB',  isMajor: true  },
  PNBE: { x: 810, y: 175, label: 'Patna Jn',         shortName: 'PNBE'                 },
  HWH:  { x: 910, y: 185, label: 'Howrah Jn',        shortName: 'HWH',  isMajor: true  },
};

// ── Track Segments with Corridor metadata ─────────────────────────────────────
export const SEGMENTS = [
  // East Corridor (NDLS - HWH)
  { from: 'NDLS', to: 'CNB',  color: '#0284c7', corridor: 'east', label: 'Grand Trunk North' },
  { from: 'CNB',  to: 'PRYJ', color: '#0284c7', corridor: 'east', label: 'Kanpur-Prayagraj' },
  { from: 'PRYJ', to: 'BSB',  color: '#0284c7', corridor: 'east', label: 'Prayagraj-Varanasi' },
  { from: 'BSB',  to: 'PNBE', color: '#0284c7', corridor: 'east', label: 'Varanasi-Patna' },
  { from: 'PNBE', to: 'HWH',  color: '#0284c7', corridor: 'east', label: 'Patna-Howrah' },
  // Central Corridor (NZM - RKMP)
  { from: 'NDLS', to: 'MTJ',  color: '#16a34a', corridor: 'central', label: 'Delhi-Mathura' },
  { from: 'NZM',  to: 'MTJ',  color: '#16a34a', corridor: 'central', label: 'Nizamuddin-Mathura' },
  { from: 'MTJ',  to: 'AGC',  color: '#16a34a', corridor: 'central', label: 'Mathura-Agra' },
  { from: 'AGC',  to: 'GWL',  color: '#16a34a', corridor: 'central', label: 'Agra-Gwalior' },
  { from: 'GWL',  to: 'JHS',  color: '#16a34a', corridor: 'central', label: 'Gwalior-Jhansi' },
  { from: 'JHS',  to: 'RKMP', color: '#16a34a', corridor: 'central', label: 'Jhansi-Bhopal' },
  // Western Corridor (MMCT - NDLS)
  { from: 'MMCT', to: 'BRC',  color: '#d97706', corridor: 'western', label: 'Mumbai-Vadodara' },
  { from: 'BRC',  to: 'KOTA', color: '#d97706', corridor: 'western', label: 'Vadodara-Kota' },
  { from: 'KOTA', to: 'NDLS', color: '#d97706', corridor: 'western', label: 'Kota-Delhi' },
];

// ── Train Route Maps ──────────────────────────────────────────────────────────
export const TRAIN_ROUTES: Record<string, string[]> = {
  '12309': ['NDLS', 'CNB', 'PRYJ', 'BSB', 'PNBE', 'HWH'],
  '12002': ['NDLS', 'MTJ', 'AGC', 'GWL', 'JHS', 'RKMP'],
  '12050': ['NZM',  'MTJ', 'AGC', 'GWL', 'JHS'],
  '12951': ['MMCT', 'BRC', 'KOTA', 'NDLS'],
  '22436': ['NDLS', 'CNB', 'PRYJ', 'BSB'],
  '12274': ['NDLS', 'CNB', 'PRYJ', 'BSB', 'HWH'],
};

// ── Operational Caution Orders / Restrictions ─────────────────────────────────
const CAUTION_ZONES = [
  {
    id: 'tsr-1',
    from: 'CNB',
    to: 'PRYJ',
    label: 'TSR 60 km/h',
    reason: 'Track renewal between KM 480-510',
    type: 'caution',
  },
  {
    id: 'tsr-2',
    from: 'AGC',
    to: 'GWL',
    label: 'Freight Headway',
    reason: 'Heavy mineral rake ahead at crossover',
    type: 'headway',
  },
];

export const OperationalRailwayMap: React.FC = () => {
  const { trains, selectedTrainId, setSelectedTrainId } = useTrains();
  const [activeCorridor, setActiveCorridor] = useState<string>('all');
  const [showCautionOrders, setShowCautionOrders] = useState(true);
  const [showStationLabels, setShowStationLabels] = useState(true);
  const [hoveredStation, setHoveredStation] = useState<string | null>(null);

  const selectedTrain = trains.find((t) => t.id === selectedTrainId) || trains[0];
  const activeRoute = selectedTrain ? TRAIN_ROUTES[selectedTrain.id] || [] : [];

  // Compute position along route using journeyProgressPercent
  const trainPositions = useMemo(() => {
    return trains.map((t) => {
      const route = TRAIN_ROUTES[t.id];
      if (!route || route.length < 2) return { train: t, pos: null, color: '#10b981', angle: 0 };

      const progress = Math.min(0.99, Math.max(0.01, t.journeyProgressPercent / 100));
      const segments = route.length - 1;
      const raw = progress * segments;
      const segIdx = Math.min(Math.floor(raw), segments - 1);
      const segProgress = raw - segIdx;

      const from = STATIONS[route[segIdx]];
      const to = STATIONS[route[segIdx + 1]];

      if (!from || !to) return { train: t, pos: null, color: '#10b981', angle: 0 };

      const x = from.x + (to.x - from.x) * segProgress;
      const y = from.y + (to.y - from.y) * segProgress;
      const angle = Math.atan2(to.y - from.y, to.x - from.x) * (180 / Math.PI);

      let color = '#10b981'; // Normal
      if (t.status === 'Critical Delay' || t.status === 'Critical') {
        color = '#ef4444'; // Critical
      } else if (t.currentDelayMinutes > 2 || t.status === 'Minor Delay' || t.status === 'Recovering') {
        color = '#f59e0b'; // Delayed
      }

      return { train: t, pos: { x, y }, color, angle };
    });
  }, [trains]);

  // Check if a segment is part of selected train route
  const isSegmentInActiveRoute = (from: string, to: string) => {
    if (!activeRoute || activeRoute.length < 2) return false;
    for (let i = 0; i < activeRoute.length - 1; i++) {
      if (
        (activeRoute[i] === from && activeRoute[i + 1] === to) ||
        (activeRoute[i] === to && activeRoute[i + 1] === from)
      ) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/25 shadow-sm flex flex-col h-[650px] lg:h-[720px] overflow-hidden">
      {/* Map Control Toolbar */}
      <div className="p-3 border-b border-outline-variant/20 bg-surface-container-lowest flex flex-wrap items-center justify-between gap-2.5 z-10">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[20px]">map</span>
          <div>
            <h3 className="font-bold text-sm text-on-surface tracking-tight leading-none">
              Northern &amp; Central Railway Network
            </h3>
            <span className="text-[10px] text-on-surface-variant">
              Schematic track corridor topology with dynamic train telemetry
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {/* Corridor Selector */}
          <div className="flex items-center bg-surface-container-low rounded-lg p-0.5 border border-outline-variant/30 text-[11px]">
            <button
              onClick={() => setActiveCorridor('all')}
              className={`px-2 py-0.5 rounded font-bold transition-colors ${
                activeCorridor === 'all' ? 'bg-primary text-white' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              All Tracks
            </button>
            <button
              onClick={() => setActiveCorridor('east')}
              className={`px-2 py-0.5 rounded font-bold transition-colors ${
                activeCorridor === 'east' ? 'bg-sky-600 text-white' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              East Corridor
            </button>
            <button
              onClick={() => setActiveCorridor('central')}
              className={`px-2 py-0.5 rounded font-bold transition-colors ${
                activeCorridor === 'central' ? 'bg-emerald-600 text-white' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Central
            </button>
            <button
              onClick={() => setActiveCorridor('western')}
              className={`px-2 py-0.5 rounded font-bold transition-colors ${
                activeCorridor === 'western' ? 'bg-amber-600 text-white' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Western
            </button>
          </div>

          {/* Toggle Caution Orders */}
          <button
            onClick={() => setShowCautionOrders(!showCautionOrders)}
            className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold flex items-center gap-1 transition-colors ${
              showCautionOrders
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-800'
                : 'bg-surface-container-low border-outline-variant/30 text-outline'
            }`}
            title="Toggle caution order speed restriction indicators"
          >
            <span className="material-symbols-outlined text-[13px]">warning</span>
            <span>Caution Zones</span>
          </button>

          {/* Toggle Station Labels */}
          <button
            onClick={() => setShowStationLabels(!showStationLabels)}
            className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold flex items-center gap-1 transition-colors ${
              showStationLabels
                ? 'bg-primary/10 border-primary/30 text-primary'
                : 'bg-surface-container-low border-outline-variant/30 text-outline'
            }`}
          >
            <span className="material-symbols-outlined text-[13px]">label</span>
            <span>Labels</span>
          </button>
        </div>
      </div>

      {/* SVG Canvas Workspace (Dark Control-Room Theme) */}
      <div className="flex-1 relative bg-[#07111e] overflow-hidden select-none">
        {/* Background Grid Pattern */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #1e3a5f 1px, transparent 1px), linear-gradient(to bottom, #1e3a5f 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />

        {/* Ambient Radial Vignette */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[#050b14]/70 pointer-events-none" />

        {/* Main Operational SVG Map */}
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
          aria-label="Railway Corridor Schematic"
        >
          <defs>
            {/* Glow Filter for Selected Train & Active Route */}
            <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="trainGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.05   0 0 0 0 0.65   0 0 0 0 0.95  0 0 0 1 0" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Direction Arrow Marker */}
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
            </marker>
          </defs>

          {/* ── TRACK SEGMENTS ────────────────────────────────────────── */}
          {SEGMENTS.map((seg, i) => {
            const from = STATIONS[seg.from];
            const to = STATIONS[seg.to];
            if (!from || !to) return null;

            const isCorridorActive = activeCorridor === 'all' || activeCorridor === seg.corridor;
            const isInSelectedRoute = isSegmentInActiveRoute(seg.from, seg.to);

            const strokeOpacity = !isCorridorActive ? 0.08 : isInSelectedRoute ? 1 : 0.35;
            const strokeWidth = isInSelectedRoute ? 4 : 2;

            return (
              <g key={i} className="transition-all duration-300">
                {/* Outer Track Sleeper Layer */}
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={seg.color}
                  strokeWidth={strokeWidth + 4}
                  strokeOpacity={strokeOpacity * 0.15}
                  strokeLinecap="round"
                />

                {/* Main Rail Track */}
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={isInSelectedRoute ? '#38bdf8' : seg.color}
                  strokeWidth={strokeWidth}
                  strokeOpacity={strokeOpacity}
                  strokeLinecap="round"
                  filter={isInSelectedRoute ? 'url(#routeGlow)' : undefined}
                />

                {/* Rail Sleepers / Dashed Infill */}
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={isInSelectedRoute ? '#bae6fd' : '#ffffff'}
                  strokeWidth={strokeWidth - 0.5}
                  strokeOpacity={strokeOpacity * 0.6}
                  strokeDasharray="2 10"
                  strokeLinecap="round"
                />

                {/* Animated Flow Dots for Selected Train Route */}
                {isInSelectedRoute && (
                  <line
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeDasharray="4 24"
                    className="animate-pulse"
                    strokeOpacity="0.8"
                  />
                )}
              </g>
            );
          })}

          {/* ── CAUTION ORDER OVERLAYS ─────────────────────────────────── */}
          {showCautionOrders &&
            CAUTION_ZONES.map((cz) => {
              const from = STATIONS[cz.from];
              const to = STATIONS[cz.to];
              if (!from || !to) return null;
              const midX = (from.x + to.x) / 2;
              const midY = (from.y + to.y) / 2;

              return (
                <g key={cz.id} className="pointer-events-none">
                  {/* Danger Zone Dashed Outline */}
                  <line
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke="#f59e0b"
                    strokeWidth="6"
                    strokeDasharray="8 6"
                    strokeOpacity="0.5"
                  />
                  {/* Caution Badge */}
                  <g transform={`translate(${midX}, ${midY})`}>
                    <rect
                      x="-42"
                      y="-11"
                      width="84"
                      height="20"
                      rx="4"
                      fill="#1c1917"
                      stroke="#f59e0b"
                      strokeWidth="1.5"
                    />
                    <text
                      x="0"
                      y="3"
                      fill="#fef08a"
                      fontSize="9"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      ⚠ {cz.label}
                    </text>
                  </g>
                </g>
              );
            })}

          {/* ── STATION NODES ─────────────────────────────────────────── */}
          {Object.entries(STATIONS).map(([code, st]) => {
            const isHovered = hoveredStation === code;
            const isInSelectedRoute = activeRoute.includes(code);

            return (
              <g
                key={code}
                className="cursor-pointer transition-all"
                onMouseEnter={() => setHoveredStation(code)}
                onMouseLeave={() => setHoveredStation(null)}
              >
                {/* Major Junction Outer Halo */}
                {st.isMajor && (
                  <circle
                    cx={st.x}
                    cy={st.y}
                    r="10"
                    fill="none"
                    stroke={isInSelectedRoute ? '#38bdf8' : '#334155'}
                    strokeWidth="1.5"
                    strokeOpacity={isInSelectedRoute ? 0.9 : 0.5}
                  />
                )}

                {/* Station Node Core */}
                <circle
                  cx={st.x}
                  cy={st.y}
                  r={st.isMajor ? 5.5 : 3.5}
                  fill={isInSelectedRoute ? '#38bdf8' : '#0f172a'}
                  stroke={isInSelectedRoute ? '#ffffff' : '#94a3b8'}
                  strokeWidth={st.isMajor ? 2 : 1.5}
                />

                {/* Station Label */}
                {showStationLabels && (
                  <text
                    x={st.x}
                    y={st.y - (st.isMajor ? 14 : 10)}
                    fill={isInSelectedRoute ? '#ffffff' : isHovered ? '#38bdf8' : '#94a3b8'}
                    fontSize={st.isMajor ? '10' : '8.5'}
                    fontFamily="JetBrains Mono, monospace"
                    fontWeight={st.isMajor || isInSelectedRoute ? 'bold' : 'normal'}
                    textAnchor="middle"
                    className="select-none"
                  >
                    {st.shortName}
                  </text>
                )}

                {/* Station Full Name Tooltip on Hover */}
                {isHovered && (
                  <g transform={`translate(${st.x}, ${st.y + 20})`}>
                    <rect
                      x="-55"
                      y="-10"
                      width="110"
                      height="20"
                      rx="4"
                      fill="#0f172a"
                      stroke="#38bdf8"
                      strokeWidth="1"
                    />
                    <text
                      x="0"
                      y="4"
                      fill="#ffffff"
                      fontSize="9"
                      fontFamily="Inter, sans-serif"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {st.label}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* ── LIVE TRAIN MARKERS ────────────────────────────────────── */}
          {trainPositions.map(({ train, pos, color }) => {
            if (!pos) return null;
            const isSelected = train.id === selectedTrainId;
            const isCritical = train.status === 'Critical Delay' || train.status === 'Critical';

            return (
              <g
                key={train.id}
                className="cursor-pointer transition-transform duration-500"
                onClick={() => setSelectedTrainId(train.id)}
              >
                {/* Critical Delay Double-Ring Pulse */}
                {isCritical && (
                  <>
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="22"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="1.5"
                      className="animate-ping"
                      strokeOpacity="0.4"
                    />
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="16"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="1"
                      strokeOpacity="0.6"
                    />
                  </>
                )}

                {/* Selected Train Glow Ring & Heading Indicator */}
                {isSelected && (
                  <>
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="18"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="2"
                      strokeDasharray="4 3"
                      className="animate-spin-slow"
                    />
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="14"
                      fill="#0284c7"
                      fillOpacity="0.25"
                      filter="url(#trainGlow)"
                    />
                  </>
                )}

                {/* Train Locomotive Base Marker */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isSelected ? 11 : 8.5}
                  fill={isSelected ? '#ffffff' : '#091524'}
                  stroke={color}
                  strokeWidth={isSelected ? 3 : 2}
                  filter={isSelected ? 'url(#trainGlow)' : undefined}
                />

                {/* Locomotive Icon */}
                <text
                  x={pos.x}
                  y={pos.y + 1}
                  fontSize={isSelected ? '10' : '8'}
                  fill={isSelected ? '#0f172a' : color}
                  fontFamily="Inter, sans-serif"
                  fontWeight="black"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  🚆
                </text>

                {/* Train Floating Pill Banner (Always shown for selected, or compact for others) */}
                {isSelected ? (
                  <g transform={`translate(${pos.x}, ${pos.y - 28})`}>
                    <rect
                      x="-65"
                      y="-13"
                      width="130"
                      height="24"
                      rx="6"
                      fill="#0f172a"
                      stroke="#38bdf8"
                      strokeWidth="1.5"
                      filter="drop-shadow(0 4px 6px rgba(0,0,0,0.6))"
                    />
                    <text
                      x="0"
                      y="3"
                      fill="#ffffff"
                      fontSize="9.5"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      #{train.trainNumber} · {train.currentDelayMinutes > 0 ? `+${train.currentDelayMinutes}m` : 'ON TIME'} · {train.currentSpeedKmH}k
                    </text>
                  </g>
                ) : (
                  <g transform={`translate(${pos.x}, ${pos.y + 16})`}>
                    <rect
                      x="-24"
                      y="-7"
                      width="48"
                      height="14"
                      rx="3"
                      fill="#0c1828"
                      stroke={color}
                      strokeWidth="1"
                    />
                    <text
                      x="0"
                      y="3.5"
                      fill={color}
                      fontSize="8"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      #{train.trainNumber}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* Bottom Floating Map Legend */}
        <div className="absolute bottom-3 left-3 right-3 bg-surface-container-lowest/90 backdrop-blur-md rounded-lg border border-outline-variant/30 p-2.5 flex flex-wrap items-center justify-between gap-3 text-[11px] shadow-lg">
          {/* Status Markers */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-on-surface-variant font-bold uppercase text-[10px] tracking-wider">
              Indicators:
            </span>
            <span className="flex items-center gap-1.5 font-medium text-on-surface">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> On Time
            </span>
            <span className="flex items-center gap-1.5 font-medium text-on-surface">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Minor Delay
            </span>
            <span className="flex items-center gap-1.5 font-medium text-on-surface">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping-slow"></span> Critical Delay
            </span>
            <span className="flex items-center gap-1.5 font-medium text-on-surface">
              <span className="w-4 h-1 rounded bg-sky-400"></span> Active Route
            </span>
            <span className="flex items-center gap-1.5 font-medium text-amber-800">
              <span className="text-[12px]">⚠</span> Caution TSR
            </span>
          </div>

          {/* Quick Active Train Telemetry */}
          <div className="flex items-center gap-2 text-on-surface-variant font-mono text-[10px]">
            <span>Selected:</span>
            <span className="font-bold text-primary">#{selectedTrain.trainNumber} {selectedTrain.trainName}</span>
            <span>·</span>
            <span>{selectedTrain.currentLocation}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
