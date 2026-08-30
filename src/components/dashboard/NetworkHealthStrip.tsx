import React from 'react';

export const NetworkHealthStrip: React.FC = () => {
  return (
    <div className="bg-surface-container-lowest rounded-md p-3.5 shadow-sm border border-outline-variant/20 flex items-center gap-3">
      <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse flex-shrink-0"></div>
      <span className="font-body-md text-sm text-on-surface">
        <span className="font-bold text-primary">Network Health: Stable</span> | 82 trains on time • 34 delayed • 12 critical risks • 94.2% AI predictive confidence
      </span>
    </div>
  );
};
