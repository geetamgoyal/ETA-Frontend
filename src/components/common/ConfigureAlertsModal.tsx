import React, { useState } from 'react';

interface ConfigureAlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConfigureAlertsModal: React.FC<ConfigureAlertsModalProps> = ({ isOpen, onClose }) => {
  const [criticalDelayThreshold, setCriticalDelayThreshold] = useState(30);
  const [enableAudioAlerts, setEnableAudioAlerts] = useState(true);
  const [enableAiRecoveryNotification, setEnableAiRecoveryNotification] = useState(true);
  const [enableSignalDisruptionAlarm, setEnableSignalDisruptionAlarm] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-surface-container-lowest rounded-xl max-w-lg w-full border border-outline-variant/30 shadow-2xl overflow-hidden flex flex-col">
        <div className="p-6 bg-primary text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-secondary-fixed text-[24px]">tune</span>
            <h3 className="font-headline-sm text-headline-sm font-bold">Configure Alert Rules</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded text-white/80 hover:text-white">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="block font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-1">
              Critical Delay Trigger Threshold: <span className="text-primary font-bold">{criticalDelayThreshold} min</span>
            </label>
            <p className="text-xs text-on-surface-variant mb-2">Trains delayed beyond this mark will automatically flag as Critical.</p>
            <input
              type="range"
              min={10}
              max={90}
              step={5}
              value={criticalDelayThreshold}
              onChange={(e) => setCriticalDelayThreshold(Number(e.target.value))}
              className="w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer accent-secondary"
            />
          </div>

          <div className="space-y-3 pt-2">
            <label className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low border border-outline-variant/30 cursor-pointer">
              <span className="font-body-md text-on-surface font-medium">Audible Stoppage Alarms</span>
              <input
                type="checkbox"
                checked={enableAudioAlerts}
                onChange={(e) => setEnableAudioAlerts(e.target.checked)}
                className="w-5 h-5 accent-secondary cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low border border-outline-variant/30 cursor-pointer">
              <span className="font-body-md text-on-surface font-medium">AI Recovery Popups</span>
              <input
                type="checkbox"
                checked={enableAiRecoveryNotification}
                onChange={(e) => setEnableAiRecoveryNotification(e.target.checked)}
                className="w-5 h-5 accent-secondary cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low border border-outline-variant/30 cursor-pointer">
              <span className="font-body-md text-on-surface font-medium">Signal Interlocking Auto-Alerts</span>
              <input
                type="checkbox"
                checked={enableSignalDisruptionAlarm}
                onChange={(e) => setEnableSignalDisruptionAlarm(e.target.checked)}
                className="w-5 h-5 accent-secondary cursor-pointer"
              />
            </label>
          </div>

          {savedSuccess && (
            <div className="p-3 bg-green-50 border border-green-200 text-green-800 rounded-lg text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              Alert thresholds updated successfully.
            </div>
          )}
        </div>

        <div className="p-4 bg-surface border-t border-outline-variant/20 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm text-on-surface-variant hover:bg-surface-container rounded-lg">
            Cancel
          </button>
          <button onClick={handleSave} className="px-5 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90">
            Save Thresholds
          </button>
        </div>
      </div>
    </div>
  );
};
