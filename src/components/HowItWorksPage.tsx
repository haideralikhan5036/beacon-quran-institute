// How It Works — its own page (Batch 12). The nav used to scroll to the
// homepage section; every menu option now has a separate page, so this page
// reuses the same three-step section content under a page banner, with a
// call-to-action to the Enrol page at the end.
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import Breadcrumbs from './Breadcrumbs';
import HowItWorks from './HowItWorks';

interface HowItWorksPageProps {
  onBack: () => void;
  onEnrol: () => void;
}

export default function HowItWorksPage({ onBack, onEnrol }: HowItWorksPageProps) {
  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#0B2E3A] pt-24 pb-20 px-6" dir="ltr">
      <div className="max-w-[1280px] mx-auto relative">
        {/* Batch 15: light grid, top-right of the page banner */}
        <div
          aria-hidden="true"
          className="grid-texture pointer-events-none absolute right-[-8px] top-[-8px] w-[150px] h-[100px] opacity-50 hidden md:block"
        />
        <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'How It Works' }]} />
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#3D5563] hover:text-[#004050] transition-colors mb-10 group cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>

        <Reveal width="100%">
          <div className="text-center max-w-2xl mx-auto mb-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#1E4E79] mb-3">
              How It Works
            </p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-semibold leading-tight text-[#0B2E3A] text-balance">
              How online Quran classes work at Beacon
            </h1>
            <p className="text-[#3D5563] text-base sm:text-lg leading-relaxed mt-4 text-balance font-medium">
              No classroom, no travel, no waiting lists — a certified teacher,
              one-to-one, at times that suit your family. Here is exactly how
              it happens.
            </p>
          </div>
        </Reveal>
      </div>

      <HowItWorks />

      <div className="max-w-[1280px] mx-auto px-6">
        <Reveal width="100%">
          <div className="bg-[#004050] rounded-3xl px-6 sm:px-10 py-10 sm:py-12 text-center relative overflow-hidden">
            <div
              aria-hidden="true"
              className="dots-texture-white pointer-events-none absolute left-[-10px] bottom-[-8px] w-[150px] h-[90px] opacity-50"
            />
            {/* Batch 15: gold streaks, top-right of the CTA band */}
            <div
              aria-hidden="true"
              className="streaks-texture-gold pointer-events-none absolute right-[-10px] top-[-8px] w-[150px] h-[90px] opacity-50"
            />
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white mb-3 text-balance relative">
              Ready to begin your Quran journey?
            </h2>
            <p className="text-white/80 text-base leading-relaxed mb-6 max-w-xl mx-auto relative">
              Book a free trial class first — meet your teacher, agree your
              plan, and start learning this week.
            </p>
            <button
              onClick={onEnrol}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#7A7A50] hover:bg-[#686844] text-white font-bold text-sm shadow-lg transition-all active:scale-[0.98] cursor-pointer relative"
            >
              Book a Free Trial Class
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
