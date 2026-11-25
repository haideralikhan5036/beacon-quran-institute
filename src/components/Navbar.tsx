import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, BookOpen, ChevronDown, HeartHandshake, Home, Info, ListChecks, Mail, Menu, MessageCircle, Newspaper, Sparkles, Star, UserPlus, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import logo from '../assets/images/brand_logo.jpg';
import { useLanguage } from '../context/LanguageContext';
import { type RegionKey } from '../utils/geo';
import { COURSES } from '../data/courses';

import type { ViewState } from '../App';

interface NavbarProps {
  setView: (view: ViewState) => void;
  currentView: ViewState;
  /** Visitor's active region (geo auto-detect). Batch 20: the region
      switchers (desktop dropdown + mobile chip row) are removed — a
      visitor only ever sees their own country's currency — so Navbar
      renders no region UI. The props stay declared so App keeps passing
      the geo state it uses for the fee table's currency. */
  region: RegionKey;
  onRegionChange: (region: RegionKey) => void;
  /** Open the courses view with one course selected. */
  onViewCourse: (courseId: string) => void;
}

export default function Navbar({ setView, currentView, onViewCourse }: NavbarProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);

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
    { label: 'Female Teachers', href: '/female-teachers', icon: HeartHandshake, go: () => goPage('female-teachers'), active: currentView === 'female-teachers' },
    { label: 'Contact', href: '/contact', icon: Mail, go: () => goPage('contact'), active: currentView === 'contact' },
    { label: 'Enrol', href: '/enrol', icon: UserPlus, go: () => goPage('enrol'), active: currentView === 'enrol' },
  ];

  // Mobile menu motion: spring stagger in (~0.05s apart, MRQS-style),
  // reverse stagger out. Reduced motion: no slide, no stagger, quick fade.
  const reduceMotion = useReducedMotion();
  // 11 pills in the mobile menu: the 10 nav links + the WhatsApp contact
  // pill (Tarteel-adapt item 9) — the count drives the reverse-stagger exit.
  const pillCount = mobileLinks.length + 1;
  const pillEnter = (i: number) =>
    reduceMotion
      ? { duration: 0.15 }
      : { type: 'spring' as const, damping: 26, stiffness: 320, delay: i * 0.05 };
  const pillExit = (i: number) =>
    reduceMotion
      ? { duration: 0.15 }
      : { duration: 0.25, delay: (pillCount - 1 - i) * 0.04 };

  // Batch 20 part 2: desktop hide-on-scroll — REWORKED. The brand row is
  // NOT collapsed by JS: the header is sticky with top:-196px at xl (the
  // brand row's exact height: pt-5 20 + logo 160 + pb-4 16), so the row
  // scrolls away naturally and the menu pill pins 12px below the viewport
  // top; scrolling back to the top brings the row back. This state only
  // toggles PAINT (header background + border go transparent once the
  // header is stuck) — never layout. Why: the first attempt drove a
  // framer-motion height collapse from this state, and the layout shift
  // mid-scroll cancelled every programmatic smooth scroll near the top
  // (probe-verified: smooth scrollTo/scrollIntoView stalled at ~7–11px
  // while wheel scrolling worked; with the header already collapsed the
  // same calls landed exactly). Threshold 196px = the stick point.
  // Desktop-only in effect: every class it toggles is xl-scoped and the
  // brand row lives in the xl-only block, so the mobile header is untouched.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 196);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
  };

  return (
    <header className={`sticky top-0 xl:top-[-196px] z-[100] border-b ${reduceMotion ? '' : 'transition-colors duration-300'} ${scrolled ? 'xl:bg-transparent xl:border-transparent' : 'bg-white border-[#C9D9E8]'}`}>
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
              heavy Clash Display at 38px. Batch 20: logo MUCH bigger
              (160px) — the file is 1024x1024 but the visible mark only
              fills ~50% of it, so the mark itself reads ~85px tall,
              about double the 80px box. Batch 20 part 2 (reworked): the
              row is a plain div — it hides by scrolling away naturally,
              because the header sticks at top:-196px (this row's exact
              height). No JS animation, no unmount; the logo link is
              simply above the viewport while scrolled. */}
          <div data-testid="desktop-brand-row" className="relative flex items-center justify-center gap-4 pt-5 pb-4">
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); goHome(); }}
              className="flex items-center gap-4 shrink-0 cursor-pointer text-left"
              aria-label="Beacon Quran Institute — home"
            >
              <img src={logo} alt="Beacon Quran Institute logo" className="h-40 w-auto shrink-0" decoding="async" />
              <span className="flex flex-col leading-none min-w-0">
                <span className="font-display text-[38px] font-bold text-[#0B2E3A] whitespace-nowrap">
                  Beacon Quran Institute
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#7A7A50] mt-2">
                  Online Quran Academy
                </span>
              </span>
            </a>
            {/* Tarteel-adapt item 9 — WhatsApp contact chip, desktop brand
                row only. Absolutely positioned at the row's right edge:
                the centred logo + name is 618px wide inside the 1232px
                row, so ~307px of free space sits on each side at every
                desktop width (container caps at 1280px) — the ~170px
                chip clears the wordmark by ~135px even at 1280px
                (probe-verified, real Chromium). Brand colours only:
                teal text + olive icon on white, no WhatsApp green.
                It lives INSIDE the brand row, so it scrolls away with
                the row exactly like the logo (Batch 20 behaviour kept). */}
            <a
              href="https://wa.me/923461573771"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with Beacon Quran Institute on WhatsApp: +92 346 1573771"
              data-testid="whatsapp-chip-desktop"
              className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-2 h-11 px-4 rounded-full border border-[#C9D9E8] bg-white text-[13px] font-semibold text-[#004050] shadow-[0_6px_20px_rgba(11,46,58,0.10)] hover:border-[#7A7A50] transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 text-[#7A7A50] shrink-0" />
              <span dir="ltr">+92 346 1573771</span>
            </a>
          </div>
          {/* Row 2 — menu, moved down below the brand row into the open space
              as a centred floating pill. Same nav markup/classes as before —
              only its position changes (Batch 19). Batch 20 part 2: the pill
              is now a proper floating pill — frosted white (bg-white/90 +
              backdrop blur), deeper soft shadow — and once the page is
              scrolled the header sticks at top:-196px so the pill floats
              12px below the viewport top with the header bar itself
              transparent, so it no longer looks stuck to the page. The
              row's padding is CONSTANT (pt-3 pb-3) in both states — a
              padding change on scroll would be a layout shift, and the
              whole point of this rework is that nothing changes layout
              while scrolling. Colours still only the original brand colours. */}
          <div className="flex items-center justify-center gap-2 pt-3 pb-3">
              {/* Desktop nav pill + CTA.
                  Shown from xl (1280px) up: the 9-item pill + CTA need
                  ~1230px, so below xl the hamburger + drawer take over.
                  Batch 20: the region switcher is removed from the pill —
                  geo auto-detect already shows each visitor their own
                  country's fees, so there is no manual country switching
                  in the header any more. */}
              <div className="hidden xl:flex items-center gap-2">
                <nav
                  aria-label="Main navigation"
                  className="flex items-center gap-0.5 h-12 rounded-full border border-[#C9D9E8] bg-white/90 backdrop-blur-md px-1.5 shadow-[0_10px_30px_rgba(11,46,58,0.14)]"
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
                  {/* Tarteel-adapt item 9 — WhatsApp contact pill, bottom
                      of the mobile menu. A WhatsApp button does NOT fit
                      in the mobile header: at 360px the logo block ends
                      12px before the hamburger and the header already
                      overflows by 2px (probe-verified baseline), so the
                      menu is the only place it fits without breaking
                      Batch 18/20 behaviour. Olive pill (brand colour,
                      no WhatsApp green) with the real number; opens
                      wa.me in a new tab and closes the menu behind it. */}
                  <motion.a
                    href="https://wa.me/923461573771"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: reduceMotion ? 0 : 80 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: reduceMotion ? 0 : 80, transition: pillExit(pillCount - 1) }}
                    transition={pillEnter(pillCount - 1)}
                    aria-label="Chat with Beacon Quran Institute on WhatsApp: +92 346 1573771"
                    data-testid="whatsapp-pill-mobile"
                    className="w-full flex items-center gap-3 rounded-full px-5 py-3.5 text-[15px] font-semibold shadow-[0_12px_35px_rgba(11,46,58,0.30)] cursor-pointer bg-[#7A7A50] text-white"
                  >
                    <MessageCircle className="w-5 h-5 shrink-0 text-white" />
                    <span dir="ltr">WhatsApp: +92 346 1573771</span>
                  </motion.a>
                </nav>

                {/* X to close — bottom of the stack, MRQS-style.
                    Batch 20: the "Your Region" chip row that used to sit
                    here is removed — same reason as the desktop dropdown:
                    a visitor must only ever see their own country's
                    currency, and geo auto-detect already sets it. */}
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
