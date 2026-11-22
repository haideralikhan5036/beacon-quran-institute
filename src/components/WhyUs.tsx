import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { User, Users, CalendarClock, TrendingUp, GraduationCap, HeartHandshake, Baby, UserRound, Clock, FileText, Award, Target, MessagesSquare } from 'lucide-react';
import { Reveal } from './ui/Reveal';

// "Our Strengths" bar graph — lengths are styling only, no numbers.
const STRENGTH_BARS = [
  { label: 'Qualified teachers', width: '92%', icon: Award },
  { label: '1-on-1 attention', width: '96%', icon: User },
  { label: 'Flexible scheduling', width: '88%', icon: CalendarClock },
  { label: 'Progress tracking', width: '90%', icon: TrendingUp },
];

const SERVICES = [
  {
    num: '01',
    title: '1-on-1 Classes',
    desc: 'Every lesson is private, with your teacher\u2019s full attention on you alone.',
    icon: User,
  },
  {
    num: '02',
    title: 'Female Teachers',
    desc: 'Qualified female teachers available for sisters and children.',
    icon: HeartHandshake,
  },
  {
    num: '03',
    title: 'Classes for Kids',
    desc: 'Patient, friendly lessons that keep young learners engaged.',
    icon: Baby,
  },
  {
    num: '04',
    title: 'Classes for Adults',
    desc: 'Learn at your own pace, whatever your level or schedule.',
    icon: UserRound,
  },
  {
    num: '05',
    title: 'Flexible Scheduling',
    desc: 'Choose class times that fit your family and your time zone.',
    icon: Clock,
  },
  {
    num: '06',
    title: 'Monthly Progress Reports',
    desc: 'A clear monthly report on what was learned and what comes next.',
    icon: FileText,
  },
];

const EFFORT_ITEMS = [
  {
    title: 'Teacher quality',
    desc: 'Carefully selected, certified teachers for every class.',
    icon: GraduationCap,
  },
  {
    title: 'Student progress',
    desc: 'Every lesson is tracked, so progress never stalls.',
    icon: Target,
  },
  {
    title: 'Parent communication',
    desc: 'Parents always know how their child is doing.',
    icon: MessagesSquare,
  },
];

const STATS = [
  { value: '1-to-1', label: 'Every class is one-to-one' },
  { value: '5', label: 'Course Paths' },
  { value: 'Free Trial', label: 'Your first class is free' },
];

// Batch 15 (Halka + Mixed): the six service cards rotate through the
// three texture families instead of no texture at all.
const SERVICE_TEXTURES = ['dots-texture', 'streaks-texture', 'grid-texture'];

export default function WhyUs() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="about" className="py-16 sm:py-20 bg-[#FFFFFF] relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 relative z-10">

        {/* ── a. Our Strengths ─────────────────────────────────────────── */}
        <Reveal width="100%">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#7A7A50] mb-3">
              Why Beacon
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0B2E3A] leading-tight mb-4 text-balance">
              Our Strengths
            </h2>
            <p className="text-[#3D5563] text-base sm:text-lg leading-relaxed">
              Live one-to-one Quran classes for kids and adults, with certified
              male and female teachers — built around each student, not around a timetable.
            </p>
          </div>
        </Reveal>

        <Reveal width="100%">
          <div className="max-w-3xl mx-auto bg-[#FFFFFF] border border-[#C9D9E8] rounded-3xl p-6 sm:p-9 shadow-[0_10px_30px_rgba(11,46,58,0.06)] mb-12 sm:mb-16">
            <div className="space-y-6">
              {STRENGTH_BARS.map((bar) => (
                <div key={bar.label}>
                  <div className="flex items-center gap-3 mb-2">
                    <bar.icon className="w-4 h-4 text-[#004050] shrink-0" />
                    <span className="text-sm font-bold text-[#0B2E3A]">{bar.label}</span>
                  </div>
                  <div className="h-3 rounded-full bg-[#EAF1F7] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: bar.width }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: 'easeOut' }}
                      className="h-full rounded-full bg-[#004050]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ── b. Educational Services ──────────────────────────────────── */}
        <Reveal width="100%">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#7A7A50] mb-3">
              What We Offer
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0B2E3A] leading-tight mb-4 text-balance">
              Educational Services
            </h2>
            <p className="text-[#3D5563] text-base sm:text-lg leading-relaxed">
              Everything a family needs to learn the Quran online — from the
              first lesson to regular progress updates.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12 sm:mb-16">
          {SERVICES.map((service, i) => (
            <Reveal
              key={service.num}
              width="100%"
              direction={isMobile ? 'up' : i % 2 === 0 ? 'left' : 'right'}
              delay={0.05 + (i % 3) * 0.08}
            >
              <div className="bg-[#FFFFFF] border border-[#C9D9E8] rounded-3xl p-6 sm:p-7 shadow-[0_10px_30px_rgba(11,46,58,0.05)] hover:shadow-[0_16px_40px_rgba(11,46,58,0.08)] transition-shadow h-full relative overflow-hidden">
                {/* Batch 15: texture family rotates per service card */}
                <div
                  aria-hidden="true"
                  className={`${SERVICE_TEXTURES[i % SERVICE_TEXTURES.length]} pointer-events-none absolute right-[-10px] bottom-[-8px] w-[110px] h-[70px] opacity-45`}
                />
                <div className="flex items-center justify-between mb-5">
                  <span className="font-display text-2xl font-bold text-[#7A7A50]">{service.num}</span>
                  <div className="w-11 h-11 rounded-2xl bg-[#EAF1F7] border border-[#C9D9E8] flex items-center justify-center">
                    <service.icon className="w-5 h-5 text-[#004050]" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#0B2E3A] mb-2">{service.title}</h3>
                <p className="text-[#3D5563] text-sm sm:text-base leading-relaxed">{service.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── c. Where Beacon puts its effort ─────────────────────────── */}
        <Reveal width="100%">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#7A7A50] mb-3">
              Our Focus
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0B2E3A] leading-tight text-balance">
              Where Beacon puts its effort
            </h2>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto mb-12 sm:mb-16">
          {EFFORT_ITEMS.map((item, i) => (
            <Reveal key={item.title} width="100%" delay={0.05 + i * 0.08}>
              <div className="bg-[#FFFFFF] border border-[#C9D9E8] rounded-3xl p-6 text-center shadow-[0_10px_30px_rgba(11,46,58,0.05)] h-full">
                <div className="w-11 h-11 rounded-2xl bg-[#EAF1F7] border border-[#C9D9E8] flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-5 h-5 text-[#004050]" />
                </div>
                <h3 className="text-lg font-bold text-[#0B2E3A] mb-1.5">{item.title}</h3>
                <p className="text-[#3D5563] text-sm leading-relaxed">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── d. Stat strip — mockup deep teal, not navy ──────────────────── */}
        <Reveal width="100%">
          <div className="bg-[#004050] rounded-3xl px-6 sm:px-10 py-10 sm:py-12 shadow-[0_16px_40px_rgba(0,64,80,0.25)] relative overflow-hidden">
            {/* Batch 15 (Halka + Mixed): white dots bottom-left, gold
                streaks top-right — the strip had no texture before */}
            <div
              aria-hidden="true"
              className="dots-texture-white pointer-events-none absolute left-[-8px] bottom-[-8px] w-[150px] h-[90px] opacity-50"
            />
            <div
              aria-hidden="true"
              className="streaks-texture-gold pointer-events-none absolute right-[-10px] top-[-8px] w-[150px] h-[90px] opacity-50"
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 text-center relative">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">{stat.value}</p>
                  <p className="text-white/85 text-sm sm:text-base mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
