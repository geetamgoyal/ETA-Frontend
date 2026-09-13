import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import { DEMO_STEPS, DEMO_SEQUENCE, DEMO_TRAIN_ID } from '../../data/demoScenarioData';

export const DemoControlBar: React.FC = () => {
  const navigate = useNavigate();
  const {
    isDemoActive,
    isPlaying,
    currentStep,
    currentStepDef,
    secondsRemaining,
    stepDurationSeconds,
    startAutoplay,
    pauseAutoplay,
    resetDemo,
    closeDemo,
    goToStep,
    isBarMinimized,
    toggleBarMinimized,
  } = useDemo();

  if (!isDemoActive) return null;

  const progressPercent = Math.round(((stepDurationSeconds - secondsRemaining) / stepDurationSeconds) * 100);

  // If minimized, render a sleek compact floating controller pill
  if (isBarMinimized) {
    return (
      <aside aria-label="Demo Controller Floating Pill" className="fixed bottom-4 right-4 z-40 animate-fade-in">
        <div className="bg-[#001733]/95 backdrop-blur-md border border-secondary/40 rounded-2xl p-2.5 px-4 shadow-2xl flex items-center gap-3 text-white">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-secondary font-bold">
              SIH Demo Mode
            </span>
          </div>

          <div className="h-4 w-px bg-white/20" />

          {/* Current Step Name */}
          <div className="flex items-center gap-1.5 text-xs font-bold font-mono">
            <span className="text-white">{currentStepDef.shortName}</span>
            <span className="text-secondary">({currentStepDef.aiPredictedEta})</span>
          </div>

          {isPlaying && (
            <span className="text-[10px] font-mono text-slate-300 bg-white/10 px-1.5 py-0.5 rounded">
              {secondsRemaining}s
            </span>
          )}

          <div className="h-4 w-px bg-white/20" />

          {/* Quick Play/Pause */}
          <button
            onClick={isPlaying ? pauseAutoplay : startAutoplay}
            className="p-1 rounded-lg bg-secondary hover:bg-secondary/80 text-white transition-colors cursor-pointer"
            title={isPlaying ? 'Pause Auto-Progression' : 'Start Auto-Progression'}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>

          {/* Reset */}
          <button
            onClick={resetDemo}
            className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Reset to Baseline"
          >
            <span className="material-symbols-outlined text-[18px]">restart_alt</span>
          </button>

          {/* Expand */}
          <button
            onClick={toggleBarMinimized}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Expand Demo Controller"
          >
            <span className="material-symbols-outlined text-[18px]">expand_less</span>
          </button>

          {/* Exit Demo Mode */}
          <button
            onClick={closeDemo}
            className="p-1 rounded-lg hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 transition-colors cursor-pointer"
            title="Exit Demo Mode & Return to Live Operations"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      </aside>
    );
  }

  return (
    <aside aria-label="Demo Controller Bar" className="fixed bottom-0 inset-x-0 z-40 bg-[#001733]/98 border-t-2 border-secondary/50 shadow-2xl backdrop-blur-md text-white transition-all duration-300 animate-slide-up">
      {/* Top micro progress bar for auto-play */}
      {isPlaying && (
        <div className="h-1 w-full bg-[#00244d] overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-secondary via-sky-400 to-emerald-400 transition-all duration-1000 ease-linear shadow-[0_0_10px_#38bdf8]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}

      <div className="max-w-[1560px] mx-auto px-4 py-3 flex flex-col gap-2.5">
        {/* Row 1: Header tags, Playback controls, and Step Selector */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Left: Brand / Demo Identity */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-secondary/20 border border-secondary/40 text-secondary font-mono text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span>SIH DEMO MODE</span>
            </div>

            <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider text-slate-400 font-mono">
              PROTOTYPE DATA • TRAIN #12309 RAJDHANI
            </span>
          </div>

          {/* Center: Step Selector Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {DEMO_SEQUENCE.map((stepId) => {
              const def = DEMO_STEPS[stepId];
              const isActive = currentStep === stepId;
              return (
                <button
                  key={stepId}
                  onClick={() => goToStep(stepId)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-secondary text-white shadow-[0_0_12px_rgba(0,99,153,0.6)] ring-1 ring-white/50 scale-105'
                      : 'bg-[#002b5c]/70 hover:bg-[#003875] text-slate-300 hover:text-white border border-white/10'
                  }`}
                >
                  <span>{def.shortName}</span>
                  <span className={`text-[10px] font-mono px-1 py-0.2 rounded ${isActive ? 'bg-black/20 text-white' : 'text-slate-400'}`}>
                    {def.aiPredictedEta}
                  </span>
                </button>
              );
            })}

            {/* Special Optional Stoppage Event */}
            <button
              onClick={() => goToStep('stoppage')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                currentStep === 'stoppage'
                  ? 'bg-rose-600 text-white ring-1 ring-white/50 shadow-md'
                  : 'bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 border border-rose-800/40'
              }`}
              title="Trigger Unscheduled Stoppage (Speed 0 km/h, +48m delay)"
            >
              <span className="material-symbols-outlined text-[14px]">warning</span>
              <span>Stoppage</span>
            </button>
          </div>

          {/* Right: Autoplay, Reset & Minimize controls */}
          <div className="flex items-center gap-2">
            {/* Play/Pause Button */}
            <button
              onClick={isPlaying ? pauseAutoplay : startAutoplay}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                isPlaying
                  ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
              <span>{isPlaying ? `Pause (${secondsRemaining}s)` : 'Auto Play'}</span>
            </button>

            {/* Reset Button */}
            <button
              onClick={resetDemo}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer border border-white/15"
              title="Reset application to State 1 baseline"
            >
              <span className="material-symbols-outlined text-[16px]">restart_alt</span>
              <span>Reset</span>
            </button>

            {/* Minimize Toggle */}
            <button
              onClick={toggleBarMinimized}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Minimize to floating pill"
            >
              <span className="material-symbols-outlined text-[18px]">expand_more</span>
            </button>

            {/* Exit / Close Demo Mode */}
            <button
              onClick={closeDemo}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-300 hover:bg-rose-500/20 transition-colors cursor-pointer"
              title="Exit Demo Mode & Return to Live Operations"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Row 2: Narrative banner + Live Telemetry Indicators + Navigation Shortcuts */}
        <div className="bg-[#002046]/80 rounded-xl p-2.5 px-3.5 border border-[#1b365d] flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          {/* Narrative & Concept Explanation */}
          <div className="flex items-start sm:items-center gap-2 min-w-0 flex-1">
            <span className="material-symbols-outlined text-secondary text-[18px] flex-shrink-0 mt-0.5 sm:mt-0">
              psychology
            </span>
            <p className="text-slate-200 leading-snug font-normal text-[11px] sm:text-xs">
              <strong className="text-white font-semibold mr-1.5">{currentStepDef.name}:</strong>
              {currentStepDef.narrative}
            </p>
          </div>

          {/* Right side live state pills + fast links */}
          <div className="flex items-center gap-2 flex-wrap flex-shrink-0">
            {/* Speed pill */}
            <span className="px-2 py-0.5 rounded bg-black/30 border border-white/10 text-sky-300 font-mono text-[11px] font-bold">
              Speed: {currentStepDef.speedKmH} km/h
            </span>

            {/* Delay pill */}
            <span
              className={`px-2 py-0.5 rounded border font-mono text-[11px] font-bold ${
                currentStepDef.delayMinutes >= 30
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  : currentStepDef.delayMinutes > 5
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
              }`}
            >
              Delay: +{currentStepDef.delayMinutes}m
            </span>

            {/* Dynamic ETA pill */}
            <span className="px-2 py-0.5 rounded bg-secondary/30 border border-secondary/50 text-white font-mono text-[11px] font-extrabold">
              ETA: {currentStepDef.aiPredictedEta}
            </span>

            <div className="h-4 w-px bg-white/20 mx-1 hidden lg:block" />

            {/* Quick jump buttons */}
            <button
              onClick={() => navigate(`/eta-forecast/${DEMO_TRAIN_ID}`)}
              className="hidden lg:flex items-center gap-1 text-[11px] text-sky-300 hover:text-white bg-sky-950/40 hover:bg-sky-900/60 border border-sky-700/40 px-2 py-0.5 rounded transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[13px]">auto_awesome</span>
              <span>AI Factors</span>
            </button>

            <button
              onClick={() => navigate(`/route-predictions/${DEMO_TRAIN_ID}`)}
              className="hidden lg:flex items-center gap-1 text-[11px] text-purple-300 hover:text-white bg-purple-950/40 hover:bg-purple-900/60 border border-purple-700/40 px-2 py-0.5 rounded transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[13px]">timeline</span>
              <span>Route Curve</span>
            </button>

            <button
              onClick={() => navigate('/alerts')}
              className="hidden lg:flex items-center gap-1 text-[11px] text-amber-300 hover:text-white bg-amber-950/40 hover:bg-amber-900/60 border border-amber-700/40 px-2 py-0.5 rounded transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[13px]">notifications_active</span>
              <span>Alerts</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
