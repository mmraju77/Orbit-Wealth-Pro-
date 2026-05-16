/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, Scale, FileText, Globe, Twitter, Instagram, Github } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';

export default function Footer() {
  const { labels } = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0B1221] border-t border-white/5 pt-16 pb-8 px-6 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <img src="/logo.webp" alt="ORBIT WEALTH PRO" className="w-10 h-10 object-contain group-hover:scale-110 transition-transform" />
              <span className="text-2xl font-bold tracking-tighter text-white uppercase">ORBIT WEALTH PRO</span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed">
              Global financial tools platform providing precision calculators for the USA, UAE, and India. Empowering wealth through data.
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
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-6">Tools & Resources</h4>
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
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-6">Popular Comparisons</h4>
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
            <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-6">Company & Info</h4>
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
                 <Link to="/tools/mortgage/usa" className="text-[10px] text-white/40 hover:text-white px-2 py-1 bg-white/5 rounded">USA</Link>
                 <Link to="/tools/gratuity/uae" className="text-[10px] text-white/40 hover:text-white px-2 py-1 bg-white/5 rounded">UAE</Link>
                 <Link to="/tools/income-tax/india" className="text-[10px] text-white/40 hover:text-white px-2 py-1 bg-white/5 rounded">INDIA</Link>
                 <Link to="/tools/retirement/uk" className="text-[10px] text-white/40 hover:text-white px-2 py-1 bg-white/5 rounded">UK</Link>
                 <Link to="/tools/gst/australia" className="text-[10px] text-white/40 hover:text-white px-2 py-1 bg-white/5 rounded">AUSTRALIA</Link>
              </div>
           </div>
           <div className="bg-[#D4AF37]/5 rounded-2xl p-6 border border-[#D4AF37]/10">
              <h4 className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest mb-2">AdSense & Trust</h4>
              <p className="text-[10px] text-white/40 leading-relaxed italic">
                ORBIT WEALTH PRO is a compliant financial platform. We use GA4 for analytics and AdSense for sustainability. Your data remains your own.
              </p>
           </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
            © {currentYear} ORBIT WEALTH PRO Engine. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6 text-[10px] font-bold text-white/20 uppercase tracking-widest">
            <span>Precision Logic v2.4.0</span>
            <span>Security Verified</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
