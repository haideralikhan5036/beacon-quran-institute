import type { CSSProperties } from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { ViewState } from '../App';
import { Reveal } from './ui/Reveal';
import logo from '../assets/images/brand_logo.jpg';
import { scrollToId } from '../utils/scrollToId';
import { COURSES } from '../data/courses';

// Geometric grid texture, mockup values: gold-tinted lines, 44px grid —
// visible on the dark teal, but still subtle.
const GRID_TEXTURE: CSSProperties = {
  backgroundImage:
    'linear-gradient(rgba(168,168,132,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(168,168,132,0.07) 1px, transparent 1px)',
  backgroundSize: '44px 44px',
};

const FIVE_COURSES = [
  'Noorani Qaida',
  'Recitation & Tajweed',
  'Hifz Program',
  'Tafseer-ul-Quran',
  'Islamic Studies',
];

export default function Footer({ setView }: { setView: (view: ViewState) => void }) {
  const handleEnrollClick = () => {
    setView('enrol');
  };

  const handleFeesClick = () => {
    setView('home');
    scrollToId('fees');
  };

  const ctaTitle = 'Ready to Begin Your Sacred Quranic Journey?';
  const ctaDesc = '"The best of you is the one who learns the Quran and teaches it." — Join 1-on-1 personalized live classes with certified Ijazah tutors today.';
  const ctaPrimaryBtn = 'Start Free Trial Session';
  const ctaSecondaryBtn = 'Explore Fees';

  const brandDesc = 'Beacon Quran Institute is an online Quran academy offering live one-on-one Quran classes for kids and adults in the USA, UK and Canada — bridging classical scholarly methods with modern flexible learning to help students live the Quran beautifully.';

  // Footer links are real <a href> links (Batch 12): the delegated
  // handler in App.tsx routes them client-side, crawlers and no-JS
  // visitors follow the href to the prerendered page. 'Fee Structure'
  // has no page of its own — it scrolls to the fee table on the homepage.
  const navLinks: { name: string; href?: string; action?: () => void }[] = [
    { name: 'Institute Home', href: '/' },
    { name: 'Core Services', href: '/services' },
    { name: 'Appraisal Portal', href: '/certificate' },
    { name: 'Insights Blog', href: '/blog' },
    { name: 'Fee Structure', action: () => handleFeesClick() },
    { name: 'Online Quran Classes in the USA', href: '/usa' },
    { name: 'Online Quran Classes UK', href: '/uk' },
    { name: 'Online Quran Classes in Canada', href: '/canada' },
  ];

  const globalPresenceDesc = 'Online Quran classes for students across 30+ nations, including the USA, UK & Canada';

  const legalItems = [
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Privacy Policy', href: '/terms' },
    { name: 'Security & Quality', href: '/terms' },
    { name: 'Refund Guarantee', href: '/terms' },
  ];

  return (
    <>
      {/* ── Pre-footer CTA — standalone deep-teal band on white (mockup) ─── */}
      <section className="bg-[#FFFFFF] pt-14 sm:pt-16 pb-14 sm:pb-16 relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <Reveal delay={0.1}>
            <div className="bg-[#004050] rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-[0_20px_50px_rgba(0,64,80,0.25)]">
              <div className="absolute inset-0 pointer-events-none opacity-40" style={GRID_TEXTURE} />
              {/* Halftone dots, mockup CTA-band placement: white, bottom-left */}
              <div
                aria-hidden="true"
                className="dots-texture-white pointer-events-none absolute left-[-8px] bottom-[-8px] w-[170px] h-[100px] opacity-50"
              />
              <div className="grid lg:grid-cols-[1.3fr,1fr] gap-8 items-center relative z-10">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6">
                    <Sparkles className="w-4 h-4 text-white" />
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-white">
                      Begin Your Path Today
                    </span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white leading-tight mb-4">
                    {ctaTitle}
                  </h3>
                  <p className="text-white/85 text-base sm:text-lg leading-relaxed italic max-w-2xl">
                    {ctaDesc}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
                  <button
                    onClick={handleEnrollClick}
                    className="group bg-[#7A7A50] hover:bg-[#6b6b45] text-white px-8 py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] transition-all shadow-xl flex items-center justify-center gap-3 cursor-pointer"
                  >
                    <span>{ctaPrimaryBtn}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={handleFeesClick}
                    className="bg-transparent hover:bg-white/10 text-white px-8 py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] transition-all border border-white/40 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <span>{ctaSecondaryBtn}</span>
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="bg-[#004050] text-white pt-14 sm:pt-16 pb-10 relative overflow-hidden">
        {/* Geometric grid texture */}
        <div className="absolute inset-0 pointer-events-none" style={GRID_TEXTURE} />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#004050]/40 via-transparent to-[#003040]/60" />
        {/* Halftone dots, mockup footer placement: white, top-right */}
        <div
          aria-hidden="true"
          className="dots-texture-white pointer-events-none absolute right-[4%] top-[22px] w-[170px] h-[100px] opacity-45"
        />

        <div className="max-w-[1280px] mx-auto px-6 relative z-10">

        {/* ── 2. Main footer columns ─────────────────────────────────── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-14 pb-14 border-b border-white/15">
          {/* Brand & Identity Column */}
          <div className="lg:col-span-4 space-y-6">
            <Reveal delay={0.1}>
              <div className="flex items-center gap-4 group cursor-pointer" onClick={() => setView('home')}>
                <div className="w-16 h-16 rounded-2xl p-1 bg-white border border-white/30 shadow-xl overflow-hidden shrink-0">
                  <img src={logo} alt="Beacon Quran Institute logo" className="w-full h-full object-contain" loading="lazy" decoding="async" />
                </div>
                <div className="flex flex-col items-start">
                   <h2 className="text-2xl sm:text-3xl font-bold font-display leading-none tracking-tight text-white">
                     BEACON
                   </h2>
                   <span className="text-[10px] font-extrabold uppercase tracking-[0.35em] text-white/80 mt-1">
                     Quran Institute
                   </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-white/85 leading-relaxed text-sm sm:text-base font-normal">
                {brandDesc}
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex items-center gap-3 pt-2">
                {[
                  { Icon: Facebook, href: 'https://www.facebook.com/share/1DqHmNagMu/', name: 'Facebook' },
                  { Icon: Instagram, href: 'https://www.instagram.com/beacon_quran_institute?igsh=bW9sc3B6eWsxZHo5', name: 'Instagram' },
                  { Icon: Linkedin, href: 'https://www.linkedin.com/in/beacon-quran-institute-929839406?utm_source=share_via&utm_content=profile&utm_medium=member_android', name: 'LinkedIn' },
                ].map(({ Icon, href, name }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={name}
                    className="w-11 h-11 rounded-xl bg-white/10 border border-white/25 flex items-center justify-center text-white hover:bg-[#7A7A50] hover:text-white hover:border-[#7A7A50] transition-all duration-300 shadow-md group"
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
              <h3 className="text-[11px] font-extrabold uppercase tracking-[0.35em] text-white border-b border-white/20 pb-3">Quick Navigation</h3>
            </Reveal>
            <ul className="space-y-4">
              {navLinks.map((link, i) => (
                <Reveal key={link.name} delay={0.3 + i * 0.08} direction="up" distance={10} width="100%">
                  <li>
                    {link.href ? (
                      <a
                        href={link.href}
                        className="text-sm font-medium text-white/90 hover:text-white transition-all flex items-start gap-2.5 group cursor-pointer w-full text-left"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7A7A50] group-hover:bg-white group-hover:scale-150 transition-all shrink-0 mt-[7px]"></span>
                        {link.name}
                      </a>
                    ) : (
                      <button
                        onClick={() => { link.action?.(); window.scrollTo(0, 0); }}
                        className="text-sm font-medium text-white/90 hover:text-white transition-all flex items-start gap-2.5 group cursor-pointer w-full text-left"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7A7A50] group-hover:bg-white group-hover:scale-150 transition-all shrink-0 mt-[7px]"></span>
                        {link.name}
                      </button>
                    )}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* Curriculum Tracks Column — the five courses */}
          <div className="lg:col-span-3 space-y-6">
            <Reveal delay={0.4} direction="up" distance={20}>
              <h3 className="text-[11px] font-extrabold uppercase tracking-[0.35em] text-white border-b border-white/20 pb-3">Curriculum Tracks</h3>
            </Reveal>
            <ul className="space-y-3.5">
              {FIVE_COURSES.map((course, i) => (
                <Reveal key={course} delay={0.5 + i * 0.08} direction="up" distance={10} width="100%">
                  <li>
                    <a
                      href={`/courses/${COURSES.find((c) => c.title === course)?.slug ?? ''}`}
                      className="text-sm font-medium text-white/90 hover:text-white transition-all flex items-start gap-2.5 group cursor-pointer w-full text-left"
                    >
                      <span className="text-white/60 group-hover:text-white text-xs transition-colors shrink-0 mt-[2px]">→</span>
                      {course}
                    </a>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* Registry & Support Column */}
          <div className="lg:col-span-3 space-y-6">
            <Reveal delay={0.6} direction="up" distance={20}>
              <h3 className="text-[11px] font-extrabold uppercase tracking-[0.35em] text-white border-b border-white/20 pb-3">Registry &amp; Support</h3>
            </Reveal>

            <div className="space-y-4">
              <Reveal delay={0.7} direction="up" distance={15}>
                <div className="p-4 rounded-2xl bg-white/10 border border-white/20 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#7A7A50]/30 border border-white/25 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[8.5px] font-extrabold uppercase tracking-widest text-white/80">Direct Line &amp; WhatsApp</p>
                    <p className="text-sm font-bold text-white tracking-wide" dir="ltr">+92 346 1573771</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.8} direction="up" distance={15}>
                <div className="p-4 rounded-2xl bg-white/10 border border-white/20 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#7A7A50]/30 border border-white/25 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <div className="overflow-hidden min-w-0">
                    <p className="text-[8.5px] font-extrabold uppercase tracking-widest text-white/80">Official Registry Email</p>
                    <p className="text-[11px] sm:text-xs font-bold text-white whitespace-nowrap" dir="ltr">beaconquraninstitute@gmail.com</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.9} direction="up" distance={15}>
                <div className="p-4 rounded-2xl bg-white/10 border border-white/20 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#7A7A50]/30 border border-white/25 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[8.5px] font-extrabold uppercase tracking-widest text-white/80">Global Reach</p>
                    <p className="text-xs sm:text-sm font-bold text-white">{globalPresenceDesc}</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* ── 3. Bottom legal bar: secure + copyright on one row, legal
               links on their own centred row — the old 3-across row never
               gave the middle group enough width, so REFUND GUARANTEE
               wrapped to a second line. ─────────────────────────────── */}
        <div className="pt-8 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <Reveal delay={1.0}>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-white shrink-0" />
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">
                  Secure &amp; private online classes
                </p>
              </div>
            </Reveal>

            <Reveal delay={1.2}>
              <p className="text-[9.5px] font-bold uppercase tracking-[0.25em] text-white/70">
                © 2026 BEACON QURAN INSTITUTE • ALL RIGHTS RESERVED
              </p>
            </Reveal>
          </div>

          <Reveal delay={1.1}>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
              {legalItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-[9.5px] font-bold uppercase tracking-widest text-white/80 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </Reveal>
        </div>

      </div>
    </footer>
    </>
  );
}
