import React from 'react';
import {
  Briefcase,
  Award,
  Medal,
  Shield,
  Building,
  GraduationCap,
  Plane,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

interface ExperienceSectionProps {
  darkMode: boolean;
}

interface CreativeMilestone {
  id: string;
  title: string;
  organization: string;
  period: string;
  tag?: string;
  summary: string;
  skills: string[];
  type: 'leadership' | 'defense' | 'honor';
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ darkMode }) => {
  // 1. Primary Strategic Roles (Minimum content, maximum impact)
  const primaryRoles: CreativeMilestone[] = [
    {
      id: 'role-piu',
      title: 'Project Manager — 2,000 Govt Schools Reform',
      organization: 'Project Implementation Unit (PIU)',
      period: '2026 – Present',
      tag: 'Current Role',
      summary: 'Directing the landmark provincial outsourcing intervention across 2,000 low-performing schools to raise student enrollment and learning benchmarks.',
      skills: ['Public Sector Reform', 'Project Governance', 'SLA Enforcement'],
      type: 'leadership'
    },
    {
      id: 'role-nust',
      title: 'Assistant Professor — Avionics & Embedded Systems',
      organization: 'CAE NUST / PAF Academy Asghar Khan',
      period: '2004 – 2021 · 17.75 Yrs',
      tag: 'Military Engineering',
      summary: 'Trained Pakistan tri-services officers and international air force cadets in FPGA, MIL-STD-1553 bus, and radar signal processing architectures.',
      skills: ['MIL-STD-1553 Bus', 'Radar DSP', 'FPGA / Verilog', 'ISO 9001 Lead'],
      type: 'defense'
    },
    {
      id: 'role-swabi',
      title: 'Principal (BPS-20)',
      organization: 'Swabi Model School & College',
      period: '2022 – Present',
      tag: 'Turnaround Leadership',
      summary: 'Orchestrated institutional turnaround, established modern Robotics & AI labs, and enhanced board examination results.',
      skills: ['Robotics & AI Labs', 'Faculty Governance', 'Board Exam Excellence'],
      type: 'leadership'
    }
  ];

  // 2. The 4 Requested Honors & Distinctions (Clean, Creative Checkpoints)
  const honorsAndAwards: CreativeMilestone[] = [
    {
      id: 'honor-paf',
      title: 'Appreciation Certificate from Base Commander',
      organization: 'PAF Academy Asghar Khan, Risalpur',
      period: 'Military Commendation',
      tag: 'Base Commander Commendation',
      summary: 'Awarded by Base Commander for exemplary military avionics instruction and distinguished service to tri-services cadets.',
      skills: ['Defense Pedagogy', 'Tri-Services Training'],
      type: 'honor'
    },
    {
      id: 'honor-pesh',
      title: '2nd Position in MSc Electronics',
      organization: 'University of Peshawar',
      period: 'University Silver Medalist',
      tag: '2nd Position in University',
      summary: 'Secured 2nd position in the entire university graduating cohort for academic distinction in electronics and communication systems.',
      skills: ['Semiconductor Physics', 'Circuit Analysis'],
      type: 'honor'
    },
    {
      id: 'honor-ptc',
      title: 'Certificate of Honour in Pakistan Tobacco Company Nowshera',
      organization: 'Pakistan Tobacco Company (PTC Nowshera)',
      period: 'Corporate Honour',
      tag: 'Industrial Honour',
      summary: 'Conferred Certificate of Honour for exceptional technical diagnostics, automated line stability, and industrial engineering excellence.',
      skills: ['Industrial Control', 'Process Stability'],
      type: 'honor'
    },
    {
      id: 'honor-ncc',
      title: 'Company Commander in NCC in College',
      organization: 'National Cadet Corps (NCC)',
      period: 'Collegiate Leadership',
      tag: 'Company Commander',
      summary: 'Appointed Company Commander in NCC, commanding troop discipline, drill parades, physical rigor, and youth leadership.',
      skills: ['Company Drill Command', 'Military Discipline'],
      type: 'honor'
    }
  ];

  return (
    <section id="experience" className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-left mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-500 mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career Milestones & Distinctions</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
            darkMode ? 'text-white' : 'text-slate-950'
          }`}>
            Experience & Honors
          </h2>
          <p className={`mt-2 text-base max-w-2xl font-normal ${
            darkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Curated highlights across executive public leadership, military higher education, and decorated institutional commendations.
          </p>
        </div>

        {/* 1. Primary Strategic Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-left">
          {primaryRoles.map((item) => (
            <div
              key={item.id}
              className="framer-card p-6 sm:p-7 flex flex-col justify-between group border transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-500">
                    {item.period}
                  </span>
                  {item.tag && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      {item.tag}
                    </span>
                  )}
                </div>

                <h3 className={`text-lg font-bold tracking-tight mb-1 transition-colors group-hover:text-amber-400 ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  {item.title}
                </h3>

                <p className={`text-xs font-medium mb-3 ${
                  darkMode ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  {item.organization}
                </p>

                <p className={`text-xs leading-relaxed mb-4 ${
                  darkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {item.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/40 flex flex-wrap gap-1.5">
                {item.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                      darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 2. The 4 Requested Honors & Distinctions (Creative 2x2 Grid) */}
        <div className="text-left mb-6">
          <div className="flex items-center gap-2">
            <Medal className="w-4 h-4 text-amber-500" />
            <h3 className={`text-xl font-bold tracking-tight ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Decorated Commendations & Academic Honors
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
          {honorsAndAwards.map((honor) => (
            <div
              key={honor.id}
              className={`framer-card p-6 flex flex-col justify-between group border transition-all duration-300 ${
                darkMode
                  ? 'border-amber-500/20 bg-amber-950/5 hover:border-amber-500/50 hover:bg-amber-950/15'
                  : 'border-amber-200 bg-amber-50/40 hover:border-amber-400 hover:bg-amber-50/80'
              }`}
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-500 mb-3.5 transition-transform duration-300 group-hover:scale-110">
                  <Award className="w-5 h-5" />
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 block mb-1">
                  {honor.tag}
                </span>

                <h4 className={`text-base font-bold tracking-tight mb-1.5 transition-colors group-hover:text-amber-400 ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  {honor.title}
                </h4>

                <p className={`text-xs font-medium mb-2.5 ${
                  darkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {honor.organization}
                </p>

                <p className={`text-xs leading-relaxed ${
                  darkMode ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  {honor.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-amber-500/15 flex flex-wrap gap-1">
                {honor.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                      darkMode ? 'bg-amber-500/10 text-amber-300' : 'bg-amber-100 text-amber-900'
                    }`}
                  >
                    {skill}
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
