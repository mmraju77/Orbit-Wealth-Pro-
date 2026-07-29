import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator } from 'lucide-react';

interface Tool {
  title: string;
  path: string;
  description: string;
}

interface RelatedToolsProps {
  tools: Tool[];
}

export default function RelatedTools({ tools }: RelatedToolsProps) {
  if (!tools || tools.length === 0) return null;
  
  return (
    <section className="mt-12 pt-8 border-t border-white/10">
      <h2 className="text-2xl font-display font-bold text-white mb-6">Related Calculators</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tools.map((tool, idx) => (
          <Link 
            key={idx} 
            to={tool.path}
            className="group block p-6 bg-slate-900/50 rounded-2xl border border-white/5 hover:border-yellow-500/50 hover:bg-slate-800/50 transition-all duration-300"
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-yellow-500/30 group-hover:bg-yellow-500/10 transition-colors">
                <Calculator className="w-5 h-5 text-white/70 group-hover:text-yellow-500" />
              </div>
              <h3 className="ml-4 font-semibold text-white group-hover:text-yellow-500 transition-colors">{tool.title}</h3>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">{tool.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
