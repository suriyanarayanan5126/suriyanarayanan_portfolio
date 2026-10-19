import React from 'react';

interface AudioWaveformVisualizerProps {
  isSpeaking: boolean;
  isPaused: boolean;
  className?: string;
  barCount?: number;
}

export const AudioWaveformVisualizer: React.FC<AudioWaveformVisualizerProps> = ({
  isSpeaking,
  isPaused,
  className = '',
  barCount = 12
}) => {
  const bars = Array.from({ length: barCount }, (_, i) => i + 1);

  return (
    <div 
      className={`flex items-end justify-center gap-1 h-6 px-3 py-1 bg-black/90 rounded-full border border-cyan-500/40 shadow-[0_0_25px_rgba(6,182,212,0.35)] backdrop-blur-md select-none ${className}`}
      aria-hidden="true"
    >
      {bars.map((bar) => {
        // Distinct animation delay / frequency class
        const eqClass = `animate-eq-${((bar - 1) % 12) + 1}`;
        const active = isSpeaking && !isPaused;

        return (
          <span
            key={bar}
            className={`w-[3px] rounded-full equalizer-bar transition-all duration-200 ${
              active
                ? `h-5 bg-gradient-to-t from-blue-600 via-cyan-400 to-violet-300 ${eqClass} shadow-[0_0_8px_#06b6d4]`
                : isPaused
                ? 'h-2 bg-gradient-to-t from-amber-500 to-amber-300 shadow-[0_0_6px_#f59e0b]'
                : 'h-1.5 bg-cyan-500/30'
            }`}
          />
        );
      })}
    </div>
  );
};
