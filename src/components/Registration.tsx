import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Mail, MessageSquare, Phone, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { Reveal } from './ui/Reveal';

interface FormData {
  name: string;
  phone: string;
  email: string;
  course: string;
  schedule: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
}

interface RegistrationProps {
  preSelectedCourse?: string | null;
  preSelectedSchedule?: string | null;
}

export default function Registration({ preSelectedCourse, preSelectedSchedule }: RegistrationProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    course: 'Noorani Qaida',
    schedule: '3 Days per Week',
    message: ''
  });

  React.useEffect(() => {
    if (preSelectedCourse) {
      setFormData(prev => ({ ...prev, course: preSelectedCourse }));
    }
  }, [preSelectedCourse]);

  React.useEffect(() => {
    if (preSelectedSchedule) {
      setFormData(prev => ({ ...prev, schedule: preSelectedSchedule }));
    }
  }, [preSelectedSchedule]);

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    // Construct WhatsApp message
    const message = `*New Registration Request*\n---\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Email:* ${formData.email}\n*Course:* ${formData.course}\n*Schedule:* ${formData.schedule}\n*Message:* ${formData.message || 'N/A'}`;
    const waUrl = `https://wa.me/923461573771?text=${encodeURIComponent(message)}`;

    setTimeout(() => {
      window.open(waUrl, '_blank');
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        course: 'Noorani Qaida',
        schedule: '3 Days per Week',
        message: ''
      });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  // Translations
  const badgeText = "Enrollment";
  const titleText1 = "Begin Your";
  const titleText2 = "Divine";
  const titleText3 = "Journey";
  const descText = "Book a free trial class and experience the precision of Tajweed and the beauty of recitation with a professional evaluation session. No commitment required.";

  const whatsappLabel = "WhatsApp Registrar";
  const registryLabel = "Official Registry";
  const subFooterLabel = "Global Academic Standard • Authenticated Ijazah Pathways";

  const successTitleText = "Inquiry Dispatched";
  const successDescText = "Your application for the evaluation session has been securely received. Our academic advisor will connect via WhatsApp shortly.";
  const closeBtnText = "Close Portal";

  const labelName = "Applicant Name";
  const placeholderName = "e.g. Abdullah Ahmed";

  const labelPhone = "WhatsApp Liaison";
  const placeholderPhone = "Include country code";

  const labelEmail = "Email Correspondence";
  const placeholderEmail = "you@domain.com";

  const labelCourse = "Learning Track";
  const labelPlan = "Session Frequency";

  const labelNotes = "Aspirations & Notes";
  const placeholderNotes = "Detail any specific goals or legacy requirements...";

  const submitBtnTextText = "SUBMIT";
  const submittingBtnText = "Submitting...";

  const bottomSecurityLabel = "Encrypted Session Initialization";

  // Course list: the five Beacon courses first. The three fee-sheet group
  // names follow — the fee table preselects those exact names, so they must
  // exist as options or a fee-table selection would show a blank select.
  const coursesList = [
    'Noorani Qaida',
    'Recitation & Tajweed',
    'Hifz Program',
    'Tafseer-ul-Quran',
    'Islamic Studies',
    'Qaida, Quran Recitation & Islamic Studies',
    'Hifz e Quran',
    'Quran Tafseer',
  ];

  // Schedules from the owner's fee sheet — the old Starter/Popular/Premium
  // plan options contradicted the sheet and are gone.
  const schedulesList = ['Weekend / 2 Days per Week', '3 Days per Week', '5 Days per Week'];

  return (
    <section id="registration" className="py-10 sm:py-16 bg-[#FFFFFF] relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <div className="bg-[#FFFFFF] rounded-3xl border border-[#C9D9E8] shadow-[0_16px_40px_rgba(11,46,58,0.08)] overflow-hidden grid lg:grid-cols-12 text-[#0B2E3A] relative">
          {/* Halftone dots, mockup form-card placement: top-right */}
          <div
            aria-hidden="true"
            className="dots-texture pointer-events-none absolute right-[-10px] top-[-8px] w-[120px] h-[76px] opacity-50 z-0"
          />
          {/* Information Sidebar */}
          <div className="lg:col-span-5 p-8 sm:p-12 bg-[#F4F8FB] border-b lg:border-b-0 lg:border-r border-[#C9D9E8] flex flex-col justify-between relative overflow-hidden">
             <div className="relative z-10 text-left">
               <Reveal delay={0.1}>
                 <div className="flex items-center gap-2 mb-6">
                   <Sparkles className="w-4 h-4 text-[#7A7A50]" />
                   <h2 className="font-display text-[11px] font-bold uppercase tracking-[0.4em] text-[#7A7A50]">{badgeText}</h2>
                 </div>
               </Reveal>
               <Reveal delay={0.2}>
                 <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display mb-6 leading-tight text-balance text-[#0B2E3A]">
                   {titleText1} <br />
                   <span className="text-[#7A7A50] italic mr-[0.2em]">{titleText2}</span>{' '}{titleText3}
                 </h3>
               </Reveal>
               <Reveal delay={0.3}>
                 <p className="text-[#3D5563] text-base leading-relaxed mb-10 text-balance font-medium">
                   {descText}
                 </p>
               </Reveal>

               <div className="space-y-8">
                 <Reveal delay={0.4} direction="up" distance={20}>
                   <div className="flex items-center gap-5 group">
                     <div className="w-14 h-14 bg-[#FFFFFF] border border-[#C9D9E8] rounded-2xl flex items-center justify-center group-hover:bg-[#004050] transition-all duration-500 transform group-hover:rotate-12 shadow-sm shrink-0">
                       <Phone className="w-5 h-5 text-[#004050] group-hover:text-white transition-colors" />
                     </div>
                     <div className="text-left">
                       <p className="font-display text-[8.5px] font-bold uppercase tracking-widest text-[#7A7A50] mb-1">{whatsappLabel}</p>
                       <p className="text-xl font-bold font-display text-[#0B2E3A] group-hover:text-[#004050] transition-colors tracking-tight" dir="ltr">+92 346 1573771</p>
                     </div>
                   </div>
                 </Reveal>

                 <Reveal delay={0.5} direction="up" distance={20}>
                   <div className="flex items-center gap-5 group">
                     <div className="w-14 h-14 bg-[#FFFFFF] border border-[#C9D9E8] rounded-2xl flex items-center justify-center group-hover:bg-[#004050] transition-all duration-500 transform group-hover:-rotate-12 shadow-sm shrink-0">
                       <Mail className="w-5 h-5 text-[#004050] group-hover:text-white transition-colors" />
                     </div>
                     <div className="text-left min-w-0">
                       <p className="font-display text-[8.5px] font-bold uppercase tracking-widest text-[#7A7A50] mb-1">{registryLabel}</p>
                       <p className="text-[11px] sm:text-sm font-bold font-display text-[#0B2E3A] group-hover:text-[#004050] transition-colors whitespace-nowrap" dir="ltr">beaconquraninstitute@gmail.com</p>
                     </div>
                   </div>
                 </Reveal>
               </div>
             </div>

             {/* Trust checklist — each tick is labelled (labels are the site's own
                 promises, previously the five ticks stood alone with no labels). */}
             <Reveal delay={0.6} direction="up" distance={20}>
               <div className="mt-10 pt-8 border-t border-[#D7E3EE] relative z-10">
                 <ul className="space-y-2.5 text-left">
                   {['3-Day Free Trial', '1-on-1 Personalized Classes', 'Certified Teachers', 'Flexible Scheduling', 'Regular Progress Reports'].map((label) => (
                     <li key={label} className="flex items-center gap-2.5">
                       <CheckCircle2 className="w-4 h-4 text-[#004050] shrink-0" />
                       <span className="text-[11px] font-bold uppercase tracking-wider text-[#3D5563]">{label}</span>
                     </li>
                   ))}
                 </ul>
                 <p className="font-display text-[9.5px] font-bold uppercase tracking-[0.25em] text-[#3D5563]/70 mt-5 leading-relaxed text-center">
                   {subFooterLabel}
                 </p>
               </div>
             </Reveal>
          </div>

          {/* Form Container */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 bg-[#FFFFFF] text-[#0B2E3A] relative">
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 bg-[#FFFFFF]/95 backdrop-blur-sm p-12 sm:p-24 flex flex-col items-center justify-center text-center"
                >
                  <div className="w-24 h-24 bg-[#EAF1F7] border border-[#C9D9E8] text-[#004050] rounded-3xl flex items-center justify-center mb-10 shadow-sm">
                     <CheckCircle2 className="w-10 h-10 animate-pulse" />
                  </div>
                  <h4 className="text-4xl font-bold font-display text-[#0B2E3A] mb-6">{successTitleText}</h4>
                  <p className="text-[#3D5563] mb-12 max-w-sm leading-relaxed text-lg font-medium text-balance">
                    {successDescText}
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="px-14 py-5 bg-[#004050] text-white rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-[#7A7A50] hover:shadow-2xl transition-all shadow-xl cursor-pointer"
                  >
                    {closeBtnText}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6 relative">
              <div className="grid md:grid-cols-2 gap-6">
                <Reveal delay={0.1} direction="up" distance={20}>
                  <div className="space-y-2.5">
                    <label className="font-display text-[10.5px] font-bold uppercase tracking-[0.3em] text-[#004050] block ml-1">
                      {labelName}
                    </label>
                    <div className="relative group">
                      <User className={`absolute left-5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] transition-colors ${errors.name ? 'text-red-500' : 'text-[#3D5563]/60 group-focus-within:text-[#004050]'}`} />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full pl-14 pr-6 text-left py-4 bg-[#FFFFFF] border rounded-2xl outline-none transition-all placeholder:text-[#3D5563]/60 text-[#0B2E3A] font-semibold text-sm ${
                          errors.name ? 'border-red-500 focus:ring-red-500' : 'border-[#C9D9E8] focus:border-[#004050] focus:bg-[#FFFFFF]'
                        }`}
                        placeholder={placeholderName}
                      />
                    </div>
                    {errors.name && <p className="text-xs text-red-500 font-bold text-left">{errors.name}</p>}
                  </div>
                </Reveal>
                <Reveal delay={0.2} direction="up" distance={20}>
                  <div className="space-y-2.5">
                    <label className="font-display text-[10.5px] font-bold uppercase tracking-[0.3em] text-[#004050] block ml-1">
                      {labelPhone}
                    </label>
                    <div className="relative group">
                      <Phone className={`absolute left-5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] transition-colors ${errors.phone ? 'text-red-500' : 'text-[#3D5563]/60 group-focus-within:text-[#004050]'}`} />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-14 pr-6 text-left py-4 bg-[#FFFFFF] border border-[#C9D9E8] focus:border-[#004050] rounded-2xl outline-none transition-all placeholder:text-[#3D5563]/60 text-[#0B2E3A] font-semibold text-sm"
                        placeholder={placeholderPhone}
                        dir="ltr"
                      />
                    </div>
                    {errors.phone && <p className="text-xs text-red-500 font-bold text-left">{errors.phone}</p>}
                  </div>
                </Reveal>
              </div>

              <Reveal delay={0.3} direction="up" distance={20}>
                <div className="space-y-2.5">
                  <label className="font-display text-[10.5px] font-bold uppercase tracking-[0.3em] text-[#004050] block ml-1">
                    {labelEmail}
                  </label>
                  <div className="relative group">
                    <Mail className={`absolute left-5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] transition-colors ${errors.email ? 'text-red-500' : 'text-[#3D5563]/60 group-focus-within:text-[#004050]'}`} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-14 pr-6 text-left font-semibold py-4 bg-[#FFFFFF] border border-[#C9D9E8] focus:border-[#004050] rounded-2xl outline-none transition-all placeholder:text-[#3D5563]/60 text-[#0B2E3A] text-sm"
                      placeholder={placeholderEmail}
                      dir="ltr"
                    />
                  </div>
                  {errors.email && <p className="text-xs text-red-500 font-bold text-left">{errors.email}</p>}
                </div>
              </Reveal>

              <div className="grid md:grid-cols-2 gap-6">
                <Reveal delay={0.4} direction="up" distance={20}>
                  <div className="space-y-2.5">
                    <label className="font-display text-[10.5px] font-bold uppercase tracking-[0.3em] text-[#004050] block ml-1">
                      {labelCourse}
                    </label>
                    <div className="relative group">
                       <select
                         name="course"
                         value={formData.course}
                         onChange={handleChange}
                         className="w-full py-4 bg-[#FFFFFF] border border-[#C9D9E8] rounded-2xl focus:border-[#004050] outline-none transition-all cursor-pointer font-bold appearance-none text-[#0B2E3A] text-sm pl-6 pr-10 text-left"
                       >
                         {coursesList.map(c => <option key={c} value={c} className="bg-[#FFFFFF] text-[#0B2E3A] py-2">{c}</option>)}
                       </select>
                       <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[#004050]">
                         <ArrowRight className="w-4 h-4 rotate-90" />
                       </div>
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={0.5} direction="up" distance={20}>
                  <div className="space-y-2.5">
                    <label className="font-display text-[10.5px] font-bold uppercase tracking-[0.3em] text-[#004050] block ml-1">
                      {labelPlan}
                    </label>
                    <div className="relative group">
                       <select
                         name="schedule"
                         value={formData.schedule}
                         onChange={handleChange}
                         className="w-full py-4 bg-[#FFFFFF] border border-[#C9D9E8] rounded-2xl focus:border-[#004050] outline-none transition-all cursor-pointer font-bold appearance-none text-[#0B2E3A] text-sm pl-6 pr-10 text-left"
                       >
                         {schedulesList.map(p => <option key={p} value={p} className="bg-[#FFFFFF] text-[#0B2E3A] py-2">{p}</option>)}
                       </select>
                       <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[#004050]">
                         <ArrowRight className="w-4 h-4 rotate-90" />
                       </div>
                    </div>
                  </div>
                </Reveal>
              </div>

              <Reveal delay={0.6} direction="up" distance={20}>
                <div className="space-y-2.5">
                  <label className="font-display text-[10.5px] font-bold uppercase tracking-[0.3em] text-[#004050] block ml-1">
                    {labelNotes}
                  </label>
                  <div className="relative group">
                    <MessageSquare className="absolute left-5 top-5 w-[18px] h-[18px] text-[#3D5563]/60 group-focus-within:text-[#004050]" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      className="w-full pl-14 pr-6 text-left py-4 bg-[#FFFFFF] border border-[#C9D9E8] rounded-2xl focus:border-[#004050] outline-none transition-all resize-none text-[#0B2E3A] placeholder:text-[#3D5563]/60 font-semibold text-sm"
                      placeholder={placeholderNotes}
                    ></textarea>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.7} direction="up" distance={20}>
                <div className="w-full flex justify-start">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-10 py-4 group bg-[#7A7A50] text-white rounded-xl font-bold uppercase tracking-[0.15em] text-[14px] shadow-lg hover:bg-[#004050] active:scale-95 transition-all flex items-center justify-center disabled:opacity-70 relative overflow-hidden cursor-pointer"
                  >
                    {isSubmitting ? submittingBtnText : submitBtnTextText}
                  </button>
                </div>
              </Reveal>

              <Reveal delay={0.8}>
                <div className="flex items-center justify-center gap-3 opacity-60">
                   <div className="h-px flex-grow bg-[#C9D9E8]"></div>
                   <p className="font-display text-[8px] font-bold uppercase tracking-[0.4em] text-center text-[#3D5563]">
                     {bottomSecurityLabel}
                   </p>
                   <div className="h-px flex-grow bg-[#C9D9E8]"></div>
                </div>
              </Reveal>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
