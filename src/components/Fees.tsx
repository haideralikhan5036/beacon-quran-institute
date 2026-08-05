import React from 'react';
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

const plansEn = [
  {
    name: 'Starter',
    price: '$35',
    period: 'per month',
    features: ['2 Classes per week', '30 Minutes per class', 'Monthly Test Reports', '1-on-1 Sessions', 'Flexible Timing'],
    highlight: false,
    delay: 0.1
  },
  {
    name: 'Standard',
    price: '$50',
    period: 'per month',
    features: ['3 Classes per week', '30 Minutes per class', 'Monthly Test Reports', '1-on-1 Sessions', 'Flexible Timing', 'Tajweed Focus'],
    highlight: true,
    delay: 0.2
  },
  {
    name: 'Premium',
    price: '$75',
    period: 'per month',
    features: ['5 Classes per week', '30 Minutes per class', 'Weekly Evaluation', '1-on-1 Sessions', 'Flexible Timing', 'Memorization Support'],
    highlight: false,
    delay: 0.3
  },
];

const plansAr = [
  {
    name: 'الباقة التمهيدية',
    price: '$35',
    period: 'شهرياً',
    features: ['حصتان في الأسبوع', '٣٠ دقيقة لكل حصة', 'تقارير تقييم دورية شهرياً', 'حلقات فردية مع المعلم (1-on-1)', 'مرونة اختيار الأوقات مسبقاً'],
    highlight: false,
    delay: 0.1
  },
  {
    name: 'الباقة المتميزة',
    price: '$50',
    period: 'شهرياً',
    features: ['٣ حصص في الأسبوع', '٣٠ دقيقة لكل حصة', 'تقارير تقييم دورية شهرياً', 'حلقات فردية مع المعلم (1-on-1)', 'مرونة اختيار الأوقات مسبقاً', 'تركيز مكثف على أحكام التجويد'],
    highlight: true,
    delay: 0.2
  },
  {
    name: 'الباقة الأكاديمية الشاملة',
    price: '$75',
    period: 'شهرياً',
    features: ['٥ حصص في الأسبوع', '٣٠ دقيقة لكل حصة', 'تقارير تقييم ومتابعة أسبوعياً', 'حلقات فردية مع المعلم (1-on-1)', 'أولوية اختيار المواعيد وتعديلها', 'دعم ترسيخ الحفظ والمراجعة بالسند'],
    highlight: false,
    delay: 0.3
  },
];

interface FeesProps {
  onSelectPlan?: (planName: string) => void;
}

function ThreeDCard({ 
  children, 
  className, 
  style,
  highlight,
  isActive
}: { 
  children: React.ReactNode; 
  className?: string; 
  style?: React.CSSProperties;
  highlight?: boolean;
  isActive?: boolean;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const rX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), springConfig);
  const rY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), springConfig);

  const [isHovered, setIsHovered] = React.useState(false);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!isActive) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalized mouse position coordinates
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;
    x.set(mouseX / width);
    y.set(mouseY / height);
  }

  function handleMouseEnter() {
    if (isActive) {
      setIsHovered(true);
    }
  }

  function handleMouseLeave() {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  }

  // Softened interactive shadow calculation
  const shadowValue = highlight
    ? isHovered 
      ? '0 65px 120px -25px rgba(6,78,59,0.45), 0 25px 50px -30px rgba(0,0,0,0.2)' 
      : '0 50px 100px -20px rgba(6,78,59,0.35)'
    : isHovered
      ? '0 50px 90px -25px rgba(0,0,0,0.1), 0 20px 35px -30px rgba(0,0,0,0.06)'
      : '0 30px 60px -20px rgba(0,0,0,0.04)';

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rX,
        rotateY: rY,
        transformStyle: "preserve-3d",
        perspective: 1400,
        boxShadow: shadowValue,
        ...style
      }}
      className={`${className} cursor-pointer transition-shadow duration-500 ease-out`}
    >
      <div 
        style={{ 
          transform: isHovered ? "translateZ(30px)" : "translateZ(0px)", 
          transformStyle: "preserve-3d", 
          transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)" 
        }}
        className="h-full w-full relative flex flex-col"
      >
        {children}
      </div>
    </motion.div>
  );
}

export default function Fees({ onSelectPlan }: FeesProps) {
  const { isAr } = useLanguage();
  const plansList = isAr ? plansAr : plansEn;

  const [activeIndex, setActiveIndex] = React.useState(1); // Standard / Popular defaults to center
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePlanSelect = (planName: string) => {
    const displayPlanName = planName === 'Standard' || planName === 'الباقة المتميزة' ? 'Popular Plan' : `${planName} Plan`;
    onSelectPlan?.(displayPlanName);
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const nextPlan = () => {
    setActiveIndex((prev) => (prev + 1) % plansList.length);
  };

  const prevPlan = () => {
    setActiveIndex((prev) => (prev - 1 + plansList.length) % plansList.length);
  };

  const subtitleText = isAr ? "الاستثمار الأبقى لمستقبلهم" : "Investment in Future";
  const titleText = isAr ? "باقات اشتراك ميسرة ومرنة" : "Simplified Fee Structure";
  const descText = isAr 
    ? "التعليم القرآني المتقن حق متاح لجميع الدارسين. اختر الباقة الملائمة لجدولك اليومي ومسار عائلتك الدراسي." 
    : "High-quality Quranic education should be accessible to everyone. Choose a plan that fits your family's pace.";

  return (
    <section id="fees" className="py-12 sm:py-16 bg-transparent relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/arabic-overlay.png")' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <Reveal delay={0.1}>
            <div className={`flex items-center justify-center gap-2 mb-4 ${isAr ? 'flex-row-reverse' : ''}`}>
              <Sparkles className="w-4 h-4 text-accent" />
              <h2 className="display text-[10px] font-bold uppercase tracking-[0.4em] text-accent">{subtitleText}</h2>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold serif text-amber-50 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] mb-8 text-balance">{titleText}</h3>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-amber-100/80 max-w-2xl mx-auto text-lg leading-relaxed text-balance">
              {descText}
            </p>
          </Reveal>
        </div>

        {/* Premium Plan Toggle / Tabs */}
        <div className={`flex justify-center flex-wrap gap-2 mb-12 sm:mb-16 ${isAr ? 'flex-row-reverse' : ''}`}>
          {plansList.map((p, idx) => (
            <button
              key={p.name}
              onClick={() => setActiveIndex(idx)}
              className={`px-5 py-2.5 rounded-full font-bold uppercase tracking-widest text-[9px] transition-all duration-300 relative ${
                activeIndex === idx
                  ? 'bg-accent text-primary border border-accent/40 shadow-lg scale-105'
                  : 'bg-black/30 backdrop-blur-md hover:bg-black/50 text-amber-100/80 hover:text-white border border-accent/20 hover:scale-102'
              }`}
            >
              <span className="relative z-10 flex items-center gap-1.5">
                {p.highlight && <Sparkles className="w-3 h-3 text-accent shrink-0 animate-pulse" />}
                {p.name}
              </span>
            </button>
          ))}
        </div>

        {/* 3D Rotating Stage Container */}
        <div className="relative w-full max-w-[1200px] mx-auto min-h-[580px] sm:min-h-[660px] flex items-center justify-center overflow-visible px-4">
          
          {/* Aesthetic central 3D stage floor light projection & elliptical silhouette reflection */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[85%] sm:w-[50%] h-[15px] bg-primary/5 rounded-full blur-md opacity-70 pointer-events-none z-0" style={{ transform: 'rotateX(75deg)' }} />
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[60%] sm:w-[35%] h-[8px] bg-accent/10 rounded-full blur pointer-events-none z-0" style={{ transform: 'rotateX(75deg)' }} />
          <div className="absolute inset-x-0 top-12 bottom-12 bg-gradient-to-tr from-accent/[0.03] via-transparent to-primary/[0.03] blur-3xl rounded-full scale-90 pointer-events-none z-0" />

          {/* Left Arrow Button */}
          <button
            onClick={prevPlan}
            className="absolute left-0 sm:left-4 md:left-8 w-14 h-14 rounded-full bg-black/30 backdrop-blur-md text-amber-100 border border-accent/30 shadow-[0_0_20px_rgba(184,142,67,0.15)] hover:shadow-[0_0_30px_rgba(184,142,67,0.3)] hover:border-accent hover:text-accent flex items-center justify-center transition-all duration-300 active:scale-95 z-40 group cursor-pointer"
            aria-label="Previous plan"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={nextPlan}
            className="absolute right-0 sm:right-4 md:right-8 w-14 h-14 rounded-full bg-black/30 backdrop-blur-md text-amber-100 border border-accent/30 shadow-[0_0_20px_rgba(184,142,67,0.15)] hover:shadow-[0_0_30px_rgba(184,142,67,0.3)] hover:border-accent hover:text-accent flex items-center justify-center transition-all duration-300 active:scale-95 z-40 group cursor-pointer"
            aria-label="Next plan"
          >
            <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* 3D Isometric Viewport Layout */}
          <div className="w-full h-[580px] sm:h-[640px] relative flex items-center justify-center overflow-visible" style={{ perspective: 2200, transformStyle: 'preserve-3d' }}>
            {plansList.map((plan, index) => {
              let diff = index - activeIndex;
              if (diff === 2) diff = -1;
              if (diff === -2) diff = 1;

              const isActive = diff === 0;

              // Responsive translation scale mapping
              const xTranslate = diff === 0 
                ? 0 
                : diff === 1 
                  ? (isMobile ? 120 : 360) 
                  : (isMobile ? -120 : -360);

              const zTranslate = diff === 0 ? 100 : -180;
              const rotationY = diff === 0 ? 0 : diff === 1 ? -45 : 45;
              const cardScale = diff === 0 ? 1.02 : (isMobile ? 0.74 : 0.83);
              const cardOpacity = diff === 0 ? 1 : 0.45;

              // Professional cinematographic depth of focus and color dimming
              const blurFilter = isActive 
                ? "blur(0px) brightness(1)" 
                : "blur(1.5px) brightness(0.82)";

              let innerStyle: React.CSSProperties | undefined;

              if (index === 0) {
                innerStyle = { borderRadius: '63px' };
              } else if (index === 1) {
                innerStyle = { borderRadius: '24px' };
              } else if (index === 2) {
                innerStyle = { borderRadius: '60px' };
              }

              return (
                <motion.div
                  key={plan.name}
                  animate={{
                    x: xTranslate,
                    z: zTranslate,
                    rotateY: rotationY,
                    scale: cardScale,
                    opacity: cardOpacity,
                    filter: blurFilter,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 110,
                    damping: 24,
                    mass: 1.15
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                    position: 'absolute',
                    zIndex: isActive ? 30 : 10,
                  }}
                  onClick={() => {
                    if (!isActive) setActiveIndex(index);
                  }}
                  className="w-[280px] sm:w-[350px] md:w-[380px] h-full"
                >
                  <ThreeDCard
                    highlight={plan.highlight}
                    style={innerStyle}
                    isActive={isActive}
                    className={`p-10 sm:p-12 w-full h-full relative overflow-hidden flex flex-col border backdrop-blur-md transition-all duration-700 select-none card-shine ${
                      plan.highlight
                        ? 'text-amber-50 border-accent/50 shadow-[0_25px_60px_rgba(0,0,0,0.6)]'
                        : 'text-amber-100/90 border-accent/20 hover:border-accent/35'
                    } ${isAr ? 'text-right' : 'text-left'}`}
                  >
                    {plan.highlight && (
                      <div 
                        className={`absolute top-10 bg-[#757454] text-amber-50 px-5 py-2 rounded-full display text-[8px] font-black uppercase tracking-[0.3em] shadow-lg animate-pulse ${isAr ? 'left-10' : 'right-10'}`}
                        style={{ transform: "translateZ(35px)", transformStyle: "preserve-3d" }}
                      >
                        {isAr ? "الباقة الموصى بها" : "Recommended"}
                      </div>
                    )}

                    <div className="mb-10 sm:mb-12" style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
                      <h4 className={`display text-[10px] font-bold uppercase tracking-[0.5em] mb-4 ${plan.highlight ? 'text-accent' : 'text-primary'}`}>
                        {plan.name}
                      </h4>
                      <div className={`flex items-baseline gap-2 ${isAr ? 'flex-row-reverse justify-start' : 'justify-start'}`}>
                        <span className="text-6xl sm:text-7xl font-bold serif tracking-tight">{plan.price}</span>
                        <span className="display text-[10px] font-bold uppercase tracking-[0.4em] opacity-40 mb-3">
                          {isAr ? " / شهر" : " / mo"}
                        </span>
                      </div>
                      <p className="display text-[9px] font-bold uppercase tracking-widest mt-4 opacity-40">
                        {plan.period}
                      </p>
                    </div>

                    <div className={`h-px w-full mb-10 ${plan.highlight ? 'bg-white/10' : 'bg-primary/5'}`} style={{ transform: "translateZ(15px)" }}></div>

                    <ul className="space-y-5 mb-12 flex-grow overflow-y-auto pr-1" style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
                      {plan.features.map((feature) => (
                        <li key={feature} className={`flex items-center gap-4 group/item ${isAr ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                          <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 group-hover/item:scale-150 ${plan.highlight ? 'bg-accent' : 'bg-accent/40'}`}></div>
                          <span className={`text-xs sm:text-sm font-medium opacity-80 tracking-tight ${isAr ? 'text-right' : 'text-left'}`}>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }} className="w-full mt-auto">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isActive) {
                            handlePlanSelect(plan.name);
                          } else {
                            setActiveIndex(index);
                          }
                        }}
                        className={`group relative overflow-hidden w-full py-5 rounded-[1.8rem] serif font-bold uppercase tracking-[0.3em] text-[11px] transition-all shadow-xl hover:shadow-2xl cursor-pointer ${
                          plan.highlight
                            ? 'bg-[#757454] text-amber-50 hover:bg-[#084C63] border border-[#949693]/30'
                            : 'bg-[#084C63] text-white hover:bg-[#757454] border border-[#949693]/30'
                        }`}
                      >
                        <span className={`relative z-10 flex items-center justify-center gap-3 font-semibold ${isAr ? 'flex-row-reverse' : ''}`}>
                          {isActive ? (isAr ? "سجل الآن" : "Enroll") : (isAr ? "اختر الباقة" : "Select Plan")}
                          {isAr ? (
                            <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1.5 transition-transform" />
                          ) : (
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                          )}
                        </span>
                        <div className={`absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ${plan.highlight ? 'bg-white' : 'bg-accent'}`}></div>
                      </button>
                    </div>
                  </ThreeDCard>
                </motion.div>
              );
            })}
          </div>
        </div>
        
        <Reveal delay={0.5} direction="up" distance={20}>
          <div className="mt-16 text-center bg-black/20 backdrop-blur-md border border-accent/20 p-8 sm:p-10 rounded-[2.5rem] max-w-3xl mx-auto text-amber-50">
             <p className="display text-[10px] font-bold uppercase tracking-widest text-accent mb-2">
               {isAr ? "باقات مخصصة لمجموعات العوائل" : "Flexible Learning Packages"}
             </p>
             <p className="text-amber-100/80 italic text-sm">
               {isAr ? (
                 <>هل تحتاج إلى خطة مرنة تناسب الإخوة والأخوات أو حلقات دراسية مكثفة؟ <span className="text-accent font-bold cursor-pointer hover:underline" onClick={() => handlePlanSelect('Flexible Plan')}>تواصل مع مكتب التسجيل والقبول</span></>
               ) : (
                 <>Need a custom plan for family siblings or specialized intensive courses? <span className="text-accent font-bold cursor-pointer hover:underline" onClick={() => handlePlanSelect('Flexible Plan')}>Contact our registrar</span></>
               )}
             </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
