// Location + audience pages (Tarteel-adapt batch, item 3).
//
// Modelled on Tarteel's programmatic location/audience pages, written
// for Beacon with honest content only. Every class Beacon teaches is
// ONLINE — city pages say so plainly and claim no local office, no
// street address, no "visit us", no local phone number and no teachers
// based in that city. Fees come from the fee sheet via the shared Fees
// component (city pages, in the visitor's own currency); audience pages link to the fee table /
// enrol instead of repeating prices.
//
// Age guidance is repeated only where Beacon's site already states it:
// Noorani Qaida from age 4, Islamic Studies Kids 5–10 / Teens 11–16 /
// Adults. No student/teacher count, date, review, local fact or policy
// detail is invented anywhere in this file. Open questions are logged
// in BEACON-TARTEEL-ADAPT-DECISIONS-2026-11-24.md (Item 3).

export type LocationKind = 'city' | 'audience';

export interface LocationFaq {
  q: string;
  a: string;
}

export interface LocationPageData {
  slug: string;
  kind: LocationKind;
  /** Short name for the breadcrumb trail. */
  breadcrumbName: string;
  badge: string;
  h1: string;
  intro: string;
  /** Time-zone line shown under the intro (city pages). */
  timezoneLine?: string;
  whyTitle: string;
  whyPoints: { title: string; text: string }[];
  coursesTitle: string;
  coursesText: string;
  faqs: LocationFaq[];
  ctaTitle: string;
  ctaText: string;
  /** Cross-link card (female audience page → /female-teachers). */
  crossLink?: { href: string; label: string; text: string };
}

export const LOCATION_COURSES: { name: string; href: string }[] = [
  { name: 'Noorani Qaida', href: '/courses/noorani-qaida' },
  { name: 'Recitation & Tajweed', href: '/courses/recitation-tajweed' },
  { name: 'Hifz Program', href: '/courses/hifz-program' },
  { name: 'Tafseer-ul-Quran', href: '/courses/tafseer-ul-quran' },
  { name: 'Islamic Studies', href: '/courses/islamic-studies' },
];

const ONLINE_LINE =
  'There is no Beacon classroom or office here — every class is taught live online, one to one, from your home.';

export const LOCATION_PAGES: Record<string, LocationPageData> = {
  'quran-classes-in-houston': {
    slug: 'quran-classes-in-houston',
    kind: 'city',
    breadcrumbName: 'Quran Classes in Houston',
    badge: 'Online Quran Classes — Houston, TX',
    h1: 'Online Quran Classes in Houston',
    intro:
      `Learn Quran online in Houston with certified male and female teachers. Our 1-on-1 online Quran classes bring Tajweed, Hifz memorization and Noorani Qaida to kids and adults across Houston — live, at times that fit your day. ${ONLINE_LINE}`,
    timezoneLine: 'Classes are scheduled on Central Time (CT), with morning, after-school, evening and weekend slots. Tell us what time suits you in your local time and we will arrange the class at that time.',
    whyTitle: 'Why families in Houston choose Beacon',
    whyPoints: [
      { title: '1-on-1 live Quran lessons', text: 'Private, one-to-one classes for kids and adults — your teacher focuses only on you.' },
      { title: 'Central Time scheduling', text: 'Choose lesson times on Houston time, including after-school and weekend slots.' },
      { title: 'Same teachers, same fees', text: 'Houston students learn with the same certified teachers and pay the same fees as students everywhere else.' },
      { title: 'Free trial class', text: 'Book a free trial lesson first and meet your teacher before you enrol.' },
    ],
    coursesTitle: 'Quran courses for learners in Houston',
    coursesText:
      'From a child\u2019s first Qaida lesson to Hifz and Tafseer, every course is taught one to one, live online.',
    faqs: [
      {
        q: 'Are Beacon\u2019s Quran classes in Houston online or in person?',
        a: 'All classes are online. There is no Beacon classroom in Houston — your teacher meets you live, one to one, from your home, over a video call.',
      },
      {
        q: 'What times can I book a class in Houston?',
        a: 'Classes are scheduled on Central Time. You choose the days and times that suit you — morning, after school, evening or weekend — and can change them when life changes.',
      },
      {
        q: 'How much do online Quran classes cost in Houston?',
        a: 'Monthly fees run from $35 to $80, depending on the course and schedule, and are shown in your own currency in the fee table below, which lists every course, schedule and class length.',
      },
      {
        q: 'Can my child start learning if they cannot read Arabic yet?',
        a: 'Yes. Noorani Qaida starts from the very first letter, so no Arabic background is needed. Children can start from age 4, and the teacher moves at the child\u2019s pace.',
      },
      {
        q: 'How does the free trial class work?',
        a: 'Book a free trial and meet your teacher in one live class. There is no commitment — if the trial feels right, you choose your course and weekly schedule and regular classes begin.',
      },
    ],
    ctaTitle: 'Start learning Quran online in Houston',
    ctaText: 'Book your free trial class today — no commitment required.',
  },

  'quran-classes-in-new-york': {
    slug: 'quran-classes-in-new-york',
    kind: 'city',
    breadcrumbName: 'Quran Classes in New York',
    badge: 'Online Quran Classes — New York, NY',
    h1: 'Online Quran Classes in New York',
    intro:
      `Learn Quran online in New York with certified male and female teachers. Our 1-on-1 online Quran classes bring Tajweed, Hifz memorization and Noorani Qaida to kids and adults across New York City — live, at times that fit your day. ${ONLINE_LINE}`,
    timezoneLine: 'Classes are scheduled on Eastern Time (ET), with early-morning, after-school, evening and weekend slots. Tell us what time suits you in your local time and we will arrange the class at that time.',
    whyTitle: 'Why families in New York choose Beacon',
    whyPoints: [
      { title: '1-on-1 live Quran lessons', text: 'Private, one-to-one classes for kids and adults — your teacher focuses only on you.' },
      { title: 'Eastern Time scheduling', text: 'Lesson times on New York time, including early-morning slots before work and school.' },
      { title: 'Female teachers available', text: 'Sisters and young girls can ask us on WhatsApp or by email for a female teacher when they enrol.' },
      { title: 'Free trial class', text: 'Book a free trial lesson first and meet your teacher before you enrol.' },
    ],
    coursesTitle: 'Quran courses for learners in New York',
    coursesText:
      'From a child\u2019s first Qaida lesson to Hifz and Tafseer, every course is taught one to one, live online.',
    faqs: [
      {
        q: 'Do I need to travel anywhere for classes in New York?',
        a: 'No. Every class is taught live online from your home — there is no Beacon centre in New York to travel to, and your city never limits your teacher.',
      },
      {
        q: 'Can I take classes before or after work in New York?',
        a: 'Yes. Classes are scheduled on Eastern Time, and you can choose early-morning, evening or weekend slots around work and school.',
      },
      {
        q: 'Which course should my child start with in New York?',
        a: 'If your child cannot read Arabic yet, they start with Noorani Qaida — from the first letter, from age 4. If they already read, the teacher assesses their level in the free trial and places them on the right course.',
      },
      {
        q: 'Are female teachers available for students in New York?',
        a: 'Yes. Sisters and young girls can learn one to one with a female teacher — just tell us on WhatsApp or by email when you enrol. See our Female Teachers page for how it works.',
      },
      {
        q: 'Do you teach adults in New York, or only children?',
        a: 'Both. Adults learn with us too — from complete beginners and reverts learning to read, to adults memorising the Quran or studying Tafseer.',
      },
    ],
    ctaTitle: 'Start learning Quran online in New York',
    ctaText: 'Book your free trial class today — no commitment required.',
  },

  'quran-classes-in-los-angeles': {
    slug: 'quran-classes-in-los-angeles',
    kind: 'city',
    breadcrumbName: 'Quran Classes in Los Angeles',
    badge: 'Online Quran Classes — Los Angeles, CA',
    h1: 'Online Quran Classes in Los Angeles',
    intro:
      `Learn Quran online in Los Angeles with certified male and female teachers. Our 1-on-1 online Quran classes bring Tajweed, Hifz memorization and Noorani Qaida to kids and adults across Los Angeles — live, at times that fit your day. ${ONLINE_LINE}`,
    timezoneLine: 'Classes are scheduled on Pacific Time (PT), with after-school, evening and weekend slots. Tell us what time suits you in your local time and we will arrange the class at that time.',
    whyTitle: 'Why families in Los Angeles choose Beacon',
    whyPoints: [
      { title: '1-on-1 live Quran lessons', text: 'Private, one-to-one classes for kids and adults — your teacher focuses only on you.' },
      { title: 'Pacific Time scheduling', text: 'Lesson times on Los Angeles time, including after-school and weekend slots.' },
      { title: 'Learn from home', text: 'No commute, no waiting room — your child\u2019s class happens at home, live with their teacher.' },
      { title: 'Free trial class', text: 'Book a free trial lesson first and meet your teacher before you enrol.' },
    ],
    coursesTitle: 'Quran courses for learners in Los Angeles',
    coursesText:
      'From a child\u2019s first Qaida lesson to Hifz and Tafseer, every course is taught one to one, live online.',
    faqs: [
      {
        q: 'Are classes in Los Angeles online?',
        a: 'Yes — all of them. There is no Beacon office or classroom in Los Angeles. Every class is a live, one-to-one lesson taught online from your home.',
      },
      {
        q: 'What time zone are Los Angeles classes scheduled in?',
        a: 'Pacific Time. You pick the days and times that fit your family — after school, in the evening, or at the weekend.',
      },
      {
        q: 'Can my whole family learn together in Los Angeles?',
        a: 'Each student has their own 1-on-1 class, so the teacher can teach at their level. Families with more than one child can ask about a family plan when they enrol.',
      },
      {
        q: 'How long is each class?',
        a: 'It depends on the course and schedule — most classes are 30 to 60 minutes. The fee table below shows the exact class length for every course and schedule.',
      },
      {
        q: 'What happens after the free trial class?',
        a: 'If the trial feels right, you choose your course and your weekly times, and regular classes begin with your teacher. Every month, the family receives a written progress report.',
      },
    ],
    ctaTitle: 'Start learning Quran online in Los Angeles',
    ctaText: 'Book your free trial class today — no commitment required.',
  },

  'quran-classes-in-dallas': {
    slug: 'quran-classes-in-dallas',
    kind: 'city',
    breadcrumbName: 'Quran Classes in Dallas',
    badge: 'Online Quran Classes — Dallas, TX',
    h1: 'Online Quran Classes in Dallas',
    intro:
      `Learn Quran online in Dallas with certified male and female teachers. Our 1-on-1 online Quran classes bring Tajweed, Hifz memorization and Noorani Qaida to kids and adults across Dallas — live, at times that fit your day. ${ONLINE_LINE}`,
    timezoneLine: 'Classes are scheduled on Central Time (CT), with after-school, evening and weekend slots. Tell us what time suits you in your local time and we will arrange the class at that time.',
    whyTitle: 'Why families in Dallas choose Beacon',
    whyPoints: [
      { title: '1-on-1 live Quran lessons', text: 'Private, one-to-one classes for kids and adults — your teacher focuses only on you.' },
      { title: 'Central Time scheduling', text: 'After-school and weekend slots on Dallas time, so classes fit around school and work.' },
      { title: 'Monthly progress report', text: 'Every month, the family receives a written progress report for the student.' },
      { title: 'Free trial class', text: 'Book a free trial lesson first and meet your teacher before you enrol.' },
    ],
    coursesTitle: 'Quran courses for learners in Dallas',
    coursesText:
      'From a child\u2019s first Qaida lesson to Hifz and Tafseer, every course is taught one to one, live online.',
    faqs: [
      {
        q: 'Is there a Beacon Quran school in Dallas I can visit?',
        a: 'No. Beacon is an online academy — there is no school building or office in Dallas to visit. All classes are taught live online, one to one.',
      },
      {
        q: 'Can my child learn after school in Dallas?',
        a: 'Yes. Classes are scheduled on Central Time, and after-school and weekend slots are the most popular times for Dallas families.',
      },
      {
        q: 'How much do online Quran classes cost in Dallas?',
        a: 'Monthly fees run from $35 to $80, depending on the course and schedule, and are shown in your own currency in the fee table below, which lists every course, schedule and class length.',
      },
      {
        q: 'Does my child need a Quran or books before the first class?',
        a: 'No. For the first class you only need a device and a quiet place. Your teacher will tell you what books or material to use as the course goes on.',
      },
      {
        q: 'Can adults in Dallas memorise the Quran (Hifz) with Beacon?',
        a: 'Yes. Hifz is open to children and adults — there is no age limit. Each student gets a personal plan of new lesson (Sabaq), recent revision (Sabqi) and old revision (Manzil) in every class.',
      },
    ],
    ctaTitle: 'Start learning Quran online in Dallas',
    ctaText: 'Book your free trial class today — no commitment required.',
  },

  'quran-classes-in-texas': {
    slug: 'quran-classes-in-texas',
    kind: 'city',
    breadcrumbName: 'Quran Classes in Texas',
    badge: 'Online Quran Classes — Texas, USA',
    h1: 'Online Quran Classes in Texas',
    intro:
      `Learn Quran online in Texas with certified male and female teachers. Our 1-on-1 online Quran classes bring Tajweed, Hifz memorization and Noorani Qaida to kids and adults across Texas — from Houston and Dallas to Austin and San Antonio — live, at times that fit your day. ${ONLINE_LINE}`,
    timezoneLine: 'Most of Texas runs on Central Time (CT), and classes are scheduled around your day, with after-school, evening and weekend slots. Tell us what time suits you in your local time and we will arrange the class at that time.',
    whyTitle: 'Why families in Texas choose Beacon',
    whyPoints: [
      { title: '1-on-1 live Quran lessons', text: 'Private, one-to-one classes for kids and adults — your teacher focuses only on you.' },
      { title: 'Central Time across the state', text: 'Lesson times on Texas time, wherever in the state you live.' },
      { title: 'Same fees everywhere', text: 'Texas students pay the same fees as students anywhere else — no local markup.' },
      { title: 'Free trial class', text: 'Book a free trial lesson first and meet your teacher before you enrol.' },
    ],
    coursesTitle: 'Quran courses for learners in Texas',
    coursesText:
      'From a child\u2019s first Qaida lesson to Hifz and Tafseer, every course is taught one to one, live online.',
    faqs: [
      {
        q: 'Do you have teachers based in Texas?',
        a: 'We make no claim about where our teachers live — what matters is that they teach live, one to one, online. Texas students learn with the same certified teachers as students everywhere else.',
      },
      {
        q: 'What time zone do Texas classes use?',
        a: 'Most of Texas is on Central Time, and classes are scheduled around your day — after school, in the evening, or at the weekend.',
      },
      {
        q: 'Which Texas cities do your students learn from?',
        a: 'Our students learn online from Houston, Dallas, Austin, San Antonio and across the state. Because classes are 100% online, your city never limits your teacher.',
      },
      {
        q: 'How much do online Quran classes cost in Texas?',
        a: 'Monthly fees run from $35 to $80, depending on the course and schedule, and are shown in your own currency in the fee table below, which lists every course, schedule and class length.',
      },
      {
        q: 'Can my child learn Quran online from anywhere in Texas?',
        a: 'Yes. All you need is a device and an internet connection — whether you live in a big city or a small town, the class comes to your home.',
      },
    ],
    ctaTitle: 'Start learning Quran online in Texas',
    ctaText: 'Book your free trial class today — no commitment required.',
  },

  'quran-classes-in-california': {
    slug: 'quran-classes-in-california',
    kind: 'city',
    breadcrumbName: 'Quran Classes in California',
    badge: 'Online Quran Classes — California, USA',
    h1: 'Online Quran Classes in California',
    intro:
      `Learn Quran online in California with certified male and female teachers. Our 1-on-1 online Quran classes bring Tajweed, Hifz memorization and Noorani Qaida to kids and adults across California — from Los Angeles and San Diego to San Francisco and Sacramento — live, at times that fit your day. ${ONLINE_LINE}`,
    timezoneLine: 'Classes are scheduled on Pacific Time (PT), with after-school, evening and weekend slots. Tell us what time suits you in your local time and we will arrange the class at that time.',
    whyTitle: 'Why families in California choose Beacon',
    whyPoints: [
      { title: '1-on-1 live Quran lessons', text: 'Private, one-to-one classes for kids and adults — your teacher focuses only on you.' },
      { title: 'Pacific Time scheduling', text: 'Lesson times on California time, including after-school and weekend slots.' },
      { title: 'Hifz and Tafseer available', text: 'Beyond reading — memorise the Quran or study its meaning, one to one with a certified teacher.' },
      { title: 'Free trial class', text: 'Book a free trial lesson first and meet your teacher before you enrol.' },
    ],
    coursesTitle: 'Quran courses for learners in California',
    coursesText:
      'From a child\u2019s first Qaida lesson to Hifz and Tafseer, every course is taught one to one, live online.',
    faqs: [
      {
        q: 'Are Beacon classes in California online?',
        a: 'Yes — all of them. There is no Beacon office or classroom in California. Every class is a live, one-to-one lesson taught online from your home.',
      },
      {
        q: 'What times work for California families?',
        a: 'Classes are scheduled on Pacific Time. Families usually choose after-school, evening or weekend slots — you pick the days and times that fit your week.',
      },
      {
        q: 'Do you teach Hifz in California?',
        a: 'Yes. The Hifz Program is open to children and adults, with a personal plan of new lesson (Sabaq), recent revision (Sabqi) and old revision (Manzil) in every class.',
      },
      {
        q: 'Can my child start at age 4 in California?',
        a: 'Yes. Children can start Noorani Qaida from age 4. The teacher moves at the child\u2019s pace, and short, friendly lessons keep young learners engaged.',
      },
      {
        q: 'Is there a trial class before I pay anything?',
        a: 'Yes. The first step is always a free trial class — you meet your teacher in one live lesson, with no commitment. Only after that do you choose a course and schedule.',
      },
    ],
    ctaTitle: 'Start learning Quran online in California',
    ctaText: 'Book your free trial class today — no commitment required.',
  },

  'quran-classes-in-illinois': {
    slug: 'quran-classes-in-illinois',
    kind: 'city',
    breadcrumbName: 'Quran Classes in Illinois',
    badge: 'Online Quran Classes — Illinois, USA',
    h1: 'Online Quran Classes in Illinois',
    intro:
      `Learn Quran online in Illinois with certified male and female teachers. Our 1-on-1 online Quran classes bring Tajweed, Hifz memorization and Noorani Qaida to kids and adults across Illinois — from Chicago to Springfield and beyond — live, at times that fit your day. ${ONLINE_LINE}`,
    timezoneLine: 'Classes are scheduled on Central Time (CT), with after-school, evening and weekend slots. Tell us what time suits you in your local time and we will arrange the class at that time.',
    whyTitle: 'Why families in Illinois choose Beacon',
    whyPoints: [
      { title: '1-on-1 live Quran lessons', text: 'Private, one-to-one classes for kids and adults — your teacher focuses only on you.' },
      { title: 'Central Time scheduling', text: 'Lesson times on Illinois time, including after-school slots for Chicago families.' },
      { title: 'Islamic Studies for every age', text: 'Kids 5–10, Teens 11–16 and Adults levels — Aqeedah, Fiqh, Seerah and Akhlaq.' },
      { title: 'Free trial class', text: 'Book a free trial lesson first and meet your teacher before you enrol.' },
    ],
    coursesTitle: 'Quran courses for learners in Illinois',
    coursesText:
      'From a child\u2019s first Qaida lesson to Hifz and Tafseer, every course is taught one to one, live online.',
    faqs: [
      {
        q: 'Are there in-person Quran classes in Illinois?',
        a: 'No. Beacon is an online academy — there is no classroom or centre in Illinois. All classes are taught live online, one to one, from your home.',
      },
      {
        q: 'What time zone are Illinois classes in?',
        a: 'Central Time. You choose the days and times that suit you — after school, in the evening, or at the weekend.',
      },
      {
        q: 'Which course is right for a complete beginner in Illinois?',
        a: 'Noorani Qaida. It starts from the very first Arabic letter and is made for complete beginners — kids from age 4 and adults alike. Most students finish it in 3–6 months.',
      },
      {
        q: 'Do you offer Islamic Studies for kids in Illinois?',
        a: 'Yes. Islamic Studies has levels by age — Kids 5–10, Teens 11–16, and Adults — covering Aqeedah, Fiqh, Seerah and Akhlaq, taught one to one.',
      },
      {
        q: 'How do parents follow their child\u2019s progress?',
        a: 'Every month, the family receives a written progress report for the student — what was covered, how recitation and Tajweed are progressing, and what to practise next.',
      },
    ],
    ctaTitle: 'Start learning Quran online in Illinois',
    ctaText: 'Book your free trial class today — no commitment required.',
  },

  'quran-classes-in-michigan': {
    slug: 'quran-classes-in-michigan',
    kind: 'city',
    breadcrumbName: 'Quran Classes in Michigan',
    badge: 'Online Quran Classes — Michigan, USA',
    h1: 'Online Quran Classes in Michigan',
    intro:
      `Learn Quran online in Michigan with certified male and female teachers. Our 1-on-1 online Quran classes bring Tajweed, Hifz memorization and Noorani Qaida to kids and adults across Michigan — from Detroit and Dearborn to Ann Arbor and Grand Rapids — live, at times that fit your day. ${ONLINE_LINE}`,
    timezoneLine: 'Most of Michigan runs on Eastern Time (ET), and classes are scheduled around your day, with after-school, evening and weekend slots. Tell us what time suits you in your local time and we will arrange the class at that time.',
    whyTitle: 'Why families in Michigan choose Beacon',
    whyPoints: [
      { title: '1-on-1 live Quran lessons', text: 'Private, one-to-one classes for kids and adults — your teacher focuses only on you.' },
      { title: 'Eastern Time scheduling', text: 'Lesson times on Michigan time, including after-school and weekend slots.' },
      { title: 'Female teachers on request', text: 'Sisters and young girls can ask us on WhatsApp or by email for a female teacher when they enrol.' },
      { title: 'Free trial class', text: 'Book a free trial lesson first and meet your teacher before you enrol.' },
    ],
    coursesTitle: 'Quran courses for learners in Michigan',
    coursesText:
      'From a child\u2019s first Qaida lesson to Hifz and Tafseer, every course is taught one to one, live online.',
    faqs: [
      {
        q: 'Are Beacon classes in Michigan taught online?',
        a: 'Yes — all of them. There is no Beacon office or classroom in Michigan. Every class is a live, one-to-one lesson taught online from your home.',
      },
      {
        q: 'What time zone do Michigan classes follow?',
        a: 'Most of Michigan is on Eastern Time, and classes are scheduled around your day — after school, in the evening, or at the weekend.',
      },
      {
        q: 'Can my child learn with a female teacher in Michigan?',
        a: 'Yes. Sisters and young girls can learn one to one with a female teacher — just tell us on WhatsApp or by email when you enrol. See our Female Teachers page for how it works.',
      },
      {
        q: 'How much do online Quran classes cost in Michigan?',
        a: 'Monthly fees run from $35 to $80, depending on the course and schedule, and are shown in your own currency in the fee table below, which lists every course, schedule and class length.',
      },
      {
        q: 'How long does it take to finish Noorani Qaida?',
        a: 'Most students finish in 3–6 months, depending on how many sessions they take each week and how regularly they practise. After Qaida, students move to Recitation & Tajweed and start reading directly from the Mushaf.',
      },
    ],
    ctaTitle: 'Start learning Quran online in Michigan',
    ctaText: 'Book your free trial class today — no commitment required.',
  },

  'quran-classes-for-kids': {
    slug: 'quran-classes-for-kids',
    kind: 'audience',
    breadcrumbName: 'Quran Classes for Kids',
    badge: 'Online Quran Classes — For Kids',
    h1: 'Online Quran Classes for Kids',
    intro:
      'Live, one-to-one Quran classes for children — taught online, from home, by certified male and female teachers. From a child\u2019s first Qaida lesson to fluent recitation and Hifz, every class is shaped around one student: yours.',
    whyTitle: 'Why parents choose Beacon for their kids',
    whyPoints: [
      { title: 'Short, friendly 30-minute lessons', text: 'Lessons are kept short and friendly, so young learners stay engaged from start to finish.' },
      { title: 'Patient, certified teachers', text: 'Our tutors are certified and Ijazah-holding, and they teach at the child\u2019s pace — never rushed.' },
      { title: 'Female teachers for girls', text: 'Girls can learn one to one with a female teacher — just ask when you enrol.' },
      { title: 'Monthly report for parents', text: 'Every month, parents receive a written progress report for their child.' },
    ],
    coursesTitle: 'Quran courses for kids',
    coursesText:
      'Most children start with Noorani Qaida, then move to Recitation & Tajweed — and on to Hifz or Islamic Studies when they are ready.',
    faqs: [
      {
        q: 'What age can my child start Quran classes?',
        a: 'Children can start Noorani Qaida from age 4. The teacher moves at the child\u2019s pace, and short, friendly lessons keep young learners engaged.',
      },
      {
        q: 'How long is a class for a young child?',
        a: 'Most children\u2019s classes are 30 minutes — long enough to learn, short enough to stay focused. Hifz classes are longer, up to 60 minutes.',
      },
      {
        q: 'Will my child learn with a female teacher?',
        a: 'Girls can learn one to one with a female teacher — just tell us on WhatsApp or by email when you enrol. See our Female Teachers page for how it works.',
      },
      {
        q: 'Which course should my child start with?',
        a: 'If your child cannot read Arabic yet, they start with Noorani Qaida — from the first letter. After Qaida, they move to Recitation & Tajweed and start reading directly from the Mushaf. The teacher confirms the right level in the first class.',
      },
      {
        q: 'How do parents know how their child is doing?',
        a: 'Every month, parents receive a written progress report — what was covered, how recitation and Tajweed are progressing, and what to practise next.',
      },
      {
        q: 'Can my child learn if we have a busy week?',
        a: 'Yes. You choose the days and times that suit your family, including weekend slots, and you can change them when life changes.',
      },
    ],
    ctaTitle: 'Book a free trial class for your child',
    ctaText: 'One live lesson, one teacher, no commitment — see how your child learns before you enrol.',
  },

  'quran-classes-for-beginners': {
    slug: 'quran-classes-for-beginners',
    kind: 'audience',
    breadcrumbName: 'Quran Classes for Beginners',
    badge: 'Online Quran Classes — For Beginners',
    h1: 'Online Quran Classes for Beginners',
    intro:
      'Never read a word of Arabic? That is exactly where our beginners start. Live, one-to-one Quran classes take you from the very first letter to fluent reading — at your pace, with a patient, certified teacher.',
    whyTitle: 'Why beginners start with Beacon',
    whyPoints: [
      { title: 'Start from the first letter', text: 'Noorani Qaida begins with the Arabic alphabet itself — no background needed at all.' },
      { title: 'No Arabic background needed', text: 'You do not need to know any Arabic. Every rule is explained in English as you go.' },
      { title: 'Patient 1-on-1 teaching', text: 'One teacher, one student — every minute of the lesson is about your learning.' },
      { title: 'A clear path forward', text: 'Qaida, then Recitation & Tajweed, then Hifz or Tafseer when you are ready.' },
    ],
    coursesTitle: 'The beginner\u2019s path',
    coursesText:
      'Start with Noorani Qaida, move to Recitation & Tajweed once you can read, then choose Hifz, Tafseer or Islamic Studies.',
    faqs: [
      {
        q: 'I cannot read a single Arabic letter — can I still join?',
        a: 'Yes. Noorani Qaida starts from the very first letter, so it is made for complete beginners — kids and adults alike.',
      },
      {
        q: 'I am an adult beginner — are classes only for children?',
        a: 'No. Adults learn with us too — including reverts and non-Arabic speakers starting from scratch. The teacher sets the pace to you, whatever your age.',
      },
      {
        q: 'How long until I can read the Quran?',
        a: 'Most students finish Noorani Qaida in 3–6 months, depending on how many sessions they take each week and how regularly they practise. After that, you start reading directly from the Mushaf.',
      },
      {
        q: 'Do I need to know Arabic to understand Tafseer?',
        a: 'No. Tafseer is taught in English, with Arabic words explained as they come up.',
      },
      {
        q: 'What happens in the free trial class?',
        a: 'You meet your teacher in one live, one-to-one lesson. If you already know some letters, the teacher assesses your level and places you on the right course.',
      },
      {
        q: 'Which course comes first?',
        a: 'Noorani Qaida first, then Recitation & Tajweed. From there you can move to Hifz memorization, Tafseer-ul-Quran or Islamic Studies.',
      },
    ],
    ctaTitle: 'Start reading the Quran — book a free trial',
    ctaText: 'One live lesson with a patient teacher, no commitment — your journey starts with the first letter.',
  },

  'quran-classes-for-adults': {
    slug: 'quran-classes-for-adults',
    kind: 'audience',
    breadcrumbName: 'Quran Classes for Adults',
    badge: 'Online Quran Classes — For Adults',
    h1: 'Online Quran Classes for Adults',
    intro:
      'Live, one-to-one Quran classes built around an adult life — early mornings, evenings and weekends, at your pace, with a certified teacher. Whether you are starting from the first letter, rebuilding reading you learnt as a child, memorising the Quran or studying its meaning, there is a course for you.',
    whyTitle: 'Why adults learn with Beacon',
    whyPoints: [
      { title: 'Times around your work', text: 'Choose early-morning, evening or weekend slots — classes fit your week, not the other way round.' },
      { title: 'Learn at your own pace', text: 'One teacher, one student — the lesson moves at your speed, with no group to keep up with.' },
      { title: 'Rebuild forgotten reading', text: 'Learnt as a child and lost it? The teacher assesses your level and rebuilds your reading step by step.' },
      { title: 'Tafseer in English', text: 'Study the meaning of the Quran in English — no Arabic background needed.' },
    ],
    coursesTitle: 'Quran courses for adults',
    coursesText:
      'Adults study every course we offer — from Qaida and Tajweed to Hifz, Tafseer and Islamic Studies.',
    faqs: [
      {
        q: 'I work full-time — can I still learn Quran online?',
        a: 'Yes. Classes are scheduled around your week, with early-morning, evening and weekend slots. You choose the days and times that suit you.',
      },
      {
        q: 'I learnt Quran as a child but forgot most of it — where do I start?',
        a: 'You are not alone — many adult students start there. In the free trial, the teacher assesses your reading and places you on the right course, then rebuilds your fluency step by step.',
      },
      {
        q: 'Can adults memorise the Quran (Hifz)?',
        a: 'Yes — there is no age limit for Hifz. Children and adults both memorise with us, and the plan is set to each student\u2019s pace and memory.',
      },
      {
        q: 'Can I study Tafseer as an adult?',
        a: 'Yes. Tafseer-ul-Quran is mainly for teens and adults, and it is taught in English — no Arabic needed. Students start with Surah Al-Fatihah and Juz Amma.',
      },
      {
        q: 'Are classes one-to-one for adults too?',
        a: 'Yes. Every class at Beacon is one teacher with one student — adults included. Nothing about your learning is shared with a group.',
      },
      {
        q: 'Can I learn with a teacher of my own gender?',
        a: 'Sisters can request a female teacher when they enrol — see our Female Teachers page. Brothers learn one to one with a male teacher.',
      },
    ],
    ctaTitle: 'Start learning Quran as an adult — book a free trial',
    ctaText: 'One live lesson at a time that suits you, no commitment — it is never too late to start.',
  },

  'quran-classes-for-female': {
    slug: 'quran-classes-for-female',
    kind: 'audience',
    breadcrumbName: 'Quran Classes for Females',
    badge: 'Online Quran Classes — For Sisters',
    h1: 'Online Quran Classes for Females',
    intro:
      'Live, one-to-one Quran classes for sisters and young girls — taught online, from home, by a female teacher on request. From Noorani Qaida and Tajweed through to Hifz and Tafseer, every class is private, personal and at a pace that fits your day.',
    whyTitle: 'Why sisters learn with Beacon',
    whyPoints: [
      { title: 'Female teacher on request', text: 'Sisters and young girls can learn with a female teacher — just ask when you enrol.' },
      { title: 'One-to-one, private', text: 'Every class is one teacher with one student, from your home — no group, no shared attention.' },
      { title: 'The same Ijazah standard', text: 'Our tutors are certified and Ijazah-holding, and female teachers are held to the same standard as every Beacon tutor.' },
      { title: 'All five courses', text: 'A female teacher can teach any of our courses — from a child\u2019s first Qaida lesson to Hifz and Tafseer.' },
    ],
    coursesTitle: 'Quran courses for sisters and girls',
    coursesText:
      'Every course is open to sisters and girls, with a female teacher on request.',
    faqs: [
      {
        q: 'Can I learn Quran online with a female teacher?',
        a: 'Yes. Sisters and young girls can learn one to one with a female teacher — just tell us on WhatsApp or by email when you enrol.',
      },
      {
        q: 'Are female teachers qualified to the same standard?',
        a: 'Yes. Our tutors are certified and Ijazah-holding, and female teachers are held to the same standard as every Beacon tutor — proven recitation and Tajweed before they teach a single class.',
      },
      {
        q: 'Can my daughter learn with a female teacher?',
        a: 'Yes. Girls learn one to one with a female teacher they feel comfortable with, in a class where every minute is about them.',
      },
      {
        q: 'Which courses can I study with a female teacher?',
        a: 'Any of our five courses — Noorani Qaida, Recitation & Tajweed, Hifz Program, Tafseer-ul-Quran and Islamic Studies.',
      },
      {
        q: 'How do I request a female teacher?',
        a: 'Let us know you would like a female teacher when you book your free trial class. Your trial is taught by a female teacher, so you can see how she teaches before you commit.',
      },
      {
        q: 'Are the classes private?',
        a: 'Yes. Every class is one to one and taught live online from your home — just you and your teacher.',
      },
    ],
    ctaTitle: 'Book a free trial class with a female teacher',
    ctaText: 'One live lesson with a female teacher, no commitment — see how she teaches before you enrol.',
    crossLink: {
      href: '/female-teachers',
      label: 'Female Teachers',
      text: 'Our dedicated Female Teachers page explains the standard, the courses, and how to request a female teacher — in full.',
    },
  },

  'quran-classes-for-male': {
    slug: 'quran-classes-for-male',
    kind: 'audience',
    breadcrumbName: 'Quran Classes for Males',
    badge: 'Online Quran Classes — For Brothers',
    h1: 'Online Quran Classes for Males',
    intro:
      'Live, one-to-one Quran classes for brothers — taught online, from home, with a male teacher. From a first Qaida lesson to Hifz and Tafseer, every class is private, personal and scheduled around your day.',
    whyTitle: 'Why brothers learn with Beacon',
    whyPoints: [
      { title: 'Male teacher, one-to-one', text: 'Brothers learn alone with a male teacher — no group, and a lesson shaped around one student.' },
      { title: 'Flexible around work', text: 'Early-morning, evening and weekend slots, so classes fit around work and family.' },
      { title: 'Hifz at any age', text: 'Memorise the Quran with a personal plan — there is no age limit for Hifz.' },
      { title: 'All five courses', text: 'Qaida, Tajweed, Hifz, Tafseer and Islamic Studies — every course is open to brothers.' },
    ],
    coursesTitle: 'Quran courses for brothers',
    coursesText:
      'Every course is open to brothers, taught one to one by a male teacher.',
    faqs: [
      {
        q: 'Can brothers learn Quran online with a male teacher?',
        a: 'Yes. Brothers learn one to one with a male teacher, live online, from home.',
      },
      {
        q: 'Which courses can men study?',
        a: 'All five — Noorani Qaida, Recitation & Tajweed, Hifz Program, Tafseer-ul-Quran and Islamic Studies.',
      },
      {
        q: 'I am a busy professional — can I fit classes around work?',
        a: 'Yes. You choose early-morning, evening or weekend slots, and you can change your times when life changes.',
      },
      {
        q: 'Can adult men start Hifz?',
        a: 'Yes — there is no age limit for Hifz. Children and adults both memorise with us, and the plan is set to each student\u2019s pace and memory.',
      },
      {
        q: 'Is there a course for reverts and new Muslims?',
        a: 'Yes. Reverts and non-Arabic speakers start with Noorani Qaida — from the first letter — and the Islamic Studies Adults level covers the essentials of Islam.',
      },
      {
        q: 'How does the free trial work for men?',
        a: 'Book a free trial and meet your teacher in one live, one-to-one lesson. There is no commitment — if it feels right, you choose your course and weekly schedule.',
      },
    ],
    ctaTitle: 'Book a free trial class',
    ctaText: 'One live lesson with a male teacher, no commitment — start today.',
  },
};
