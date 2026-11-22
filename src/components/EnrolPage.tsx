// Enrol — its own page (Batch 12). The nav used to scroll to the homepage
// form; every menu option now has a separate page, so this page renders the
// same Registration form under a page banner. The homepage keeps its own
// form section too. A fee-table row preselects the course + schedule here
// via the props below.
import { ArrowLeft } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import Breadcrumbs from './Breadcrumbs';
import Registration from './Registration';

interface EnrolPageProps {
  onBack: () => void;
  preSelectedCourse?: string | null;
  preSelectedSchedule?: string | null;
}

export default function EnrolPage({ onBack, preSelectedCourse, preSelectedSchedule }: EnrolPageProps) {
  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#0B2E3A] pt-24 pb-20 px-6" dir="ltr">
      <div className="max-w-[1280px] mx-auto">
        <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Enrol' }]} />
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#3D5563] hover:text-[#004050] transition-colors mb-10 group cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>

        <Reveal width="100%">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#004050] mb-3">
              Enrol
            </p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-semibold leading-tight text-[#0B2E3A] text-balance">
              Book your free trial class
            </h1>
            <p className="text-[#3D5563] text-base sm:text-lg leading-relaxed mt-4 text-balance font-medium">
              Tell us your course and schedule — we arrange a free one-to-one
              trial class with a certified teacher, at a time that suits your
              family. No payment, no commitment.
            </p>
            <div aria-hidden="true" className="w-12 h-[3px] bg-[#7A7A50] rounded-full mx-auto mt-6" />
          </div>
        </Reveal>
      </div>

      <Registration
        preSelectedCourse={preSelectedCourse}
        preSelectedSchedule={preSelectedSchedule}
        standalone
      />
    </div>
  );
}
