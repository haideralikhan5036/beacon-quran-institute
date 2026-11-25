// Class Rules page (Tarteel-adapt batch, item 8).
// Modelled on the idea of Tarteel's published Terms — cancellation,
// make-up, leave, Eid, fee changes — but with Beacon's own rules only,
// written in plain language a parent can understand without legal words.
//
// HONESTY: every rule here is either a principle in plain words or an
// exact restatement of Beacon's Terms of Service. The two figures the
// owner has now confirmed (2026-11-25) are stated here: the teacher waits
// 15 minutes for a late student, and Eid closes classes for one week per
// Eid, twice a year. Every other figure the owner still has to confirm
// (long-leave threshold, fee-change notice) is logged in
// BEACON-TARTEEL-ADAPT-DECISIONS-2026-11-24.md.
import { Reveal } from './ui/Reveal';
import Breadcrumbs from './Breadcrumbs';
import {
  ArrowLeft, ArrowRight, CalendarClock, Plane, Users, MoonStar,
  Wallet, FileText, MessageCircle,
} from 'lucide-react';

const RULES = [
  {
    icon: CalendarClock,
    title: 'Make-up classes',
    text: 'If you cannot attend a class, tell us at least 4 hours before the class and we will arrange a make-up where possible. If your regular teacher has no time for the make-up, we will arrange it with an alternative teacher. If you are running late, let us know as soon as you can — your teacher will wait for you for 15 minutes. A class missed without telling us cannot be made up.',
  },
  {
    icon: Plane,
    title: 'Student leave',
    text: 'Going away or taking a break? Tell us in advance and your teacher and your usual time slot stay yours. A long absence is handled case by case — talk to us before you go, so we can plan around it together.',
  },
  {
    icon: Users,
    title: 'If your teacher is unavailable',
    text: 'If your teacher cannot teach a class, we will let you know at least 4 hours before the class and arrange a cover lesson with another teacher or a make-up class, so your learning does not stop. You will always be told what is happening — a class is never simply missed.',
  },
  {
    icon: MoonStar,
    title: 'Eid and public holidays',
    text: 'Classes close for Eid-ul-Fitr and Eid-ul-Adha — twice a year, for one week each. The Eid holidays are announced as official holidays in advance, and are part of the monthly fee, so no make-up class, no refund and no fee adjustment is given for the Eid break. If any other public holiday affects classes, we will let you know in advance.',
  },
  {
    icon: Wallet,
    title: 'Fees',
    text: 'Fees are paid monthly in advance. If fees ever change, we announce the change in advance, so no family is surprised by a new amount.',
  },
  {
    icon: FileText,
    title: 'Cancelling enrolment',
    text: 'If you need to stop classes, tell us — and the full cancellation and refund terms are in the Terms of Service, which is the document that governs enrolment.',
  },
];

export default function RulesPage({ onBack }: { onBack: () => void }) {
  return (
    <div data-testid="rules-page" className="min-h-screen bg-[#FFFFFF] text-[#0B2E3A] pt-24 pb-20 px-6" dir="ltr">
      <div className="max-w-[1280px] mx-auto">
        <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Class Rules' }]} />
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
              Class Rules — In Plain Language
            </h1>
            <p className="text-xl md:text-2xl text-[#3D5563] max-w-3xl mx-auto">
              How make-up classes, leave, holidays and fees work at Beacon —
              written so a parent can understand them, without legal language.
              The full legal terms are on the{' '}
              <a href="/terms" className="font-bold text-[#004050] underline underline-offset-2">
                Terms of Service
              </a>{' '}
              page.
            </p>
          </div>
        </Reveal>

        {/* The six rules */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {RULES.map((rule, idx) => (
            <Reveal key={rule.title} delay={idx * 0.08}>
              <div className="bg-[#FFFFFF] border border-[#C9D9E8] p-8 rounded-3xl h-full shadow-[0_10px_30px_rgba(11,46,58,0.05)] relative overflow-hidden">
                <div
                  aria-hidden="true"
                  className={`${idx % 2 === 0 ? 'dots-texture' : 'streaks-texture'} pointer-events-none absolute right-[-10px] top-[-8px] w-[110px] h-[70px] opacity-45`}
                />
                <div className="flex items-center gap-4 mb-5 relative">
                  <div className="bg-[#EAF1F7] border border-[#C9D9E8] p-3 rounded-xl">
                    <rule.icon className="w-6 h-6 text-[#004050]" />
                  </div>
                  <span className="text-sm font-bold text-[#7A7A50]">Rule {idx + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-[#0B2E3A] mb-3 relative">
                  {rule.title}
                </h3>
                <p className="text-[#3D5563] leading-relaxed relative">{rule.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Raise a concern + the full terms */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <Reveal delay={0.1}>
            <div className="bg-[#FFFFFF] border border-[#C9D9E8] p-8 rounded-3xl h-full shadow-[0_10px_30px_rgba(11,46,58,0.05)] relative overflow-hidden">
              <div
                aria-hidden="true"
                className="streaks-texture-gold pointer-events-none absolute right-[-10px] top-[-8px] w-[130px] h-[80px] opacity-45"
              />
              <div className="flex items-center gap-4 mb-6 relative">
                <div className="bg-[#EAF1F7] border border-[#C9D9E8] p-3 rounded-xl">
                  <MessageCircle className="w-6 h-6 text-[#004050]" />
                </div>
                <h2 className="text-2xl font-bold text-[#0B2E3A] font-display">
                  Raising a concern
                </h2>
              </div>
              <p className="text-[#3D5563] leading-relaxed text-lg mb-6 relative">
                If a rule does not seem fair, or something about your
                classes is not right, tell us directly. A concern raised
                early can be fixed early.
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

          <Reveal delay={0.2}>
            <div className="bg-[#FFFFFF] border border-[#C9D9E8] p-8 rounded-3xl h-full shadow-[0_10px_30px_rgba(11,46,58,0.05)] relative overflow-hidden">
              <div
                aria-hidden="true"
                className="grid-texture pointer-events-none absolute right-[-10px] top-[-8px] w-[130px] h-[80px] opacity-45"
              />
              <div className="flex items-center gap-4 mb-6 relative">
                <div className="bg-[#EAF1F7] border border-[#C9D9E8] p-3 rounded-xl">
                  <FileText className="w-6 h-6 text-[#004050]" />
                </div>
                <h2 className="text-2xl font-bold text-[#0B2E3A] font-display">
                  The full terms
                </h2>
              </div>
              <p className="text-[#3D5563] leading-relaxed text-lg mb-6 relative">
                This page is a plain-language summary. The Terms of Service
                is the document that governs enrolment, including the
                details of fees, attendance and cancellation.
              </p>
              <p className="relative">
                <a href="/terms" className="font-bold text-[#004050] underline underline-offset-2">
                  Read the Terms of Service →
                </a>
              </p>
            </div>
          </Reveal>
        </div>

        {/* CTA */}
        <Reveal>
          <div className="text-center border-t border-[#D7E3EE] pt-16">
            <h2 className="text-3xl font-bold text-[#0B2E3A] mb-8 font-display">
              See how it works — book a free trial class
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
