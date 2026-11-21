import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, BookOpen, Check, ChevronDown, MapPin, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import logo from '../assets/images/brand_logo.jpg';
import { useLanguage } from '../context/LanguageContext';
import { scrollToId } from '../utils/scrollToId';
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
  // page and switches the fee table to that region's currency.
  const regionLinks: { key: RegionKey; name: string; sub: string }[] = [
    { key: 'australia', name: 'Australia', sub: 'Fees in AUD' },
    { key: 'uae', name: 'UAE', sub: 'Fees in AED' },
    { key: 'saudi', name: 'Saudi Arabia', sub: 'Fees in SAR' },
    { key: 'qatar', name: 'Qatar', sub: 'Fees in QAR' },
    { key: 'europe', name: 'Europe', sub: 'Fees in EUR' },
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

  /** Go home (if needed) and scroll to a homepage section. */
  const goHomeSection = (id: string) => {
    if (currentView !== 'home') setView('home');
    scrollToId(id);
    setCoursesOpen(false);
    setCountriesOpen(false);
    setIsOpen(false);
  };

  const openCourse = (courseId: string) => {
    setCoursesOpen(false);
    setIsOpen(false);
    onViewCourse(courseId);
  };

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
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex items-center justify-between gap-4 h-[76px]">
          {/* Logo */}
          <button
            onClick={goHome}
            className="flex items-center gap-3 shrink-0 cursor-pointer text-left"
            aria-label="Beacon Quran Institute — home"
          >
            <span className="w-10 h-10 rounded-xl overflow-hidden border border-[#C9D9E8] bg-white flex items-center justify-center shrink-0">
              <img src={logo} alt="Beacon Quran Institute logo" className="w-full h-full object-cover" decoding="async" />
            </span>
            <span className="flex flex-col leading-none min-w-0">
              <span className="font-display text-[21px] font-bold text-[#0B2E3A] whitespace-nowrap">
                Beacon Quran Institute
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.32em] text-[#7A7A50] mt-1">
                Online Quran Academy
              </span>
            </span>
          </button>

          {/* Desktop nav pill + region switcher + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <nav
              aria-label="Main navigation"
              className="flex items-center gap-1 h-12 rounded-full border border-[#C9D9E8] bg-white px-2 shadow-[0_2px_10px_rgba(11,46,58,0.04)]"
            >
              <button
                onClick={goHome}
                className={`px-4 h-9 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
                  currentView === 'home' ? 'bg-[#004050] text-white' : 'text-[#0B2E3A] hover:bg-[#F2F6F9]'
                }`}
              >
                Home
              </button>

              {/* Courses dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setCountriesOpen(false);
                    setCoursesOpen((o) => !o);
                  }}
                  aria-expanded={coursesOpen}
                  aria-haspopup="true"
                  className={`px-4 h-9 rounded-full text-sm font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
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
                          <button
                            key={course.id}
                            onClick={() => openCourse(course.id)}
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
                          </button>
                        ))}
                        <button
                          onClick={() => {
                            setCoursesOpen(false);
                            if (window.location.pathname.startsWith('/courses')) {
                              window.history.replaceState(null, '', '/#courses');
                            }
                            setView('courses');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="w-full text-left px-5 py-3.5 border-t border-[#D7E3EE] hover:bg-[#F2F6F9] transition-colors text-sm font-semibold text-[#004050] flex items-center gap-2 cursor-pointer"
                        >
                          View all courses
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={() => goHomeSection('how-it-works')}
                className="px-4 h-9 rounded-full text-sm font-semibold text-[#0B2E3A] hover:bg-[#F2F6F9] transition-colors cursor-pointer whitespace-nowrap"
              >
                How It Works
              </button>
              <button
                onClick={() => goHomeSection('fees')}
                className="px-4 h-9 rounded-full text-sm font-semibold text-[#0B2E3A] hover:bg-[#F2F6F9] transition-colors cursor-pointer"
              >
                Fees
              </button>
              <button
                onClick={() => goHomeSection('registration')}
                className="px-4 h-9 rounded-full text-sm font-semibold text-[#0B2E3A] hover:bg-[#F2F6F9] transition-colors cursor-pointer"
              >
                Enrol
              </button>
              <button
                onClick={() => {
                  closeDropdowns();
                  setView('contact');
                }}
                className={`px-4 h-9 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
                  currentView === 'contact' ? 'bg-[#004050] text-white' : 'text-[#0B2E3A] hover:bg-[#F2F6F9]'
                }`}
              >
                Contact
              </button>
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
                className="flex items-center gap-1.5 px-3 h-12 rounded-full border border-[#C9D9E8] bg-white text-sm font-semibold text-[#0B2E3A] hover:bg-[#F2F6F9] transition-colors cursor-pointer"
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
                        <button
                          key={c.view}
                          onClick={() => goToCountry(c.view)}
                          className="w-full text-left px-5 py-3 hover:bg-[#F2F6F9] transition-colors flex items-center gap-3 group cursor-pointer"
                        >
                          <MapPin className="w-4 h-4 text-[#7A7A50] shrink-0" />
                          <span className="flex flex-col leading-tight flex-1">
                            <span className="text-sm font-semibold text-[#0B2E3A] group-hover:text-[#004050]">{c.name}</span>
                            <span className="text-xs text-[#3D5563]">{c.sub} {c.name === 'UK' ? 'UK' : c.name === 'USA' ? 'in the USA' : 'in Canada'}</span>
                          </span>
                          {region === c.view && <Check className="w-4 h-4 text-[#7A7A50] shrink-0" aria-label="Current region" />}
                        </button>
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
                            <span className="text-xs text-[#3D5563]">{r.sub}</span>
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

            <button
              onClick={() => goHomeSection('registration')}
              className="h-12 px-6 rounded-full bg-[#7A7A50] hover:bg-[#686844] text-white text-sm font-semibold shadow-lg shadow-[#7A7A50]/25 transition-all active:scale-[0.98] cursor-pointer flex items-center gap-2 whitespace-nowrap"
            >
              {t('nav.startLearning')}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center lg:hidden">
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
              className="fixed inset-0 lg:hidden bg-[#0B2E3A]/40 z-[105]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed top-0 bottom-0 right-0 w-[85%] max-w-[340px] lg:hidden bg-white z-[110] flex flex-col shadow-[-15px_0_60px_rgba(11,46,58,0.25)] border-l border-[#C9D9E8] overflow-hidden"
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

                <nav aria-label="Mobile navigation" className="flex flex-col py-4 space-y-1">
                  <button
                    onClick={goHome}
                    className={`text-left text-[15px] font-semibold py-3.5 px-4 rounded-xl transition-colors cursor-pointer ${
                      currentView === 'home' ? 'bg-[#F2F6F9] text-[#004050]' : 'text-[#0B2E3A] hover:bg-[#F2F6F9]'
                    }`}
                  >
                    Home
                  </button>

                  <p className="px-4 pt-3 pb-1 font-display text-[10px] font-bold uppercase tracking-[0.25em] text-[#1E4E79]">
                    Courses
                  </p>
                  {COURSES.map((course) => (
                    <button
                      key={course.id}
                      onClick={() => openCourse(course.id)}
                      className="text-left text-[15px] font-semibold py-3 px-4 pl-8 rounded-xl text-[#0B2E3A] hover:bg-[#F2F6F9] transition-colors cursor-pointer flex items-center gap-3"
                    >
                      <BookOpen className="w-4 h-4 text-[#7A7A50] shrink-0" />
                      {course.title}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      if (window.location.pathname.startsWith('/courses')) {
                        window.history.replaceState(null, '', '/#courses');
                      }
                      setView('courses');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-left text-[15px] font-semibold py-3 px-4 pl-8 rounded-xl text-[#004050] hover:bg-[#F2F6F9] transition-colors cursor-pointer"
                  >
                    View all courses →
                  </button>

                  <button
                    onClick={() => goHomeSection('how-it-works')}
                    className="text-left text-[15px] font-semibold py-3.5 px-4 rounded-xl text-[#0B2E3A] hover:bg-[#F2F6F9] transition-colors cursor-pointer"
                  >
                    How It Works
                  </button>
                  <button
                    onClick={() => goHomeSection('fees')}
                    className="text-left text-[15px] font-semibold py-3.5 px-4 rounded-xl text-[#0B2E3A] hover:bg-[#F2F6F9] transition-colors cursor-pointer"
                  >
                    Fees
                  </button>
                  <button
                    onClick={() => goHomeSection('registration')}
                    className="text-left text-[15px] font-semibold py-3.5 px-4 rounded-xl text-[#0B2E3A] hover:bg-[#F2F6F9] transition-colors cursor-pointer"
                  >
                    Enrol
                  </button>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setView('contact');
                    }}
                    className={`text-left text-[15px] font-semibold py-3.5 px-4 rounded-xl transition-colors cursor-pointer ${
                      currentView === 'contact' ? 'bg-[#F2F6F9] text-[#004050]' : 'text-[#0B2E3A] hover:bg-[#F2F6F9]'
                    }`}
                  >
                    Contact
                  </button>
                </nav>

                {/* Region switcher */}
                <div className="pt-4 mt-2 border-t border-[#D7E3EE]">
                  <p className="px-4 pb-2 font-display text-[10px] font-bold uppercase tracking-[0.25em] text-[#1E4E79]">
                    Study in Your Country
                  </p>
                  {countryLinks.map((c) => (
                    <button
                      key={c.view}
                      onClick={() => goToCountry(c.view)}
                      className="text-[15px] font-semibold py-3 px-4 rounded-xl transition-colors flex items-center gap-3 w-full text-left text-[#0B2E3A] hover:bg-[#F2F6F9] cursor-pointer"
                    >
                      <MapPin className="w-4 h-4 text-[#7A7A50] shrink-0" />
                      <span className="flex-1">{c.name} — {c.sub}</span>
                      {region === c.view && <Check className="w-4 h-4 text-[#7A7A50] shrink-0" aria-label="Current region" />}
                    </button>
                  ))}
                  <p className="px-4 pt-3 pb-2 font-display text-[10px] font-bold uppercase tracking-[0.25em] text-[#1E4E79]">
                    More Regions
                  </p>
                  {regionLinks.map((r) => (
                    <button
                      key={r.key}
                      onClick={() => goToRegion(r.key)}
                      className="text-[15px] font-semibold py-3 px-4 rounded-xl transition-colors flex items-center gap-3 w-full text-left text-[#0B2E3A] hover:bg-[#F2F6F9] cursor-pointer"
                    >
                      <MapPin className="w-4 h-4 text-[#7A7A50] shrink-0" />
                      <span className="flex-1">{r.name} — {r.sub}</span>
                      {region === r.key && <Check className="w-4 h-4 text-[#7A7A50] shrink-0" aria-label="Current region" />}
                    </button>
                  ))}
                </div>

                <div className="pt-6 mt-auto">
                  <button
                    onClick={() => goHomeSection('registration')}
                    className="w-full bg-[#7A7A50] hover:bg-[#686844] text-white h-12 rounded-full font-semibold text-sm shadow-lg shadow-[#7A7A50]/25 transition-all active:scale-[0.98] cursor-pointer"
                  >
                    {t('nav.startLearning')}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
