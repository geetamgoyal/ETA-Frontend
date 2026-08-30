import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Train } from '../../types/train';
import { StatusBadge } from '../common/StatusBadge';
import { DelayBadge } from '../common/DelayBadge';
import { ConfidenceBar } from '../common/ConfidenceBar';

interface TrainDataTableProps {
  trains: Train[];
}

export const TrainDataTable: React.FC<TrainDataTableProps> = ({ trains }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm flex flex-col overflow-hidden">
      {/* Table Header */}
      <div className="px-margin py-4 border-b border-outline-variant/30 flex justify-between items-center bg-surface-bright/50">
        <div className="flex items-center gap-3">
          <h3 className="font-headline-sm text-headline-sm font-bold text-primary">
            Live Train Operations
          </h3>
          <div className="flex items-center gap-1.5 bg-[#ecfdf5] text-[#059669] px-2.5 py-1 rounded-full text-xs font-bold border border-[#a7f3d0]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
            Live Update
          </div>
        </div>
        <span className="font-label-md text-xs text-on-surface-variant hidden sm:block">
          Last updated: Just now
        </span>
      </div>

      {/* Table Data */}
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low border-b border-outline-variant/30">
              <th className="py-3 px-4 font-label-md text-xs text-on-surface-variant uppercase whitespace-nowrap font-bold">
                Train
              </th>
              <th className="py-3 px-4 font-label-md text-xs text-on-surface-variant uppercase whitespace-nowrap font-bold">
                Location
              </th>
              <th className="py-3 px-4 font-label-md text-xs text-on-surface-variant uppercase whitespace-nowrap text-right font-bold">
                Delay
              </th>
              <th className="py-3 px-4 font-label-md text-xs text-on-surface-variant uppercase whitespace-nowrap font-bold">
                Speed
              </th>
              <th className="py-3 px-4 font-label-md text-xs text-secondary uppercase whitespace-nowrap bg-secondary-fixed/20 border-l border-r border-outline-variant/10 font-bold">
                AI Predicted ETA
              </th>
              <th className="py-3 px-4 font-label-md text-xs text-on-surface-variant uppercase whitespace-nowrap text-center font-bold">
                Status
              </th>
              <th className="py-3 px-4 font-label-md text-xs text-on-surface-variant uppercase whitespace-nowrap text-right font-bold">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="font-body-md text-sm divide-y divide-outline-variant/20">
            {trains.map((train, idx) => {
              const isCritical = train.currentDelayMinutes > 30 || train.status.toLowerCase().includes('critical');

              return (
                <tr
                  key={train.id}
                  className={`hover:bg-surface-variant/30 transition-colors ${
                    isCritical
                      ? 'bg-error-container/5 border-l-2 border-l-error'
                      : idx % 2 === 1
                      ? 'bg-[#f1f5f9]/50'
                      : ''
                  }`}
                >
                  {/* Train Name & Code */}
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col">
                      <span className={`font-semibold ${isCritical ? 'text-error' : 'text-primary'}`}>
                        {train.trainNumber}
                      </span>
                      <span className="text-xs text-on-surface-variant font-medium">
                        {train.trainName}
                      </span>
                    </div>
                  </td>

                  {/* Location */}
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col">
                      <span className="text-on-surface font-medium">{train.currentLocation}</span>
                      <span className="text-xs text-on-surface-variant">
                        Next: {train.nextStation}
                      </span>
                    </div>
                  </td>

                  {/* Delay */}
                  <td className="py-3.5 px-4 text-right">
                    <DelayBadge delayMinutes={train.currentDelayMinutes} />
                  </td>

                  {/* Speed */}
                  <td className="py-3.5 px-4">
                    <span
                      className={`font-mono-data text-mono-data ${
                        train.currentSpeedKmH === 0 && isCritical ? 'text-error font-bold' : 'text-on-surface'
                      }`}
                    >
                      {train.currentSpeedKmH} km/h
                    </span>
                  </td>

                  {/* AI Predicted ETA & Conf Bar */}
                  <td className="py-3.5 px-4 bg-secondary-fixed/10 border-l border-r border-outline-variant/10">
                    <div className="flex flex-col">
                      <span
                        className={`font-mono-data text-mono-data font-bold ${
                          isCritical ? 'text-error' : 'text-primary'
                        }`}
                      >
                        {train.aiPredictedEta}
                      </span>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-[10px] text-on-surface-variant uppercase">Conf:</span>
                        <ConfidenceBar confidencePercent={train.confidencePercent} />
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4 text-center">
                    <StatusBadge status={train.status} />
                  </td>

                  {/* Action Link */}
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => navigate(`/train/${train.id}`)}
                      className="text-secondary hover:text-secondary-container transition-colors p-1 rounded hover:bg-surface-container"
                      title="View Detailed Telemetry"
                    >
                      <span className="material-symbols-outlined text-[20px]">visibility</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-margin py-3 border-t border-outline-variant/30 flex justify-between items-center bg-surface">
        <span className="font-body-md text-xs text-on-surface-variant">
          Showing 1 to {trains.length} of 128 entries
        </span>
        <div className="flex items-center gap-1">
          <button className="p-1 rounded hover:bg-surface-variant text-on-surface-variant disabled:opacity-40" disabled>
            <span className="material-symbols-outlined text-[20px]">chevron_left</span>
          </button>
          <button className="w-7 h-7 rounded bg-primary text-on-primary font-body-md text-xs font-bold flex items-center justify-center">
            1
          </button>
          <button className="w-7 h-7 rounded hover:bg-surface-variant text-on-surface font-body-md text-xs flex items-center justify-center transition-colors">
            2
          </button>
          <button className="w-7 h-7 rounded hover:bg-surface-variant text-on-surface font-body-md text-xs flex items-center justify-center transition-colors">
            3
          </button>
          <span className="text-on-surface-variant text-xs">...</span>
          <button className="p-1 rounded hover:bg-surface-variant text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
};
