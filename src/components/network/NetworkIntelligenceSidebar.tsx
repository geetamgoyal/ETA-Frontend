import React from 'react';

export const NetworkIntelligenceSidebar: React.FC = () => {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-lg shadow-ambient border border-outline-variant/20 flex flex-col gap-4">
      <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
        Network Intelligence
      </h3>

      <div className="space-y-4">
        {/* Item 1: High Congestion */}
        <div className="relative pl-4 border-l-4 border-primary bg-surface-container-low p-4 rounded-r-lg hover:shadow-sm transition-shadow">
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-primary text-[18px]">traffic</span>
            <span className="font-label-md text-xs text-primary font-bold uppercase tracking-wider">
              High Congestion
            </span>
          </div>
          <p className="font-body-lg text-sm font-bold text-on-surface mb-2">
            Kanpur - Prayagraj corridor
          </p>
          <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
            <div>
              <span className="font-label-md text-outline block">Utilization</span>
              <span className="font-mono-data text-on-surface font-bold">85%</span>
            </div>
            <div>
              <span className="font-label-md text-outline block">Impact</span>
              <span className="font-mono-data text-error font-bold">+5 to +21m</span>
            </div>
          </div>
          <div className="mt-3 bg-error-container text-on-error-container font-label-md text-[10px] font-bold px-2 py-0.5 rounded inline-block">
            RISK: HIGH
          </div>
        </div>

        {/* Item 2: Delay Recovery */}
        <div className="relative pl-4 border-l-4 border-green-500 bg-surface-container-low p-4 rounded-r-lg hover:shadow-sm transition-shadow">
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-green-600 text-[18px]">
              trending_down
            </span>
            <span className="font-label-md text-xs text-green-700 font-bold uppercase tracking-wider">
              Delay Recovery
            </span>
          </div>
          <p className="font-body-lg text-sm font-bold text-on-surface mb-1">
            Delhi - Agra corridor
          </p>
          <p className="font-body-md text-xs text-on-surface-variant mb-2">
            Multiple coaching trains recovering on green path
          </p>
          <div className="text-xs">
            <span className="font-label-md text-outline mr-2">Avg recovery:</span>
            <span className="font-mono-data text-green-600 font-bold">6 min</span>
          </div>
        </div>

        {/* Item 3: Network Alert */}
        <div className="relative pl-4 border-l-4 border-amber-500 bg-surface-container-low p-4 rounded-r-lg hover:shadow-sm transition-shadow">
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-amber-600 text-[18px]">warning</span>
            <span className="font-label-md text-xs text-amber-700 font-bold uppercase tracking-wider">
              Network Alert
            </span>
          </div>
          <p className="font-body-lg text-sm font-bold text-on-surface mb-1">
            Unusual stoppage detected
          </p>
          <p className="font-body-md text-xs text-on-surface-variant mb-2">
            1 train stopped outside scheduled zone near Jhansi
          </p>
          <div className="flex items-center gap-2 text-xs">
            <span className="font-label-md text-outline">Status:</span>
            <span className="font-label-md text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded font-semibold">
              Under Investigation
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
