/*
 * DESIGN: Celestial Observatory Dashboard
 * Animated skill bar component
 * - Gaming HUD style with level indicators
 * - Gradient fill with glow
 * - Staggered animation on scroll
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SkillBarProps {
  label: string;
  levelLabel: string;
  fillPercent: number;
  delay?: number;
}

export default function SkillBar({ label, levelLabel, fillPercent, delay = 0 }: SkillBarProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="group"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-[#F3EDF7] font-medium text-sm lg:text-base">
          {label}
        </span>
        <span className="text-xs font-['Orbitron'] uppercase tracking-wider text-[#F06AD8]">
          {levelLabel}
        </span>
      </div>
      
      {/* Bar container */}
      <div className="relative h-3 lg:h-4 rounded-full bg-[#2B0F3A] overflow-hidden border border-[#C44BC1]/20">
        {/* Fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${fillPercent}%` } : {}}
          transition={{ duration: 1.2, delay: delay + 0.3, ease: "easeOut" }}
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#C44BC1] to-[#F06AD8]"
          style={{
            boxShadow: "0 0 10px rgba(240, 106, 216, 0.5), inset 0 1px 0 rgba(255,255,255,0.2)",
          }}
        />
        
        {/* Tick marks */}
        <div className="absolute inset-0 flex">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="flex-1 border-r border-[#15001E]/30 last:border-r-0"
            />
          ))}
        </div>
        
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-full" />
      </div>
      
      {/* Percentage indicator */}
      <div className="flex justify-end mt-1">
        <span className="text-xs text-[#E6C7F2]/50 font-['Orbitron']">
          {fillPercent}%
        </span>
      </div>
    </motion.div>
  );
}
