import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import { useLanguage } from '../context/LanguageContext';
import { scrollToId } from '../utils/scrollToId';
import { CURRENCIES, FEE_ROWS, type CurrencyCode } from '../data/feeTable';

interface FeesProps {
  onSelectFee?: (course: string, schedule: string) => void;
  onContactRegistrar?: () => void;
  /** Controlled currency — owned by App so the geo auto-detect and the
      header region switcher can change the table. The tabs below call
      onCurrencyChange; they never own the value themselves. */
  currency: CurrencyCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
}

// Course groups for rowSpan: the fee table lists 8 rows — 3 for Qaida /
// Recitation / Islamic Studies, 3 for Hifz, 2 for Tafseer.
const COURSE_ROW_SPANS: { course: string; rows: number }[] = [
  { course: 'Qaida, Quran Recitation & Islamic Studies', rows: 3 },
  { course: 'Hifz e Quran', rows: 3 },
  { course: 'Quran Tafseer', rows: 2 },
];

export default function Fees({ onSelectFee, onContactRegistrar, currency, onCurrencyChange }: FeesProps) {
  const { isAr } = useLanguage();

  const handleSelect = (course: string, schedule: string) => {
    onSelectFee?.(course, schedule);
    scrollToId('registration');
  };

  const handleRegistrar = () => {
    if (onContactRegistrar) {
      onContactRegistrar();
    } else {
      scrollToId('registration');
    }
  };

  const subtitleText = isAr ? 'الرسوم الدراسية' : 'Online Quran Classes — Fee Structure';
  const titleText = isAr ? 'رسوم شهرية واضحة ومناسبة' : 'Simple, Affordable Monthly Fees';
  const descText = isAr
    ? 'كل دورة وكل جدول برسوم شهرية واضحة. اختر عملتك لعرض السعر المناسب لبلدك.'
    : 'Every course, every schedule, one clear monthly fee. Choose your currency to see your price.';

  const colCourse = isAr ? 'الدورة' : 'Course';
  const colSchedule = isAr ? 'الجدول' : 'Schedule';
  const colDuration = isAr ? 'المدة' : 'Duration';
  const colFee = isAr ? 'الرسوم الشهرية' : 'Monthly Fee';
  const selectText = isAr ? 'اختر' : 'Select';
  const noteText = isAr
    ? 'رسوم شهرية. مدة الحصة كما هو موضّح.'
    : 'Monthly fees. Class duration as shown.';
  const currencyLabel = isAr ? 'اختر العملة' : 'Choose your currency';

  return (
    <section id="fees" className="py-12 sm:py-16 bg-transparent relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/arabic-overlay.png")' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal delay={0.1} width="100%">
          <div className="card-shine border border-[#949693]/35 p-6 sm:p-9 rounded-[2.5rem] max-w-3xl mx-auto text-center mb-12 sm:mb-16 shadow-2xl">
            <div className={`inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-[#084C63]/30 border border-[#949693]/40 mb-4 ${isAr ? 'flex-row-reverse' : ''}`}>
              <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" />
              <h2 className="display text-[10px] font-extrabold uppercase tracking-[0.3em] text-amber-200">{subtitleText}</h2>
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold serif text-amber-50 mb-4 text-balance">{titleText}</h3>
            <p className="text-amber-100/95 max-w-xl mx-auto text-base sm:text-lg leading-relaxed text-balance font-medium">
              {descText}
            </p>
          </div>
        </Reveal>

        {/* Currency selector — one tab per currency from the fee sheet */}
        <Reveal delay={0.15} width="100%">
          <p className="text-center display text-[10px] font-bold uppercase tracking-[0.3em] text-amber-200/80 mb-3">
            {currencyLabel}
          </p>
          <div className="flex justify-center flex-wrap gap-2 mb-8 sm:mb-10" role="tablist" aria-label={currencyLabel}>
            {CURRENCIES.map((code) => (
              <button
                key={code}
                role="tab"
                aria-selected={currency === code}
                data-currency={code}
                onClick={() => onCurrencyChange(code)}
                className={`px-4 sm:px-5 py-2.5 rounded-full font-bold uppercase tracking-widest text-[11px] transition-all duration-300 cursor-pointer ${
                  currency === code
                    ? 'bg-accent text-primary border border-accent/40 shadow-lg scale-105'
                    : 'bg-black/30 backdrop-blur-md hover:bg-black/50 text-amber-100/95 hover:text-white border border-accent/20 hover:scale-102'
                }`}
              >
                {code}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Fee table — all 8 rows from the owner's fee sheet, grouped by course.
            On small screens the table scrolls inside its container so the page
            itself never overflows horizontally. */}
        <Reveal delay={0.2} width="100%">
          <div className="card-shine border border-[#949693]/35 rounded-[2rem] shadow-2xl overflow-x-auto max-w-5xl mx-auto">
            <table className="w-full min-w-[680px] border-collapse text-left" dir="ltr">
              <thead>
                <tr className="border-b border-[#949693]/30">
                  <th scope="col" className="display text-[10px] font-extrabold uppercase tracking-[0.25em] text-amber-200 px-5 sm:px-6 py-4">{colCourse}</th>
                  <th scope="col" className="display text-[10px] font-extrabold uppercase tracking-[0.25em] text-amber-200 px-5 sm:px-6 py-4">{colSchedule}</th>
                  <th scope="col" className="display text-[10px] font-extrabold uppercase tracking-[0.25em] text-amber-200 px-5 sm:px-6 py-4">{colDuration}</th>
                  <th scope="col" className="display text-[10px] font-extrabold uppercase tracking-[0.25em] text-amber-200 px-5 sm:px-6 py-4">{colFee} ({currency})</th>
                  <th scope="col" className="px-5 sm:px-6 py-4"><span className="sr-only">{selectText}</span></th>
                </tr>
              </thead>
              <tbody>
                {COURSE_ROW_SPANS.map((group) => {
                  const rows = FEE_ROWS.filter((r) => r.course === group.course);
                  return rows.map((row, i) => (
                    <tr
                      key={`${row.course}-${row.schedule}`}
                      data-course={row.course}
                      data-schedule={row.schedule}
                      onClick={() => handleSelect(row.course, row.schedule)}
                      className="border-b border-[#949693]/15 last:border-b-0 hover:bg-white/[0.04] transition-colors cursor-pointer"
                    >
                      {i === 0 && (
                        <td rowSpan={group.rows} className="px-5 sm:px-6 py-4 align-top font-bold display text-amber-50 text-sm sm:text-base leading-snug border-r border-[#949693]/15">
                          {row.course}
                        </td>
                      )}
                      <td className="px-5 sm:px-6 py-4 text-amber-100/90 text-sm font-medium">{row.schedule}</td>
                      <td className="px-5 sm:px-6 py-4 text-amber-100/85 text-sm whitespace-nowrap">{row.duration}</td>
                      <td className="px-5 sm:px-6 py-4 font-bold serif text-amber-200 text-lg sm:text-xl whitespace-nowrap" data-fee={row.prices[currency]}>
                        {row.prices[currency]}
                      </td>
                      <td className="px-5 sm:px-6 py-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelect(row.course, row.schedule);
                          }}
                          className="px-4 py-2 rounded-full bg-[#084C63] hover:bg-[#757454] text-white border border-[#949693]/30 font-bold uppercase tracking-widest text-[10px] transition-all shadow-lg cursor-pointer whitespace-nowrap"
                        >
                          {selectText}
                        </button>
                      </td>
                    </tr>
                  ));
                })}
              </tbody>
            </table>
          </div>
          <p className="text-center text-amber-100/70 text-sm mt-5 font-medium">{noteText}</p>
        </Reveal>

        <Reveal delay={0.5} direction="up" distance={20}>
          <div className="mt-16 text-center card-shine border border-[#949693]/40 p-8 sm:p-10 rounded-[2.5rem] max-w-3xl mx-auto text-amber-50 shadow-2xl">
             <div className="inline-block bg-[#084C63]/30 border border-[#949693]/40 px-4 py-1.5 rounded-full mb-4">
               <p className="display text-[10px] font-extrabold uppercase tracking-[0.25em] text-amber-200">
                 {isAr ? 'باقات مخصصة لمجموعات العوائل' : 'Flexible Learning Packages'}
               </p>
             </div>
             <p className="text-amber-50 font-medium text-base sm:text-lg leading-relaxed">
               {isAr ? (
                 <>هل تحتاج إلى خطة مرنة تناسب الإخوة والأخوات أو حلقات دراسية مكثفة؟ <span className="text-amber-200 font-bold underline underline-offset-4 decoration-[#949693] hover:text-white transition-colors cursor-pointer" onClick={handleRegistrar}>تواصل مع مكتب التسجيل والقبول</span></>
               ) : (
                 <>Need a custom plan for family siblings or specialized intensive courses? <span className="text-amber-200 font-bold underline underline-offset-4 decoration-[#949693] hover:text-white transition-colors cursor-pointer" onClick={handleRegistrar}>Contact our registrar</span></>
               )}
             </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
