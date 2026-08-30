import React from 'react';
import { Link } from 'react-router-dom';

export const CriticalAlertsPanel: React.FC = () => {

  return (
    <div className="bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/20 flex flex-col flex-1">
      {/* Header */}
      <div className="p-4 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-lowest">
        <h3 className="font-headline-sm text-headline-sm text-primary font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-error">warning</span>
          Critical Alerts
        </h3>
        <span className="bg-error text-on-error font-label-md px-2 py-0.5 rounded-full text-[10px] font-bold">
          3 New
        </span>
      </div>

      {/* Alert items */}
      <div className="p-4 flex flex-col gap-3">
        {/* Alert 1 */}
        <div className="flex gap-3 items-start border-b border-outline-variant/10 pb-3">
          <span className="material-symbols-outlined text-error mt-0.5 text-[20px]">report</span>
          <div>
            <p className="font-label-md text-sm text-on-surface font-bold">High congestion ahead</p>
            <p className="font-body-md text-[12px] text-on-surface-variant mt-0.5">
              Section NDLS–ZB at 85% capacity. Expect cascading delays.
            </p>
            <p className="font-mono-data text-[10px] text-on-surface-variant mt-1.5 font-medium">
              Just now
            </p>
          </div>
        </div>

        {/* Alert 2 */}
        <div className="flex gap-3 items-start border-b border-outline-variant/10 pb-3">
          <span className="material-symbols-outlined text-yellow-600 mt-0.5 text-[20px]">error</span>
          <div>
            <p className="font-label-md text-sm text-on-surface font-bold">Unusual stoppage</p>
            <p className="font-body-md text-[12px] text-on-surface-variant mt-0.5">
              Train 12951 stopped near Mathura Junction &gt;15m.
            </p>
            <p className="font-mono-data text-[10px] text-on-surface-variant mt-1.5 font-medium">
              12 mins ago
            </p>
          </div>
        </div>

        {/* Alert 3 */}
        <div className="flex gap-3 items-start pb-1">
          <span className="material-symbols-outlined text-error mt-0.5 text-[20px]">cell_tower</span>
          <div>
            <p className="font-label-md text-sm text-on-surface font-bold">Signal disruption</p>
            <p className="font-body-md text-[12px] text-on-surface-variant mt-0.5">
              Three trains affected near Varanasi Junction.
            </p>
            <p className="font-mono-data text-[10px] text-on-surface-variant mt-1.5 font-medium">
              1 hr ago
            </p>
          </div>
        </div>

        <Link
          to="/alerts"
          className="text-secondary font-label-md text-xs hover:underline self-end pt-2 border-t border-outline-variant/10 w-full text-right font-semibold block"
        >
          View All Alerts →
        </Link>
      </div>
    </div>
  );
};
