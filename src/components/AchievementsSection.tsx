import React, { useState } from 'react';
import { Award, CheckCircle, Sparkles, TrendingUp, ShieldCheck, Cpu } from 'lucide-react';
import { CV_DATA, AchievementItem } from '../data/cvData';

interface AchievementsSectionProps {
  darkMode: boolean;
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({ darkMode }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filtered = activeCategory === 'all'
    ? CV_DATA.achievements
    : CV_DATA.achievements.filter(a => a.category === activeCategory);

  return (
    <section id="achievements" className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-500 mb-2">
              Milestones of Distinction
            </div>
            <h2
              className={`text-3xl sm:text-4xl font-bold tracking-tight ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Key Achievements
            </h2>
            <p
              className={`text-base max-w-xl mt-2 ${
                darkMode ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              Ten landmark career accomplishments spanning defense aerospace, nationwide education reform, and university governance.
            </p>
            <div className="w-16 h-1 bg-amber-500 mt-3 rounded-full" />
          </div>

          {/* Category Filter Controls */}
          <div
            className={`flex items-center gap-1 p-1 rounded-lg border self-start md:self-auto overflow-x-auto max-w-full ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}
          >
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                activeCategory === 'all'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : darkMode
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All (10)
            </button>
            <button
              onClick={() => setActiveCategory('Leadership')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                activeCategory === 'Leadership'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : darkMode
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Leadership
            </button>
            <button
              onClick={() => setActiveCategory('Aviation & Defense')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                activeCategory === 'Aviation & Defense'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : darkMode
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Aviation & Defense
            </button>
            <button
              onClick={() => setActiveCategory('Reform')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                activeCategory === 'Reform'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : darkMode
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              School Reform
            </button>
            <button
              onClick={() => setActiveCategory('Quality & Accreditation')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                activeCategory === 'Quality & Accreditation'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : darkMode
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ISO & OBE
            </button>
          </div>
        </div>

        {/* 10 Key Achievement Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item: AchievementItem, idx) => (
            <div
              key={item.id}
              className="bulky-card p-6 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Metric pill replacement: clean unboxed typography */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs text-slate-500 font-mono">
                    #{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                  </span>
                  {item.metric && (
                    <span className="text-xs font-mono font-bold text-amber-500 tabular-nums">
                      {item.metric}
                    </span>
                  )}
                </div>

                <h3
                  className={`text-lg font-bold tracking-tight mb-1 leading-snug ${
                    darkMode ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {item.title}
                </h3>

                <p className="text-xs font-medium text-amber-500 mb-3">
                  {item.subtitle}
                </p>

                <p
                  className={`text-xs sm:text-sm leading-relaxed ${
                    darkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/40 flex items-center justify-between text-xs text-slate-500">
                <span>{item.category}</span>
                <CheckCircle className="w-4 h-4 text-emerald-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
