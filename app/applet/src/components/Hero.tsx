import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Volume2, 
  ArrowRight, 
  Download, 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Award, 
  Cpu, 
  Check, 
  ChevronDown,
  Pause,
  Play,
  RotateCcw,
  Square,
  Maximize2,
  Sparkles,
  Info,
  AlertCircle
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';
import { AvatarDisplay } from './AvatarDisplay.tsx';
import { TalkingAvatarState } from '../hooks/useTalkingAvatar.ts';
import { AudioWaveformVisualizer } from './AudioWaveformVisualizer.tsx';

interface HeroProps {
  onOpenAvatarModal: () => void;
  onOpenResume: () => void;
  talkingAvatar: TalkingAvatarState;
}

export const Hero: React.FC<HeroProps> = ({ 
  onOpenAvatarModal, 
  onOpenResume,
  talkingAvatar 
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [showVoiceInfo, setShowVoiceInfo] = useState(false);

  const {
    isSpeaking,
    isPaused,
    hasStarted,
    hasEnded,
    isSupported,
    currentWordIndex,
    isMaleVoice,
    voiceStatusMessage,
    words,
    start,
    pause,
    resume,
    replay,
    stop,
  } = talkingAvatar;

  const isTalkingActive = isSpeaking || isPaused || hasStarted || hasEnded;

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / 45;
      const y = (e.clientY - innerHeight / 2) / 45;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const heroSkills = [
    "Java Full Stack",
    "Embedded Systems",
    "ESP32 & Arduino",
    "IoT Architecture",
    "HTML5 & CSS3",
    "Bootstrap",
    "Telecom & OFC",
    "Machine Learning (ML)"
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleMeetMeClick = () => {
    if (isSpeaking && !isPaused) {
      pause();
    } else if (isPaused) {
      resume();
    } else {
      start();
    }
  };

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between overflow-hidden bg-[#030712]">
      {/* Layered Cinematic Cobalt & Violet Atmospheric Lighting */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[600px] bg-blue-600/15 blur-[170px] pointer-events-none rounded-full transition-transform duration-700 ease-out"
        style={{ transform: `translate(calc(-50% + ${mouseOffset.x * 1.5}px), calc(-50% + ${mouseOffset.y * 1.5}px))` }}
      />
      <div 
        className="absolute top-1/3 -left-32 w-[480px] h-[480px] bg-violet-600/15 blur-[150px] pointer-events-none rounded-full transition-transform duration-700 ease-out"
        style={{ transform: `translate(${mouseOffset.x * -1}px, ${mouseOffset.y * -1}px)` }}
      />
      <div 
        className="absolute bottom-10 -right-32 w-[500px] h-[500px] bg-cyan-600/12 blur-[160px] pointer-events-none rounded-full transition-transform duration-700 ease-out"
        style={{ transform: `translate(${mouseOffset.x * 0.8}px, ${mouseOffset.y * 0.8}px)` }}
      />

      {/* Cyber Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Narrative, Name, & Actions */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col space-y-6"
          >
            
            {/* Live Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-blue-500/30 text-xs font-mono text-cyan-300 w-fit backdrop-blur-xl shadow-[0_0_25px_rgba(59,130,246,0.2)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span>2026 ECE Graduate · Open to IT & Embedded Roles</span>
            </div>

            {/* Oversized Bold Headline: Suriyanarayanan R on one line on desktop without period */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[4.25rem] 2xl:text-[4.75rem] font-extrabold text-white tracking-tight font-heading leading-tight">
                <span className="inline-block whitespace-nowrap">
                  Suriyanarayanan{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 text-glow-cobalt">
                    R
                  </span>
                </span>
              </h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-xl sm:text-2xl md:text-3xl font-medium text-blue-200/90 font-heading tracking-wide"
              >
                “{PERSONAL_INFO.tagline}”
              </motion.p>
            </div>

            {/* Introduction text with exact Anna University academic requirement */}
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-sans text-justify"
            >
              Motivated 2026 Electronics and Communication Engineering graduate from{' '}
              <span className="text-white font-semibold">Kings College of Engineering</span> with{' '}
              <span className="text-cyan-300 font-bold font-mono px-2 py-0.5 rounded bg-blue-950/70 border border-blue-500/40 shadow-sm">
                {PERSONAL_INFO.academicScore}
              </span>.
              Specializing in embedded systems, IoT architectures, Java Full Stack development, and machine learning. 
              Patent applicant, workshop resource person, and multiple 1st-prize symposium winner.
            </motion.p>

            {/* Animated Skill Tags */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                Core Engineering Stack:
              </span>
              <div className="flex flex-wrap gap-2">
                {heroSkills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-900/90 text-slate-200 border border-blue-500/20 hover:border-cyan-400 hover:text-cyan-300 transition-all cursor-default hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] backdrop-blur-sm"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Working Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              {/* Meet Me Button: Activates Talking Avatar */}
              <button
                onClick={handleMeetMeClick}
                className={`group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all cursor-pointer transform hover:-translate-y-0.5 border ${
                  isSpeaking && !isPaused
                    ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 text-white border-cyan-300 shadow-[0_0_35px_rgba(59,130,246,0.7)] animate-pulse'
                    : isPaused
                    ? 'bg-amber-400 text-black border-amber-300 shadow-[0_0_25px_rgba(251,191,36,0.5)]'
                    : hasEnded
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-400 shadow-[0_0_25px_rgba(59,130,246,0.5)]'
                    : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white border-blue-400/40 shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_45px_rgba(139,92,246,0.65)]'
                }`}
                title="Hear Suriyanarayanan R's voice introduction"
              >
                {isSpeaking && !isPaused ? (
                  <Pause className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                ) : (
                  <Volume2 className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                )}
                <span>
                  {isSpeaking && !isPaused ? 'Pause Voice' : isPaused ? 'Resume Voice' : hasEnded ? 'Replay Voice' : 'Meet Me'}
                </span>
                <span className="text-[10px] font-mono uppercase bg-black/25 px-2 py-0.5 rounded text-white font-extrabold">
                  {isSpeaking && !isPaused ? 'Speaking' : isPaused ? 'Paused' : 'Talking Avatar'}
                </span>
              </button>

              {/* Explore My Work Button */}
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-100 hover:text-cyan-300 text-sm font-medium border border-blue-500/30 hover:border-cyan-400 transition-all cursor-pointer shadow-sm group backdrop-blur-sm"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-cyan-400" />
              </a>

              {/* Download Resume Button */}
              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white text-sm font-medium border border-slate-700 hover:border-blue-500/50 transition-all cursor-pointer backdrop-blur-sm"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Download Resume</span>
              </button>
            </div>

            {/* Social Links & Quick Contact */}
            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 border-t border-slate-800/80">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>github/suriyanarayanan5126</span>
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[#0077b5] transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 hover:text-cyan-400 transition-colors cursor-pointer"
                title="Click to copy email address"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-cyan-400" /> : <Mail className="w-3.5 h-3.5" />}
                <span>{copiedEmail ? 'Email Copied!' : PERSONAL_INFO.email}</span>
              </button>

              <span className="inline-flex items-center gap-1.5 text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>Mannargudi, TN</span>
              </span>
            </div>

          </motion.div>

          {/* Right Column: Interactive Talking Avatar Portrait Station */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-center justify-center relative"
            style={{
              transform: `perspective(1000px) rotateY(${mouseOffset.x * 0.35}deg) rotateX(${-mouseOffset.y * 0.35}deg)`,
              transition: 'transform 0.2s ease-out'
            }}
          >
            
            {/* Portrait Frame with Cyber Halo and Active Talking Ring */}
            <div className="relative flex flex-col items-center w-full max-w-[340px] sm:max-w-[380px]">
              
              {/* Outer subtle animated halo */}
              <div className={`absolute -inset-4 sm:-inset-6 rounded-[36px] border ${
                isSpeaking && !isPaused 
                  ? 'border-cyan-400/50 shadow-[0_0_50px_rgba(59,130,246,0.45)]' 
                  : 'border-blue-500/20'
              } animate-spin-slow pointer-events-none transition-all duration-500`} />

              {/* Glowing active speech double ring around portrait during speech */}
              {isSpeaking && !isPaused && (
                <>
                  <div className="absolute -inset-2.5 rounded-[32px] border-2 border-cyan-400 shadow-[0_0_35px_rgba(34,211,238,0.7)] animate-pulse pointer-events-none z-10" />
                  <div className="absolute -inset-1 rounded-2xl border border-violet-400/60 shadow-[0_0_20px_rgba(167,139,250,0.5)] pointer-events-none z-10" />
                </>
              )}

              {/* Main Portrait Card Container */}
              <div className="relative w-full p-3 sm:p-3.5 rounded-3xl bg-gradient-to-b from-blue-900/30 via-slate-900/80 to-slate-950/95 border border-blue-500/35 backdrop-blur-2xl shadow-[0_15px_50px_rgba(0,0,0,0.7),0_0_40px_rgba(59,130,246,0.2)] flex flex-col items-center">
                
                {/* Upper Status Tag: Shows voice synth status & clear speaking state */}
                <div className="w-full flex items-center justify-between px-2 pb-2 text-[11px] font-mono border-b border-blue-500/20 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${
                      isSpeaking && !isPaused 
                        ? 'bg-cyan-400 animate-ping' 
                        : isPaused 
                        ? 'bg-amber-400' 
                        : hasEnded
                        ? 'bg-blue-400'
                        : 'bg-slate-500'
                    }`} />
                    <span className="text-slate-200 font-medium truncate">
                      {isSpeaking && !isPaused 
                        ? 'Avatar Speaking' 
                        : isPaused 
                        ? 'Avatar Paused' 
                        : hasEnded 
                        ? 'Intro Finished' 
                        : 'Interactive Avatar'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setShowVoiceInfo(!showVoiceInfo)}
                      className="text-slate-400 hover:text-cyan-300 transition-colors p-1"
                      title="Voice detection details"
                    >
                      <Info className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={onOpenAvatarModal}
                      className="text-slate-400 hover:text-white transition-colors p-1"
                      title="Expand to Full Avatar Modal"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Voice info dropdown banner */}
                <AnimatePresence>
                  {showVoiceInfo && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="w-full mb-2 p-2.5 rounded-xl bg-slate-950/95 border border-blue-500/30 text-[10px] font-mono text-slate-300 overflow-hidden shadow-lg"
                    >
                      <div className="flex items-center gap-1.5 text-cyan-400 font-semibold mb-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Speech Synthesis Engine</span>
                      </div>
                      <p className="leading-snug text-slate-200">{voiceStatusMessage}</p>
                      <p className="text-slate-400 mt-1">
                        {isMaleVoice
                          ? 'Natural adult male English voice prioritized automatically via Web Speech API.'
                          : 'No dedicated adult male voice package installed on this device. Fallback voice is pitch-calibrated to a warm tone.'}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Portrait Visual: Preserved exact portrait handling */}
                <div className="relative">
                  <AvatarDisplay
                    size="hero"
                    isSpeaking={isSpeaking && !isPaused}
                    showUploadTrigger={true}
                  />

                  {/* Dynamic Multi-Bar Equalizer Audio Waveform Overlay */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20">
                    <AudioWaveformVisualizer 
                      isSpeaking={isSpeaking}
                      isPaused={isPaused}
                      barCount={12}
                    />
                  </div>
                </div>

                {/* In-Card Interactive Captions & Playback Controls Console */}
                <AnimatePresence>
                  {isTalkingActive ? (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="w-full mt-3 flex flex-col space-y-2.5 overflow-hidden"
                    >
                      {/* Synchronized Word Captions */}
                      <div className="p-2.5 rounded-xl bg-slate-950/90 border border-blue-500/30 text-xs font-sans text-slate-300 max-h-24 overflow-y-auto leading-relaxed shadow-inner">
                        <p>
                          {words.map((word, idx) => {
                            const isActive = idx === currentWordIndex;
                            return (
                              <span
                                key={idx}
                                className={`inline-block mr-1 transition-colors duration-150 ${
                                  isActive
                                    ? 'text-cyan-300 font-bold bg-blue-500/30 px-1 rounded shadow-[0_0_10px_rgba(59,130,246,0.6)]'
                                    : idx < currentWordIndex
                                    ? 'text-slate-200'
                                    : 'text-slate-500'
                                }`}
                              >
                                {word}
                              </span>
                            );
                          })}
                        </p>
                      </div>

                      {/* Working Playback Controls: Pause/Resume, Replay, Stop */}
                      <div className="flex items-center justify-between px-1">
                        <div className="flex items-center gap-1.5">
                          {isSpeaking && !isPaused ? (
                            <button
                              onClick={pause}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-400 text-white font-semibold text-xs transition-all cursor-pointer shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                              title="Pause speech"
                            >
                              <Pause className="w-3.5 h-3.5 fill-current" />
                              <span>Pause</span>
                            </button>
                          ) : isPaused ? (
                            <button
                              onClick={resume}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-400 text-white font-semibold text-xs transition-all cursor-pointer shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                              title="Resume speech"
                            >
                              <Play className="w-3.5 h-3.5 fill-current" />
                              <span>Resume</span>
                            </button>
                          ) : (
                            <button
                              onClick={start}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs transition-all cursor-pointer shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                              title="Play introduction"
                            >
                              <Play className="w-3.5 h-3.5 fill-current" />
                              <span>{hasEnded ? 'Replay' : 'Play'}</span>
                            </button>
                          )}

                          <button
                            onClick={replay}
                            className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-blue-400 text-slate-300 hover:text-white transition-colors cursor-pointer"
                            title="Replay from beginning"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={stop}
                            className="p-1.5 rounded-lg bg-rose-950/40 border border-rose-500/40 text-rose-300 hover:bg-rose-900/60 transition-colors cursor-pointer"
                            title="Stop speech and reset animation"
                          >
                            <Square className="w-3.5 h-3.5 fill-current" />
                          </button>
                        </div>

                        <span className="text-[10px] font-mono text-cyan-400">
                          {currentWordIndex >= 0 
                            ? `${currentWordIndex + 1}/${words.length} wds` 
                            : hasEnded 
                            ? 'Finished' 
                            : 'Voice Ready'}
                        </span>
                      </div>
                    </motion.div>
                  ) : (
                    /* Idle Prompt */
                    <div className="w-full mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400 px-1">
                      <span>Click “Meet Me” to start voice</span>
                      <button 
                        onClick={start}
                        className="text-cyan-400 hover:text-cyan-300 hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Play Intro</span>
                      </button>
                    </div>
                  )}
                </AnimatePresence>

                {/* Missing Speech Synthesis Fallback Notice */}
                {!isSupported && (
                  <div className="w-full mt-2 p-2 rounded-lg bg-amber-950/30 border border-amber-500/30 flex items-center gap-2 text-[10px] font-mono text-amber-300">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>Browser speech synthesis not supported. Read captions above.</span>
                  </div>
                )}

              </div>

              {/* Repositioned Badges: Mounted Neatly Below the Portrait with Ample Clearance */}
              <div className="w-full max-w-[320px] sm:max-w-[360px] md:max-w-[380px] mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 z-20">
                
                {/* Badge 1: Academic Result (80.6% — Anna University) */}
                <motion.div 
                  whileHover={{ y: -3, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="bg-slate-950/95 border border-blue-500/30 backdrop-blur-xl rounded-xl p-3 shadow-xl flex items-center gap-3 transition-all hover:border-cyan-400/50"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">ACADEMIC RESULT</div>
                    <div className="text-xs sm:text-sm font-bold text-cyan-300 font-heading truncate">
                      {PERSONAL_INFO.academicScore}
                    </div>
                  </div>
                </motion.div>

                {/* Badge 2: Patent Applied */}
                <motion.div 
                  whileHover={{ y: -3, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="bg-slate-950/95 border border-blue-500/30 backdrop-blur-xl rounded-xl p-3 shadow-xl flex items-center gap-3 transition-all hover:border-cyan-400/50"
                >
                  <div className="w-9 h-9 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[9px] font-mono text-cyan-400 font-bold uppercase tracking-wider">PATENT APPLIED</div>
                    <div className="text-[11px] font-mono text-slate-300 truncate">
                      Innovative Embedded System
                    </div>
                  </div>
                </motion.div>

              </div>

            </div>

          </motion.div>

        </div>
      </div>

      {/* Hero Bottom Transition Prompter into About */}
      <div className="w-full flex flex-col items-center justify-center pt-8 pointer-events-none select-none z-10">
        <a 
          href="#about"
          className="pointer-events-auto inline-flex flex-col items-center gap-1.5 text-[11px] font-mono tracking-widest text-slate-400 hover:text-cyan-400 transition-colors uppercase group cursor-pointer"
        >
          <span>Descend to Architecture</span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-cyan-400 group-hover:translate-y-0.5 transition-transform" />
          </motion.div>
        </a>
      </div>
    </section>
  );
};
