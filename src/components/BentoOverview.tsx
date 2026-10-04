import React from 'react';
import {
  Building2,
  Plane,
  Cpu,
  GraduationCap,
  ShieldCheck,
  Award,
  ArrowUpRight,
  CheckCircle2,
  TrendingUp,
  Landmark,
  Compass
} from 'lucide-react';
import { CV_DATA } from '../data/cvData';

interface BentoOverviewProps {
  darkMode: boolean;
}

export const BentoOverview: React.FC<BentoOverviewProps> = ({ darkMode }) => {
  return (
    <section id="overview" className="py-16 md:py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-left mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-500 mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Executive Overview</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            darkMode ? 'text-white' : 'text-slate-950'
          }`}>
            Strategic Leadership & Domain Impact
          </h2>
          <p className={`mt-2 text-base max-w-2xl ${
            darkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Synthesizing over two decades of public policy execution, military engineering education, and institutional turnaround.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Bento Card 1 (Span 8): Present Landmark Government Reform */}
          <div className="md:col-span-8 framer-card p-6 sm:p-8 flex flex-col justify-between text-left">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-amber-500 uppercase tracking-wider">
                      Current Appointment · 20 April 2026 – Present
                    </span>
                    <h3 className={`text-xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      Project Manager — 2,000 Govt Schools Reform
                    </h3>
                  </div>
                </div>
                <span className={`hidden sm:inline-flex text-xs px-2.5 py-1 rounded-full font-medium ${
                  darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
                }`}>
                  PIU Khyber Pakhtunkhwa
                </span>
              </div>

              <p className={`text-sm leading-relaxed mb-6 ${
                darkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Directing the provincial outsourcing initiative for 2,000 low-performing government schools, driving measurable learning outcomes, enrollment expansion, and public-private operational governance.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className={`p-3 rounded-xl border ${
                  darkMode ? 'bg-slate-900/60 border-white/5' : 'bg-slate-50 border-slate-200/80'
                }`}>
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-500 mb-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Enrollment Drive</span>
                  </div>
                  <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Active community mobilization to eliminate dropouts.
                  </p>
                </div>

                <div className={`p-3 rounded-xl border ${
                  darkMode ? 'bg-slate-900/60 border-white/5' : 'bg-slate-50 border-slate-200/80'
                }`}>
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-500 mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Learning SLAs</span>
                  </div>
                  <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Standardized diagnostic assessments across 2,000 schools.
                  </p>
                </div>

                <div className={`p-3 rounded-xl border ${
                  darkMode ? 'bg-slate-900/60 border-white/5' : 'bg-slate-50 border-slate-200/80'
                }`}>
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-500 mb-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>SLA Governance</span>
                  </div>
                  <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Transparent audit & verification frameworks.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-slate-800/40 flex items-center justify-between text-xs">
              <span className={darkMode ? 'text-slate-500' : 'text-slate-400'}>
                Elementary & Secondary Education Department
              </span>
              <a href="#experience" className="text-amber-500 hover:text-amber-400 font-medium inline-flex items-center gap-1 group">
                <span>View Full Details</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* Bento Card 2 (Span 4): Military Aviation Instruction */}
          <div className="md:col-span-4 framer-card p-6 sm:p-8 flex flex-col justify-between text-left">
            <div>
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-4">
                <Plane className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-amber-500 uppercase tracking-wider">
                17.75 Years Tenure
              </span>
              <h3 className={`text-xl font-bold tracking-tight mt-1 mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                CAE NUST / PAF Academy
              </h3>
              <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Assistant Professor of Avionics & Embedded Systems. Trained Pakistan Air Force, Army Aviation, Naval Air Arm, plus Royal Saudi and Jordanian cadet officers.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/40">
              <div className="flex flex-wrap gap-1.5">
                <span className={`text-[11px] px-2 py-0.5 rounded-md ${
                  darkMode ? 'bg-slate-800/80 text-slate-300' : 'bg-slate-100 text-slate-700'
                }`}>
                  MIL-STD-1553 Bus
                </span>
                <span className={`text-[11px] px-2 py-0.5 rounded-md ${
                  darkMode ? 'bg-slate-800/80 text-slate-300' : 'bg-slate-100 text-slate-700'
                }`}>
                  Radar DSP
                </span>
                <span className={`text-[11px] px-2 py-0.5 rounded-md ${
                  darkMode ? 'bg-slate-800/80 text-slate-300' : 'bg-slate-100 text-slate-700'
                }`}>
                  FPGA / Verilog
                </span>
              </div>
            </div>
          </div>

          {/* Bento Card 3 (Span 4): Institutional Turnaround & STEM */}
          <div className="md:col-span-4 framer-card p-6 sm:p-8 flex flex-col justify-between text-left">
            <div>
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-4">
                <Landmark className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-amber-500 uppercase tracking-wider">
                Principal (BPS-20)
              </span>
              <h3 className={`text-xl font-bold tracking-tight mt-1 mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Swabi Model College
              </h3>
              <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Turnaround leader: established hands-on Robotics & AI laboratories, instituted KPI-based faculty evaluations, and restored board examination excellence.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/40 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-amber-500" />
              <span className={`text-xs font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Robotics & AI Lab Founder
              </span>
            </div>
          </div>

          {/* Bento Card 4 (Span 8): Academic Credentials & Quality Accreditations */}
          <div className="md:col-span-8 framer-card p-6 sm:p-8 flex flex-col justify-between text-left">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-amber-500 uppercase tracking-wider">
                    Distinction & Quality Accreditations
                  </span>
                  <h3 className={`text-xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    UK Postgraduate Credentials & Standards Compliance
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className={`p-4 rounded-xl border ${
                  darkMode ? 'bg-slate-900/50 border-white/5' : 'bg-slate-50 border-slate-200/80'
                }`}>
                  <p className="text-xs font-bold text-amber-500">Univ. of Southampton, UK</p>
                  <p className={`text-sm font-semibold mt-0.5 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    M.Sc. Microelectronics Systems Design
                  </p>
                  <p className={`text-xs mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Advanced System-on-Chip (SoC), VLSI, and digital signal architectures.
                  </p>
                </div>

                <div className={`p-4 rounded-xl border ${
                  darkMode ? 'bg-slate-900/50 border-white/5' : 'bg-slate-50 border-slate-200/80'
                }`}>
                  <p className="text-xs font-bold text-amber-500">Academic & Audit Standards</p>
                  <p className={`text-sm font-semibold mt-0.5 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    ISO 9001 Lead Auditor · OBE (PEC)
                  </p>
                  <p className={`text-xs mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Washington Accord compliance, CLO-PLO mapping, and quality assurance.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800/40 flex items-center justify-between text-xs">
              <span className={darkMode ? 'text-slate-500' : 'text-slate-400'}>
                2nd Position Gold Medalist — University of Peshawar
              </span>
              <a href="#education" className="text-amber-500 hover:text-amber-400 font-medium inline-flex items-center gap-1 group">
                <span>View Full Credentials</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
