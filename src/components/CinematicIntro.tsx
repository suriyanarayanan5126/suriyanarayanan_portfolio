import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Terminal, FastForward } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

interface CinematicIntroProps {
  onComplete: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const [lettersRevealed, setLettersRevealed] = useState(0);
  const fullName = "SURIYANARAYANAN R";

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setLettersRevealed((prev) => {
        if (prev < fullName.length) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 60);

    const timer = setTimeout(() => {
      onComplete();
    }, 3100);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#02050c] overflow-hidden select-none"
    >
      {/* Background Animated Light Streaks & Aurora Nebula */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      
      {/* Radial pulse glow */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[600px] h-[600px] rounded-full bg-blue-600/20 blur-[150px] pointer-events-none"
      />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-cyan-500/15 blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl">
        
        {/* Terminal Header Kicker */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/50 border border-blue-500/40 text-xs font-mono text-cyan-300 mb-6 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
        >
          <Terminal className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>INITIALIZING DIGITAL IDENTITY · ECE 2026</span>
        </motion.div>

        {/* Cinematic Letter-by-Letter Name Reveal */}
        <div className="min-h-[70px] sm:min-h-[90px] flex items-center justify-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-wider font-heading text-white">
            {fullName.split('').map((char, index) => {
              const isVisible = index < lettersRevealed;
              const isLastName = index >= 16;
              return (
                <span
                  key={index}
                  className={`inline-block transition-all duration-200 ${
                    isVisible
                      ? 'opacity-100 transform translate-y-0 filter drop-shadow-[0_0_25px_rgba(59,130,246,0.8)]'
                      : 'opacity-0 transform translate-y-3'
                  } ${isLastName ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-violet-300' : 'text-slate-100'}`}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              );
            })}
            {lettersRevealed < fullName.length && (
              <span className="inline-block w-2.5 sm:w-3 h-8 sm:h-12 bg-cyan-400 ml-1.5 animate-pulse" />
            )}
          </h1>
        </div>

        {/* Tagline Reveal */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: lettersRevealed >= 12 ? 1 : 0, y: lettersRevealed >= 12 ? 0 : 15 }}
          transition={{ duration: 0.6 }}
          className="text-base sm:text-xl text-cyan-300/90 font-mono tracking-widest mt-4 uppercase"
        >
          “{PERSONAL_INFO.tagline}”
        </motion.p>

        {/* University & Degree Subtext */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: lettersRevealed >= 16 ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-2 text-xs font-mono text-slate-400 mt-3"
        >
          <span>Kings College of Engineering</span>
          <span aria-hidden="true" className="text-cyan-500">·</span>
          <span className="text-cyan-400 font-semibold">{PERSONAL_INFO.academicScore}</span>
        </motion.div>
      </div>

      {/* Skip Intro Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        onClick={onComplete}
        className="absolute bottom-8 right-8 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-blue-500/30 hover:border-cyan-400 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer shadow-lg group backdrop-blur-md"
        title="Press Esc, Space or Click to skip intro"
      >
        <span>Skip Intro</span>
        <FastForward className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
      </motion.button>
    </motion.div>
  );
};
