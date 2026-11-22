import { ArrowRight, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { scrollToId } from '../utils/scrollToId';
import openMushaf from '../assets/images/pic2-open-mushaf.png';
import quranCover from '../assets/images/pic1-quran-cover.png';

export default function Hero({ onViewCourses, onEnrol }: { onViewCourses?: () => void; onEnrol?: () => void }) {
  const { t } = useLanguage();

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Batch 17: the owner's Quran-cover picture as a very faint
          background behind the hero text area — MRQS.pk hero style
          (a soft ghost of the cover, barely visible). Same technique
          as the Fees shade (Batch 16): opacity 0.08 so the headline
          and copy stay fully readable. Left-anchored, 60% wide, so
          the medallion sits behind the text column; the photo card
          (opaque, right column) covers the rest. */}
      <img
        src={quranCover}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        width={600}
        height={750}
        className="pointer-events-none absolute inset-y-0 left-0 h-full w-[60%] object-cover opacity-[0.08]"
      />
      {/* Halftone dots, mockup placements: grey top-left + gold bottom-right */}
      <div
        aria-hidden="true"
        className="dots-texture pointer-events-none absolute left-[-14px] top-[26px] w-[150px] h-[110px] opacity-[0.55]"
      />
      {/* Batch 15 (Halka + Mixed): dots top-left, gold streaks bottom-right */}
      <div
        aria-hidden="true"
        className="streaks-texture-gold pointer-events-none absolute right-[6%] bottom-[-6px] w-[170px] h-[90px] opacity-50"
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
                onClick={() => { if (onEnrol) onEnrol(); else scrollToId('registration'); }}
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
            <div className="relative rounded-[2rem] overflow-hidden border border-[#C9D9E8] shadow-[0_30px_60px_-20px_rgba(11,46,58,0.25)] bg-[linear-gradient(155deg,#004050_20%,#7A7A50_115%)]">
              {/* LCP image (Batch 16): the owner's open-Mushaf photo
                  (328KB PNG, 600x903) replaces the 791KB child-reading
                  JPG as the hero photo. The old file stays in
                  src/assets (still used by blogData) — only this
                  reference changed. Duotone treatment is CSS-only
                  (mockup technique): the B&W photo blends luminosity
                  over a teal→gold wash; the Arabic page text itself
                  is untouched. Portrait aspect 4/4.4 so the page
                  is not cropped. */}
              <img
                src={openMushaf}
                alt="An open Mushaf (Quran) on a rehal"
                fetchPriority="high"
                decoding="async"
                width={600}
                height={903}
                className="w-full aspect-[4/4.4] object-cover mix-blend-luminosity contrast-[1.07] brightness-[1.02]"
              />

              {/* Bottom sheen — same duotone technique as the mockup */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0)_55%,rgba(0,64,80,0.28)_100%)]"
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
