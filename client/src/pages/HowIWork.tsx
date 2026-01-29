/*
 * DESIGN: Celestial Observatory Dashboard
 * How I Work page featuring:
 * - Step framework with scroll tracker
 * - Orbital progress indicators
 * - Glass-morphism cards
 */

import { motion } from "framer-motion";
import { Target, Users, Globe, Layers, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Target,
    title: "Business Goals → KPIs",
    body: "Defining success upfront so content supports the franchise, not just the moment.",
  },
  {
    icon: Users,
    title: "Audience & Cultural Insight",
    body: "Understanding fandom dynamics, community norms, and what not to do is as important as creative inspiration.",
  },
  {
    icon: Globe,
    title: "Platform Strategy",
    body: "Each platform plays a different role — from hype generation to conversation to long-tail engagement.",
  },
  {
    icon: Layers,
    title: "Creative Frameworks",
    body: "Formats built to be repeatable, remixable, and respectful of canon and community expectations.",
  },
  {
    icon: TrendingUp,
    title: "Measurement & Optimization",
    body: "Performance signals distinguish short-term buzz from sustained fandom momentum.",
  },
];

export default function HowIWork() {
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
              SYSTEMS &gt; POSTS
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F3EDF7] mb-6 leading-tight font-['Space_Grotesk']">
              How I Work
            </h1>
            <p className="text-lg lg:text-xl text-[#E6C7F2] leading-relaxed">
              A repeatable strategy loop that keeps content authentic for fans, scalable for teams, and measurable for leaders.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Framework Section */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-[#F3EDF7] mb-4 font-['Space_Grotesk']">
              How I Build Content That Scales — Without Breaking the Fandom
            </h2>
          </motion.div>

          {/* Steps Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#F06AD8] via-[#C44BC1] to-[#4A1E5F] transform lg:-translate-x-1/2" />

            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative flex items-start gap-6 lg:gap-12 mb-12 last:mb-0 ${
                  i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Step number/icon */}
                <div className="absolute left-0 lg:left-1/2 transform lg:-translate-x-1/2 z-10">
                  <div className="w-16 h-16 rounded-full bg-[#15001E] border-2 border-[#C44BC1] flex items-center justify-center glow-breathe">
                    <step.icon className="w-6 h-6 text-[#F06AD8]" />
                  </div>
                </div>

                {/* Content card */}
                <div className={`ml-24 lg:ml-0 lg:w-[calc(50%-4rem)] ${i % 2 === 0 ? "lg:pr-8" : "lg:pl-8"}`}>
                  <div className="glass-card rounded-xl p-6 hover:border-[#C44BC1]/40 transition-all">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-['Orbitron'] uppercase tracking-wider text-[#F06AD8]">
                        Step {i + 1}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-[#F3EDF7] mb-3 font-['Space_Grotesk']">
                      {step.title}
                    </h3>
                    <p className="text-[#E6C7F2]/80 leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden lg:block lg:w-[calc(50%-4rem)]" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Summary Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-transparent via-[#2B0F3A]/30 to-transparent">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-2xl p-8 lg:p-12 max-w-3xl mx-auto text-center"
          >
            <h3 className="text-2xl font-bold text-[#F3EDF7] mb-4 font-['Space_Grotesk']">
              The Result?
            </h3>
            <p className="text-[#E6C7F2] text-lg leading-relaxed">
              Content that resonates with communities, scales across platforms, and delivers measurable business impact — all while respecting the culture that makes fandoms special.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
