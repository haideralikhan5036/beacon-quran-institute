import { cloneElement } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Reveal } from './ui/Reveal';
import { 
  ArrowLeft, ArrowRight, Sparkles, Heart, Star, Shield, 
  Users, Globe, Clock, BookOpen, Award, CheckCircle2, 
  Target, Eye, Gem, GraduationCap 
} from 'lucide-react';

export default function AboutPage({ onBack }: { onBack: () => void }) {
  const { isAr } = useLanguage();

  const values = [
    {
      icon: <Heart className="w-8 h-8 text-[#FCD34D]" />,
      titleEn: "Ikhlas (Sincerity)",
      titleAr: "الإخلاص",
      descEn: "Everything we do is purely for the sake of Allah. Our teachings, our methods, and our interactions are all guided by sincerity of intention.",
      descAr: "كل ما نقوم به هو خالصًا لوجه الله تعالى. تعاليمنا وأساليبنا وتفاعلاتنا كلها تسترشد بإخلاص النية."
    },
    {
      icon: <Star className="w-8 h-8 text-[#FCD34D]" />,
      titleEn: "Itqan (Excellence)",
      titleAr: "الإتقان",
      descEn: "We pursue perfection in every recitation, every lesson, and every interaction. Mediocrity has no place in the service of Allah's Book.",
      descAr: "نسعى للكمال في كل تلاوة وكل درس وكل تفاعل. لا مكان للرداءة في خدمة كتاب الله."
    },
    {
      icon: <Users className="w-8 h-8 text-[#FCD34D]" />,
      titleEn: "Rahmah (Compassion)",
      titleAr: "الرحمة",
      descEn: "We teach with mercy and patience, understanding that every student's journey is unique. No student is left behind.",
      descAr: "نعلّم بالرحمة والصبر، مدركين أن رحلة كل طالب فريدة. لا يُترك أي طالب خلف الركب."
    },
    {
      icon: <Shield className="w-8 h-8 text-[#FCD34D]" />,
      titleEn: "Amanah (Trust)",
      titleAr: "الأمانة",
      descEn: "Parents entrust us with their most precious treasure — their children's spiritual growth. We honor this sacred trust with utmost responsibility.",
      descAr: "يأتمننا الآباء على أغلى كنوزهم — النمو الروحي لأبنائهم. نحن نحترم هذه الأمانة المقدسة بأعلى درجات المسؤولية."
    }
  ];

  const stats = [
    { numEn: "10+", numAr: "+١٠", labelEn: "Years of Excellence", labelAr: "سنوات من التميز", icon: <Award /> },
    { numEn: "30+", numAr: "+٣٠", labelEn: "Countries Served", labelAr: "دولة تمت خدمتها", icon: <Globe /> },
    { numEn: "5000+", numAr: "+٥٠٠٠", labelEn: "Students Graduated", labelAr: "طالب تخرج", icon: <GraduationCap /> },
    { numEn: "50+", numAr: "+٥٠", labelEn: "Expert Tutors", labelAr: "معلم خبير", icon: <BookOpen /> },
    { numEn: "99%", numAr: "٩٩٪", labelEn: "Parent Satisfaction", labelAr: "رضا أولياء الأمور", icon: <Heart /> },
    { numEn: "24/7", numAr: "٢٤/٧", labelEn: "Class Availability", labelAr: "دروس متاحة", icon: <Clock /> }
  ];

  const features = [
    { en: "1-on-1 personalized classes", ar: "فصول شخصية واحد لواحد" },
    { en: "Certified Ijazah-holding tutors", ar: "معلمون معتمدون حاصلون على الإجازة" },
    { en: "Flexible 24/7 scheduling", ar: "جدولة مرنة على مدار الساعة" },
    { en: "Safe & secure learning environment", ar: "بيئة تعليمية آمنة وموثوقة" },
    { en: "Multi-lingual instruction (English, Arabic, Urdu)", ar: "تعليم متعدد اللغات (الإنجليزية، العربية، الأردية)" },
    { en: "Monthly detailed progress reports", ar: "تقارير تقدم شهرية مفصلة" }
  ];

  return (
    <div className={`min-h-screen bg-[#030d12] text-white pt-24 pb-20 px-4 md:px-8 ${isAr ? 'rtl font-arabic' : 'ltr'}`} dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[#949693] hover:text-[#FCD34D] transition-colors mb-12 group"
        >
          {isAr ? <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /> : <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />}
          <span>{isAr ? 'العودة للصفحة الرئيسية' : 'Back to Home'}</span>
        </button>

        {/* Hero Section */}
        <Reveal>
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#FCD34D] mb-6 display">
              {isAr ? 'عن معهد منارة القرآن الكريم' : 'About Beacon Quran Institute'}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              {isAr ? 'إرث عريق من التعليم الإلهي منذ عام ٢٠١٥' : 'A Legacy of Divine Education Since 2015'}
            </p>
          </div>
        </Reveal>

        {/* Story & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <Reveal delay={0.1}>
            <div className="bg-[#051b23] border border-[#757454] p-8 rounded-2xl h-full shadow-lg shadow-[#084C63]/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-[#084C63] p-3 rounded-xl">
                  <BookOpen className="w-6 h-6 text-[#FCD34D]" />
                </div>
                <h2 className="text-2xl font-bold text-white display">
                  {isAr ? 'قصتنا' : 'Our Story'}
                </h2>
              </div>
              <p className="text-gray-300 leading-relaxed text-lg">
                {isAr 
                  ? 'تأسس معهد منارة القرآن الكريم عام ٢٠١٥ برسالة إلهية واحدة: جعل التعليم القرآني الأصيل في متناول كل مسلم حول العالم، بغض النظر عن موقعه أو عمره أو جدوله الزمني. ما بدأ كمبادرة صغيرة مع حفنة من الطلاب المتفانين قد ازدهر الآن ليصبح مؤسسة معترفًا بها عالميًا تخدم المتعلمين في أكثر من ٣٠ دولة عبر ٥ قارات.'
                  : 'Beacon Quran Institute was founded in 2015 with a singular divine mission: to make authentic Quranic education accessible to every Muslim around the globe, regardless of their location, age, or schedule. What began as a small initiative with just a handful of dedicated students has now blossomed into a globally recognized institution serving learners in over 30 countries across 5 continents.'}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="bg-[#051b23] border border-[#757454] p-8 rounded-2xl h-full shadow-lg shadow-[#084C63]/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-[#084C63] p-3 rounded-xl">
                  <Target className="w-6 h-6 text-[#FCD34D]" />
                </div>
                <h2 className="text-2xl font-bold text-white display">
                  {isAr ? 'رؤيتنا' : 'Our Vision'}
                </h2>
              </div>
              <p className="text-gray-300 leading-relaxed text-lg">
                {isAr 
                  ? 'أن نصبح المنصة الأكثر ثقة وسهولة في الوصول لتعليم القرآن عبر الإنترنت في العالم، وتنشئة جيل من القراء والحفاظ والعلماء الواثقين الذين يحملون نور القرآن في قلوبهم وحياتهم.'
                  : "To become the world's most trusted and accessible online Quran learning platform, nurturing a generation of confident Quran reciters, memorizers, and scholars who carry the light of the Quran in their hearts and lives."}
              </p>
            </div>
          </Reveal>
        </div>

        {/* Values Section */}
        <div className="mb-24">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#FCD34D] mb-4 display">
                {isAr ? 'قيمنا' : 'Our Values'}
              </h2>
              <div className="w-24 h-1 bg-[#084C63] mx-auto rounded-full"></div>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="bg-[#051b23] border border-[#757454]/50 p-6 rounded-2xl hover:border-[#757454] transition-colors group h-full">
                  <div className="bg-[#084C63]/30 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {val.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {isAr ? val.titleAr : val.titleEn}
                  </h3>
                  <p className="text-[#949693]">
                    {isAr ? val.descAr : val.descEn}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-24 bg-gradient-to-br from-[#084C63] to-[#051b23] p-8 md:p-12 rounded-3xl border border-[#757454]/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Sparkles className="w-64 h-64 text-[#FCD34D]" />
          </div>
          <Reveal>
            <div className="text-center mb-12 relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 display">
                {isAr ? 'أرقامنا وإنجازاتنا' : 'Statistics & Achievements'}
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 relative z-10">
            {stats.map((stat, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="text-center">
                  <div className="flex justify-center text-[#FCD34D] mb-4 opacity-80">
                    {cloneElement(stat.icon as React.ReactElement, { className: 'w-8 h-8' })}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {isAr ? stat.numAr : stat.numEn}
                  </div>
                  <div className="text-[#949693] font-medium">
                    {isAr ? stat.labelAr : stat.labelEn}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* What Makes Us Different */}
        <div className="mb-24">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#FCD34D] mb-4 display">
                {isAr ? 'ما الذي يميزنا' : 'What Makes Us Different'}
              </h2>
              <div className="w-24 h-1 bg-[#084C63] mx-auto rounded-full"></div>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="bg-[#051b23] border border-[#757454]/30 p-4 rounded-xl flex items-center gap-4">
                  <div className="bg-[#084C63] p-2 rounded-full shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-[#FCD34D]" />
                  </div>
                  <span className="text-gray-200">
                    {isAr ? feature.ar : feature.en}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Quote Section */}
        <Reveal>
          <div className="mb-24 text-center">
            <div className="bg-[#051b23] border border-[#FCD34D]/20 p-12 rounded-3xl relative overflow-hidden">
              <Gem className="w-32 h-32 text-[#FCD34D]/5 absolute -top-8 -left-8" />
              <Gem className="w-32 h-32 text-[#FCD34D]/5 absolute -bottom-8 -right-8" />
              
              <blockquote className="text-2xl md:text-3xl text-white font-medium italic leading-relaxed mb-6 relative z-10">
                {isAr 
                  ? '"وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ فَهَلْ مِن مُّدَّكِرٍ"'
                  : '"Indeed, We have made the Quran easy for remembrance, so is there any who will remember?"'}
              </blockquote>
              <div className="text-[#FCD34D] font-bold text-lg relative z-10">
                {isAr ? '— سورة القمر (٥٤:١٧)' : '— Surah Al-Qamar (54:17)'}
              </div>
            </div>
          </div>
        </Reveal>

        {/* CTA Section */}
        <Reveal>
          <div className="text-center border-t border-[#757454]/30 pt-16">
            <h2 className="text-3xl font-bold text-white mb-8 display">
              {isAr ? 'هل أنت مستعد لبدء رحلتك القرآنية؟' : 'Ready to Begin Your Quranic Journey?'}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={onBack} 
                className="bg-[#084C63] hover:bg-[#084C63]/80 text-white font-bold py-4 px-8 rounded-full transition-colors flex items-center justify-center gap-2"
              >
                {isAr ? 'سجل الآن' : 'Register Now'}
                <ArrowRight className={`w-5 h-5 ${isAr ? 'rotate-180' : ''}`} />
              </button>
              <button 
                onClick={onBack}
                className="bg-transparent border border-[#757454] hover:bg-[#051b23] text-white font-bold py-4 px-8 rounded-full transition-colors"
              >
                {isAr ? 'اتصل بنا' : 'Contact Us'}
              </button>
            </div>
          </div>
        </Reveal>

      </div>
    </div>
  );
}
