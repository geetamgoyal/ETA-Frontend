import React from 'react';
import { Link } from 'react-router-dom';

export const AIEtaInsightsPanel: React.FC = () => {
  return (
    <div className="bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/20 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-outline-variant/20 flex justify-between items-center ai-border-accent rounded-tl-lg bg-surface-container-lowest">
        <h3 className="font-headline-sm text-headline-sm text-primary font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary">temp_preferences_custom</span>
          AI ETA Insights
        </h3>
      </div>

      {/* Insights List */}
      <div className="p-4 flex flex-col gap-4">
        {/* Insight 1: Rajdhani */}
        <Link
          to="/eta-forecast/12309"
          className="bg-surface-container-low p-4 rounded-md border border-outline-variant/10 hover:shadow-sm hover:border-secondary/40 transition-all block"
        >
          <div className="flex justify-between items-start mb-2">
            <span className="font-label-md text-xs font-bold text-on-surface">
              Rajdhani Express 12309
            </span>
            <span className="bg-error-container text-on-error-container font-label-md px-2 py-0.5 rounded text-[10px] font-bold">
              Delay +18m
            </span>
          </div>
          <div className="flex justify-between items-end mt-3">
            <div>
              <span className="block font-label-md text-[11px] text-on-surface-variant mb-0.5">AI ETA</span>
              <span className="font-mono-data text-[18px] font-bold text-primary">18:42</span>
            </div>
            <div className="text-right">
              <span className="block font-label-md text-[11px] text-on-surface-variant mb-0.5">Confidence</span>
              <span className="font-mono-data text-secondary font-bold">94%</span>
            </div>
            <span className="material-symbols-outlined text-error text-[20px]" title="Delay Trend">
              trending_up
            </span>
          </div>
        </Link>

        {/* Insight 2: Shatabdi */}
        <Link
          to="/eta-forecast/12002"
          className="bg-surface-container-low p-4 rounded-md border border-outline-variant/10 hover:shadow-sm hover:border-secondary/40 transition-all block"
        >
          <div className="flex justify-between items-start mb-2">
            <span className="font-label-md text-xs font-bold text-on-surface">
              Shatabdi Express 12002
            </span>
            <span className="bg-yellow-100 text-yellow-800 font-label-md px-2 py-0.5 rounded text-[10px] font-bold">
              Delay +6m
            </span>
          </div>
          <div className="flex justify-between items-end mt-3">
            <div>
              <span className="block font-label-md text-[11px] text-on-surface-variant mb-0.5">AI ETA</span>
              <span className="font-mono-data text-[18px] font-bold text-primary">14:18</span>
            </div>
            <div className="text-right">
              <span className="block font-label-md text-[11px] text-on-surface-variant mb-0.5">Confidence</span>
              <span className="font-mono-data text-secondary font-bold">97%</span>
            </div>
            <span className="material-symbols-outlined text-secondary text-[20px]" title="Recovery Trend">
              trending_down
            </span>
          </div>
        </Link>

        {/* Insight 3: Gatimaan */}
        <Link
          to="/eta-forecast/12050"
          className="bg-surface-container-low p-4 rounded-md border border-outline-variant/10 hover:shadow-sm hover:border-secondary/40 transition-all block"
        >
          <div className="flex justify-between items-start mb-2">
            <span className="font-label-md text-xs font-bold text-on-surface">
              Gatimaan Express 12050
            </span>
            <span className="bg-error-container text-on-error-container font-label-md px-2 py-0.5 rounded text-[10px] font-bold">
              Delay +25m
            </span>
          </div>
          <div className="flex justify-between items-end mt-3">
            <div>
              <span className="block font-label-md text-[11px] text-on-surface-variant mb-0.5">AI ETA</span>
              <span className="font-mono-data text-[18px] font-bold text-primary">19:36</span>
            </div>
            <div className="text-right">
              <span className="block font-label-md text-[11px] text-on-surface-variant mb-0.5">Confidence</span>
              <span className="font-mono-data text-primary font-bold">89%</span>
            </div>
            <span className="material-symbols-outlined text-error text-[20px]" title="Risk Trend">
              trending_up
            </span>
          </div>
        </Link>

        <Link
          to="/eta-forecast"
          className="text-secondary font-label-md text-xs hover:underline self-end pt-1 font-semibold flex items-center gap-1"
        >
          View AI Forecast →
        </Link>
      </div>
    </div>
  );
};
