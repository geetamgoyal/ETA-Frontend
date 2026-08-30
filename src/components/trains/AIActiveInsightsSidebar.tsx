import React from 'react';
import { useNavigate } from 'react-router-dom';

export const AIActiveInsightsSidebar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-headline-sm text-headline-sm text-primary font-bold flex items-center gap-2">
        <span className="material-symbols-outlined text-secondary">auto_awesome</span>
        AI Active Insights
      </h3>

      {/* Insight 1: Critical */}
      <div className="bg-surface-container-lowest rounded-xl p-4 border-l-4 border-l-error border border-outline-variant/30 shadow-sm relative overflow-hidden group">
        <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
          <span className="material-symbols-outlined text-[100px] text-error">warning</span>
        </div>
        <div className="flex justify-between items-start mb-2 relative z-10">
          <span className="font-label-md text-xs text-error font-bold uppercase tracking-wider">
            High Risk Detected
          </span>
          <span className="text-xs font-mono-data text-on-surface-variant font-bold">
            Tr. 12050
          </span>
        </div>
        <h4 className="font-body-lg text-sm font-bold text-on-surface mb-1 relative z-10">
          High probability of delay increase
        </h4>
        <p className="font-body-md text-xs text-on-surface-variant mb-3 relative z-10 leading-relaxed">
          AI models predict a 85% chance current delay will expand to &gt;60m due to track maintenance ahead.
        </p>
        <button
          onClick={() => navigate('/train/12050')}
          className="w-full text-center py-2 rounded bg-error-container/50 text-error font-label-md text-xs font-bold hover:bg-error-container transition-colors relative z-10 border border-error/20 cursor-pointer"
        >
          Review Impact
        </button>
      </div>

      {/* Insight 2: Positive Recovery */}
      <div className="bg-surface-container-lowest rounded-xl p-4 border-l-4 border-l-[#10b981] border border-outline-variant/30 shadow-sm relative overflow-hidden group">
        <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
          <span className="material-symbols-outlined text-[100px] text-[#10b981]">trending_up</span>
        </div>
        <div className="flex justify-between items-start mb-2 relative z-10">
          <span className="font-label-md text-xs text-[#059669] font-bold uppercase tracking-wider">
            Recovery Prediction
          </span>
          <span className="text-xs font-mono-data text-on-surface-variant font-bold">
            Tr. 12309
          </span>
        </div>
        <h4 className="font-body-lg text-sm font-bold text-on-surface mb-1 relative z-10">
          Delay recovery predicted
        </h4>
        <p className="font-body-md text-xs text-on-surface-variant mb-3 relative z-10 leading-relaxed">
          Clear path forecasted. Train is expected to recover 8 mins of current delay before next major junction.
        </p>
        <button
          onClick={() => navigate('/route-predictions/12309')}
          className="w-full text-center py-2 rounded bg-green-50 text-[#059669] font-label-md text-xs font-bold hover:bg-green-100 transition-colors relative z-10 border border-green-200 cursor-pointer"
        >
          View Route Prediction
        </button>
      </div>

      {/* Insight 3: Anomaly Detected */}
      <div className="bg-surface-container-lowest rounded-xl p-4 border-l-4 border-l-[#b45309] border border-outline-variant/30 shadow-sm relative overflow-hidden group">
        <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
          <span className="material-symbols-outlined text-[100px] text-[#b45309]">query_stats</span>
        </div>
        <div className="flex justify-between items-start mb-2 relative z-10">
          <span className="font-label-md text-xs text-[#b45309] font-bold uppercase tracking-wider">
            Anomaly Detected
          </span>
          <span className="text-xs font-mono-data text-on-surface-variant font-bold">
            Tr. 12951
          </span>
        </div>
        <h4 className="font-body-lg text-sm font-bold text-on-surface mb-1 relative z-10">
          Unusual stoppage detected
        </h4>
        <p className="font-body-md text-xs text-on-surface-variant mb-3 relative z-10 leading-relaxed">
          Train speed dropped to 0 km/h outside scheduled stop zone. No official halt reported.
        </p>
        <button
          onClick={() => navigate('/alerts')}
          className="w-full text-center py-2 rounded bg-surface-variant text-on-surface font-label-md text-xs font-bold hover:bg-surface-container-high transition-colors relative z-10 cursor-pointer"
        >
          Investigate Alert
        </button>
      </div>
    </div>
  );
};
