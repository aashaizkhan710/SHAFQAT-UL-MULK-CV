import React from 'react';
import {
  GraduationCap,
  Award,
  Calendar,
  MapPin,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  BookOpen
} from 'lucide-react';
import { CV_DATA } from '../data/cvData';

interface EducationSectionProps {
  darkMode: boolean;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ darkMode }) => {
  return (
    <section id="education" className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-left mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-500 mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Qualifications</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            darkMode ? 'text-white' : 'text-slate-950'
          }`}>
            Education & Executive Certifications
          </h2>
          <p className={`mt-2 text-base max-w-2xl ${
            darkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Rigorous international and domestic postgraduate engineering degrees, complemented by continuous executive leadership diplomas.
          </p>
        </div>

        {/* Degrees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {CV_DATA.education.map((edu, idx) => (
            <div
              key={idx}
              className="framer-card p-6 sm:p-7 flex flex-col justify-between text-left group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 transition-transform group-hover:scale-110">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-500">
                    {edu.year}
                  </span>
                </div>

                <h3 className={`text-lg font-bold tracking-tight mb-1 ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  {edu.degree}
                </h3>
                <p className="text-xs font-medium text-amber-500 mb-3">
                  {edu.field}
                </p>

                <p className={`text-xs font-semibold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                  {edu.institution}
                </p>
                <div className={`flex items-center gap-1 text-[11px] mt-0.5 mb-4 ${
                  darkMode ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  <MapPin className="w-3 h-3 text-slate-500" />
                  <span>{edu.location}</span>
                </div>

                {edu.honors && (
                  <div className="mb-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold">
                    <Award className="w-3.5 h-3.5" />
                    <span>{edu.honors}</span>
                  </div>
                )}

                <ul className="space-y-1.5 pt-2 border-t border-slate-800/40">
                  {edu.keyDetails.map((detail, dIdx) => (
                    <li key={dIdx} className={`text-xs leading-relaxed ${
                      darkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications Banner / Bento Cards */}
        <div className="framer-card p-6 sm:p-8 text-left">
          <div className="flex items-center gap-2 mb-6">
            <ShieldCheck className="w-5 h-5 text-amber-500" />
            <h3 className={`text-xl font-bold tracking-tight ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Executive & Professional Certifications
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CV_DATA.certifications.map((cert, cIdx) => (
              <div
                key={cIdx}
                className={`p-4 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                  darkMode
                    ? 'bg-slate-900/60 border-white/5 hover:border-amber-500/40'
                    : 'bg-slate-50 border-slate-200/80 hover:border-amber-500/40'
                }`}
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 block mb-1">
                  {cert.credentialBadge}
                </span>
                <h4 className={`text-sm font-bold tracking-tight mb-1 ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  {cert.title}
                </h4>
                <p className="text-xs text-amber-500/90 font-medium mb-2">
                  {cert.issuer}
                </p>
                <p className={`text-[11px] leading-relaxed ${
                  darkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {cert.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
