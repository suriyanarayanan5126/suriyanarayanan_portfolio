import React, { useState } from 'react';
import { 
  X, 
  Volume2, 
  RotateCcw, 
  Play, 
  Pause, 
  Square,
  Sliders,
  Sparkles,
  Mic,
  MicOff,
  Send,
  MessageSquare
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
  const [inputQuery, setInputQuery] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: "Hello! I am Suriyanarayanan R's interactive AI avatar. Ask me anything about my academic score at Anna University, my patent project, embedded and IoT implementations, internships, or contact details."
    }
  ]);

  const {
    isSpeaking,
    isPaused,
    hasEnded,
    avatarState,
    currentWordIndex,
    words,
    availableVoices,
    selectedVoiceName,
    setVoiceByName,
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

  if (!isOpen) return null;

  const handleClose = () => {
    stop();
    onClose();
  };

  const handleQuerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;

    const userText = inputQuery.trim();
    setInputQuery('');
    setChatHistory(prev => [...prev, { sender: 'user', text: userText }]);

    const response = await askAI(userText);
    setChatHistory(prev => [...prev, { sender: 'ai', text: response }]);
  };

  const handleQuickQuestion = async (q: string) => {
    setChatHistory(prev => [...prev, { sender: 'user', text: q }]);
    const response = await askAI(q);
    setChatHistory(prev => [...prev, { sender: 'ai', text: response }]);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in"
      onClick={handleClose}
    >
      <div 
        className="relative w-full max-w-3xl bg-gradient-to-b from-[#0b162c] via-[#070e1c] to-[#03060c] border border-blue-500/40 rounded-3xl shadow-[0_0_60px_rgba(59,130,246,0.3)] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Futuristic HUD Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-blue-500/20 bg-blue-950/20">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center">
              <span className={`w-2.5 h-2.5 rounded-full ${isSpeaking ? 'bg-cyan-400 animate-ping' : isListening ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'} absolute`} />
              <span className={`w-2.5 h-2.5 rounded-full ${isSpeaking ? 'bg-cyan-400' : isListening ? 'bg-emerald-400' : 'bg-slate-500'} relative`} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white tracking-wide flex items-center gap-2">
                <span>Talk to My AI — Interactive Experience</span>
                <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded border ${
                  avatarState === 'speaking'
                    ? 'bg-blue-500/20 text-cyan-300 border-cyan-500/40' 
                    : avatarState === 'listening'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : avatarState === 'thinking'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}>
                  {avatarState}
                </span>
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                {PERSONAL_INFO.name} · B.E. ECE 2026
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 rounded-lg text-slate-400 hover:text-white transition-colors border ${showSettings ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400' : 'border-slate-800 hover:border-slate-700'}`}
              title="Voice Settings"
            >
              <Sliders className="w-4 h-4" />
            </button>
            <button
              onClick={handleClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white transition-colors border border-slate-800 hover:border-slate-700"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Voice Diagnostics Settings Bar */}
        {showSettings && (
          <div className="p-4 bg-black/60 border-b border-blue-500/20 text-xs font-mono space-y-2">
            <div className="flex items-center justify-between text-slate-300">
              <span>Speech Voice Output:</span>
              <select
                value={selectedVoiceName}
                onChange={(e) => setVoiceByName(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-xs rounded px-2 py-1 text-slate-200"
              >
                {availableVoices.map(v => (
                  <option key={v.name} value={v.name}>
                    {v.name} ({v.lang})
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Modal Main Body: Avatar on Left, Interactive Chat & Controls on Right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 overflow-y-auto">
          
          {/* Avatar Portrait Column */}
          <div className="md:col-span-5 flex flex-col items-center justify-center">
            <div className="relative">
              <AvatarDisplay
                size="avatar-modal"
                isSpeaking={isSpeaking && !isPaused}
                avatarState={avatarState}
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
                <AudioWaveformVisualizer 
                  isSpeaking={isSpeaking}
                  isPaused={isPaused}
                  barCount={14}
                />
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center gap-2 mt-4">
              {isSpeaking && !isPaused ? (
                <button
                  onClick={pause}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 text-black font-semibold text-xs transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                >
                  <Pause className="w-4 h-4 fill-current" />
                  <span>Pause</span>
                </button>
              ) : isPaused ? (
                <button
                  onClick={resume}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 text-black font-semibold text-xs transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Resume</span>
                </button>
              ) : (
                <button
                  onClick={start}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-xs transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>{hasEnded ? 'Replay Intro' : 'Play Intro'}</span>
                </button>
              )}

              <button
                onClick={replay}
                className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white"
                title="Restart"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={stop}
                className="p-2 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 hover:bg-rose-900/60"
                title="Stop"
              >
                <Square className="w-4 h-4 fill-current" />
              </button>
            </div>
          </div>

          {/* Interactive Chat & Q&A Column */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-4">
            
            {/* Quick Question Chips */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block font-semibold">
                Suggested Inquiries:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "What is your academic score?",
                  "Tell me about your patent project",
                  "What are your core engineering skills?",
                  "Where did you intern?",
                  "How can I contact you?"
                ].map((q) => (
                  <button
                    key={q}
                    onClick={() => handleQuickQuestion(q)}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-[#0c182e] hover:bg-[#132547] text-slate-300 hover:text-cyan-300 border border-blue-500/30 transition-colors text-left"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Conversation Log */}
            <div className="p-4 rounded-2xl bg-black/75 border border-blue-500/20 max-h-52 overflow-y-auto space-y-3 font-sans text-xs">
              {chatHistory.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`p-3 rounded-xl max-w-[85%] leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-sm'
                        : 'bg-[#0e1a30] text-slate-200 border border-blue-500/30 rounded-bl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Live Subtitle Word Highlights during speech */}
            {isSpeaking && words.length > 0 && (
              <div className="p-2.5 rounded-xl bg-blue-950/40 border border-blue-500/30 text-xs text-slate-300 max-h-16 overflow-y-auto">
                <p>
                  {words.map((word, idx) => (
                    <span
                      key={idx}
                      className={`inline-block mr-1 transition-colors ${
                        idx === currentWordIndex
                          ? 'text-cyan-300 font-bold bg-blue-500/30 px-1 rounded shadow-[0_0_8px_rgba(6,182,212,0.5)]'
                          : idx < currentWordIndex
                          ? 'text-slate-200'
                          : 'text-slate-500'
                      }`}
                    >
                      {word}
                    </span>
                  ))}
                </p>
              </div>
            )}

            {/* Ask AI Input Box & Microphone Button */}
            <form onSubmit={handleQuerySubmit} className="relative flex items-center gap-2">
              <button
                type="button"
                onClick={isListening ? stopListening : startListening}
                className={`p-2.5 rounded-xl transition-all cursor-pointer ${
                  isListening
                    ? 'bg-emerald-500 text-black font-bold animate-pulse'
                    : 'bg-[#0e1a30] border border-blue-500/40 text-cyan-400 hover:text-white'
                }`}
                title={isListening ? 'Stop listening' : 'Speak your question'}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <div className="relative flex-1">
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder={isListening ? (transcript || 'Listening to your voice...') : 'Ask anything about Suriyanarayanan R...'}
                  className="w-full pl-3 pr-10 py-2.5 text-xs rounded-xl bg-black/80 border border-blue-500/40 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-sans"
                />
                <button
                  type="submit"
                  disabled={!inputQuery.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-cyan-400 hover:text-cyan-300 disabled:opacity-30"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

          </div>

        </div>

      </div>
    </div>
  );
};
