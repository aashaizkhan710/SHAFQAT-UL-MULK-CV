import React, { useEffect, useRef, useState } from 'react';

interface CursorSpotlightProps {
  darkMode: boolean;
}

export const CursorSpotlight: React.FC<CursorSpotlightProps> = ({ darkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Smooth interpolated position for organic, fluid movement
  const targetPos = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const currentPos = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });

  const currentOpacity = useRef<number>(0);
  const targetOpacity = useRef<number>(0);
  const idleTimeout = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on desktop pointer devices with fine control
    const isTouchOnly =
      window.matchMedia('(pointer: coarse)').matches && !window.matchMedia('(pointer: fine)').matches;
    if (isTouchOnly) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let lastHoveredElement: HTMLElement | null = null;
    let originalBorder: string = '';
    let originalBoxShadow: string = '';
    let originalTransition: string = '';

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const cleanupHoveredElement = () => {
      if (lastHoveredElement) {
        lastHoveredElement.style.borderColor = originalBorder;
        lastHoveredElement.style.boxShadow = originalBoxShadow;
        lastHoveredElement.style.transition = originalTransition;
        lastHoveredElement = null;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      targetOpacity.current = 1.0;

      targetPos.current.x = e.clientX;
      targetPos.current.y = e.clientY;

      // On first entry, snap position
      if (currentPos.current.x < -500) {
        currentPos.current.x = e.clientX;
        currentPos.current.y = e.clientY;
      }

      // Elegant, whisper-soft element illumination:
      // When hovering over cards, buttons, or badges, apply a subtle warm rim glow
      const elementAtCursor = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      const highlightable = elementAtCursor?.closest(
        'button, a, .rounded-xl, .rounded-2xl, .rounded-3xl, .border, [role="button"]'
      ) as HTMLElement | null;

      if (lastHoveredElement && lastHoveredElement !== highlightable) {
        cleanupHoveredElement();
      }

      if (highlightable && highlightable !== lastHoveredElement) {
        lastHoveredElement = highlightable;
        originalBorder = highlightable.style.borderColor || '';
        originalBoxShadow = highlightable.style.boxShadow || '';
        originalTransition = highlightable.style.transition || '';

        // Silky smooth, luxury transition
        highlightable.style.transition = 'border-color 0.4s ease, box-shadow 0.4s ease';
        highlightable.style.borderColor = darkMode
          ? 'rgba(245, 158, 11, 0.45)'
          : 'rgba(217, 119, 6, 0.35)';
        highlightable.style.boxShadow = darkMode
          ? '0 4px 20px -2px rgba(245, 158, 11, 0.12), inset 0 0 12px rgba(245, 158, 11, 0.03)'
          : '0 4px 16px -2px rgba(217, 119, 6, 0.08), inset 0 0 8px rgba(245, 158, 11, 0.02)';
      }

      // Smooth idle fade down after movement pauses
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
      idleTimeout.current = window.setTimeout(() => {
        targetOpacity.current = 0.55; // Graceful subtle ambient glow when still
      }, 300);
    };

    const handleMouseLeave = () => {
      targetOpacity.current = 0.0;
      cleanupHoveredElement();
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      targetPos.current.x = e.clientX;
      targetPos.current.y = e.clientY;
      targetOpacity.current = 1.0;
      setIsVisible(true);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Continuous smooth animation loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth spring/lerp interpolation towards actual mouse position
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.18;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.18;

      // Smooth opacity interpolation
      currentOpacity.current += (targetOpacity.current - currentOpacity.current) * 0.12;

      if (currentOpacity.current > 0.005 && currentPos.current.x >= 0 && currentPos.current.y >= 0) {
        const x = currentPos.current.x;
        const y = currentPos.current.y;
        const op = currentOpacity.current;

        // Elegant Dual-Tier Radial Spotlight (Subtle, warm, non-intrusive)
        // 1. Wide Ambient Halo (radius: 300px)
        const outerRadius = 280;
        const ambientGlow = ctx.createRadialGradient(x, y, 0, x, y, outerRadius);
        if (darkMode) {
          ambientGlow.addColorStop(0, `rgba(245, 158, 11, ${0.08 * op})`);
          ambientGlow.addColorStop(0.35, `rgba(251, 191, 36, ${0.04 * op})`);
          ambientGlow.addColorStop(0.75, `rgba(217, 119, 6, ${0.012 * op})`);
          ambientGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        } else {
          ambientGlow.addColorStop(0, `rgba(217, 119, 6, ${0.06 * op})`);
          ambientGlow.addColorStop(0.4, `rgba(245, 158, 11, ${0.03 * op})`);
          ambientGlow.addColorStop(0.8, `rgba(245, 158, 11, ${0.008 * op})`);
          ambientGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
        }

        ctx.fillStyle = ambientGlow;
        ctx.beginPath();
        ctx.arc(x, y, outerRadius, 0, Math.PI * 2);
        ctx.fill();

        // 2. Focused Soft Center Aura (radius: 70px)
        const innerRadius = 70;
        const coreGlow = ctx.createRadialGradient(x, y, 0, x, y, innerRadius);
        if (darkMode) {
          coreGlow.addColorStop(0, `rgba(254, 240, 138, ${0.12 * op})`);
          coreGlow.addColorStop(0.4, `rgba(251, 191, 36, ${0.06 * op})`);
          coreGlow.addColorStop(1, 'rgba(245, 158, 11, 0)');
        } else {
          coreGlow.addColorStop(0, `rgba(217, 119, 6, ${0.10 * op})`);
          coreGlow.addColorStop(0.5, `rgba(245, 158, 11, ${0.04 * op})`);
          coreGlow.addColorStop(1, 'rgba(217, 119, 6, 0)');
        }

        ctx.fillStyle = coreGlow;
        ctx.beginPath();
        ctx.arc(x, y, innerRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      cleanupHoveredElement();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
    };
  }, [darkMode, isVisible]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-40 transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        mixBlendMode: darkMode ? 'screen' : 'normal',
      }}
      aria-hidden="true"
    />
  );
};
