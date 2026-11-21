import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, BookOpen, Check, ChevronDown, MapPin, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import logo from '../assets/images/brand_logo.jpg';
import { useLanguage } from '../context/LanguageContext';
import { REGION_LABELS, type RegionKey } from '../utils/geo';
import { COURSES } from '../data/courses';

import type { ViewState } from '../App';

interface NavbarProps {
  setView: (view: ViewState) => void;
  currentView: ViewState;
  /** Visitor's active region (geo auto-detect / manual choice). */
  region: RegionKey;
  onRegionChange: (region: RegionKey) => void;
  /** Open the courses view with one course selected. */
  onViewCourse: (courseId: string) => void;
}

export default function Navbar({ setView, currentView, region, onRegionChange, onViewCourse }: NavbarProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [countriesOpen, setCountriesOpen] = useState(false);

  // Country landing pages (real paths /usa, /uk, /canada — SEO Batch 2).
  const countryLinks = [
    { name: 'USA', sub: 'Online Quran Classes', view: 'usa' as const },
    { name: 'UK', sub: 'Online Quran Classes', view: 'uk' as const },
    { name: 'Canada', sub: 'Online Quran Classes', view: 'canada' as const },
  ];

  // Regions without their own landing page: picking one keeps the current
  // page and switches the fee table to that region's currency. (Batch 12:
  // the old "Fees in AUD / AED / …" sub-labels are gone from the menu —
  // the fee table itself stays on the home and country pages.)
  const regionLinks: { key: RegionKey; name: string }[] = [
    { key: 'australia', name: 'Australia' },
    { key: 'uae', name: 'UAE' },
    { key: 'saudi', name: 'Saudi Arabia' },
    { key: 'qatar', name: 'Qatar' },
    { key: 'europe', name: 'Europe' },
  ];

  const goToRegion = (next: RegionKey) => {
    // Page regions navigate (App scrolls to top on the view change);
    // currency-only regions keep the visitor where they are so they can
    // see the fee table switch — no scroll here either way.
    onRegionChange(next);
    setCountriesOpen(false);
    setIsOpen(false);
  };

  const goToCountry = (view: 'usa' | 'uk' | 'canada') => {
    goToRegion(view);
  };

  const goHome = () => {
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  /** Open a standalone page (every menu option has its own page). */
  const goPage = (view: ViewState) => {
    setView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCoursesOpen(false);
    setCountriesOpen(false);
    setIsOpen(false);
  };

  const openCourse = (courseId: string) => {
    setCoursesOpen(false);
    setIsOpen(false);
    onViewCourse(courseId);
  };

  // Mobile drawer capsules — desktop nav-pill style: the active view is a
  // filled deep-teal capsule with white text; the rest are white capsules
  // with teal text and the thin blue lining (#C9D9E8).
  const drawerCapsule = (active: boolean) =>
    `w-full rounded-full py-3.5 px-5 text-[15px] font-semibold transition-all cursor-pointer ${
      active
        ? 'bg-[#004050] text-white shadow-md'
        : 'bg-white text-[#004050] border border-[#C9D9E8] hover:border-[#004050]/50 hover:bg-[#F4F8FB]'
    }`;
  const drawerCapsuleSm = (active: boolean) =>
    `w-full rounded-full py-2.5 px-4 text-sm font-semibold transition-all cursor-pointer ${
      active
        ? 'bg-[#004050] text-white shadow-md'
        : 'bg-white text-[#004050] border border-[#C9D9E8] hover:border-[#004050]/50 hover:bg-[#F4F8FB]'
    }`;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const closeDropdowns = () => {
    setCoursesOpen(false);
    setCountriesOpen(false);
  };

  return (
    <header className="sticky top-0 z-[100] bg-white border-b border-[#C9D9E8]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-3 h-[76px]">
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); goHome(); }}
            className="flex items-center gap-3 shrink-0 cursor-pointer text-left"
            aria-label="Beacon Quran Institute — home"
          >
            <span className="w-10 h-10 rounded-xl overflow-hidden border border-[#C9D9E8] bg-white flex items-center justify-center shrink-0">
              <img src={logo} alt="Beacon Quran Institute logo" className="w-full h-full object-cover" decoding="async" />
            </span>
            <span className="flex flex-col leading-none min-w-0">
              <span className="font-display text-[19px] sm:text-[21px] font-bold text-[#0B2E3A] whitespace-nowrap">
                Beacon Quran Institute
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.32em] text-[#7A7A50] mt-1">
                Online Quran Academy
              </span>
            </span>
          </a>

          {/* Desktop nav pill + region switcher + CTA.
              Shown from xl (1280px) up: the 9-item pill + region + CTA need
              ~1230px, so below xl the hamburger + drawer take over. */}
          <div className="hidden xl:flex items-center gap-2">
            <nav
              aria-label="Main navigation"
              className="flex items-center gap-0.5 h-12 rounded-full border border-[#C9D9E8] bg-white px-1.5 shadow-[0_2px_10px_rgba(11,46,58,0.04)]"
            >
              <a
                href="/"
                onClick={(e) => { e.preventDefault(); goHome(); }}
                className={`px-2 h-9 rounded-full text-[12px] font-semibold transition-colors cursor-pointer whitespace-nowrap flex items-center ${
                  currentView === 'home' ? 'bg-[#004050] text-white' : 'text-[#0B2E3A] hover:bg-[#F2F6F9]'
                }`}
              >
                Home
              </a>

              {/* Courses dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setCountriesOpen(false);
                    setCoursesOpen((o) => !o);
                  }}
                  aria-expanded={coursesOpen}
                  aria-haspopup="true"
                  className={`px-2 h-9 rounded-full text-[12px] font-semibold transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                    currentView === 'courses' ? 'bg-[#004050] text-white' : 'text-[#0B2E3A] hover:bg-[#F2F6F9]'
                  }`}
                >
                  Courses
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${coursesOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {coursesOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={closeDropdowns} />
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-80 z-20 bg-white border border-[#C9D9E8] rounded-2xl shadow-[0_20px_50px_rgba(11,46,58,0.15)] overflow-hidden"
                      >
                        <p className="px-5 pt-4 pb-2 font-display text-[10px] font-bold uppercase tracking-[0.25em] text-[#1E4E79]">
                          Our Courses
                        </p>
                        {COURSES.map((course) => (
                          <a
                            key={course.id}
                            href={`/courses/${course.slug}`}
                            onClick={(e) => {
                              e.preventDefault();
                              openCourse(course.id);
                            }}
                            className="w-full text-left px-5 py-3 hover:bg-[#F2F6F9] transition-colors flex items-start gap-3 group cursor-pointer"
                          >
                            <BookOpen className="w-4 h-4 text-[#7A7A50] shrink-0 mt-0.5" />
                            <span className="flex flex-col leading-tight flex-1">
                              <span className="text-sm font-semibold text-[#0B2E3A] group-hover:text-[#004050]">
                                {course.title}
                              </span>
                              {course.short && (
                                <span className="text-xs text-[#3D5563] mt-0.5 leading-snug">{course.short}</span>
                              )}
                            </span>
                          </a>
                        ))}
                        <a
                          href="/courses"
                          onClick={() => {
                            setCoursesOpen(false);
                          }}
                          className="w-full text-left px-5 py-3.5 border-t border-[#D7E3EE] hover:bg-[#F2F6F9] transition-colors text-sm font-semibold text-[#004050] flex items-center gap-2 cursor-pointer"
                        >
                          View all courses
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              <a
                href="/how-it-works"
                onClick={(e) => { e.preventDefault(); goPage('how-it-works'); }}
                className={`px-2 h-9 rounded-full text-[12px] font-semibold transition-colors cursor-pointer whitespace-nowrap flex items-center ${
                  currentView === 'how-it-works' ? 'bg-[#004050] text-white' : 'text-[#0B2E3A] hover:bg-[#F2F6F9]'
                }`}
              >
                How It Works
              </a>
              <a
                href="/about"
                onClick={(e) => { e.preventDefault(); goPage('about'); }}
                className={`px-2 h-9 rounded-full text-[12px] font-semibold transition-colors cursor-pointer whitespace-nowrap flex items-center ${
                  currentView === 'about' ? 'bg-[#004050] text-white' : 'text-[#0B2E3A] hover:bg-[#F2F6F9]'
                }`}
              >
                About
              </a>
              <a
                href="/services"
                onClick={(e) => { e.preventDefault(); goPage('services'); }}
                className={`px-2 h-9 rounded-full text-[12px] font-semibold transition-colors cursor-pointer whitespace-nowrap flex items-center ${
                  currentView === 'services' ? 'bg-[#004050] text-white' : 'text-[#0B2E3A] hover:bg-[#F2F6F9]'
                }`}
              >
                Services
              </a>
              <a
                href="/blog"
                onClick={(e) => { e.preventDefault(); goPage('blog'); }}
                className={`px-2 h-9 rounded-full text-[12px] font-semibold transition-colors cursor-pointer whitespace-nowrap flex items-center ${
                  currentView === 'blog' ? 'bg-[#004050] text-white' : 'text-[#0B2E3A] hover:bg-[#F2F6F9]'
                }`}
              >
                Blog
              </a>
              <a
                href="/testimonials"
                onClick={(e) => { e.preventDefault(); goPage('testimonials'); }}
                className={`px-2 h-9 rounded-full text-[12px] font-semibold transition-colors cursor-pointer whitespace-nowrap flex items-center ${
                  currentView === 'testimonials' ? 'bg-[#004050] text-white' : 'text-[#0B2E3A] hover:bg-[#F2F6F9]'
                }`}
              >
                Testimonials
              </a>
              <a
                href="/contact"
                onClick={(e) => { e.preventDefault(); goPage('contact'); }}
                className={`px-2 h-9 rounded-full text-[12px] font-semibold transition-colors cursor-pointer whitespace-nowrap flex items-center ${
                  currentView === 'contact' ? 'bg-[#004050] text-white' : 'text-[#0B2E3A] hover:bg-[#F2F6F9]'
                }`}
              >
                Contact
              </a>
              <a
                href="/enrol"
                onClick={(e) => { e.preventDefault(); goPage('enrol'); }}
                className={`px-2 h-9 rounded-full text-[12px] font-semibold transition-colors cursor-pointer whitespace-nowrap flex items-center ${
                  currentView === 'enrol' ? 'bg-[#004050] text-white' : 'text-[#0B2E3A] hover:bg-[#F2F6F9]'
                }`}
              >
                Enrol
              </a>
            </nav>

            {/* Region switcher — USA/UK/Canada open their landing page; the
                other regions keep the current page and switch fee currency.
                The trigger shows the visitor's current region. */}
            <div className="relative">
              <button
                onClick={() => {
                  setCoursesOpen(false);
                  setCountriesOpen((o) => !o);
                }}
                aria-expanded={countriesOpen}
                aria-haspopup="true"
                aria-label={`Choose your country or region, currently ${REGION_LABELS[region]}`}
                className="flex items-center gap-1.5 px-2.5 h-12 rounded-full border border-[#C9D9E8] bg-white text-sm font-semibold text-[#0B2E3A] hover:bg-[#F2F6F9] transition-colors cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-[#7A7A50]" />
                {REGION_LABELS[region]}
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${countriesOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {countriesOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={closeDropdowns} />
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 w-72 z-20 bg-white border border-[#C9D9E8] rounded-2xl shadow-[0_20px_50px_rgba(11,46,58,0.15)] overflow-hidden"
                    >
                      <p className="px-5 pt-4 pb-2 font-display text-[10px] font-bold uppercase tracking-[0.25em] text-[#1E4E79]">
                        Study in Your Country
                      </p>
                      {countryLinks.map((c) => (
                        <a
                          key={c.view}
                          href={`/${c.view}`}
                          onClick={(e) => { e.preventDefault(); goToCountry(c.view); }}
                          className="w-full text-left px-5 py-3 hover:bg-[#F2F6F9] transition-colors flex items-center gap-3 group cursor-pointer"
                        >
                          <MapPin className="w-4 h-4 text-[#7A7A50] shrink-0" />
                          <span className="flex flex-col leading-tight flex-1">
                            <span className="text-sm font-semibold text-[#0B2E3A] group-hover:text-[#004050]">{c.name}</span>
                            <span className="text-xs text-[#3D5563]">{c.sub} {c.name === 'UK' ? 'UK' : c.name === 'USA' ? 'in the USA' : 'in Canada'}</span>
                          </span>
                          {region === c.view && <Check className="w-4 h-4 text-[#7A7A50] shrink-0" aria-label="Current region" />}
                        </a>
                      ))}
                      <p className="px-5 pt-3 pb-2 font-display text-[10px] font-bold uppercase tracking-[0.25em] text-[#1E4E79] border-t border-[#D7E3EE]">
                        More Regions
                      </p>
                      {regionLinks.map((r) => (
                        <button
                          key={r.key}
                          onClick={() => goToRegion(r.key)}
                          className="w-full text-left px-5 py-3 hover:bg-[#F2F6F9] transition-colors flex items-center gap-3 group cursor-pointer"
                        >
                          <MapPin className="w-4 h-4 text-[#7A7A50] shrink-0" />
                          <span className="flex flex-col leading-tight flex-1">
                            <span className="text-sm font-semibold text-[#0B2E3A] group-hover:text-[#004050]">{r.name}</span>
                          </span>
                          {region === r.key && <Check className="w-4 h-4 text-[#7A7A50] shrink-0" aria-label="Current region" />}
                        </button>
                      ))}
                      <div className="h-2" />
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <a
              href="/enrol"
              onClick={(e) => { e.preventDefault(); goPage('enrol'); }}
              className="h-12 px-5 rounded-full bg-[#7A7A50] hover:bg-[#686844] text-white text-sm font-semibold shadow-lg shadow-[#7A7A50]/25 transition-all active:scale-[0.98] cursor-pointer flex items-center gap-2 whitespace-nowrap"
            >
              {t('nav.startLearning')}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile hamburger (below xl — the 9-item pill needs 1280px) */}
          <div className="flex items-center xl:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              className="w-11 h-11 flex items-center justify-center rounded-full border border-[#C9D9E8] text-[#004050] cursor-pointer"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 xl:hidden bg-[#0B2E3A]/40 z-[105]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed top-0 bottom-0 right-0 w-[85%] max-w-[340px] xl:hidden bg-white z-[110] flex flex-col shadow-[-15px_0_60px_rgba(11,46,58,0.25)] border-l border-[#C9D9E8] overflow-hidden"
            >
              <div className="flex-1 flex flex-col p-6 overflow-y-auto">
                <div className="flex justify-between items-center pb-5 border-b border-[#D7E3EE]">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl overflow-hidden border border-[#C9D9E8] bg-white flex items-center justify-center">
                      <img src={logo} alt="Beacon Quran Institute logo" className="w-full h-full object-cover" decoding="async" />
                    </span>
                    <span className="flex flex-col leading-none">
                      <span className="font-display text-base font-bold text-[#0B2E3A]">Beacon Quran Institute</span>
                      <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-[#7A7A50] mt-1">Online Quran Academy</span>
                    </span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    aria-label="Close menu"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F2F6F9] text-[#004050] hover:bg-[#D7E3EE] transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav aria-label="Mobile navigation" className="flex flex-col py-4 space-y-2">
                  <a
                    href="/"
                    onClick={(e) => { e.preventDefault(); goHome(); }}
                    className={`${drawerCapsule(currentView === 'home')} text-left`}
                  >
                    Home
                  </a>

                  <p className="px-4 pt-3 pb-1 font-display text-[10px] font-bold uppercase tracking-[0.25em] text-[#1E4E79]">
                    Courses
                  </p>
                  {COURSES.map((course) => (
                    <a
                      key={course.id}
                      href={`/courses/${course.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        openCourse(course.id);
                      }}
                      className={`${drawerCapsuleSm(false)} flex items-center gap-3 text-left`}
                    >
                      <BookOpen className="w-4 h-4 text-[#7A7A50] shrink-0" />
                      {course.title}
                    </a>
                  ))}
                  <a
                    href="/courses"
                    onClick={() => setIsOpen(false)}
                    className={`${drawerCapsuleSm(currentView === 'courses')} text-left`}
                  >
                    View all courses →
                  </a>

                  <a
                    href="/how-it-works"
                    onClick={(e) => { e.preventDefault(); goPage('how-it-works'); }}
                    className={`${drawerCapsule(currentView === 'how-it-works')} text-left`}
                  >
                    How It Works
                  </a>
                  <a
                    href="/about"
                    onClick={(e) => { e.preventDefault(); goPage('about'); }}
                    className={`${drawerCapsule(currentView === 'about')} text-left`}
                  >
                    About
                  </a>
                  <a
                    href="/services"
                    onClick={(e) => { e.preventDefault(); goPage('services'); }}
                    className={`${drawerCapsule(currentView === 'services')} text-left`}
                  >
                    Services
                  </a>
                  <a
                    href="/blog"
                    onClick={(e) => { e.preventDefault(); goPage('blog'); }}
                    className={`${drawerCapsule(currentView === 'blog')} text-left`}
                  >
                    Blog
                  </a>
                  <a
                    href="/testimonials"
                    onClick={(e) => { e.preventDefault(); goPage('testimonials'); }}
                    className={`${drawerCapsule(currentView === 'testimonials')} text-left`}
                  >
                    Testimonials
                  </a>
                  <a
                    href="/contact"
                    onClick={(e) => { e.preventDefault(); goPage('contact'); }}
                    className={`${drawerCapsule(currentView === 'contact')} text-left`}
                  >
                    Contact
                  </a>
                  <a
                    href="/enrol"
                    onClick={(e) => { e.preventDefault(); goPage('enrol'); }}
                    className={`${drawerCapsule(currentView === 'enrol')} text-left`}
                  >
                    Enrol
                  </a>
                </nav>

                {/* Region switcher */}
                <div className="pt-4 mt-2 border-t border-[#D7E3EE]">
                  <p className="px-4 pb-2 font-display text-[10px] font-bold uppercase tracking-[0.25em] text-[#1E4E79]">
                    Study in Your Country
                  </p>
                  <div className="space-y-2">
                    {countryLinks.map((c) => (
                      <a
                        key={c.view}
                        href={`/${c.view}`}
                        onClick={(e) => { e.preventDefault(); goToCountry(c.view); }}
                        className={`${drawerCapsule(region === c.view)} flex items-center gap-3 text-left`}
                      >
                        <MapPin className={`w-4 h-4 shrink-0 ${region === c.view ? 'text-white' : 'text-[#7A7A50]'}`} />
                        <span className="flex-1">{c.name} — {c.sub}</span>
                        {region === c.view && <Check className="w-4 h-4 text-white shrink-0" aria-label="Current region" />}
                      </a>
                    ))}
                  </div>
                  <p className="px-4 pt-3 pb-2 font-display text-[10px] font-bold uppercase tracking-[0.25em] text-[#1E4E79]">
                    More Regions
                  </p>
                  <div className="space-y-2">
                    {regionLinks.map((r) => (
                      <button
                        key={r.key}
                        onClick={() => goToRegion(r.key)}
                        className={`${drawerCapsule(region === r.key)} flex items-center gap-3 text-left`}
                      >
                        <MapPin className={`w-4 h-4 shrink-0 ${region === r.key ? 'text-white' : 'text-[#7A7A50]'}`} />
                        <span className="flex-1">{r.name}</span>
                        {region === r.key && <Check className="w-4 h-4 text-white shrink-0" aria-label="Current region" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-auto">
                  <a
                    href="/enrol"
                    onClick={(e) => { e.preventDefault(); goPage('enrol'); }}
                    className="w-full bg-[#7A7A50] hover:bg-[#686844] text-white h-12 rounded-full font-semibold text-sm shadow-lg shadow-[#7A7A50]/25 transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center"
                  >
                    {t('nav.startLearning')}
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
