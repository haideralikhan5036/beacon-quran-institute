import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Star, X } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Ahmed",
    location: "United Kingdom",
    text: "My children have improved their Tajweed significantly in just 3 months. The teachers are so patient!",
    avatar: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    name: "Omar Farooq",
    location: "USA",
    text: "The 1-on-1 sessions are perfect for my busy schedule. Highly professional institute.",
    avatar: "https://i.pravatar.cc/150?u=omar"
  },
  {
    name: "Fatima Zahra",
    location: "Canada",
    text: "I finally found a female teacher who explains the Tafsir with such clarity. Highly recommended!",
    avatar: "https://i.pravatar.cc/150?u=fatima"
  },
  {
    name: "Yusuf Khan",
    location: "Australia",
    text: "Noorani Qaida course helped my 5-year old start reading Quran with confidence. Thank you Beacon!",
    avatar: "https://i.pravatar.cc/150?u=yusuf"
  }
];

const colors = [
  'bg-[#EAF1F7] text-[#004050]',
  'bg-[#F4F8FB] text-[#1E4E79]',
  'bg-[#F7F5EF] text-[#7A7A50]',
  'bg-[#EAF1F7] text-[#004050]',
  'bg-[#F4F8FB] text-[#1E4E79]',
  'bg-[#F7F5EF] text-[#7A7A50]'
];

export default function TestimonialPopup() {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasScrolledPastHero, setHasScrolledPastHero] = useState(false);

  const currentTestimonial = testimonials[index];
  const initial = currentTestimonial.name.charAt(0);
  const colorClass = colors[index % colors.length];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setHasScrolledPastHero(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!hasScrolledPastHero) return;

    let timeoutId: NodeJS.Timeout;

    const showTestimonial = () => {
      setIsVisible(true);
      // Stay visible for 7 seconds
      timeoutId = setTimeout(() => {
        setIsVisible(false);
        // Then stay hidden for 10 seconds (the gap)
        timeoutId = setTimeout(() => {
          setIndex((prev) => (prev + 1) % testimonials.length);
          showTestimonial();
        }, 10000);
      }, 7000);
    };

    // Initial wait before starting the cycle
    const initialDelay = setTimeout(showTestimonial, 3000);

    return () => {
      clearTimeout(initialDelay);
      clearTimeout(timeoutId);
    };
  }, [hasScrolledPastHero]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed bottom-6 left-6 z-[100] w-[280px] max-w-[calc(100vw-3rem)] bg-[#FFFFFF] border border-[#C9D9E8] rounded-3xl shadow-[0_20px_60px_rgba(11,46,58,0.18)] p-5 text-[#0B2E3A] flex gap-4 overflow-hidden group"
        >
          {/* Subtle Progress Bar */}
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 7, ease: "linear" }}
            className="absolute bottom-0 left-0 h-0.5 bg-[#7A7A50]"
          />

          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-3 right-3 p-1.5 bg-[#F4F8FB] rounded-full text-[#3D5563] hover:text-[#0B2E3A] hover:bg-[#EAF1F7] transition-all opacity-0 group-hover:opacity-100"
          >
            <X className="w-3 h-3" />
          </button>

          <div className="relative shrink-0 flex items-center">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm uppercase shadow-sm border border-[#C9D9E8] ${colorClass}`}>
              {initial}
            </div>
          </div>

          <div className="flex flex-col min-w-0 pr-2">
            <div className="flex gap-0.5 mb-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-2.5 h-2.5 fill-[#7A7A50] text-[#7A7A50]" />
              ))}
            </div>
            <p className="text-[12px] text-[#0B2E3A] font-medium leading-[1.5] mb-2 line-clamp-2 italic">
              "{currentTestimonial.text}"
            </p>
            <div className="flex items-center gap-2">
              <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase tracking-wider text-[#0B2E3A]">
                  {currentTestimonial.name}
                </span>
                <span className="text-[8px] uppercase tracking-tight text-[#3D5563] font-bold">
                  {currentTestimonial.location}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
