import React from 'react';

export const RouteRiskPanel: React.FC = () => {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-5 shadow-ambient border border-outline-variant/20">
      <h3 className="font-headline-sm text-headline-sm font-bold text-primary mb-4 flex items-center gap-2">
        <span className="material-symbols-outlined text-on-surface-variant">warning</span>
        Route Risk Analysis
      </h3>

      <div className="space-y-3">
        {/* Risk 1 */}
        <div className="p-3 bg-surface rounded-lg border border-outline-variant/20 hover:border-outline-variant/50 transition-colors">
          <div className="flex justify-between items-center mb-1">
            <span className="font-body-md text-xs font-bold text-on-surface">
              Kanpur - Prayagraj
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#059669]/10 text-[#059669]">
              LOW RISK
            </span>
          </div>
          <p className="font-label-md text-xs text-on-surface-variant leading-relaxed">
            High probability of 10m recovery. Clear track allocation ahead on double line.
          </p>
        </div>

        {/* Risk 2 */}
        <div className="p-3 bg-surface rounded-lg border border-outline-variant/20 hover:border-outline-variant/50 transition-colors">
          <div className="flex justify-between items-center mb-1">
            <span className="font-body-md text-xs font-bold text-on-surface">
              Varanasi - Patna
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#d97706]/10 text-[#d97706]">
              MODERATE RISK
            </span>
          </div>
          <p className="font-label-md text-xs text-on-surface-variant leading-relaxed">
            Predicted minor congestion (+3m delay risk) near Mughalsarai / DDU yard junction.
          </p>
        </div>

        {/* Risk 3 */}
        <div className="p-3 bg-surface rounded-lg border border-outline-variant/20 hover:border-outline-variant/50 transition-colors">
          <div className="flex justify-between items-center mb-1">
            <span className="font-body-md text-xs font-bold text-on-surface">
              Operational Halt (Patna)
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#d97706]/10 text-[#d97706]">
              MEDIUM RISK
            </span>
          </div>
          <p className="font-label-md text-xs text-on-surface-variant leading-relaxed">
            Scheduled crew change. Potential 2-5m operational delay buffer needed.
          </p>
        </div>
      </div>
    </div>
  );
};
