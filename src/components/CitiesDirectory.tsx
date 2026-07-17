/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { REGIONS, CALCULATORS } from '../data/pSEOData';
import { MapPin, ArrowRight, Building2, Globe2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function CitiesDirectory() {
  const regions = Object.keys(REGIONS).filter(k => REGIONS[k].name !== 'USA' && REGIONS[k].name !== 'India' && REGIONS[k].name !== 'UAE' && REGIONS[k].name !== 'UK' && REGIONS[k].name !== 'Canada' && REGIONS[k].name !== 'Australia' && REGIONS[k].name !== 'Germany' && REGIONS[k].name !== 'Switzerland' && REGIONS[k].name !== 'Norway' && REGIONS[k].name !== 'Sweden' && REGIONS[k].name !== 'Denmark' && REGIONS[k].name !== 'Netherlands');
  
  // High traffic city hubs for SEO
  const FEATURED_HUBS = [
    { city: 'Mumbai', region: 'india', slug: 'mumbai' },
    { city: 'Dubai', region: 'uae', slug: 'dubai' },
    { city: 'New York', region: 'usa', slug: 'new-york' },
    { city: 'London', region: 'uk', slug: 'london' },
    { city: 'Sydney', region: 'australia', slug: 'sydney' },
    { city: 'Singapore', region: 'singapore', slug: 'singapore' },
    { city: 'Toronto', region: 'canada', slug: 'toronto' },
    { city: 'Berlin', region: 'germany', slug: 'berlin' },
  ];

  return (
    <div className="space-y-12 pb-20">
      <Helmet>
        <title>Financial Intelligence Hubs & City Directories - ORBIT WEALTH PRO</title>
        <meta name="description" content="Explore regional financial tools, tax guides, and investment calculators for major global cities and economic hubs." />
      </Helmet>

      {/* Hero Header */}
      <header className="space-y-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-[1px] w-12 bg-[#D4AF37]"></div>
          <span className="text-sm font-black text-[#D4AF37] uppercase tracking-[0.4em] drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]">Global Coverage</span>
        </div>
        <h1 className="text-6xl md:text-7xl font-display font-bold tracking-tight text-white max-w-4xl leading-[1.1]">
          Economic <br />
          <span className="text-[#D4AF37]">Intelligence Hubs</span>
        </h1>
        <p className="text-white/70 text-xl leading-relaxed max-w-2xl">
          Localized financial computation suites for major global economic centers. Tailored for expats, investors, and residents in high-traffic administrative hubs.
        </p>
      </header>

      {/* Featured Hubs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {FEATURED_HUBS.map((hub, idx) => (
          <motion.div
            key={hub.slug}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Link
              to={`/tools/mortgage/${hub.slug}`}
              className="group block h-full bg-white/[0.02] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.04] hover:border-[#D4AF37]/30 transition-all text-center"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{hub.city}</h3>
              <p className="text-sm font-bold text-white/70 uppercase tracking-widest mb-6">Financial Analytics</p>
              
              <div className="space-y-2">
                {['Income Tax', 'Mortgage', 'SIP'].map(calc => (
                   <div key={calc} className="text-sm text-white/70 hover:text-[#D4AF37] transition-colors">{calc} Tool</div>
                ))}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Programmatic Engine Stats */}
      <section className="bg-white/[0.02] border border-white/5 rounded-[40px] p-12 overflow-hidden relative">
        <div className="absolute -right-24 -bottom-24 opacity-5">
           <Building2 className="w-96 h-96" />
        </div>
        
        <div className="relative z-10 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="space-y-4">
                    <div className="text-5xl font-bold text-white">500+</div>
                    <div className="text-sm font-bold text-[#D4AF37] uppercase tracking-widest">Cities Indexed</div>
                </div>
                <div className="space-y-4">
                    <div className="text-5xl font-bold text-white">24+</div>
                    <div className="text-sm font-bold text-[#D4AF37] uppercase tracking-widest">Financial Jurisdictions</div>
                </div>
                <div className="space-y-4">
                    <div className="text-5xl font-bold text-white">100k+</div>
                    <div className="text-sm font-bold text-[#D4AF37] uppercase tracking-widest">Static SEO Routes</div>
                </div>
            </div>
            
            <div className="pt-8 border-t border-white/5">
                <h3 className="text-2xl font-bold text-white mb-6">Global pSEO Architecture</h3>
                <div className="flex flex-wrap gap-3">
                   {Object.keys(REGIONS).slice(0, 12).map(r => (
                      <span key={r} className="px-4 py-2 bg-white/5 rounded-full text-sm text-white/70 border border-white/5">
                        {REGIONS[r].name}
                      </span>
                   ))}
                   <span className="px-4 py-2 bg-[#D4AF37]/10 rounded-full text-sm text-[#D4AF37] border border-[#D4AF37]/20 uppercase font-black">
                     + Many More
                   </span>
                </div>
            </div>
        </div>
      </section>

      {/* Directory CTA */}
      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <Globe2 className="w-8 h-8 text-emerald-400" />
              </div>
              <div>
                  <h4 className="text-2xl font-bold text-white">Universal Calculator Protocol</h4>
                  <p className="text-white/70 text-base">Every tool in our suite is automatically region-aware and city-optimized.</p>
              </div>
          </div>
          <Link to="/" className="w-full md:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold text-center border border-white/10 transition-all flex items-center justify-center gap-3">
              Explore Dashboard <ArrowRight className="w-4 h-4" />
          </Link>
      </div>
    </div>
  );
}
