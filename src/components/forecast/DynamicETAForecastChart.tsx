import React from 'react';

export const DynamicETAForecastChart: React.FC = () => {
  const bars = [
    { label: '19:05', height: '90%', active: false },
    { label: '18:58', height: '75%', active: false },
    { label: '18:52', height: '60%', active: false },
    { label: '18:48', height: '45%', active: false },
    { label: '18:42', height: '35%', active: true },
  ];

  return (
    <section className="bg-white rounded-xl border border-outline-variant/30 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[22px]">monitoring</span>
          <h4 className="text-lg font-bold text-primary">Dynamic ETA Forecast Trend</h4>
        </div>
        <span className="text-xs font-bold text-secondary bg-secondary-fixed/30 border border-secondary/20 px-2.5 py-1 rounded">
          Live Model Trend
        </span>
      </div>

      <div className="relative h-48 w-full border-b border-l border-outline-variant/50 flex items-end justify-between px-6 pt-4">
        {bars.map((bar, idx) => (
          <div
            key={idx}
            className={`w-1/6 chart-bar-animation rounded-t relative group cursor-pointer transition-all duration-300 ${
              bar.active
                ? 'bg-primary shadow-md'
                : 'bg-secondary-container hover:bg-secondary'
            }`}
            style={{ height: bar.height }}
          >
            <div
              className={`absolute -top-7 left-1/2 -translate-x-1/2 text-xs font-mono-data font-bold px-1.5 py-0.5 rounded shadow-xs ${
                bar.active
                  ? 'bg-primary text-white'
                  : 'bg-surface-container text-on-surface opacity-80 group-hover:opacity-100'
              }`}
            >
              {bar.label}
            </div>
          </div>
        ))}
        {/* Forecast Dashed Extension */}
        <div className="w-1/6 h-[35%] border-t-2 border-dashed border-primary/50 opacity-40"></div>

        <div className="absolute -bottom-6 left-0 text-[11px] font-mono-data text-on-surface-variant font-medium">
          2h ago
        </div>
        <div className="absolute -bottom-6 right-0 text-[11px] font-mono-data text-primary font-bold">
          Predicted (Now)
        </div>
      </div>

      <p className="mt-10 text-xs text-on-surface-variant italic text-center font-medium">
        Prediction accuracy has improved by 14% since the last block station crossing.
      </p>
    </section>
  );
};
