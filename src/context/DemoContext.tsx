import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useTrains } from './TrainContext';
import { useAlerts } from './AlertContext';
import {
  DEMO_TRAIN_ID,
  DEMO_STEPS,
  DEMO_SEQUENCE,
  DemoStepId,
  DemoStepDefinition,
} from '../data/demoScenarioData';

interface DemoContextType {
  isDemoActive: boolean;
  isPlaying: boolean;
  currentStep: DemoStepId;
  currentStepDef: DemoStepDefinition;
  secondsRemaining: number;
  stepDurationSeconds: number;
  activateDemo: (stepId?: DemoStepId) => void;
  closeDemo: () => void;
  startAutoplay: () => void;
  pauseAutoplay: () => void;
  resetDemo: () => void;
  goToStep: (stepId: DemoStepId) => void;
  nextStep: () => void;
  prevStep: () => void;
  isBarMinimized: boolean;
  toggleBarMinimized: () => void;
}

const STEP_DURATION_SECONDS = 10;

const DemoContext = createContext<DemoContextType | null>(null);

export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { applyDemoStepData, resetFleetToNominal, setSelectedTrainId, addToast } = useTrains();
  const { upsertDemoAlert, resetAlertsToBaseline } = useAlerts();

  const [isDemoActive, setIsDemoActive] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<DemoStepId>('normal');
  const [secondsRemaining, setSecondsRemaining] = useState<number>(STEP_DURATION_SECONDS);
  const [isBarMinimized, setIsBarMinimized] = useState<boolean>(false);

  const currentStepDef = DEMO_STEPS[currentStep];

  // Execute a specific deterministic step
  const executeStep = useCallback(
    (stepId: DemoStepId, notify = true) => {
      const def = DEMO_STEPS[stepId];
      if (!def) return;

      setIsDemoActive(true);
      setCurrentStep(stepId);
      setSecondsRemaining(STEP_DURATION_SECONDS);

      // Ensure train 12309 is active
      setSelectedTrainId(DEMO_TRAIN_ID);

      // 1. Update train in global TrainContext
      applyDemoStepData(DEMO_TRAIN_ID, {
        currentSpeedKmH: def.speedKmH,
        currentDelayMinutes: def.delayMinutes,
        aiPredictedEta: def.aiPredictedEta,
        status: def.status,
        confidencePercent: def.confidencePercent,
        currentLocation: def.currentLocation,
        nextStation: def.nextStation,
        operationalStatusText: def.operationalStatusText,
        factors: def.factors,
        stations: def.stations,
        etaHistory: def.etaHistory,
      });

      // 2. Update alerts in global AlertContext
      upsertDemoAlert(def.alert);

      // 3. Optional notification
      if (notify) {
        let toastSev: 'ok' | 'warn' | 'critical' | 'info' = 'info';
        if (def.delayMinutes >= 30) toastSev = 'critical';
        else if (def.delayMinutes > 5) toastSev = 'warn';
        else if (def.id === 'recovery') toastSev = 'ok';

        addToast({
          severity: toastSev,
          title: `Demo: ${def.name}`,
          body: `Speed: ${def.speedKmH} km/h • Delay: +${def.delayMinutes}m • ETA: ${def.aiPredictedEta}`,
          duration: 4000,
        });
      }
    },
    [applyDemoStepData, upsertDemoAlert, setSelectedTrainId, addToast]
  );

  const goToStep = useCallback(
    (stepId: DemoStepId) => {
      executeStep(stepId, true);
    },
    [executeStep]
  );

  const nextStep = useCallback(() => {
    const currIdx = DEMO_SEQUENCE.indexOf(currentStep);
    if (currIdx !== -1 && currIdx < DEMO_SEQUENCE.length - 1) {
      executeStep(DEMO_SEQUENCE[currIdx + 1], true);
    } else {
      setIsPlaying(false);
      addToast({
        severity: 'ok',
        title: 'Demo Cycle Completed',
        body: 'Deterministic sequence finished: Normal → Signal → Congestion → Recovery.',
        duration: 5000,
      });
    }
  }, [currentStep, executeStep, addToast]);

  const prevStep = useCallback(() => {
    const currIdx = DEMO_SEQUENCE.indexOf(currentStep);
    if (currIdx > 0) {
      executeStep(DEMO_SEQUENCE[currIdx - 1], true);
    }
  }, [currentStep, executeStep]);

  const startAutoplay = useCallback(() => {
    setIsPlaying(true);
    setIsDemoActive(true);
    // If at the end of the sequence, restart from normal
    if (currentStep === DEMO_SEQUENCE[DEMO_SEQUENCE.length - 1]) {
      executeStep('normal', true);
    }
  }, [currentStep, executeStep]);

  const pauseAutoplay = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const activateDemo = useCallback(
    (stepId: DemoStepId = 'normal') => {
      setIsDemoActive(true);
      setIsBarMinimized(false);
      executeStep(stepId, true);
    },
    [executeStep]
  );

  const closeDemo = useCallback(() => {
    setIsPlaying(false);
    setIsDemoActive(false);
    setCurrentStep('normal');
    setSecondsRemaining(STEP_DURATION_SECONDS);

    // Restore nominal data across contexts
    resetFleetToNominal();
    resetAlertsToBaseline();

    addToast({
      severity: 'info',
      title: 'Demo Mode Closed',
      body: 'Application returned to standard live operations view.',
      duration: 3000,
    });
  }, [resetFleetToNominal, resetAlertsToBaseline, addToast]);

  const resetDemo = useCallback(() => {
    setIsPlaying(false);
    setCurrentStep('normal');
    setSecondsRemaining(STEP_DURATION_SECONDS);

    // Restore nominal data across contexts
    resetFleetToNominal();
    resetAlertsToBaseline();

    addToast({
      severity: 'ok',
      title: 'Demo State Reset',
      body: 'Application restored to initial baseline. Stale alerts and timers cleared.',
      duration: 3500,
    });
  }, [resetFleetToNominal, resetAlertsToBaseline, addToast]);

  const toggleBarMinimized = useCallback(() => {
    setIsBarMinimized((prev) => !prev);
  }, []);

  // ── Auto-advance timer: strictly 1 timer, cleanly wiped on unmount/pause ──
  const nextStepRef = useRef(nextStep);
  useEffect(() => {
    nextStepRef.current = nextStep;
  }, [nextStep]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          // Timer expired, advance to next step
          nextStepRef.current();
          return STEP_DURATION_SECONDS;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <DemoContext.Provider
      value={{
        isDemoActive,
        isPlaying,
        currentStep,
        currentStepDef,
        secondsRemaining,
        stepDurationSeconds: STEP_DURATION_SECONDS,
        activateDemo,
        closeDemo,
        startAutoplay,
        pauseAutoplay,
        resetDemo,
        goToStep,
        nextStep,
        prevStep,
        isBarMinimized,
        toggleBarMinimized,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = (): DemoContextType => {
  const ctx = useContext(DemoContext);
  if (!ctx) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return ctx;
};
