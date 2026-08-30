import React, { useState } from 'react';
import { MOCK_TRAINS } from '../../data/trains';
import { SimulationResult } from '../../types/simulation';

interface SimulationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SimulationModal: React.FC<SimulationModalProps> = ({ isOpen, onClose }) => {
  const [selectedTrainId, setSelectedTrainId] = useState(MOCK_TRAINS[0].id);
  const [scenarioType, setScenarioType] = useState<'signal_failure' | 'track_maintenance' | 'weather_disruption' | 'speed_boost' | 'priority_overtake'>('track_maintenance');
  const [impactZone, setImpactZone] = useState('Kanpur – Prayagraj');
  const [intensityMinutes, setIntensityMinutes] = useState(15);
  const [isSimulating, setIsSimulating] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(null);

  if (!isOpen) return null;

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      const train = MOCK_TRAINS.find((t) => t.id === selectedTrainId) || MOCK_TRAINS[0];
      let delta = 0;
      let summary = '';

      if (scenarioType === 'track_maintenance') {
        delta = intensityMinutes + 6;
        summary = `Imposing 30 km/h TSR (Temporary Speed Restriction) across ${impactZone} adds +${delta}m delay.`;
      } else if (scenarioType === 'signal_failure') {
        delta = intensityMinutes + 14;
        summary = `Signal aspect failure at ${impactZone} causes block-level cascading delay of +${delta}m.`;
      } else if (scenarioType === 'weather_disruption') {
        delta = intensityMinutes + 10;
        summary = `Dense fog / heavy rain restricts maximum allowable speed to 60 km/h with +${delta}m impact.`;
      } else if (scenarioType === 'speed_boost') {
        delta = -Math.min(intensityMinutes, 12);
        summary = `Clearing bidirectional green corridor allows train to recover ${Math.abs(delta)}m before terminal.`;
      } else {
        delta = -8;
        summary = `Overtaking freight consist at Kanpur loop saves 8 minutes of dwell penalty.`;
      }

      // Calculate new time
      const [h, m] = train.aiPredictedEta.split(':').map(Number);
      const totalMinutes = h * 60 + m + delta;
      const newH = Math.floor((totalMinutes / 60) % 24);
      const newM = Math.floor(totalMinutes % 60);
      const newEta = `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`;

      setResult({
        trainName: `${train.trainName} (${train.trainNumber})`,
        originalEta: train.aiPredictedEta,
        simulatedEta: newEta,
        delayDeltaMinutes: delta,
        confidenceScore: 92,
        impactSummary: summary,
        affectedDownstreamTrains: delta > 10 ? 4 : 1,
      });
      setIsSimulating(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-surface-container-lowest rounded-xl max-w-2xl w-full border border-outline-variant/30 shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="p-6 bg-primary text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-secondary-fixed text-[28px]">
              science
            </span>
            <div>
              <h3 className="font-headline-sm text-headline-sm font-bold">
                AI What-If Operational Simulation
              </h3>
              <p className="text-sm text-on-primary-container">
                Simulate network disruptions, TSRs, and signal clearance to predict cascading ETA impacts.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[75vh]">
          {/* Select Train */}
          <div>
            <label className="block font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-2">
              Target Coaching Train
            </label>
            <select
              value={selectedTrainId}
              onChange={(e) => setSelectedTrainId(e.target.value)}
              className="w-full p-2.5 bg-surface-container-low border border-outline-variant/50 rounded-lg font-body-md text-on-surface focus:outline-none focus:border-secondary"
            >
              {MOCK_TRAINS.map((train) => (
                <option key={train.id} value={train.id}>
                  {train.trainNumber} - {train.trainName} ({train.source} → {train.destination})
                </option>
              ))}
            </select>
          </div>

          {/* Scenario Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-2">
                Disruption Scenario
              </label>
              <select
                value={scenarioType}
                onChange={(e) => setScenarioType(e.target.value as any)}
                className="w-full p-2.5 bg-surface-container-low border border-outline-variant/50 rounded-lg font-body-md text-on-surface focus:outline-none focus:border-secondary"
              >
                <option value="track_maintenance">Track Maintenance (Speed Restriction)</option>
                <option value="signal_failure">Signal Interlocking Failure</option>
                <option value="weather_disruption">Adverse Weather / Fog Protocol</option>
                <option value="speed_boost">Green Corridor Dispatch (Clear Ahead)</option>
                <option value="priority_overtake">Freight Loop Overtake</option>
              </select>
            </div>

            <div>
              <label className="block font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-2">
                Corridor / Block Section
              </label>
              <select
                value={impactZone}
                onChange={(e) => setImpactZone(e.target.value)}
                className="w-full p-2.5 bg-surface-container-low border border-outline-variant/50 rounded-lg font-body-md text-on-surface focus:outline-none focus:border-secondary"
              >
                <option value="Kanpur – Prayagraj">Kanpur – Prayagraj Section</option>
                <option value="Delhi – Agra">Delhi – Agra High-Speed Corridor</option>
                <option value="Varanasi – Patna">Varanasi – Patna Lead</option>
                <option value="Mathura Junction Yard">Mathura Junction Yard</option>
              </select>
            </div>
          </div>

          {/* Slider for intensity */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                Disruption Magnitude: <span className="text-primary font-bold">{intensityMinutes} minutes</span>
              </label>
            </div>
            <input
              type="range"
              min={5}
              max={60}
              step={5}
              value={intensityMinutes}
              onChange={(e) => setIntensityMinutes(Number(e.target.value))}
              className="w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer accent-secondary"
            />
          </div>

          {/* Run Button */}
          <button
            onClick={handleRunSimulation}
            disabled={isSimulating}
            className="w-full py-3 bg-secondary hover:bg-secondary/90 text-white font-label-md text-label-md font-bold rounded-lg flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 disabled:opacity-50"
          >
            {isSimulating ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[20px]">
                  progress_activity
                </span>
                Computing Neural ETA Vector...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">
                  auto_awesome
                </span>
                Run AI ETA Forecast Simulation
              </>
            )}
          </button>

          {/* Simulation Output Card */}
          {result && (
            <div className="bg-surface-container-low p-5 rounded-xl border border-secondary/30 space-y-3 animate-fade-in">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-label-md text-[11px] uppercase tracking-wider text-secondary font-bold">
                    Simulation Forecast Result
                  </span>
                  <h4 className="font-headline-sm text-headline-sm text-primary font-bold">
                    {result.trainName}
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-xs text-on-surface-variant block">Prediction Confidence</span>
                  <span className="font-mono-data text-secondary font-bold text-base">
                    {result.confidenceScore}%
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 p-3 bg-white rounded-lg border border-outline-variant/20 text-center">
                <div>
                  <span className="text-xs text-on-surface-variant block">Baseline ETA</span>
                  <span className="font-mono-data text-base font-bold text-on-surface">
                    {result.originalEta}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-on-surface-variant block">Simulated ETA</span>
                  <span className={`font-mono-data text-lg font-black ${result.delayDeltaMinutes > 0 ? 'text-error' : 'text-accent-green'}`}>
                    {result.simulatedEta}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-on-surface-variant block">Delta Impact</span>
                  <span className={`font-mono-data text-base font-bold ${result.delayDeltaMinutes > 0 ? 'text-error' : 'text-accent-green'}`}>
                    {result.delayDeltaMinutes > 0 ? `+${result.delayDeltaMinutes}m` : `${result.delayDeltaMinutes}m`}
                  </span>
                </div>
              </div>

              <p className="text-xs text-on-surface-variant leading-relaxed">
                <span className="font-semibold text-primary">Operational Analysis:</span> {result.impactSummary}
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-surface border-t border-outline-variant/20 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg border border-outline-variant text-on-surface-variant font-label-md text-label-md hover:bg-surface-container transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
