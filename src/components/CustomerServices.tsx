import { motion } from 'motion/react';
import { ShieldCheck, Calendar, Clock, RefreshCw, Star, Info, ArrowLeft } from 'lucide-react';

const serviceDetails = [
  {
    title: "3 Days Free Trial",
    description: "Try any of our courses for 3 days without any cost. Evaluate our teachers and teaching method before you commit.",
    icon: Star
  },
  {
    title: "1-on-1 Online Classes",
    description: "Personalized attention ensures faster progress. Our teachers focus solely on one student during the entire session.",
    icon: User
  },
  {
    title: "Makeup Classes",
    description: "If you miss a class with prior notice (at least 6 hours), we provide makeup classes to ensure you don't lose your progress.",
    icon: Calendar
  },
  {
    title: "Refund Policy",
    description: "We value your satisfaction. If you are not happy with our services, you can request a refund for the remaining sessions of the month.",
    icon: RefreshCw
  },
  {
    title: "Teacher Assignment",
    description: "You have the freedom to request a change of teacher if the current style doesn't suit your learning preferences.",
    icon: ShieldCheck
  },
  {
    title: "Flexible Scheduling",
    description: "We offer classes 24/7. Choose a time slot that fits your busy lifestyle perfectly.",
    icon: Clock
  }
];

import { User } from 'lucide-react';

export default function CustomerServices({ onBack }: { onBack: () => void }) {
  return (
    <div className="bg-transparent min-h-screen pt-32 pb-24 text-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24 relative">
          <button 
            onClick={onBack}
            className="group flex items-center gap-3 text-amber-100/60 hover:text-accent mx-auto mb-12 font-bold uppercase tracking-[0.3em] text-[9px] transition-all cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full border border-accent/20 flex items-center justify-center group-hover:border-accent group-hover:bg-accent group-hover:text-primary transition-all">
              <ArrowLeft className="w-3.5 h-3.5 text-accent group-hover:text-primary" />
            </div>
            Back to Home
          </button>
          
          <div className="flex items-center justify-center gap-3 mb-6">
             <div className="w-2 h-2 rounded-full border-2 border-accent animate-ping" />
             <h2 className="display text-[10px] font-bold uppercase tracking-[0.6em] text-accent">Student Support</h2>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold serif text-amber-50 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] tracking-tighter leading-[0.9]">
            Concierge <br/>
            <span className="text-accent italic font-normal">& Service</span>
          </h1>
          
          <p className="text-amber-100/80 max-w-2xl mx-auto mt-12 text-xl leading-relaxed font-medium">
            At Beacon, we don't just provide classes. We manage your entire learning journey with premium professional support.
          </p>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-radial-at-c from-accent/5 to-transparent pointer-events-none -z-10" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceDetails.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/20 backdrop-blur-md p-10 rounded-[2.5rem] border border-accent/20 hover:border-accent/50 hover:bg-black/40 transition-all hover:shadow-2xl group text-amber-50"
            >
              <div className="w-16 h-16 bg-accent/20 border border-accent/30 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-accent transition-colors">
                <service.icon className="w-8 h-8 text-accent group-hover:text-primary" />
              </div>
              <h3 className="text-2xl font-bold serif text-amber-50 mb-4">{service.title}</h3>
              <p className="text-amber-100/70 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-24">
          <div className="bg-black/40 backdrop-blur-md text-amber-50 border border-accent/30 p-12 md:p-20 rounded-[3rem] relative overflow-hidden shadow-2xl">
             <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/arabic-overlay.png")' }}></div>
             <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                <div>
                   <h2 className="text-3xl md:text-4xl font-bold serif mb-6">Need Support?</h2>
                   <p className="text-white/70 text-lg leading-relaxed mb-8">
                      Our customer service team is available 24/7 to assist you with class scheduling, fee payments, and technical support.
                   </p>
                   <div className="flex flex-col sm:flex-row gap-6 items-center">
                      <a href="https://wa.me/923461573771" className="bg-accent text-primary px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-white transition-all text-center">
                         Contact Support
                      </a>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-4 text-white/80 font-bold px-2 mb-1">
                           <Info className="w-5 h-5 text-accent" />
                           <span>Response time: &lt; 1 hour</span>
                        </div>
                        <a href="mailto:beaconquraninstitute@gmail.com" className="text-accent underline text-[10px] font-bold px-2 tracking-widest uppercase hover:text-white transition-colors">
                           beaconquraninstitute@gmail.com
                        </a>
                      </div>
                   </div>
                </div>
                <div className="hidden lg:block">
                   <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                         <span className="block text-accent font-bold text-3xl mb-2">99%</span>
                         <span className="text-white/60 text-xs uppercase tracking-widest font-bold">Satisfaction</span>
                      </div>
                      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                         <span className="block text-accent font-bold text-3xl mb-2">24/7</span>
                         <span className="text-white/60 text-xs uppercase tracking-widest font-bold">Support</span>
                      </div>
                      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                         <span className="block text-accent font-bold text-3xl mb-2">5+</span>
                         <span className="text-white/60 text-xs uppercase tracking-widest font-bold">Languages</span>
                      </div>
                      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                         <span className="block text-accent font-bold text-3xl mb-2">1k+</span>
                         <span className="text-white/60 text-xs uppercase tracking-widest font-bold">Active Students</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
