import React from 'react';
import { Sparkles } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import { scrollToId } from '../utils/scrollToId';
import { FEE_ROWS, type CurrencyCode } from '../data/feeTable';
import quranCover from '../assets/images/pic1-quran-cover.png';

interface FeesProps {
  onSelectFee?: (course: string, schedule: string) => void;
  onContactRegistrar?: () => void;
  /** Controlled currency — owned by App so the geo auto-detect and the
      header region switcher can change the table. The table never owns
      the value itself; there is no currency picker here (removed — the
      header region switcher is the way to change it). */
  currency: CurrencyCode;
}

// Header label per currency — the price strings themselves use '$' for
// USD/AUD/CAD alike, so the header disambiguates (USA→USD, UK→£,
// Canada→C$, Australia→A$).
const CURRENCY_LABEL: Record<CurrencyCode, string> = {
  USD: 'USD',
  AUD: 'A$',
  CAD: 'C$',
  GBP: '£',
  EUR: '€',
  AED: 'AED',
  SAR: 'SAR',
  QAR: 'QAR',
};

// Course groups for rowSpan: the fee table lists 8 rows — 3 for Qaida /
// Recitation / Islamic Studies, 3 for Hifz, 2 for Tafseer.
const COURSE_ROW_SPANS: { course: string; rows: number }[] = [
  { course: 'Qaida, Quran Recitation & Islamic Studies', rows: 3 },
  { course: 'Hifz e Quran', rows: 3 },
  { course: 'Quran Tafseer', rows: 2 },
];

export default function Fees({ onSelectFee, onContactRegistrar, currency }: FeesProps) {
  const handleSelect = (course: string, schedule: string) => {
    if (onSelectFee) {
      // App navigates to /enrol with the course + schedule preselected.
      onSelectFee(course, schedule);
    } else {
      // Fallback only when no navigation handler is provided (defensive;
      // App always provides one): scroll to the home form section.
      scrollToId('registration');
    }
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
  const descText = 'Every course, every schedule, one clear monthly fee — shown in your region’s currency.';
  const colCourse = 'Course';
  const colSchedule = 'Schedule';
  const colDuration = 'Duration';
  const colFee = 'Monthly Fee';
  const selectText = 'Select';
  const noteText = 'Monthly fees. Class duration as shown.';

  return (
    <section id="fees" className="py-16 sm:py-20 bg-[#FFFFFF] relative overflow-hidden">
      {/* Batch 16: the owner's Quran-cover picture as a very faint
          shade behind the whole Fees section — opacity 0.08 so the
          fee table stays fully readable. Only a soft shade of it
          shows, not the full picture. */}
      <img
        src={quranCover}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        width={600}
        height={750}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.08]"
      />
      {/* Batch 15: light grid, top-left corner of the fees section */}
      <div
        aria-hidden="true"
        className="grid-texture pointer-events-none absolute left-[-10px] top-[-10px] w-[170px] h-[120px] opacity-50 hidden md:block"
      />
      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <Reveal delay={0.1} width="100%">
          <div className="bg-[#FFFFFF] border border-[#C9D9E8] p-6 sm:p-9 rounded-3xl max-w-3xl mx-auto text-center mb-12 sm:mb-16 shadow-[0_10px_30px_rgba(11,46,58,0.06)] relative overflow-hidden">
            {/* Halftone dots, mockup shell placement: top-right */}
            <div
              aria-hidden="true"
              className="dots-texture pointer-events-none absolute right-[-12px] top-[-8px] w-[150px] h-[100px] opacity-50"
            />
            <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-[#EAF1F7] border border-[#C9D9E8] mb-4">
              <Sparkles className="w-4 h-4 text-[#7A7A50]" />
              <h2 className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#004050]">{subtitleText}</h2>
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-[#0B2E3A] mb-4 text-balance">{titleText}</h3>
            <p className="text-[#3D5563] max-w-xl mx-auto text-base sm:text-lg leading-relaxed text-balance font-medium">
              {descText}
            </p>
          </div>
        </Reveal>

        {/* Fee table — all 8 rows from the owner's fee sheet, grouped by course.
            Prices show in the active currency (geo auto-detect / header
            region switcher); there is no currency picker here.
            On small screens the table scrolls inside its container so the page
            itself never overflows horizontally. */}
        <Reveal delay={0.2} width="100%">
          <div className="bg-[#FFFFFF] border border-[#C9D9E8] rounded-3xl shadow-[0_10px_30px_rgba(11,46,58,0.06)] overflow-x-auto max-w-5xl mx-auto">
            <table className="w-full min-w-[680px] border-collapse text-left" dir="ltr">
              <thead>
                <tr className="bg-[#004050]">
                  <th scope="col" className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-white px-5 sm:px-6 py-4">{colCourse}</th>
                  <th scope="col" className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-white px-5 sm:px-6 py-4">{colSchedule}</th>
                  <th scope="col" className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-white px-5 sm:px-6 py-4">{colDuration}</th>
                  <th scope="col" className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-white px-5 sm:px-6 py-4 whitespace-nowrap">{colFee} ({CURRENCY_LABEL[currency]})</th>
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
                        <td rowSpan={group.rows} className="px-5 sm:px-6 py-4 align-top font-bold text-[#0B2E3A] text-sm sm:text-base leading-snug border-r border-[#D7E3EE]">
                          {row.course}
                        </td>
                      )}
                      <td className="px-5 sm:px-6 py-4 text-[#3D5563] text-sm font-medium">{row.schedule}</td>
                      <td className="px-5 sm:px-6 py-4 text-[#3D5563] text-sm whitespace-nowrap">{row.duration}</td>
                      <td className="px-5 sm:px-6 py-4 font-bold text-[#004050] text-lg sm:text-xl whitespace-nowrap" data-fee={row.prices[currency]}>
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

        <Reveal delay={0.5} direction="up" distance={20} width="100%">
          <div className="mt-12 text-center bg-[#FFFFFF] border border-[#C9D9E8] p-8 sm:p-10 rounded-3xl w-full text-[#0B2E3A] shadow-[0_10px_30px_rgba(11,46,58,0.06)] relative overflow-hidden">
             {/* Batch 15: gold streaks, mockup shell placement: bottom-left */}
             <div
               aria-hidden="true"
               className="streaks-texture-gold pointer-events-none absolute left-[-12px] bottom-[-8px] w-[150px] h-[100px] opacity-50"
             />
             <div className="inline-block bg-[#EAF1F7] border border-[#C9D9E8] px-4 py-1.5 rounded-full mb-4">
               <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#004050]">
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
