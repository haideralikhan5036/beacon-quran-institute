import { CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import Breadcrumbs from './Breadcrumbs';

export default function TermsOfService({ onBack }: { onBack: () => void }) {
  return (
    <div className="bg-[#FFFFFF] min-h-screen pt-32 pb-24 text-[#0B2E3A]">
      <div className="max-w-4xl mx-auto px-6">
        <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Terms of Service' }]} />
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#3D5563] hover:text-[#004050] mb-8 font-bold uppercase tracking-widest text-xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#004050]" />
          Back to Home
        </button>

        <div className="bg-[#FFFFFF] p-10 md:p-16 rounded-3xl border border-[#C9D9E8] shadow-[0_10px_30px_rgba(11,46,58,0.06)] text-[#0B2E3A]">
          <div className="mb-12">
            <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-[#7A7A50] mb-4">Legal Framework</h2>
            <h1 className="text-4xl font-bold font-display text-[#0B2E3A] mb-6">Terms of{' '}<span className="text-[#7A7A50] italic font-semibold">Service</span></h1>
            <p className="text-[#3D5563]">Last Updated: May 2024</p>
          </div>

          <div className="space-y-12 text-[#3D5563] leading-relaxed">
            <section>
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-[#004050]" />
                <h3 className="text-xl font-bold font-display text-[#0B2E3A] uppercase tracking-wider">1. Enrollment &amp; Registration</h3>
              </div>
              <p>
                Students can register for a free trial of 3 days. Upon completion of the trial, students who wish to continue must pay the monthly fee in advance. Registration is considered complete only after the first payment.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-[#004050]" />
                <h3 className="text-xl font-bold font-display text-[#0B2E3A] uppercase tracking-wider">2. Monthly Fees &amp; Payments</h3>
              </div>
              <p>
                Fees are charged on a monthly basis and must be paid by the 5th of each month. We reserve the right to pause classes if payment is delayed beyond the 10th. Prices may change with a 30-day notice.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-[#004050]" />
                <h3 className="text-xl font-bold font-display text-[#0B2E3A] uppercase tracking-wider">3. Attendance &amp; Makeup Classes</h3>
              </div>
              <p>
                Students are expected to be present at the scheduled time. If a student is late, the teacher will wait for 15 minutes. Makeup classes are only provided for absences notified at least 6 hours in advance. No makeup is provided for unannounced absences.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-[#004050]" />
                <h3 className="text-xl font-bold font-display text-[#0B2E3A] uppercase tracking-wider">4. Code of Conduct</h3>
              </div>
              <p>
                Both students and teachers are expected to maintain professional and respectful behavior. Any form of harassment or inappropriate talk will lead to immediate termination of the enrollment without a refund.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-[#004050]" />
                <h3 className="text-xl font-bold font-display text-[#0B2E3A] uppercase tracking-wider">5. Teacher Interaction</h3>
              </div>
              <p>
                All communications must happen through the institute's official channels. Students/Parents are strictly forbidden from sharing personal contact information (Phone, Email, Social Media) with teachers. All administrative issues must be reported to the management.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-[#004050]" />
                <h3 className="text-xl font-bold font-display text-[#0B2E3A] uppercase tracking-wider">6. Holidays</h3>
              </div>
              <p>
                Classes will be closed during the two Eids (Eid-ul-Fitr and Eid-ul-Adha) for a period of 3-5 days each. No makeup classes or fee adjustments are provided for these religious holidays as they are accounted for in the annual schedule.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-[#004050]" />
                <h3 className="text-xl font-bold font-display text-[#0B2E3A] uppercase tracking-wider">7. Recording &amp; Quality</h3>
              </div>
              <p>
                Classes may be recorded for quality assurance and teacher evaluation purposes. These recordings are strictly for internal use and will not be shared with any third party.
              </p>
            </section>
          </div>

          <div className="mt-16 pt-12 border-t border-[#D7E3EE] bg-[#F4F8FB] -mx-10 md:-mx-16 px-10 md:px-16 pb-10 md:pb-16 rounded-b-3xl">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-[#004050] shrink-0" />
              <div>
                <h4 className="font-bold font-display text-[#0B2E3A] mb-2">Acceptance of Terms</h4>
                <p className="text-sm text-[#3D5563]">
                  By registering for classes at Beacon Quran Institute, you agree to abide by the above terms and conditions. These terms may be updated periodically, and continued enrollment constitutes acceptance of the new terms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
