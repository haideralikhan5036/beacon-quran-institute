// Ask Beacon — full-page chat (/faq). The same client-side assistant as
// the floating button's overlay: keyword matching against the knowledge
// base in src/data/faqData.ts, no backend, no AI API. Below the chat, the
// six common questions are printed with their answers as plain text —
// those are the ONLY entries in the page's FAQPage JSON-LD, so the schema
// matches content visible in the prerendered HTML.
import { Reveal } from './ui/Reveal';
import Breadcrumbs from './Breadcrumbs';
import { ArrowLeft, ArrowRight, MessageCircle } from 'lucide-react';
import { ChatPanel } from './ChatBot';
import { FAQ_ITEMS } from '../data/faqData';

export default function FaqPage({ onBack }: { onBack: () => void }) {
  return (
    <div data-testid="faq-page" className="min-h-screen bg-[#FFFFFF] text-[#0B2E3A] pt-24 pb-20 px-6" dir="ltr">
      <div className="max-w-[1280px] mx-auto">
        <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Ask Beacon' }]} />
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#3D5563] hover:text-[#004050] transition-colors mb-12 group cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>

        {/* Hero */}
        <Reveal>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0B2E3A] mb-6 font-display">
              Ask Beacon
            </h1>
            <p className="text-xl md:text-2xl text-[#3D5563] max-w-3xl mx-auto">
              Questions about our Quran classes? Ask below — the assistant
              answers from Beacon&rsquo;s published pages. If it doesn&rsquo;t
              know, it will point you to WhatsApp.
            </p>
          </div>
        </Reveal>

        {/* Chat — NOT wrapped in <Reveal>: Reveal's width:fit-content div
            forces a max-w-3xl child to its full 768px max-width even on
            a 390px viewport (harness-proven overflow). */}
        <div className="max-w-3xl mx-auto mb-24 bg-[#FFFFFF] border border-[#C9D9E8] rounded-3xl shadow-[0_10px_30px_rgba(11,46,58,0.05)] overflow-hidden">
          <div className="bg-[#004050] text-white px-5 py-4 flex items-center gap-3">
            <div className="bg-white/10 p-2.5 rounded-xl">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-display text-xl font-bold leading-tight">Beacon&rsquo;s assistant</p>
              <p className="text-[13px] text-white/80 mt-0.5">Answers from our published pages &mdash; no account needed</p>
            </div>
          </div>
          <ChatPanel />
        </div>

        {/* Quick answers — the six common questions, printed in full.
            These are the only Q&As in the page's FAQPage JSON-LD. */}
        <div className="mb-24 max-w-3xl mx-auto" data-testid="faq-quick-answers">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B2E3A] mb-4 font-display">
                Quick answers
              </h2>
              <div className="w-24 h-1 bg-[#004050] mx-auto rounded-full"></div>
            </div>
          </Reveal>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, idx) => (
              <Reveal key={item.q} delay={idx * 0.05}>
                <div className="bg-[#FFFFFF] border border-[#C9D9E8] p-6 rounded-3xl shadow-[0_10px_30px_rgba(11,46,58,0.04)]">
                  <h3 className="text-lg font-bold text-[#0B2E3A] mb-2">{item.q}</h3>
                  <p className="text-[#3D5563] leading-relaxed">{item.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Still have a question? — same Reveal note as the chat card
            above: no <Reveal> wrapper around a max-w-3xl card. */}
        <div className="max-w-3xl mx-auto mb-24" data-testid="faq-contact-card">
          <div className="bg-[#FFFFFF] border border-[#C9D9E8] p-8 rounded-3xl shadow-[0_10px_30px_rgba(11,46,58,0.05)] relative overflow-hidden">
              <div
                aria-hidden="true"
                className="streaks-texture-gold pointer-events-none absolute right-[-10px] top-[-8px] w-[130px] h-[80px] opacity-45"
              />
              <div className="flex items-center gap-4 mb-6 relative">
                <div className="bg-[#EAF1F7] border border-[#C9D9E8] p-3 rounded-xl">
                  <MessageCircle className="w-6 h-6 text-[#004050]" />
                </div>
                <h2 className="text-2xl font-bold text-[#0B2E3A] font-display">
                  Still have a question?
                </h2>
              </div>
              <p className="text-[#3D5563] leading-relaxed text-lg mb-6 relative">
                Message us on WhatsApp — our team is here around the clock
                and replies straight away — or email us any time.
              </p>
              <p className="relative">
                WhatsApp us on{' '}
                <a href="https://wa.me/923461573771" className="font-bold text-[#004050] underline underline-offset-2">
                  +92 346 1573771
                </a>{' '}
                or email{' '}
                <a href="mailto:beaconquraninstitute@gmail.com" className="font-bold text-[#004050] underline underline-offset-2">
                  beaconquraninstitute@gmail.com
                </a>
                .
              </p>
            </div>
        </div>

        {/* CTA */}
        <Reveal>
          <div className="text-center border-t border-[#D7E3EE] pt-16">
            <h2 className="text-3xl font-bold text-[#0B2E3A] mb-8 font-display">
              See how it works — book a free trial class
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/enrol"
                className="bg-[#7A7A50] hover:bg-[#004050] text-white font-bold py-4 px-8 rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                Book a Free Trial
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="/courses"
                className="bg-[#FFFFFF] border border-[#C9D9E8] hover:bg-[#F4F8FB] text-[#004050] font-bold py-4 px-8 rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                View Our Courses
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
