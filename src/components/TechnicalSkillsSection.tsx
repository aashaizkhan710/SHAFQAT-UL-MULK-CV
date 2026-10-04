import React from 'react';
import { Cpu, Terminal, Radio, Server, Layers, Activity } from 'lucide-react';
import { CV_DATA } from '../data/cvData';

interface TechnicalSkillsSectionProps {
  darkMode: boolean;
}

export const TechnicalSkillsSection: React.FC<TechnicalSkillsSectionProps> = ({ darkMode }) => {
  return (
    <section id="technical-expertise" className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-500 mb-2">
            Engineering Depth
          </div>
          <h2
            className={`text-3xl sm:text-4xl font-bold tracking-tight ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Technical Expertise
          </h2>
          <p
            className={`text-base max-w-xl mt-2 ${
              darkMode ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Advanced electronic hardware architectures, avionics mission data buses, digital signal processing, and high-reliability design.
          </p>
          <div className="w-16 h-1 bg-amber-500 mt-3 rounded-full" />
        </div>

        {/* Technical Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {CV_DATA.technicalExpertise.map((skill, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border transition-all hover:scale-[1.02] flex flex-col justify-between ${
                darkMode
                  ? 'bg-slate-900/60 border-slate-800 hover:border-amber-500/50 hover:bg-slate-900'
                  : 'bg-white border-slate-200 hover:border-amber-400 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-mono text-slate-500 uppercase">
                    {skill.category}
                  </span>
                  <span className="text-[10px] font-bold text-amber-500 px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                    {skill.level}
                  </span>
                </div>
                <h3
                  className={`text-sm sm:text-base font-bold tracking-tight leading-snug ${
                    darkMode ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {skill.name}
                </h3>
              </div>

              <div className="pt-3 mt-2 border-t border-slate-800/30 flex items-center justify-between text-[11px] text-slate-400">
                <span>Domain Standard</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
