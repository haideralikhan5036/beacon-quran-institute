import { motion } from 'motion/react';
import { Star, Quote, ArrowRight, ArrowLeft, Sparkles, ChevronUp, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Reveal } from './ui/Reveal';
import { useLanguage } from '../context/LanguageContext';

const allTestimonials = [
  { name: "Sarah Ahmed", location: "United Kingdom", text: "The Noorani Qaida course has been a blessing for my 6-year-old. The teacher is incredibly patient and uses engaging methods that keep my daughter excited for every session." },
  { name: "Omar Farooq", location: "USA", text: "I wanted to improve my Tajweed for years. Beacon Quran Institute provided me with an Ijazah certified teacher who corrected my pronunciation in just a few months." },
  { name: "Fatima Zahra", location: "Canada", text: "The flexibility of 24/7 classes is what makes this institute stand out. Being a working professional, I can attend my classes at 9 PM after my duties." },
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

const allTestimonialsAr = [
  { name: "سارة أحمد", location: "المملكة المتحدة", text: "لقد كانت دورة القاعدة النورانية بركة لطفلتي ذات الـ 6 سنوات. المعلمة صبورة بشكل هائل وتستخدم أساليب ممتعة تجعل ابنتي متشوقة لكل حصة تالية." },
  { name: "عمر فاروق", location: "الولايات المتحدة الأمريكية", text: "أردت تحسين تجويدي لسنوات عديدة. وفر لي معهد منارة القرآن معلماً متميزاً مجازاً بالسند المتصل صحح نطقي للأحرف ومخارجها خلال أشهر وجيزة." },
  { name: "فاطمة الزهراء", location: "كندا", text: "مرونة الفصول الدراسية وتوفر الحلقات على مدار ٢٤ ساعة يجعل هذا المعهد استثنائياً حقاً. كوني متخصصة في العمل، يمكنني حضور حصصي بسهولة في أوقات مرنة جداً." },
  { name: "يوسف خان", location: "أستراليا", text: "ساعدت دورة القاعدة النورانية طفلي البالغ من العمر 5 سنوات على البدء في قراءة القرآن الكريم وحفظ قصار السور بكل ثقة. شكراً لكم!" },
  { name: "عائشة مالك", location: "الإمارات العربية المتحدة", text: "ممتنة بحق للعثور على هذا المنبر القرآني المبارك. الشيخات والمعلمات هنا مؤهلات للغاية ويتحلين بأسلوب تربوي راقٍ وثري." },
  { name: "زيد إبراهيم", location: "ألمانيا", text: "دورتهم في اللغة العربية والتربية الإسلامية للأطفال ممتازة للغاية. يتعلم ابني القواعد والمفردات بصورة لغوية طبيعية ممتازة." },
  { name: "مريم الصديقي", location: "النرويج", text: "كان حفظ كتاب الله هو حلم حياتي الأسمى. مع برنامج الحفظ والمراجعة المدروس لديهم، أتممت 5 أجزاء في 6 أشهر مع تجويد دقيق." },
  { name: "بلال حسن", location: "قطر", text: "لقد كانت الحصص التجريبية مقنعة للغاية لدرجة أنني سجلت عائلتي والبراعم فوراً. نوصي به بشدة لكل الأعمار والمهتمين بالقرآن وعلم التجويد." },
  { name: "هدى منصور", location: "جمهورية مصر العربية", text: "على الرغم من كوني عربية، فقد أردت صقل تجويدي والتفوق في علم مخارج الوقف والابتداء. المعلمون والعلماء هنا من الطراز الرفيع." },
  { name: "سامي الله", location: "باكستان", text: "نهج متميز وصرح جليل لربط المغتربين والدارسين المقيمين في الخارج بهوية لغتهم العربية والقرآن الشريف لغرس الفضائل في أفئدتهم." },
  { name: "زينب علي", location: "السويد", text: "منهاج التربية الإسلامية للأطفال شامل للغاية ومحبب، يحب أطفالي كثيراً تعلم السيرة المعطرة لرسول الهدى ﷺ والقصص القرآنية." },
  { name: "حمزة أحمد", location: "المملكة المتحدة", text: "قمة في الالتزام والاحترافية والتوثيق. البوابة الرقمية للمتابعة تجعل من السير الذاتي للتعلم والتقييم الشهري ممتعاً وممتازاً جداً." },
  { name: "أريبة نور", location: "سنغافورة", text: "أفضل تجارب التعليم والتحفيظ الرقمي للقرآن تواصل وجودة تامة وجودة صوتية ومرئية مميزة خلال الحلقات الفردية الفعالة." },
  { name: "مصطفى كمال", location: "تركيا", text: "لقد قمت بإرصاد وتوصية جميع أصحابي وأسر المجتمع بالتسجيل هنا. بارك الله في جهود فريق معهد منارة القرآن." },
  { name: "صفية بيجوم", location: "جنوب أفريقيا", text: "تلتزم المعلمات بالمواعيد بدقة متناهية، والحلقات مثمرة ومفيدة للغاية في تنشئة جيل واعٍ متصل بالذكر الحكيم." }
];

const colors = [
  'bg-blue-100 text-blue-600',
  'bg-emerald-100 text-emerald-600',
  'bg-amber-100 text-amber-600',
  'bg-cyan-100 text-cyan-600',
  'bg-indigo-100 text-indigo-600',
  'bg-teal-100 text-teal-600'
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
    <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(27,84,61,0.2)] shrink-0 border border-primary/10 relative group-hover:border-accent/40 transition-colors duration-500">
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
  const { isAr } = useLanguage();
  const testimonialsList = isAr ? allTestimonialsAr : allTestimonials;
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
    const timer = setTimeout(() => setLoading(false), 800);
    if (full) window.scrollTo(0, 0);
    return () => clearTimeout(timer);
  }, [full]);

  // Autoplay vertical rotation
  useEffect(() => {
    if (loading || isPaused || displayTestimonials.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % displayTestimonials.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [displayTestimonials.length, loading, isPaused]);

  const sectionSub = isAr ? "شهادات وآراء طلابنا" : "Student Testimonials";
  const sectionTitle = full 
    ? (isAr ? "الأصوات الكاملة لمجتمعنا المبارك" : "The Complete Voice of Our Community")
    : (isAr ? "قصص الهدى والارتقاء الروحي" : "Stories of Spiritual Growth");

  const sectionDesc = full
    ? (isAr 
        ? `تصفح تجربة ومسار ${testimonialsList.length} طالب وطالبة ممن وجدوا النور والهداية في صرح المنارة.`
        : `Explore the collective experience of ${allTestimonials.length} students who found their light at Beacon.`
      )
    : (isAr
        ? "انضم لعائلة عالمية متصلة ترتاد دروب التعلم والتحفيظ لترتقي حياتها بنور القرآن الكريم."
        : "Join a global family of learners who have transformed their lives through the light of the Holy Quran."
      );

  const backText = isAr ? "الرجوع للمعهد" : "Back to Institute";
  const readAllButtonText = isAr ? `قراءة جميع الـ ${testimonialsList.length} قصص نجاح` : `Read All ${testimonialsList.length} Stories`;

  return (
    <section id="reviews" className={`py-16 sm:py-20 relative overflow-hidden ${full ? 'bg-black/20 backdrop-blur-sm min-h-screen' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 sm:mb-24 relative">
          {full && (
             <button 
               onClick={() => setView?.('home')}
               className={`group absolute -top-12 flex items-center gap-3 text-primary/40 hover:text-accent display text-[11px] font-bold uppercase tracking-[0.2em] transition-all ${isAr ? 'right-0' : 'left-0'}`}
             >
               {isAr ? (
                 <>
                   {backText}
                   <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                 </>
               ) : (
                 <>
                   <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                   {backText}
                 </>
               )}
             </button>
          )}
          <Reveal delay={0.1}>
            <div className={`flex items-center justify-center gap-2 mb-4 ${isAr ? 'flex-row-reverse' : ''}`}>
              <Sparkles className="w-4 h-4 text-accent" />
              <h2 className="display text-[11px] font-bold uppercase tracking-[0.4em] text-accent">{sectionSub}</h2>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold display text-amber-50 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] mb-8 text-balance">
              {sectionTitle}
            </h3>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-amber-100/80 max-w-2xl mx-auto text-lg leading-relaxed text-balance font-medium">
              {sectionDesc}
            </p>
          </Reveal>
        </div>

        {/* 3D Vertical Rotating Stage Container */}
        <div 
          className="relative w-full max-w-4xl mx-auto min-h-[460px] sm:min-h-[500px] md:min-h-[460px] flex items-center justify-center overflow-visible px-4 py-12 mb-10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Central elliptical platform illumination shadow */}
          <div className="absolute inset-y-0 -left-[10%] -right-[10%] bg-gradient-to-b from-primary/[0.01] via-accent/[0.02] to-transparent blur-3xl rounded-full pointer-events-none z-0" />
          
          {/* Top navigation arrow */}
          <button
            onClick={() => setActiveIndex(prev => (prev - 1 + displayTestimonials.length) % displayTestimonials.length)}
            className="absolute -top-4 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md text-amber-100 border border-accent/30 shadow-2xl hover:border-accent hover:text-white flex items-center justify-center transition-all duration-300 active:scale-95 z-40 group cursor-pointer"
            aria-label="Previous Testimonial"
          >
            <ChevronUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          {/* Bottom navigation arrow */}
          <button
            onClick={() => setActiveIndex(prev => (prev + 1) % displayTestimonials.length)}
            className="absolute -bottom-4 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md text-amber-100 border border-accent/30 shadow-2xl hover:border-accent hover:text-white flex items-center justify-center transition-all duration-300 active:scale-95 z-40 group cursor-pointer"
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
              <div className="h-64 w-full bg-primary/5 animate-pulse rounded-[3rem]"></div>
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
                    initial={false}
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
                    <div className={`p-8 sm:p-12 rounded-[3rem] bg-black/25 backdrop-blur-md border border-accent/20 hover:border-accent/50 hover:bg-black/40 shadow-2xl transition-all duration-700 text-amber-50 group flex flex-col md:flex-row gap-8 sm:gap-10 items-start relative overflow-hidden ${isAr ? 'md:flex-row-reverse' : ''}`}>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-accent/10 transition-colors"></div>
                      
                      <div className="shrink-0 flex flex-col items-center gap-4 relative z-10 mx-auto">
                        <TestimonialAvatar name={item.name} index={index} />
                        <div className="flex flex-col items-center">
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-grow relative z-10 w-full text-center md:text-left">
                        <Quote className={`w-8 h-8 text-accent/30 mb-4 group-hover:text-accent/50 transition-colors ${isAr ? 'ml-auto mr-0 transform scale-x-[-1]' : 'ml-0 mr-auto'}`} />
                        <p className={`text-base sm:text-lg serif text-amber-100/90 leading-relaxed italic mb-8 ${isAr ? 'text-right' : 'text-left'}`}>
                          "{item.text}"
                        </p>
                        <div className={`pt-6 border-t border-accent/10 flex items-center justify-between ${isAr ? 'flex-row-reverse text-right' : ''}`}>
                          <div className={isAr ? 'text-right' : 'text-left'}>
                            <h4 className="font-bold display text-[11px] uppercase tracking-widest text-amber-50">{item.name}</h4>
                            <p className="display text-[9px] uppercase tracking-[0.2em] text-accent font-black mt-1.5">{item.location}</p>
                          </div>
                          <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                             <div className="w-2.4 h-2.4 bg-accent rounded-full animate-ping"></div>
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
                className="group inline-flex items-center gap-4 bg-primary text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-primary/90 transition-all shadow-xl shadow-primary/10"
              >
                <span>{readAllButtonText}</span>
                {isAr ? (
                  <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-2 transition-transform" />
                ) : (
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                )}
              </button>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}
