import React from 'react';

export const JourneyVisualizer: React.FC = () => {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-6 shadow-ambient mb-6 border border-outline-variant/20 hover:border-secondary/40 transition-colors">
      <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined text-secondary">route</span>
        Remaining Journey Visualization
      </h3>

      <div className="relative pt-8 pb-4 px-4 overflow-x-auto">
        {/* Progress Line */}
        <div className="absolute top-10 left-12 right-12 h-1.5 bg-surface-variant rounded-full z-0">
          <div className="h-full bg-primary rounded-full" style={{ width: '25%' }}></div>
        </div>

        {/* Nodes Container */}
        <div className="relative z-10 flex justify-between min-w-[750px]">
          {/* Current Node: Kanpur Central */}
          <div className="flex flex-col items-center gap-2 w-32 -ml-16">
            <div className="w-6 h-6 rounded-full bg-primary border-4 border-surface-container-lowest shadow-sm flex items-center justify-center">
              <span className="material-symbols-outlined text-[12px] text-on-primary">train</span>
            </div>
            <div className="text-center">
              <p className="font-label-md text-xs text-primary font-black">Kanpur Central</p>
              <p className="font-label-md text-[11px] font-bold text-error bg-error-container/50 px-2 py-0.5 rounded mt-1 inline-block">
                Delay: +18 min
              </p>
            </div>
          </div>

          {/* Node 2: Prayagraj */}
          <div className="flex flex-col items-center gap-2 w-32 -ml-16">
            <div className="w-4 h-4 rounded-full bg-surface-container-lowest border-2 border-secondary shadow-sm"></div>
            <div className="text-center">
              <p className="font-label-md text-xs text-on-surface font-bold">Prayagraj Jn</p>
              <p className="font-label-md text-[11px] font-bold text-secondary bg-secondary-container/30 px-2 py-0.5 rounded mt-1 inline-block">
                AI: +8 min
              </p>
            </div>
          </div>

          {/* Node 3: Varanasi */}
          <div className="flex flex-col items-center gap-2 w-32 -ml-16">
            <div className="w-4 h-4 rounded-full bg-surface-container-lowest border-2 border-outline-variant shadow-sm"></div>
            <div className="text-center">
              <p className="font-label-md text-xs text-on-surface font-bold">Varanasi Jn</p>
              <p className="font-label-md text-[11px] font-bold text-secondary bg-secondary-container/30 px-2 py-0.5 rounded mt-1 inline-block">
                AI: +9 min
              </p>
            </div>
          </div>

          {/* Node 4: Patna */}
          <div className="flex flex-col items-center gap-2 w-32 -ml-16">
            <div className="w-4 h-4 rounded-full bg-surface-container-lowest border-2 border-outline-variant shadow-sm"></div>
            <div className="text-center">
              <p className="font-label-md text-xs text-on-surface font-bold">Patna Jn</p>
              <p className="font-label-md text-[11px] font-bold text-secondary bg-secondary-container/30 px-2 py-0.5 rounded mt-1 inline-block">
                AI: +12 min
              </p>
            </div>
          </div>

          {/* Destination Node: Howrah */}
          <div className="flex flex-col items-center gap-2 w-32 -ml-16">
            <div className="w-6 h-6 rounded-full bg-surface-container-lowest border-4 border-primary shadow-sm flex items-center justify-center">
              <span className="material-symbols-outlined text-[14px] text-primary">flag</span>
            </div>
            <div className="text-center">
              <p className="font-label-md text-xs text-primary font-black">Destination</p>
              <p className="font-label-md text-[11px] font-bold text-on-primary bg-primary px-2.5 py-0.5 rounded mt-1 inline-block">
                ETA: 18:42
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
