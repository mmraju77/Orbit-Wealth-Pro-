/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Mail, MessageSquare, Send } from 'lucide-react';
import React, { useState } from 'react';

export default function ContactUs() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto px-10 py-20 flex flex-col md:flex-row gap-20"
    >
      <div className="flex-1">
        <div className="editorial-label mb-4">COMMUNICATION HUB</div>
        <h1 className="text-4xl font-extrabold tracking-tighter mb-8 text-white">Get in Touch</h1>
        <p className="text-white/50 font-light leading-relaxed mb-12 text-lg">
          Whether you have technical feedback, feature requests, or enterprise inquiry, we are ready to assist.
        </p>

        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded bg-[#0055FF]/10 flex items-center justify-center border border-[#0055FF]/20 shrink-0">
              <Mail className="w-5 h-5 text-[#0055FF]" />
            </div>
            <div>
              <div className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-1">Direct Email</div>
              <div className="text-lg font-medium text-white/80">intelligence@orbitwealth.pro</div>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded bg-[#0055FF]/10 flex items-center justify-center border border-[#0055FF]/20 shrink-0">
              <MessageSquare className="w-5 h-5 text-[#0055FF]" />
            </div>
            <div>
              <div className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-1">Response Time</div>
              <div className="text-lg font-medium text-white/80">Within 24 Business Hours</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1">
        {submitted ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-full flex flex-col items-center justify-center bg-white/5 border border-white/5 rounded-lg p-12 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
              <Send className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight mb-2">Message Dispatched</h2>
            <p className="text-white/40 text-sm">Your inquiry has been encrypted and sent to our team.</p>
            <button 
              onClick={() => setSubmitted(false)}
              className="mt-8 text-[10px] font-bold tracking-[0.2em] uppercase text-[#0055FF] hover:text-white transition-colors underline underline-offset-4"
            >
              SEND ANOTHER MESSAGE
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6" aria-label="Contact Us Form">
            <div className="space-y-2">
              <label htmlFor="full-name" className="text-[10px] font-bold tracking-widest text-white/30 uppercase">Full Name</label>
              <input 
                id="full-name"
                required
                type="text" 
                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white outline-none focus:border-[#0055FF] focus-visible:ring-1 focus-visible:ring-[#0055FF] transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email-address" className="text-[10px] font-bold tracking-widest text-white/30 uppercase">Professional Email</label>
              <input 
                id="email-address"
                required
                type="email" 
                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white outline-none focus:border-[#0055FF] focus-visible:ring-1 focus-visible:ring-[#0055FF] transition-colors"
                placeholder="john@firm.com"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="inquiry-type" className="text-[10px] font-bold tracking-widest text-white/30 uppercase">Inquiry Type</label>
              <select 
                id="inquiry-type" 
                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white outline-none focus:border-[#0055FF] focus-visible:ring-1 focus-visible:ring-[#0055FF] transition-colors appearance-none"
                aria-label="Select inquiry type"
              >
                <option className="bg-[#0A0A0A]">General Inquiry</option>
                <option className="bg-[#0A0A0A]">Technical Bug</option>
                <option className="bg-[#0A0A0A]">Feature Request</option>
                <option className="bg-[#0A0A0A]">Partnership</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="message-body" className="text-[10px] font-bold tracking-widest text-white/30 uppercase">Message</label>
              <textarea 
                id="message-body"
                required
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white outline-none focus:border-[#0055FF] focus-visible:ring-1 focus-visible:ring-[#0055FF] transition-colors resize-none"
                placeholder="How can we help you?"
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-[#0055FF] hover:bg-[#0044CC] text-white font-bold py-4 rounded text-[11px] tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0055FF] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              aria-label="Dispatch Message"
            >
              Dispatch Message
              <Send className="w-3 h-3" aria-hidden="true" />
            </button>
          </form>
        )}
      </div>
    </motion.div>
  );
}
