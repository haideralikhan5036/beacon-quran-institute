import { CalendarCheck, Users, TrendingUp } from 'lucide-react';
import { Reveal } from './ui/Reveal';

const STEPS = [
  {
    n: '1',
    icon: CalendarCheck,
    title: 'Book a free trial',
    text: 'Tell us your level and your preferred times. We arrange a free trial class at a time that suits your family — no payment, no commitment.',
  },
  {
    n: '2',
    icon: Users,
    title: 'Meet your teacher',
    text: 'Your trial is a real one-to-one class with a qualified teacher. Together you agree a plan — Qaida, Tajweed, Hifz or Islamic Studies — and a weekly schedule. If the fit is not right, ask for a different tutor and try again before you enrol.',
  },
  {
    n: '3',
    icon: TrendingUp,
    title: 'Learn weekly, track progress',
    text: 'Classes run every week at your fixed times, and parents receive a clear progress report every month — so you can actually see your child improving.',
  },
];

// Batch 15 (Halka + Mixed): the three step cards rotate through the
// three texture families instead of dots on every card.
const STEP_TEXTURES = ['dots-texture', 'streaks-texture', 'grid-texture'];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-14 sm:py-20 scroll-mt-24">
      <div className="max-w-[1280px] mx-auto px-6">
        <Reveal direction="up" width="100%">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#1E4E79] mb-3">
              How It Works
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-semibold leading-tight text-[#0B2E3A] text-balance">
              From trial to routine in three steps
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const direction = idx === 0 ? 'left' : idx === 2 ? 'right' : 'up';
            return (
              <Reveal key={step.n} direction={direction} delay={0.1 + idx * 0.08} width="100%">
                <div className="h-full bg-white border border-[#C9D9E8] rounded-3xl p-7 sm:p-8 shadow-[0_10px_30px_rgba(11,46,58,0.06)] relative overflow-hidden">
                  {/* Batch 15: texture family rotates per step card */}
                  <div
                    aria-hidden="true"
                    className={`${STEP_TEXTURES[idx % STEP_TEXTURES.length]} pointer-events-none absolute right-[-10px] top-[-8px] w-[100px] h-[64px] opacity-45`}
                  />
                  <div className="flex items-center justify-between mb-5">
                    <span className="w-12 h-12 rounded-2xl bg-[#004050] text-white flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </span>
                    <span className="font-display text-5xl font-semibold text-[#C9D9E8] leading-none">
                      {step.n}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-[#0B2E3A] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-[#3D5563]">{step.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
