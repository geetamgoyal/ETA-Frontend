import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const LiveNetworkMap: React.FC = () => {
  const [selectedTrain, setSelectedTrain] = useState<'12309' | '12002' | '12951'>('12309');

  return (
    <div className="bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/20 flex flex-col flex-1 overflow-hidden min-h-[420px]">
      {/* Header & Legend */}
      <div className="p-4 border-b border-outline-variant/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-surface-container-lowest">
        <h3 className="font-headline-sm text-headline-sm text-primary font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary">hub</span>
          Live Train Network
        </h3>
        <div className="flex gap-4 font-label-md text-xs">
          <span className="flex items-center gap-1.5 text-on-surface-variant">
            <span className="w-3 h-3 rounded-full bg-secondary"></span> On Time
          </span>
          <span className="flex items-center gap-1.5 text-on-surface-variant">
            <span className="w-3 h-3 rounded-full bg-amber-500"></span> Minor Delay
          </span>
          <span className="flex items-center gap-1.5 text-on-surface-variant">
            <span className="w-3 h-3 rounded-full bg-error"></span> Critical Delay
          </span>
        </div>
      </div>

      {/* Abstract Map Representation Canvas */}
      <div className="flex-1 relative bg-surface-container-low min-h-[340px] overflow-hidden">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#74777f 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        ></div>

        {/* SVG Railway Track Network */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
          viewBox="0 0 800 400"
        >
          {/* Main trunk line */}
          <path
            d="M150,150 L350,200 L550,150 L750,250"
            fill="none"
            stroke="#74777f"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            strokeDasharray="6 3"
            className="opacity-60"
          />
          <path
            d="M150,150 L350,200 L550,150 L750,250"
            fill="none"
            stroke="#1b365d"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />

          {/* Branch lines */}
          <path
            d="M350,200 L420,320 L620,320"
            fill="none"
            stroke="#74777f"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="opacity-40"
          />
          <path
            d="M150,150 L200,80 L480,80 L550,150"
            fill="none"
            stroke="#74777f"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="opacity-40"
          />

          {/* Station 1: New Delhi (NDLS) */}
          <circle cx="150" cy="150" fill="#fff" r="6" stroke="#002046" strokeWidth="2.5" />
          <text fill="#0b1c30" fontFamily="Inter" fontSize="12" fontWeight="700" x="130" y="135">
            NDLS
          </text>
          <text fill="#74777f" fontFamily="Inter" fontSize="9" x="125" y="170">
            New Delhi
          </text>

          {/* Station 2: Kanpur Central (CNB) */}
          <circle cx="350" cy="200" fill="#fff" r="6" stroke="#002046" strokeWidth="2.5" />
          <text fill="#0b1c30" fontFamily="Inter" fontSize="12" fontWeight="700" x="335" y="185">
            CNB
          </text>
          <text fill="#74777f" fontFamily="Inter" fontSize="9" x="325" y="222">
            Kanpur Central
          </text>

          {/* Station 3: Prayagraj / Allahabad (PRYJ/ALD) */}
          <circle cx="550" cy="150" fill="#fff" r="6" stroke="#002046" strokeWidth="2.5" />
          <text fill="#0b1c30" fontFamily="Inter" fontSize="12" fontWeight="700" x="535" y="135">
            PRYJ
          </text>
          <text fill="#74777f" fontFamily="Inter" fontSize="9" x="530" y="172">
            Prayagraj Jn
          </text>

          {/* Station 4: Varanasi / Howrah (BSB/VNS) */}
          <circle cx="750" cy="250" fill="#fff" r="6" stroke="#002046" strokeWidth="2.5" />
          <text fill="#0b1c30" fontFamily="Inter" fontSize="12" fontWeight="700" x="735" y="235">
            VNS
          </text>
          <text fill="#74777f" fontFamily="Inter" fontSize="9" x="730" y="272">
            Varanasi Jn
          </text>
        </svg>

        {/* Train Node 1: Shatabdi (On Time - Blue) */}
        <div
          onClick={() => setSelectedTrain('12002')}
          className="absolute top-[165px] left-[32%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20"
          title="Shatabdi Express (12002) - On Time"
        >
          <div className="w-4 h-4 rounded-full bg-secondary shadow-[0_0_0_4px_rgba(0,99,153,0.25)] hover:scale-125 transition-transform"></div>
          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 font-mono-data text-[10px] font-bold text-secondary whitespace-nowrap bg-white/90 px-1 rounded shadow-xs">
            12002
          </span>
        </div>

        {/* Train Node 2: Rajdhani Express (Selected - Red/Critical Delay + Floating Card) */}
        <div
          onClick={() => setSelectedTrain('12309')}
          className="absolute top-[175px] left-[54%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-30"
        >
          <div className="w-5 h-5 rounded-full bg-error shadow-[0_0_0_6px_rgba(186,26,26,0.25)] animate-pulse hover:scale-125 transition-transform flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
          </div>
          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 font-mono-data text-[10px] font-bold text-error whitespace-nowrap bg-white/90 px-1 rounded shadow-xs">
            12309
          </span>

          {/* Floating Train Info Card */}
          {selectedTrain === '12309' && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 bg-surface-container-lowest border border-outline-variant/30 rounded-lg shadow-xl p-3 flex flex-col gap-2 pointer-events-auto z-40 animate-fade-in">
              <div className="flex justify-between items-start">
                <span className="font-label-md font-bold text-on-surface text-xs">
                  Rajdhani Express 12309
                </span>
                <span className="bg-error-container text-on-error-container font-label-md px-1.5 py-0.5 rounded text-[10px] whitespace-nowrap font-bold">
                  +18m
                </span>
              </div>
              <div className="font-body-md text-[12px] text-on-surface-variant flex flex-col gap-1">
                <span>Location: <strong className="text-on-surface">Kanpur Central</strong></span>
                <div className="flex justify-between">
                  <span>AI ETA: <span className="font-mono-data font-bold text-primary">18:42</span></span>
                  <span className="text-secondary font-medium">Conf: 94%</span>
                </div>
                <span>Status: <span className="text-secondary font-semibold">Recovering</span></span>
              </div>
              <Link
                to="/train/12309"
                className="text-secondary font-label-md text-[12px] hover:underline mt-1 font-semibold flex items-center gap-1"
              >
                View Train Details →
              </Link>
            </div>
          )}
        </div>

        {/* Train Node 3: Mumbai Rajdhani (Minor Delay - Amber) */}
        <div
          onClick={() => setSelectedTrain('12951')}
          className="absolute top-[215px] left-[78%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20"
          title="Mumbai Rajdhani (12951) - +22m"
        >
          <div className="w-4 h-4 rounded-full bg-amber-500 shadow-[0_0_0_4px_rgba(234,179,8,0.25)] hover:scale-125 transition-transform"></div>
          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 font-mono-data text-[10px] font-bold text-amber-700 whitespace-nowrap bg-white/90 px-1 rounded shadow-xs">
            12951
          </span>
        </div>
      </div>
    </div>
  );
};
