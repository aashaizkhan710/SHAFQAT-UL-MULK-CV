import React, { useState, useEffect } from 'react';
import { Background3D } from './components/Background3D';
import { CursorSpotlight } from './components/CursorSpotlight';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ExperienceSection } from './components/ExperienceSection';
import { EducationSection } from './components/EducationSection';
import { ConnectSection } from './components/ConnectSection';
import { Footer } from './components/Footer';
import { CvModal } from './components/CvModal';
import { ChatbotModal } from './components/ChatbotModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { MessageSquare, WifiOff } from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme_mode');
      return saved ? saved === 'dark' : true;
    }
    return true;
  });

  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme_mode', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme_mode', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div
      className={`min-h-screen relative font-sans transition-colors duration-300 selection:bg-amber-500/30 selection:text-amber-200 ${
        darkMode ? 'bg-[#070a11] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
      }`}
    >
      {/* 3D Attractive Interactive Atmospheric Background (Preserved!) */}
      <Background3D darkMode={darkMode} />

      {/* Modern Cursor Spotlight */}
      <CursorSpotlight darkMode={darkMode} />

      {/* Offline Status Notice */}
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-amber-500 text-slate-950 text-xs font-bold py-1.5 px-4 text-center flex items-center justify-center gap-2 shadow-md">
          <WifiOff className="w-3.5 h-3.5" />
          <span>Offline Mode Active: Content cached locally.</span>
        </div>
      )}

      {/* Main Framework */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Minimal Floating Header Navbar */}
        <Navbar
          darkMode={darkMode}
          onToggleTheme={toggleTheme}
          onOpenCvModal={() => setCvModalOpen(true)}
          onOpenAdmin={() => setAdminModalOpen(true)}
        />

        <main className="flex-grow">
          {/* 1. Hero: Image Behind, Content Centered, Person Name, Title, and Animated Socials */}
          <HeroSection
            darkMode={darkMode}
            onOpenCvModal={() => setCvModalOpen(true)}
            onOpenAiAssistant={() => setChatModalOpen(true)}
          />

          {/* 2. LinkedIn-Style Checkpoints Timeline (with NCC, 2nd Pos, PTC & Base Commander Honors) */}
          <ExperienceSection darkMode={darkMode} />

          {/* 3. Academic Qualifications & Executive Certifications */}
          <EducationSection darkMode={darkMode} />

          {/* 4. Dedicated Social & Contact Hub (Proper Section with Animated Cards) */}
          <ConnectSection darkMode={darkMode} />
        </main>

        {/* Clean, Modern Footer */}
        <Footer
          darkMode={darkMode}
          onOpenCvModal={() => setCvModalOpen(true)}
          onOpenAdmin={() => setAdminModalOpen(true)}
        />
      </div>

      {/* Subtle Floating AI Assistant Button */}
      <button
        onClick={() => setChatModalOpen(true)}
        className="fixed bottom-6 right-6 z-30 flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg backdrop-blur-xl transition-all duration-300 hover:scale-105 cursor-pointer border"
        style={{
          backgroundColor: darkMode ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.9)',
          borderColor: darkMode ? 'rgba(245, 158, 11, 0.4)' : 'rgba(245, 158, 11, 0.5)',
          color: darkMode ? '#fde68a' : '#b45309',
        }}
        title="Ask Academic Career Assistant"
        aria-label="Ask Academic Career Assistant"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
        </span>
        <MessageSquare className="w-4 h-4 text-amber-500" />
        <span className="text-xs font-bold">Ask Assistant</span>
      </button>

      {/* Modals */}
      <CvModal
        isOpen={cvModalOpen}
        onClose={() => setCvModalOpen(false)}
        darkMode={darkMode}
      />

      <ChatbotModal
        isOpen={chatModalOpen}
        onClose={() => setChatModalOpen(false)}
        darkMode={darkMode}
      />

      <AdminDashboardModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        darkMode={darkMode}
      />
    </div>
  );
}
