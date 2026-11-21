import { motion } from 'motion/react';
import { ShieldCheck, Calendar, Clock, RefreshCw, Star, ArrowLeft, User, Sparkles, Phone, Mail } from 'lucide-react';
import Breadcrumbs from './Breadcrumbs';

export default function CustomerServices({ onBack }: { onBack: () => void }) {
  const services = [
    {
      num: '01',
      title: '3 Days Free Trial',
      desc: 'Try any of our courses for 3 days without any cost. Evaluate our teachers and teaching methodology risk-free.',
      icon: Star,
    },
    {
      num: '02',
      title: '1-on-1 Online Classes',
      desc: 'Personalized individual attention ensures rapid progress. Tutors focus solely on one student during the entire session.',
      icon: User,
    },
    {
      num: '03',
      title: 'Makeup Classes',
      desc: 'If you miss a class with prior notice, we provide complimentary makeup sessions so you never lose your progress.',
      icon: Calendar,
    },
    {
      num: '04',
      title: '100% Refund Guarantee',
      desc: 'Your satisfaction is our sacred trust. Request a hassle-free refund for remaining unused sessions if not satisfied.',
      icon: RefreshCw,
    },
    {
      num: '05',
      title: 'Teacher Assignment Choice',
      desc: 'You have full freedom to request a change of tutor anytime if their style does not align with your preferences.',
      icon: ShieldCheck,
    },
    {
      num: '06',
      title: 'Flexible Scheduling',
      desc: 'Classes offered across all timezones. Select a time slot that seamlessly fits your lifestyle.',
      icon: Clock,
    }
  ];

  return (
    <div className="bg-[#FFFFFF] min-h-screen pt-28 pb-24 text-[#0B2E3A]">
      <div className="max-w-[1280px] mx-auto px-6">
        <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Services' }]} />

        {/* Back Button & Header Box */}
        <div className="mb-16">
          <button
            onClick={onBack}
            className="group flex items-center gap-3 text-[#3D5563] hover:text-[#004050] mb-8 font-bold uppercase tracking-[0.3em] text-[10px] transition-all cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full border border-[#C9D9E8] bg-[#EAF1F7] flex items-center justify-center group-hover:bg-[#004050] transition-all">
              <ArrowLeft className="w-3.5 h-3.5 text-[#004050] group-hover:text-white" />
            </div>
            Back to Home
          </button>

          {/* Header Card */}
          <div className="bg-[#FFFFFF] border border-[#C9D9E8] p-8 sm:p-12 rounded-3xl shadow-[0_10px_30px_rgba(11,46,58,0.06)] text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAF1F7] border border-[#C9D9E8] mb-4">
              <Sparkles className="w-4 h-4 text-[#7A7A50]" />
              <h2 className="font-display text-[10px] font-extrabold uppercase tracking-[0.4em] text-[#004050]">
                Student Concierge &amp; Support
              </h2>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-[#0B2E3A] mb-4 text-balance">
              Dedicated Student Services
            </h1>
            <p className="text-[#3D5563] text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
              We do not just provide classes. We manage your entire Quranic journey with authentic care and dedicated support.
            </p>
          </div>
        </div>

        {/* Service Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.num}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ scale: 1.02, zIndex: 30 }}
                className="relative bg-[#FFFFFF] border border-[#C9D9E8] text-[#0B2E3A] rounded-3xl p-8 sm:p-9 shadow-[0_10px_30px_rgba(11,46,58,0.05)] transition-all duration-300 group hover:border-[#004050]/40 hover:shadow-[0_16px_40px_rgba(11,46,58,0.08)] text-left"
              >
                {/* Card Number Badge & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-black font-display text-[#7A7A50] tracking-wider">
                    {service.num}
                  </span>
                  <div className="w-12 h-12 bg-[#EAF1F7] border border-[#C9D9E8] rounded-2xl flex items-center justify-center group-hover:bg-[#004050] transition-all duration-300">
                    <Icon className="w-6 h-6 text-[#004050] group-hover:text-white transition-colors" />
                  </div>
                </div>

                {/* Service Title */}
                <h3 className="text-2xl font-bold font-display text-[#0B2E3A] mb-3 tracking-tight group-hover:text-[#004050] transition-colors">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="text-[#3D5563] text-sm sm:text-base leading-relaxed font-medium">
                  {service.desc}
                </p>

                {/* Card Footer Line Ornament */}
                <div className="mt-6 pt-4 border-t border-[#D7E3EE] flex items-center gap-3">
                  <span className="font-display text-[8.5px] font-bold uppercase tracking-widest text-[#7A7A50]">
                    Verified Standard
                  </span>
                  <div className="h-px flex-grow bg-[#D7E3EE]"></div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Support CTA Banner */}
        <div className="mt-20">
          <div className="bg-[#FFFFFF] border border-[#C9D9E8] p-10 sm:p-16 rounded-3xl shadow-[0_10px_30px_rgba(11,46,58,0.06)] relative overflow-hidden text-[#0B2E3A]">

            <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#0B2E3A] mb-4">
                  Need Instant Support?
                </h2>
                <p className="text-[#3D5563] text-base sm:text-lg leading-relaxed font-medium mb-8">
                  Our academic support specialists are available to assist with class scheduling, course selection, and registration inquiries.
                </p>
                <div className="flex flex-wrap gap-4 items-center">
                  <a
                    href="https://wa.me/923461573771"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#7A7A50] text-white px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-xs shadow-lg hover:bg-[#004050] transition-all flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-white" />
                    WhatsApp Registrar
                  </a>
                  <a
                    href="mailto:beaconquraninstitute@gmail.com"
                    className="px-6 py-4 rounded-xl bg-[#FFFFFF] border border-[#C9D9E8] hover:bg-[#EAF1F7] text-[#004050] font-bold text-xs tracking-wider uppercase transition-all flex items-center gap-2 whitespace-nowrap"
                  >
                    <Mail className="w-4 h-4 text-[#004050]" />
                    beaconquraninstitute@gmail.com
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#F4F8FB] p-6 rounded-2xl border border-[#C9D9E8] text-center">
                  <span className="block text-[#004050] font-black font-display text-3xl mb-1">30+</span>
                  <span className="text-[#3D5563] text-[10px] uppercase tracking-widest font-bold">
                    Countries
                  </span>
                </div>
                <div className="bg-[#F4F8FB] p-6 rounded-2xl border border-[#C9D9E8] text-center">
                  <span className="block text-[#004050] font-black font-display text-3xl mb-1">1,400+</span>
                  <span className="text-[#3D5563] text-[10px] uppercase tracking-widest font-bold">
                    Active Students
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
