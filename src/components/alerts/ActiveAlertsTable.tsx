import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_ALERTS } from '../../data/alerts';
import { SeverityBadge } from '../common/SeverityBadge';

export const ActiveAlertsTable: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedZone, setSelectedZone] = useState('All Zones');

  const filteredAlerts = MOCK_ALERTS.filter((alt) => {
    if (activeFilter === 'critical') return alt.severity === 'CRITICAL';
    if (activeFilter === 'warning') return alt.severity === 'WARNING' || alt.severity === 'HIGH';
    if (activeFilter === 'network') return alt.severity === 'NETWORK';
    if (activeFilter === 'recovery') return alt.severity === 'RECOVERY';
    return true;
  });

  return (
    <div className="bg-white rounded-xl shadow-ambient overflow-hidden flex flex-col border border-outline-variant/30">
      {/* Header & Zone Selector */}
      <div className="p-lg border-b border-outline-variant/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-[#F8FAFC]/50">
        <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">list_alt</span>
          Active Operational Alerts
        </h3>
        <div className="flex items-center gap-2">
          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="bg-surface-container-lowest border-b border-outline-variant focus:border-secondary py-1.5 px-3 font-body-md text-xs outline-none rounded-t-sm"
          >
            <option>All Zones</option>
            <option>Northern Railway</option>
            <option>North Central Railway</option>
            <option>Eastern Railway</option>
          </select>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="px-lg py-2.5 flex gap-2 border-b border-outline-variant/30 overflow-x-auto scrollbar-hide">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3 py-1 rounded-full font-label-md text-xs font-semibold whitespace-nowrap transition-colors ${
            activeFilter === 'all'
              ? 'bg-primary text-white'
              : 'bg-surface-container text-on-surface border border-outline-variant/50 hover:bg-surface-container-high'
          }`}
        >
          All Alerts (Active)
        </button>
        <button
          onClick={() => setActiveFilter('critical')}
          className={`px-3 py-1 rounded-full font-label-md text-xs font-bold whitespace-nowrap transition-colors ${
            activeFilter === 'critical'
              ? 'bg-error text-white'
              : 'bg-error-container/30 text-error border border-error/30 hover:bg-error-container/50'
          }`}
        >
          Critical (3)
        </button>
        <button
          onClick={() => setActiveFilter('warning')}
          className={`px-3 py-1 rounded-full font-label-md text-xs font-bold whitespace-nowrap transition-colors ${
            activeFilter === 'warning'
              ? 'bg-amber-600 text-white'
              : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
          }`}
        >
          Warning (6)
        </button>
        <button
          onClick={() => setActiveFilter('network')}
          className={`px-3 py-1 rounded-full font-label-md text-xs font-semibold whitespace-nowrap transition-colors ${
            activeFilter === 'network'
              ? 'bg-primary text-white'
              : 'bg-surface-container text-on-surface border border-outline-variant/50 hover:bg-surface-container-high'
          }`}
        >
          Network
        </button>
        <button
          onClick={() => setActiveFilter('recovery')}
          className={`px-3 py-1 rounded-full font-label-md text-xs font-bold whitespace-nowrap transition-colors ${
            activeFilter === 'recovery'
              ? 'bg-secondary text-white'
              : 'bg-primary-fixed/30 text-primary border border-primary/20 hover:bg-primary-fixed/50'
          }`}
        >
          AI Recovery
        </button>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F1F5F9] border-b border-outline-variant/50 font-label-md text-xs text-on-surface-variant uppercase tracking-wider font-bold">
              <th className="p-3 pl-lg">Severity</th>
              <th className="p-3">Event Description</th>
              <th className="p-3">Train / Location</th>
              <th className="p-3">Impact / Status</th>
              <th className="p-3">Time</th>
              <th className="p-3 pr-lg text-right">Action</th>
            </tr>
          </thead>
          <tbody className="font-body-md text-sm divide-y divide-outline-variant/20">
            {filteredAlerts.map((alt, idx) => (
              <tr
                key={alt.id}
                className={`hover:bg-surface-container-low transition-colors group ${
                  idx % 2 === 1 ? 'bg-white' : 'bg-surface-container-lowest'
                }`}
              >
                <td className="p-3 pl-lg">
                  <SeverityBadge severity={alt.severity} />
                </td>
                <td className="p-3 text-on-surface font-semibold text-xs">
                  {alt.eventDescription}
                </td>
                <td className="p-3">
                  <div className="font-mono-data text-xs font-bold text-primary">
                    {alt.trainOrLocation}
                  </div>
                  {alt.zone && <div className="text-[11px] text-on-surface-variant">{alt.zone}</div>}
                </td>
                <td className="p-3">
                  <div className="text-xs font-bold text-on-surface">{alt.impactStatus}</div>
                  <div className="text-[10px] text-on-surface-variant uppercase tracking-wider font-medium">
                    {alt.isResolved ? 'AI Monitoring' : 'Under Investigation'}
                  </div>
                </td>
                <td className="p-3 text-on-surface-variant text-xs font-mono-data">
                  {alt.timeAgo}
                </td>
                <td className="p-3 pr-lg text-right">
                  <button
                    onClick={() => {
                      if (alt.trainNumber) {
                        navigate(`/train/${alt.trainNumber}`);
                      } else {
                        navigate('/live-network');
                      }
                    }}
                    className="text-secondary hover:text-secondary-container font-label-md text-xs font-bold flex items-center justify-end gap-1 ml-auto group-hover:underline cursor-pointer"
                  >
                    View <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-3 bg-[#F1F5F9] border-t border-outline-variant/50 text-center">
        <button
          onClick={() => setActiveFilter('all')}
          className="text-secondary font-label-md text-xs font-bold hover:underline"
        >
          Showing {filteredAlerts.length} of 24 Active Alerts
        </button>
      </div>
    </div>
  );
};
