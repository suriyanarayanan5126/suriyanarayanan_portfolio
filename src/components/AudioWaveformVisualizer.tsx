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
      className={`flex items-end justify-center gap-1 h-6 px-3 py-1 bg-white/95 rounded-full border border-slate-200 shadow-xs backdrop-blur-md select-none ${className}`}
      aria-hidden="true"
    >
      {bars.map((bar) => {
        const eqClass = `animate-eq-${((bar - 1) % 12) + 1}`;
        const active = isSpeaking && !isPaused;

        return (
          <span
            key={bar}
            className={`w-[3px] rounded-full equalizer-bar transition-all duration-200 ${
              active
                ? `h-5 bg-gradient-to-t from-blue-600 via-indigo-500 to-sky-400 ${eqClass}`
                : isPaused
                ? 'h-2 bg-amber-400'
                : 'h-1.5 bg-slate-200'
            }`}
          />
        );
      })}
    </div>
  );
};
