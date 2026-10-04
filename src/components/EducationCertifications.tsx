import React from 'react';
import { GraduationCap, Award, MapPin, Calendar, CheckCircle2, ShieldCheck, Trophy, Medal, Star } from 'lucide-react';
import { CV_DATA } from '../data/cvData';

interface EducationCertificationsProps {
  darkMode: boolean;
}

export const EducationCertifications: React.FC<EducationCertificationsProps> = ({ darkMode }) => {
  return (
    <section id="education" className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-500 mb-2">
            Academic Credentials & Accreditations
          </div>
          <h2
            className={`text-3xl sm:text-4xl font-black tracking-tight ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Education, Certifications & Honors
          </h2>
          <p className={`text-sm sm:text-base mt-2 max-w-2xl ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Degrees, professional accreditations, and distinguished honors conferred to Professor Shafqat-ul-Mulk across his career.
          </p>
          <div className="w-16 h-1 bg-amber-500 mt-3 rounded-full" />
        </div>

        {/* 2-Column Grid: Degrees & Certifications from CV */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left Column: Higher Education Degrees from CV */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-amber-400" />
              <h3 className={`text-xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Education
              </h3>
            </div>

            <div className="space-y-5">
              {CV_DATA.education.map((edu, idx) => (
                <div
                  key={idx}
                  className="bulky-card p-6"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h4
                        className={`text-lg font-bold tracking-tight ${
                          darkMode ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {edu.degree} – {edu.field}
                      </h4>
                      <p className="text-sm font-semibold text-amber-500 mt-0.5">
                        {edu.institution}
                      </p>
                    </div>

                    <span className="inline-flex items-center gap-1 text-xs font-mono font-bold px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 shrink-0">
                      <Calendar className="w-3 h-3 text-amber-400" />
                      <span>{edu.year}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{edu.location}</span>
                    {edu.honors && (
                      <>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span className="text-amber-400 font-bold flex items-center gap-1">
                          <Award className="w-3.5 h-3.5" />
                          {edu.honors}
                        </span>
                      </>
                    )}
                  </div>

                  {edu.keyDetails && edu.keyDetails.length > 0 && (
                    <div className="space-y-1.5 mt-2">
                      {edu.keyDetails.map((detail, dIdx) => (
                        <div key={dIdx} className="bulky-point text-xs leading-relaxed text-slate-200">
                          {detail}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Professional Accreditations & Certifications from CV */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h3 className={`text-xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Certifications
              </h3>
            </div>

            <div className="space-y-5">
              {CV_DATA.certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="bulky-card p-6"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h4
                      className={`text-base font-bold tracking-tight ${
                        darkMode ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {cert.title}
                    </h4>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800 shrink-0">
                      {cert.credentialBadge}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-3 text-xs text-amber-400 font-semibold mb-2">
                    <span>{cert.issuer}</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="text-slate-400 font-normal">{cert.year}</span>
                  </div>

                  <div className="bulky-point text-xs leading-relaxed text-slate-200 mt-2">
                    {cert.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dedicated Honors & Awards Showcase Section */}
        <div className="pt-4 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/30">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
                  Documented Recognition
                </span>
                <h3 className={`text-2xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  Honors & Official Awards
                </h3>
              </div>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <Star className="w-3.5 h-3.5 fill-current" />
              4 Verified Distinctions
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {CV_DATA.honorsAndAwards.map((item) => (
              <div
                key={item.id}
                className="bulky-card p-6 bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/20 border-amber-500/20 hover:border-amber-500/40 transition-all group"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 shadow-md font-black">
                      <Medal className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                        {item.category}
                      </span>
                      <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 whitespace-nowrap shrink-0">
                    {item.badge}
                  </span>
                </div>

                <div className="text-xs font-semibold text-slate-400 mb-2.5">
                  Conferring Authority: <span className="text-slate-200">{item.issuer}</span>
                </div>

                <div className="bulky-point text-xs leading-relaxed text-slate-300">
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
