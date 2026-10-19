import React, { useState, useEffect } from 'react';

interface AvatarDisplayProps {
  size?: 'sm' | 'md' | 'lg' | 'hero' | 'avatar-modal';
  isSpeaking?: boolean;
  avatarState?: 'idle' | 'listening' | 'thinking' | 'speaking';
  className?: string;
  showPresenterBadge?: boolean;
}

export const AvatarDisplay: React.FC<AvatarDisplayProps> = ({
  size = 'hero',
  isSpeaking = false,
  avatarState = 'idle',
  className = '',
  showPresenterBadge = true,
}) => {
  // Use official generated portrait of Suriyanarayanan at laptop
  const [photoSrc, setPhotoSrc] = useState<string>('/assets/profile/profile.jpg');
  const [visemeIndex, setVisemeIndex] = useState<number>(0);
  const [isBlinking, setIsBlinking] = useState<boolean>(false);

  // Fallback candidate paths
  useEffect(() => {
    const candidatePaths = [
      '/assets/profile/profile.jpg',
      '/profile.jpg',
      '/src/assets/images/suriya_laptop_avatar_1792388367075.jpg'
    ];

    let found = false;
    for (const p of candidatePaths) {
      const img = new Image();
      img.src = p;
      img.onload = () => {
        if (!found) {
          found = true;
          setPhotoSrc(p);
        }
      };
    }
  }, []);

  // Synchronized mouth/lip articulation cadence during active speech
  useEffect(() => {
    if (!isSpeaking) {
      setVisemeIndex(0);
      return;
    }

    // Cycles through speech mouth visemes (0: closed/rest, 1: slight open, 2: open vowel, 3: round consonant)
    const interval = setInterval(() => {
      setVisemeIndex((prev) => (prev + 1) % 4);
    }, 145);

    return () => clearInterval(interval);
  }, [isSpeaking]);

  // Occasional natural eye blink
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, 4500);

    return () => clearInterval(blinkInterval);
  }, []);

  const sizeClasses = {
    sm: 'w-12 h-14',
    md: 'w-20 h-24',
    lg: 'w-36 h-44',
    hero: 'w-[300px] h-[390px] sm:w-[340px] sm:h-[440px] md:w-[370px] md:h-[480px]',
    'avatar-modal': 'w-[280px] h-[360px] md:w-[320px] md:h-[415px]',
  }[size];

  const currentState = isSpeaking ? 'speaking' : avatarState;

  return (
    <div className={`relative group select-none ${className}`}>
      {/* Dynamic Multi-Color Ambient Backlight */}
      <div 
        className={`absolute -inset-4 sm:-inset-6 rounded-[36px] blur-2xl transition-all duration-700 pointer-events-none ${
          currentState === 'speaking'
            ? 'bg-gradient-to-r from-blue-600/40 via-cyan-500/45 to-violet-600/40 opacity-100 scale-105'
            : currentState === 'listening'
            ? 'bg-gradient-to-r from-emerald-500/35 via-cyan-500/35 to-blue-500/35 opacity-80'
            : currentState === 'thinking'
            ? 'bg-gradient-to-r from-violet-600/40 via-amber-500/30 to-blue-600/35 opacity-90'
            : 'bg-blue-600/20 opacity-60'
        }`}
      />

      {/* Cyber Rotating Halo for Speaking/Listening */}
      {currentState === 'speaking' && (
        <div className="absolute -inset-2.5 rounded-[32px] border-2 border-cyan-400/80 shadow-[0_0_30px_rgba(6,182,212,0.6)] animate-pulse pointer-events-none z-10" />
      )}
      {currentState === 'listening' && (
        <div className="absolute -inset-2.5 rounded-[32px] border-2 border-emerald-400/80 shadow-[0_0_30px_rgba(16,185,129,0.5)] animate-pulse pointer-events-none z-10" />
      )}

      {/* Main Avatar Container with Breathing / Speech Physics */}
      <div
        className={`relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#0c162c] via-[#070e1c] to-[#03060d] border ${
          currentState === 'speaking' 
            ? 'border-cyan-400/80 shadow-[0_0_50px_rgba(6,182,212,0.35)]' 
            : currentState === 'listening'
            ? 'border-emerald-400/70 shadow-[0_0_40px_rgba(16,185,129,0.25)]'
            : 'border-blue-500/30 shadow-[0_0_40px_rgba(37,99,235,0.2)]'
        } ${sizeClasses} flex items-center justify-center transition-all duration-300`}
      >
        {/* Animated Inner Wrapper for Conversational Nodding Cadence */}
        <div 
          className={`w-full h-full relative overflow-hidden ${
            isSpeaking ? 'animate-avatar-speech' : 'animate-[breathing_4s_ease-in-out_infinite]'
          }`}
        >
          {/* Official Formal Avatar Image: Suriyanarayanan R working at Laptop */}
          <img
            src={photoSrc}
            alt="Suriyanarayanan R — AI Presenter at Laptop"
            className={`w-full h-full object-cover object-top transition-transform duration-300 ${
              isSpeaking ? 'scale-[1.015]' : 'scale-100'
            }`}
            referrerPolicy="no-referrer"
          />

          {/* Screen Light Reflection Cast onto Face & Glasses */}
          <div 
            className={`absolute inset-0 bg-gradient-to-tr from-cyan-400/15 via-transparent to-transparent pointer-events-none transition-opacity duration-300 ${
              isSpeaking ? 'animate-screen-glow opacity-80' : 'opacity-30'
            }`} 
          />

          {/* Synchronized Mouth/Lip Movement Overlay (visibly articulates during speech) */}
          {isSpeaking && visemeIndex > 0 && (
            <div 
              className="absolute pointer-events-none transition-all duration-75"
              style={{
                top: '35.4%',
                left: '50.8%',
                transform: 'translate(-50%, -50%)',
                width: '10.5%',
                height: '4.8%',
              }}
            >
              <svg 
                viewBox="0 0 100 48" 
                className="w-full h-full drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]"
              >
                {visemeIndex === 1 && (
                  /* Slight open vowel */
                  <g>
                    <ellipse cx="50" cy="24" rx="28" ry="10" fill="#2d0a0a" opacity="0.95" />
                    <ellipse cx="50" cy="20" rx="20" ry="3" fill="#ffffff" opacity="0.85" />
                    <path d="M 22 24 Q 50 28 78 24 Q 50 32 22 24 Z" fill="#9d4a40" />
                  </g>
                )}
                {visemeIndex === 2 && (
                  /* Wide open articulation */
                  <g>
                    <ellipse cx="50" cy="24" rx="30" ry="14" fill="#240707" opacity="0.98" />
                    <ellipse cx="50" cy="18" rx="22" ry="4" fill="#ffffff" opacity="0.9" />
                    <ellipse cx="50" cy="30" rx="16" ry="3.5" fill="#c45a4d" />
                    <path d="M 20 22 Q 50 38 80 22" stroke="#7a342b" strokeWidth="2.5" fill="none" />
                  </g>
                )}
                {visemeIndex === 3 && (
                  /* Round consonant/consonant blend */
                  <g>
                    <ellipse cx="50" cy="24" rx="24" ry="11" fill="#300a0a" opacity="0.95" />
                    <ellipse cx="50" cy="19" rx="17" ry="3" fill="#ffffff" opacity="0.8" />
                    <path d="M 25 24 Q 50 31 75 24" stroke="#8c3e34" strokeWidth="2" fill="none" />
                  </g>
                )}
              </svg>
            </div>
          )}

          {/* Micro Eye-Blink Overlay */}
          {isBlinking && (
            <div 
              className="absolute pointer-events-none"
              style={{
                top: '28.2%',
                left: '50.8%',
                transform: 'translate(-50%, -50%)',
                width: '42%',
                height: '7%',
              }}
            >
              <svg viewBox="0 0 160 30" className="w-full h-full opacity-90">
                <path d="M 28 14 Q 48 24 68 14" stroke="#4a2e1d" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                <path d="M 92 14 Q 112 24 132 14" stroke="#4a2e1d" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              </svg>
            </div>
          )}

          {/* Laptop Screen Active Code Stream in Bottom-Right */}
          <div 
            className="absolute bottom-2 right-2 p-2 rounded-lg bg-black/80 border border-cyan-500/40 text-[9px] font-mono text-cyan-300 max-w-[150px] shadow-lg pointer-events-none hidden sm:block backdrop-blur-sm"
          >
            <div className="flex items-center gap-1.5 pb-1 border-b border-cyan-500/20 text-[8px] text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>IDE: main.cpp / ESP32</span>
            </div>
            <div className="pt-1 text-[8px] leading-tight space-y-0.5 opacity-90 font-mono">
              <div className="text-cyan-400 truncate">#include &lt;WiFi.h&gt;</div>
              <div className="text-blue-300 truncate">digitalWrite(RELAY, ON);</div>
              <div className="text-emerald-400 truncate animate-pulse">// 80.6% Anna Univ ECE</div>
            </div>
          </div>

          {/* Soft Bottom Cinematic Gradient */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#03060d] via-[#03060d]/70 to-transparent pointer-events-none" />
        </div>

        {/* Presenter Mode Badge */}
        {showPresenterBadge && (
          <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 border border-blue-500/40 text-[10px] font-mono text-cyan-300 backdrop-blur-md shadow-md">
            <span className={`w-1.5 h-1.5 rounded-full ${isSpeaking ? 'bg-cyan-400 animate-ping' : 'bg-emerald-400'}`} />
            <span>{isSpeaking ? 'Presenter Live' : 'AI Presenter Ready'}</span>
          </div>
        )}
      </div>

      {/* Cyber Corner HUD Tech Markers */}
      <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-400/60 pointer-events-none" />
      <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t-2 border-r-2 border-cyan-400/60 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b-2 border-l-2 border-blue-400/60 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b-2 border-r-2 border-blue-400/60 pointer-events-none" />
    </div>
  );
};
