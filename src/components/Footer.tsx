/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, Scale, FileText, Globe, Twitter, Smartphone as Instagram, Github } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';

export default function Footer() {
  const { labels } = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black border-t border-white/5 pt-16 pb-8 px-6 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-[#0055FF] rounded-xl flex items-center justify-center shadow-lg shadow-[#0055FF]/20 group-hover:scale-110 transition-transform">
                <Globe className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tighter text-white">Orbit Wealth Pro</span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed">
              Premium financial decision engine for {labels.jurisdiction}. Precision calculations for global wealth management.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 bg-white/5 rounded-lg text-white/20 hover:text-[#0055FF] hover:bg-[#0055FF]/10 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-lg text-white/20 hover:text-[#0055FF] hover:bg-[#0055FF]/10 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-lg text-white/20 hover:text-[#0055FF] hover:bg-[#0055FF]/10 transition-all">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-6">Legal</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/privacy" className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors">
                  <Shield className="w-4 h-4" /> Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors">
                  <Scale className="w-4 h-4" /> Disclaimer
                </Link>
              </li>
              <li>
                <Link to="/terms" className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors">
                  <FileText className="w-4 h-4" /> Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-6">Support</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/contact" className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors">
                  <Mail className="w-4 h-4" /> Contact Us
                </Link>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/20">
                <Globe className="w-4 h-4" /> Region: {labels.jurisdiction}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-6">Popular Comparisons</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/compare/sip-vs-lumpsum" className="text-sm text-white/40 hover:text-white transition-colors">
                  SIP vs Lumpsum
                </Link>
              </li>
              <li>
                <Link to="/compare/home-loan-vs-rent" className="text-sm text-white/40 hover:text-white transition-colors">
                  Buy vs Rent
                </Link>
              </li>
              <li>
                <Link to="/compare/fd-vs-mutual-funds" className="text-sm text-white/40 hover:text-white transition-colors">
                  FD vs Mutual Funds
                </Link>
              </li>
              <li>
                <Link to="/compare/gold-vs-real-estate" className="text-sm text-white/40 hover:text-white transition-colors">
                  Gold vs Real Estate
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-6">Global Coverage</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/tools/mortgage/usa" className="text-sm text-white/40 hover:text-white transition-colors">
                  Mortgage USA
                </Link>
              </li>
              <li>
                <Link to="/tools/income-tax/india" className="text-sm text-white/40 hover:text-white transition-colors">
                  Income Tax India
                </Link>
              </li>
              <li>
                <Link to="/tools/retirement/uk" className="text-sm text-white/40 hover:text-white transition-colors">
                  Pension Planning UK
                </Link>
              </li>
              <li>
                <Link to="/tools/gst/uae" className="text-sm text-white/40 hover:text-white transition-colors">
                  VAT UAE
                </Link>
              </li>
            </ul>
          </div>

          <div className="bg-[#0055FF]/5 rounded-2xl p-6 border border-[#0055FF]/10">
            <h4 className="text-xs font-bold text-[#0055FF] uppercase tracking-widest mb-4">AdSense Compliance</h4>
            <p className="text-[10px] text-white/40 leading-relaxed italic">
              Orbit Wealth Pro is a free utility. We use industry-standard cookies to personalize your experience and serve relevant content. We do not store or process your personal financial data.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
            © {currentYear} Orbit Wealth Pro Engine. All Rights Reserved.
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
