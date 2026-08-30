import React from 'react';
import { MOCK_DELAY_DISTRIBUTION } from '../../data/analytics';

export const DelayDistributionCard: React.FC = () => {
  return (
    <div className="bg-surface p-lg rounded-xl shadow-sm border border-surface-container-highest flex flex-col justify-between">
      <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-lg">
        Delay Distribution
      </h3>

      <div className="space-y-4">
        {MOCK_DELAY_DISTRIBUTION.map((item) => (
          <div key={item.range} className="space-y-1">
            <div className="flex justify-between font-label-md text-xs text-on-surface-variant font-semibold">
              <span>{item.range}</span>
              <span className="font-mono-data font-bold text-on-surface">{item.percentage}%</span>
            </div>
            <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
              <div
                className={`h-full ${item.colorClass} transition-all duration-500`}
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
