/*
 * DESIGN: Celestial Observatory Dashboard
 * Layout wrapper with fixed navigation, footer, and CTA band
 * - Glass-morphism navigation bar
 * - Anchor-based navigation for single-page layout
 * - Breathing glow on primary CTAs
 */

import { ReactNode, useState, useEffect } from "react";
import { Menu, X, Linkedin, Mail, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Starfield from "./Starfield";

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Wins", href: "#wins" },
  { label: "About", href: "#about" },
  { label: "Play", href: "#play" },
  { label: "Contact", href: "#contact", isButton: true },
];

export default function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.replace('#', ''));
      const scrollPosition = window.scrollY + 150; // Offset for header

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const sectionId = href.replace('#', '');
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for fixed header
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#15001E] text-[#F3EDF7] relative overflow-x-hidden">
      {/* Starfield Background */}
      {!reduceMotion && <Starfield />}
      
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-[#E6C7F2]/10">
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <button 
              onClick={() => scrollToSection('#home')} 
              className="flex items-center gap-2 group"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F06AD8] to-[#C44BC1] flex items-center justify-center glow-breathe">
                <span className="text-[#15001E] font-bold text-lg font-['Space_Grotesk']">G</span>
              </div>
              <span className="hidden md:block text-[#E6C7F2] font-['Space_Grotesk'] font-medium group-hover:text-[#F06AD8] transition-colors whitespace-nowrap">
                Galina Rodriguez
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2 flex-nowrap">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={item.isButton 
                    ? "px-4 py-2 rounded-lg text-sm font-medium bg-[#F06AD8] text-[#15001E] hover:bg-[#C44BC1] transition-all duration-300 whitespace-nowrap"
                    : `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                      activeSection === item.href.replace('#', '')
                        ? "text-[#F06AD8] bg-[#F06AD8]/10"
                        : "text-[#E6C7F2] hover:text-[#F06AD8] hover:bg-[#F06AD8]/5"
                    }`
                  }
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-3">
              {/* Social Icons - Desktop */}
              <div className="hidden md:flex items-center gap-2">
                <a
                  href="https://www.linkedin.com/in/galinarodriguez"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-[#E6C7F2] hover:text-[#F06AD8] hover:bg-[#F06AD8]/10 transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="mailto:socialgirlgalina@gmail.com"
                  className="p-2 rounded-lg text-[#E6C7F2] hover:text-[#F06AD8] hover:bg-[#F06AD8]/10 transition-all"
                  aria-label="Email"
                >
                  <Mail size={20} />
                </a>
              </div>

              {/* Contact CTA - Desktop */}
              <button
                onClick={() => scrollToSection('#contact')}
                className="hidden md:block px-5 py-2.5 rounded-lg btn-glow text-[#15001E] font-semibold text-sm"
              >
                Contact Me
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-[#E6C7F2] hover:bg-[#F06AD8]/10 transition-all"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden glass-card border-t border-[#E6C7F2]/10"
            >
              <div className="container py-4 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all ${
                      activeSection === item.href.replace('#', '')
                        ? "text-[#F06AD8] bg-[#F06AD8]/10"
                        : "text-[#E6C7F2] hover:text-[#F06AD8] hover:bg-[#F06AD8]/5"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <div className="pt-4 border-t border-[#E6C7F2]/10 flex gap-3">
                  <a
                    href="https://www.linkedin.com/in/galinarodriguez"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 rounded-lg text-center text-[#E6C7F2] bg-[#2B0F3A] hover:bg-[#4A1E5F] transition-all"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="mailto:socialgirlgalina@gmail.com"
                    className="flex-1 py-3 rounded-lg text-center text-[#E6C7F2] bg-[#2B0F3A] hover:bg-[#4A1E5F] transition-all"
                  >
                    Email
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="pt-16 lg:pt-20">{children}</main>

      {/* CTA Band - Above Footer */}
      <section 
        className="relative py-20 lg:py-28"
        style={{
          backgroundImage: "url('/images/cta-band-bg.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[#2B0F3A]/60 backdrop-blur-sm" />
        <div className="container relative z-10 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#F3EDF7] mb-4 font-['Space_Grotesk']">
            Let's Talk Strategy
          </h2>
          <p className="text-[#E6C7F2] text-lg max-w-2xl mx-auto mb-8">
            Whether you're launching a new IP, navigating a passionate community, or refining how performance is measured — I'd love to connect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('#contact')}
              className="px-8 py-4 rounded-lg btn-glow text-[#15001E] font-semibold text-base"
            >
              Contact Me
            </button>
            <a
              href="mailto:socialgirlgalina@gmail.com?subject=Meeting%20Request%20%2F%20Portfolio%20Inquiry&body=Hi%20Galina%2C%0A%0AI%E2%80%99d%20love%20to%20set%20up%20a%2020%E2%80%9330%20minute%20chat.%20Here%E2%80%99s%20my%20availability%3A%0A%0A-%20Option%201%3A%0A-%20Option%202%3A%0A-%20Option%203%3A%0A%0AContext%20%2F%20what%20I%E2%80%99d%20love%20to%20cover%3A%0A%0AThanks%21"
              className="px-8 py-4 rounded-lg btn-outline-magenta font-semibold text-base"
            >
              Email Me
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 lg:py-16 bg-gradient-to-b from-[#2B0F3A] to-[#15001E] border-t border-[#E6C7F2]/10">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F06AD8] to-[#C44BC1] flex items-center justify-center">
                  <span className="text-[#15001E] font-bold text-lg font-['Space_Grotesk']">G</span>
                </div>
                <span className="text-[#F3EDF7] font-['Space_Grotesk'] font-semibold text-lg">
                  Galina Rodriguez
                </span>
              </div>
              <p className="text-[#E6C7F2]/70 text-sm">
                Senior Content & Social Strategy Leader
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="hud-label text-[#F06AD8] mb-4">Navigation</h4>
              <div className="grid grid-cols-2 gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className="text-left text-[#E6C7F2]/70 hover:text-[#F06AD8] transition-colors text-sm py-1"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Settings & Social */}
            <div>
              <h4 className="hud-label text-[#F06AD8] mb-4">Connect</h4>
              <div className="flex gap-3 mb-6">
                <a
                  href="https://www.linkedin.com/in/galinarodriguez"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-[#2B0F3A] text-[#E6C7F2] hover:text-[#F06AD8] hover:bg-[#4A1E5F] transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="mailto:socialgirlgalina@gmail.com"
                  className="p-3 rounded-lg bg-[#2B0F3A] text-[#E6C7F2] hover:text-[#F06AD8] hover:bg-[#4A1E5F] transition-all"
                  aria-label="Email"
                >
                  <Mail size={20} />
                </a>
              </div>
              
              {/* Toggles */}
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={reduceMotion}
                    onChange={(e) => setReduceMotion(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-6 rounded-full bg-[#2B0F3A] peer-checked:bg-[#C44BC1] transition-colors relative">
                    <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-[#E6C7F2] peer-checked:translate-x-4 transition-transform" />
                  </div>
                  <span className="text-[#E6C7F2]/70 text-sm group-hover:text-[#E6C7F2] transition-colors">
                    Reduce Motion
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-[#E6C7F2]/10 text-center">
            <p className="text-[#E6C7F2]/50 text-sm">
              © 2026 Galina Rodriguez — Built with cosmic caffeine ☕✨
            </p>
          </div>
        </div>
      </footer>

      {/* Music Player - Floating */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setMusicEnabled(!musicEnabled)}
          className="p-3 rounded-full glass-card text-[#E6C7F2] hover:text-[#F06AD8] transition-all group"
          aria-label={musicEnabled ? "Mute music" : "Play music"}
          title="Audio player (tracks not loaded)"
        >
          {musicEnabled ? (
            <Volume2 size={20} className="group-hover:scale-110 transition-transform" />
          ) : (
            <VolumeX size={20} className="group-hover:scale-110 transition-transform" />
          )}
        </button>
      </div>
    </div>
  );
}
