/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ARTICLES, Article } from '../data/blogData';
import { Clock, User, ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import ArticleModal from './ArticleModal';

export default function BlogPreview() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  
  // Show first 3 articles for preview
  const previewArticles = ARTICLES.slice(0, 3);

  return (
    <section className="space-y-10 py-12">
      <AnimatePresence>
        {selectedArticle && (
          <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
        )}
      </AnimatePresence>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="h-[1px] w-8 bg-[#F3C64F]"></div>
             <span className="text-base font-black text-[#F3C64F] uppercase tracking-[0.4em]">Resource Center</span>
          </div>
          <h2 className="text-5xl font-display font-bold text-[#F3C64F] tracking-tight">
            Expert Financial Insights
          </h2>
        </div>
        <Link 
          to="/insights" 
          className="group flex items-center gap-2 text-base font-bold text-slate-300 hover:text-[#F3C64F] transition-colors"
        >
          View Intelligence Hub <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {previewArticles.map((article, idx) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedArticle(article)}
              className="group flex flex-col bg-white/[0.02] border border-white/5 rounded-[2.5rem] overflow-hidden hover:bg-white/[0.04] hover:border-[#F3C64F]/30 transition-all shadow-2xl shadow-black/40 cursor-pointer"
            >
              <div className="flex-1 flex flex-col">
                <div className="aspect-[16/9] w-full bg-white/5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#F3C64F]/10 to-transparent opacity-50" />
                  <div className="absolute top-6 left-6 px-3 py-1 bg-[#0B0F19]/80 backdrop-blur-md rounded-full border border-white/10">
                    <span className="text-base font-black text-[#F3C64F] uppercase tracking-widest leading-none">
                      {article.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-[#F3C64F] flex items-center justify-center text-[#0B0F19] transform scale-80 group-hover:scale-100 transition-all">
                      <BookOpen className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col gap-6">
                  <div className="flex items-center gap-4 text-base font-bold text-white/70 uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {article.readTime}</span>
                    <span>{article.date}</span>
                  </div>

                  <h3 className="text-3xl lg:text-4xl font-bold text-white line-clamp-3 leading-[1.6] group-hover:text-[#F3C64F] transition-colors pb-4">
                    {article.title}
                  </h3>

                  <p className="text-lg !text-white !opacity-100 leading-[1.7] line-clamp-3 font-medium pb-8">
                    {article.excerpt}
                  </p>

                  <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#F3C64F]/10 border border-[#F3C64F]/20 flex items-center justify-center">
                        <User className="w-4 h-4 text-[#F3C64F]" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white">{article.author}</h4>
                        <p className="text-base text-[#F3C64F] font-black uppercase tracking-widest">{article.authorTitle}</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/70 group-hover:bg-[#F3C64F] group-hover:text-[#0B0F19] group-hover:border-[#F3C64F] transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
