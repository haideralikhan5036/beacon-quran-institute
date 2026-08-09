import { motion } from 'motion/react';
import { ShieldCheck, Calendar, Clock, RefreshCw, Star, Info, ArrowLeft, User, Sparkles, Phone, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function CustomerServices({ onBack }: { onBack: () => void }) {
  const { isAr } = useLanguage();

  const servicesEn = [
    {
      num: '01',
      title: '3 Days Free Trial',
      desc: 'Try any of our courses for 3 days without any cost. Evaluate our teachers and teaching methodology risk-free.',
      icon: Star,
      tilt: 'rotate-[-1.5deg]'
    },
    {
      num: '02',
      title: '1-on-1 Online Classes',
      desc: 'Personalized individual attention ensures rapid progress. Tutors focus solely on one student during the entire session.',
      icon: User,
      tilt: 'rotate-[1deg]'
    },
    {
      num: '03',
      title: 'Makeup Classes',
      desc: 'If you miss a class with prior notice, we provide complimentary makeup sessions so you never lose your progress.',
      icon: Calendar,
      tilt: 'rotate-[-1deg]'
    },
    {
      num: '04',
      title: '100% Refund Guarantee',
      desc: 'Your satisfaction is our sacred trust. Request a hassle-free refund for remaining unused sessions if not satisfied.',
      icon: RefreshCw,
      tilt: 'rotate-[1.5deg]'
    },
    {
      num: '05',
      title: 'Teacher Assignment Choice',
      desc: 'You have full freedom to request a change of tutor anytime if their style does not align with your preferences.',
      icon: ShieldCheck,
      tilt: 'rotate-[-1deg]'
    },
    {
      num: '06',
      title: '24/7 Flexible Scheduling',
      desc: 'Classes offered around the clock across all timezones. Select a time slot that seamlessly fits your lifestyle.',
      icon: Clock,
      tilt: 'rotate-[1deg]'
    }
  ];

  const servicesAr = [
    {
      num: '01',
      title: 'فترة تجريبية مجانية ٣ أيام',
      desc: 'جرب أياً من مساراتنا الدراسية لمدة ٣ أيام بدون أي تكلفة. قيم مستوى المعلمين وطريقة التدريس قبل الاشتراك.',
      icon: Star,
      tilt: 'rotate-[1.5deg]'
    },
    {
      num: '02',
      title: 'حلقات فردية مباشرة (خاصة)',
      desc: 'تركيز كامل ومتابعة شخصية مستمرة تضمن أسرع تقدم وأعلى دقة للحفظ والتلاوة.',
      icon: User,
      tilt: 'rotate-[-1deg]'
    },
    {
      num: '03',
      title: 'حلقات التعويض التعويضية',
      desc: 'في حال الاعتذار المسبق عن الحصة، نوفر حصص تعويضية مجانية لضمان عدم ضياع أي درس.',
      icon: Calendar,
      tilt: 'rotate-[1deg]'
    },
    {
      num: '04',
      title: 'ضمان استرداد الرسوم',
      desc: 'رضاكم أمانة لدينا. يمكنك طلب استرداد رسوم الحصص المتبقية بكل سلاسة ويسر.',
      icon: RefreshCw,
      tilt: 'rotate-[-1.5deg]'
    },
    {
      num: '05',
      title: 'حرية تغيير المعلم',
      desc: 'نمنحك كامل الحرية لطلب تغيير المعلم أو المعلمة في أي وقت بما يوافق رغبتك ورغبة أبنائك.',
      icon: ShieldCheck,
      tilt: 'rotate-[1deg]'
    },
    {
      num: '06',
      title: 'مرونة الجدولة على مدار ٢٤ ساعة',
      desc: 'دروس ممتدة طوال اليوم لكافة المناطق الزمنية حول العالم اختر الوقت الأنسب لجدولك.',
      icon: Clock,
      tilt: 'rotate-[-1deg]'
    }
  ];

  const services = isAr ? servicesAr : servicesEn;

  return (
    <div className="bg-transparent min-h-screen pt-28 pb-24 text-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button & Header Box */}
        <div className="mb-16">
          <button 
            onClick={onBack}
            className={`group flex items-center gap-3 text-amber-100/85 hover:text-amber-200 mb-8 font-bold uppercase tracking-[0.3em] text-[10px] transition-all cursor-pointer ${isAr ? 'flex-row-reverse mr-0 ml-auto' : ''}`}
          >
            <div className="w-8 h-8 rounded-full border border-[#949693]/40 bg-[#084C63]/30 flex items-center justify-center group-hover:bg-[#084C63] group-hover:border-amber-300 transition-all">
              <ArrowLeft className={`w-3.5 h-3.5 text-amber-200 ${isAr ? 'rotate-180' : ''}`} />
            </div>
            {isAr ? 'العودة للرئيسية' : 'Back to Home'}
          </button>
          
          {/* Dark Glass Header Card */}
          <div className="card-shine border border-[#949693]/35 p-8 sm:p-12 rounded-[3rem] shadow-2xl text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#084C63]/40 border border-[#949693]/40 mb-4">
              <Sparkles className="w-4 h-4 text-amber-200" />
              <h2 className="display text-[10px] font-extrabold uppercase tracking-[0.4em] text-amber-200">
                {isAr ? "الخدمات والتسهيلات الأكاديمية" : "Student Concierge & Support"}
              </h2>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold display text-amber-50 mb-4 text-balance">
              {isAr ? "خدمات مخصصة لراحة الدارسين" : "Dedicated Student Services"}
            </h1>
            <p className="text-amber-100/90 text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
              {isAr 
                ? "في معهد منارة القرآن الكريم، نضمن لك ولأبنائك تجربة تعليمية سلسة، آمنة ومفعمة بالراحة والاهتمام الفائق."
                : "We do not just provide classes. We manage your entire Quranic journey with authentic care and 24/7 dedicated support."}
            </p>
          </div>
        </div>

        {/* 📌 PINNED STICKY NOTE CARDS GRID (Brand Midnight Green Dark Glass Theme) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.num}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ scale: 1.04, rotate: 0, zIndex: 30 }}
                className={`relative card-shine border border-[#949693]/35 backdrop-blur-xl bg-[#051b23]/90 text-amber-50 rounded-[2.5rem] p-8 sm:p-9 shadow-2xl transition-all duration-300 ${service.tilt} ${isAr ? 'text-right' : 'text-left'} group hover:border-amber-300/60`}
              >
                {/* Metallic Red Pushpin Ornament */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none">
                  <div className="w-5 h-5 bg-gradient-to-tr from-rose-600 via-red-500 to-rose-400 rounded-full shadow-lg border-2 border-white/80 relative flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white/70 rounded-full absolute top-0.5 left-1" />
                  </div>
                  <div className="w-1 h-2.5 bg-gradient-to-b from-gray-400 to-gray-600 -mt-0.5 shadow-md" />
                  <div className="w-3 h-1 bg-black/40 blur-[1px] rounded-full -mt-0.5" />
                </div>

                {/* Card Number Badge & Icon */}
                <div className={`flex items-center justify-between mb-6 ${isAr ? 'flex-row-reverse' : ''}`}>
                  <span className="text-3xl font-black display text-amber-300 tracking-wider">
                    {service.num}
                  </span>
                  <div className="w-12 h-12 bg-[#084C63]/50 border border-[#949693]/40 rounded-2xl flex items-center justify-center group-hover:bg-[#084C63] group-hover:border-amber-300 transition-all duration-300">
                    <Icon className="w-6 h-6 text-amber-200 group-hover:text-white transition-colors" />
                  </div>
                </div>

                {/* Service Title */}
                <h3 className="text-2xl font-bold display text-amber-50 mb-3 tracking-tight group-hover:text-amber-200 transition-colors">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="text-amber-100/85 text-sm sm:text-base leading-relaxed font-medium">
                  {service.desc}
                </p>

                {/* Card Footer Line Ornament */}
                <div className={`mt-6 pt-4 border-t border-white/10 flex items-center gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
                  <span className="display text-[8.5px] font-bold uppercase tracking-widest text-amber-300">
                    {isAr ? 'معيار الجودة' : 'Verified Standard'}
                  </span>
                  <div className="h-px flex-grow bg-[#949693]/20"></div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Support CTA Banner */}
        <div className="mt-20">
          <div className="card-shine border border-[#949693]/35 p-10 sm:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden text-amber-50">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#084C63]/30 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className={`relative z-10 grid lg:grid-cols-2 gap-10 items-center ${isAr ? 'text-right' : ''}`}>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold display text-amber-50 mb-4">
                  {isAr ? "هل تحتاج لمساعدة أو استفسار؟" : "Need Instant Support?"}
                </h2>
                <p className="text-amber-100/90 text-base sm:text-lg leading-relaxed font-medium mb-8">
                  {isAr 
                    ? "فريق الدعم الفني والأكاديمي متاح على مدار الساعة لمساعدتك في اختيار الخطة المناسبة وتحديد مواعيد الحصص."
                    : "Our academic support specialists are available 24/7 to assist with class scheduling, course selection, and registration inquiries."}
                </p>
                <div className={`flex flex-wrap gap-4 items-center ${isAr ? 'flex-row-reverse' : ''}`}>
                  <a 
                    href="https://wa.me/923461573771" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-[#084C63] text-white px-8 py-4 rounded-xl font-serif font-bold uppercase tracking-wider text-xs border border-[#949693]/40 shadow-xl hover:bg-[#757454] transition-all flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-amber-200" />
                    {isAr ? "تواصل عبر الواتساب" : "WhatsApp Registrar"}
                  </a>
                  <a 
                    href="mailto:beaconquraninstitute@gmail.com"
                    className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-amber-100 font-bold text-xs tracking-wider uppercase transition-all flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4 text-amber-200" />
                    beaconquraninstitute@gmail.com
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#051b23]/80 p-6 rounded-2xl border border-[#949693]/30 text-center">
                  <span className="block text-amber-300 font-black display text-3xl mb-1">99%</span>
                  <span className="text-amber-100/70 text-[10px] uppercase tracking-widest font-bold">
                    {isAr ? "نسبة الرضا" : "Satisfaction"}
                  </span>
                </div>
                <div className="bg-[#051b23]/80 p-6 rounded-2xl border border-[#949693]/30 text-center">
                  <span className="block text-amber-300 font-black display text-3xl mb-1">24/7</span>
                  <span className="text-amber-100/70 text-[10px] uppercase tracking-widest font-bold">
                    {isAr ? "دعم مستمر" : "Active Support"}
                  </span>
                </div>
                <div className="bg-[#051b23]/80 p-6 rounded-2xl border border-[#949693]/30 text-center">
                  <span className="block text-amber-300 font-black display text-3xl mb-1">30+</span>
                  <span className="text-amber-100/70 text-[10px] uppercase tracking-widest font-bold">
                    {isAr ? "دولة مجازة" : "Countries"}
                  </span>
                </div>
                <div className="bg-[#051b23]/80 p-6 rounded-2xl border border-[#949693]/30 text-center">
                  <span className="block text-amber-300 font-black display text-3xl mb-1">1,400+</span>
                  <span className="text-amber-100/70 text-[10px] uppercase tracking-widest font-bold">
                    {isAr ? "طالب وطالبة" : "Active Students"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
