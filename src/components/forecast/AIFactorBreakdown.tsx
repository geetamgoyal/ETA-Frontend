import React from 'react';
import { Train } from '../../types/train';
import { getTrainDelayFactors } from '../../utils/trainFactors';

interface AIFactorBreakdownProps {
  train: Train;
}

export const AIFactorBreakdown: React.FC<AIFactorBreakdownProps> = ({ train }) => {
  const analysis = getTrainDelayFactors(train);
  const speedFactor = analysis.factors.find((f) => f.id === 'current_speed');
  const congestionFactor = analysis.factors.find((f) => f.id === 'route_congestion');
  const srtFactor = analysis.factors.find((f) => f.id === 'section_running_time');
  const dwellFactor = analysis.factors.find((f) => f.id === 'station_dwell');

  return (
    <section className="bg-white rounded-xl border border-outline-variant/30 p-6 shadow-sm">
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[22px]">analytics</span>
          <h4 className="text-lg font-bold text-primary">How AI Predicted This ETA</h4>
        </div>
        <span className="text-[10px] font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded border border-secondary/20 uppercase tracking-wider">
          Dynamic Factor Model
        </span>
      </div>

      <div className="space-y-4">
        {/* Factor 1: Current Operational Delay */}
        <div className="flex justify-between items-center p-3 bg-surface-container-low rounded-lg border border-outline-variant/20">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-error material-symbols-filled text-[20px]">
              warning
            </span>
            <div>
              <span className="text-sm font-semibold text-on-surface block">
                Current Operational Delay
              </span>
              <span className="text-[11px] text-on-surface-variant">
                Inherited sectional delay at current telemetry point
              </span>
            </div>
          </div>
          <span className="font-mono-data text-error font-bold text-base">
            +{analysis.initialDelayMinutes}m
          </span>
        </div>

        {/* 4 Factor Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex justify-between items-center p-3 bg-surface-container-low rounded-lg border-l-4 border-secondary border-y border-r border-outline-variant/10">
            <div>
              <span className="text-xs font-semibold text-on-surface block">Speed Recovery Profile</span>
              <span className="text-[10px] text-on-surface-variant">{speedFactor?.metricValue || `${train.currentSpeedKmH} km/h`}</span>
            </div>
            <span className={`font-mono-data font-bold text-sm ${((speedFactor?.impactMinutes ?? 0) <= 0) ? 'text-emerald-700' : 'text-error'}`}>
              {(speedFactor?.impactMinutes ?? 0) > 0 ? `+${speedFactor?.impactMinutes}m` : `${speedFactor?.impactMinutes ?? 0}m`}
            </span>
          </div>

          <div className="flex justify-between items-center p-3 bg-surface-container-low rounded-lg border-l-4 border-secondary border-y border-r border-outline-variant/10">
            <div>
              <span className="text-xs font-semibold text-on-surface block">Route Clearance / Congestion</span>
              <span className="text-[10px] text-on-surface-variant">{congestionFactor?.metricValue || 'Corridor Density'}</span>
            </div>
            <span className={`font-mono-data font-bold text-sm ${((congestionFactor?.impactMinutes ?? 0) <= 0) ? 'text-emerald-700' : 'text-error'}`}>
              {(congestionFactor?.impactMinutes ?? 0) > 0 ? `+${congestionFactor?.impactMinutes}m` : `${congestionFactor?.impactMinutes ?? 0}m`}
            </span>
          </div>

          <div className="flex justify-between items-center p-3 bg-surface-container-low rounded-lg border-l-4 border-secondary border-y border-r border-outline-variant/10">
            <div>
              <span className="text-xs font-semibold text-on-surface block">Section Running Time (SRT)</span>
              <span className="text-[10px] text-on-surface-variant">{srtFactor?.metricValue || 'Block Variance'}</span>
            </div>
            <span className={`font-mono-data font-bold text-sm ${((srtFactor?.impactMinutes ?? 0) <= 0) ? 'text-emerald-700' : 'text-error'}`}>
              {(srtFactor?.impactMinutes ?? 0) > 0 ? `+${srtFactor?.impactMinutes}m` : `${srtFactor?.impactMinutes ?? 0}m`}
            </span>
          </div>

          <div className="flex justify-between items-center p-3 bg-surface-container-low rounded-lg border border-outline-variant/10">
            <div>
              <span className="text-xs font-semibold text-on-surface block">Scheduled Halt Buffer</span>
              <span className="text-[10px] text-on-surface-variant">{dwellFactor?.description.slice(0, 35) || 'Dwell check'}...</span>
            </div>
            <span className={`font-mono-data text-xs font-bold ${((dwellFactor?.impactMinutes ?? 0) <= 0) ? 'text-emerald-700' : 'text-amber-700'}`}>
              {(dwellFactor?.impactMinutes ?? 0) > 0 ? `+${dwellFactor?.impactMinutes}m` : `${dwellFactor?.impactMinutes ?? 0}m`}
            </span>
          </div>
        </div>

        {/* Mathematically Rigorous Equation Banner */}
        <div className="mt-6 p-4 bg-primary text-white rounded-xl flex flex-wrap items-center justify-between gap-4 shadow-md">
          <div className="flex flex-wrap items-center justify-center gap-4 mx-auto text-center">
            <div>
              <div className="text-[10px] opacity-75 uppercase tracking-wider font-semibold">
                Initial Delay
              </div>
              <div className="text-lg sm:text-xl font-bold font-mono-data">+{analysis.initialDelayMinutes}m</div>
            </div>
            <span className="text-lg opacity-50 font-bold">+</span>
            <div>
              <div className="text-[10px] opacity-75 uppercase tracking-wider font-semibold">
                Dynamic Factor Delta
              </div>
              <div className={`text-lg sm:text-xl font-bold font-mono-data ${analysis.dynamicAdjustmentMinutes < 0 ? 'text-emerald-300' : analysis.dynamicAdjustmentMinutes > 0 ? 'text-amber-300' : 'text-white'}`}>
                {analysis.dynamicAdjustmentMinutes > 0 ? `+${analysis.dynamicAdjustmentMinutes}m` : `${analysis.dynamicAdjustmentMinutes}m`}
              </div>
            </div>
            <span className="text-lg opacity-50 font-bold">=</span>
            <div>
              <div className="text-[10px] opacity-75 uppercase tracking-wider font-semibold">
                Final Forecast Delay
              </div>
              <div className="text-xl sm:text-2xl font-black text-secondary-fixed font-mono-data">
                +{analysis.finalForecastDelayMinutes}m ({analysis.predictedDynamicEta})
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-between items-center text-[11px] text-on-surface-variant pt-2 border-t border-outline-variant/20 px-1">
          <span>Timetable Baseline: <strong>{analysis.scheduledEta}</strong></span>
          <span>Static Timetable ETA: <strong>{analysis.conventionalEta}</strong> (+{analysis.initialDelayMinutes}m)</span>
          <span className={analysis.deltaVsConventionalMinutes < 0 ? 'text-emerald-700 font-bold' : analysis.deltaVsConventionalMinutes > 0 ? 'text-error font-bold' : 'text-on-surface'}>
            {analysis.deltaVsConventionalMinutes < 0
              ? `AI Forecast: ${Math.abs(analysis.deltaVsConventionalMinutes)}m recovery before destination`
              : analysis.deltaVsConventionalMinutes > 0
              ? `AI Forecast: +${analysis.deltaVsConventionalMinutes}m cascading bottleneck delay`
              : 'AI Forecast: Running strictly on conventional recovery trajectory'}
          </span>
        </div>
      </div>
    </section>
  );
};
