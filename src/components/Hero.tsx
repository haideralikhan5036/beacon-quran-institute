import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView, useSpring } from 'motion/react';
import { PlayCircle, ShieldCheck, Star, ArrowRight, MousePointer2, Sparkles } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import logo from '../assets/images/regenerated_image_1778881551298.jpg';
import { useLanguage } from '../context/LanguageContext';
import quranImage from '../assets/images/regenerated_image_1778882224032.jpg';

function StatCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration: 2, ease: [0.33, 1, 0.68, 1] });
      return controls.stop;
    }
  }, [isInView, value, count]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      <span>{suffix}</span>
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#051b23]/90 backdrop-blur-md border border-[#757454]/60 text-amber-200 mb-8 shadow-xl shadow-black/40">
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
              <div className="bg-[#030d12]/75 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-[#757454]/40 shadow-2xl max-w-xl mb-10">
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

            {/* Float Floating Stats Component */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className={`absolute -right-2 sm:-right-8 lg:-right-16 top-0 sm:top-10 z-20 bg-black/40 backdrop-blur-xl p-4 sm:p-8 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.6)] border border-accent/20 flex flex-col gap-4 sm:gap-6 min-w-[150px] sm:min-w-[220px] ${isAr ? 'text-right' : 'text-left'}`}
            >
               <div className={`flex items-center gap-4 sm:gap-5 ${isAr ? 'flex-row-reverse text-right' : ''}`}>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary text-white rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                     <span className="text-accent font-bold">★</span>
                  </div>
                  <div>
                    <p className="text-xl sm:text-3xl font-bold display text-amber-100 leading-none tracking-tight"><StatCounter value={50} suffix="+" /></p>
                     <p className="display text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-black text-accent mt-1">
                       {isAr ? "معلم ومعلمة مجازين" : "Certified Teachers"}
                     </p>
                  </div>
               </div>
               <div className="h-px bg-primary/5"></div>
               <div className={`flex items-center gap-4 sm:gap-5 ${isAr ? 'flex-row-reverse text-right' : ''}`}>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent text-white rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-accent/20">
                     <span className="text-primary font-bold">✔</span>
                  </div>
                  <div>
                    <p className="text-xl sm:text-3xl font-bold display text-amber-100 leading-none tracking-tight"><StatCounter value={1400} suffix="+" /></p>
                     <p className="display text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-black text-accent mt-1">
                       {isAr ? "طالب عبر العالم" : "Total Students"}
                     </p>
                  </div>
               </div>
            </motion.div>

            {/* Live Status Widget */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute -left-4 sm:-left-20 bottom-10 sm:bottom-16 z-30 bg-black/50 backdrop-blur-md p-5 sm:p-7 mt-0 ml-10 rounded-[24px] border border-accent/20 shadow-2xl min-w-[180px] sm:min-w-[220px]"
            >
               <div className={`flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 ${isAr ? 'flex-row-reverse' : ''}`}>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="display text-[7px] sm:text-[8px] font-bold uppercase tracking-[0.4em] text-white/70">
                    {isAr ? "الحالة: نشط الآن" : "Status: Active"}
                  </span>
               </div>
               <div className={`flex flex-col gap-1 ${isAr ? 'items-end' : ''}`}>
                  <span className="display text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] text-accent">
                    {isAr ? "الحلقات الدراسية الفعالة" : "Active Sessions"}
                  </span>
                  <div className={`flex items-center justify-between w-full ${isAr ? 'flex-row-reverse' : ''}`}>
                     <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight tabular-nums">1,402</span>
                     <div className={`flex -space-x-1.5 sm:-space-x-2 ${isAr ? 'flex-row-reverse space-x-reverse opacity-90' : ''}`}>
                        {[1, 2, 3].map(i => (
                          <div key={i} className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-primary bg-accent/20 flex items-center justify-center overflow-hidden">
                             <img src={`https://i.pravatar.cc/100?img=${i+20}`} alt="Active" className="w-full h-full object-cover" loading="lazy" decoding="async" />
                          </div>
                        ))}
                     </div>
                  </div>
               </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
