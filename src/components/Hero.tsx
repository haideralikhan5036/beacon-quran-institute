import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView, useSpring } from 'motion/react';
import { PlayCircle, ShieldCheck, Star, ArrowRight, MousePointer2, Sparkles } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import logo from '../assets/images/regenerated_image_1778881551298.jpg';
import { useLanguage } from '../context/LanguageContext';
import quranImage from '../assets/images/regenerated_image_1778882224032.jpg';

function StatCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setCount(Math.round(latest));
      }
    });
    return () => controls.stop();
  }, [value, isInView]);

  return (
    <span ref={ref} className="tabular-nums font-bold">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

function MagneticButton({ children, className = "", onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 15, stiffness: 150 });
  const springY = useSpring(y, { damping: 15, stiffness: 150 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((e.clientX - centerX) * 0.4);
    y.set((e.clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

export default function Hero() {
  const { t, isAr } = useLanguage();

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section 
      className="relative min-h-[95vh] flex items-center pt-16 overflow-hidden bg-transparent"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-[100px]"></div>
        <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/arabic-overlay.png")' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-16">
        <div className="grid lg:grid-cols-[1.2fr,1fr] gap-12 lg:gap-20 items-center">
          <div className="relative">
            <Reveal direction="right" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#051b23]/90 backdrop-blur-md border border-[#949693]/40 text-amber-200 mb-8 shadow-xl shadow-black/40">
                <Sparkles className="w-4 h-4 text-accent animate-pulse" />
                <span className={`display uppercase font-extrabold text-amber-200 ${isAr ? 'text-[12px] tracking-normal' : 'text-[10px] tracking-[0.25em]'}`}>{t('hero.badge')}</span>
              </div>
            </Reveal>

            <h1 className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black display tracking-tight text-balance flex flex-col gap-1 sm:gap-2 leading-tight mb-10 ${isAr ? 'text-right font-medium' : ''}`}>
              <motion.span 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-amber-50 block leading-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
              >
                {t('hero.title1')}
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="text-accent block leading-none italic serif font-semibold my-1"
              >
                {t('hero.title2')}
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-amber-50 block leading-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
              >
                {t('hero.title3')}
              </motion.span>
            </h1>

            <Reveal delay={0.65} width="100%">
              <div 
                className="flex flex-col items-start gap-4 mb-8"
              >
                <div className="flex flex-col items-start">
                  <div className="display text-accent font-bold text-[10px] uppercase mb-2 tracking-[0.4em]">
                    {t('hero.subtitle')}
                  </div>
                  <div className="w-16 h-[2.5px] bg-accent/30" />
                </div>
              </div>
            </Reveal>
 
            <Reveal delay={0.75} width="100%">
              <div className="bg-[#030d12]/75 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-[#949693]/40 shadow-2xl max-w-xl mb-10">
                <p className={`text-lg md:text-xl text-amber-50 leading-relaxed text-balance serif italic ${isAr ? 'text-right' : ''}`}>
                  {t('hero.description')}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.85} width="100%">
              <div className={`flex flex-wrap gap-5 ${isAr ? 'flex-row-reverse' : ''}`}>
                <MagneticButton 
                  onClick={scrollToContact}
                  className="group relative overflow-hidden bg-[#084C63] text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-[11px] transition-all shadow-xl shadow-[#084C63]/30 flex items-center gap-2 cursor-pointer border border-[#949693]/30"
                >
                  <span className="relative z-10">{t('hero.startJourney')}</span>
                  <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10 ${isAr ? 'rotate-180' : ''}`} />
                  <div className="absolute inset-0 bg-[#757454] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                </MagneticButton>
                
                <button 
                  onClick={() => {
                    const el = document.getElementById('courses');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group flex items-center gap-3 border border-accent/30 text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-primary hover:text-white transition-all shadow-lg active:scale-95 cursor-pointer"
                >
                  <PlayCircle className="w-5 h-5 text-accent group-hover:text-white transition-colors" />
                  <span>{t('hero.methodology')}</span>
                </button>
              </div>
            </Reveal>

            <Reveal delay={1.0} width="100%">
              <div className={`mt-12 sm:mt-16 flex flex-col sm:flex-row items-center gap-8 border-t border-primary/5 pt-8 ${isAr ? 'sm:flex-row-reverse' : ''}`}>
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-cream overflow-hidden bg-primary/10">
                      <img 
                        src={`https://i.pravatar.cc/100?img=${i+10}`} 
                        alt="Student" 
                        loading="lazy" 
                        decoding="async" 
                      />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-cream bg-accent flex items-center justify-center text-[10px] font-bold text-primary">
                    +500
                  </div>
                </div>
                <div className={`flex flex-col gap-1 ${isAr ? 'items-end' : ''}`}>
                  <div className={`flex gap-1 ${isAr ? 'flex-row-reverse' : ''}`}>
                    {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-3 h-3 fill-accent text-accent" />)}
                  </div>
                  <p className={`display text-[10px] font-bold uppercase text-amber-100/70 ${isAr ? 'tracking-normal' : 'tracking-widest'}`}>{t('hero.trustedBy')}</p>
                </div>
              </div>
            </Reveal>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative lg:mt-0 mt-20"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(27,84,61,0.3)] border-[1px] border-white/50 aspect-[4/5] sm:aspect-[4/5.5] group w-full max-w-[511px] mx-auto">
              <motion.img
                src={quranImage}
                alt="The Holy Quran"
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030d12]/90 via-[#084C63]/30 to-transparent opacity-80"></div>
              
              <div className="absolute bottom-8 left-6 right-6 sm:bottom-12 sm:left-10 sm:right-10">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 p-6 sm:p-8 rounded-3xl"
                >
                  <p className={`text-lg sm:text-xl italic serif text-white leading-relaxed mb-4 ${isAr ? 'text-right' : 'text-left'}`}>
                    {isAr 
                      ? "«خيركم من تعلّم القرآن وعلّمه»"
                      : '"The best of you is the one who learns the Quran and teaches it."'
                    }
                  </p>
                  <div className={`flex items-center gap-2 ${isAr ? 'flex-row-reverse' : ''}`}>
                    <div className="h-px w-6 bg-accent opacity-50"></div>
                    <span className="display text-[9px] font-bold uppercase tracking-widest text-accent">
                      {isAr ? "صحيح البخاري" : "Saheeh Bukhari"}
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* "Our Impact" Radial Arc Gauge Component (Ultra-Professional Luxury Redesign) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className={`absolute -right-2 sm:-right-6 lg:-right-10 bottom-2 sm:bottom-6 z-20 card-shine border-2 border-[#757454]/60 hover:border-[#757454] p-7 sm:p-8 rounded-[3rem] shadow-[0_30px_90px_rgba(0,0,0,0.85)] backdrop-blur-2xl bg-[#051b23]/95 text-amber-50 max-w-[330px] sm:max-w-[370px] w-full transition-all duration-300 ${isAr ? 'text-right' : 'text-left'}`}
            >
              {/* 1. Header: Brand Luxury Badge & Title */}
              <div className={`mb-3 ${isAr ? 'text-right' : 'text-left'}`}>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#084C63]/60 border border-[#757454]/50 mb-2 ${isAr ? 'flex-row-reverse' : ''}`}>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span className="display text-[9px] font-extrabold uppercase tracking-[0.3em] text-amber-200">
                    {isAr ? "التميز والأثر الأكاديمي" : "Institutional Impact"}
                  </span>
                </div>
                <h4 className="text-3xl sm:text-4xl font-bold serif italic text-amber-50 tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                  {isAr ? "أثرنا التعليمي" : "Impact"}
                </h4>
              </div>

              {/* 2. Middle SVG: Arc Gauge + Glowing SVG Gradients + Curved Connectors */}
              <div className="relative w-full h-[155px] flex items-center justify-start my-2 overflow-visible">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 270 155">
                  <defs>
                    {/* Gradient 1: Amber to Emerald for Students */}
                    <linearGradient id="arcGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FCD34D" />
                      <stop offset="100%" stopColor="#10B981" />
                    </linearGradient>

                    {/* Gradient 2: Fusion Gold for Faculty */}
                    <linearGradient id="arcGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#757454" />
                      <stop offset="100%" stopColor="#F59E0B" />
                    </linearGradient>

                    {/* Gradient 3: Cyan to Midnight Green for Nations */}
                    <linearGradient id="arcGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#06B6D4" />
                      <stop offset="100%" stopColor="#084C63" />
                    </linearGradient>
                  </defs>

                  {/* Top Arc Block (1,400+ Students) */}
                  <path
                    d="M 110 15 A 65 65 0 0 0 50 58 L 70 68 A 45 45 0 0 1 113 35 Z"
                    fill="url(#arcGrad1)"
                    className="drop-shadow-[0_0_8px_rgba(252,211,77,0.4)]"
                  />

                  {/* Middle Arc Block (50+ Tutors) */}
                  <path
                    d="M 45 66 A 65 65 0 0 0 45 108 L 65 100 A 45 45 0 0 1 65 74 Z"
                    fill="url(#arcGrad2)"
                    className="drop-shadow-[0_0_8px_rgba(117,116,84,0.4)]"
                  />

                  {/* Bottom Arc Block (30+ Nations) */}
                  <path
                    d="M 50 116 A 65 65 0 0 0 110 158 L 113 138 A 45 45 0 0 1 70 106 Z"
                    fill="url(#arcGrad3)"
                    className="drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]"
                  />

                  {/* Dotted Lines to Dots */}
                  <path d="M 113 35 L 133 25 L 153 25" fill="none" stroke="rgba(252,211,77,0.8)" strokeWidth="1.8" />
                  <circle cx="153" cy="25" r="4" fill="#FCD34D" className="animate-pulse" />

                  <line x1="65" y1="87" x2="153" y2="87" stroke="rgba(245,158,11,0.8)" strokeWidth="1.8" />
                  <circle cx="153" cy="87" r="4" fill="#F59E0B" className="animate-pulse" />

                  <path d="M 113 138 L 133 148 L 153 148" fill="none" stroke="rgba(6,182,212,0.8)" strokeWidth="1.8" />
                  <circle cx="153" cy="148" r="4" fill="#06B6D4" className="animate-pulse" />

                  {/* Curved Connector Lines drawn from dots down to stat labels */}
                  <path d="M 153 25 C 230 25, 240 145, 175 170" fill="none" stroke="rgba(252,211,77,0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
                  <path d="M 153 87 C 245 87, 255 220, 175 245" fill="none" stroke="rgba(245,158,11,0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
                  <path d="M 153 148 C 260 148, 270 295, 175 320" fill="none" stroke="rgba(6,182,212,0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
                </svg>

                {/* Animated StatCounters Inside Arc Blocks */}
                <div className="absolute top-[24px] left-[63px] text-white font-extrabold text-[11px] sm:text-[12px] pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  <StatCounter value={1400} suffix="+" />
                </div>
                <div className="absolute top-[76px] left-[40px] text-white font-extrabold text-[11px] sm:text-[12px] pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  <StatCounter value={50} suffix="+" />
                </div>
                <div className="absolute top-[124px] left-[63px] text-white font-extrabold text-[11px] sm:text-[12px] pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  <StatCounter value={30} suffix="+" />
                </div>
              </div>

              {/* 3. Bottom Half: 3 Interactive Luxury Stat Cards */}
              <div className="space-y-3.5 pt-3 border-t border-[#757454]/40 mt-1">
                {/* Item 1: 1,400+ Total Students */}
                <div className={`p-2.5 rounded-2xl bg-[#084C63]/30 border border-[#757454]/30 hover:border-[#FCD34D]/60 hover:bg-[#084C63]/60 transition-all ${isAr ? 'text-right' : 'text-left'}`}>
                  <div className={`flex items-center justify-between ${isAr ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-baseline gap-2 ${isAr ? 'flex-row-reverse' : ''}`}>
                      <span className="text-xl sm:text-2xl font-extrabold display text-[#FCD34D] tracking-tight leading-none drop-shadow">
                        <StatCounter value={1400} suffix="+" />
                      </span>
                      <h5 className="text-sm font-bold text-white tracking-tight">
                        {isAr ? "طلاب نشطون" : "Total Students"}
                      </h5>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
                  </div>
                  <p className="text-[10.5px] text-amber-100/80 font-medium mt-1 leading-tight">
                    {isAr ? "خريجون ودارسون حالياً عبر العالم" : "Active enrolled learners worldwide"}
                  </p>
                </div>

                {/* Item 2: 50+ Certified Teachers */}
                <div className={`p-2.5 rounded-2xl bg-[#084C63]/30 border border-[#757454]/30 hover:border-[#F59E0B]/60 hover:bg-[#084C63]/60 transition-all ${isAr ? 'text-right' : 'text-left'}`}>
                  <div className={`flex items-center justify-between ${isAr ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-baseline gap-2 ${isAr ? 'flex-row-reverse' : ''}`}>
                      <span className="text-xl sm:text-2xl font-extrabold display text-amber-300 tracking-tight leading-none drop-shadow">
                        <StatCounter value={50} suffix="+" />
                      </span>
                      <h5 className="text-sm font-bold text-white tracking-tight">
                        {isAr ? "كادر مجاز" : "Certified Teachers"}
                      </h5>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                  </div>
                  <p className="text-[10.5px] text-amber-100/80 font-medium mt-1 leading-tight">
                    {isAr ? "كادر تعليمي بأسانيد متصلة" : "Distinguished faculty with Ijazah"}
                  </p>
                </div>

                {/* Item 3: 30+ Global Nations */}
                <div className={`p-2.5 rounded-2xl bg-[#084C63]/30 border border-[#757454]/30 hover:border-[#06B6D4]/60 hover:bg-[#084C63]/60 transition-all ${isAr ? 'text-right' : 'text-left'}`}>
                  <div className={`flex items-center justify-between ${isAr ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-baseline gap-2 ${isAr ? 'flex-row-reverse' : ''}`}>
                      <span className="text-xl sm:text-2xl font-extrabold display text-emerald-400 tracking-tight leading-none drop-shadow">
                        <StatCounter value={30} suffix="+" />
                      </span>
                      <h5 className="text-sm font-bold text-white tracking-tight">
                        {isAr ? "دول التغطية" : "Global Nations"}
                      </h5>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  </div>
                  <p className="text-[10.5px] text-amber-100/80 font-medium mt-1 leading-tight">
                    {isAr ? "تغطية عبر ٤ قارات" : "Active presence across 4 continents"}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
