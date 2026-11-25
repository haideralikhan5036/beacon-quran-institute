import { Reveal } from './ui/Reveal';
import Breadcrumbs from './Breadcrumbs';
import {
  ArrowLeft, ArrowRight, GraduationCap, HeartHandshake, Home,
  ShieldCheck, UserCheck, BookOpenCheck, CalendarCheck, CheckCircle2,
  MessageCircle,
} from 'lucide-react';

// Female Teachers page (Tarteel-adapt batch, item 2; owner-answers
// batch, item 6). Owner-confirmed 2026-11-25: Beacon's female
// teachers are Ijazah-certified, from Pakistan, with very good
// English fluency and excellent Tajweed — the institute's best
// teachers. Sourcing is stated only as the owner confirmed it —
// no other country or university is named anywhere on this page.
// Still NOT claimed: how many female teachers there are, whether
// they cover all five courses, whether there is a waiting time, or
// whether a student keeps the same female teacher every week.
// Requests go via WhatsApp/email conversation — the enrol form has
// NO teacher-preference field (owner decision 2026-11-24), so
// nothing here implies one. Step 3 of HOW_TO_REQUEST carries the
// owner-confirmed "2-day trial with the second tutor" wording
// (owner-answers item 4) — do not change it.

const WHO_IT_IS_FOR = [
  {
    icon: HeartHandshake,
    title: 'For sisters',
    text: 'Adult women learning the Quran with a female teacher, one to one — ask about a female teacher for your course, at a pace and a time that fit your day.',
  },
  {
    icon: GraduationCap,
    title: 'For young girls',
    text: 'Girls learning with a female teacher they feel comfortable with, in a one-to-one class where every minute of the lesson is about them.',
  },
  {
    icon: Home,
    title: 'For parents choosing for a daughter',
    text: 'Parents who want their daughter taught by a female teacher can ask us on WhatsApp or by email when they enrol. The class still happens at home, live and one to one.',
  },
];

const THE_STANDARD = [
  {
    icon: BookOpenCheck,
    title: 'The same Ijazah-level standard',
    text: 'Our female teachers are from Pakistan, Ijazah-certified, with very good English fluency and excellent Tajweed — the institute\'s best teachers. They are held to the same standard as every Beacon tutor: proven recitation and Tajweed before they teach a single class.',
  },
  {
    icon: UserCheck,
    title: 'One teacher, one student',
    text: 'Every class is one to one. Your daughter or you learn alone with the teacher — no group, no shared attention, and a lesson shaped around one student.',
  },
  {
    icon: CalendarCheck,
    title: 'Times that fit your family',
    text: 'Classes are scheduled around your week, not the other way round. Choose the days and times that suit you, and change them when life changes.',
  },
  {
    icon: ShieldCheck,
    title: 'The same quality checks',
    text: 'Female teachers are part of the same quality assurance as every Beacon teacher — monitored lessons, regular evaluation and a monthly progress report for the family.',
  },
];

const HOW_TO_REQUEST = [
  {
    n: '1',
    title: 'Book a free trial class',
    text: 'Book a free trial class and tell us on WhatsApp or by email that you would like a female teacher. There is no extra step — just mention it when you get in touch.',
  },
  {
    n: '2',
    title: 'Meet your female teacher',
    text: 'Your trial class is taught by a female teacher, so you can see for yourself how she teaches before you commit to anything.',
  },
  {
    n: '3',
    title: 'Set your weekly schedule',
    text: 'If the trial feels right, choose your course and your weekly times, and your regular classes begin with your female teacher. If the fit is not right, tell us and try again with a different female teacher — a 2-day trial with the second tutor — before you enrol.',
  },
];

const COURSES = [
  'Noorani Qaida',
  'Recitation & Tajweed',
  'Hifz Program',
  'Tafseer-ul-Quran',
  'Islamic Studies',
];

export default function FemaleTeachersPage({ onBack }: { onBack: () => void }) {
  return (
    <div data-testid="female-teachers-page" className="min-h-screen bg-[#FFFFFF] text-[#0B2E3A] pt-24 pb-20 px-6" dir="ltr">
      <div className="max-w-[1280px] mx-auto">
        <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Female Teachers' }]} />
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#3D5563] hover:text-[#004050] transition-colors mb-12 group cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>

        {/* Hero */}
        <Reveal>
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0B2E3A] mb-6 font-display">
              Female Quran Teachers — Learn with a Qualified Female Tutor
            </h1>
            <p className="text-xl md:text-2xl text-[#3D5563] max-w-3xl mx-auto">
              Sisters and young girls can learn the Quran one to one with a
              female teacher from Pakistan — Ijazah-certified, with very
              good English fluency and excellent Tajweed. Our female
              teachers are the institute&apos;s best teachers, held to the
              same standard as every Beacon tutor. Just tell us on
              WhatsApp or by email when you enrol.
            </p>
          </div>
        </Reveal>

        {/* Who it is for */}
        <div className="mb-24">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B2E3A] mb-4 font-display">
                A female teacher, for whoever asks
              </h2>
              <div className="w-24 h-1 bg-[#004050] mx-auto rounded-full"></div>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {WHO_IT_IS_FOR.map((card, idx) => (
              <Reveal key={card.title} delay={idx * 0.08}>
                <div className="bg-[#FFFFFF] border border-[#C9D9E8] p-8 rounded-3xl h-full shadow-[0_10px_30px_rgba(11,46,58,0.05)] relative overflow-hidden">
                  <div
                    aria-hidden="true"
                    className={`${idx % 2 === 0 ? 'dots-texture' : 'streaks-texture'} pointer-events-none absolute right-[-10px] top-[-8px] w-[110px] h-[70px] opacity-45`}
                  />
                  <div className="bg-[#EAF1F7] border border-[#C9D9E8] p-3 rounded-xl w-fit mb-5 relative">
                    <card.icon className="w-6 h-6 text-[#004050]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0B2E3A] mb-3 relative">
                    {card.title}
                  </h3>
                  <p className="text-[#3D5563] leading-relaxed relative">{card.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* The standard */}
        <div className="mb-24">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B2E3A] mb-4 font-display">
                The same standard as every Beacon teacher
              </h2>
              <div className="w-24 h-1 bg-[#004050] mx-auto rounded-full"></div>
              <p className="text-lg text-[#3D5563] max-w-2xl mx-auto mt-6">
                Asking for a female teacher never means settling for less.
                The qualification, the one-to-one attention and the
                progress reporting are the same for every student.
              </p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {THE_STANDARD.map((card, idx) => (
              <Reveal key={card.title} delay={idx * 0.08}>
                <div className="bg-[#FFFFFF] border border-[#C9D9E8] p-8 rounded-3xl h-full shadow-[0_10px_30px_rgba(11,46,58,0.05)] relative overflow-hidden">
                  <div
                    aria-hidden="true"
                    className={`${idx % 2 === 0 ? 'grid-texture' : 'streaks-texture-gold'} pointer-events-none absolute right-[-10px] top-[-8px] w-[130px] h-[80px] opacity-45`}
                  />
                  <div className="flex items-center gap-4 mb-5 relative">
                    <div className="bg-[#EAF1F7] border border-[#C9D9E8] p-3 rounded-xl">
                      <card.icon className="w-6 h-6 text-[#004050]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0B2E3A]">{card.title}</h3>
                  </div>
                  <p className="text-[#3D5563] leading-relaxed relative">{card.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Courses + how to request */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <Reveal delay={0.1}>
            <div className="bg-[#FFFFFF] border border-[#C9D9E8] p-8 rounded-3xl h-full shadow-[0_10px_30px_rgba(11,46,58,0.05)] relative overflow-hidden">
              <div
                aria-hidden="true"
                className="dots-texture pointer-events-none absolute right-[-10px] top-[-8px] w-[130px] h-[80px] opacity-45"
              />
              <div className="flex items-center gap-4 mb-6 relative">
                <div className="bg-[#EAF1F7] border border-[#C9D9E8] p-3 rounded-xl">
                  <BookOpenCheck className="w-6 h-6 text-[#004050]" />
                </div>
                <h2 className="text-2xl font-bold text-[#0B2E3A] font-display">
                  Ask about a female teacher for your course
                </h2>
              </div>
              <p className="text-[#3D5563] leading-relaxed text-lg mb-6 relative">
                Tell us on WhatsApp or by email which course you or your
                daughter want to learn, and we will let you know about a
                female teacher for it.
              </p>
              <ul className="space-y-3 relative">
                {COURSES.map((course) => (
                  <li key={course} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#004050] shrink-0 mt-0.5" />
                    <span className="text-[#3D5563]">{course}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="bg-[#004050] p-8 rounded-3xl h-full shadow-[0_16px_40px_rgba(0,64,80,0.25)] relative overflow-hidden">
              <div
                aria-hidden="true"
                className="dots-texture-white pointer-events-none absolute right-[-8px] top-[-8px] w-[130px] h-[80px] opacity-50"
              />
              <div className="flex items-center gap-4 mb-6 relative">
                <div className="bg-white/10 border border-white/20 p-3 rounded-xl">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white font-display">
                  How to request a female teacher
                </h2>
              </div>
              <ol className="space-y-5 relative">
                {HOW_TO_REQUEST.map((step) => (
                  <li key={step.n} className="flex items-start gap-4">
                    <span className="w-8 h-8 shrink-0 rounded-full bg-[#7A7A50] text-white font-bold flex items-center justify-center">
                      {step.n}
                    </span>
                    <span>
                      <span className="block font-bold text-white mb-1">{step.title}</span>
                      <span className="block text-white/85 leading-relaxed">{step.text}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>

        {/* CTA */}
        <Reveal>
          <div className="text-center border-t border-[#D7E3EE] pt-16">
            <h2 className="text-3xl font-bold text-[#0B2E3A] mb-8 font-display">
              Book a free trial class with a female teacher
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/enrol"
                className="bg-[#7A7A50] hover:bg-[#004050] text-white font-bold py-4 px-8 rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                Book a Free Trial
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="/quality-assurance"
                className="bg-[#FFFFFF] border border-[#C9D9E8] hover:bg-[#F4F8FB] text-[#004050] font-bold py-4 px-8 rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                Our Quality Standard
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
