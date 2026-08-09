import { motion } from 'motion/react';
import { Sparkles, BookOpen } from 'lucide-react';
import brandLogo from '../assets/images/brand_logo.jpg';
import { useLanguage } from '../context/LanguageContext';

export default function LuxuryPreloader({ fullPage = false }: { fullPage?: boolean }) {
  const { isAr } = useLanguage();

  return (
    <div className={`${fullPage ? 'fixed inset-0 z-[99999]' : 'min-h-[60vh] w-full'} bg-[#030d12]/95 backdrop-blur-3xl flex flex-col items-center justify-center p-6 text-amber-50 select-none overflow-hidden`}>
      
      {/* Background Radial Glow */}
      <div className="absolute w-[450px] h-[450px] bg-[#084C63]/30 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute w-[280px] h-[280px] bg-[#757454]/20 rounded-full blur-[80px] pointer-events-none" />

      {/* Main Luxury Emblem Container */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-md w-full">
        
        {/* Animated Brand Logo Ring */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-8"
        >
          {/* Outer Pulsating Ring */}
          <div className="absolute -inset-4 rounded-full border border-amber-300/30 animate-ping opacity-20 pointer-events-none" />
          <div className="absolute -inset-2 rounded-full border-2 border-[#757454]/60 shadow-[0_0_35px_rgba(252,211,77,0.35)]" />

          {/* Logo Frame */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-amber-300/80 shadow-2xl bg-[#051b23] flex items-center justify-center p-1 relative z-10">
            <img 
              src={brandLogo} 
              alt="Beacon Quran Institute" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          {/* Bottom Floating Sparkle Badge */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-20 bg-[#084C63] border border-amber-300/80 px-3 py-0.5 rounded-full shadow-lg flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="display text-[8.5px] font-extrabold uppercase tracking-widest text-amber-200">
              BEACON
            </span>
          </div>
        </motion.div>

        {/* Sacred Bismillah Calligraphy Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4 text-center"
        >
          <p className="font-serif italic text-lg sm:text-xl text-amber-200/90 tracking-wide drop-shadow">
            «بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ»
          </p>
        </motion.div>

        {/* Brand Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-1 mb-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold display text-amber-50 tracking-tight">
            {isAr ? "معهد المنار للقرآن الكريم" : "Beacon Quran Institute"}
          </h2>
          <p className="text-xs text-amber-100/75 font-medium tracking-wider uppercase">
            {isAr ? "التعليم القرآني الرقمي العالمي المتميز" : "Premier Global Quranic Academy"}
          </p>
        </motion.div>

        {/* Laser Glow Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full max-w-[240px] h-1.5 bg-white/10 rounded-full overflow-hidden relative border border-white/10 shadow-inner mb-4"
        >
          <div 
            className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#084C63] via-[#FCD34D] to-[#757454] rounded-full animate-pulse"
            style={{ 
              width: '100%',
              animation: 'shimmerProgress 2s ease-in-out infinite' 
            }}
          />
        </motion.div>

        {/* Subtitle Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-2 text-[10.5px] font-semibold text-amber-200/80 tracking-widest uppercase"
        >
          <BookOpen className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
          <span>{isAr ? "جاري تحضير التجربة التعليمية..." : "Preparing Sacred Knowledge..."}</span>
        </motion.div>

      </div>
    </div>
  );
}
