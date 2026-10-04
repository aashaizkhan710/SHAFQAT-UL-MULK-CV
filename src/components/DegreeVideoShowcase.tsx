import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  GraduationCap,
  Award,
  Sparkles,
  Subtitles,
  ArrowRight,
  MessageSquare,
  ShieldCheck,
  TrendingUp,
  Music
} from 'lucide-react';
import { CV_DATA } from '../data/cvData';

interface DegreeVideoShowcaseProps {
  darkMode: boolean;
}

interface Chapter {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  institution: string;
  location: string;
  year: string;
  honors?: string;
  tagline: string;
  startTime: number;
  duration: number;
  image?: string;
  overlayTheme: 'microelectronics' | 'merit' | 'avionics' | 'opportunity';
  caption: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
}

const CHAPTERS: Chapter[] = [
  {
    id: 'foundations',
    badge: 'Dual Master Degrees',
    badgeColor: 'from-amber-400 to-amber-600',
    title: 'Academic Pedigree & Rigorous Foundations',
    institution: 'University of Southampton (UK) & University of Peshawar',
    location: 'United Kingdom · Pakistan',
    year: '1996 – 2008',
    tagline: 'A quarter-century of disciplined scholarship, engineering rigor, and academic leadership.',
    startTime: 0,
    duration: 12,
    overlayTheme: 'microelectronics',
    caption: 'Engr. Shafqat Ul Mulk built his career on elite mathematical, physical, and microelectronics scholarship across premier British and Pakistani institutions.',
    highlights: [
      'Master of Science from University of Southampton, United Kingdom',
      '2nd Position across the entire University of Peshawar (MSc Electronics)',
      'Undergraduate foundation in Computer Science, Physics & Mathematics'
    ],
    metrics: [
      { label: 'Total Career', value: '25+ Yrs' },
      { label: 'Master Degrees', value: '2 MS/MSc' },
      { label: 'University Merit', value: 'Top 2nd' }
    ]
  },
  {
    id: 'southampton',
    badge: 'United Kingdom Postgraduate',
    badgeColor: 'from-sky-400 to-blue-600',
    title: 'MS in Microelectronics & System Design',
    institution: 'University of Southampton',
    location: 'Southampton, United Kingdom',
    year: 'Graduated 2008',
    honors: 'Postgraduate Research in Silicon Architectures',
    tagline: 'Advanced European engineering training in System-on-Chip (SoC) architectures and high-reliability embedded controllers.',
    startTime: 12,
    duration: 16,
    image: '/src/assets/images/southampton_microelectronics_lab_1790967129585.jpg',
    overlayTheme: 'microelectronics',
    caption: 'Specialized in cutting-edge microelectronics, ModelSim EDA simulation, Verilog HDL synthesis, and mission-critical embedded systems.',
    highlights: [
      'System-on-Chip (SoC) methodologies & high-density VLSI physical design',
      'System-C modeling, digital hardware synthesis, and EDA benchmarking',
      'Engineered for mission-critical aerospace and industrial avionics reliability'
    ],
    metrics: [
      { label: 'Institution', value: 'Southampton' },
      { label: 'Specialization', value: 'SoC / VLSI' },
      { label: 'Country', value: 'United Kingdom' }
    ]
  },
  {
    id: 'peshawar',
    badge: 'University Silver Distinction',
    badgeColor: 'from-amber-400 to-yellow-600',
    title: 'MSc Electronics — 2nd Position in University',
    institution: 'University of Peshawar',
    location: 'Peshawar, Pakistan',
    year: '1999 (Preceded by BSc in 1996)',
    honors: '2nd Position Across Entire University Merit Cohort',
    tagline: 'Graduated second in the entire university, demonstrating relentless academic excellence and mastery of analog/digital electronic design.',
    startTime: 28,
    duration: 15,
    overlayTheme: 'merit',
    caption: 'Secured 2nd Position in University for outstanding academic distinction, solidifying electronic circuit theory before his UK postgraduate research.',
    highlights: [
      'Awarded 2nd Position in University for outstanding academic distinction',
      'Advanced mastery in signal theory, electromagnetics, and digital logic design',
      'BSc foundation in Computer Science, Physics & Mathematics (1996)'
    ],
    metrics: [
      { label: 'University Merit', value: '2nd Rank' },
      { label: 'Field', value: 'Electronics' },
      { label: 'BSc Foundation', value: 'CS & Maths' }
    ]
  },
  {
    id: 'governance',
    badge: 'Institutional Governance',
    badgeColor: 'from-emerald-400 to-teal-600',
    title: 'Public Sector Governance & Academic Leadership',
    institution: 'Elementary & Secondary Education Dept · Swabi College',
    location: 'Khyber Pakhtunkhwa, Pakistan',
    year: '2022 – Present',
    honors: 'Project Manager 2,000 Schools & BPS-20 Principal',
    tagline: 'Leading provincial-scale educational reform, institutional discipline turnaround, and STEM robotics laboratories.',
    startTime: 43,
    duration: 15,
    image: '/src/assets/images/aeronautical_avionics_lab_1790568920177.jpg',
    overlayTheme: 'opportunity',
    caption: 'Engr. Shafqat Ul Mulk directs large-scale governance and institutional reform, translating 25+ years of engineering rigor into public impact.',
    highlights: [
      'Project Manager for outsourcing 2,000 low-performing government schools',
      'Former Principal (BPS-20) leading institutional turnaround and Robotics/AI Lab',
      'ISO 9001 Lead Auditor & PEC Outcome-Based Education (OBE) Implementation Lead'
    ],
    metrics: [
      { label: 'Govt Schools', value: '2,000' },
      { label: 'Role Rank', value: 'BPS-20' },
      { label: 'Years Total', value: '25+ Yrs' }
    ]
  }
];

const TOTAL_DURATION = 58; // 58 seconds total runtime

export const DegreeVideoShowcase: React.FC<DegreeVideoShowcaseProps> = ({ darkMode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(75); // 0-100
  const [showCaptions, setShowCaptions] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasStartedOnce, setHasStartedOnce] = useState(false);
  const [audioBars, setAudioBars] = useState<number[]>([15, 25, 45, 60, 50, 35, 20, 10]);

  const videoContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Current active chapter
  const currentChapter =
    CHAPTERS.slice().reverse().find((c) => currentTime >= c.startTime) || CHAPTERS[0];

  // Sync volume & muted states with audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  // Sync playback speed with audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  // Handle Play / Pause with audio sync
  const togglePlay = () => {
    if (!hasStartedOnce) setHasStartedOnce(true);
    const nextState = !isPlaying;
    setIsPlaying(nextState);

    if (audioRef.current) {
      if (nextState) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  };

  // Seek time handler
  const handleSeek = (newTime: number) => {
    const clamped = Math.max(0, Math.min(newTime, TOTAL_DURATION));
    setCurrentTime(clamped);
    if (audioRef.current) {
      audioRef.current.currentTime = clamped;
    }
  };

  // Chapter Jump Handler
  const jumpToChapter = (chapter: Chapter) => {
    if (!hasStartedOnce) setHasStartedOnce(true);
    setCurrentTime(chapter.startTime);
    if (audioRef.current) {
      audioRef.current.currentTime = chapter.startTime;
      if (!isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }
    setIsPlaying(true);
  };

  // Audio Equalizer Spectrum animation loop
  useEffect(() => {
    if (!isPlaying || isMuted) {
      setAudioBars([8, 12, 16, 20, 16, 12, 8, 4]);
      return;
    }

    let animId: number;
    let step = 0;

    const animateBars = () => {
      step += 0.15;
      const b1 = Math.abs(Math.sin(step * 1.2)) * 60 + 20;
      const b2 = Math.abs(Math.sin(step * 1.5 + 0.5)) * 75 + 15;
      const b3 = Math.abs(Math.cos(step * 0.9 + 1.2)) * 85 + 15;
      const b4 = Math.abs(Math.sin(step * 1.8 + 2.0)) * 95 + 20;
      const b5 = Math.abs(Math.cos(step * 1.3 + 0.8)) * 80 + 20;
      const b6 = Math.abs(Math.sin(step * 1.1 + 1.5)) * 65 + 15;
      const b7 = Math.abs(Math.cos(step * 1.6 + 2.5)) * 50 + 15;
      const b8 = Math.abs(Math.sin(step * 1.4 + 3.0)) * 40 + 10;

      setAudioBars([b1, b2, b3, b4, b5, b6, b7, b8]);
      animId = requestAnimationFrame(animateBars);
    };

    animId = requestAnimationFrame(animateBars);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, isMuted]);

  // Video timeline loop
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      if (isPlaying) {
        const delta = ((now - lastTime) / 1000) * playbackSpeed;
        setCurrentTime((prev) => {
          const next = prev + delta;
          if (next >= TOTAL_DURATION) {
            setIsPlaying(false);
            if (audioRef.current) {
              audioRef.current.pause();
              audioRef.current.currentTime = 0;
            }
            return 0;
          }
          return next;
        });
      }
      lastTime = now;
      if (isPlaying) {
        animId = requestAnimationFrame(loop);
      }
    };

    if (isPlaying) {
      animId = requestAnimationFrame(loop);
    }
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, playbackSpeed]);

  // Canvas visualizer animation (cyber circuit traces, wave ripples, and golden particles)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      // Draw subtle electronic grid lines
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.08)';
      ctx.lineWidth = 1;
      const gridStep = 40;
      for (let x = 0; x < w; x += gridStep) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridStep) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw active audio/motion waveform at the bottom
      if (isPlaying) {
        angle += 0.04 * playbackSpeed;
        ctx.beginPath();
        ctx.strokeStyle = currentChapter.id === 'opportunity' ? 'rgba(52, 211, 153, 0.7)' : 'rgba(245, 158, 11, 0.75)';
        ctx.lineWidth = 2.5;
        for (let x = 0; x < w; x += 10) {
          const waveHeight = Math.sin(x * 0.015 + angle) * 14 + Math.cos(x * 0.03 - angle) * 9;
          const y = h - 35 + waveHeight;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // High-tech HUD corner brackets
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.45)';
        ctx.lineWidth = 2;
        const bSize = 24;
        // Top-left
        ctx.beginPath();
        ctx.moveTo(20, 20 + bSize);
        ctx.lineTo(20, 20);
        ctx.lineTo(20 + bSize, 20);
        ctx.stroke();
        // Top-right
        ctx.beginPath();
        ctx.moveTo(w - 20 - bSize, 20);
        ctx.lineTo(w - 20, 20);
        ctx.lineTo(w - 20, 20 + bSize);
        ctx.stroke();
        // Bottom-left
        ctx.beginPath();
        ctx.moveTo(20, h - 20 - bSize);
        ctx.lineTo(20, h - 20);
        ctx.lineTo(20 + bSize, h - 20);
        ctx.stroke();
        // Bottom-right
        ctx.beginPath();
        ctx.moveTo(w - 20 - bSize, h - 20);
        ctx.lineTo(w - 20, h - 20);
        ctx.lineTo(w - 20, h - 20 - bSize);
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, playbackSpeed, currentChapter.id]);

  const toggleFullscreen = () => {
    if (!videoContainerRef.current) return;
    if (!document.fullscreenElement) {
      videoContainerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <section id="degree-video" className="py-8 sm:py-12 relative">
      {/* Hidden Master Studio-Quality Audio Element */}
      <audio
        ref={audioRef}
        src="/audio/academic_spotlight_soundtrack.wav"
        preload="auto"
        onEnded={() => {
          setIsPlaying(false);
          setCurrentTime(0);
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Video Header & Controls Bar */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-500 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Cinematic Degree & Leadership Spotlight</span>
            </div>
            <h2
              className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Academic Pedigree & Career Vision
            </h2>
            <p className={`text-xs sm:text-sm mt-1 max-w-2xl ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Watch the 58-second credentials spotlight tracing his UK Master’s at the University of Southampton, 2nd Position honors at the University of Peshawar, and his readiness for new leadership challenges.
            </p>
          </div>

          {/* Quick Scene Jump Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {CHAPTERS.map((ch, idx) => (
              <button
                key={ch.id}
                onClick={() => jumpToChapter(ch)}
                className={`bulky-badge px-3.5 py-2 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  currentChapter.id === ch.id
                    ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-[0_4px_0_#b45309] -translate-y-0.5'
                    : darkMode
                    ? 'bg-slate-900 text-slate-300 hover:bg-slate-800 border-slate-700'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-300'
                }`}
              >
                <span>{idx + 1}.</span>
                <span>{ch.id === 'foundations' ? 'Foundations' : ch.id === 'southampton' ? 'MS Southampton (UK)' : ch.id === 'peshawar' ? 'MSc Peshawar (2nd)' : 'New Opportunities'}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Cinema Video Frame (Bulky 3D Console) */}
        <div
          ref={videoContainerRef}
          className={`bulky-card relative rounded-3xl overflow-hidden border-2 shadow-2xl transition-all ${
            darkMode ? 'bg-slate-950 border-slate-700' : 'bg-slate-950 border-slate-400'
          } ${isFullscreen ? 'p-0 rounded-none w-screen h-screen' : ''}`}
        >
          {/* Aspect Ratio 16:9 Canvas */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950 select-none">
            {/* Visual Canvas Background Layer */}
            {currentChapter.image ? (
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={currentChapter.image}
                  alt={currentChapter.title}
                  className="w-full h-full object-cover transition-transform duration-[8000ms] ease-out"
                  style={{
                    transform: isPlaying ? 'scale(1.15) translate(-1.5%, -1%)' : 'scale(1.05)'
                  }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/40" />
              </div>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/70 to-slate-950" />
            )}

            {/* Interactive Canvas Grid & Electronic Waveform Visualizer */}
            <canvas
              ref={canvasRef}
              width={960}
              height={540}
              className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-70"
            />

            {/* Top Video Header Overlay */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-gradient-to-r ${currentChapter.badgeColor} text-slate-950 shadow-lg`}>
                  {currentChapter.badge}
                </span>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-slate-900/80 text-amber-300 border border-amber-500/30 backdrop-blur-md">
                  {currentChapter.year}
                </span>
              </div>

              {/* Soundtrack Status & Verified Badge */}
              <div className="flex items-center gap-2">
                {!isMuted && isPlaying && (
                  <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-semibold backdrop-blur-md">
                    <Music className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
                    <span>Orchestral Score Playing</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200 bg-slate-900/80 px-3 py-1 rounded-md border border-slate-800 backdrop-blur-md">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Verified Credentials</span>
                </div>
              </div>
            </div>

            {/* Main Stage Text & Motion Overlay */}
            <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 md:px-16 z-20 pointer-events-none text-white">
              <div className="max-w-2xl space-y-3.5">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest drop-shadow">
                  <GraduationCap className="w-4 h-4 text-amber-400" />
                  <span>{currentChapter.institution} · {currentChapter.location}</span>
                </div>

                <h3
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-lg"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {currentChapter.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed max-w-xl drop-shadow">
                  {currentChapter.tagline}
                </p>

                {currentChapter.honors && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/25 border border-amber-500/50 text-amber-300 text-xs sm:text-sm font-bold backdrop-blur-md shadow-md">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>{currentChapter.honors}</span>
                  </div>
                )}

                {/* Metrics Badges */}
                <div className="grid grid-cols-3 gap-2.5 pt-2 max-w-md">
                  {currentChapter.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-2 sm:p-2.5 rounded-xl bg-slate-900/85 border border-slate-700/60 backdrop-blur-md text-center shadow-lg"
                    >
                      <div className="text-base sm:text-lg font-extrabold font-mono text-amber-400">{m.value}</div>
                      <div className="text-[10px] sm:text-xs text-slate-300 font-medium">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Special Opportunity Callout on Scene 4 */}
                {currentChapter.id === 'opportunity' && (
                  <div className="pt-2 pointer-events-auto">
                    <a
                      href={CV_DATA.personal.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/30 transition-all hover:scale-105 active:scale-95"
                    >
                      <span>Engage Engr. Shafqat for Leadership</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Subtitles Overlay */}
            {showCaptions && (
              <div className="absolute bottom-16 left-6 right-6 z-20 pointer-events-none flex justify-center">
                <div className="px-4 py-2 rounded-xl bg-slate-950/90 border border-slate-800/80 backdrop-blur-md text-center text-xs sm:text-sm text-slate-200 font-medium max-w-2xl shadow-xl">
                  <span className="text-amber-400 font-bold mr-1.5">[{currentChapter.badge}]:</span>
                  <span>{currentChapter.caption}</span>
                </div>
              </div>
            )}

            {/* Big Interactive Play/Pause Center Trigger */}
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
              className="absolute inset-0 z-10 flex items-center justify-center bg-black/10 hover:bg-black/25 transition-colors group cursor-pointer"
            >
              {!isPlaying && (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-2xl transform transition-transform group-hover:scale-110 active:scale-95">
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current translate-x-0.5" />
                  </div>
                  <span className="text-xs font-bold text-white uppercase tracking-wider bg-slate-900/90 px-3.5 py-1.5 rounded-full border border-slate-700 shadow-xl flex items-center gap-2">
                    <Music className="w-3.5 h-3.5 text-amber-400" />
                    <span>{hasStartedOnce ? 'Resume Video' : 'Play Orchestral Presentation'}</span>
                  </span>
                </div>
              )}
            </button>
          </div>

          {/* Video Control Bar */}
          <div className="bg-slate-950 border-t border-slate-800 p-3 sm:p-4 text-white">
            {/* Scrubber Bar with chapter breaks */}
            <div className="relative mb-3 flex items-center group">
              <input
                type="range"
                min={0}
                max={TOTAL_DURATION}
                step={0.1}
                value={currentTime}
                onChange={(e) => handleSeek(parseFloat(e.target.value))}
                aria-label="Video scrubber"
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500 focus:outline-none"
              />
              <div className="absolute inset-0 pointer-events-none flex justify-between items-center px-1">
                {CHAPTERS.map((ch) => (
                  <div
                    key={ch.id}
                    style={{ left: `${(ch.startTime / TOTAL_DURATION) * 100}%` }}
                    className="absolute w-1.5 h-3 bg-amber-500/80 rounded-full -translate-x-1/2"
                    title={ch.title}
                  />
                ))}
              </div>
            </div>

            {/* Bottom Controls Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              {/* Play / Rewind / Time */}
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="p-2 rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-400 font-bold transition-all shadow-md active:scale-95"
                  title={isPlaying ? 'Pause' : 'Play'}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                </button>

                <button
                  onClick={() => handleSeek(0)}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Restart Video"
                  aria-label="Restart Video"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <div className="font-mono text-xs text-slate-300">
                  <span className="font-bold text-amber-400">{formatTime(currentTime)}</span>
                  <span className="text-slate-500 mx-1">/</span>
                  <span className="text-slate-400">{formatTime(TOTAL_DURATION)}</span>
                </div>
              </div>

              {/* Soundtrack Style Label & Dynamic Equalizer Spectrum */}
              <div className="flex items-center gap-2.5 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800">
                {/* 8-bar Dynamic Equalizer */}
                <div className="flex items-end gap-0.5 h-4 w-12" title="Audio Spectrum">
                  {audioBars.map((height, i) => (
                    <div
                      key={i}
                      className="w-1 rounded-t-sm transition-all duration-75"
                      style={{
                        height: `${Math.max(15, height)}%`,
                        backgroundColor:
                          currentChapter.id === 'opportunity'
                            ? '#34d399'
                            : i > 5
                            ? '#fbbf24'
                            : '#f59e0b'
                      }}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-slate-300">
                  <Music className="w-3 h-3 text-amber-400" />
                  <span className="font-medium truncate max-w-[160px] sm:max-w-xs">Acoustic Piano & Orchestral Strings</span>
                </div>
              </div>

              {/* Volume Slider, Captions, Speed, Fullscreen */}
              <div className="flex items-center gap-2.5">
                {/* Volume Control Group */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setIsMuted((prev) => !prev)}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      !isMuted
                        ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                    title={isMuted ? 'Unmute Soundtrack' : 'Mute Soundtrack'}
                    aria-label={isMuted ? 'Unmute Soundtrack' : 'Mute Soundtrack'}
                  >
                    {!isMuted ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
                  </button>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      setVolume(parseInt(e.target.value, 10));
                      if (isMuted) setIsMuted(false);
                    }}
                    className="w-16 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                    title={`Volume: ${isMuted ? '0%' : `${volume}%`}`}
                  />
                </div>

                {/* Captions Toggle */}
                <button
                  onClick={() => setShowCaptions((prev) => !prev)}
                  className={`px-2.5 py-1.5 rounded-lg border text-xs font-bold transition-colors flex items-center gap-1 ${
                    showCaptions
                      ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                  title="Toggle Captions"
                  aria-label="Toggle Captions"
                >
                  <Subtitles className="w-3.5 h-3.5" />
                  <span>CC</span>
                </button>

                {/* Speed Toggle */}
                <button
                  onClick={() => {
                    const nextSpeed = playbackSpeed === 1 ? 1.25 : playbackSpeed === 1.25 ? 1.5 : 1;
                    setPlaybackSpeed(nextSpeed);
                  }}
                  className="px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 font-mono text-xs"
                  title="Playback Speed"
                >
                  {playbackSpeed}x
                </button>

                {/* Fullscreen Toggle */}
                <button
                  onClick={toggleFullscreen}
                  className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Toggle Fullscreen"
                  aria-label="Toggle Fullscreen"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
