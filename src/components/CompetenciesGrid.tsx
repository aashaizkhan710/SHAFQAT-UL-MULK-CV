import React from 'react';
import {
  Landmark,
  GraduationCap,
  ShieldCheck,
  Award,
  Cpu,
  Users,
  Compass,
  Plane,
  Kanban,
  Building2,
  TrendingUp,
  Target
} from 'lucide-react';
import { CV_DATA } from '../data/cvData';

interface CompetenciesGridProps {
  darkMode: boolean;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Landmark: <Landmark className="w-5 h-5 text-amber-500" />,
  GraduationCap: <GraduationCap className="w-5 h-5 text-sky-400" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
  Award: <Award className="w-5 h-5 text-amber-400" />,
  Cpu: <Cpu className="w-5 h-5 text-indigo-400" />,
  Users: <Users className="w-5 h-5 text-amber-300" />,
  Compass: <Compass className="w-5 h-5 text-rose-400" />,
  Plane: <Plane className="w-5 h-5 text-blue-400" />,
  Kanban: <Kanban className="w-5 h-5 text-emerald-300" />,
  Building2: <Building2 className="w-5 h-5 text-amber-500" />,
  TrendingUp: <TrendingUp className="w-5 h-5 text-teal-400" />,
  Target: <Target className="w-5 h-5 text-red-400" />
};

export const CompetenciesGrid: React.FC<CompetenciesGridProps> = ({ darkMode }) => {
  return (
    <section id="competencies" className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-500 mb-2">
            Domain Mastery
          </div>
          <h2
            className={`text-3xl sm:text-4xl font-bold tracking-tight ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Core Competencies
          </h2>
          <p
            className={`text-base max-w-2xl mt-2 ${
              darkMode ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            A high-level synthesis of 25+ years in engineering pedagogy, military aviation standards, and provincial education reform.
          </p>
          <div className="w-16 h-1 bg-amber-500 mt-3 rounded-full" />
        </div>

        {/* 12 Competency Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CV_DATA.competencies.map((comp, idx) => (
            <div
              key={idx}
              className="bulky-card p-6 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="flex items-center gap-3 mb-3.5">
                  <div
                    className={`p-2.5 rounded-lg shrink-0 ${
                      darkMode ? 'bg-slate-800' : 'bg-slate-100'
                    }`}
                  >
                    {ICON_MAP[comp.icon] || <Award className="w-5 h-5 text-amber-500" />}
                  </div>
                  <h3
                    className={`text-base font-bold tracking-tight leading-snug ${
                      darkMode ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {comp.title}
                  </h3>
                </div>

                <p
                  className={`text-xs sm:text-sm leading-relaxed ${
                    darkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  {comp.desc}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-800/30 flex items-center justify-between text-[11px] text-slate-500">
                <span>Executive Competency #{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</span>
                <span className="text-amber-500 font-semibold">Verified</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
