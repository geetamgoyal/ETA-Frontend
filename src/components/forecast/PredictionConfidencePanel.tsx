import React from 'react';
import { Train } from '../../types/train';
import { clsx } from 'clsx';

interface PredictionConfidencePanelProps {
  train: Train;
}

export const PredictionConfidencePanel: React.FC<PredictionConfidencePanelProps> = ({ train }) => {
  const conf = train.confidencePercent;
  const history = train.etaHistory ?? [];

  // Confidence color tier
  const confColor =
    conf >= 90 ? { bar: '#16a34a', text: 'text-status-ok-text', bg: 'bg-status-ok-bg', label: 'High Confidence' }
    : conf >= 78 ? { bar: '#d97706', text: 'text-status-warn-text', bg: 'bg-status-warn-bg', label: 'Moderate Confidence' }
    : { bar: '#dc2626', text: 'text-status-critical-text', bg: 'bg-status-critical-bg', label: 'Low Confidence' };

  // Factors contributing to confidence
  const factors = [
    {
      label: 'GPS Signal Quality',
      value: conf >= 90 ? 99 : conf >= 78 ? 92 : 78,
      icon: 'satellite_alt',
      status: conf >= 78 ? 'ok' : 'warn',
    },
    {
      label: 'Interlocking Telemetry',
      value: conf >= 90 ? 98 : 94,
      icon: 'device_hub',
      status: 'ok',
    },
    {
      label: 'Historical Accuracy',
      value: conf >= 90 ? 97 : conf >= 78 ? 89 : 82,
      icon: 'history',
      status: conf >= 78 ? 'ok' : 'warn',
    },
    {
      label: 'Congestion Forecast',
      value: conf >= 90 ? 94 : conf >= 78 ? 86 : 74,
      icon: 'traffic',
      status: conf >= 85 ? 'ok' : conf >= 78 ? 'warn' : 'critical',
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Main confidence card */}
      <div className="bg-surface-container-lowest rounded-lg border border-outline-variant/60 overflow-hidden">
        <div className="px-4 py-3 border-b border-outline-variant/40">
          <h4 className="text-[13px] font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-status-ai">psychology</span>
            AI Confidence Score
          </h4>
          <p className="text-[11px] text-on-surface-variant mt-0.5">
            Prediction reliability for {train.trainName}
          </p>
        </div>

        <div className="p-4">
          {/* Big confidence number */}
          <div className="flex items-end gap-3 mb-3">
            <span
              className="data-value text-[3rem] font-black leading-none"
              style={{ color: confColor.bar }}
            >
              {conf}
            </span>
            <div className="mb-1">
              <span className="text-[18px] font-bold text-on-surface-variant">%</span>
              <p
                className={clsx(
                  'text-[11px] font-bold px-2 py-0.5 rounded mt-1',
                  confColor.bg,
                  confColor.text,
                )}
              >
                {confColor.label}
              </p>
            </div>
          </div>

          {/* Confidence bar */}
          <div className="h-2 bg-surface-container rounded-full overflow-hidden mb-3">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${conf}%`, backgroundColor: confColor.bar }}
            />
          </div>

          {/* ETA Range */}
          <div className="flex items-center justify-between p-3 bg-surface-container rounded-lg">
            <div className="text-center">
              <p className="ops-label mb-1">Earliest</p>
              <p className="data-value text-[16px] font-bold text-on-surface">
                {train.expectedEtaRange.min}
              </p>
            </div>
            <div className="text-center">
              <p className="ops-label mb-1">AI Predicted</p>
              <p
                className="data-value text-[20px] font-black"
                style={{ color: confColor.bar }}
              >
                {train.aiPredictedEta}
              </p>
            </div>
            <div className="text-center">
              <p className="ops-label mb-1">Latest</p>
              <p className="data-value text-[16px] font-bold text-on-surface">
                {train.expectedEtaRange.max}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Factor breakdown */}
      <div className="bg-surface-container-lowest rounded-lg border border-outline-variant/60 overflow-hidden">
        <div className="px-4 py-3 border-b border-outline-variant/40">
          <h4 className="text-[13px] font-bold text-on-surface">Confidence Factors</h4>
        </div>
        <div className="p-4 flex flex-col gap-3">
          {factors.map((f) => (
            <div key={f.label} className="flex items-center gap-3">
              <span
                className={clsx(
                  'material-symbols-outlined text-[16px] flex-shrink-0',
                  f.status === 'ok'       ? 'text-status-ok'
                  : f.status === 'warn'   ? 'text-status-warn'
                  : 'text-status-critical',
                )}
              >
                {f.icon}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-medium text-on-surface truncate">{f.label}</span>
                  <span className="data-value text-[11px] font-bold text-on-surface-variant ml-2">
                    {f.value}%
                  </span>
                </div>
                <div className="h-1.5 bg-surface-container rounded-full overflow-hidden">
                  <div
                    className={clsx(
                      'h-full rounded-full',
                      f.status === 'ok'       ? 'bg-status-ok'
                      : f.status === 'warn'   ? 'bg-status-warn'
                      : 'bg-status-critical',
                    )}
                    style={{ width: `${f.value}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confidence trend mini */}
      {history.length >= 3 && (
        <div className="bg-surface-container-lowest rounded-lg border border-outline-variant/60 p-4">
          <p className="ops-label mb-2">Confidence over last {history.length} updates</p>
          <div className="flex items-end gap-1 h-10">
            {history.slice(-8).map((pt, i) => {
              const h = (pt.confidence / 100) * 40;
              const isLast = i === history.slice(-8).length - 1;
              return (
                <div
                  key={i}
                  className={clsx(
                    'flex-1 rounded-sm transition-all duration-300',
                    isLast ? 'bg-secondary' : 'bg-surface-container-high',
                  )}
                  style={{ height: `${h}px` }}
                  title={`${pt.timestamp}: ${pt.confidence}%`}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
