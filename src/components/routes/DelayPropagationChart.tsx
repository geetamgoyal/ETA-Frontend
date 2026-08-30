import React from 'react';

export const DelayPropagationChart: React.FC = () => {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-5 shadow-ambient border border-outline-variant/20 ai-card-border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-headline-sm text-headline-sm font-bold text-primary flex items-center gap-2">
          <span className="material-symbols-outlined text-[#7c3aed]">timeline</span>
          Delay Propagation Analysis
        </h3>
        <div className="text-right">
          <p className="font-label-md text-xs text-on-surface-variant">Max Recovery</p>
          <p className="font-body-md text-sm text-[#059669] font-bold">10 minutes</p>
        </div>
      </div>

      <div className="h-48 w-full bg-surface relative rounded-lg border border-outline-variant/10 overflow-hidden">
        {/* Horizontal Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between py-4 pointer-events-none">
          <div className="w-full border-t border-outline-variant/20"></div>
          <div className="w-full border-t border-outline-variant/20"></div>
          <div className="w-full border-t border-outline-variant/20"></div>
          <div className="w-full border-t border-outline-variant/20"></div>
        </div>

        {/* SVG Path Area Chart */}
        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <defs>
            <linearGradient id="routeDelayGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#006399" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#006399" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path
            d="M 0,20 L 25,70 L 50,65 L 75,50 L 100,50 L 100,100 L 0,100 Z"
            fill="url(#routeDelayGradient)"
          />
          <path
            d="M 0,20 L 25,70 L 50,65 L 75,50 L 100,50"
            fill="none"
            stroke="#006399"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
          />
          {/* Data Points */}
          <circle cx="0" cy="20" fill="#ba1a1a" r="2.5" stroke="#fff" strokeWidth="1" />
          <circle cx="25" cy="70" fill="#006399" r="2.5" stroke="#fff" strokeWidth="1" />
          <circle cx="50" cy="65" fill="#006399" r="2.5" stroke="#fff" strokeWidth="1" />
          <circle cx="75" cy="50" fill="#006399" r="2.5" stroke="#fff" strokeWidth="1" />
          <circle cx="100" cy="50" fill="#002046" r="2.5" stroke="#fff" strokeWidth="1" />
        </svg>

        {/* Station Labels */}
        <div className="absolute bottom-1 left-2 text-[10px] text-on-surface-variant font-mono-data font-semibold">
          Kanpur
        </div>
        <div className="absolute bottom-1 left-[23%] text-[10px] text-on-surface-variant font-mono-data font-semibold">
          Prayagraj
        </div>
        <div className="absolute bottom-1 left-[48%] text-[10px] text-on-surface-variant font-mono-data font-semibold">
          Varanasi
        </div>
        <div className="absolute bottom-1 left-[73%] text-[10px] text-on-surface-variant font-mono-data font-semibold">
          Patna
        </div>
        <div className="absolute bottom-1 right-2 text-[10px] text-on-surface-variant font-mono-data font-semibold">
          Howrah
        </div>

        {/* Value Chips */}
        <div className="absolute top-3 left-2 text-[10px] text-error font-bold bg-white/90 px-1.5 py-0.5 rounded shadow-xs border border-error/20">
          +18m
        </div>
        <div className="absolute top-[62%] left-[23%] text-[10px] text-secondary font-bold bg-white/90 px-1.5 py-0.5 rounded shadow-xs border border-secondary/20">
          +8m
        </div>
      </div>
    </div>
  );
};
