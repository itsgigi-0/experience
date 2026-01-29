/*
 * CASE STUDIES GALLERY COMPONENT
 * 
 * Features:
 * - 6 clickable thumbnail cards with real campaign images
 * - Responsive grid: 3 columns desktop, 2 tablet, 1 mobile
 * - Expandable detail panel below the grid
 * - Deep link support via hash URLs
 * - Next/Previous navigation
 * - Keyboard accessibility and ARIA support
 */

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";

// ============================================
// CASE STUDY DATA
// ============================================
interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  tags: string[];
  thumbSrc: string;
  thumbAlt: string;
  overviewParagraph: string;
  whatIDidBullets: string[];
}

const caseStudies: CaseStudy[] = [
  {
    id: "case-kai-cenat",
    title: "Kai Cenat × Fortnite Icons Announcement",
    subtitle: "Creator-led announcement + social performance readout",
    tags: ["Creator Marketing", "Social Analytics", "Reporting", "Launch"],
    thumbSrc: "/assets/kai-cenat-fortnite.jpg",
    thumbAlt: "Kai Cenat Fortnite Icons campaign key art",
    overviewParagraph: "Supported a creator-led announcement moment by building a clear measurement story around owned social performance. I defined the reporting framework (launch window, key KPIs, and comparative baselines), cleaned up campaign labeling/tagging so the content could be reliably tracked, and packaged results into an executive-friendly readout that tied creative choices to outcomes. The focus was making the data easy to act on—what worked, what to repeat, and what to optimize next.",
    whatIDidBullets: [
      "Built KPI snapshot + launch-window tracking plan",
      "Standardized tagging/taxonomy for consistent reporting",
      "Summarized results + insights for stakeholders",
      "Documented repeatable creative learnings"
    ]
  },
  {
    id: "case-warcraft-rumble",
    title: "Warcraft Rumble Launch",
    subtitle: "Launch creative support + performance-informed iteration",
    tags: ["Launch Campaign", "Social Copy", "Creative Ops", "Insights"],
    thumbSrc: "/assets/warcraft-rumble.jpg",
    thumbAlt: "Warcraft Rumble launch campaign thumbnail",
    overviewParagraph: "Contributed to launch work by pairing creative execution with performance-minded iteration. I supported the rollout with clear messaging and campaign-ready assets, then translated early signals into practical takeaways the team could use quickly. The goal was to keep launch content sharp, consistent, and optimized for attention—without losing the game's personality.",
    whatIDidBullets: [
      "Created/edited launch-ready messaging and content support",
      "Aligned creative output to campaign goals and audience expectations",
      "Reviewed early performance signals and summarized fast learnings",
      "Partnered cross-functionally to keep output consistent"
    ]
  },
  {
    id: "case-kill-bill",
    title: "Kill Bill × Fortnite: Red Carpet Affair",
    subtitle: "Cultural moment campaign + sentiment + highlights",
    tags: ["Brand Partnership", "Social Listening", "Recaps", "Storytelling"],
    thumbSrc: "/assets/kill-bill-fortnite.jpg",
    thumbAlt: "Kill Bill Fortnite collaboration red carpet event",
    overviewParagraph: "Framed a pop-culture partnership moment into a story leadership could understand at a glance. I tracked owned social performance and audience response, pulled sentiment themes, and summarized what fans actually cared about—creative beats, standout posts, and conversation drivers. The output was a clean, partner-safe recap designed to inform future collab decisions.",
    whatIDidBullets: [
      "Built recap structure (KPIs + highlights + audience response)",
      "Summarized sentiment themes and conversation drivers",
      "Identified best-performing creative patterns worth repeating",
      "Packaged insights into a stakeholder-ready narrative"
    ]
  },
  {
    id: "case-ilgm-rebrand",
    title: "ILGM Rebrand",
    subtitle: "Brand voice, community approach, and rollout support",
    tags: ["Brand Strategy", "Community", "Messaging", "Process"],
    thumbSrc: "/images/ilgm-rebrand.webp",
    thumbAlt: "ILGM rebrand visual identity",
    overviewParagraph: "Supported a rebrand by aligning voice, community approach, and rollout execution into a coherent system. I developed practical guidelines and content direction that made the brand feel consistent across touchpoints—especially in community spaces. The focus was clarity: what we say, how we say it, and how we show up for the audience.",
    whatIDidBullets: [
      "Organized brand voice + messaging direction",
      "Built repeatable community + content workflows",
      "Shaped rollout content themes and engagement prompts",
      "Ensured consistency across channels and formats"
    ]
  },
  {
    id: "case-soulbound",
    title: "SoulBound 90-Day External Comms Strategy",
    subtitle: "90-day plan, stakeholder map, and channel system",
    tags: ["Comms Strategy", "Roadmap", "Editorial Calendar", "Measurement"],
    thumbSrc: "/assets/soulbound.webp",
    thumbAlt: "SoulBound communications strategy overview",
    overviewParagraph: "Built a 90-day external communications strategy designed to create momentum quickly without sacrificing clarity. I mapped audiences and stakeholders, established channel roles, and created an actionable roadmap with a content cadence the team could maintain. Measurement was baked in—clear KPIs, check-in points, and a feedback loop to refine messaging over time.",
    whatIDidBullets: [
      "Created 90-day comms roadmap with themes + cadence",
      "Defined audiences, stakeholder needs, and channel roles",
      "Built an editorial calendar + repeatable system",
      "Set KPI framework and iteration checkpoints"
    ]
  },
  {
    id: "case-fortnite-shop-video",
    title: "Fortnite Shop Video Revamp",
    subtitle: "Strategy shift from static posts → video + reporting framework",
    tags: ["Content Strategy", "Experimentation", "Reporting", "Optimization"],
    thumbSrc: "/assets/fortnite-shop.jpg",
    thumbAlt: "Fortnite Shop video content strategy",
    overviewParagraph: "Drove a strategy shift toward video-first Shop content by turning 'it feels healthier' into measurable proof. I compared time-matched periods, isolated Shop content performance, and built a narrative explaining what changed, why it matters, and how to keep iterating. The deliverable was a leadership-ready readout with a clear takeaway and next-step recommendations.",
    whatIDidBullets: [
      "Built comparison framework (time-matched periods + KPIs)",
      "Isolated Shop content set and summarized performance deltas",
      "Created leadership-friendly story: what changed + why it matters",
      "Proposed next steps for testing and correlation modeling"
    ]
  }
];

// ============================================
// THUMBNAIL CARD COMPONENT
// ============================================
interface ThumbnailCardProps {
  study: CaseStudy;
  isSelected: boolean;
  onClick: () => void;
  index: number;
}

function ThumbnailCard({ study, isSelected, onClick, index }: ThumbnailCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
      className={`group text-left w-full rounded-xl overflow-hidden transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#F06AD8] focus:ring-offset-2 focus:ring-offset-[#15001E] ${
        isSelected 
          ? "ring-2 ring-[#F06AD8] shadow-lg shadow-[#F06AD8]/20" 
          : "hover:shadow-xl hover:shadow-[#C44BC1]/10 hover:-translate-y-1"
      }`}
      aria-expanded={isSelected}
      aria-controls={`${study.id}-panel`}
    >
      {/* Thumbnail Image */}
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-[#2B0F3A] to-[#15001E]">
        {!imageError ? (
          <img
            src={study.thumbSrc}
            alt={study.thumbAlt}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2B0F3A] via-[#4A1E5F] to-[#15001E]">
            <span className="text-[#E6C7F2]/60 text-sm font-['Space_Grotesk'] text-center px-4">
              {study.title}
            </span>
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#15001E] via-transparent to-transparent opacity-60" />
        <div className="absolute inset-0 bg-[#F06AD8]/0 group-hover:bg-[#F06AD8]/10 transition-colors duration-300" />
      </div>

      {/* Card Content */}
      <div className="p-4 lg:p-5 bg-[#1A0A24] border border-[#C44BC1]/20 border-t-0 rounded-b-xl">
        <h3 className="text-base lg:text-lg font-semibold text-[#F3EDF7] mb-2 font-['Space_Grotesk'] line-clamp-2 group-hover:text-[#F06AD8] transition-colors">
          {study.title}
        </h3>
        <p className="text-sm text-[#E6C7F2]/70 mb-3 line-clamp-2">
          {study.subtitle}
        </p>
        <div className="flex flex-wrap gap-2">
          {study.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-full bg-[#2B0F3A]/80 text-[#E6C7F2]/80 border border-[#C44BC1]/20"
            >
              {tag}
            </span>
          ))}
          {study.tags.length > 3 && (
            <span className="px-2 py-1 text-xs rounded-full bg-[#2B0F3A]/80 text-[#E6C7F2]/60 border border-[#C44BC1]/20">
              +{study.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.button>
  );
}

// ============================================
// DETAIL PANEL COMPONENT
// ============================================
interface DetailPanelProps {
  study: CaseStudy;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
}

function DetailPanel({ study, onClose, onPrevious, onNext, hasPrevious, hasNext }: DetailPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [imageError, setImageError] = useState(false);

  // Focus management
  useEffect(() => {
    panelRef.current?.focus();
  }, [study.id]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft" && hasPrevious) {
        onPrevious();
      } else if (e.key === "ArrowRight" && hasNext) {
        onNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrevious, onNext, hasPrevious, hasNext]);

  return (
    <motion.div
      ref={panelRef}
      id={`${study.id}-panel`}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="col-span-full mt-6 rounded-2xl overflow-hidden focus:outline-none"
      tabIndex={-1}
      role="region"
      aria-label={`Case study details: ${study.title}`}
    >
      <div className="glass-card border border-[#C44BC1]/30 rounded-2xl overflow-hidden">
        {/* Header with navigation */}
        <div className="flex items-center justify-between p-4 lg:p-6 border-b border-[#C44BC1]/20 bg-[#15001E]/50">
          <div className="flex items-center gap-3">
            <button
              onClick={onPrevious}
              disabled={!hasPrevious}
              className="p-2 rounded-lg bg-[#2B0F3A]/80 text-[#E6C7F2] hover:bg-[#C44BC1]/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Previous case study"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={onNext}
              disabled={!hasNext}
              className="p-2 rounded-lg bg-[#2B0F3A]/80 text-[#E6C7F2] hover:bg-[#C44BC1]/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Next case study"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#2B0F3A]/80 text-[#E6C7F2] hover:bg-[#C44BC1]/30 transition-all"
            aria-label="Close case study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 lg:p-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left: Image */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-[#2B0F3A] to-[#15001E]">
              {!imageError ? (
                <img
                  src={study.thumbSrc}
                  alt={study.thumbAlt}
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2B0F3A] via-[#4A1E5F] to-[#15001E]">
                  <span className="text-[#E6C7F2]/60 text-lg font-['Space_Grotesk'] text-center px-4">
                    {study.title}
                  </span>
                </div>
              )}
            </div>

            {/* Right: Details */}
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {study.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs rounded-full bg-[#F06AD8]/20 text-[#F06AD8] border border-[#F06AD8]/30 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-2xl lg:text-3xl font-bold text-[#F3EDF7] mb-3 font-['Space_Grotesk']">
                {study.title}
              </h3>
              <p className="text-lg text-[#F06AD8] mb-6 font-medium">
                {study.subtitle}
              </p>

              <div className="mb-8">
                <h4 className="text-sm uppercase tracking-wider text-[#E6C7F2]/60 mb-3 font-['Orbitron']">
                  Overview
                </h4>
                <p className="text-[#E6C7F2] leading-relaxed">
                  {study.overviewParagraph}
                </p>
              </div>

              <div>
                <h4 className="text-sm uppercase tracking-wider text-[#E6C7F2]/60 mb-3 font-['Orbitron']">
                  What I Did
                </h4>
                <ul className="space-y-3">
                  {study.whatIDidBullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#E6C7F2]">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#F06AD8] shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// MAIN CASE STUDIES COMPONENT
// ============================================
export default function CaseStudies() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Handle hash-based deep linking
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && caseStudies.some(s => s.id === hash)) {
      setSelectedId(hash);
      // Scroll to the section after a short delay
      setTimeout(() => {
        const element = document.getElementById("case-studies");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, []);

  // Update hash when selection changes
  useEffect(() => {
    if (selectedId) {
      window.history.replaceState(null, "", `#${selectedId}`);
    } else {
      // Only clear hash if we're on a case study hash
      const currentHash = window.location.hash.slice(1);
      if (caseStudies.some(s => s.id === currentHash)) {
        window.history.replaceState(null, "", window.location.pathname);
      }
    }
  }, [selectedId]);

  const handleSelect = useCallback((id: string) => {
    setSelectedId(prev => prev === id ? null : id);
    // Scroll to show the panel
    if (selectedId !== id) {
      setTimeout(() => {
        const panel = document.getElementById(`${id}-panel`);
        if (panel) {
          panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      }, 100);
    }
  }, [selectedId]);

  const handleClose = useCallback(() => {
    setSelectedId(null);
  }, []);

  const currentIndex = selectedId ? caseStudies.findIndex(s => s.id === selectedId) : -1;

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setSelectedId(caseStudies[currentIndex - 1].id);
    }
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex < caseStudies.length - 1) {
      setSelectedId(caseStudies[currentIndex + 1].id);
    }
  }, [currentIndex]);

  const selectedStudy = selectedId ? caseStudies.find(s => s.id === selectedId) : null;

  return (
    <section id="work" className="relative py-16 bg-[#0A0012]">
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: "url('/images/constellation-pattern.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl mb-12"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hud-label text-[#F06AD8] mb-4"
          >
            PORTFOLIO // WORK
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F3EDF7] mb-6 leading-tight font-['Space_Grotesk'] uppercase editorial-caps">
            Work
          </h2>
          <p className="text-lg lg:text-xl text-[#E6C7F2] leading-relaxed">
            Selected projects. Click to explore.
          </p>
        </motion.div>

        {/* Thumbnail Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {caseStudies.map((study, index) => (
            <ThumbnailCard
              key={study.id}
              study={study}
              isSelected={selectedId === study.id}
              onClick={() => handleSelect(study.id)}
              index={index}
            />
          ))}

          {/* Expandable Detail Panel */}
          <AnimatePresence mode="wait">
            {selectedStudy && (
              <DetailPanel
                key={selectedStudy.id}
                study={selectedStudy}
                onClose={handleClose}
                onPrevious={handlePrevious}
                onNext={handleNext}
                hasPrevious={currentIndex > 0}
                hasNext={currentIndex < caseStudies.length - 1}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Back to gallery hint when panel is open */}
        <AnimatePresence>
          {selectedId && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="text-center mt-8"
            >
              <button
                onClick={handleClose}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm text-[#E6C7F2]/70 hover:text-[#F06AD8] transition-colors"
              >
                <span>← Back to gallery</span>
                <span className="text-xs opacity-60">(or press ESC)</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
