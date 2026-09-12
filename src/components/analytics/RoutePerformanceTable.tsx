import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface RouteCorridorData {
  id: string;
  name: string;
  corridor: string;
  zone: string;
  avgDelayMin: number;
  avgEtaErrorMin: number;
  confidencePercent: number;
  affectedTrains: Array<{ number: string; name: string }>;
  bottleneckCause: string;
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH';
}

const CORRIDORS_DATA: RouteCorridorData[] = [
  {
    id: 'cor-1',
    name: 'Kanpur – Prayagraj Section',
    corridor: 'East Grand Trunk Corridor (NDLS – HWH)',
    zone: 'North Central Railway',
    avgDelayMin: 17.5,
    avgEtaErrorMin: 2.8,
    confidencePercent: 92,
    affectedTrains: [
      { number: '12309', name: 'Rajdhani Express' },
      { number: '22436', name: 'Vande Bharat' },
      { number: '12274', name: 'Duronto Express' },
    ],
    bottleneckCause: 'High line density (88% block occupancy) + Temporary Speed Restriction (TSR 60 km/h) over KM 480-510.',
    riskLevel: 'HIGH',
  },
  {
    id: 'cor-2',
    name: 'Delhi – Agra Cantt Section',
    corridor: 'Central High-Speed Corridor (NDLS – AGC)',
    zone: 'Northern / North Central',
    avgDelayMin: 6.8,
    avgEtaErrorMin: 2.1,
    confidencePercent: 95,
    affectedTrains: [
      { number: '12002', name: 'Bhopal Shatabdi' },
      { number: '12050', name: 'Gatimaan Express' },
    ],
    bottleneckCause: 'Stable 160 km/h block with minor caution order over Yamuna bridge maintenance.',
    riskLevel: 'LOW',
  },
  {
    id: 'cor-3',
    name: 'Agra – Gwalior – Jhansi Section',
    corridor: 'Central Trunk Corridor (AGC – JHS)',
    zone: 'North Central Railway',
    avgDelayMin: 24.0,
    avgEtaErrorMin: 4.5,
    confidencePercent: 81,
    affectedTrains: [
      { number: '12050', name: 'Gatimaan Express' },
    ],
    bottleneckCause: 'Unscheduled stoppage outside Mathura outer crossover and mineral freight rake precedence.',
    riskLevel: 'HIGH',
  },
  {
    id: 'cor-4',
    name: 'Varanasi – Patna – Howrah Section',
    corridor: 'East Central Corridor (BSB – HWH)',
    zone: 'East Central / Eastern Railway',
    avgDelayMin: 12.4,
    avgEtaErrorMin: 3.2,
    confidencePercent: 88,
    affectedTrains: [
      { number: '12309', name: 'Rajdhani Express' },
      { number: '12274', name: 'Duronto Express' },
    ],
    bottleneckCause: 'Platform dwell extensions at Patna Jn and terminal platform reception delays into Howrah.',
    riskLevel: 'MODERATE',
  },
  {
    id: 'cor-5',
    name: 'Mumbai Central – Vadodara – Kota Section',
    corridor: 'Western Trunk Corridor (MMCT – NDLS)',
    zone: 'Western Railway',
    avgDelayMin: 3.5,
    avgEtaErrorMin: 1.9,
    confidencePercent: 96,
    affectedTrains: [
      { number: '12951', name: 'Mumbai Tejas Rajdhani' },
    ],
    bottleneckCause: 'Clear automatic signalling progression; optimal recovery buffers on Kota division.',
    riskLevel: 'LOW',
  },
];

export const RoutePerformanceTable: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRouteId, setSelectedRouteId] = useState<string>('cor-1');

  const selectedRoute = CORRIDORS_DATA.find((c) => c.id === selectedRouteId) || CORRIDORS_DATA[0];

  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/25 shadow-sm p-4 sm:p-5 flex flex-col gap-3">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-2.5 border-b border-outline-variant/15">
        <div>
          <h3 className="font-bold text-sm text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[18px]">alt_route</span>
            Corridor &amp; Route Performance Analysis
          </h3>
          <p className="text-xs text-on-surface-variant">
            Section-level operational delay averages, prediction error tolerances, and active bottlenecks
          </p>
        </div>
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-surface-container text-on-surface-variant self-start sm:self-auto">
          Click any corridor row to inspect details
        </span>
      </div>

      {/* Corridor Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[760px] text-xs">
          <thead>
            <tr className="bg-surface-container-low/70 border-b border-outline-variant/20 text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
              <th className="py-2.5 px-3">Railway Section</th>
              <th className="py-2.5 px-3">Corridor &amp; Zone</th>
              <th className="py-2.5 px-3">Avg Delay</th>
              <th className="py-2.5 px-3">Avg ETA Error</th>
              <th className="py-2.5 px-3">Confidence</th>
              <th className="py-2.5 px-3">Affected Rakes</th>
              <th className="py-2.5 px-3 text-right">Risk</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/15">
            {CORRIDORS_DATA.map((c) => {
              const isSelected = c.id === selectedRouteId;
              return (
                <tr
                  key={c.id}
                  onClick={() => setSelectedRouteId(c.id)}
                  className={`cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-primary/5 border-l-4 border-l-primary font-medium'
                      : 'hover:bg-surface-container-low/50'
                  }`}
                >
                  <td className="py-3 px-3 font-bold text-on-surface">
                    {c.name}
                  </td>
                  <td className="py-3 px-3 text-on-surface-variant">
                    <div>{c.corridor}</div>
                    <div className="text-[10px] text-outline">{c.zone}</div>
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-on-surface">
                    <span
                      className={`px-1.5 py-0.5 rounded ${
                        c.avgDelayMin > 15
                          ? 'text-red-700 bg-red-500/10'
                          : c.avgDelayMin > 5
                          ? 'text-amber-800 bg-amber-500/10'
                          : 'text-emerald-700 bg-emerald-500/10'
                      }`}
                    >
                      +{c.avgDelayMin}m
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-on-surface">
                    ±{c.avgEtaErrorMin} min
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-primary">
                    {c.confidencePercent}%
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex flex-wrap gap-1">
                      {c.affectedTrains.map((t) => (
                        <span
                          key={t.number}
                          className="px-1.5 py-0.2 rounded bg-surface-container font-mono text-[10px] font-bold text-on-surface"
                        >
                          #{t.number}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        c.riskLevel === 'HIGH'
                          ? 'bg-red-500/15 text-red-800 border border-red-500/30'
                          : c.riskLevel === 'MODERATE'
                          ? 'bg-amber-500/15 text-amber-800 border border-amber-500/30'
                          : 'bg-emerald-500/15 text-emerald-800 border border-emerald-500/30'
                      }`}
                    >
                      {c.riskLevel}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Selected Corridor Deep-Dive Card */}
      {selectedRoute && (
        <div className="mt-2 p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="font-bold text-on-surface text-sm">{selectedRoute.name}</span>
              <span className="text-[10px] font-mono text-primary font-bold">
                {selectedRoute.confidencePercent}% Model Confidence
              </span>
            </div>
            <p className="text-on-surface-variant leading-relaxed text-[11px]">
              <strong className="text-on-surface">Bottleneck Factors:</strong> {selectedRoute.bottleneckCause}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
            <button
              onClick={() => navigate('/live-network')}
              className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-hover transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
            >
              <span className="material-symbols-outlined text-[15px]">hub</span>
              <span>View on Map</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
