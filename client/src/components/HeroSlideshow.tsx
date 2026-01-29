/**
 * HERO SLIDESHOW COMPONENT
 * 
 * Full-viewport slideshow with campaign and game assets
 * Features:
 * - Crossfade transitions between slides
 * - Slide labels with campaign info
 * - Scroll cue indicator
 * - Metric overlay on specific slide
 * - Mobile swipe support
 */

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

// ============================================
// SLIDE DATA
// ============================================
interface Slide {
  id: number;
  image: string;
  label: string;
  showMetric?: boolean;
}

const slides: Slide[] = [
  {
    id: 1,
    image: "/images/hero-slideshow/fortnite-1.jpg",
    label: "Fortnite • Global Launch",
  },
  {
    id: 2,
    image: "/images/hero-slideshow/fortnite-2.jpg",
    label: "Epic Games • Live Service Campaign",
  },
  {
    id: 3,
    image: "/images/hero-slideshow/fortnite-3.jpg",
    label: "Creator Ecosystem • Social-First Rollout",
    showMetric: true,
  },
  {
    id: 4,
    image: "/images/hero-slideshow/warcraft-rumble.jpg",
    label: "Warcraft Rumble • Launch Strategy",
  },
];

// ============================================
// HERO SLIDESHOW COMPONENT
// ============================================
export default function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isWordCyclePaused, setIsWordCyclePaused] = useState(false);
  const [isHeroInView, setIsHeroInView] = useState(true);

  const dynamicWords = ["CARES", "COMMUNICATES", "MOVES", "SCALES"];

  // Auto-advance slides
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500); // 4.5 seconds per slide

    return () => clearInterval(interval);
  }, [isPaused]);

  // Auto-cycle dynamic words
  useEffect(() => {
    if (isWordCyclePaused) return;

    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % dynamicWords.length);
    }, 1750); // 1.75 seconds per word

    return () => clearInterval(interval);
  }, [isWordCyclePaused, dynamicWords.length]);

  // Track hero visibility for pause-on-scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroInView(entry.isIntersecting && entry.intersectionRatio > 0.5);
      },
      { threshold: [0.5] }
    );

    const heroElement = document.getElementById('home');
    if (heroElement) {
      observer.observe(heroElement);
    }

    return () => observer.disconnect();
  }, []);

  // Pause word cycle when hero is not in view
  useEffect(() => {
    setIsWordCyclePaused(!isHeroInView);
  }, [isHeroInView]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSwipe = useCallback((direction: 'left' | 'right') => {
    if (direction === 'left') {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    } else {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }
  }, []);

  return (
    <section 
      id="home" 
      className="relative h-screen overflow-hidden bg-[#0A0012]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slideshow Background */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('${slides[currentSlide].image}')`,
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0012]/60 via-[#0A0012]/30 to-[#0A0012]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0012]/50 via-transparent to-[#0A0012]/50" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 md:px-10 lg:px-16">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-center mb-8 max-w-[1000px]"
          onMouseEnter={() => setIsWordCyclePaused(true)}
          onMouseLeave={() => setIsWordCyclePaused(false)}
        >
          {/* Line 1: Static */}
          <div className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#F3EDF7] font-['Space_Grotesk'] uppercase editorial-caps leading-tight text-center">
            I CREATE CONTENT THAT
          </div>
          
          {/* Line 2: Dynamic word inline - no spacing */}
          <div className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-['Space_Grotesk'] uppercase editorial-caps leading-tight text-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentWordIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="inline-block bg-gradient-to-r from-[#F06AD8] to-[#C44BC1] bg-clip-text text-transparent"
              >
                {dynamicWords[currentWordIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Scroll Cue - Directly under headline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12"
        >
          <button
            onClick={() => scrollToSection('case-studies')}
            className="group flex flex-col items-center gap-2"
          >
            <span className="text-[#E6C7F2]/70 text-xs lg:text-sm uppercase tracking-wider font-['Space_Grotesk']">
              Scroll to Explore
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-8 h-8 rounded-full border-2 border-[#F06AD8]/50 flex items-center justify-center group-hover:border-[#F06AD8] transition-colors"
            >
              <ChevronDown className="w-4 h-4 text-[#F06AD8]" />
            </motion.div>
          </button>
        </motion.div>
      </div>

      {/* Slide Label - Bottom Left */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.6 }}
          className="absolute bottom-8 left-8 z-20 bg-[#15001E]/70 backdrop-blur-sm border border-[#C44BC1]/20 rounded-lg px-4 py-2"
        >
          <p className="text-[#E6C7F2]/90 text-xs lg:text-sm font-['Space_Grotesk'] font-medium">
            {slides[currentSlide].label}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Slide Indicators - Bottom Right */}
      <div className="absolute bottom-8 right-8 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-[#F06AD8] w-6"
                : "bg-[#E6C7F2]/30 hover:bg-[#E6C7F2]/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
