/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Send, MessageCircle, MapPin, Globe } from 'lucide-react';

export default function ContactUs() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-12 text-white">
      <header className="space-y-4 text-center">
        <div className="inline-flex p-3 bg-[#0055FF]/10 rounded-2xl border border-[#0055FF]/20 mb-4">
           <Mail className="text-[#0055FF] w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold tracking-tighter">Contact Support</h1>
        <p className="text-white/40 text-sm uppercase tracking-widest font-bold">We're here to help with your financial computations</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
           <div className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight">Get in Touch</h2>
              <p className="text-white/40 leading-relaxed">
                Have a feature request? Spotted a calculation error? Or just want to say hi? 
                Use the form or reach out via our official channels.
              </p>
           </div>

           <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                 <div className="p-3 bg-[#0055FF]/20 rounded-xl">
                    <Mail className="w-5 h-5 text-[#0055FF]" />
                 </div>
                 <div>
                    <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Email Support</div>
                    <div className="text-sm font-bold">contact@orbitwealthpro.com</div>
                 </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                 <div className="p-3 bg-emerald-500/20 rounded-xl">
                    <MessageCircle className="w-5 h-5 text-emerald-500" />
                 </div>
                 <div>
                    <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Global Relay</div>
                    <div className="text-sm font-bold">Live Chat available via Dashboard</div>
                 </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                 <div className="p-3 bg-purple-500/20 rounded-xl">
                    <Globe className="w-5 h-5 text-purple-500" />
                 </div>
                 <div>
                    <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Region Focus</div>
                    <div className="text-sm font-bold">Calculators optimized for global taxation</div>
                 </div>
              </div>
           </div>
        </div>

        <section className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-10">
          {submitted ? (
            <div className="h-[400px] flex flex-col items-center justify-center text-center space-y-6">
               <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/30">
                  <Send className="w-8 h-8 text-emerald-500" />
               </div>
               <div className="space-y-2">
                  <h3 className="text-2xl font-bold tracking-tight">Message Received</h3>
                  <p className="text-white/40 text-sm">We'll get back to you within 24-48 business hours.</p>
               </div>
               <button 
                 onClick={() => setSubmitted(false)}
                 className="px-6 py-2 bg-white/5 rounded-lg text-xs font-bold hover:bg-white/10 transition-all border border-white/10"
               >
                 Send Another
               </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest px-1">Full Name</label>
                     <input required type="text" className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-[#0055FF] transition-all" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest px-1">Email Address</label>
                     <input required type="email" className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-[#0055FF] transition-all" placeholder="name@company.com" />
                  </div>
               </div>
               
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest px-1">Subject</label>
                  <select className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 outline-none appearance-none cursor-pointer">
                     <option className="bg-black">General Inquiry</option>
                     <option className="bg-black">Calculator Feature Request</option>
                     <option className="bg-black">Report a Bug</option>
                     <option className="bg-black">Business Partnership</option>
                  </select>
               </div>

               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest px-1">Message</label>
                  <textarea required rows={4} className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-[#0055FF] transition-all resize-none" placeholder="Provide as much detail as possible..."></textarea>
               </div>

               <button type="submit" className="w-full py-4 bg-[#0055FF] rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-[#0055FF]/20 hover:bg-[#0055FF]/90 transition-all flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" /> Send Transmission
               </button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}
