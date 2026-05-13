/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TrendingUp, TrendingDown, Coins, Bitcoin, Search } from 'lucide-react';
import { motion } from 'motion/react';

const MARKET_DATA = [
  { label: 'USD/INR', value: '83.42', change: '+0.05', up: true },
  { label: 'BTC/USD', value: '$64,281', change: '+2.4%', up: true },
  { label: 'Gold (24K)', value: '₹7,245', change: '-0.15', up: false },
  { label: 'NIFTY 50', value: '22,462', change: '+0.8%', up: true },
  { label: 'S&P 500', value: '5,127', change: '+1.2%', up: true },
  { label: 'Eth/USD', value: '$3,142', change: '-1.1%', up: false }
];

export default function MarketTicker() {
  return (
    <div className="bg-black/40 backdrop-blur-sm border-b border-white/[0.02] py-2 overflow-hidden relative z-50">
      <div className="flex whitespace-nowrap animate-ticker group">
        {[...MARKET_DATA, ...MARKET_DATA].map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 px-12">
            <span className="text-[8px] font-bold text-white/10 uppercase tracking-[0.4em]">{item.label}</span>
            <span className="text-[10px] font-medium text-white/30 font-mono italic">{item.value}</span>
            <span className={`text-[8px] font-bold ${item.up ? 'text-emerald-500/20' : 'text-rose-500/20'}`}>
              {item.change}
            </span>
          </div>
        ))}
      </div>
      
      {/* Visual Fade edges */}
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black to-transparent pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black to-transparent pointer-events-none"></div>

      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 40s linear infinite;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
