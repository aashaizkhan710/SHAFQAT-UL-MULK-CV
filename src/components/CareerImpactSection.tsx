import React from 'react';
import { School, Award, Clock, GraduationCap, ShieldCheck, Globe, CheckCircle2 } from 'lucide-react';
import { CV_DATA } from '../data/cvData';

interface CareerImpactSectionProps {
  darkMode: boolean;
}

interface StatItem {
  number: string;
  label: string;
  sublabel: string;
  detail: string;
  icon: React.ElementType;
  badge?: string;
}

export const CareerImpactSection: React.FC<CareerImpactSectionProps> = ({ darkMode }) => {
  const stats: StatItem[] = [
    {
      number: '2,000+',
      label: 'Government Schools',
      sublabel: 'Outsourcing Reform Intervention',
      detail: 'Direct leadership under PIU managing 2,000 schools across KPK to expand student enrollment and elevate learning metrics.',
      icon: School,
      badge: 'Present Leadership'
    },
    {
      number: '25+',
      label: 'Years Experience',
      sublabel: 'Engineering & Institutional Leadership',
      detail: 'Over two and a half decades spanning military engineering academies, higher education faculties, and public governance.',
      icon: Clock,
      badge: 'Quarter-Century'
    },
    {
      number: '17.75',
      label: 'Years at CAE NUST',
      sublabel: 'PAF Academy Asghar Khan',
      detail: 'Assistant Professor delivering specialized avionics, FPGA, MIL-STD-1553, and radar DSP courses to tri-services cadets.',
      icon: Award,
      badge: 'Defense Aerospace'
    },
    {
      number: 'BPS-20',
      label: 'Principal Leadership',
      sublabel: 'Swabi Model School & College',
      detail: 'Spearheaded comprehensive institutional turnaround, academic excellence, and built a cutting-edge Robotics & AI Lab.',
      icon: GraduationCap,
      badge: 'Public Sector'
    },
    {
      number: 'Tri-Services',
      label: 'Armed Forces & Allies',
      sublabel: 'PAF, Army, Navy & International Cadets',
      detail: 'Trained Pakistan tri-services officers as well as international cadets from the Royal Saudi and Royal Jordanian Air Forces.',
      icon: Globe,
      badge: 'International'
    },
    {
      number: 'ISO 9001 / OBE',
      label: 'Accreditation Leadership',
      sublabel: 'Washington Accord Level-II & ISO Audits',
      detail: 'ISO 9001 Coordinator achieving audit readiness and led Outcome-Based Education (OBE) compliance under PEC.',
      icon: ShieldCheck,
      badge: 'Accreditation'
    }
  ];

  return (
    <section id="impact" className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-500 mb-2">
            Verified Quantitative Record
          </div>
          <h2
            className={`text-3xl sm:text-4xl font-black tracking-tight mb-3 ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Leadership & Institutional Impact
          </h2>
          <p
            className={`text-sm sm:text-base leading-relaxed ${
              darkMode ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Documented leadership contributions and verified quantitative milestones from 25+ years of service across military aeronautical engineering pedagogy, institutional turnaround, and provincial education reform.
          </p>
          <div className="w-16 h-1 bg-amber-500 mt-4 rounded-full" />
        </div>

        {/* 6 High-Impact Executive Cards Grid (Bulky 3D Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bulky-card p-6 sm:p-7 flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors border border-amber-500/20">
                      <Icon className="w-5 h-5" />
                    </div>
                    {stat.badge && (
                      <span className="text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full bg-slate-800 text-amber-400 border border-slate-700">
                        {stat.badge}
                      </span>
                    )}
                  </div>

                  {/* Primary Large Metric */}
                  <div className="text-3xl sm:text-4xl font-black tracking-tight font-mono text-amber-400 mb-1">
                    {stat.number}
                  </div>

                  <h3
                    className={`text-lg font-bold tracking-tight mb-1 ${
                      darkMode ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {stat.label}
                  </h3>

                  <p className="text-xs font-semibold text-amber-400/90 mb-3">
                    {stat.sublabel}
                  </p>

                  <div className="bulky-point text-xs leading-relaxed text-slate-200 mt-2">
                    {stat.detail}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center gap-1.5 text-xs text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Documented Academic Record</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
