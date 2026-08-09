import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookMarked, GraduationCap, Mic2, FileText, Languages, History, 
  CheckCircle2, ArrowRight, ArrowLeft, Sparkles, UserCheck, ShieldCheck, 
  Award, Clock, Calendar, Users, Star, HelpCircle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface CourseDetailItem {
  id: string;
  title: string;
  tagline: string;
  icon: any;
  level: string;
  duration: string;
  frequency: string;
  whoIsItFor: string[];
  benefits: string[];
  curriculum: string[];
  outcomes: string[];
  quote: string;
}

const courseDetailsEn: CourseDetailItem[] = [
  {
    id: 'qaida',
    title: 'Noorani Qaida',
    tagline: 'The Essential Foundation for Reading Quranic Arabic with Precision',
    icon: BookMarked,
    level: 'Beginner / Absolute Starter',
    duration: '2 - 3 Months',
    frequency: '3 - 5 Sessions / Week',
    whoIsItFor: [
      'Children aged 4+ starting their Quranic journey',
      'Adults learning to read Quranic Arabic for the first time',
      'Reverts & Non-Arabic speakers needing phonetic training',
      'Students wanting to correct fundamental letter pronunciation'
    ],
    benefits: [
      'Mastery of Arabic alphabet with exact Makharij (articulation points)',
      'Understanding fundamental Tajweed rules (Harakat, Tanween, Sukoon)',
      'Confidence in joining letters and forming connected Quranic words',
      'Building smooth rhythm and stopping rules from Day 1'
    ],
    curriculum: [
      'Module 1: Single letters & articulation points (Al-Huroof Al-Mufradah)',
      'Module 2: Joined letters & compound shapes (Al-Huroof Al-Murakkabah)',
      'Module 3: Short vowels (Fatha, Kasra, Damma) & Tanween',
      'Module 4: Long vowels (Madd letters) & Soft Vowels (Leen)',
      'Module 5: Sukoon, Shaddah, and Rules of Noon & Meem Sakinah',
      'Module 6: Final evaluation & continuous Mushaf recitation practice'
    ],
    outcomes: [
      'Ability to independently read any verse from the Holy Quran',
      'Zero errors in Arabic letter shapes and vocal phonetics',
      'Direct qualification for the Quran Reading & Fluency course'
    ],
    quote: 'The best among you are those who learn the Quran and teach it. (Sahih Bukhari)'
  },
  {
    id: 'reading',
    title: 'Quran Reading & Fluency',
    tagline: 'Achieve Perfect Recitation Fluency directly from the Holy Mushaf',
    icon: GraduationCap,
    level: 'Intermediate',
    duration: '4 - 6 Months',
    frequency: '3 - 4 Sessions / Week',
    whoIsItFor: [
      'Students who know Arabic letters but struggle with smooth reading',
      'Learners wanting to eliminate hesitations and heavy pauses',
      'Busy professionals seeking regular guided daily recitation',
      'Sisters and brothers striving for beautiful, fluent Tartil'
    ],
    benefits: [
      'Elimination of pauses, stammers, and hesitations during recitation',
      'Practical application of Tajweed rules in continuous Surahs',
      'Mastery of Waqf (stopping) and Ibtida (starting) rules',
      'Refining voice melody, cadence, and reverence (Khushoo)'
    ],
    curriculum: [
      'Phase 1: Recitation of Juz Amma (30th Juz) with detailed correction',
      'Phase 2: Recitation of selected Surahs (Yaseen, Mulk, Kahf, Rahman)',
      'Phase 3: Full Mushaf continuous reading from Surah Al-Baqarah onwards',
      'Phase 4: Advanced stopping signs, saktah, and rare Quranic words',
      'Phase 5: Final fluency test & certificate of recitation completion'
    ],
    outcomes: [
      'Fluent, effortless recitation of all 114 Surahs of the Holy Quran',
      'Correct application of major Tajweed rules without hesitation',
      'Confidence to lead family prayers or recite publicly'
    ],
    quote: 'Whoever recites a letter from the Book of Allah gets a ten-fold reward. (Tirmidhi)'
  },
  {
    id: 'hifz',
    title: 'Hifz (Quran Memorization)',
    tagline: 'Preserve the Divine Word in Your Heart with Tailored 1-on-1 Tracks',
    icon: History,
    level: 'All Levels (Full Hifz / Selected Surahs)',
    duration: '1 - 3 Years (Customized)',
    frequency: '4 - 6 Sessions / Week',
    whoIsItFor: [
      'Children and adults aspiring to become Hafiz-ul-Quran',
      'Students wanting to memorize key Surahs (Yaseen, Mulk, Kahf, Waqiah)',
      'Current Huffaz requiring structured daily revision (Daur & Manzil)',
      'Sisters seeking dedicated female Hafiza tutors for 1-on-1 Hifz'
    ],
    benefits: [
      'Personalized daily lesson (Sabaq), revision (Sabqi), and Daur schedule',
      'Scientific retention techniques to prevent memory fading',
      'Mastery of Mutashabihat (similar Quranic verses)',
      'Daily 1-on-1 recitation with certified Ijazah holding tutors'
    ],
    curriculum: [
      'Track 1: Foundation Hifz (Juz 30 & Juz 29 memorization)',
      'Track 2: Progressive Hifz (New lesson daily + previous 5 pages revision)',
      'Track 3: Consolidation (Full Daur revision cycles & Mutashabihat drills)',
      'Track 4: Sanad preparation & final Hifz Sanad examination'
    ],
    outcomes: [
      'Unshakable memorization of the Holy Quran preserved in memory',
      'Official Hifz Certificate upon passing the institute evaluation',
      'High spiritual elevation and honor for parents in the Hereafter'
    ],
    quote: 'It will be said to the companion of the Quran: Recite and rise in status... (Abu Dawood)'
  },
  {
    id: 'tajweed',
    title: 'Tajweed Mastery & Ijazah',
    tagline: 'Deep Scientific Mastery of Articulation, Attributes, and Recitation',
    icon: Mic2,
    level: 'Advanced',
    duration: '3 - 5 Months',
    frequency: '3 Sessions / Week',
    whoIsItFor: [
      'Reciters wanting to eliminate subtle hidden mistakes (Lahn Khafy)',
      'Teachers and imams seeking formal Ijazah with connected chain',
      'Students who have completed Quran Reading and want mastery',
      'Anyone desiring to recite exactly as revealed to Prophet Muhammad ﷺ'
    ],
    benefits: [
      'In-depth study of Sifaat (letter characteristics: Hams, Jahr, Isti’la)',
      'Complete rules of Ghunnah, Idgham, Ikhfa, Qalqalah, and Maddah',
      'Mastery of articulation points (Makharij Al-Huroof)',
      'Option to test for authenticated Ijazah with unbroken Isnad'
    ],
    curriculum: [
      'Module 1: Science of Makharij (17 articulation points in detail)',
      'Module 2: Sifaat Al-Huroof (Opposite & non-opposite characteristics)',
      'Module 3: Advanced Rules of Noon, Meem, Raa, and Laam Al-Jalalah',
      'Module 4: All types of Madd (Long Vowels) & elongation lengths',
      'Module 5: Examination on classical texts (Al-Jazariyyah / Tuhfat Al-Atfal)'
    ],
    outcomes: [
      'Flawless recitation free from both clear and subtle mistakes',
      'Deep theoretical & practical mastery of Tajweed sciences',
      'Eligibility for Ijazah certification with connected chain to the Prophet ﷺ'
    ],
    quote: '...and recite the Quran with measured recitation (Tartila). (Surah Al-Muzzammil, 4)'
  },
  {
    id: 'tafsir',
    title: 'Quranic Tafsir & Reflection',
    tagline: 'Unveil the Meanings, Historical Context, and Wisdom of Divine Verses',
    icon: FileText,
    level: 'Intermediate to Advanced',
    duration: '6 Months',
    frequency: '2 - 3 Sessions / Week',
    whoIsItFor: [
      'Seekers of knowledge wanting to understand what Allah says directly',
      'Parents & professionals desiring deeper spiritual reflection (Tadabbur)',
      'Students wanting to connect Quranic rulings to daily modern life',
      'Anyone seeking character building (Akhlaq) rooted in the Quran'
    ],
    benefits: [
      'Detailed study of Sabab Al-Nuzul (Reasons for Revelation)',
      'Word-by-word linguistic analysis of key Quranic terminology',
      'Deriving actionable spiritual & moral lessons for modern living',
      'Understanding classical commentary (Ibn Kathir, Al-Qurtubi, As-Sa\'di)'
    ],
    curriculum: [
      'Unit 1: Principles of Tafsir (Usul Al-Tafsir) & Revelation History',
      'Unit 2: Detailed Tafsir of Surah Al-Fatihah & Juz Amma',
      'Unit 3: Tafsir of Selected Major Surahs (Yaseen, Al-Kahf, Al-Hujurat)',
      'Unit 4: Quranic Stories of Prophets & Lessons in Character (Akhlaq)',
      'Unit 5: Applied Quranic Guidance for contemporary personal challenges'
    ],
    outcomes: [
      'Profound personal connection & Khushoo when listening to Quran',
      'Ability to comprehend Divine commands and wisdom directly',
      'Transformation of daily habits and character aligned with the Sunnah'
    ],
    quote: '[This is] a blessed Book which We have revealed that they might reflect upon its verses... (Surah Sad, 29)'
  },
  {
    id: 'arabic',
    title: 'Quranic Arabic Language',
    tagline: 'Unlock Classical Arabic Grammar & Vocabulary to Understand Quran Directly',
    icon: Languages,
    level: 'Beginner to Intermediate',
    duration: '6 Months',
    frequency: '3 Sessions / Week',
    whoIsItFor: [
      'Non-Arabic speakers who want to understand Quran without translations',
      'Students of Islamic knowledge beginning classical Arabic studies',
      'Reverts & lovers of the Arabic language',
      'Anyone wanting to pray with deep focus and direct comprehension'
    ],
    benefits: [
      'Building a functional core vocabulary of 800+ frequent Quranic words',
      'Essential Arabic Grammar (Nahw) and Morphology (Sarf) simplified',
      'Direct translation of Salah, Duas, and everyday Quranic passages',
      'Unlocking the linguistic miracle (I\'jaz) of the Divine text'
    ],
    curriculum: [
      'Level 1: Quranic Vocabulary & High-Frequency Words (80% of Quran)',
      'Level 2: Noun & Verb structures (Al-Ism, Al-Fi\'l, Al-Harf)',
      'Level 3: Sentence Building (Al-Jumlah Al-Ismiyyah & Al-Fi\'liyyah)',
      'Level 4: Applied Quranic Parsing (I\'rab) of short Surahs',
      'Level 5: Practical exercises in direct Quranic reading without translation'
    ],
    outcomes: [
      'Understanding over 80% of Quranic words directly during prayer',
      'Solid foundation in classical Arabic grammar & morphology',
      'Ability to read simple classical Arabic texts independently'
    ],
    quote: 'Indeed, We have sent it down as an Arabic Quran that you might understand. (Surah Yusuf, 2)'
  }
];

const courseDetailsAr: CourseDetailItem[] = [
  {
    id: 'qaida',
    title: 'القاعدة النورانية',
    tagline: 'الأساس المتين المعتمد لتعلم القراءة والتجويد بطريقة سهلة ومتقنة',
    icon: BookMarked,
    level: 'مبتدئ / تأسيس من الصفر',
    duration: '٢ - ٣ أشهر',
    frequency: '٣ - ٥ حصص أسبوعياً',
    whoIsItFor: [
      'الأطفال من سن ٤ سنوات للبدء في رحلتهم مع القرآن',
      'الكبار والمبتدئون الراغبون في تعلم القراءة الصحيحة من الصفر',
      'الناطقون بغير العربية والمحتنون بحاجة لتأسيس النطق الفصيح',
      'كل من يرغب في تصحيح مخارج الحروف العربية وضبط التجويد'
    ],
    benefits: [
      'إتقان مخارج الحروف العربية الصحيحة من مواضعها الصوتية الدقيقة',
      'فهم أحكام التجويد الأساسية (الحركات، التنوين، السكون، الشدة)',
      'اكتساب الثقة الكاملة في تركيب الكلمات القرآنية وقراءتها بطلاقة',
      'ضبط الوقف والابتداء الصحيح منذ الحصة الأولى'
    ],
    curriculum: [
      'الوحدة ١: الحروف المفردة ومخارجها الصوتية الصحيحة',
      'الوحدة ٢: الحروف المركبة وأشكالها المختلفة في أول ووسط وآخر الكلمة',
      'الوحدة ٣: الحركات الثلاث (الفتحة، الكسرة، الضمة) والتنوين',
      'الوحدة ٤: حروف المد واللين وإطالة الصوت بالقدر المطلوب',
      'الوحدة ٥: أحكام السكون والشدة والنون والميم الساكنتين',
      'الوحدة ٦: التطبيق العملي الشامل والتأهيل للقراءة المباشرة من المصحف'
    ],
    outcomes: [
      'القدرة على قراءة أي آية من القرآن الكريم بمفردك وبلا أخطاء',
      'سلامة اللسان والنطق العربي الفصيح الخالي من اللحن الجلي',
      'التأهل المباشر للانتقال لمسار تلاوة القرآن الكريم والطلاقة'
    ],
    quote: '«خَيرُكُم مَن تَعَلَّمَ القُرآنَ وعَلَّمَهُ» (صحيح البخاري)'
  },
  {
    id: 'reading',
    title: 'تلاوة القرآن والطلاقة',
    tagline: 'حقق الطلاقة والجمال في قراءة آيات الذكر الحكيم مباشرة من المصحف الشريف',
    icon: GraduationCap,
    level: 'متوسط',
    duration: '٤ - ٦ أشهر',
    frequency: '٣ - ٤ حصص أسبوعياً',
    whoIsItFor: [
      'الذين يعرفون الحروف العربية ولكنهم بحاجة للطلاقة وعدم التردد',
      'الدارسون الراغبون في التخلص من التلعثم والوقف غير المناسب',
      'المشغولون الباحثون عن وريد قرآني يومي بمتابعة معلم متخصص',
      'الأخوات والإخوة الساعون لتلاوة مرتلة خاشعة وصحيحة'
    ],
    benefits: [
      'التخلص التام من التردد والتلعثم أثناء تلاوة السور الطويلة',
      'التطبيق العملي المستمر لقواعد التجويد أثناء الحصص الحية',
      'إتقان أحكام الوقف والابتداء ومعرفة مواضع التمام',
      'تحسين الصوت ونبرة القراءة والخشوع مع الآيات'
    ],
    curriculum: [
      'المرحلة ١: تلاوة جزء عم مع التصحيح الدقيق والتدريب العملي',
      'المرحلة ٢: تلاوة السور الفاضلة (يس، الملك، الكهف، الرحمن)',
      'المرحلة ٣: التلاوة المسترسلة لسور المصحف بالترتيب ابتداءً من البقرة',
      'المرحلة ٤: علامات الوقف، السكتات، والكلمات القرآنية الدقيقة',
      'المرحلة ٥: الاختبار النهائي لمنح شهادة إتمام مسار التلاوة والطلاقة'
    ],
    outcomes: [
      'تلاوة جميع سور القرآن الكريم الـ ١١٤ بطلاقة ويسر ودون عناء',
      'التطبيق المباشر لأحكام التجويد الأساسية دون تفكير أو تردد',
      'الثقة الكاملة لإمامة الأهل أو القراءة والترتيل في المحافل'
    ],
    quote: '«من قرأ حرفًا من كتابِ اللهِ فله به حسنةٌ، والحسنةُ بعشرِ أمثالِها» (جامع الترمذي)'
  },
  {
    id: 'hifz',
    title: 'تحفيظ القرآن الكريم',
    tagline: 'احفظ كتاب الله في صدرك عبر خطط فردية مخصصة ومتابعة يومية دقيقة',
    icon: History,
    level: 'جميع المستويات (حفظ كامل / سور مختارة)',
    duration: '١ - ٣ سنوات (حسب الخطة)',
    frequency: '٤ - ٦ حصص أسبوعياً',
    whoIsItFor: [
      'الأطفال والكبار الراغبون في نيل شرف حفظ كتاب الله كاملاً',
      'الدارسون الراغبون في حفظ سور معينة (يس، الكهف، الملك، الواقعة)',
      'الحفاظ الباحثون عن برنامج مراجعة منظم (الدور والمنزل) للتثبيت',
      'الأخوات الباحثات عن معلمات حافظات ومجازات للحفظ الفردي'
    ],
    benefits: [
      'جدولة يومية مخصصة للحفظ الجديد (السبق)، المراجعة القريبة والبعيدة (الدور)',
      'استخدام أحدث أساليب التثبيت العلمي لمنع تفلت الآيات',
      'ضبط المتشابهات القرآنية وتمييز المواضع الممتنعة',
      'متابعة فردية daily ١-على-١ مع مشايخ ومعلمات مجازين'
    ],
    curriculum: [
      'المسار ١: التأسيس في الحفظ (حفظ جزء عم وجزء تبارك)',
      'المسار ٢: الحفظ التراكمي (درس جديد يومياً + مراجعة ٥ صفحات سابقة)',
      'المسار ٣: التثبيت والدور الشامل (مراجعة المصحف كاملاً وضبط المتشابهات)',
      'المسار ٤: الإعداد للإجازة وااختبار الحفظ النهائي'
    ],
    outcomes: [
      'حفظ كتاب الله تعالى راسخاً في الصدر كالفاتحة',
      'نيل شهادة الحفظ المعتمدة من المعهد عقب اجتياز الاختبار',
      'الرفعة والكرامة المباركة لوالديك في الدنيا والآخرة'
    ],
    quote: '«يُقالُ لِصاحِبِ القُرآنِ: اقْرَأْ، وارْتَقِ، ورَتِّلْ كما كُنْتَ تُرَتِّلُ في الدُّنْيا» (سنن أبي داود)'
  },
  {
    id: 'tajweed',
    title: 'إتقان علم التجويد والإجازة',
    tagline: 'دراسة علمية تطبيقية معمقة لمخارج الحروف، الصفات، ورواية الإجازة',
    icon: Mic2,
    level: 'متقدم',
    duration: '٣ - ٥ أشهر',
    frequency: '٣ حصص أسبوعياً',
    whoIsItFor: [
      'القراء الباحثون عن التخلص من اللحن الخفي والدقائق التجويدية',
      'المعلمون والأئمة الراغبون في نيل الإجازة بالسند المتصل للنبي ﷺ',
      'الدارسون الذين أتموا تلاوة القرآن ويسعون للكمال والضبط',
      'كل من يبتغي القراءة كما أنزلت على رسول الله ﷺ'
    ],
    benefits: [
      'دراسة تفصيلية لصفات الحروف (الهمس، الجهر، الاستعلاء، الإطباق)',
      'إتقان تام لأحكام الغنن، المدود، الإخفاء، الإدغام، والقلقلة',
      'الضبط الدقيق لـ ١٧ مخرجاً للحروف العربية من مواضعها الصوتية',
      'إمكانية التقدم لااختبار الإجازة بالسند المتصل'
    ],
    curriculum: [
      'الوحدة ١: علم مخارج الحروف (١٧ مخرجاً بالتفصيل والتطبيق)',
      'الوحدة ٢: صفات الحروف (الصفات التي لها ضد والتي لا ضد لها)',
      'الوحدة ٣: أحكام النون والميم الساكنتين، الراءات، ولَام الجلالة',
      'الوحدة ٤: أنواع المدود وأحكامها ومقادير المد بالتفصيل',
      'الوحدة ٥: دراسة واختبار في المنظومات الكلاسيكية (الجزرية / تحفة الأطفال)'
    ],
    outcomes: [
      'قراءة قرآنية مجودة ناصعة خالية من اللحن الجلي والخفي',
      'إتقان نظري وعملي كامل لعلوم التجويد وروايات التلاوة',
      'التأهل لنيل الإجازة القرآنية بالسند المتصل للرسول ﷺ'
    ],
    quote: '«...وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا» (سورة المزمل، جزء من آية ٤)'
  },
  {
    id: 'tafsir',
    title: 'تفسير القرآن والتدبر',
    tagline: 'استكشف معاني الآيات العظيمة، أسباب النزول، والعبر التربوية لحياتك',
    icon: FileText,
    level: 'متوسط إلى متقدم',
    duration: '٦ أشهر',
    frequency: '٢ - ٣ حصص أسبوعياً',
    whoIsItFor: [
      'طلاب العلم الراغبون في فهم مراد الله تعالى مباشرة',
      'أولياء الأمور والمهنيون الساعون لعمق التدبر والارتقاء الروحي',
      'الراغبون في ربط تعليمات القرآن بواقع الحياة المعاصرة',
      'كل من يبتغي تهذيب الأخلاق والسلوك بنور التنزيل'
    ],
    benefits: [
      'دراسة تفصيلية لأسباب النزول وسياق الآيات التاريخي',
      'تحليل لغوي وبلاغي لمفردات القرآن وتراكيبه السامية',
      'استنباط الدروس العملية والأخلاقية لبناء الشخصية المسلمة',
      'الاستفادة من أمهات كتب التفسير (ابن كثير، القرطبي، السعدي)'
    ],
    curriculum: [
      'الوحدة ١: أصول التفسير وقواعد التدبر وتاريخ جمع القرآن',
      'الوحدة ٢: تفسير سورة الفاتحة وجزء عم بالتفصيل',
      'الوحدة ٣: تفسير السور الفاضلة (يس، الكهف، الحجرات، الرحمن)',
      'الوحدة ٤: قصص الأنبياء في القرآن ودروس السلوك والأخلاق',
      'الوحدة ٥: التوجيهات القرآنية لمعالجة المشكلات والتحديات المعاصرة'
    ],
    outcomes: [
      'اتصال روحي عميق وخشوع تام عند سماع وتلاوة القرآن',
      'إدراك المقاصد والحكم الإلهية مباشرة دون حائل',
      'ارتقاء الأخلاق والسلوك والتصرفات وفق السنة والقرآن'
    ],
    quote: '«كِتَابٌ أَنزَلْنَاهُ إِلَيْكَ مُبَارَكٌ لِّيَدَّبَّرُوا آيَاتِهِ وَلِيَتَذَكَّرَ أُولُو الْأَلْبَابِ» (سورة ص، ٢٩)'
  },
  {
    id: 'arabic',
    title: 'اللغة العربية القرآنية',
    tagline: 'افهم لغة القرآن الفصيحة وبلاغتها لتتصل بالذكر الحكيم مباشرة',
    icon: Languages,
    level: 'مبتدئ إلى متوسط',
    duration: '٦ أشهر',
    frequency: '٣ حصص أسبوعياً',
    whoIsItFor: [
      'غير الناطقين بالعربية الراغبون في فهم القرآن بدون ترجمة',
      'طلاب العلوم الشرعية في بداية دراستهم للغة العربية',
      'المحتنون ومحبو لغة الضاد الشريفة',
      'كل من يرغب في الصلاة بتركيز وفهم مباشر لما يقروءه'
    ],
    benefits: [
      'بناء حصيلة لغوية من ٨٠٠+ مفردة قرآنية الأكثر تكراراً',
      'تبسيط النحو والصرف القرآني لتطبيقه المباشر',
      'ترجمة مباشرة لأذكار الصلاة والدعاء والآيات اليومية',
      'تذوق مواطن الإعجاز اللغوي والبلاغي للنص القرآني'
    ],
    curriculum: [
      'المستوى ١: المفردات القرآنية الكثيرة التكرار (تغطي ٨٠٪ من المصحف)',
      'المستوى ٢: بنية الكلمة (الاسم، الفعل، الحرف) والأفعال الماضية والمضارعة',
      'المستوى ٣: تركيب الجملة (الجملة الاسمية والجملة الفعلية)',
      'المستوى ٤: الإعراب التطبيقي المبسط للسور القصيرة',
      'المستوى ٥: التدريب المباشر على قراءة وفهم صفحات القرآن بدون ترجمة'
    ],
    outcomes: [
      'فهم أكثر من ٨٠٪ من كلمات القرآن الكريم مباشرة أثناء الصلاة',
      'تأسيس متين في قواعد النحو والصرف العربي الشريف',
      'القدرة على قراءة الكتب الإسلامية العربية البسيطة بمفردك'
    ],
    quote: '«إِنَّا أَنزَلْنَاهُ قُرْآنًا عَرَبِيًّا لَّعَلَّكُمْ تَعْقِلُونَ» (سورة يوسف، ٢)'
  }
];

interface CourseDetailsPageProps {
  onBack: () => void;
  selectedCourseId?: string | null;
  onRegisterCourse: (courseTitle: string) => void;
}

export default function CourseDetailsPage({ onBack, selectedCourseId, onRegisterCourse }: CourseDetailsPageProps) {
  const { isAr } = useLanguage();
  const courseList = isAr ? courseDetailsAr : courseDetailsEn;

  // Determine initial active course index with robust bidirectional fuzzy matching
  const initialIndex = selectedCourseId 
    ? Math.max(0, courseList.findIndex(c => {
        const target = selectedCourseId.trim().toLowerCase();
        const title = c.title.trim().toLowerCase();
        const id = c.id.trim().toLowerCase();
        return id === target || title.includes(target) || target.includes(title);
      }))
    : 0;

  const [activeIndex, setActiveIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
  const activeCourse = courseList[activeIndex];
  const Icon = activeCourse.icon;

  return (
    <div className="bg-transparent min-h-screen pt-28 pb-24 text-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Back Navigation Button */}
        <div className="mb-10">
          <button 
            onClick={onBack}
            className={`group flex items-center gap-3 text-amber-100/85 hover:text-amber-200 font-bold uppercase tracking-[0.3em] text-[10px] transition-all cursor-pointer ${isAr ? 'flex-row-reverse mr-0 ml-auto' : ''}`}
          >
            <div className="w-8 h-8 rounded-full border border-[#949693]/40 bg-[#084C63]/30 flex items-center justify-center group-hover:bg-[#084C63] group-hover:border-amber-300 transition-all">
              <ArrowLeft className={`w-3.5 h-3.5 text-amber-200 ${isAr ? 'rotate-180' : ''}`} />
            </div>
            {isAr ? 'العودة للرئيسية' : 'Back to Home'}
          </button>
        </div>

        {/* Header Card Box */}
        <div className="card-shine border border-[#949693]/35 p-8 sm:p-12 rounded-[3rem] shadow-2xl text-center max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#084C63]/40 border border-[#949693]/40 mb-4">
            <Sparkles className="w-4 h-4 text-amber-200" />
            <h2 className="display text-[10px] font-extrabold uppercase tracking-[0.4em] text-amber-200">
              {isAr ? "دليل المسارات الأكاديمية الشامل" : "Comprehensive Course Catalog"}
            </h2>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold display text-amber-50 mb-4 text-balance">
            {isAr ? "تفاصيل ومناهج المسارات القرآنيّة" : "In-Depth Academic Disciplines"}
          </h1>
          <p className="text-amber-100/90 text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            {isAr 
              ? "استكشف أهداف كل مسار دراسي، الفئات المستهدفة، المناهج المعتمدة، والمخرجات التعليمية المباركة."
              : "Discover curriculum modules, target audiences, spiritual benefits, and learning outcomes for every program."}
          </p>
        </div>

        {/* Horizontal Course Switcher Tabs */}
        <div className="flex items-center justify-center gap-3 flex-wrap mb-16 px-2">
          {courseList.map((course, idx) => {
            const isActive = idx === activeIndex;
            const TabIcon = course.icon;
            return (
              <button
                key={course.id}
                onClick={() => setActiveIndex(idx)}
                className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 flex items-center gap-2.5 cursor-pointer shadow-lg ${
                  isActive 
                    ? 'bg-[#084C63] text-white border border-amber-300/80 shadow-[#084C63]/40 scale-105' 
                    : 'card-shine border border-[#949693]/30 text-amber-100/80 hover:text-white hover:border-amber-300/40'
                } ${isAr ? 'flex-row-reverse' : ''}`}
              >
                <TabIcon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-amber-100/60'}`} />
                <span>{course.title}</span>
              </button>
            );
          })}
        </div>

        {/* Main Active Course Details Display Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCourse.id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.45 }}
            className="space-y-12"
          >
            {/* Top Overview & Specs Hero Banner */}
            <div className={`card-shine border-2 border-[#757454]/60 hover:border-[#757454] p-8 sm:p-12 rounded-[3rem] shadow-2xl relative overflow-hidden text-amber-50 ${isAr ? 'text-right' : 'text-left'}`}>
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#084C63]/30 rounded-full blur-3xl pointer-events-none"></div>

              <div className={`grid lg:grid-cols-[1fr,320px] gap-8 lg:gap-12 items-center ${isAr ? 'direction-rtl' : ''}`}>
                <div>
                  <div className={`flex items-center gap-4 mb-4 ${isAr ? 'flex-row-reverse' : ''}`}>
                    <div className="w-14 h-14 bg-[#084C63]/60 border border-amber-300/50 rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                      <Icon className="w-7 h-7 text-amber-200" />
                    </div>
                    <div>
                      <span className="display text-[10px] font-bold uppercase tracking-[0.3em] text-amber-300">
                        {isAr ? `المسار الأكاديمي 0${activeIndex + 1}` : `Academic Track 0${activeIndex + 1}`}
                      </span>
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold display text-amber-50 leading-tight">
                        {activeCourse.title}
                      </h2>
                    </div>
                  </div>

                  <p className="text-lg sm:text-xl text-amber-100/90 font-medium leading-relaxed mb-6">
                    {activeCourse.tagline}
                  </p>

                  <div className={`bg-[#084C63]/30 border-l-4 border-amber-300 p-4 rounded-r-2xl text-sm italic text-amber-100/90 font-medium ${isAr ? 'border-l-0 border-r-4 rounded-r-none rounded-l-2xl' : ''}`}>
                    {isAr ? activeCourse.quote : `"${activeCourse.quote}"`}
                  </div>
                </div>

                {/* Specs Box */}
                <div className="bg-[#051b23]/90 border border-[#757454]/50 p-6 sm:p-7 rounded-[2rem] space-y-4 shadow-xl">
                  <h3 className="display text-[11px] font-extrabold uppercase tracking-[0.25em] text-amber-300 mb-2 border-b border-white/10 pb-2">
                    {isAr ? "مواصفات وتفاصيل المسار" : "Course Specifications"}
                  </h3>
                  
                  <div className={`flex items-center gap-3 text-xs sm:text-sm font-medium text-amber-100 ${isAr ? 'flex-row-reverse text-right' : ''}`}>
                    <Award className="w-4 h-4 text-amber-300 shrink-0" />
                    <span><strong>{isAr ? "المستوى:" : "Level:"}</strong> {activeCourse.level}</span>
                  </div>

                  <div className={`flex items-center gap-3 text-xs sm:text-sm font-medium text-amber-100 ${isAr ? 'flex-row-reverse text-right' : ''}`}>
                    <Clock className="w-4 h-4 text-amber-300 shrink-0" />
                    <span><strong>{isAr ? "المدة المتوقعة:" : "Duration:"}</strong> {activeCourse.duration}</span>
                  </div>

                  <div className={`flex items-center gap-3 text-xs sm:text-sm font-medium text-amber-100 ${isAr ? 'flex-row-reverse text-right' : ''}`}>
                    <Calendar className="w-4 h-4 text-amber-300 shrink-0" />
                    <span><strong>{isAr ? "عدد الحصص:" : "Frequency:"}</strong> {activeCourse.frequency}</span>
                  </div>

                  <div className={`flex items-center gap-3 text-xs sm:text-sm font-medium text-amber-100 ${isAr ? 'flex-row-reverse text-right' : ''}`}>
                    <Users className="w-4 h-4 text-amber-300 shrink-0" />
                    <span><strong>{isAr ? "نظام التدريس:" : "Class Format:"}</strong> {isAr ? "حصص فردية 1-على-1" : "1-on-1 Personalized Live"}</span>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => onRegisterCourse(activeCourse.title)}
                      className="w-full py-4 rounded-xl bg-[#949693] hover:bg-white text-[#03171e] font-extrabold uppercase tracking-wider text-xs border border-white/40 transition-all shadow-xl flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      <span>{isAr ? `التسجيل في ${activeCourse.title}` : `Enroll in ${activeCourse.title}`}</span>
                      <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isAr ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Detailed Sections Grid: Who is it for, Benefits, & Curriculum Roadmap */}
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Section 1: Who Is This Course For? */}
              <div className={`card-shine border-2 border-[#757454]/60 hover:border-[#757454] p-8 rounded-[2.5rem] shadow-xl text-amber-50 ${isAr ? 'text-right' : 'text-left'}`}>
                <div className={`flex items-center gap-3 mb-6 ${isAr ? 'flex-row-reverse' : ''}`}>
                  <div className="w-10 h-10 rounded-xl bg-[#084C63]/60 border border-amber-300/40 flex items-center justify-center shrink-0">
                    <UserCheck className="w-5 h-5 text-amber-200" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold display text-amber-50">
                    {isAr ? "لمن هذا المسار؟" : "Who Is It For?"}
                  </h3>
                </div>
                <div className="space-y-3.5">
                  {activeCourse.whoIsItFor.map((item, idx) => (
                    <div key={idx} className={`flex items-start gap-3 text-amber-100/90 text-sm font-medium ${isAr ? 'flex-row-reverse' : ''}`}>
                      <div className="w-2 h-2 rounded-full bg-amber-300 shrink-0 mt-2" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 2: Key Benefits & Outcomes */}
              <div className={`card-shine border-2 border-[#757454]/60 hover:border-[#757454] p-8 rounded-[2.5rem] shadow-xl text-amber-50 ${isAr ? 'text-right' : 'text-left'}`}>
                <div className={`flex items-center gap-3 mb-6 ${isAr ? 'flex-row-reverse' : ''}`}>
                  <div className="w-10 h-10 rounded-xl bg-[#084C63]/60 border border-amber-300/40 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-amber-200" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold display text-amber-50">
                    {isAr ? "أبرز فوائد ومخرجات المسار" : "Key Benefits & Outcomes"}
                  </h3>
                </div>
                <div className="space-y-3.5">
                  {activeCourse.benefits.map((benefit, idx) => (
                    <div key={idx} className={`flex items-start gap-3 text-amber-100/90 text-sm font-medium ${isAr ? 'flex-row-reverse' : ''}`}>
                      <CheckCircle2 className="w-4.5 h-4.5 text-amber-300 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 3: Curriculum Modules Roadmap */}
              <div className={`card-shine border-2 border-[#757454]/60 hover:border-[#757454] p-8 rounded-[2.5rem] shadow-xl text-amber-50 ${isAr ? 'text-right' : 'text-left'}`}>
                <div className={`flex items-center gap-3 mb-6 ${isAr ? 'flex-row-reverse' : ''}`}>
                  <div className="w-10 h-10 rounded-xl bg-[#084C63]/60 border border-amber-300/40 flex items-center justify-center shrink-0">
                    <BookMarked className="w-5 h-5 text-amber-200" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold display text-amber-50">
                    {isAr ? "الخطة والمحاور الدراسية" : "Curriculum Roadmap"}
                  </h3>
                </div>
                <div className="space-y-3.5">
                  {activeCourse.curriculum.map((module, idx) => (
                    <div key={idx} className={`p-3.5 rounded-xl bg-[#051b23]/80 border border-[#757454]/40 text-amber-100 text-xs sm:text-sm font-semibold flex items-center gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
                      <span className="w-6 h-6 rounded-lg bg-[#084C63] text-amber-200 flex items-center justify-center text-xs font-bold shrink-0">
                        {idx + 1}
                      </span>
                      <span>{module}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Registration Prompt Banner */}
            <div className="card-shine border-2 border-[#757454]/60 p-8 sm:p-12 rounded-[3rem] shadow-2xl text-center max-w-4xl mx-auto text-amber-50">
              <h3 className="text-2xl sm:text-3xl font-bold display mb-3">
                {isAr ? `جاهز للبدء في مسار ${activeCourse.title}؟` : `Ready to Begin ${activeCourse.title}?`}
              </h3>
              <p className="text-amber-100/90 text-sm sm:text-base font-medium max-w-xl mx-auto mb-8">
                {isAr 
                  ? "سجل الآن واحصل على تجربة مجانية ٣ أيام للتعرف على المعلمين وطريقة التدريس بدون أي التزام."
                  : "Register today and enjoy a 3-day free trial session with our distinguished certified tutors."}
              </p>
              <button
                onClick={() => onRegisterCourse(activeCourse.title)}
                className="px-10 py-5 rounded-full bg-[#949693] hover:bg-white text-[#03171e] font-extrabold uppercase tracking-[0.2em] text-xs border border-white/40 transition-all shadow-2xl inline-flex items-center gap-3 cursor-pointer"
              >
                <span>{isAr ? "سجل في التجربة المجانية" : "Enroll for Free 3-Day Trial"}</span>
                <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}
