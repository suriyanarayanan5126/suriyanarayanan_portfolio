import { useState, useEffect, useRef, useCallback } from 'react';
import { AVATAR_SPEECH_SCRIPT } from '../data/portfolioData.ts';

export interface VoiceIntroductionState {
  isPlaying: boolean;
  isPaused: boolean;
  isSupported: boolean;
  hasEnded: boolean;
  voiceName: string;
  isMaleVoice: boolean;
  speechText: string;
  play: () => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  togglePlay: () => void;
}

export const useVoiceIntroduction = (): VoiceIntroductionState => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [voiceName, setVoiceName] = useState('');
  const [isMaleVoice, setIsMaleVoice] = useState(true);

  const selectedVoiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const findBestMaleVoice = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
      return null;
    }

    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    const englishVoices = voices.filter(v => v.lang.startsWith('en'));
    const candidateList = englishVoices.length > 0 ? englishVoices : voices;

    const femaleTokens = [
      'female', 'zira', 'susan', 'hazel', 'catherine', 'heera', 'veena',
      'samantha', 'victoria', 'karen', 'moira', 'tessa', 'fiona', 'allison',
      'ava', 'serena', 'ayanda', 'woman', 'girl', 'jenny', 'aria', 'steffi'
    ];

    const malePatterns = [
      /\bmale\b/i,
      /\bdavid\b/i,
      /\bgeorge\b/i,
      /\bdaniel\b/i,
      /\bguy\b/i,
      /\bjames\b/i,
      /\brishi\b/i,
      /\bprabhat\b/i,
      /\baaron\b/i,
      /\balex\b/i,
      /\bmark\b/i,
      /\brichard\b/i,
      /\bbrian\b/i,
      /\bfred\b/i,
      /\boliver\b/i,
      /\bthomas\b/i,
      /\bchristopher\b/i,
      /\beric\b/i,
      /\bliam\b/i,
      /google.*male/i,
      /microsoft.*(david|mark|guy|george|ryan|christopher|eric|liam|prabhat)/i
    ];

    const isFemale = (name: string) => {
      const lower = name.toLowerCase();
      return femaleTokens.some(t => lower.includes(t));
    };

    let best = candidateList.find(v => {
      const n = v.name || '';
      return !isFemale(n) && malePatterns.some(p => p.test(n) || p.test(v.voiceURI));
    });

    if (!best) {
      best = candidateList.find(v => !isFemale(v.name || ''));
    }

    if (!best && candidateList.length > 0) {
      best = candidateList[0];
    }

    if (best) {
      selectedVoiceRef.current = best;
      setVoiceName(best.name);
      const isMale = malePatterns.some(p => p.test(best!.name) || p.test(best!.voiceURI)) || !isFemale(best.name);
      setIsMaleVoice(isMale);
    }

    return best;
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
      return;
    }

    findBestMaleVoice();

    window.speechSynthesis.onvoiceschanged = () => {
      findBestMaleVoice();
    };

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [findBestMaleVoice]);

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
  }, []);

  const play = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
      return;
    }

    window.speechSynthesis.cancel();

    const voice = selectedVoiceRef.current || findBestMaleVoice();
    const utterance = new SpeechSynthesisUtterance(AVATAR_SPEECH_SCRIPT);
    utteranceRef.current = utterance;

    if (voice) {
      utterance.voice = voice;
    }

    utterance.rate = 0.94;
    utterance.pitch = isMaleVoice ? 0.95 : 0.88;
    utterance.volume = 1;

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
      setHasEnded(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setHasEnded(true);
    };

    utterance.onerror = (e) => {
      if (e.error !== 'canceled' && e.error !== 'interrupted') {
        console.warn('SpeechSynthesis event notice:', e.error);
      }
      setIsPlaying(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
    setHasEnded(false);
  }, [findBestMaleVoice, isMaleVoice]);

  const pause = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause();
        setIsPaused(true);
      }
    }
  }, []);

  const resume = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
        setIsPlaying(true);
      } else if (!window.speechSynthesis.speaking) {
        play();
      }
    }
  }, [play]);

  const togglePlay = useCallback(() => {
    if (isPlaying && !isPaused) {
      pause();
    } else if (isPaused) {
      resume();
    } else {
      play();
    }
  }, [isPlaying, isPaused, pause, resume, play]);

  return {
    isPlaying,
    isPaused,
    isSupported,
    hasEnded,
    voiceName,
    isMaleVoice,
    speechText: AVATAR_SPEECH_SCRIPT,
    play,
    pause,
    resume,
    stop,
    togglePlay,
  };
};
