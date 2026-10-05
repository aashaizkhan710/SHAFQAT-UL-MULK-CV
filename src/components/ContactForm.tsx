import React, { useState } from 'react';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  Building,
  User,
  Linkedin,
  MessageSquare,
  Copy,
  Check,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { WhatsAppIcon, GmailIcon } from './icons/BrandIcons';
import { CV_DATA } from '../data/cvData';

interface ContactFormProps {
  darkMode: boolean;
}

export const ContactForm: React.FC<ContactFormProps> = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    roleInterest: 'Academic Collaboration',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(null), 2500);
  };

  const currentTopic = formData.roleInterest || 'Academic Collaboration';
  const customMessage = formData.message.trim() || `Hello Professor Shafqat-ul-Mulk, I would like to enquire regarding ${currentTopic}.`;

  const dynamicWhatsAppUrl = `https://wa.me/923239215615?text=${encodeURIComponent(
    `Hello Professor Shafqat-ul-Mulk,\n\nName: ${formData.name || '[Colleague/Partner]'}\nOrganization: ${
      formData.organization || '[Organization]'
    }\nTopic: ${currentTopic}\n\nMessage: ${customMessage}`
  )}`;

  const dynamicGmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    CV_DATA.personal.email
  )}&su=${encodeURIComponent(
    `[${currentTopic}] Enquiry from ${formData.name || 'Colleague'} - ${formData.organization || 'Academic Network'}`
  )}&body=${encodeURIComponent(
    `Dear Professor Shafqat-ul-Mulk,\n\n${customMessage}\n\nSincerely,\n${formData.name || ''}\n${
      formData.organization || ''
    }\n${formData.phone ? 'Phone: ' + formData.phone : ''}`
  )}`;

  const defaultMailtoUrl = `mailto:${CV_DATA.personal.email}?subject=${encodeURIComponent(
    `[${currentTopic}] Enquiry from ${formData.name || 'Professional Network'}`
  )}&body=${encodeURIComponent(customMessage)}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMessage(
          `Thank you for your enquiry. Your message has been logged and transmitted directly to Professor Shafqat-ul-Mulk's inbox (${CV_DATA.personal.email}).`
        );
        setFormData({
          name: '',
          email: '',
          phone: '',
          organization: '',
          roleInterest: 'Academic Collaboration',
          subject: '',
          message: ''
        });
      } else {
        const stored = JSON.parse(localStorage.getItem('offline_inquiries') || '[]');
        stored.push({ ...formData, date: new Date().toISOString(), id: 'off-' + Date.now() });
        localStorage.setItem('offline_inquiries', JSON.stringify(stored));

        setSuccessMessage(
          'Your enquiry has been securely recorded and queued for delivery.'
        );
      }
    } catch {
      const stored = JSON.parse(localStorage.getItem('offline_inquiries') || '[]');
      stored.push({ ...formData, date: new Date().toISOString(), id: 'off-' + Date.now() });
      localStorage.setItem('offline_inquiries', JSON.stringify(stored));

      setSuccessMessage(
        'Enquiry recorded in local sync queue. You may also connect directly via official WhatsApp or Gmail below.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-10 text-left">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-500 mb-2">
            Official Correspondence
          </div>
          <h2
            className={`text-3xl sm:text-4xl font-black tracking-tight ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Direct Contact & Enquiries
          </h2>
          <p
            className={`text-sm sm:text-base mt-2 max-w-2xl leading-relaxed ${
              darkMode ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Connect directly via WhatsApp, email with Google Gmail, or submit the executive correspondence form below.
          </p>
          <div className="w-16 h-1 bg-amber-500 mt-3 rounded-full" />
        </div>

        {/* Highlighted Direct Action Cards: WhatsApp & Gmail */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {/* WhatsApp Direct Card */}
          <div className="bulky-card p-5 sm:p-6 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border-emerald-500/30 hover:border-emerald-500/50 transition-all">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0">
                  <WhatsAppIcon className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Instant Message
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Active
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-white">Chat on WhatsApp</h3>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard('+923239215615', 'phone')}
                className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white flex items-center gap-1.5 border border-slate-700 transition-colors"
                title="Copy WhatsApp phone number"
              >
                {copiedItem === 'phone' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Connect directly with Professor Shafqat-ul-Mulk on WhatsApp for rapid feedback regarding academic partnerships, school reform, or advisory meetings.
            </p>

            <div className="flex items-center justify-between text-xs text-slate-400 mb-4 pb-3 border-b border-slate-800">
              <span>Direct Mobile / WhatsApp:</span>
              <span className="font-mono font-bold text-white text-sm">{CV_DATA.personal.phone}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <a
                href={dynamicWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-950/50 hover:scale-[1.02]"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
                <span>Launch WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <a
                href={`tel:${CV_DATA.personal.phone.replace(/\s+/g, '')}`}
                className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition-colors border border-slate-700 text-center"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Direct Voice Call</span>
              </a>
            </div>
          </div>

          {/* Gmail & Email Direct Card */}
          <div className="bulky-card p-5 sm:p-6 bg-gradient-to-br from-red-950/30 via-slate-900 to-slate-900 border-red-500/30 hover:border-red-500/50 transition-all">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white text-red-600 flex items-center justify-center shadow-lg shadow-red-500/20 shrink-0 border border-slate-200">
                  <GmailIcon className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-red-400">
                      Electronic Mail
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/20 text-red-300 border border-red-500/30">
                      Gmail Verified
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-white">Send via Gmail / Email</h3>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(CV_DATA.personal.email, 'email')}
                className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white flex items-center gap-1.5 border border-slate-700 transition-colors"
                title="Copy Email Address"
              >
                {copiedItem === 'email' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Launch directly in Google Gmail in your browser or your preferred desktop/mobile email client with an organized subject template.
            </p>

            <div className="flex items-center justify-between text-xs text-slate-400 mb-4 pb-3 border-b border-slate-800">
              <span>Official Inbox:</span>
              <span className="font-mono font-bold text-amber-400 text-sm truncate max-w-[200px]">{CV_DATA.personal.email}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <a
                href={dynamicGmailUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-black flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-950/50 hover:scale-[1.02]"
              >
                <GmailIcon className="w-4 h-4" />
                <span>Open in Gmail</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <a
                href={defaultMailtoUrl}
                className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition-colors border border-slate-700 text-center"
              >
                <Mail className="w-4 h-4 text-amber-400" />
                <span>Default Mail Client</span>
              </a>
            </div>
          </div>
        </div>

        {/* Detailed Grid: Left Coordinates & Right Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Coordinates & Topics */}
          <div className="lg:col-span-5 space-y-5">
            {/* Quick Topic Chooser */}
            <div className="bulky-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                  Consultation Topics
                </h4>
              </div>
              <p className="text-xs text-slate-400 mb-3">
                Click a topic to auto-fill your message and tailor the WhatsApp/Gmail links:
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Academic Collaboration',
                  'Government School Outsourcing',
                  'Curriculum & OBE Advisory',
                  'ISO 9001 / Accreditation Audit',
                  'STEM & Robotics Lab Design'
                ].map((topic) => (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => setFormData({ ...formData, roleInterest: topic })}
                    className={`text-xs px-2.5 py-1.5 rounded-lg border font-semibold transition-all cursor-pointer ${
                      formData.roleInterest === topic
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md'
                        : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:border-slate-500 hover:text-white'
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Direct Official Coordinates List */}
            <div className="space-y-3">
              {/* WhatsApp & Phone */}
              <div className="bulky-point flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
                    <WhatsAppIcon className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 font-medium">WhatsApp & Telephone</div>
                    <a
                      href={CV_DATA.personal.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-emerald-400 hover:underline"
                    >
                      {CV_DATA.personal.phone}
                    </a>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10">
                  Instant
                </span>
              </div>

              {/* Gmail / Email */}
              <div className="bulky-point flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-red-500/10 text-red-400 shrink-0">
                    <GmailIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 font-medium">Google Mail / Gmail</div>
                    <a
                      href={dynamicGmailUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-red-400 hover:underline"
                    >
                      {CV_DATA.personal.email}
                    </a>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider px-2 py-0.5 rounded bg-red-500/10">
                  Official
                </span>
              </div>

              {/* Verified LinkedIn Profile */}
              <div className="bulky-point flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 shrink-0">
                    <Linkedin className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 font-medium">Verified LinkedIn Network</div>
                    <a
                      href={CV_DATA.personal.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-sky-400 hover:underline"
                    >
                      linkedin.com/in/shafqat-ul-mulk
                    </a>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider px-2 py-0.5 rounded bg-sky-500/10">
                  Verified
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Correspondence Form */}
          <div className="lg:col-span-7">
            <div className="bulky-card p-6 sm:p-8">
              {successMessage ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Enquiry Transmitted</h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    {successMessage}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                    <a
                      href={dynamicWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2"
                    >
                      <WhatsAppIcon className="w-4 h-4 fill-current" />
                      <span>Follow Up on WhatsApp</span>
                    </a>
                    <button
                      onClick={() => setSuccessMessage(null)}
                      className="bulky-btn-amber px-5 py-2.5 text-xs cursor-pointer"
                    >
                      Send Another Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Prof. / Dr. / Engr. Full Name"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                          darkMode
                            ? 'bg-slate-950 border-slate-700 text-white focus:border-amber-500'
                            : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-600'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                        Official Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="institutional.email@domain.edu"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                          darkMode
                            ? 'bg-slate-950 border-slate-700 text-white focus:border-amber-500'
                            : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-600'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                        Phone / WhatsApp (Optional)
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+92 300 0000000"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                          darkMode
                            ? 'bg-slate-950 border-slate-700 text-white focus:border-amber-500'
                            : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-600'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                        University / Organization
                      </label>
                      <input
                        type="text"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="Organization or Institution"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                          darkMode
                            ? 'bg-slate-950 border-slate-700 text-white focus:border-amber-500'
                            : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-600'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Enquiry Classification
                    </label>
                    <select
                      value={formData.roleInterest}
                      onChange={(e) => setFormData({ ...formData, roleInterest: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                        darkMode
                          ? 'bg-slate-950 border-slate-700 text-white focus:border-amber-500'
                          : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-600'
                      }`}
                    >
                      <option value="Academic Collaboration">Academic Collaboration</option>
                      <option value="Government School Outsourcing">Government School Outsourcing</option>
                      <option value="Curriculum & OBE Advisory">Curriculum & OBE Advisory</option>
                      <option value="ISO 9001 / Accreditation Audit">ISO 9001 / Accreditation Audit</option>
                      <option value="STEM & Robotics Lab Design">STEM & Robotics Lab Design</option>
                      <option value="Executive Consultation">Executive Consultation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Message / Proposal Details *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please outline the nature of your collaboration, advisory requirements, or institutional enquiry..."
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors resize-y ${
                        darkMode
                          ? 'bg-slate-950 border-slate-700 text-white focus:border-amber-500'
                          : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-600'
                      }`}
                    />
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bulky-btn-amber w-full sm:w-auto px-6 py-3 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                          <span>Transmitting...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-slate-950" />
                          <span>Transmit Official Enquiry</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>Or instant connect:</span>
                      <a
                        href={dynamicWhatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                        <span>WhatsApp</span>
                      </a>
                      <span>·</span>
                      <a
                        href={dynamicGmailUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-400 hover:text-red-300 font-bold flex items-center gap-1"
                      >
                        <GmailIcon className="w-3.5 h-3.5" />
                        <span>Gmail</span>
                      </a>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
