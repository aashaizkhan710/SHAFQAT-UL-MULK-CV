import React from 'react';
import { Target, Wrench, Trophy, CheckCircle, FolderGit2 } from 'lucide-react';
import { CV_DATA, ProjectContribution } from '../data/cvData';

interface ProjectsSectionProps {
  darkMode: boolean;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ darkMode }) => {
  return (
    <section id="projects" className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-500 mb-2">
            Applied Engineering & Institutional Initiatives
          </div>
          <h2
            className={`text-3xl sm:text-4xl font-black tracking-tight ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Research & Strategic Projects
          </h2>
          <p
            className={`text-sm sm:text-base max-w-2xl mt-2 ${
              darkMode ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Documented engineering laboratories, defense FYP research initiatives, and public education reform rollouts structured under Objective, Contribution, and Measured Outcome.
          </p>
          <div className="w-16 h-1 bg-amber-500 mt-3 rounded-full" />
        </div>

        {/* 6 In-Depth Projects Grid (Bulky 3D Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CV_DATA.projectsContributions.map((proj: ProjectContribution, idx) => (
            <div
              key={proj.id}
              className="bulky-card p-6 sm:p-8 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Header metadata */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono font-bold text-amber-400">
                    Project #{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                  </span>
                  <span className="text-xs text-slate-400 font-mono font-semibold">
                    {proj.timeframe}
                  </span>
                </div>

                <h3
                  className={`text-xl sm:text-2xl font-black tracking-tight mb-1 ${
                    darkMode ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {proj.title}
                </h3>
                <p className="text-xs font-bold text-amber-400 mb-5">
                  {proj.organization}
                </p>

                {/* Problem, Action, Result Triad (Bulky 3D Points) */}
                <div className="space-y-3.5 text-xs sm:text-sm">
                  {/* Problem */}
                  <div className="bulky-point border-l-4 border-l-rose-500">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-400 mb-1">
                      <Target className="w-3.5 h-3.5" />
                      <span>Challenge & Objective</span>
                    </div>
                    <p className="text-slate-200 leading-relaxed">
                      {proj.problem}
                    </p>
                  </div>

                  {/* Action */}
                  <div className="bulky-point border-l-4 border-l-sky-500">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-400 mb-1">
                      <Wrench className="w-3.5 h-3.5" />
                      <span>Strategic Execution & Contribution</span>
                    </div>
                    <p className="text-slate-200 leading-relaxed">
                      {proj.action}
                    </p>
                  </div>

                  {/* Result / Impact */}
                  <div className="bulky-point border-l-4 border-l-emerald-500">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
                      <Trophy className="w-3.5 h-3.5" />
                      <span>Documented Outcome</span>
                    </div>
                    <p className="text-white font-medium leading-relaxed">
                      {proj.result}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tags as Bulky Badges */}
              <div className="pt-5 mt-5 border-t border-slate-800/60 flex flex-wrap gap-2">
                {proj.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="bulky-badge text-[11px] px-2.5 py-1 bg-slate-900 border-slate-700 text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
