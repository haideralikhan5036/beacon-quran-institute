import { ArrowRight, MapPin } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import { useLanguage } from '../context/LanguageContext';
import type { ViewState } from '../App';

// Homepage internal links to the three country landing pages (SEO Batch 2):
// one short card per country so Google — and visitors — can reach /usa,
// /uk and /canada from the homepage.
const COUNTRIES: { view: 'usa' | 'uk' | 'canada'; name: string; line: string }[] = [
  { view: 'usa', name: 'USA', line: 'Online Quran classes in the USA — 1-on-1 lessons on US time zones' },
  { view: 'uk', name: 'UK', line: 'Online Quran classes UK — one-to-one lessons with DBS-checked tutors' },
  { view: 'canada', name: 'Canada', line: 'Online Quran classes in Canada — 1-on-1 lessons across Canadian time zones' },
];

export default function CountryLinks({ setView }: { setView: (view: ViewState) => void }) {
  const { isAr } = useLanguage();

  return (
    <section className="py-8 sm:py-12 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal delay={0.1} width="100%">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold display text-amber-50 text-balance">
              {isAr ? 'تعلّم القرآن عبر الإنترنت في بلدك' : 'Learn Quran Online in Your Country'}
            </h2>
            <p className="text-amber-100/85 text-base leading-relaxed mt-3 max-w-2xl mx-auto">
              {isAr
                ? 'دروس قرآنية فردية مباشرة لطلابنا في الولايات المتحدة وبريطانيا وكندا.'
                : 'Live one-on-one Quran classes for our students in the USA, UK and Canada.'}
            </p>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {COUNTRIES.map((c, i) => (
            <Reveal key={c.view} delay={0.15 + i * 0.08}>
              <button
                onClick={() => { setView(c.view); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="card-shine border border-[#949693]/30 hover:border-amber-300/60 p-6 rounded-3xl w-full text-left shadow-xl transition-all hover:scale-[1.01] cursor-pointer group"
              >
                <span className="flex items-center gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-amber-200" />
                  <span className="text-xl font-bold display text-amber-50">{c.name}</span>
                </span>
                <span className="block text-sm text-amber-100/85 leading-relaxed mb-4">{c.line}</span>
                <span className="flex items-center gap-2 text-amber-300 group-hover:text-white font-bold uppercase tracking-widest text-[10px] transition-colors">
                  <span>Explore {c.name} classes</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
