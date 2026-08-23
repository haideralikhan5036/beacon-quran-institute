import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'motion/react';
import { BookMarked, GraduationCap, Mic2, FileText, Languages, History, CheckCircle2, ArrowRight, Sparkles, ChevronLeft, ChevronRight, ShieldCheck, Clock, Users, Trophy } from 'lucide-react';
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

// ── 3D Floating Showcase Card Component ──
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
  const rX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), springConfig);
  const rY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), springConfig);

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

  // Dynamic luxury lighting
  const dynamicShadow = isHovered
    ? '0 50px 100px -20px rgba(8,76,99,0.7), 0 0 45px rgba(252,211,77,0.35)'
    : '0 35px 80px -15px rgba(0,0,0,0.85), 0 0 30px rgba(117,116,84,0.3)';

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
      }}
      className={`relative w-[280px] sm:w-[320px] md:w-[350px] h-[380px] sm:h-[420px] rounded-[3rem] transition-[border-color,box-shadow] duration-300 ease-out select-none cursor-pointer bg-gradient-to-b from-[#084C63]/90 via-[#051b23] to-[#030d12] border-2 border-[#757454] backdrop-blur-2xl p-8 flex flex-col justify-between overflow-hidden group ${
        isAr ? 'text-right' : 'text-left'
      }`}
    >
      {/* Background Ornament Texture */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none" 
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/arabic-overlay.png")' }} 
      />

      {/* Atmospheric Top Glow */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-400/15 blur-3xl rounded-full pointer-events-none" />

      {/* Top Bar inside Card */}
      <div 
        className={`flex justify-between items-center relative z-10 ${isAr ? 'flex-row-reverse' : ''}`}
        style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
      >
        <div className="w-16 h-16 rounded-2xl bg-[#084C63]/80 border-2 border-[#757454] flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform">
          <course.icon className="w-8 h-8 text-amber-200" />
        </div>
        
        <span className="display text-6xl font-extrabold text-[#757454]/40 font-serif leading-none drop-shadow">
          0{index + 1}
        </span>
      </div>

      {/* Middle Content inside Card */}
      <div 
        className={`relative z-10 flex flex-col gap-3 my-auto ${isAr ? 'items-end' : 'items-start'}`}
        style={{ transform: "translateZ(45px)", transformStyle: "preserve-3d" }}
      >
        <div className="h-1.5 w-14 bg-gradient-to-r from-amber-300 to-[#757454] rounded-full" />
        <h4 className="text-2xl sm:text-3xl font-bold display leading-tight text-amber-50 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          {course.title}
        </h4>
        <p className="text-xs sm:text-sm font-medium leading-relaxed text-amber-100/85 line-clamp-4">
          {course.desc}
        </p>
      </div>

      {/* Bottom Interactive Link inside Card */}
      <div 
        onClick={(e) => {
          e.stopPropagation();
          onViewDetails?.(course.title);
        }}
        className={`relative z-10 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-300 hover:text-white transition-colors cursor-pointer pt-4 border-t border-white/10 ${isAr ? 'flex-row-reverse' : ''}`}
        style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}
      >
        <span>{isAr ? "معرفة تفاصيل المسار" : "Explore Curriculum"}</span>
        <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isAr ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
      </div>
    </motion.div>
  );
}

export default function Courses({ onSelectCourse, onViewDetails }: CoursesProps) {
  const { isAr } = useLanguage();
  const coursesList = isAr ? coursesAr : courses;

  const [activeIndex, setActiveIndex] = useState(0);
  const mobilePillsRef = useRef<HTMLDivElement>(null);
  const activeCourse = coursesList[activeIndex];

  const handleEnrollNow = () => {
    onSelectCourse?.(activeCourse.title);
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % coursesList.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + coursesList.length) % coursesList.length);
  };

  // Auto-scroll pill buttons on mobile when activeIndex changes
  useEffect(() => {
    if (mobilePillsRef.current) {
      const container = mobilePillsRef.current;
      const buttons = container.querySelectorAll<HTMLButtonElement>('button');
      if (buttons[activeIndex]) {
        const targetBtn = buttons[activeIndex];
        const containerWidth = container.offsetWidth;
        const scrollLeft = targetBtn.offsetLeft - (containerWidth / 2) + (targetBtn.offsetWidth / 2);
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [activeIndex]);

  const sectionSubtitle = isAr ? "مساراتنا الدراسية" : "Our Academic Paths";
  const sectionTitle = isAr ? "علوم التنزيل الشريفة لكل طالب علم" : "Sacred Knowledge for Every Learner";

  return (
    <section 
      id="courses" 
      className="py-16 sm:py-24 bg-transparent relative overflow-hidden"
    >
      {/* Background Lighting Glow */}
      <div className="absolute inset-x-0 top-0 bottom-0 bg-gradient-to-br from-accent/[0.02] via-transparent to-primary/[0.02] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-gradient-to-tr from-accent/5 via-transparent to-primary/5 blur-3xl pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <Reveal delay={0.1} width="100%">
          <div className="card-shine border border-[#949693]/35 p-6 sm:p-8 rounded-[2.5rem] max-w-3xl mx-auto text-center mb-10 sm:mb-14 shadow-2xl">
            <div className={`inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-[#084C63]/30 border border-[#949693]/40 mb-4 ${isAr ? 'flex-row-reverse' : ''}`}>
              <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" />
              <h2 className="display text-[10px] font-extrabold uppercase tracking-[0.3em] text-amber-200">{sectionSubtitle}</h2>
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold display text-amber-50 text-balance">
              {sectionTitle}
            </h3>
          </div>
        </Reveal>

        {/* ── LUXURY MASTER SHOWCASE STAGE (Inspired by Pinterest 3D Product Stage) ── */}
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="card-shine border-2 border-[#757454]/60 bg-gradient-to-b from-[#051b23]/95 via-[#030d12]/95 to-[#051b23]/95 backdrop-blur-2xl p-6 sm:p-10 lg:p-14 rounded-[3rem] shadow-[0_35px_100px_rgba(0,0,0,0.9)] relative overflow-hidden"
        >
          
          {/* ── 1. TOP CAPSULE PILL SWITCHER ── */}
          <div className="flex justify-center mb-10 lg:mb-12">
            <div 
              ref={mobilePillsRef}
              className="flex items-center gap-2 bg-[#030d12]/90 border border-[#757454]/40 p-2 rounded-full max-w-full overflow-x-auto scrollbar-none shadow-2xl"
            >
              {coursesList.map((course, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={course.title}
                    onClick={() => setActiveIndex(idx)}
                    className={`relative px-4 sm:px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                      isActive 
                        ? 'text-white' 
                        : 'text-amber-100/70 hover:text-amber-50 hover:bg-white/5'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeCoursePill"
                        className="absolute inset-0 rounded-full bg-[#084C63] border border-amber-300/60 shadow-[0_0_20px_rgba(8,76,99,0.9)] z-0"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 font-mono text-xs opacity-75 font-extrabold">0{idx + 1}</span>
                    <span className="relative z-10">{course.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── 2. THREE-COLUMN SHOWCASE STAGE ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* ── LEFT COLUMN: Course Intro & Action Buttons ── */}
            <div className={`lg:col-span-5 flex flex-col justify-center space-y-6 ${isAr ? 'text-right' : 'text-left'}`}>
              
              {/* Previous / Next Controls Bar */}
              <div className={`flex items-center gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="w-11 h-11 rounded-full bg-[#084C63]/60 hover:bg-[#084C63] border border-[#757454] text-amber-200 hover:text-white flex items-center justify-center transition-all duration-200 shadow-lg cursor-pointer active:scale-95"
                    aria-label="Previous Course"
                  >
                    <ChevronLeft className={`w-5 h-5 ${isAr ? 'rotate-180' : ''}`} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-11 h-11 rounded-full bg-[#084C63]/60 hover:bg-[#084C63] border border-[#757454] text-amber-200 hover:text-white flex items-center justify-center transition-all duration-200 shadow-lg cursor-pointer active:scale-95"
                    aria-label="Next Course"
                  >
                    <ChevronRight className={`w-5 h-5 ${isAr ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#084C63]/30 border border-[#757454]/40 text-amber-300 font-extrabold text-[10px] uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                  <span>{isAr ? `المسار 0${activeIndex + 1} من 06` : `Track 0${activeIndex + 1} of 06`}</span>
                </div>
              </div>

              {/* Title & Description with AnimatePresence */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCourse.title}
                  initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isAr ? -20 : 20 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="space-y-4"
                >
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold display text-amber-50 leading-[1.15]">
                    {activeCourse.title}
                  </h3>

                  <p className="text-sm sm:text-base text-amber-100/90 font-medium leading-relaxed">
                    {activeCourse.details.intro}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Program Milestones Checklist */}
              <div className="bg-[#030d12]/80 border border-[#757454]/40 p-4 sm:p-5 rounded-2xl space-y-2.5">
                <h4 className={`display text-[10px] font-extrabold uppercase tracking-[0.25em] text-amber-300 mb-2 ${isAr ? 'text-right' : ''}`}>
                  {isAr ? "أهم مخرجات المسار:" : "Program Milestones:"}
                </h4>
                {activeCourse.details.benefits.map((benefit, bIdx) => (
                  <div key={bIdx} className={`flex items-start gap-2.5 text-amber-100/90 text-xs sm:text-sm font-medium ${isAr ? 'flex-row-reverse text-right' : ''}`}>
                    <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Dedicated Action Buttons */}
              <div className={`flex flex-col sm:flex-row items-center gap-3 pt-2 ${isAr ? 'flex-row-reverse' : ''}`}>
                <button
                  onClick={() => onViewDetails?.(activeCourse.title)}
                  className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#949693] hover:bg-white text-[#03171e] font-extrabold uppercase tracking-wider text-xs border-2 border-[#757454] transition-all shadow-xl flex items-center justify-center gap-2.5 group cursor-pointer"
                >
                  <span>{isAr ? "معرفة تفاصيل المسار الكاشفة" : "Read Full Course Details"}</span>
                  <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isAr ? 'rotate-180' : ''}`} />
                </button>

                <button
                  onClick={handleEnrollNow}
                  className="w-full sm:w-auto px-6 py-4 rounded-xl bg-[#084C63] hover:bg-[#757454] text-white font-bold uppercase tracking-wider text-xs border border-amber-300/40 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>{isAr ? `تسجيل سريع` : `Quick Enroll`}</span>
                </button>
              </div>

            </div>

            {/* ── CENTER COLUMN: 3D Floating Featured Card ── */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center py-6 relative">
              
              {/* Dynamic 3D Card Transition with AnimatePresence */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCourse.title}
                  initial={{ opacity: 0, scale: 0.88, rotateY: isAr ? -25 : 25 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.88, rotateY: isAr ? 25 : -25 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10"
                >
                  <CourseCard3D 
                    course={activeCourse}
                    index={activeIndex}
                    isActive={true}
                    onViewDetails={onViewDetails}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Realistic Elliptical Shadow beneath the floating 3D card */}
              <motion.div 
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: [0.5, 0.7, 0.5]
                }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-48 sm:w-56 h-6 bg-black/90 rounded-full blur-lg mt-4 pointer-events-none"
              />
            </div>

            {/* ── RIGHT COLUMN: Quick Highlights & Spiritual Hadith ── */}
            <div className={`lg:col-span-3 flex flex-col justify-between space-y-6 ${isAr ? 'text-right' : 'text-left'}`}>
              
              {/* Quick Jump Number Badges (01 to 06) */}
              <div className="bg-[#030d12]/80 border border-[#757454]/40 p-5 rounded-2xl">
                <span className="display text-[9px] font-extrabold uppercase tracking-[0.25em] text-amber-300 block mb-3">
                  {isAr ? "اختر المسار بالأرقام:" : "Quick Track Selector:"}
                </span>
                <div className="grid grid-cols-3 gap-2.5">
                  {coursesList.map((c, idx) => {
                    const isSelected = idx === activeIndex;
                    return (
                      <button
                        key={c.title}
                        onClick={() => setActiveIndex(idx)}
                        className={`h-11 rounded-xl font-bold font-mono text-sm transition-all duration-200 flex items-center justify-center border cursor-pointer ${
                          isSelected
                            ? 'bg-[#084C63] border-amber-300 text-white shadow-lg scale-105'
                            : 'bg-black/30 border-white/10 text-amber-100/70 hover:border-[#757454] hover:text-white'
                        }`}
                      >
                        0{idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Course Highlights Badges */}
              <div className="space-y-2.5">
                <div className={`flex items-center gap-3 p-3 rounded-xl bg-[#084C63]/30 border border-[#757454]/40 text-xs font-semibold text-amber-100/90 ${isAr ? 'flex-row-reverse' : ''}`}>
                  <Users className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>{isAr ? "حصص فردية مخصصة ١-على-١" : "1-on-1 Personalized Classes"}</span>
                </div>
                <div className={`flex items-center gap-3 p-3 rounded-xl bg-[#084C63]/30 border border-[#757454]/40 text-xs font-semibold text-amber-100/90 ${isAr ? 'flex-row-reverse' : ''}`}>
                  <Trophy className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>{isAr ? "مشايخ ومعلمات مجازون بالسند" : "Certified Ijazah Faculty"}</span>
                </div>
                <div className={`flex items-center gap-3 p-3 rounded-xl bg-[#084C63]/30 border border-[#757454]/40 text-xs font-semibold text-amber-100/90 ${isAr ? 'flex-row-reverse' : ''}`}>
                  <Clock className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>{isAr ? "مواعيد مرنة على مدار ٢٤/٧" : "24/7 Global Flexible Times"}</span>
                </div>
              </div>

              {/* Spiritual Prophetic Hadith / Quote */}
              <div className={`p-4 rounded-2xl bg-[#084C63]/20 border-l-4 border-amber-300 text-xs italic text-amber-100/90 leading-relaxed ${isAr ? 'border-l-0 border-r-4' : ''}`}>
                <span className="block font-bold not-italic text-[10px] text-amber-300 uppercase tracking-widest mb-1">
                  {isAr ? "حكمة نبوية شريفة:" : "Prophetic Wisdom:"}
                </span>
                {isAr ? activeCourse.details.quote : `"${activeCourse.details.quote}"`}
              </div>

            </div>

          </div>

        </motion.div>

        {/* Flexible Learning Packages Prompt */}
        <Reveal delay={0.5} direction="up" distance={20}>
          <div className="mt-14 text-center card-shine border border-[#949693]/40 p-8 sm:p-10 rounded-[2.5rem] max-w-3xl mx-auto text-amber-50 shadow-2xl">
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
