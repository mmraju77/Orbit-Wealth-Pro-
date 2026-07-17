/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Loader2, Sparkles, TrendingUp, ShieldCheck, Wallet } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const QUICK_PROMPTS = [
  { label: 'Compounding Power', icon: <TrendingUp className="w-3.5 h-3.5" /> },
  { label: 'Tax Strategies', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
  { label: 'Savings Models', icon: <Wallet className="w-3.5 h-3.5" /> },
];

export default function OrbitChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Greetings. I am Orbit AI, your Premium Wealth Intelligence Expert. How can I assist you with your financial architecture today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer mock-user-token'
        },
        body: JSON.stringify({ message: content })
      });

      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      const assistantMessage: Message = { role: 'assistant', content: data.text };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I apologize, but I encountered a disruption in my processing core. Please attempt your query again shortly.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        aria-label="Open chat assistant"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-tr from-[#F3C64F] to-[#D4AF37] rounded-full shadow-[0_0_20px_rgba(243,198,79,0.3)] flex items-center justify-center z-[100] group overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        <MessageSquare className="w-6 h-6 text-[#0B0F19]" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-8 w-[90vw] md:w-[400px] h-[550px] bg-[#0B0F19]/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl flex flex-col z-[101] overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500/20 to-[#F3C64F]/20 flex items-center justify-center border border-white/10">
                  <Bot className="w-4 h-4 text-[#F3C64F]" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-bold text-white tracking-tight">Ask Orbit AI</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-base text-emerald-500/70 font-bold uppercase tracking-widest">Intelligence Active</span>
                  </div>
                </div>
              </div>
              <button 
                aria-label="Close chat window"
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/70 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar"
            >
              {messages.map((msg, idx) => (
                <div 
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center border ${
                      msg.role === 'user' 
                        ? 'bg-white/5 border-white/10' 
                        : 'bg-[#F3C64F]/10 border-[#F3C64F]/20'
                    }`}>
                      {msg.role === 'user' ? <User className="w-4 h-4 text-white/70" /> : <Sparkles className="w-4 h-4 text-[#F3C64F]" />}
                    </div>
                    <div className={`p-3 rounded-2xl text-lg leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-white/5 text-white/90 rounded-tr-none'
                        : 'bg-white/[0.02] border border-white/5 text-white/80 rounded-tl-none font-medium'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#F3C64F]/10 border border-[#F3C64F]/20 flex items-center justify-center">
                      <Loader2 className="w-4 h-4 text-[#F3C64F] animate-spin" />
                    </div>
                    <div className="flex items-center gap-1.5 py-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20 animate-bounce" />
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20 animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20 animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Prompts */}
            <div className="px-4 py-2 flex flex-wrap gap-2">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt.label}
                  onClick={() => handleSend(prompt.label)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-base font-bold text-white/70 hover:text-[#F3C64F] hover:border-[#F3C64F]/30 hover:bg-[#F3C64F]/5 transition-all"
                >
                  {prompt.icon}
                  {prompt.label}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/5 bg-white/[0.02]">
              <div className="relative">
                <input
                  aria-label="Chat input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
                  placeholder="Inquire about wealth strategies..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-lg text-white placeholder:text-white/70 focus:outline-none focus:ring-1 focus:ring-[#F3C64F]/50 focus:border-[#F3C64F]/50 transition-all"
                />
                <button 
                  aria-label="Send message"
                  onClick={() => handleSend(input)}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1.5 p-1.5 bg-[#F3C64F] rounded-lg hover:bg-[#D4AF37] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4 text-[#0B0F19]" />
                </button>
              </div>
              <p className="mt-2 text-sm text-center text-white/70 uppercase tracking-[0.2em] font-bold">
                Orbital Intelligence Hub • Driven by Gemini
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </>
  );
}
