import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MOCK_TRAINS } from '../../data/trains';

export const LiveTrainDetailsView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const train = MOCK_TRAINS.find((t) => t.id === id) || MOCK_TRAINS[0];

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 md:px-margin py-lg flex flex-col gap-lg animate-fade-in">
      {/* Header Navigation & Title */}
      <div className="flex flex-col gap-sm">
        <Link
          to="/train-monitoring"
          className="text-secondary flex items-center gap-xs font-label-md text-xs font-semibold hover:underline w-fit"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Back to Train Monitoring
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-md mt-sm">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h1 className="text-headline-lg font-headline-lg font-bold text-primary">
                {train.trainName}
              </h1>
              <span className="bg-surface-container-low text-primary px-3 py-1 rounded-full font-mono-data text-xs font-bold border border-primary-fixed-dim">
                {train.trainNumber}
              </span>
              <span className="text-xs text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-full">
                {train.source} → {train.destination}
              </span>
            </div>
            <p className="text-on-surface-variant text-body-md text-sm">
              Real-time operational monitoring and AI dynamic telemetry
            </p>
          </div>

          <div className="flex items-center gap-2 bg-surface-container-low px-3.5 py-1.5 rounded-full border border-primary-fixed-dim w-fit">
            <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse"></div>
            <span className="font-label-md text-xs text-primary tracking-wider font-bold">
              LIVE DATA STREAM
            </span>
          </div>
        </div>
      </div>

      {/* KPI Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-md">
        {/* Card 1: Location */}
        <div className="glass-panel rounded-xl p-md flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
          <div className="flex items-center gap-2 text-on-surface-variant mb-2">
            <span className="material-symbols-outlined text-[20px] text-primary">location_on</span>
            <span className="font-label-md text-xs uppercase font-semibold">Current Location</span>
          </div>
          <div>
            <p className="font-headline-sm text-headline-sm font-bold text-primary mb-1">
              {train.currentLocation}
            </p>
            <p className="text-body-md text-on-surface-variant text-xs font-medium">
              {train.platform || 'Platform Track'}
            </p>
          </div>
        </div>

        {/* Card 2: Next Station */}
        <div className="glass-panel rounded-xl p-md flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
          <div className="flex items-center gap-2 text-on-surface-variant mb-2">
            <span className="material-symbols-outlined text-[20px] text-primary">train</span>
            <span className="font-label-md text-xs uppercase font-semibold">Next Station</span>
          </div>
          <div>
            <p className="font-headline-sm text-headline-sm font-bold text-primary mb-1">
              {train.nextStation}
            </p>
            <p className="text-body-md text-on-surface-variant text-xs font-medium">
              Dist remaining: {train.remainingDistanceKm} km
            </p>
          </div>
        </div>

        {/* Card 3: Speed */}
        <div className="glass-panel rounded-xl p-md flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
          <div className="flex items-center gap-2 text-on-surface-variant mb-2">
            <span className="material-symbols-outlined text-[20px] text-primary">speed</span>
            <span className="font-label-md text-xs uppercase font-semibold">Current Speed</span>
          </div>
          <div>
            <p className="font-headline-sm text-headline-sm text-primary mb-1 font-mono-data font-bold">
              {train.currentSpeedKmH} km/h
            </p>
            <p className="text-body-md text-[#10B981] flex items-center gap-1 text-xs font-semibold">
              <span className="material-symbols-outlined text-[14px]">arrow_upward</span> Speed stable
            </p>
          </div>
        </div>

        {/* Card 4: Delay */}
        <div className="glass-panel rounded-xl p-md flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
          <div className="flex items-center gap-2 text-on-surface-variant mb-2">
            <span className="material-symbols-outlined text-[20px] text-error">schedule</span>
            <span className="font-label-md text-xs uppercase font-semibold">Current Delay</span>
          </div>
          <div>
            <p className="font-headline-sm text-headline-sm text-error mb-1 font-mono-data font-bold">
              +{train.currentDelayMinutes} min
            </p>
            <p className="text-body-md text-secondary text-xs font-semibold">
              Rec. 4m in last 30m
            </p>
          </div>
        </div>

        {/* Card 5: AI ETA */}
        <div className="glass-panel rounded-xl p-md flex flex-col justify-between border-l-4 border-l-secondary bg-surface-container-low hover:-translate-y-1 transition-transform duration-300">
          <div className="flex items-center gap-2 text-secondary mb-2">
            <span className="material-symbols-outlined text-[20px]">psychology</span>
            <span className="font-label-md text-xs uppercase font-bold">Current AI ETA</span>
          </div>
          <div>
            <p className="font-headline-md text-headline-md font-bold text-primary mb-1 font-mono-data">
              {train.aiPredictedEta}
            </p>
            <div className="flex items-center gap-2">
              <div className="w-full bg-surface-variant h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-secondary h-full transition-all"
                  style={{ width: `${train.confidencePercent}%` }}
                ></div>
              </div>
              <span className="font-mono-data text-xs font-bold text-secondary">
                {train.confidencePercent}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        {/* Left Column: Linear Progress Track */}
        <div className="lg:col-span-2 glass-panel rounded-xl flex flex-col overflow-hidden">
          <div className="p-md border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-low/30">
            <h2 className="font-headline-sm text-headline-sm font-bold text-primary">
              Live Journey Progress
            </h2>
            <span className="font-mono-data text-xs font-semibold text-on-surface-variant">
              {train.totalDistanceKm - train.remainingDistanceKm} km / {train.remainingDistanceKm} km
            </span>
          </div>

          <div className="p-lg flex-1 relative min-h-[300px] flex items-center overflow-x-auto">
            <div className="w-full relative py-12 min-w-[650px] px-8">
              {/* Background Gray Track */}
              <div className="absolute top-1/2 left-8 right-8 h-1.5 bg-surface-variant -translate-y-1/2 z-0 rounded-full"></div>
              {/* Colored Completed Track */}
              <div
                className="absolute top-1/2 left-8 h-1.5 bg-secondary -translate-y-1/2 z-0 rounded-full"
                style={{ width: `${train.journeyProgressPercent}%` }}
              ></div>

              {/* Station Markers */}
              <div className="relative z-10 flex justify-between items-center w-full">
                {/* Station 1: NDLS */}
                <div className="flex flex-col items-center gap-2 w-0 relative">
                  <div className="w-4 h-4 rounded-full bg-secondary border-2 border-white shadow-sm"></div>
                  <span className="absolute top-6 font-label-md text-xs text-on-surface-variant whitespace-nowrap -translate-x-1/2 font-semibold">
                    New Delhi
                  </span>
                </div>

                {/* Station 2: Mathura */}
                <div className="flex flex-col items-center gap-2 w-0 relative">
                  <div className="w-3.5 h-3.5 rounded-full bg-secondary border-2 border-white shadow-sm"></div>
                  <span className="absolute top-6 font-label-md text-xs text-on-surface-variant whitespace-nowrap -translate-x-1/2">
                    Mathura
                  </span>
                </div>

                {/* Station 3: Agra */}
                <div className="flex flex-col items-center gap-2 w-0 relative">
                  <div className="w-3.5 h-3.5 rounded-full bg-secondary border-2 border-white shadow-sm"></div>
                  <span className="absolute top-6 font-label-md text-xs text-on-surface-variant whitespace-nowrap -translate-x-1/2">
                    Agra Cantt
                  </span>
                </div>

                {/* Active Station: Current Train Marker (Kanpur Central) */}
                <div className="flex flex-col items-center gap-2 w-0 relative">
                  <div className="absolute -top-11 -translate-x-1/2 bg-primary text-on-primary p-1.5 rounded-full shadow-lg animate-bounce">
                    <span className="material-symbols-outlined text-[18px]">directions_subway</span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-white border-4 border-primary shadow-md flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <span className="absolute top-7 font-label-md text-xs text-primary font-black whitespace-nowrap -translate-x-1/2 bg-surface-container-lowest px-2 py-0.5 rounded shadow-xs border border-primary/20">
                    {train.currentLocation}
                  </span>
                </div>

                {/* Station 5: Prayagraj */}
                <div className="flex flex-col items-center gap-2 w-0 relative">
                  <div className="w-3.5 h-3.5 rounded-full bg-surface-variant border-2 border-white shadow-sm"></div>
                  <span className="absolute top-6 font-label-md text-xs text-on-surface-variant whitespace-nowrap -translate-x-1/2">
                    Prayagraj Jn
                  </span>
                </div>

                {/* Station 6: Destination */}
                <div className="flex flex-col items-center gap-2 w-0 relative">
                  <div className="w-4 h-4 rounded-full bg-surface-variant border-2 border-white shadow-sm"></div>
                  <span className="absolute top-6 font-label-md text-xs text-primary font-bold whitespace-nowrap -translate-x-1/2">
                    {train.destination.split('/')[0].trim()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Operational Status & Events */}
        <div className="flex flex-col gap-lg">
          {/* Status Parameters Card */}
          <div className="glass-panel rounded-xl p-md">
            <h2 className="font-headline-sm text-headline-sm font-bold text-primary mb-md">
              Operational Status
            </h2>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center p-2.5 bg-surface-bright rounded-lg border border-outline-variant/20">
                <span className="text-body-md text-xs text-on-surface-variant font-medium">Track Section</span>
                <span className="font-label-md text-xs bg-[#D1FAE5] text-[#065F46] px-2 py-0.5 rounded font-bold">
                  Normal Clearance
                </span>
              </div>
              <div className="flex justify-between items-center p-2.5 bg-surface-bright rounded-lg border border-outline-variant/20">
                <span className="text-body-md text-xs text-on-surface-variant font-medium">Section Congestion</span>
                <span className="font-label-md text-xs bg-[#D1FAE5] text-[#065F46] px-2 py-0.5 rounded font-bold">
                  Low (64% Cap)
                </span>
              </div>
              <div className="flex justify-between items-center p-2.5 bg-surface-bright rounded-lg border border-outline-variant/20">
                <span className="text-body-md text-xs text-on-surface-variant font-medium">Weather / Fog</span>
                <span className="font-label-md text-xs text-on-surface font-bold">Clear Visibility</span>
              </div>
              <div className="flex justify-between items-center p-2.5 bg-surface-bright rounded-lg border border-outline-variant/20">
                <span className="text-body-md text-xs text-on-surface-variant font-medium">Signal Interlocking</span>
                <span className="font-label-md text-xs bg-[#D1FAE5] text-[#065F46] px-2 py-0.5 rounded font-bold">
                  Automatic Green
                </span>
              </div>
              <div className="flex justify-between items-center p-2.5 bg-surface-container-low border border-secondary-fixed-dim rounded-lg mt-1">
                <span className="text-body-md text-xs text-primary font-bold">Next Scheduled Halt</span>
                <span className="font-mono-data text-xs text-secondary font-bold">
                  {train.nextStation} - 5m
                </span>
              </div>
            </div>
          </div>

          {/* Timeline Events Card */}
          <div className="glass-panel rounded-xl p-md flex-1">
            <h2 className="font-headline-sm text-headline-sm font-bold text-primary mb-md">
              Recent Events
            </h2>
            <div className="relative pl-6 border-l-2 border-surface-variant flex flex-col gap-3">
              {train.recentEvents?.map((ev) => (
                <div key={ev.id} className="relative">
                  <div
                    className={`absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full border-2 border-white ${
                      ev.type === 'recovery'
                        ? 'bg-secondary'
                        : ev.type === 'slowdown'
                        ? 'bg-amber-500'
                        : ev.type === 'halt'
                        ? 'bg-error'
                        : 'bg-primary'
                    }`}
                  ></div>
                  <p className="font-label-md text-[11px] text-secondary font-bold mb-0.5">
                    {ev.timestamp}
                  </p>
                  <p className="text-body-md text-xs text-on-surface leading-snug">
                    {ev.description}
                  </p>
                </div>
              )) || (
                <p className="text-xs text-on-surface-variant">No unusual incidents logged.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Actual vs Scheduled Performance & Navigation */}
      <div className="flex flex-col md:flex-row gap-lg items-stretch">
        <div className="flex-1 glass-panel rounded-xl p-md flex flex-col">
          <h2 className="font-headline-sm text-headline-sm font-bold text-primary mb-md">
            Journey Performance (Actual vs Scheduled Speed Profile)
          </h2>
          <div className="flex-1 min-h-[160px] w-full bg-surface-bright rounded-lg border border-outline-variant/30 flex items-center justify-center relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'radial-gradient(#002046 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            ></div>
            <svg
              className="w-full h-full absolute inset-0 text-outline-variant"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              <path
                d="M0,80 Q25,70 50,50 T100,20"
                fill="none"
                stroke="currentColor"
                strokeDasharray="4"
                strokeWidth="1.5"
              />
            </svg>
            <svg
              className="w-full h-full absolute inset-0 text-secondary"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              <path
                d="M0,85 Q25,85 50,65 T80,45"
                fill="none"
                stroke="#006399"
                strokeWidth="2.5"
              />
              <path
                d="M80,45 Q90,30 100,10"
                fill="none"
                stroke="#67bafd"
                strokeDasharray="4"
                strokeWidth="2.5"
              />
            </svg>
            <div className="relative z-10 font-label-md text-xs text-on-surface-variant bg-white/90 px-3 py-1 rounded shadow-xs border border-outline-variant/20 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              Speed Recovery in progress (+4m recovered)
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col justify-end gap-3 w-full md:w-auto">
          <button
            onClick={() => navigate(`/route-predictions/${train.id}`)}
            className="bg-surface hover:bg-surface-variant text-primary border border-outline-variant/50 font-label-md text-xs font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">route</span>
            View Route Predictions
          </button>
          <button
            onClick={() => navigate(`/eta-forecast/${train.id}`)}
            className="bg-primary hover:bg-primary-container text-white px-6 py-3 rounded-lg font-label-md text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">psychology</span>
            View AI ETA Forecast
          </button>
        </div>
      </div>
    </div>
  );
};
