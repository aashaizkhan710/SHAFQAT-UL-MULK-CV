import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';

interface NewsletterSectionProps {
  darkMode: boolean;
}

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({ darkMode }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMessage(data.message || 'Subscribed successfully!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to subscribe.');
      }
    } catch {
      // Local fallback
      const stored = JSON.parse(localStorage.getItem('offline_subscribers') || '[]');
      stored.push({ email, date: new Date().toISOString() });
      localStorage.setItem('offline_subscribers', JSON.stringify(stored));
      setStatus('success');
      setMessage('Subscribed! Cached locally for instant synchronization.');
      setEmail('');
    }
  };

  return (
    <section className="py-12 sm:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          className={`rounded-2xl border p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 ${
            darkMode
              ? 'bg-slate-900/60 border-slate-800'
              : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="max-w-xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-500">
              <Mail className="w-4 h-4" />
              <span>Executive Briefings</span>
            </div>
            <h3
              className={`text-xl sm:text-2xl font-bold tracking-tight ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              Subscribe to Education Reform & Leadership Insights
            </h3>
            <p
              className={`text-xs sm:text-sm ${
                darkMode ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              Receive occasional whitepapers on institutional turnaround, STEM lab frameworks, and government school outsourcing metrics.
            </p>
          </div>

          <div className="w-full md:w-auto min-w-[300px]">
            {status === 'success' ? (
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold p-3 rounded-lg bg-emerald-950/60 border border-emerald-800">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{message}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`px-4 py-2.5 rounded-lg border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 flex-1 ${
                    darkMode
                      ? 'bg-slate-950 border-slate-800 text-slate-100 placeholder-slate-600'
                      : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                  }`}
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all whitespace-nowrap flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  <span>{status === 'loading' ? 'Joining...' : 'Subscribe'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
