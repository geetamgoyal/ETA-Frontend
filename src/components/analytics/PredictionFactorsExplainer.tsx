import React from 'react';

interface FactorCard {
  title: string;
  category: string;
  relativeWeight: string;
  percentage: number;
  typicalImpact: string;
  description: string;
  icon: string;
  color: string;
}

const FACTORS: FactorCard[] = [
  {
    title: 'Current Speed vs. Sectional MPS',
    category: 'Kinematics & Telemetry',
    relativeWeight: 'High',
    percentage: 28,
    typicalImpact: '-4m to +8m',
    description: 'Compares real-time GPS/speedometer telemetry against Sectional Maximum Permissible Speed (MPS 130–160 km/h).',
    icon: 'speed',
    color: 'text-sky-600 bg-sky-500/10 border-sky-500/20',
  },
  {
    title: 'Accumulated Section Delay',
    category: 'State Persistence',
    relativeWeight: 'Dominant',
    percentage: 32,
    typicalImpact: 'Direct inheritance',
    description: 'Carries forward latent delay accumulated from earlier block divisions and previous crew/traction handovers.',
    icon: 'schedule',
    color: 'text-primary bg-primary/10 border-primary/20',
  },
  {
    title: 'Section Running Time (SRT) Variance',
    category: 'Track Physics',
    relativeWeight: 'Moderate',
    percentage: 14,
    typicalImpact: '+1m to +5m',
    description: 'Dynamic adjustments based on track gradients, curve restrictions, and headway buffering against the Working Timetable (WTT).',
    icon: 'straighten',
    color: 'text-indigo-600 bg-indigo-500/10 border-indigo-500/20',
  },
  {
    title: 'Station Dwell Time Variance',
    category: 'Terminal Operations',
    relativeWeight: 'Moderate',
    percentage: 10,
    typicalImpact: '+2m to +6m',
    description: 'Compares scheduled station dwell minutes against actual passenger boarding surges, parcel loading, and starter signal clearance.',
    icon: 'timer',
    color: 'text-amber-600 bg-amber-500/10 border-amber-500/20',
  },
  {
    title: 'Route & Junction Congestion',
    category: 'Network Capacity',
    relativeWeight: 'High in bottlenecks',
    percentage: 11,
    typicalImpact: '+3m to +10m',
    description: 'Track section occupancy index and preceding freight train headway on approach throats into major junctions (e.g. Kanpur, Mathura).',
    icon: 'hub',
    color: 'text-orange-600 bg-orange-500/10 border-orange-500/20',
  },
  {
    title: 'Operational Caution Orders (TSR)',
    category: 'Safety & Engineering',
    relativeWeight: 'High when active',
    percentage: 5,
    typicalImpact: '+2m to +8m',
    description: 'Enforced engineering speed restrictions (e.g. TSR 60 km/h for track maintenance or bridge renewal) along the active block.',
    icon: 'warning',
    color: 'text-red-600 bg-red-500/10 border-red-500/20',
  },
];

export const PredictionFactorsExplainer: React.FC = () => {
  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/25 shadow-sm p-4 sm:p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-outline-variant/15">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">psychology</span>
            <h3 className="font-bold text-sm text-on-surface tracking-tight">
              Prototype Prediction Factor Decomposition
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-800 uppercase tracking-wider font-mono">
              EXPLANATORY MODEL
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-0.5">
            The operational delay components modeled by the prototype forecast engine to estimate dynamic arrival time
          </p>
        </div>

        {/* Prototype Credibility Disclaimer */}
        <div className="text-[10px] text-on-surface-variant bg-surface-container-low px-3 py-1 rounded-md border border-outline-variant/30 font-medium">
          Deterministic railway physics model · Not an unverified ML blackbox
        </div>
      </div>

      {/* Factors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {FACTORS.map((f) => (
          <div
            key={f.title}
            className={`p-3.5 rounded-xl border ${f.color} flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-start justify-between gap-1 mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                  {f.category}
                </span>
                <span className="material-symbols-outlined text-[18px]">
                  {f.icon}
                </span>
              </div>

              <h4 className="font-bold text-xs text-on-surface leading-snug">
                {f.title}
              </h4>

              <div className="flex items-center justify-between text-[11px] my-2 pt-1 border-t border-black/5">
                <span className="text-on-surface-variant">Relative Weight:</span>
                <span className="font-mono font-bold text-on-surface">{f.percentage}% ({f.relativeWeight})</span>
              </div>

              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                {f.description}
              </p>
            </div>

            <div className="mt-3 pt-2 border-t border-black/5 flex items-center justify-between text-[10px]">
              <span className="text-outline">Section Impact:</span>
              <span className="font-mono font-bold text-on-surface bg-surface-container-lowest/80 px-1.5 py-0.5 rounded border border-outline-variant/20">
                {f.typicalImpact}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Model Synthesis Equation Strip */}
      <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-xs">
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] text-on-surface">
          <span className="font-bold text-primary">Predicted Arrival =</span>
          <span>Scheduled ETA</span>
          <span className="text-outline">+</span>
          <span>Accumulated Delay</span>
          <span className="text-outline">+</span>
          <span>Speed Delta</span>
          <span className="text-outline">+</span>
          <span>Congestion Buffer</span>
          <span className="text-outline">+</span>
          <span>TSR Hold</span>
        </div>
        <span className="text-[10px] font-bold text-outline uppercase tracking-wider">
          Mathematical Formulation
        </span>
      </div>
    </div>
  );
};
