/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import { scrollToId } from './utils/scrollToId';

// ── Lazy load ALL below-fold sections for fast initial paint ─────────────────
const Hero              = lazy(() => import('./components/Hero'));
const Courses           = lazy(() => import('./components/Courses'));
const HowItWorks        = lazy(() => import('./components/HowItWorks'));
const WhyUs             = lazy(() => import('./components/WhyUs'));
const CalligraphyBand   = lazy(() => import('./components/CalligraphyBand'));
const NearYou           = lazy(() => import('./components/NearYou'));
const Fees              = lazy(() => import('./components/Fees'));
const Testimonials      = lazy(() => import('./components/Testimonials'));
const Registration      = lazy(() => import('./components/Registration'));
const Footer            = lazy(() => import('./components/Footer'));
const Blog              = lazy(() => import('./components/Blog'));
const CustomerServices  = lazy(() => import('./components/CustomerServices'));
const TermsOfService    = lazy(() => import('./components/TermsOfService'));
const CertificateOfAppraisal = lazy(() => import('./components/CertificateOfAppraisal'));
const CourseDetailsPage = lazy(() => import('./components/CourseDetailsPage'));
const ContactPage       = lazy(() => import('./components/ContactPage'));
const AboutPage         = lazy(() => import('./components/AboutPage'));
const CountryPage       = lazy(() => import('./components/CountryPage'));
const CountryLinks      = lazy(() => import('./components/CountryLinks'));
const HowItWorksPage    = lazy(() => import('./components/HowItWorksPage'));
const EnrolPage         = lazy(() => import('./components/EnrolPage'));
const CoursesHubPage    = lazy(() => import('./components/CoursesHubPage'));
const QualityAssurancePage = lazy(() => import('./components/QualityAssurancePage'));
const FemaleTeachersPage = lazy(() => import('./components/FemaleTeachersPage'));
const LocationPage = lazy(() => import('./components/LocationPage'));
const RulesPage = lazy(() => import('./components/RulesPage'));
const ParentsPage = lazy(() => import('./components/ParentsPage'));
const FaqPage = lazy(() => import('./components/FaqPage'));
import { ChatOverlay, FloatingButtons } from './components/ChatBot';
import type { CountryKey } from './components/CountryPage';
import type { CurrencyCode } from './data/feeTable';
import { COURSES } from './data/courses';
import { blogPosts } from './data/blogData';
import {
  REGION_CURRENCY,
  detectRegion,
  isPageRegion,
  isSearchCrawler,
  loadStoredRegion,
  saveRegion,
  type RegionKey,
} from './utils/geo';

export type ViewState = 'home' | 'blog' | 'services' | 'terms' | 'certificate' | 'testimonials' | 'courses' | 'contact' | 'about' | 'usa' | 'uk' | 'canada' | 'how-it-works' | 'enrol' | 'quality-assurance' | 'female-teachers' | 'quran-classes-in-houston' | 'quran-classes-in-new-york' | 'quran-classes-in-los-angeles' | 'quran-classes-in-dallas' | 'quran-classes-in-texas' | 'quran-classes-in-california' | 'quran-classes-in-illinois' | 'quran-classes-in-michigan' | 'quran-classes-for-kids' | 'quran-classes-for-beginners' | 'quran-classes-for-adults' | 'quran-classes-for-female' | 'quran-classes-for-male' | 'rules' | 'parents' | 'faq';

const HOME_TITLE = 'Online Quran Classes for Kids & Adults | Learn Quran Online with Tajweed — Beacon Quran Institute';
const HOME_DESCRIPTION = 'Online Quran academy — Quran classes near you: 1-on-1 online Quran classes for kids and adults in the USA, UK & Canada, taught live online from home. Tajweed, Hifz, Noorani Qaida. Book a free trial class today.';

// Per-view document title + meta description (SEO Batch 2). Country pages
// get their own geo-targeted title/description; other views get a
// keyword-flavoured variant of the homepage meta. Exported for the
// prerender entry (entry-server.tsx) so served HTML carries the same meta.
export const VIEW_META: Record<ViewState, { title: string; description: string }> = {
  home: { title: HOME_TITLE, description: HOME_DESCRIPTION },
  about: { title: 'About Beacon Quran Institute — Online Quran Academy', description: 'Beacon Quran Institute is an online Quran academy teaching students in 30+ countries since 2015. Learn Quran online with certified male and female teachers.' },
  courses: { title: 'Online Quran Courses | Noorani Qaida, Tajweed, Hifz & Tafseer — Beacon Quran Institute', description: 'Online Quran courses: Noorani Qaida, Quran Reading, Hifz memorization, Tajweed, Tafseer and Arabic — 1-on-1 online Quran classes for kids and adults.' },
  services: { title: 'Online Quran Services | 1-on-1 Quran Classes & Free Trial — Beacon Quran Institute', description: 'Online Quran services: 1-on-1 Quran classes for kids and adults, Tajweed, Hifz and Noorani Qaida with certified teachers. Book a free trial class.' },
  blog: { title: 'Quran Learning Blog | Online Quran Classes & Tajweed — Beacon Quran Institute', description: 'Read the Beacon Quran Institute blog: online Quran classes, Tajweed, Hifz memorization and Noorani Qaida for kids and adults.' },
  testimonials: { title: 'Student Reviews | Online Quran Classes — Beacon Quran Institute', description: 'What families say about Beacon Quran Institute: 1-on-1 online Quran classes for kids and adults in the USA, UK and Canada.' },
  contact: { title: 'Contact Beacon Quran Institute | Online Quran Classes — Beacon Quran Institute', description: 'Contact Beacon Quran Institute about online Quran classes for kids and adults in the USA, UK and Canada. Book a free trial class today.' },
  'how-it-works': { title: 'How Online Quran Classes Work | Free Trial to Weekly Lessons — Beacon Quran Institute', description: 'How Beacon Quran Institute works: book a free trial class, meet your tutor — and if the fit is not right, try a different tutor — a 2-day trial with the second tutor — then learn weekly 1-on-1 online with a monthly progress report.' },
  enrol: { title: 'Enrol — Book a Free Trial Quran Class | Beacon Quran Institute', description: 'Enrol at Beacon Quran Institute: book a free trial Quran class for kids or adults and meet your tutor first — try another tutor — a 2-day trial with the second tutor — if the fit is not right. Choose your course and schedule — Noorani Qaida, Tajweed, Hifz, Tafseer or Islamic Studies.' },
  'quality-assurance': { title: 'Quality Assurance | How We Keep Every Quran Lesson Excellent — Beacon Quran Institute', description: 'How Beacon Quran Institute assures quality: careful teacher selection, monitored lessons, monthly student evaluation and a monthly progress report for every family.' },
  parents: { title: 'For Parents | Follow Your Child\u2019s Quran Progress — Beacon Quran Institute', description: 'For parents: how to follow your child\u2019s Quran progress at Beacon Quran Institute — monthly progress reports, safe one-to-one classes, and how to reach us any time.' },
  'female-teachers': { title: 'Female Quran Teachers | Qualified Female Tutors for Sisters & Girls — Beacon Quran Institute', description: 'Learn Quran online with a qualified female teacher: 1-on-1 online Quran classes for sisters and young girls — Tajweed, Hifz, Noorani Qaida. Ask us on WhatsApp or by email for a female teacher when you enrol.' },
  rules: { title: 'Class Rules | Make-Up Classes, Leave, Eid Holidays & Fees — Beacon Quran Institute', description: 'Class rules at Beacon Quran Institute in plain language: make-up classes, student leave, teacher unavailability, Eid holidays, fees and cancelling enrolment.' },
  faq: { title: 'Ask Beacon | Frequently Asked Questions — Beacon Quran Institute', description: 'Ask Beacon: frequently asked questions about online Quran classes — free trial, fees, teachers, make-up classes, holidays, refunds and certificates. Answers from Beacon\u2019s published pages.' },
  'quran-classes-in-houston': { title: 'Online Quran Classes in Houston | 1-on-1 Quran Lessons — Beacon Quran Institute', description: 'Learn Quran online in Houston with certified teachers. 1-on-1 online Quran classes for kids and adults on Central Time — Tajweed, Hifz and Noorani Qaida. Book a free trial class today.' },
  'quran-classes-in-new-york': { title: 'Online Quran Classes in New York | 1-on-1 Quran Lessons — Beacon Quran Institute', description: 'Learn Quran online in New York with certified teachers. 1-on-1 online Quran classes for kids and adults on Eastern Time — Tajweed, Hifz and Noorani Qaida. Book a free trial class today.' },
  'quran-classes-in-los-angeles': { title: 'Online Quran Classes in Los Angeles | 1-on-1 Quran Lessons — Beacon Quran Institute', description: 'Learn Quran online in Los Angeles with certified teachers. 1-on-1 online Quran classes for kids and adults on Pacific Time — Tajweed, Hifz and Noorani Qaida. Book a free trial class today.' },
  'quran-classes-in-dallas': { title: 'Online Quran Classes in Dallas | 1-on-1 Quran Lessons — Beacon Quran Institute', description: 'Learn Quran online in Dallas with certified teachers. 1-on-1 online Quran classes for kids and adults on Central Time — Tajweed, Hifz and Noorani Qaida. Book a free trial class today.' },
  'quran-classes-in-texas': { title: 'Online Quran Classes in Texas | 1-on-1 Quran Lessons — Beacon Quran Institute', description: 'Learn Quran online in Texas with certified teachers. 1-on-1 online Quran classes for kids and adults across Texas — Tajweed, Hifz and Noorani Qaida. Book a free trial class today.' },
  'quran-classes-in-california': { title: 'Online Quran Classes in California | 1-on-1 Quran Lessons — Beacon Quran Institute', description: 'Learn Quran online in California with certified teachers. 1-on-1 online Quran classes for kids and adults on Pacific Time — Tajweed, Hifz and Noorani Qaida. Book a free trial class today.' },
  'quran-classes-in-illinois': { title: 'Online Quran Classes in Illinois | 1-on-1 Quran Lessons — Beacon Quran Institute', description: 'Learn Quran online in Illinois with certified teachers. 1-on-1 online Quran classes for kids and adults on Central Time — Tajweed, Hifz and Noorani Qaida. Book a free trial class today.' },
  'quran-classes-in-michigan': { title: 'Online Quran Classes in Michigan | 1-on-1 Quran Lessons — Beacon Quran Institute', description: 'Learn Quran online in Michigan with certified teachers. 1-on-1 online Quran classes for kids and adults on Eastern Time — Tajweed, Hifz and Noorani Qaida. Book a free trial class today.' },
  'quran-classes-for-kids': { title: 'Online Quran Classes for Kids | 1-on-1 Quran Lessons for Children — Beacon Quran Institute', description: 'Online Quran classes for kids: live 1-on-1 Quran lessons for children from age 4 — Noorani Qaida, Tajweed and Hifz with certified teachers. Book a free trial class today.' },
  'quran-classes-for-beginners': { title: 'Online Quran Classes for Beginners | Learn to Read the Quran — Beacon Quran Institute', description: 'Online Quran classes for beginners: learn to read the Quran from the very first letter — Noorani Qaida, Tajweed and Hifz, 1-on-1 live online. Book a free trial class today.' },
  'quran-classes-for-adults': { title: 'Online Quran Classes for Adults | Learn Quran Online at Your Pace — Beacon Quran Institute', description: 'Online Quran classes for adults: live 1-on-1 Quran lessons around your work — Tajweed, Hifz and Tafseer with certified teachers. Book a free trial class today.' },
  'quran-classes-for-female': { title: 'Online Quran Classes for Sisters | Learn Quran with a Female Teacher — Beacon Quran Institute', description: 'Online Quran classes for sisters: learn Quran online 1-on-1 with a qualified female teacher — Tajweed, Hifz, Noorani Qaida. Request a female teacher when you enrol.' },
  'quran-classes-for-male': { title: 'Online Quran Classes for Brothers | Learn Quran with a Male Teacher — Beacon Quran Institute', description: 'Online Quran classes for brothers: learn Quran online 1-on-1 with a male teacher — Tajweed, Hifz, Noorani Qaida. Book a free trial class today.' },
  terms: { title: 'Terms of Service | Beacon Quran Institute', description: 'Terms of Service for Beacon Quran Institute online Quran classes.' },
  certificate: { title: 'Certificates | Beacon Quran Institute', description: 'On successful completion of a course, Beacon Quran Institute issues a formal Certificate of Appraisal. See which courses it applies to and how to verify a certificate.' },
  usa: { title: 'Online Quran Classes in the USA | 1-on-1 Quran Lessons — Beacon Quran Institute', description: 'Learn Quran online in the USA with certified teachers. 1-on-1 online Quran classes for kids and adults — Tajweed, Hifz and Noorani Qaida. Book a free trial class today.' },
  uk: { title: 'Online Quran Classes UK | One-to-One Quran Tutor — Beacon Quran Institute', description: 'Online Quran classes UK with DBS-checked Quran tutors. One-to-one Quran lessons for kids and adults — Tajweed, Hifz memorisation and Noorani Qaida. Book a free trial.' },
  canada: { title: 'Online Quran Classes in Canada | 1-on-1 Quran Classes — Beacon Quran Institute', description: 'Online Quran classes in Canada with certified teachers. 1-on-1 online Quran lessons for kids and adults in Toronto, Mississauga, Brampton and across Canada. Book a free trial.' },
};

// Real-path routing (Batch 12): every view lives at a real path (/about,
// /how-it-works, /enrol, …) so search engines can index each page
// separately — hash fragments are never indexed. Old #view links still
// work: locationState() falls back to the hash when the path is the root.
const VIEW_PATHS: Record<Exclude<ViewState, CountryKey>, string> = {
  home: '',
  about: 'about',
  courses: 'courses',
  services: 'services',
  blog: 'blog',
  testimonials: 'testimonials',
  contact: 'contact',
  terms: 'terms',
  certificate: 'certificate',
  'how-it-works': 'how-it-works',
  enrol: 'enrol',
  'quality-assurance': 'quality-assurance',
  'female-teachers': 'female-teachers',
  'quran-classes-in-houston': 'quran-classes-in-houston',
  'quran-classes-in-new-york': 'quran-classes-in-new-york',
  'quran-classes-in-los-angeles': 'quran-classes-in-los-angeles',
  'quran-classes-in-dallas': 'quran-classes-in-dallas',
  'quran-classes-in-texas': 'quran-classes-in-texas',
  'quran-classes-in-california': 'quran-classes-in-california',
  'quran-classes-in-illinois': 'quran-classes-in-illinois',
  'quran-classes-in-michigan': 'quran-classes-in-michigan',
  'quran-classes-for-kids': 'quran-classes-for-kids',
  'quran-classes-for-beginners': 'quran-classes-for-beginners',
  'quran-classes-for-adults': 'quran-classes-for-adults',
  'quran-classes-for-female': 'quran-classes-for-female',
  'quran-classes-for-male': 'quran-classes-for-male',
  rules: 'rules',
  parents: 'parents',
  faq: 'faq',
};
// Exported for the prerender entry (entry-server.tsx).
export { VIEW_PATHS };
const PATH_VIEWS: Record<string, ViewState> = Object.fromEntries(
  Object.entries(VIEW_PATHS).filter(([, path]) => path !== '').map(([view, path]) => [path, view as ViewState]),
);
const HASH_VIEWS: Record<string, ViewState> = { ...PATH_VIEWS };

// Country pages live at REAL paths (/usa, /uk, /canada) so search engines can
// index them as separate pages — hash fragments are never indexed. Hash
// routing still covers the classic views (#home, #courses, …).
const COUNTRY_PATHS: Record<CountryKey, string> = { usa: 'usa', uk: 'uk', canada: 'canada' };
const PATH_COUNTRIES: Record<string, CountryKey> = { usa: 'usa', uk: 'uk', canada: 'canada' };
const isCountryView = (view: ViewState): view is CountryKey => view === 'usa' || view === 'uk' || view === 'canada';

// Resolve a URL path to a view. Pure function of the path string so the
// prerender entry can render any route without a browser.
export function parsePath(pathname: string): { view: ViewState; courseSlug: string | null; postSlug: string | null } {
  const path = pathname.replace(/^\/+|\/+$/g, '');
  if (PATH_COUNTRIES[path]) return { view: PATH_COUNTRIES[path], courseSlug: null, postSlug: null };
  // Real course paths: /courses opens the courses view; /courses/<slug>
  // opens it with that course selected.
  if (path === 'courses') return { view: 'courses', courseSlug: null, postSlug: null };
  if (path.startsWith('courses/')) {
    const slug = decodeURIComponent(path.slice('courses/'.length).split('/')[0]);
    return { view: 'courses', courseSlug: slug || null, postSlug: null };
  }
  // Real blog paths: /blog opens the listing; /blog/<slug> opens that
  // post as a full article (same pattern as courses).
  if (path === 'blog') return { view: 'blog', courseSlug: null, postSlug: null };
  if (path.startsWith('blog/')) {
    const slug = decodeURIComponent(path.slice('blog/'.length).split('/')[0]);
    return { view: 'blog', courseSlug: null, postSlug: slug || null };
  }
  // Every other view lives at its own real path (/about, /enrol, …).
  if (PATH_VIEWS[path]) return { view: PATH_VIEWS[path], courseSlug: null, postSlug: null };
  return { view: 'home', courseSlug: null, postSlug: null };
}

function locationState(): { view: ViewState; courseSlug: string | null; postSlug: string | null } {
  if (typeof window === 'undefined') return { view: 'home', courseSlug: null, postSlug: null };
  const fromPath = parsePath(window.location.pathname);
  // Root path: legacy fallback — old #view links still resolve.
  if (window.location.pathname.replace(/^\/+|\/+$/g, '') === '') {
    return { view: HASH_VIEWS[window.location.hash.replace(/^#/, '')] ?? 'home', courseSlug: null, postSlug: null };
  }
  return fromPath;
}

function viewFromLocation(): ViewState {
  return locationState().view;
}

/** True for every path the app can render (used by the link interceptor). */
function isKnownPath(pathname: string): boolean {
  const path = pathname.replace(/^\/+|\/+$/g, '');
  if (path === '') return true;
  if (PATH_COUNTRIES[path] || PATH_VIEWS[path]) return true;
  if (path.startsWith('courses/')) {
    const slug = decodeURIComponent(path.slice('courses/'.length).split('/')[0]);
    return COURSES.some((c) => c.slug === slug);
  }
  if (path.startsWith('blog/')) {
    const slug = decodeURIComponent(path.slice('blog/'.length).split('/')[0]);
    return blogPosts.some((p) => p.slug === slug);
  }
  return false;
}

function applyViewMeta(view: ViewState): void {
  const meta = VIEW_META[view];
  if (!meta) return;
  document.title = meta.title;
  const desc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (desc) desc.setAttribute('content', meta.description);
}

export default function App({ initialPath }: { initialPath?: string } = {}) {
  const [view, setView] = useState<ViewState>(() =>
    initialPath !== undefined ? parsePath(initialPath).view : viewFromLocation(),
  );
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(() =>
    initialPath !== undefined ? parsePath(initialPath).courseSlug : locationState().courseSlug,
  );
  // Blog post slug from /blog/<slug> (same pattern as selectedCourseId).
  const [selectedPostSlug, setSelectedPostSlug] = useState<string | null>(() =>
    initialPath !== undefined ? parsePath(initialPath).postSlug : locationState().postSlug,
  );
  const [selectedSchedule, setSelectedSchedule] = useState<string | null>(null);
  // Chat assistant overlay (FAQ/chatbot batch): open from the floating
  // button, the header FAQ button, the mobile menu pill or the footer
  // link. The overlay is mounted once here so every page can open it.
  const [chatOpen, setChatOpen] = useState(false);
  // Visitor region + fee-table currency (geo auto-detect, Batch 3).
  // Default is USA/USD — the page always renders with this first; the
  // lookup only switches it afterwards, so a slow/failed lookup can never
  // delay or break the page. A manual header choice (stored) always wins
  // over auto-detect.
  const [region, setRegion] = useState<RegionKey>('usa');
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const viewRef = useRef(view);
  viewRef.current = view;
  // History (Batch 13): the view effect below must know WHY the view
  // changed, so Back/Forward can work.
  // - fromPopRef: set by the popstate/hashchange listener, and only when
  //   the view actually changes — the browser already moved the URL there,
  //   so the effect must not push a second entry; it only normalises a
  //   legacy hash URL to its real path, in place.
  // - mountedRef: the very first effect run is the initial load — a deep
  //   link or legacy hash is normalised in place, never pushed.
  const fromPopRef = useRef(false);
  const mountedRef = useRef(false);

  // Keep the URL in sync with the view, and always start a new view at
  // the top of the page (previously the old scroll position was kept, so
  // Services/Contact first landed at the footer). Country views live at
  // real paths (/usa …); every other view also lives at a real path
  // (/about, /how-it-works, /enrol, …) so a switch away from a country
  // page resets the path to that view's own path, never a hash.
  // Courses view: when a course is selected the URL is /courses/<slug>
  // (set here, so it never depends on the details page's own timer — both
  // write the same slug, so the two effects cannot fight each other);
  // with no course selected it is /courses.
  // Also updates the document title + meta description per view (SEO).
  // Entering a country page also resets the fee-table currency to that
  // country's currency. (The currency changes only here and via the header
  // region switcher — the fee table has no currency picker.)
  useEffect(() => {
    // Resolve the selected course (an id from the nav dropdown, or a slug
    // from a /courses/<slug> deep link) to its canonical slug. Unknown
    // values resolve to null so a bad id can never invent a URL.
    const selectedSlug =
      view === 'courses' && selectedCourseId
        ? COURSES.find((c) => c.id === selectedCourseId || c.slug === selectedCourseId)?.slug ?? null
        : null;
    // Resolve the selected blog post (a slug from a /blog/<slug> deep link
    // or a card click) to a real post. Unknown values resolve to null so a
    // bad slug can never invent a URL — the listing renders instead.
    const selectedPost =
      view === 'blog' && selectedPostSlug
        ? blogPosts.find((p) => p.slug === selectedPostSlug) ?? null
        : null;
    const onCoursesSlugPath =
      view === 'courses' && window.location.pathname.startsWith('/courses/');
    const url = isCountryView(view)
      ? `/${COUNTRY_PATHS[view]}`
      : view === 'courses' && selectedSlug
        ? `/courses/${selectedSlug}`
        : view === 'blog' && selectedPost
          ? `/blog/${selectedPost.slug}`
          : onCoursesSlugPath
            ? window.location.pathname
            : view === 'home'
              ? '/'
              : `/${VIEW_PATHS[view]}`;
    // History (Batch 13): every real navigation adds an entry, so the
    // phone Back button walks back through pages instead of closing the
    // site (the old code called replaceState on every view change, so the
    // session had only ONE entry and Back left the site). Only the
    // initial load and a Back/Forward step replace in place — the browser
    // already moved the URL there.
    const current = window.location.pathname + window.location.hash;
    if (current !== url) {
      if (fromPopRef.current || !mountedRef.current) {
        window.history.replaceState(null, '', url);
      } else {
        window.history.pushState(null, '', url);
      }
    }
    fromPopRef.current = false;
    mountedRef.current = true;
    applyViewMeta(view);
    // A blog post page carries the post's own title + description (same
    // values the prerender bakes into its served HTML).
    if (selectedPost) {
      document.title = `${selectedPost.titleEn} | Beacon Quran Institute`;
      const desc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (desc) desc.setAttribute('content', selectedPost.excerptEn);
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
    // Entering a country page resets the fee-table currency to that
    // country's currency; returning home restores the visitor's own
    // region currency.
    if (isCountryView(view)) setCurrency(REGION_CURRENCY[view]);
    else setCurrency(REGION_CURRENCY[region]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, selectedPostSlug]);

  // Apply a region: set the region + fee currency, and — for USA/UK/Canada —
  // open that country's page when the visitor is on the homepage. Runs only
  // on mount (first visit / stored choice), never on in-app navigation, so
  // clicking Home later stays on Home.
  const applyRegion = (next: RegionKey, navigateFromHome: boolean) => {
    setRegion(next);
    setCurrency(REGION_CURRENCY[next]);
    if (navigateFromHome && isPageRegion(next) && viewRef.current === 'home') {
      setView(next);
    }
  };

  // Geo auto-detect (first visit only). A stored manual choice wins and is
  // applied directly; otherwise the IP lookup runs in the background and the
  // page switches once it returns (or stays USA/USD if it fails/times out).
  // Search/AI crawlers are never redirected: they must see exactly the URL
  // they asked for (a bot that lands on / is shown /, not /usa) — otherwise
  // the homepage would barely be crawled as itself.
  useEffect(() => {
    if (isSearchCrawler()) return;
    const stored = loadStoredRegion();
    if (stored) {
      applyRegion(stored, true);
      return;
    }
    let cancelled = false;
    detectRegion().then((detected) => {
      if (!cancelled && detected) applyRegion(detected, true);
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Manual region choice from the header switcher: remembered, and it always
  // beats auto-detect. Page regions navigate to their country page; other
  // regions keep the current page and only switch the fee currency.
  const handleRegionChange = (next: RegionKey) => {
    saveRegion(next);
    setRegion(next);
    setCurrency(REGION_CURRENCY[next]);
    if (isPageRegion(next) && viewRef.current !== next) setView(next);
  };

  // Back/forward buttons and pasted deep links (#courses, #blog, /usa,
  // /courses/<slug>, …) switch views. Both popstate (path changes) and
  // hashchange fire.
  useEffect(() => {
    const onLocationChange = () => {
      const next = locationState();
      if (next.view !== viewRef.current) {
        // A popstate that only changes the course slug (Back/Forward
        // between two course pages) leaves the view alone — the flag
        // must not be set then, or it would survive to the next
        // programmatic navigation and turn its push into a replace.
        fromPopRef.current = true;
        setView(next.view);
      }
      // Always sync the course slug for the courses view — including
      // null, so Back from a course detail to the /courses hub clears
      // the selection instead of keeping the old detail on screen.
      if (next.view === 'courses') setSelectedCourseId(next.courseSlug);
      // Same for the blog: Back from a post to /blog clears the post.
      if (next.view === 'blog') setSelectedPostSlug(next.postSlug);
    };
    window.addEventListener('popstate', onLocationChange);
    window.addEventListener('hashchange', onLocationChange);
    return () => {
      window.removeEventListener('popstate', onLocationChange);
      window.removeEventListener('hashchange', onLocationChange);
    };
  }, []);

  // Client-side routing for real <a href> links (Batch 12, SEO research
  // §1.2: Google can only discover links that are <a> elements with an
  // href). A delegated click handler turns internal links (breadcrumbs,
  // course cards, footer, country cards, …) into SPA navigation — no full
  // reload — while the href still works as plain navigation without JS
  // (prerendered page) and for crawlers. Links whose own onClick calls
  // preventDefault() (nav dropdown, course tabs) are left alone.
  // Unknown paths are NOT intercepted: the browser loads them and the
  // server answers a real 404 instead of a soft-404 SPA shell.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as HTMLElement).closest?.('a[href]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute('href') ?? '';
      if (!href.startsWith('/') || anchor.target === '_blank' || anchor.hasAttribute('download')) return;
      let url: URL;
      try {
        url = new URL(href, window.location.origin);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      const parsed = parsePath(url.pathname);
      if (!isKnownPath(url.pathname)) return;
      e.preventDefault();
      if (parsed.view === 'courses') setSelectedCourseId(parsed.courseSlug);
      if (parsed.view === 'blog') setSelectedPostSlug(parsed.postSlug);
      setView(parsed.view);
      // In-article links carry a section hash (e.g. the cost post's
      // [fee table](/#fees)): navigate home, then scroll to the section
      // once the lazy homepage has mounted (scrollToId retries ~5s).
      if (url.hash) scrollToId(url.hash.slice(1));
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  // A fee-table row (or a country page's fee table) preselects a course +
  // schedule in the enrolment form, then opens the dedicated Enrol page.
  const handleSelectFee = (course: string, schedule: string) => {
    setSelectedCourse(course);
    setSelectedSchedule(schedule);
    setView('enrol');
  };

  const handleViewCourseDetails = (courseId: string) => {
    setSelectedCourseId(courseId);
    // A dropdown pick is not a slug deep link: drop any /courses/<slug>
    // path so the URL does not keep pointing at a different course.
    if (window.location.pathname.startsWith('/courses')) {
      window.history.replaceState(null, '', '/courses');
    }
    setView('courses');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRegisterFromDetails = (courseTitle?: string) => {
    if (courseTitle) setSelectedCourse(courseTitle);
    setView('enrol');
  };

  // A course card's Enrol button preselects the course and opens the
  // dedicated Enrol page (the homepage keeps its form section too).
  const handleEnrolCourse = (courseTitle: string) => {
    setSelectedCourse(courseTitle);
    setView('enrol');
  };

  // "View all courses" opens the /courses hub (listing), not the last
  // course detail visited — the selection must be cleared.
  const handleViewCoursesHub = () => {
    setSelectedCourseId(null);
    setView('courses');
  };

  // Audience location pages have no fee table of their own — their fee
  // link goes home and scrolls to the fee table.
  const handleViewFees = () => {
    setView('home');
    scrollToId('fees');
  };

  // Nav/footer navigation always opens a view's listing page: a stale
  // blog post slug must not survive the jump. (The desktop nav calls
  // preventDefault, so the link interceptor never sees those clicks —
  // Navbar.tsx:322 — and would otherwise reopen the last post when the
  // user taps "Blog".) The interceptor and popstate paths use the raw
  // setView and set the slug explicitly, so they are unaffected.
  const handleNavSetView = (next: ViewState) => {
    setSelectedPostSlug(null);
    setView(next);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#0B2E3A]">
      <Navbar setView={handleNavSetView} currentView={view} region={region} onRegionChange={handleRegionChange} onViewCourse={handleViewCourseDetails} onOpenChat={() => setChatOpen(true)} />

      {/* All page content is lazy — only loads what's needed.
          No loading screen: Suspense fallback is null by design
          (owner decision 2026-11-17 — no start loading animation). */}
      <Suspense fallback={null}>
        <main>
          {view === 'home' && (
            <>
              <Hero onViewCourses={handleViewCoursesHub} onEnrol={() => setView('enrol')} />
              <Courses
                onSelectCourse={handleEnrolCourse}
                onViewDetails={handleViewCourseDetails}
              />
              <HowItWorks />
              <WhyUs />
              <CalligraphyBand />
              <NearYou onEnrol={() => setView('enrol')} />
              <Testimonials setView={setView} />
              <Fees currency={currency} onSelectFee={handleSelectFee} onContactRegistrar={() => setView('enrol')} />
              <CountryLinks />
              <Registration 
                preSelectedCourse={selectedCourse} 
                preSelectedSchedule={selectedSchedule}
              />
            </>
          )}
          {view === 'contact'     && (
            <ContactPage 
              onBack={() => setView('home')} 
              onRegisterClick={() => handleRegisterFromDetails()}
            />
          )}
          {view === 'courses' && selectedCourseId && (
            <CourseDetailsPage
              key={selectedCourseId ?? 'courses'}
              onBack={() => setView('home')}
              selectedCourseId={selectedCourseId}
              onRegisterCourse={handleRegisterFromDetails}
            />
          )}
          {view === 'courses' && !selectedCourseId && (
            <CoursesHubPage
              onBack={() => setView('home')}
              onSelectCourse={handleEnrolCourse}
              onViewDetails={handleViewCourseDetails}
            />
          )}
          {view === 'testimonials' && <Testimonials full setView={setView} />}
          {view === 'blog'        && <Blog onBack={() => setView('home')} initialPostSlug={selectedPostSlug} />}
          {view === 'services'    && <CustomerServices onBack={() => setView('home')} />}
          {view === 'terms'       && <TermsOfService onBack={() => setView('home')} />}
          {view === 'certificate' && <CertificateOfAppraisal onBack={() => setView('home')} />}
          {view === 'about'       && <AboutPage onBack={() => setView('home')} />}
          {view === 'how-it-works' && (
            <HowItWorksPage onBack={() => setView('home')} onEnrol={() => setView('enrol')} />
          )}
          {view === 'quality-assurance' && <QualityAssurancePage onBack={() => setView('home')} />}
          {view === 'female-teachers' && <FemaleTeachersPage onBack={() => setView('home')} />}
          {view === 'rules' && <RulesPage onBack={() => setView('home')} />}
          {view === 'parents' && <ParentsPage onBack={() => setView('home')} />}
          {view === 'faq' && <FaqPage onBack={() => setView('home')} />}
          {view === 'quran-classes-in-houston' && <LocationPage slug="quran-classes-in-houston" onBack={() => setView('home')} onRegister={() => handleRegisterFromDetails()} onSelectFee={handleSelectFee} onViewFees={handleViewFees} currency={currency} />}
          {view === 'quran-classes-in-new-york' && <LocationPage slug="quran-classes-in-new-york" onBack={() => setView('home')} onRegister={() => handleRegisterFromDetails()} onSelectFee={handleSelectFee} onViewFees={handleViewFees} currency={currency} />}
          {view === 'quran-classes-in-los-angeles' && <LocationPage slug="quran-classes-in-los-angeles" onBack={() => setView('home')} onRegister={() => handleRegisterFromDetails()} onSelectFee={handleSelectFee} onViewFees={handleViewFees} currency={currency} />}
          {view === 'quran-classes-in-dallas' && <LocationPage slug="quran-classes-in-dallas" onBack={() => setView('home')} onRegister={() => handleRegisterFromDetails()} onSelectFee={handleSelectFee} onViewFees={handleViewFees} currency={currency} />}
          {view === 'quran-classes-in-texas' && <LocationPage slug="quran-classes-in-texas" onBack={() => setView('home')} onRegister={() => handleRegisterFromDetails()} onSelectFee={handleSelectFee} onViewFees={handleViewFees} currency={currency} />}
          {view === 'quran-classes-in-california' && <LocationPage slug="quran-classes-in-california" onBack={() => setView('home')} onRegister={() => handleRegisterFromDetails()} onSelectFee={handleSelectFee} onViewFees={handleViewFees} currency={currency} />}
          {view === 'quran-classes-in-illinois' && <LocationPage slug="quran-classes-in-illinois" onBack={() => setView('home')} onRegister={() => handleRegisterFromDetails()} onSelectFee={handleSelectFee} onViewFees={handleViewFees} currency={currency} />}
          {view === 'quran-classes-in-michigan' && <LocationPage slug="quran-classes-in-michigan" onBack={() => setView('home')} onRegister={() => handleRegisterFromDetails()} onSelectFee={handleSelectFee} onViewFees={handleViewFees} currency={currency} />}
          {view === 'quran-classes-for-kids' && <LocationPage slug="quran-classes-for-kids" onBack={() => setView('home')} onRegister={() => handleRegisterFromDetails()} onSelectFee={handleSelectFee} onViewFees={handleViewFees} currency={currency} />}
          {view === 'quran-classes-for-beginners' && <LocationPage slug="quran-classes-for-beginners" onBack={() => setView('home')} onRegister={() => handleRegisterFromDetails()} onSelectFee={handleSelectFee} onViewFees={handleViewFees} currency={currency} />}
          {view === 'quran-classes-for-adults' && <LocationPage slug="quran-classes-for-adults" onBack={() => setView('home')} onRegister={() => handleRegisterFromDetails()} onSelectFee={handleSelectFee} onViewFees={handleViewFees} currency={currency} />}
          {view === 'quran-classes-for-female' && <LocationPage slug="quran-classes-for-female" onBack={() => setView('home')} onRegister={() => handleRegisterFromDetails()} onSelectFee={handleSelectFee} onViewFees={handleViewFees} currency={currency} />}
          {view === 'quran-classes-for-male' && <LocationPage slug="quran-classes-for-male" onBack={() => setView('home')} onRegister={() => handleRegisterFromDetails()} onSelectFee={handleSelectFee} onViewFees={handleViewFees} currency={currency} />}
          {view === 'enrol' && (
            <EnrolPage
              onBack={() => setView('home')}
              preSelectedCourse={selectedCourse}
              preSelectedSchedule={selectedSchedule}
            />
          )}
          {isCountryView(view)    && (
            <CountryPage
              country={view}
              onBack={() => setView('home')}
              onRegister={() => handleRegisterFromDetails()}
              onSelectFee={handleSelectFee}
              onViewCourses={handleViewCoursesHub}
              currency={currency}
            />
          )}
        </main>
        <Footer setView={handleNavSetView} onOpenChat={() => setChatOpen(true)} />
      </Suspense>
      {/* Chat assistant: floating buttons on every page + the overlay panel.
          Mounted outside Suspense so they render immediately. */}
      <FloatingButtons chatOpen={chatOpen} onOpenChat={() => setChatOpen(true)} />
      <ChatOverlay open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}
