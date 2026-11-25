import { Reveal } from './ui/Reveal';
import Breadcrumbs from './Breadcrumbs';
import {
  ArrowLeft, ArrowRight, ShieldCheck, UserCheck, BookOpenCheck,
  ClipboardCheck, TrendingUp, FileText, MessageCircle, CheckCircle2,
} from 'lucide-react';

// Quality Assurance page (Tarteel-adapt batch, item 1; owner-answers
// batch, item 5). Modelled on Tarteel's published 5-step QA structure,
// written for Beacon. Wording stays at the level of the institute's
// standards — no teacher names, no counts, no dates. Process claims
// confirmed by the owner (voice call 2026-11-25): classes are recorded
// and monitored, teachers are background-checked, monthly evaluation
// is done by the quality control manager.

const STEPS = [
  {
    n: '1',
    icon: UserCheck,
    title: 'Careful teacher selection',
    text: 'Every teacher is chosen for Quran memorisation, Tajweed knowledge and teaching ability — and background-checked before their first class. Our tutors are certified and Ijazah-holding, so the person teaching your child has already proven their own recitation.',
  },
  {
    n: '2',
    icon: BookOpenCheck,
    title: 'Command of the subject',
    text: 'A teacher only teaches what they have mastered. Tajweed, Qirat and memorisation are taught by teachers who hold those subjects themselves, so corrections are precise and every rule is explained from understanding, not from a script.',
  },
  {
    n: '3',
    icon: ShieldCheck,
    title: 'Lessons recorded and monitored for quality',
    text: 'Lessons are recorded and monitored so that teaching stays at the standard we promise. Where a lesson can be better, the teacher gets clear feedback and support — quality is checked while the course is running, not only at the end of it.',
  },
  {
    n: '4',
    icon: ClipboardCheck,
    title: 'Monthly student evaluation',
    text: 'Every student is evaluated each month by the institute\u2019s quality control manager on their recitation and Tajweed, and the findings go into a monthly progress report for the family. Parents always know where their child stands — what is strong, and what needs more practice.',
  },
  {
    n: '5',
    icon: TrendingUp,
    title: 'Progress compared month on month',
    text: 'Each month\u2019s report is compared with the one before it, so slow progress is noticed early and the teaching plan is adjusted. A student who is stuck does not stay stuck — the plan changes until the progress returns.',
  },
];

const REPORT_COVERS = [
  'What was covered in the month\u2019s lessons',
  'How the student\u2019s recitation and Tajweed are progressing',
  'Memorisation progress, where the student is memorising',
  'What to practise next, and where extra help is needed',
];

export default function QualityAssurancePage({ onBack }: { onBack: () => void }) {
  return (
    <div data-testid="qa-page" className="min-h-screen bg-[#FFFFFF] text-[#0B2E3A] pt-24 pb-20 px-6" dir="ltr">
      <div className="max-w-[1280px] mx-auto">
        <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Quality Assurance' }]} />
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
              Quality Assurance — How We Keep Every Lesson Excellent
            </h1>
            <p className="text-xl md:text-2xl text-[#3D5563] max-w-3xl mx-auto">
              Good teaching is not a promise we make once. It is checked at
              every step — from choosing the teacher to the monthly report
              you receive as a parent.
            </p>
          </div>
        </Reveal>

        {/* The five steps */}
        <div className="mb-24">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B2E3A] mb-4 font-display">
                Five checks, every student, every month
              </h2>
              <div className="w-24 h-1 bg-[#004050] mx-auto rounded-full"></div>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STEPS.map((step, idx) => (
              <Reveal key={step.n} delay={idx * 0.08}>
                <div className="bg-[#FFFFFF] border border-[#C9D9E8] p-8 rounded-3xl h-full shadow-[0_10px_30px_rgba(11,46,58,0.05)] relative overflow-hidden">
                  <div
                    aria-hidden="true"
                    className={`${idx % 2 === 0 ? 'dots-texture' : 'streaks-texture'} pointer-events-none absolute right-[-10px] top-[-8px] w-[110px] h-[70px] opacity-45`}
                  />
                  <div className="flex items-center gap-4 mb-5 relative">
                    <div className="bg-[#EAF1F7] border border-[#C9D9E8] p-3 rounded-xl">
                      <step.icon className="w-6 h-6 text-[#004050]" />
                    </div>
                    <span className="text-sm font-bold text-[#7A7A50]">Step {step.n}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0B2E3A] mb-3 relative">
                    {step.title}
                  </h3>
                  <p className="text-[#3D5563] leading-relaxed relative">{step.text}</p>
                </div>
              </Reveal>
            ))}
            {/* Sixth card — the promise that ties the five together */}
            <Reveal delay={0.4}>
              <div className="bg-[#004050] p-8 rounded-3xl h-full shadow-[0_16px_40px_rgba(0,64,80,0.25)] relative overflow-hidden">
                <div
                  aria-hidden="true"
                  className="dots-texture-white pointer-events-none absolute right-[-8px] top-[-8px] w-[130px] h-[80px] opacity-50"
                />
                <ShieldCheck className="w-8 h-8 text-white mb-5 relative" />
                <h3 className="text-xl font-bold text-white mb-3 relative">
                  One-to-one, always
                </h3>
                <p className="text-white/85 leading-relaxed relative">
                  Every class is one teacher with one student, so nothing
                  about your child&apos;s learning is hidden in a group.
                  The teacher, the lesson and the progress report are all
                  about one student — yours.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Monthly progress report */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <Reveal delay={0.1}>
            <div className="bg-[#FFFFFF] border border-[#C9D9E8] p-8 rounded-3xl h-full shadow-[0_10px_30px_rgba(11,46,58,0.05)] relative overflow-hidden">
              <div
                aria-hidden="true"
                className="streaks-texture-gold pointer-events-none absolute right-[-10px] top-[-8px] w-[130px] h-[80px] opacity-45"
              />
              <div className="flex items-center gap-4 mb-6 relative">
                <div className="bg-[#EAF1F7] border border-[#C9D9E8] p-3 rounded-xl">
                  <FileText className="w-6 h-6 text-[#004050]" />
                </div>
                <h2 className="text-2xl font-bold text-[#0B2E3A] font-display">
                  The monthly progress report
                </h2>
              </div>
              <p className="text-[#3D5563] leading-relaxed text-lg mb-6 relative">
                Every month, the family receives a written progress report
                for the student. It is the same report the teacher works
                from — so what we see, you see.
              </p>
              <ul className="space-y-3 relative">
                {REPORT_COVERS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#004050] shrink-0 mt-0.5" />
                    <span className="text-[#3D5563]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="bg-[#FFFFFF] border border-[#C9D9E8] p-8 rounded-3xl h-full shadow-[0_10px_30px_rgba(11,46,58,0.05)] relative overflow-hidden">
              <div
                aria-hidden="true"
                className="grid-texture pointer-events-none absolute right-[-10px] top-[-8px] w-[130px] h-[80px] opacity-45"
              />
              <div className="flex items-center gap-4 mb-6 relative">
                <div className="bg-[#EAF1F7] border border-[#C9D9E8] p-3 rounded-xl">
                  <MessageCircle className="w-6 h-6 text-[#004050]" />
                </div>
                <h2 className="text-2xl font-bold text-[#0B2E3A] font-display">
                  Raise a concern, any time
                </h2>
              </div>
              <p className="text-[#3D5563] leading-relaxed text-lg mb-6 relative">
                If a lesson, a teacher or a report is not right, tell us
                directly. A concern raised early can be fixed early — we
                would rather hear it in the first week than in the third
                month.
              </p>
              <p className="text-[#3D5563] leading-relaxed relative">
                WhatsApp us on{' '}
                <a href="https://wa.me/923461573771" className="font-bold text-[#004050] underline underline-offset-2">
                  +92 346 1573771
                </a>{' '}
                or email{' '}
                <a href="mailto:beaconquraninstitute@gmail.com" className="font-bold text-[#004050] underline underline-offset-2">
                  beaconquraninstitute@gmail.com
                </a>
                .
              </p>
            </div>
          </Reveal>
        </div>

        {/* CTA */}
        <Reveal>
          <div className="text-center border-t border-[#D7E3EE] pt-16">
            <h2 className="text-3xl font-bold text-[#0B2E3A] mb-8 font-display">
              See the standard for yourself — book a free trial class
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
                href="/courses"
                className="bg-[#FFFFFF] border border-[#C9D9E8] hover:bg-[#F4F8FB] text-[#004050] font-bold py-4 px-8 rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                View Our Courses
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
