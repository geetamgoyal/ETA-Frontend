import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { JourneyVisualizer } from '../components/routes/JourneyVisualizer';
import { RouteSummaryKPIs } from '../components/routes/RouteSummaryKPIs';
import { StationByStationTable } from '../components/routes/StationByStationTable';
import { DelayPropagationChart } from '../components/routes/DelayPropagationChart';
import { RouteRiskPanel } from '../components/routes/RouteRiskPanel';
import { AIRecommendationsPanel } from '../components/routes/AIRecommendationsPanel';
import { Footer } from '../components/layout/Footer';
import { useTrains } from '../context/TrainContext';

export const RoutePredictionsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { trains, selectedTrainId, setSelectedTrainId } = useTrains();

  React.useEffect(() => {
    if (id && id !== selectedTrainId) {
      setSelectedTrainId(id);
    }
  }, [id]);

  const effectiveId = id ?? selectedTrainId;
  const train = trains.find((t) => t.id === effectiveId) ?? trains[0];

  const handleTrainChange = (newId: string) => {
    setSelectedTrainId(newId);
    navigate(`/route-predictions/${newId}`);
  };

  return (
    <main className="px-4 md:px-margin py-5 pb-xl flex-1 flex flex-col gap-4 max-w-[1440px] mx-auto w-full animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-on-surface-variant text-[11px] mb-3">
          <button
            onClick={() => navigate(`/eta-forecast/${train.id}`)}
            className="flex items-center hover:text-primary transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[14px] mr-1">arrow_back</span>
            Back to AI ETA Forecast
          </button>
          <span className="text-outline-variant">|</span>
          <button
            onClick={() => navigate(`/train-monitoring/${train.id}`)}
            className="hover:text-primary cursor-pointer"
          >
            Live Train Details
          </button>
          <span className="material-symbols-outlined text-[12px]">chevron_right</span>
          <span className="text-primary font-bold">Route Predictions</span>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-headline-lg font-bold text-primary">Route Predictions</h2>
              <div className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant/40 rounded-lg px-2.5 py-1 shadow-xs">
                <span className="material-symbols-outlined text-secondary text-[18px]">train</span>
                <select
                  value={effectiveId}
                  onChange={(e) => handleTrainChange(e.target.value)}
                  className="bg-transparent font-bold text-[12px] text-primary outline-none cursor-pointer"
                >
                  {trains.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.trainNumber} — {t.trainName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <p className="text-[12px] text-on-surface-variant mt-0.5">
              Station-by-station AI forecast for {train.trainName} ({train.trainNumber})
            </p>
          </div>
          <div className="flex items-center gap-2 bg-surface-container-low px-3 py-1.5 rounded-full border border-outline-variant/30">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse-subtle" />
            <span className="text-[11px] font-bold text-primary tracking-wider">LIVE PREDICTION</span>
          </div>
        </div>
      </div>

      {/* Journey visualizer — now data-driven */}
      <JourneyVisualizer train={train} />

      {/* Route KPIs — now data-driven */}
      <RouteSummaryKPIs train={train} />

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <StationByStationTable stations={train.stations} />
          <DelayPropagationChart train={train} />
        </div>
        <div className="flex flex-col gap-4">
          <RouteRiskPanel train={train} />
          <AIRecommendationsPanel train={train} />
        </div>
      </div>

      {/* Bottom actions */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-outline-variant/20">
        <button
          onClick={() => navigate(`/train-monitoring/${train.id}`)}
          className="bg-surface-container-lowest hover:bg-surface-container text-primary border border-outline-variant font-semibold text-[12px] py-2 px-5 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">train</span>
          View Live Train Details
        </button>
        <button
          onClick={() => navigate(`/eta-forecast/${train.id}`)}
          className="bg-secondary hover:bg-secondary/90 text-white font-semibold text-[12px] py-2 px-5 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
          AI ETA Forecast
        </button>
      </div>

      <Footer />
    </main>
  );
};
