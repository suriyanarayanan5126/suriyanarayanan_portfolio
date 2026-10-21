import React from 'react';
import { motion } from 'motion/react';

interface CinematicDividerProps {
  sectionNumber: string;
  nextSectionTitle: string;
}

export const CinematicDivider: React.FC<CinematicDividerProps> = ({
  sectionNumber,
  nextSectionTitle,
}) => {
  return (
    <div className="relative w-full overflow-hidden bg-white py-6 pointer-events-none select-none">
      {/* Subtle glowing horizontal transition line with blue-cyan-orange-red gradient */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="relative flex items-center justify-between">
          
          {/* Left gradient line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 h-[1.5px] bg-gradient-to-r from-transparent via-blue-500 via-cyan-400 to-orange-400 origin-left"
          />

          {/* Central Section Marker */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mx-3 sm:mx-4 flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-slate-50 border border-slate-200/90 shadow-xs"
          >
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-600 via-orange-500 to-red-500 animate-pulse shrink-0" />
            <span className="text-[10px] font-mono tracking-widest text-blue-700 font-bold uppercase">
              SECTION {sectionNumber}
            </span>
            <span className="text-[10px] font-mono text-slate-300">·</span>
            <span className="text-[10px] font-mono tracking-wider text-slate-700 uppercase font-semibold">
              {nextSectionTitle}
            </span>
          </motion.div>

          {/* Right gradient line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 h-[1.5px] bg-gradient-to-r from-orange-400 via-red-400 to-transparent origin-right"
          />
        </div>
      </div>
    </div>
  );
};
