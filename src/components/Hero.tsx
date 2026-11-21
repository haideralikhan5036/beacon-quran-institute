import { ArrowRight, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { scrollToId } from '../utils/scrollToId';
import childReading from '../assets/images/child_quran_reading.jpg';

export default function Hero({ onViewCourses }: { onViewCourses?: () => void }) {
  const { t } = useLanguage();

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Halftone dots, mockup placements: grey top-left + gold bottom-right */}
      <div
        aria-hidden="true"
        className="dots-texture pointer-events-none absolute left-[-14px] top-[26px] w-[150px] h-[110px] opacity-[0.55]"
      />
      <div
        aria-hidden="true"
        className="dots-texture-gold pointer-events-none absolute right-[6%] bottom-[-6px] w-[170px] h-[90px] opacity-50"
      />
      <div className="max-w-[1280px] mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-14 sm:py-20">
          {/* Left — copy */}
          <div>
            {/* Hero entrance uses pure-CSS keyframes (Batch 13, .hero-anim
                in index.css) instead of motion/react: the old motion spans
                rendered opacity:0 into the prerendered HTML, so the hero
                stayed invisible until JS hydrated. CSS animates as soon as
                the stylesheet loads — same stagger, no JS needed. */}
            <div
              className="hero-anim inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#C9D9E8] text-[#004050] mb-7 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[#7A7A50]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
                {t('hero.badge')}
              </span>
            </div>

            <h1 className="font-display text-[40px] leading-[1.08] sm:text-6xl lg:text-[64px] font-semibold tracking-tight text-[#0B2E3A] text-balance">
              <span
                className="hero-anim block"
                style={{ animationDelay: '0.1s' }}
              >
                {t('hero.title1')}
              </span>
              <span
                className="hero-anim block italic text-[#7A7A50]"
                style={{ animationDelay: '0.22s' }}
              >
                {t('hero.title2')}
              </span>
              <span
                className="hero-anim block"
                style={{ animationDelay: '0.34s' }}
              >
                {t('hero.title3')}
              </span>
            </h1>

            <p
              className="hero-anim mt-6 text-lg leading-relaxed text-[#3D5563] max-w-xl"
              style={{ animationDelay: '0.45s' }}
            >
              Structured online classes for children and adults, taught by qualified
              teachers with a clear plan for every student — Qaida to Hifz, with
              progress you can actually see.
            </p>

            <div
              className="hero-anim mt-8 flex flex-col sm:flex-row gap-4"
              style={{ animationDelay: '0.55s' }}
            >
              <button
                onClick={() => scrollToId('registration')}
                className="inline-flex items-center justify-center gap-2 bg-[#7A7A50] hover:bg-[#686844] text-white px-8 py-4 rounded-full font-semibold text-[15px] shadow-lg shadow-[#7A7A50]/25 transition-all active:scale-[0.98] cursor-pointer"
              >
                {t('hero.startJourney')}
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  if (onViewCourses) onViewCourses();
                  else {
                    const el = document.getElementById('courses');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center justify-center gap-2 bg-white text-[#004050] border border-[#C9D9E8] hover:border-[#004050] px-8 py-4 rounded-full font-semibold text-[15px] transition-all active:scale-[0.98] cursor-pointer"
              >
                {t('hero.methodology')}
              </button>
            </div>

            <div
              className="hero-fade mt-10 flex items-center gap-3 border-t border-[#D7E3EE] pt-6"
              style={{ animationDelay: '0.7s' }}
            >
              <span className="flex gap-0.5" aria-label="5 out of 5 stars">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-[#7A7A50] text-[#7A7A50]" />
                ))}
              </span>
              <p className="text-sm font-medium text-[#3D5563]">
                Trusted by students in 30+ countries
              </p>
            </div>
          </div>

          {/* Right — photo card */}
          <div
            className="hero-anim-lg relative"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="relative rounded-[2rem] overflow-hidden border border-[#C9D9E8] shadow-[0_30px_60px_-20px_rgba(11,46,58,0.25)] bg-white">
              {/* LCP image: explicit width/height + aspect class reserve the
                  space (CLS). NOTE: the WebP variant (105KB) could not be
                  pushed — the GitHub connector carries text files only, and
                  the 140KB base64 argument exceeds the tool limit — so the
                  hero stays on the JPG (791KB) until the WebP is uploaded
                  another way. */}
              <img
                src={childReading}
                alt="A child reading the Quran on a wooden rehal in a mosque"
                fetchPriority="high"
                decoding="async"
                width={1376}
                height={768}
                className="w-full aspect-[4/3.4] object-cover"
              />

              {/* PROGRESS REPORT chip — fully inside the card, top-right */}
              <div className="absolute top-4 right-4 bg-white/95 border border-[#C9D9E8] rounded-2xl px-4 py-3 shadow-lg max-w-[200px]">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#004050]">
                  Progress Report
                </p>
                <p className="text-xs text-[#3D5563] mt-0.5 leading-snug">
                  Sent to parents monthly
                </p>
              </div>

              {/* THIS WEEK chip — fully inside the card, bottom-left */}
              <div className="absolute bottom-4 left-4 bg-white/95 border border-[#C9D9E8] rounded-2xl px-4 py-3 shadow-lg">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#004050]">
                  This Week
                </p>
                <p className="text-xs text-[#3D5563] mt-0.5 leading-snug">
                  5 classes completed
                </p>
              </div>
            </div>

            {/* Caption bar below the photo */}
            <div className="mt-4 flex items-center gap-2.5 bg-white border border-[#C9D9E8] rounded-2xl px-5 py-3.5 shadow-sm">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700">
                Live
              </span>
              <span className="text-sm font-medium text-[#0B2E3A]">
                Live one-to-one class · 30 / 45 / 60 min
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
