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
    <section className="mt-16 pt-8 border-t border-[#1F2937]">
      <h2 className="text-2xl font-bold text-white mb-6 font-outfit">Explore Related Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tools.map((tool, idx) => (
          <Link 
            key={idx} 
            to={tool.path}
            className="group block p-6 bg-[#111827] rounded-xl border border-[#1F2937] hover:border-[#D4AF37] transition-all duration-300"
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1F2937] to-[#111827] border border-[#374151] flex items-center justify-center group-hover:border-[#D4AF37] transition-colors">
                <Calculator className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h3 className="ml-4 font-semibold text-white font-outfit group-hover:text-[#D4AF37] transition-colors">{tool.title}</h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">{tool.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
