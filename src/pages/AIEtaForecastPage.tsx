import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ETAOverviewHero } from '../components/forecast/ETAOverviewHero';
import { AIFactorBreakdown } from '../components/forecast/AIFactorBreakdown';
import { DynamicETAForecastChart } from '../components/forecast/DynamicETAForecastChart';
import { PredictionConfidencePanel } from '../components/forecast/PredictionConfidencePanel';
import { UpcomingStationTable } from '../components/forecast/UpcomingStationTable';
import { Footer } from '../components/layout/Footer';
import { useTrains } from '../context/TrainContext';
import { Badge } from '../components/ui/Badge';
import { StatusDot } from '../components/ui/States';

export const AIEtaForecastPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { trains, selectedTrainId, setSelectedTrainId, simulationTick, lastUpdatedAt } = useTrains();

  // Sync URL param → context on mount / param change
  React.useEffect(() => {
    if (id && id !== selectedTrainId) {
      setSelectedTrainId(id);
    }
  }, [id]);

  const effectiveId = id ?? selectedTrainId;
  const train = trains.find((t) => t.id === effectiveId) ?? trains[0];

  const handleTrainChange = (newId: string) => {
    setSelectedTrainId(newId);
    navigate(`/eta-forecast/${newId}`);
  };

  const lastUpdStr = lastUpdatedAt
    ? `${String(lastUpdatedAt.getHours()).padStart(2, '0')}:${String(lastUpdatedAt.getMinutes()).padStart(2, '0')}:${String(lastUpdatedAt.getSeconds()).padStart(2, '0')}`
    : '';

  return (
    <main className="px-4 md:px-margin py-5 pb-xl flex-1 flex flex-col gap-4 max-w-[1440px] mx-auto w-full animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-headline-lg font-bold text-primary">AI ETA Forecast</h2>
            <Badge variant="ai" size="sm">LIVE AI</Badge>
          </div>
          <p className="text-[12px] text-on-surface-variant mt-0.5">
            Deep-learning powered arrival predictions with real-time network factor decomposition
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Last updated */}
          <div className="flex items-center gap-1.5 text-[11px] text-on-surface-variant">
            <StatusDot status="live" pulse />
            <span>Updated {lastUpdStr}</span>
          </div>

          {/* Train selector */}
          <div className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-1.5 shadow-xs">
            <span className="material-symbols-outlined text-secondary text-[18px]">train</span>
            <select
              value={effectiveId}
              onChange={(e) => handleTrainChange(e.target.value)}
              className="bg-transparent font-bold text-[12px] text-primary outline-none cursor-pointer"
              aria-label="Select train"
            >
              {trains.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.trainNumber} — {t.trainName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ETA comparison hero */}
      <ETAOverviewHero train={train} />

      {/* Main grid — simulation tick key forces re-render of charts */}
      <div key={`forecast-${train.id}-${simulationTick}`} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <AIFactorBreakdown train={train} />
          <DynamicETAForecastChart train={train} />
        </div>
        <div className="lg:col-span-1">
          <PredictionConfidencePanel train={train} />
        </div>
      </div>

      {/* Station table */}
      <UpcomingStationTable stations={train.stations} trainId={train.id} />

      <Footer />
    </main>
  );
};
