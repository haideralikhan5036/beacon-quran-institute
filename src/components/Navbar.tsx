import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, BookOpen, Check, ChevronDown, Home, Info, ListChecks, Mail, MapPin, Menu, Newspaper, Sparkles, Star, UserPlus, X } from 'lucide-react';
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

  // Mobile menu pills (Batch 18, MRQS-style): the 9 nav links as white
  // pills sliding in staggered from the right over a blurred backdrop.
  // Courses goes to the courses hub — no sub-list, same as the MRQS menu.
  const mobileLinks = [
    { label: 'Home', href: '/', icon: Home, go: goHome, active: currentView === 'home' },
    { label: 'Courses', href: '/courses', icon: BookOpen, go: () => goPage('courses'), active: currentView === 'courses' },
    { label: 'How It Works', href: '/how-it-works', icon: ListChecks, go: () => goPage('how-it-works'), active: currentView === 'how-it-works' },
    { label: 'About', href: '/about', icon: Info, go: () => goPage('about'), active: currentView === 'about' },
    { label: 'Services', href: '/services', icon: Sparkles, go: () => goPage('services'), active: currentView === 'services' },
    { label: 'Blog', href: '/blog', icon: Newspaper, go: () => goPage('blog'), active: currentView === 'blog' },
    { label: 'Testimonials', href: '/testimonials', icon: Star, go: () => goPage('testimonials'), active: currentView === 'testimonials' },
    { label: 'Contact', href: '/contact', icon: Mail, go: () => goPage('contact'), active: currentView === 'contact' },
    { label: 'Enrol', href: '/enrol', icon: UserPlus, go: () => goPage('enrol'), active: currentView === 'enrol' },
  ];

  // All 8 regions for the compact region row under the mobile pills.
  const allRegions: { key: RegionKey; name: string }[] = [
    { key: 'usa', name: 'USA' },
    { key: 'uk', name: 'UK' },
    { key: 'canada', name: 'Canada' },
    ...regionLinks,
  ];

  // Mobile menu motion: spring stagger in (~0.05s apart, MRQS-style),
  // reverse stagger out. Reduced motion: no slide, no stagger, quick fade.
  const reduceMotion = useReducedMotion();
  const pillCount = mobileLinks.length;
  const pillEnter = (i: number) =>
    reduceMotion
      ? { duration: 0.15 }
      : { type: 'spring' as const, damping: 26, stiffness: 320, delay: i * 0.05 };
  const pillExit = (i: number) =>
    reduceMotion
      ? { duration: 0.15 }
      : { duration: 0.25, delay: (pillCount - 1 - i) * 0.04 };

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

  // ESC closes the mobile menu (Batch 18).
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const closeDropdowns = () => {
    setCoursesOpen(false);
    setCountriesOpen(false);
  };

  return (
    <header className="sticky top-0 z-[100] bg-white border-b border-[#C9D9E8]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-3 h-[76px] xl:hidden">
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
        {/* Desktop header (xl and up) — two rows. Mobile/tablet header below xl is the Batch 18 layout, untouched. */}
        <div className="hidden xl:block">
          {/* Row 1 — brand, centred. Batch 19: the ORIGINAL logo, open
              and big (80px, no box/border), with the wordmark in the original
              heavy Clash Display at 38px. */}
          <div className="flex items-center justify-center gap-4 pt-5 pb-4">
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); goHome(); }}
              className="flex items-center gap-4 shrink-0 cursor-pointer text-left"
              aria-label="Beacon Quran Institute — home"
            >
              <img src={logo} alt="Beacon Quran Institute logo" className="h-20 w-auto shrink-0" decoding="async" />
              <span className="flex flex-col leading-none min-w-0">
                <span className="font-display text-[38px] font-bold text-[#0B2E3A] whitespace-nowrap">
                  Beacon Quran Institute
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#7A7A50] mt-2">
                  Online Quran Academy
                </span>
              </span>
            </a>
          </div>
          {/* Row 2 — menu, moved down below the brand row into the open space
              as a centred floating pill. Same nav markup/classes as before —
              only its position changes (Batch 19). */}
          <div className="flex items-center justify-center gap-2 pb-5">
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
                            <p className="px-5 pt-4 pb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#1E4E79]">
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
                          <p className="px-5 pt-4 pb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#1E4E79]">
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
                          <p className="px-5 pt-3 pb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#1E4E79] border-t border-[#D7E3EE]">
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
          </div>
        </div>
      </div>

      {/* Mobile menu — MRQS-style pills (Batch 18).
          Hamburger tap → blurred backdrop, nav links as white pills
          sliding in one by one from the right with a stagger, X at the
          bottom to close (also backdrop tap and ESC). Desktop nav above
          is untouched. The old right-side drawer panel is gone. */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0.15 : 0.45 }}
              onClick={() => setIsOpen(false)}
              data-testid="mobile-menu-backdrop"
              className="mobile-menu-backdrop fixed inset-0 xl:hidden bg-[#0B2E3A]/40 backdrop-blur-md z-[105]"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0.15 : 0.6 }}
              className="fixed inset-0 z-[110] xl:hidden overflow-y-auto pointer-events-none flex flex-col"
            >
              <div className="m-auto flex w-full max-w-[360px] flex-col items-end gap-2.5 px-5 py-10 pointer-events-none">
                <nav aria-label="Mobile navigation" className="w-full flex flex-col gap-2.5 pointer-events-auto">
                  {mobileLinks.map((link, i) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); link.go(); }}
                      initial={{ opacity: 0, x: reduceMotion ? 0 : 80 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: reduceMotion ? 0 : 80, transition: pillExit(i) }}
                      transition={pillEnter(i)}
                      data-testid="mobile-menu-pill"
                      className={`w-full flex items-center gap-3 rounded-full px-5 py-3.5 text-[15px] font-semibold shadow-[0_12px_35px_rgba(11,46,58,0.30)] cursor-pointer ${
                        link.active ? 'bg-[#004050] text-white' : 'bg-white text-[#004050]'
                      }`}
                    >
                      <link.icon className={`w-5 h-5 shrink-0 ${link.active ? 'text-white' : 'text-[#7A7A50]'}`} />
                      {link.label}
                    </motion.a>
                  ))}
                </nav>

                {/* Region switcher — compact chip row under the pills.
                    Same regions as the desktop switcher; tapping one
                    switches the fee currency (page regions navigate). */}
                <motion.div
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  transition={reduceMotion ? { duration: 0.15 } : { delay: 0.5, duration: 0.25 }}
                  data-testid="mobile-menu-region"
                  className="w-full pointer-events-auto pt-1"
                >
                  <p className="pb-2 text-right text-[10px] font-bold uppercase tracking-[0.25em] text-white/90">
                    Your Region
                  </p>
                  <div className="flex flex-wrap justify-end gap-1.5">
                    {allRegions.map((r) => (
                      <button
                        key={r.key}
                        onClick={() => goToRegion(r.key)}
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold cursor-pointer ${
                          region === r.key
                            ? 'bg-[#004050] text-white shadow-md'
                            : 'bg-white text-[#004050] hover:bg-[#F4F8FB]'
                        }`}
                      >
                        {r.name}
                      </button>
                    ))}
                  </div>
                </motion.div>

                {/* X to close — bottom of the stack, MRQS-style. */}
                <motion.button
                  initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  transition={reduceMotion ? { duration: 0.15 } : { delay: 0.6, type: 'spring', damping: 20, stiffness: 300 }}
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                  data-testid="mobile-menu-close"
                  className="self-center mt-3 w-12 h-12 flex items-center justify-center rounded-full bg-white text-[#004050] shadow-[0_12px_35px_rgba(11,46,58,0.30)] cursor-pointer pointer-events-auto"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
