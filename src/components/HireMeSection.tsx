import React from 'react';
import { MessageSquare, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { CV_DATA } from '../data/cvData';

interface HireMeSectionProps {
  darkMode: boolean;
}

export const HireMeSection: React.FC<HireMeSectionProps> = ({ darkMode }) => {
  return (
    <section id="hire-me" className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Open for Strategic Opportunities · Ready to Deliver Proven Results</span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Hire Me / Work With Me
          </h2>
          <p
            className={`text-base sm:text-lg leading-relaxed ${
              darkMode ? 'text-slate-300' : 'text-slate-700'
            }`}
          >
            Actively looking for high-impact leadership, academic governance, education reform, institutional turnaround, and executive project management opportunities. Ready to prove tangible value, instill administrative rigor, and accelerate organizational growth.
          </p>
          <div className="w-20 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* 8 Distinct Domain Consultation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {CV_DATA.hireMeAreas.map((area, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-xl border flex flex-col justify-between transition-all hover:scale-[1.02] ${
                darkMode
                  ? 'bg-slate-900/70 border-slate-800 hover:border-amber-500/50 hover:bg-slate-900 shadow-md'
                  : 'bg-white border-slate-200 hover:border-amber-500 hover:shadow-lg'
              }`}
            >
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  <h3
                    className={`text-base font-bold tracking-tight leading-snug ${
                      darkMode ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {area.title}
                  </h3>
                </div>
                <p
                  className={`text-xs leading-relaxed ${
                    darkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  {area.description}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-800/40 flex items-center justify-between text-[11px] text-amber-500 font-semibold">
                <span>Advisory & Execution</span>
                <Check className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

        {/* Large WhatsApp CTA Banner */}
        <div
          className={`rounded-2xl border p-8 sm:p-10 text-center relative overflow-hidden transition-all ${
            darkMode
              ? 'bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border-emerald-700/60 shadow-xl'
              : 'bg-gradient-to-r from-slate-900 via-emerald-900 to-slate-900 text-white border-emerald-600/40 shadow-xl'
          }`}
        >
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="inline-flex p-3 rounded-full bg-emerald-500/20 text-emerald-400">
              <MessageSquare className="w-8 h-8" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Connect Directly with Shafqat Ul Mulk
            </h3>

            <p className="text-sm sm:text-base text-slate-300">
              Initiate an immediate discussion regarding university advisory, institutional turnaround, educational reform projects, or technical consulting.
            </p>

            <div className="pt-2">
              <a
                href={CV_DATA.personal.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-base sm:text-lg shadow-lg shadow-emerald-500/30 transition-all hover:scale-105 active:scale-95"
              >
                <MessageSquare className="w-6 h-6 fill-current" />
                <span>Contact Shafqat Ul Mulk on WhatsApp</span>
              </a>
            </div>

            <div className="flex items-center justify-center gap-6 text-xs text-slate-400 pt-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Direct Mobile: +92 323 9215615
              </span>
              <span>·</span>
              <span>Available for Global & National Engagements</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
