import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  FileText,
  Mail,
  Phone,
  Camera,
  Upload,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { CV_DATA } from '../data/cvData';
import { WhatsAppIcon } from './icons/BrandIcons';
import defaultPortrait from '../assets/images/shafqat_portrait.jpg';

interface HeroSectionProps {
  darkMode: boolean;
  onOpenCvModal: () => void;
  onOpenAiAssistant?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  darkMode,
  onOpenCvModal,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [portraitSrc, setPortraitSrc] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('shafqat_custom_portrait');
        if (saved && saved.startsWith('data:image/')) return saved;
      } catch {
        // ignore localStorage error
      }
    }
    return defaultPortrait;
  });

  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleImageError = () => {
    if (portraitSrc !== defaultPortrait) {
      setPortraitSrc(defaultPortrait);
    }
  };

  const handleFileProcess = async (file: File) => {
    if (!file || !file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, JPG, or JPEG).');
      return;
    }

    setIsUploading(true);

    const reader = new FileReader();
    reader.onload = async () => {
      const base64Data = reader.result as string;

      // 1. Immediately update UI state & localStorage
      setPortraitSrc(base64Data);
      try {
        localStorage.setItem('shafqat_custom_portrait', base64Data);
      } catch (e) {
        console.warn('localStorage full, skipping local cache', e);
      }

      // 2. Persist to server backend permanently
      try {
        const res = await fetch('/api/upload-photo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64Data })
        });
        if (res.ok) {
          setUploadSuccess(true);
          setTimeout(() => setUploadSuccess(false), 4000);
        }
      } catch (err) {
        console.error('Server save error:', err);
      } finally {
        setIsUploading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileProcess(files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  return (
    <section id="hero" className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Hidden native file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleInputChange}
        accept="image/*"
        className="hidden"
        aria-label="Upload official picture"
      />

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

          {/* Right Column: High-Res Portrait with Drag-and-Drop & Instant File Upload */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
            <div className="relative group max-w-[340px] sm:max-w-[380px] w-full">
              
              {/* Soft Ambient Warm Glow Behind Card */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-amber-500/25 via-amber-400/15 to-transparent rounded-[2.5rem] blur-2xl opacity-70 group-hover:opacity-100 transition duration-700 -z-10" />

              {/* Framed Portrait Container with Drag & Drop */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`relative rounded-3xl overflow-hidden border p-2.5 transition-all duration-300 ${
                  isDragging
                    ? 'border-amber-400 ring-4 ring-amber-400/30 scale-[1.02]'
                    : darkMode
                    ? 'bg-slate-900/90 border-white/10 shadow-2xl shadow-black/80'
                    : 'bg-white border-slate-200 shadow-xl'
                }`}
              >
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-950 shadow-inner group/photo">
                  <img
                    src={portraitSrc}
                    alt="Professor Shafqat Ul Mulk"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/photo:scale-[1.02]"
                    loading="eager"
                    decoding="sync"
                    onError={handleImageError}
                  />

                  {/* Drag and Drop Active Overlay */}
                  {isDragging && (
                    <div className="absolute inset-0 bg-amber-500/80 backdrop-blur-sm flex flex-col items-center justify-center text-slate-950 font-bold p-4 z-20">
                      <Upload className="w-10 h-10 mb-2 animate-bounce" />
                      <p className="text-sm">Drop photo here to set permanently!</p>
                    </div>
                  )}

                  {/* Uploading Spinner Overlay */}
                  {isUploading && (
                    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center text-amber-400 font-bold p-4 z-20">
                      <RefreshCw className="w-8 h-8 mb-2 animate-spin" />
                      <p className="text-xs">Saving photo permanently...</p>
                    </div>
                  )}

                  {/* Instant Upload Button Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                    >
                      <Camera className="w-4 h-4" />
                      <span>Upload Your Exact Photo (bababa.png)</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Status Banner when photo is updated */}
              {uploadSuccess && (
                <div className="mt-3 p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-semibold flex items-center justify-center gap-2 shadow-md">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Exact photo saved permanently to website!</span>
                </div>
              )}

              {/* Direct 1-Click Upload Bar beneath photo */}
              <div className="mt-3 flex items-center justify-between w-full px-1">
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Drag & drop photo or click:
                </span>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs font-bold text-amber-500 hover:text-amber-400 inline-flex items-center gap-1.5 py-1 px-2.5 rounded-lg border border-amber-500/30 hover:border-amber-500/60 bg-amber-500/10 transition-colors cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Choose Photo File</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
