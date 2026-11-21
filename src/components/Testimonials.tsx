import { motion } from 'motion/react';
import { Star, Quote, ArrowRight, ArrowLeft, Sparkles, ChevronUp, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Reveal } from './ui/Reveal';
import Breadcrumbs from './Breadcrumbs';

const allTestimonials = [
  { name: "Sarah Ahmed", location: "United Kingdom", text: "The Noorani Qaida course has been a blessing for my 6-year-old. The teacher is incredibly patient and uses engaging methods that keep my daughter excited for every session." },
  { name: "Omar Farooq", location: "USA", text: "I wanted to improve my Tajweed for years. Beacon Quran Institute provided me with an Ijazah certified teacher who corrected my pronunciation in just a few months." },
  { name: "Fatima Zahra", location: "Canada", text: "The flexibility of the classes is what makes this institute stand out. Being a working professional, I can attend my classes at 9 PM after my duties." },
  { name: "Yusuf Khan", location: "Australia", text: "Noorani Qaida course helped my 5-year old start reading Quran with confidence. Thank you Beacon!" },
  { name: "Aisha Malik", location: "UAE", text: "Truly blessed to have found this institute. The Female teachers are highly qualified and very professional." },
  { name: "Zaid Ibrahim", location: "Germany", text: "Their Arabic course for kids is excellent. My son is learning grammar and vocabulary so naturally." },
  { name: "Maryum Siddiqui", location: "Norway", text: "Memorizing Quran was my dream. With their Hifz program, I have completed 5 Juz in 6 months with perfect tajweed." },
  { name: "Bilal Hassan", location: "Qatar", text: "The trial classes were so convincing that I enrolled my entire family. Highly recommended for all ages." },
  { name: "Hoda Mansour", location: "Egypt", text: "Even though I am an Arab, I wanted to polish my tajweed. The scholars here are top-notch." },
  { name: "Sami Ullah", location: "Pakistan", text: "An excellent platform for those living abroad to stay connected with their roots and the Quran." },
  { name: "Zainab Ali", location: "Sweden", text: "Islamic Studies for kids is very comprehensive. My kids love learning about Seerah." },
  { name: "Hamza Ahmed", location: "UK", text: "Professionalism at its best. The portal makes it easy to track progress." },
  { name: "Areeba Noor", location: "Singapore", text: "The best online Quran teaching experience. Extremely reliable and high quality video calls." },
  { name: "Mustafa Kamal", location: "Turkey", text: "I have recommended this to all my friends in the community. God bless the Beacon team." },
  { name: "Safiya Begum", location: "South Africa", text: "Teachers are very punctual and the sessions are always productive." },
  { name: "Ibrahim Khalil", location: "Jordan", text: "The structured approach to Hifz is very effective for long term retention." },
  { name: "Nadia Hussain", location: "Belgium", text: "My toddler started with basic alphabets and now he can read small words correctly. Amazing progress." },
  { name: "Rizwan Shah", location: "Italy", text: "Great experience with the Tajweed course. The rules are explained very simply." },
  { name: "Sumayya Aziz", location: "Holland", text: "We love our weekly sessions. It's like having a personal tutor at home." },
  { name: "Asad Mehmood", location: "Saudi Arabia", text: "Very consistent service. I haven't missed a single class in a year." },
  { name: "Laila Sherwani", location: "Oman", text: "The female tutor is very humble and knowledgeable. I feel very comfortable." },
  { name: "Khalid Aziz", location: "Kuwait", text: "Excellent customer support. They always listen and adjust to our schedules." },
  { name: "Noor Fatima", location: "Bahrain", text: "Learning Quran has never been this accessible and easy. Thank you Beacon Quran." },
  { name: "Tariq Mahmood", location: "Denmark", text: "Our kids have improved their manners along with Quranic knowledge. 5 stars!" },
  { name: "Amira Javeed", location: "France", text: "The curriculum is very well designed for non-native speakers." },
  { name: "Saad Rahman", location: "Switzerland", text: "I enjoy the 1-on-1 interaction. It allows for personalized attention to my weak areas." },
  { name: "Farah Naz", location: "Thailand", text: "A great service for busy families. Extremely flexible and accommodating." },
  { name: "Yahya Ahmed", location: "Malaysia", text: "Quality education with affordable prices. Truly a gift for the Ummah." },
  { name: "Sana Tariq", location: "Ireland", text: "Finding good Quran teachers in Ireland was tough until we found Beacon." },
  { name: "Usman Ghani", location: "Korea", text: "Reliable internet connection and great audio/video quality during classes." },
  { name: "Muna Ibrahim", location: "Finland", text: "An enlightening experience. My understanding of Quranic verses has deepened." },
  { name: "Hassan Raza", location: "Spain", text: "Fast progress and high engagement. My daughter loves her Quran teacher." },
  { name: "Ayesha Noor", location: "New Zealand", text: "Highly ethical and dedicated staff. We feel part of a community here." },
  { name: "Mansoor Ali", location: "Austria", text: "Teachers are masters of their craft. Tajweed rules have become so clear now." },
  { name: "Lubna Shah", location: "Poland", text: "The Hifz tracker helps me stay motivated every day. Excellent tool." },
  { name: "Bashir Khan", location: "Portugal", text: "The trial sessions were fantastic. Enrolled immediately after." },
  { name: "Salma Yusuf", location: "Hungary", text: "Very friendly environment for kids. They learn while having fun." },
  { name: "Kamran Siddiqui", location: "Greece", text: "Individualized learning plans made all the difference for my son." },
  { name: "Rabia Basri", location: "Japan", text: "Incredible support system. The staff is always ready to help." },
  { name: "Mahmood Arshad", location: "Russia", text: "The best investment for my children's future. Authentic knowledge." },
  { name: "Zeba Bakhtiar", location: "Ukraine", text: "Professional and empathetic teachers. The best online Quran institute." },
  { name: "Adnan Sami", location: "Latvia", text: "I appreciate the detailed feedback provided after every week." },
  { name: "Sadia Imam", location: "Estonia", text: "Consistency and quality are the two words that define Beacon Quran." },
  { name: "Jawad Sheikh", location: "Luxembourg", text: "Convenient and comprehensive classes for busy working parents." },
  { name: "Asma Abbas", location: "Mexico", text: "Wonderful teachers who really care about the student's progress." }
];

const randomPictures = [
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=120", // Emerald hills
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=120", // Deep forest
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=120", // Peaceful beach
  "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=120", // Quiet plant
  "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=120", // Blue-gold fluid art
  "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&q=80&w=120", // Cosmic space
  "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=120", // Islamic architecture arch
  "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80&w=120", // Classical archways
  "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=120", // Geometric structure
  "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=120", // Light beams
  "https://images.unsplash.com/photo-1472214222541-d510753a4907?auto=format&fit=crop&q=80&w=120", // Golden sunset field
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=120", // Green mountain valleys
  "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=120", // Abstract painting
  "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&q=80&w=120", // Nebula
  "https://images.unsplash.com/photo-1547234935-80c7145ec969?auto=format&fit=crop&q=80&w=120", // Soft dessert dunes
  "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=120"  // Sunny stone textures
];

function TestimonialAvatar({ name, index }: { name: string, index: number }) {
  const imageUrl = randomPictures[index % randomPictures.length];

  return (
    <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(11,46,58,0.2)] shrink-0 border border-[#C9D9E8] relative group-hover:border-[#7A7A50]/40 transition-colors duration-500">
      <img
        src={imageUrl}
        alt={name}
        referrerPolicy="no-referrer"
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
    </div>
  );
}

export default function Testimonials({ full = false, setView }: { full?: boolean; setView?: (view: any) => void }) {
  const testimonialsList = allTestimonials;
  const [loading, setLoading] = useState(true);
  const displayTestimonials = full ? testimonialsList : testimonialsList.slice(0, 4);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    if (full) window.scrollTo(0, 0);
    return () => clearTimeout(timer);
  }, [full]);

  // Autoplay vertical rotation
  useEffect(() => {
    if (loading || isPaused || displayTestimonials.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % displayTestimonials.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [displayTestimonials.length, loading, isPaused]);

  const sectionSub = "Student Testimonials";
  const sectionTitle = full
    ? "The Complete Voice of Our Community"
    : "Stories of Spiritual Growth";

  const sectionDesc = full
    ? `Explore the collective experience of ${allTestimonials.length} students who found their light at Beacon.`
    : "Join a global family of learners who have transformed their lives through the light of the Holy Quran.";

  const backText = "Back to Institute";
  const readAllButtonText = `Read All ${testimonialsList.length} Stories`;

  return (
    <section id="reviews" className={`relative overflow-hidden bg-[#FFFFFF] ${full ? 'min-h-screen pt-32 sm:pt-36 pb-16 sm:pb-20' : 'py-16 sm:py-20'}`}>
      <div className="max-w-[1280px] mx-auto px-6">
        {full && (
           <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Testimonials' }]} />
        )}
        {full && (
           <button
             onClick={() => setView?.('home')}
             className="group flex items-center gap-3 text-[#3D5563] hover:text-[#004050] font-display text-[11px] font-bold uppercase tracking-[0.2em] transition-all mb-8 mr-auto cursor-pointer"
           >
             <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
             {backText}
           </button>
        )}
        <div className="text-center mb-12 sm:mb-16 relative">
          <Reveal delay={0.1} width="100%">
            <div className="bg-[#FFFFFF] border border-[#C9D9E8] p-6 sm:p-9 rounded-3xl max-w-3xl mx-auto text-center mb-16 shadow-[0_10px_30px_rgba(11,46,58,0.06)]">
              <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-[#EAF1F7] border border-[#C9D9E8] mb-4">
                <Sparkles className="w-4 h-4 text-[#7A7A50]" />
                <h2 className="font-display text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#004050]">{sectionSub}</h2>
              </div>
              {full ? (
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display text-[#0B2E3A] mb-4 text-balance">
                  {sectionTitle}
                </h1>
              ) : (
                <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display text-[#0B2E3A] mb-4 text-balance">
                  {sectionTitle}
                </h3>
              )}
              <p className="text-[#3D5563] max-w-xl mx-auto text-base sm:text-lg leading-relaxed text-balance font-medium">
                {sectionDesc}
              </p>
            </div>
          </Reveal>
        </div>

        {/* 3D Vertical Rotating Stage Container */}
        <div
          className="relative w-full max-w-4xl mx-auto min-h-[460px] sm:min-h-[500px] md:min-h-[460px] flex items-center justify-center overflow-visible px-4 py-12 mb-10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Top navigation arrow */}
          <button
            onClick={() => setActiveIndex(prev => (prev - 1 + displayTestimonials.length) % displayTestimonials.length)}
            className="absolute -top-4 w-12 h-12 rounded-full bg-[#FFFFFF] text-[#004050] border border-[#C9D9E8] shadow-lg hover:border-[#7A7A50] hover:text-[#7A7A50] flex items-center justify-center transition-all duration-300 active:scale-95 z-40 group cursor-pointer"
            aria-label="Previous Testimonial"
          >
            <ChevronUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          {/* Bottom navigation arrow */}
          <button
            onClick={() => setActiveIndex(prev => (prev + 1) % displayTestimonials.length)}
            className="absolute -bottom-4 w-12 h-12 rounded-full bg-[#FFFFFF] text-[#004050] border border-[#C9D9E8] shadow-lg hover:border-[#7A7A50] hover:text-[#7A7A50] flex items-center justify-center transition-all duration-300 active:scale-95 z-40 group cursor-pointer"
            aria-label="Next Testimonial"
          >
            <ChevronDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
          </button>

          {/* 3D Viewport container */}
          <div
            className="w-full h-[320px] sm:h-[350px] relative flex items-center justify-center overflow-visible"
            style={{ perspective: 1800, transformStyle: 'preserve-3d' }}
          >
            {loading ? (
              <div className="h-64 w-full bg-[#EAF1F7] animate-pulse rounded-3xl"></div>
            ) : (
              displayTestimonials.map((item, index) => {
                let diff = index - activeIndex;
                const total = displayTestimonials.length;

                // Infinite loop circular arithmetic
                if (total > 2) {
                  if (diff > total / 2) diff -= total;
                  else if (diff < -total / 2) diff += total;
                }

                const isActive = index === activeIndex;
                const isVisible = Math.abs(diff) <= 1;
                const isNearVisible = Math.abs(diff) <= 2;

                // Performance Optimization: Unmount far away cards to prevent DOM bloat
                if (!isNearVisible) return null;

                // Only the active card is rendered at all — the stacked cards
                // used to ghost through it with overlapping, unreadable text.
                if (!isActive) return null;

                // Adjust stepHeight based on view size and length of testimonial
                const stepHeight = isMobile ? 120 : 180;

                // Vertical translation and X-axis rotation gives the cylindrical rolling motion (Up-to-Down)
                const yTranslate = diff * stepHeight;
                const zTranslate = isVisible ? (120 - 220 * Math.abs(diff)) : -600;
                const rotateX = diff * -25; // Tilt back/forward along X axis
                const cardScale = isVisible ? (1 - 0.15 * Math.abs(diff)) : 0.65;
                const opacity = isVisible ? (1 - 0.72 * Math.abs(diff)) : 0;

                return (
                  <motion.div
                    key={item.name + index}
                    initial={{ opacity: 0 }}
                    animate={{
                      y: yTranslate,
                      z: zTranslate,
                      rotateX: rotateX,
                      scale: cardScale,
                      opacity: opacity,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 110,
                      damping: 18,
                      mass: 1.1
                    }}
                    style={{
                      position: 'absolute',
                      transformStyle: 'preserve-3d',
                      zIndex: isActive ? 30 : isVisible ? 20 : 10,
                      pointerEvents: isActive ? 'auto' : 'none',
                      willChange: 'transform, opacity',
                    }}
                    className="w-full max-w-3xl origin-center"
                  >
                    <div className="p-8 sm:p-12 rounded-3xl bg-[#FFFFFF] border border-[#C9D9E8] shadow-[0_16px_40px_rgba(11,46,58,0.08)] transition-all duration-700 text-[#0B2E3A] group flex flex-col md:flex-row gap-8 sm:gap-10 items-start relative overflow-hidden">
                      <div className="shrink-0 flex flex-col items-center gap-4 relative z-10 mx-auto">
                        <TestimonialAvatar name={item.name} index={index} />
                        <div className="flex flex-col items-center">
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-[#7A7A50] text-[#7A7A50]" />
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex-grow relative z-10 w-full text-center md:text-left">
                        <Quote className="w-8 h-8 text-[#7A7A50]/60 mb-4 group-hover:text-[#7A7A50] transition-colors ml-0 mr-auto" />
                        <p className="text-base sm:text-lg font-display text-[#3D5563] leading-relaxed italic mb-8 text-left">
                          "{item.text}"
                        </p>
                        <div className="pt-6 border-t border-[#D7E3EE] flex items-center justify-between">
                          <div className="text-left">
                            <h4 className="font-bold font-display text-[11px] uppercase tracking-widest text-[#0B2E3A]">{item.name}</h4>
                            <p className="font-display text-[9px] uppercase tracking-[0.2em] text-[#7A7A50] font-black mt-1.5">{item.location}</p>
                          </div>
                          <div className="w-10 h-10 bg-[#EAF1F7] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                             <div className="w-2.5 h-2.5 bg-[#7A7A50] rounded-full animate-ping"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>

        {!full && !loading && (
          <div className="mt-20 text-center">
            <Reveal delay={0.5}>
              <button
                onClick={() => setView?.('testimonials')}
                className="group inline-flex items-center gap-4 bg-[#004050] text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-[#7A7A50] transition-all shadow-xl cursor-pointer"
              >
                <span>{readAllButtonText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </button>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}
