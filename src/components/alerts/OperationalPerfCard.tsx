import React from 'react';

export const OperationalPerfCard: React.FC = () => {
  return (
    <div className="bg-primary text-white rounded-xl shadow-ambient p-lg flex flex-col justify-center relative overflow-hidden">
      {/* Subtle radial pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '20px 20px',
        }}
      ></div>

      <h3 className="font-label-md text-xs text-on-primary/70 uppercase tracking-wider mb-md relative z-10 font-bold">
        Operational Performance
      </h3>

      <div className="grid grid-cols-2 gap-y-md gap-x-4 relative z-10">
        <div>
          <div className="text-on-primary/70 text-[11px] font-semibold mb-0.5">AVG RESPONSE TIME</div>
          <div className="font-display-lg text-2xl font-bold font-mono-data">4.2 min</div>
        </div>

        <div>
          <div className="text-on-primary/70 text-[11px] font-semibold mb-0.5">AI DETECTION ACCURACY</div>
          <div className="font-display-lg text-2xl font-bold text-secondary-fixed font-mono-data">
            94.8%
          </div>
        </div>

        <div className="col-span-2 mt-2 pt-3 border-t border-white/20 flex justify-between items-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-on-primary/80">
            ALERTS RESOLVED TODAY
          </span>
          <span className="font-bold text-lg text-alert-recovery bg-white/10 px-3 py-0.5 rounded-full font-mono-data">
            18
          </span>
        </div>
      </div>
    </div>
  );
};
