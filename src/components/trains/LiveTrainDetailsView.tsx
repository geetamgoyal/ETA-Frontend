import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTrains } from '../../context/TrainContext';
import { TrainHeaderTelemetry } from './TrainHeaderTelemetry';
import { ScheduledVsPredictedETAHero } from './ScheduledVsPredictedETAHero';
import { ETAEvolutionSection } from './ETAEvolutionSection';
import { WhyDidETAChangeSection } from './WhyDidETAChangeSection';
import { PredictionConfidenceSection } from './PredictionConfidenceSection';
import { JourneyTimelineSection } from './JourneyTimelineSection';
import { TrainEventTimelineSection } from './TrainEventTimelineSection';

export const LiveTrainDetailsView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    trains,
    selectedTrainId,
    setSelectedTrainId,
    lastUpdatedAt,
    isSimulating,
    openSimulationModal,
  } = useTrains();

  // Determine active train
  const activeTrain = trains.find((t) => t.id === id)
    || trains.find((t) => t.trainNumber === id)
    || trains.find((t) => t.id === selectedTrainId)
    || trains[0];

  // Sync route param with context
  useEffect(() => {
    if (id && activeTrain && activeTrain.id !== selectedTrainId) {
      setSelectedTrainId(activeTrain.id);
    }
  }, [id, activeTrain, selectedTrainId, setSelectedTrainId]);

  const handleSelectTrain = (newId: string) => {
    setSelectedTrainId(newId);
    navigate(`/train/${newId}`);
  };

  if (!activeTrain) {
    return (
      <div className="p-8 text-center text-on-surface-variant">
        Train telemetry not found.
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1520px] mx-auto px-4 md:px-margin py-4 md:py-6 flex flex-col gap-5 animate-fade-in">
      {/* 1. Train Header & Operational Telemetry Ribbon */}
      <TrainHeaderTelemetry
        train={activeTrain}
        allTrains={trains}
        onSelectTrain={handleSelectTrain}
        lastUpdatedAt={lastUpdatedAt}
        isSimulating={isSimulating}
      />

      {/* 2. Core Comparison: SCHEDULED ETA vs PREDICTED ETA */}
      <ScheduledVsPredictedETAHero train={activeTrain} />

      {/* 3. 2-Column Command Center Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 items-start">
        {/* Left 2 Cols: ETA Evolution, Why Did ETA Change, Journey Timeline */}
        <div className="xl:col-span-2 flex flex-col gap-5">
          {/* ETA Evolution Visualization (Time-Series & Step Progression) */}
          <ETAEvolutionSection train={activeTrain} />

          {/* "Why Did ETA Change?" Section (6 Supported Prototype Factors) */}
          <WhyDidETAChangeSection train={activeTrain} />

          {/* Station-by-Station Journey Timeline */}
          <JourneyTimelineSection train={activeTrain} />
        </div>

        {/* Right 1 Col: Confidence, Range, Operational Events */}
        <div className="xl:col-span-1 flex flex-col gap-5">
          {/* Prediction Confidence Section */}
          <PredictionConfidenceSection train={activeTrain} />

          {/* Train Operational Event Timeline */}
          <TrainEventTimelineSection train={activeTrain} />

          {/* Additional Operational Actions / Quick Links */}
          <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-4 flex flex-col gap-2.5 shadow-xs">
            <span className="ops-label text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">
              Operational Actions &amp; Tools
            </span>
            <button
              onClick={() => openSimulationModal(activeTrain.id)}
              className="w-full py-2 px-3 rounded-lg bg-secondary/10 hover:bg-secondary/20 border border-secondary/30 flex items-center justify-between text-[12px] font-bold text-secondary transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[18px]">science</span>
                <span>Simulate Operational Disruption</span>
              </div>
              <span className="text-secondary text-[14px]">⚡</span>
            </button>
            <button
              onClick={() => navigate(`/alerts?train=${activeTrain.trainNumber}`)}
              className="w-full py-2 px-3 rounded-lg border border-outline-variant/40 hover:bg-surface-container flex items-center justify-between text-[12px] font-semibold text-on-surface transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-red-600 text-[18px]">warning</span>
                <span>View Alerts for #{activeTrain.trainNumber}</span>
              </div>
              <span className="text-on-surface-variant text-[14px]">→</span>
            </button>
            <button
              onClick={() => navigate(`/route-predictions/${activeTrain.id}`)}
              className="w-full py-2 px-3 rounded-lg border border-outline-variant/40 hover:bg-surface-container flex items-center justify-between text-[12px] font-semibold text-on-surface transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[18px]">route</span>
                <span>Corridor Route Forecast</span>
              </div>
              <span className="text-secondary text-[14px]">→</span>
            </button>
            <button
              onClick={() => navigate('/live-network')}
              className="w-full py-2 px-3 rounded-lg border border-outline-variant/40 hover:bg-surface-container flex items-center justify-between text-[12px] font-semibold text-on-surface transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[18px]">hub</span>
                <span>Live Rail Network Map</span>
              </div>
              <span className="text-secondary text-[14px]">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
