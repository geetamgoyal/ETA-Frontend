import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_TRAINS } from '../../data/trains';
import { StatusBadge } from '../common/StatusBadge';
import { DelayBadge } from '../common/DelayBadge';

export const RecentETAChangesTable: React.FC = () => {
  return (
    <div className="bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/20 overflow-hidden flex flex-col">
      <div className="p-4 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-lowest">
        <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
          Recent ETA Changes
        </h3>
        <Link
          to="/train-monitoring"
          className="text-secondary font-label-md text-xs hover:underline font-semibold"
        >
          View All Trains →
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-surface-container-low font-label-md text-xs text-on-surface-variant uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4 font-semibold border-b border-outline-variant/20">Train</th>
              <th className="py-3 px-4 font-semibold border-b border-outline-variant/20">Current Location</th>
              <th className="py-3 px-4 font-semibold border-b border-outline-variant/20">Previous ETA</th>
              <th className="py-3 px-4 font-semibold border-b border-outline-variant/20">Updated AI ETA</th>
              <th className="py-3 px-4 font-semibold border-b border-outline-variant/20">Change</th>
              <th className="py-3 px-4 font-semibold border-b border-outline-variant/20">Status</th>
            </tr>
          </thead>
          <tbody className="font-body-md text-sm text-on-surface divide-y divide-outline-variant/10">
            {MOCK_TRAINS.map((train, idx) => (
              <tr
                key={train.id}
                className={`hover:bg-surface-container-high/30 transition-colors ${
                  idx % 2 === 1 ? 'bg-surface-container-low/40' : ''
                }`}
              >
                <td className="py-3 px-4 font-mono-data font-semibold text-primary">
                  <Link
                    to={`/train/${train.id}`}
                    className="hover:text-secondary hover:underline flex flex-col"
                  >
                    <span>{train.trainName}</span>
                    <span className="text-[11px] text-on-surface-variant font-normal">
                      #{train.trainNumber}
                    </span>
                  </Link>
                </td>
                <td className="py-3 px-4 text-on-surface">{train.currentLocation}</td>
                <td className="py-3 px-4 font-mono-data text-on-surface-variant">
                  {train.previousEta}
                </td>
                <td className="py-3 px-4 font-mono-data font-bold text-primary">
                  {train.aiPredictedEta}
                </td>
                <td className="py-3 px-4">
                  <DelayBadge delayMinutes={train.currentDelayMinutes} />
                </td>
                <td className="py-3 px-4">
                  <StatusBadge status={train.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
