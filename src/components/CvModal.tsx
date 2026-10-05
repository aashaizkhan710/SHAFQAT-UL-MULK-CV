import React from 'react';
import { X, Printer, Download, Mail, Phone, Award, CheckCircle2 } from 'lucide-react';
import { CV_DATA } from '../data/cvData';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose, darkMode }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex justify-center p-3 sm:p-6 print:p-0 print:bg-white">
      {/* Modal Card */}
      <div
        className={`relative w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden my-auto border flex flex-col ${
          darkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
        } print:border-none print:shadow-none print:m-0 print:w-full print:text-black`}
      >
        {/* Top Control Bar (Hidden during printing) */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
              Official Executive Curriculum Vitae
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 transition-colors shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable CV Content Document */}
        <div className="p-6 sm:p-10 space-y-8 print:p-0 print:space-y-6">
          {/* Header Block */}
          <div className="border-b-2 border-slate-700 pb-6 print:border-black flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h1
                className="text-3xl sm:text-4xl font-extrabold tracking-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {CV_DATA.personal.name}
              </h1>
              <p className="text-sm sm:text-base font-semibold text-amber-500 print:text-slate-800 mt-1">
                {CV_DATA.personal.title}
              </p>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-slate-400 print:text-slate-700 mt-3">
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-amber-500" />
                  {CV_DATA.personal.phone}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-amber-500" />
                  {CV_DATA.personal.email}
                </span>
                <span>·</span>
                <span>Nationality: {CV_DATA.personal.nationality}</span>
              </div>
            </div>

            <div className="w-24 h-32 rounded-xl overflow-hidden border border-slate-700 print:border-slate-400 shrink-0 shadow-md">
              <img
                src="/images/shafqat_portrait.jpg"
                alt="Professor Shafqat Ul Mulk"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Executive Summary */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-amber-500 print:text-black mb-2">
              Executive Profile
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-300 print:text-black">
              {CV_DATA.personal.extendedBio}
            </p>
          </div>

          {/* Present Role Highlight */}
          <div className="p-4 rounded-xl border border-amber-500/40 bg-amber-500/5 print:border-black print:bg-transparent">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-amber-400 print:text-black">
                {CV_DATA.presentRole.title} — {CV_DATA.presentRole.unit}
              </h3>
              <span className="text-xs font-mono font-bold text-amber-500 print:text-black">
                {CV_DATA.presentRole.appointedDate}
              </span>
            </div>
            <p className="text-xs font-medium text-slate-300 print:text-black">
              {CV_DATA.presentRole.project} ({CV_DATA.presentRole.scale})
            </p>
            <p className="text-xs text-slate-400 print:text-black mt-2 leading-relaxed">
              {CV_DATA.presentRole.description}
            </p>
          </div>

          {/* Professional Experience */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-amber-500 print:text-black border-b border-slate-800 print:border-black pb-1">
              Career History
            </h2>

            {CV_DATA.experiences.map((exp) => (
              <div key={exp.id} className="space-y-1.5 text-xs sm:text-sm">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <h3 className="font-bold text-base text-slate-100 print:text-black">
                    {exp.role} <span className="font-normal text-slate-400 print:text-slate-700">at {exp.organization}</span>
                  </h3>
                  <span className="font-mono text-xs font-bold text-amber-500 print:text-black">
                    {exp.period}
                  </span>
                </div>
                {exp.department && (
                  <p className="text-xs text-amber-400/90 print:text-slate-800 font-medium">
                    {exp.department} — {exp.location}
                  </p>
                )}
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 print:text-black pt-1">
                  {exp.highlights.slice(0, 4).map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Education, Certifications & Honors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-amber-500 print:text-black border-b border-slate-800 print:border-black pb-1 mb-3">
                Education
              </h2>
              <div className="space-y-3 text-xs">
                {CV_DATA.education.map((edu, idx) => (
                  <div key={idx}>
                    <p className="font-bold text-slate-200 print:text-black">
                      {edu.degree} — {edu.field}
                    </p>
                    <p className="text-slate-400 print:text-slate-700">
                      {edu.institution}, {edu.location} ({edu.year})
                    </p>
                    {edu.honors && (
                      <p className="text-amber-400 print:text-black font-semibold">
                        {edu.honors}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-amber-500 print:text-black border-b border-slate-800 print:border-black pb-1 mb-3">
                Certifications
              </h2>
              <div className="space-y-3 text-xs">
                {CV_DATA.certifications.map((cert, idx) => (
                  <div key={idx}>
                    <p className="font-bold text-slate-200 print:text-black">
                      {cert.title}
                    </p>
                    <p className="text-slate-400 print:text-slate-700">
                      {cert.issuer} ({cert.year})
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Honors & Awards */}
          <div className="pt-2 border-t border-slate-800 print:border-black">
            <h2 className="text-xs font-bold uppercase tracking-wider text-amber-500 print:text-black border-b border-slate-800 print:border-black pb-1 mb-3">
              Honors & Official Awards
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {CV_DATA.honorsAndAwards.map((item) => (
                <div key={item.id} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 print:border-slate-300">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="font-bold text-slate-200 print:text-black">{item.title}</p>
                    <span className="text-[10px] font-bold text-amber-400 print:text-black font-mono shrink-0">{item.badge}</span>
                  </div>
                  <p className="text-[11px] text-amber-400/90 print:text-slate-700">{item.issuer}</p>
                  <p className="text-[11px] text-slate-400 print:text-slate-800 mt-1">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills & Languages */}
          <div className="pt-2 border-t border-slate-800 print:border-black">
            <h2 className="text-xs font-bold uppercase tracking-wider text-amber-500 print:text-black mb-2">
              Technical Expertise & Languages
            </h2>
            <p className="text-xs text-slate-300 print:text-black leading-relaxed">
              <strong>Technical:</strong> {CV_DATA.technicalExpertise.map(t => t.name).join(', ')}.
            </p>
            <p className="text-xs text-slate-300 print:text-black leading-relaxed mt-1">
              <strong>Languages:</strong> English (Fluent), Urdu (Native), Pashto (Native), Arabic (Basic, Improving).
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/70 flex justify-between items-center no-print text-xs text-slate-400">
          <span>Professor Shafqat-ul-Mulk · Verified Executive Curriculum Vitae</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
