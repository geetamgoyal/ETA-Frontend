import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ETAOverviewHero } from '../components/forecast/ETAOverviewHero';
import { AIFactorBreakdown } from '../components/forecast/AIFactorBreakdown';
import { DynamicETAForecastChart } from '../components/forecast/DynamicETAForecastChart';
import { PredictionConfidencePanel } from '../components/forecast/PredictionConfidencePanel';
import { UpcomingStationTable } from '../components/forecast/UpcomingStationTable';
import { Footer } from '../components/layout/Footer';
import { MOCK_TRAINS } from '../data/trains';

export const AIEtaForecastPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedTrainId, setSelectedTrainId] = useState(id || '12309');

  const train = MOCK_TRAINS.find((t) => t.id === selectedTrainId) || MOCK_TRAINS[0];

  const handleTrainChange = (newId: string) => {
    setSelectedTrainId(newId);
    navigate(`/eta-forecast/${newId}`);
  };

  return (
    <main className="px-4 md:px-margin py-6 pb-xl flex-1 flex flex-col gap-lg max-w-[1440px] mx-auto w-full animate-fade-in">
      {/* Header with Train Selector */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg font-bold text-primary">
            AI ETA Forecast
          </h2>
          <p className="font-body-lg text-xs text-on-surface-variant mt-0.5">
            Deep-learning powered arrival predictions with real-time network factor decomposition
          </p>
        </div>

        {/* Train Dropdown Switcher */}
        <div className="flex items-center gap-2 bg-surface border border-outline-variant/40 rounded-lg px-3 py-1.5 shadow-sm">
          <span className="material-symbols-outlined text-secondary text-[20px]">train</span>
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

      {/* Hero Comparison Banner */}
      <ETAOverviewHero train={train} />

      {/* 2-Column Split: Factor Breakdown + Chart (Left 2 cols) | Confidence & Insights (Right 1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <AIFactorBreakdown train={train} />
          <DynamicETAForecastChart />
        </div>

        <div className="lg:col-span-1">
          <PredictionConfidencePanel />
        </div>
      </div>

      {/* Station-by-Station Upcoming Predictions Table */}
      <UpcomingStationTable stations={train.stations} trainId={train.id} />

      <Footer />
    </main>
  );
};
