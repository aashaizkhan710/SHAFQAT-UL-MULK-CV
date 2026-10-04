import React from 'react';
import { BookOpen, Users, Award, Plane, CheckCircle2, Cpu, Compass } from 'lucide-react';
import { CV_DATA } from '../data/cvData';

interface TeachingSectionProps {
  darkMode: boolean;
}

export const TeachingSection: React.FC<TeachingSectionProps> = ({ darkMode }) => {
  const coursesTaught = [
    { title: 'Avionics Embedded Systems', desc: 'Hardware architecture, mission computer bus protocols, and real-time controller firmware.' },
    { title: 'FPGA Architecture & Verilog HDL', desc: 'Hardware Description Languages, behavioral synthesis, testbenches, and physical FPGA deployment.' },
    { title: 'MIL-STD-1553 Avionics Data Bus', desc: 'Multiplex data bus command/response architecture, bus controllers, remote terminals, and bus analyzers.' },
    { title: 'Radar Digital Signal Processing', desc: 'Doppler filtering, clutter rejection, matched filters, and digital waveform synthesis.' },
    { title: 'Microelectronics & Systems Design', desc: 'System-on-Chip (SoC) architectures, high-density VLSI layouts, and EDA tool validation.' },
    { title: 'Digital Logic & Computer Architecture', desc: 'Combinational/sequential logic, ALU design, processor datapath, and memory hierarchy.' },
    { title: 'Electronic Circuit Analysis', desc: 'Active/passive network analysis, semiconductor biasing, frequency response, and operational amplifiers.' }
  ];

  return (
    <section id="teaching" className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-500 mb-2">
            Pedagogy & Faculty Leadership
          </div>
          <h2
            className={`text-3xl sm:text-4xl font-black tracking-tight ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Teaching & Academic Contribution
          </h2>
          <p
            className={`text-sm sm:text-base max-w-2xl mt-2 ${
              darkMode ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            17.75 years of specialized aerospace and avionics engineering instruction at the College of Aeronautical Engineering, NUST, within the Pakistan Air Force Academy Asghar Khan.
          </p>
          <div className="w-16 h-1 bg-amber-500 mt-3 rounded-full" />
        </div>

        {/* 3 Overview Bulky 3D Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bulky-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Plane className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Tri-Services & Allied Cadets</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Trained Pakistan Air Force, Army Aviation, and Naval Air Arm officers, alongside allied international trainees from the Royal Saudi Air Force and Royal Jordanian Air Force.
            </p>
          </div>

          <div className="bulky-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">50+ Defense FYPs Supervised</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Supervised over fifty defense-critical capstone engineering projects spanning real-time embedded radar signal tracking, FPGA flight-data telemetry, and MIL-STD-1553 analyzers.
            </p>
          </div>

          <div className="bulky-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Curriculum & OBE Alignment</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Member of the CAE NUST Curriculum Review Committee; formulated Course Learning Outcome (CLO) rubrics compliant with the Washington Accord Level-II standards.
            </p>
          </div>
        </div>

        {/* Courses Taught Grid (Bulky 3D Points) */}
        <div>
          <h3 className={`text-xl font-bold tracking-tight mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            <BookOpen className="w-5 h-5 text-amber-400" />
            <span>Undergraduate & Postgraduate Engineering Courses Delivered</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {coursesTaught.map((course, idx) => (
              <div key={idx} className="bulky-point cursor-pointer">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{course.title}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {course.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
