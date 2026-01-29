/*
 * DESIGN: Celestial Observatory Dashboard
 * Circular HUD dial component for displaying stats
 * - Orbital ring decoration
 * - Breathing glow effect
 * - Precision engineering aesthetic
 */

import { motion } from "framer-motion";

interface HudDialProps {
  label: string;
  value: string;
  delay?: number;
}

export default function HudDial({ label, value, delay = 0 }: HudDialProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className="relative group"
    >
      {/* Outer ring */}
      <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full border border-[#C44BC1]/40 flex items-center justify-center relative bg-[#15001E]/80 backdrop-blur-sm">
        {/* Inner glow ring */}
        <div className="absolute inset-2 rounded-full border border-[#F06AD8]/20 group-hover:border-[#F06AD8]/40 transition-colors" />
        
        {/* Content */}
        <div className="text-center z-10">
          <div className="text-[#F3EDF7] font-bold text-sm lg:text-base font-['Space_Grotesk']">
            {value}
          </div>
        </div>
        
        {/* Corner decorations */}
        <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-[#F06AD8]/60" />
        <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-[#F06AD8]/60" />
        <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-[#F06AD8]/60" />
        <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-[#F06AD8]/60" />
      </div>
      
      {/* Label below */}
      <div className="mt-2 text-center">
        <span className="text-[10px] lg:text-xs font-['Orbitron'] uppercase tracking-wider text-[#E6C7F2]/70">
          {label}
        </span>
      </div>
    </motion.div>
  );
}
