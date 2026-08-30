import React from 'react';
import { StationStop } from '../../types/train';

interface StationByStationTableProps {
  stations: StationStop[];
}

export const StationByStationTable: React.FC<StationByStationTableProps> = ({ stations }) => {
  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-ambient border border-outline-variant/20 overflow-hidden">
      <div className="p-5 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-low/50">
        <h3 className="font-headline-sm text-headline-sm font-bold text-primary">
          Station-by-Station AI Predictions
        </h3>
        <button
          className="text-secondary hover:bg-secondary-container/20 p-1.5 rounded transition-colors"
          title="Export Table Data"
        >
          <span className="material-symbols-outlined text-[20px]">download</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-outline-variant/30 bg-surface font-label-md text-xs text-on-surface-variant uppercase font-bold tracking-wider">
              <th className="py-3 px-4">Station</th>
              <th className="py-3 px-4">Dist (km)</th>
              <th className="py-3 px-4">Sched. Arr</th>
              <th className="py-3 px-4 text-primary ai-gradient-text font-black">AI Predicted</th>
              <th className="py-3 px-4">Pred. Delay</th>
              <th className="py-3 px-4">Confidence</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody className="font-mono-data text-xs text-on-surface divide-y divide-outline-variant/10">
            {stations && stations.length > 0 ? (
              stations.map((st) => {
                const isCurrent = st.status === 'Current';
                const isDest = st.status === 'Destination';

                return (
                  <tr
                    key={st.stationCode}
                    className={`table-row-zebra ${isDest ? 'bg-primary/5 font-semibold' : ''}`}
                  >
                    <td className="py-3 px-4 font-body-md text-primary font-bold flex items-center gap-2">
                      {st.stationName}
                      {isCurrent && (
                        <span className="bg-primary text-on-primary text-[10px] px-1.5 py-0.5 rounded font-label-md font-black">
                          CURRENT
                        </span>
                      )}
                      {isDest && (
                        <span className="text-[11px] font-normal text-on-surface-variant">(Final)</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-on-surface-variant">
                      {st.distanceKm === 0 ? '-' : st.distanceKm}
                    </td>
                    <td className="py-3 px-4 text-on-surface-variant">{st.scheduledArrival}</td>
                    <td className={`py-3 px-4 font-bold ${isDest ? 'text-primary text-sm' : 'text-secondary'}`}>
                      {st.actualOrPredictedArrival}
                    </td>
                    <td className="py-3 px-4 font-bold text-on-surface">
                      {st.predictedDelayMinutes > 0 ? `+${st.predictedDelayMinutes}m` : '0m'}
                    </td>
                    <td className="py-3 px-4 text-secondary font-bold">
                      {st.confidence > 0 ? `${st.confidence}%` : '-'}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded font-label-md text-[10px] font-bold ${
                          isCurrent
                            ? 'bg-error-container/50 text-error'
                            : isDest
                            ? 'bg-primary-container/20 text-primary'
                            : 'bg-[#059669]/10 text-[#059669]'
                        }`}
                      >
                        {isCurrent ? 'Moderate Risk' : isDest ? 'Destination Forecast' : st.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};
