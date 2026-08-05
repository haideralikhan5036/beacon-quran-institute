import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isAr: boolean;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.courses': 'Courses',
    'nav.services': 'Services',
    'nav.blog': 'Blog',
    'nav.testimonials': 'Testimonials',
    'nav.contact': 'Contact',
    'nav.startLearning': 'Start Learning',
    'institute.arabic': 'معھد منارۃ القرآن',
    'institute.title': 'BEACON QURAN INSTITUTE',

    // Hero
    'hero.badge': 'House of Wisdom • Ancient Islamic Sanctuary',
    'hero.title1': 'Step Into the Light',
    'hero.title2': 'of Knowledge',
    'hero.title3': 'BEACON QURAN INSTITUTE',
    'hero.subtitle': 'World-Class Online Quranic & Islamic Education',
    'hero.description': 'Walk through our ancient sanctuary of sacred wisdom. Join a global community of dedicated scholars and learners guided by authentic traditional principles.',
    'hero.methodology': 'Explore Corridor',
    'hero.startJourney': 'Begin Your Journey',
    'hero.trustedBy': 'Trusted by students in 30+ countries worldwide',

    // Sections
    'courses.title': 'Our Elite Programs',
    'courses.subtitle': 'Tailored spiritual pathways for comprehensive Quranic, Tajweed, and Islamic studies',
    'courses.swipeHint': 'Click, navigate, or hover cards to explore academic disciplines',
    'courses.mobileSwipeHint': 'Swipe left or right to slide courses',
    
    // Testimonials
    'testimonials.title': 'Global Voices',
    'testimonials.subtitle': 'Hear from our dedicated students around the world about their transformative spiritual journeys',
    'testimonials.allReviews': 'View All Academic Reviews',
    'testimonials.backHome': 'Return To Sanctuary',

    // Registration Form
    'reg.badge': 'Registration Portal',
    'reg.title': 'Embark on Your Spiritual Journey',
    'reg.subtitle': 'Fill out the enrollment form below. Our academic admissions office will reach out to you within 24 hours to schedule your orientation and free evaluation session.',
    'reg.name': 'Your Full Name',
    'reg.namePlaceholder': 'Enter your full authentic name',
    'reg.phone': 'WhatsApp / Phone Number',
    'reg.phonePlaceholder': '+92 300 1234567 (with country code)',
    'reg.email': 'Email Address',
    'reg.emailPlaceholder': 'you@example.com',
    'reg.course': 'Select Academic Course',
    'reg.courseDefault': '-- Choose your program of interest --',
    'reg.plan': 'Select Timing & Fee Structure',
    'reg.planDefault': '-- Choose your preferred schedule --',
    'reg.notes': 'Additional Aspirations or Islamic Background',
    'reg.notesPlaceholder': 'Let us know your learning level, prior background, or custom scheduling preferences...',
    'reg.submit': 'Submit Academic Enrollment',
    'reg.submitting': 'Processing Safely...',
    'reg.successTitle': 'Admission Requested!',
    'reg.successDesc': 'Your registration request has been submitted securely. An advisor from the Admissions Office will message you on WhatsApp or email shortly.',
    'reg.close': 'Return to Portal',
    
    // Why Us / About Details
    'whyus.title': 'Why Choose Beacon Keepers',
    'whyus.subtitle': 'Combining traditional scholarly authentication with state-of-the-art interactive teaching',
    'whyus.explore': 'Explore Sanctuary',
    
    // Blog Section
    'blog.badge': 'Academic Journal',
    'blog.title': 'Sacred Insights',
    'blog.subtitle': 'Reflections, educational analyses, and guides published by the Beacon Faculty',
    'blog.search': 'Search journal entries...',
    'blog.subscribe': 'Join the Weekly Newsletter',
    'blog.subscribeBtn': 'Subscribe Now',
    'blog.emailPlaceholder': 'Your email address',
    'blog.categories': 'Scholarly Streams',
    'blog.backToHome': 'Back To Sanctuary',

    // Services Section
    'services.badge': 'Institutional Response',
    'services.title': 'Student Support Sanctuary',
    'services.subtitle': 'Dedicated technical, educational, and scheduling helper lines for families worldwide',
    'services.backToHome': 'Return To Sanctuary',
    
    // General / Miscellaneous
    'footer.description': 'Beacon Quran Institute is a premier global educational sanctuary bridging classical scholarly methods with modern flexible layouts to help students learn and live the Quran beautifully.',
    'footer.quickLinks': 'Sanctuary Navigation',
    'footer.legal': 'Standard Terms',
    'footer.allRights': 'All Rights Reserved.',
    'footer.termsOfService': 'Terms of Service',
    'footer.certificateOfAppraisal': 'Certificate of Appraisal'
  },
  ar: {
    // Navbar
    'nav.home': 'الرئيسية',
    'nav.about': 'من نحن',
    'nav.courses': 'الدورات',
    'nav.services': 'الخدمات',
    'nav.blog': 'المدونة',
    'nav.testimonials': 'الآراء',
    'nav.contact': 'اتصل بنا',
    'nav.startLearning': 'ابدأ التعلم',
    'institute.arabic': 'معهد منارة القرآن',
    'institute.title': 'معهد منارة القرآن الدولي',

    // Hero
    'hero.badge': 'بيت الحكمة • صرح العلوم الإسلامية العريق',
    'hero.title1': 'ادخل إلى نور',
    'hero.title2': 'العرفة والهدى',
    'hero.title3': 'معهد منارة القرآن',
    'hero.subtitle': 'تعليم قرآني وإسلامي عالمي رفيع المستوى',
    'hero.description': 'جسر يربط بين الأصالة العريقة والابتكار الحديث في التدريس والتحفيظ. انضم إلى مجتمع عالمي من الدارسين المجتهدين تحت إشراف نخبة من المعلمين المعتمدين والمشايخ المتقنين.',
    'hero.methodology': 'استكشف الممر',
    'hero.startJourney': 'ابدأ رحلتك المباركة',
    'hero.trustedBy': 'موضع ثقة الطلاب في أكثر من ٣٠ دولة حول العالم',

    // Sections
    'courses.title': 'برامجنا التعليمية النخبوية',
    'courses.subtitle': 'مسارات روحية وتعليمية مصممة خصيصاً للدراسات القرآنية الشاملة والتجويد والعلوم الشرعية',
    'courses.swipeHint': 'انقر أو مرر أو قف بمؤشر الماوس فوق البطاقات لاستكشاف التخصصات الأكاديمية',
    'courses.mobileSwipeHint': 'اسحب لليمين أو اليسار للتنقل بين البرامج',

    // Testimonials
    'testimonials.title': 'أصوات طلابنا من العالم',
    'testimonials.subtitle': 'استمع إلى تجارب طلابنا المخلصين من شتى بقاع الأرض حول رحلتهم التحولية الروحانية والمباركة',
    'testimonials.allReviews': 'عرض جميع التقييمات الأكاديمية والتقارير',
    'testimonials.backHome': 'العودة للمنارة',

    // Registration Form
    'reg.badge': 'بوابة التسجيل والقبول',
    'reg.title': 'ابدأ رحلتك الروحانية والتعليمية معنا',
    'reg.subtitle': 'يرجى ملء استمارة التسجيل أدناه. سيتواصل معك مكتب القبول الأكاديمي خلال ٢٤ ساعة لتحديد موعد اختبار التقييم المجاني وجلسة التوجيه الأولى.',
    'reg.name': 'اسمك الكامل',
    'reg.namePlaceholder': 'أدخل اسمك الكامل والمكتمل',
    'reg.phone': 'رقم الواتساب أو الجوال للتواصل',
    'reg.phonePlaceholder': '+966 50 1234567 (مع رمز الدولة)',
    'reg.email': 'البريد الإلكتروني',
    'reg.emailPlaceholder': 'you@example.com',
    'reg.course': 'اختر البرنامج الدراسي والأكاديمي',
    'reg.courseDefault': '-- اختر البرنامج التعليمي المناسب لك --',
    'reg.plan': 'اختر الخطة الزمنية وقيمة الرسوم',
    'reg.planDefault': '-- اختر الجدول الزمني المناسب لظروفك --',
    'reg.notes': 'تطلعاتك التعليمية أو الخلفية الدينية والقرآنية الحالية',
    'reg.notesPlaceholder': 'أعلمنا بمستوى حفظك الحالي، أو خلفيتك السابقة، أو أي مواعيد تفضلها كجدول دراسي مخصص...',
    'reg.submit': 'إرسال طلب التحاق أكاديمي',
    'reg.submitting': 'جاري المعالجة وإرسال الطلب...',
    'reg.successTitle': 'تم إرسال الطلب بنجاح!',
    'reg.successDesc': 'تم تقديم طلب الالتحاق الأكاديمي الخاص بك بأمان وسرية. سيتواصل معك أحد مستشاري القبول عبر الواتساب أو البريد الإلكتروني قريباً جداً.',
    'reg.close': 'العودة للبوابة الرئيسية',

    // Why Us / About Details
    'whyus.title': 'لماذا يختار الدارسون معهد منارة القرآن؟',
    'whyus.subtitle': 'نجمع بين الأسانيد والتحقق العلمي التقليدي وبين أحدث أساليب التعليم والتقنيات التفاعلية الحديثة',
    'whyus.explore': 'استكشف المعهد ومرافقه',

    // Blog Section
    'blog.badge': 'المجلة الأكاديمية لعلوم الوحي',
    'blog.title': 'إشراقات قرآنية مباركة',
    'blog.subtitle': 'تدبرات، تحليلات تربوية، وإرشادات عملية صادرة ودقيقة بأيدي أعضاء هيئة التدريس بالمعهد',
    'blog.search': 'البحث في المقالات والمجلة الأكاديمية...',
    'blog.subscribe': 'اشترك بالرسالة البريدية الأسبوعية لعلوم القرآن',
    'blog.subscribeBtn': 'اشترك الآن',
    'blog.emailPlaceholder': 'بريدك الإلكتروني للحصول على النشرة',
    'blog.categories': 'فروع الطرح الأكاديمي',
    'blog.backToHome': 'العودة للمنارة',

    // Services Section
    'services.badge': 'الاستجابة والخدمة الطلابية المتكاملة',
    'services.title': 'مظلة دعم ومساندة الطلاب',
    'services.subtitle': 'خطوط دعم تقنية وتعليمية وتنسيقية مخصصة لخدمة الأسر والطلاب حول العالم على مدار اليوم',
    'services.backToHome': 'العودة للمنارة',

    // General / Miscellaneous
    'footer.description': 'معهد منارة القرآن هو صرح تعليمي رائد وعالمي، يسعى للربط بين المنهجية الأكاديمية العريقة والتقنية المرنة لمساعدة الأجيال على تعلم العهد الإلهي والعيش به.',
    'footer.quickLinks': 'أقسام المنارة الرئيسية',
    'footer.legal': 'الشروط والأحكام والسياسات',
    'footer.allRights': 'جميع الحقوق محفوظة ومحمية.',
    'footer.termsOfService': 'شروط الخدمة والاتفاقية',
    'footer.certificateOfAppraisal': 'شهادة التقييم والتقدير الأكاديمي'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const language: Language = 'en';

  const setLanguage = (lang: Language) => {
    // No-op to remove language switching completely
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', 'en');
    }
  }, []);

  const t = (key: string): string => {
    return translations['en']?.[key] || key;
  };

  const isAr = false;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isAr }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
