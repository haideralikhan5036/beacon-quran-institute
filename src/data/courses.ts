// Single source of truth for the five Beacon course paths.
// Copy here is plain English only; no stats, teacher names or
// "guaranteed" outcomes are claimed anywhere in this file.
// Fees are NOT stored here — see src/data/feeTable.ts; feeGroup only
// maps a course to its fee-table rows.

export interface CourseDetail {
  id: string;
  slug: string;
  title: string;
  short: string;
  tagline: string;
  level: string;
  duration: string;
  frequency: string;
  whoIsItFor: string[];
  benefits: string[];
  curriculum: string[];
  lessonStructure: string[];
  teachers: string;
  feeGroup: 'qaida' | 'hifz' | 'tafseer';
  faqs: { q: string; a: string }[];
  quote: string;
}

const TEACHERS_LINE = 'Certified male & female teachers, Ijazah holders';

export const COURSES: CourseDetail[] = [
  {
    id: 'qaida',
    slug: 'noorani-qaida',
    title: 'Noorani Qaida',
    short:
      'The essential first step for beginners and kids — learn Arabic letters, correct pronunciation, and basic Tajweed from scratch.',
    tagline: 'The essential foundation for reading Quranic Arabic with precision',
    level: 'Beginner',
    duration: '3–6 months',
    frequency: '3–5 sessions per week',
    whoIsItFor: [
      'Children aged 4+ starting their Quranic journey',
      'Adults learning to read Quranic Arabic for the first time',
      'Reverts and non-Arabic speakers needing phonetic training',
      'Students wanting to correct fundamental letter pronunciation',
    ],
    benefits: [
      'Mastery of the Arabic alphabet with exact Makharij (articulation points)',
      'Understanding of fundamental Tajweed rules (Harakat, Tanween, Sukoon)',
      'Confidence in joining letters and forming connected Quranic words',
      'Building smooth rhythm and stopping rules from day one',
    ],
    curriculum: [
      'Module 1: Single letters and articulation points (Al-Huroof Al-Mufradah)',
      'Module 2: Joined letters and compound shapes (Al-Huroof Al-Murakkabah)',
      'Module 3: Short vowels (Fatha, Kasra, Damma) and Tanween',
      'Module 4: Long vowels (Madd letters) and soft vowels (Leen)',
      'Module 5: Sukoon, Shaddah, and the rules of Noon and Meem Sakinah',
      'Module 6: Final evaluation and continuous Mushaf recitation practice',
    ],
    lessonStructure: [
      'A 30-minute live 1-on-1 class with your teacher',
      'Quick revision of the previous lesson',
      'New letters or rules with guided practice',
      'Reading practice from the Qaida book',
      'Short homework, plus a monthly progress report to parents',
    ],
    teachers: TEACHERS_LINE,
    feeGroup: 'qaida',
    faqs: [
      {
        q: 'What age can my child start Noorani Qaida?',
        a: 'Children can start from age 4. The teacher moves at the child’s pace, and short, friendly lessons keep young learners engaged.',
      },
      {
        q: 'Do I need any Arabic background to join?',
        a: 'No. This course starts from the very first letter, so it is made for complete beginners — kids and adults alike.',
      },
      {
        q: 'How long does it take to finish Noorani Qaida?',
        a: 'Most students finish in 3–6 months, depending on how many sessions they take each week and how regularly they practise.',
      },
      {
        q: 'What comes after Noorani Qaida?',
        a: 'After Qaida, students move to the Recitation & Tajweed course and start reading directly from the Mushaf.',
      },
    ],
    quote: 'The best among you are those who learn the Quran and teach it. (Sahih Bukhari)',
  },
  {
    id: 'recitation-tajweed',
    slug: 'recitation-tajweed',
    title: 'Recitation & Tajweed',
    short:
      'From fluent Mushaf reading to the deep science of Tajweed — four levels that take you from correct letters to Ijazah.',
    tagline: 'Fluent recitation and the science of Tajweed, from Makharij to Ijazah',
    level: 'Beginner to Advanced',
    duration: '6–12 months',
    frequency: '3–4 sessions per week',
    whoIsItFor: [
      'Students who know Arabic letters but struggle with smooth reading',
      'Learners wanting to remove hesitation and heavy pauses',
      'Reciters wanting to correct subtle, hidden mistakes',
      'Teachers and imams seeking formal Ijazah with a connected chain',
    ],
    benefits: [
      'Fluent, effortless recitation of the Holy Quran',
      'Practical application of Tajweed rules in continuous Surahs',
      'Mastery of Waqf (stopping) and Ibtida (starting) rules',
      'Refining voice melody, cadence, and reverence (Khushoo)',
      'Option to test for authenticated Ijazah with unbroken Isnad',
    ],
    curriculum: [
      'Level 1: Fluency — recitation of Juz Amma (30th Juz) with detailed correction',
      'Level 2: Fluency — selected Surahs (Yaseen, Al-Mulk, Al-Kahf, Ar-Rahman) and full Mushaf reading',
      'Level 3: Tajweed science — Makharij (17 articulation points) and Sifaat (letter characteristics) in depth',
      'Level 4: Tajweed mastery — Madd rules, advanced rules of Noon, Meem, Raa and Laam, and Ijazah preparation',
    ],
    lessonStructure: [
      'A 30–45 minute live 1-on-1 class with your teacher',
      'Revision of the previous recitation',
      'A new passage, read aloud with Tajweed correction',
      'Targeted practice on the rule of the day',
      'Homework, plus a monthly progress report to parents',
    ],
    teachers: TEACHERS_LINE,
    feeGroup: 'qaida',
    faqs: [
      {
        q: 'Do I need to finish Qaida before joining this course?',
        a: 'Yes — students should be able to recognise the Arabic letters. If you are unsure of your level, book a free trial and the teacher will assess you.',
      },
      {
        q: 'Can I join only for Ijazah?',
        a: 'Yes. If your recitation is already strong, the teacher will assess you and place you directly on the Ijazah track.',
      },
      {
        q: 'Are female teachers available?',
        a: 'Yes. We have certified male and female teachers, and sisters can request a female teacher.',
      },
      {
        q: 'What is Ijazah?',
        a: 'Ijazah is a formal certification that your recitation has been checked and approved by a certified teacher, with an unbroken chain of transmission back to the Prophet Muhammad ﷺ.',
      },
    ],
    quote: '...and recite the Quran with measured recitation (Tartila). (Surah Al-Muzzammil, 4)',
  },
  {
    id: 'hifz',
    slug: 'hifz-program',
    title: 'Hifz Program',
    short:
      'Memorise the Quran with a personal plan — new lesson (Sabaq), recent revision (Sabqi) and old revision (Manzil) in every class.',
    tagline: 'Preserve the Divine Word in your heart with a tailored 1-on-1 track',
    level: 'All levels',
    duration: 'Juz Amma 3–5 months · Full Quran 2–4 years',
    frequency: '4–6 sessions per week',
    whoIsItFor: [
      'Children and adults aspiring to become Hafiz-ul-Quran',
      'Students wanting to memorise selected Surahs (Yaseen, Al-Mulk, Al-Kahf, Al-Waqiah)',
      'Current Huffaz needing structured daily revision (Daur and Manzil)',
      'Sisters seeking dedicated female Hafiza tutors for 1-on-1 Hifz',
    ],
    benefits: [
      'Personalised daily lesson (Sabaq), revision (Sabqi), and Daur schedule',
      'Retention techniques to help keep memorised verses firm',
      'Mastery of Mutashabihat (similar Quranic verses)',
      'Daily 1-on-1 recitation with certified Ijazah-holding tutors',
    ],
    curriculum: [
      'Track 1: Foundation Hifz — Juz 30 and Juz 29 memorisation',
      'Track 2: Progressive Hifz — new lesson daily, plus revision of the previous pages',
      'Track 3: Consolidation — full Daur revision cycles and Mutashabihat drills',
      'Track 4: Sanad preparation and final Hifz examination',
    ],
    lessonStructure: [
      'A 60-minute live 1-on-1 class with your teacher',
      'Recitation of the new lesson (Sabaq)',
      'Revision of recent lessons (Sabqi)',
      'Revision of older lessons (Manzil / Daur)',
      'The teacher sets the next lesson, and a monthly progress report goes to parents',
    ],
    teachers: TEACHERS_LINE,
    feeGroup: 'hifz',
    faqs: [
      {
        q: 'How long does it take to memorise the whole Quran?',
        a: 'Most students take 2–4 years for the full Quran, depending on how much they memorise each day and how many sessions they take each week. Juz Amma alone usually takes 3–5 months.',
      },
      {
        q: 'Can I memorise only selected Surahs?',
        a: 'Yes. You can choose a personal track — for example Yaseen, Al-Mulk, Al-Kahf and Al-Waqiah — instead of the full Quran.',
      },
      {
        q: 'What if I forget the lessons I memorised earlier?',
        a: 'That is normal, and the Sabaq / Sabqi / Manzil system is built for it: every class revises recent and older lessons so memorisation stays firm.',
      },
      {
        q: 'Is there an age limit for Hifz?',
        a: 'No. Children and adults both memorise with us — the plan is set to each student’s pace and memory.',
      },
    ],
    quote:
      'It will be said to the companion of the Quran: Recite and rise in status... (Abu Dawood)',
  },
  {
    id: 'tafseer',
    slug: 'tafseer-ul-quran',
    title: 'Tafseer-ul-Quran',
    short:
      'Understand what you recite — word-by-word meaning, reasons for revelation, and guidance you can live by.',
    tagline: 'Unveil the meanings, context, and wisdom of the Divine verses',
    level: 'Intermediate to Advanced',
    duration: '3–6 months (Juz Amma)',
    frequency: '2–3 sessions per week',
    whoIsItFor: [
      'Seekers of knowledge wanting to understand what Allah says directly',
      'Parents and professionals desiring deeper spiritual reflection (Tadabbur)',
      'Students wanting to connect Quranic rulings to daily modern life',
      'Anyone seeking character building (Akhlaq) rooted in the Quran',
    ],
    benefits: [
      'Detailed study of Sabab al-Nuzul (reasons for revelation)',
      'Word-by-word linguistic analysis of key Quranic terminology',
      'Deriving actionable spiritual and moral lessons for modern living',
      'Understanding classical commentary (Ibn Kathir, Al-Qurtubi, As-Sa’di)',
    ],
    curriculum: [
      'Unit 1: Principles of Tafsir (Usul al-Tafsir) and the history of revelation',
      'Unit 2: Detailed Tafsir of Surah Al-Fatihah and Juz Amma',
      'Unit 3: Tafsir of selected major Surahs (Yaseen, Al-Kahf, Al-Hujurat, Ar-Rahman)',
      'Unit 4: Quranic stories of the Prophets and lessons in character (Akhlaq)',
      'Unit 5: Applied Quranic guidance for contemporary personal challenges',
    ],
    lessonStructure: [
      'A 45-minute live 1-on-1 class with your teacher',
      'Revision of the previous lesson',
      'Word-by-word meaning of the new passage',
      'Discussion of its context, background, and lessons',
      'Short reflection homework, plus a monthly progress report',
    ],
    teachers: TEACHERS_LINE,
    feeGroup: 'tafseer',
    faqs: [
      {
        q: 'Do I need to know Arabic to study Tafseer?',
        a: 'No. The course is taught in English, with Arabic words explained as they come up.',
      },
      {
        q: 'Which Surahs are covered?',
        a: 'Students start with Surah Al-Fatihah and Juz Amma (usually 3–6 months), then move on to selected major Surahs.',
      },
      {
        q: 'Is this course suitable for children?',
        a: 'It is mainly for teens and adults. Younger students usually start with the Islamic Studies course, which covers Seerah and Akhlaq at their level.',
      },
      {
        q: 'Can I choose a Surah I want to study?',
        a: 'Yes — after the first units, you can ask your teacher to cover a Surah of your choice.',
      },
    ],
    quote:
      '[This is] a blessed Book which We have revealed that they might reflect upon its verses... (Surah Sad, 29)',
  },
  {
    id: 'islamic-studies',
    slug: 'islamic-studies',
    title: 'Islamic Studies',
    short:
      'Aqeedah, Fiqh, Seerah and Akhlaq — a complete Islamic education for kids, teens and adults, one level at a time.',
    tagline: 'A complete Islamic education — belief, worship, Seerah and manners',
    level: 'Kids 5–10 · Teens 11–16 · Adults',
    duration: 'About 1 year per level',
    frequency: '3 sessions per week',
    whoIsItFor: [
      'Kids aged 5–10 starting their Islamic education',
      'Teens aged 11–16 building a strong foundation in their deen',
      'Adults and reverts learning the essentials of Islam',
      'Families wanting one teacher for siblings at different levels',
    ],
    benefits: [
      'Clear Aqeedah — who Allah is, and the pillars of faith',
      'Practical Fiqh — wudu, salah, fasting, and zakah',
      'Seerah of the Prophet Muhammad ﷺ',
      'Akhlaq and Islamic manners for daily life',
      'Daily duas memorised with their meanings',
    ],
    curriculum: [
      'Kids Level (5–10): short daily duas, steps of wudu and salah, stories of the Prophets, good manners',
      'Kids Level (5–10): Islamic months and festivals, kindness to parents and neighbours, simple Aqeedah',
      'Teens Level (11–16): the six pillars of Iman, Fiqh of salah and fasting, Seerah of the Prophet ﷺ',
      'Teens Level (11–16): Akhlaq in daily life, Islamic manners online and at school, duas for every occasion',
      'Adults Level: Aqeedah in depth, Fiqh of worship, Seerah lessons, Islamic manners and family life',
      'Adults Level: purification, prayer, fasting and zakah in practice, and answering common questions about Islam',
    ],
    lessonStructure: [
      'A 30-minute live 1-on-1 class with your teacher',
      'Revision of the previous lesson',
      'A new topic taught with stories and everyday examples',
      'Practice — duas, the steps of wudu, or salah',
      'Light homework, plus a monthly progress report to parents',
    ],
    teachers: TEACHERS_LINE,
    feeGroup: 'qaida',
    faqs: [
      {
        q: 'Which level is right for my child?',
        a: 'Levels follow age — Kids 5–10, Teens 11–16, Adults — and the teacher confirms the right level in the first class.',
      },
      {
        q: 'Is Islamic Studies priced the same as Recitation & Tajweed?',
        a: 'Yes. Islamic Studies shares the same fee group as Noorani Qaida and Recitation & Tajweed, so the monthly fees are the same.',
      },
      {
        q: 'Can my children share one class?',
        a: 'Each student has their own 1-on-1 class so the teacher can teach at their level. Families with more than one child can ask about a family plan.',
      },
      {
        q: 'Does this course teach Quran reading?',
        a: 'Reading is taught in the Noorani Qaida and Recitation & Tajweed courses. This course focuses on Islamic knowledge — Aqeedah, Fiqh, Seerah and Akhlaq.',
      },
    ],
    quote: 'Seeking knowledge is an obligation upon every Muslim. (Sunan Ibn Majah)',
  },
];

export const COURSE_BY_SLUG: Record<string, CourseDetail> = Object.fromEntries(
  COURSES.map((course) => [course.slug, course]),
);

/** Fee-table course name for a fee group (see src/data/feeTable.ts). */
export const FEE_GROUP_COURSE: Record<CourseDetail['feeGroup'], string> = {
  qaida: 'Qaida, Quran Recitation & Islamic Studies',
  hifz: 'Hifz e Quran',
  tafseer: 'Quran Tafseer',
};

/**
 * Find a course by id, slug, or title (fuzzy, case-insensitive).
 * Unknown input falls back to the first course (Noorani Qaida).
 */
export function findCourse(idOrSlugOrTitle: string): CourseDetail {
  const target = (idOrSlugOrTitle ?? '').trim().toLowerCase();
  if (!target) return COURSES[0];
  const found = COURSES.find((course) => {
    const id = course.id.toLowerCase();
    const slug = course.slug.toLowerCase();
    const title = course.title.toLowerCase();
    return (
      id === target ||
      slug === target ||
      title === target ||
      title.includes(target) ||
      target.includes(title)
    );
  });
  return found ?? COURSES[0];
}
