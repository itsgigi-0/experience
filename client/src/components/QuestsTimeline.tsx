/*
 * DESIGN: Visual Resume Timeline - "Quests"
 * Space-themed career journey with astronaut scroll animation
 * 
 * Features:
 * - Vertical timeline with glowing cosmic path
 * - Astronaut that moves down the timeline as user scrolls
 * - 6 Career Orbits + 1 Parallel Orbit (SoCat Studios)
 * - Skills Constellation section
 * - Responsive design for mobile/desktop
 * - Respects prefers-reduced-motion
 */

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronDown, Briefcase, Award, Users, TrendingUp, Rocket, Star, Sparkles } from "lucide-react";

// ============================================
// ORBIT DATA - Career Timeline (Top to Bottom)
// ============================================

interface Position {
  company: string;
  title: string;
  period: string;
}

interface Orbit {
  id: string;
  name: string;
  subtitle: string;
  positions: Position[];
  visualMotif: string;
  astronautBehavior: string;
  color: string;
}

const orbits: Orbit[] = [
  {
    id: "orbit-1",
    name: "ORBIT 1",
    subtitle: "Intelligence & Scale (Current)",
    positions: [
      { company: "Epic Games", title: "Audience Development / Senior Social Media Analyst", period: "Jun 2025 – Present" }
    ],
    visualMotif: "Largest glowing planet / command center",
    astronautBehavior: "Controlled hover, leadership presence",
    color: "#F06AD8"
  },
  {
    id: "orbit-2",
    name: "ORBIT 2",
    subtitle: "Influencer, Copy & Content Operations",
    positions: [
      { company: "ILGM (Contract)", title: "Social Media & Influencer Marketing Manager", period: "May 2023 – Feb 2025" },
      { company: "Activision Blizzard (Contract)", title: "Social Copywriter", period: "May 2023 – Jan 2025" },
      { company: "Activision Blizzard", title: "Content Operations & Audience Development — World of Warcraft", period: "Jan 2025 – Apr 2025" }
    ],
    visualMotif: "Branded planetary outpost",
    astronautBehavior: "High-velocity, confident orbit",
    color: "#8B2FC9"
  },
  {
    id: "orbit-3",
    name: "ORBIT 3",
    subtitle: "Systems & Cross-Channel Strategy",
    positions: [
      { company: "House of Platinum", title: "Social Media Marketing Director", period: "Jun 2020 – Aug 2020" },
      { company: "DRIVN", title: "Marketing & Social Media Director", period: "Jun 2020 – Aug 2020" },
      { company: "Intraratio", title: "Marketing Strategist", period: "Oct 2020 – Mar 2022" }
    ],
    visualMotif: "Industrial command station",
    astronautBehavior: "Precise, system-oriented movement",
    color: "#9146FF"
  },
  {
    id: "orbit-4",
    name: "ORBIT 4",
    subtitle: "Gaming, Community & Growth",
    positions: [
      { company: "MGM Resorts (Contract)", title: "Social Media Strategist", period: "Jan 2018 – Jun 2018" },
      { company: "Robot Cache", title: "Social Media Manager", period: "Sep 2018 – Aug 2019" },
      { company: "SpineZone", title: "Social Media Marketing Manager", period: "Sep 2019 – May 2020" }
    ],
    visualMotif: "Multi-node orbital hub",
    astronautBehavior: "Faster traversal, active docking",
    color: "#F06AD8"
  },
  {
    id: "orbit-5",
    name: "ORBIT 5",
    subtitle: "Social & Brand Craft",
    positions: [
      { company: "Chewy", title: "Social Media Manager", period: "Aug 2014 – Mar 2016" },
      { company: "BodyJewelry.com", title: "Director of Digital Marketing", period: "Aug 2016 – Dec 2016" },
      { company: "Marketing Maven PR", title: "Social Media Specialist", period: "Feb 2017 – Jan 2018" }
    ],
    visualMotif: "Stabilized space station",
    astronautBehavior: "Steady, confident movement",
    color: "#C44BC1"
  },
  {
    id: "orbit-6",
    name: "ORBIT 6",
    subtitle: "Foundations & Technical Fluency",
    positions: [
      { company: "Paradym", title: "Technical Support / Social Media Coordinator", period: "May 2008 – Aug 2014" }
    ],
    visualMotif: "Launch pad / early satellite",
    astronautBehavior: "Exploratory drift",
    color: "#E6C7F2"
  }
];

const parallelOrbit = {
  id: "parallel",
  name: "PARALLEL ORBIT",
  subtitle: "SoCat Studios",
  company: "SoCat Studios",
  title: "Sr. Data Strategist / Creative Director (Founder)",
  period: "Aug 2016 – Present",
  description: "A continuous creative and data practice informing all primary roles.",
  color: "#C44BC1"
};

const skills = [
  "Growth Marketing",
  "Web & Landing Page Strategy",
  "Social Analytics",
  "Creative Direction",
  "Influencer Strategy",
  "Data Storytelling",
  "Cross-Functional Leadership"
];

// ============================================
// ORBIT CARD COMPONENT
// ============================================

function OrbitCard({ orbit, index, isExpanded, onToggle }: { 
  orbit: Orbit; 
  index: number; 
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const isLeft = index % 2 === 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`relative flex items-start gap-4 lg:gap-8 ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
    >
      {/* Timeline Node - Orbital Planet */}
      <div className="absolute left-0 lg:left-1/2 lg:-translate-x-1/2 z-10">
        <motion.div
          className="relative"
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Outer glow ring */}
          <div 
            className="absolute -inset-2 rounded-full opacity-30 animate-pulse"
            style={{ background: `radial-gradient(circle, ${orbit.color} 0%, transparent 70%)` }}
          />
          {/* Main node */}
          <div
            className="w-5 h-5 lg:w-6 lg:h-6 rounded-full border-2 relative"
            style={{ 
              borderColor: orbit.color,
              backgroundColor: isExpanded ? orbit.color : '#15001E',
              boxShadow: `0 0 25px ${orbit.color}60`
            }}
          >
            {/* Inner glow */}
            <div 
              className="absolute inset-1 rounded-full"
              style={{ background: `radial-gradient(circle, ${orbit.color}40 0%, transparent 100%)` }}
            />
          </div>
        </motion.div>
      </div>
      
      {/* Card */}
      <div className={`ml-10 lg:ml-0 lg:w-[calc(50%-2.5rem)] ${isLeft ? 'lg:pr-8' : 'lg:pl-8'}`}>
        <motion.div
          className="relative rounded-xl p-5 lg:p-6 cursor-pointer group overflow-hidden"
          onClick={onToggle}
          whileHover={{ scale: 1.02, y: -2 }}
          style={{ 
            background: 'linear-gradient(135deg, rgba(43, 15, 58, 0.8) 0%, rgba(21, 0, 30, 0.9) 100%)',
            border: `1px solid ${orbit.color}30`,
            boxShadow: `0 4px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 ${orbit.color}20`
          }}
        >
          {/* Subtle background pattern */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(${orbit.color} 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}
          />
          
          {/* Header */}
          <div className="relative z-10 flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span 
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: orbit.color }}
                >
                  {orbit.name}
                </span>
                <div 
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: orbit.color }}
                />
              </div>
              <h3 className="text-lg lg:text-xl font-bold text-[#F3EDF7] font-['Space_Grotesk'] mb-1">
                {orbit.subtitle}
              </h3>
              <p className="text-[#E6C7F2]/50 text-xs italic">
                {orbit.visualMotif}
              </p>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              className="p-2 rounded-lg bg-[#2B0F3A]/50 text-[#E6C7F2] group-hover:text-[#F06AD8] transition-colors"
            >
              <ChevronDown size={18} />
            </motion.div>
          </div>
          
          {/* Positions Preview (always visible) */}
          <div className="relative z-10 space-y-2 mb-2">
            {orbit.positions.slice(0, isExpanded ? orbit.positions.length : 1).map((position, i) => (
              <motion.div
                key={i}
                initial={i > 0 ? { opacity: 0, y: -10 } : {}}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3"
              >
                <Briefcase size={14} className="mt-1 flex-shrink-0" style={{ color: orbit.color }} />
                <div>
                  <p className="text-sm text-[#F3EDF7] font-medium">{position.title}</p>
                  <p className="text-xs text-[#E6C7F2]/60">{position.company} • {position.period}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Expanded Content */}
          <AnimatePresence>
            {isExpanded && orbit.positions.length > 1 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden relative z-10"
              >
                <div className="pt-3 border-t border-[#E6C7F2]/10 mt-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Rocket size={14} style={{ color: orbit.color }} />
                    <span className="text-xs text-[#E6C7F2]/50 italic">
                      Astronaut behavior: {orbit.astronautBehavior}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Show more indicator */}
          {!isExpanded && orbit.positions.length > 1 && (
            <p className="text-xs text-[#E6C7F2]/40 mt-2 relative z-10">
              +{orbit.positions.length - 1} more position{orbit.positions.length > 2 ? 's' : ''}
            </p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

// ============================================
// PARALLEL ORBIT COMPONENT
// ============================================

function ParallelOrbitCard({ isExpanded, onToggle }: { isExpanded: boolean; onToggle: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:w-64 mt-8 lg:mt-0"
    >
      {/* Connecting line to main timeline */}
      <div className="hidden lg:block absolute left-0 top-1/2 w-16 h-px bg-gradient-to-r from-transparent to-[#C44BC1]/30" style={{ transform: 'translateX(-100%)' }} />
      
      <motion.div
        className="relative rounded-xl p-4 cursor-pointer group"
        onClick={onToggle}
        whileHover={{ scale: 1.03 }}
        style={{ 
          background: 'linear-gradient(135deg, rgba(196, 75, 193, 0.1) 0%, rgba(21, 0, 30, 0.8) 100%)',
          border: '1px solid rgba(196, 75, 193, 0.2)',
        }}
      >
        {/* Subtle orbit animation */}
        <motion.div
          className="absolute -inset-1 rounded-xl opacity-20"
          animate={{ 
            boxShadow: [
              '0 0 20px rgba(196, 75, 193, 0.3)',
              '0 0 40px rgba(196, 75, 193, 0.1)',
              '0 0 20px rgba(196, 75, 193, 0.3)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-[#C44BC1] animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#C44BC1]/70">
              Parallel Orbit
            </span>
          </div>
          <h4 className="text-sm font-bold text-[#F3EDF7] font-['Space_Grotesk'] mb-1">
            {parallelOrbit.company}
          </h4>
          <p className="text-xs text-[#E6C7F2]/60 mb-2">{parallelOrbit.title}</p>
          <p className="text-[10px] text-[#E6C7F2]/40">{parallelOrbit.period}</p>
          
          <AnimatePresence>
            {isExpanded && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-xs text-[#E6C7F2]/50 italic mt-3 pt-3 border-t border-[#C44BC1]/20"
              >
                "{parallelOrbit.description}"
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============================================
// SKILLS CONSTELLATION
// ============================================

function SkillsConstellation() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-20 lg:mt-32"
    >
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles size={18} className="text-[#F06AD8]" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#F06AD8]">
            Skills Constellation
          </span>
          <Sparkles size={18} className="text-[#F06AD8]" />
        </div>
        <p className="text-[#E6C7F2]/60 text-sm max-w-md mx-auto">
          Core competencies developed across 15+ years of digital marketing and content strategy
        </p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-3 lg:gap-4 max-w-3xl mx-auto">
        {skills.map((skill, index) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, type: "spring" }}
            onHoverStart={() => setHoveredSkill(skill)}
            onHoverEnd={() => setHoveredSkill(null)}
            className="relative"
          >
            <motion.div
              className="px-4 py-2 lg:px-5 lg:py-3 rounded-full cursor-pointer relative overflow-hidden"
              whileHover={{ scale: 1.1 }}
              style={{
                background: hoveredSkill === skill 
                  ? 'linear-gradient(135deg, rgba(240, 106, 216, 0.3) 0%, rgba(139, 47, 201, 0.3) 100%)'
                  : 'rgba(43, 15, 58, 0.5)',
                border: `1px solid ${hoveredSkill === skill ? '#F06AD8' : 'rgba(230, 199, 242, 0.2)'}`,
                boxShadow: hoveredSkill === skill ? '0 0 30px rgba(240, 106, 216, 0.4)' : 'none'
              }}
            >
              {/* Star decoration */}
              <motion.div
                className="absolute -top-1 -right-1 w-2 h-2"
                animate={hoveredSkill === skill ? { 
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Star size={8} className="text-[#F06AD8]" fill="#F06AD8" />
              </motion.div>
              
              <span className={`text-sm lg:text-base font-medium font-['Space_Grotesk'] transition-colors ${
                hoveredSkill === skill ? 'text-[#F3EDF7]' : 'text-[#E6C7F2]/70'
              }`}>
                {skill}
              </span>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function QuestsTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedOrbit, setExpandedOrbit] = useState<string | null>(null);
  const [parallelExpanded, setParallelExpanded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  
  // Astronaut position along the timeline (respects reduced motion)
  const astronautY = useTransform(
    scrollYProgress, 
    [0, 1], 
    prefersReducedMotion ? ["50%", "50%"] : ["0%", "90%"]
  );
  const astronautRotate = useTransform(
    scrollYProgress, 
    [0, 0.25, 0.5, 0.75, 1], 
    prefersReducedMotion ? [0, 0, 0, 0, 0] : [0, 2, -1, 2, 0]
  );
  
  const toggleOrbit = (orbitId: string) => {
    setExpandedOrbit(expandedOrbit === orbitId ? null : orbitId);
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Timeline Line - Glowing Cosmic Path */}
      <div className="absolute left-2 lg:left-1/2 top-0 bottom-0 w-px lg:-translate-x-1/2">
        {/* Background line */}
        <div className="absolute inset-0 w-0.5 bg-gradient-to-b from-[#E6C7F2]/10 via-[#C44BC1]/20 to-[#F06AD8]/10" />
        
        {/* Progress line with glow */}
        <motion.div
          className="absolute top-0 left-0 right-0 w-0.5 bg-gradient-to-b from-[#E6C7F2] via-[#C44BC1] to-[#F06AD8]"
          style={{ 
            scaleY: scrollYProgress,
            transformOrigin: "top",
          }}
        />
        
        {/* Glow overlay */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-4 bg-gradient-to-b from-[#F06AD8]/50 via-[#C44BC1]/30 to-transparent blur-sm"
          style={{ 
            scaleY: scrollYProgress,
            transformOrigin: "top",
            height: '100%'
          }}
        />
      </div>
      
      {/* Floating Astronaut */}
      <motion.div
        className="hidden lg:block absolute left-1/2 -translate-x-1/2 z-20 pointer-events-none"
        style={{ 
          top: astronautY,
          rotate: astronautRotate
        }}
      >
        <motion.div
          animate={prefersReducedMotion ? {} : { 
            y: [0, -8, 0],
            x: [-3, 3, -3]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative"
        >
          {/* Tether line to timeline */}
          <div 
            className="absolute left-1/2 top-1/2 w-8 h-px bg-gradient-to-r from-[#F06AD8]/60 to-transparent"
            style={{ transform: 'translateX(-100%) translateY(-50%)' }}
          />
          
          <img 
            src="/images/astronaut-cartoon.png" 
            alt="Astronaut explorer navigating career journey"
            loading="lazy"
            className="w-20 h-auto drop-shadow-[0_0_25px_rgba(240,106,216,0.6)]"
          />
          
          {/* Halo glow effect */}
          <motion.div 
            className="absolute inset-0 rounded-full"
            animate={prefersReducedMotion ? {} : {
              boxShadow: [
                '0 0 30px rgba(240, 106, 216, 0.3)',
                '0 0 50px rgba(240, 106, 216, 0.5)',
                '0 0 30px rgba(240, 106, 216, 0.3)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
      
      {/* Parallel Orbit - SoCat Studios */}
      <ParallelOrbitCard 
        isExpanded={parallelExpanded} 
        onToggle={() => setParallelExpanded(!parallelExpanded)} 
      />
      
      {/* Orbit Cards */}
      <div className="space-y-10 lg:space-y-16 pl-6 lg:pl-0">
        {orbits.map((orbit, index) => (
          <OrbitCard
            key={orbit.id}
            orbit={orbit}
            index={index}
            isExpanded={expandedOrbit === orbit.id}
            onToggle={() => toggleOrbit(orbit.id)}
          />
        ))}
      </div>
      
      {/* End marker removed */}      
      {/* Skills Constellation */}
      <SkillsConstellation />
      
      {/* Footer - End of Journey */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-16 lg:mt-24 pt-8 border-t border-[#E6C7F2]/10"
      >
        <p className="text-[#E6C7F2]/60 text-sm lg:text-base italic max-w-lg mx-auto">
          "Exploring what's next in growth, storytelling, and digital experiences."
        </p>
        <div className="flex items-center justify-center gap-6 mt-6">
          <a 
            href="#case-studies" 
            className="text-xs uppercase tracking-wider text-[#F06AD8] hover:text-[#F3EDF7] transition-colors"
          >
            Portfolio
          </a>
          <span className="text-[#E6C7F2]/30">·</span>
          <a 
            href="https://www.linkedin.com/in/galinarodriguez" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-wider text-[#F06AD8] hover:text-[#F3EDF7] transition-colors"
          >
            LinkedIn
          </a>
          <span className="text-[#E6C7F2]/30">·</span>
          <a 
            href="#contact" 
            className="text-xs uppercase tracking-wider text-[#F06AD8] hover:text-[#F3EDF7] transition-colors"
          >
            Contact
          </a>
        </div>
      </motion.div>
    </div>
  );
}
