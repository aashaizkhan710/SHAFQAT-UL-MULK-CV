import React from 'react';
import { FileText, Download, Printer, Eye, CheckCircle2 } from 'lucide-react';
import { CV_DATA } from '../data/cvData';

interface DownloadCvSectionProps {
  darkMode: boolean;
  onOpenCvModal: () => void;
}

export const DownloadCvSection: React.FC<DownloadCvSectionProps> = ({
  darkMode,
  onOpenCvModal,
}) => {
  const STATIC_CV_URL = '/Shafqat_Ul_Mulk_Executive_CV.html';

  const handlePrintCv = () => {
    onOpenCvModal();
  };

  return (
    <section id="download-cv" className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bulky-card p-8 sm:p-12 relative overflow-hidden">
          {/* Subtle gold decorative glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-500">
              <FileText className="w-4 h-4" />
              <span>Official Academic Curriculum Vitae</span>
            </div>

            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Academic Curriculum Vitae
            </h2>

            <p
              className={`text-base sm:text-lg leading-relaxed ${
                darkMode ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              Access the complete, verified curriculum vitae of Professor Shafqat-ul-Mulk detailing 25+ years of academic appointments, military aeronautical engineering pedagogy at CAE NUST, university honors, and provincial school reform leadership.
            </p>

            {/* Bulky 3D Feature Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="bulky-point flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Comprehensive 25+ Year Academic Service Record</span>
              </div>
              <div className="bulky-point flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>University of Southampton MS Microelectronics</span>
              </div>
              <div className="bulky-point flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>CAE NUST & Tri-Services Teaching Credentials</span>
              </div>
              <div className="bulky-point flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>ISO 9001 & PEC Outcome-Based Education Accreditations</span>
              </div>
            </div>

            {/* Bulky 3D Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              {/* Interactive View & Print Modal Button */}
              <button
                onClick={onOpenCvModal}
                className="bulky-btn-amber inline-flex items-center gap-2.5 px-6 py-3.5 text-sm cursor-pointer whitespace-nowrap"
              >
                <Eye className="w-4 h-4" />
                <span>View Official CV Online</span>
              </button>

              {/* Direct Download Official File */}
              <a
                href={STATIC_CV_URL}
                download="Shafqat_Ul_Mulk_Executive_CV.html"
                className="bulky-btn-slate inline-flex items-center gap-2 px-5 py-3.5 text-sm cursor-pointer whitespace-nowrap"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>Download CV (PDF Format)</span>
              </a>

              {/* Print to PDF Trigger */}
              <button
                onClick={handlePrintCv}
                className="bulky-point inline-flex items-center gap-2 px-5 py-3 text-sm font-bold cursor-pointer whitespace-nowrap text-slate-300 hover:text-white"
              >
                <Printer className="w-4 h-4 text-amber-400" />
                <span>Print Official Copy</span>
              </button>
            </div>

            <p className="text-xs text-slate-500 pt-1">
              * Structured according to international higher education, PEC, and HEC academic standards.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
