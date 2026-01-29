/*
 * DESIGN: Celestial Observatory Dashboard
 * How I Win page featuring:
 * - HUD counters with animated values
 * - Impact highlights
 * - CTA block for meetings
 */

import { motion } from "framer-motion";
import { TrendingUp, Clock, Users, FileText } from "lucide-react";

const counters = [
  {
    icon: TrendingUp,
    label: "Impressions Influenced/Managed",
    value: "800B+",
  },
  {
    icon: Clock,
    label: "Years in Gaming & Entertainment",
    value: "15+",
  },
  {
    icon: Users,
    label: "Creators & Influencers Supported",
    value: "25,000+",
  },
  {
    icon: FileText,
    label: "Output",
    value: "Exec-ready reporting → decisions",
  },
];

export default function HowIWin() {
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
              OUTCOMES // PROOF
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F3EDF7] mb-6 leading-tight font-['Space_Grotesk']">
              How I Win
            </h1>
            <p className="text-lg lg:text-xl text-[#E6C7F2] leading-relaxed">
              Highlights, certifications, and the exact ways I help teams ship better work — faster, clearer, and with stronger results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Impact Counters Section */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-[#F3EDF7] mb-4 font-['Space_Grotesk']">
              Highlights & Impact
            </h2>
            <p className="text-[#E6C7F2] max-w-2xl mx-auto">
              When the stakes are high — major IP moments, creator waves, live-service drops — I bring structure, clarity, and momentum.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {counters.map((counter, i) => (
              <motion.div
                key={counter.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass-card rounded-xl p-6 text-center hover:border-[#C44BC1]/40 transition-all group"
              >
                {/* Icon */}
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#F06AD8]/20 to-[#C44BC1]/20 flex items-center justify-center mb-4 group-hover:from-[#F06AD8]/30 group-hover:to-[#C44BC1]/30 transition-all">
                  <counter.icon className="w-8 h-8 text-[#F06AD8]" />
                </div>
                
                {/* Value */}
                <div className="text-2xl lg:text-3xl font-bold text-[#F3EDF7] mb-2 font-['Space_Grotesk']">
                  {counter.value}
                </div>
                
                {/* Label */}
                <div className="text-sm text-[#E6C7F2]/70">
                  {counter.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-transparent via-[#2B0F3A]/30 to-transparent">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-2xl p-8 lg:p-12 max-w-2xl mx-auto text-center"
          >
            <h3 className="text-2xl lg:text-3xl font-bold text-[#F3EDF7] mb-4 font-['Space_Grotesk']">
              Want to chat?
            </h3>
            <p className="text-[#E6C7F2] text-lg mb-8">
              Shoot me an email with a couple time options and what you'd like to cover — I'll come prepared.
            </p>
            <a
              href="mailto:socialgirlgalina@gmail.com?subject=Meeting%20Request%20(20%E2%80%9330%20min)&body=Hi%20Galina%2C%0A%0AI%E2%80%99d%20love%20to%20set%20up%20a%2020%E2%80%9330%20minute%20chat.%0A%0AHere%E2%80%99s%20my%20availability%3A%0A-%20Option%201%3A%0A-%20Option%202%3A%0A-%20Option%203%3A%0A%0AContext%20%2F%20role%3A%0A%0AThanks%21"
              className="inline-block px-8 py-4 rounded-lg btn-glow text-[#15001E] font-semibold text-base"
            >
              Email Me to Book Time
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
