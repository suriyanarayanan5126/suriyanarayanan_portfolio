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
      className={`flex items-end justify-center gap-1 h-6 px-3 py-1 bg-black/90 rounded-full border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.3)] backdrop-blur-md select-none ${className}`}
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
                ? `h-5 bg-gradient-to-t from-emerald-500 via-lime-400 to-emerald-200 ${eqClass} shadow-[0_0_6px_#10b981]`
                : isPaused
                ? 'h-2 bg-gradient-to-t from-amber-500 to-amber-300 shadow-[0_0_4px_#f59e0b]'
                : 'h-1.5 bg-emerald-500/30'
            }`}
          />
        );
      })}
    </div>
  );
};
