/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { X, Bug, Terminal, Activity, Database } from 'lucide-react';
import { useLocale } from '@/src/context/LocaleContext';

interface DebugPanelProps {
  isOpen: boolean;
  onClose: () => void;
  activeView: string;
}

export default function DebugPanel({ isOpen, onClose, activeView }: DebugPanelProps) {
  const { currency, labels } = useLocale();

  const systemStats = [
    { label: 'Version', value: 'v2.4.0-stable' },
    { label: 'Environment', value: 'Production (Edge)' },
    { label: 'Locale Engine', value: 'Intl 4.0' },
    { label: 'UI Framework', value: 'React 19 / Vite 6' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000]"
          />
          
          {/* Panel */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-[400px] bg-[#0A0A0A] border-l border-white/10 shadow-2xl z-[1001] flex flex-col font-mono"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#0055FF]/20 flex items-center justify-center border border-[#0055FF]/30">
                  <Bug className="w-4 h-4 text-[#0055FF]" />
                </div>
                <div>
                  <h2 className="text-[11px] font-bold tracking-[0.2em] text-white uppercase">Debug Subsystem</h2>
                  <p className="text-[9px] text-white/30 uppercase tracking-widest mt-0.5">Kernel v2.4 Active</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"
                id="close-debug-panel"
              >
                <X className="w-4 h-4 text-white/40" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* SYSTEM STATUS */}
              <section>
                <div className="flex items-center gap-2 mb-4 text-[#0055FF]">
                  <Activity className="w-3 h-3" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Environment Variables</span>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {systemStats.map((stat, i) => (
                    <div key={i} className="flex justify-between items-center text-[11px] bg-white/[0.02] p-3 border border-white/5 rounded">
                      <span className="text-white/30">{stat.label}</span>
                      <span className="text-white/80 font-medium">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* LOCALE CONTEXT */}
              <section>
                <div className="flex items-center gap-2 mb-4 text-[#0055FF]">
                  <Database className="w-3 h-3" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">State Store: Locale</span>
                </div>
                <pre className="text-[10px] leading-relaxed text-white/60 bg-black/40 p-4 border border-white/5 rounded overflow-x-auto">
                  {JSON.stringify({ 
                    currency,
                    labels,
                    timestamp: new Date().toISOString(),
                    active_view: activeView
                  }, null, 2)}
                </pre>
              </section>

              {/* TERMINAL OVERRIDE */}
              <section>
                <div className="flex items-center gap-2 mb-4 text-[#0055FF]">
                  <Terminal className="w-3 h-3" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Terminal Output</span>
                </div>
                <div className="bg-[#050505] p-4 rounded border border-white/10 min-h-[150px] text-[10px] text-green-500/80 space-y-1">
                  <p className="flex gap-2"><span className="text-white/20">[{new Date().toLocaleTimeString()}]</span> SYSTEM: CALCULATOR_ENGINE_INITIALIZED</p>
                  <p className="flex gap-2"><span className="text-white/20">[{new Date().toLocaleTimeString()}]</span> LOCALE: {currency}_SUBSYSTEM_ACTIVE</p>
                  <p className="flex gap-2"><span className="text-white/20">[{new Date().toLocaleTimeString()}]</span> VIEW: {activeView}_MOUNTED</p>
                  <p className="flex gap-2 text-white/40"><span className="text-[#0055FF] animate-pulse">_</span></p>
                </div>
              </section>
            </div>

            <div className="p-6 border-t border-white/10 bg-white/[0.02]">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[9px] text-white/20 font-bold tracking-widest uppercase">Encryption Status</span>
                <span className="text-[9px] text-green-500 font-bold tracking-widest uppercase">AES-256 ACTIVE</span>
              </div>
              <button 
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
                className="w-full py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors"
              >
                Clear Local Data Store
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
