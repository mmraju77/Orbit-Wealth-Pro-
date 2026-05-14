import React from 'react';
import { Calendar, ArrowUpRight } from 'lucide-react';

interface NewsArticle {
  title: string;
  summary: string;
  date: string;
  category: string;
  image: string;
}

const NEWS_ARTICLES: NewsArticle[] = [
  {
    title: "Global Markets React to Shifting Interest Rate Projections",
    summary: "Central banks signal a potential pivot in monetary policy as inflation metrics stabilize across major economic zones.",
    date: "May 14, 2026",
    category: "Markets",
    image: "https://images.unsplash.com/photo-1611974717482-98ea0519302c?auto=format&fit=crop&q=80&w=800&fm=webp"
  },
  {
    title: "Tech Giants Unveil New AI Infrastructure Commitments",
    summary: "Silicon Valley leaders announce multi-billion dollar investments in quantum-ready data centers to power the next generation of LLMs.",
    date: "May 13, 2026",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800&fm=webp"
  },
  {
    title: "The Rise of Sustainable Finance in Emerging Markets",
    summary: "New regulatory frameworks are accelerating the adoption of ESG-linked bonds in Southeast Asia and Latin America.",
    date: "May 12, 2026",
    category: "Economy",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800&fm=webp"
  }
];

function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <div className="group relative bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden hover:border-[#0055FF]/30 transition-all duration-500">
      <div className="aspect-[16/9] overflow-hidden relative">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[8px] font-black text-[#0055FF] uppercase tracking-tighter border border-white/5">
            {article.category}
          </span>
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-display font-medium text-white tracking-tighter leading-tight group-hover:text-[#0055FF] transition-colors duration-500">
            {article.title}
          </h3>
          <p className="text-sm text-white/40 leading-relaxed line-clamp-2">
            {article.summary}
          </p>
        </div>
        
        <div className="pt-4 flex items-center justify-between border-t border-white/[0.05]">
           <div className="flex items-center gap-2">
              <Calendar className="w-3 h-3 text-white/20" />
              <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest">{article.date}</span>
           </div>
           <button className="flex items-center gap-2 text-[10px] font-bold text-[#0055FF] uppercase tracking-widest group-hover:translate-x-1 transition-transform">
             Read Full Report <ArrowUpRight className="w-3 h-3" />
           </button>
        </div>
      </div>
    </div>
  );
}

export default function DashboardNews() {
  return (
    <section className="space-y-10 pt-16">
      <div className="flex items-center gap-4">
         <h2 className="text-[10px] font-bold text-[#0055FF] uppercase tracking-[0.4em]">Global Finance News</h2>
         <div className="flex-1 h-px bg-[#0055FF]/10"></div>
         <div className="flex items-center gap-2 text-[8px] font-bold text-white/20 uppercase tracking-widest">
           <div className="w-1 h-1 rounded-full bg-[#0055FF] animate-pulse"></div>
           Live Updates
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {NEWS_ARTICLES.map((article, idx) => (
          <div key={idx}>
            <NewsCard article={article} />
          </div>
        ))}
      </div>
      
      <div className="flex justify-center pt-4">
        <button className="px-8 py-3 bg-white/[0.02] border border-white/5 rounded-full text-[10px] font-bold text-white/40 uppercase tracking-widest hover:bg-[#0055FF]/10 hover:border-[#0055FF]/30 hover:text-white transition-all cursor-pointer">
          Explore All Market Insights
        </button>
      </div>
    </section>
  );
}
