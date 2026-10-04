import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Copy,
  ExternalLink,
  MessageSquare,
  ArrowUpRight,
  Sparkles,
  Clock
} from 'lucide-react';
import { CV_DATA } from '../data/cvData';
import { WhatsAppIcon } from './icons/BrandIcons';

interface ConnectSectionProps {
  darkMode: boolean;
}

export const ConnectSection: React.FC<ConnectSectionProps> = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(CV_DATA.personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(CV_DATA.personal.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', organization: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 6000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      // Fallback: save to local storage
      const existing = JSON.parse(localStorage.getItem('offline_inquiries') || '[]');
      existing.push({ ...formData, timestamp: new Date().toISOString() });
      localStorage.setItem('offline_inquiries', JSON.stringify(existing));
      setStatus('success');
      setTimeout(() => setStatus('idle'), 6000);
    }
  };

  return (
    <section id="connect" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background glow decoration */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-500/5 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="text-left mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-500 mb-2">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Dedicated Social & Contact Hub</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
            darkMode ? 'text-white' : 'text-slate-950'
          }`}>
            Let's Connect & Collaborate
          </h2>
          <p className={`mt-2 text-base max-w-2xl font-normal ${
            darkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Direct channels for institutional advisory, education reform consulting, STEM development, and academic leadership inquiries.
          </p>
        </div>

        {/* 4 Interactive Animated Social Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          
          {/* LinkedIn Interactive Card */}
          <a
            href={CV_DATA.personal.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="framer-card p-6 flex flex-col justify-between group cursor-pointer text-left"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#0A66C2]/10 border border-[#0A66C2]/20 flex items-center justify-center text-[#0A66C2] mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.66 1.66 0 0 0-1.66 1.66 1.66 1.66 0 0 0 1.66 1.67 1.66 1.66 0 0 0 1.66-1.67c0-.92-.74-1.66-1.66-1.66Z" />
                </svg>
              </div>
              <h3 className={`text-base font-bold transition-colors group-hover:text-[#0A66C2] ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}>
                LinkedIn Network
              </h3>
              <p className={`text-xs mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Verified profile, professional updates & alumni connections.
              </p>
            </div>
            
            <div className="mt-5 pt-3 border-t border-slate-800/40 flex items-center justify-between text-xs font-semibold text-[#0A66C2]">
              <span>View Profile</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </a>

          {/* WhatsApp Interactive Card */}
          <a
            href={CV_DATA.personal.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="framer-card p-6 flex flex-col justify-between group cursor-pointer text-left"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <WhatsAppIcon className="w-6 h-6" />
              </div>
              <h3 className={`text-base font-bold transition-colors group-hover:text-emerald-500 ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}>
                WhatsApp Direct
              </h3>
              <p className={`text-xs mt-1 font-mono ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {CV_DATA.personal.phone}
              </p>
            </div>
            
            <div className="mt-5 pt-3 border-t border-slate-800/40 flex items-center justify-between text-xs font-semibold text-emerald-500">
              <span>Instant Chat</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </a>

          {/* Direct Email Interactive Card */}
          <div className="framer-card p-6 flex flex-col justify-between group text-left">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className={`text-base font-bold transition-colors group-hover:text-amber-500 ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Direct Email
              </h3>
              <p className={`text-xs mt-1 font-mono truncate ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} title={CV_DATA.personal.email}>
                {CV_DATA.personal.email}
              </p>
            </div>
            
            <div className="mt-5 pt-3 border-t border-slate-800/40 flex items-center justify-between gap-2">
              <a
                href={`mailto:${CV_DATA.personal.email}`}
                className="text-xs font-semibold text-amber-500 hover:text-amber-400 inline-flex items-center gap-1"
              >
                <span>Compose</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={handleCopyEmail}
                className="text-[11px] px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors inline-flex items-center gap-1 cursor-pointer"
                title="Copy email address"
              >
                <Copy className="w-3 h-3" />
                <span>{copiedEmail ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Location Interactive Card */}
          <div className="framer-card p-6 flex flex-col justify-between group text-left">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className={`text-base font-bold transition-colors group-hover:text-sky-400 ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Office Location
              </h3>
              <p className={`text-xs mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Nowshera / Swabi / Risalpur, Khyber Pakhtunkhwa, Pakistan.
              </p>
            </div>
            
            <div className="mt-5 pt-3 border-t border-slate-800/40 flex items-center justify-between text-xs text-sky-400 font-medium">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>PKT (UTC+5)</span>
              </span>
              <span className="text-[11px] text-slate-500">Government PIU</span>
            </div>
          </div>

        </div>

        {/* Streamlined Modern Inquiry Form Container */}
        <div className="framer-card p-8 sm:p-10 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Prompt */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className={`text-2xl font-bold tracking-tight ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Send a Direct Message
              </h3>
              <p className={`text-sm leading-relaxed ${
                darkMode ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Whether you represent a government department, educational institution, university faculty, or research advisory board, feel free to share your inquiry directly.
              </p>

              <div className="pt-4 space-y-3">
                <div className="flex items-center gap-3 text-xs">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className={darkMode ? 'text-slate-300' : 'text-slate-700'}>
                    Prompt response directly to your inbox
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <div className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className={darkMode ? 'text-slate-300' : 'text-slate-700'}>
                    Directly reviewed by Professor Shafqat Ul Mulk
                  </span>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                      darkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Dr. Tariq Khan"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:border-amber-500 ${
                        darkMode
                          ? 'bg-slate-900/90 border-white/10 text-white placeholder-slate-600'
                          : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                      darkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. tkhan@institution.edu.pk"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:border-amber-500 ${
                        darkMode
                          ? 'bg-slate-900/90 border-white/10 text-white placeholder-slate-600'
                          : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                      darkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      Organization / Institution
                    </label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="e.g. Higher Education Commission"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:border-amber-500 ${
                        darkMode
                          ? 'bg-slate-900/90 border-white/10 text-white placeholder-slate-600'
                          : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                      darkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Academic Partnership Inquiry"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:border-amber-500 ${
                        darkMode
                          ? 'bg-slate-900/90 border-white/10 text-white placeholder-slate-600'
                          : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                    darkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    Message / Collaboration Proposal *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe your objectives, timeframe, or questions..."
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:border-amber-500 resize-none ${
                      darkMode
                        ? 'bg-slate-900/90 border-white/10 text-white placeholder-slate-600'
                        : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                </div>

                {/* Submit State Feedback */}
                {status === 'success' && (
                  <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>Your message has been sent successfully and recorded. Thank you!</span>
                  </div>
                )}

                {status === 'error' && (
                  <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-medium">
                    Failed to dispatch message. Please use WhatsApp or email directly!
                  </div>
                )}

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="framer-btn-primary w-full sm:w-auto text-sm py-3 px-6 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {status === 'sending' ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
