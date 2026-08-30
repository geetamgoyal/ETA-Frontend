import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_TRAINS } from '../../data/trains';
import { MOCK_NETWORK_NODES } from '../../data/network';

export const LiveNetworkVisualizer: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTrainId, setSelectedTrainId] = useState('12309');
  const [selectedZone, setSelectedZone] = useState('All Zones');
  const [searchQuery, setSearchQuery] = useState('');

  const train = MOCK_TRAINS.find((t) => t.id === selectedTrainId) || MOCK_TRAINS[0];

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/20 flex flex-col overflow-hidden">
      {/* Visualizer Header */}
      <div className="p-lg border-b border-outline-variant/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface-container-lowest z-10 relative">
        <div>
          <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
            Live Railway Network
          </h3>
          <p className="font-body-md text-xs text-on-surface-variant">
            Real-time position, telemetry and operational status of monitored coaching trains
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Quick Search */}
          <div className="relative flex-1 sm:flex-initial">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Train..."
              className="pl-9 pr-3 py-1.5 bg-surface-container-low border-b border-outline-variant focus:border-b-2 focus:border-secondary outline-none transition-all font-body-md text-on-surface rounded-t-md text-xs w-full sm:w-44"
            />
          </div>

          {/* Zone Selector */}
          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="pl-3 pr-8 py-1.5 bg-surface-container-low border-b border-outline-variant focus:border-b-2 focus:border-secondary outline-none font-body-md text-on-surface rounded-t-md text-xs cursor-pointer appearance-none"
          >
            <option>All Zones</option>
            <option>Northern Railway (NR)</option>
            <option>North Central Railway (NCR)</option>
            <option>Eastern Railway (ER)</option>
            <option>East Central Railway (ECR)</option>
          </select>
        </div>
      </div>

      {/* Cyber-Physical Dark Map Visualization Canvas */}
      <div className="relative w-full h-[520px] bg-[#0c1322] overflow-hidden">
        {/* Futuristic High-tech Grid Background */}
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              'linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        ></div>

        {/* Ambient Radial Glowing Halos */}
        <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Interactive SVG Network Tracks */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 900 500"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Main Trunk Corridor Glowing Line */}
          <path
            d="M 120,200 L 260,250 L 400,240 L 580,210 L 720,260 L 820,320"
            fill="none"
            stroke="#006399"
            strokeWidth="3"
            className="opacity-70"
          />
          {/* Secondary Arterials */}
          <path
            d="M 260,250 L 320,380 L 520,390 L 580,210"
            fill="none"
            stroke="#334155"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <path
            d="M 120,200 L 280,120 L 500,110 L 580,210"
            fill="none"
            stroke="#334155"
            strokeWidth="2"
            strokeDasharray="4 4"
          />

          {/* Stations / Nodes */}
          {MOCK_NETWORK_NODES.map((node, i) => {
            const coords = [
              { x: 120, y: 200 },
              { x: 200, y: 230 },
              { x: 260, y: 250 },
              { x: 400, y: 240 },
              { x: 580, y: 210 },
              { x: 680, y: 240 },
              { x: 750, y: 270 },
              { x: 820, y: 320 },
            ][i] || { x: 300, y: 200 };

            return (
              <g key={node.code}>
                <circle cx={coords.x} cy={coords.y} r="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                <circle cx={coords.x} cy={coords.y} r="2.5" fill="#38bdf8" />
                <text
                  x={coords.x - 14}
                  y={coords.y - 12}
                  fill="#94a3b8"
                  fontSize="10"
                  fontFamily="JetBrains Mono"
                  fontWeight="bold"
                >
                  {node.code}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Live Train Marker 1: Shatabdi 12002 (On Time - Cyan) */}
        <div
          onClick={() => setSelectedTrainId('12002')}
          className="absolute top-[240px] left-[28%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
        >
          <div className="w-5 h-5 rounded-full bg-cyan-400 shadow-[0_0_12px_#38bdf8] flex items-center justify-center group-hover:scale-125 transition-transform">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
          </div>
          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 font-mono text-[9px] font-bold text-cyan-300 bg-slate-900/90 px-1.5 py-0.5 rounded border border-cyan-500/30 whitespace-nowrap">
            12002 • ON TIME
          </span>
        </div>

        {/* Live Train Marker 2: Rajdhani 12309 (Selected - Recovering) */}
        <div
          onClick={() => setSelectedTrainId('12309')}
          className="absolute top-[235px] left-[45%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
        >
          <div className="w-6 h-6 rounded-full bg-amber-400 shadow-[0_0_16px_#f59e0b] animate-pulse flex items-center justify-center group-hover:scale-125 transition-transform">
            <span className="w-2 h-2 rounded-full bg-slate-900"></span>
          </div>
          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 font-mono text-[9px] font-bold text-amber-300 bg-slate-900/90 px-1.5 py-0.5 rounded border border-amber-500/30 whitespace-nowrap">
            12309 • +18m
          </span>
        </div>

        {/* Live Train Marker 3: Gatimaan 12050 (Critical - Red) */}
        <div
          onClick={() => setSelectedTrainId('12050')}
          className="absolute top-[375px] left-[35%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
        >
          <div className="w-6 h-6 rounded-full bg-red-500 shadow-[0_0_16px_#ef4444] animate-ping opacity-75 absolute"></div>
          <div className="w-6 h-6 rounded-full bg-red-500 shadow-[0_0_16px_#ef4444] flex items-center justify-center relative group-hover:scale-125 transition-transform">
            <span className="w-2 h-2 rounded-full bg-white"></span>
          </div>
          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 font-mono text-[9px] font-bold text-red-300 bg-slate-900/90 px-1.5 py-0.5 rounded border border-red-500/30 whitespace-nowrap">
            12050 • +45m STOPPED
          </span>
        </div>

        {/* Top-Right Map Legend */}
        <div className="absolute top-4 right-4 bg-surface-container-lowest/95 backdrop-blur-md p-3.5 rounded-lg border border-outline-variant/30 shadow-md">
          <ul className="space-y-2 text-xs">
            <li className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
              <span className="font-label-md text-on-surface font-semibold">On Time</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span className="font-label-md text-on-surface font-semibold">Minor Delay</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-error"></span>
              <span className="font-label-md text-on-surface font-semibold">Critical Delay</span>
            </li>
          </ul>
        </div>

        {/* Bottom-Left Floating Train Telemetry Overlay Card */}
        <div className="absolute bottom-5 left-5 bg-surface-container-lowest/95 backdrop-blur-md p-4 rounded-xl shadow-xl border border-outline-variant/30 w-72 sm:w-80 animate-fade-in">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-headline-sm text-sm font-bold text-primary">
                {train.trainName}
              </h4>
              <p className="font-mono-data text-xs text-outline font-semibold">
                #{train.trainNumber}
              </p>
            </div>
            <span
              className={`font-label-md text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                train.currentDelayMinutes > 30
                  ? 'bg-error-container text-error'
                  : train.currentDelayMinutes > 0
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-green-100 text-green-800'
              }`}
            >
              {train.status}
            </span>
          </div>

          <div className="space-y-2 mb-3 text-xs">
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Location</span>
              <span className="text-on-surface font-bold">{train.currentLocation}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Delay</span>
              <span className={`font-bold ${train.currentDelayMinutes > 0 ? 'text-error' : 'text-green-600'}`}>
                {train.currentDelayMinutes > 0 ? `+${train.currentDelayMinutes} min` : '0 min'}
              </span>
            </div>
            <div className="flex justify-between items-center bg-primary-fixed/30 p-2 rounded-md border border-primary/10">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-primary">
                  auto_awesome
                </span>
                <span className="text-primary font-bold">AI ETA</span>
              </div>
              <div className="text-right">
                <span className="font-mono-data text-on-surface font-black text-sm">
                  {train.aiPredictedEta}
                </span>
                <span className="font-label-md text-[10px] text-outline block">
                  {train.confidencePercent}% Conf.
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate(`/train/${train.id}`)}
            className="w-full py-2 bg-transparent border border-outline text-primary font-label-md text-xs font-bold rounded-md hover:bg-surface-container transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            View Train Details
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
