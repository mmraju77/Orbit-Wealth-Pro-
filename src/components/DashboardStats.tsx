import React from 'react';

export default function DashboardStats() {
  return (
    <section className="pt-24 border-t border-white/[0.05] grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div className="space-y-4">
        <h2 className="text-2xl font-display font-medium">Built for accuracy.</h2>
        <p className="text-sm text-white/30 leading-relaxed max-w-md">
          Our engine accounts for localized interest compounding, tax thresholds, and currency fluctuations to ensure your planning is based on high-integrity data.
        </p>
      </div>
      <div className="flex gap-12">
         <div className="space-y-1">
           <div className="text-4xl font-display text-white">100%</div>
           <div className="text-[9px] text-white/20 uppercase font-bold tracking-[0.2em]">Computation Accuracy</div>
         </div>
         <div className="space-y-1">
           <div className="text-4xl font-display text-white">Instant</div>
           <div className="text-[9px] text-white/20 uppercase font-bold tracking-[0.2em]">Execution Latency</div>
         </div>
      </div>
    </section>
  );
}
