import { Train } from '../types/train';

export interface PrototypeDelayFactor {
  id: string;
  name: string;
  category: 'Speed' | 'Delay' | 'SRT' | 'Dwell' | 'Congestion' | 'Restriction';
  impactMinutes: number; // positive = added delay, negative = recovery
  icon: string;
  metricLabel: string;
  metricValue: string;
  description: string;
  severity: 'ok' | 'warn' | 'critical' | 'info';
}

export interface TrainDelayFactorAnalysis {
  trainId: string;
  initialDelayMinutes: number;
  dynamicAdjustmentMinutes: number;
  finalForecastDelayMinutes: number;
  scheduledEta: string;
  predictedDynamicEta: string;
  conventionalEta: string;
  deltaVsConventionalMinutes: number;
  factors: PrototypeDelayFactor[];
  totalFactorDelta: number;
  isSimulated: boolean;
  disclaimer: string;
}

export function parseTimeMins(t: string): number {
  if (!t || !t.includes(':')) return 0;
  const [h, m] = t.split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
}

export function formatTimeMins(mins: number): string {
  const normalized = ((mins % 1440) + 1440) % 1440;
  const h = Math.floor(normalized / 60);
  const m = normalized % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

/**
 * Computes the 6 supported prototype delay factors dynamically
 * based on the train's active operational state and simulation telemetry.
 */
export function getTrainDelayFactors(train: Train): TrainDelayFactorAnalysis {
  const delay = Math.max(0, train.currentDelayMinutes);
  const speed = train.currentSpeedKmH;
  const maxSpeed = train.maxSpeedKmH;
  const isCritical = delay > 25 || train.status === 'Critical Delay';
  const isRecovering = train.status === 'Recovering' || (delay > 0 && speed > 85);
  const isOnTime = delay <= 2;

  // 1. Current Speed Variation vs Sectional MPS
  const speedRatio = speed / Math.max(maxSpeed, 100);
  let speedImpact = 0;
  let speedDesc = '';
  if (speed === 0) {
    speedImpact = 8;
    speedDesc = `Train currently stationary (0 km/h) against ${maxSpeed} km/h MPS limit.`;
  } else if (speedRatio < 0.6) {
    speedImpact = 5;
    speedDesc = `Speed throttled to ${speed} km/h (${Math.round((1 - speedRatio) * 100)}% below sectional MPS).`;
  } else if (speedRatio > 0.85) {
    speedImpact = -4;
    speedDesc = `Cruising at ${speed} km/h near top MPS — active recovery mode.`;
  } else {
    speedImpact = -1;
    speedDesc = `Maintaining steady cruising speed of ${speed} km/h.`;
  }

  // 2. Accumulated Delay (from previous block sections)
  const accumImpact = delay;
  const accumDesc = delay <= 0
    ? 'No residual delay inherited from prior divisions.'
    : `Carried forward from earlier section handovers along ${train.zone.split('(')[0].trim()}.`;

  // 3. Section Running Time (SRT) variance
  let srtImpact = 0;
  let srtDesc = '';
  if (isCritical) {
    srtImpact = 6;
    srtDesc = 'Dense block headway and temporary speed restrictions in current block.';
  } else if (isRecovering) {
    srtImpact = -3;
    srtDesc = 'Clear green signal cascade allows section running time compression.';
  } else if (isOnTime) {
    srtImpact = 0;
    srtDesc = 'Block section operating exactly within standard working timetable (WTT).';
  } else {
    srtImpact = 2;
    srtDesc = 'Minor gradient and signaling headway buffering applied.';
  }

  // 4. Station Dwell Time Variance
  let dwellImpact = 0;
  let dwellDesc = '';
  if (isCritical) {
    dwellImpact = 7;
    dwellDesc = 'Extended dwell at previous junction due to platform hold.';
  } else if (train.currentSpeedKmH === 0) {
    dwellImpact = 4;
    dwellDesc = 'Active passenger boarding and rake inspection exceeding 5m buffer.';
  } else if (isRecovering) {
    dwellImpact = -2;
    dwellDesc = 'Turnaround and station stops completed 2 minutes ahead of buffer.';
  } else {
    dwellImpact = 1;
    dwellDesc = 'Scheduled station dwells within normal 2-minute buffer threshold.';
  }

  // 5. Route & Junction Congestion
  let congestionImpact = 0;
  let congestionDesc = '';
  if (isCritical) {
    congestionImpact = 11;
    congestionDesc = 'Severe junction throat congestion near upcoming junction crossover.';
  } else if (delay > 10) {
    congestionImpact = 4;
    congestionDesc = 'Moderate track occupancy on approach tracks ahead.';
  } else if (isRecovering) {
    congestionImpact = -3;
    congestionDesc = 'Track priority granted over secondary traffic on main corridor line.';
  } else {
    congestionImpact = 0;
    congestionDesc = 'Section line clearance optimal — automatic route setting active.';
  }

  // 6. Operational Restrictions
  let restrictionImpact = 0;
  let restrictionDesc = '';
  if (isCritical) {
    restrictionImpact = 4;
    restrictionDesc = 'Caution order: 30 km/h speed restriction over bridge maintenance zone.';
  } else if (isRecovering) {
    restrictionImpact = -2;
    restrictionDesc = 'No active caution orders on remaining sector path.';
  } else if (isOnTime) {
    restrictionImpact = 0;
    restrictionDesc = 'Standard track operating clearance without engineering blocks.';
  } else {
    restrictionImpact = 1;
    restrictionDesc = 'Precautionary signal clearance check at division boundary.';
  }

  // Calculate final forecast delay: initial delay + sum of dynamic operational adjustments
  const dynamicAdjustments = speedImpact + srtImpact + dwellImpact + congestionImpact + restrictionImpact;
  const schedMins = parseTimeMins(train.previousEta);
  const conventionalEta = formatTimeMins(schedMins + delay);

  let finalDelay: number;
  let predictedDynamicEta: string;

  if (train.aiPredictedEta) {
    predictedDynamicEta = train.aiPredictedEta;
    const predMins = parseTimeMins(train.aiPredictedEta);
    finalDelay = Math.max(0, predMins >= schedMins ? predMins - schedMins : predMins + 1440 - schedMins);
  } else {
    finalDelay = Math.max(0, delay + (isRecovering ? Math.min(-2, dynamicAdjustments) : dynamicAdjustments));
    if (isOnTime) {
      finalDelay = 0;
    }
    predictedDynamicEta = formatTimeMins(schedMins + finalDelay);
  }

  const dynamicAdjustmentMinutes = finalDelay - delay;
  const deltaVsConventionalMinutes = finalDelay - delay;

  const factors: PrototypeDelayFactor[] = [
    {
      id: 'accumulated_delay',
      name: 'Accumulated Delay',
      category: 'Delay',
      impactMinutes: accumImpact,
      icon: 'history_toggle_off',
      metricLabel: 'Prior Sections',
      metricValue: `${accumImpact > 0 ? `+${accumImpact}` : accumImpact}m`,
      description: accumDesc,
      severity: accumImpact > 20 ? 'critical' : accumImpact > 5 ? 'warn' : 'ok',
    },
    {
      id: 'current_speed',
      name: 'Current Speed Variation',
      category: 'Speed',
      impactMinutes: speedImpact,
      icon: 'speed',
      metricLabel: 'Telemetry vs MPS',
      metricValue: `${speed} / ${maxSpeed} km/h`,
      description: speedDesc,
      severity: speedImpact > 3 ? 'critical' : speedImpact > 0 ? 'warn' : 'ok',
    },
    {
      id: 'section_running_time',
      name: 'Section Running Time (SRT)',
      category: 'SRT',
      impactMinutes: srtImpact,
      icon: 'timelapse',
      metricLabel: 'Block Variance',
      metricValue: `${srtImpact >= 0 ? `+${srtImpact}` : srtImpact}m vs WTT`,
      description: srtDesc,
      severity: srtImpact > 3 ? 'critical' : srtImpact > 0 ? 'warn' : 'ok',
    },
    {
      id: 'station_dwell',
      name: 'Station Dwell Time',
      category: 'Dwell',
      impactMinutes: dwellImpact,
      icon: 'pause_circle',
      metricLabel: 'Halt Buffer Delta',
      metricValue: `${dwellImpact >= 0 ? `+${dwellImpact}` : dwellImpact}m`,
      description: dwellDesc,
      severity: dwellImpact > 3 ? 'critical' : dwellImpact > 0 ? 'warn' : 'ok',
    },
    {
      id: 'route_congestion',
      name: 'Route & Junction Congestion',
      category: 'Congestion',
      impactMinutes: congestionImpact,
      icon: 'traffic',
      metricLabel: 'Corridor Density',
      metricValue: isCritical ? 'Heavy (88% Cap)' : isRecovering ? 'Low (42% Cap)' : 'Moderate (65% Cap)',
      description: congestionDesc,
      severity: congestionImpact > 5 ? 'critical' : congestionImpact > 0 ? 'warn' : 'ok',
    },
    {
      id: 'operational_restriction',
      name: 'Operational Restrictions',
      category: 'Restriction',
      impactMinutes: restrictionImpact,
      icon: 'error_outline',
      metricLabel: 'Caution Orders',
      metricValue: isCritical ? '1 Active TSR' : 'Clear Track',
      description: restrictionDesc,
      severity: restrictionImpact > 2 ? 'warn' : 'ok',
    },
  ];

  return {
    trainId: train.id,
    initialDelayMinutes: delay,
    dynamicAdjustmentMinutes,
    finalForecastDelayMinutes: finalDelay,
    scheduledEta: train.previousEta,
    predictedDynamicEta,
    conventionalEta,
    deltaVsConventionalMinutes,
    factors,
    totalFactorDelta: dynamicAdjustments,
    isSimulated: true,
    disclaimer: 'Prototype Delay Decomposition: Values are computed dynamically from block telemetry and operational railway scheduling constraints for SIH prototype evaluation.',
  };
}
