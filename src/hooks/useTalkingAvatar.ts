import { useState, useEffect, useRef, useCallback } from 'react';
import { AVATAR_SPEECH_SCRIPT } from '../data/portfolioData.ts';

export interface TalkingAvatarState {
  isSpeaking: boolean;
  isPaused: boolean;
  isSupported: boolean;
  hasStarted: boolean;
  hasEnded: boolean;
  currentWordIndex: number;
  detectedVoiceName: string;
  isMaleVoice: boolean;
  voiceStatusMessage: string;
  words: string[];
  availableVoices: SpeechSynthesisVoice[];
  selectedVoiceName: string;
  setVoiceByName: (name: string) => void;
  start: () => void;
  pause: () => void;
  resume: () => void;
  replay: () => void;
  stop: () => void;
}

export const useTalkingAvatar = (): TalkingAvatarState => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [detectedVoiceName, setDetectedVoiceName] = useState('');
  const [selectedVoiceName, setSelectedVoiceName] = useState('');
  const [isMaleVoice, setIsMaleVoice] = useState(true);
  const [voiceStatusMessage, setVoiceStatusMessage] = useState('');
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const selectedVoiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const words = useRef(AVATAR_SPEECH_SCRIPT.split(/\s+/)).current;
  const wordBoundaryTimerRef = useRef<number | null>(null);

  // Detect and select best natural male English voice
  const findBestVoice = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
      setVoiceStatusMessage('Speech synthesis is not supported in this browser.');
      return null;
    }

    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    // Filter English voices
    const englishVoices = voices.filter(v => v.lang.startsWith('en'));
    const candidateList = englishVoices.length > 0 ? englishVoices : voices;
    setAvailableVoices(candidateList);

    // Negative list of female indicator tokens
    const femaleTokens = [
      'female', 'zira', 'susan', 'hazel', 'catherine', 'heera', 'veena',
      'samantha', 'victoria', 'karen', 'moira', 'tessa', 'fiona', 'allison',
      'ava', 'serena', 'ayanda', 'woman', 'girl', 'jenny', 'aria', 'steffi'
    ];

    // Male patterns
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

    const isFemaleNamed = (name: string) => {
      const lower = name.toLowerCase();
      return femaleTokens.some(token => lower.includes(token));
    };

    // Priority 1: English voices with explicit male keywords and not female
    let best = candidateList.find(v => {
      const name = v.name || '';
      return !isFemaleNamed(name) && malePatterns.some(p => p.test(name) || p.test(v.voiceURI));
    });

    // Priority 2: Natural or neural English voices that are not female-named
    if (!best) {
      best = candidateList.find(v => !isFemaleNamed(v.name) && /natural|neural|online|enhanced/i.test(v.name));
    }

    // Priority 3: Any English voice not female-named
    if (!best) {
      best = candidateList.find(v => !isFemaleNamed(v.name));
    }

    // Priority 4: Fallback to first available English voice
    if (!best) {
      best = candidateList[0] || voices[0];
    }

    if (best) {
      selectedVoiceRef.current = best;
      setDetectedVoiceName(best.name);
      setSelectedVoiceName(best.name);

      const hasMaleMatch = !isFemaleNamed(best.name) && (
        malePatterns.some(p => p.test(best.name) || p.test(best.voiceURI)) ||
        /male/i.test(best.name)
      );
      setIsMaleVoice(hasMaleMatch);

      if (hasMaleMatch) {
        setVoiceStatusMessage(`Adult male English voice active: ${best.name}`);
      } else {
        setVoiceStatusMessage(`Using available English voice: ${best.name} (calibrated to deep, warm tone)`);
      }
    }

    return best;
  }, []);

  const setVoiceByName = useCallback((name: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    const match = voices.find(v => v.name === name);
    if (match) {
      selectedVoiceRef.current = match;
      setSelectedVoiceName(match.name);
      setDetectedVoiceName(match.name);
      const isMale = /male|david|mark|guy|george|ryan|daniel|oliver|rishi|alex|fred|james/i.test(match.name) &&
        !/female|zira|susan|hazel|samantha/i.test(match.name);
      setIsMaleVoice(isMale);
      if (isMale) {
        setVoiceStatusMessage(`Selected male voice: ${match.name}`);
      } else {
        setVoiceStatusMessage(`Selected English voice: ${match.name} (calibrated to warm tone)`);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
      return;
    }

    findBestVoice();

    // Browser voices load asynchronously in Chrome/Blink
    window.speechSynthesis.onvoiceschanged = () => {
      findBestVoice();
    };

    // Retry checks in case onvoiceschanged fires before listener attached
    const t1 = setTimeout(findBestVoice, 150);
    const t2 = setTimeout(findBestVoice, 600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (wordBoundaryTimerRef.current) {
        clearInterval(wordBoundaryTimerRef.current);
      }
    };
  }, [findBestVoice]);

  const clearBoundaryTimer = () => {
    if (wordBoundaryTimerRef.current) {
      clearInterval(wordBoundaryTimerRef.current);
      wordBoundaryTimerRef.current = null;
    }
  };

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    clearBoundaryTimer();
    setIsSpeaking(false);
    setIsPaused(false);
    setHasStarted(false);
    setHasEnded(false);
    setCurrentWordIndex(-1);
  }, []);

  const start = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
      return;
    }

    // Stop any previous speech before starting a new playback
    window.speechSynthesis.cancel();
    clearBoundaryTimer();

    // Ensure voice is determined
    const voice = selectedVoiceRef.current || findBestVoice();

    const utterance = new SpeechSynthesisUtterance(AVATAR_SPEECH_SCRIPT);
    utteranceRef.current = utterance;
    // Prevent Chromium garbage collection bug during playback
    if (typeof window !== 'undefined') {
      (window as unknown as { __avatarSpeechUtterance?: SpeechSynthesisUtterance }).__avatarSpeechUtterance = utterance;
    }

    if (voice) {
      utterance.voice = voice;
    }

    // Adult male tonal calibration:
    // Rate: 0.96 for clear, steady, confident presentation
    // Pitch: 0.94 for natural male voice, or 0.88 to deepen fallback voice
    utterance.rate = 0.96;
    utterance.pitch = isMaleVoice ? 0.94 : 0.88;
    utterance.volume = 1;

    let receivedBoundary = false;

    // Track word boundaries for live subtitle synchronization
    utterance.onboundary = (event) => {
      receivedBoundary = true;
      if (event.name === 'word') {
        const charIndex = event.charIndex;
        let runningLength = 0;
        let matchedIndex = 0;
        for (let i = 0; i < words.length; i++) {
          runningLength += words[i].length + 1;
          if (runningLength > charIndex) {
            matchedIndex = i;
            break;
          }
        }
        setCurrentWordIndex(matchedIndex);
      }
    };

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
      setHasStarted(true);
      setHasEnded(false);
      setCurrentWordIndex(0);

      // Fallback timer if browser does not fire onboundary events reliably
      const totalWords = words.length;
      const msPerWord = 320; // Average speech pace (~180 wpm at 0.96 rate)
      let simulatedIndex = 0;

      setTimeout(() => {
        if (!receivedBoundary) {
          wordBoundaryTimerRef.current = window.setInterval(() => {
            simulatedIndex++;
            if (simulatedIndex < totalWords) {
              setCurrentWordIndex(simulatedIndex);
            } else {
              clearBoundaryTimer();
            }
          }, msPerWord);
        }
      }, 600);
    };

    utterance.onend = () => {
      clearBoundaryTimer();
      setIsSpeaking(false);
      setIsPaused(false);
      setHasEnded(true);
      setCurrentWordIndex(-1);
    };

    utterance.onerror = (e) => {
      clearBoundaryTimer();
      // Ignore user-initiated cancellation interruptions
      if (e.error !== 'canceled' && e.error !== 'interrupted') {
        console.warn('Speech synthesis notice:', e.error);
      }
      setIsSpeaking(false);
      setIsPaused(false);
      setHasEnded(true);
      setCurrentWordIndex(-1);
    };

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
    setIsPaused(false);
    setHasStarted(true);
    setHasEnded(false);
  }, [findBestVoice, isMaleVoice, words]);

  const pause = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause();
        clearBoundaryTimer();
        setIsPaused(true);
      }
    }
  }, []);

  const resume = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
        setIsSpeaking(true);
      } else if (!window.speechSynthesis.speaking) {
        start();
      }
    }
  }, [start]);

  const replay = useCallback(() => {
    stop();
    // Allow queue clearance before restarting
    setTimeout(() => {
      start();
    }, 120);
  }, [stop, start]);

  return {
    isSpeaking,
    isPaused,
    hasStarted,
    hasEnded,
    isSupported,
    currentWordIndex,
    detectedVoiceName,
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
  };
};
