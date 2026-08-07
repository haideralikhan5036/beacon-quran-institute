import { Mail, GraduationCap, Award, BookOpen } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import { useLanguage } from '../context/LanguageContext';

const teachersEn = [
  {
    name: 'Sheikh Abdullah Mansour',
    role: 'Head of Tajweed',
    qualification: 'Ijazah in Ten Qira\'at, Al-Azhar Graduate',
    specialization: 'Advanced Tajweed & Qira\'at',
    experience: '15+ Years',
    image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=400'
  },
  {
    name: 'Dr. Sarah Al-Farsi',
    role: 'Director of Hifz Programm',
    qualification: 'Hafiza & PhD in Islamic Studies',
    specialization: 'Quran Memorization for Women & Children',
    experience: '12+ Years',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400'
  },
  {
    name: 'Ustadh Omar Khalid',
    role: 'Senior Arabic Instructor',
    qualification: 'Masters in Arabic Linguistics',
    specialization: 'Classical Arabic & Quranic Grammar',
    experience: '10+ Years',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400'
  },
  {
    name: 'Aisha Rahman',
    role: 'Islamic Studies Specialist',
    qualification: 'Bachelors in Sharia & Ijazah holder',
    specialization: 'Tafsir & Islamic Jurisprudence',
    experience: '8+ Years',
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400'
  }
];

const teachersAr = [
  {
    name: 'الشيخ عبد الله منصور',
    role: 'رئيس قسم التجويد والقراءات',
    qualification: 'مجاز بالقراءات العشر المتواترة، خريج الأزهر الشريف',
    specialization: 'التجويد المتقدم والقراءات بالقراءات المتواترة بالسند',
    experience: '١٥+ سنة',
    image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=400'
  },
  {
    name: 'د. سارة الفارسي',
    role: 'مديرة برامج تحفيظ القرآن للبراعم والنساء',
    qualification: 'حافظة لكتاب الله العظيم، دكتوراه في الدراسات الإسلامية',
    specialization: 'إدارة وتوجيه حِلق التحفيظ والمراجعة الفعالة',
    experience: '١٢+ سنة',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400'
  },
  {
    name: 'الأستاذ عمر خالد',
    role: 'أستاذ أول لعلوم اللغة العربية',
    qualification: 'ماجستير في اللغويات وتدريس العربية لغير الناطقين بها',
    specialization: 'النحو القرآني، البلاغة والتأسيس اللغوي السليم',
    experience: '١٠+ سنوات',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400'
  },
  {
    name: 'الأستاذة عائشة الرحمن',
    role: 'متخصصة في التفسير والسيرة النبوية والمواريث',
    qualification: 'بكالوريوس في الشريعة الإسلامية والفقه وحاملة إجازات متصلة',
    specialization: 'التفسير الموضوعي، فقه العبادات، والسيرة العطرة',
    experience: '٨+ سنوات',
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400'
  }
];

export default function Teachers() {
  const { isAr } = useLanguage();
  const teachersList = isAr ? teachersAr : teachersEn;

  const subText = isAr ? "نخبة الكادر التعليمي" : "Our Academic Staff";
  const titleText = isAr ? "ثُلة من حُرّاس علوم التنزيل الشريفة" : "The Guardians of Knowledge";
  const descText = isAr 
    ? "يضم صرحنا نخبة متميزة من المشايخ الأجلاء والمعلمات المجازات الحاصدين أعلى الرتب والشهادات من أعرق الصروح الإسلامية العالمية." 
    : "Our faculty members are highly qualified scholars and Ijazah holders from prestigious institutions worldwide, dedicated to your spiritual growth.";

  const viewProfileText = isAr ? "عرض السيرة الذاتية" : "View Profile";
  const globalScholarsText = isAr ? "٥٠+ معلماً وشيخاً مجازاً ومتاحاً حول العالم" : "50+ Global Scholars Available";
  const joinFacultyText = isAr ? "انضم لهيئتنا التعليمية" : "Join Our Faculty";
  const experienceSuffix = isAr ? "خبرة" : "Experience";

  return (
    <section id="teachers" className="py-24 sm:py-32 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal delay={0.1} width="100%">
          <div className="card-shine border border-[#949693]/35 p-6 sm:p-9 rounded-[2.5rem] max-w-3xl mx-auto text-center mb-16 shadow-2xl">
            <div className={`inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-[#084C63]/30 border border-[#949693]/40 mb-4 ${isAr ? 'flex-row-reverse' : ''}`}>
              <Award className="w-4 h-4 text-amber-200" />
              <h2 className="display text-[10px] font-extrabold uppercase tracking-[0.3em] text-amber-200">{subText}</h2>
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold display text-amber-50 mb-4 text-balance">{titleText}</h3>
            <p className="text-amber-100/95 max-w-xl mx-auto text-base sm:text-lg leading-relaxed text-balance font-medium">
              {descText}
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teachersList.map((teacher, index) => (
            <Reveal 
              key={teacher.name} 
              delay={0.2 + (index * 0.1)} 
              direction="up"
              distance={30}
            >
              <div className="group relative bg-black/20 backdrop-blur-md rounded-[3rem] overflow-hidden border border-accent/20 hover:border-accent/50 hover:bg-black/40 shadow-xl transition-all duration-700 h-full flex flex-col text-amber-50">
                <div className="aspect-[4/5] overflow-hidden relative">
                  <img 
                    src={teacher.image} 
                    alt={teacher.name} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8 p-4">
                    <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-accent hover:border-accent hover:text-primary transition-all">
                      {viewProfileText}
                    </button>
                  </div>
                </div>
                
                <div className={`p-8 flex flex-col flex-grow ${isAr ? 'text-right' : 'text-left'}`}>
                  <span className={`display text-[9px] font-bold uppercase tracking-[0.2em] text-accent mb-2`}>{teacher.role}</span>
                  <h4 className="text-xl font-bold display text-amber-50 mb-4 group-hover:text-accent transition-colors">{teacher.name}</h4>
                  
                  <div className="space-y-3 mt-auto pt-6 border-t border-accent/10">
                    <div className={`flex items-center gap-3 text-amber-100/90 text-xs ${isAr ? 'flex-row-reverse text-right' : ''}`}>
                      <GraduationCap className="w-3.5 h-3.5 text-accent shrink-0" />
                      <span>{teacher.qualification}</span>
                    </div>
                    <div className={`flex items-center gap-3 text-amber-100/90 text-xs ${isAr ? 'flex-row-reverse text-right' : ''}`}>
                      <BookOpen className="w-3.5 h-3.5 text-accent shrink-0" />
                      <span>{teacher.specialization}</span>
                    </div>
                    <div className={`flex items-center gap-3 text-xs font-semibold text-amber-100 ${isAr ? 'flex-row-reverse' : ''}`}>
                      <div className="px-2.5 py-1 bg-accent/10 border border-accent/20 rounded-md text-accent">
                        {isAr ? `${experienceSuffix} ${teacher.experience}` : `${teacher.experience} ${experienceSuffix}`}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Subtle Islamic Border Pattern (Subtle Gradient Line) */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent"></div>
              </div>
            </Reveal>
          ))}
        </div>
        
        <Reveal delay={0.6}>
          <div className="mt-20 text-center">
            <div className={`inline-flex flex-wrap items-center justify-center gap-6 sm:gap-8 px-8 py-5 sm:py-6 bg-black/30 backdrop-blur-md rounded-full border border-accent/20 shadow-xl text-amber-50`}>
               <div className={`flex items-center gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
                 <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                 <span className="display text-[10px] font-bold uppercase tracking-widest text-amber-100/95">{globalScholarsText}</span>
               </div>
               <div className="hidden sm:block w-px h-6 bg-accent/20"></div>
               <button className="text-accent font-bold uppercase tracking-widest text-[10px] hover:text-white transition-colors cursor-pointer">
                 {joinFacultyText}
               </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
