import { Reveal } from './ui/Reveal';
import Breadcrumbs from './Breadcrumbs';
import {
  ArrowLeft, ArrowRight, Award, CheckCircle2, GraduationCap,
  FileBadge, BookOpenCheck, Mail, MessageCircle, ShieldCheck, Truck,
} from 'lucide-react';

// Certificate of Appraisal page (Tarteel-adapt batch, item 7).
// Rebuilt from the legacy dark/amber page: the old page showed a
// SAMPLE certificate for an invented student (invented name, grade
// and date) and a dead "Sample Certificate" download button. This version uses placeholder text only, is
// labelled SAMPLE, and makes no claim it cannot support:
// - no online verification lookup exists, so verification is by
//   contacting the institute with the certificate details;
// - format (owner-confirmed 2026-11-25): the certificate is issued
//   digitally on successful completion of the course syllabus, and a
//   printed copy can be sent by courier to the student's address on
//   request;
// - no Ijazah certificate track — Beacon has no Ijazah course.
// Open questions are logged in
// BEACON-TARTEEL-ADAPT-DECISIONS-2026-11-24.md (signatory,
// what "successful completion" means, Ijazah, third-party checks).

const COURSES = [
  { name: 'Noorani Qaida', href: '/courses/noorani-qaida', desc: 'From the first Arabic letters to fluent reading.' },
  { name: 'Recitation & Tajweed', href: '/courses/recitation-tajweed', desc: 'Correct recitation, with every Tajweed rule applied.' },
  { name: 'Hifz Program', href: '/courses/hifz-program', desc: 'Memorisation of the Quran, at the student\u2019s own pace.' },
  { name: 'Tafseer-ul-Quran', href: '/courses/tafseer-ul-quran', desc: 'Understanding the meaning and message of the Quran.' },
  { name: 'Islamic Studies', href: '/courses/islamic-studies', desc: 'Aqeedah, Fiqh, Seerah and Islamic manners.' },
];

const FEATURES = [
  {
    icon: GraduationCap,
    title: 'Standard Achievement',
    text: 'Recognises the successful completion of the course syllabus — the student finished what the course set out to teach.',
  },
  {
    icon: FileBadge,
    title: 'Tajweed Excellence',
    text: 'A special endorsement for students who show mastery of the phonetic rules of Tajweed in their recitation.',
  },
  {
    icon: BookOpenCheck,
    title: 'Recitation evaluated',
    text: 'The certificate recognises not just attendance, but an evaluation of the student\u2019s recitation and Tajweed at the end of the course.',
  },
];

export default function CertificateOfAppraisal({ onBack }: { onBack: () => void }) {
  return (
    <div data-testid="certificate-page" className="min-h-screen bg-[#FFFFFF] text-[#0B2E3A] pt-24 pb-20 px-6" dir="ltr">
      <div className="max-w-[1280px] mx-auto">
        <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Certificates' }]} />
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
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#7A7A50] mb-4">Academic Recognition</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0B2E3A] mb-6 font-display">
              Certificate of Appraisal
            </h1>
            <p className="text-xl md:text-2xl text-[#3D5563] max-w-3xl mx-auto">
              When a student completes a course with us, we mark the
              achievement properly. On successful completion of a course,
              the student receives a formal Certificate of Appraisal —
              a record of what they learned and how well they recite.
            </p>
          </div>
        </Reveal>

        {/* What the certificate recognises */}
        <div className="mb-24">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B2E3A] mb-4 font-display">
                What the certificate recognises
              </h2>
              <div className="w-24 h-1 bg-[#004050] mx-auto rounded-full"></div>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {FEATURES.map((feature, idx) => (
              <Reveal key={feature.title} delay={idx * 0.08}>
                <div className="bg-[#FFFFFF] border border-[#C9D9E8] p-8 rounded-3xl h-full shadow-[0_10px_30px_rgba(11,46,58,0.05)] relative overflow-hidden">
                  <div
                    aria-hidden="true"
                    className={`${idx % 2 === 0 ? 'dots-texture' : 'streaks-texture'} pointer-events-none absolute right-[-10px] top-[-8px] w-[110px] h-[70px] opacity-45`}
                  />
                  <div className="bg-[#EAF1F7] border border-[#C9D9E8] p-3 rounded-xl w-fit mb-5 relative">
                    <feature.icon className="w-6 h-6 text-[#004050]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0B2E3A] mb-3 relative">
                    {feature.title}
                  </h3>
                  <p className="text-[#3D5563] leading-relaxed relative">{feature.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Courses it applies to + sample certificate */}
        <div className="grid lg:grid-cols-2 gap-8 mb-24 items-start">
          <Reveal delay={0.1}>
            <div className="bg-[#FFFFFF] border border-[#C9D9E8] p-8 rounded-3xl h-full shadow-[0_10px_30px_rgba(11,46,58,0.05)] relative overflow-hidden">
              <div
                aria-hidden="true"
                className="grid-texture pointer-events-none absolute right-[-10px] top-[-8px] w-[130px] h-[80px] opacity-45"
              />
              <h2 className="text-2xl font-bold text-[#0B2E3A] mb-3 font-display relative">
                Which courses it applies to
              </h2>
              <p className="text-[#3D5563] leading-relaxed mb-6 relative">
                A Certificate of Appraisal is issued on successful
                completion of any of our five courses:
              </p>
              <ul className="space-y-4 relative">
                {COURSES.map((course) => (
                  <li key={course.name}>
                    <a href={course.href} className="flex items-start gap-3 group cursor-pointer">
                      <CheckCircle2 className="w-5 h-5 text-[#004050] shrink-0 mt-0.5" />
                      <span>
                        <span className="font-bold text-[#004050] group-hover:underline underline-offset-2">{course.name}</span>
                        <span className="text-[#3D5563]"> — {course.desc}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Sample certificate — placeholder text only, clearly labelled */}
          <Reveal delay={0.2}>
            <div className="relative">
              <div className="bg-[#FFFFFF] border-2 border-[#004050] rounded-3xl p-8 md:p-10 text-center shadow-[0_10px_30px_rgba(11,46,58,0.08)] relative overflow-hidden">
                <div
                  aria-hidden="true"
                  className="dots-texture pointer-events-none absolute left-[-10px] top-[-8px] w-[110px] h-[70px] opacity-40"
                />
                <span className="inline-block bg-[#7A7A50] text-white text-xs font-bold uppercase tracking-[0.25em] px-4 py-2 rounded-full mb-8 relative">
                  Sample
                </span>
                <Award className="w-12 h-12 text-[#004050] mx-auto mb-6 relative" />
                <p className="text-sm uppercase tracking-[0.3em] text-[#7A7A50] font-bold mb-3 relative">Beacon Quran Institute</p>
                <h3 className="text-3xl font-bold text-[#0B2E3A] mb-2 font-display relative">Certificate of Appraisal</h3>
                <div className="w-20 h-1 bg-[#004050] mx-auto mb-8 rounded-full relative"></div>
                <p className="text-[#3D5563] italic mb-2 relative">This is to certify that</p>
                <p className="text-2xl md:text-3xl font-bold text-[#0B2E3A] mb-8 border-b border-[#C9D9E8] inline-block px-8 pb-2 font-display relative">Student Name</p>
                <p className="text-[#3D5563] leading-relaxed mb-10 max-w-md mx-auto relative">
                  has successfully completed the{' '}
                  <span className="font-bold text-[#004050]">Course Name</span>{' '}
                  course.
                </p>
                <div className="flex justify-between items-end px-2 md:px-6 relative">
                  <div className="text-left">
                    <div className="w-28 h-0.5 bg-[#C9D9E8] mb-2"></div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#3D5563]">Authorised Signatory</p>
                  </div>
                  <div className="w-16 h-16 border-2 border-[#7A7A50] rounded-full flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-[#7A7A50]" />
                  </div>
                </div>
              </div>
              <p className="text-sm text-[#3D5563] text-center mt-4">
                Sample layout only — names, course and details on a real
                certificate are the student&apos;s own.
              </p>
            </div>
          </Reveal>
        </div>

        {/* What you receive — format (owner-confirmed) */}
        <div className="mb-24">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B2E3A] mb-4 font-display">
                What you receive
              </h2>
              <div className="w-24 h-1 bg-[#004050] mx-auto rounded-full"></div>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            <Reveal>
              <div className="bg-[#FFFFFF] border border-[#C9D9E8] p-8 rounded-3xl h-full shadow-[0_10px_30px_rgba(11,46,58,0.05)] relative overflow-hidden">
                <div
                  aria-hidden="true"
                  className="dots-texture pointer-events-none absolute right-[-10px] top-[-8px] w-[110px] h-[70px] opacity-45"
                />
                <div className="bg-[#EAF1F7] border border-[#C9D9E8] p-3 rounded-xl w-fit mb-5 relative">
                  <FileBadge className="w-6 h-6 text-[#004050]" />
                </div>
                <h3 className="text-xl font-bold text-[#0B2E3A] mb-3 relative">
                  Digital certificate
                </h3>
                <p className="text-[#3D5563] leading-relaxed relative">
                  The certificate is issued digitally on successful
                  completion of the course syllabus.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="bg-[#FFFFFF] border border-[#C9D9E8] p-8 rounded-3xl h-full shadow-[0_10px_30px_rgba(11,46,58,0.05)] relative overflow-hidden">
                <div
                  aria-hidden="true"
                  className="streaks-texture pointer-events-none absolute right-[-10px] top-[-8px] w-[110px] h-[70px] opacity-45"
                />
                <div className="bg-[#EAF1F7] border border-[#C9D9E8] p-3 rounded-xl w-fit mb-5 relative">
                  <Truck className="w-6 h-6 text-[#004050]" />
                </div>
                <h3 className="text-xl font-bold text-[#0B2E3A] mb-3 relative">
                  Printed copy on request
                </h3>
                <p className="text-[#3D5563] leading-relaxed relative">
                  A printed copy can be sent by courier to the
                  student&apos;s address on request.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Verification — honest framing: no online lookup exists */}
        <Reveal width="100%">
          <div className="bg-[#004050] p-8 md:p-12 rounded-3xl shadow-[0_16px_40px_rgba(0,64,80,0.25)] relative overflow-hidden mb-24">
            <div
              aria-hidden="true"
              className="dots-texture-white pointer-events-none absolute right-[-8px] top-[-8px] w-[130px] h-[80px] opacity-50"
            />
            <div className="flex items-center gap-4 mb-5 relative">
              <div className="bg-white/10 border border-white/20 p-3 rounded-xl">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white font-display">
                How to verify a certificate
              </h2>
            </div>
            <p className="text-white/85 leading-relaxed text-lg mb-6 relative max-w-3xl">
              There is no online certificate lookup on this site. To check
              that a certificate is genuine, contact the institute with
              the details shown on the certificate — the name on it, the
              course, and the date it was issued — and we will confirm it.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 relative">
              <a
                href="mailto:beaconquraninstitute@gmail.com"
                className="flex items-center gap-3 text-white font-bold hover:underline underline-offset-2 cursor-pointer"
              >
                <Mail className="w-5 h-5 shrink-0" />
                beaconquraninstitute@gmail.com
              </a>
              <a
                href="https://wa.me/923461573771"
                className="flex items-center gap-3 text-white font-bold hover:underline underline-offset-2 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 shrink-0" />
                WhatsApp +92 346 1573771
              </a>
            </div>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal width="100%">
          <div className="text-center border-t border-[#D7E3EE] pt-16">
            <h2 className="text-3xl font-bold text-[#0B2E3A] mb-8 font-display">
              Start a course — and earn your certificate
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
