/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';

// ── Lazy load ALL below-fold sections for fast initial paint ─────────────────
const Hero              = lazy(() => import('./components/Hero'));
const Courses           = lazy(() => import('./components/Courses'));
const HowItWorks        = lazy(() => import('./components/HowItWorks'));
const WhyUs             = lazy(() => import('./components/WhyUs'));
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
import type { CountryKey } from './components/CountryPage';
import { scrollToId } from './utils/scrollToId';
import type { CurrencyCode } from './data/feeTable';
import { COURSES } from './data/courses';
import {
  REGION_CURRENCY,
  detectRegion,
  isPageRegion,
  loadStoredRegion,
  saveRegion,
  type RegionKey,
} from './utils/geo';

export type ViewState = 'home' | 'blog' | 'services' | 'terms' | 'certificate' | 'testimonials' | 'courses' | 'contact' | 'about' | 'usa' | 'uk' | 'canada';

const HOME_TITLE = 'Online Quran Classes for Kids & Adults | Learn Quran Online with Tajweed — Beacon Quran Institute';
const HOME_DESCRIPTION = 'Online Quran academy — Quran classes near you: 1-on-1 online Quran classes for kids and adults in the USA, UK & Canada, taught live online from home. Tajweed, Hifz, Noorani Qaida. Book a free trial class today.';

// Per-view document title + meta description (SEO Batch 2). Country pages
// get their own geo-targeted title/description; other views get a
// keyword-flavoured variant of the homepage meta.
const VIEW_META: Record<ViewState, { title: string; description: string }> = {
  home: { title: HOME_TITLE, description: HOME_DESCRIPTION },
  about: { title: 'About Beacon Quran Institute — Online Quran Academy', description: 'Beacon Quran Institute is an online Quran academy teaching students in 30+ countries since 2015. Learn Quran online with certified male and female teachers.' },
  courses: { title: 'Online Quran Courses | Noorani Qaida, Tajweed, Hifz & Tafseer — Beacon Quran Institute', description: 'Online Quran courses: Noorani Qaida, Quran Reading, Hifz memorization, Tajweed, Tafseer and Arabic — 1-on-1 online Quran classes for kids and adults.' },
  services: { title: 'Online Quran Services | 1-on-1 Quran Classes & Free Trial — Beacon Quran Institute', description: 'Online Quran services: 1-on-1 Quran classes for kids and adults, Tajweed, Hifz and Noorani Qaida with certified teachers. Book a free trial class.' },
  blog: { title: 'Quran Learning Blog | Online Quran Classes & Tajweed — Beacon Quran Institute', description: 'Read the Beacon Quran Institute blog: online Quran classes, Tajweed, Hifz memorization and Noorani Qaida for kids and adults.' },
  testimonials: { title: 'Student Reviews | Online Quran Classes — Beacon Quran Institute', description: 'What families say about Beacon Quran Institute: 1-on-1 online Quran classes for kids and adults in the USA, UK and Canada.' },
  contact: { title: 'Contact Beacon Quran Institute | Online Quran Classes — Beacon Quran Institute', description: 'Contact Beacon Quran Institute about online Quran classes for kids and adults in the USA, UK and Canada. Book a free trial class today.' },
  terms: { title: 'Terms of Service | Beacon Quran Institute', description: 'Terms of Service for Beacon Quran Institute online Quran classes.' },
  certificate: { title: 'Certificate Verification | Beacon Quran Institute', description: 'Verify a Beacon Quran Institute certificate of appraisal for online Quran classes.' },
  usa: { title: 'Online Quran Classes in the USA | 1-on-1 Quran Lessons — Beacon Quran Institute', description: 'Learn Quran online in the USA with certified teachers. 1-on-1 online Quran classes for kids and adults — Tajweed, Hifz and Noorani Qaida. Book a free trial class today.' },
  uk: { title: 'Online Quran Classes UK | One-to-One Quran Tutor — Beacon Quran Institute', description: 'Online Quran classes UK with DBS-checked Quran tutors. One-to-one Quran lessons for kids and adults — Tajweed, Hifz memorisation and Noorani Qaida. Book a free trial.' },
  canada: { title: 'Online Quran Classes in Canada | 1-on-1 Quran Classes — Beacon Quran Institute', description: 'Online Quran classes in Canada with certified teachers. 1-on-1 online Quran lessons for kids and adults in Toronto, Mississauga, Brampton and across Canada. Book a free trial.' },
};

// Hash routing: each view maps to a URL hash (#home, #courses, …) so pages are
// shareable and the browser back/forward buttons work. Unknown hash → home.
const VIEW_HASHES: Record<Exclude<ViewState, CountryKey>, string> = {
  home: 'home',
  about: 'about',
  courses: 'courses',
  services: 'services',
  blog: 'blog',
  testimonials: 'testimonials',
  contact: 'contact',
  terms: 'terms',
  certificate: 'certificate',
};
const HASH_VIEWS: Record<string, ViewState> = Object.fromEntries(
  Object.entries(VIEW_HASHES).map(([view, hash]) => [hash, view as ViewState]),
);

// Country pages live at REAL paths (/usa, /uk, /canada) so search engines can
// index them as separate pages — hash fragments are never indexed. Hash
// routing still covers the classic views (#home, #courses, …).
const COUNTRY_PATHS: Record<CountryKey, string> = { usa: 'usa', uk: 'uk', canada: 'canada' };
const PATH_COUNTRIES: Record<string, CountryKey> = { usa: 'usa', uk: 'uk', canada: 'canada' };
const isCountryView = (view: ViewState): view is CountryKey => view === 'usa' || view === 'uk' || view === 'canada';

function locationState(): { view: ViewState; courseSlug: string | null } {
  if (typeof window === 'undefined') return { view: 'home', courseSlug: null };
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
  if (PATH_COUNTRIES[path]) return { view: PATH_COUNTRIES[path], courseSlug: null };
  // Real course paths: /courses opens the courses view; /courses/<slug>
  // opens it with that course selected.
  if (path === 'courses') return { view: 'courses', courseSlug: null };
  if (path.startsWith('courses/')) {
    const slug = decodeURIComponent(path.slice('courses/'.length).split('/')[0]);
    return { view: 'courses', courseSlug: slug || null };
  }
  return { view: HASH_VIEWS[window.location.hash.replace(/^#/, '')] ?? 'home', courseSlug: null };
}

function viewFromLocation(): ViewState {
  return locationState().view;
}

function applyViewMeta(view: ViewState): void {
  const meta = VIEW_META[view];
  if (!meta) return;
  document.title = meta.title;
  const desc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (desc) desc.setAttribute('content', meta.description);
}

export default function App() {
  const [view, setView] = useState<ViewState>(viewFromLocation);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(() => locationState().courseSlug);
  const [selectedSchedule, setSelectedSchedule] = useState<string | null>(null);
  // Visitor region + fee-table currency (geo auto-detect, Batch 3).
  // Default is USA/USD — the page always renders with this first; the
  // lookup only switches it afterwards, so a slow/failed lookup can never
  // delay or break the page. A manual header choice (stored) always wins
  // over auto-detect.
  const [region, setRegion] = useState<RegionKey>('usa');
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const viewRef = useRef(view);
  viewRef.current = view;

  // Keep the URL in sync with the view, and always start a new view at
  // the top of the page (previously the old scroll position was kept, so
  // Services/Contact first landed at the footer). Country views live at
  // real paths (/usa …) with no hash; classic views live at /#view so a
  // switch away from a country page resets the path to the root.
  // Courses view: when a course is selected the URL is /courses/<slug>
  // (set here, so it never depends on the details page's own timer — both
  // write the same slug, so the two effects cannot fight each other);
  // with no course selected it is /#courses.
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
    const onCoursesSlugPath =
      view === 'courses' && window.location.pathname.startsWith('/courses/');
    const url = isCountryView(view)
      ? `/${COUNTRY_PATHS[view]}`
      : view === 'courses' && selectedSlug
        ? `/courses/${selectedSlug}`
        : onCoursesSlugPath
          ? window.location.pathname
          : `/#${VIEW_HASHES[view]}`;
    if (window.location.pathname + window.location.hash !== url) {
      window.history.replaceState(null, '', url);
    }
    applyViewMeta(view);
    window.scrollTo({ top: 0, behavior: 'auto' });
    // Entering a country page resets the fee-table currency to that
    // country's currency; returning home restores the visitor's own
    // region currency.
    if (isCountryView(view)) setCurrency(REGION_CURRENCY[view]);
    else setCurrency(REGION_CURRENCY[region]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);

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
  useEffect(() => {
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
      if (next.view !== viewRef.current) setView(next.view);
      if (next.courseSlug) setSelectedCourseId(next.courseSlug);
    };
    window.addEventListener('popstate', onLocationChange);
    window.addEventListener('hashchange', onLocationChange);
    return () => {
      window.removeEventListener('popstate', onLocationChange);
      window.removeEventListener('hashchange', onLocationChange);
    };
  }, []);

  // A fee-table row (or a country page's fee table) preselects a course +
  // schedule in the enrolment form, then scrolls to it.
  const handleSelectFee = (course: string, schedule: string) => {
    setSelectedCourse(course);
    setSelectedSchedule(schedule);
    setView('home');
    scrollToId('registration');
  };

  const handleViewCourseDetails = (courseId: string) => {
    setSelectedCourseId(courseId);
    // A dropdown pick is not a slug deep link: drop any /courses/<slug>
    // path so the URL does not keep pointing at a different course.
    if (window.location.pathname.startsWith('/courses')) {
      window.history.replaceState(null, '', '/#courses');
    }
    setView('courses');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRegisterFromDetails = (courseTitle?: string) => {
    if (courseTitle) setSelectedCourse(courseTitle);
    setView('home');
    scrollToId('registration');
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#0B2E3A]">
      <Navbar setView={setView} currentView={view} region={region} onRegionChange={handleRegionChange} onViewCourse={handleViewCourseDetails} />

      {/* All page content is lazy — only loads what's needed.
          No loading screen: Suspense fallback is null by design
          (owner decision 2026-11-17 — no start loading animation). */}
      <Suspense fallback={null}>
        <main>
          {view === 'home' && (
            <>
              <Hero onViewCourses={() => setView('courses')} />
              <Courses 
                onSelectCourse={setSelectedCourse} 
                onViewDetails={handleViewCourseDetails}
              />
              <HowItWorks />
              <WhyUs />
              <NearYou />
              <Testimonials setView={setView} />
              <Fees currency={currency} onSelectFee={handleSelectFee} onContactRegistrar={() => scrollToId('registration')} />
              <CountryLinks setView={setView} />
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
          {view === 'courses'     && (
            <CourseDetailsPage 
              key={selectedCourseId ?? 'courses'}
              onBack={() => setView('home')} 
              selectedCourseId={selectedCourseId}
              onRegisterCourse={handleRegisterFromDetails}
            />
          )}
          {view === 'testimonials' && <Testimonials full setView={setView} />}
          {view === 'blog'        && <Blog onBack={() => setView('home')} />}
          {view === 'services'    && <CustomerServices onBack={() => setView('home')} />}
          {view === 'terms'       && <TermsOfService onBack={() => setView('home')} />}
          {view === 'certificate' && <CertificateOfAppraisal onBack={() => setView('home')} />}
          {view === 'about'       && <AboutPage onBack={() => setView('home')} />}
          {isCountryView(view)    && (
            <CountryPage
              country={view}
              onBack={() => setView('home')}
              onRegister={() => handleRegisterFromDetails()}
              onSelectFee={handleSelectFee}
              onViewCourses={() => setView('courses')}
              currency={currency}
            />
          )}
        </main>
        <Footer setView={setView} />
      </Suspense>
    </div>
  );
}
