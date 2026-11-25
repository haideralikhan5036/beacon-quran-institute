import { useState } from 'react';
import {
  ArrowLeft, ArrowRight, BookOpen, CheckCircle2, ChevronDown,
  Clock, GraduationCap, HelpCircle, MapPin, ShieldCheck, Sparkles, Users,
} from 'lucide-react';
import { Reveal } from './ui/Reveal';
import Breadcrumbs from './Breadcrumbs';
import Fees from './Fees';
import { LOCATION_COURSES, LOCATION_PAGES } from '../data/locations';
import { scrollToId } from '../utils/scrollToId';

// Location + audience pages (Tarteel-adapt batch, item 3). One shared
// component renders any of the 13 pages from its data record in
// src/data/locations.ts — city pages (online-only, fee table in USD via
// the shared Fees component) and audience pages (no fee table; link to
// the fee table / enrol instead). Style follows QualityAssurancePage:
// Breadcrumbs, back button, hero, sections, CTA, Reveal, textures;
// white bg; colours only #004050 + #7A7A50 + existing neutrals; Clash
// Display only on ≥24px headings; English only.

const WHY_ICONS = [Users, Clock, ShieldCheck, Sparkles];

export default function LocationPage({
  slug,
  onBack,
  onRegister,
  onSelectFee,
  onViewFees,
}: {
  slug: string;
  onBack: () => void;
  onRegister: () => void;
  onSelectFee: (course: string, schedule: string) => void;
  /** Audience pages: go home and scroll to the fee table. */
  onViewFees: () => void;
}) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const data = LOCATION_PAGES[slug];
  if (!data) return null;
  const isCity = data.kind === 'city';

  return (
    <div data-testid={`location-page-${slug}`} className="min-h-screen bg-[#FFFFFF] text-[#0B2E3A] pt-24 pb-20 px-6" dir="ltr">
      <div className="max-w-[1280px] mx-auto">
        <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: data.breadcrumbName }]} />
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#3D5563] hover:text-[#004050] transition-colors mb-12 group cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>

        {/* Hero */}
        <Reveal>
          <div className="bg-[#FFFFFF] border border-[#C9D9E8] p-6 sm:p-10 rounded-3xl max-w-4xl mb-12 sm:mb-16 shadow-[0_10px_30px_rgba(11,46,58,0.06)] relative overflow-hidden">
            <div
              aria-hidden="true"
              className="dots-texture pointer-events-none absolute right-[-12px] top-[-8px] w-[150px] h-[90px] opacity-50"
            />
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAF1F7] border border-[#C9D9E8] mb-5 relative">
              <MapPin className="w-4 h-4 text-[#004050]" />
              <span className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#004050]">{data.badge}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display text-[#0B2E3A] leading-tight mb-5 text-balance">
              {data.h1}
            </h1>
            <p className="text-[#3D5563] text-base sm:text-lg leading-relaxed max-w-3xl mb-4">
              {data.intro}
            </p>
            {data.timezoneLine && (
              <p className="text-[#3D5563] text-base sm:text-lg leading-relaxed max-w-3xl mb-8 flex items-start gap-2">
                <Clock className="w-5 h-5 text-[#7A7A50] shrink-0 mt-1" />
                <span>{data.timezoneLine}</span>
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onRegister}
                className="group bg-[#7A7A50] hover:bg-[#004050] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book a Free Trial Class</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => (isCity ? scrollToId('fees') : onViewFees())}
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
            {data.whyTitle}
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12 sm:mb-16">
          {data.whyPoints.map((point, i) => {
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

        {/* Courses */}
        <Reveal delay={0.1} width="100%">
          <div className="bg-[#FFFFFF] border border-[#C9D9E8] p-6 sm:p-9 rounded-3xl mb-12 sm:mb-16 shadow-[0_10px_30px_rgba(11,46,58,0.06)] relative overflow-hidden">
            <div
              aria-hidden="true"
              className="grid-texture pointer-events-none absolute right-[-10px] bottom-[-8px] w-[150px] h-[100px] opacity-50"
            />
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#0B2E3A] mb-4 text-balance relative">{data.coursesTitle}</h2>
            <p className="text-[#3D5563] text-base leading-relaxed max-w-3xl mb-6">{data.coursesText}</p>
            <ul className="space-y-2.5 relative">
              {LOCATION_COURSES.map((course) => (
                <li key={course.name} className="flex items-center gap-2.5 text-[#3D5563] text-sm sm:text-base font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#7A7A50] shrink-0" />
                  <a href={course.href} className="hover:text-[#004050] hover:underline underline-offset-2">
                    {course.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Cross-link card (female audience page → /female-teachers) */}
        {data.crossLink && (
          <Reveal delay={0.1} width="100%">
            <div className="bg-[#004050] p-6 sm:p-9 rounded-3xl mb-12 sm:mb-16 shadow-[0_16px_40px_rgba(0,64,80,0.25)] relative overflow-hidden">
              <div
                aria-hidden="true"
                className="dots-texture-white pointer-events-none absolute right-[-8px] top-[-8px] w-[130px] h-[80px] opacity-50"
              />
              <h2 className="text-2xl font-bold font-display text-white mb-3 relative">{data.crossLink.label}</h2>
              <p className="text-white/85 leading-relaxed max-w-3xl mb-5 relative">{data.crossLink.text}</p>
              <a
                href={data.crossLink.href}
                className="text-white font-bold uppercase tracking-widest text-[11px] flex items-center gap-2 cursor-pointer relative hover:text-white/80 transition-colors"
              >
                <span>Visit the Female Teachers page</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </Reveal>
        )}

        {/* Fees: city pages show the real fee table in USD (same Fees
            component / fee-sheet data as CountryPage). Audience pages
            get a fee card linking to the fee table / enrol instead. */}
        {isCity ? (
          <div className="mb-12 sm:mb-16">
            <Fees currency="USD" onSelectFee={onSelectFee} onContactRegistrar={onRegister} />
          </div>
        ) : (
          <Reveal delay={0.1} width="100%">
            <div className="bg-[#FFFFFF] border border-[#C9D9E8] p-6 sm:p-9 rounded-3xl mb-12 sm:mb-16 shadow-[0_10px_30px_rgba(11,46,58,0.06)] relative overflow-hidden">
              <div
                aria-hidden="true"
                className="streaks-texture-gold pointer-events-none absolute right-[-10px] top-[-8px] w-[130px] h-[80px] opacity-45"
              />
              <h2 className="text-2xl font-bold font-display text-[#0B2E3A] mb-3 relative">How much do classes cost?</h2>
              <p className="text-[#3D5563] text-base leading-relaxed max-w-3xl mb-5 relative">
                Monthly fees run from $35 to $80, depending on the course and schedule. See the full fee table for every course, schedule and class length — or book a free trial first and decide after.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 relative">
                <button
                  onClick={onViewFees}
                  className="border border-[#C9D9E8] text-[#004050] px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-[#EAF1F7] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>See the Fee Table</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onRegister}
                  className="group bg-[#7A7A50] hover:bg-[#004050] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Book a Free Trial Class</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </Reveal>
        )}

        {/* FAQs */}
        <Reveal delay={0.1} width="100%">
          <div className="mb-12 sm:mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-[#EAF1F7] border border-[#C9D9E8] p-3 rounded-xl">
                <HelpCircle className="w-6 h-6 text-[#004050]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#0B2E3A] text-balance">
                Frequently asked questions
              </h2>
            </div>
            <div className="space-y-3">
              {data.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className={`overflow-hidden rounded-2xl border bg-[#FFFFFF] transition-colors ${
                      isOpen ? 'border-[#004050]/50' : 'border-[#D7E3EE]'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      className="flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-3.5 text-left text-sm font-semibold text-[#0B2E3A] sm:text-base"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-[#004050] transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <p className="border-t border-[#D7E3EE] px-4 py-3.5 text-sm leading-relaxed sm:text-base text-[#3D5563]">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal>
          <div className="bg-[#004050] rounded-3xl p-8 sm:p-12 text-center shadow-[0_16px_40px_rgba(0,64,80,0.25)] relative overflow-hidden">
            <div
              aria-hidden="true"
              className="dots-texture-white pointer-events-none absolute left-[-8px] bottom-[-8px] w-[170px] h-[100px] opacity-50"
            />
            <div
              aria-hidden="true"
              className="streaks-texture-gold pointer-events-none absolute right-[-10px] top-[-8px] w-[170px] h-[100px] opacity-50"
            />
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/25 mb-5">
              <GraduationCap className="w-4 h-4 text-white" />
              <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-white">Begin Your Path Today</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white leading-tight mb-4">{data.ctaTitle}</h2>
            <p className="text-white/85 text-base sm:text-lg leading-relaxed mb-8">{data.ctaText}</p>
            <button
              onClick={onRegister}
              className="group bg-[#7A7A50] hover:bg-[#6b6b45] text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] transition-all shadow-xl inline-flex items-center gap-3 cursor-pointer"
            >
              <span>Book a Free Trial Class</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="flex items-center justify-center gap-2 mt-6 text-white/80 text-sm">
              <BookOpen className="w-4 h-4 text-white" />
              <span>1-on-1 live classes · Certified teachers · Free trial</span>
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
