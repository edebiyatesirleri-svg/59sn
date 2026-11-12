'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  ChevronRight,
  ChevronLeft,
  Clock,
  Sparkles,
  Maximize2,
  Share2,
  CheckCircle2,
  Bookmark
} from 'lucide-react';
import { NewsItem } from '@/lib/newsData';

interface BlitzPlayerProps {
  news: NewsItem[];
  currentIndex: number;
  onSelectIndex: (index: number) => void;
  onOpenDetails: (item: NewsItem) => void;
  onComplete: () => void;
  isBlitzActive: boolean;
  setIsBlitzActive: (active: boolean) => void;
  isAudioMuted: boolean;
  setIsAudioMuted: (muted: boolean) => void;
  speakStory: (text: string) => void;
  stopAudio: () => void;
  isAudioPlaying: boolean;
}

export const BlitzPlayer: React.FC<BlitzPlayerProps> = ({
  news,
  currentIndex,
  onSelectIndex,
  onOpenDetails,
  onComplete,
  isBlitzActive,
  setIsBlitzActive,
  isAudioMuted,
  setIsAudioMuted,
  speakStory,
  stopAudio,
  isAudioPlaying,
}) => {
  const TOTAL_TIME = 59; // 59 seconds total
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 1.25>(1);
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({});
  const [copiedToast, setCopiedToast] = useState(false);

  const currentStory = news[currentIndex] || news[0];
  const storyDuration = TOTAL_TIME / news.length; // ~11.8s per story

  // Countdown timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isBlitzActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          const next = Math.max(0, parseFloat((prev - 0.1 * playbackSpeed).toFixed(1)));
          if (next <= 0) {
            setIsBlitzActive(false);
            stopAudio();
            onComplete();
            return 0;
          }

          // Compute which story index should be active based on elapsed time
          const elapsed = TOTAL_TIME - next;
          const targetIndex = Math.min(news.length - 1, Math.floor(elapsed / storyDuration));
          if (targetIndex !== currentIndex) {
            onSelectIndex(targetIndex);
          }

          return next;
        });
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isBlitzActive, timeLeft, playbackSpeed, currentIndex, news.length, storyDuration, onSelectIndex, setIsBlitzActive, stopAudio, onComplete]);

  // When story changes during active blitz, trigger voiceover if unmuted
  useEffect(() => {
    if (isBlitzActive && !isAudioMuted && currentStory) {
      speakStory(currentStory.audioScript);
    }
  }, [currentIndex, isBlitzActive, isAudioMuted, currentStory, speakStory]);

  const togglePlayPause = () => {
    if (timeLeft <= 0) {
      // Reset
      setTimeLeft(TOTAL_TIME);
      onSelectIndex(0);
      setIsBlitzActive(true);
      if (!isAudioMuted && news[0]) {
        speakStory(news[0].audioScript);
      }
      return;
    }

    if (isBlitzActive) {
      setIsBlitzActive(false);
      stopAudio();
    } else {
      setIsBlitzActive(true);
      if (!isAudioMuted && currentStory) {
        speakStory(currentStory.audioScript);
      }
    }
  };

  const handleReset = () => {
    setTimeLeft(TOTAL_TIME);
    onSelectIndex(0);
    setIsBlitzActive(false);
    stopAudio();
  };

  const handleNextStory = () => {
    if (currentIndex < news.length - 1) {
      const nextIdx = currentIndex + 1;
      onSelectIndex(nextIdx);
      // Adjust timer to match start of next story
      setTimeLeft(parseFloat((TOTAL_TIME - nextIdx * storyDuration).toFixed(1)));
    }
  };

  const handlePrevStory = () => {
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      onSelectIndex(prevIdx);
      setTimeLeft(parseFloat((TOTAL_TIME - prevIdx * storyDuration).toFixed(1)));
    }
  };

  const toggleMute = () => {
    const nextMuted = !isAudioMuted;
    setIsAudioMuted(nextMuted);
    if (nextMuted) {
      stopAudio();
    } else if (currentStory) {
      speakStory(currentStory.audioScript);
    }
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(`${currentStory.headline} - 59 Saniyede Ülke Gündemi`);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2000);
    }
  };

  const toggleBookmark = (id: string) => {
    setBookmarked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Percentage of 59s elapsed
  const progressPercent = ((TOTAL_TIME - timeLeft) / TOTAL_TIME) * 100;

  // Active bullet calculation for teleprompter effect (highlighting bullets sequentially)
  const storyElapsed = (TOTAL_TIME - timeLeft) % storyDuration;
  const activeBulletIdx = Math.min(2, Math.floor((storyElapsed / storyDuration) * 3));

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Controller Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/90 border border-slate-700/60 font-mono text-sm">
            <Clock className="w-4 h-4 text-rose-400" />
            <span className="text-slate-400 text-xs">Kalan:</span>
            <span className="font-bold text-white text-base tabular-nums">
              {timeLeft.toFixed(1)}s
            </span>
            <span className="text-[11px] text-slate-500">/ 59s</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400">
            <span>Haber {currentIndex + 1} / {news.length}</span>
            <span className="text-slate-600">·</span>
            <span className="capitalize text-slate-300 font-medium">{currentStory.categoryLabel}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Speed Toggle */}
          <button
            onClick={() => setPlaybackSpeed((s) => (s === 1 ? 1.25 : 1))}
            className="px-2.5 py-1 text-xs rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-mono transition-colors"
            title="Okuma ve Akış Hızı"
          >
            {playbackSpeed}x
          </button>

          {/* Audio Mute/Unmute */}
          <button
            onClick={toggleMute}
            className={`p-2 rounded-lg border transition-colors ${
              !isAudioMuted
                ? 'bg-rose-500/15 border-rose-500/40 text-rose-400'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
            }`}
            title={isAudioMuted ? 'Sesli Spikeri Aç' : 'Sesli Spikeri Sustur'}
          >
            {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Prev Story */}
          <button
            onClick={handlePrevStory}
            disabled={currentIndex === 0}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 border border-slate-700 transition-colors"
            title="Önceki Başlık"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Play / Pause Main Button */}
          <button
            onClick={togglePlayPause}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-xs text-white transition-all shadow-md ${
              isBlitzActive
                ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/30 ring-2 ring-amber-400/40'
                : 'bg-rose-600 hover:bg-rose-500 shadow-rose-600/30'
            }`}
          >
            {isBlitzActive ? (
              <>
                <Pause className="w-4 h-4" fill="currentColor" />
                <span>Duraklat</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" fill="currentColor" />
                <span>{timeLeft < 59 ? 'Devam Et' : '59sn Başlat'}</span>
              </>
            )}
          </button>

          {/* Next Story */}
          <button
            onClick={handleNextStory}
            disabled={currentIndex === news.length - 1}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 border border-slate-700 transition-colors"
            title="Sıradaki Başlık"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Reset */}
          <button
            onClick={handleReset}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors"
            title="Geri Sar (59s Başa Al)"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 5-Segment Story Progress Trackers (like Instagram stories / reels bar) */}
      <div className="grid grid-cols-5 gap-1.5 mt-3 mb-4">
        {news.map((item, idx) => {
          let fillWidth = 0;
          if (idx < currentIndex) {
            fillWidth = 100;
          } else if (idx === currentIndex) {
            const currentStoryRemaining = (storyDuration - (storyElapsed || 0));
            const currentPct = ((storyDuration - currentStoryRemaining) / storyDuration) * 100;
            fillWidth = Math.min(100, Math.max(0, currentPct));
          }

          return (
            <button
              key={item.id}
              onClick={() => {
                onSelectIndex(idx);
                setTimeLeft(parseFloat((TOTAL_TIME - idx * storyDuration).toFixed(1)));
              }}
              className="h-1.5 bg-slate-800 rounded-full overflow-hidden cursor-pointer group"
              title={`${idx + 1}. ${item.categoryLabel}`}
            >
              <div
                className="h-full bg-gradient-to-r from-rose-500 to-amber-400 transition-all duration-100 group-hover:opacity-90"
                style={{ width: `${fillWidth}%` }}
              />
            </button>
          );
        })}
      </div>

      {/* Main Broadcast Stage: 2-Column Split (Media Studio Simulation + 59s Written Summary) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Media / Studio Video Simulation (cols 7) */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-xl overflow-hidden bg-black/60 border border-slate-800/80 relative min-h-[300px] sm:min-h-[380px]">
          {/* Background Photo */}
          <div className="absolute inset-0 z-0">
            <Image
              src={currentStory.image}
              alt={currentStory.headline}
              fill
              className="object-cover transition-transform duration-700 scale-105"
              priority
              referrerPolicy="no-referrer"
            />
            {/* Dark Cinematic Gradient Overlay for legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/30" />
          </div>

          {/* Broadcast Camera HUD Top Overlays */}
          <div className="relative z-10 p-3 sm:p-4 flex items-center justify-between text-xs text-white/90">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-rose-600/90 font-bold uppercase tracking-wider text-[10px] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                CANLI YAYIN
              </span>
              <span className="px-2 py-1 rounded bg-black/50 backdrop-blur-sm border border-white/10 font-mono text-[11px]">
                {currentStory.location}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Studio Waveform when speaking */}
              {isAudioPlaying && (
                <div className="flex items-end gap-0.5 h-4 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-white/10">
                  <span className="w-1 bg-amber-400 rounded-full wave-bar-1" />
                  <span className="w-1 bg-amber-400 rounded-full wave-bar-2" />
                  <span className="w-1 bg-amber-400 rounded-full wave-bar-3" />
                  <span className="w-1 bg-amber-400 rounded-full wave-bar-4" />
                  <span className="w-1 bg-amber-400 rounded-full wave-bar-5" />
                </div>
              )}
              <span className="px-2 py-1 rounded bg-black/50 backdrop-blur-sm border border-white/10 font-mono text-[10px] text-slate-300">
                4K HDR · 59s MODU
              </span>
            </div>
          </div>

          {/* Lower Thirds Broadcast Title & Teleprompter Ticker */}
          <div className="relative z-10 p-4 sm:p-5 mt-auto">
            {/* Kicker tag */}
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-1">
              <span>{currentStory.kicker}</span>
              <span className="text-white/40">·</span>
              <span className="text-slate-300 font-normal">{currentStory.timestamp}</span>
            </div>

            {/* Headline */}
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight leading-snug drop-shadow-md">
              {currentStory.headline}
            </h2>

            {/* AI Anchor Spoken Script / Teleprompter Box */}
            <div className="mt-3 p-3 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-600 to-amber-500 shrink-0 flex items-center justify-center text-white text-xs font-bold shadow-inner">
                AI
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-0.5">
                  <span className="font-medium text-amber-300 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Spiker Seslendirmesi
                  </span>
                  <span>{currentStory.readTimeSec} Saniye</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 italic">
                  &ldquo;{currentStory.audioScript}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: "Yazılı Özet" (59-Second Rapid Digest) (cols 5) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-slate-950/60 rounded-xl p-4 sm:p-5 border border-slate-800/80">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm bg-rose-500" />
                <h3 className="text-sm font-bold text-white tracking-wide uppercase">
                  59 Saniyede Yazılı Özet
                </h3>
              </div>
              <span className="text-xs text-slate-400">3 Net Madde</span>
            </div>

            {/* Bullets with Teleprompter Highlight */}
            <div className="space-y-3">
              {currentStory.bullets.map((bullet, bIdx) => {
                const isActiveBullet = isBlitzActive && activeBulletIdx === bIdx;

                return (
                  <div
                    key={bIdx}
                    className={`p-3 rounded-lg border transition-all ${
                      isActiveBullet
                        ? 'bg-rose-500/10 border-rose-500/50 shadow-sm shadow-rose-500/10 ring-1 ring-rose-500/30'
                        : 'bg-slate-900/60 border-slate-800/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-mono font-bold mt-0.5 ${
                          isActiveBullet
                            ? 'bg-rose-500 text-white'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {bIdx + 1}
                      </div>
                      <p
                        className={`text-xs sm:text-sm leading-relaxed ${
                          isActiveBullet
                            ? 'text-white font-medium'
                            : 'text-slate-300'
                        }`}
                      >
                        {bullet}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Key Figures Mini Strip */}
            {currentStory.keyFigures && currentStory.keyFigures.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800/80">
                {currentStory.keyFigures.map((fig, fIdx) => (
                  <div key={fIdx} className="bg-slate-900/80 rounded p-2 text-center border border-slate-800/60">
                    <div className="text-[10px] text-slate-400 truncate">{fig.label}</div>
                    <div className="text-xs font-bold text-amber-400 font-mono mt-0.5 truncate">
                      {fig.value}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-between gap-3 pt-4 mt-4 border-t border-slate-800">
            <div className="flex items-center gap-1">
              <button
                onClick={() => toggleBookmark(currentStory.id)}
                className={`p-2 rounded-lg border transition-colors ${
                  bookmarked[currentStory.id]
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                }`}
                title="Kaydet"
              >
                <Bookmark className="w-4 h-4" />
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-lg bg-slate-800 text-slate-400 border border-slate-700 hover:text-white transition-colors relative"
                title="Haberi Paylaş"
              >
                <Share2 className="w-4 h-4" />
                {copiedToast && (
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-rose-600 text-[10px] font-bold text-white rounded shadow whitespace-nowrap">
                    Kopyalandı!
                  </span>
                )}
              </button>
            </div>

            <button
              onClick={() => onOpenDetails(currentStory)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 transition-colors"
            >
              <span>Derinlemesine İncele</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
