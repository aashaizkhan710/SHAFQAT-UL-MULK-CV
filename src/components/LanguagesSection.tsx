import React from 'react';
import { Languages, Globe } from 'lucide-react';
import { CV_DATA } from '../data/cvData';

interface LanguagesSectionProps {
  darkMode: boolean;
}

export const LanguagesSection: React.FC<LanguagesSectionProps> = ({ darkMode }) => {
  return (
    <section id="languages" className="py-12 sm:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-8">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-500 mb-2">
            Curriculum Vitae
          </div>
          <h2
            className={`text-2xl sm:text-3xl font-black tracking-tight ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Languages
          </h2>
          <div className="w-12 h-1 bg-amber-500 mt-2.5 rounded-full" />
        </div>

        {/* 4 Cards strictly matching the CV documentation (no artificial percentages) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CV_DATA.languages.map((lang, idx) => (
            <div
              key={idx}
              className="bulky-card p-5 cursor-pointer"
            >
              <div className="flex items-center gap-2.5 mb-2">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <h3
                  className={`text-base font-bold ${
                    darkMode ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {lang.language}
                </h3>
              </div>

              <div className="bulky-point text-xs leading-relaxed text-slate-200 mt-2">
                {lang.proficiency}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
