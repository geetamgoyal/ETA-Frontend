import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_TRAINS } from '../../data/trains';
import { StatusBadge } from '../common/StatusBadge';
import { DelayBadge } from '../common/DelayBadge';

export const LiveTrainActivityTable: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');

  const filteredTrains = MOCK_TRAINS.filter((train) => {
    if (activeTab === 'on_time') return train.status.toLowerCase().includes('on time');
    if (activeTab === 'minor') return train.status.toLowerCase().includes('minor') || train.status.toLowerCase().includes('warning');
    if (activeTab === 'critical') return train.status.toLowerCase().includes('critical');
    if (activeTab === 'recovery') return train.status.toLowerCase().includes('recover');
    return true;
  });

  return (
    <div className="bg-surface-container-lowest rounded-xl p-lg shadow-ambient border border-outline-variant/20">
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
            Live Train Activity
          </h3>
          <p className="text-xs text-on-surface-variant">Active rolling fleet operations telemetry</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 font-label-md text-xs font-semibold rounded-full border transition-colors ${
              activeTab === 'all'
                ? 'bg-primary text-white border-primary shadow-xs'
                : 'bg-surface text-on-surface hover:bg-surface-container border-outline-variant/50'
            }`}
          >
            All Trains
          </button>
          <button
            onClick={() => setActiveTab('on_time')}
            className={`px-3.5 py-1.5 font-label-md text-xs font-semibold rounded-full border transition-colors ${
              activeTab === 'on_time'
                ? 'bg-primary text-white border-primary shadow-xs'
                : 'bg-surface text-on-surface hover:bg-surface-container border-outline-variant/50'
            }`}
          >
            On Time
          </button>
          <button
            onClick={() => setActiveTab('minor')}
            className={`px-3.5 py-1.5 font-label-md text-xs font-semibold rounded-full border transition-colors ${
              activeTab === 'minor'
                ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                : 'bg-surface text-on-surface hover:bg-surface-container border-outline-variant/50'
            }`}
          >
            Minor Delay
          </button>
          <button
            onClick={() => setActiveTab('critical')}
            className={`px-3.5 py-1.5 font-label-md text-xs font-semibold rounded-full border transition-colors ${
              activeTab === 'critical'
                ? 'bg-error text-white border-error shadow-xs'
                : 'bg-surface text-on-surface hover:bg-surface-container border-outline-variant/50'
            }`}
          >
            Critical Risk
          </button>
          <button
            onClick={() => setActiveTab('recovery')}
            className={`px-3.5 py-1.5 font-label-md text-xs font-semibold rounded-full border transition-colors flex items-center gap-1 ${
              activeTab === 'recovery'
                ? 'bg-secondary text-white border-secondary shadow-xs'
                : 'bg-primary-fixed/20 text-primary border-primary/30 hover:bg-primary-fixed/40'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
            AI Recovery
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-outline-variant/30 text-on-surface-variant font-label-md text-xs uppercase tracking-wider bg-surface-container-low/50">
              <th className="py-3 px-4 font-bold">Train</th>
              <th className="py-3 px-4 font-bold">Current Location</th>
              <th className="py-3 px-4 font-bold">Status</th>
              <th className="py-3 px-4 font-bold">Current Delay</th>
              <th className="py-3 px-4 font-bold">AI ETA</th>
              <th className="py-3 px-4 font-bold">Confidence</th>
            </tr>
          </thead>
          <tbody className="font-body-md text-sm divide-y divide-outline-variant/10">
            {filteredTrains.map((train, idx) => (
              <tr
                key={train.id}
                className={`border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors ${
                  idx % 2 === 1 ? 'bg-[#F1F5F9]/40' : ''
                }`}
              >
                <td className="py-3.5 px-4">
                  <Link to={`/train/${train.id}`} className="hover:underline">
                    <div className="font-bold text-primary">{train.trainName}</div>
                    <div className="font-mono-data text-xs text-outline">#{train.trainNumber}</div>
                  </Link>
                </td>
                <td className="py-3.5 px-4 text-on-surface font-medium">{train.currentLocation}</td>
                <td className="py-3.5 px-4">
                  <StatusBadge status={train.status} />
                </td>
                <td className="py-3.5 px-4">
                  <DelayBadge delayMinutes={train.currentDelayMinutes} />
                </td>
                <td className="py-3.5 px-4 font-mono-data font-bold text-primary">
                  {train.aiPredictedEta}
                </td>
                <td className="py-3.5 px-4 font-mono-data text-xs font-semibold text-secondary">
                  {train.confidencePercent}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
