import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { Train, EtaHistoryPoint, TrainEvent, FactorBreakdown } from '../types/train';
import { MOCK_TRAINS } from '../data/trains';

// ── Toast System (inline for zero extra deps) ─────────────────────────────────
export type ToastSeverity = 'critical' | 'warn' | 'info' | 'ok';

export interface ToastMessage {
  id: string;
  severity: ToastSeverity;
  title: string;
  body: string;
  duration?: number; // ms — default 5000
}

export interface DisruptionEventInput {
  scenarioType: string;
  delayDeltaMinutes: number;
  impactZone: string;
  summary: string;
}

// ── Context Shape ─────────────────────────────────────────────────────────────
interface TrainContextType {
  // Train state
  trains: Train[];
  selectedTrainId: string;
  setSelectedTrainId: (id: string) => void;
  selectedTrain: Train;

  // Simulation metadata
  simulationTick: number;      // increments on every update cycle
  lastUpdatedAt: Date;
  isSimulating: boolean;

  // Simulation modal & operational disruption
  isSimulationModalOpen: boolean;
  simulationModalTrainId?: string;
  openSimulationModal: (trainId?: string) => void;
  closeSimulationModal: () => void;
  applyOperationalDisruption: (trainId: string, event: DisruptionEventInput) => void;
  applyDemoStepData: (trainId: string, updates: Partial<Train>) => void;
  resetFleetToNominal: () => void;
  isDemoActive: boolean;
  setIsDemoActive: (active: boolean) => void;

  // Toast system
  toasts: ToastMessage[];
  addToast: (msg: Omit<ToastMessage, 'id'>) => void;
  dismissToast: (id: string) => void;
}

const TrainContext = createContext<TrainContextType | null>(null);

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Parse "HH:MM" → total minutes */
function parseTime(t: string): number {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

/** Minutes → "HH:MM" */
function formatTime(mins: number): string {
  const h = Math.floor(((mins % 1440) + 1440) % 1440 / 60);
  const m = ((mins % 1440) + 1440) % 1440 % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function nowHHMM(): string {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

/** Small deterministic noise in [-range, range] */
function jitter(range: number): number {
  return Math.round((Math.random() * 2 - 1) * range);
}

/** Clamp a number */
function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

/**
 * Simulate one tick for a single train.
 * Returns the updated train and an optional toast if delay changed significantly.
 */
function simulateTrain(
  train: Train,
  tick: number,
): { updated: Train; toast: Omit<ToastMessage, 'id'> | null } {
  // ── 1. Progress ───────────────────────────────────────────────────────────
  // Speed in km/h → distance in km per 20s tick
  const speedKmH = clamp(
    train.currentSpeedKmH + jitter(8),
    0,
    train.maxSpeedKmH,
  );
  const distancePerTick = speedKmH * (20 / 3600); // km per 20s
  const newRemaining = clamp(
    train.remainingDistanceKm - distancePerTick,
    0,
    train.totalDistanceKm,
  );
  const newProgress = clamp(
    ((train.totalDistanceKm - newRemaining) / train.totalDistanceKm) * 100,
    train.journeyProgressPercent,
    99.5,
  );

  // ── 2. Delay evolution ────────────────────────────────────────────────────
  const prevDelay = train.currentDelayMinutes;
  let delayDelta = 0;

  if (train.status === 'Critical Delay') {
    // Critical trains drift upward or start recovering
    delayDelta = tick % 5 === 0 ? jitter(3) - 1 : 0; // slight chance of improvement
  } else if (train.status === 'Recovering' || train.status === 'Minor Delay') {
    // Recovering trains improve (negative delta)
    delayDelta = jitter(2) - 1;
  } else if (train.status === 'On Time') {
    // Stable trains have tiny noise
    delayDelta = jitter(1);
  } else {
    delayDelta = jitter(2);
  }

  const newDelay = clamp(prevDelay + delayDelta, -5, 120);

  // ── 3. Recompute AI ETA ───────────────────────────────────────────────────
  const scheduledEtaMins = parseTime(train.previousEta);
  const newEtaMins = scheduledEtaMins + newDelay;
  const newAiEta = formatTime(newEtaMins);

  // Update confidence: closer to destination → higher confidence
  const progressFactor = newProgress / 100;
  const baseConfidence = progressFactor >= 0.9 ? 96 : progressFactor >= 0.7 ? 91 : 85;
  const newConfidence = clamp(baseConfidence + jitter(3), 72, 99);

  // Update expected range
  const rangeWidth = Math.max(4, Math.round((1 - progressFactor) * 14));
  const newMin = formatTime(newEtaMins - Math.round(rangeWidth / 2));
  const newMax = formatTime(newEtaMins + Math.round(rangeWidth / 2));

  // ── 4. Status recalculation ───────────────────────────────────────────────
  let newStatus = train.status;
  if (newDelay <= 2)       newStatus = 'On Time';
  else if (newDelay <= 10) newStatus = 'Minor Delay';
  else if (newDelay <= 30) newStatus = prevDelay > newDelay ? 'Recovering' : 'Minor Delay';
  else                     newStatus = prevDelay > newDelay ? 'Recovering' : 'Critical Delay';

  // ── 5. Append ETA history point ───────────────────────────────────────────
  const newPoint: EtaHistoryPoint = {
    timestamp: nowHHMM(),
    predictedEta: newAiEta,
    delayMinutes: newDelay,
    confidence: newConfidence,
  };
  const updatedHistory = [...(train.etaHistory || []), newPoint].slice(-12); // keep last 12 points

  // ── 6. Station status transitions ─────────────────────────────────────────
  const updatedStations = train.stations.map((st) => {
    const stProgressThreshold = (st.distanceKm / train.totalDistanceKm) * 100;
    if (st.status === 'Upcoming' && newProgress >= stProgressThreshold - 2) {
      return { ...st, status: 'Current' as const };
    }
    if (st.status === 'Current' && newProgress >= stProgressThreshold + 5) {
      return { ...st, status: 'Departed' as const };
    }
    return st;
  });

  // ── 7. Toast if significant delay change ──────────────────────────────────
  const delayChange = newDelay - prevDelay;
  let toast: Omit<ToastMessage, 'id'> | null = null;

  if (Math.abs(delayChange) >= 4) {
    if (delayChange > 0 && newDelay > 20) {
      toast = {
        severity: 'critical',
        title: `Delay Worsening — ${train.trainName}`,
        body: `Train ${train.trainNumber} delay increased to ${newDelay} min. AI ETA revised to ${newAiEta}.`,
        duration: 6000,
      };
    } else if (delayChange < -3 && prevDelay > 10) {
      toast = {
        severity: 'ok',
        title: `Delay Recovery — ${train.trainName}`,
        body: `Train ${train.trainNumber} recovered ${Math.abs(delayChange)} min. New AI ETA: ${newAiEta}.`,
        duration: 5000,
      };
    }
  }

  // ── 8. Operational status text & next station distance ────────────────────
  let operationalStatusText = 'Running on schedule';
  if (newStatus === 'Critical Delay') {
    operationalStatusText = speedKmH === 0 ? 'Critical delay — stationary at block' : `Critical delay (+${newDelay} min)`;
  } else if (newStatus === 'Recovering') {
    operationalStatusText = `Running with predicted delay (recovering at ${speedKmH} km/h)`;
  } else if (newStatus === 'Minor Delay') {
    operationalStatusText = `Running with predicted delay (+${newDelay} min)`;
  }

  const traversedKm = train.totalDistanceKm - newRemaining;

  // ── Deterministic station and section progression ───────────────────────────
  const sortedStns = [...updatedStations].sort((a, b) => a.distanceKm - b.distanceKm);
  let lastPassed = sortedStns[0];
  let upcoming = sortedStns[sortedStns.length - 1];

  for (let i = 0; i < sortedStns.length; i++) {
    if (traversedKm >= sortedStns[i].distanceKm) {
      lastPassed = sortedStns[i];
    } else {
      upcoming = sortedStns[i];
      break;
    }
  }

  let determinedLocation = train.currentLocation;
  if (Math.abs(traversedKm - lastPassed.distanceKm) <= 3) {
    determinedLocation = `${lastPassed.stationName}`;
  } else if (Math.abs(traversedKm - upcoming.distanceKm) <= 3) {
    determinedLocation = `Approaching ${upcoming.stationName}`;
  } else {
    determinedLocation = `Section ${lastPassed.stationCode} → ${upcoming.stationCode} (KM ${Math.round(traversedKm)})`;
  }

  const determinedNextStation = upcoming.stationName;
  const nextDist = Math.max(2, Math.round(upcoming.distanceKm - traversedKm));

  let updatedEvents = train.recentEvents || [];
  if (delayDelta !== 0) {
    const newEvent: TrainEvent = {
      id: `ev-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      timestamp: nowHHMM(),
      description: delayDelta > 0
        ? `Signal restriction / headway adjustment: ETA revised to ${newAiEta} (+${newDelay}m)`
        : `Speed recovery of ${Math.abs(delayDelta)}m on section: revised ETA to ${newAiEta}`,
      type: delayDelta > 0 ? 'slowdown' : 'recovery',
    };
    updatedEvents = [newEvent, ...updatedEvents].slice(0, 10);
  }

  const updated: Train = {
    ...train,
    currentLocation: determinedLocation,
    nextStation: determinedNextStation,
    currentSpeedKmH: speedKmH,
    remainingDistanceKm: newRemaining,
    journeyProgressPercent: newProgress,
    currentDelayMinutes: newDelay,
    aiPredictedEta: newAiEta,
    confidencePercent: newConfidence,
    status: newStatus,
    operationalStatusText,
    distanceToNextStationKm: nextDist,
    expectedEtaRange: { min: newMin, max: newMax },
    etaHistory: updatedHistory,
    stations: updatedStations,
    recentEvents: updatedEvents,
    lastUpdatedAt: new Date().toISOString(),
  };

  return { updated, toast };
}

// ── Provider ──────────────────────────────────────────────────────────────────

export const TrainProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trains, setTrains] = useState<Train[]>(MOCK_TRAINS);
  const [selectedTrainId, setSelectedTrainId] = useState<string>('12309');
  const [simulationTick, setSimulationTick] = useState(0);
  const [lastUpdatedAt, setLastUpdatedAt] = useState<Date>(new Date());
  const [isSimulating] = useState(true);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const tickRef = useRef(0);

  const addToast = useCallback((msg: Omit<ToastMessage, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const toast: ToastMessage = { ...msg, id };
    setToasts((prev) => [...prev.slice(-4), toast]); // max 5 toasts
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, msg.duration ?? 5000);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const selectedTrainIdRef = useRef(selectedTrainId);
  useEffect(() => {
    selectedTrainIdRef.current = selectedTrainId;
  }, [selectedTrainId]);

  const [isDemoActive, setIsDemoActive] = useState(false);
  const isDemoActiveRef = useRef(false);
  useEffect(() => {
    isDemoActiveRef.current = isDemoActive;
  }, [isDemoActive]);

  // ── Simulation loop: runs every 20 seconds ─────────────────────────────────
  useEffect(() => {
    const interval = setInterval(() => {
      tickRef.current += 1;
      const tick = tickRef.current;

      setTrains((prevTrains) => {
        const pendingToasts: Array<Omit<ToastMessage, 'id'>> = [];

        // Always update the selected train plus 1 other train
        const trainCount = prevTrains.length;
        const updateCount = Math.min(trainCount, 2);
        const indices = new Set<number>();
        const selIdx = prevTrains.findIndex((t) => t.id === selectedTrainIdRef.current);
        if (selIdx !== -1) {
          indices.add(selIdx);
        }
        while (indices.size < updateCount) {
          indices.add(Math.floor(Math.random() * trainCount));
        }

        const updatedTrains = prevTrains.map((train, idx) => {
          if (!indices.has(idx)) return train;
          // Protect demo train from random background fluctuations when in Demo Mode
          if (isDemoActiveRef.current && train.id === '12309') return train;

          const { updated, toast } = simulateTrain(train, tick);
          if (toast) pendingToasts.push(toast);
          return updated;
        });

        // Schedule toasts outside state update
        setTimeout(() => {
          pendingToasts.forEach(addToast);
        }, 0);

        return updatedTrains;
      });

      setSimulationTick(tick);
      setLastUpdatedAt(new Date());
    }, 20_000); // every 20 seconds

    return () => clearInterval(interval);
  }, [addToast]);

  const [isSimulationModalOpen, setIsSimulationModalOpen] = useState(false);
  const [simulationModalTrainId, setSimulationModalTrainId] = useState<string | undefined>(undefined);

  const openSimulationModal = useCallback((trainId?: string) => {
    setSimulationModalTrainId(trainId || selectedTrainId);
    setIsSimulationModalOpen(true);
  }, [selectedTrainId]);

  const closeSimulationModal = useCallback(() => {
    setIsSimulationModalOpen(false);
    setSimulationModalTrainId(undefined);
  }, []);

  const applyOperationalDisruption = useCallback((trainId: string, event: DisruptionEventInput) => {
    setTrains((prev) => {
      return prev.map((train) => {
        if (train.id !== trainId && train.trainNumber !== trainId) return train;

        const newDelay = Math.max(0, train.currentDelayMinutes + event.delayDeltaMinutes);
        const schedMins = parseTime(train.previousEta);
        const newEta = formatTime(schedMins + newDelay);

        let newStatus = train.status;
        if (newDelay > 25) newStatus = 'Critical Delay';
        else if (newDelay > 2) newStatus = 'Minor Delay';
        else if (event.delayDeltaMinutes < 0) newStatus = 'Recovering';
        else newStatus = 'On Time';

        let newSpeed = train.currentSpeedKmH;
        if (event.delayDeltaMinutes >= 20) {
          newSpeed = 0; // complete stop or heavy holding
        } else if (event.delayDeltaMinutes > 5) {
          newSpeed = Math.max(25, Math.min(60, Math.round(train.currentSpeedKmH * 0.5)));
        } else if (event.delayDeltaMinutes < 0) {
          newSpeed = Math.min(train.maxSpeedKmH, train.currentSpeedKmH + 15);
        }

        const newEvent: TrainEvent = {
          id: `sim-ev-${Date.now()}`,
          timestamp: nowHHMM(),
          description: event.summary,
          type: event.delayDeltaMinutes > 15 ? 'halt' : event.delayDeltaMinutes > 0 ? 'slowdown' : 'recovery',
        };

        const newHistoryTick: EtaHistoryPoint = {
          timestamp: nowHHMM(),
          predictedEta: newEta,
          delayMinutes: newDelay,
          confidence: Math.max(75, Math.min(99, train.confidencePercent - (event.delayDeltaMinutes > 10 ? 8 : 2))),
        };

        const currentFactors = train.factors ?? {
          initialDelayMinutes: train.currentDelayMinutes,
          speedRecoveryMinutes: 0,
          routeCongestionMinutes: 0,
          historicalPatternsMinutes: 0,
          scheduledHaltStatus: 'Nominal',
          finalForecastDelayMinutes: train.currentDelayMinutes,
        };

        const updatedFactors: FactorBreakdown = {
          ...currentFactors,
          routeCongestionMinutes: currentFactors.routeCongestionMinutes + (event.delayDeltaMinutes > 0 ? Math.round(event.delayDeltaMinutes * 0.4) : -2),
          speedRecoveryMinutes: event.delayDeltaMinutes < 0 ? currentFactors.speedRecoveryMinutes - Math.abs(event.delayDeltaMinutes) : currentFactors.speedRecoveryMinutes,
          finalForecastDelayMinutes: newDelay,
        };

        // Propagate delay downstream to upcoming stations
        const updatedStations = train.stations.map((st) => {
          if (st.status === 'Departed') return st;
          const stSchedMins = parseTime(st.scheduledArrival);
          const newStationDelay = Math.max(0, st.predictedDelayMinutes + event.delayDeltaMinutes);
          const newStationEta = formatTime(stSchedMins + newStationDelay);
          return {
            ...st,
            predictedDelayMinutes: newStationDelay,
            actualOrPredictedArrival: newStationEta,
          };
        });

        return {
          ...train,
          currentDelayMinutes: newDelay,
          aiPredictedEta: newEta,
          status: newStatus,
          currentSpeedKmH: newSpeed,
          operationalStatusText: event.summary,
          factors: updatedFactors,
          stations: updatedStations,
          recentEvents: [newEvent, ...(train.recentEvents ?? []).slice(0, 5)],
          etaHistory: [...train.etaHistory, newHistoryTick],
          lastUpdatedAt: new Date().toISOString(),
        };
      });
    });

    setLastUpdatedAt(new Date());

    addToast({
      severity: event.delayDeltaMinutes > 15 ? 'critical' : event.delayDeltaMinutes > 0 ? 'warn' : 'ok',
      title: `Operational Scenario Activated`,
      body: `${event.summary} Dynamic ETA recalculated.`,
      duration: 6000,
    });
  }, [addToast]);

  const applyDemoStepData = useCallback((trainId: string, updates: Partial<Train>) => {
    setIsDemoActive(true);
    setTrains((prev) =>
      prev.map((t) => {
        if (t.id !== trainId && t.trainNumber !== trainId) return t;
        return {
          ...t,
          ...updates,
          lastUpdatedAt: new Date().toISOString(),
        };
      })
    );
    setLastUpdatedAt(new Date());
  }, []);

  const resetFleetToNominal = useCallback(() => {
    setIsDemoActive(false);
    setTrains(MOCK_TRAINS);
    setSimulationTick(0);
    setLastUpdatedAt(new Date());
    addToast({
      severity: 'ok',
      title: 'Fleet State Restored',
      body: 'All coaching trains reset to baseline Working Timetable (WTT) schedule.',
      duration: 4000,
    });
  }, [addToast]);

  const selectedTrain =
    trains.find((t) => t.id === selectedTrainId) ?? trains[0];

  const value: TrainContextType = {
    trains,
    selectedTrainId,
    setSelectedTrainId,
    selectedTrain,
    simulationTick,
    lastUpdatedAt,
    isSimulating,
    isSimulationModalOpen,
    simulationModalTrainId,
    openSimulationModal,
    closeSimulationModal,
    applyOperationalDisruption,
    applyDemoStepData,
    resetFleetToNominal,
    isDemoActive,
    setIsDemoActive,
    toasts,
    addToast,
    dismissToast,
  };

  return <TrainContext.Provider value={value}>{children}</TrainContext.Provider>;
};

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useTrains(): TrainContextType {
  const ctx = useContext(TrainContext);
  if (!ctx) {
    throw new Error('useTrains must be used inside <TrainProvider>');
  }
  return ctx;
}

export type { TrainContextType };
