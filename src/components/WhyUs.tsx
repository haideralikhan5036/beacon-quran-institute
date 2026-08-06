import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Clock, Users, ShieldCheck, Globe, Trophy, Sparkles, ChevronLeft, ChevronRight, ArrowRight, ArrowLeft } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import { useLanguage } from '../context/LanguageContext';

const reasonsEn = [
  {
    title: '1-on-1 Personalized Classes',
    desc: 'Each student gets full attention from their tutor for rapid progress.',
    icon: Users,
    size: 'lg'
  },
  {
    title: 'Certified Expert Tutors',
    desc: 'Ijazah holders and graduates from reputable Islamic universities.',
    icon: Trophy,
    size: 'sm'
  },
  {
    title: 'Flexible scheduling (24/7)',
    desc: 'Learn at any time that suits your busy lifestyle from anywhere.',
    icon: Clock,
    size: 'sm'
  },
  {
    title: 'Safe & Secure Environment',
    desc: 'We prioritize student safety with monitored classes and verified staff.',
    icon: ShieldCheck,
    size: 'md'
  },
  {
    title: 'Multi-Lingual Instruction',
    desc: 'Available in English, Arabic, and Urdu.',
    icon: Globe,
    size: 'sm'
  },
  {
    title: 'Regular Progress Reports',
    desc: 'Monthly detailed performance reports and feedback.',
    icon: CheckCircle2,
    size: 'sm'
  },
];

const reasonsAr = [
  {
    title: 'حلقات فردية مخصصة (تحفيظ وجه لوجه)',
    desc: 'يتلقى كل طالب وطالبة المتابعة المباشرة والتركيز الكامل من رائد الحصة لضمان التقدم الأسرع والأصح.',
    icon: Users,
    size: 'lg'
  },
  {
    title: 'معلمون مجازون متخصصون',
    desc: 'نخبة من حملة الإجازات القرآنية العالية بالسند المتصل وخريجي كبرى الجامعات الإسلامية المرموقة.',
    icon: Trophy,
    size: 'sm'
  },
  {
    title: 'خطط وجدولة مرنة للغاية (٢٤/٧)',
    desc: 'تعلم واحفظ في أي وقت من ليل أو نهار بما يوافق مهامك وأوقات فراغك من جميع أنحاء المعمورة.',
    icon: Clock,
    size: 'sm'
  },
  {
    title: 'بيئة تعليمية مأمونة ومراقبة',
    desc: 'نضع سلامة وأمان الطلاب في رأس أولوياتنا مع مراجعة ومتابعة الدروس بدقة وتوظيف معلمين معتمدين.',
    icon: ShieldCheck,
    size: 'md'
  },
  {
    title: 'تدريس متاح بعدة لغات شائعة',
    desc: 'نقدم الشرح والمتابعة باللغات العربية، الإنجليزية، والأوردية لتسهيل الاستيعاب لغير الناطقين بها.',
    icon: Globe,
    size: 'sm'
  },
  {
    title: 'تقارير دورية وشهرية للأداء',
    desc: 'تقارير تفصيلية شهرية توضح مدى تقدم الطالب ومستوى حفظه مع إرشادات قيمة لولي الأمر.',
    icon: CheckCircle2,
    size: 'sm'
  },
];

export default function WhyUs() {
  const { isAr } = useLanguage();
  const reasons = isAr ? reasonsAr : reasonsEn;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % reasons.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isPaused, reasons.length]);

  const titleSub = isAr ? 'عن صرح ومنارة القرآن الكريْم' : 'About the Institute';
  const mainTitle = isAr ? (
    <>إرث عريـــق مـن<br /><span className="text-accent italic font-semibold">التعليم الإلهي</span> المبارك</>
  ) : (
    <>A Legacy of <br /><span className="text-accent italic font-semibold">Divine</span> Education</>
  );
  const descriptionText = isAr 
    ? 'تأسس معهد منارة القرآن الكريم على ركائز الإتقان التام في التجويد ونشر النور والهدى الإلهي. نوفر واحة آمنة ومثالية لكل من يرجو الاتصال بآيات الذكر الحكيم وترتيلها وفهمها عبر توجيه فردي دقيق وممتاز.' 
    : 'Beacon Quran Institute founded on the principles of Tajweed excellence and spiritual purity. We provide a sanctuary for those seeking to connect deeply with the Word of Allah through personalized, expert guidance.';

  const bullets = isAr ? [
    'عقد كامل من التميز والريادة التعليمية والأكاديمية',
    'حضور وانتشار رسمي يخدم الدارسين في أكثر من ٣٠ بلداً',
    'مناهج تربوية مبسطة ومحببة لقلوب الصغار والناشئة',
    'طاقم معلمات فاضلات قديرات مجازات لخدمة الأخوات بخصوصية'
  ] : [
    'A decade of pedagogical excellence',
    'Global presence in 30+ nations',
    'Specialized curriculum for young hearts',
    'Dedicated female faculty for sisters'
  ];

  const buttonText = isAr ? 'رسالتنا ورؤيتنا الأكاديمية' : 'Our Mission & Vision';
  const buttonHover = isAr ? 'استكشف المعهد' : 'Explore More';
  const badgeCardText = isAr ? 'العلم النافع' : 'Knowledge First';

  return (
    <section id="about" className="py-12 sm:py-16 bg-transparent text-white overflow-hidden relative">
      {/* Decorative Ornaments - Professional Polish */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-accent/10 rounded-full blur-[100px] -mr-[15%] -mt-[10%]"></div>
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-white/5 rounded-full blur-[100px] -ml-[15%] -mb-[10%]"></div>
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/arabic-overlay.png")' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`grid lg:grid-cols-[0.8fr,1fr] gap-16 lg:gap-24 items-start ${isAr ? 'text-right' : ''}`}>
          <div className="lg:sticky lg:top-32">
            <Reveal direction={isAr ? 'left' : 'right'} delay={0.1}>
              <div className={`flex items-center gap-2 mb-6 ${isAr ? 'flex-row-reverse' : ''}`}>
                <Sparkles className="w-4 h-4 text-accent" />
                <h2 className="display text-[11px] font-bold uppercase tracking-[0.4em] text-accent">{titleSub}</h2>
              </div>
            </Reveal>

            <Reveal direction={isAr ? 'left' : 'right'} delay={0.2}>
              <h3 className="text-4xl md:text-5xl xl:text-6xl font-bold display mb-8 leading-[1.1] text-balance">
                {mainTitle}
              </h3>
            </Reveal>

            <Reveal direction={isAr ? 'left' : 'right'} delay={0.3}>
              <p className="text-white/90 text-lg mb-12 leading-relaxed text-balance font-medium">
                {descriptionText}
              </p>
            </Reveal>

            <div className="space-y-6 mb-12">
              {bullets.map((item, i) => (
                <Reveal key={item} direction={isAr ? 'left' : 'right'} delay={0.4 + (i * 0.1)}>
                  <div className={`flex items-center gap-4 group ${isAr ? 'flex-row-reverse' : ''}`}>
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center border border-accent/40 group-hover:bg-accent transition-all duration-500">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent group-hover:text-primary transition-colors" />
                    </div>
                    <span className="text-white/90 font-semibold tracking-wide text-sm">{item}</span>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal direction={isAr ? 'left' : 'right'} delay={0.8}>
               <button className="relative group overflow-hidden bg-accent text-white px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] transition-shadow hover:shadow-2xl hover:shadow-accent/20">
                 <span className="relative z-10">{buttonText}</span>
                 <div className="absolute inset-0 bg-white translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                 <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-white group-hover:text-primary flex items-center justify-center font-bold uppercase tracking-[0.2em] text-[10px]">{buttonHover}</div>
               </button>
            </Reveal>
          </div>

          {/* 3D Stacking Deck Viewport for WhyUs Section */}
          <div 
            className="relative w-full max-w-xl mx-auto lg:mx-0 h-[480px] sm:h-[500px] flex flex-col justify-center items-center overflow-visible select-none lg:pt-12"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Ellipictic aura platform shadow under the stack */}
            <div className="absolute inset-y-0 -left-[10%] -right-[10%] bg-gradient-to-t from-accent/[0.015] via-transparent to-transparent blur-2xl rounded-full pointer-events-none z-0" />

            {/* Viewport container with rich 3D perspective */}
            <div 
              className="w-full h-[360px] sm:h-[400px] relative flex items-center justify-center overflow-visible"
              style={{ perspective: 1800, transformStyle: 'preserve-3d' }}
            >
              {reasons.map((reason, index) => {
                let diff = index - activeIndex;
                const total = reasons.length;

                // Infinite loop circular arithmetic
                if (diff > total / 2) diff -= total;
                else if (diff < -total / 2) diff += total;

                const isActive = index === activeIndex;
                const isVisible = Math.abs(diff) <= 1;
                const isNearVisible = Math.abs(diff) <= 2;

                // Keep DOM efficient - prune far elements
                if (!isNearVisible) return null;

                const factor = isAr ? -1 : 1;
                
                // Arch Fan parameters
                let xTranslate = 0;
                let yTranslate = 0;
                let zTranslate = 0;
                let rotateY = 0;
                let rotateX = 0;
                let rotateZ = 0;
                let cardScale = 1;
                let cardOpacity = 1;

                if (diff === 0) {
                  xTranslate = 0;
                  yTranslate = 0;
                  zTranslate = isMobile ? 0 : 140;
                  rotateY = 0;
                  rotateX = 0;
                  rotateZ = 0;
                  cardScale = 1.02;
                  cardOpacity = 1;
                } else if (diff === 1) {
                  xTranslate = isMobile ? (factor * 30) : (factor * 140);
                  yTranslate = isMobile ? 10 : 18;
                  zTranslate = isMobile ? 0 : 50;
                  rotateY = isMobile ? 0 : factor * -35;
                  rotateX = isMobile ? 0 : 5;
                  rotateZ = isMobile ? 0 : factor * 8;
                  cardScale = isMobile ? 0.92 : 0.88;
                  cardOpacity = 0.82;
                } else if (diff === -1) {
                  xTranslate = isMobile ? (factor * -30) : (factor * -140);
                  yTranslate = isMobile ? 10 : 18;
                  zTranslate = isMobile ? 0 : 50;
                  rotateY = isMobile ? 0 : factor * 35;
                  rotateX = isMobile ? 0 : 5;
                  rotateZ = isMobile ? 0 : factor * -8;
                  cardScale = isMobile ? 0.92 : 0.88;
                  cardOpacity = 0.82;
                } else if (diff === 2) {
                  xTranslate = isMobile ? (factor * 55) : (factor * 250);
                  yTranslate = isMobile ? 20 : 36;
                  zTranslate = isMobile ? 0 : -50;
                  rotateY = isMobile ? 0 : factor * -50;
                  rotateX = isMobile ? 0 : 10;
                  rotateZ = isMobile ? 0 : factor * 16;
                  cardScale = isMobile ? 0.84 : 0.76;
                  cardOpacity = 0.35;
                } else if (diff === -2) {
                  xTranslate = isMobile ? (factor * -55) : (factor * -250);
                  yTranslate = isMobile ? 20 : 36;
                  zTranslate = isMobile ? 0 : -50;
                  rotateY = isMobile ? 0 : factor * 50;
                  rotateX = isMobile ? 0 : 10;
                  rotateZ = isMobile ? 0 : factor * -16;
                  cardScale = isMobile ? 0.84 : 0.76;
                  cardOpacity = 0.35;
                }

                const blurFilter = isMobile
                  ? "none"
                  : isActive 
                    ? "blur(0px) brightness(1)" 
                    : Math.abs(diff) === 1
                      ? "blur(1px) brightness(0.88)"
                      : "blur(3px) brightness(0.68)";

                return (
                  <motion.div
                    key={reason.title}
                    initial={false}
                    animate={{
                      x: xTranslate,
                      y: yTranslate,
                      z: zTranslate,
                      rotateY: rotateY,
                      rotateX: rotateX,
                      rotateZ: rotateZ,
                      scale: cardScale,
                      opacity: cardOpacity,
                      filter: blurFilter,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 110,
                      damping: 18,
                      mass: 1.1
                    }}
                    style={{
                      position: 'absolute',
                      transformStyle: 'preserve-3d',
                      zIndex: isActive ? 30 : Math.abs(diff) === 1 ? 20 : 10,
                      pointerEvents: isActive ? 'auto' : 'none',
                      willChange: 'transform, opacity, filter',
                    }}
                    onClick={() => {
                      if (!isActive) setActiveIndex(index);
                    }}
                    className="w-[280px] sm:w-[320px] md:w-[340px] h-[340px] sm:h-[360px] cursor-pointer origin-center"
                  >
                    <div className={`group h-full p-8 sm:p-10 border rounded-[3rem] transition-all duration-700 flex flex-col shadow-2xl text-left relative card-shine ${
                      isActive 
                        ? 'border-accent/50 shadow-accent/20 text-amber-50' 
                        : 'border-accent/15 hover:border-accent/35 text-amber-100/70'
                    }`}>
                      {/* Sub-card aura light glow */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-accent/4 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-accent/8 transition-colors"></div>
                      
                      {/* Icon */}
                      <div className={`w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 sm:mb-8 border border-accent/20 ${index === 3 ? 'border-dashed' : ''} group-hover:scale-110 group-hover:bg-accent/30 transition-all duration-500 ${isAr ? 'mr-0 ml-auto' : ''} ${
                        isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-40'
                      }`}>
                        <reason.icon className="w-6 h-6 sm:w-7 sm:h-7 text-accent group-hover:text-amber-200 transition-colors duration-500" />
                      </div>

                      {/* Title */}
                      <h4 className={`text-xl sm:text-2xl font-bold display mb-3 tracking-tight group-hover:text-white transition-all duration-500 ${isAr ? 'text-right' : 'text-left'} ${
                        isActive 
                          ? 'opacity-100 transform translate-y-0 text-white' 
                          : 'opacity-0 transform translate-y-2 pointer-events-none text-white/40'
                      }`}>
                        {reason.title}
                      </h4>

                      {/* Desc */}
                      <p className={`text-white/85 text-xs sm:text-sm leading-relaxed flex-grow font-medium transition-all duration-500 delay-75 ${isAr ? 'text-right' : 'text-left'} ${
                        isActive 
                          ? 'opacity-100 transform translate-y-0' 
                          : 'opacity-0 transform translate-y-4 pointer-events-none'
                      }`}>
                        {reason.desc}
                      </p>

                      {/* Card badge ornament footer */}
                      <div className={`mt-6 pt-4 border-t border-white/5 flex items-center gap-3 transition-opacity duration-500 delay-100 ${isAr ? 'flex-row-reverse' : ''} ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        <span className="display text-[8px] font-bold uppercase tracking-widest text-accent">{badgeCardText}</span>
                        <div className="h-[1px] flex-grow bg-accent/15"></div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Navigation and state indicator bar below the stack */}
            <div className="flex items-center gap-6 mt-6 relative z-30">
              <button
                onClick={() => setActiveIndex(prev => (prev - 1 + reasons.length) % reasons.length)}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white hover:border-accent hover:text-accent flex items-center justify-center transition-all duration-300 active:scale-90 group cursor-pointer"
                aria-label="Previous reason"
              >
                {isAr ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>

              <div className="flex gap-2">
                {reasons.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${i === activeIndex ? 'w-6 bg-accent' : 'w-2 bg-white/20 hover:bg-white/40'}`}
                    aria-label={`Go to reason ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setActiveIndex(prev => (prev + 1) % reasons.length)}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white hover:border-accent hover:text-accent flex items-center justify-center transition-all duration-300 active:scale-90 group cursor-pointer"
                aria-label="Next reason"
              >
                {isAr ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
