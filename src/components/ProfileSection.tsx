import React from 'react';
import { Award, Shield, Plane, GraduationCap, CheckCircle2 } from 'lucide-react';
import { CV_DATA } from '../data/cvData';

interface ProfileSectionProps {
  darkMode: boolean;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ darkMode }) => {
  return (
    <section id="profile" className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-10">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-500 mb-2">
            Curriculum Vitae
          </div>
          <h2
            className={`text-3xl sm:text-4xl font-black tracking-tight ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Executive Profile
          </h2>
          <div className="w-16 h-1 bg-amber-500 mt-3 rounded-full" />
        </div>

        {/* Content Card with Exact CV Text */}
        <div className="space-y-6">
          <div className={`bulky-card p-6 sm:p-8 ${darkMode ? 'bg-slate-900/90' : 'bg-white'}`}>
            <p
              className={`text-base sm:text-lg leading-relaxed ${
                darkMode ? 'text-slate-200' : 'text-slate-800'
              }`}
            >
              Accomplished academic leader and project manager with over 25 years of distinguished experience across higher education, military academies, institutional management, STEM innovation, quality assurance, and government education reform. Served 17.75 years as Assistant Professor at the College of Aeronautical Engineering (CAE), National University of Sciences and Technology (NUST), inside Pakistan Air Force Academy Asghar Khan, instructing Pakistan tri-services and international cadets (Royal Saudi Air Force and Royal Jordanian Air Force). Served as Principal (BPS-20) at Swabi Model School & College leading institutional turnaround. Currently Project Manager heading the province-wide outsourcing intervention for 2,000 low-performing government schools.
            </p>
          </div>

          {/* Key Documented Facts from Executive Profile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bulky-point p-4 cursor-pointer">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <h3 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  25+ Years Experience
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Higher education, institutional governance, and government education reform.
              </p>
            </div>

            <div className="bulky-point p-4 cursor-pointer">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 shrink-0">
                  <Plane className="w-4 h-4" />
                </div>
                <h3 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  17.75 Years at CAE NUST
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Assistant Professor instructing tri-services officers and international air force cadets.
              </p>
            </div>

            <div className="bulky-point p-4 cursor-pointer">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <h3 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  Principal (BPS-20)
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Swabi Model School & College leading institutional turnaround and STEM innovation.
              </p>
            </div>

            <div className="bulky-point p-4 cursor-pointer">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <h3 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  Project Manager (PIU)
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Outsourcing intervention for 2,000 low-performing government schools.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
