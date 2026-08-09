/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import DepthOfFieldBackground from './components/DepthOfFieldBackground';
import FloatingWhatsApp from './components/FloatingWhatsApp';

// ── Lazy load ALL below-fold sections for fast initial paint ─────────────────
const Hero              = lazy(() => import('./components/Hero'));
const Courses           = lazy(() => import('./components/Courses'));
const WhyUs             = lazy(() => import('./components/WhyUs'));
const Teachers          = lazy(() => import('./components/Teachers'));
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

export type ViewState = 'home' | 'blog' | 'services' | 'terms' | 'certificate' | 'testimonials' | 'courses';

// Lightweight spinner for lazy boundaries
const Spinner = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-accent/20 border-t-accent rounded-full animate-spin" />
  </div>
);

export default function App() {
  const [view, setView] = useState<ViewState>('home');
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleViewCourseDetails = (courseId: string) => {
    setSelectedCourseId(courseId);
    setView('courses');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRegisterFromDetails = (courseTitle: string) => {
    setSelectedCourse(courseTitle);
    setView('home');
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  return (
    <div className="min-h-screen font-sans text-amber-50 relative">
      {/* Background loads instantly — no lazy needed */}
      <DepthOfFieldBackground />
      <Navbar setView={setView} currentView={view} />

      {/* All page content is lazy — only loads what's needed */}
      <Suspense fallback={<Spinner />}>
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
        </main>
        <Footer setView={setView} />
        <TestimonialPopup />
      </Suspense>

      {/* WhatsApp button loads immediately */}
      <FloatingWhatsApp />
    </div>
  );
}
