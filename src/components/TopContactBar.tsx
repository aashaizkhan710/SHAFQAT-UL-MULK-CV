import React from 'react';
import { Phone, Mail, Share2, Linkedin, FileText, ExternalLink } from 'lucide-react';
import { WhatsAppIcon, GmailIcon } from './icons/BrandIcons';
import { CV_DATA } from '../data/cvData';

interface TopContactBarProps {
  onOpenShare: () => void;
  onOpenCvModal: () => void;
}

export const TopContactBar: React.FC<TopContactBarProps> = ({ onOpenShare, onOpenCvModal }) => {
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    CV_DATA.personal.email
  )}&su=${encodeURIComponent('Academic & Professional Collaboration - Prof. Shafqat-ul-Mulk')}`;

  return (
    <div className="bg-slate-900 border-b border-slate-800 text-xs text-slate-300 py-2.5 px-4 sm:px-6 relative z-30 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2 gap-x-4">
        {/* Contact Coordinates */}
        <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-5 gap-y-1.5 font-medium">
          {/* WhatsApp Direct Chat */}
          <a
            href={CV_DATA.personal.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold group"
            title="Chat directly on WhatsApp"
          >
            <span className="p-0.5 rounded bg-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/30">
              <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
            </span>
            <span>WhatsApp: {CV_DATA.personal.phone}</span>
          </a>

          {/* Gmail Direct Compose */}
          <a
            href={gmailUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-slate-300 hover:text-red-400 transition-colors group"
            title="Open and compose directly in Google Gmail"
          >
            <span className="p-0.5 rounded bg-white text-red-500 group-hover:scale-105 transition-transform">
              <GmailIcon className="w-3 h-3" />
            </span>
            <span className="text-slate-300 group-hover:text-red-400 font-medium">Gmail: {CV_DATA.personal.email}</span>
          </a>

          {/* Official LinkedIn Profile Link */}
          <a
            href={CV_DATA.personal.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-sky-400 hover:text-sky-300 transition-colors font-semibold"
            title="Professor Shafqat-ul-Mulk on LinkedIn"
          >
            <Linkedin className="w-3.5 h-3.5 shrink-0 text-sky-400 fill-current" />
            <span>LinkedIn</span>
          </a>
        </div>

        {/* Quick Academic Actions */}
        <div className="flex items-center gap-2 sm:gap-3 ml-auto text-xs">
          <button
            onClick={onOpenCvModal}
            className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-semibold px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>View CV</span>
          </button>

          <button
            onClick={onOpenShare}
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-slate-200 px-2 py-1 rounded bg-slate-800/80 border border-slate-700 hover:bg-slate-700 transition-colors"
            title="Share Academic Profile"
          >
            <Share2 className="w-3.5 h-3.5 text-amber-500" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};
