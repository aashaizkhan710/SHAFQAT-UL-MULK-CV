import React, { useState } from 'react';
import { Calendar, MapPin, Building, ChevronDown, ChevronUp, CheckCircle2, Award, Briefcase } from 'lucide-react';
import { CV_DATA, ExperienceItem } from '../data/cvData';

interface ExperienceTimelineProps {
  darkMode: boolean;
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ darkMode }) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>('exp-1');

  const filteredExperiences = filterType === 'all'
    ? CV_DATA.experiences
    : CV_DATA.experiences.filter(exp => exp.type === filterType);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <section id="experience" className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-500 mb-2">
              Career History & Academic Appointments
            </div>
            <h2
              className={`text-3xl sm:text-4xl font-black tracking-tight ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Professional Experience
            </h2>
            <p className={`text-sm sm:text-base mt-2 max-w-2xl ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Reverse-chronological career appointments across provincial school governance, BPS-20 Principal leadership, and 17.75 years of military aeronautical engineering pedagogy.
            </p>
            <div className="w-16 h-1 bg-amber-500 mt-3 rounded-full" />
          </div>

          {/* Interactive Filter Tabs */}
          <div
            className={`flex items-center gap-1.5 p-1.5 rounded-xl border self-start md:self-auto overflow-x-auto max-w-full ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-300'
            }`}
          >
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                filterType === 'all'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : darkMode
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Appointments (5)
            </button>
            <button
              onClick={() => setFilterType('Executive / Government')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                filterType === 'Executive / Government'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : darkMode
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Executive & Government
            </button>
            <button
              onClick={() => setFilterType('Military Higher Education')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                filterType === 'Military Higher Education'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : darkMode
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Military Higher Education
            </button>
            <button
              onClick={() => setFilterType('Higher Education')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                filterType === 'Higher Education'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : darkMode
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Higher Education
            </button>
          </div>
        </div>

        {/* Timeline Stream */}
        <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
          {filteredExperiences.map((exp: ExperienceItem) => {
            const isExpanded = expandedId === exp.id;

            return (
              <div key={exp.id} className="relative group">
                {/* Timeline node icon */}
                <div
                  className={`absolute -left-10 sm:-left-14 top-3 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all shadow-md ${
                    exp.current
                      ? 'border-amber-400 bg-amber-500 text-slate-950 ring-4 ring-amber-500/20'
                      : darkMode
                      ? 'border-slate-700 bg-slate-900 text-amber-400'
                      : 'border-slate-400 bg-white text-amber-600'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                </div>

                {/* Experience Card (Bulky 3D) */}
                <div
                  className={`bulky-card transition-all ${
                    exp.current ? 'border-amber-500/80 shadow-amber-500/20' : ''
                  }`}
                >
                  {/* Card Header */}
                  <div
                    onClick={() => toggleExpand(exp.id)}
                    className="p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 select-none"
                  >
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                        <span className="text-amber-400 font-mono font-bold uppercase tracking-wider">
                          {exp.period}
                        </span>
                        <span aria-hidden="true" className="text-slate-500">·</span>
                        <span className="text-slate-400 font-medium">
                          {exp.type}
                        </span>
                        {exp.current && (
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                            Present
                          </span>
                        )}
                      </div>

                      <h3
                        className={`text-xl sm:text-2xl font-black tracking-tight ${
                          darkMode ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {exp.role}
                      </h3>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-300">
                        <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                          <Building className="w-4 h-4 shrink-0" />
                          <span>{exp.organization}</span>
                        </div>
                        {exp.department && (
                          <>
                            <span aria-hidden="true" className="text-slate-600 hidden sm:inline">/</span>
                            <span className={darkMode ? 'text-slate-300' : 'text-slate-600'}>
                              {exp.department}
                            </span>
                          </>
                        )}
                        <span aria-hidden="true" className="text-slate-600 hidden sm:inline">·</span>
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <MapPin className="w-3.5 h-3.5 shrink-0" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      className="bulky-btn-slate self-start md:self-center px-3.5 py-1.5 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                      aria-label="Expand Experience Details"
                    >
                      <span>{isExpanded ? 'Hide Details' : 'View Responsibilities'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Expandable Content Area with Bulky 3D Points */}
                  {isExpanded && (
                    <div className="px-6 pb-6 pt-3 border-t border-slate-800/60 space-y-5">
                      {/* Documented Responsibilities & Deliverables (Bulky 3D Points) */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-amber-400" />
                          <span>Documented Responsibilities & Deliverables</span>
                        </h4>
                        <div className="space-y-2.5">
                          {exp.highlights.map((point, i) => (
                            <div
                              key={i}
                              className="bulky-point flex items-start gap-3 text-xs sm:text-sm text-slate-200"
                            >
                              <span className="text-amber-400 font-bold mt-0.5">•</span>
                              <span className="leading-relaxed">{point}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Special Academic & Leadership Roles if present (e.g. CAE NUST ISO & OBE roles) */}
                      {exp.leadershipRoles && exp.leadershipRoles.length > 0 && (
                        <div className="space-y-3 pt-2">
                          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-400">
                            <Award className="w-4 h-4" />
                            <span>Academic Leadership & Quality Assurance Mandates</span>
                          </div>
                          <div className="space-y-2">
                            {exp.leadershipRoles.map((roleText, rIdx) => (
                              <div
                                key={rIdx}
                                className="bulky-point flex items-start gap-3 text-xs sm:text-sm text-slate-200"
                              >
                                <span className="text-sky-400 font-bold mt-0.5">•</span>
                                <span className="leading-relaxed">{roleText}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Skill Badges */}
                      <div className="flex flex-wrap items-center gap-2 pt-2">
                        {exp.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="bulky-badge text-[11px] font-semibold px-2.5 py-1 bg-slate-900 border-slate-700 text-slate-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
