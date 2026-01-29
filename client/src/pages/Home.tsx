/*
 * DESIGN: Journey Beyond Earth / Space Exploration UI - Single Page Layout
 * 
 * All sections consolidated into one scrollable page with anchor navigation:
 * - Hero section (home)
 * - How I Work section
 * - How I Win section  
 * - Quests section (visual resume timeline)
 * - About section
 * - Contact section
 */

import { motion } from "framer-motion";
import { ChevronDown, Target, Users, Globe, Layers, TrendingUp, Clock, FileText, Mail, Linkedin, Calendar, Download, Gamepad2, Lightbulb, Briefcase, DollarSign, Rocket, BarChart3, PieChart } from "lucide-react";
import { lazy, Suspense } from "react";
import { toast } from "sonner";

// Lazy load heavy components for better initial page load performance
const HeroSlideshow = lazy(() => import("@/components/HeroSlideshow"));
const CaseStudies = lazy(() => import("@/components/CaseStudies"));
const QuestsTimeline = lazy(() => import("@/components/QuestsTimeline"));
const AlienRunnerGame = lazy(() => import("@/components/AlienRunnerGame"));

// ============================================
// FLOATING PARTICLES COMPONENT
// ============================================
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() * 2 + 0.5,
            height: Math.random() * 2 + 0.5,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.2 + Math.random() * 0.3,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 8 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ============================================
// HOW I WORK DATA
// ============================================
const workSteps = [
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

// ============================================
// HOW I WIN DATA - Infographic Style
// ============================================
const howIWinSteps = [
  {
    number: "01",
    icon: Lightbulb,
    title: "Strategic Insight",
    description: "I turn messy social signals into clear patterns — what's working, what's not, and why it matters.",
    color: "#00D9FF", // Cyan
  },
  {
    number: "02",
    icon: Briefcase,
    title: "Cross-Functional Fluency",
    description: "I speak creator, brand, and data — bridging teams so nothing gets lost in translation.",
    color: "#6B7FFF", // Blue
  },
  {
    number: "03",
    icon: DollarSign,
    title: "Business-First Approach",
    description: "Every recommendation ties back to KPIs, timelines, and what leadership actually needs to decide.",
    color: "#4A5568", // Dark gray
  },
  {
    number: "04",
    icon: Rocket,
    title: "Speed & Momentum",
    description: "I help teams move faster without sacrificing quality — frameworks, not bottlenecks.",
    color: "#00D9FF", // Cyan
  },
  {
    number: "05",
    icon: BarChart3,
    title: "Performance Storytelling",
    description: "I package insights so they're easy to act on — exec-ready, context-aware, and decision-focused.",
    color: "#6B7FFF", // Blue
  },
  {
    number: "06",
    icon: PieChart,
    title: "Repeatable Systems",
    description: "I build processes that scale — so teams can replicate wins and optimize over time.",
    color: "#4A5568", // Dark gray
  },
];

const impactCounters = [
  {
    icon: TrendingUp,
    label: "Impressions Influenced/Managed",
    value: "800M+",
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

// ============================================
// CONTACT DATA
// ============================================
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


// ============================================
// MAIN HOME COMPONENT
// ============================================
export default function Home() {
  const handleResumeDownload = () => {
    toast.info("Resume download coming soon! Please contact Galina directly for her resume.");
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      {/* ============================================ */}
      {/* HERO SECTION - Dynamic Slideshow */}
      {/* ============================================ */}
      <Suspense fallback={
        <div className="min-h-screen bg-[#0A0012] flex items-center justify-center">
          <div className="text-[#F06AD8] text-lg">Loading...</div>
        </div>
      }>
        <HeroSlideshow />
      </Suspense>

      {/* ============================================ */}
      {/* HOW I WORK SECTION */}
      {/* ============================================ */}
      <section id="about" className="relative py-16 overflow-hidden bg-[#0A0012]">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "url('/images/constellation-pattern.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mb-16"
          >
            <div className="hud-label text-[#F06AD8] mb-4">SYSTEMS &gt; POSTS</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F3EDF7] mb-6 leading-tight font-['Space_Grotesk']">
              How I Work
            </h2>
            <p className="text-lg lg:text-xl text-[#E6C7F2] leading-relaxed">
              A repeatable strategy loop that keeps content authentic for fans, scalable for teams, and measurable for leaders.
            </p>
          </motion.div>

          {/* Infographic-style grid matching How I Win */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {workSteps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative"
              >
                {/* Card */}
                <div className="glass-card rounded-xl p-6 h-full flex flex-col hover:border-[#C44BC1]/40 transition-all group">
                  {/* Arrow number at top */}
                  <div className="relative mb-6">
                    <div 
                      className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-bold text-white text-2xl"
                      style={{
                        backgroundColor: i % 3 === 0 ? '#00D9FF' : i % 3 === 1 ? '#6B7FFF' : '#4A5568',
                        clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 50%, calc(100% - 15px) 100%, 0 100%)'
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#15001E] border-2 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                    style={{ borderColor: i % 3 === 0 ? '#00D9FF' : i % 3 === 1 ? '#6B7FFF' : '#4A5568' }}
                  >
                    <step.icon className="w-8 h-8" style={{ color: i % 3 === 0 ? '#00D9FF' : i % 3 === 1 ? '#6B7FFF' : '#4A5568' }} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#F3EDF7] mb-3 text-center font-['Space_Grotesk']">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#E6C7F2]/80 text-sm leading-relaxed text-center">
                    {step.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-2xl p-8 lg:p-12 max-w-3xl mx-auto text-center mt-16"
          >
            <h3 className="text-2xl font-bold text-[#F3EDF7] mb-4 font-['Space_Grotesk']">The Result?</h3>
            <p className="text-[#E6C7F2] text-lg leading-relaxed">
              Content that resonates with communities, scales across platforms, and delivers measurable business impact — all while respecting the culture that makes fandoms special.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CASE STUDIES SECTION - Lazy loaded for performance */}
      {/* ============================================ */}
      <Suspense fallback={
        <div className="flex items-center justify-center py-20 bg-[#0A0012]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-[#F06AD8]/30 border-t-[#F06AD8] rounded-full animate-spin" />
            <p className="text-[#E6C7F2]/60 text-sm">Loading case studies...</p>
          </div>
        </div>
      }>
        <CaseStudies />
      </Suspense>

      {/* ============================================ */}
      {/* HOW I WIN SECTION - Infographic Style */}
      {/* ============================================ */}
      <section id="wins" className="relative py-16 bg-[#0A0012]">
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
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mb-16"
          >
            <div className="hud-label text-[#F06AD8] mb-4">OUTCOMES // PROOF</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F3EDF7] mb-6 leading-tight font-['Space_Grotesk']">
              How I Win
            </h2>
            <p className="text-lg lg:text-xl text-[#E6C7F2] leading-relaxed">
              The exact ways I help teams ship better work — faster, clearer, and with stronger results.
            </p>
          </motion.div>

          {/* Infographic-style grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {howIWinSteps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative"
              >
                {/* Card */}
                <div className="glass-card rounded-xl p-6 h-full flex flex-col hover:border-[#C44BC1]/40 transition-all group">
                  {/* Arrow number at top */}
                  <div className="relative mb-6">
                    <div 
                      className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-bold text-white text-2xl"
                      style={{
                        backgroundColor: step.color,
                        clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 50%, calc(100% - 15px) 100%, 0 100%)'
                      }}
                    >
                      {step.number}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#15001E] border-2 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                    style={{ borderColor: step.color }}
                  >
                    <step.icon className="w-8 h-8" style={{ color: step.color }} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#F3EDF7] mb-3 text-center font-['Space_Grotesk']">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#E6C7F2]/80 text-sm leading-relaxed text-center">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Impact counters below */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <h3 className="text-2xl lg:text-3xl font-bold text-[#F3EDF7] mb-8 text-center font-['Space_Grotesk']">
              Highlights & Impact
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {impactCounters.map((counter, i) => (
                <motion.div
                  key={counter.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="glass-card rounded-xl p-6 text-center hover:border-[#C44BC1]/40 transition-all group"
                >
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#F06AD8]/20 to-[#C44BC1]/20 flex items-center justify-center mb-4 group-hover:from-[#F06AD8]/30 group-hover:to-[#C44BC1]/30 transition-all">
                    <counter.icon className="w-8 h-8 text-[#F06AD8]" />
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-[#F3EDF7] mb-2 font-['Space_Grotesk']">
                    {counter.value}
                  </div>
                  <div className="text-sm text-[#E6C7F2]/70">{counter.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================ */}
      {/* QUESTS SECTION - Visual Resume Timeline */}
      {/* ============================================ */}
      <section id="quests" className="relative py-16 bg-[#0A0012]">
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: "url('/images/constellation-pattern.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#15001E] via-transparent to-[#15001E] opacity-50" />
        
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
          >
            <div className="hud-label text-[#F06AD8] mb-4">CAREER JOURNEY // VISUAL RESUME</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F3EDF7] mb-6 leading-tight font-['Space_Grotesk']">
              Quests
            </h2>
            <p className="text-lg lg:text-xl text-[#E6C7F2] leading-relaxed">
              15+ years of strategic adventures across gaming, entertainment, and creator economies. 
              Each role a new mission, each achievement a milestone in the journey.
            </p>
          </motion.div>

          {/* Visual Resume Timeline - Lazy loaded for performance */}
          <Suspense fallback={
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-[#F06AD8]/30 border-t-[#F06AD8] rounded-full animate-spin" />
                <p className="text-[#E6C7F2]/60 text-sm">Loading career timeline...</p>
              </div>
            </div>
          }>
            <QuestsTimeline />
          </Suspense>
        </div>
      </section>

      {/* ============================================ */}
      {/* ABOUT SECTION */}
      {/* ============================================ */}
      <section id="about" className="relative py-16 bg-[#0A0012]">
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
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mb-12"
          >
            <div className="hud-label text-[#F06AD8] mb-4">THE PLAYER BEHIND THE STRATEGY</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F3EDF7] mb-6 leading-tight font-['Space_Grotesk']">
              About
            </h2>
            <p className="text-lg lg:text-xl text-[#E6C7F2] leading-relaxed">
              Senior strategy leadership for fandom-driven brands — built on storytelling, measurement, and respect for the audience.
            </p>
          </motion.div>

          {/* Resume Download Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-xl p-6 lg:p-8 max-w-xl mb-16"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#F06AD8]/20 to-[#C44BC1]/20 flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-[#F06AD8]" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#F3EDF7] mb-2 font-['Space_Grotesk']">Download Resume</h3>
                <p className="text-[#E6C7F2]/80 text-sm mb-4">Want the formal version? Grab my resume here.</p>
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

          {/* Bio Section */}
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
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
                  src="/images/galina-about.webp"
                  alt="Galina Rodriguez"
                  loading="lazy"
                  className="relative w-64 lg:w-full max-w-sm rounded-2xl object-cover"
                />
                <div className="absolute -inset-4 border border-[#C44BC1]/20 rounded-2xl" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <p className="text-xl lg:text-2xl text-[#F3EDF7] font-medium mb-8 leading-relaxed font-['Space_Grotesk']">
                Content only works when it changes behavior — and in fandom spaces, trust is everything.
              </p>

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

      {/* ============================================ */}
      {/* CONTACT SECTION */}
      {/* ============================================ */}
      <section id="contact" className="relative py-16 bg-[#15001E]">
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
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mb-12"
          >
            <div className="hud-label text-[#F06AD8] mb-4">QUEUE UP A CHAT</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F3EDF7] mb-6 leading-tight font-['Space_Grotesk']">
              Contact
            </h2>
            <p className="text-lg lg:text-xl text-[#E6C7F2] leading-relaxed">
              Email or LinkedIn is perfect. If you want to meet, send a couple time options and I'll confirm.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
            {contactTiles.map((tile, i) => (
              <motion.div
                key={tile.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass-card rounded-xl p-6 lg:p-8 text-center hover:border-[#C44BC1]/40 transition-all group"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#F06AD8]/20 to-[#C44BC1]/20 flex items-center justify-center mb-6 group-hover:from-[#F06AD8]/30 group-hover:to-[#C44BC1]/30 transition-all">
                  <tile.icon className="w-8 h-8 text-[#F06AD8]" />
                </div>
                <h3 className="text-xl font-semibold text-[#F3EDF7] mb-3 font-['Space_Grotesk']">{tile.title}</h3>
                <p className="text-[#E6C7F2]/80 text-sm mb-6 leading-relaxed">{tile.body}</p>
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

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-2xl p-8 lg:p-12 max-w-3xl mx-auto"
          >
            <h3 className="text-2xl font-bold text-[#F3EDF7] mb-6 font-['Space_Grotesk'] text-center">What to Expect</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-[#F06AD8] font-semibold mb-2 font-['Space_Grotesk']">Response Time</h4>
                <p className="text-[#E6C7F2]/80 text-sm">I typically respond within 24-48 hours on business days.</p>
              </div>
              <div>
                <h4 className="text-[#F06AD8] font-semibold mb-2 font-['Space_Grotesk']">Meeting Format</h4>
                <p className="text-[#E6C7F2]/80 text-sm">20-30 minute video calls work best for initial conversations.</p>
              </div>
              <div>
                <h4 className="text-[#F06AD8] font-semibold mb-2 font-['Space_Grotesk']">Best For</h4>
                <p className="text-[#E6C7F2]/80 text-sm">Strategy consulting, full-time roles, speaking opportunities, and collaborations.</p>
              </div>
              <div>
                <h4 className="text-[#F06AD8] font-semibold mb-2 font-['Space_Grotesk']">Location</h4>
                <p className="text-[#E6C7F2]/80 text-sm">Open to remote work and select on-site opportunities.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================ */}
      {/* GAME SECTION */}
      {/* ============================================ */}
      <section id="play" className="relative py-16 bg-[#0A0012]">
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
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mb-12"
          >
            <div className="hud-label text-[#F06AD8] mb-4 flex items-center gap-2">
              <Gamepad2 className="w-4 h-4" />
              BONUS LEVEL
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F3EDF7] mb-6 leading-tight font-['Space_Grotesk']">
              Take a Break
            </h2>
            <p className="text-sm text-[#E6C7F2]/60">
              Optional. Built for curiosity.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <Suspense fallback={
              <div className="flex items-center justify-center py-20">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-[#F06AD8]/30 border-t-[#F06AD8] rounded-full animate-spin" />
                  <p className="text-[#E6C7F2]/60 text-sm">Loading game...</p>
                </div>
              </div>
            }>
              <AlienRunnerGame />
            </Suspense>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
