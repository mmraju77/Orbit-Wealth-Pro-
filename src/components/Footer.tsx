/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, Scale, FileText, Globe, Twitter, Instagram, Github, Wallet } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import { REGIONS, regionKeys } from '../data/pSEOData';

export default function Footer() {
  const { labels } = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0B1221] border-t border-white/5 pt-16 pb-8 px-6 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-[#D4AF37] rounded-xl flex items-center justify-center shadow-lg shadow-[#D4AF37]/20 group-hover:scale-110 transition-transform">
                <Wallet className="w-6 h-6 text-black" />
              </div>
              <span className="text-2xl font-bold tracking-tighter text-[#f59e0b] uppercase">ORBIT WEALTH PRO</span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed">
              Global financial tools platform providing precision calculators for 11+ jurisdictions including the USA, Canada, Europe, UAE, and India.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 bg-white/5 rounded-lg text-white/20 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-lg text-white/20 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-lg text-white/20 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-100 uppercase tracking-widest mb-6">Tools & Resources</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/calculators/mortgage" className="text-sm text-white/40 hover:text-white transition-colors">Mortgage Engine</Link>
              </li>
              <li>
                <Link to="/calculators/income-tax" className="text-sm text-white/40 hover:text-white transition-colors">Tax Calculator</Link>
              </li>
              <li>
                <Link to="/calculators/retirement" className="text-sm text-white/40 hover:text-white transition-colors">Retirement Planner</Link>
              </li>
              <li>
                <Link to="/calculators/sip" className="text-sm text-white/40 hover:text-white transition-colors">SIP Estimator</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-100 uppercase tracking-widest mb-6">Popular Comparisons</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/compare/sip-vs-lumpsum" className="text-sm text-white/40 hover:text-white transition-colors">SIP vs Lumpsum</Link>
              </li>
              <li>
                <Link to="/compare/home-loan-vs-rent" className="text-sm text-white/40 hover:text-white transition-colors">Buy vs Rent</Link>
              </li>
              <li>
                <Link to="/compare/gold-vs-real-estate" className="text-sm text-white/40 hover:text-white transition-colors">Gold vs Real Estate</Link>
              </li>
              <li>
                <Link to="/compare/fd-vs-mutual-funds" className="text-sm text-white/40 hover:text-white transition-colors">FD vs MF</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-100 uppercase tracking-widest mb-6">Company & Info</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/about" className="flex items-center gap-2 text-sm text-white hover:text-[#D4AF37] transition-colors font-bold">
                  <Globe className="w-4 h-4" /> About ORBIT WEALTH PRO
                </Link>
              </li>
              <li>
                <Link to="/contact" className="flex items-center gap-2 text-sm text-white hover:text-[#D4AF37] transition-colors font-bold">
                  <Mail className="w-4 h-4" /> Contact Support
                </Link>
              </li>
              <li className="pt-2 border-t border-white/5">
                <Link to="/privacy-policy" className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors">
                  <Shield className="w-4 h-4" /> Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors">
                  <FileText className="w-4 h-4" /> Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 py-8 border-t border-white/5 mb-8">
           <Link to="/about" className="text-xs font-bold text-white/60 hover:text-[#D4AF37] uppercase tracking-widest transition-colors">About Us</Link>
           <Link to="/contact" className="text-xs font-bold text-white/60 hover:text-[#D4AF37] uppercase tracking-widest transition-colors">Contact Us</Link>
           <Link to="/privacy-policy" className="text-xs font-bold text-white/60 hover:text-[#D4AF37] uppercase tracking-widest transition-colors">Privacy Policy</Link>
           <Link to="/terms-of-service" className="text-xs font-bold text-white/60 hover:text-[#D4AF37] uppercase tracking-widest transition-colors">Terms</Link>
           <Link to="/disclaimer" className="text-xs font-bold text-white/60 hover:text-[#D4AF37] uppercase tracking-widest transition-colors">Disclaimer</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 pt-8 border-t border-white/5">
           <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Global Jurisdictions</h4>
              <div className="flex flex-wrap gap-4">
                 {regionKeys.map(key => (
                   <Link 
                     key={key}
                     to={`/tools/mortgage/${key}`} 
                     className="text-[10px] text-white/40 hover:text-white px-2 py-1 bg-white/5 rounded transition-colors uppercase font-bold"
                   >
                     {REGIONS[key].name}
                   </Link>
                 ))}
              </div>
           </div>
           <div className="bg-[#D4AF37]/5 rounded-2xl p-6 border border-[#D4AF37]/10">
              <h4 className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest mb-2">AdSense & Trust</h4>
              <p className="text-[10px] text-white/40 leading-relaxed italic">
                ORBIT WEALTH PRO is a compliant financial platform. We use GA4 for analytics and AdSense for sustainability. Your data remains your own.
              </p>
           </div>
        </div>

        <div className="mb-12 pt-8 border-t border-white/5">
          <div className="p-8 bg-[#0D121F] border border-white/10 rounded-[2.5rem] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -mr-32 -mt-32" />
            <h4 className="text-[11px] font-black text-amber-500 uppercase tracking-[0.4em] mb-4 flex items-center gap-2 relative z-10">
              <Scale className="w-4 h-4" /> Global Regulatory & Financial Compliance Notice
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[11px] text-white/30 leading-relaxed relative z-10 font-medium">
              <div className="space-y-4">
                <p>
                  <strong className="text-white/60 uppercase tracking-tighter">Institutional Disclaimer:</strong> Orbit Wealth Pro (OWP) is a proprietary global financial intelligence engine. OWP is not a registered investment advisor (RIA), broker-dealer, or fiduciary institution in any jurisdiction. We do not provide personalized investment advice or act as custodians of user capital.
                </p>
                <p>
                  All automated projections, compound interest models, and AI-driven insights are generated based on mathematical simulations and deterministic data frameworks. This software does not account for individual risk tolerance, credit history, or unique liquidity requirements. Past market performance is strictly not an indicator of future capital growth or asset appreciation.
                </p>
              </div>
              <div className="space-y-4">
                <p>
                  <strong className="text-white/60 uppercase tracking-tighter">Jurisdictional Transparency:</strong> Financial logic used in our suite is derived from publicly available fiscal thresholds for the 2026-27 cycle. External factors such as geopolitical shifts, legislative amendments in the <strong className="text-white/60">USA (SEC), UK (FCA), India (SEBI/Income Tax Act), or EU (MiFID II)</strong>, and hyper-inflationary events can render calculations obsolete.
                </p>
                <p>
                  ORBIT WEALTH PRO operates under a <strong className="text-white/60">Strict Zero-Liability Framework</strong>. By utilizing this platform, you irrevocably acknowledge that financial planning is inherently speculative. All decisions executed based on OWP data are at the sole risk of the user. Consult a licensed financial architect for definitive advisory.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] font-bold text-white/40 tracking-tight">
            © 2026 Orbit Wealth Pro. All Rights Reserved. Built with 0-maintenance edge tech for global scale.
          </p>
          <div className="flex items-center gap-6 text-[10px] font-bold text-white/20 uppercase tracking-widest">
            <span>Precision AI v3.1.0</span>
            <span>Security Verified</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
