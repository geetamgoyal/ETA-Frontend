import React from 'react';
import { Footer } from '../components/layout/Footer';

export const ProfilePage: React.FC = () => {
  return (
    <main className="px-4 md:px-margin py-6 pb-xl flex-1 flex flex-col gap-lg max-w-[1440px] mx-auto w-full animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface">
          Operations Officer Profile
        </h2>
        <p className="font-body-lg text-xs text-on-surface-variant mt-0.5">
          Dispatcher credentials, AI override authority levels and audit log activity
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        {/* Left Col: Officer Card */}
        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-ambient border border-outline-variant/30 flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-primary text-white text-3xl font-black flex items-center justify-center shadow-lg mb-4 ring-4 ring-primary-fixed">
            RO
          </div>
          <h3 className="font-headline-sm text-lg font-bold text-primary">
            Rajeshwari Oberoi, IRTS
          </h3>
          <p className="text-xs font-semibold text-secondary mt-0.5">
            Chief Train Controller & Operations Manager
          </p>
          <span className="bg-surface-container-high text-primary font-mono-data text-[11px] font-bold px-3 py-1 rounded-full mt-3 border border-outline-variant/20">
            Badge: NCR-CTC-4029
          </span>

          <div className="w-full mt-6 pt-6 border-t border-outline-variant/20 space-y-3 text-left text-xs">
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Division:</span>
              <span className="font-bold text-on-surface">Prayagraj / NCR</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Headquarters:</span>
              <span className="font-bold text-on-surface">Kanpur Central / Subedarganj</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Active Shift:</span>
              <span className="font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded">
                Day Shift (06:00 - 14:00)
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">AI Authorization:</span>
              <span className="font-bold text-secondary">Level 4 (Full Override)</span>
            </div>
          </div>
        </div>

        {/* Right Col: Authority & Audit History (2 cols) */}
        <div className="lg:col-span-2 flex flex-col gap-lg">
          {/* Authority Levels */}
          <div className="bg-white rounded-xl p-6 shadow-ambient border border-outline-variant/30">
            <h4 className="font-headline-sm text-sm font-bold text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">verified_user</span>
              AI Operational Authorities & Clearances
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/20">
                <span className="font-bold text-primary block">Dynamic Speed Relaxation</span>
                <span className="text-on-surface-variant text-[11px]">
                  Authorized to sanction 130 km/h block clearance on NCR main trunk.
                </span>
              </div>
              <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/20">
                <span className="font-bold text-primary block">Freight Overtake Dispatch</span>
                <span className="text-on-surface-variant text-[11px]">
                  Authority to divert slow freight consists into loop lines for premium coaching trains.
                </span>
              </div>
              <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/20">
                <span className="font-bold text-primary block">Timetable AI Recalibration</span>
                <span className="text-on-surface-variant text-[11px]">
                  Permitted to broadcast dynamic ETAs to passenger information displays (PIDS).
                </span>
              </div>
              <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/20">
                <span className="font-bold text-primary block">Disruption Simulation Execution</span>
                <span className="text-on-surface-variant text-[11px]">
                  Full access to neural what-if scenario forecasting sandbox.
                </span>
              </div>
            </div>
          </div>

          {/* Recent Audit Log */}
          <div className="bg-white rounded-xl p-6 shadow-ambient border border-outline-variant/30 flex-1">
            <h4 className="font-headline-sm text-sm font-bold text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">history</span>
              Recent Dispatcher Audit Logs
            </h4>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-start pb-2.5 border-b border-outline-variant/10">
                <div>
                  <p className="font-bold text-on-surface">AI ETA recalculation triggered for Tr. 12309</p>
                  <p className="text-on-surface-variant text-[11px]">Kanpur - Prayagraj recovery vector updated</p>
                </div>
                <span className="font-mono-data text-on-surface-variant">14 mins ago</span>
              </div>
              <div className="flex justify-between items-start pb-2.5 border-b border-outline-variant/10">
                <div>
                  <p className="font-bold text-on-surface">Investigated unusual stoppage Tr. 12050</p>
                  <p className="text-on-surface-variant text-[11px]">Acknowledged signal interlocking delay near Mathura</p>
                </div>
                <span className="font-mono-data text-on-surface-variant">28 mins ago</span>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-on-surface">Shift Handover Logged</p>
                  <p className="text-on-surface-variant text-[11px]">Checked in at NCR Central Control Room console 04</p>
                </div>
                <span className="font-mono-data text-on-surface-variant">6 hrs ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};
