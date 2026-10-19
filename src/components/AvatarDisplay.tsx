import React, { useState, useEffect, useRef } from 'react';
import { Camera, RefreshCw } from 'lucide-react';

interface AvatarDisplayProps {
  size?: 'sm' | 'md' | 'lg' | 'hero' | 'avatar-modal';
  isSpeaking?: boolean;
  className?: string;
  showUploadTrigger?: boolean;
}

export const AvatarDisplay: React.FC<AvatarDisplayProps> = ({
  size = 'hero',
  isSpeaking = false,
  className = '',
  showUploadTrigger = false,
}) => {
  const [customPhoto, setCustomPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('suriyanarayanan_custom_avatar');
      if (saved) {
        setCustomPhoto(saved);
      }
    } catch {
      // LocalStorage access exception catch
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setCustomPhoto(result);
          try {
            localStorage.setItem('suriyanarayanan_custom_avatar', result);
          } catch {
            // storage quota fallback
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const resetToDefault = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      localStorage.removeItem('suriyanarayanan_custom_avatar');
    } catch {
      // ignore
    }
    setCustomPhoto(null);
  };

  // Dimensional styles tailored to realistic portrait aspect ratio (approx 3:4 / 4:5)
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-28 h-28',
    hero: 'w-[280px] h-[350px] sm:w-[320px] sm:h-[400px] md:w-[340px] md:h-[425px]',
    'avatar-modal': 'w-56 h-64 md:w-64 md:h-72',
  }[size];

  return (
    <div className={`relative group ${className}`}>
      {/* Outer audio pulse wave when speaking */}
      {isSpeaking && (
        <>
          <div className="absolute -inset-4 rounded-3xl bg-emerald-500/20 blur-xl animate-pulse" />
          <div className="absolute -inset-1 rounded-2xl border-2 border-emerald-400 animate-ping opacity-60 pointer-events-none" />
        </>
      )}

      {/* Futuristic Frame Container */}
      <div
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 via-[#0a1118] to-[#040609] border border-emerald-500/35 shadow-[0_0_40px_rgba(16,185,129,0.18)] ${sizeClasses} flex items-center justify-center transition-all duration-300 group-hover:border-emerald-400/60`}
      >
        {customPhoto ? (
          <div className="w-full h-full flex items-center justify-center bg-[#05080c] overflow-hidden">
            <img
              src={customPhoto}
              alt="Suriyanarayanan R"
              className="w-full h-full object-contain object-top transition-transform duration-300 group-hover:scale-[1.01]"
              referrerPolicy="no-referrer"
              style={{ maxHeight: '100%', maxWidth: '100%' }}
            />
          </div>
        ) : (
          /* High-Fidelity Custom Vector Representation of Suriyanarayanan R (in his formal suit, cream shirt, tie, lapel pin & mustache) */
          <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-b from-[#131d27] via-[#0d151e] to-[#05080c] select-none">
            {/* Ambient emerald backlight */}
            <div className="absolute top-1/4 w-48 h-48 rounded-full bg-emerald-500/15 blur-2xl" />
            
            {/* High-detail SVG Portrait of Suriyanarayanan R */}
            <svg
              viewBox="0 0 320 380"
              className="w-full h-full object-cover transform translate-y-2 scale-105"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Hair Gradient */}
                <linearGradient id="hairGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#141416" />
                  <stop offset="100%" stopColor="#0a0a0c" />
                </linearGradient>

                {/* Skin Tone Gradient */}
                <linearGradient id="skinGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#d89f78" />
                  <stop offset="60%" stopColor="#c88b63" />
                  <stop offset="100%" stopColor="#b4764e" />
                </linearGradient>

                {/* Dark Suit Gradient */}
                <linearGradient id="suitGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1c2027" />
                  <stop offset="40%" stopColor="#12161c" />
                  <stop offset="100%" stopColor="#080a0e" />
                </linearGradient>

                {/* Cream Shirt Gradient */}
                <linearGradient id="shirtGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fffaf0" />
                  <stop offset="100%" stopColor="#f3ebd7" />
                </linearGradient>

                {/* Tie Gradient */}
                <linearGradient id="tieGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1c1c20" />
                  <stop offset="100%" stopColor="#0d0d10" />
                </linearGradient>
              </defs>

              {/* Background ambient lighting */}
              <circle cx="160" cy="140" r="110" fill="#10b981" opacity="0.08" />

              {/* Suit Shoulders & Jacket */}
              <path
                d="M30 380 L60 270 L110 235 L160 260 L210 235 L260 270 L290 380 Z"
                fill="url(#suitGrad)"
                stroke="#2a333f"
                strokeWidth="1.5"
              />
              
              {/* Suit Lapels */}
              {/* Left Lapel */}
              <path
                d="M110 235 L85 300 L125 380 L145 380 L125 270 Z"
                fill="#161b22"
                stroke="#334155"
                strokeWidth="1"
              />
              {/* Right Lapel */}
              <path
                d="M210 235 L235 300 L195 380 L175 380 L195 270 Z"
                fill="#161b22"
                stroke="#334155"
                strokeWidth="1"
              />

              {/* Lapel Pin on Left Chest (Right side in SVG) */}
              <circle cx="230" cy="285" r="5" fill="#1e293b" stroke="#94a3b8" strokeWidth="1" />
              <polygon points="230,282 233,287 227,287" fill="#10b981" />

              {/* Cream Shirt Collar */}
              <polygon points="120,230 160,270 145,225" fill="url(#shirtGrad)" stroke="#e2d8c3" strokeWidth="0.8" />
              <polygon points="200,230 160,270 175,225" fill="url(#shirtGrad)" stroke="#e2d8c3" strokeWidth="0.8" />
              <polygon points="140,225 160,250 180,225" fill="#f5eee0" />

              {/* Black Tie */}
              {/* Knot */}
              <polygon points="152,246 168,246 165,264 155,264" fill="#111317" stroke="#333" strokeWidth="0.5" />
              {/* Tie Body */}
              <polygon points="154,264 166,264 172,360 160,380 148,360" fill="url(#tieGrad)" stroke="#222" strokeWidth="0.5" />
              {/* Tie Subtle Sheen */}
              <path d="M158 266 L164 266 L167 360 L161 370" fill="none" stroke="#38404a" strokeWidth="0.8" opacity="0.4" />

              {/* Neck */}
              <path d="M135 185 L135 240 L185 240 L185 185 Z" fill="#b87a52" />
              <path d="M140 215 L160 235 L180 215" fill="#a46843" opacity="0.6" />

              {/* Head Base / Face */}
              <path
                d="M105 130 C105 70, 215 70, 215 130 C215 195, 190 225, 160 225 C130 225, 105 195, 105 130 Z"
                fill="url(#skinGrad)"
              />

              {/* Ears */}
              <ellipse cx="102" cy="140" rx="7" ry="14" fill="#c3835c" />
              <ellipse cx="218" cy="140" rx="7" ry="14" fill="#c3835c" />

              {/* Neat Black Hair */}
              <path
                d="M102 125 C102 60, 140 45, 160 45 C180 45, 218 60, 218 125 C215 95, 195 75, 160 75 C125 75, 105 95, 102 125 Z"
                fill="url(#hairGrad)"
              />
              <path
                d="M104 110 C120 70, 160 60, 216 75 C190 68, 130 70, 104 110 Z"
                fill="#24282f"
                opacity="0.5"
              />

              {/* Eyebrows */}
              <path d="M120 120 Q133 115 145 120" stroke="#1c1917" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              <path d="M175 120 Q187 115 200 120" stroke="#1c1917" strokeWidth="3.5" strokeLinecap="round" fill="none" />

              {/* Eyes */}
              {/* Left Eye */}
              <ellipse cx="134" cy="130" rx="7" ry="4.5" fill="#ffffff" />
              <circle cx="134" cy="130" r="3.2" fill="#2d1b10" />
              <circle cx="134" cy="130" r="1.5" fill="#09090b" />
              <circle cx="135.5" cy="128.5" r="0.9" fill="#ffffff" />

              {/* Right Eye */}
              <ellipse cx="186" cy="130" rx="7" ry="4.5" fill="#ffffff" />
              <circle cx="186" cy="130" r="3.2" fill="#2d1b10" />
              <circle cx="186" cy="130" r="1.5" fill="#09090b" />
              <circle cx="187.5" cy="128.5" r="0.9" fill="#ffffff" />

              {/* Nose */}
              <path d="M160 125 L160 152 L152 156 L168 156" fill="none" stroke="#9e623c" strokeWidth="2" strokeLinecap="round" />

              {/* Well-Groomed Neat Mustache */}
              <path
                d="M142 170 Q160 165 178 170 Q168 176 160 174 Q152 176 142 170 Z"
                fill="#18181b"
              />

              {/* Natural Smile Line (kept authentic and static as requested) */}
              <path d="M151 182 Q160 186 169 182" stroke="#8a4b27" strokeWidth="2" strokeLinecap="round" fill="none" />

              {/* Subtle forehead detail from real photo */}
              <line x1="158" y1="96" x2="162" y2="96" stroke="#fef08a" strokeWidth="1.2" opacity="0.8" />
              <circle cx="160" cy="101" r="1" fill="#dc2626" opacity="0.8" />
            </svg>

            {/* Futuristic Tech Overlay Corners */}
            <div className="absolute top-2 left-2 text-[9px] font-mono text-emerald-400/70 tracking-widest">
              SR//ECE
            </div>
            <div className="absolute bottom-2 right-2 text-[9px] font-mono text-emerald-400/70 tracking-widest">
              VERIFIED
            </div>
          </div>
        )}

        {/* Scanline & HUD Grid Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.03] to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-emerald-400" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-emerald-400" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-emerald-400" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-emerald-400" />
      </div>

      {/* Hidden file input for photo upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Upload/Switch Photo action button */}
      {showUploadTrigger && (
        <div className="mt-3 flex items-center justify-center gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 bg-slate-900/90 hover:bg-slate-800 border border-emerald-500/30 hover:border-emerald-400 transition-all cursor-pointer shadow-sm"
            title="Upload or change with your photo file"
          >
            <Camera className="w-3.5 h-3.5 text-emerald-400" />
            <span>{customPhoto ? 'Change Photo' : 'Upload Original Photo'}</span>
          </button>

          {customPhoto && (
            <button
              onClick={resetToDefault}
              className="inline-flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-slate-200 bg-slate-900/90 border border-slate-700 hover:border-slate-600 transition-all cursor-pointer"
              title="Reset to default stylized avatar"
            >
              <RefreshCw className="w-3 h-3" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
