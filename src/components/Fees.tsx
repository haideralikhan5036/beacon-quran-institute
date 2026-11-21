import React from 'react';
import { Sparkles } from 'lucide-react';
import { Reveal } from './ui/Reveal';
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

  const subtitleText = 'Online Quran Classes — Fee Structure';
  const titleText = 'Simple, Affordable Monthly Fees';
  const descText = 'Every course, every schedule, one clear monthly fee. Choose your currency to see your price.';
  const colCourse = 'Course';
  const colSchedule = 'Schedule';
  const colDuration = 'Duration';
  const colFee = 'Monthly Fee';
  const selectText = 'Select';
  const noteText = 'Monthly fees. Class duration as shown.';
  const currencyLabel = 'Choose your currency';

  return (
    <section id="fees" className="py-16 sm:py-20 bg-[#FFFFFF] relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <Reveal delay={0.1} width="100%">
          <div className="bg-[#FFFFFF] border border-[#C9D9E8] p-6 sm:p-9 rounded-3xl max-w-3xl mx-auto text-center mb-12 sm:mb-16 shadow-[0_10px_30px_rgba(11,46,58,0.06)]">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-[#EAF1F7] border border-[#C9D9E8] mb-4">
              <Sparkles className="w-4 h-4 text-[#7A7A50]" />
              <h2 className="font-display text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#004050]">{subtitleText}</h2>
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-[#0B2E3A] mb-4 text-balance">{titleText}</h3>
            <p className="text-[#3D5563] max-w-xl mx-auto text-base sm:text-lg leading-relaxed text-balance font-medium">
              {descText}
            </p>
          </div>
        </Reveal>

        {/* Currency selector — one tab per currency from the fee sheet */}
        <Reveal delay={0.15} width="100%">
          <p className="text-center font-display text-[10px] font-bold uppercase tracking-[0.3em] text-[#004050] mb-3">
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
                className={`px-4 sm:px-5 py-2.5 rounded-full font-bold uppercase tracking-widest text-[11px] transition-all duration-300 cursor-pointer border ${
                  currency === code
                    ? 'bg-[#004050] text-white border-[#004050] shadow-md scale-105'
                    : 'bg-[#FFFFFF] hover:bg-[#EAF1F7] text-[#004050] border-[#C9D9E8] hover:scale-[1.02]'
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
          <div className="bg-[#FFFFFF] border border-[#C9D9E8] rounded-3xl shadow-[0_10px_30px_rgba(11,46,58,0.06)] overflow-x-auto max-w-5xl mx-auto">
            <table className="w-full min-w-[680px] border-collapse text-left" dir="ltr">
              <thead>
                <tr className="bg-[#004050]">
                  <th scope="col" className="font-display text-[10px] font-extrabold uppercase tracking-[0.25em] text-white px-5 sm:px-6 py-4">{colCourse}</th>
                  <th scope="col" className="font-display text-[10px] font-extrabold uppercase tracking-[0.25em] text-white px-5 sm:px-6 py-4">{colSchedule}</th>
                  <th scope="col" className="font-display text-[10px] font-extrabold uppercase tracking-[0.25em] text-white px-5 sm:px-6 py-4">{colDuration}</th>
                  <th scope="col" className="font-display text-[10px] font-extrabold uppercase tracking-[0.25em] text-white px-5 sm:px-6 py-4">{colFee} ({currency})</th>
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
                      className="border-b border-[#D7E3EE] last:border-b-0 hover:bg-[#F4F8FB] transition-colors cursor-pointer"
                    >
                      {i === 0 && (
                        <td rowSpan={group.rows} className="px-5 sm:px-6 py-4 align-top font-bold font-display text-[#0B2E3A] text-sm sm:text-base leading-snug border-r border-[#D7E3EE]">
                          {row.course}
                        </td>
                      )}
                      <td className="px-5 sm:px-6 py-4 text-[#3D5563] text-sm font-medium">{row.schedule}</td>
                      <td className="px-5 sm:px-6 py-4 text-[#3D5563] text-sm whitespace-nowrap">{row.duration}</td>
                      <td className="px-5 sm:px-6 py-4 font-bold font-display text-[#004050] text-lg sm:text-xl whitespace-nowrap" data-fee={row.prices[currency]}>
                        {row.prices[currency]}
                      </td>
                      <td className="px-5 sm:px-6 py-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelect(row.course, row.schedule);
                          }}
                          className="px-4 py-2 rounded-full bg-[#7A7A50] hover:bg-[#004050] text-white font-bold uppercase tracking-widest text-[10px] transition-all shadow-md cursor-pointer whitespace-nowrap"
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
          <p className="text-center text-[#3D5563] text-sm mt-5 font-medium">{noteText}</p>
        </Reveal>

        <Reveal delay={0.5} direction="up" distance={20}>
          <div className="mt-16 text-center bg-[#FFFFFF] border border-[#C9D9E8] p-8 sm:p-10 rounded-3xl max-w-3xl mx-auto text-[#0B2E3A] shadow-[0_10px_30px_rgba(11,46,58,0.06)]">
             <div className="inline-block bg-[#EAF1F7] border border-[#C9D9E8] px-4 py-1.5 rounded-full mb-4">
               <p className="font-display text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#004050]">
                 Flexible Learning Packages
               </p>
             </div>
             <p className="text-[#3D5563] font-medium text-base sm:text-lg leading-relaxed">
               Need a custom plan for family siblings or specialized intensive courses?{' '}
               <span className="text-[#004050] font-bold underline underline-offset-4 decoration-[#7A7A50] hover:text-[#7A7A50] transition-colors cursor-pointer" onClick={handleRegistrar}>Contact our registrar</span>
             </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
