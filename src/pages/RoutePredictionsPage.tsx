import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { JourneyVisualizer } from '../components/routes/JourneyVisualizer';
import { RouteSummaryKPIs } from '../components/routes/RouteSummaryKPIs';
import { StationByStationTable } from '../components/routes/StationByStationTable';
import { DelayPropagationChart } from '../components/routes/DelayPropagationChart';
import { RouteRiskPanel } from '../components/routes/RouteRiskPanel';
import { AIRecommendationsPanel } from '../components/routes/AIRecommendationsPanel';
import { Footer } from '../components/layout/Footer';
import { MOCK_TRAINS } from '../data/trains';

export const RoutePredictionsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedTrainId, setSelectedTrainId] = useState(id || '12309');

  const train = MOCK_TRAINS.find((t) => t.id === selectedTrainId) || MOCK_TRAINS[0];

  const handleTrainChange = (newId: string) => {
    setSelectedTrainId(newId);
    navigate(`/route-predictions/${newId}`);
  };

  return (
    <main className="px-4 md:px-margin py-6 pb-xl flex-1 flex flex-col gap-lg max-w-[1440px] mx-auto w-full animate-fade-in">
      {/* Breadcrumb & Header */}
      <div>
        <div className="flex items-center gap-2 text-on-surface-variant font-label-md text-xs mb-3">
          <button
            onClick={() => navigate(`/eta-forecast/${train.id}`)}
            className="flex items-center hover:text-primary transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm mr-1">arrow_back</span>
            Back to AI ETA Forecast
          </button>
          <span className="text-outline-variant">|</span>
          <button onClick={() => navigate(`/train/${train.id}`)} className="hover:text-primary cursor-pointer">
            Live Train Details
          </button>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-primary font-bold">Route Predictions</span>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="font-headline-lg text-headline-lg font-bold text-primary">
                Route Predictions
              </h2>
              <div className="flex items-center gap-2 bg-surface border border-outline-variant/40 rounded-lg px-2.5 py-1 shadow-xs">
                <span className="material-symbols-outlined text-secondary text-[18px]">train</span>
                <select
                  value={selectedTrainId}
                  onChange={(e) => handleTrainChange(e.target.value)}
                  className="bg-transparent font-bold text-xs text-primary outline-none cursor-pointer"
                >
                  {MOCK_TRAINS.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.trainNumber} - {t.trainName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <p className="font-body-lg text-xs text-on-surface-variant mt-0.5">
              Station-by-station AI forecast for the remaining journey of {train.trainName} ({train.trainNumber})
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-1">
            <div className="flex items-center gap-2 bg-surface-container-high px-3 py-1 rounded-full border border-outline-variant/30">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              <span className="font-label-md text-xs text-primary font-bold tracking-widest">
                LIVE PREDICTION
              </span>
            </div>
            <p className="font-label-md text-[11px] text-on-surface-variant">Last updated: 12 seconds ago</p>
          </div>
        </div>
      </div>

      {/* Top Remaining Journey Linear Track Visualizer */}
      <JourneyVisualizer />

      {/* Route Summary KPI Cards */}
      <RouteSummaryKPIs />

      {/* Main 2-Column Split: Table + SVG Chart (Left 2 cols) | Risks + Recommendations (Right 1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-4">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <StationByStationTable stations={train.stations} />
          <DelayPropagationChart />
        </div>

        <div className="flex flex-col gap-6">
          <RouteRiskPanel />
          <AIRecommendationsPanel />
        </div>
      </div>

      {/* Bottom Actions Bar */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4 pt-4 border-t border-outline-variant/20">
        <button
          onClick={() => navigate(`/train/${train.id}`)}
          className="bg-surface hover:bg-surface-variant text-primary border border-outline-variant/50 font-label-md text-xs font-bold py-2.5 px-6 rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">train</span>
          View Live Train Details
        </button>
        <button
          onClick={() => alert(`Dynamic AI model recalibrated for train ${train.trainNumber} across all downstream blocks.`)}
          className="bg-secondary hover:bg-secondary/90 text-on-secondary font-label-md text-xs font-bold py-2.5 px-6 rounded-lg flex items-center justify-center gap-2 transition-all shadow-ambient cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">refresh</span>
          Refresh AI Prediction
        </button>
      </div>

      <Footer />
    </main>
  );
};
