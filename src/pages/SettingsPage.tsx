import React, { useState } from 'react';
import { Footer } from '../components/layout/Footer';

export const SettingsPage: React.FC = () => {
  const [modelSensitivity, setModelSensitivity] = useState<'Standard' | 'Aggressive Recovery' | 'Conservative Risk'>('Standard');
  const [autoRecalculateThresholdSec, setAutoRecalculateThresholdSec] = useState(15);
  const [defaultZone, setDefaultZone] = useState('North Central Railway (NCR)');
  const [enableSound, setEnableSound] = useState(true);
  const [enableHighDensityTable, setEnableHighDensityTable] = useState(true);
  const [enableDarkMapByDefault, setEnableDarkMapByDefault] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <main className="px-4 md:px-margin py-6 pb-xl flex-1 flex flex-col gap-lg max-w-[1440px] mx-auto w-full animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface">
          Operational Settings & AI Controls
        </h2>
        <p className="font-body-lg text-xs text-on-surface-variant mt-0.5">
          Configure AI ETA prediction weights, alert sensitivity and dispatcher interface preferences
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-800 rounded-lg text-xs flex items-center gap-2 font-bold animate-fade-in">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          Configuration parameters updated and synchronized across cluster nodes.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
        {/* Section 1: AI Model Configuration */}
        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-ambient border border-outline-variant/30 flex flex-col gap-5">
          <div className="flex items-center gap-2 border-b border-outline-variant/20 pb-3">
            <span className="material-symbols-outlined text-secondary text-[22px]">psychology</span>
            <h3 className="font-headline-sm text-headline-sm font-bold text-primary">
              AI Forecast Engine Parameters
            </h3>
          </div>

          <div>
            <label className="block font-label-md text-xs text-on-surface-variant uppercase tracking-wider font-bold mb-2">
              Delay Recovery Model Bias
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Standard', 'Aggressive Recovery', 'Conservative Risk'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setModelSensitivity(mode)}
                  className={`py-2 px-3 text-xs font-bold rounded-lg border transition-colors ${
                    modelSensitivity === mode
                      ? 'bg-primary text-white border-primary shadow-xs'
                      : 'bg-surface text-on-surface border-outline-variant/40 hover:bg-surface-container'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-on-surface-variant mt-2">
              Standard mode balances historical speed recovery against active block congestion metrics.
            </p>
          </div>

          <div>
            <label className="block font-label-md text-xs text-on-surface-variant uppercase tracking-wider font-bold mb-1">
              Auto-Recalculate Cycle: <span className="text-primary">{autoRecalculateThresholdSec} seconds</span>
            </label>
            <input
              type="range"
              min={5}
              max={60}
              step={5}
              value={autoRecalculateThresholdSec}
              onChange={(e) => setAutoRecalculateThresholdSec(Number(e.target.value))}
              className="w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer accent-secondary"
            />
          </div>

          <div>
            <label className="block font-label-md text-xs text-on-surface-variant uppercase tracking-wider font-bold mb-2">
              Primary Monitoring Zone
            </label>
            <select
              value={defaultZone}
              onChange={(e) => setDefaultZone(e.target.value)}
              className="w-full p-2.5 bg-surface-container-low border border-outline-variant/40 rounded-lg text-xs font-semibold text-on-surface focus:border-secondary outline-none"
            >
              <option>North Central Railway (NCR)</option>
              <option>Northern Railway (NR)</option>
              <option>Eastern Railway (ER)</option>
              <option>East Central Railway (ECR)</option>
              <option>Western Railway (WR)</option>
            </select>
          </div>
        </div>

        {/* Section 2: UI & Dispatcher Preferences */}
        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-ambient border border-outline-variant/30 flex flex-col gap-5 justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-outline-variant/20 pb-3">
              <span className="material-symbols-outlined text-secondary text-[22px]">tune</span>
              <h3 className="font-headline-sm text-headline-sm font-bold text-primary">
                Interface & Display Controls
              </h3>
            </div>

            <label className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low border border-outline-variant/20 cursor-pointer">
              <div>
                <span className="font-body-md text-xs font-bold text-on-surface block">
                  Critical Audio Alert Chimes
                </span>
                <span className="text-[11px] text-on-surface-variant">
                  Audible beep on unscheduled train stoppage outside station limits
                </span>
              </div>
              <input
                type="checkbox"
                checked={enableSound}
                onChange={(e) => setEnableSound(e.target.checked)}
                className="w-5 h-5 accent-secondary cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low border border-outline-variant/20 cursor-pointer">
              <div>
                <span className="font-body-md text-xs font-bold text-on-surface block">
                  High-Density Table View
                </span>
                <span className="text-[11px] text-on-surface-variant">
                  Compact 12px row height for simultaneous viewing of 25+ train rows
                </span>
              </div>
              <input
                type="checkbox"
                checked={enableHighDensityTable}
                onChange={(e) => setEnableHighDensityTable(e.target.checked)}
                className="w-5 h-5 accent-secondary cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low border border-outline-variant/20 cursor-pointer">
              <div>
                <span className="font-body-md text-xs font-bold text-on-surface block">
                  Cyber-Physical Dark Map by Default
                </span>
                <span className="text-[11px] text-on-surface-variant">
                  Render live network visualizer in high-contrast dark schematic mode
                </span>
              </div>
              <input
                type="checkbox"
                checked={enableDarkMapByDefault}
                onChange={(e) => setEnableDarkMapByDefault(e.target.checked)}
                className="w-5 h-5 accent-secondary cursor-pointer"
              />
            </label>
          </div>

          <button
            onClick={handleSave}
            className="w-full py-3 bg-secondary hover:bg-secondary/90 text-white font-label-md text-xs font-bold rounded-lg transition-all shadow-md active:scale-98 cursor-pointer"
          >
            Save Configuration Changes
          </button>
        </div>
      </div>

      <Footer />
    </main>
  );
};
