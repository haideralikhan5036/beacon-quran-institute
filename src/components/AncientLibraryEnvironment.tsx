import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll, useReducedMotion } from 'motion/react';
import libraryBg from '../assets/images/41b403c55a870da536b28b2fd6d4c799.jpg';

export default function AncientLibraryEnvironment() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReduced = useReducedMotion();

  // ─── Scroll Physics ──────────────────────────────────────────────────────────
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, { damping: 30, stiffness: 60, mass: 0.9 });

  // TUNNEL EFFECT: scale image as user scrolls — "walking into corridor" illusion
  const tunnelScale      = useTransform(smoothScroll, [0, 1], [1, 1.85]);
  const tunnelY          = useTransform(smoothScroll, [0, 1], ['0%', '-8%']);
  const tunnelFilter     = useTransform(smoothScroll, [0, 0.4, 1], [
    'brightness(1) saturate(1.05)',
    'brightness(1.04) saturate(1.1)',
    'brightness(0.88) saturate(1.0)',
  ]);

  // Vignette — gentle so image stays razor-sharp
  const vignetteBg = useTransform(
    smoothScroll,
    [0, 1],
    [
      'radial-gradient(ellipse 90% 80% at 48% 50%, transparent 0%, rgba(3,6,12,0.12) 65%, rgba(3,6,12,0.60) 100%)',
      'radial-gradient(ellipse 65% 58% at 48% 50%, transparent 0%, rgba(3,6,12,0.32) 58%, rgba(3,6,12,0.80) 100%)',
    ]
  );

  // ─── Mouse Parallax ──────────────────────────────────────────────────────────
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  const springCfg = { damping: 45, stiffness: 55, mass: 1.1 };
  const smoothMouseX = useSpring(rawMouseX, springCfg);
  const smoothMouseY = useSpring(rawMouseY, springCfg);

  const imgShiftX = useTransform(smoothMouseX, [-0.5, 0.5], ['-1.5%', '1.5%']);
  const imgShiftY = useTransform(smoothMouseY, [-0.5, 0.5], ['-1.5%', '1.5%']);

  const fgParticleX = useTransform(smoothMouseX, [-0.5, 0.5], [-60, 60]);
  const fgParticleY = useTransform(smoothMouseY, [-0.5, 0.5], [-60, 60]);

  // ─── Arch ring animations (4 rings) ─────────────────────────────────────────
  const arch0Opacity = useTransform(smoothScroll, [0.00, 0.12, 0.28], [0, 0.7, 0]);
  const arch0Scale   = useTransform(smoothScroll, [0.00, 0.28], [0.55, 1.6]);
  const arch1Opacity = useTransform(smoothScroll, [0.18, 0.30, 0.46], [0, 0.6, 0]);
  const arch1Scale   = useTransform(smoothScroll, [0.18, 0.46], [0.65, 1.7]);
  const arch2Opacity = useTransform(smoothScroll, [0.36, 0.50, 0.66], [0, 0.55, 0]);
  const arch2Scale   = useTransform(smoothScroll, [0.36, 0.66], [0.7, 1.8]);
  const arch3Opacity = useTransform(smoothScroll, [0.55, 0.68, 0.85], [0, 0.5, 0]);
  const arch3Scale   = useTransform(smoothScroll, [0.55, 0.85], [0.75, 1.9]);

  const archAnimations = [
    { opacity: arch0Opacity, scale: arch0Scale, w: '36vw', h: '50vh', border: 'rgba(184,142,67,0.45)' },
    { opacity: arch1Opacity, scale: arch1Scale, w: '50vw', h: '65vh', border: 'rgba(184,142,67,0.35)' },
    { opacity: arch2Opacity, scale: arch2Scale, w: '64vw', h: '78vh', border: 'rgba(184,142,67,0.28)' },
    { opacity: arch3Opacity, scale: arch3Scale, w: '80vw', h: '92vh', border: 'rgba(184,142,67,0.20)' },
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
        rawMouseX.set(e.clientX / window.innerWidth - 0.5);
        rawMouseY.set(e.clientY / window.innerHeight - 0.5);
        ticking = false;
      });
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', checkMobile);
    };
  }, [rawMouseX, rawMouseY]);

  // ─── HTML5 Canvas: Floating Golden Dust Particles ───────────────────────────
  useEffect(() => {
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

    const count = isMobile ? 22 : 60; // Mobile: minimal particles for perf
    const particles = Array.from({ length: count }).map(() => ({
      x:          Math.random() * W,
      y:          Math.random() * H,
      r:          Math.random() * 2.4 + 0.5,
      alpha:      Math.random() * 0.55 + 0.15,
      baseAlpha:  Math.random() * 0.55 + 0.15,
      vx:         (Math.random() - 0.5) * 0.3,
      vy:         -(Math.random() * 0.5 + 0.07),
      pulseSpeed: Math.random() * 0.018 + 0.004,
      pulsePhase: Math.random() * Math.PI * 2,
      hue:        36 + Math.random() * 20,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20)    p.x = W + 20;
        if (p.x > W + 20) p.x = -20;
        if (p.y < -20)    p.y = H + 20;
        p.pulsePhase += p.pulseSpeed;
        p.alpha = p.baseAlpha + Math.sin(p.pulsePhase) * 0.2;

        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        g.addColorStop(0,   `hsla(${p.hue}, 90%, 68%, ${Math.max(0, p.alpha)})`);
        g.addColorStop(0.5, `hsla(${p.hue}, 80%, 50%, ${Math.max(0, p.alpha * 0.3)})`);
        g.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, [isMobile]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1] select-none bg-[#07130e]">

      {/* ═══ 1. REAL PHOTO BACKGROUND + SCROLL TUNNEL ZOOM ════════════════════ */}
      <div className="absolute inset-0 overflow-hidden" style={{ perspective: '900px' }}>
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{
            scale: tunnelScale,
            y: tunnelY,
            x: isMobile ? '0%' : imgShiftX,
            filter: tunnelFilter,
            transformOrigin: '48% 50%',
          }}
        >
          <img
            src={libraryBg}
            alt=""
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{ imageRendering: 'high-quality', minHeight: '100vh', minWidth: '100vw' }}
            draggable={false}
          />
        </motion.div>
      </div>

      {/* ═══ 2. SCROLL-DRIVEN RADIAL VIGNETTE ═════════════════════════════════ */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: vignetteBg }}
      />

      {/* ═══ 3. WARM AMBER CEILING GLOW ═══════════════════════════════════════ */}
      <div
        className="absolute inset-x-0 top-0 h-[35%] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(200,110,20,0.08) 0%, transparent 100%)' }}
      />

      {/* ═══ 4. FLOOR FOG ══════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-x-0 bottom-0 h-[18%] pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(4,10,6,0.6) 0%, transparent 100%)' }}
      />

      {/* ═══ 5. ARABIC TEXTURE OVERLAY ═════════════════════════════════════════ */}
      <div
        className="absolute inset-0 opacity-[0.022] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/arabic-overlay.png")' }}
      />

      {/* ═══ 6. CANVAS GOLDEN DUST PARTICLES ══════════════════════════════════ */}
      <motion.div
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{ x: fgParticleX, y: fgParticleY }}
      >
        <canvas ref={canvasRef} className="absolute inset-0 opacity-65" />
      </motion.div>

      {/* ═══ 7. SCROLL-TRIGGERED GOLDEN ARCH RINGS ════════════════════════════ */}
      {archAnimations.map((arch, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ opacity: arch.opacity, scale: arch.scale }}
        >
          <div
            className="rounded-t-full"
            style={{
              width: arch.w,
              height: arch.h,
              border: `2px solid ${arch.border}`,
              boxShadow: `0 0 30px rgba(184,142,67,0.15), inset 0 0 20px rgba(184,142,67,0.05)`,
            }}
          />
        </motion.div>
      ))}

      {/* ═══ 8. TOP + BOTTOM READABILITY FADE ════════════════════════════════ */}
      <div
        className="absolute inset-0 pointer-events-none z-[8]"
        style={{
          background: 'linear-gradient(to bottom, rgba(4,10,6,0.35) 0%, transparent 14%, transparent 80%, rgba(4,10,6,0.5) 100%)'
        }}
      />
    </div>
  );
}
