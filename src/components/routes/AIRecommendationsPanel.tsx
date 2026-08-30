import React from 'react';

export const AIRecommendationsPanel: React.FC = () => {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-5 shadow-ambient border border-outline-variant/20 ai-card-border flex-1">
      <h3 className="font-headline-sm text-headline-sm font-bold text-primary mb-4 flex items-center gap-2">
        <span className="material-symbols-outlined text-[#7c3aed]">lightbulb</span>
        AI Recommendations
      </h3>

      <div className="space-y-3">
        {/* Rec 1 */}
        <div className="flex gap-3 items-start">
          <span className="material-symbols-outlined text-secondary text-lg mt-0.5">speed</span>
          <div>
            <p className="font-body-md text-xs font-bold text-on-surface">
              Maintain current speed profile
            </p>
            <p className="font-label-md text-xs text-on-surface-variant mt-0.5">
              Expected Benefit: Preserves 10m recovery gain to Prayagraj.
            </p>
          </div>
        </div>

        <hr className="border-outline-variant/20" />

        {/* Rec 2 */}
        <div className="flex gap-3 items-start">
          <span className="material-symbols-outlined text-[#d97706] text-lg mt-0.5">visibility</span>
          <div>
            <p className="font-body-md text-xs font-bold text-on-surface">
              Monitor Varanasi-Patna section
            </p>
            <p className="font-label-md text-xs text-on-surface-variant mt-0.5">
              Impact: Early signaling could mitigate predicted +3m congestion.
            </p>
          </div>
        </div>

        <hr className="border-outline-variant/20" />

        {/* Rec 3 */}
        <div className="flex gap-3 items-start">
          <span className="material-symbols-outlined text-primary text-lg mt-0.5">update</span>
          <div>
            <p className="font-body-md text-xs font-bold text-on-surface">
              Recalculate forecast post-Prayagraj
            </p>
            <p className="font-label-md text-xs text-on-surface-variant mt-0.5">
              Action: Auto-refresh AI model after major junction clearance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
