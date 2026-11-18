// Real monthly fees from the owner's "Beacon Fee Sheet" (shared 2026-11-18).
// Copy these values exactly — do not invent, round or convert them.
// The site's old Starter/Standard/Premium plans ($35/$50/$75) contradicted
// this sheet and were removed; this table is the single source of fees.
export type CurrencyCode = 'USD' | 'AUD' | 'CAD' | 'GBP' | 'EUR' | 'AED' | 'SAR' | 'QAR';

export const CURRENCIES: CurrencyCode[] = ['USD', 'AUD', 'CAD', 'GBP', 'EUR', 'AED', 'SAR', 'QAR'];

export const FEE_SCHEDULES = [
  'Weekend / 2 Days per Week',
  '3 Days per Week',
  '5 Days per Week',
] as const;

export const FEE_COURSES = [
  'Qaida, Quran Recitation & Islamic Studies',
  'Hifz e Quran',
  'Quran Tafseer',
] as const;

export interface FeeRow {
  course: string;
  schedule: string;
  duration: string;
  prices: Record<CurrencyCode, string>;
}

export const FEE_ROWS: FeeRow[] = [
  {
    course: 'Qaida, Quran Recitation & Islamic Studies',
    schedule: 'Weekend / 2 Days per Week',
    duration: '45 minutes',
    prices: { USD: '$45', AUD: '$60', CAD: '$60', GBP: '£35', EUR: '€35', AED: 'AED 120', SAR: 'SAR 120', QAR: 'QAR 120' },
  },
  {
    course: 'Qaida, Quran Recitation & Islamic Studies',
    schedule: '3 Days per Week',
    duration: '30 minutes',
    prices: { USD: '$35', AUD: '$45', CAD: '$45', GBP: '£30', EUR: '€30', AED: 'AED 90', SAR: 'SAR 90', QAR: 'QAR 90' },
  },
  {
    course: 'Qaida, Quran Recitation & Islamic Studies',
    schedule: '5 Days per Week',
    duration: '30 minutes',
    prices: { USD: '$45', AUD: '$60', CAD: '$60', GBP: '£35', EUR: '€35', AED: 'AED 120', SAR: 'SAR 120', QAR: 'QAR 120' },
  },
  {
    course: 'Hifz e Quran',
    schedule: 'Weekend / 2 Days per Week',
    duration: '1 Hour',
    prices: { USD: '$80', AUD: '$100', CAD: '$100', GBP: '£60', EUR: '€60', AED: 'AED 200', SAR: 'SAR 200', QAR: 'QAR 200' },
  },
  {
    course: 'Hifz e Quran',
    schedule: '3 Days per Week',
    duration: '45 minutes',
    prices: { USD: '$65', AUD: '$85', CAD: '$85', GBP: '£50', EUR: '€50', AED: 'AED 150', SAR: 'SAR 150', QAR: 'QAR 150' },
  },
  {
    course: 'Hifz e Quran',
    schedule: '5 Days per Week',
    duration: '1 Hour',
    prices: { USD: '$80', AUD: '$100', CAD: '$100', GBP: '£60', EUR: '€60', AED: 'AED 200', SAR: 'SAR 200', QAR: 'QAR 200' },
  },
  {
    course: 'Quran Tafseer',
    schedule: 'Weekend / 2 Days per Week',
    duration: '45 minutes',
    prices: { USD: '$50', AUD: '$60', CAD: '$60', GBP: '£40', EUR: '€40', AED: 'AED 150', SAR: 'SAR 150', QAR: 'QAR 150' },
  },
  {
    course: 'Quran Tafseer',
    schedule: '3 Days per Week',
    duration: '30 minutes',
    prices: { USD: '$50', AUD: '$60', CAD: '$60', GBP: '£45', EUR: '€45', AED: 'AED 150', SAR: 'SAR 150', QAR: 'QAR 150' },
  },
];
