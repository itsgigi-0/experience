/*
 * DESIGN: Celestial Observatory Dashboard
 * Contact page featuring:
 * - Three-tile contact options (Email, LinkedIn, Meetings)
 * - Glass-morphism cards
 * - Mailto links with pre-filled templates
 */

import { motion } from "framer-motion";
import { Mail, Linkedin, Calendar } from "lucide-react";

const contactTiles = [
  {
    icon: Mail,
    title: "Email",
    body: "Best for intros, roles, and collaboration.",
    button: {
      label: "Email Me",
      href: "mailto:socialgirlgalina@gmail.com",
    },
  },
  {
    icon: Linkedin,
    title: "LinkedIn",
    body: "Best for recruiter outreach and quick networking.",
    button: {
      label: "Connect on LinkedIn",
      href: "https://www.linkedin.com/in/galinarodriguez",
    },
  },
  {
    icon: Calendar,
    title: "Meetings",
    body: "Send a couple time options and what you'd like to cover — I'll reply to confirm.",
    button: {
      label: "Email to Book Time",
      href: "mailto:socialgirlgalina@gmail.com?subject=Meeting%20Request%20(20%E2%80%9330%20min)&body=Hi%20Galina%2C%0A%0AI%E2%80%99d%20love%20to%20book%20a%2020%E2%80%9330%20minute%20meeting.%0A%0AAvailability%3A%0A-%20Option%201%3A%0A-%20Option%202%3A%0A-%20Option%203%3A%0A%0ATopic%20%2F%20context%3A%0A%0AThanks%21",
    },
  },
];

export default function Contact() {
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
              QUEUE UP A CHAT
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F3EDF7] mb-6 leading-tight font-['Space_Grotesk']">
              Contact
            </h1>
            <p className="text-lg lg:text-xl text-[#E6C7F2] leading-relaxed">
              Email or LinkedIn is perfect. If you want to meet, send a couple time options and I'll confirm.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Tiles Section */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {contactTiles.map((tile, i) => (
              <motion.div
                key={tile.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass-card rounded-xl p-6 lg:p-8 text-center hover:border-[#C44BC1]/40 transition-all group"
              >
                {/* Icon */}
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#F06AD8]/20 to-[#C44BC1]/20 flex items-center justify-center mb-6 group-hover:from-[#F06AD8]/30 group-hover:to-[#C44BC1]/30 transition-all">
                  <tile.icon className="w-8 h-8 text-[#F06AD8]" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-[#F3EDF7] mb-3 font-['Space_Grotesk']">
                  {tile.title}
                </h3>

                {/* Body */}
                <p className="text-[#E6C7F2]/80 text-sm mb-6 leading-relaxed">
                  {tile.body}
                </p>

                {/* Button */}
                <a
                  href={tile.button.href}
                  target={tile.title === "LinkedIn" ? "_blank" : undefined}
                  rel={tile.title === "LinkedIn" ? "noopener noreferrer" : undefined}
                  className="inline-block w-full px-6 py-3 rounded-lg btn-glow text-[#15001E] font-semibold text-sm"
                >
                  {tile.button.label}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-transparent via-[#2B0F3A]/30 to-transparent">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-2xl p-8 lg:p-12 max-w-3xl mx-auto"
          >
            <h3 className="text-2xl font-bold text-[#F3EDF7] mb-6 font-['Space_Grotesk'] text-center">
              What to Expect
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-[#F06AD8] font-semibold mb-2 font-['Space_Grotesk']">
                  Response Time
                </h4>
                <p className="text-[#E6C7F2]/80 text-sm">
                  I typically respond within 24-48 hours on business days.
                </p>
              </div>
              <div>
                <h4 className="text-[#F06AD8] font-semibold mb-2 font-['Space_Grotesk']">
                  Meeting Format
                </h4>
                <p className="text-[#E6C7F2]/80 text-sm">
                  20-30 minute video calls work best for initial conversations.
                </p>
              </div>
              <div>
                <h4 className="text-[#F06AD8] font-semibold mb-2 font-['Space_Grotesk']">
                  Best For
                </h4>
                <p className="text-[#E6C7F2]/80 text-sm">
                  Strategy consulting, full-time roles, speaking opportunities, and collaborations.
                </p>
              </div>
              <div>
                <h4 className="text-[#F06AD8] font-semibold mb-2 font-['Space_Grotesk']">
                  Location
                </h4>
                <p className="text-[#E6C7F2]/80 text-sm">
                  Open to remote work and select on-site opportunities.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
