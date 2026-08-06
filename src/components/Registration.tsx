import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Mail, MessageSquare, Phone, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import { useLanguage } from '../context/LanguageContext';

interface FormData {
  name: string;
  phone: string;
  email: string;
  course: string;
  plan: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
}

interface RegistrationProps {
  preSelectedCourse?: string | null;
  preSelectedPlan?: string | null;
}

export default function Registration({ preSelectedCourse, preSelectedPlan }: RegistrationProps) {
  const { isAr } = useLanguage();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    course: isAr ? 'القاعدة النورانية' : 'Noorani Qaida',
    plan: isAr ? 'الباقة المتميزة' : 'Popular Plan',
    message: ''
  });

  React.useEffect(() => {
    if (preSelectedCourse) {
      setFormData(prev => ({ ...prev, course: preSelectedCourse }));
    }
  }, [preSelectedCourse]);

  React.useEffect(() => {
    if (preSelectedPlan) {
      setFormData(prev => ({ ...prev, plan: preSelectedPlan }));
    }
  }, [preSelectedPlan]);

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = isAr ? 'الاسم مطلوب' : 'Name is required';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = isAr ? 'رقم الهاتف مطلوب' : 'Phone is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = isAr ? 'البريد الإلكتروني مطلوب' : 'Email is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    
    // Construct WhatsApp message
    const message = `*New Registration Request*\n---\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Email:* ${formData.email}\n*Course:* ${formData.course}\n*Plan:* ${formData.plan}\n*Message:* ${formData.message || 'N/A'}`;
    const waUrl = `https://wa.me/923461573771?text=${encodeURIComponent(message)}`;
    
    setTimeout(() => {
      window.open(waUrl, '_blank');
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        course: isAr ? 'القاعدة النورانية' : 'Noorani Qaida',
        plan: isAr ? 'الباقة المتميزة' : 'Popular Plan',
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
  const badgeText = isAr ? "بوابة التسجيل والقبول" : "Enrollment";
  const titleText1 = isAr ? "ابدأ رحلتك" : "Begin Your";
  const titleText2 = isAr ? "المباركة" : "Divine";
  const titleText3 = isAr ? "في حفظ القرآن" : "Journey";
  const descText = isAr 
    ? "عِش دقة تجويد وعظمة تلاوة القرآن الكريم مع تجربة تقييم وتوجيه مجانية مخصصة لجميع المستويات. لا التزام مطلق."
    : "Experience the precision of Tajweed and the beauty of recitation with a professional evaluation session. No commitment required.";

  const whatsappLabel = isAr ? "التسجيل السريع بالواتساب" : "WhatsApp Registrar";
  const registryLabel = isAr ? "المكتب والبريد الإلكتروني" : "Official Registry";
  const subFooterLabel = isAr 
    ? "أعلى المعايير التعليمية الأكاديمية • كادر متميز وأسانيد متصلة" 
    : "Global Academic Standard • Authenticated Ijazah Pathways";

  const successTitleText = isAr ? "تم إرسال طلب تواصلك" : "Inquiry Dispatched";
  const successDescText = isAr
    ? "تم استلام ترشيحك لجلسة التقييم والمتابعة بنجاح كامل وسرية معلومات تامة. سيتواصل معك منسق مكتب التسجيل عبر الواتساب قريباً."
    : "Your application for the evaluation session has been securely received. Our academic advisor will connect via WhatsApp shortly.";
  const closeBtnText = isAr ? "إغلاق النافذة" : "Close Portal";

  const labelName = isAr ? "اسم مقدم الطلب الكامل" : "Applicant Name";
  const placeholderName = isAr ? "مثال: عبد الرحمن بن أحمد" : "e.g. Abdullah Ahmed";
  
  const labelPhone = isAr ? "رقم الهاتف والواتساب للتواصل" : "WhatsApp Liaison";
  const placeholderPhone = isAr ? "مثال: 00966501234567" : "Include country code";

  const labelEmail = isAr ? "البريد الإلكتروني للمتابعة" : "Email Correspondence";
  const placeholderEmail = isAr ? "you@domain.com" : "you@domain.com";

  const labelCourse = isAr ? "المسار أو البرنامج الدراسي" : "Learning Track";
  const labelPlan = isAr ? "باقة الاشتراك وتكرار الجلسات" : "Session Frequency";

  const labelNotes = isAr ? "التطلعات، مستوى الحفظ، أو المواعيد" : "Aspirations & Notes";
  const placeholderNotes = isAr 
    ? "أكتب أي تفاصيل بخصوص الحفظ الحالي، الرغبات الخاصة بالجدول الزمني أو احتياجاتك الأكاديمية..."
    : "Detail any specific goals or legacy requirements...";

  const submitBtnTextText = isAr ? "إرسال طلب الالتحاق" : "SUBMIT";
  const submittingBtnText = isAr ? "جاري الإرسال والربط..." : "Submitting...";
  
  const bottomSecurityLabel = isAr ? "تأمين وحماية البيانات بخصوص جلسات التعارف" : "Encrypted Session Initialization";

  const coursesList = isAr 
    ? ["القاعدة النورانية", "تلاوة القرآن وإتقانه", "حفظ وتثبيت القرآن", "إقرأ وارتقِ (تجويد مكثف)", "تفسير وتدبر القرآن", "علوم لغة القرآن الكريم"]
    : ["Noorani Qaida", "Quran Reading", "Hifz (Memorization)", "Tajweed Mastery", "Quranic Tafsir", "Arabic Language"];

  const plansList = isAr
    ? ["الباقة التمهيدية (حصتان)", "الباقة المتميزة (٣ حصص)", "الباقة الأكاديمية الشاملة (٥ حصص)"]
    : ["Starter Plan", "Popular Plan", "Premium Plan"];

  return (
    <section id="contact" className="py-12 sm:py-20 bg-transparent relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/arabic-overlay.png")' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="card-shine rounded-[4rem] shadow-2xl overflow-hidden grid lg:grid-cols-12 min-h-[850px] text-amber-50">
          {/* Information Sidebar */}
          <div className="lg:col-span-5 p-12 sm:p-20 bg-[#051b23]/70 backdrop-blur-md text-amber-50 border-b lg:border-b-0 lg:border-r border-[#949693]/25 flex flex-col justify-between relative overflow-hidden">
             <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] border border-[#757454] rounded-full -mr-64 -mt-64 translate-x-10 -translate-y-10 opacity-30"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 border border-[#757454] rounded-full -ml-32 -mb-32 translate-y-10 opacity-30"></div>
             </div>

             <div className={`relative z-10 ${isAr ? 'text-right' : 'text-left'}`}>
               <Reveal delay={0.1}>
                 <div className={`flex items-center gap-2 mb-8 ${isAr ? 'flex-row-reverse' : ''}`}>
                   <Sparkles className="w-4 h-4 text-accent" />
                   <h2 className="display text-[11px] font-bold uppercase tracking-[0.4em] text-accent">{badgeText}</h2>
                 </div>
               </Reveal>
               <Reveal delay={0.2}>
                 {isAr ? (
                   <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold display mb-10 leading-tight text-balance">
                     {titleText1} <br />
                     <span className="text-accent italic">{titleText2}</span> {titleText3}
                   </h3>
                 ) : (
                   <h3 className="text-4xl sm:text-5xl lg:text-7xl font-bold display mb-10 leading-tight text-balance">
                     {titleText1} <br />
                     <span className="text-accent italic">{titleText2}</span> {titleText3}
                   </h3>
                 )}
               </Reveal>
               <Reveal delay={0.3}>
                 <p className="text-amber-100/90 text-lg leading-relaxed mb-16 text-balance font-medium">
                   {descText}
                 </p>
               </Reveal>

               <div className="space-y-12">
                 <Reveal delay={0.4} direction="up" distance={20}>
                   <div className={`flex items-center gap-6 group ${isAr ? 'flex-row-reverse' : ''}`}>
                     <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/10 rounded-[1.8rem] flex items-center justify-center group-hover:bg-accent transition-all duration-500 transform group-hover:rotate-12 shadow-inner">
                       <Phone className="w-6 h-6 text-accent group-hover:text-primary transition-colors" />
                     </div>
                     <div className={`${isAr ? 'text-right' : 'text-left'}`}>
                       <p className="display text-[9px] font-bold uppercase tracking-widest text-accent mb-1.5 opacity-80">{whatsappLabel}</p>
                       <p className="text-2xl font-bold display group-hover:text-accent transition-colors tracking-tight" dir="ltr">+92 346 1573771</p>
                     </div>
                   </div>
                 </Reveal>

                 <Reveal delay={0.5} direction="up" distance={20}>
                   <div className={`flex items-center gap-6 group ${isAr ? 'flex-row-reverse' : ''}`}>
                     <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/10 rounded-[1.8rem] flex items-center justify-center group-hover:bg-accent transition-all duration-500 transform group-hover:-rotate-12 shadow-inner">
                       <Mail className="w-6 h-6 text-accent group-hover:text-primary transition-colors" />
                     </div>
                     <div className={`${isAr ? 'text-right' : 'text-left'}`}>
                       <p className="display text-[9px] font-bold uppercase tracking-widest text-accent mb-1.5 opacity-80">{registryLabel}</p>
                       <p className="text-sm font-bold display group-hover:text-accent transition-colors break-all" dir="ltr">beaconquraninstitute@gmail.com</p>
                     </div>
                   </div>
                 </Reveal>
               </div>
             </div>

             <Reveal delay={0.6} direction="up" distance={20}>
               <div className="mt-20 pt-12 border-t border-white/10 relative z-10 text-center">
                 <div className="flex gap-2 justify-center">
                   {[...Array(5)].map((_, i) => <CheckCircle2 key={i} className="w-4 h-4 text-accent" />)}
                 </div>
                 <p className="display text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 mt-8 leading-relaxed">
                   {subFooterLabel}
                 </p>
               </div>
             </Reveal>
          </div>

          {/* Form Container */}
          <div className="lg:col-span-7 p-12 sm:p-24 bg-[#030d12]/40 backdrop-blur-md text-amber-50 relative">
            <AnimatePresence>
              {isSuccess && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 bg-black/80 backdrop-blur-xl p-12 sm:p-24 flex flex-col items-center justify-center text-center"
                >
                  <div className="w-24 h-24 bg-primary/5 text-accent rounded-[2.5rem] flex items-center justify-center mb-10 shadow-inner">
                     <CheckCircle2 className="w-10 h-10 animate-pulse" />
                  </div>
                  <h4 className="text-4xl font-bold display text-primary mb-6">{successTitleText}</h4>
                  <p className="text-amber-100/90 mb-12 max-w-sm leading-relaxed text-lg font-medium text-balance">
                    {successDescText}
                  </p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="px-14 py-5 bg-primary text-white rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-accent hover:shadow-2xl transition-all shadow-xl shadow-primary/10 cursor-pointer"
                  >
                    {closeBtnText}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-10 relative">
              <div className="grid md:grid-cols-2 gap-10">
                <Reveal delay={0.1} direction="up" distance={20}>
                  <div className="space-y-4">
                    <label className={`display text-[11px] font-bold uppercase tracking-[0.4em] text-accent block ${isAr ? 'text-right mr-1' : 'ml-1'}`}>
                      {labelName}
                    </label>
                    <div className="relative group">
                      <User className={`absolute ${isAr ? 'right-6' : 'left-6'} top-1/2 -translate-y-1/2 w-4.5 h-4.5 transition-colors ${errors.name ? 'text-red-400' : 'text-amber-100/60 group-focus-within:text-accent'}`} />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full ${isAr ? 'pr-16 pl-8 text-right' : 'pl-16 pr-8 text-left'} py-5.5 bg-black/30 border rounded-3xl outline-none transition-all placeholder:text-amber-100/60 text-amber-50 font-semibold text-sm ${
                          errors.name ? 'border-red-400 focus:ring-red-400' : 'border-accent/20 focus:border-accent focus:bg-black/50 focus:shadow-xl'
                        }`}
                        placeholder={placeholderName}
                      />
                    </div>
                    {errors.name && <p className={`text-xs text-red-400 font-bold ${isAr ? 'text-right' : 'text-left'}`}>{errors.name}</p>}
                  </div>
                </Reveal>
                <Reveal delay={0.2} direction="up" distance={20}>
                  <div className="space-y-4">
                    <label className={`display text-[11px] font-bold uppercase tracking-[0.4em] text-accent block ${isAr ? 'text-right mr-1' : 'ml-1'}`}>
                      {labelPhone}
                    </label>
                    <div className="relative group">
                      <Phone className={`absolute ${isAr ? 'right-6' : 'left-6'} top-1/2 -translate-y-1/2 w-4.5 h-4.5 transition-colors ${errors.phone ? 'text-red-400' : 'text-amber-100/60 group-focus-within:text-accent'}`} />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full ${isAr ? 'pr-16 pl-8 text-right' : 'pl-16 pr-8 text-left'} py-5.5 bg-black/30 border border-accent/20 focus:border-accent focus:bg-black/50 rounded-3xl outline-none transition-all placeholder:text-amber-100/60 text-amber-50 font-semibold text-sm`}
                        placeholder={placeholderPhone}
                        dir="ltr"
                      />
                    </div>
                    {errors.phone && <p className={`text-xs text-red-400 font-bold ${isAr ? 'text-right' : 'text-left'}`}>{errors.phone}</p>}
                  </div>
                </Reveal>
              </div>

              <Reveal delay={0.3} direction="up" distance={20}>
                <div className="space-y-4">
                  <label className={`display text-[11px] font-bold uppercase tracking-[0.4em] text-accent block ${isAr ? 'text-right mr-1' : 'ml-1'}`}>
                    {labelEmail}
                  </label>
                  <div className="relative group">
                    <Mail className={`absolute ${isAr ? 'right-6' : 'left-6'} top-1/2 -translate-y-1/2 w-4.5 h-4.5 transition-colors ${errors.email ? 'text-red-400' : 'text-amber-100/60 group-focus-within:text-accent'}`} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full ${isAr ? 'pr-16 pl-8 text-right font-medium' : 'pl-16 pr-8 text-left font-semibold'} py-5.5 bg-black/30 border border-accent/20 focus:border-accent focus:bg-black/50 rounded-3xl outline-none transition-all placeholder:text-amber-100/60 text-amber-50 text-sm`}
                      placeholder={placeholderEmail}
                      dir="ltr"
                    />
                  </div>
                  {errors.email && <p className={`text-xs text-red-400 font-bold ${isAr ? 'text-right' : 'text-left'}`}>{errors.email}</p>}
                </div>
              </Reveal>

              <div className="grid md:grid-cols-2 gap-10">
                <Reveal delay={0.4} direction="up" distance={20}>
                  <div className="space-y-4">
                    <label className={`display text-[11px] font-bold uppercase tracking-[0.4em] text-accent block ${isAr ? 'text-right mr-1' : 'ml-1'}`}>
                      {labelCourse}
                    </label>
                    <div className="relative group">
                       <select 
                         name="course"
                         value={formData.course}
                         onChange={handleChange}
                         className={`w-full py-5.5 bg-[#051b23]/80 border border-[#949693]/30 rounded-3xl focus:border-[#757454] focus:bg-[#084C63]/60 outline-none transition-all cursor-pointer font-bold appearance-none text-amber-50 text-sm ${isAr ? 'pr-8 pl-12 text-right' : 'pl-8 pr-12 text-left'}`}
                       >
                         {coursesList.map(c => <option key={c} value={c} className="bg-[#051b23] text-amber-50 py-2">{c}</option>)}
                       </select>
                       <div className={`absolute ${isAr ? 'left-6' : 'right-6'} top-1/2 -translate-y-1/2 pointer-events-none text-accent`}>
                         <ArrowRight className="w-4 h-4 rotate-90" />
                       </div>
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={0.5} direction="up" distance={20}>
                  <div className="space-y-4">
                    <label className={`display text-[11px] font-bold uppercase tracking-[0.4em] text-accent block ${isAr ? 'text-right mr-1' : 'ml-1'}`}>
                      {labelPlan}
                    </label>
                    <div className="relative group">
                       <select 
                         name="plan"
                         value={formData.plan}
                         onChange={handleChange}
                         className={`w-full py-5.5 bg-[#051b23]/80 border border-[#949693]/30 rounded-3xl focus:border-[#757454] focus:bg-[#084C63]/60 outline-none transition-all cursor-pointer font-bold appearance-none text-amber-50 text-sm ${isAr ? 'pr-8 pl-12 text-right' : 'pl-8 pr-12 text-left'}`}
                       >
                         {plansList.map(p => <option key={p} value={p} className="bg-[#051b23] text-amber-50 py-2">{p}</option>)}
                       </select>
                       <div className={`absolute ${isAr ? 'left-6' : 'right-6'} top-1/2 -translate-y-1/2 pointer-events-none text-accent`}>
                         <ArrowRight className="w-4 h-4 rotate-90" />
                       </div>
                    </div>
                  </div>
                </Reveal>
              </div>

              <Reveal delay={0.6} direction="up" distance={20}>
                <div className="space-y-4">
                  <label className={`display text-[11px] font-bold uppercase tracking-[0.4em] text-accent block ${isAr ? 'text-right mr-1' : 'ml-1'}`}>
                    {labelNotes}
                  </label>
                  <div className="relative group">
                    <MessageSquare className={`absolute ${isAr ? 'right-6' : 'left-6'} top-7 w-4.5 h-4.5 text-amber-100/60 group-focus-within:text-accent`} />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className={`w-full ${isAr ? 'pr-16 pl-8 text-right' : 'pl-16 pr-8 text-left'} py-6 bg-black/30 border border-accent/20 rounded-3xl focus:border-accent focus:bg-black/50 outline-none transition-all resize-none text-amber-50 placeholder:text-amber-100/60 font-semibold text-sm`}
                      placeholder={placeholderNotes}
                    ></textarea>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.7} direction="up" distance={20}>
                <div className={`w-full flex ${isAr ? 'justify-end' : 'justify-start'}`}>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="px-12 py-5.5 group bg-[#084C63] text-white border border-[#949693]/30 rounded-[20px] font-serif font-bold uppercase tracking-[0.15em] text-[15px] shadow-2xl shadow-[#084C63]/40 hover:bg-[#757454] hover:shadow-[#757454]/40 active:scale-95 transition-all flex items-center justify-center disabled:opacity-70 relative overflow-hidden cursor-pointer"
                  >
                    {isSubmitting ? submittingBtnText : submitBtnTextText}
                  </button>
                </div>
              </Reveal>

              <Reveal delay={0.8}>
                <div className="flex items-center justify-center gap-3 opacity-60">
                   <div className="h-px flex-grow bg-primary"></div>
                   <p className="display text-[8px] font-bold uppercase tracking-[0.4em] text-center">
                     {bottomSecurityLabel}
                   </p>
                   <div className="h-px flex-grow bg-primary"></div>
                </div>
              </Reveal>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
