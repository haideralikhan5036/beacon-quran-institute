import { useEffect, useState, type MouseEvent } from 'react';
import {
  ArrowRight,
  BookMarked,
  Clock,
  FileText,
  GraduationCap,
  History,
  Mic2,
} from 'lucide-react';
import { COURSES, type CourseDetail } from '../data/courses';
import { Reveal } from './ui/Reveal';

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

const COURSE_ICONS: Record<string, typeof BookMarked> = {
  qaida: BookMarked,
  'recitation-tajweed': Mic2,
  hifz: History,
  tafseer: FileText,
  'islamic-studies': GraduationCap,
};

interface CoursesProps {
  onSelectCourse?: (courseTitle: string) => void;
  onViewDetails?: (courseId: string) => void;
}

interface CourseCardProps {
  // key is declared explicitly, matching RevealProps in ui/Reveal.tsx —
  // React 19's bundled types here do not supply it via IntrinsicAttributes.
  key?: string | number;
  course: CourseDetail;
  index: number;
  isMobile: boolean;
  onSelectCourse?: (courseTitle: string) => void;
  onViewDetails?: (courseId: string) => void;
}

function CourseCard({
  course,
  index,
  isMobile,
  onSelectCourse,
  onViewDetails,
}: CourseCardProps) {
  const Icon = COURSE_ICONS[course.id] ?? BookMarked;

  const handleEnrol = (e: MouseEvent) => {
    e.stopPropagation();
    // preventDefault too: the button sits inside the card's <a href>, and
    // stopPropagation alone does NOT stop the anchor's default action —
    // without this the browser follows the href to the course page right
    // after the SPA navigates to /enrol (caught by the Batch 14 harness).
    e.preventDefault();
    // App navigates to the dedicated Enrol page with this course preselected.
    onSelectCourse?.(course.title);
  };

  return (
    <Reveal
      width="100%"
      delay={Math.min(index, 2) * 0.08}
      direction={isMobile ? 'up' : index % 2 === 0 ? 'left' : 'right'}
      distance={24}
    >
      <a
        href={`/courses/${course.slug}`}
        onClick={(e) => {
          e.preventDefault();
          onViewDetails?.(course.id);
        }}
        className="group flex h-full cursor-pointer flex-col rounded-3xl border border-[#C9D9E8] bg-white p-6 shadow-[0_2px_12px_rgba(0,64,80,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#1E4E79]/50 hover:shadow-[0_12px_32px_rgba(0,64,80,0.12)] relative overflow-hidden"
      >
        {/* Halftone dots, mockup service-card placement: bottom-right */}
        <div
          aria-hidden="true"
          className="dots-texture pointer-events-none absolute right-[-10px] bottom-[-8px] w-[110px] h-[70px] opacity-45"
        />
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#004050]/5 text-[#004050] transition-colors group-hover:bg-[#004050] group-hover:text-white">
          <Icon className="h-6 w-6" />
        </div>

        <h3 className="text-xl font-semibold text-[#0B2E3A]">{course.title}</h3>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-[#3D5563]">{course.short}</p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-[#3D5563]">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-[#1E4E79]" />
            {course.duration}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <GraduationCap className="h-3.5 w-3.5 text-[#1E4E79]" />
            {course.level}
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#D7E3EE] pt-4">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1E4E79] transition-colors group-hover:text-[#004050]">
            View this course
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
          <button
            type="button"
            onClick={handleEnrol}
            className="cursor-pointer rounded-full bg-[#7A7A50] px-4 py-2 text-xs font-bold tracking-wide text-white uppercase transition-colors hover:bg-[#004050]"
          >
            Enrol
          </button>
        </div>
      </a>
    </Reveal>
  );
}

export default function Courses({ onSelectCourse, onViewDetails }: CoursesProps) {
  const isMobile = useIsMobile();

  return (
    <section id="courses" className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-[1280px] px-6">
        <Reveal width="100%" delay={0.05} direction={isMobile ? 'up' : 'left'} distance={24}>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold tracking-[0.25em] text-[#1E4E79] uppercase">
              Our Courses
            </p>
            <h2 className="font-display mt-3 text-3xl font-semibold text-[#0B2E3A] text-balance sm:text-4xl lg:text-5xl">
              Five course paths, one goal
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#3D5563]">
              Live 1-on-1 online Quran classes for kids and adults — pick the path that
              fits where you are today, and your teacher walks the rest of the way with you.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((course, index) => (
            <CourseCard
              key={course.id}
              course={course}
              index={index}
              isMobile={isMobile}
              onSelectCourse={onSelectCourse}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
