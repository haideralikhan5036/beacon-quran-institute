import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, User, Phone, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import logo from '../assets/images/brand_logo.jpg';
import { useLanguage } from '../context/LanguageContext';

import { ViewState } from '../App';

export default function Navbar({ setView, currentView }: { setView: (view: ViewState) => void, currentView: ViewState }) {
  const { language, setLanguage, t, isAr } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
    { key: 'nav.about', name: 'About', view: 'home', href: '#about' },
    { key: 'nav.courses', name: 'Courses', view: 'home', href: '#courses' },
    { key: 'nav.services', name: 'Services', view: 'services', href: '#services' },
    { key: 'nav.blog', name: 'Blog', view: 'blog', href: '#blog' },
    { key: 'nav.testimonials', name: 'Testimonials', view: 'testimonials', href: '#reviews' },
    { key: 'nav.contact', name: 'Contact', view: 'home', href: '#contact' },
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
              <div className="w-14 h-14 flex items-center justify-center relative p-0 overflow-hidden group-hover:bg-accent/10 rounded-2xl transition-all duration-700 transform group-hover:scale-110">
                <img src={logo} alt="Beacon Quran Institute Logo" className="w-full h-full object-contain" decoding="async" />
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="flex flex-col leading-tight">
                 <h1 className={`font-bold display tracking-tight uppercase transition-all duration-700 text-lg text-amber-100`}>
                   BEACON <span className="text-accent font-normal">QURAN</span> INSTITUTE
                 </h1>
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
                    scrolled || isOpen ? 'text-primary' : 'text-primary/70'
                  }`}
                >
                  {t(link.key)}
                </button>
              ))}
            </div>



            <motion.button 
              onClick={() => { setView('home'); setTimeout(() => { const el = document.getElementById('registration'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }, 150); }}
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
              className="fixed inset-0 lg:hidden bg-gradient-to-tr from-primary/60 via-black/80 to-black/95 backdrop-blur-xl z-[105] overflow-hidden"
            >
              {/* Subtle texture for the backdrop to make it more visually interesting */}
              <div 
                className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
                style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/arabic-overlay.png")' }}
              />
              <div className="absolute inset-0 bg-radial-at-tr from-accent/5 to-transparent pointer-events-none" />
            </motion.div>
            
            {/* Drawer */}
            <motion.div
              initial={{ x: isAr ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: isAr ? '-100%' : '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200, mass: 1 }}
              className={`fixed top-0 bottom-0 w-[85%] max-w-sm lg:hidden bg-[#0a1a0f]/98 backdrop-blur-xl z-[110] flex flex-col shadow-[-20px_0_100px_rgba(0,0,0,0.9)] border-accent/30 overflow-hidden ${
                isAr ? 'left-0 border-r border-l-0' : 'right-0 border-l border-r-0'
              }`}
            >
              {/* Added subtle depth with a gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-black/30 pointer-events-none" />
              <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/arabic-overlay.png")' }}></div>
              
              <div className="relative flex-1 flex flex-col z-10">
                <div className="flex justify-between items-center p-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-white/5 rounded-2xl p-1 overflow-hidden">
                      <img src={logo} alt="Logo" className="w-full h-full object-contain" decoding="async" />
                    </div>
                    <div className="flex flex-col leading-none text-left">
                      <span className="text-[10px] font-black uppercase tracking-widest text-white tracking-[0.2em]">BEACON QURAN</span>
                      <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-accent">Institute</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-accent hover:bg-white/20 transition-colors"
                  >
                    <motion.div 
                      className="relative w-6 h-6"
                    >
                      <div className="absolute top-3 left-0 w-6 h-0.5 bg-current rotate-45" />
                      <div className="absolute top-3 left-0 w-6 h-0.5 bg-current -rotate-45" />
                    </motion.div>
                  </button>
                </div>

                <div className="flex-1 flex flex-col gap-2 p-10 pt-4">
                  <div className={`mb-10 ${isAr ? 'text-right' : 'text-left'}`}>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent block mb-2 opacity-80">{isAr ? 'البوابات والأقسام' : 'Menu Exploration'}</span>
                    <div className={`h-[2px] w-12 bg-accent ${isAr ? 'mr-0 ml-auto' : 'ml-0'}`} />
                  </div>

                  <div className="space-y-4">
                    {navLinks.map((link, idx) => (
                      <motion.button
                        key={link.key}
                        initial={{ opacity: 0, x: isAr ? -50 : 50, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                        transition={{ 
                          delay: 0.2 + idx * 0.08,
                          duration: 0.6,
                          ease: [0.16, 1, 0.3, 1] 
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setView(link.view as ViewState);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                          setIsOpen(false);
                        }}
                        className={`text-2xl sm:text-3xl font-bold serif tracking-tight py-2 transition-all flex items-center gap-6 group w-full ${
                          isAr ? 'text-right flex-row-reverse' : 'text-left'
                        } ${
                          currentView === link.view ? 'text-accent' : 'text-white/90 hover:text-accent'
                        }`}
                      >
                        <div className={`w-3 h-[1px] bg-accent transition-all duration-500 ${currentView === link.view ? 'w-8' : 'w-3 opacity-30 group-hover:w-8 group-hover:opacity-100'}`} />
                        {t(link.key)}
                      </motion.button>
                    ))}
                  </div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-auto pt-10"
                  >
                    <button 
                      onClick={() => { setView('home'); setIsOpen(false); setTimeout(() => { const el = document.getElementById('registration'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }, 150); }}
                      className="w-full bg-accent text-white p-5 rounded-full font-bold text-xs uppercase tracking-[0.2em] shadow-2xl shadow-accent/30 flex items-center justify-center gap-3 active:scale-95 transition-all hover:translate-y-[-2px]"
                    >
                      {t('nav.startLearning')}
                      <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
                    </button>
                    <p className="text-center mt-6 text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">Secure Registration Portal</p>
                  </motion.div>
                </div>

                <div className={`p-10 border-t border-white/10 bg-black/20 flex justify-between items-center mt-auto ${isAr ? 'flex-row-reverse' : ''}`}>
                   <div className="flex gap-6">
                     <Phone className="w-5 h-5 text-accent hover:scale-110 transition-transform cursor-pointer" />
                     <BookOpen className="w-5 h-5 text-accent hover:scale-110 transition-transform cursor-pointer" />
                   </div>
                   <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Beacon Quran v1.2</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </nav>
  );
}
