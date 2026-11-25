import { motion } from 'motion/react';
import { User, ArrowLeft, ArrowRight, Search, X, Clock, FileText } from 'lucide-react';
import { useState, useEffect } from 'react';
import { blogPosts, BlogPost } from '../data/blogData';
import { Reveal } from './ui/Reveal';
import Breadcrumbs from './Breadcrumbs';
import { renderMarkdown } from '../utils/renderMarkdown';

function BlogSkeleton() {
  return (
    <div className="bg-[#FFFFFF] rounded-3xl overflow-hidden border border-[#C9D9E8] p-0 animate-pulse">
      <div className="grid md:grid-cols-5 h-full">
        <div className="md:col-span-2 bg-[#EAF1F7] h-64 md:h-auto"></div>
        <div className="md:col-span-3 p-8 lg:p-12 space-y-6">
          <div className="flex gap-4">
            <div className="h-6 w-20 bg-[#EAF1F7] rounded-full"></div>
            <div className="h-6 w-24 bg-[#EAF1F7] rounded-full"></div>
          </div>
          <div className="h-10 w-full bg-[#EAF1F7] rounded-xl"></div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-[#EAF1F7] rounded"></div>
            <div className="h-4 w-3/4 bg-[#EAF1F7] rounded"></div>
          </div>
          <div className="pt-6 border-t border-[#D7E3EE] flex justify-between">
            <div className="h-4 w-24 bg-[#EAF1F7] rounded"></div>
            <div className="h-4 w-16 bg-[#EAF1F7] rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Full-article view ──────────────────────────────────────────────────────
// A post lives at its own real URL (/blog/<slug>); App passes the slug in
// as initialPostSlug. Closing returns to the /blog listing via a real link.
function BlogPostView({ post }: { post: BlogPost }) {
  return (
    <div className="bg-[#FFFFFF] min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-24 text-[#0B2E3A]" dir="ltr">
      <div className="max-w-[860px] mx-auto px-6">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Blog', href: '/blog' },
            { name: post.titleEn },
          ]}
        />

        <a
          href="/blog"
          className="group flex items-center gap-3 text-[#3D5563] hover:text-[#004050] mb-8 font-bold uppercase tracking-[0.3em] text-[9px] transition-all"
        >
          <div className="w-8 h-8 rounded-full border border-[#C9D9E8] flex items-center justify-center group-hover:border-[#004050] group-hover:bg-[#004050] transition-all">
            <ArrowLeft className="w-3.5 h-3.5 text-[#004050] group-hover:text-white" />
          </div>
          Back to Blog
        </a>

        {/* Cover image */}
        <div className="relative h-64 sm:h-80 md:h-96 w-full rounded-3xl overflow-hidden border border-[#C9D9E8] mb-10">
          <img
            src={post.image}
            alt={post.titleEn}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-6 left-6 bg-[#004050] px-4 py-2 rounded-full text-xs font-bold text-white shadow-lg">
            {post.categoryEn}
          </div>
        </div>

        {/* Meta: read time + author. No date — posts are undated by design
            (real publication dates are unknown). */}
        <div className="flex flex-wrap gap-6 items-center mb-6 text-sm text-[#3D5563]">
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-[#7A7A50]" />
            <span>{post.readTimeEn}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <User className="w-4 h-4 text-[#7A7A50]" />
            <span className="font-semibold text-[#004050]">{post.authorEn}</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-[#0B2E3A] mb-10 leading-tight">
          {post.titleEn}
        </h1>

        {/* Article Content — rendered from Markdown (bold, italics,
            headings, lists, links) instead of raw ** markers. */}
        <div className="text-base sm:text-lg text-[#3D5563] leading-relaxed space-y-6 text-left">
          {renderMarkdown(post.contentEn)}
        </div>

        {/* Bottom actions */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 border-t border-[#D7E3EE] pt-10 mt-12">
          <a
            href="/blog"
            className="bg-[#004050] hover:bg-[#7A7A50] text-white font-extrabold uppercase tracking-widest text-xs px-8 py-4 rounded-full transition-all shadow-lg flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blog</span>
          </a>
          <a
            href="/enrol"
            className="border border-[#004050] text-[#004050] hover:bg-[#EAF1F7] font-extrabold uppercase tracking-widest text-xs px-8 py-4 rounded-full transition-all flex items-center gap-2"
          >
            <span>Book a Free Trial</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Blog({
  onBack,
  initialPostSlug,
}: {
  onBack: () => void;
  /** Slug from /blog/<slug> (App holds it, like selectedCourseId). */
  initialPostSlug?: string | null;
}) {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(timer);
  }, []);

  // A deep link (/blog/<slug>) renders the full article; an unknown slug
  // falls back to the listing instead of a blank page.
  const selectedPost = initialPostSlug
    ? blogPosts.find((p) => p.slug === initialPostSlug) ?? null
    : null;
  if (selectedPost) return <BlogPostView post={selectedPost} />;

  // Filter posts based on search query and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory
      ? (post.categoryEn === selectedCategory)
      : true;

    const query = searchQuery.toLowerCase();
    const matchesSearch =
      post.titleEn.toLowerCase().includes(query) ||
      post.excerptEn.toLowerCase().includes(query) ||
      post.contentEn.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  // Extract unique categories dynamically
  const categories = Array.from(new Set(
    blogPosts.flatMap(post => [post.categoryEn])
  ));

  return (
    <div className="bg-[#FFFFFF] min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-24 text-[#0B2E3A]" dir="ltr">
      <div className="max-w-[1280px] mx-auto px-6">
        <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Blog' }]} />

        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <button
              onClick={onBack}
              className="group flex items-center gap-3 text-[#3D5563] hover:text-[#004050] mb-8 font-bold uppercase tracking-[0.3em] text-[9px] transition-all cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full border border-[#C9D9E8] flex items-center justify-center group-hover:border-[#004050] group-hover:bg-[#004050] transition-all">
                <ArrowLeft className="w-3.5 h-3.5 text-[#004050] group-hover:text-white" />
              </div>
              Back to Home
            </button>

            <div className="bg-[#FFFFFF] border border-[#C9D9E8] p-6 sm:p-8 rounded-3xl shadow-[0_10px_30px_rgba(11,46,58,0.06)] relative overflow-hidden">
              {/* Batch 15: dots, top-right of the blog header card */}
              <div
                aria-hidden="true"
                className="dots-texture pointer-events-none absolute right-[-10px] top-[-8px] w-[130px] h-[80px] opacity-45"
              />
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF1F7] border border-[#C9D9E8] mb-3 relative">
                <h2 className="text-[10px] font-extrabold uppercase tracking-[0.4em] text-[#004050]">
                  Knowledge Hub
                </h2>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-[#0B2E3A] leading-[1.1] tracking-tight">
                The Beacon{' '}<span className="text-[#7A7A50] italic font-semibold">Digest</span>
              </h1>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#3D5563]/60 group-hover:text-[#004050] transition-colors" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search wisdom..."
              className="w-full pl-16 pr-6 py-6 bg-[#FFFFFF] border border-[#C9D9E8] text-[#0B2E3A] placeholder:text-[#3D5563]/60 rounded-3xl focus:border-[#004050] focus:bg-[#FFFFFF] outline-none transition-all shadow-[0_10px_30px_rgba(11,46,58,0.05)]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-1 hover:bg-[#EAF1F7] rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-[#3D5563]/60" />
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
                <motion.a
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="block bg-[#FFFFFF] rounded-3xl overflow-hidden border border-[#C9D9E8] hover:border-[#004050]/50 hover:shadow-[0_16px_40px_rgba(11,46,58,0.08)] transition-all group text-[#0B2E3A] cursor-pointer"
                >
                  <div className="grid md:grid-cols-5 h-full">
                    {/* Blog Image */}
                    <div className="md:col-span-2 overflow-hidden h-60 md:h-auto group-hover:brightness-110 transition-all duration-1000 relative">
                      <img
                        src={post.image}
                        alt={post.titleEn}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:hidden" />
                    </div>

                    {/* Blog Details */}
                    <div className="md:col-span-3 p-8 lg:p-10 flex flex-col justify-center">
                      <div className="flex flex-wrap gap-4 items-center mb-5">
                        <span className="px-3.5 py-1 bg-[#EAF1F7] rounded-full text-[9px] font-extrabold uppercase tracking-[0.15em] text-[#004050] border border-[#C9D9E8] shadow-sm">
                          {post.categoryEn}
                        </span>
                        <div className="flex items-center gap-2 text-[9px] uppercase font-bold tracking-[0.2em] text-[#3D5563]">
                          <Clock className="w-3.5 h-3.5 text-[#7A7A50]" />
                          <span>{post.readTimeEn}</span>
                        </div>
                      </div>

                      <h3 className="text-xl lg:text-2xl font-bold font-display text-[#0B2E3A] mb-4 group-hover:text-[#004050] transition-colors leading-[1.25] tracking-tight">
                        {post.titleEn}
                      </h3>
                      <p className="text-[#3D5563] text-sm leading-relaxed mb-6 line-clamp-3">
                        {post.excerptEn}
                      </p>

                      <div className="flex justify-between items-center mt-auto pt-6 border-t border-[#D7E3EE]">
                        <div className="flex items-center gap-3.5">
                          <div className="w-8 h-8 rounded-full bg-[#EAF1F7] border border-[#C9D9E8] flex items-center justify-center text-[#004050] shrink-0">
                            <User className="w-4 h-4" />
                          </div>
                          <span className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#004050]">{post.authorEn}</span>
                        </div>
                        <span
                          className="text-[9px] font-extrabold uppercase tracking-[0.25em] text-[#7A7A50] flex items-center gap-2 group-hover:gap-4 transition-all"
                        >
                          <span>Read Full Article</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))
            ) : (
              <div className="text-center py-20 bg-[#F4F8FB] rounded-3xl border border-[#D7E3EE]">
                <FileText className="w-16 h-16 text-[#004050]/35 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#0B2E3A] mb-2">
                  No articles found
                </h3>
                <p className="text-sm text-[#3D5563] max-w-sm mx-auto">
                  Try adjusting your search criteria or reset filters.
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory(null); }}
                  className="mt-6 px-6 py-2 bg-[#004050] hover:bg-[#7A7A50] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                >
                  Show All Articles
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8 sm:space-y-12">

            {/* Category Filter Widget */}
            <div className="bg-[#FFFFFF] p-8 sm:p-10 rounded-3xl border border-[#C9D9E8] text-[#0B2E3A] shadow-[0_10px_30px_rgba(11,46,58,0.05)]">
               <h4 className="text-lg font-bold mb-6 text-[#004050]">
                 Popular Categories
               </h4>
               <div className="flex flex-wrap gap-2.5">
                 {/* All Category Button */}
                 <button
                   onClick={() => setSelectedCategory(null)}
                   className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer border ${
                     selectedCategory === null
                       ? 'bg-[#004050] text-white border-[#004050]'
                       : 'bg-[#FFFFFF] border-[#C9D9E8] hover:border-[#004050] text-[#3D5563]'
                   }`}
                 >
                   All Categories
                 </button>

                 {categories.map(cat => (
                   <button
                     key={cat}
                     onClick={() => setSelectedCategory(cat)}
                     className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer border ${
                       selectedCategory === cat
                         ? 'bg-[#004050] text-white border-[#004050]'
                         : 'bg-[#FFFFFF] border-[#C9D9E8] hover:border-[#004050] text-[#3D5563]'
                     }`}
                   >
                     {cat}
                   </button>
                 ))}
               </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
