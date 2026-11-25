import { Reveal } from './ui/Reveal';
import Breadcrumbs from './Breadcrumbs';
import {
  ArrowLeft, ArrowRight, FileText, ShieldCheck, HeartHandshake,
  LayoutDashboard, CheckCircle2, GraduationCap,
} from 'lucide-react';

// Parents page (Tarteel-adapt batch, item 10).
// What is truthfully possible as website content: a page for parents
// about how they follow their child's progress. The institute's LMS
// has a separate student + parent portal (owner-confirmed 2026-11-25):
// parents track lessons and their child's learning through it. No
// portal URL, app name or login link is published here — none exists
// in the repo — so the page describes the portal without linking to
// it. No names, counts or dates are claimed anywhere on this page.

const REPORT_COVERS = [
  'What was covered in the month\u2019s lessons',
  'How your child\u2019s recitation and Tajweed are progressing',
  'Memorisation progress, where your child is memorising',
  'What to practise next, and where extra help is needed',
];

const FAQS = [
  {
    q: 'How do I know how my child is doing?',
    a: 'Through the student and parent portal of our learning system, where you can follow your child\u2019s lessons and learning. You also receive a written progress report every month — the same report the teacher works from. Between reports, you can message us any time on WhatsApp and ask how things are going.',
  },
  {
    q: 'Can I be present during my child\u2019s class?',
    a: 'Yes. Classes take place online at home, one-to-one, so you are welcome to sit nearby and listen in. Many parents do, especially in the first weeks.',
  },
  {
    q: 'Can I request a female teacher for my daughter?',
    a: 'Yes. When you enrol, tell us on WhatsApp or by email and we will arrange one. There is a dedicated page about it — see Female Teachers.',
  },
  {
    q: 'What if my child misses a class?',
    a: 'Tell us at least 4 hours before the class and we will arrange a make-up where possible. The full rules are on the Class Rules page.',
  },
  {
    q: 'What if the teacher is not the right fit?',
    a: 'Tell us. Your child can try a different tutor — a 2-day trial with the second tutor — before you enrol. After enrolment, talk to us and we will arrange a change.',
  },
];

export default function ParentsPage({ onBack }: { onBack: () => void }) {
  return (
    <div data-testid="parents-page" className="min-h-screen bg-[#FFFFFF] text-[#0B2E3A] pt-24 pb-20 px-6" dir="ltr">
      <div className="max-w-[1280px] mx-auto">
        <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'For Parents' }]} />
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
              For Parents — Follow Your Child&apos;s Progress, Without Guesswork
            </h1>
            <p className="text-xl md:text-2xl text-[#3D5563] max-w-3xl mx-auto">
              You trust us with your child&apos;s Quran learning. Here is
              exactly how you stay in the picture — what you receive, what
              you can ask for, and how to reach us.
            </p>
          </div>
        </Reveal>

        {/* How you follow progress + parent portal */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <Reveal delay={0.1}>
            <div className="bg-[#FFFFFF] border border-[#C9D9E8] p-8 rounded-3xl h-full shadow-[0_10px_30px_rgba(11,46,58,0.05)] relative overflow-hidden">
              <div
                aria-hidden="true"
                className="dots-texture pointer-events-none absolute right-[-10px] top-[-8px] w-[130px] h-[80px] opacity-45"
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
                Every month you receive a written report for your child —
                the same report the teacher works from. It covers:
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
                className="streaks-texture-gold pointer-events-none absolute right-[-10px] top-[-8px] w-[130px] h-[80px] opacity-45"
              />
              <div className="flex items-center gap-4 mb-6 relative">
                <div className="bg-[#EAF1F7] border border-[#C9D9E8] p-3 rounded-xl">
                  <LayoutDashboard className="w-6 h-6 text-[#004050]" />
                </div>
                <h2 className="text-2xl font-bold text-[#0B2E3A] font-display">
                  A parent portal to follow every lesson
                </h2>
              </div>
              <p className="text-[#3D5563] leading-relaxed text-lg mb-6 relative">
                Our learning system has a separate student and parent
                portal. Through it, you can follow your child&apos;s
                lessons and learning — what was covered, how they are
                progressing, and what comes next — without waiting for
                the monthly report.
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

        {/* Safe learning */}
        <div className="mb-24">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B2E3A] mb-4 font-display">
                A safe place to learn
              </h2>
              <div className="w-24 h-1 bg-[#004050] mx-auto rounded-full"></div>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: 'One-to-one, always',
                text: 'Every class is one teacher with one student. Nothing about your child\u2019s learning is hidden in a group.',
              },
              {
                icon: HeartHandshake,
                title: 'A female teacher on request',
                text: 'For daughters and sisters, a qualified female teacher can be arranged. Ask us on WhatsApp or by email when you enrol.',
                href: '/female-teachers',
                link: 'Female Teachers',
              },
              {
                icon: GraduationCap,
                title: 'Checked quality',
                text: 'Teachers are selected carefully and lessons are monitored, with a monthly evaluation of every student.',
                href: '/quality-assurance',
                link: 'Quality Assurance',
              },
            ].map((card, idx) => (
              <Reveal key={card.title} delay={idx * 0.08}>
                <div className="bg-[#FFFFFF] border border-[#C9D9E8] p-8 rounded-3xl h-full shadow-[0_10px_30px_rgba(11,46,58,0.05)] relative overflow-hidden">
                  <div
                    aria-hidden="true"
                    className={`${idx % 2 === 0 ? 'dots-texture' : 'grid-texture'} pointer-events-none absolute right-[-10px] top-[-8px] w-[110px] h-[70px] opacity-45`}
                  />
                  <div className="bg-[#EAF1F7] border border-[#C9D9E8] p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-5 relative">
                    <card.icon className="w-6 h-6 text-[#004050]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0B2E3A] mb-3 relative">{card.title}</h3>
                  <p className="text-[#3D5563] leading-relaxed relative">{card.text}</p>
                  {card.href && (
                    <a href={card.href} className="inline-block mt-4 font-bold text-[#004050] underline underline-offset-2 relative">
                      {card.link} →
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-24 max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B2E3A] mb-4 font-display">
                Questions parents ask
              </h2>
              <div className="w-24 h-1 bg-[#004050] mx-auto rounded-full"></div>
            </div>
          </Reveal>
          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <Reveal key={faq.q} delay={idx * 0.05}>
                <div className="bg-[#FFFFFF] border border-[#C9D9E8] p-6 rounded-3xl shadow-[0_10px_30px_rgba(11,46,58,0.04)]">
                  <h3 className="text-lg font-bold text-[#0B2E3A] mb-2">{faq.q}</h3>
                  <p className="text-[#3D5563] leading-relaxed">{faq.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Reveal>
          <div className="text-center border-t border-[#D7E3EE] pt-16">
            <h2 className="text-3xl font-bold text-[#0B2E3A] mb-8 font-display">
              Start with a free trial class
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
