import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll, useReducedMotion } from 'motion/react';
import libraryBg from '../assets/images/modern_library_bg.jpg';

export default function AncientLibraryEnvironment() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReduced = useReducedMotion();

  // ─── Scroll ──────────────────────────────────────────────────────────────────
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, { damping: 25, stiffness: 50, mass: 1.0 });

  // ═══════════════════════════════════════════════════════════════════════════
  // TUNNEL EFFECT — Perfect 50% 50% center zoom into modern library corridor
  // ═══════════════════════════════════════════════════════════════════════════
  const tunnelScale = useTransform(smoothScroll, [0, 1], [1.0, 1.8]);

  const tunnelBrightness = useTransform(
    smoothScroll,
    [0, 0.3, 1],
    [1.0, 1.08, 0.96]
  );
  const tunnelFilter = useTransform(tunnelBrightness, (b) => `brightness(${b})`);

  // Radial vignette aligned to center (50% 50%) with Midnight Green tint
  const vignetteBg = useTransform(
    smoothScroll,
    [0, 1],
    [
      'radial-gradient(ellipse 95% 90% at 50% 50%, transparent 0%, rgba(3,13,18,0.06) 65%, rgba(3,13,18,0.65) 100%)',
      'radial-gradient(ellipse 60% 55% at 50% 50%, transparent 0%, rgba(3,13,18,0.25) 55%, rgba(3,13,18,0.92) 100%)',
    ]
  );

  // ─── Mouse Parallax ──────────────────────────────────────────────────────────
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  const springCfg = { damping: 50, stiffness: 45, mass: 1.2 };
  const smoothMouseX = useSpring(rawMouseX, springCfg);
  const smoothMouseY = useSpring(rawMouseY, springCfg);

  const imgShiftX = useTransform(smoothMouseX, [-0.5, 0.5], ['-0.8%', '0.8%']);
  const imgShiftY = useTransform(smoothMouseY, [-0.5, 0.5], ['-0.8%', '0.8%']);

  const fgParticleX = useTransform(smoothMouseX, [-0.5, 0.5], [-35, 35]);
  const fgParticleY = useTransform(smoothMouseY, [-0.5, 0.5], [-35, 35]);

  // ─── Arch ring scroll animations aligned to center ───────────────────────────
  const arch0Opacity = useTransform(smoothScroll, [0.00, 0.14, 0.30], [0, 0.7, 0]);
  const arch0Scale   = useTransform(smoothScroll, [0.00, 0.30], [0.5, 1.6]);
  const arch1Opacity = useTransform(smoothScroll, [0.20, 0.34, 0.50], [0, 0.6, 0]);
  const arch1Scale   = useTransform(smoothScroll, [0.20, 0.50], [0.6, 1.7]);
  const arch2Opacity = useTransform(smoothScroll, [0.40, 0.54, 0.70], [0, 0.5, 0]);
  const arch2Scale   = useTransform(smoothScroll, [0.40, 0.70], [0.65, 1.8]);
  const arch3Opacity = useTransform(smoothScroll, [0.58, 0.72, 0.88], [0, 0.4, 0]);
  const arch3Scale   = useTransform(smoothScroll, [0.58, 0.88], [0.7, 1.9]);

  const archRings = [
    { opacity: arch0Opacity, scale: arch0Scale, w: '44vw', h: '60vh' },
    { opacity: arch1Opacity, scale: arch1Scale, w: '60vw', h: '74vh' },
    { opacity: arch2Opacity, scale: arch2Scale, w: '74vw', h: '86vh' },
    { opacity: arch3Opacity, scale: arch3Scale, w: '88vw', h: '96vh' },
  ];

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(('ontouchstart' in window) || window.innerWidth < 1024);
    };
    checkMobile();

    let ticking = false;
    const onMouseMove = (e: MouseEvent) => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        rawMouseX.set(e.clientX / window.innerWidth  - 0.5);
        rawMouseY.set(e.clientY / window.innerHeight - 0.5);
        ticking = false;
      });
    };

    if (!prefersReduced && !isMobile) {
      window.addEventListener('mousemove', onMouseMove);
    }
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', checkMobile);
    };
  }, [rawMouseX, rawMouseY, prefersReduced, isMobile]);

  // ─── Canvas: Brand Colored Dust Particles (Desktop Only) ──────
  useEffect(() => {
    if (prefersReduced || isMobile) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let W = (canvas.width  = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const count = 45;
    const particles = Array.from({ length: count }).map(() => {
      const isGold = Math.random() > 0.4;
      return {
        x:          Math.random() * W,
        y:          Math.random() * H,
        r:          Math.random() * 2.0 + 0.6,
        alpha:      Math.random() * 0.5 + 0.15,
        baseAlpha:  Math.random() * 0.5 + 0.15,
        vx:         (Math.random() - 0.5) * 0.25,
        vy:         -(Math.random() * 0.4 + 0.05),
        pulseSpeed: Math.random() * 0.015 + 0.004,
        pulsePhase: Math.random() * Math.PI * 2,
        hue:        isGold ? (40 + Math.random() * 15) : (185 + Math.random() * 20),
        sat:        isGold ? 60 : 75,
      };
    });

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20)    p.x = W + 20;
        if (p.x > W + 20) p.x = -20;
        if (p.y < -20)    p.y = H + 20;
        p.pulsePhase += p.pulseSpeed;
        p.alpha = p.baseAlpha + Math.sin(p.pulsePhase) * 0.18;

        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4.5);
        g.addColorStop(0,   `hsla(${p.hue}, ${p.sat}%, 65%, ${Math.max(0, p.alpha)})`);
        g.addColorStop(0.5, `hsla(${p.hue}, ${p.sat}%, 45%, ${Math.max(0, p.alpha * 0.3)})`);
        g.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4.5, 0, Math.PI * 2);
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, [isMobile, prefersReduced]);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none z-[-1] select-none"
      style={{ backgroundColor: '#030d12' }}
    >
      {/* ═══════════════════════════════════════════════════════════════════════
          1. MODERN LIBRARY BACKGROUND IMAGE — Exact 50% 50% Center Tunnel Zoom
         ═══════════════════════════════════════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{
          scale: tunnelScale,
          transformOrigin: '50% 50%',
          x: isMobile ? 0 : imgShiftX,
          y: isMobile ? 0 : imgShiftY,
          filter: tunnelFilter,
        }}
      >
        <img
          src={libraryBg}
          alt=""
          fetchPriority="high"
          decoding="sync"
          className="absolute inset-0 w-full h-full"
          style={{
            objectFit: 'cover',
            objectPosition: 'center center',
            imageRendering: 'auto',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
          }}
          draggable={false}
        />
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════════════════
          2. SCROLL-DRIVEN VIGNETTE — Midnight Green Tinted
         ═══════════════════════════════════════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0"
        style={{ background: vignetteBg }}
      />

      {/* ═══════════════════════════════════════════════════════════════════════
          3. CONSTANT TOP FADE — Header readability
         ═══════════════════════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-x-0 top-0 h-[22%] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(3,13,18,0.55) 0%, transparent 100%)' }}
      />

      {/* ═══════════════════════════════════════════════════════════════════════
          4. BOTTOM FADE — Footer readability
         ═══════════════════════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-x-0 bottom-0 h-[18%] pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(3,13,18,0.65) 0%, transparent 100%)' }}
      />

      {/* ═══════════════════════════════════════════════════════════════════════
          5. BRAND PARTICLES — Fusion Gold & Midnight Green
         ═══════════════════════════════════════════════════════════════════════ */}
      {!prefersReduced && (
        <motion.div
          className="absolute inset-0 z-[5] pointer-events-none"
          style={{ x: fgParticleX, y: fgParticleY }}
        >
          <canvas ref={canvasRef} className="absolute inset-0 opacity-60" />
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          6. SCROLL-TRIGGERED CIRCULAR ARCH RINGS — Desktop Only
         ═══════════════════════════════════════════════════════════════════════ */}
      {!isMobile && archRings.map((arch, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            opacity: arch.opacity,
            scale: arch.scale,
            transformOrigin: '50% 50%',
          }}
        >
          <div
            className="rounded-full"
            style={{
              width: arch.w,
              height: arch.h,
              border: `${2.0 - i * 0.3}px solid rgba(117, 116, 84, ${0.45 - i * 0.08})`,
              boxShadow: `0 0 30px rgba(117, 116, 84, 0.12), inset 0 0 20px rgba(8, 76, 99, 0.08)`,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
