// Courses hub page (Batch 12). /courses used to show the first course's
// detail (Noorani Qaida) — the URL then rewrote itself to that course's
// slug, so /courses and /courses/noorani-qaida were the same page. Now
// /courses is a real listing page (the home Courses section, with a page
// header), and each course keeps its own detail page at /courses/<slug>.
import { ArrowLeft } from 'lucide-react';
import Breadcrumbs from './Breadcrumbs';
import Courses from './Courses';

interface CoursesHubPageProps {
  onBack: () => void;
  onSelectCourse?: (courseTitle: string) => void;
  onViewDetails?: (courseId: string) => void;
}

export default function CoursesHubPage({ onBack, onSelectCourse, onViewDetails }: CoursesHubPageProps) {
  return (
    <div className="min-h-screen bg-white pb-4 text-[#0B2E3A]">
      <div className="mx-auto max-w-[1280px] px-6 pt-24 sm:pt-28 relative">
        {/* Batch 15: gold streaks, top-right of the page header */}
        <div
          aria-hidden="true"
          className="streaks-texture-gold pointer-events-none absolute right-[4%] top-[96px] w-[150px] h-[90px] opacity-50 hidden md:block"
        />
        <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Courses' }]} />
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
        <h1 className="font-display text-3xl font-semibold text-[#0B2E3A] text-balance sm:text-4xl lg:text-5xl">
          Online Quran Courses
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#3D5563] sm:text-lg">
          Five course paths, one goal — live 1-on-1 online Quran classes for
          kids and adults, from your first Arabic letters to Hifz and Tafseer.
        </p>
      </div>
      <Courses onSelectCourse={onSelectCourse} onViewDetails={onViewDetails} />
    </div>
  );
}
