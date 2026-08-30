import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StationStop } from '../../types/train';
import { ConfidenceBar } from '../common/ConfidenceBar';

interface UpcomingStationTableProps {
  stations: StationStop[];
  trainId: string;
}

export const UpcomingStationTable: React.FC<UpcomingStationTableProps> = ({
  stations,
  trainId,
}) => {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <section className="bg-white rounded-xl border border-outline-variant/30 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center bg-surface-bright/50">
          <h4 className="text-lg font-bold text-primary">Upcoming Station Predictions</h4>
          <button
            onClick={() => navigate(`/route-predictions/${trainId}`)}
            className="text-secondary text-sm font-bold hover:underline cursor-pointer flex items-center gap-1"
          >
            View Full Route Prediction →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                <th className="px-6 py-4">Station</th>
                <th className="px-6 py-4">Scheduled ETA</th>
                <th className="px-6 py-4">AI Predicted ETA</th>
                <th className="px-6 py-4">Predicted Delay</th>
                <th className="px-6 py-4">Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-sm">
              {stations.map((st) => {
                const isDest = st.status === 'Destination';

                return (
                  <tr
                    key={st.stationCode}
                    className={`hover:bg-surface-container-low transition-colors ${
                      isDest ? 'bg-primary/5 font-semibold' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className={`font-bold ${isDest ? 'text-primary text-base' : 'text-on-surface'}`}>
                        {st.stationName}
                      </div>
                      <div className="text-[11px] text-on-surface-variant font-medium">
                        {st.stationCode} • {st.distanceKm} km away
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono-data text-on-surface-variant">
                      {st.scheduledArrival}
                    </td>
                    <td className="px-6 py-4 font-mono-data font-bold text-primary">
                      {st.actualOrPredictedArrival}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-error">
                        +{st.predictedDelayMinutes} min
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <ConfidenceBar confidencePercent={st.confidence} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
