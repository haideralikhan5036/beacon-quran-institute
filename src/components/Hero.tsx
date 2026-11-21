import { motion } from 'motion/react';
import { ArrowRight, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { scrollToId } from '../utils/scrollToId';
import childReading from '../assets/images/child_quran_reading.jpg';
import childReadingWebp from '../assets/images/child_quran_reading.webp';

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
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#C9D9E8] text-[#004050] mb-7 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[#7A7A50]" />
              <span className="font-display text-[11px] font-bold uppercase tracking-[0.2em]">
                {t('hero.badge')}
              </span>
            </motion.div>

            <h1 className="font-display text-[40px] leading-[1.08] sm:text-6xl lg:text-[64px] font-semibold tracking-tight text-[#0B2E3A] text-balance">
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="block"
              >
                {t('hero.title1')}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.22 }}
                className="block italic text-[#7A7A50]"
              >
                {t('hero.title2')}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.34 }}
                className="block"
              >
                {t('hero.title3')}
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="mt-6 text-lg leading-relaxed text-[#3D5563] max-w-xl"
            >
              Structured online classes for children and adults, taught by qualified
              teachers with a clear plan for every student — Qaida to Hifz, with
              progress you can actually see.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="mt-8 flex flex-col sm:flex-row gap-4"
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-10 flex items-center gap-3 border-t border-[#D7E3EE] pt-6"
            >
              <span className="flex gap-0.5" aria-label="5 out of 5 stars">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-[#7A7A50] text-[#7A7A50]" />
                ))}
              </span>
              <p className="text-sm font-medium text-[#3D5563]">
                Trusted by students in 30+ countries
              </p>
            </motion.div>
          </div>

          {/* Right — photo card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="relative"
          >
            <div className="relative rounded-[2rem] overflow-hidden border border-[#C9D9E8] shadow-[0_30px_60px_-20px_rgba(11,46,58,0.25)] bg-white">
              {/* LCP image: WebP (87% smaller than the JPG) with JPG fallback;
                  explicit width/height + aspect class reserve the space (CLS). */}
              <picture>
                <source srcSet={childReadingWebp} type="image/webp" />
                <img
                  src={childReading}
                  alt="A child reading the Quran on a wooden rehal in a mosque"
                  fetchPriority="high"
                  decoding="async"
                  width={1376}
                  height={768}
                  className="w-full aspect-[4/3.4] object-cover"
                />
              </picture>

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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
