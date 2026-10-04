import React from 'react';
import { ArrowUp, FileText, Mail, Phone, MapPin, ShieldCheck, Heart } from 'lucide-react';
import { CV_DATA } from '../data/cvData';
import { WhatsAppIcon } from './icons/BrandIcons';

interface FooterProps {
  darkMode: boolean;
  onOpenCvModal: () => void;
  onOpenShare?: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  darkMode,
  onOpenCvModal,
  onOpenAdmin,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className={`border-t relative z-10 transition-colors ${
        darkMode ? 'bg-slate-950/90 border-white/10 text-slate-400' : 'bg-slate-900 border-slate-800 text-slate-300'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Identity */}
          <div className="md:col-span-6 space-y-3 text-left">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center font-bold text-slate-950 text-xs shadow-md">
                SM
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight text-white">
                  Shafqat Ul Mulk
                </h3>
                <p className="text-xs text-amber-400 font-medium">
                  Executive Academic Leader & Project Manager
                </p>
              </div>
            </div>

            <p className="text-xs leading-relaxed max-w-md text-slate-400">
              Directing large-scale public school outsourcing interventions and shaping engineering excellence through 25+ years of verified service across NUST, PAF Academy, and institutional governance.
            </p>

            <div className="flex items-center gap-2 pt-1 text-xs text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Official & Verified Executive Curriculum Vitae</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2 text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Navigation
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href="#hero" className="hover:text-amber-400 transition-colors">Hero Overview</a>
              </li>
              <li>
                <a href="#overview" className="hover:text-amber-400 transition-colors">Strategic Impact</a>
              </li>
              <li>
                <a href="#experience" className="hover:text-amber-400 transition-colors">Career Appointments</a>
              </li>
              <li>
                <a href="#education" className="hover:text-amber-400 transition-colors">Education & Credentials</a>
              </li>
              <li>
                <a href="#connect" className="hover:text-amber-400 transition-colors">Connect & Inquiries</a>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="md:col-span-3 space-y-2 text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Direct Contact
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href={`mailto:${CV_DATA.personal.email}`}
                  className="hover:text-amber-400 transition-colors flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-500" />
                  <span>{CV_DATA.personal.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={CV_DATA.personal.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-2"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{CV_DATA.personal.phone}</span>
                </a>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                <span>Nowshera / Swabi, Pakistan</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Professor Shafqat-ul-Mulk. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenCvModal}
              className="text-xs text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
            >
              Print CV
            </button>
            <span>·</span>
            <button
              onClick={onOpenAdmin}
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
            >
              Portal Login
            </button>
            <span>·</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Back to Top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
