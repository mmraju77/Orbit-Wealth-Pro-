/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ARTICLES } from '../data/blogData';
import { Clock, User, ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BlogPreview() {
  // Show first 3 articles for preview
  const previewArticles = ARTICLES.slice(0, 3);

  return (
    <section className="space-y-10 py-12">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="h-[1px] w-8 bg-[#F3C64F]"></div>
             <span className="text-[10px] font-black text-[#F3C64F] uppercase tracking-[0.4em]">Resource Center</span>
          </div>
          <h2 className="text-3xl font-display font-bold text-[#F3C64F] tracking-tight">
            Expert Financial Insights
          </h2>
        </div>
        <Link 
          to="/insights" 
          className="group flex items-center gap-2 text-xs font-bold text-white/40 hover:text-[#F3C64F] transition-colors"
        >
          View Intelligence Hub <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {previewArticles.map((article, idx) => (
          <motion.article
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group flex flex-col bg-white/[0.02] border border-white/5 rounded-[2.5rem] overflow-hidden hover:bg-white/[0.04] hover:border-[#F3C64F]/30 transition-all shadow-2xl shadow-black/40"
          >
            <Link to="/insights" className="flex-1 flex flex-col">
              <div className="aspect-[16/9] w-full bg-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#F3C64F]/10 to-transparent opacity-50" />
                <div className="absolute top-6 left-6 px-3 py-1 bg-[#0B0F19]/80 backdrop-blur-md rounded-full border border-white/10">
                  <span className="text-[10px] font-black text-[#F3C64F] uppercase tracking-widest leading-none">
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-4 mb-4 text-[10px] font-bold text-white/30 uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {article.readTime}</span>
                  <span>{article.date}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-4 line-clamp-2 leading-snug group-hover:text-[#F3C64F] transition-colors">
                  {article.title}
                </h3>

                <p className="text-sm text-slate-100 leading-relaxed line-clamp-2 mb-8">
                  {article.excerpt}
                </p>

                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#F3C64F]/10 border border-[#F3C64F]/20 flex items-center justify-center">
                      <User className="w-4 h-4 text-[#F3C64F]" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-white">{article.author}</h4>
                      <p className="text-[8px] text-[#F3C64F] font-black uppercase tracking-widest">{article.authorTitle}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/10 group-hover:text-[#F3C64F] transition-all" />
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
