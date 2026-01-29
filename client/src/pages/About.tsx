/*
 * DESIGN: Celestial Observatory Dashboard
 * About page featuring:
 * - Two-column bio layout
 * - Resume download card
 * - Avatar with cosmic effects
 */

import { motion } from "framer-motion";
import { Download, FileText } from "lucide-react";
import { toast } from "sonner";

export default function About() {
  const handleResumeDownload = () => {
    toast.info("Resume download coming soon! Please contact Galina directly for her resume.");
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="py-20 lg:py-28 relative">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('/images/constellation-pattern.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="hud-label text-[#F06AD8] mb-4">
              THE PLAYER BEHIND THE STRATEGY
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F3EDF7] mb-6 leading-tight font-['Space_Grotesk']">
              About
            </h1>
            <p className="text-lg lg:text-xl text-[#E6C7F2] leading-relaxed">
              Senior strategy leadership for fandom-driven brands — built on storytelling, measurement, and respect for the audience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Resume Download Card */}
      <section className="py-8 lg:py-12">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-xl p-6 lg:p-8 max-w-xl"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#F06AD8]/20 to-[#C44BC1]/20 flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-[#F06AD8]" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#F3EDF7] mb-2 font-['Space_Grotesk']">
                  Download Resume
                </h3>
                <p className="text-[#E6C7F2]/80 text-sm mb-4">
                  Want the formal version? Grab my resume here.
                </p>
                <button
                  onClick={handleResumeDownload}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg btn-outline-magenta text-sm font-semibold"
                >
                  <Download className="w-4 h-4" />
                  Download Resume (PDF)
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            {/* Avatar Column */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 flex justify-center lg:justify-start"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#F06AD8]/20 to-[#C44BC1]/20 blur-2xl scale-110" />
                <img
                  src="/images/avatar-galina.svg"
                  alt="Galina Rodriguez"
                  loading="lazy"
                  className="relative w-64 lg:w-full max-w-sm rounded-2xl"
                />
                {/* Orbital decorations */}
                <div className="absolute -inset-4 border border-[#C44BC1]/20 rounded-2xl" />
              </div>
            </motion.div>

            {/* Bio Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-3"
            >
              {/* Lead */}
              <p className="text-xl lg:text-2xl text-[#F3EDF7] font-medium mb-8 leading-relaxed font-['Space_Grotesk']">
                Content only works when it changes behavior — and in fandom spaces, trust is everything.
              </p>

              {/* Body */}
              <div className="space-y-6 text-[#E6C7F2] leading-relaxed">
                <p>
                  I'm a senior content and social strategy leader with over 15 years of experience building content systems for gaming, entertainment, and culture-driven brands. I specialize in high-expectation fandom environments where audiences are vocal, invested, and deeply knowledgeable.
                </p>
                <p>
                  My work connect strategy, creative execution, and measurement — designing repeatable frameworks that scale across platforms and give teams clarity in fast-moving moments.
                </p>
                <p>
                  I've partnered with brand, creative, product, and analytics teams — both agency-side and in-house — to support launches, live-service moments, creator ecosystems, and ongoing community engagement.
                </p>
                <p>
                  Outside of work, I'm a lifelong gamer, coffee-fueled strategist, and firm believer that the best campaigns start with understanding the audience before you speak to them.
                </p>
              </div>

              {/* Stats chips */}
              <div className="flex flex-wrap gap-3 mt-8">
                <span className="px-4 py-2 rounded-full text-sm font-medium bg-[#2B0F3A]/80 text-[#E6C7F2] border border-[#C44BC1]/30">
                  15+ Years Experience
                </span>
                <span className="px-4 py-2 rounded-full text-sm font-medium bg-[#2B0F3A]/80 text-[#E6C7F2] border border-[#C44BC1]/30">
                  Gaming & Entertainment
                </span>
                <span className="px-4 py-2 rounded-full text-sm font-medium bg-[#2B0F3A]/80 text-[#E6C7F2] border border-[#C44BC1]/30">
                  Global Fandoms
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
