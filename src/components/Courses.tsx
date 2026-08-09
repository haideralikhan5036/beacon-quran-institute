import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'motion/react';
import { BookMarked, GraduationCap, Mic2, FileText, Languages, History, CheckCircle2, ArrowRight, Sparkles, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, MousePointer } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { Reveal } from './ui/Reveal';
import { useLanguage } from '../context/LanguageContext';

const courses = [
  {
    title: 'Noorani Qaida',
    desc: 'The essential foundation for beginners. Master Arabic letters, phonetics, and basic Tajweed rules effectively.',
    icon: BookMarked,
    color: 'bg-emerald-500/10',
    iconColor: 'text-accent',
    details: {
      intro: 'Noorani Qaida is the most basic and fundamental book to learn Quranic Arabic. It is specifically designed for beginners and children to build a strong foundation in reading the Holy Quran.',
      benefits: [
        'Mastery of Arabic alphabet and correct makhraj pronunciation.',
        'Understanding of fundamental Tajweed rules from day one.',
        'Developing confidence in joining letters and forming words.'
      ],
      insight: 'The classical method of Qaida has been proven for centuries to be the quickest way to gain fluency in Arabic phonetics.',
      quote: 'The best among you are those who learn the Quran and teach it. (Sahih Bukhari)'
    }
  },
  {
    title: 'Quran Reading',
    desc: 'Perfect your fluency in reading Holy Quran with proper pronunciation and observance of Tajweed rules.',
    icon: GraduationCap,
    color: 'bg-blue-500/10',
    iconColor: 'text-blue-400',
    details: {
      intro: 'This course is for those who can recognize letters but need help with fluency and connected reading. We focus on continuous recitation of the Mushaf.',
      benefits: [
        'Improved fluency in reading long Quranic verses.',
        'Practical application of Tajweed rules in every session.',
        'Correcting common recitation rhythm and tempo mistakes.'
      ],
      insight: 'Regular recitation connects the heart with the Creator and brings peace to the household.',
      quote: 'Whoever recites a letter from the Book of Allah gets a ten-fold reward. (Tirmidhi)'
    }
  },
  {
    title: 'Hifz (Memorization)',
    desc: 'Specialized 1-on-1 memorization plans with expert tutors to help you preserve the Quran in your heart.',
    icon: History,
    color: 'bg-amber-500/10',
    iconColor: 'text-amber-400',
    details: {
      intro: 'Memorizing the Quran is a journey of extreme devotion and reward. Our Hifz program provides personalized tracks based on the student\'s capacity and memory level.',
      benefits: [
        'Personalized revision (Daur) and lesson (Sabaq) schedules.',
        'Expert guidance on modern academic memorization systems.',
        'Focus on permanent preservation methods (Mutashabihat).'
      ],
      insight: 'The Quran becomes a light for the Hafiz in this world and an intercessor in the hereafter.',
      quote: 'It will be said to the companion: Recite and rise in status... (Abu Dawood)'
    }
  },
  {
    title: 'Tajweed Mastery',
    desc: 'Advanced course focusing on the deep science of Tajweed to recite Quran exactly as it was revealed.',
    icon: Mic2,
    color: 'bg-purple-500/10',
    iconColor: 'text-purple-400',
    details: {
      intro: 'Tajweed is the science of giving every letter its due right. This advanced course dives deep into the articulation points and characteristics of letters.',
      benefits: [
        'In-depth study of Sifaat (characteristics) and Makharij.',
        'Mastery of complex rules like Ikhfa, Idgham, and Meem Sakinah.',
        'Refining the structural melody and tone (Lahjah) of recitation.'
      ],
      insight: 'Proper Tajweed ensures that the meaning of the Divine Word remains unchanged and protected.',
      quote: '...and recite the Quran with measured recitation (Tartila). (Surah Al-Muzzammil, 4)'
    }
  },
  {
    title: 'Quranic Tafsir',
    desc: 'Understand the meanings, context, and lessons behind the verses for profound spiritual growth.',
    icon: FileText,
    color: 'bg-orange-500/10',
    iconColor: 'text-orange-400',
    details: {
      intro: 'Reciting is only the first step; understanding is the ultimate goal. Tafsir connects the words of Allah to our daily actions and historical context.',
      benefits: [
        'Deep understanding of Sabab al-Nuzul (Reasons for Revelation).',
        'Linguistic analysis of key Quranic terminology.',
        'Deriving practical lessons for character building (Akhlaq).'
      ],
      insight: 'Tafsir transforms the Quran from a book of recitation into a living guide for your soul.',
      quote: '[This is] a blessed Book which We have revealed that they might reflect upon its verses... (Surah Sad, 29)'
    }
  },
  {
    title: 'Arabic Language',
    desc: 'Learn classical Arabic to directly connect with the language of the Quran and Islamic literature.',
    icon: Languages,
    color: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
    details: {
      intro: 'Connect directly with the language of Revelation. This course bridges the gap between the reader and the profound meanings of the Arabic text.',
      benefits: [
        'Building a core functional vocabulary of Quranic words.',
        'Essential Arabic grammar (Nahw and Sarf) for direct understanding.',
        'Foundation for independent learning in general Islamic sciences.'
      ],
      insight: 'Arabic is the key to unlocking the true depth and miracle (I\'jaz) of the Quran.',
      quote: 'Indeed, We have sent it down as an Arabic Quran that you might understand. (Surah Yusuf, 2)'
    }
  },
];

const coursesAr = [
  {
    title: 'القاعدة النورانية',
    desc: 'الأساس المتين المعتمد للمبتدئين. أتقن الحروف الهجائية، مخارج المخارج الصوتية الفصيحة، وضوابط التجويد الأساسية.',
    icon: BookMarked,
    color: 'bg-emerald-500/10',
    iconColor: 'text-accent',
    details: {
      intro: 'تعتبر القاعدة النورانية المنهج الأشهر عالميًا والأسرع أثرًا لتعلم القراءة والتلاوة العربية الصحيحة بطلاقة. تم إعدادها خصيصًا للأطفال والبراعم والمبتدئين لتأسيسهم بطريقة نموذجية.',
      benefits: [
        'إتقان مخارج الحروف الصحيحة التامة ونطقها السليم بلا لحن.',
        'فهم أحكام التلفظ والتجويد الأساسية منذ الحصة الأولى.',
        'اكتساب ثقة تامة في وصل وتركيب الحروف العربية وتهجئتها بسهولة.'
      ],
      insight: 'أقصر المسالك المجرّبة منذ عهود طويلة لتوليد الفصاحة اللسانية وضبط التلاوة الصوتية.',
      quote: '«خَيرُكُم مَن تَعَلَّمَ القُرآنَ وعَلَّمَهُ» (صحيح البخاري)'
    }
  },
  {
    title: 'تلاوة القرآن الكريم',
    desc: 'حقق الطلاقة التامة والجمال في قراءة آيات الذكر الحكيم مباشرة من المصحف الشريف مع ضبط اللفظ والتلاوة.',
    icon: GraduationCap,
    color: 'bg-blue-500/10',
    iconColor: 'text-blue-400',
    details: {
      intro: 'هذا المسار الأكاديمي موجه للذين يستطيعون تمييز الحروف البسيطة ولكنهم بحاجة لمتابعة مستمرة لبلوغ الرونق والطلاقة المسترسلة في قراءة صفحات المصحف بالكامل.',
      benefits: [
        'تحسين اللفظ والطلاقة في قراءة السور والآيات الطويلة بيسر وسهولة.',
        'التطبيق العملي المتواصل لقواعد التجويد في الحصص الحية.',
        'تصحيح نبرات الصوت ومواضع الوقف والابتداء أثناء التلاوة الصحيحة.'
      ],
      insight: 'القراءة الدائمة تجلو القلوب وتغرس الطمأنينة الإلهية والبركة في الأهل والمنزل.',
      quote: '«من قرأ حرفًا من كتابِ اللهِ فله به حسنةٌ، والحسنةُ بعشرِ أمثالِها» (جامع الترمذي)'
    }
  },
  {
    title: 'برنامج حفظ القرآن (الحفظ)',
    desc: 'خطط تحفيظ فردية ومخصصة ١-على-١ مع مشايخ متقنين وحفاظ لمساعدتك على تثبيت كتاب الله بقلبك وصدرك.',
    icon: History,
    color: 'bg-amber-500/10',
    iconColor: 'text-amber-400',
    details: {
      intro: 'حفظ آيات الله العظيم هو كنز العيش ورفعة المآلات. يوفر برنامجنا مسارات مخصصة بالكامل تتماشى تمامًا مع الطاقة الاستيعابية والذاكرة لكل دارس ودارسة.',
      benefits: [
        'متابعة وجدولة مخصصة للمراجعات المستمرة (الدور) والجديد المسموع (السبق).',
        'توجيهات عملية ممتازة من شيوخ متقنين يسهلون الحفظ الدائم.',
        'التركيز على تثبيت المتشابهات وضبط السور المتشابهة لمنع التفلت.'
      ],
      insight: 'القرآن الكريم شرف في الدنيا وشفاعة مباركة ترفع حافظها لأعلى الرتب في الآخرة.',
      quote: '«يُقالُ لِصاحِبِ القُرآنِ: اقْرَأْ، وارْتَقِ، ورَتِّلْ كما كُنْتَ تُرَتِّلُ في الدُّنْيا» (سنن أبي داود)'
    }
  },
  {
    title: 'إتقان علم التجويد',
    desc: 'مسار دراسي متقدم للغوص في علم التجويد التطبيقي والنظري لنطق أحرف القرآن كمنزلة أولى.',
    icon: Mic2,
    color: 'bg-purple-500/10',
    iconColor: 'text-purple-400',
    details: {
      intro: 'التجويد هو حلية القراءة وإعطاء الحروف حقها ومستحقها بصورة دقيقة. ستدرس في هذا المسار صفات الحروف ومخارجها ونبراتها الصوتية بصورة كاملة.',
      benefits: [
        'دراسة تطبيقية معمقة لصفات الحروف وعوامل مجهورية ومهموسية الحرف.',
        'إتقان تام لأحكام الغنن، المدود، الإخفاء، الإدغام، ومخارج الشفتين والحلق.',
        'تحسين جمال الصوت والتلاوة بالنبرات العربية المحققة الفصيحة.'
      ],
      insight: 'الالتزام بضوابط علم التجويد يصون كلام الرب جل وعلا من التبديل ويحفظ المقاصد والمعاني.',
      quote: '«...وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا» (سورة المزمل، جزء من آية ٤)'
    }
  },
  {
    title: 'تفسير القرآن الكريم',
    desc: 'تعرف على مقاصد السور، أسباب النزول، والعبر الحكيمة الكامنة وراء الآيات لتعيش القرآن بوجدانك.',
    icon: FileText,
    color: 'bg-orange-500/10',
    iconColor: 'text-orange-400',
    details: {
      intro: 'التلاوة هي عتبة الدخول، والتدبر والفهم هو المغزى الأسمى والغاية الكبرى. يربط علم التفسير الكلمات الربانية بواقع حياتك اليومي وخلفياتها التاريخية.',
      benefits: [
        'معرفة أسباب نزول الآيات والسور لفهم أدق وأوضح لتعليماتها وسياقها.',
        'تحليل بلاغي مبسط لأهم المصطلحات القرآنية الشريفة وأوجه المعاني.',
        'استنباط التوجيهات الأخلاقية والعملية الفعالة لتهذيب السلوك والنفس.'
      ],
      insight: 'يحول التفسير تلاوتك إلى مناجاة يبصر من خلالها القلب مواطن الهدى والنور.',
      quote: '«كِتَابٌ أَنزَلْنَاهُ إِلَيْكَ مُبَارَكٌ لِّيَدَّبَّرُوا آيَاتِهِ وَلِيَتَذَكَّرَ أُولُو الْأَلْبَابِ» (سورة ص، ٢٩)'
    }
  },
  {
    title: 'اللغة العربية الفصحى',
    desc: 'افهم لغة الضاد الفصيحة لتتصل بالقرآن وبلاغته والعلوم الإسلامية اتصالًا مباشرًا كأهله.',
    icon: Languages,
    color: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
    details: {
      intro: 'العربية هي الوعاء الشريف الذي اختاره الله تعالى لنقل رسالته الخالدة. يزيل هذا المسار الحجب بينك وبين الفهم الذاتي للنصوص والتقرب المباشر لها.',
      benefits: [
        'بناء حصيلة ممتازة من مفردات التنزيل ومركبات الفصاحة وجمل الحوار.',
        'شرح ميسر لقواعد النحو والصرف الأساسية لفهم بنية الجملة العربية الصافية.',
        'تأسيس متين وبوابة ثرية تيسر لك تحصيل التراث الإسلامي وتفسيره مستقبلاً.'
      ],
      insight: 'إدراك أسرار اللغة هو مفتاحك الذهبي لاستكشاف مواطن الإعجاز القرآني المبهر وعجائبه.',
      quote: '«إِنَّا أَنزَلْنَاهُ قُرْآنًا عَرَبِيًّا لَّعَلَّكُمْ تَعْقِلُونَ» (سورة يوسف، ٢)'
    }
  }
];

interface CoursesProps {
  onSelectCourse?: (courseTitle: string) => void;
  onViewDetails?: (courseId: string) => void;
}

function CourseCard3D({ 
  course, 
  index,
  isActive,
  onViewDetails
}: { 
  course: typeof courses[0]; 
  index: number;
  isActive: boolean;
  onViewDetails?: (courseId: string) => void;
}) {
  const { isAr } = useLanguage();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const rX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), springConfig);
  const rY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), springConfig);

  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!isActive) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;
    x.set(mouseX / width);
    y.set(mouseY / height);
  }

  function handleMouseEnter() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  }

  // Cinematic interactive lighting & outer glows
  const dynamicShadow = isActive
    ? isHovered
      ? '0 60px 110px -20px rgba(27,84,61,0.45), 0 0 45px rgba(184,142,67,0.32), 0 0 90px rgba(184,142,67,0.15)'
      : '0 45px 90px -20px rgba(27,84,61,0.32)'
    : isHovered
      ? '0 30px 60px -15px rgba(27,84,61,0.15)'
      : '0 20px 40px rgba(0,0,0,0.02)';

  const dynamicBorderColor = isActive
    ? isHovered
      ? 'rgba(184,142,67,0.7)'
      : 'rgba(184,142,67,0.2)'
    : isHovered
      ? 'rgba(27,84,61,0.25)'
      : 'rgba(27,84,61,0.06)';

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rX,
        rotateY: rY,
        transformStyle: "preserve-3d",
        perspective: 1200,
        boxShadow: dynamicShadow,
        borderColor: dynamicBorderColor,
      }}
      className={`relative w-[240px] sm:w-[280px] h-[300px] sm:h-[350px] rounded-[3rem] transition-[border-color,color,opacity,box-shadow] duration-200 ease-out select-none cursor-pointer card-shine border ${
        isActive 
          ? 'text-amber-50 font-medium border-accent/60 shadow-[0_20px_50px_rgba(0,0,0,0.5)]' 
          : 'text-amber-100/80 opacity-70 hover:opacity-100 border-accent/20'
      } ${isAr ? 'text-right' : 'text-left'}`}
    >
      {/* 3D Border Glow overlay light */}
      <div 
        className={`absolute inset-0 rounded-[3rem] border-2 transition-[border-color,opacity,box-shadow] duration-200 pointer-events-none ${
          isActive
            ? isHovered
              ? 'border-accent opacity-100 shadow-[inset_0_0_25px_rgba(184,142,67,0.45)]'
              : 'border-accent/20 opacity-60'
            : isHovered
              ? 'border-accent/40 opacity-100 shadow-[inset_0_0_15px_rgba(184,142,67,0.2)]'
              : 'border-transparent opacity-0'
        }`}
      />

      <div 
        style={{ 
          transform: isActive ? (isHovered ? "translateZ(35px)" : "translateZ(20px)") : (isHovered ? "translateZ(15px)" : "translateZ(0px)"), 
          transformStyle: "preserve-3d", 
          transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)" 
        }}
        className="h-full w-full p-8 sm:p-10 flex flex-col justify-between"
      >
        {/* Card Header Background Ornament */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/arabic-overlay.png")' }} 
        />
        
        <div className={`flex justify-between items-start relative z-10 ${isAr ? 'flex-row-reverse' : ''}`} style={{ transform: "translateZ(20px)" }}>
          <div className={`w-14 h-14 ${isActive ? 'bg-accent/20 border border-accent/40' : 'bg-white/5 border border-white/10'} rounded-2xl flex items-center justify-center`}>
            <course.icon className={`w-7 h-7 text-accent`} />
          </div>
          <span className={`display text-7xl font-semibold opacity-20 text-accent font-serif leading-none`}>
            0{index + 1}
          </span>
        </div>

        <div className={`relative z-10 flex flex-col gap-3 ${isAr ? 'items-end' : 'items-start'}`} style={{ transform: "translateZ(30px)" }}>
          <div className="h-1 w-12 bg-accent/80 rounded-full" />
          <h4 className="text-2xl sm:text-3.5xl font-bold display leading-tight mb-2 text-amber-50 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {course.title}
          </h4>
          <p className={`text-xs sm:text-sm font-medium leading-relaxed ${isActive ? 'text-amber-100/90' : 'text-amber-100/80'}`}>
            {course.desc}
          </p>
        </div>

        {/* Floating Accent Ring */}
        {isActive && (
          <div 
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails?.(course.title);
            }}
            className={`absolute bottom-10 flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-accent hover:text-amber-200 cursor-pointer ${isAr ? 'left-10 flex-row-reverse' : 'right-10'}`}
            style={{ transform: "translateZ(45px)", transformStyle: "preserve-3d" }}
          >
            <span>{isAr ? "معرفة تفاصيل المسار" : "Academic Track"}</span>
            {isAr ? (
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            ) : (
              <ArrowRight className="w-3.5 h-3.5" />
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Courses({ onSelectCourse, onViewDetails }: CoursesProps) {
  const { isAr } = useLanguage();
  const coursesList = isAr ? coursesAr : courses;

  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [touchActive, setTouchActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Soft auto-rotation interval
  useEffect(() => {
    if (isPaused || touchActive) return;
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % coursesList.length);
    }, 3500); // 3.5 seconds rotation interval
    return () => clearInterval(interval);
  }, [isPaused, touchActive, coursesList.length]);

    // Touch Gesture Detection for Mobile (Horizontal Swipe)
    useEffect(() => {
      const container = containerRef.current;
      if (!container || !isMobile) return;
  
      let touchStartX = 0;
      let touchStartY = 0;
      let lastX = 0;
      let touchMoved = false;
      let scrollDirectionLock: 'horizontal' | 'vertical' | null = null;
  
      const handleTouchStart = (e: TouchEvent) => {
        if (e.touches.length === 1) {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
          lastX = touchStartX;
          touchMoved = true;
          scrollDirectionLock = null;
        }
      };
  
      const handleTouchMove = (e: TouchEvent) => {
        if (!touchMoved) return;
  
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        lastX = currentX;
  
        const diffX = currentX - touchStartX;
        const diffY = currentY - touchStartY;
  
        // Determine the locked gesture once user moves at least 8 pixels
        if (!scrollDirectionLock) {
          if (Math.abs(diffX) > 8 || Math.abs(diffY) > 8) {
            if (Math.abs(diffX) > Math.abs(diffY)) {
              scrollDirectionLock = 'horizontal';
              setTouchActive(true);
            } else {
              scrollDirectionLock = 'vertical';
            }
          }
        }
  
        // If locked to vertical screen scrolling, let native scrolling function untouched
        if (scrollDirectionLock === 'vertical') {
          return;
        }
  
        // If locked to horizontal course swiping, move cards and block page scrolling
        if (scrollDirectionLock === 'horizontal') {
          if (e.cancelable) {
            e.preventDefault();
          }
  
          // Live track horizontal swipe as percentage (-1 to +1) over viewport range
          const maxSwipeWidth = window.innerWidth * 0.45 || 160;
          const normalizedOffset = Math.min(Math.max(diffX / maxSwipeWidth, -1), 1);
          setDragOffset(normalizedOffset);
        }
      };
  
      const handleTouchEnd = () => {
        if (!touchMoved) return;
        touchMoved = false;
        setTouchActive(false);
  
        if (scrollDirectionLock === 'horizontal') {
          const finalDiffX = lastX - touchStartX;
          const maxSwipeWidth = window.innerWidth * 0.45 || 160;
          const normalizedOffset = Math.min(Math.max(finalDiffX / maxSwipeWidth, -1), 1);
  
          const swipeThreshold = 0.22; // 22% displacement triggers card change
          if (normalizedOffset > swipeThreshold) {
            setActiveIndex(prev => Math.max(prev - 1, 0));
          } else if (normalizedOffset < -swipeThreshold) {
            setActiveIndex(prev => Math.min(prev + 1, coursesList.length - 1));
          }
        }
  
        setDragOffset(0);
        scrollDirectionLock = null;
      };
  
      container.addEventListener('touchstart', handleTouchStart, { passive: true });
      container.addEventListener('touchmove', handleTouchMove, { passive: false });
      container.addEventListener('touchend', handleTouchEnd, { passive: true });
  
      return () => {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      };
    }, [activeIndex, isMobile, coursesList]);

  const activeCourse = coursesList[activeIndex];

  const handleEnrollNow = () => {
    onSelectCourse?.(activeCourse.title);
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const sectionSubtitle = isAr ? "مساراتنا الدراسية" : "Our Academic Paths";
  const sectionTitle = isAr ? "علوم التنزيل الشريفة لكل طالب علم" : "Sacred Knowledge for Every Learner";

  return (
    <section 
      id="courses" 
      ref={containerRef}
      className="py-16 sm:py-24 bg-transparent relative overflow-hidden"
    >
      {/* Cinematic Background Light */}
      <div className="absolute inset-x-0 top-0 bottom-0 bg-gradient-to-br from-accent/[0.02] via-transparent to-primary/[0.02] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-gradient-to-tr from-accent/5 via-transparent to-primary/5 blur-3xl pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <Reveal delay={0.1} width="100%">
          <div className="card-shine border border-[#949693]/35 p-6 sm:p-8 rounded-[2.5rem] max-w-3xl mx-auto text-center mb-12 sm:mb-16 shadow-2xl">
            <div className={`inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-[#084C63]/30 border border-[#949693]/40 mb-4 ${isAr ? 'flex-row-reverse' : ''}`}>
              <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" />
              <h2 className="display text-[10px] font-extrabold uppercase tracking-[0.3em] text-amber-200">{sectionSubtitle}</h2>
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold display text-amber-50 text-balance">
              {sectionTitle}
            </h3>
          </div>
        </Reveal>

        {/* Sleek Course Stage Showcase (No heavy left-side text) */}
        <div 
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex flex-col items-center justify-center overflow-visible py-4 min-h-[460px] max-w-4xl mx-auto"
        >
          <div className="relative w-full flex items-center justify-center overflow-visible" style={{ perspective: 1800, transformStyle: 'preserve-3d' }}>
            
            {/* Left Navigation Button */}
            <button
              onClick={() => setActiveIndex(prev => Math.max(prev - 1, 0))}
              disabled={activeIndex === 0}
              className="absolute left-1 sm:left-4 lg:-left-4 xl:-left-8 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white text-primary border border-primary/10 shadow-[0_15px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:border-accent hover:text-accent flex items-center justify-center transition-all duration-300 active:scale-95 disabled:opacity-20 disabled:pointer-events-none z-40 group cursor-pointer"
              aria-label="Previous Course"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            {/* Right Navigation Button */}
            <button
              onClick={() => setActiveIndex(prev => Math.min(prev + 1, coursesList.length - 1))}
              disabled={activeIndex === coursesList.length - 1}
              className="absolute right-1 sm:right-4 lg:-right-4 xl:-right-8 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white text-primary border border-primary/10 shadow-[0_15px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:border-accent hover:text-accent flex items-center justify-center transition-all duration-300 active:scale-95 disabled:opacity-20 disabled:pointer-events-none z-40 group cursor-pointer"
              aria-label="Next Course"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Elliptical Shadows Projection */}
            <div className="absolute -bottom-6 w-[200px] h-[15px] bg-primary/10 rounded-full blur-md opacity-60 pointer-events-none z-0" style={{ transform: 'rotateX(75deg)' }} />
            
            {/* Carousel Viewport mapping */}
            <div className="w-[240px] sm:w-[280px] h-[300px] sm:h-[350px] relative flex items-center justify-center overflow-visible" style={{ transformStyle: 'preserve-3d' }}>
              {coursesList.map((course, index) => {
                let diff = index - activeIndex;

                // Continuous mathematical distance with dragOffset
                const effectiveDiff = diff + dragOffset;

                // Visual presence condition
                const isVisible = Math.abs(diff) <= 1 || 
                  (dragOffset < -0.05 && diff === 2) || 
                  (dragOffset > 0.05 && diff === -2);

                if (!isVisible && !isMobile) return null;

                const stepWidth = isMobile ? (152 + Math.abs(dragOffset) * 20) : (260 + Math.abs(dragOffset) * 30);
                const xTranslate = effectiveDiff * stepWidth;
                const zTranslate = isMobile ? 0 : 80 - 240 * Math.min(Math.abs(effectiveDiff), 1.2);
                const rotationY = isMobile ? 0 : effectiveDiff * -35; 
                const cardScale = 1 - 0.16 * Math.min(Math.abs(effectiveDiff), 1.2);
                const opacity = 1 - 0.65 * Math.min(Math.abs(effectiveDiff), 1.1);

                const isActive = index === activeIndex;

                return (
                  <motion.div
                    key={course.title}
                    initial={false}
                    animate={{
                      x: xTranslate,
                      z: zTranslate,
                      rotateY: rotationY,
                      scale: cardScale,
                      opacity: opacity,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: touchActive ? 220 : 110,
                      damping: touchActive ? 26 : 24,
                      mass: touchActive ? 0.9 : 1.15
                    }}
                    style={{
                      position: 'absolute',
                      transformStyle: 'preserve-3d',
                      zIndex: isActive ? 30 : Math.abs(effectiveDiff) < 1 ? 20 : 10,
                      pointerEvents: 'auto',
                    }}
                    className="origin-center"
                    onClick={() => {
                      if (!isActive) {
                        setActiveIndex(index);
                      }
                    }}
                  >
                    <CourseCard3D 
                      course={course}
                      index={index}
                      isActive={isActive}
                      onViewDetails={onViewDetails}
                    />
                  </motion.div>
                );
              })}
            </div>

          </div>

          {/* Active Course Title & Dedicated Read Details Button Bar */}
          <div className="mt-10 text-center max-w-xl mx-auto space-y-5">
            <div>
              <span className="display text-[10px] font-extrabold uppercase tracking-[0.3em] text-amber-300 block mb-1">
                {isAr ? `المسار ${activeIndex + 1} من ${coursesList.length}` : `Course ${activeIndex + 1} of ${coursesList.length}`}
              </span>
              <h4 className="text-3xl sm:text-4xl font-bold display text-amber-50">
                {activeCourse.title}
              </h4>
            </div>

            {/* Action Buttons: Read Full Course Details & Quick Enroll */}
            <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 ${isAr ? 'flex-row-reverse' : ''}`}>
              <button
                onClick={() => onViewDetails?.(activeCourse.title)}
                className="w-full sm:w-auto px-8 py-4.5 rounded-2xl bg-[#949693] hover:bg-white text-[#03171e] font-extrabold uppercase tracking-wider text-xs border-2 border-[#757454] transition-all shadow-2xl flex items-center justify-center gap-3 group cursor-pointer"
              >
                <span>{isAr ? "معرفة تفاصيل المسار الكاشفة" : "Read Full Course Details"}</span>
                <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isAr ? 'rotate-180' : ''}`} />
              </button>

              <button
                onClick={handleEnrollNow}
                className="w-full sm:w-auto px-6 py-4.5 rounded-2xl bg-[#084C63] hover:bg-[#757454] text-white font-bold uppercase tracking-wider text-xs border border-amber-300/40 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl"
              >
                <span>{isAr ? `تسجيل سريع` : `Quick Enroll`}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Flexible Learning Packages Prompt */}
        <Reveal delay={0.5} direction="up" distance={20}>
          <div className="mt-16 text-center card-shine border border-[#949693]/40 p-8 sm:p-10 rounded-[2.5rem] max-w-3xl mx-auto text-amber-50 shadow-2xl">
             <div className="inline-block bg-[#084C63]/30 border border-[#949693]/40 px-4 py-1.5 rounded-full mb-4">
               <p className="display text-[10px] font-extrabold uppercase tracking-[0.25em] text-amber-200">
                 {isAr ? "عروض وباقات مخصصة للعائلات" : "Flexible Learning Packages"}
               </p>
             </div>
             <p className="text-amber-50 font-medium text-base sm:text-lg leading-relaxed">
               {isAr ? (
                 <>هل تبحث عن باقة مخصصة للإخوة والأخوات، أو برنامج فردي مكثف؟ <span className="text-amber-200 font-bold underline underline-offset-4 decoration-[#949693] hover:text-white transition-colors cursor-pointer" onClick={handleEnrollNow}>تواصل مع مكتب التسجيل والقبول</span></>
               ) : (
                 <>Need a custom plan for family siblings or specialized intensive courses? <span className="text-amber-200 font-bold underline underline-offset-4 decoration-[#949693] hover:text-white transition-colors cursor-pointer" onClick={handleEnrollNow}>Contact our registrar</span></>
               )}
             </p>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
