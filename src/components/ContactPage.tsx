import { motion } from 'motion/react';
import { 
  MessageCircle, Mail, Facebook, Instagram, Linkedin, 
  ArrowLeft, ArrowRight, Sparkles, Clock, Globe, ShieldCheck, MapPin, Phone
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ContactPage({ onBack, onRegisterClick }: { onBack: () => void; onRegisterClick?: () => void }) {
  const { isAr } = useLanguage();

  const contactChannelsEn = [
    {
      id: 'whatsapp',
      title: 'WhatsApp Official Chat',
      subtitle: 'Instant response from our Student Registrar',
      displayValue: '+92 346 1573771',
      actionText: 'Chat on WhatsApp',
      link: 'https://wa.me/923461573771',
      icon: MessageCircle,
      badgeColor: 'bg-[#084C63]/50 text-amber-300 border-[#949693]/40',
      btnColor: 'bg-[#084C63] hover:bg-[#757454] text-white border border-amber-300/40',
      highlight: 'Available 24/7 for instant admission & fee inquiries'
    },
    {
      id: 'email',
      title: 'Official Email Inquiries',
      subtitle: 'Send formal inquiries, certificates & documents',
      displayValue: 'beaconquraninstitute@gmail.com',
      actionText: 'Send Email',
      link: 'mailto:beaconquraninstitute@gmail.com',
      icon: Mail,
      badgeColor: 'bg-[#084C63]/50 text-amber-300 border-[#949693]/40',
      btnColor: 'bg-[#084C63] hover:bg-[#757454] text-white border border-amber-300/40',
      highlight: 'Response time guaranteed within 1 hour'
    },
    {
      id: 'facebook',
      title: 'Facebook Official Page',
      subtitle: 'Join our global community & live announcements',
      displayValue: 'Beacon Quran Institute',
      actionText: 'Visit Facebook Page',
      link: 'https://facebook.com/beaconquraninstitute',
      icon: Facebook,
      badgeColor: 'bg-[#084C63]/50 text-amber-300 border-[#949693]/40',
      btnColor: 'bg-[#084C63] hover:bg-[#757454] text-white border border-amber-300/40',
      highlight: 'Daily Quranic benefits, videos & student milestones'
    },
    {
      id: 'instagram',
      title: 'Instagram Visual Highlights',
      subtitle: 'Student achievements, recitations & daily quotes',
      displayValue: '@beaconquraninstitute',
      actionText: 'Follow on Instagram',
      link: 'https://instagram.com/beaconquraninstitute',
      icon: Instagram,
      badgeColor: 'bg-[#084C63]/50 text-amber-300 border-[#949693]/40',
      btnColor: 'bg-[#084C63] hover:bg-[#757454] text-white border border-amber-300/40',
      highlight: 'Beautiful Quranic reels, Tajweed tips & updates'
    },
    {
      id: 'linkedin',
      title: 'LinkedIn Professional Network',
      subtitle: 'Academic credentials, faculty & institutional updates',
      displayValue: 'Beacon Quran Institute',
      actionText: 'Connect on LinkedIn',
      link: 'https://linkedin.com/company/beaconquraninstitute',
      icon: Linkedin,
      badgeColor: 'bg-[#084C63]/50 text-amber-300 border-[#949693]/40',
      btnColor: 'bg-[#084C63] hover:bg-[#757454] text-white border border-amber-300/40',
      highlight: 'Institutional news, faculty network & pedagogical research'
    }
  ];

  const contactChannelsAr = [
    {
      id: 'whatsapp',
      title: 'المكتب الرسمي عبر الواتساب',
      subtitle: 'استجابة فورية ومباشرة من مسجل القبول والتسجيل',
      displayValue: '+92 346 1573771',
      actionText: 'محادثة الواتساب الفورية',
      link: 'https://wa.me/923461573771',
      icon: MessageCircle,
      badgeColor: 'bg-[#084C63]/50 text-amber-300 border-[#949693]/40',
      btnColor: 'bg-[#084C63] hover:bg-[#757454] text-white border border-amber-300/40',
      highlight: 'متاح على مدار ٢٤ ساعة لجميع الاستفسارات والرسوم'
    },
    {
      id: 'email',
      title: 'البريد الإلكتروني الرسمي',
      subtitle: 'للمراسلات الأكاديمية والشهادات والوثائق',
      displayValue: 'beaconquraninstitute@gmail.com',
      actionText: 'إرسال بريد إلكتروني',
      link: 'mailto:beaconquraninstitute@gmail.com',
      icon: Mail,
      badgeColor: 'bg-[#084C63]/50 text-amber-300 border-[#949693]/40',
      btnColor: 'bg-[#084C63] hover:bg-[#757454] text-white border border-amber-300/40',
      highlight: 'استجابة مضمونة خلال أقل من ساعة واحدة'
    },
    {
      id: 'facebook',
      title: 'الصفحة الرسمية على فيسبوك',
      subtitle: 'انضم لمجتمعنا العالمي ومتابعة الفعاليات الحية',
      displayValue: 'Beacon Quran Institute',
      actionText: 'زيارة صفحة فيسبوك',
      link: 'https://facebook.com/beaconquraninstitute',
      icon: Facebook,
      badgeColor: 'bg-[#084C63]/50 text-amber-300 border-[#949693]/40',
      btnColor: 'bg-[#084C63] hover:bg-[#757454] text-white border border-amber-300/40',
      highlight: 'فوائد قرآنية يومية وفيديوهات ومحطات إنجاز الطلاب'
    },
    {
      id: 'instagram',
      title: 'حساب انستغرام الرسمي',
      subtitle: 'إنجازات الطلاب وتلاواتهم واقتباسات قرآنية',
      displayValue: '@beaconquraninstitute',
      actionText: 'متابعة على انستغرام',
      link: 'https://instagram.com/beaconquraninstitute',
      icon: Instagram,
      badgeColor: 'bg-[#084C63]/50 text-amber-300 border-[#949693]/40',
      btnColor: 'bg-[#084C63] hover:bg-[#757454] text-white border border-amber-300/40',
      highlight: 'مقاطع تلاوة خاشعة ونصائح تجويدية متميزة'
    },
    {
      id: 'linkedin',
      title: 'شبكة لينكد إن المهنية',
      subtitle: 'الاعتمادات الأكاديمية ونشاط الكادر التعليمي',
      displayValue: 'Beacon Quran Institute',
      actionText: 'التواصل عبر لينكد إن',
      link: 'https://linkedin.com/company/beaconquraninstitute',
      icon: Linkedin,
      badgeColor: 'bg-[#084C63]/50 text-amber-300 border-[#949693]/40',
      btnColor: 'bg-[#084C63] hover:bg-[#757454] text-white border border-amber-300/40',
      highlight: 'الأخبار المؤسسية وأبحاث المناهج والتعليم القرآني'
    }
  ];

  const channels = isAr ? contactChannelsAr : contactChannelsEn;

  return (
    <div className="bg-transparent min-h-screen pt-28 pb-24 text-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button Navigation */}
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

        {/* Header Title Card Box */}
        <div className="card-shine border border-[#949693]/35 p-8 sm:p-12 rounded-[3rem] shadow-2xl text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#084C63]/40 border border-[#949693]/40 mb-4">
            <Sparkles className="w-4 h-4 text-amber-200" />
            <h2 className="display text-[10px] font-extrabold uppercase tracking-[0.4em] text-amber-200">
              {isAr ? "قنوات التواصل والمكتب الأكاديمي" : "Official Contact & Support Channels"}
            </h2>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold display text-amber-50 mb-4 text-balance">
            {isAr ? "تواصل مباشر على مدار 24 ساعة" : "Get in Touch With Us"}
          </h1>
          <p className="text-amber-100/90 text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            {isAr 
              ? "نحن هنا لخدمتك وإجابة كافة استفساراتك عبر جميع وسائل التواصل الرسمية الفورية."
              : "We are always available to serve you. Reach out through your preferred official channel for instant support & registration."}
          </p>
        </div>

        {/* 5 Premium Contact Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pt-2">
          {channels.map((channel, index) => {
            const IconComponent = channel.icon;
            return (
              <motion.div
                key={channel.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ scale: 1.04, y: -4, zIndex: 30 }}
                className={`card-shine border border-[#949693]/35 bg-[#051b23]/90 text-amber-50 rounded-[2.5rem] p-8 sm:p-9 shadow-2xl flex flex-col justify-between transition-all duration-300 ${isAr ? 'text-right' : 'text-left'} group hover:border-amber-300/60`}
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className={`flex items-center justify-between mb-6 ${isAr ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-lg ${channel.badgeColor}`}>
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <span className="display text-[9px] font-extrabold uppercase tracking-widest text-amber-300 bg-[#084C63]/50 px-3 py-1 rounded-full border border-[#949693]/30">
                      {isAr ? 'قناة رسمية' : 'Official'}
                    </span>
                  </div>

                  {/* Channel Title & Subtitle */}
                  <h3 className="text-2xl font-bold display text-amber-50 mb-2 tracking-tight group-hover:text-amber-200 transition-colors">
                    {channel.title}
                  </h3>
                  <p className="text-amber-100/75 text-xs sm:text-sm font-medium mb-4 leading-relaxed">
                    {channel.subtitle}
                  </p>

                  {/* Handle / Address */}
                  <div className="bg-[#084C63]/30 border border-[#949693]/30 p-3.5 rounded-xl mb-4 text-amber-200 font-mono font-bold text-xs sm:text-sm break-all">
                    {channel.displayValue}
                  </div>

                  {/* Highlight note */}
                  <p className="text-[11px] text-amber-100/60 italic font-medium leading-tight mb-6">
                    ⚡ {channel.highlight}
                  </p>
                </div>

                {/* Direct Action Backlink Button */}
                <a
                  href={channel.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-4 px-6 rounded-xl font-bold uppercase tracking-wider text-xs border border-white/20 transition-all shadow-xl flex items-center justify-center gap-2 group/btn cursor-pointer ${channel.btnColor}`}
                >
                  <span>{channel.actionText}</span>
                  <ArrowRight className={`w-4 h-4 group-hover/btn:translate-x-1 transition-transform ${isAr ? 'rotate-180' : ''}`} />
                </a>
              </motion.div>
            );
          })}

          {/* 6th Card: Direct Admissions Office Badge */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`card-shine border border-[#949693]/35 bg-[#051b23]/90 text-amber-50 rounded-[2.5rem] p-8 sm:p-9 shadow-2xl flex flex-col justify-between ${isAr ? 'text-right' : 'text-left'}`}
          >
            <div>
              <div className={`flex items-center justify-between mb-6 ${isAr ? 'flex-row-reverse' : ''}`}>
                <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center shadow-lg">
                  <Clock className="w-7 h-7" />
                </div>
                <span className="display text-[9px] font-extrabold uppercase tracking-widest text-amber-300 bg-[#084C63]/50 px-3 py-1 rounded-full border border-[#949693]/30">
                  {isAr ? 'ساعات العمل' : 'Global Hours'}
                </span>
              </div>

              <h3 className="text-2xl font-bold display text-amber-50 mb-2 tracking-tight">
                {isAr ? "مكتب القبول الدولي" : "Admissions & Support Hours"}
              </h3>
              <p className="text-amber-100/75 text-xs sm:text-sm font-medium mb-4 leading-relaxed">
                {isAr ? "نخدم الطلاب والطالبات عبر كافة المناطق الزمنية العالمية 24/7" : "Serving students across USA, UK, Europe, Gulf & Asia around the clock."}
              </p>

              <div className="space-y-2 mb-6 text-xs text-amber-100/90 font-medium">
                <div className={`flex items-center gap-2 ${isAr ? 'flex-row-reverse' : ''}`}>
                  <ShieldCheck className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>{isAr ? "دعم فني وأكاديمي متواصل 24/7" : "24/7 Continuous Academic Support"}</span>
                </div>
                <div className={`flex items-center gap-2 ${isAr ? 'flex-row-reverse' : ''}`}>
                  <Globe className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>{isAr ? "مدرسون ناطقون بالعربية والإنجليزية والأوردية" : "Arabic, English & Urdu Speaking Faculty"}</span>
                </div>
              </div>
            </div>

            <button
              onClick={onRegisterClick}
              className="w-full py-4 px-6 rounded-xl bg-[#084C63] hover:bg-[#757454] text-white font-bold uppercase tracking-wider text-xs border border-amber-300/60 transition-all shadow-xl flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>{isAr ? "الانتقال لنموذج التسجيل" : "Go to Registration Form"}</span>
              <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isAr ? 'rotate-180' : ''}`} />
            </button>
          </motion.div>
        </div>

        {/* Interactive Direct Message Banner */}
        <div className="mt-20">
          <div className="card-shine border border-[#949693]/35 p-10 sm:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden text-amber-50 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold display text-amber-50 mb-3">
              {isAr ? "جاهز لبدء تجربة مجانية لمدة ٣ أيام؟" : "Ready for a 3-Day Free Trial Session?"}
            </h2>
            <p className="text-amber-100/90 text-sm sm:text-base font-medium max-w-xl mx-auto mb-8 leading-relaxed">
              {isAr 
                ? "اختر المسار المناسب لك ولأبنائك وسجل في دقيقة واحدة للحصول على تجربة مجانية بدون أي التزام مالي."
                : "Select your preferred course and register in under a minute for a risk-free 3-day trial session with certified tutors."}
            </p>
            <button
              onClick={onRegisterClick}
              className="px-10 py-5 rounded-full bg-[#084C63] text-white font-bold uppercase tracking-[0.2em] text-xs border border-amber-300/80 hover:bg-[#757454] transition-all shadow-2xl inline-flex items-center gap-3 cursor-pointer"
            >
              <span>{isAr ? "سجل في التجربة المجانية الآن" : "Register for Free 3-Day Trial"}</span>
              <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
