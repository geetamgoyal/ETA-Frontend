import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-outline-variant/20 pt-4 pb-4 px-margin flex flex-col sm:flex-row justify-between items-center text-center gap-2 bg-surface">
      <div className="flex items-center gap-3 text-xs text-on-surface-variant">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          Cluster Active (128 Nodes)
        </span>
        <span>•</span>
        <span>Model v4.2.0-rf-coaching</span>
      </div>
      <span className="font-body-md text-xs text-on-surface-variant font-medium">
        Avg Network Delay: 12 min | On-Time Performance: 64% | AI ETA Accuracy: 94.2%
      </span>
      <span className="text-[11px] text-outline">
        © RailForecast AI • Operational Intelligence Platform
      </span>
    </footer>
  );
};
