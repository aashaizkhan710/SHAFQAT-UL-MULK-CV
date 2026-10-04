import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, FileText } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  onOpenCvModal: () => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  onToggleTheme,
  onOpenCvModal,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#connect' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? darkMode
            ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20'
            : 'bg-white/85 backdrop-blur-xl border-b border-slate-200/80 shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Name - Minimal & Direct */}
        <a href="#hero" className="group">
          <span className={`text-lg font-bold tracking-tight transition-colors ${
            darkMode ? 'text-white group-hover:text-amber-400' : 'text-slate-900 group-hover:text-amber-600'
          }`}>
            Shafqat Ul Mulk
          </span>
        </a>

        {/* Clean Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`transition-colors duration-200 hover:text-amber-500 py-1 ${
                darkMode ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions: Theme Toggle + Single View CV Action */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onToggleTheme}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              darkMode
                ? 'bg-slate-900/80 text-amber-400 hover:bg-slate-800 border border-white/10'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
            title={darkMode ? 'Switch to Light' : 'Switch to Dark'}
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 transition-transform hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 transition-transform hover:-rotate-12" />
            )}
          </button>

          <button
            onClick={onOpenCvModal}
            className="framer-btn-primary text-xs py-2 px-4 flex items-center gap-1.5 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>CV</span>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-lg ${
              darkMode ? 'text-amber-400 bg-slate-900' : 'text-slate-700 bg-slate-100'
            }`}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg ${
              darkMode ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-slate-900'
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className={`sm:hidden border-b px-6 py-4 space-y-3 backdrop-blur-xl ${
            darkMode ? 'bg-slate-950/95 border-white/10 text-white' : 'bg-white/95 border-slate-200 text-slate-900'
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold py-1 hover:text-amber-500 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCvModal();
              }}
              className="w-full framer-btn-primary text-xs py-2 flex items-center justify-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>View CV</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
