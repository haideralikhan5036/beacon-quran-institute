import { useEffect, useState, type ReactNode } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookMarked,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  GraduationCap,
  HelpCircle,
  ListOrdered,
  UserCheck,
  Users,
} from 'lucide-react';
import { COURSES, FEE_GROUP_COURSE, findCourse, type CourseDetail } from '../data/courses';
import { FEE_ROWS } from '../data/feeTable';
import { Reveal } from './ui/Reveal';
import Breadcrumbs from './Breadcrumbs';

/** Left/right scroll-in on desktop, from below on mobile. */
function useIsMobile(): boolean {
  // Always start false (desktop) so the first client render matches the
  // prerendered server HTML exactly; the effect below corrects it on
  // mount. It only steers Reveal animation directions, never content.
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const onChange = () => setIsMobile(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return isMobile;
}

interface CourseDetailsPageProps {
  onBack: () => void;
  selectedCourseId?: string | null;
  onRegisterCourse: (courseTitle: string) => void;
}

function SectionCard({
  icon: Icon,
  title,
  children,
  isMobile,
  direction,
}: {
  icon: typeof BookMarked;
  title: string;
  children: ReactNode;
  isMobile: boolean;
  direction: 'left' | 'right';
}) {
  return (
    <Reveal width="100%" delay={0.05} direction={isMobile ? 'up' : direction} distance={24}>
      <section className="rounded-3xl border border-[#C9D9E8] bg-white p-6 shadow-[0_2px_12px_rgba(0,64,80,0.06)] sm:p-8 relative overflow-hidden">
        {/* Batch 15: teal streaks, top-right of every course section card */}
        <div
          aria-hidden="true"
          className="streaks-texture pointer-events-none absolute right-[-10px] top-[-8px] w-[120px] h-[64px] opacity-45"
        />
        <div className="mb-5 flex items-center gap-3 relative">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#004050]/5 text-[#004050]">
            <Icon className="h-5 w-5" />
          </div>
          <h2 className="font-display text-xl font-semibold text-[#0B2E3A] sm:text-2xl">{title}</h2>
        </div>
        {children}
      </section>
    </Reveal>
  );
}

export default function CourseDetailsPage({
  onBack,
  selectedCourseId,
  onRegisterCourse,
}: CourseDetailsPageProps) {
  const isMobile = useIsMobile();
  const [activeCourse, setActiveCourse] = useState<CourseDetail>(() =>
    findCourse(selectedCourseId ?? ''),
  );
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Each course has a shareable URL (/courses/<slug>). Applied after a tick
  // so it runs after App's view effect, which resets the URL to /courses.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      window.history.replaceState(null, '', `/courses/${activeCourse.slug}`);
      document.title = `${activeCourse.title} | Beacon Quran Institute`;
    }, 0);
    return () => window.clearTimeout(timer);
    // Only on mount — tab switches call switchCourse instead.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const switchCourse = (course: CourseDetail) => {
    setActiveCourse(course);
    setOpenFaq(null);
    window.history.replaceState(null, '', `/courses/${course.slug}`);
    document.title = `${course.title} | Beacon Quran Institute`;
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const feeRows = FEE_ROWS.filter(
    (row) => row.course === FEE_GROUP_COURSE[activeCourse.feeGroup],
  );

  return (
    <div className="bg-white pb-20 text-[#3D5563]">
      <div className="mx-auto max-w-[1280px] px-6 pt-24 sm:pt-28">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Courses', href: '/courses' },
            { name: activeCourse.title },
          ]}
        />
        {/* Back link */}
        <button
          type="button"
          onClick={onBack}
          className="group mb-8 inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-[#1E4E79] transition-colors hover:text-[#004050]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#C9D9E8] bg-white transition-colors group-hover:border-[#004050]">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          </span>
          Back to Home
        </button>

        {/* Course switcher tabs */}
        <Reveal width="100%" delay={0.05} direction={isMobile ? 'up' : 'left'} distance={24}>
          <div className="mb-8 flex flex-wrap gap-2">
            {COURSES.map((course) => {
              const isActive = course.id === activeCourse.id;
              return (
                <a
                  key={course.id}
                  href={`/courses/${course.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    switchCourse(course);
                  }}
                  className={`cursor-pointer rounded-full border px-4 py-2.5 text-xs font-bold transition-all sm:text-sm ${
                    isActive
                      ? 'border-[#004050] bg-[#004050] text-white shadow-[0_4px_16px_rgba(0,64,80,0.25)]'
                      : 'border-[#C9D9E8] bg-white text-[#004050] hover:border-[#004050]'
                  }`}
                >
                  {course.title}
                </a>
              );
            })}
          </div>
        </Reveal>

        {/* Header */}
        <Reveal width="100%" delay={0.05} direction={isMobile ? 'up' : 'right'} distance={24}>
          <header className="rounded-3xl border border-[#C9D9E8] bg-white p-6 shadow-[0_2px_12px_rgba(0,64,80,0.06)] sm:p-10 relative overflow-hidden">
            {/* Halftone dots, mockup shell placement: top-right */}
            <div
              aria-hidden="true"
              className="dots-texture pointer-events-none absolute right-[-12px] top-[-8px] w-[150px] h-[100px] opacity-50"
            />
            <p className="text-xs font-bold tracking-[0.25em] text-[#1E4E79] uppercase">
              Course Details
            </p>
            <h1 className="font-display mt-3 text-3xl font-semibold text-[#0B2E3A] text-balance sm:text-4xl lg:text-5xl">
              {activeCourse.title}
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed sm:text-lg">
              {activeCourse.tagline}
            </p>

            {/* Spec chips */}
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C9D9E8] bg-[#004050]/5 px-3.5 py-2 text-xs font-semibold text-[#004050] sm:text-sm">
                <Award className="h-4 w-4 text-[#1E4E79]" />
                Level: {activeCourse.level}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C9D9E8] bg-[#004050]/5 px-3.5 py-2 text-xs font-semibold text-[#004050] sm:text-sm">
                <Clock className="h-4 w-4 text-[#1E4E79]" />
                Duration: {activeCourse.duration}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C9D9E8] bg-[#004050]/5 px-3.5 py-2 text-xs font-semibold text-[#004050] sm:text-sm">
                <Calendar className="h-4 w-4 text-[#1E4E79]" />
                {activeCourse.frequency}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C9D9E8] bg-[#004050]/5 px-3.5 py-2 text-xs font-semibold text-[#004050] sm:text-sm">
                <Users className="h-4 w-4 text-[#1E4E79]" />
                1-on-1 live classes
              </span>
            </div>

            <blockquote className="mt-7 rounded-r-2xl border-l-4 border-[#7A7A50] bg-[#7A7A50]/5 p-4 text-sm leading-relaxed italic sm:text-base">
              “{activeCourse.quote}”
            </blockquote>
          </header>
        </Reveal>

        <div className="mt-6 space-y-6 sm:mt-8 sm:space-y-8">
          {/* What you'll learn */}
          <SectionCard icon={BookMarked} title="What you'll learn" isMobile={isMobile} direction="left">
            <ol className="space-y-3">
              {activeCourse.curriculum.map((module, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 rounded-2xl border border-[#D7E3EE] bg-white p-4 text-sm leading-relaxed sm:text-base"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#004050] text-xs font-bold text-white">
                    {idx + 1}
                  </span>
                  <span>{module}</span>
                </li>
              ))}
            </ol>
          </SectionCard>

          {/* Who it's for + How a lesson works */}
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            <SectionCard icon={UserCheck} title="Who it's for" isMobile={isMobile} direction="left">
              <ul className="space-y-3">
                {activeCourse.whoIsItFor.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm leading-relaxed sm:text-base">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1E4E79]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </SectionCard>

            <SectionCard
              icon={ListOrdered}
              title="How a lesson works"
              isMobile={isMobile}
              direction="right"
            >
              <ol className="space-y-3">
                {activeCourse.lessonStructure.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm leading-relaxed sm:text-base">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#C9D9E8] bg-[#004050]/5 text-xs font-bold text-[#004050]">
                      {idx + 1}
                    </span>
                    <span className="pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </SectionCard>
          </div>

          {/* Teachers */}
          <SectionCard icon={GraduationCap} title="Teachers" isMobile={isMobile} direction="left">
            <p className="text-sm leading-relaxed sm:text-base">{activeCourse.teachers}.</p>
            <p className="mt-2 text-sm leading-relaxed sm:text-base">
              Sisters can request a female teacher. Every class is live and 1-on-1, so the
              teacher follows your pace, not a fixed group timetable.
            </p>
          </SectionCard>

          {/* Fees */}
          <SectionCard icon={Award} title={`Fees — ${activeCourse.title}`} isMobile={isMobile} direction="right">
            <div className="overflow-hidden rounded-2xl border border-[#D7E3EE]">
              <div className="hidden grid-cols-[1fr_auto_auto] gap-4 border-b border-[#D7E3EE] bg-[#004050]/5 px-4 py-3 text-xs font-bold tracking-wide text-[#004050] uppercase sm:grid">
                <span>Schedule</span>
                <span>Class length</span>
                <span className="text-right">Monthly fee (USD)</span>
              </div>
              {feeRows.map((row) => (
                <div
                  key={`${row.schedule}-${row.duration}`}
                  className="grid grid-cols-1 gap-1 border-b border-[#D7E3EE] px-4 py-3.5 text-sm last:border-b-0 sm:grid-cols-[1fr_auto_auto] sm:items-center sm:gap-4"
                >
                  <span className="font-semibold text-[#0B2E3A]">{row.schedule}</span>
                  <span className="text-[#3D5563]">{row.duration}</span>
                  <span className="font-bold text-[#004050] sm:text-right">{row.prices.USD}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed">
              Monthly fees. See the full fee table with 8 currencies in the Fees section.
            </p>
          </SectionCard>

          {/* FAQs */}
          <SectionCard
            icon={HelpCircle}
            title="Frequently asked questions"
            isMobile={isMobile}
            direction="left"
          >
            <div className="space-y-3">
              {activeCourse.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className={`overflow-hidden rounded-2xl border transition-colors ${
                      isOpen ? 'border-[#1E4E79]/50' : 'border-[#D7E3EE]'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      className="flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-3.5 text-left text-sm font-semibold text-[#0B2E3A] sm:text-base"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-[#1E4E79] transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <p className="border-t border-[#D7E3EE] px-4 py-3.5 text-sm leading-relaxed sm:text-base">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </SectionCard>

          {/* Bottom enrol banner */}
          <Reveal width="100%" delay={0.05} direction={isMobile ? 'up' : 'right'} distance={24}>
            <section className="rounded-3xl border border-[#C9D9E8] bg-white p-6 text-center shadow-[0_2px_12px_rgba(0,64,80,0.06)] sm:p-10 relative overflow-hidden">
              {/* Batch 15: dots, top-left of the enrol banner */}
              <div
                aria-hidden="true"
                className="dots-texture pointer-events-none absolute left-[-12px] top-[-8px] w-[140px] h-[90px] opacity-50"
              />
              <h2 className="font-display text-2xl font-semibold text-[#0B2E3A] text-balance sm:text-3xl relative">
                Ready to begin {activeCourse.title}?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed sm:text-base">
                Book a free trial class to meet your teacher and see how the lessons work —
                then enrol when you are ready.
              </p>
              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => onRegisterCourse(activeCourse.title)}
                  className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#7A7A50] px-8 py-4 text-sm font-bold tracking-wide text-white uppercase transition-colors hover:bg-[#004050] sm:w-auto"
                >
                  Enroll in {activeCourse.title}
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onRegisterCourse(activeCourse.title)}
                  className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-[#004050] bg-white px-8 py-4 text-sm font-bold tracking-wide text-[#004050] uppercase transition-colors hover:bg-[#004050]/5 sm:w-auto"
                >
                  Book a Free Trial
                </button>
              </div>
            </section>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
