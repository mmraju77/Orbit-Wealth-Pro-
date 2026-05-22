/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TrendingUp, Activity, Globe, Scale } from 'lucide-react';
import { motion } from 'motion/react';

export default function MarketTicker() {
  const MARKET_DATA = [
    { label: 'Nifty 50', value: '23,462', change: '+1.2%', type: 'growth' },
    { label: 'S&P 500', value: '5,327', change: '+0.8%', type: 'growth' },
    { label: 'Live Gold Rate', value: '$2,342/oz', change: 'Stable', type: 'rate' },
    { label: 'Global Inflation Index', value: '4.2%', change: 'Avg', type: 'rate' },
    { label: 'Brent Crude', value: '$82.45', change: '-1.4%', type: 'decline' },
    { label: 'BTC/USD', value: '$68,421', change: '+2.1%', type: 'growth' },
  ];

  const tickerItems = [...MARKET_DATA, ...MARKET_DATA, ...MARKET_DATA];

  return (
    <div className="w-full bg-white/[0.02] backdrop-blur-xl border-y border-white/5 py-4 overflow-hidden relative group">
      <motion.div 
        className="flex whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
      >
        {tickerItems.map((item, idx) => (
          <div 
            key={idx} 
            className="inline-flex items-center gap-6 px-12 border-r border-white/5"
          >
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-1">
                {item.label}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-sm font-display font-medium text-white/90">
                  {item.value}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  item.type === 'growth' ? 'bg-emerald-500/10 text-emerald-400' : 
                  item.type === 'decline' ? 'bg-rose-500/10 text-rose-400' :
                  'bg-[#F3C64F]/10 text-[#F3C64F]'
                }`}>
                  {item.change}
                </span>
              </div>
            </div>
            
            {item.type === 'growth' && <TrendingUp className="w-4 h-4 text-emerald-500/40" />}
            {item.type === 'rate' && <Activity className="w-4 h-4 text-[#F3C64F]/40" />}
            {item.type === 'decline' && <Scale className="w-4 h-4 text-rose-500/40" />}
          </div>
        ))}
      </motion.div>

      {/* Glassy Overlays for fade effect */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0B0F19] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0B0F19] to-transparent z-10 pointer-events-none"></div>
    </div>
  );
}
