import React from 'react';

export const PredictionConfidencePanel: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Prediction Confidence Score */}
      <section className="bg-white rounded-xl border border-outline-variant/30 overflow-hidden shadow-sm">
        <div className="bg-surface-container-high p-4 border-b border-outline-variant/20">
          <h4 className="text-xs font-bold text-primary uppercase tracking-wider">
            Prediction Confidence Score
          </h4>
        </div>
        <div className="p-5 space-y-5">
          <div className="text-center">
            <div className="text-4xl font-black text-primary font-mono-data">94%</div>
            <div className="text-xs font-bold text-secondary uppercase tracking-wider mt-1">
              High Confidence
            </div>
          </div>

          <div className="w-full bg-surface-container-low h-3 rounded-full overflow-hidden border border-outline-variant/20">
            <div className="bg-secondary h-full rounded-full transition-all duration-700" style={{ width: '94%' }}></div>
          </div>

          <div className="space-y-2.5 pt-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-on-surface-variant">Data Quality</span>
              <span className="font-bold text-secondary">Excellent</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-on-surface-variant">Live Telemetry Availability</span>
              <span className="font-bold text-on-surface">98%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-on-surface-variant">Pattern Match Strength</span>
              <span className="font-bold text-on-surface">91%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-on-surface-variant">Route Block Visibility</span>
              <span className="font-bold text-on-surface">High</span>
            </div>
          </div>
        </div>
      </section>

      {/* AI Operational Insights */}
      <section className="bg-white rounded-xl border border-outline-variant/30 overflow-hidden shadow-sm">
        <div className="bg-surface-container-high p-4 border-b border-outline-variant/20">
          <h4 className="text-xs font-bold text-primary uppercase tracking-wider">
            AI Operational Insights
          </h4>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex items-start gap-3 p-3 bg-secondary-container/10 rounded-lg border border-secondary-container/30">
            <span className="material-symbols-outlined text-secondary material-symbols-filled text-[20px]">
              trending_down
            </span>
            <div>
              <p className="text-xs font-bold text-on-surface">Delay Recovery Likely</p>
              <p className="text-[11px] text-on-surface-variant mt-0.5">
                78% probability of regaining 5+ mins on current stretch.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
            <span className="material-symbols-outlined text-green-700 material-symbols-filled text-[20px]">
              check_circle
            </span>
            <div>
              <p className="text-xs font-bold text-green-900">Low ETA Risk</p>
              <p className="text-[11px] text-green-800 mt-0.5">
                No major signal failures or weather disruptions predicted.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
            <span className="material-symbols-outlined text-amber-700 material-symbols-filled text-[20px]">
              info
            </span>
            <div>
              <p className="text-xs font-bold text-amber-900">Monitor Upcoming Halt</p>
              <p className="text-[11px] text-amber-800 mt-0.5">
                Medium risk of platform congestion at Varanasi Jn.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
