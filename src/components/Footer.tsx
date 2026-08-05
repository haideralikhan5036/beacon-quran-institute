import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Sparkles } from 'lucide-react';
import { ViewState } from '../App';
import { Reveal } from './ui/Reveal';
import logo from '../assets/images/regenerated_image_1778881551298.jpg';
import { useLanguage } from '../context/LanguageContext';

export default function Footer({ setView }: { setView: (view: ViewState) => void }) {
  const { isAr } = useLanguage();

  const brandDesc = isAr 
    ? "«إن أفضل ما يورثه والد لولده في حياته هو تعليم السُنّة وغرس حب القرآن وصحيح تلاوته في قلبه الصغير»"
    : "\"The most precious gift a parent can give their child is the sound knowledge and love for the Holy Quran.\"";

  const navTitle = isAr ? "التنقل السريع" : "Navigation";
  const navLinks = [
    { name: isAr ? "الرئيسية" : "Institute Home", action: () => setView('home') },
    { name: isAr ? "خدماتنا الأكاديمية" : "Core Services", action: () => setView('services') },
    { name: isAr ? "بوابة التحقق والشهادات" : "Appraisal Portal", action: () => setView('certificate') },
    { name: isAr ? "مدونة الآفاق" : "Insights Blog", action: () => setView('blog') },
    { name: isAr ? "تفاصيل وباقات الرسوم" : "Fee Structure", action: () => setView('home') },
  ];

  const curriculumTitle = isAr ? "المناهج الدراسية" : "Curriculum";
  const curriculumLinks = isAr 
    ? ["القاعدة النورانية", "إتقان أحكام التجويد", "تحفيظ القرآن ومراجعته", "تفسير القرآن الكريم", "تأسيس اللغة العربية", "القراءات المتواترة العشر"]
    : ['Noorani Qaida', 'Tajweed Mastery', 'Quranic Hifz', 'Tafseer-e-Quran', 'Arabic Foundations', 'Advanced Qirat'];

  const registryTitle = isAr ? "مكتب القبول والتسجيل" : "Registry Office";
  const directLineLabel = isAr ? "الهاتف المباشر" : "Direct Line";
  const officialRegistryLabel = isAr ? "البريد الإلكتروني الرسمي" : "Official Registry";
  const globalPresenceLabel = isAr ? "التواجد الجغرافي" : "Global Presence";
  const globalPresenceDesc = isAr ? "نعمل بفعالية ونلبي الدارسين عبر ٤ قارات" : "Active across 4 continents";

  const finePrintText = isAr 
    ? "معهد ريادي مرخص ومصرح للتعليم الرقمي • حماية معلومات مشفرة موافقة لمعايير ISO 27001"
    : "Authorized Educational Institute • ISO 27001 Certified Security";

  const legalItems = isAr 
    ? ['شروط وأحكام الخدمة', 'سياسة الخصوصية وأمن البيانات', 'دليل الأمن والامتثال', 'سياسة استرجاع الرسوم مسبقاً']
    : ['Terms of Service', 'Privacy Policy', 'Security Compliance', 'Refund Policy'];

  const copyrightText = isAr 
    ? "© ٢٠٢٦ معهد منارة القرآن الكريم • جميع الحقوق محفوظة • النسخة العالمية المعتمدة"
    : "© 2026 BEACON QURAN INSTITUTE • GLOBAL EDITION";

  return (
    <footer id="contact" className="bg-black/60 backdrop-blur-sm text-white pt-32 pb-16 relative overflow-hidden border-t border-accent/20">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none grayscale invert" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/arabic-overlay.png")' }}></div>
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent shadow-[0_0_50px_rgba(212,175,55,0.2)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-20 mb-24 ${isAr ? 'text-right' : 'text-left'}`}>
          {/* Brand Column */}
          <div className="space-y-10 lg:col-span-1">
            <Reveal delay={0.1}>
              <div className={`flex items-center gap-5 group cursor-pointer ${isAr ? 'flex-row-reverse' : ''}`} onClick={() => setView('home')}>
                <div className="w-16 h-16 flex items-center justify-center relative rounded-2xl p-0 overflow-hidden group-hover:bg-amber-900/20 transition-all duration-700 transform group-hover:scale-110">
                  <img src={logo} alt="Logo" className="w-full h-full object-contain" loading="lazy" decoding="async" />
                </div>
                <div className={`flex flex-col ${isAr ? 'items-end' : 'items-start'}`}>
                   <h2 className="text-3xl font-bold display leading-none tracking-tight text-amber-50 group-hover:text-amber-500 transition-colors">
                     {isAr ? "مَنارة" : "BEACON"}
                   </h2>
                   <span className="display text-[10px] font-bold uppercase tracking-[0.4em] text-amber-600 mt-1">
                     {isAr ? "معهد القرآن الكريم" : "Quran Institute"}
                   </span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-amber-100/60 leading-relaxed text-base serif italic max-w-xs block">
                {brandDesc}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className={`flex gap-4 ${isAr ? 'justify-end' : ''}`}>
                {[
                  { Icon: Facebook, href: "https://www.facebook.com/share/1DqHmNagMu/" },
                  { Icon: Instagram, href: "https://www.instagram.com/beacon_quran_institute?igsh=bW9sc3B6eWsxZHo5" },
                  { Icon: Linkedin, href: "https://www.linkedin.com/in/beacon-quran-institute-929839406?utm_source=share_via&utm_content=profile&utm_medium=member_android" }
                ].map(({ Icon, href }, i) => (
                  <a 
                    key={i} 
                    href={href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-full border border-amber-900/30 flex items-center justify-center hover:bg-amber-600 hover:border-amber-600 hover:text-amber-950 transition-all group"
                  >
                    <Icon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Practical Links */}
          <div>
            <Reveal delay={0.2} direction="up" distance={20}>
              <h3 className="display text-[11px] font-bold uppercase tracking-[0.4em] mb-10 text-accent">{navTitle}</h3>
            </Reveal>
            <ul className="space-y-5">
              {navLinks.map((link, i) => (
                <Reveal key={link.name} delay={0.3 + i * 0.1} direction="up" distance={10}>
                  <li>
                    <button 
                      onClick={() => { link.action(); window.scrollTo(0, 0); }}
                      className={`text-sm font-medium text-white/50 hover:text-accent transition-all flex items-center gap-3 group cursor-pointer ${isAr ? 'flex-row-reverse w-full' : ''}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent/20 group-hover:bg-accent group-hover:scale-150 transition-all"></span>
                      {link.name}
                    </button>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* Learning Paths */}
          <div>
            <Reveal delay={0.4} direction="up" distance={20}>
              <h3 className="display text-[11px] font-bold uppercase tracking-[0.4em] mb-10 text-accent">{curriculumTitle}</h3>
            </Reveal>
            <ul className="space-y-5">
              {curriculumLinks.map((link, i) => (
                <Reveal key={link} delay={0.5 + i * 0.1} direction="up" distance={10}>
                  <li>
                    <a href="#courses" className={`text-sm font-medium text-white/50 hover:text-accent transition-all flex items-center gap-3 group ${isAr ? 'flex-row-reverse text-right' : ''}`}>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                      {link}
                    </a>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* Direct Access */}
          <div className="space-y-12">
            <Reveal delay={0.6} direction="up" distance={20}>
              <h3 className="display text-[11px] font-bold uppercase tracking-[0.4em] mb-10 text-accent">{registryTitle}</h3>
            </Reveal>
            <ul className="space-y-8">
              <Reveal delay={0.7} direction="up" distance={15}>
                <li className={`flex items-start gap-5 group ${isAr ? 'flex-row-reverse' : ''}`}>
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-accent transition-colors shrink-0">
                    <Phone className="w-4 h-4 text-accent group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <p className="display text-[9px] font-bold uppercase tracking-widest text-accent mb-1">{directLineLabel}</p>
                    <p className="text-sm font-bold text-white/80" dir="ltr">+92 346 1573771</p>
                  </div>
                </li>
              </Reveal>

              <Reveal delay={0.8} direction="up" distance={15}>
                <li className={`flex items-start gap-5 group ${isAr ? 'flex-row-reverse' : ''}`}>
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-accent transition-colors shrink-0">
                    <Mail className="w-4 h-4 text-accent group-hover:text-primary transition-colors" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="display text-[9px] font-bold uppercase tracking-widest text-accent mb-1">{officialRegistryLabel}</p>
                    <p className="text-sm font-bold text-white/80 break-all" dir="ltr">beaconquraninstitute@gmail.com</p>
                  </div>
                </li>
              </Reveal>
              
              <Reveal delay={0.9} direction="up" distance={15}>
                <li className={`flex items-start gap-5 group ${isAr ? 'flex-row-reverse' : ''}`}>
                   <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-accent transition-colors shrink-0">
                    <MapPin className="w-4 h-4 text-accent group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <p className="display text-[9px] font-bold uppercase tracking-widest text-accent mb-1">{globalPresenceLabel}</p>
                    <p className="text-sm font-bold text-white/80">{globalPresenceDesc}</p>
                  </div>
                </li>
              </Reveal>
            </ul>
          </div>
        </div>

        {/* Legal & Fine Print */}
        <div className="pt-12 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-10">
          <Reveal delay={1.0}>
            <div className={`flex items-center gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
              <Sparkles className="w-4 h-4 text-accent animate-pulse" />
              <p className="display text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">
                {finePrintText}
              </p>
            </div>
          </Reveal>
          
          <Reveal delay={1.1}>
            <div className={`flex flex-wrap justify-center gap-8 ${isAr ? 'flex-row-reverse' : ''}`}>
              {legalItems.map(item => (
                <button key={item} className="display text-[9px] font-bold uppercase tracking-widest text-white/30 hover:text-accent transition-colors cursor-pointer">
                  {item}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={1.2}>
            <p className="display text-[9px] font-bold uppercase tracking-[0.3em] text-white/20">
              {copyrightText}
            </p>
          </Reveal>
        </div>
      </div>
    </footer>
  );
}
