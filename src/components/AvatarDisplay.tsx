import React, { useState, useEffect } from 'react';

interface AvatarDisplayProps {
  size?: 'sm' | 'md' | 'lg' | 'hero' | 'avatar-modal';
  isSpeaking?: boolean;
  avatarState?: 'idle' | 'listening' | 'thinking' | 'speaking';
  className?: string;
}

export const AvatarDisplay: React.FC<AvatarDisplayProps> = ({
  size = 'hero',
  isSpeaking = false,
  avatarState = 'idle',
  className = '',
}) => {
  const [photoSrc, setPhotoSrc] = useState<string | null>(null);
  const [mouthOpen, setMouthOpen] = useState(false);

  // Load photo from local assets or session storage without any upload controls
  useEffect(() => {
    // 1. Check if profile photo exists in public/assets/profile/
    const candidatePaths = [
      '/assets/profile/profile.jpg',
      '/assets/profile/avatar.png',
      '/profile.jpg'
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

    // 2. Check saved browser storage fallback
    try {
      const saved = localStorage.getItem('suriyanarayanan_custom_avatar');
      if (saved && !found) {
        setPhotoSrc(saved);
      }
    } catch {
      // Storage access exception catch
    }
  }, []);

  // Subtle mouth movement cadence during active speech
  useEffect(() => {
    if (!isSpeaking) {
      setMouthOpen(false);
      return;
    }

    const interval = setInterval(() => {
      setMouthOpen(prev => !prev);
    }, 180);

    return () => clearInterval(interval);
  }, [isSpeaking]);

  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-28 h-28',
    hero: 'w-[280px] h-[360px] sm:w-[320px] sm:h-[410px] md:w-[350px] md:h-[440px]',
    'avatar-modal': 'w-60 h-72 md:w-72 md:h-84',
  }[size];

  const currentState = isSpeaking ? 'speaking' : avatarState;

  return (
    <div className={`relative group select-none ${className}`}>
      {/* Dynamic Multi-Color Ambient Backlight */}
      <div 
        className={`absolute -inset-4 sm:-inset-6 rounded-[36px] blur-2xl transition-all duration-700 pointer-events-none ${
          currentState === 'speaking'
            ? 'bg-gradient-to-r from-blue-600/35 via-cyan-500/40 to-violet-600/35 opacity-100 scale-105'
            : currentState === 'listening'
            ? 'bg-gradient-to-r from-emerald-500/30 via-cyan-500/30 to-blue-500/30 opacity-80'
            : currentState === 'thinking'
            ? 'bg-gradient-to-r from-violet-600/35 via-amber-500/25 to-blue-600/30 opacity-90'
            : 'bg-blue-600/15 opacity-60'
        }`}
      />

      {/* Cyber Rotating Halo for Speaking/Listening */}
      {currentState === 'speaking' && (
        <div className="absolute -inset-2.5 rounded-[32px] border-2 border-cyan-400/80 shadow-[0_0_30px_rgba(6,182,212,0.6)] animate-pulse pointer-events-none z-10" />
      )}
      {currentState === 'listening' && (
        <div className="absolute -inset-2.5 rounded-[32px] border-2 border-emerald-400/80 shadow-[0_0_30px_rgba(16,185,129,0.5)] animate-pulse pointer-events-none z-10" />
      )}

      {/* Main Avatar Container with Breathing Animation */}
      <div
        className={`relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#0c162c] via-[#070e1c] to-[#03060d] border ${
          currentState === 'speaking' 
            ? 'border-cyan-400/70 shadow-[0_0_50px_rgba(6,182,212,0.3)]' 
            : currentState === 'listening'
            ? 'border-emerald-400/70 shadow-[0_0_40px_rgba(16,185,129,0.25)]'
            : 'border-blue-500/30 shadow-[0_0_40px_rgba(37,99,235,0.2)]'
        } ${sizeClasses} flex items-center justify-center transition-all duration-500`}
        style={{
          animation: isSpeaking ? 'breathing 2.4s ease-in-out infinite' : 'breathing 4s ease-in-out infinite'
        }}
      >
        {photoSrc ? (
          /* Actual Uploaded Portrait Image */
          <div className="w-full h-full relative flex items-center justify-center bg-[#05080c] overflow-hidden">
            <img
              src={photoSrc}
              alt="Suriyanarayanan R"
              className="w-full h-full object-cover object-top transition-transform duration-500"
              style={{
                transform: isSpeaking ? 'scale(1.02)' : 'scale(1.0)',
              }}
              referrerPolicy="no-referrer"
            />
            {/* Soft Ambient Cinematic Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#03060d] via-transparent to-transparent opacity-60 pointer-events-none" />
          </div>
        ) : (
          /* High-Fidelity Custom Vector Representation of Suriyanarayanan R (Formal Suit, Cream Shirt, Tie, Lapel Pin & Mustache) */
          <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-b from-[#0e192f] via-[#08101e] to-[#03050c]">
            {/* Background cyan/violet aura */}
            <div className="absolute top-1/4 w-48 h-48 rounded-full bg-cyan-500/15 blur-2xl pointer-events-none" />
            <div className="absolute bottom-1/4 w-48 h-48 rounded-full bg-violet-500/15 blur-2xl pointer-events-none" />

            <svg
              viewBox="0 0 320 380"
              className="w-full h-full object-cover transform translate-y-2 scale-105"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="avatarHairGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#121316" />
                  <stop offset="100%" stopColor="#08080a" />
                </linearGradient>

                <linearGradient id="avatarSkinGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#db9f77" />
                  <stop offset="60%" stopColor="#c58a62" />
                  <stop offset="100%" stopColor="#b1754e" />
                </linearGradient>

                <linearGradient id="avatarSuitGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1d263b" />
                  <stop offset="40%" stopColor="#121a2a" />
                  <stop offset="100%" stopColor="#070b13" />
                </linearGradient>

                <linearGradient id="avatarShirtGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fffaf0" />
                  <stop offset="100%" stopColor="#f2e9d2" />
                </linearGradient>

                <linearGradient id="avatarTieGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1b1c22" />
                  <stop offset="100%" stopColor="#0b0b0f" />
                </linearGradient>
              </defs>

              {/* Suit Shoulders & Torso */}
              <path
                d="M 50 380 L 70 290 Q 95 240 160 235 Q 225 240 250 290 L 270 380 Z"
                fill="url(#avatarSuitGrad)"
              />

              {/* Cream Shirt Collar & Front */}
              <polygon
                points="128,245 160,310 192,245 180,235 140,235"
                fill="url(#avatarShirtGrad)"
              />

              {/* Suit Lapels */}
              <path
                d="M 95 248 L 138 340 L 160 380 L 115 380 Z"
                fill="#161f30"
              />
              <path
                d="M 225 248 L 182 340 L 160 380 L 205 380 Z"
                fill="#101826"
              />

              {/* Necktie */}
              <polygon
                points="154,260 166,260 170,360 160,378 150,360"
                fill="url(#avatarTieGrad)"
              />
              <polygon
                points="152,254 168,254 165,268 155,268"
                fill="#252730"
              />

              {/* Gold Lapel Pin */}
              <circle cx="118" cy="275" r="4.5" fill="#f59e0b" />
              <circle cx="118" cy="275" r="2.5" fill="#fbbf24" />

              {/* Neck */}
              <path
                d="M 136 210 L 136 248 Q 160 258 184 248 L 184 210 Z"
                fill="url(#avatarSkinGrad)"
              />
              <path
                d="M 136 210 Q 160 230 184 210 Z"
                fill="#9e623c"
                opacity="0.35"
              />

              {/* Head / Face */}
              <path
                d="M 112 135 C 112 85 208 85 208 135 C 208 178 195 220 160 222 C 125 220 112 178 112 135 Z"
                fill="url(#avatarSkinGrad)"
              />

              {/* Ears */}
              <ellipse cx="111" cy="148" rx="6.5" ry="12" fill="#c58a62" />
              <ellipse cx="209" cy="148" rx="6.5" ry="12" fill="#b97e56" />

              {/* Hair */}
              <path
                d="M 106 130 C 104 88 130 55 160 52 C 190 55 216 88 214 130 C 210 102 195 72 160 72 C 125 72 110 102 106 130 Z"
                fill="url(#avatarHairGrad)"
              />
              {/* Hair Volume Side */}
              <path
                d="M 106 130 C 104 110 112 90 120 85 C 112 95 109 110 110 135 Z"
                fill="#08080a"
              />
              <path
                d="M 214 130 C 216 110 208 90 200 85 C 208 95 211 110 210 135 Z"
                fill="#08080a"
              />

              {/* Eyebrows */}
              <path
                d="M 126 128 Q 142 124 148 128"
                stroke="#1c1c20"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 172 128 Q 178 124 194 128"
                stroke="#1c1c20"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />

              {/* Eyes */}
              <ellipse cx="138" cy="140" rx="6" ry="3.5" fill="#ffffff" />
              <circle cx="138" cy="140" r="2.8" fill="#1b1c20" />
              <circle cx="137" cy="139" r="1" fill="#ffffff" />

              <ellipse cx="182" cy="140" rx="6" ry="3.5" fill="#ffffff" />
              <circle cx="182" cy="140" r="2.8" fill="#1b1c20" />
              <circle cx="181" cy="139" r="1" fill="#ffffff" />

              {/* Nose */}
              <path
                d="M 160 136 L 157 165 Q 160 169 164 165"
                stroke="#a66a44"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />

              {/* Authentic Mustache */}
              <path
                d="M 144 176 Q 160 171 176 176 Q 168 184 160 180 Q 152 184 144 176 Z"
                fill="#121316"
              />

              {/* Lip-Sync Animated Mouth */}
              {isSpeaking && mouthOpen ? (
                <path
                  d="M 151 187 Q 160 196 169 187 Q 160 191 151 187 Z"
                  fill="#451818"
                />
              ) : (
                <path
                  d="M 152 187 Q 160 190 168 187"
                  stroke="#8f4a38"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />
              )}
            </svg>
          </div>
        )}

        {/* Live Audio Reactive Waveform Overlay at Bottom */}
        {currentState === 'speaking' && (
          <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-1 z-20 pointer-events-none px-6">
            <div className="h-6 w-1 bg-cyan-400 rounded-full animate-wave-1 shadow-[0_0_8px_#06b6d4]" />
            <div className="h-8 w-1 bg-blue-400 rounded-full animate-wave-2 shadow-[0_0_8px_#60a5fa]" />
            <div className="h-4 w-1 bg-violet-400 rounded-full animate-wave-3 shadow-[0_0_8px_#a78bfa]" />
            <div className="h-9 w-1 bg-cyan-300 rounded-full animate-wave-4 shadow-[0_0_8px_#67e8f9]" />
            <div className="h-5 w-1 bg-blue-500 rounded-full animate-wave-5 shadow-[0_0_8px_#3b82f6]" />
            <div className="h-7 w-1 bg-cyan-400 rounded-full animate-wave-2 shadow-[0_0_8px_#06b6d4]" />
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
