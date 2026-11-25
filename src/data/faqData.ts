// Frequently asked questions — the knowledge base for Beacon's chat
// assistant (client-side only: keyword matching, no backend, no AI API,
// no running cost). The chat answers ONLY from these entries; anything
// not covered gets an honest "I don't know" + the WhatsApp fallback.
//
// HONESTY: every answer below restates only facts the owner has confirmed
// (see the fact sheet: RulesPage, Terms of Service §1/§3/§6/§8, ParentsPage,
// QualityAssurancePage, FemaleTeachersPage, CertificateOfAppraisal, Fees).
// No prices are stated anywhere here — the fee sheet is the single source
// of truth, so fee questions link to the fee table. No teacher names, no
// waiting times, no refund processing time or method, no Ijazah track —
// none of those are confirmed, so no entry claims them.
export interface KbLink {
  label: string;
  href: string;
}

export interface KbEntry {
  id: string;
  topic: string;
  q: string;
  a: string;
  keywords: string[];
  links?: KbLink[];
}

export const KB_ENTRIES: KbEntry[] = [
  {
    id: 'trial-length',
    topic: 'Trial',
    q: 'How long is the free trial?',
    a: 'The free trial runs for 3 days. You can try any course for 3 days without any cost, meet your tutor first, and then decide whether to continue.',
    keywords: ['trial', 'free trial', '3-day trial', '3 days trial', 'how long trial', 'trial length', 'trial days', 'try a class', 'try any course'],
    links: [{ label: 'Book a free trial', href: '/enrol' }],
  },
  {
    id: 'trial-second-tutor',
    topic: 'Trial',
    q: 'What if I don\u2019t like my first teacher?',
    a: 'If the fit is not right with your first tutor, you can try a different tutor \u2014 a 2-day trial with the second tutor \u2014 before you enrol.',
    keywords: ['second tutor', 'different tutor', 'another tutor', '2-day trial', 'dont like teacher', 'do not like teacher', 'not the right fit', 'fit is not right', 'try another'],
    links: [{ label: 'How it works', href: '/how-it-works' }],
  },
  {
    id: 'teacher-change-after-enrol',
    topic: 'Teachers',
    q: 'Can I change my teacher after enrolment?',
    a: 'Yes. After enrolment, talk to us and we will arrange a change.',
    keywords: ['after enrol', 'change teacher after', 'switch teacher', 'teacher change'],
    links: [{ label: 'Contact us', href: '/contact' }],
  },
  {
    id: 'teachers-male-female',
    topic: 'Teachers',
    q: 'Do you have male and female teachers?',
    a: 'Yes \u2014 we have both male and female teachers. Sisters and young girls can learn one to one with a female teacher from Pakistan \u2014 Ijazah-certified, with very good English fluency and excellent Tajweed. To request a female teacher, tell us on WhatsApp or by email when you enrol \u2014 there is no teacher-preference field on the enrol form.',
    keywords: ['female teacher', 'female teachers', 'female tutor', 'lady teacher', 'sister teacher', 'women teacher', 'male teacher', 'female', 'male', 'sisters', 'girls teacher'],
    links: [{ label: 'Female teachers', href: '/female-teachers' }],
  },
  {
    id: 'fees',
    topic: 'Fees',
    q: 'How much do classes cost?',
    a: 'Fees depend on the course and how many days a week you study. The full fee table is on the homepage \u2014 it shows every course, schedule and currency. Fees are paid monthly in advance.',
    keywords: ['fee', 'fees', 'price', 'cost', 'how much', 'charges', 'payment', 'monthly fee'],
    links: [{ label: 'See the fee table', href: '/#fees' }],
  },
  {
    id: 'refund',
    topic: 'Refund',
    q: 'Can I get a refund if I stop classes?',
    a: 'Yes. If you decide to stop classes, tell us and we will refund the fee for any classes that have not yet been taken, in full. To ask for a refund, message us on WhatsApp or email us and we will arrange it. This does not apply where an enrolment is ended for misconduct, or to the Eid holidays, which are part of the annual schedule and are not charged as separate classes.',
    keywords: ['refund', 'money back', 'cancel', 'cancellation', 'stop classes', 'quit', 'leave academy'],
    links: [{ label: 'Terms of Service', href: '/terms' }],
  },
  {
    id: 'makeup-student',
    topic: 'Holidays & Make-up',
    q: 'What if I miss a class?',
    a: 'Tell us at least 4 hours before the class and we will arrange a make-up where possible. If your regular teacher has no time for the make-up, we will arrange it with an alternative teacher. A class missed without telling us cannot be made up.',
    keywords: ['miss a class', 'missed class', 'make-up', 'makeup', 'cannot attend', 'absent', 'miss class'],
    links: [{ label: 'Class rules', href: '/rules' }],
  },
  {
    id: 'makeup-teacher',
    topic: 'Holidays & Make-up',
    q: 'What happens if my teacher cannot teach a class?',
    a: 'If your teacher cannot teach a class, we will let you know at least 4 hours before the class and arrange a cover lesson with another teacher or a make-up class, so your learning does not stop.',
    keywords: ['teacher absent', 'teacher unavailable', 'teacher cannot teach', 'cover lesson', 'cover teacher', 'teacher missing'],
    links: [{ label: 'Class rules', href: '/rules' }],
  },
  {
    id: 'late',
    topic: 'Classes & Schedule',
    q: 'What if I am late for my class?',
    a: 'Let us know as soon as you can \u2014 your teacher will wait for you for 15 minutes.',
    keywords: ['late', 'running late', 'delayed', 'be late'],
    links: [{ label: 'Class rules', href: '/rules' }],
  },
  {
    id: 'holidays-eid',
    topic: 'Holidays & Make-up',
    q: 'Do classes run during Eid holidays?',
    a: 'Classes close for Eid-ul-Fitr and Eid-ul-Adha \u2014 twice a year, for one week each. The Eid holidays are announced as official holidays in advance, and no make-up class, no refund and no fee adjustment is given for the Eid break.',
    keywords: ['eid', 'holiday', 'holidays', 'vacation', 'break', 'eid-ul-fitr', 'eid-ul-adha'],
    links: [{ label: 'Class rules', href: '/rules' }],
  },
  {
    id: 'certificate',
    topic: 'Certificates',
    q: 'Do I get a certificate when I finish a course?',
    a: 'Yes. On successful completion of a course \u2014 when you finish the course syllabus \u2014 you receive a formal Certificate of Appraisal. It is issued digitally, and a printed copy can be sent by courier to your address on request.',
    keywords: ['certificate', 'certification', 'complete course', 'finish course', 'diploma', 'course completion'],
    links: [{ label: 'Certificates', href: '/certificate' }],
  },
  {
    id: 'parents-portal',
    topic: 'Parents & Progress',
    q: 'How can I follow my child\u2019s progress?',
    a: 'Our learning system has a separate student and parent portal. Through it, you can follow your child\u2019s lessons and learning \u2014 what was covered, how they are progressing, and what comes next. You also receive a written progress report every month.',
    keywords: ['parent portal', 'progress', 'follow child', 'track progress', 'monthly report', 'report', 'how is my child doing', 'child progress'],
    links: [{ label: 'For parents', href: '/parents' }],
  },
  {
    id: 'classes-format',
    topic: 'Classes & Schedule',
    q: 'How are the classes taught?',
    a: 'Classes are live, one-to-one and online \u2014 just you and your teacher. There is no Beacon classroom or office anywhere; every class is taught live online.',
    keywords: ['online', 'live class', 'one-to-one', '1-on-1', 'how classes work', 'classroom', 'how are classes'],
    links: [{ label: 'How it works', href: '/how-it-works' }],
  },
  {
    id: 'classes-schedule',
    topic: 'Classes & Schedule',
    q: 'When are classes scheduled?',
    a: 'Classes are scheduled in your local time zone. Tell us which time suits you and we will arrange your classes at that time.',
    keywords: ['schedule', 'time zone', 'timezone', 'when classes', 'class time', 'what time', 'timing'],
    links: [{ label: 'How it works', href: '/how-it-works' }],
  },
  {
    id: 'age',
    topic: 'Classes & Schedule',
    q: 'What is the minimum age to start?',
    a: 'Children can start from age 4. The teacher moves at the child\u2019s pace, and short, friendly lessons keep young learners engaged.',
    keywords: ['age', 'minimum age', 'how old', 'kids age', 'children age', 'start age', 'young children'],
    links: [{ label: 'Quran classes for kids', href: '/quran-classes-for-kids' }],
  },
  {
    id: 'family-plan',
    topic: 'Fees',
    q: 'Is there a discount for families?',
    a: 'Yes \u2014 families who enrol together get 20% off. Ask about it when you enrol.',
    keywords: ['family plan', 'family discount', 'discount', 'siblings', 'more than one child', 'family enrol'],
    links: [{ label: 'Enrol', href: '/enrol' }],
  },
  {
    id: 'courses',
    topic: 'Classes & Schedule',
    q: 'Which courses do you teach?',
    a: 'We teach five courses: Noorani Qaida, Recitation & Tajweed, Hifz Program, Tafseer-ul-Quran and Islamic Studies \u2014 all one-to-one, live online.',
    keywords: ['courses', 'subjects', 'what courses', 'what do you teach', 'qaida', 'tajweed', 'hifz', 'tafseer', 'islamic studies'],
    links: [{ label: 'View all courses', href: '/courses' }],
  },
  {
    id: 'enrol',
    topic: 'Trial',
    q: 'How do I enrol?',
    a: 'Book a free trial class on the Enrol page \u2014 it takes under a minute. Meet your tutor first, and if the fit is not right, try a different tutor before you enrol.',
    keywords: ['enrol', 'enroll', 'register', 'sign up', 'join', 'admission', 'how to start', 'get started'],
    links: [{ label: 'Enrol now', href: '/enrol' }],
  },
  {
    id: 'contact',
    topic: 'Parents & Progress',
    q: 'How can I contact you?',
    a: 'Message us on WhatsApp at +92 346 1573771 \u2014 our team is here around the clock and replies straight away \u2014 or email beaconquraninstitute@gmail.com.',
    keywords: ['contact', 'whatsapp', 'email', 'phone', 'reach you', 'call you', 'talk to'],
    links: [{ label: 'Chat on WhatsApp', href: 'https://wa.me/923461573771' }],
  },
  {
    id: 'quality',
    topic: 'Parents & Progress',
    q: 'How do you make sure the teaching is good?',
    a: 'Every lesson is recorded and monitored, every teacher is background-checked before their first class, and every student is evaluated each month by our quality control manager \u2014 the findings go into your monthly progress report.',
    keywords: ['quality', 'monitored', 'recorded', 'background check', 'evaluation', 'quality control', 'assurance'],
    links: [{ label: 'Quality assurance', href: '/quality-assurance' }],
  },
  {
    id: 'location',
    topic: 'Classes & Schedule',
    q: 'Where are you located?',
    a: 'We are an online-only academy \u2014 there is no Beacon classroom or office anywhere. Every class is taught live online, and classes are scheduled in your local time zone.',
    keywords: ['location', 'where are you', 'address', 'office', 'where is', 'which country', 'based'],
  },
  {
    id: 'greeting',
    topic: 'Trial',
    q: 'Hello',
    a: 'Hello! Ask me anything about our Quran classes \u2014 the free trial, fees, teachers, make-up classes, holidays, certificates and more \u2014 or tap a question below to start.',
    keywords: ['hello', 'hi', 'salam', 'assalam', 'hey', 'good morning', 'good evening'],
  },
];

/** The six common questions shown as tappable chips above the input. */
export const COMMON_QUESTION_IDS = [
  'trial-length',
  'fees',
  'teachers-male-female',
  'makeup-student',
  'refund',
  'certificate',
];

/**
 * Quick answers: the six common questions with their answers, rendered as
 * plain text on the /faq page below the chat. These are the ONLY entries
 * in the FAQPage JSON-LD — the schema must match content visible in the
 * prerendered HTML, and these six are the ones printed on the page.
 */
export const FAQ_ITEMS: { q: string; a: string }[] = COMMON_QUESTION_IDS.map((id) => {
  const e = KB_ENTRIES.find((x) => x.id === id)!;
  return { q: e.q, a: e.a };
});

export const FALLBACK_TEXT =
  'I don\u2019t know the answer to that yet \u2014 I only answer from what Beacon has published. Please message us on WhatsApp and the team will help you.';

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/['\u2019]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

/**
 * Client-side keyword matching. A multi-word keyword that appears as a
 * phrase scores 3; all its words present (any order) scores 2; a
 * single-word keyword scores 2. Best entry wins; score < 2 means no
 * match and the caller shows the honest fallback. Nothing is invented:
 * the reply is always one of the KB answers above, word for word.
 */
export function findAnswer(query: string): KbEntry | null {
  const q = normalize(query);
  if (!q) return null;
  const qWords = q.split(' ');
  let best: KbEntry | null = null;
  let bestScore = 0;
  for (const entry of KB_ENTRIES) {
    let score = 0;
    for (const raw of entry.keywords) {
      const k = normalize(raw);
      if (!k) continue;
      if (q === k || q.includes(k)) {
        score += k.includes(' ') ? 3 : 2;
      } else if (k.includes(' ')) {
        const parts = k.split(' ');
        if (parts.every((w) => qWords.includes(w))) score += 2;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }
  return bestScore >= 2 ? best : null;
}
