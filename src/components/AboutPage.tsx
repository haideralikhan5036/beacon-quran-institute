import { cloneElement, type ReactElement } from 'react';
import { Reveal } from './ui/Reveal';
import Breadcrumbs from './Breadcrumbs';
import {
  ArrowLeft, ArrowRight, Sparkles, Heart, Star, Shield,
  Users, Globe, BookOpen, Award, CheckCircle2,
  Target, Gem, GraduationCap
} from 'lucide-react';

export default function AboutPage({ onBack }: { onBack: () => void }) {
  const values = [
    {
      icon: <Heart className="w-8 h-8 text-[#7A7A50]" />,
      titleEn: "Ikhlas (Sincerity)",
      descEn: "Everything we do is purely for the sake of Allah. Our teachings, our methods, and our interactions are all guided by sincerity of intention.",
    },
    {
      icon: <Star className="w-8 h-8 text-[#7A7A50]" />,
      titleEn: "Itqan (Excellence)",
      descEn: "We pursue perfection in every recitation, every lesson, and every interaction. Mediocrity has no place in the service of Allah's Book.",
    },
    {
      icon: <Users className="w-8 h-8 text-[#7A7A50]" />,
      titleEn: "Rahmah (Compassion)",
      descEn: "We teach with mercy and patience, understanding that every student's journey is unique. No student is left behind.",
    },
    {
      icon: <Shield className="w-8 h-8 text-[#7A7A50]" />,
      titleEn: "Amanah (Trust)",
      descEn: "Parents entrust us with their most precious treasure — their children's spiritual growth. We honor this sacred trust with utmost responsibility.",
    }
  ];

  const stats = [
    { numEn: "10+", labelEn: "Years of Excellence", icon: <Award /> },
    { numEn: "30+", labelEn: "Countries Served", icon: <Globe /> },
    { numEn: "5000+", labelEn: "Students Graduated", icon: <GraduationCap /> },
    { numEn: "50+", labelEn: "Expert Tutors", icon: <BookOpen /> },
  ];

  const features = [
    "1-on-1 personalized classes",
    "Certified Ijazah-holding tutors",
    "Flexible scheduling",
    "Safe & secure learning environment",
    "Multi-lingual instruction (English, Arabic, Urdu)",
    "Monthly detailed progress reports",
  ];

  // Batch 15 (Halka + Mixed): the four value cards rotate through the
  // texture families.
  const VALUE_TEXTURES = ['dots-texture', 'streaks-texture', 'grid-texture', 'dots-texture-gold'];

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#0B2E3A] pt-24 pb-20 px-6" dir="ltr">
      <div className="max-w-[1280px] mx-auto">
        <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'About' }]} />
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#3D5563] hover:text-[#004050] transition-colors mb-12 group cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>

        {/* Hero Section */}
        <Reveal>
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0B2E3A] mb-6 font-display">
              About Beacon Quran Institute — Online Quran Academy
            </h1>
            <p className="text-xl md:text-2xl text-[#3D5563] max-w-3xl mx-auto">
              A Legacy of Divine Education Since 2015
            </p>
          </div>
        </Reveal>

        {/* Story & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <Reveal delay={0.1}>
            <div className="bg-[#FFFFFF] border border-[#C9D9E8] p-8 rounded-3xl h-full shadow-[0_10px_30px_rgba(11,46,58,0.05)] relative overflow-hidden">
              {/* Batch 15: dots, top-right of the Story card */}
              <div
                aria-hidden="true"
                className="dots-texture pointer-events-none absolute right-[-10px] top-[-8px] w-[130px] h-[80px] opacity-45"
              />
              <div className="flex items-center gap-4 mb-6 relative">
                <div className="bg-[#EAF1F7] border border-[#C9D9E8] p-3 rounded-xl">
                  <BookOpen className="w-6 h-6 text-[#004050]" />
                </div>
                <h2 className="text-2xl font-bold text-[#0B2E3A] font-display">
                  Our Story
                </h2>
              </div>
              <p className="text-[#3D5563] leading-relaxed text-lg">
                Beacon Quran Institute was founded in 2015 with a singular divine mission: to make authentic Quranic education accessible to every Muslim around the globe, regardless of their location, age, or schedule. What began as a small initiative with just a handful of dedicated students has now blossomed into a globally recognized institution serving learners in over 30 countries across 5 continents.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="bg-[#FFFFFF] border border-[#C9D9E8] p-8 rounded-3xl h-full shadow-[0_10px_30px_rgba(11,46,58,0.05)] relative overflow-hidden">
              {/* Batch 15: gold streaks, top-right of the Vision card */}
              <div
                aria-hidden="true"
                className="streaks-texture-gold pointer-events-none absolute right-[-10px] top-[-8px] w-[130px] h-[80px] opacity-45"
              />
              <div className="flex items-center gap-4 mb-6 relative">
                <div className="bg-[#EAF1F7] border border-[#C9D9E8] p-3 rounded-xl">
                  <Target className="w-6 h-6 text-[#004050]" />
                </div>
                <h2 className="text-2xl font-bold text-[#0B2E3A] font-display">
                  Our Vision
                </h2>
              </div>
              <p className="text-[#3D5563] leading-relaxed text-lg">
                To become the world&apos;s most trusted and accessible online Quran learning platform, nurturing a generation of confident Quran reciters, memorizers, and scholars who carry the light of the Quran in their hearts and lives.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Values Section */}
        <div className="mb-24">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B2E3A] mb-4 font-display">
                Our Values
              </h2>
              <div className="w-24 h-1 bg-[#004050] mx-auto rounded-full"></div>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="bg-[#FFFFFF] border border-[#C9D9E8] p-6 rounded-3xl hover:border-[#004050]/40 transition-colors group h-full shadow-[0_10px_30px_rgba(11,46,58,0.05)] relative overflow-hidden">
                  {/* Batch 15: texture family rotates per value card */}
                  <div
                    aria-hidden="true"
                    className={`${VALUE_TEXTURES[idx % VALUE_TEXTURES.length]} pointer-events-none absolute right-[-10px] bottom-[-8px] w-[110px] h-[70px] opacity-45`}
                  />
                  <div className="bg-[#EAF1F7] border border-[#C9D9E8] p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative">
                    {val.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#0B2E3A] mb-3">
                    {val.titleEn}
                  </h3>
                  <p className="text-[#3D5563]">
                    {val.descEn}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-24 bg-[#004050] p-8 md:p-12 rounded-3xl relative overflow-hidden shadow-[0_16px_40px_rgba(0,64,80,0.25)]">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Sparkles className="w-64 h-64 text-white" />
          </div>
          {/* Halftone dots, mockup CTA-band placement: white, bottom-left */}
          <div
            aria-hidden="true"
            className="dots-texture-white pointer-events-none absolute left-[-8px] bottom-[-8px] w-[170px] h-[100px] opacity-50"
          />
          {/* Batch 15: gold streaks, top-right of the stats band */}
          <div
            aria-hidden="true"
            className="streaks-texture-gold pointer-events-none absolute right-[-8px] top-[-8px] w-[170px] h-[100px] opacity-50"
          />
          <Reveal>
            <div className="text-center mb-12 relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display">
                Statistics &amp; Achievements
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
            {stats.map((stat, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="text-center">
                  <div className="flex justify-center text-white mb-4 opacity-80">
                    {cloneElement(stat.icon as ReactElement, { className: 'w-8 h-8' })}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {stat.numEn}
                  </div>
                  <div className="text-white/85 font-medium">
                    {stat.labelEn}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* What Makes Us Different */}
        <div className="mb-24">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B2E3A] mb-4 font-display">
                What Makes Us Different
              </h2>
              <div className="w-24 h-1 bg-[#004050] mx-auto rounded-full"></div>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="bg-[#FFFFFF] border border-[#C9D9E8] p-4 rounded-2xl flex items-center gap-4 shadow-[0_10px_30px_rgba(11,46,58,0.04)]">
                  <div className="bg-[#EAF1F7] border border-[#C9D9E8] p-2 rounded-full shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-[#004050]" />
                  </div>
                  <span className="text-[#3D5563]">
                    {feature}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Quote Section */}
        <Reveal>
          <div className="mb-24 text-center">
            <div className="bg-[#FFFFFF] border border-[#C9D9E8] p-12 rounded-3xl relative overflow-hidden shadow-[0_10px_30px_rgba(11,46,58,0.05)]">
              <Gem className="w-32 h-32 text-[#7A7A50]/10 absolute -top-8 -left-8" />
              <Gem className="w-32 h-32 text-[#7A7A50]/10 absolute -bottom-8 -right-8" />

              <blockquote className="text-2xl md:text-3xl text-[#0B2E3A] font-medium italic leading-relaxed mb-6 relative z-10">
                &quot;Indeed, We have made the Quran easy for remembrance, so is there any who will remember?&quot;
              </blockquote>
              <div className="text-[#7A7A50] font-bold text-lg relative z-10">
                — Surah Al-Qamar (54:17)
              </div>
            </div>
          </div>
        </Reveal>

        {/* CTA Section */}
        <Reveal>
          <div className="text-center border-t border-[#D7E3EE] pt-16">
            <h2 className="text-3xl font-bold text-[#0B2E3A] mb-8 font-display">
              Ready to Begin Your Quranic Journey?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onBack}
                className="bg-[#7A7A50] hover:bg-[#004050] text-white font-bold py-4 px-8 rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                Register Now
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={onBack}
                className="bg-[#FFFFFF] border border-[#C9D9E8] hover:bg-[#F4F8FB] text-[#004050] font-bold py-4 px-8 rounded-full transition-colors cursor-pointer"
              >
                Contact Us
              </button>
            </div>
          </div>
        </Reveal>

      </div>
    </div>
  );
}
