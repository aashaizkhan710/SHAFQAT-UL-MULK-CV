import React, { useState } from 'react';
import { X, Copy, Check, MessageSquare, Linkedin, Twitter, Mail, Share2, Globe } from 'lucide-react';
import { CV_DATA } from '../data/cvData';

interface SocialShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
}

export const SocialShareModal: React.FC<SocialShareModalProps> = ({
  isOpen,
  onClose,
  darkMode,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://shafqat-ul-mulk.cv';
  const shareTitle = `${CV_DATA.personal.name} | Senior Academic Leader & Project Manager Portfolio`;
  const shareText = `Explore the official executive CV & portfolio of Professor Shafqat-ul-Mulk: 25+ years in academic leadership, military avionics at CAE NUST, and leading the 2,000 Government Schools Outsourcing Intervention.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: currentUrl
        });
      } catch {
        // Ignored if cancelled
      }
    } else {
      handleCopy();
    }
  };

  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${shareTitle}\n${shareText}\n${currentUrl}`
  )}`;

  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    currentUrl
  )}`;

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareTitle
  )}&url=${encodeURIComponent(currentUrl)}`;

  const emailShareUrl = `mailto:?subject=${encodeURIComponent(
    shareTitle
  )}&body=${encodeURIComponent(`${shareText}\n\nView Profile: ${currentUrl}`)}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 no-print">
      <div
        className={`relative w-full max-w-md rounded-2xl shadow-2xl border p-6 overflow-hidden my-auto ${
          darkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
        }`}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-bold">Share Executive Portfolio</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-4 space-y-4">
          <p className="text-xs text-slate-400 leading-relaxed">
            Share Professor Shafqat-ul-Mulk’s verified public profile with recruiters, academic boards, and defense partners worldwide.
          </p>

          {/* Copy Link Input Bar */}
          <div className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-700 bg-slate-950">
            <input
              type="text"
              readOnly
              value={currentUrl}
              className="px-2 py-1 text-xs text-slate-300 bg-transparent flex-1 focus:outline-none font-mono"
            />
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors whitespace-nowrap"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Link'}</span>
            </button>
          </div>

          {/* Social Icons Grid */}
          <div className="grid grid-cols-4 gap-2 pt-2">
            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-3 rounded-xl border border-emerald-900/60 bg-emerald-950/40 text-emerald-400 hover:bg-emerald-900/40 transition-colors text-center"
            >
              <MessageSquare className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-semibold">WhatsApp</span>
            </a>

            <a
              href={linkedinShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-3 rounded-xl border border-blue-900/60 bg-blue-950/40 text-sky-400 hover:bg-blue-900/40 transition-colors text-center"
            >
              <Linkedin className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-semibold">LinkedIn</span>
            </a>

            <a
              href={twitterShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-800 bg-slate-950 text-slate-300 hover:text-white transition-colors text-center"
            >
              <Twitter className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-semibold">X / Twitter</span>
            </a>

            <a
              href={emailShareUrl}
              className="flex flex-col items-center justify-center p-3 rounded-xl border border-amber-900/60 bg-amber-950/40 text-amber-400 hover:bg-amber-900/40 transition-colors text-center"
            >
              <Mail className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-semibold">Email</span>
            </a>
          </div>

          {/* Web Share API fallback */}
          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button
              onClick={handleNativeShare}
              className="w-full py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors flex items-center justify-center gap-2"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>More Sharing Options (System Dialog)</span>
            </button>
          )}
        </div>

        <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-500 text-center">
          Open & Accessible Public Portfolio Link
        </div>
      </div>
    </div>
  );
};
