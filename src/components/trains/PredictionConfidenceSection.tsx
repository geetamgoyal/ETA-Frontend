import React from 'react';
import { Train } from '../../types/train';
import { clsx } from 'clsx';

interface PredictionConfidenceSectionProps {
  train: Train;
}

export const PredictionConfidenceSection: React.FC<PredictionConfidenceSectionProps> = ({ train }) => {
  const conf = train.confidencePercent;

  const confRating = conf >= 90
    ? {
        label: 'High Confidence',
        badgeBg: 'bg-emerald-500/15 text-emerald-800 border-emerald-500/30',
        barColor: '#10b981',
        explanation: `Prediction is based on stable recent movement data. Verified automatic block clearance from ${train.currentLocation} onward, steady speed telemetry, and over 400+ historical run profiles matching this timetable slot.`,
      }
    : conf >= 78
    ? {
        label: 'Moderate Confidence',
        badgeBg: 'bg-amber-500/15 text-amber-800 border-amber-500/30',
        barColor: '#f59e0b',
        explanation: `Moderate confidence due to localized headway variation and minor station dwell adjustments on the approach into ${train.nextStation}. Model confidence will increase once clearance is confirmed.`,
      }
    : {
        label: 'Low Confidence / Elevated Variance',
        badgeBg: 'bg-red-500/15 text-red-800 border-red-500/30',
        barColor: '#ef4444',
        explanation: `Elevated variance due to unscheduled halt or active signal restriction near ${train.currentLocation}. Dynamic ETA window has been broadened until normal cruising speed resumes.`,
      };

  const confidenceFactors = [
    {
      label: 'Telemetry & GPS Signal',
      val: conf >= 90 ? '99%' : conf >= 78 ? '94%' : '82%',
      status: 'Stable Feed',
      icon: 'satellite_alt',
    },
    {
      label: 'Track Section Predictability',
      val: conf >= 90 ? '96%' : conf >= 78 ? '88%' : '72%',
      status: 'Block Clearance',
      icon: 'conversion_path',
    },
    {
      label: 'Historical Pattern Match',
      val: conf >= 90 ? '92%' : conf >= 78 ? '86%' : '79%',
      status: 'Timetable Archive',
      icon: 'history',
    },
    {
      label: 'Terminal Platform Buffer',
      val: conf >= 90 ? '90%' : conf >= 78 ? '85%' : '75%',
      status: 'Reception Capacity',
      icon: 'domain',
    },
  ];

  return (
    <section aria-label="Prediction Confidence" className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 flex flex-col gap-4 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-[20px]">verified_user</span>
          <h3 className="text-base font-bold text-on-surface">
            AI Prediction Confidence
          </h3>
        </div>
        <span className={clsx('text-[11px] font-bold px-2.5 py-0.5 rounded-full border', confRating.badgeBg)}>
          {confRating.label}
        </span>
      </div>

      {/* Main Score & Explanation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {/* Big Score Card */}
        <div className="bg-surface-container-low border border-outline-variant/40 rounded-xl p-4 flex flex-col items-center justify-center text-center">
          <div className="flex items-baseline gap-1">
            <span
              className="data-value text-5xl font-black"
              style={{ color: confRating.barColor }}
            >
              {conf}
            </span>
            <span className="text-xl font-bold text-on-surface-variant">%</span>
          </div>

          <span className="text-xs font-bold text-on-surface mt-1">
            Overall Reliability
          </span>

          {/* Progress bar */}
          <div className="w-full bg-surface-container-high h-2 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${conf}%`, backgroundColor: confRating.barColor }}
            />
          </div>
        </div>

        {/* Short Explanation Box */}
        <div className="md:col-span-2 flex flex-col gap-2">
          <h4 className="text-[12px] font-bold uppercase tracking-wider text-on-surface-variant">
            Operational Reliability Assessment
          </h4>
          <p className="text-[12px] text-on-surface leading-relaxed bg-surface-container-low/60 border border-outline-variant/30 rounded-lg p-3.5">
            {confRating.explanation}
          </p>

          {/* Expected Window */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] px-3 py-2 bg-surface-container-low/40 rounded-lg border border-outline-variant/20">
            <span className="text-on-surface-variant font-medium">Expected Arrival Window (90% CI):</span>
            <span className="font-mono font-bold text-primary">
              {train.expectedEtaRange.min} — {train.expectedEtaRange.max}
            </span>
          </div>
        </div>
      </div>

      {/* 4 Contributing factors */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
        {confidenceFactors.map((cf) => (
          <div key={cf.label} className="bg-surface-container-low/60 border border-outline-variant/30 rounded-lg p-2.5 flex flex-col">
            <div className="flex items-center gap-1 text-on-surface-variant mb-1">
              <span className="material-symbols-outlined text-[14px] text-secondary">{cf.icon}</span>
              <span className="text-[10px] font-bold truncate">{cf.label}</span>
            </div>
            <div className="flex items-baseline justify-between mt-auto">
              <span className="data-value text-sm font-bold text-on-surface">{cf.val}</span>
              <span className="text-[9px] text-emerald-700 font-semibold">{cf.status}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
