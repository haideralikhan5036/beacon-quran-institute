// "Near me" section (SEO Batch 3): for visitors who searched for a Quran
// teacher "near me". Honest copy only — Beacon is an online-only academy
// with no physical campus, so the answer is that "near" means "from home":
// a certified one-to-one teacher, no travel, any city or country, with a
// free trial class first. No invented address, office, or local-business
// schema anywhere.
import React from 'react';
import { MapPin, Home, Globe2, GraduationCap, ChevronDown } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import { scrollToId } from '../utils/scrollToId';

export default function NearYou() {
  const [faqOpen, setFaqOpen] = React.useState(false);

  const eyebrow = 'Near You, Wherever You Are';
  const title = 'Quran Classes Near You — Learn Online from Anywhere';
  const intro = 'Searching for "Quran classes near me"? You don\'t need a classroom down the road. Beacon Quran Institute is a fully online academy — your class happens at home, with a certified teacher who teaches you one-to-one, at a time that suits your family. No travel, no waiting lists, no matter which city or country you live in.';
  const body1 = 'When you look for "online Quran classes near me", what you really want is a teacher you can trust, at a time that fits your family. Instead of hoping a "Quran teacher near me" has a free slot, you choose your own certified male or female teacher — and you book a free trial class first.';
  const body2 = 'Think of Beacon as the "Quran academy near me" for every family — online, so "near" means wherever you are. And parents searching for "Quran classes for kids near me" get the same one-to-one attention for their children, from home, with a free trial class first.';
  const faqHeading = 'Frequently asked';
  const faqQ = 'I searched for Quran classes near me — can I learn online instead?';
  const faqA = 'Yes — that\'s exactly how Beacon works. We\'re an online-only academy with no physical campus, so there\'s nothing to travel to. You learn one-to-one from home with a certified teacher, at times that fit your family, in any city or country. Book a free trial class and see if online learning suits you before you enrol.';
  const ctaText = 'Book a Free Trial Class';

  const points = [
    {
      icon: Home,
      title: 'No travel',
      text: 'Learn from your living room.',
    },
    {
      icon: Globe2,
      title: 'Any city, any country',
      text: 'Students in 30+ countries.',
    },
    {
      icon: GraduationCap,
      title: 'Free trial class',
      text: 'Meet your teacher first.',
    },
  ];

  return (
    <section id="near-you" className="py-16 sm:py-20 bg-[#FFFFFF] relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <Reveal delay={0.1} width="100%">
          <div className="bg-[#FFFFFF] border border-[#C9D9E8] p-6 sm:p-9 rounded-3xl max-w-3xl mx-auto text-center mb-8 sm:mb-10 shadow-[0_10px_30px_rgba(11,46,58,0.06)]">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-[#EAF1F7] border border-[#C9D9E8] mb-4">
              <MapPin className="w-4 h-4 text-[#004050]" />
              <p className="font-display text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#004050]">{eyebrow}</p>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-[#0B2E3A] mb-4 text-balance">{title}</h2>
            <p className="text-[#3D5563] max-w-xl mx-auto text-base sm:text-lg leading-relaxed text-balance font-medium">
              {intro}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15} width="100%">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-10">
            <p className="text-[#3D5563] text-base sm:text-lg leading-relaxed font-medium">{body1}</p>
            <p className="text-[#3D5563] text-base sm:text-lg leading-relaxed font-medium">{body2}</p>
          </div>
        </Reveal>

        <Reveal delay={0.2} width="100%">
          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10">
            {points.map((p) => (
              <div key={p.title} className="bg-[#FFFFFF] border border-[#C9D9E8] rounded-3xl p-5 text-center shadow-[0_10px_30px_rgba(11,46,58,0.05)]">
                <p.icon className="w-6 h-6 text-[#004050] mx-auto mb-2" />
                <p className="font-bold font-display text-[#0B2E3A] text-sm mb-1">{p.title}</p>
                <p className="text-[#3D5563] text-sm">{p.text}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.25} width="100%">
          <div className="text-center mb-10">
            <button
              onClick={() => scrollToId('registration')}
              className="px-7 py-3 rounded-full bg-[#7A7A50] hover:bg-[#004050] text-white font-bold uppercase tracking-[0.2em] text-[11px] shadow-lg transition-colors cursor-pointer"
            >
              {ctaText}
            </button>
          </div>
        </Reveal>

        {/* One-question FAQ: the "near me" question, answered honestly. */}
        <Reveal delay={0.3} width="100%">
          <div className="max-w-3xl mx-auto">
            <p className="text-center font-display text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#004050] mb-4">
              {faqHeading}
            </p>
            <div className="bg-[#FFFFFF] border border-[#C9D9E8] rounded-3xl shadow-[0_10px_30px_rgba(11,46,58,0.05)] overflow-hidden">
              <button
                onClick={() => setFaqOpen((o) => !o)}
                aria-expanded={faqOpen}
                className="w-full text-left px-5 sm:px-6 py-4 flex items-center gap-3 cursor-pointer hover:bg-[#F4F8FB] transition-colors"
              >
                <span className="flex-1 font-bold text-[#0B2E3A] text-sm sm:text-base leading-snug">{faqQ}</span>
                <ChevronDown className={`w-5 h-5 text-[#004050] shrink-0 transition-transform duration-300 ${faqOpen ? 'rotate-180' : ''}`} />
              </button>
              {faqOpen && (
                <p className="px-5 sm:px-6 pb-5 text-[#3D5563] text-sm sm:text-base leading-relaxed font-medium">
                  {faqA}
                </p>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
