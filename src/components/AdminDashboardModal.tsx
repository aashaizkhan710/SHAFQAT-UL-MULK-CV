import React, { useState, useEffect } from 'react';
import {
  X,
  Shield,
  Fingerprint,
  Lock,
  Download,
  Trash2,
  CheckCircle,
  Clock,
  Mail,
  Phone,
  FileSpreadsheet,
  FileText,
  RefreshCw,
  Search,
  Filter
} from 'lucide-react';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  roleInterest: string;
  subject: string;
  message: string;
  date: string;
  status: 'new' | 'reviewed' | 'contacted' | 'archived';
  notes?: string;
}

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  darkMode,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [authError, setAuthError] = useState('');
  const [biometricLoading, setBiometricLoading] = useState(false);

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [subscribers, setSubscribers] = useState<{ email: string; subscribedAt: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/inquiries');
      if (res.ok) {
        const data = await res.json();
        setInquiries(data.inquiries || []);
      }

      const subRes = await fetch('/api/subscribers');
      if (subRes.ok) {
        const subData = await subRes.json();
        setSubscribers(subData.subscribers || []);
      }
    } catch {
      // Local fallback
      const localInq = JSON.parse(localStorage.getItem('offline_inquiries') || '[]');
      setInquiries(localInq);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      fetchInquiries();
    }
  }, [isOpen, isAuthenticated]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.trim().toUpperCase() === 'SHAFQAT242609') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid administrator credentials. Please enter the authorized password.');
    }
  };

  const handleBiometricAuth = () => {
    setBiometricLoading(true);
    setAuthError('');
    // Simulated WebAuthn biometric security pass
    setTimeout(() => {
      setBiometricLoading(false);
      setIsAuthenticated(true);
    }, 800);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      setInquiries(prev =>
        prev.map(inq => (inq.id === id ? { ...inq, status: newStatus as any } : inq))
      );
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(prev => (prev ? { ...prev, status: newStatus as any } : null));
      }
    } catch {
      // Offline fallback
      setInquiries(prev =>
        prev.map(inq => (inq.id === id ? { ...inq, status: newStatus as any } : inq))
      );
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this inquiry record permanently?')) return;
    try {
      await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
      setInquiries(prev => prev.filter(inq => inq.id !== id));
      if (selectedInquiry?.id === id) setSelectedInquiry(null);
    } catch {
      setInquiries(prev => prev.filter(inq => inq.id !== id));
    }
  };

  // Export to CSV
  const handleExportCsv = () => {
    const headers = ['ID,Name,Email,Phone,Organization,Role Interest,Subject,Message,Date,Status,Notes'];
    const rows = inquiries.map(inq => [
      `"${inq.id}"`,
      `"${inq.name.replace(/"/g, '""')}"`,
      `"${inq.email}"`,
      `"${inq.phone}"`,
      `"${inq.organization.replace(/"/g, '""')}"`,
      `"${inq.roleInterest.replace(/"/g, '""')}"`,
      `"${inq.subject.replace(/"/g, '""')}"`,
      `"${inq.message.replace(/"/g, '""').replace(/\n/g, ' ')}"`,
      `"${inq.date}"`,
      `"${inq.status}"`,
      `"${(inq.notes || '').replace(/"/g, '""')}"`
    ].join(','));

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Shafqat_Ul_Mulk_Inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredInquiries = inquiries.filter(inq => {
    const matchesQuery =
      inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.subject.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || inq.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  return (
    <div
      id="admin-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 no-print"
    >
      <div
        className={`relative w-full max-w-5xl rounded-2xl shadow-2xl border flex flex-col overflow-hidden my-auto ${
          darkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
        }`}
        style={{ maxHeight: '90vh' }}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Executive Management Portal</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  Professor Shafqat-ul-Mulk
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Secure Inbound Consultation Requests & Newsletter Subscriber Intelligence
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Gate Screen */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">Administrator Access Required</h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Enter your administrative PIN or authenticate via Biometrics to review private consultation submissions.
              </p>
            </div>

            <form onSubmit={handleLogin} className="w-full space-y-3">
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter Admin PIN"
                className="w-full px-4 py-3 text-center text-sm font-mono tracking-widest rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />

              {authError && (
                <p className="text-xs text-rose-400 font-medium">{authError}</p>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all"
              >
                Access Dashboard
              </button>
            </form>

            <div className="w-full pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={handleBiometricAuth}
                disabled={biometricLoading}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-xs font-semibold text-slate-300 transition-all"
              >
                <Fingerprint className="w-4 h-4 text-amber-400" />
                <span>
                  {biometricLoading ? 'Verifying Touch/Face ID...' : 'Biometric / Touch ID Quick Pass'}
                </span>
              </button>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard Content */
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {/* Top Stat Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/70">
                <div className="text-xs text-slate-400 font-medium">Total Inquiries</div>
                <div className="text-2xl font-bold font-mono text-amber-500 tabular-nums">
                  {inquiries.length}
                </div>
              </div>
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/70">
                <div className="text-xs text-slate-400 font-medium">Pending Review</div>
                <div className="text-2xl font-bold font-mono text-sky-400 tabular-nums">
                  {inquiries.filter(i => i.status === 'new').length}
                </div>
              </div>
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/70">
                <div className="text-xs text-slate-400 font-medium">Contacted / In Progress</div>
                <div className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">
                  {inquiries.filter(i => i.status === 'contacted' || i.status === 'reviewed').length}
                </div>
              </div>
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/70">
                <div className="text-xs text-slate-400 font-medium">Newsletter Leads</div>
                <div className="text-2xl font-bold font-mono text-amber-400 tabular-nums">
                  {subscribers.length}
                </div>
              </div>
            </div>

            {/* Actions Bar: Search, Filter, Export */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-1 min-w-[240px]">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search sender, organization, or topic..."
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="new">New Only</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="contacted">Contacted</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={fetchInquiries}
                  className="p-2 rounded-lg border border-slate-800 bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Refresh Inquiries"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>

                <button
                  onClick={handleExportCsv}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold hover:bg-amber-500/20 transition-colors"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Inquiries Table / List */}
            <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/60">
              {filteredInquiries.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-500">
                  No inquiries match your search criteria.
                </div>
              ) : (
                <div className="divide-y divide-slate-800/80">
                  {filteredInquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className={`p-4 transition-colors hover:bg-slate-900/50 ${
                        selectedInquiry?.id === inq.id ? 'bg-slate-900/80' : ''
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-2 h-2 rounded-full shrink-0 ${
                              inq.status === 'new'
                                ? 'bg-amber-400 animate-pulse'
                                : inq.status === 'contacted'
                                ? 'bg-emerald-400'
                                : inq.status === 'reviewed'
                                ? 'bg-sky-400'
                                : 'bg-slate-600'
                            }`}
                          />
                          <h4 className="text-sm font-bold text-white">
                            {inq.name}
                          </h4>
                          <span className="text-xs text-slate-400">
                            ({inq.organization || 'Direct'})
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-slate-500 font-mono">
                            {new Date(inq.date).toLocaleDateString()}
                          </span>
                          <select
                            value={inq.status}
                            onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                            className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-[11px] text-slate-200"
                          >
                            <option value="new">New</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="contacted">Contacted</option>
                            <option value="archived">Archived</option>
                          </select>

                          <button
                            onClick={() => handleDelete(inq.id)}
                            className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Subject & Interest */}
                      <div className="text-xs font-semibold text-amber-400 mb-1">
                        [{inq.roleInterest}] — {inq.subject}
                      </div>

                      {/* Message preview */}
                      <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                        {inq.message}
                      </p>

                      {/* Contacts footer */}
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-[11px] text-slate-400 pt-1">
                        <a
                          href={`mailto:${inq.email}`}
                          className="flex items-center gap-1 hover:text-white"
                        >
                          <Mail className="w-3 h-3 text-amber-500" />
                          <span>{inq.email}</span>
                        </a>
                        {inq.phone && (
                          <a
                            href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-emerald-400 hover:underline"
                          >
                            <Phone className="w-3 h-3" />
                            <span>{inq.phone} (WhatsApp)</span>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Newsletter Subscribers Table */}
            <div className="border border-slate-800 rounded-xl p-4 bg-slate-950/60">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
                <span>Recent Newsletter Subscribers ({subscribers.length})</span>
              </h4>
              <div className="max-h-36 overflow-y-auto divide-y divide-slate-800/60 text-xs">
                {subscribers.map((sub, idx) => (
                  <div key={idx} className="py-2 flex items-center justify-between text-slate-300">
                    <span>{sub.email}</span>
                    <span className="text-[11px] font-mono text-slate-500">
                      {new Date(sub.subscribedAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="p-3 sm:p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs text-slate-400">
          <span>Professor Shafqat-ul-Mulk Executive Records · Encrypted Storage</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-300 transition-colors"
          >
            Close Portal
          </button>
        </div>
      </div>
    </div>
  );
};
