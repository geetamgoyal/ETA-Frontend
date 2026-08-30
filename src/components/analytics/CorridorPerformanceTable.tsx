import React from 'react';
import { MOCK_CORRIDORS } from '../../data/analytics';

export const CorridorPerformanceTable: React.FC = () => {
  return (
    <div className="bg-surface rounded-xl shadow-sm border border-surface-container-highest overflow-hidden mb-xl">
      <div className="p-lg border-b border-surface-container flex justify-between items-center bg-surface-container-low/30">
        <div>
          <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
            Corridor Performance Analysis
          </h3>
          <p className="font-body-md text-xs text-on-surface-variant">
            Railway corridors requiring operational attention and priority clearance
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low font-label-md text-xs text-outline uppercase tracking-wider font-bold">
              <th className="px-lg py-3">Corridor</th>
              <th className="px-lg py-3">Trains</th>
              <th className="px-lg py-3">Avg Delay</th>
              <th className="px-lg py-3">On-Time Rate</th>
              <th className="px-lg py-3">Risk Status</th>
              <th className="px-lg py-3">Trend</th>
            </tr>
          </thead>
          <tbody className="font-body-md text-sm text-on-surface divide-y divide-surface-container">
            {MOCK_CORRIDORS.map((cor) => {
              const isHighRisk = cor.riskStatus === 'High Risk';
              const isModerate = cor.riskStatus === 'Moderate';

              return (
                <tr
                  key={cor.id}
                  className="hover:bg-surface-container-low transition-colors"
                >
                  <td className="px-lg py-4 font-bold text-primary">{cor.corridor}</td>
                  <td className="px-lg py-4 font-mono-data">{cor.trainsCount}</td>
                  <td className="px-lg py-4 font-mono-data font-semibold">
                    {cor.averageDelayMinutes} min
                  </td>
                  <td className="px-lg py-4 font-mono-data font-bold text-primary">
                    {cor.onTimeRatePercent}%
                  </td>
                  <td className="px-lg py-4">
                    <span
                      className={`px-2.5 py-1 rounded text-xs font-bold ${
                        isHighRisk
                          ? 'bg-error-container text-error'
                          : isModerate
                          ? 'bg-accent-green/10 text-accent-green'
                          : 'bg-secondary-container/20 text-secondary'
                      }`}
                    >
                      {cor.riskStatus}
                    </span>
                  </td>
                  <td className="px-lg py-4">
                    <div
                      className={`flex items-center gap-1 text-xs font-semibold ${
                        cor.trend === 'Increasing'
                          ? 'text-error'
                          : cor.trend === 'Improving'
                          ? 'text-accent-green'
                          : 'text-outline'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {cor.trend === 'Increasing'
                          ? 'trending_up'
                          : cor.trend === 'Improving'
                          ? 'trending_down'
                          : 'trending_flat'}
                      </span>
                      {cor.trend}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
