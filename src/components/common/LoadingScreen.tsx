import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete?: () => void;
  durationMs?: number;
}

interface InitStep {
  id: string;
  label: string;
  sublabel: string;
  threshold: number;
}

const INITIALIZATION_STEPS: InitStep[] = [
  {
    id: 'network',
    label: 'Connecting to Railway Network',
    sublabel: 'Establishing secure link to CRIS & Indian Railways telemetry',
    threshold: 18,
  },
  {
    id: 'train_data',
    label: 'Loading Live Train Data',
    sublabel: 'Ingesting real-time GPS & section occupancy feeds',
    threshold: 40,
  },
  {
    id: 'conditions',
    label: 'Analyzing Operational Conditions',
    sublabel: 'Processing speed restrictions, gradients & weather variables',
    threshold: 65,
  },
  {
    id: 'ai_engine',
    label: 'Initializing AI ETA Engine',
    sublabel: 'Calibrating neural delay propagation models',
    threshold: 88,
  },
  {
    id: 'dashboard',
    label: 'Preparing Operational Dashboard',
    sublabel: 'Generating real-time intelligence visuals & dispatch hub',
    threshold: 100,
  },
];

const ROUTE_NODES = [
  { id: 'data', label: 'Live Data', sub: 'NavIC / CRIS', pos: 0 },
  { id: 'track', label: 'Track State', sub: 'Interlocking', pos: 33 },
  { id: 'ai', label: 'AI Processing', sub: 'Neural Engine', pos: 66 },
  { id: 'eta', label: 'ETA Prediction', sub: 'Live Dispatch', pos: 100 },
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onComplete,
  durationMs = 3800,
}) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isRendered, setIsRendered] = useState(true);

  useEffect(() => {
    const startTime = performance.now();
    let animationFrameId: number;

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / durationMs, 1);

      // Smooth custom ease-in-out curve
      const easedProgress =
        rawProgress < 0.5
          ? 2 * rawProgress * rawProgress
          : 1 - Math.pow(-2 * rawProgress + 2, 2) / 2;

      const currentPercent = Math.round(easedProgress * 100);
      setProgress(currentPercent);

      if (rawProgress < 1) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        // Small delay at 100% to let the user see the complete state
        const readyTimer = setTimeout(() => {
          setIsFadingOut(true);
          // Allow fade-out animation to finish before calling onComplete
          const finishTimer = setTimeout(() => {
            setIsRendered(false);
            if (onComplete) {
              onComplete();
            }
          }, 600);
          return () => clearTimeout(finishTimer);
        }, 450);

        return () => clearTimeout(readyTimer);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [durationMs, onComplete]);

  if (!isRendered) {
    return null;
  }

  // Identify active step
  const activeStepIndex = INITIALIZATION_STEPS.findIndex(
    (step) => progress < step.threshold
  );
  const currentStep =
    activeStepIndex === -1
      ? INITIALIZATION_STEPS[INITIALIZATION_STEPS.length - 1]
      : INITIALIZATION_STEPS[activeStepIndex];

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col justify-between overflow-hidden bg-[#00142e] text-white transition-all duration-700 select-none ${
        isFadingOut
          ? 'opacity-0 scale-[1.02] pointer-events-none'
          : 'opacity-100 scale-100'
      }`}
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 30%, rgba(0, 99, 153, 0.28) 0%, transparent 65%),
          radial-gradient(circle at 80% 80%, rgba(124, 58, 237, 0.12) 0%, transparent 50%),
          linear-gradient(to bottom, #001229 0%, #001f44 50%, #001026 100%)
        `,
      }}
    >
      {/* Background Decorative Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Ambient Top Glow Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#67bafd]/60 to-transparent" />

      {/* Top Header / System Tag */}
      <div className="relative z-10 w-full px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#67bafd] shadow-[0_0_8px_#67bafd] animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#87a0cd]/90 font-medium">
            AI Operations Gateway
          </span>
        </div>
        <div className="font-mono text-xs text-[#87a0cd]/70 border border-[#1b365d] bg-[#002046]/60 px-3 py-1 rounded-full backdrop-blur-xs">
          Smart India Hackathon • SIH-1644
        </div>
      </div>

      {/* Main Center Stage */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 py-2 flex flex-col items-center">
        {/* Brand Icon with Pulsing Halo */}
        <div className="relative mb-5 flex items-center justify-center">
          {/* Animated Glow Rings */}
          <div className="absolute w-24 h-24 rounded-2xl bg-[#006399]/30 blur-xl animate-pulse" />
          <div className="absolute w-20 h-20 rounded-2xl border border-[#67bafd]/30 animate-ping opacity-25" />

          {/* Main Logo Container */}
          <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-[#002b5c] via-[#002046] to-[#001733] border border-[#67bafd]/40 shadow-[0_0_30px_rgba(103,186,253,0.3)] flex items-center justify-center group">
            <span className="material-symbols-outlined text-[34px] md:text-[42px] text-white transition-transform duration-300 group-hover:scale-105">
              train
            </span>
            {/* Corner Tech Accents */}
            <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-[#67bafd]" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-[#67bafd]" />
          </div>
        </div>

        {/* Brand Title & Subtitle */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight flex items-center justify-center gap-2">
            RailForecast <span className="text-[#67bafd]">AI</span>
          </h1>
          <p className="mt-1 font-mono text-xs md:text-sm font-semibold tracking-[0.28em] text-[#87a0cd] uppercase">
            Operational Intelligence
          </p>
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b365d]/50 border border-[#67bafd]/20 backdrop-blur-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#67bafd] animate-ping" />
            <span className="text-xs text-[#d6e3ff] font-medium">
              Initializing Railway Intelligence...
            </span>
          </div>
        </div>

        {/* Railway Route & Animated Train Element */}
        <div className="w-full bg-[#002046]/70 border border-[#1b365d]/80 rounded-2xl p-5 md:p-6 mb-7 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.35)] relative overflow-hidden">
          {/* Concept Header */}
          <div className="flex items-center justify-between mb-6 text-xs font-mono text-[#87a0cd]">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#67bafd]">
                route
              </span>
              TELEMETRY & PREDICTION PIPELINE
            </span>
            <span className="text-[#67bafd] font-semibold">
              STAGE {activeStepIndex === -1 ? '5/5' : `${activeStepIndex + 1}/5`}
            </span>
          </div>

          {/* Railway Track Container */}
          <div className="relative w-full py-4 mb-2">
            {/* Background Railway Track Line */}
            <div className="relative h-2 w-full bg-[#0d274c] rounded-full overflow-hidden">
              {/* Rail Sleeper Tick Marks */}
              <div
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(90deg, #87a0cd 0px, #87a0cd 2px, transparent 2px, transparent 12px)',
                }}
              />
              {/* Active Glowing Route Progress Fill */}
              <div
                className="h-full bg-gradient-to-r from-[#006399] via-[#67bafd] to-[#7c3aed] transition-all duration-300 ease-out shadow-[0_0_12px_#67bafd]"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Station Nodes Along Route */}
            <div className="relative -mt-3.5 flex justify-between items-center w-full pointer-events-none">
              {ROUTE_NODES.map((node) => {
                const isPassed = progress >= node.pos;
                const isCurrent =
                  progress >= node.pos - 15 && progress < node.pos + 18;

                return (
                  <div
                    key={node.id}
                    className="flex flex-col items-center relative"
                  >
                    {/* Node Dot */}
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-500 z-10 ${
                        isPassed
                          ? 'bg-[#67bafd] border-white shadow-[0_0_12px_#67bafd]'
                          : 'bg-[#001f44] border-[#1b365d]'
                      }`}
                    >
                      {isPassed ? (
                        <div className="w-1.5 h-1.5 rounded-full bg-[#002046]" />
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full bg-[#1b365d]" />
                      )}
                    </div>

                    {/* Node Labels */}
                    <div className="mt-2.5 text-center whitespace-nowrap">
                      <p
                        className={`text-[11px] font-semibold transition-colors duration-300 ${
                          isPassed
                            ? 'text-white'
                            : isCurrent
                            ? 'text-[#67bafd]'
                            : 'text-[#87a0cd]/60'
                        }`}
                      >
                        {node.label}
                      </p>
                      <p className="text-[9px] font-mono text-[#87a0cd]/50 hidden sm:block">
                        {node.sub}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Moving Train Locomotive on Track */}
            <div
              className="absolute top-1 -ml-3.5 transition-all duration-200 ease-out pointer-events-none z-20"
              style={{
                left: `${Math.min(Math.max(progress, 2), 98)}%`,
              }}
            >
              <div className="relative flex items-center justify-center">
                {/* Forward Glowing Headlight Beam */}
                <div
                  className="absolute left-6 w-10 h-6 pointer-events-none opacity-60"
                  style={{
                    background:
                      'radial-gradient(ellipse at left, rgba(103,186,253,0.8) 0%, rgba(103,186,253,0) 80%)',
                    transform: 'translateY(-1px)',
                  }}
                />
                {/* Train Badge */}
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#004972] to-[#67bafd] border border-white text-white flex items-center justify-center shadow-[0_0_15px_#67bafd]">
                  <span className="material-symbols-outlined text-[16px]">
                    directions_transit
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Workflow Sequence Indicator (Live Data -> AI Processing -> ETA Prediction) */}
          <div className="mt-6 pt-3 border-t border-[#1b365d]/50 flex items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-xs font-mono text-[#87a0cd]">
            <span
              className={
                progress < 35
                  ? 'text-[#67bafd] font-bold underline decoration-[#67bafd] underline-offset-4'
                  : 'text-white font-medium'
              }
            >
              Live Data
            </span>
            <span className="text-[#87a0cd]/50">→</span>
            <span
              className={
                progress >= 35 && progress < 75
                  ? 'text-[#67bafd] font-bold underline decoration-[#67bafd] underline-offset-4'
                  : progress >= 75
                  ? 'text-white font-medium'
                  : 'text-[#87a0cd]/50'
              }
            >
              AI Processing
            </span>
            <span className="text-[#87a0cd]/50">→</span>
            <span
              className={
                progress >= 75
                  ? 'text-[#67bafd] font-bold underline decoration-[#67bafd] underline-offset-4'
                  : 'text-[#87a0cd]/50'
              }
            >
              ETA Prediction
            </span>
          </div>
        </div>

        {/* System Initialization Status Checklist */}
        <div className="w-full bg-[#001b3d]/60 border border-[#1b365d]/50 rounded-xl p-4 mb-6 backdrop-blur-xs">
          <div className="flex flex-col gap-2.5">
            {INITIALIZATION_STEPS.map((step) => {
              const isCompleted = progress >= step.threshold;
              const isActive =
                !isCompleted &&
                (activeStepIndex === -1
                  ? false
                  : INITIALIZATION_STEPS[activeStepIndex]?.id === step.id);

              return (
                <div
                  key={step.id}
                  className={`flex items-center justify-between transition-all duration-300 ${
                    isCompleted
                      ? 'opacity-90'
                      : isActive
                      ? 'opacity-100 translate-x-1'
                      : 'opacity-40'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {/* Status Icon */}
                    {isCompleted ? (
                      <div className="w-4 h-4 rounded-full bg-[#059669]/20 border border-[#059669] flex items-center justify-center text-[#10b981]">
                        <span className="material-symbols-outlined text-[12px] font-bold">
                          check
                        </span>
                      </div>
                    ) : isActive ? (
                      <div className="w-4 h-4 rounded-full border border-[#67bafd] border-t-transparent animate-spin" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-[#87a0cd]/30 flex items-center justify-center">
                        <div className="w-1 h-1 rounded-full bg-[#87a0cd]/40" />
                      </div>
                    )}

                    {/* Step Label */}
                    <span
                      className={`text-xs md:text-sm font-medium ${
                        isCompleted
                          ? 'text-[#e5eeff]'
                          : isActive
                          ? 'text-[#67bafd] font-semibold'
                          : 'text-[#87a0cd]/60'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>

                  {/* Operational Tag */}
                  <span className="font-mono text-[10px] text-[#87a0cd]/60">
                    {isCompleted ? (
                      <span className="text-[#10b981] font-semibold">
                        READY
                      </span>
                    ) : isActive ? (
                      <span className="text-[#67bafd] animate-pulse">
                        PROCESSING
                      </span>
                    ) : (
                      'QUEUED'
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress Indicator Bar */}
        <div className="w-full">
          <div className="flex items-center justify-between mb-2 text-xs">
            <span className="text-[#87a0cd] font-medium flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px] text-[#67bafd]">
                speed
              </span>
              Loading Operational Intelligence...
            </span>
            <span className="font-mono text-sm font-bold text-[#67bafd] tracking-wider">
              {progress}%
            </span>
          </div>

          {/* Progress Track */}
          <div className="h-2 w-full bg-[#001733] border border-[#1b365d] rounded-full overflow-hidden p-[1px]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#006399] via-[#67bafd] to-[#38bdf8] transition-all duration-150 ease-out shadow-[0_0_10px_rgba(103,186,253,0.7)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Dynamic Active Step Status Description */}
          <p className="mt-2 text-center text-[11px] font-mono text-[#87a0cd]/80 truncate">
            &gt; {currentStep?.sublabel || 'Synchronizing operational telemetry...'}
          </p>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="relative z-10 w-full px-6 py-5 border-t border-[#1b365d]/40 bg-[#001026]/80 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#87a0cd]/70">
        <div className="flex items-center gap-2">
          <span>RailForecast AI</span>
          <span>•</span>
          <span className="text-white/80">Real-Time Railway Intelligence</span>
        </div>

        <div className="flex items-center gap-2">
          {progress >= 100 ? (
            <span className="inline-flex items-center gap-1.5 text-[#10b981] font-mono font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_6px_#10b981]" />
              SYSTEM READY • LAUNCHING
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-[#67bafd] font-mono font-medium">
              <span className="w-2 h-2 rounded-full bg-[#67bafd] animate-ping" />
              SYSTEM INITIALIZING
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
