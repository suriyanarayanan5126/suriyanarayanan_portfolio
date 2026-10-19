import React, { useState } from 'react';
import { 
  X, 
  Volume2, 
  RotateCcw, 
  Play, 
  Pause, 
  Square,
  Sliders,
  CheckCircle2,
  Info
} from 'lucide-react';
import { AvatarDisplay } from './AvatarDisplay.tsx';
import { PERSONAL_INFO } from '../data/portfolioData.ts';
import { TalkingAvatarState } from '../hooks/useTalkingAvatar.ts';
import { AudioWaveformVisualizer } from './AudioWaveformVisualizer.tsx';

interface TalkingAvatarModalProps {
  isOpen: boolean;
  onClose: () => void;
  talkingAvatar: TalkingAvatarState;
}

export const TalkingAvatarModal: React.FC<TalkingAvatarModalProps> = ({
  isOpen,
  onClose,
  talkingAvatar,
}) => {
  const [showSettings, setShowSettings] = useState(false);

  const {
    isSpeaking,
    isPaused,
    hasEnded,
    isSupported,
    currentWordIndex,
    isMaleVoice,
    voiceStatusMessage,
    words,
    availableVoices,
    selectedVoiceName,
    setVoiceByName,
    start,
    pause,
    resume,
    replay,
    stop,
  } = talkingAvatar;

  if (!isOpen) return null;

  const handleClose = () => {
    stop();
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in"
      onClick={handleClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-gradient-to-b from-[#0c1219] via-[#090d13] to-[#05070a] border border-emerald-500/40 rounded-2xl shadow-[0_0_60px_rgba(16,185,129,0.25)] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Futuristic HUD Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-emerald-500/20 bg-emerald-950/20">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center">
              <span className={`w-2.5 h-2.5 rounded-full ${isSpeaking && !isPaused ? 'bg-emerald-400 animate-ping' : isPaused ? 'bg-amber-400' : 'bg-slate-500'} absolute`} />
              <span className={`w-2.5 h-2.5 rounded-full ${isSpeaking && !isPaused ? 'bg-emerald-400' : isPaused ? 'bg-amber-400' : 'bg-slate-500'} relative`} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white tracking-wide flex items-center gap-2">
                <span>Interactive Talking Avatar</span>
                <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded border ${
                  isSpeaking && !isPaused 
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                    : isPaused
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}>
                  {isSpeaking && !isPaused ? 'Speaking' : isPaused ? 'Paused' : 'Ready'}
                </span>
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Introducing {PERSONAL_INFO.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 rounded-lg text-slate-400 hover:text-white transition-colors border ${showSettings ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' : 'border-slate-800 hover:border-slate-700'}`}
              title="Voice Settings & Detection"
            >
              <Sliders className="w-4 h-4" />
            </button>
            <button
              onClick={handleClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Voice Profile & System Status Drawer */}
        {showSettings && (
          <div className="px-6 py-3.5 bg-[#060a0f] border-b border-emerald-500/20 flex flex-col gap-2 text-xs font-mono">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-slate-400">Speech Engine Voice:</span>
              <select
                value={selectedVoiceName}
                onChange={(e) => setVoiceByName(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-slate-200 text-xs focus:border-emerald-400 outline-none"
              >
                {availableVoices.map((v) => (
                  <option key={v.name} value={v.name}>
                    {v.name} ({v.lang})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
              <Info className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{voiceStatusMessage}</span>
            </div>
          </div>
        )}

        {/* Voice status banner if voice is active or fallback */}
        {!showSettings && (
          <div className="px-6 py-2 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between text-[11px] font-mono">
            <span className="flex items-center gap-2 text-slate-400 truncate">
              <span className={`w-1.5 h-1.5 rounded-full ${isMaleVoice ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              <span className="truncate">{voiceStatusMessage || 'Web Speech Synthesis Engine Ready'}</span>
            </span>
            <span className="text-emerald-400/80 uppercase tracking-widest text-[10px] shrink-0 ml-2">
              Natural Male Voice Filter
            </span>
          </div>
        )}

        {/* Modal Main Content */}
        <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8">
          {/* Avatar Showcase with Animated Glowing Ring & Waveform */}
          <div className="flex flex-col items-center">
            <div className="relative">
              {/* Subtle glowing ring around portrait during speech */}
              {isSpeaking && !isPaused && (
                <>
                  <div className="absolute -inset-3 rounded-[32px] border-2 border-emerald-400/80 shadow-[0_0_30px_rgba(52,211,153,0.5)] animate-pulse pointer-events-none" />
                  <div className="absolute -inset-1 rounded-2xl border border-lime-400/60 pointer-events-none" />
                </>
              )}

              <AvatarDisplay
                size="avatar-modal"
                isSpeaking={isSpeaking && !isPaused}
                showUploadTrigger={false}
              />

              {/* Animated audio waveform / equalizer while speech is playing */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20">
                <AudioWaveformVisualizer 
                  isSpeaking={isSpeaking}
                  isPaused={isPaused}
                  barCount={12}
                />
              </div>
            </div>

            <div className="mt-5 text-center">
              <span className="text-xs font-mono text-emerald-400/90 tracking-wide uppercase flex items-center justify-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  {isSpeaking && !isPaused ? 'Speaking Voice Synth' : isPaused ? 'Voice Synth Paused' : 'Ready to Speak'}
                </span>
              </span>
            </div>
          </div>

          {/* Interactive Synchronized Captions & Playback Controls */}
          <div className="flex-1 flex flex-col w-full">
            <div className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-2 flex items-center justify-between">
              <span>Synchronized Subtitles</span>
              <span className="text-emerald-400 font-mono">
                {currentWordIndex >= 0 ? `${currentWordIndex + 1}/${words.length}` : `${words.length} words`}
              </span>
            </div>

            {/* Captions Box with Glowing Active Words */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-500/25 min-h-[140px] max-h-[180px] overflow-y-auto leading-relaxed text-slate-300 text-sm">
              <p>
                {words.map((word, idx) => {
                  const isActive = idx === currentWordIndex;
                  return (
                    <span
                      key={idx}
                      className={`inline-block mr-1.5 transition-colors duration-150 ${
                        isActive
                          ? 'text-emerald-300 font-semibold text-glow-accent bg-emerald-500/25 px-1 rounded shadow-[0_0_8px_rgba(16,185,129,0.4)]'
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

            {/* Audio & Playback Controls (Pause/Resume, Replay, Stop) */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
              <div className="flex items-center gap-2">
                {isSpeaking && !isPaused ? (
                  <button
                    onClick={pause}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs tracking-wider transition-all cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                    title="Pause speech"
                  >
                    <Pause className="w-4 h-4 fill-current" />
                    <span>Pause</span>
                  </button>
                ) : isPaused ? (
                  <button
                    onClick={resume}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs tracking-wider transition-all cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                    title="Resume speech"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Resume</span>
                  </button>
                ) : (
                  <button
                    onClick={start}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-lime-400 hover:from-emerald-400 hover:to-lime-300 text-black font-semibold text-xs tracking-wider transition-all cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                    title={hasEnded ? 'Replay speech introduction' : 'Play speech introduction'}
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>{hasEnded ? 'Replay Intro' : 'Play Intro'}</span>
                  </button>
                )}

                {/* Replay Button */}
                <button
                  onClick={replay}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Replay from start"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Stop Button */}
                <button
                  onClick={stop}
                  disabled={!isSpeaking && !isPaused && !hasEnded}
                  className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                    isSpeaking || isPaused || hasEnded
                      ? 'bg-rose-950/40 border-rose-500/50 text-rose-300 hover:bg-rose-900/50 hover:border-rose-400'
                      : 'bg-slate-900/50 border-slate-800 text-slate-600 cursor-not-allowed'
                  }`}
                  title="Stop speech and reset"
                >
                  <Square className="w-4 h-4 fill-current" />
                </button>
              </div>

              <div className="text-[11px] font-mono text-slate-500">
                {!isSupported ? 'Speech synthesis unavailable' : 'Browser SpeechSynthesis API · Free'}
              </div>
            </div>
          </div>
        </div>

        {/* Footer info note */}
        <div className="px-6 py-3 bg-[#070b10] border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Browser-supported speech synthesis — no external paid APIs or tokens required.</span>
          </div>
          <button
            onClick={handleClose}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-mono hover:underline cursor-pointer"
          >
            Close & Explore →
          </button>
        </div>
      </div>
    </div>
  );
};
