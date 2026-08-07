import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Sparkles, ArrowRight, ShieldCheck, Award } from 'lucide-react';
import { ViewState } from '../App';
import { Reveal } from './ui/Reveal';
import logo from '../assets/images/brand_logo.jpg';
import { useLanguage } from '../context/LanguageContext';

export default function Footer({ setView }: { setView: (view: ViewState) => void }) {
  const { isAr } = useLanguage();

  const handleEnrollClick = () => {
    setView('home');
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleFeesClick = () => {
    setView('home');
    setTimeout(() => {
      document.getElementById('fees')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const ctaTitle = isAr 
    ? "هل أنت مستعد لبدء رحلتك القرآنية الشريفة؟" 
    : "Ready to Begin Your Sacred Quranic Journey?";

  const ctaDesc = isAr 
    ? "«خَيرُكُم مَن تَعَلَّمَ القُرآنَ وعَلَّمَهُ» — انضم اليوم لحلقات التحفيظ والتلاوة الفردية المباشرة مع نخبة المعلمين المجازين." 
    : "\"The best of you is the one who learns the Quran and teaches it.\" — Join 1-on-1 personalized live classes with certified Ijazah tutors today.";

  const ctaPrimaryBtn = isAr ? "احجز حصتك التجريبية مجاناً" : "Start Free Trial Session";
  const ctaSecondaryBtn = isAr ? "استكشف باقات الرسوم" : "Explore Fee Plans";

  const brandDesc = isAr 
    ? "صرح قرآني عالمي يجمع بين أصالة المنهج التربوي والتحفيظ بالسند المتصل، وبين مرونة التعليم الرقمي الحديث ليضيء القلوب بنور كتاب الله."
    : "Beacon Quran Institute is a premier global educational sanctuary bridging classical scholarly methods with modern flexible learning to help students live the Quran beautifully.";

  const navTitle = isAr ? "التنقل السريع" : "Quick Navigation";
  const navLinks = [
    { name: isAr ? "الرئيسية" : "Institute Home", action: () => setView('home') },
    { name: isAr ? "خدماتنا الأكاديمية" : "Core Services", action: () => setView('services') },
    { name: isAr ? "بوابة التحقق والشهادات" : "Appraisal Portal", action: () => setView('certificate') },
    { name: isAr ? "مدونة الآفاق" : "Insights Blog", action: () => setView('blog') },
    { name: isAr ? "تفاصيل وباقات الرسوم" : "Fee Structure", action: () => handleFeesClick() },
  ];

  const curriculumTitle = isAr ? "المناهج الدراسية" : "Curriculum Tracks";
  const curriculumLinks = isAr 
    ? ["القاعدة النورانية للمبتدئين", "إتقان أحكام التجويد", "تحفيظ القرآن الكريم بالسند", "تفسير آيات القرآن الكريم", "تأسيس اللغة العربية الفصحى", "دراسة القراءات المتواترة"]
    : ['Noorani Qaida for Beginners', 'Tajweed Mastery Science', 'Quranic Hifz & Memorization', 'Tafseer-e-Quran Insights', 'Arabic Language Foundations', 'Ten Recitation Qira\'at'];

  const registryTitle = isAr ? "مكتب القبول والتسجيل" : "Registry & Support";
  const directLineLabel = isAr ? "الهاتف المباشر / واتساب" : "Direct Line & WhatsApp";
  const officialRegistryLabel = isAr ? "البريد الإلكتروني الرسمي" : "Official Registry Email";
  const globalPresenceLabel = isAr ? "التواجد الجغرافي" : "Global Reach";
  const globalPresenceDesc = isAr ? "نخدم الطلاب بفاعلية عبر ٤ قارات حول العالم" : "Active students across 30+ nations";

  const finePrintText = isAr 
    ? "معهد ريادي مرخص ومصرح للتعليم الرقمي • حماية معلومات مشفرة موافقة لمعايير ISO 27001"
    : "Authorized Quranic Institute • ISO 27001 Certified Data Security";

  const legalItems = [
    { name: isAr ? "شروط وأحكام الخدمة" : "Terms of Service", action: () => setView('terms') },
    { name: isAr ? "سياسة الخصوصية وأمن البيانات" : "Privacy Policy", action: () => setView('terms') },
    { name: isAr ? "دليل الامتثال والجودة" : "Security & Quality", action: () => setView('terms') },
    { name: isAr ? "سياسة الضمان والاسترجاع" : "Refund Guarantee", action: () => setView('terms') }
  ];

  const copyrightText = isAr 
    ? "© ٢٠٢٦ معهد منارة القرآن الكريم • جميع الحقوق محفوظة • النسخة العالمية المعتمدة"
    : "© 2026 BEACON QURAN INSTITUTE • ALL RIGHTS RESERVED • GLOBAL EDITION";

  return (
    <footer id="contact" className="bg-[#030d12] text-white pt-20 pb-12 relative overflow-hidden border-t border-[#757454]/30">
      {/* Background Texture & Ambient Glows */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none grayscale invert" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/arabic-overlay.png")' }}></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-[300px] bg-gradient-to-b from-[#084C63]/30 via-transparent to-transparent blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ═══════════════════════════════════════════════════════════════════════
            1. PRE-FOOTER CTA HERO BANNER — High Conversion Action Box
           ═══════════════════════════════════════════════════════════════════════ */}
        <Reveal delay={0.1}>
          <div className="mb-20 card-shine border border-[#757454]/50 rounded-[3rem] p-8 sm:p-14 relative overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.8)]">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#757454]/15 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#084C63]/30 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />
            
            <div className={`grid lg:grid-cols-[1.3fr,1fr] gap-8 items-center relative z-10 ${isAr ? 'text-right' : 'text-left'}`}>
              <div>
                <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#757454]/20 border border-[#757454]/50 mb-6 ${isAr ? 'flex-row-reverse' : ''}`}>
                  <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" />
                  <span className="display text-[10px] font-extrabold uppercase tracking-[0.25em] text-amber-200">
                    {isAr ? "الانضمام للمعهد" : "Begin Your Path Today"}
                  </span>
                </div>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold display text-white leading-tight mb-4 drop-shadow-md">
                  {ctaTitle}
                </h3>
                <p className="text-amber-100/90 text-base sm:text-lg leading-relaxed serif italic max-w-2xl">
                  {ctaDesc}
                </p>
              </div>

              <div className={`flex flex-col sm:flex-row gap-4 lg:justify-end ${isAr ? 'sm:flex-row-reverse' : ''}`}>
                <button
                  onClick={handleEnrollClick}
                  className="group relative overflow-hidden bg-[#757454] hover:bg-[#084C63] text-white px-8 py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] transition-all shadow-2xl flex items-center justify-center gap-3 border border-[#949693]/40 cursor-pointer"
                >
                  <span className="relative z-10">{ctaPrimaryBtn}</span>
                  <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10 ${isAr ? 'rotate-180' : ''}`} />
                </button>
                <button
                  onClick={handleFeesClick}
                  className="group bg-[#051b23]/80 hover:bg-[#084C63] text-amber-100 px-8 py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] transition-all border border-[#757454]/40 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>{ctaSecondaryBtn}</span>
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ═══════════════════════════════════════════════════════════════════════
            2. MAIN ARCHITECTURAL FOOTER COLUMNS
           ═══════════════════════════════════════════════════════════════════════ */}
        <div className={`grid md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/10 ${isAr ? 'text-right' : 'text-left'}`}>
          
          {/* Brand & Identity Column */}
          <div className="lg:col-span-4 space-y-6">
            <Reveal delay={0.1}>
              <div 
                className={`flex items-center gap-4 group cursor-pointer ${isAr ? 'flex-row-reverse' : ''}`} 
                onClick={() => setView('home')}
              >
                <div className="w-16 h-16 rounded-2xl p-1 bg-[#051b23] border border-[#757454]/50 shadow-xl group-hover:border-amber-400 transition-all duration-500 overflow-hidden shrink-0">
                  <img src={logo} alt="Logo" className="w-full h-full object-contain" loading="lazy" decoding="async" />
                </div>
                <div className={`flex flex-col ${isAr ? 'items-end' : 'items-start'}`}>
                   <h2 className="text-2xl sm:text-3xl font-bold display leading-none tracking-tight text-white group-hover:text-amber-300 transition-colors">
                     {isAr ? "مَنارة" : "BEACON"}
                   </h2>
                   <span className="display text-[10px] font-extrabold uppercase tracking-[0.35em] text-amber-200 mt-1">
                     {isAr ? "معهد القرآن الكريم" : "Quran Institute"}
                   </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-amber-100/90 leading-relaxed text-sm sm:text-base font-normal">
                {brandDesc}
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className={`flex items-center gap-3 pt-2 ${isAr ? 'justify-end' : 'justify-start'}`}>
                {[
                  { Icon: Facebook, href: "https://www.facebook.com/share/1DqHmNagMu/", name: "Facebook" },
                  { Icon: Instagram, href: "https://www.instagram.com/beacon_quran_institute?igsh=bW9sc3B6eWsxZHo5", name: "Instagram" },
                  { Icon: Linkedin, href: "https://www.linkedin.com/in/beacon-quran-institute-929839406?utm_source=share_via&utm_content=profile&utm_medium=member_android", name: "LinkedIn" }
                ].map(({ Icon, href, name }) => (
                  <a 
                    key={name} 
                    href={href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    title={name}
                    className="w-11 h-11 rounded-xl bg-[#051b23] border border-[#757454]/40 flex items-center justify-center text-amber-200 hover:bg-[#757454] hover:text-white hover:border-amber-300 transition-all duration-300 shadow-md group"
                  >
                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Quick Navigation Column */}
          <div className="lg:col-span-2 space-y-6">
            <Reveal delay={0.2} direction="up" distance={20}>
              <h3 className="display text-[11px] font-extrabold uppercase tracking-[0.35em] text-amber-200 border-b border-[#757454]/30 pb-3">{navTitle}</h3>
            </Reveal>
            <ul className="space-y-4">
              {navLinks.map((link, i) => (
                <Reveal key={link.name} delay={0.3 + i * 0.08} direction="up" distance={10}>
                  <li>
                    <button 
                      onClick={() => { link.action(); window.scrollTo(0, 0); }}
                      className={`text-sm font-medium text-white/90 hover:text-amber-200 transition-all flex items-center gap-2.5 group cursor-pointer ${isAr ? 'flex-row-reverse w-full' : ''}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#757454] group-hover:bg-amber-200 group-hover:scale-150 transition-all"></span>
                      {link.name}
                    </button>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* Curriculum Tracks Column */}
          <div className="lg:col-span-3 space-y-6">
            <Reveal delay={0.4} direction="up" distance={20}>
              <h3 className="display text-[11px] font-extrabold uppercase tracking-[0.35em] text-amber-200 border-b border-[#757454]/30 pb-3">{curriculumTitle}</h3>
            </Reveal>
            <ul className="space-y-3.5">
              {curriculumLinks.map((link, i) => (
                <Reveal key={link} delay={0.5 + i * 0.08} direction="up" distance={10}>
                  <li>
                    <a href="#courses" className={`text-sm font-medium text-white/90 hover:text-amber-200 transition-all flex items-center gap-2.5 group ${isAr ? 'flex-row-reverse text-right' : ''}`}>
                      <span className="text-amber-200/60 group-hover:text-amber-200 text-xs transition-colors">→</span>
                      {link}
                    </a>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* Direct Registry & Support Column */}
          <div className="lg:col-span-3 space-y-6">
            <Reveal delay={0.6} direction="up" distance={20}>
              <h3 className="display text-[11px] font-extrabold uppercase tracking-[0.35em] text-amber-200 border-b border-[#757454]/30 pb-3">{registryTitle}</h3>
            </Reveal>
            
            <div className="space-y-4">
              <Reveal delay={0.7} direction="up" distance={15}>
                <div className={`p-4 rounded-2xl bg-[#051b23]/90 border border-[#757454]/30 flex items-center gap-4 ${isAr ? 'flex-row-reverse text-right' : ''}`}>
                  <div className="w-10 h-10 rounded-xl bg-[#757454]/20 border border-[#757454]/40 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-amber-200" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="display text-[8.5px] font-extrabold uppercase tracking-widest text-amber-200">{directLineLabel}</p>
                    <p className="text-sm font-bold text-white tracking-wide" dir="ltr">+92 346 1573771</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.8} direction="up" distance={15}>
                <div className={`p-4 rounded-2xl bg-[#051b23]/90 border border-[#757454]/30 flex items-center gap-4 ${isAr ? 'flex-row-reverse text-right' : ''}`}>
                  <div className="w-10 h-10 rounded-xl bg-[#757454]/20 border border-[#757454]/40 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-amber-200" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="display text-[8.5px] font-extrabold uppercase tracking-widest text-amber-200">{officialRegistryLabel}</p>
                    <p className="text-xs sm:text-sm font-bold text-white break-all" dir="ltr">beaconquraninstitute@gmail.com</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.9} direction="up" distance={15}>
                <div className={`p-4 rounded-2xl bg-[#051b23]/90 border border-[#757454]/30 flex items-center gap-4 ${isAr ? 'flex-row-reverse text-right' : ''}`}>
                  <div className="w-10 h-10 rounded-xl bg-[#757454]/20 border border-[#757454]/40 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-amber-200" />
                  </div>
                  <div>
                    <p className="display text-[8.5px] font-extrabold uppercase tracking-widest text-amber-200">{globalPresenceLabel}</p>
                    <p className="text-xs sm:text-sm font-bold text-white">{globalPresenceDesc}</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════════
            3. DUAL-TIER BOTTOM SECURITY & LEGAL BAR
           ═══════════════════════════════════════════════════════════════════════ */}
        <div className="pt-10 flex flex-col lg:flex-row justify-between items-center gap-6">
          <Reveal delay={1.0}>
            <div className={`flex items-center gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
              <ShieldCheck className="w-4 h-4 text-amber-200 shrink-0" />
              <p className="display text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">
                {finePrintText}
              </p>
            </div>
          </Reveal>
          
          <Reveal delay={1.1}>
            <div className={`flex flex-wrap justify-center gap-6 ${isAr ? 'flex-row-reverse' : ''}`}>
              {legalItems.map(item => (
                <button 
                  key={item.name} 
                  onClick={item.action}
                  className="display text-[9.5px] font-bold uppercase tracking-widest text-white/80 hover:text-amber-200 transition-colors cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={1.2}>
            <p className="display text-[9.5px] font-bold uppercase tracking-[0.25em] text-white/70">
              {copyrightText}
            </p>
          </Reveal>
        </div>

      </div>
    </footer>
  );
}
