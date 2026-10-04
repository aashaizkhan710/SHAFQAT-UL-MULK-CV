import React, { useState } from 'react';
import { Mail, Phone, Copy, Check, MessageCircle, ChevronUp, ChevronDown, ExternalLink } from 'lucide-react';
import { WhatsAppIcon, GmailIcon } from './icons/BrandIcons';
import { CV_DATA } from '../data/cvData';

interface FloatingContactWidgetProps {
  darkMode: boolean;
}

export const FloatingContactWidget: React.FC<FloatingContactWidgetProps> = ({ darkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedType, setCopiedType] = useState<'whatsapp' | 'email' | null>(null);

  const copyToClipboard = (text: string, type: 'whatsapp' | 'email') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => {
      setCopiedType(null);
    }, 2500);
  };

  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    CV_DATA.personal.email
  )}&su=${encodeURIComponent('Academic & Professional Collaboration - Prof. Shafqat-ul-Mulk')}`;

  const defaultMailtoUrl = `mailto:${CV_DATA.personal.email}?subject=${encodeURIComponent(
    'Academic & Professional Collaboration - Prof. Shafqat-ul-Mulk'
  )}`;

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start select-none">
      {/* Expanded Quick Connect Menu */}
      {isOpen && (
        <div
          className={`mb-3 w-80 p-4 rounded-2xl border shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-3 duration-200 ${
            darkMode
              ? 'bg-slate-900/95 border-slate-700 text-white shadow-black/60'
              : 'bg-white/95 border-slate-200 text-slate-900 shadow-xl'
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/40">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-500">
                Direct Contact
              </div>
              <h4 className="text-sm font-bold">Connect with Prof. Shafqat</h4>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-200 p-1 rounded-lg text-xs"
              title="Close menu"
            >
              ✕
            </button>
          </div>

          <div className="space-y-3 pt-3">
            {/* 1. WhatsApp Instant Action */}
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/40 transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <WhatsAppIcon className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-emerald-400">WhatsApp</div>
                    <div className="text-[11px] text-slate-300 font-mono">{CV_DATA.personal.phone}</div>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard('+923239215615', 'whatsapp')}
                  className="text-[10px] font-semibold px-2 py-1 rounded bg-slate-800 text-slate-300 hover:text-white flex items-center gap-1 border border-slate-700"
                  title="Copy Phone Number"
                >
                  {copiedType === 'whatsapp' ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <a
                href={CV_DATA.personal.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                <span>Chat on WhatsApp</span>
                <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
              </a>
            </div>

            {/* 2. Gmail Direct Compose */}
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 hover:border-red-500/40 transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm border border-slate-200">
                    <GmailIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-red-400">Google Gmail</div>
                    <div className="text-[11px] text-slate-300 font-mono truncate max-w-[140px]">{CV_DATA.personal.email}</div>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(CV_DATA.personal.email, 'email')}
                  className="text-[10px] font-semibold px-2 py-1 rounded bg-slate-800 text-slate-300 hover:text-white flex items-center gap-1 border border-slate-700"
                  title="Copy Email Address"
                >
                  {copiedType === 'email' ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={gmailComposeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1.5 px-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center justify-center gap-1 transition-colors text-center"
                >
                  <GmailIcon className="w-3 h-3" />
                  <span>Open Gmail</span>
                </a>
                <a
                  href={defaultMailtoUrl}
                  className="py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-1 transition-colors border border-slate-700 text-center"
                >
                  <Mail className="w-3 h-3 text-amber-400" />
                  <span>Default Mail</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Trigger Button / Pill */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bulky-btn-amber flex items-center gap-2 px-3.5 py-2.5 rounded-2xl shadow-2xl cursor-pointer group"
          title="Direct Contact via WhatsApp & Gmail"
          aria-expanded={isOpen}
        >
          <div className="flex items-center -space-x-1.5">
            <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
              <WhatsAppIcon className="w-3 h-3 fill-current" />
            </span>
            <span className="w-5 h-5 rounded-full bg-white text-red-500 flex items-center justify-center shadow-md border border-slate-300">
              <GmailIcon className="w-3 h-3" />
            </span>
          </div>
          <span className="text-xs font-bold text-slate-950">WhatsApp & Gmail</span>
          {isOpen ? (
            <ChevronDown className="w-3.5 h-3.5 text-slate-950" />
          ) : (
            <ChevronUp className="w-3.5 h-3.5 text-slate-950" />
          )}
        </button>

        {/* Quick WhatsApp Direct Launch Icon Button */}
        <a
          href={CV_DATA.personal.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95"
          title="Direct Chat on WhatsApp"
        >
          <WhatsAppIcon className="w-4 h-4 fill-current" />
        </a>

        {/* Quick Gmail Direct Launch Icon Button */}
        <a
          href={gmailComposeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-2xl bg-white hover:bg-slate-100 text-red-600 shadow-xl border border-slate-200 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
          title="Compose Directly in Gmail"
        >
          <GmailIcon className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
