import React from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  FileText,
  Mail,
  Phone
} from 'lucide-react';
import { CV_DATA } from '../data/cvData';
import { WhatsAppIcon } from './icons/BrandIcons';

interface HeroSectionProps {
  darkMode: boolean;
  onOpenCvModal: () => void;
  onOpenAiAssistant?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  darkMode,
  onOpenCvModal,
}) => {
  return (
    <section id="hero" className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Subtle ambient light glow */}
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[500px] h-[400px] bg-amber-500/10 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
            
            {/* Live Availability Status */}
            <div
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-medium w-fit border backdrop-blur-md shadow-sm"
              style={{
                backgroundColor: darkMode ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.12)',
                borderColor: darkMode ? 'rgba(16, 185, 129, 0.25)' : 'rgba(16, 185, 129, 0.35)',
                color: darkMode ? '#34d399' : '#059669',
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for Advisory & Leadership</span>
            </div>

            {/* Name - Bold & Striking */}
            <div className="space-y-3">
              <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] ${
                darkMode ? 'text-white' : 'text-slate-950'
              }`}>
                Shafqat Ul Mulk
              </h1>
              
              {/* What They Do */}
              <p className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                Executive Academic Leader & Project Manager
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <a
                href="#experience"
                className="framer-btn-primary group cursor-pointer shadow-lg shadow-amber-500/20"
              >
                <span>View Milestones</span>
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              </a>

              <button
                onClick={onOpenCvModal}
                className="framer-btn-secondary group cursor-pointer"
              >
                <FileText className="w-4 h-4 text-amber-500" />
                <span>Download CV</span>
              </button>

              <a
                href="#connect"
                className="framer-btn-secondary group cursor-pointer"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* Animated Social Icons Row */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={CV_DATA.personal.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="framer-social-btn group cursor-pointer"
                title="Connect on LinkedIn"
              >
                <svg className="w-4 h-4 transition-all duration-300 group-hover:scale-125 group-hover:text-[#0A66C2] fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.66 1.66 0 0 0-1.66 1.66 1.66 1.66 0 0 0 1.66 1.67 1.66 1.66 0 0 0 1.66-1.67c0-.92-.74-1.66-1.66-1.66Z" />
                </svg>
              </a>

              <a
                href={CV_DATA.personal.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Direct WhatsApp Message"
                className="framer-social-btn group cursor-pointer"
                title="Chat on WhatsApp (+92 323 9215615)"
              >
                <div className="transition-all duration-300 group-hover:scale-125 group-hover:text-emerald-500">
                  <WhatsAppIcon className="w-4 h-4" />
                </div>
              </a>

              <a
                href={`mailto:${CV_DATA.personal.email}`}
                aria-label="Direct Email"
                className="framer-social-btn group cursor-pointer"
                title={`Email: ${CV_DATA.personal.email}`}
              >
                <Mail className="w-4 h-4 transition-all duration-300 group-hover:scale-125 group-hover:text-amber-400" />
              </a>

              <a
                href={`tel:${CV_DATA.personal.phone}`}
                aria-label="Direct Call"
                className="framer-social-btn group cursor-pointer"
                title={`Call: ${CV_DATA.personal.phone}`}
              >
                <Phone className="w-4 h-4 transition-all duration-300 group-hover:scale-125 group-hover:text-sky-400" />
              </a>
            </div>

          </div>

          {/* Right Column: High-Res Portrait */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
            <div className="relative group max-w-[340px] sm:max-w-[380px] w-full">
              
              {/* Soft Ambient Warm Glow Behind Card */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-amber-500/25 via-amber-400/15 to-transparent rounded-[2.5rem] blur-2xl opacity-70 group-hover:opacity-100 transition duration-700 -z-10" />

              {/* Framed Portrait Container */}
              <div
                className={`relative rounded-3xl overflow-hidden border p-2.5 transition-all duration-300 ${
                  darkMode
                    ? 'bg-slate-900/90 border-white/10 shadow-2xl shadow-black/80'
                    : 'bg-white border-slate-200 shadow-xl'
                }`}
              >
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-950 shadow-inner group/photo">
                  <img
                    src={`${import.meta.env.BASE_URL}images/shafqat_portrait.jpg`}
                    alt="Professor Shafqat Ul Mulk"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/photo:scale-[1.02]"
                    loading="eager"
                    decoding="sync"
                  />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
