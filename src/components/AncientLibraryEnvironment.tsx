import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll, useReducedMotion } from 'motion/react';
import libraryBg from '../assets/images/41b403c55a870da536b28b2fd6d4c799.jpg';

export default function AncientLibraryEnvironment() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReduced = useReducedMotion();

  // ─── Scroll ──────────────────────────────────────────────────────────────────
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, { damping: 25, stiffness: 50, mass: 1.0 });

  // ═══════════════════════════════════════════════════════════════════════════
  // TUNNEL EFFECT — zoom FORWARD into the corridor, not upward
  //
  // Key insight: transformOrigin is set to the VANISHING POINT of the corridor
  // which is at ~38% from left, ~52% from top in this specific image.
  // Scale increases → feels like walking INTO the corridor.
  // NO Y translation — that was causing the wrong "upward" movement.
  // ═══════════════════════════════════════════════════════════════════════════
  const tunnelScale = useTransform(smoothScroll, [0, 1], [1.0, 1.9]);

  // Slight brightness increase then settle — mimics walking into a lit space
  const tunnelBrightness = useTransform(
    smoothScroll,
    [0, 0.3, 1],
    [1.0, 1.06, 0.95]
  );

  // Vignette gets tighter as you "walk deeper" — edges darken
  const vignetteBg = useTransform(
    smoothScroll,
    [0, 1],
    [
      'radial-gradient(ellipse 95% 90% at 38% 52%, transparent 0%, rgba(2,4,8,0.08) 65%, rgba(2,4,8,0.55) 100%)',
      'radial-gradient(ellipse 60% 55% at 38% 52%, transparent 0%, rgba(2,4,8,0.30) 55%, rgba(2,4,8,0.88) 100%)',
    ]
  );

  // ─── Mouse Parallax ──────────────────────────────────────────────────────────
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  const springCfg = { damping: 50, stiffness: 45, mass: 1.2 };
  const smoothMouseX = useSpring(rawMouseX, springCfg);
  const smoothMouseY = useSpring(rawMouseY, springCfg);

  // Very subtle parallax tilt — enhances depth without distorting the tunnel
  const imgShiftX = useTransform(smoothMouseX, [-0.5, 0.5], ['-1%', '1%']);
  const imgShiftY = useTransform(smoothMouseY, [-0.5, 0.5], ['-0.8%', '0.8%']);

  const fgParticleX = useTransform(smoothMouseX, [-0.5, 0.5], [-40, 40]);
  const fgParticleY = useTransform(smoothMouseY, [-0.5, 0.5], [-40, 40]);

  // ─── Arch ring scroll animations (pre-computed, no hooks in JSX) ─────────────
  const arch0Opacity = useTransform(smoothScroll, [0.00, 0.14, 0.30], [0, 0.75, 0]);
  const arch0Scale   = useTransform(smoothScroll, [0.00, 0.30], [0.5, 1.65]);
  const arch1Opacity = useTransform(smoothScroll, [0.20, 0.34, 0.50], [0, 0.65, 0]);
  const arch1Scale   = useTransform(smoothScroll, [0.20, 0.50], [0.6, 1.75]);
  const arch2Opacity = useTransform(smoothScroll, [0.40, 0.54, 0.70], [0, 0.55, 0]);
  const arch2Scale   = useTransform(smoothScroll, [0.40, 0.70], [0.65, 1.85]);
  const arch3Opacity = useTransform(smoothScroll, [0.58, 0.72, 0.88], [0, 0.45, 0]);
  const arch3Scale   = useTransform(smoothScroll, [0.58, 0.88], [0.7, 1.95]);

  const archRings = [
    { opacity: arch0Opacity, scale: arch0Scale, w: '42vw', h: '58vh' },
    { opacity: arch1Opacity, scale: arch1Scale, w: '58vw', h: '72vh' },
    { opacity: arch2Opacity, scale: arch2Scale, w: '72vw', h: '85vh' },
    { opacity: arch3Opacity, scale: arch3Scale, w: '86vw', h: '96vh' },
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

  // ─── Canvas: Floating Golden Dust Particles ───────────────────────────────
  useEffect(() => {
    if (prefersReduced) return;
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

    const count = isMobile ? 22 : 60;
    const particles = Array.from({ length: count }).map(() => ({
      x:          Math.random() * W,
      y:          Math.random() * H,
      r:          Math.random() * 2.2 + 0.5,
      alpha:      Math.random() * 0.5 + 0.12,
      baseAlpha:  Math.random() * 0.5 + 0.12,
      vx:         (Math.random() - 0.5) * 0.28,
      vy:         -(Math.random() * 0.45 + 0.06),
      pulseSpeed: Math.random() * 0.016 + 0.004,
      pulsePhase: Math.random() * Math.PI * 2,
      hue:        34 + Math.random() * 22,
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
        p.alpha = p.baseAlpha + Math.sin(p.pulsePhase) * 0.18;

        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4.5);
        g.addColorStop(0,   `hsla(${p.hue}, 88%, 66%, ${Math.max(0, p.alpha)})`);
        g.addColorStop(0.5, `hsla(${p.hue}, 78%, 48%, ${Math.max(0, p.alpha * 0.28)})`);
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
      style={{ backgroundColor: '#0a0c0f' }}
    >
      {/* ═══════════════════════════════════════════════════════════════════════
          1. BACKGROUND IMAGE — Full quality, no distortion
             transformOrigin set to VANISHING POINT of corridor (~38% L, 52% T)
             Scale only — no Y shift — so zoom goes FORWARD into the tunnel
         ═══════════════════════════════════════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{
          scale: tunnelScale,
          // Vanishing point = where the circular arches converge in the distance
          transformOrigin: '38% 52%',
          // Subtle parallax on desktop only
          x: isMobile ? 0 : imgShiftX,
          y: isMobile ? 0 : imgShiftY,
          // Brightness only — NO blur, NO saturate — keeps image crisp
          filter: useTransform(tunnelBrightness, (b) => `brightness(${b})`),
        }}
      >
        <img
          src={libraryBg}
          alt=""
          // High priority — loads before JS renders
          fetchPriority="high"
          decoding="sync"
          className="absolute inset-0 w-full h-full"
          style={{
            objectFit: 'cover',
            objectPosition: '38% center',
            // Crisp rendering — no browser upscale blurring
            imageRendering: 'auto',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
          }}
          draggable={false}
        />
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════════════════
          2. SCROLL-DRIVEN VIGNETTE — tightens as you walk deeper
             Center aligned with vanishing point (38% 52%)
         ═══════════════════════════════════════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0"
        style={{ background: vignetteBg }}
      />

      {/* ═══════════════════════════════════════════════════════════════════════
          3. CONSTANT TOP FADE — helps navbar readability
         ═══════════════════════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-x-0 top-0 h-[20%] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(2,4,8,0.45) 0%, transparent 100%)' }}
      />

      {/* ═══════════════════════════════════════════════════════════════════════
          4. BOTTOM FADE — floor readability
         ═══════════════════════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-x-0 bottom-0 h-[15%] pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(2,4,8,0.6) 0%, transparent 100%)' }}
      />

      {/* ═══════════════════════════════════════════════════════════════════════
          5. ARABIC TEXTURE — extremely subtle grain/depth
         ═══════════════════════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-0 opacity-[0.018] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/arabic-overlay.png")' }}
      />

      {/* ═══════════════════════════════════════════════════════════════════════
          6. GOLDEN DUST PARTICLES — floating ambience
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
          7. SCROLL-TRIGGERED CIRCULAR ARCH RINGS
             These echo the circular arch motif in the real photo
         ═══════════════════════════════════════════════════════════════════════ */}
      {archRings.map((arch, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            opacity: arch.opacity,
            scale: arch.scale,
            transformOrigin: '38% 52%',
          }}
        >
          <div
            className="rounded-full"
            style={{
              width: arch.w,
              height: arch.h,
              border: `${2.5 - i * 0.4}px solid rgba(184,142,67,${0.5 - i * 0.08})`,
              boxShadow: `0 0 35px rgba(184,142,67,0.12), inset 0 0 25px rgba(184,142,67,0.04)`,
              marginLeft: '-8%',
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
