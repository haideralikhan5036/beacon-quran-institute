// "Near me" section (SEO Batch 3): for visitors who searched for a Quran
// teacher "near me". Honest copy only — Beacon is an online-only academy
// with no physical campus, so the answer is that "near" means "from home":
// a certified one-to-one teacher, no travel, any city or country, with a
// free trial class first. No invented address, office, or local-business
// schema anywhere.
import React from 'react';
import { MapPin, Home, Globe2, GraduationCap, ChevronDown } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import { useLanguage } from '../context/LanguageContext';
import { scrollToId } from '../utils/scrollToId';

export default function NearYou() {
  const { isAr } = useLanguage();
  const [faqOpen, setFaqOpen] = React.useState(false);

  const eyebrow = isAr ? 'قريب منك، أينما كنت' : 'Near You, Wherever You Are';
  const title = isAr
    ? 'دروس قرآن قريبة منك — تعلّم عبر الإنترنت من أي مكان'
    : 'Quran Classes Near You — Learn Online from Anywhere';
  const intro = isAr
    ? 'تبحث عن دروس قرآن قريبة منك؟ لا تحتاج إلى قاعة في حيّك. معهد بيكون أكاديمية عبر الإنترنت بالكامل — درسك يكون في بيتك، مع معلّم معتمد يدرّسك وجهاً لوجه، في وقت يناسب عائلتك. بلا سفر وبلا قوائم انتظار، في أي مدينة أو بلد كنت.'
    : 'Searching for "Quran classes near me"? You don\'t need a classroom down the road. Beacon Quran Institute is a fully online academy — your class happens at home, with a certified teacher who teaches you one-to-one, at a time that suits your family. No travel, no waiting lists, no matter which city or country you live in.';
  const body1 = isAr
    ? 'عندما تبحث عن دروس قرآن عبر الإنترنت قريبة منك، فما تريده حقاً هو معلّم تثق به، في وقت يناسب عائلتك. بدل أن تتمنى أن يكون لدى معلّم قرآن قريب منك مكان شاغر، تختار بنفسك معلّماً معتمداً — رجالاً ونساءً — وتحجز درساً تجريبياً مجانياً أولاً.'
    : 'When you look for "online Quran classes near me", what you really want is a teacher you can trust, at a time that fits your family. Instead of hoping a "Quran teacher near me" has a free slot, you choose your own certified male or female teacher — and you book a free trial class first.';
  const body2 = isAr
    ? 'اعتبر بيكون أكاديمية القرآن القريبة منك لكل عائلة — عبر الإنترنت، فكلمة "قريب" تعني أينما كنت. والآباء الذين يبحثون عن دروس قرآن للأطفال قريبة منهم يحصل أطفالهم على نفس الاهتمام الفردي، من البيت، مع درس تجريبي مجاني أولاً.'
    : 'Think of Beacon as the "Quran academy near me" for every family — online, so "near" means wherever you are. And parents searching for "Quran classes for kids near me" get the same one-to-one attention for their children, from home, with a free trial class first.';
  const faqHeading = isAr ? 'سؤال شائع' : 'Frequently asked';
  const faqQ = isAr
    ? 'بحثت عن دروس قرآن قريبة مني — هل يمكنني التعلّم عبر الإنترنت بدلاً من ذلك؟'
    : 'I searched for Quran classes near me — can I learn online instead?';
  const faqA = isAr
    ? 'نعم — هذه بالضبط طريقة عمل بيكون. نحن أكاديمية عبر الإنترنت فقط، بلا حرم جامعي، فلا شيء تحتاج إلى السفر إليه. تتعلّم وجهاً لوجه من بيتك مع معلّم معتمد، في أوقات تناسب عائلتك، في أي مدينة أو بلد. احجز درساً تجريبياً مجانياً وجرّب بنفسك قبل التسجيل.'
    : 'Yes — that\'s exactly how Beacon works. We\'re an online-only academy with no physical campus, so there\'s nothing to travel to. You learn one-to-one from home with a certified teacher, at times that fit your family, in any city or country. Book a free trial class and see if online learning suits you before you enrol.';
  const ctaText = isAr ? 'احجز درساً تجريبياً مجانياً' : 'Book a Free Trial Class';

  const points = [
    {
      icon: Home,
      title: isAr ? 'بلا سفر' : 'No travel',
      text: isAr ? 'تعلّم من غرفة معيشتك.' : 'Learn from your living room.',
    },
    {
      icon: Globe2,
      title: isAr ? 'أي مدينة، أي بلد' : 'Any city, any country',
      text: isAr ? 'طلاب في أكثر من ٣٠ دولة.' : 'Students in 30+ countries.',
    },
    {
      icon: GraduationCap,
      title: isAr ? 'درس تجريبي مجاني' : 'Free trial class',
      text: isAr ? 'تعرّف على معلّمك أولاً.' : 'Meet your teacher first.',
    },
  ];

  return (
    <section id="near-you" className="py-12 sm:py-16 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal delay={0.1} width="100%">
          <div className="card-shine border border-[#949693]/35 p-6 sm:p-9 rounded-[2.5rem] max-w-3xl mx-auto text-center mb-8 sm:mb-10 shadow-2xl">
            <div className={`inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-[#084C63]/30 border border-[#949693]/40 mb-4 ${isAr ? 'flex-row-reverse' : ''}`}>
              <MapPin className="w-4 h-4 text-amber-200" />
              <p className="display text-[10px] font-extrabold uppercase tracking-[0.3em] text-amber-200">{eyebrow}</p>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold serif text-amber-50 mb-4 text-balance">{title}</h2>
            <p className="text-amber-100/95 max-w-xl mx-auto text-base sm:text-lg leading-relaxed text-balance font-medium">
              {intro}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15} width="100%">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-10">
            <p className="text-amber-100/90 text-base sm:text-lg leading-relaxed font-medium">{body1}</p>
            <p className="text-amber-100/90 text-base sm:text-lg leading-relaxed font-medium">{body2}</p>
          </div>
        </Reveal>

        <Reveal delay={0.2} width="100%">
          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10">
            {points.map((p) => (
              <div key={p.title} className="card-shine border border-[#949693]/35 rounded-[1.5rem] p-5 text-center shadow-xl">
                <p.icon className="w-6 h-6 text-amber-200 mx-auto mb-2" />
                <p className="font-bold display text-amber-50 text-sm mb-1">{p.title}</p>
                <p className="text-amber-100/80 text-sm">{p.text}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.25} width="100%">
          <div className="text-center mb-10">
            <button
              onClick={() => scrollToId('registration')}
              className="px-7 py-3 rounded-full bg-primary text-white font-bold uppercase tracking-[0.2em] text-[11px] shadow-xl shadow-primary/10 hover:scale-105 transition-transform cursor-pointer"
            >
              {ctaText}
            </button>
          </div>
        </Reveal>

        {/* One-question FAQ: the "near me" question, answered honestly. */}
        <Reveal delay={0.3} width="100%">
          <div className="max-w-3xl mx-auto">
            <p className="text-center display text-[10px] font-extrabold uppercase tracking-[0.3em] text-amber-200/80 mb-4">
              {faqHeading}
            </p>
            <div className="card-shine border border-[#949693]/35 rounded-[1.5rem] shadow-xl overflow-hidden">
              <button
                onClick={() => setFaqOpen((o) => !o)}
                aria-expanded={faqOpen}
                className="w-full text-left px-5 sm:px-6 py-4 flex items-center gap-3 cursor-pointer hover:bg-white/[0.03] transition-colors"
              >
                <span className="flex-1 font-bold text-amber-50 text-sm sm:text-base leading-snug">{faqQ}</span>
                <ChevronDown className={`w-5 h-5 text-amber-200 shrink-0 transition-transform duration-300 ${faqOpen ? 'rotate-180' : ''}`} />
              </button>
              {faqOpen && (
                <p className="px-5 sm:px-6 pb-5 text-amber-100/90 text-sm sm:text-base leading-relaxed font-medium">
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
