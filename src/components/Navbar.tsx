import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, User, Phone, ArrowRight, ChevronDown, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import logo from '../assets/images/brand_logo.jpg';
import { useLanguage } from '../context/LanguageContext';
import { scrollToId } from '../utils/scrollToId';

import { ViewState } from '../App';

export default function Navbar({ setView, currentView }: { setView: (view: ViewState) => void, currentView: ViewState }) {
  const { language, setLanguage, t, isAr } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [countriesOpen, setCountriesOpen] = useState(false);

  // Country landing pages (real paths /usa, /uk, /canada — SEO Batch 2).
  const countryLinks = [
    { name: 'USA', sub: 'Online Quran Classes', view: 'usa' as const },
    { name: 'UK', sub: 'Online Quran Classes', view: 'uk' as const },
    { name: 'Canada', sub: 'Online Quran Classes', view: 'canada' as const },
  ];

  const goToCountry = (view: 'usa' | 'uk' | 'canada') => {
    setView(view);
    setCountriesOpen(false);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.remove('dark');
      localStorage.removeItem('theme');
    }
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { key: 'nav.home', name: 'Home', view: 'home', href: '#' },
    { key: 'nav.about', name: 'About', view: 'about', href: '#' },
    { key: 'nav.courses', name: 'Courses', view: 'courses', href: '#courses' },
    { key: 'nav.services', name: 'Services', view: 'services', href: '#services' },
    { key: 'nav.blog', name: 'Blog', view: 'blog', href: '#blog' },
    { key: 'nav.testimonials', name: 'Testimonials', view: 'testimonials', href: '#reviews' },
    { key: 'nav.contact', name: 'Contact', view: 'contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-700 ease-out ${
      isOpen 
        ? 'py-4 bg-[#0a1a0f]/95 backdrop-blur-md border-b border-accent/30' 
        : scrolled 
          ? 'py-4 bg-black/50 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-accent/20' 
          : 'py-6 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center px-4">
          {/* Logo area */}
          <div 
            className="flex items-center gap-4 cursor-pointer group" 
            onClick={() => { setView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); setIsOpen(false); }}
          >
            <div className={`relative transition-all duration-700 ${scrolled || isOpen ? 'scale-90' : 'scale-100'}`}>
              <div className="w-14 h-14 flex items-center justify-center relative p-1 overflow-hidden bg-[#051b23] border border-[#757454]/50 group-hover:bg-[#084C63] rounded-2xl transition-all duration-700 transform group-hover:scale-110">
                <img src={logo} alt="Beacon Quran Institute Logo" className="w-full h-full object-contain" decoding="async" />
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="flex flex-col leading-tight">
                 <div className={`font-bold display tracking-tight uppercase transition-all duration-700 text-lg text-amber-100`}>
                   BEACON <span className="text-accent font-semibold">QURAN</span> INSTITUTE
                 </div>
              </div>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.key}
                  onClick={() => {
                    setView(link.view as ViewState);
                    if (link.href.startsWith('#')) {
                      const id = link.href.substring(1);
                      if (id) {
                         setTimeout(() => {
                           const el = document.getElementById(id);
                           if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                         }, 100);
                      }
                    } else {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className={`relative px-3 py-2 font-bold transition-all duration-500 hover:text-accent ${
                    isAr ? 'text-[12.5px] tracking-normal font-semibold' : 'text-[10px] uppercase tracking-[0.2em]'
                  } ${
                    scrolled || isOpen ? 'text-amber-100' : 'text-amber-100/80'
                  }`}
                >
                  {t(link.key)}
                </button>
              ))}
            </div>

            {/* Countries dropdown — USA / UK / Canada landing pages */}
            <div className="relative">
              <button
                onClick={() => setCountriesOpen((o) => !o)}
                className={`relative px-3 py-2 font-bold transition-all duration-500 hover:text-accent flex items-center gap-1.5 ${
                  isAr ? 'text-[12.5px] tracking-normal font-semibold' : 'text-[10px] uppercase tracking-[0.2em]'
                } ${
                  scrolled || isOpen ? 'text-amber-100' : 'text-amber-100/80'
                }`}
              >
                {isAr ? 'الدول' : 'Countries'}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${countriesOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {countriesOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setCountriesOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 w-72 z-20 bg-[#051b23]/95 backdrop-blur-md border border-[#757454]/40 rounded-2xl shadow-2xl overflow-hidden"
                    >
                      <p className="px-5 pt-4 pb-2 display text-[9px] font-extrabold uppercase tracking-[0.3em] text-amber-200/70">
                        {isAr ? 'ادرس في بلدك' : 'Study in Your Country'}
                      </p>
                      {countryLinks.map((c) => (
                        <button
                          key={c.view}
                          onClick={() => goToCountry(c.view)}
                          className="w-full text-left px-5 py-3 hover:bg-[#084C63]/60 transition-colors flex items-center gap-3 group"
                        >
                          <MapPin className="w-4 h-4 text-amber-200 shrink-0" />
                          <span className="flex flex-col leading-tight">
                            <span className="text-sm font-bold text-amber-50 group-hover:text-white">{c.name}</span>
                            <span className="text-[11px] text-amber-100/70">{c.sub} {c.name === 'UK' ? 'UK' : c.name === 'USA' ? 'in the USA' : 'in Canada'}</span>
                          </span>
                        </button>
                      ))}
                      <div className="h-2" />
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <motion.button 
              onClick={() => { setView('home'); scrollToId('registration'); }}
              whileHover="hover"
              whileTap="tap"
              initial="initial"
              variants={{
                initial: { scale: 1, y: 0 },
                hover: { 
                  scale: 1.05, 
                  y: -2,
                  boxShadow: scrolled 
                    ? '0 20px 25px -5px rgba(27,84,61,0.25), 0 8px 10px -6px rgba(27,84,61,0.25)' 
                    : '0 20px 25px -5px rgba(27,84,61,0.15), 0 8px 10px -6px rgba(27,84,61,0.15)'
                },
                tap: { scale: 0.95, y: 0 }
              }}
              transition={{ type: "spring", stiffness: 450, damping: 20 }}
              className={`relative group overflow-hidden font-bold rounded-full transition-colors duration-500 ${
                isAr ? 'text-[11.5px] px-6 py-2.5 font-semibold' : 'text-[10px] uppercase tracking-[0.2em] px-7 py-3'
              } ${
                scrolled 
                  ? 'bg-primary text-white' 
                  : 'bg-primary text-white shadow-xl shadow-primary/10'
              }`}
            >
              <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] bg-white" />
              
              {/* Premium shining shimmer effect */}
              <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none z-20" style={{ animationDuration: '1.2s' }} />

              <span className={`relative z-10 flex items-center gap-2 group-hover:text-primary transition-colors duration-500 ${isAr ? 'flex-row-reverse' : ''}`}>
                {t('nav.startLearning')}
                <motion.span
                  variants={{
                    initial: { x: 0 },
                    hover: { x: isAr ? -4 : 4 }
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 12 }}
                  className="inline-block"
                >
                  <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
                </motion.span>
              </span>
            </motion.button>
          </div>

          {/* Mobile menu buttons */}
          <div className="flex items-center gap-3 lg:hidden z-[110]">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="w-12 h-12 flex flex-col items-center justify-center gap-1.5 relative group"
            >
              <div className={`h-0.5 bg-accent transition-all duration-300 rounded-full ${isOpen ? 'w-8 rotate-45 translate-y-2' : 'w-6'}`} />
              <div className={`h-0.5 bg-accent transition-all duration-300 rounded-full ${isOpen ? 'opacity-0' : 'w-8'}`} />
              <div className={`h-0.5 bg-accent transition-all duration-300 rounded-full ${isOpen ? 'w-8 -rotate-45 -translate-y-2' : 'w-4'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Side Drawer with Backdrop */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 lg:hidden bg-gradient-to-tr from-black/80 via-black/70 to-black/80 z-[105]"
              style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
            />

            {/* Compact Mobile Menu - Floating Glass Sheet Drawer */}
            <motion.div
              initial={{ x: isAr ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: isAr ? '-100%' : '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className={`fixed top-0 bottom-0 w-[85%] max-w-[320px] lg:hidden bg-[#051b23]/95 z-[110] flex flex-col shadow-[-15px_0_60px_rgba(0,0,0,0.95)] border-l border-[#949693]/20 overflow-hidden will-change-transform ${
                isAr ? 'left-0 rounded-r-[2rem]' : 'right-0 rounded-l-[2rem]'
              }`}
            >
              {/* Subtle ambient brand glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#084C63]/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative flex-1 flex flex-col z-10 p-6">
                {/* Header: Logo & Compact Close */}
                <div className={`flex justify-between items-center pb-6 border-b border-white/5 ${isAr ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-center gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
                    <div className="w-10 h-10 bg-[#051b23] rounded-xl p-1 overflow-hidden border border-[#757454]/50">
                      <img src={logo} alt="Beacon Quran Institute logo" className="w-full h-full object-contain" decoding="async" />
                    </div>
                    <div className={`flex flex-col leading-none ${isAr ? 'text-right' : 'text-left'}`}>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-50">BEACON</span>
                      <span className="text-[8px] uppercase tracking-widest text-amber-200/60">Institute</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-amber-100 hover:bg-white/10 active:scale-90 transition-all"
                  >
                    <div className="relative w-4 h-4">
                      <div className="absolute top-2 left-0 w-4 h-0.5 bg-current rotate-45" />
                      <div className="absolute top-2 left-0 w-4 h-0.5 bg-current -rotate-45" />
                    </div>
                  </button>
                </div>

                {/* Nav Links Section */}
                <div className="flex-1 flex flex-col justify-center py-4 space-y-1">
                  {navLinks.map((link, idx) => (
                    <motion.button
                      key={link.key}
                      initial={{ opacity: 0, x: isAr ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + idx * 0.03, duration: 0.3 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setView(link.view as ViewState);
                        if (link.href.startsWith('#')) {
                          const id = link.href.substring(1);
                          if (id) {
                            setTimeout(() => {
                              const el = document.getElementById(id);
                              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }, 100);
                          }
                        } else {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                        setIsOpen(false);
                      }}
                      className={`text-[15px] font-semibold py-4 px-4 rounded-xl transition-all flex items-center gap-4 group w-full ${
                        isAr ? 'text-right flex-row-reverse' : 'text-left'
                      } ${
                        currentView === link.view
                          ? 'bg-[#084C63]/40 text-amber-100'
                          : 'text-amber-100/70 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        currentView === link.view ? 'bg-amber-400' : 'bg-white/20'
                      }`} />
                      <span className="flex-1">{t(link.key)}</span>
                    </motion.button>
                  ))}
                </div>

                {/* Study in Your Country — USA / UK / Canada */}
                <div className="pt-4 mt-2 border-t border-white/5">
                  <p className="px-4 pb-2 display text-[9px] font-extrabold uppercase tracking-[0.3em] text-amber-200/70">
                    {isAr ? 'ادرس في بلدك' : 'Study in Your Country'}
                  </p>
                  {countryLinks.map((c) => (
                    <button
                      key={c.view}
                      onClick={() => goToCountry(c.view)}
                      className="text-[15px] font-semibold py-3 px-4 rounded-xl transition-all flex items-center gap-4 group w-full text-left text-amber-100/70 hover:bg-white/5 hover:text-white"
                    >
                      <MapPin className="w-4 h-4 text-amber-200 shrink-0" />
                      <span className="flex-1">{c.name} — {c.sub}</span>
                    </button>
                  ))}
                </div>

                {/* Language Switcher & CTA */}
                <div className="pt-6 border-t border-white/5 space-y-4">
                  <button
                    onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                    className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-[12px] font-bold text-amber-100 transition-all active:scale-95"
                  >
                    {language === 'en' ? 'Switch to Arabic (العربية)' : 'Switch to English'}
                  </button>

                  <button
                    onClick={() => { setView('home'); setIsOpen(false); scrollToId('registration'); }}
                    className="w-full bg-[#084C63] text-white py-4 rounded-xl font-bold text-[13px] uppercase tracking-wider shadow-lg hover:bg-[#757454] active:scale-95 transition-all"
                  >
                    {t('nav.startLearning')}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </nav>
  );
}
