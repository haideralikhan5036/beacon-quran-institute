import { motion, AnimatePresence } from 'motion/react';
import { Calendar, User, ArrowLeft, ArrowRight, Search, X, BookOpen, Clock, FileText, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { blogPosts, BlogPost } from '../data/blogData';
import { Reveal } from './ui/Reveal';

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
  const { isAr } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Filter posts based on search query and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory 
      ? (post.categoryEn === selectedCategory || post.categoryAr === selectedCategory)
      : true;
    
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      post.titleEn.toLowerCase().includes(query) ||
      post.titleAr.includes(query) ||
      post.excerptEn.toLowerCase().includes(query) ||
      post.excerptAr.includes(query) ||
      post.contentEn.toLowerCase().includes(query) ||
      post.contentAr.includes(query) ||
      post.authorEn.toLowerCase().includes(query) ||
      post.authorAr.includes(query);

    return matchesCategory && matchesSearch;
  });

  // Extract unique categories dynamically
  const categories = Array.from(new Set(
    blogPosts.flatMap(post => isAr ? [post.categoryAr] : [post.categoryEn])
  ));

  return (
    <div className={`bg-transparent min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-24 text-amber-50 ${isAr ? 'rtl font-arabic' : 'ltr'}`} dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <button 
              onClick={onBack}
              className={`group flex items-center gap-3 text-amber-100/85 hover:text-accent mb-8 font-bold uppercase tracking-[0.3em] text-[9px] transition-all cursor-pointer ${isAr ? 'flex-row-reverse' : ''}`}
            >
              <div className="w-8 h-8 rounded-full border border-accent/20 flex items-center justify-center group-hover:border-accent group-hover:bg-accent group-hover:text-primary transition-all">
                {isAr ? <ArrowRight className="w-3.5 h-3.5 text-accent group-hover:text-primary" /> : <ArrowLeft className="w-3.5 h-3.5 text-accent group-hover:text-primary" />}
              </div>
              {isAr ? "العودة للصفحة الرئيسية" : "Back to Home"}
            </button>
            
            <div className="card-shine border border-[#949693]/35 p-6 sm:p-8 rounded-[2.5rem] shadow-2xl">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#084C63]/30 border border-[#949693]/40 mb-3 ${isAr ? 'flex-row-reverse' : ''}`}>
                <h2 className="display text-[10px] font-extrabold uppercase tracking-[0.4em] text-amber-200">
                  {isAr ? "مركز المعرفة" : "Knowledge Hub"}
                </h2>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold display text-amber-50 leading-[1.1] tracking-tight">
                {isAr ? (
                  <>مدونة <span className="text-amber-200 italic font-semibold">المنارة</span> القرآنية</>
                ) : (
                  <>The Beacon <span className="text-amber-200 italic font-semibold">Digest</span></>
                )}
              </h1>
            </div>
          </div>
          
          {/* Search bar */}
          <div className="relative w-full md:w-96 group">
            <Search className={`absolute ${isAr ? 'right-6' : 'left-6'} top-1/2 -translate-y-1/2 w-5 h-5 text-amber-100/60 group-hover:text-accent transition-colors`} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isAr ? "ابحث عن الحكمة..." : "Search wisdom..."}
              className={`w-full ${isAr ? 'pr-16 pl-6' : 'pl-16 pr-6'} py-6 bg-black/30 backdrop-blur-md border border-accent/20 text-amber-50 placeholder:text-amber-100/60 rounded-[2rem] focus:border-accent focus:bg-black/50 outline-none transition-all shadow-xl`}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className={`absolute ${isAr ? 'left-6' : 'right-6'} top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors`}
              >
                <X className="w-4 h-4 text-amber-100/60" />
              </button>
            )}
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8 sm:gap-12">
          
          {/* Blog posts list */}
          <div className="lg:col-span-2 space-y-8 sm:space-y-12">
            {loading ? (
              <>
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
              </>
            ) : filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <motion.article 
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-black/20 backdrop-blur-md rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border border-[#757454]/40 hover:border-accent/70 hover:bg-black/40 transition-all hover:shadow-2xl group text-amber-50 cursor-pointer"
                  onClick={() => setSelectedPost(post)}
                >
                  <div className="grid md:grid-cols-5 h-full">
                    {/* Blog Image */}
                    <div className="md:col-span-2 overflow-hidden h-60 md:h-auto group-hover:brightness-110 transition-all duration-1000 relative">
                      <img 
                        src={post.image} 
                        alt={isAr ? post.titleAr : post.titleEn} 
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden" />
                    </div>
                    
                    {/* Blog Details */}
                    <div className="md:col-span-3 p-8 lg:p-10 flex flex-col justify-center">
                      <div className={`flex flex-wrap gap-4 items-center mb-5 ${isAr ? 'flex-row-reverse' : ''}`}>
                        <span className="px-3.5 py-1 bg-[#084C63]/60 rounded-full text-[9px] font-extrabold uppercase tracking-[0.15em] text-amber-200 border border-[#757454]/40 shadow-sm">
                          {isAr ? post.categoryAr : post.categoryEn}
                        </span>
                        <div className={`flex items-center gap-2 text-[9px] uppercase font-bold tracking-[0.2em] text-amber-100/75 ${isAr ? 'flex-row-reverse' : ''}`}>
                          <Calendar className="w-3.5 h-3.5 text-accent" />
                          <span>{post.date}</span>
                        </div>
                        <div className={`flex items-center gap-2 text-[9px] uppercase font-bold tracking-[0.2em] text-amber-100/75 ${isAr ? 'flex-row-reverse' : ''}`}>
                          <Clock className="w-3.5 h-3.5 text-accent" />
                          <span>{isAr ? post.readTimeAr : post.readTimeEn}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl lg:text-2xl font-bold display text-amber-50 mb-4 group-hover:text-accent transition-colors leading-[1.25] tracking-tight">
                        {isAr ? post.titleAr : post.titleEn}
                      </h3>
                      <p className="text-amber-100/80 text-sm leading-relaxed mb-6 line-clamp-3">
                        {isAr ? post.excerptAr : post.excerptEn}
                      </p>
                      
                      <div className={`flex justify-between items-center mt-auto pt-6 border-t border-white/10 ${isAr ? 'flex-row-reverse' : ''}`}>
                        <div className={`flex items-center gap-3.5 ${isAr ? 'flex-row-reverse' : ''}`}>
                          <div className="w-8 h-8 rounded-full bg-[#084C63]/60 border border-[#757454]/50 flex items-center justify-center text-amber-200 shrink-0">
                            <User className="w-4 h-4" />
                          </div>
                          <span className="display text-[9px] font-extrabold uppercase tracking-[0.2em] text-amber-200/90">{isAr ? post.authorAr : post.authorEn}</span>
                        </div>
                        <button 
                          className={`display text-[9px] font-extrabold uppercase tracking-[0.25em] text-accent flex items-center gap-2 group-hover:gap-4 transition-all ${isAr ? 'flex-row-reverse' : ''}`}
                        >
                          <span>{isAr ? "اقرأ المقال بالكامل" : "Read Full Article"}</span>
                          {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))
            ) : (
              <div className="text-center py-20 bg-black/10 rounded-[2.5rem] border border-white/5">
                <FileText className="w-16 h-16 text-amber-200/35 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-amber-50 mb-2">
                  {isAr ? "لم نجد أي مقال يطابق بحثك" : "No articles found"}
                </h3>
                <p className="text-sm text-amber-100/60 max-w-sm mx-auto">
                  {isAr ? "حاول استخدام كلمات رئيسية أخرى أو تصفح الأقسام الرئيسية." : "Try adjusting your search criteria or reset filters."}
                </p>
                <button 
                  onClick={() => { setSearchQuery(''); setSelectedCategory(null); }}
                  className="mt-6 px-6 py-2 bg-[#084C63] hover:bg-[#757454] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
                >
                  {isAr ? "عرض كل المقالات" : "Show All Articles"}
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8 sm:space-y-12">
            
            {/* Category Filter Widget */}
            <div className="bg-[#051b23]/80 backdrop-blur-md p-8 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] border border-[#757454]/45 text-amber-50">
               <h4 className={`text-lg font-bold display mb-6 text-accent ${isAr ? 'text-right' : ''}`}>
                 {isAr ? "تصنيفات المقالات" : "Popular Categories"}
               </h4>
               <div className="flex flex-wrap gap-2.5">
                 {/* All Category Button */}
                 <button
                   onClick={() => setSelectedCategory(null)}
                   className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                     selectedCategory === null 
                       ? 'bg-[#084C63] text-white border border-[#757454]' 
                       : 'bg-black/20 border border-white/10 hover:border-[#757454] text-amber-100/80'
                   }`}
                 >
                   {isAr ? "الكل" : "All Categories"}
                 </button>
                 
                 {categories.map(cat => (
                   <button 
                     key={cat} 
                     onClick={() => setSelectedCategory(cat)}
                     className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                       selectedCategory === cat 
                         ? 'bg-[#084C63] text-white border border-[#757454]' 
                         : 'bg-black/20 border border-white/10 hover:border-[#757454] text-amber-100/80'
                     }`}
                   >
                     {cat}
                   </button>
                 ))}
               </div>
            </div>

            {/* Newsletter widget */}
            <div className="bg-black/40 backdrop-blur-md text-amber-50 p-8 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] border border-[#757454]/40 shadow-2xl relative overflow-hidden">
               <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/arabic-overlay.png")' }}></div>
               <h4 className={`text-lg font-bold display mb-4 text-accent ${isAr ? 'text-right' : ''}`}>
                 {isAr ? "النشرة الإخبارية" : "Newsletter"}
               </h4>
               <p className={`text-amber-100/80 text-sm mb-6 leading-relaxed ${isAr ? 'text-right' : ''}`}>
                 {isAr ? "انضم لأكثر من ٥٠٠٠ مشترك للحصول على رؤى قرآنية وتحديثات أسبوعية." : "Join 5,000+ subscribers for weekly Quranic insights and institute updates."}
               </p>
               <input 
                 type="email" 
                 placeholder={isAr ? "بريدك الإلكتروني" : "your@email.com"}
                 className={`w-full px-4 py-4 bg-black/30 border border-white/10 text-amber-50 placeholder:text-amber-100/60 rounded-xl mb-4 focus:bg-black/50 focus:border-accent outline-none ${isAr ? 'text-right' : ''}`}
               />
               <button className="w-full bg-[#949693] hover:bg-white text-[#03171e] py-4 rounded-xl font-extrabold uppercase tracking-widest text-xs border border-[#757454] transition-all cursor-pointer">
                 {isAr ? "اشترك الآن" : "Subscribe Now"}
               </button>
            </div>
          </aside>
        </div>
      </div>

      {/* ── BEAUTIFUL DETAILS MODAL ── */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Modal Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-lg"
            />
            
            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-[#051b23] border-2 border-[#757454] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl relative z-10 text-amber-50"
            >
              {/* Modal Cover Image */}
              <div className="relative h-64 sm:h-80 md:h-96 w-full">
                <img 
                  src={selectedPost.image} 
                  alt={isAr ? selectedPost.titleAr : selectedPost.titleEn}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#051b23] via-[#051b23]/30 to-black/50" />
                
                {/* Floating category */}
                <div className={`absolute top-6 ${isAr ? 'right-6' : 'left-6'} bg-[#084C63] px-4 py-2 rounded-full border border-[#757454] text-xs font-bold text-amber-200 shadow-lg`}>
                  {isAr ? selectedPost.categoryAr : selectedPost.categoryEn}
                </div>

                {/* Close Button */}
                <button 
                  onClick={() => setSelectedPost(null)}
                  className={`absolute top-6 ${isAr ? 'left-6' : 'right-6'} p-3 rounded-full bg-black/60 hover:bg-accent border border-white/20 hover:border-accent text-white hover:text-[#03171e] transition-all cursor-pointer shadow-lg`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-8 sm:p-10 md:p-12">
                <div className={`flex flex-wrap gap-6 items-center mb-8 border-b border-white/10 pb-6 text-sm text-amber-100/75 ${isAr ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-center gap-2.5 ${isAr ? 'flex-row-reverse' : ''}`}>
                    <Calendar className="w-4 h-4 text-accent" />
                    <span>{selectedPost.date}</span>
                  </div>
                  <div className={`flex items-center gap-2.5 ${isAr ? 'flex-row-reverse' : ''}`}>
                    <Clock className="w-4 h-4 text-accent" />
                    <span>{isAr ? selectedPost.readTimeAr : selectedPost.readTimeEn}</span>
                  </div>
                  <div className={`flex items-center gap-2.5 ${isAr ? 'flex-row-reverse' : ''}`}>
                    <User className="w-4 h-4 text-accent" />
                    <span className="font-semibold text-amber-200">{isAr ? selectedPost.authorAr : selectedPost.authorEn}</span>
                  </div>
                </div>

                {/* Main Article Title */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold display text-amber-50 mb-8 leading-tight">
                  {isAr ? selectedPost.titleAr : selectedPost.titleEn}
                </h2>

                {/* Article Content */}
                <div className={`text-base sm:text-lg text-amber-100/90 leading-relaxed space-y-6 ${isAr ? 'text-right' : 'text-left'}`}>
                  {(isAr ? selectedPost.contentAr : selectedPost.contentEn)
                    .split('\n\n')
                    .map((paragraph, pIdx) => {
                      if (paragraph.startsWith('###')) {
                        return (
                          <h4 key={pIdx} className="text-xl sm:text-2xl font-bold display text-amber-200 mt-8 mb-4">
                            {paragraph.replace('###', '').trim()}
                          </h4>
                        );
                      }
                      if (paragraph.match(/^\d+\./) || paragraph.startsWith('-')) {
                        // Render lists
                        const items = paragraph.split('\n');
                        return (
                          <ul key={pIdx} className="list-disc pl-6 pr-6 space-y-3 my-4">
                            {items.map((item, iIdx) => (
                              <li key={iIdx} className="font-medium text-amber-100/95">
                                {item.replace(/^(\d+\.|-)\s*\*\*(.*?)\*\*:/, (_, __, title) => `**${title}**:`)
                                  .replace(/^(\d+\.|-)\s*/, '')}
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      return (
                        <p key={pIdx} className="font-medium">
                          {paragraph}
                        </p>
                      );
                    })}
                </div>

                {/* Bottom Close Button */}
                <div className="flex justify-center border-t border-white/10 pt-10 mt-12">
                  <button 
                    onClick={() => setSelectedPost(null)}
                    className="bg-[#084C63] hover:bg-[#757454] border border-amber-300/30 text-white font-extrabold uppercase tracking-widest text-xs px-8 py-4 rounded-full transition-all cursor-pointer shadow-lg flex items-center gap-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>{isAr ? "إغلاق المقال" : "Done Reading"}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
