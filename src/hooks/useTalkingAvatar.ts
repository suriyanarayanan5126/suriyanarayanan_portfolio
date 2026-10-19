import { useState, useEffect, useRef, useCallback } from 'react';
import { AVATAR_SPEECH_SCRIPT, PERSONAL_INFO, SKILLS_DATA, PROJECTS_DATA, INTERNSHIPS_DATA } from '../data/portfolioData.ts';

export type AvatarState = 'idle' | 'listening' | 'thinking' | 'speaking';

export interface TalkingAvatarState {
  isSpeaking: boolean;
  isPaused: boolean;
  isSupported: boolean;
  hasStarted: boolean;
  hasEnded: boolean;
  avatarState: AvatarState;
  currentWordIndex: number;
  detectedVoiceName: string;
  isMaleVoice: boolean;
  voiceStatusMessage: string;
  words: string[];
  availableVoices: SpeechSynthesisVoice[];
  selectedVoiceName: string;
  isListening: boolean;
  transcript: string;
  lastAnswer: string | null;
  setVoiceByName: (name: string) => void;
  start: () => void;
  pause: () => void;
  resume: () => void;
  replay: () => void;
  stop: () => void;
  speakCustomText: (text: string) => void;
  startListening: () => void;
  stopListening: () => void;
  askAI: (query: string) => Promise<string>;
}

export const useTalkingAvatar = (): TalkingAvatarState => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [avatarState, setAvatarState] = useState<AvatarState>('idle');
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [detectedVoiceName, setDetectedVoiceName] = useState('');
  const [selectedVoiceName, setSelectedVoiceName] = useState('');
  const [isMaleVoice, setIsMaleVoice] = useState(true);
  const [voiceStatusMessage, setVoiceStatusMessage] = useState('');
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  
  // Microphone & AI Conversation State
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [lastAnswer, setLastAnswer] = useState<string | null>(null);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const selectedVoiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const recognitionRef = useRef<any>(null);
  const activeWordsRef = useRef<string[]>(AVATAR_SPEECH_SCRIPT.split(/\s+/));
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

    const englishVoices = voices.filter(v => v.lang.startsWith('en'));
    const candidateList = englishVoices.length > 0 ? englishVoices : voices;
    setAvailableVoices(candidateList);

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

    const isFemaleNamed = (name: string) => {
      const lower = name.toLowerCase();
      return femaleTokens.some(token => lower.includes(token));
    };

    let best = candidateList.find(v => {
      const name = v.name || '';
      return !isFemaleNamed(name) && malePatterns.some(p => p.test(name) || p.test(v.voiceURI));
    });

    if (!best) {
      best = candidateList.find(v => !isFemaleNamed(v.name || ''));
    }

    if (!best && candidateList.length > 0) {
      best = candidateList[0];
    }

    if (best) {
      selectedVoiceRef.current = best;
      setSelectedVoiceName(best.name);
      setDetectedVoiceName(best.name);

      const hasMaleSignal = malePatterns.some(p => p.test(best!.name) || p.test(best!.voiceURI));
      setIsMaleVoice(hasMaleSignal);

      if (hasMaleSignal) {
        setVoiceStatusMessage(`Selected male voice: ${best.name}`);
      } else {
        setVoiceStatusMessage(`Selected English voice: ${best.name} (calibrated to deep warm tone)`);
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
      const isMale = !match.name.toLowerCase().includes('female') &&
        (match.name.toLowerCase().includes('male') || match.name.toLowerCase().includes('david') || match.name.toLowerCase().includes('george'));
      setIsMaleVoice(isMale);
      setVoiceStatusMessage(`Selected voice: ${match.name}`);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
      return;
    }

    findBestVoice();

    window.speechSynthesis.onvoiceschanged = () => {
      findBestVoice();
    };

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
    setAvatarState('idle');
    setCurrentWordIndex(-1);
  }, []);

  const speakText = useCallback((textToSpeak: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
      return;
    }

    window.speechSynthesis.cancel();
    clearBoundaryTimer();

    const voice = selectedVoiceRef.current || findBestVoice();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utteranceRef.current = utterance;

    activeWordsRef.current = textToSpeak.split(/\s+/);

    if (voice) {
      utterance.voice = voice;
    }

    utterance.rate = 0.96;
    utterance.pitch = isMaleVoice ? 0.94 : 0.88;
    utterance.volume = 1;

    let receivedBoundary = false;

    utterance.onboundary = (event) => {
      receivedBoundary = true;
      if (event.name === 'word') {
        const charIndex = event.charIndex;
        let runningLength = 0;
        let matchedIndex = 0;
        const currentWords = activeWordsRef.current;
        for (let i = 0; i < currentWords.length; i++) {
          runningLength += currentWords[i].length + 1;
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
      setAvatarState('speaking');
      setCurrentWordIndex(0);

      const totalWords = activeWordsRef.current.length;
      const msPerWord = 320;
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
      setAvatarState('idle');
      setCurrentWordIndex(-1);
    };

    utterance.onerror = (e) => {
      clearBoundaryTimer();
      if (e.error !== 'canceled' && e.error !== 'interrupted') {
        console.warn('Speech synthesis notice:', e.error);
      }
      setIsSpeaking(false);
      setIsPaused(false);
      setHasEnded(true);
      setAvatarState('idle');
      setCurrentWordIndex(-1);
    };

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
    setIsPaused(false);
    setHasStarted(true);
    setHasEnded(false);
    setAvatarState('speaking');
  }, [findBestVoice, isMaleVoice]);

  const start = useCallback(() => {
    speakText(AVATAR_SPEECH_SCRIPT);
  }, [speakText]);

  const speakCustomText = useCallback((text: string) => {
    setLastAnswer(text);
    speakText(text);
  }, [speakText]);

  const pause = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause();
        clearBoundaryTimer();
        setIsPaused(true);
        setAvatarState('idle');
      }
    }
  }, []);

  const resume = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
        setIsSpeaking(true);
        setAvatarState('speaking');
      } else if (!window.speechSynthesis.speaking) {
        start();
      }
    }
  }, [start]);

  const replay = useCallback(() => {
    stop();
    setTimeout(() => {
      start();
    }, 120);
  }, [stop, start]);

  // Conversational AI answering engine about Suriyanarayanan R
  const askAI = useCallback(async (query: string): Promise<string> => {
    setAvatarState('thinking');
    const lower = query.toLowerCase().trim();

    let answer = '';

    if (lower.includes('who are you') || lower.includes('about') || lower.includes('introduce') || lower.includes('yourself')) {
      answer = `I am Suriyanarayanan R, a 2026 Electronics and Communication Engineering graduate from Kings College of Engineering with an academic score of 80.6% under Anna University. I build IoT hardware, embedded systems, and web applications.`;
    } else if (lower.includes('college') || lower.includes('university') || lower.includes('degree') || lower.includes('gpa') || lower.includes('score') || lower.includes('mark') || lower.includes('education')) {
      answer = `I am pursuing my B.E. in Electronics and Communication Engineering at Kings College of Engineering, graduating in 2026 with an academic standing of 80.6% under Anna University.`;
    } else if (lower.includes('skill') || lower.includes('stack') || lower.includes('technology') || lower.includes('programming') || lower.includes('java')) {
      answer = `My core technical skills include Java, Object-Oriented Programming, Embedded C, ESP32 microcontrollers, IoT architecture, HTML5, CSS3, Bootstrap, and machine learning fundamentals.`;
    } else if (lower.includes('patent') || lower.includes('display') || lower.includes('oorai')) {
      answer = `I authored and filed a patent titled: "Design and Implementation of a Digital Oorai Display using Embedded System". The technical details are currently held under intellectual property protection protocol.`;
    } else if (lower.includes('project') || lower.includes('smart home') || lower.includes('visitor counter') || lower.includes('car')) {
      answer = `My major projects include Smart Home Automation using ESP32 relays, a Bidirectional Visitor Counter with automated lighting, a Surveillance Car, and an Employee Salary Prediction model using Linear Regression.`;
    } else if (lower.includes('internship') || lower.includes('bsnl') || lower.includes('ibm') || lower.includes('work') || lower.includes('experience')) {
      answer = `I completed in-plant training at BSNL Thanjavur covering optical fibre cables and telecom switching, an Artificial Intelligence internship with IBM SkillsBuild, and intensive AI coursework with Edunet and AICTE.`;
    } else if (lower.includes('contact') || lower.includes('email') || lower.includes('phone') || lower.includes('reach') || lower.includes('hire')) {
      answer = `You can email me at suriyanarayanan5126@gmail.com, or reach me by phone at +91 8667811037. I am based in Mannargudi, Tamil Nadu, and am open to entry-level software and embedded engineering roles!`;
    } else {
      answer = `Thanks for asking! I am Suriyanarayanan R, an ECE graduate from Kings College of Engineering (80.6% Anna University). My expertise spans Java, embedded systems, IoT, and web technologies. Feel free to explore my projects or reach out directly at suriyanarayanan5126@gmail.com!`;
    }

    setLastAnswer(answer);
    speakCustomText(answer);
    return answer;
  }, [speakCustomText]);

  // Speech Recognition / Microphone Input
  const startListening = useCallback(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. You can type your query in the Talk to My AI prompt.');
      return;
    }

    stop();
    setAvatarState('listening');
    setIsListening(true);
    setTranscript('');

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.lang = 'en-US';
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event: any) => {
        const current = event.results[event.results.length - 1][0].transcript;
        setTranscript(current);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
        setAvatarState('idle');
      };

      recognition.onend = () => {
        setIsListening(false);
        if (transcript.trim()) {
          askAI(transcript);
        } else {
          setAvatarState('idle');
        }
      };

      recognition.start();
    } catch (err) {
      console.warn('Could not start speech recognition:', err);
      setIsListening(false);
      setAvatarState('idle');
    }
  }, [stop, transcript, askAI]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  }, []);

  return {
    isSpeaking,
    isPaused,
    hasStarted,
    hasEnded,
    isSupported,
    avatarState,
    currentWordIndex,
    detectedVoiceName,
    isMaleVoice,
    voiceStatusMessage,
    words: activeWordsRef.current,
    availableVoices,
    selectedVoiceName,
    isListening,
    transcript,
    lastAnswer,
    setVoiceByName,
    start,
    pause,
    resume,
    replay,
    stop,
    speakCustomText,
    startListening,
    stopListening,
    askAI,
  };
};
