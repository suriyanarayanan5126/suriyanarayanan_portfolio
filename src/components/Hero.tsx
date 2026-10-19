import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Volume2, 
  ArrowRight, 
  Award, 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Cpu, 
  Check, 
  Pause, 
  Play, 
  RotateCcw, 
  Square, 
  Maximize2, 
  Sparkles, 
  Mic, 
  MicOff, 
  Send, 
  FolderGit2, 
  Phone 
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
  const [aiInputQuery, setAiInputQuery] = useState('');

  const {
    isSpeaking,
    isPaused,
    hasStarted,
    hasEnded,
    avatarState,
    currentWordIndex,
    words,
    isListening,
    transcript,
    start,
    pause,
    resume,
    replay,
    stop,
    askAI,
    startListening,
    stopListening
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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleAskAISubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (aiInputQuery.trim()) {
      askAI(aiInputQuery.trim());
      setAiInputQuery('');
    }
  };

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-20 flex flex-col justify-between overflow-hidden bg-[#030712]">
      {/* Layered Cinematic Aurora Light Orbs in Electric Cobalt, Violet, & Cyan */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[600px] bg-blue-600/18 blur-[160px] pointer-events-none rounded-full transition-transform duration-700 ease-out"
        style={{ transform: `translate(calc(-50% + ${mouseOffset.x * 1.5}px), calc(-50% + ${mouseOffset.y * 1.5}px))` }}
      />
      <div 
        className="absolute top-1/3 -left-32 w-[550px] h-[550px] bg-violet-600/15 blur-[150px] pointer-events-none rounded-full transition-transform duration-700 ease-out"
        style={{ transform: `translate(${mouseOffset.x * -1}px, ${mouseOffset.y * -1}px)` }}
      />
      <div 
        className="absolute bottom-10 -right-32 w-[550px] h-[550px] bg-cyan-500/15 blur-[150px] pointer-events-none rounded-full transition-transform duration-700 ease-out"
        style={{ transform: `translate(${mouseOffset.x * 0.8}px, ${mouseOffset.y * 0.8}px)` }}
      />

      {/* Futuristic Cyber Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Narrative, Name, Headline, Buttons */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col space-y-6"
          >
            
            {/* Live Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-950/40 border border-blue-500/30 text-xs font-mono text-cyan-300 w-fit backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.18)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span>2026 ECE Graduate · Open to IT & Embedded Roles</span>
            </div>

            {/* Name Presentation */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[4.2rem] xl:text-[4.75rem] font-extrabold text-white tracking-tight font-heading leading-none">
                <span className="inline-block">
                  SUR IYANARAYANAN{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-violet-300 text-glow-cobalt">
                    R
                  </span>
                </span>
              </h1>

              {/* Exact Requested Headline */}
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-200 to-violet-300 font-heading tracking-tight leading-snug">
                “Engineering Ideas Into Intelligent Experiences.”
              </p>

              {/* Exact Supporting Identity */}
              <div className="flex items-center gap-2 pt-1">
                <span className="text-sm sm:text-base font-semibold text-cyan-400 font-mono tracking-wide">
                  Electronics & Communication Engineer | Developer | IoT Innovator
                </span>
              </div>
            </div>

            {/* Introduction Bio */}
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.8 }}
              className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-sans"
            >
              2026 Electronics and Communication Engineering graduate from{' '}
              <strong className="text-white font-semibold">Kings College of Engineering</strong> with an academic score of{' '}
              <span className="text-cyan-300 font-bold font-mono px-2 py-0.5 rounded bg-blue-950/60 border border-blue-500/40">
                {PERSONAL_INFO.academicScore}
              </span>.
              Experienced in Java, HTML, CSS, Bootstrap, embedded hardware, ESP32, and IoT architectures.
              Patent applicant, workshop resource person, and symposium prize winner.
            </motion.p>

            {/* Core Action Buttons - EXACT PRIORITY 5 REQUIREMENTS */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              {/* 1. Explore My Projects */}
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:shadow-[0_0_35px_rgba(59,130,246,0.6)] transition-all cursor-pointer transform hover:-translate-y-0.5 group"
              >
                <FolderGit2 className="w-4 h-4 text-cyan-300" />
                <span>Explore My Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-cyan-300" />
              </a>

              {/* 2. View My Certificates */}
              <a
                href="#certificates"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#091122]/90 hover:bg-[#0f1d38] text-slate-100 hover:text-cyan-300 text-sm font-semibold border border-blue-500/30 hover:border-cyan-400 transition-all cursor-pointer shadow-sm group"
              >
                <Award className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                <span>View My Certificates</span>
              </a>

              {/* 3. Talk to My AI */}
              <button
                onClick={onOpenAvatarModal}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-violet-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 text-cyan-300 hover:text-white text-sm font-semibold border border-cyan-500/40 hover:border-cyan-300 transition-all cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.25)] group"
              >
                <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>Talk to My AI</span>
                <span className="text-[10px] font-mono uppercase bg-cyan-500/30 px-1.5 py-0.5 rounded text-cyan-200">
                  Interactive
                </span>
              </button>

              {/* 4. Contact Me */}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#091122]/90 hover:bg-[#0f1d38] text-slate-300 hover:text-white text-sm font-medium border border-slate-800 hover:border-blue-400 transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Quick Contact & Social Strip */}
            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 border-t border-slate-800/80">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
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
                <span>{copiedEmail ? 'Copied!' : PERSONAL_INFO.email}</span>
              </button>

              <span className="inline-flex items-center gap-1.5 text-slate-400">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>{PERSONAL_INFO.phone}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-blue-500" />
                <span>{PERSONAL_INFO.location}</span>
              </span>
            </div>

          </motion.div>

          {/* Right Column: Talking AI Avatar Presentation */}
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
            
            {/* Portrait Frame Container */}
            <div className="relative flex flex-col items-center w-full max-w-[340px] sm:max-w-[380px]">
              
              {/* Main Portrait Card Container */}
              <div className="relative w-full p-3 sm:p-4 rounded-3xl bg-gradient-to-b from-[#0b162c]/95 via-[#070e1c]/95 to-[#03060c]/98 border border-blue-500/40 backdrop-blur-xl shadow-[0_0_60px_rgba(37,99,235,0.25)] flex flex-col items-center">
                
                {/* Header Status Bar */}
                <div className="w-full flex items-center justify-between px-2 pb-2.5 text-[11px] font-mono border-b border-blue-500/20 mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${
                      avatarState === 'speaking'
                        ? 'bg-cyan-400 animate-ping'
                        : avatarState === 'listening'
                        ? 'bg-emerald-400 animate-pulse'
                        : avatarState === 'thinking'
                        ? 'bg-amber-400 animate-bounce'
                        : 'bg-blue-400'
                    }`} />
                    <span className="text-white font-semibold">
                      {avatarState === 'speaking'
                        ? 'AI Avatar Speaking'
                        : avatarState === 'listening'
                        ? 'Listening to Voice...'
                        : avatarState === 'thinking'
                        ? 'Thinking...'
                        : 'Suriyanarayanan AI Avatar'}
                    </span>
                  </div>

                  <button
                    onClick={onOpenAvatarModal}
                    className="p-1 rounded text-slate-400 hover:text-white transition-colors"
                    title="Expand Fullscreen AI Studio"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Portrait Visual: Real portrait with breathing & audio reactive lighting */}
                <div className="relative">
                  <AvatarDisplay
                    size="hero"
                    isSpeaking={isSpeaking && !isPaused}
                    avatarState={avatarState}
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

                {/* Working Playback Controls & Voice Trigger */}
                <div className="w-full mt-3 pt-3 border-t border-blue-500/20 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {isSpeaking && !isPaused ? (
                        <button
                          onClick={pause}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs transition-all cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                        >
                          <Pause className="w-3.5 h-3.5 fill-current" />
                          <span>Pause</span>
                        </button>
                      ) : isPaused ? (
                        <button
                          onClick={resume}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs transition-all cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Resume</span>
                        </button>
                      ) : (
                        <button
                          onClick={start}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-xs transition-all cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.35)]"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>{hasEnded ? 'Replay Voice' : 'Voice Intro'}</span>
                        </button>
                      )}

                      {isSpeaking && (
                        <button
                          onClick={stop}
                          className="p-1.5 rounded-lg bg-rose-950/40 border border-rose-500/40 text-rose-300 hover:bg-rose-900/60 transition-colors cursor-pointer"
                          title="Stop voice"
                        >
                          <Square className="w-3.5 h-3.5 fill-current" />
                        </button>
                      )}
                    </div>

                    {/* Microphone input trigger */}
                    <button
                      onClick={isListening ? stopListening : startListening}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                        isListening
                          ? 'bg-emerald-500 text-black font-bold animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                          : 'bg-slate-900 border border-slate-700 text-slate-300 hover:border-cyan-400 hover:text-white'
                      }`}
                      title={isListening ? 'Stop recording voice' : 'Speak via microphone'}
                    >
                      {isListening ? <MicOff className="w-3.5 h-3.5 text-black" /> : <Mic className="w-3.5 h-3.5 text-cyan-400" />}
                      <span>{isListening ? 'Listening...' : 'Voice Query'}</span>
                    </button>
                  </div>

                  {/* Ask AI Input Box */}
                  <form onSubmit={handleAskAISubmit} className="relative flex items-center">
                    <input
                      type="text"
                      value={aiInputQuery}
                      onChange={(e) => setAiInputQuery(e.target.value)}
                      placeholder={isListening ? (transcript || 'Listening to your question...') : 'Ask about my projects, skills, GPA...'}
                      className="w-full pl-3 pr-9 py-2 text-xs rounded-xl bg-black/80 border border-blue-500/30 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-sans transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={!aiInputQuery.trim()}
                      className="absolute right-1.5 p-1 text-cyan-400 hover:text-cyan-300 disabled:opacity-30 disabled:hover:text-cyan-400 transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>

              </div>

            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
