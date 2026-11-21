import { ArrowRight, MapPin } from 'lucide-react';
import { Reveal } from './ui/Reveal';

// Homepage internal links to the three country landing pages (SEO Batch 2):
// one short card per country so Google — and visitors — can reach /usa,
// /uk and /canada from the homepage. Plain <a href> links (Batch 12):
// the delegated handler in App.tsx routes them client-side, crawlers and
// no-JS visitors follow the href to the prerendered page.
const COUNTRIES: { view: 'usa' | 'uk' | 'canada'; name: string; line: string }[] = [
  { view: 'usa', name: 'USA', line: 'Online Quran classes in the USA — 1-on-1 lessons on US time zones' },
  { view: 'uk', name: 'UK', line: 'Online Quran classes UK — one-to-one lessons with DBS-checked tutors' },
  { view: 'canada', name: 'Canada', line: 'Online Quran classes in Canada — 1-on-1 lessons across Canadian time zones' },
];

export default function CountryLinks() {
  return (
    <section className="py-8 sm:py-12 bg-[#FFFFFF] relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <Reveal delay={0.1} width="100%">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-[#0B2E3A] text-balance">
              Learn Quran Online in Your Country
            </h2>
            <p className="text-[#3D5563] text-base leading-relaxed mt-3 max-w-2xl mx-auto">
              Live one-on-one Quran classes for our students in the USA, UK and Canada.
            </p>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto items-stretch">
          {COUNTRIES.map((c, i) => (
            <Reveal key={c.view} delay={0.15 + i * 0.08} width="100%" containerStyle={{ height: '100%' }} innerStyle={{ height: '100%' }}>
              <a
                href={`/${c.view}`}
                className="bg-[#FFFFFF] border border-[#C9D9E8] hover:border-[#004050]/40 p-6 rounded-3xl w-full h-full text-left shadow-[0_10px_30px_rgba(11,46,58,0.05)] transition-all hover:scale-[1.01] cursor-pointer group flex flex-col"
              >
                <span className="flex items-center gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-[#004050]" />
                  <span className="text-xl font-bold font-display text-[#0B2E3A]">{c.name}</span>
                </span>
                <span className="block text-sm text-[#3D5563] leading-relaxed mb-4">{c.line}</span>
                <span className="flex items-center gap-2 text-[#7A7A50] group-hover:text-[#004050] font-bold uppercase tracking-widest text-[10px] transition-colors mt-auto">
                  <span>Explore {c.name} classes</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
