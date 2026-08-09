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
  const activeCourse = coursesList[activeIndex];

  const handleEnrollNow = () => {
    onSelectCourse?.(activeCourse.title);
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Brand Theme Styles for the 6 Slit-Peeled Ribbon Tabs (01 - 06)
  const ribbonThemes = [
    { 
      bg: 'bg-[#084C63]', 
      activeBg: 'bg-[#084C63]', 
      border: 'border-[#757454]', 
      text: 'text-amber-200', 
      num: '01',
      badge: 'bg-amber-300/20 text-amber-300'
    },
    { 
      bg: 'bg-[#757454]', 
      activeBg: 'bg-[#757454]', 
      border: 'border-[#FCD34D]', 
      text: 'text-amber-100', 
      num: '02',
      badge: 'bg-white/20 text-white'
    },
    { 
      bg: 'bg-[#949693]', 
      activeBg: 'bg-[#949693]', 
      border: 'border-white', 
      text: 'text-[#03171e]', 
      num: '03',
      badge: 'bg-[#03171e]/20 text-[#03171e]'
    },
    { 
      bg: 'bg-[#055147]', 
      activeBg: 'bg-[#055147]', 
      border: 'border-[#FCD34D]', 
      text: 'text-emerald-200', 
      num: '04',
      badge: 'bg-emerald-300/20 text-emerald-300'
    },
    { 
      bg: 'bg-[#032530]', 
      activeBg: 'bg-[#032530]', 
      border: 'border-[#757454]', 
      text: 'text-amber-300', 
      num: '05',
      badge: 'bg-amber-400/20 text-amber-300'
    },
    { 
      bg: 'bg-[#D97706]', 
      activeBg: 'bg-[#D97706]', 
      border: 'border-amber-200', 
      text: 'text-white', 
      num: '06',
      badge: 'bg-white/20 text-white'
    },
  ];

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

        {/* ── 3D SLIT-PEELED RIBBON TABS STAGE (Matching User Reference Screenshot Layout) ── */}
        <div className="space-y-12">
          
          {/* 6 Interactive 3D Slit-Peeled Ribbon Tabs Strip (01 - 06) */}
          <div className="card-shine border-2 border-[#757454]/60 bg-[#030d12]/90 backdrop-blur-2xl p-6 sm:p-10 rounded-[3rem] shadow-[0_30px_90px_rgba(0,0,0,0.85)] relative overflow-hidden">
            <p className="text-center display text-[10px] font-extrabold uppercase tracking-[0.3em] text-amber-300/80 mb-8">
              {isAr ? "اضغط على طية أي مسار (01 - 06) لاستكشاف التفاصيل" : "Press any ribbon tab (01 - 06) to reveal course details"}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 relative items-center justify-center">
              {coursesList.map((course, idx) => {
                const isActive = idx === activeIndex;
                const theme = ribbonThemes[idx];

                return (
                  <motion.div
                    key={course.title}
                    whileHover={{ scale: 1.06, y: -6 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setActiveIndex(idx)}
                    className={`relative cursor-pointer transition-all duration-300 select-none group ${
                      isActive ? 'z-30' : 'z-10'
                    }`}
                  >
                    {/* Vertical Slit Slot Background (Paper Slit Cutout Effect) */}
                    <div className="w-full h-44 sm:h-52 bg-[#051b23]/90 rounded-2xl shadow-[inset_0_0_15px_rgba(0,0,0,0.9)] border border-white/10 relative overflow-hidden flex flex-col justify-between p-3">
                      
                      {/* Inner Slit Line Shadow */}
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-black/70 shadow-[2px_0_10px_rgba(0,0,0,0.9)]" />

                      {/* 3D Curved Peeled Paper Ribbon Tab (Extending out from slit matching reference image!) */}
                      <div 
                        className={`absolute top-1/2 -translate-y-1/2 ${isAr ? 'right-0 rounded-l-3xl border-l-2 border-y-2' : 'left-0 rounded-r-3xl border-r-2 border-y-2'} ${theme.border} ${
                          isActive ? `${theme.activeBg} shadow-[0_15px_35px_rgba(0,0,0,0.7)] scale-105` : `${theme.bg} opacity-85 group-hover:opacity-100`
                        } w-[88%] h-[120px] transition-all duration-300 flex flex-col items-center justify-center p-2 shadow-2xl`}
                        style={{
                          clipPath: isAr 
                            ? 'polygon(0 0, 100% 15%, 100% 85%, 0 100%)' 
                            : 'polygon(0 15%, 100% 0, 100% 100%, 0 85%)'
                        }}
                      >
                        {/* Number Display (01, 02, 03, 04, 05, 06) */}
                        <span className={`display text-3xl sm:text-4xl font-extrabold tracking-tighter ${theme.text} drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]`}>
                          {theme.num}
                        </span>

                        {/* Course Name Snippet */}
                        <span className={`text-[10px] font-bold text-center uppercase tracking-wider line-clamp-1 mt-1 ${theme.text}`}>
                          {course.title.split(' ')[0]}
                        </span>
                      </div>

                      {/* Active Indicator Pulse Pin */}
                      {isActive && (
                        <div className="absolute top-2 right-2 flex items-center gap-1 z-30">
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-300 animate-ping" />
                          <span className="w-2 h-2 rounded-full bg-amber-400" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ── Active Swiped Course Details Card (Reveals upon pressing ribbon tab) ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCourse.title}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={`card-shine border-2 border-[#757454]/60 bg-[#051b23]/95 backdrop-blur-2xl p-8 sm:p-12 rounded-[3rem] shadow-[0_35px_100px_rgba(0,0,0,0.9)] text-amber-50 relative overflow-hidden ${isAr ? 'text-right' : 'text-left'}`}
            >
              {/* Top Track Header */}
              <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10 ${isAr ? 'sm:flex-row-reverse' : ''}`}>
                <div className={`flex items-center gap-4 ${isAr ? 'flex-row-reverse' : ''}`}>
                  <div className="w-14 h-14 rounded-2xl bg-[#084C63]/60 border border-[#757454] flex items-center justify-center shrink-0 shadow-lg">
                    <activeCourse.icon className="w-7 h-7 text-amber-200" />
                  </div>
                  <div>
                    <span className="display text-[10px] font-extrabold uppercase tracking-[0.35em] text-amber-300">
                      {isAr ? `المسار الأكاديمي 0${activeIndex + 1} من 06` : `Academic Track 0${activeIndex + 1} of 06`}
                    </span>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold display text-amber-50 leading-tight">
                      {activeCourse.title}
                    </h3>
                  </div>
                </div>

                <div className="px-4 py-2 rounded-full bg-[#084C63]/40 border border-[#757454]/50 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span className="display text-[10px] font-extrabold uppercase tracking-widest text-amber-200">
                    {isAr ? "برنامج معتمد" : "Certified Track"}
                  </span>
                </div>
              </div>

              {/* Course Intro Paragraph */}
              <p className="text-base sm:text-lg text-amber-100/90 font-medium leading-relaxed mb-8">
                {activeCourse.details.intro}
              </p>

              {/* Milestones & Benefits Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#030d12]/80 border border-[#757454]/40 p-6 rounded-[2rem] space-y-3">
                  <h4 className={`display text-[10.5px] font-extrabold uppercase tracking-[0.25em] text-amber-300 mb-3 ${isAr ? 'text-right' : ''}`}>
                    {isAr ? "أهداف ومحاور البرنامج" : "Key Program Milestones"}
                  </h4>
                  {activeCourse.details.benefits.map((benefit, bIdx) => (
                    <div key={bIdx} className={`flex items-start gap-3 text-amber-100/90 text-xs sm:text-sm font-medium ${isAr ? 'flex-row-reverse text-right' : ''}`}>
                      <CheckCircle2 className="w-4.5 h-4.5 text-amber-300 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-[#084C63]/20 border border-[#757454]/40 p-6 rounded-[2rem] flex flex-col justify-between">
                  <div>
                    <h4 className={`display text-[10.5px] font-extrabold uppercase tracking-[0.25em] text-amber-300 mb-3 ${isAr ? 'text-right' : ''}`}>
                      {isAr ? "الحكمة والنص التوجيهي" : "Spiritual Insight & Hadith"}
                    </h4>
                    <p className="text-xs sm:text-sm italic text-amber-100/90 leading-relaxed font-serif">
                      {isAr ? activeCourse.details.quote : `"${activeCourse.details.quote}"`}
                    </p>
                  </div>
                  <p className="text-[10px] text-amber-100/60 font-medium mt-4">
                    💡 {activeCourse.details.insight}
                  </p>
                </div>
              </div>

              {/* Action Buttons: Read Full Course Details & Quick Enroll */}
              <div className={`flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4 pt-2 ${isAr ? 'sm:flex-row-reverse' : ''}`}>
                <button
                  onClick={() => onViewDetails?.(activeCourse.title)}
                  className="w-full sm:w-auto px-8 py-4.5 rounded-2xl bg-[#949693] hover:bg-white text-[#03171e] font-extrabold uppercase tracking-wider text-xs border-2 border-[#757454] transition-all shadow-2xl flex items-center justify-center gap-3 group cursor-pointer"
                >
                  <span>{isAr ? "معرفة تفاصيل المسار الكاشفة" : "Read Full Course Details"}</span>
                  <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isAr ? 'rotate-180' : ''}`} />
                </button>

                <button
                  onClick={handleEnrollNow}
                  className="w-full sm:w-auto px-7 py-4.5 rounded-2xl bg-[#084C63] hover:bg-[#757454] text-white font-bold uppercase tracking-wider text-xs border border-amber-300/40 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl"
                >
                  <span>{isAr ? `تسجيل سريع` : `Quick Enroll`}</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
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
