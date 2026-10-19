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
}) => {
  return (
    <div className="relative w-full overflow-hidden bg-white py-8 pointer-events-none select-none">
      {/* Subtle glowing horizontal transition line */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="relative flex items-center justify-between">
          
          {/* Left gradient line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-blue-200 to-blue-400 origin-left"
          />

          {/* Central Section Marker */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mx-4 flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 shadow-xs"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest text-blue-700 font-bold uppercase">
              SECTION {sectionNumber}
            </span>
            <span className="text-[10px] font-mono text-slate-400">·</span>
            <span className="text-[10px] font-mono tracking-wider text-slate-700 uppercase font-medium">
              {nextSectionTitle}
            </span>
          </motion.div>

          {/* Right gradient line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 h-[1px] bg-gradient-to-r from-blue-400 via-blue-200 to-transparent origin-right"
          />
        </div>
      </div>
    </div>
  );
};
