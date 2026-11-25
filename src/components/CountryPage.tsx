import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Clock, GraduationCap, MapPin, ShieldCheck, Sparkles, Users } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import Breadcrumbs from './Breadcrumbs';
import Fees from './Fees';
import { scrollToId } from '../utils/scrollToId';
import type { CurrencyCode } from '../data/feeTable';

export type CountryKey = 'usa' | 'uk' | 'canada';

type CountryCopy = {
  badge: string;
  h1: string;
  intro: string;
  whyTitle: string;
  whyPoints: { title: string; text: string }[];
  citiesTitle: string;
  citiesIntro: string;
  cities: string[];
  costTitle: string;
  costText: string;
  coursesTitle: string;
  ctaTitle: string;
  ctaText: string;
};

// Country copy is written from the keyword research (report §3): local
// phrasing per country, local time zones and city names. The cost line states
// Beacon's REAL monthly fee range in the local currency, taken from the
// owner's fee sheet — no market-typical ranges, no old plan prices.
const COUNTRY_COPY: Record<CountryKey, CountryCopy> = {
  usa: {
    badge: 'Online Quran Classes — USA',
    h1: 'Online Quran Classes in the USA',
    intro:
      'Learn Quran online in the USA with certified male and female teachers. Our 1-on-1 online Quran classes bring Tajweed, Hifz memorization and Noorani Qaida to kids and adults — live, at times that fit your day, from New York to Los Angeles.',
    whyTitle: 'Why families in the USA choose Beacon',
    whyPoints: [
      { title: '1-on-1 live Quran lessons', text: 'Private, one-to-one classes for kids and adults — your teacher focuses only on you.' },
      { title: 'Certified male & female teachers', text: 'Experienced, Ijazah-certified Quran teachers, including female teachers for sisters and kids.' },
      { title: 'US time zones covered', text: 'Flexible scheduling across Eastern, Central, Mountain and Pacific time (ET / CT / MT / PT).' },
      { title: 'Free trial class', text: 'Book a free trial lesson first and meet your tutor — if the fit is not right, try another tutor — a 2-day trial with the second tutor — before you enrol.' },
    ],
    citiesTitle: 'Online Quran classes across the USA',
    citiesIntro:
      'Our students learn Quran online from New York, Chicago, Houston, Dallas, Los Angeles — and everywhere in between. Classes are 100% online, so your city never limits your teacher.',
    cities: ['New York', 'Chicago', 'Houston', 'Dallas', 'Los Angeles'],
    costTitle: 'How much do online Quran classes cost in the USA?',
    costText:
      'At Beacon, monthly fees run from $35 to $80 depending on the course and schedule — see the full fee table below for every course, schedule and currency.',
    coursesTitle: 'Quran courses for learners in the USA',
    ctaTitle: 'Start learning Quran online in the USA',
    ctaText: 'Book your free trial class today — no commitment required.',
  },
  uk: {
    badge: 'Online Quran Classes — UK',
    h1: 'Online Quran Classes UK',
    intro:
      'Learn Quran online in the UK with DBS-checked Quran tutors. Our one-to-one online Quran classes bring Tajweed, Hifz memorisation and Noorani Qaida to kids and adults — live, at times that fit your day, from London to Glasgow.',
    whyTitle: 'Why families in the UK choose Beacon',
    whyPoints: [
      { title: 'One-to-one live Quran lessons', text: 'Private, one-to-one classes for kids and adults — your tutor focuses only on you.' },
      { title: 'DBS-checked Quran tutors', text: 'UK parents can learn with confidence: our tutors are DBS-checked, with male & female teachers available.' },
      { title: 'GMT / BST scheduling', text: 'Flexible lesson times on UK time, including after-school and weekend slots.' },
      { title: 'Free trial class', text: 'Book a free trial lesson first and meet your tutor — if the fit is not right, try another tutor — a 2-day trial with the second tutor — before you enrol.' },
    ],
    citiesTitle: 'Online Quran classes across the UK',
    citiesIntro:
      'Our students learn Quran online from London, Birmingham, Manchester, Bradford, Leeds, Leicester and Glasgow — and everywhere in between. Classes are 100% online, so your city never limits your tutor.',
    cities: ['London', 'Birmingham', 'Manchester', 'Bradford', 'Leeds', 'Leicester', 'Glasgow'],
    costTitle: 'How much do online Quran classes cost in the UK?',
    costText:
      'At Beacon, monthly fees run from £30 to £60 depending on the course and schedule — see the full fee table below for every course, schedule and currency.',
    coursesTitle: 'Quran courses for learners in the UK',
    ctaTitle: 'Start learning Quran online in the UK',
    ctaText: 'Book your free trial class today — no commitment required.',
  },
  canada: {
    badge: 'Online Quran Classes — Canada',
    h1: 'Online Quran Classes in Canada',
    intro:
      'Learn Quran online in Canada with certified male and female teachers. Our 1-on-1 online Quran classes bring Tajweed, Hifz memorization and Noorani Qaida to kids and adults — live, at times that fit your day, from Toronto to Vancouver.',
    whyTitle: 'Why families in Canada choose Beacon',
    whyPoints: [
      { title: '1-on-1 live Quran lessons', text: 'Private, one-to-one classes for kids and adults — your teacher focuses only on you.' },
      { title: 'Certified male & female teachers', text: 'Experienced, Ijazah-certified Quran teachers, including female teachers for sisters and kids.' },
      { title: 'Canadian time zones covered', text: 'Flexible scheduling across Eastern, Central, Mountain and Pacific time (ET / CT / MT / PT).' },
      { title: 'Free trial class', text: 'Book a free trial lesson first and meet your tutor — if the fit is not right, try another tutor — a 2-day trial with the second tutor — before you enrol.' },
    ],
    citiesTitle: 'Online Quran classes across Canada',
    citiesIntro:
      'Our students learn Quran online from Toronto, Mississauga, Brampton, Ottawa, Montreal, Calgary, Edmonton, Vancouver and Winnipeg — and everywhere in between. Classes are 100% online, so your city never limits your teacher.',
    cities: ['Toronto', 'Mississauga', 'Brampton', 'Ottawa', 'Montreal', 'Calgary', 'Edmonton', 'Vancouver', 'Winnipeg'],
    costTitle: 'How much do online Quran classes cost in Canada?',
    costText:
      'At Beacon, monthly fees run from C$45 to C$100 depending on the course and schedule — see the full fee table below for every course, schedule and currency.',
    coursesTitle: 'Quran courses for learners in Canada',
    ctaTitle: 'Start learning Quran online in Canada',
    ctaText: 'Book your free trial class today — no commitment required.',
  },
};

// The five Beacon courses (Arabic Language removed — it is no longer offered).
const COURSE_NAMES = [
  'Noorani Qaida',
  'Recitation & Tajweed',
  'Hifz Program',
  'Tafseer-ul-Quran',
  'Islamic Studies',
];

const WHY_ICONS = [Users, ShieldCheck, Clock, Sparkles];

// City/state location pages (Tarteel-adapt item 3) — real <a href> links
// so crawlers and no-JS visitors reach the prerendered pages. Shown only
// on the /usa country page; the 8 pages are all online-only, so no local
// office or address is claimed anywhere.
const US_CITY_PAGE_LINKS: { name: string; href: string }[] = [
  { name: 'Houston', href: '/quran-classes-in-houston' },
  { name: 'New York', href: '/quran-classes-in-new-york' },
  { name: 'Los Angeles', href: '/quran-classes-in-los-angeles' },
  { name: 'Dallas', href: '/quran-classes-in-dallas' },
  { name: 'Texas', href: '/quran-classes-in-texas' },
  { name: 'California', href: '/quran-classes-in-california' },
  { name: 'Illinois', href: '/quran-classes-in-illinois' },
  { name: 'Michigan', href: '/quran-classes-in-michigan' },
];

export default function CountryPage({
  country,
  onBack,
  onRegister,
  onSelectFee,
  onViewCourses,
  currency,
}: {
  country: CountryKey;
  onBack: () => void;
  onRegister: () => void;
  onSelectFee: (course: string, schedule: string) => void;
  onViewCourses: () => void;
  /** Fee-table currency, controlled by App (geo auto-detect / header
      switcher / country-page default). */
  currency: CurrencyCode;
}) {
  const copy = COUNTRY_COPY[country];

  return (
    <div className="pt-28 sm:pt-32 pb-20 relative bg-[#FFFFFF]">
      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: copy.h1 }]} />
        <Reveal>
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#004050] hover:text-[#7A7A50] transition-colors mb-8 cursor-pointer font-bold uppercase tracking-widest text-[11px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
        </Reveal>

        {/* Hero */}
        <Reveal delay={0.1}>
          <div className="bg-[#FFFFFF] border border-[#C9D9E8] p-6 sm:p-10 rounded-3xl max-w-4xl mb-12 sm:mb-16 shadow-[0_10px_30px_rgba(11,46,58,0.06)] relative overflow-hidden">
            {/* Batch 15: dots, top-right of the country hero card */}
            <div
              aria-hidden="true"
              className="dots-texture pointer-events-none absolute right-[-12px] top-[-8px] w-[150px] h-[90px] opacity-50"
            />
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAF1F7] border border-[#C9D9E8] mb-5 relative">
              <MapPin className="w-4 h-4 text-[#004050]" />
              <span className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#004050]">{copy.badge}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display text-[#0B2E3A] leading-tight mb-5 text-balance">
              {copy.h1}
            </h1>
            <p className="text-[#3D5563] text-base sm:text-lg leading-relaxed max-w-3xl mb-8">
              {copy.intro}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onRegister}
                className="group bg-[#7A7A50] hover:bg-[#004050] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book a Free Trial Class</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollToId('fees')}
                className="border border-[#C9D9E8] text-[#004050] px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-[#EAF1F7] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>See the Fee Table</span>
              </button>
            </div>
          </div>
        </Reveal>

        {/* Why choose Beacon */}
        <Reveal delay={0.1} width="100%">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-[#0B2E3A] mb-8 text-balance">
            {copy.whyTitle}
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12 sm:mb-16">
          {copy.whyPoints.map((point, i) => {
            const Icon = WHY_ICONS[i % WHY_ICONS.length];
            return (
              <Reveal key={point.title} delay={0.15 + i * 0.08}>
                <div className="bg-[#FFFFFF] border border-[#C9D9E8] p-6 rounded-3xl h-full shadow-[0_10px_30px_rgba(11,46,58,0.05)]">
                  <div className="w-11 h-11 rounded-2xl bg-[#EAF1F7] border border-[#C9D9E8] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#004050]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0B2E3A] mb-2">{point.title}</h3>
                  <p className="text-sm text-[#3D5563] leading-relaxed">{point.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Cities */}
        <Reveal delay={0.1} width="100%">
          <div className="bg-[#FFFFFF] border border-[#C9D9E8] p-6 sm:p-9 rounded-3xl mb-12 sm:mb-16 shadow-[0_10px_30px_rgba(11,46,58,0.06)] relative overflow-hidden">
            {/* Batch 15: light grid, bottom-right of the cities shell */}
            <div
              aria-hidden="true"
              className="grid-texture pointer-events-none absolute right-[-10px] bottom-[-8px] w-[150px] h-[100px] opacity-50"
            />
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#0B2E3A] mb-4 text-balance relative">{copy.citiesTitle}</h2>
            <p className="text-[#3D5563] text-base leading-relaxed max-w-3xl mb-6">{copy.citiesIntro}</p>
            <div className="flex flex-wrap gap-2.5">
              {copy.cities.map((city) => (
                <span
                  key={city}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#EAF1F7] border border-[#C9D9E8] text-[#004050] text-sm font-semibold"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#7A7A50]" />
                  {city}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* US city/state pages — USA country page only (Tarteel-adapt
            item 3). Real <a href> links to the prerendered location
            pages; classes are online-only, so these link to pages that
            say so plainly — no local office is claimed. */}
        {country === 'usa' && (
          <Reveal delay={0.1} width="100%">
            <div className="bg-[#FFFFFF] border border-[#C9D9E8] p-6 sm:p-9 rounded-3xl mb-12 sm:mb-16 shadow-[0_10px_30px_rgba(11,46,58,0.06)] relative overflow-hidden">
              <div
                aria-hidden="true"
                className="dots-texture pointer-events-none absolute right-[-10px] top-[-8px] w-[150px] h-[90px] opacity-50"
              />
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#0B2E3A] mb-4 text-balance relative">Quran classes in US cities</h2>
              <p className="text-[#3D5563] text-base leading-relaxed max-w-3xl mb-6">
                Looking for online Quran classes in your city or state? Every class is taught live online, one to one — pick your place below for class times, fees and FAQs.
              </p>
              <div className="flex flex-wrap gap-2.5">
                {US_CITY_PAGE_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#EAF1F7] border border-[#C9D9E8] text-[#004050] text-sm font-semibold hover:bg-[#004050] hover:text-white hover:border-[#004050] transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#7A7A50]" />
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* Cost + courses */}
        <div className="grid lg:grid-cols-2 gap-5 mb-12 sm:mb-16">
          <Reveal delay={0.1}>
            <div className="bg-[#FFFFFF] border border-[#C9D9E8] p-6 sm:p-8 rounded-3xl h-full shadow-[0_10px_30px_rgba(11,46,58,0.05)]">
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0B2E3A] mb-3 text-balance">{copy.costTitle}</h2>
              <p className="text-[#3D5563] text-base leading-relaxed mb-5">{copy.costText}</p>
              <button
                onClick={() => scrollToId('fees')}
                className="text-[#7A7A50] hover:text-[#004050] font-bold uppercase tracking-widest text-[11px] flex items-center gap-2 cursor-pointer transition-colors"
              >
                <span>See the fee table below</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="bg-[#FFFFFF] border border-[#C9D9E8] p-6 sm:p-8 rounded-3xl h-full shadow-[0_10px_30px_rgba(11,46,58,0.05)]">
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0B2E3A] mb-3 text-balance">{copy.coursesTitle}</h2>
              <ul className="space-y-2.5 mb-5">
                {COURSE_NAMES.map((name) => (
                  <li key={name} className="flex items-center gap-2.5 text-[#3D5563] text-sm sm:text-base font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#7A7A50] shrink-0" />
                    {name}
                  </li>
                ))}
              </ul>
              <button
                onClick={onViewCourses}
                className="text-[#7A7A50] hover:text-[#004050] font-bold uppercase tracking-widest text-[11px] flex items-center gap-2 cursor-pointer transition-colors"
              >
                <span>Explore all courses</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </Reveal>
        </div>

        {/* Fee table — the same real fee table as the homepage, with this
            country's currency preselected (USA→USD, UK→GBP, Canada→CAD).
            NOTE: no Reveal wrapper here on purpose — Reveal starts its
            content translated 30px down, so scrolling to this section while
            it is still hidden lands 30px too far (measured top=-30). The
            Fees section animates its own inner blocks already. */}
        <div className="mb-12 sm:mb-16">
          <Fees
            currency={currency}
            onSelectFee={onSelectFee}
            onContactRegistrar={onRegister}
          />
        </div>

        {/* CTA */}
        <Reveal delay={0.1} width="100%">
          <div className="bg-[#004050] rounded-3xl p-8 sm:p-12 text-center shadow-[0_16px_40px_rgba(0,64,80,0.25)] relative overflow-hidden">
            {/* Halftone dots, mockup CTA-band placement: white, bottom-left */}
            <div
              aria-hidden="true"
              className="dots-texture-white pointer-events-none absolute left-[-8px] bottom-[-8px] w-[170px] h-[100px] opacity-50"
            />
            {/* Batch 15: gold streaks, top-right of the CTA band */}
            <div
              aria-hidden="true"
              className="streaks-texture-gold pointer-events-none absolute right-[-10px] top-[-8px] w-[170px] h-[100px] opacity-50"
            />
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/25 mb-5">
              <GraduationCap className="w-4 h-4 text-white" />
              <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-white">Begin Your Path Today</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white leading-tight mb-4">{copy.ctaTitle}</h2>
            <p className="text-white/85 text-base sm:text-lg leading-relaxed mb-8">{copy.ctaText}</p>
            <button
              onClick={onRegister}
              className="group bg-[#7A7A50] hover:bg-[#6b6b45] text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] transition-all shadow-xl inline-flex items-center gap-3 cursor-pointer"
            >
              <span>Book a Free Trial Class</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="flex items-center justify-center gap-2 mt-6 text-white/80 text-sm">
              <BookOpen className="w-4 h-4 text-white" />
              <span>1,400+ students · 50+ certified teachers · 30+ countries</span>
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
