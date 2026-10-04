import React from 'react';
import { Calendar, School, Users, Award, ShieldCheck, ArrowRight, Building, CheckCircle } from 'lucide-react';
import { CV_DATA } from '../data/cvData';

interface PresentRoleSectionProps {
  darkMode: boolean;
}

export const PresentRoleSection: React.FC<PresentRoleSectionProps> = ({ darkMode }) => {
  const role = CV_DATA.presentRole;

  return (
    <section id="present-role" className="py-12 sm:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Highlighted Executive Banner Container (Bulky 3D Slab) */}
        <div
          className={`bulky-card p-6 sm:p-10 transition-all overflow-hidden ${
            darkMode
              ? 'bg-gradient-to-br from-slate-900 via-slate-900/90 to-blue-950/40 border-amber-500/50 shadow-2xl'
              : 'bg-gradient-to-br from-white via-amber-50/30 to-blue-50/40 border-amber-400 shadow-xl'
          }`}
        >
          {/* Accent Gold Border Ribbon */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-amber-500 to-sky-500" />

          {/* Section Kicker */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-700/30">
            <div className="flex items-center gap-3">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
                Present Role · High-Impact Government Reform
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
              <Calendar className="w-3.5 h-3.5 text-amber-500" />
              <span>Appointed: <strong className="text-slate-200">{role.appointedDate}</strong></span>
            </div>
          </div>

          {/* Core Role Title & Organization */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4">
              <div className="space-y-1">
                <h2
                  className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight ${
                    darkMode ? 'text-white' : 'text-slate-900'
                  }`}
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {role.title}
                </h2>
                <p className="text-lg font-semibold text-amber-500">
                  {role.unit}
                </p>
                <p className={`text-base font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {role.project}
                </p>
              </div>

              {/* Verified Mandate Description */}
              <p
                className={`text-sm sm:text-base leading-relaxed ${
                  darkMode ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                {role.description}
              </p>

              {/* 4 Strategic Pillars */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {role.pillars.map((pillar, idx) => (
                  <div
                    key={idx}
                    className="bulky-metric p-4 cursor-pointer"
                  >
                    <div className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className={`text-xs font-bold uppercase tracking-wide ${darkMode ? 'text-slate-200' : 'text-slate-900'}`}>
                          {pillar.title}
                        </h4>
                        <p className={`text-xs mt-1 leading-normal ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                          {pillar.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact Metric & Quick WhatsApp Connect */}
            <div className="lg:col-span-4 space-y-4">
              {/* Highlight Card */}
              <div className="bulky-card p-6 text-center space-y-3">
                <div className="inline-flex p-3 rounded-full bg-amber-500/10 text-amber-500">
                  <School className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-3xl font-extrabold font-mono text-amber-500">2,000</div>
                  <div className={`text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-slate-300' : 'text-slate-800'}`}>
                    Government Schools
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Systemic intervention for student enrollment expansion and classroom outcomes improvement.
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/60 flex items-center justify-around text-xs text-slate-400">
                  <div className="flex items-center gap-1 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Provincial Scale</span>
                  </div>
                  <div className="flex items-center gap-1 font-bold">
                    <Users className="w-3.5 h-3.5 text-sky-400" />
                    <span>Multi-Stakeholder</span>
                  </div>
                </div>
              </div>

              {/* Action Link for Consultation */}
              <a
                href={CV_DATA.personal.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bulky-btn-amber w-full flex items-center justify-center gap-2 px-5 py-3.5 text-xs sm:text-sm cursor-pointer whitespace-nowrap"
              >
                <span>Discuss Education Reform Inquiries</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
