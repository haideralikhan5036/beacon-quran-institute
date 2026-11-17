/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import DepthOfFieldBackground from './components/DepthOfFieldBackground';
import FloatingWhatsApp from './components/FloatingWhatsApp';

// ── Lazy load ALL below-fold sections for fast initial paint ─────────────────
const Hero              = lazy(() => import('./components/Hero'));
const Courses           = lazy(() => import('./components/Courses'));
const WhyUs             = lazy(() => import('./components/WhyUs'));
const Fees              = lazy(() => import('./components/Fees'));
const Testimonials      = lazy(() => import('./components/Testimonials'));
const TestimonialPopup  = lazy(() => import('./components/TestimonialPopup'));
const Registration      = lazy(() => import('./components/Registration'));
const Footer            = lazy(() => import('./components/Footer'));
const Blog              = lazy(() => import('./components/Blog'));
const CustomerServices  = lazy(() => import('./components/CustomerServices'));
const TermsOfService    = lazy(() => import('./components/TermsOfService'));
const CertificateOfAppraisal = lazy(() => import('./components/CertificateOfAppraisal'));
const CourseDetailsPage = lazy(() => import('./components/CourseDetailsPage'));
const ContactPage       = lazy(() => import('./components/ContactPage'));
const AboutPage         = lazy(() => import('./components/AboutPage'));
import { scrollToId } from './utils/scrollToId';

export type ViewState = 'home' | 'blog' | 'services' | 'terms' | 'certificate' | 'testimonials' | 'courses' | 'contact' | 'about';

// Hash routing: each view maps to a URL hash (#home, #courses, …) so pages are
// shareable and the browser back/forward buttons work. Unknown hash → home.
const VIEW_HASHES: Record<ViewState, string> = {
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

function viewFromHash(): ViewState {
  if (typeof window === 'undefined') return 'home';
  return HASH_VIEWS[window.location.hash.replace(/^#/, '')] ?? 'home';
}

export default function App() {
  const [view, setView] = useState<ViewState>(viewFromHash);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const viewRef = useRef(view);
  viewRef.current = view;

  // Keep the URL hash in sync with the view, and always start a new view at
  // the top of the page (previously the old scroll position was kept, so
  // Services/Contact first landed at the footer).
  useEffect(() => {
    const hash = `#${VIEW_HASHES[view]}`;
    if (window.location.hash !== hash) {
      window.history.replaceState(null, '', hash);
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [view]);

  // Back/forward buttons and pasted deep links (#courses, #blog, …) switch views.
  useEffect(() => {
    const onHashChange = () => {
      const next = viewFromHash();
      if (next !== viewRef.current) setView(next);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleViewCourseDetails = (courseId: string) => {
    setSelectedCourseId(courseId);
    setView('courses');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRegisterFromDetails = (courseTitle?: string) => {
    if (courseTitle) setSelectedCourse(courseTitle);
    setView('home');
    scrollToId('registration');
  };

  return (
    <div className="min-h-screen font-sans text-amber-50 relative">
      {/* Background loads instantly — no lazy needed */}
      <DepthOfFieldBackground />
      <Navbar setView={setView} currentView={view} />

      {/* All page content is lazy — only loads what's needed.
          No loading screen: Suspense fallback is null by design
          (owner decision 2026-11-17 — no start loading animation). */}
      <Suspense fallback={null}>
        <main>
          {view === 'home' && (
            <>
              <Hero />
              <Courses 
                onSelectCourse={setSelectedCourse} 
                onViewDetails={handleViewCourseDetails}
              />
              <WhyUs />
              <Testimonials setView={setView} />
              <Fees onSelectPlan={setSelectedPlan} />
              <Registration 
                preSelectedCourse={selectedCourse} 
                preSelectedPlan={selectedPlan}
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
        </main>
        <Footer setView={setView} />
        <TestimonialPopup />
      </Suspense>

      {/* WhatsApp button loads immediately */}
      <FloatingWhatsApp />
    </div>
  );
}
