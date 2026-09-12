import React from 'react';
import { IncidentAlert } from '../../types/alert';
import { useAlerts } from '../../context/AlertContext';

interface IncidentAlertsTableProps {
  alerts: IncidentAlert[];
  onSelectAlert: (alert: IncidentAlert) => void;
}

export const IncidentAlertsTable: React.FC<IncidentAlertsTableProps> = ({ alerts, onSelectAlert }) => {
  const { selectedAlertId, acknowledgeAlert, resolveAlert } = useAlerts();

  if (alerts.length === 0) {
    return (
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/25 p-12 text-center shadow-sm">
        <span className="material-symbols-outlined text-outline text-4xl mb-2">check_circle</span>
        <h3 className="text-base font-bold text-on-surface">No alerts match current filters</h3>
        <p className="text-xs text-on-surface-variant mt-1">
          Adjust or reset your filters above to view other active or historical operational anomalies.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/25 shadow-sm overflow-hidden flex flex-col">
      {/* Table Header Strip */}
      <div className="px-4 py-3 border-b border-outline-variant/20 bg-surface-container-lowest flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[18px]">table_rows</span>
          <h3 className="font-bold text-sm text-on-surface tracking-tight">
            Incident Log &amp; Decision Queue
          </h3>
        </div>
        <span className="text-[11px] font-mono text-on-surface-variant bg-surface-container px-2 py-0.5 rounded">
          {alerts.length} Incidents
        </span>
      </div>

      {/* Table Body */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-surface-container-low/70 border-b border-outline-variant/25 text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
              <th className="py-3 px-3.5 pl-4">Severity</th>
              <th className="py-3 px-3">Time</th>
              <th className="py-3 px-3">Train</th>
              <th className="py-3 px-3">Location</th>
              <th className="py-3 px-3">Detected Event</th>
              <th className="py-3 px-3">ETA Impact</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3.5 pr-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/15 text-xs">
            {alerts.map((alt) => {
              const isSelected = alt.id === selectedAlertId;
              const isResolved = alt.status === 'Resolved';
              const isAck = alt.status === 'Acknowledged';

              return (
                <tr
                  key={alt.id}
                  onClick={() => onSelectAlert(alt)}
                  className={`cursor-pointer transition-colors group ${
                    isSelected
                      ? 'bg-primary/5 border-l-4 border-l-primary font-medium'
                      : 'hover:bg-surface-container-low/50'
                  } ${isResolved ? 'opacity-70' : ''}`}
                >
                  {/* Severity */}
                  <td className="py-3.5 px-3.5 pl-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider uppercase ${
                        alt.severity === 'CRITICAL'
                          ? 'bg-red-500/15 text-red-700 border border-red-500/30'
                          : alt.severity === 'HIGH'
                          ? 'bg-amber-500/15 text-amber-800 border border-amber-500/30'
                          : alt.severity === 'MEDIUM'
                          ? 'bg-yellow-500/15 text-yellow-800 border border-yellow-500/30'
                          : 'bg-sky-500/15 text-sky-800 border border-sky-500/30'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          alt.severity === 'CRITICAL'
                            ? 'bg-red-600 animate-pulse'
                            : alt.severity === 'HIGH'
                            ? 'bg-amber-600'
                            : alt.severity === 'MEDIUM'
                            ? 'bg-yellow-600'
                            : 'bg-sky-600'
                        }`}
                      />
                      {alt.severity}
                    </span>
                  </td>

                  {/* Time */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <div className="font-mono text-xs font-semibold text-on-surface">
                      {alt.detectionTime}
                    </div>
                    <div className="text-[10px] text-outline font-sans">{alt.timeAgo}</div>
                  </td>

                  {/* Train */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    {alt.trainNumber ? (
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="font-mono font-bold text-primary">
                            #{alt.trainNumber}
                          </span>
                          <span className="font-bold text-on-surface truncate max-w-[130px]">
                            {alt.trainName}
                          </span>
                        </div>
                        {alt.zone && (
                          <div className="text-[10px] text-outline truncate">{alt.zone}</div>
                        )}
                      </div>
                    ) : (
                      <span className="text-[11px] font-semibold text-on-surface-variant">
                        Corridor Wide
                      </span>
                    )}
                  </td>

                  {/* Location */}
                  <td className="py-3.5 px-3">
                    <div className="font-semibold text-on-surface truncate max-w-[160px]">
                      {alt.location}
                    </div>
                    <div className="text-[10px] text-outline truncate max-w-[160px]">
                      {alt.routeSection}
                    </div>
                  </td>

                  {/* Event */}
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold uppercase bg-surface-container text-on-surface-variant tracking-wider">
                        {alt.category}
                      </span>
                    </div>
                    <p className="text-xs text-on-surface line-clamp-1 max-w-[280px]">
                      {alt.eventDescription}
                    </p>
                  </td>

                  {/* ETA Impact */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span
                      className={`inline-block px-2 py-0.5 rounded font-mono text-[11px] font-bold ${
                        alt.currentDelay > 20
                          ? 'bg-red-500/10 text-red-700 border border-red-500/20'
                          : alt.currentDelay > 0
                          ? 'bg-amber-500/10 text-amber-800 border border-amber-500/20'
                          : 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/20'
                      }`}
                    >
                      {alt.etaImpact}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        isResolved
                          ? 'bg-emerald-500/15 text-emerald-800 border border-emerald-500/30'
                          : isAck
                          ? 'bg-amber-500/15 text-amber-800 border border-amber-500/30'
                          : 'bg-red-500/15 text-red-800 border border-red-500/30'
                      }`}
                    >
                      {alt.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-3.5 pr-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      {!isResolved && (
                        <>
                          {!isAck && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                acknowledgeAlert(alt.id);
                              }}
                              className="px-2 py-1 rounded bg-amber-500/10 text-amber-800 hover:bg-amber-500/20 text-[10px] font-bold transition-colors cursor-pointer"
                              title="Acknowledge Alert"
                            >
                              Ack
                            </button>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              resolveAlert(alt.id);
                            }}
                            className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-800 hover:bg-emerald-500/20 text-[10px] font-bold transition-colors cursor-pointer"
                            title="Mark Incident Resolved"
                          >
                            Resolve
                          </button>
                        </>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectAlert(alt);
                        }}
                        className="px-2.5 py-1 rounded bg-primary/10 text-primary hover:bg-primary/20 text-[11px] font-bold transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <span>Inspect</span>
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="p-3 border-t border-outline-variant/20 bg-surface-container-low/40 flex items-center justify-between text-[11px] text-on-surface-variant">
        <span>Click any incident row to inspect telemetry details &amp; timeline</span>
        <span>SIH 2026 Operational Intelligence</span>
      </div>
    </div>
  );
};
