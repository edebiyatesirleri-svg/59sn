'use client';

import { useState, useRef, useCallback } from 'react';

export function useTurkishSpeaker() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setCurrentText('');
    }
  }, []);

  const speak = useCallback((text: string, onEnd?: () => void) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    setCurrentText(text);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'tr-TR';
    utterance.rate = 1.05; // Slightly brisk for 59s news briefing
    utterance.pitch = 1.0;

    // Pick a Turkish voice if available
    const voices = window.speechSynthesis.getVoices();
    const turkishVoice = voices.find((v) => v.lang.startsWith('tr'));
    if (turkishVoice) {
      utterance.voice = turkishVoice;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setCurrentText('');
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setCurrentText('');
    };

    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, []);

  return {
    speak,
    stop,
    isPlaying,
    isSupported,
    currentText,
  };
}
