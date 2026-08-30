import React from 'react';

export const AIPerformanceInsights: React.FC = () => {
  return (
    <div className="bg-primary-container text-on-primary-container p-lg rounded-xl shadow-lg border border-primary-container">
      <div className="flex items-center gap-2 mb-lg">
        <span className="material-symbols-outlined text-secondary-container text-[24px]">
          auto_awesome
        </span>
        <h3 className="font-headline-sm text-headline-sm font-bold text-white">
          AI Performance Insights
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-lg text-white">
        <div className="space-y-2">
          <p className="font-label-md text-xs text-on-primary-container uppercase font-bold tracking-wider">
            Prediction Reliability
          </p>
          <p className="font-body-md text-xs text-white/90 leading-relaxed">
            Current models show 94.8% accuracy across all major corridors, with highest reliability on the Delhi-Agra route.
          </p>
        </div>

        <div className="space-y-2">
          <p className="font-label-md text-xs text-on-primary-container uppercase font-bold tracking-wider">
            Delay Hotspot
          </p>
          <p className="font-body-md text-xs text-white/90 leading-relaxed">
            Kanpur-Prayagraj remains a critical bottleneck. AI suggests signal synchronization could reduce delays by 12%.
          </p>
        </div>

        <div className="space-y-2">
          <p className="font-label-md text-xs text-on-primary-container uppercase font-bold tracking-wider">
            Recovery Opportunity
          </p>
          <p className="font-body-md text-xs text-white/90 leading-relaxed">
            Identified 5-8 minute recovery windows for 14 coaching trains if platform turnaround is optimized at Varanasi.
          </p>
        </div>
      </div>

      <div className="mt-lg pt-md border-t border-on-primary-container/20 flex flex-col sm:flex-row justify-between items-center gap-2">
        <span className="font-label-md text-xs italic text-white/80">
          ✦ AI Generated Predictive Insight Stream
        </span>
        <span className="text-secondary-container text-xs font-bold hover:underline cursor-pointer">
          Model Version: RF-Neural-4.2 (Verified)
        </span>
      </div>
    </div>
  );
};
