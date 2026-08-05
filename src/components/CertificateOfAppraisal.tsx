import { motion } from 'motion/react';
import { Award, CheckCircle, GraduationCap, FileBadge, ArrowLeft, Download } from 'lucide-react';

export default function CertificateOfAppraisal({ onBack }: { onBack: () => void }) {
  return (
    <div className="bg-transparent min-h-screen pt-32 pb-24 text-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-amber-100/60 hover:text-accent mb-8 font-bold uppercase tracking-widest text-xs transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-accent" />
              Back to Home
            </button>
            <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-accent mb-4">Academic Recognition</h2>
            <h1 className="text-4xl md:text-6xl font-bold serif text-amber-50 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] mb-8">Certificate of <span className="text-accent italic font-normal">Appraisal</span></h1>
            
            <p className="text-amber-100/80 text-lg leading-relaxed mb-12 font-medium">
              At Beacon Quran Institute, we believe in celebrating the milestones of our students. Upon successful completion of a course, we issue a formal Certificate of Appraisal to recognize your dedication and achievement.
            </p>

            <div className="space-y-8">
               {[
                 { title: "Standard Achievement", desc: "Recognizes the successful completion of the course syllabus.", icon: GraduationCap },
                 { title: "Tajweed Excellence", desc: "Special endorsement for students mastering phonetic rules.", icon: FileBadge },
                 { title: "Verified Competency", desc: "Each certificate is verified by our senior academic head.", icon: CheckCircle }
               ].map((item, index) => (
                 <motion.div 
                   key={item.title}
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: index * 0.1 }}
                   className="flex gap-6"
                 >
                   <div className="w-12 h-12 bg-accent/20 border border-accent/30 rounded-xl flex items-center justify-center shrink-0">
                      <item.icon className="w-6 h-6 text-accent" />
                   </div>
                   <div>
                      <h4 className="font-bold serif text-amber-50 text-xl mb-1">{item.title}</h4>
                      <p className="text-amber-100/70 text-sm">{item.desc}</p>
                   </div>
                 </motion.div>
               ))}
            </div>

            <div className="mt-12 flex flex-col sm:flex-row gap-6">
               <button className="bg-accent text-primary px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-amber-100 transition-all flex items-center justify-center gap-3 cursor-pointer shadow-xl">
                  <Download className="w-4 h-4" />
                  Sample Certificate
               </button>
            </div>
          </div>

          <div className="relative">
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="bg-black/30 backdrop-blur-md p-1 rounded-[2.5rem] shadow-2xl border border-accent/20 relative z-10"
            >
               <div className="border-4 border-accent/50 rounded-[2rem] p-12 text-center relative overflow-hidden bg-black/40 text-amber-50">
                  {/* Decorative background for certificate */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/arabic-overlay.png")' }}></div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-bl-full"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/20 rounded-tr-full"></div>

                  <Award className="w-20 h-20 text-accent mx-auto mb-8" />
                  <h3 className="serif text-sm uppercase tracking-[0.3em] text-accent font-bold mb-4">Beacon Quran Institute</h3>
                  <h2 className="text-4xl font-bold serif text-amber-50 mb-2">Certificate of Appraisal</h2>
                  <div className="w-20 h-1 bg-accent mx-auto mb-10"></div>
                  
                  <p className="text-amber-100/70 font-serif italic mb-2">This is to certify that</p>
                  <p className="text-3xl font-bold serif text-amber-50 mb-8 border-b border-accent/30 inline-block px-12">Ahmed Abdullah</p>
                  
                  <p className="text-amber-100/80 leading-relaxed mb-12 max-w-md mx-auto">
                     has successfully completed the <span className="font-bold text-accent">Advanced Tajweed & Recitation</span> course with grade <span className="text-accent font-bold">A+</span> on this day of 25th May 2024.
                  </p>

                  <div className="flex justify-between items-end px-6">
                     <div className="text-left">
                        <div className="w-32 h-0.5 bg-accent/30 mb-2"></div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-amber-100/60">Head of Department</p>
                     </div>
                     <div className="w-20 h-20 border-4 border-accent/30 rounded-full flex items-center justify-center">
                        <div className="w-14 h-14 bg-accent/20 rounded-full flex items-center justify-center">
                           <CheckCircle className="w-6 h-6 text-accent" />
                        </div>
                     </div>
                  </div>
               </div>
            </motion.div>
            
            {/* Background elements */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
