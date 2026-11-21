import { motion } from 'motion/react';
import {
  MessageCircle, Mail, Facebook, Instagram, Linkedin,
  ArrowLeft, ArrowRight, Sparkles, Clock, Globe, ShieldCheck, Phone
} from 'lucide-react';
import Breadcrumbs from './Breadcrumbs';

export default function ContactPage({ onBack, onRegisterClick }: { onBack: () => void; onRegisterClick?: () => void }) {
  const contactChannels = [
    {
      id: 'whatsapp',
      title: 'WhatsApp Official Chat',
      subtitle: 'Instant response from our Student Registrar',
      displayValue: '+92 346 1573771',
      actionText: 'Chat on WhatsApp',
      link: 'https://wa.me/923461573771',
      icon: MessageCircle,
      badgeColor: 'bg-[#EAF1F7] text-[#004050] border-[#C9D9E8]',
      btnColor: 'bg-[#7A7A50] hover:bg-[#004050] text-white',
      highlight: 'Available for instant admission & fee inquiries'
    },
    {
      id: 'email',
      title: 'Official Email Inquiries',
      subtitle: 'Send formal inquiries, certificates & documents',
      displayValue: 'beaconquraninstitute@gmail.com',
      actionText: 'Send Email',
      link: 'mailto:beaconquraninstitute@gmail.com',
      icon: Mail,
      badgeColor: 'bg-[#EAF1F7] text-[#004050] border-[#C9D9E8]',
      btnColor: 'bg-[#7A7A50] hover:bg-[#004050] text-white',
      highlight: 'We reply to every message as soon as we can'
    },
    {
      id: 'facebook',
      title: 'Facebook Official Page',
      subtitle: 'Join our global community & live announcements',
      displayValue: 'Beacon Quran Institute',
      actionText: 'Visit Facebook Page',
      link: 'https://facebook.com/beaconquraninstitute',
      icon: Facebook,
      badgeColor: 'bg-[#EAF1F7] text-[#004050] border-[#C9D9E8]',
      btnColor: 'bg-[#7A7A50] hover:bg-[#004050] text-white',
      highlight: 'Daily Quranic benefits, videos & student milestones'
    },
    {
      id: 'instagram',
      title: 'Instagram Visual Highlights',
      subtitle: 'Student achievements, recitations & daily quotes',
      displayValue: '@beaconquraninstitute',
      actionText: 'Follow on Instagram',
      link: 'https://instagram.com/beaconquraninstitute',
      icon: Instagram,
      badgeColor: 'bg-[#EAF1F7] text-[#004050] border-[#C9D9E8]',
      btnColor: 'bg-[#7A7A50] hover:bg-[#004050] text-white',
      highlight: 'Beautiful Quranic reels, Tajweed tips & updates'
    },
    {
      id: 'linkedin',
      title: 'LinkedIn Professional Network',
      subtitle: 'Academic credentials, faculty & institutional updates',
      displayValue: 'Beacon Quran Institute',
      actionText: 'Connect on LinkedIn',
      link: 'https://linkedin.com/company/beaconquraninstitute',
      icon: Linkedin,
      badgeColor: 'bg-[#EAF1F7] text-[#004050] border-[#C9D9E8]',
      btnColor: 'bg-[#7A7A50] hover:bg-[#004050] text-white',
      highlight: 'Institutional news, faculty network & pedagogical research'
    }
  ];

  return (
    <div className="bg-[#FFFFFF] min-h-screen pt-28 pb-24 text-[#0B2E3A]">
      <div className="max-w-[1280px] mx-auto px-6">
        <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Contact' }]} />

        {/* Back Button Navigation */}
        <div className="mb-10">
          <button
            onClick={onBack}
            className="group flex items-center gap-3 text-[#3D5563] hover:text-[#004050] font-bold uppercase tracking-[0.3em] text-[10px] transition-all cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full border border-[#C9D9E8] bg-[#EAF1F7] flex items-center justify-center group-hover:bg-[#004050] transition-all">
              <ArrowLeft className="w-3.5 h-3.5 text-[#004050] group-hover:text-white" />
            </div>
            Back to Home
          </button>
        </div>

        {/* Header Title Card Box */}
        <div className="bg-[#FFFFFF] border border-[#C9D9E8] p-8 sm:p-12 rounded-3xl shadow-[0_10px_30px_rgba(11,46,58,0.06)] text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAF1F7] border border-[#C9D9E8] mb-4">
            <Sparkles className="w-4 h-4 text-[#7A7A50]" />
            <h2 className="font-display text-[10px] font-extrabold uppercase tracking-[0.4em] text-[#004050]">
              Official Contact &amp; Support Channels
            </h2>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-[#0B2E3A] mb-4 text-balance">
            Get in Touch With Us
          </h1>
          <p className="text-[#3D5563] text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            We are always available to serve you. Reach out through your preferred official channel for instant support &amp; registration.
          </p>
        </div>

        {/* 5 Premium Contact Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {contactChannels.map((channel, index) => {
            const IconComponent = channel.icon;
            return (
              <motion.div
                key={channel.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ scale: 1.02, y: -4, zIndex: 30 }}
                className="bg-[#FFFFFF] border border-[#C9D9E8] hover:border-[#004050]/40 text-[#0B2E3A] rounded-3xl p-8 sm:p-9 shadow-[0_10px_30px_rgba(11,46,58,0.05)] flex flex-col justify-between transition-all duration-300 text-left group"
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-sm ${channel.badgeColor}`}>
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <span className="font-display text-[9px] font-extrabold uppercase tracking-widest text-[#7A7A50] bg-[#F4F8FB] px-3 py-1 rounded-full border border-[#C9D9E8]">
                      Official
                    </span>
                  </div>

                  {/* Channel Title & Subtitle */}
                  <h3 className="text-2xl font-bold font-display text-[#0B2E3A] mb-2 tracking-tight group-hover:text-[#004050] transition-colors">
                    {channel.title}
                  </h3>
                  <p className="text-[#3D5563] text-xs sm:text-sm font-medium mb-4 leading-relaxed">
                    {channel.subtitle}
                  </p>

                  {/* Handle / Address */}
                  <div className="bg-[#F4F8FB] border border-[#C9D9E8] p-3.5 rounded-xl mb-4 text-[#004050] font-mono font-bold text-xs sm:text-sm break-all">
                    {channel.displayValue}
                  </div>

                  {/* Highlight note */}
                  <p className="text-[11px] text-[#3D5563] italic font-medium leading-tight mb-6">
                    {channel.highlight}
                  </p>
                </div>

                {/* Direct Action Backlink Button */}
                <a
                  href={channel.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-4 px-6 rounded-xl font-bold uppercase tracking-wider text-xs transition-all shadow-lg flex items-center justify-center gap-2 group/btn cursor-pointer ${channel.btnColor}`}
                >
                  <span>{channel.actionText}</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            );
          })}

          {/* 6th Card: Direct Admissions Office Badge */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#FFFFFF] border border-[#C9D9E8] text-[#0B2E3A] rounded-3xl p-8 sm:p-9 shadow-[0_10px_30px_rgba(11,46,58,0.05)] flex flex-col justify-between text-left"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#F4F8FB] text-[#004050] border border-[#C9D9E8] flex items-center justify-center shadow-sm">
                  <Clock className="w-7 h-7" />
                </div>
                <span className="font-display text-[9px] font-extrabold uppercase tracking-widest text-[#7A7A50] bg-[#F4F8FB] px-3 py-1 rounded-full border border-[#C9D9E8]">
                  Global Hours
                </span>
              </div>

              <h3 className="text-2xl font-bold font-display text-[#0B2E3A] mb-2 tracking-tight">
                Admissions &amp; Support Hours
              </h3>
              <p className="text-[#3D5563] text-xs sm:text-sm font-medium mb-4 leading-relaxed">
                Serving students across USA, UK, Europe, Gulf &amp; Asia.
              </p>

              <div className="space-y-2 mb-6 text-xs text-[#3D5563] font-medium">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#7A7A50] shrink-0" />
                  <span>Continuous Academic Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#7A7A50] shrink-0" />
                  <span>Arabic, English &amp; Urdu Speaking Faculty</span>
                </div>
              </div>
            </div>

            <button
              onClick={onRegisterClick}
              className="w-full py-4 px-6 rounded-xl bg-[#004050] hover:bg-[#7A7A50] text-white font-bold uppercase tracking-wider text-xs transition-all shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Go to Registration Form</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Interactive Direct Message Banner */}
        <div className="mt-20">
          <div className="bg-[#FFFFFF] border border-[#C9D9E8] p-10 sm:p-16 rounded-3xl shadow-[0_10px_30px_rgba(11,46,58,0.06)] relative overflow-hidden text-[#0B2E3A] text-center max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#0B2E3A] mb-3">
              Ready for a 3-Day Free Trial Session?
            </h2>
            <p className="text-[#3D5563] text-sm sm:text-base font-medium max-w-xl mx-auto mb-8 leading-relaxed">
              Select your preferred course and register in under a minute for a risk-free 3-day trial session with certified tutors.
            </p>
            <button
              onClick={onRegisterClick}
              className="px-10 py-5 rounded-full bg-[#7A7A50] text-white font-bold uppercase tracking-[0.2em] text-xs hover:bg-[#004050] transition-all shadow-lg inline-flex items-center gap-3 cursor-pointer"
            >
              <span>Register for Free 3-Day Trial</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
