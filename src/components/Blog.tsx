import { motion } from 'motion/react';
import { Calendar, User, ArrowLeft, ArrowRight, Search } from 'lucide-react';
import { useState, useEffect } from 'react';

import blogImage4 from '../assets/images/regenerated_image_1779643350951.png';
import blogImage3 from '../assets/images/regenerated_image_1779643363003.png';
import blogImage2 from '../assets/images/regenerated_image_1779643368761.png';

const blogPosts = [
  {
    id: 1,
    title: "The Importance of Tajweed in Quranic Recitation",
    excerpt: "Tajweed is not just reaching the correct pronunciation; it's about giving every letter its right and preserving the divine message...",
    author: "Sheikh Yusuf",
    date: "May 15, 2024",
    category: "Tajweed Tips",
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Effective Strategies for Hifz (Memorization)",
    excerpt: "Memorizing the Quran is a spiritual journey. Learn 5 proven techniques to help your children memorize faster and more effectively...",
    author: "Ustadh Ahmed",
    date: "May 12, 2024",
    category: "Hifz Guide",
    image: blogImage2
  },
  {
    id: 3,
    title: "Why Start Quran Learning at an Early Age?",
    excerpt: "Early childhood is the golden period for language and phonetics. Discover why starting Quran classes early sets a strong foundation...",
    author: "Dr. Fatima",
    date: "May 10, 2024",
    category: "Parenting",
    image: blogImage3
  },
  {
    id: 4,
    title: "Understanding the Wisdom of Surah Al-Kahf",
    excerpt: "Exploring the four powerful stories in Surah Al-Kahf and the timeless lessons they provide for our modern daily lives...",
    author: "Sheikh Yusuf",
    date: "May 08, 2024",
    category: "Tafsir",
    image: blogImage4
  }
];

function BlogSkeleton() {
  return (
    <div className="bg-black/30 backdrop-blur-md rounded-[2.5rem] overflow-hidden border border-accent/20 p-0 animate-pulse">
      <div className="grid md:grid-cols-5 h-full">
        <div className="md:col-span-2 bg-accent/5 h-64 md:h-auto"></div>
        <div className="md:col-span-3 p-8 lg:p-12 space-y-6">
          <div className="flex gap-4">
            <div className="h-6 w-20 bg-accent/10 rounded-full"></div>
            <div className="h-6 w-24 bg-accent/10 rounded-full"></div>
          </div>
          <div className="h-10 w-full bg-accent/10 rounded-xl"></div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-accent/10 rounded"></div>
            <div className="h-4 w-3/4 bg-accent/10 rounded"></div>
          </div>
          <div className="pt-6 border-t border-accent/10 flex justify-between">
            <div className="h-4 w-24 bg-accent/10 rounded"></div>
            <div className="h-4 w-16 bg-accent/10 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Blog({ onBack }: { onBack: () => void }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-transparent min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-24 text-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <button 
              onClick={onBack}
              className="group flex items-center gap-3 text-amber-100/85 hover:text-accent mb-8 font-bold uppercase tracking-[0.3em] text-[9px] transition-all cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full border border-accent/20 flex items-center justify-center group-hover:border-accent group-hover:bg-accent group-hover:text-primary transition-all">
                <ArrowLeft className="w-3.5 h-3.5 text-accent group-hover:text-primary" />
              </div>
              Back to Home
            </button>
            <div className="card-shine border border-[#949693]/35 p-6 sm:p-8 rounded-[2.5rem] shadow-2xl mb-6 md:mb-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#084C63]/30 border border-[#949693]/40 mb-3">
               <h2 className="display text-[10px] font-extrabold uppercase tracking-[0.4em] text-amber-200">Knowledge Hub</h2>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold serif text-amber-50 leading-[1.1] tracking-tight">
              The Beacon <span className="text-amber-200 italic font-semibold">Digest</span>
            </h1>
          </div>
          </div>
          
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-100/60 group-hover:text-accent transition-colors" />
            <input 
              type="text" 
              placeholder="Search wisdom..."
              className="w-full pl-16 pr-6 py-6 bg-black/30 backdrop-blur-md border border-accent/20 text-amber-50 placeholder:text-amber-100/60 rounded-[2rem] focus:border-accent focus:bg-black/50 outline-none transition-all shadow-xl"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 sm:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8 sm:space-y-12">
            {loading ? (
              <>
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
              </>
            ) : (
              blogPosts.map((post, index) => (
                <motion.article 
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-black/20 backdrop-blur-md rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border border-accent/20 hover:border-accent/50 hover:bg-black/40 transition-all hover:shadow-2xl group text-amber-50"
                >
                  <div className="grid md:grid-cols-5 h-full">
                    <div className="md:col-span-2 overflow-hidden h-64 md:h-auto group-hover:brightness-110 transition-all duration-1000">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      />
                    </div>
                    <div className="md:col-span-3 p-10 lg:p-14 flex flex-col justify-center">
                      <div className="flex gap-6 items-center mb-8">
                        <span className="px-5 py-1.5 bg-accent/10 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] text-accent border border-accent/20 shadow-sm">
                          {post.category}
                        </span>
                        <div className="flex items-center gap-3 text-[9px] uppercase font-bold tracking-[0.3em] text-amber-100/85">
                          <Calendar className="w-3.5 h-3.5 text-accent" />
                          {post.date}
                        </div>
                      </div>
                      
                      <h3 className="text-2xl lg:text-3xl font-bold serif text-amber-50 mb-6 group-hover:text-accent transition-colors leading-[1.2] tracking-tight">
                        {post.title}
                      </h3>
                      <p className="text-amber-100/90 text-lg leading-relaxed mb-10 line-clamp-2 italic serif">
                        "{post.excerpt}"
                      </p>
                      
                      <div className="flex justify-between items-center mt-auto pt-8 border-t border-accent/10">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all">
                            <User className="w-5 h-5" />
                          </div>
                          <span className="display text-[10px] font-bold uppercase tracking-[0.2em] text-amber-100/85 group-hover:text-amber-50 transition-colors">{post.author}</span>
                        </div>
                        <button className="display text-[10px] font-bold uppercase tracking-[0.3em] text-accent flex items-center gap-3 group-hover:gap-5 transition-all">
                          Read Transcript
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8 sm:space-y-12">
            <div className="bg-black/40 backdrop-blur-md text-amber-50 p-8 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] border border-accent/30 shadow-2xl relative overflow-hidden">
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/arabic-overlay.png")' }}></div>
               <h4 className="text-lg sm:text-xl font-bold serif mb-4 sm:mb-6 text-accent">Newsletter</h4>
               <p className="text-amber-100/90 text-sm mb-6 sm:mb-8 leading-relaxed">Join 5,000+ subscribers for weekly Quranic insights and institute updates.</p>
               <input 
                 type="email" 
                 placeholder="your@email.com"
                 className="w-full px-4 py-4 bg-black/30 border border-accent/20 text-amber-50 placeholder:text-amber-100/60 rounded-xl mb-4 focus:bg-black/50 focus:border-accent outline-none"
               />
               <button className="w-full bg-accent text-primary py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-amber-100 transition-all cursor-pointer">Subscribe Now</button>
            </div>

            <div className="bg-black/20 backdrop-blur-md p-8 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] border border-accent/20 text-amber-50">
               <h4 className="text-lg sm:text-xl font-bold serif mb-6 sm:mb-8 text-amber-50">Popular Categories</h4>
               <div className="flex flex-wrap gap-2 sm:gap-3">
                 {['Tajweed', 'Hifz', 'Arabic', 'Tafsir', 'Parenting', 'Rules', 'Spiritual'].map(cat => (
                   <span key={cat} className="px-4 py-2 bg-accent/10 border border-accent/20 rounded-xl text-xs font-bold text-amber-100 hover:bg-accent hover:text-primary transition-colors cursor-pointer">
                     {cat}
                   </span>
                 ))}
               </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
