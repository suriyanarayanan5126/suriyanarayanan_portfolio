import React from 'react';
import { motion } from 'motion/react';

interface CinematicDividerProps {
  sectionNumber: string;
  nextSectionTitle: string;
  gradientFrom?: string;
  gradientTo?: string;
}

export const CinematicDivider: React.FC<CinematicDividerProps> = ({
  sectionNumber,
  nextSectionTitle,
  gradientFrom = 'from-[#030712]',
  gradientTo = 'to-[#02050c]',
}) => {
  return (
    <div className={`relative w-full overflow-hidden bg-gradient-to-b ${gradientFrom} ${gradientTo} py-10 pointer-events-none select-none`}>
      {/* Ambient glowing horizontal laser line */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="relative flex items-center justify-between">
          
          {/* Left glowing energy beam */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-cyan-400 origin-left"
          />

          {/* Central Cyber HUD Marker */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-4 flex items-center gap-3 px-3 py-1 rounded-full bg-[#070e1c]/90 border border-blue-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.18)]"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#06b6d4]" />
            <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase">
              CHAPTER {sectionNumber}
            </span>
            <span className="text-[10px] font-mono text-slate-500">⟶</span>
            <span className="text-[10px] font-mono tracking-wider text-slate-300 uppercase">
              {nextSectionTitle}
            </span>
          </motion.div>

          {/* Right glowing energy beam */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 h-[1px] bg-gradient-to-r from-cyan-400 via-blue-500/40 to-transparent origin-right"
          />
        </div>

        {/* Ambient center light bloom */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-10 bg-cyan-500/10 blur-2xl" />
      </div>
    </div>
  );
};
