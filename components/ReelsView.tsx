'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Heart,
  Share2,
  Bookmark,
  Volume2,
  VolumeX,
  ChevronUp,
  ChevronDown,
  Info,
  Clock,
  Sparkles,
  Radio,
  RotateCcw
} from 'lucide-react';
import { NewsItem } from '@/lib/newsData';

interface ReelsViewProps {
  news: NewsItem[];
  currentIndex: number;
  onSelectIndex: (index: number) => void;
  onOpenDetails: (item: NewsItem) => void;
  speakStory: (text: string) => void;
  stopAudio: () => void;
  isAudioPlaying: boolean;
}

export const ReelsView: React.FC<ReelsViewProps> = ({
  news,
  currentIndex,
  onSelectIndex,
  onOpenDetails,
  speakStory,
  stopAudio,
  isAudioPlaying,
}) => {
  const [likes, setLikes] = useState<Record<string, number>>({
    'siyaset-1': 1420,
    'ekonomi-1': 2890,
    'teknoloji-1': 5130,
    'spor-1': 8760,
    'kultur-1': 940,
  });
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({});
  const [isMuted, setIsMuted] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const currentStory = news[currentIndex] || news[0];

  const handleNext = React.useCallback(() => {
    if (currentIndex < news.length - 1) {
      onSelectIndex(currentIndex + 1);
    } else {
      onSelectIndex(0); // loop
    }
  }, [currentIndex, news.length, onSelectIndex]);

  const handlePrev = React.useCallback(() => {
    if (currentIndex > 0) {
      onSelectIndex(currentIndex - 1);
    } else {
      onSelectIndex(news.length - 1);
    }
  }, [currentIndex, news.length, onSelectIndex]);

  // Keyboard navigation for reels
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        handleNext();
      } else if (e.key === 'ArrowUp') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  const toggleLike = (id: string) => {
    const isNowLiked = !liked[id];
    setLiked((prev) => ({ ...prev, [id]: isNowLiked }));
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + (isNowLiked ? 1 : -1),
    }));
  };

  const toggleAudio = () => {
    if (isAudioPlaying) {
      stopAudio();
      setIsMuted(true);
    } else {
      speakStory(currentStory.audioScript);
      setIsMuted(false);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2000);
  };

  return (
    <div className="w-full flex flex-col items-center py-4">
      {/* Toast notice */}
      {toastMessage && (
        <div className="fixed top-20 z-50 px-4 py-2 bg-rose-600 text-white text-xs font-bold rounded-lg shadow-xl animate-fade-in">
          {toastMessage}
        </div>
      )}

      {/* Reel Header info */}
      <div className="w-full max-w-md flex items-center justify-between text-xs text-slate-400 mb-2 px-2">
        <span className="flex items-center gap-1.5 font-medium text-slate-300">
          <Radio className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
          Reels Gündem Akışı ({currentIndex + 1} / {news.length})
        </span>
        <span className="text-[11px] text-slate-500">Klavye: ↑ / ↓ tuşları</span>
      </div>

      {/* Vertical Reel Container (Instagram / TikTok format) */}
      <div className="relative w-full max-w-md aspect-[9/16] max-h-[720px] bg-black rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col justify-between">
        {/* Full Image Canvas */}
        <div className="absolute inset-0 z-0">
          <Image
            src={currentStory.image}
            alt={currentStory.headline}
            fill
            className="object-cover transition-opacity duration-300"
            priority
            referrerPolicy="no-referrer"
          />
          {/* Subtle vignette gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60" />
        </div>

        {/* Top Segmented Story Indicators */}
        <div className="relative z-20 p-3 pt-3 flex items-center gap-1.5">
          {news.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => onSelectIndex(idx)}
              className="flex-1 h-1 rounded-full overflow-hidden bg-white/20 hover:bg-white/40 transition-colors"
            >
              <div
                className={`h-full transition-all duration-300 ${
                  idx === currentIndex
                    ? 'bg-rose-500'
                    : idx < currentIndex
                    ? 'bg-white/80'
                    : 'bg-transparent'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Top Metadata Badges */}
        <div className="relative z-20 px-4 flex items-center justify-between text-xs text-white">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-rose-600 font-bold tracking-wider text-[10px] uppercase shadow">
              SON DAKİKA
            </span>
            <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px]">
              {currentStory.location}
            </span>
          </div>

          <button
            onClick={toggleAudio}
            className={`p-2 rounded-full backdrop-blur-md border border-white/20 transition-all ${
              isAudioPlaying
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/40 animate-pulse'
                : 'bg-black/50 text-white/80 hover:text-white'
            }`}
            title="Spiker Sesini Aç/Kapat"
          >
            {isAudioPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>

        {/* Floating Right Social Actions (Reels Style) */}
        <div className="absolute right-3 bottom-24 z-30 flex flex-col items-center gap-4">
          {/* Like */}
          <button
            onClick={() => toggleLike(currentStory.id)}
            className="flex flex-col items-center gap-1 text-white group"
          >
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md transition-transform active:scale-90 ${
                liked[currentStory.id]
                  ? 'bg-rose-600/90 text-white'
                  : 'bg-black/50 border border-white/15 text-white/90 group-hover:bg-black/70'
              }`}
            >
              <Heart
                className="w-5 h-5"
                fill={liked[currentStory.id] ? 'currentColor' : 'none'}
              />
            </div>
            <span className="text-[11px] font-semibold tabular-nums drop-shadow">
              {(likes[currentStory.id] || 0).toLocaleString('tr-TR')}
            </span>
          </button>

          {/* Bookmark */}
          <button
            onClick={() => {
              setBookmarked((prev) => ({
                ...prev,
                [currentStory.id]: !prev[currentStory.id],
              }));
              showToast(
                bookmarked[currentStory.id]
                  ? 'Kaydedilenlerden çıkarıldı'
                  : 'Haber kaydedildi!'
              );
            }}
            className="flex flex-col items-center gap-1 text-white group"
          >
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md transition-transform active:scale-90 ${
                bookmarked[currentStory.id]
                  ? 'bg-amber-500/90 text-white'
                  : 'bg-black/50 border border-white/15 text-white/90 group-hover:bg-black/70'
              }`}
            >
              <Bookmark
                className="w-5 h-5"
                fill={bookmarked[currentStory.id] ? 'currentColor' : 'none'}
              />
            </div>
            <span className="text-[11px] font-semibold drop-shadow">Kaydet</span>
          </button>

          {/* Share */}
          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(
                  `${currentStory.headline} - 59 Saniyede Gündem`
                );
                showToast('Bağlantı kopyalandı!');
              }
            }}
            className="flex flex-col items-center gap-1 text-white group"
          >
            <div className="w-11 h-11 rounded-full flex items-center justify-center bg-black/50 border border-white/15 backdrop-blur-md text-white/90 group-hover:bg-black/70 active:scale-90 transition-transform">
              <Share2 className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold drop-shadow">Paylaş</span>
          </button>

          {/* Full Info Details */}
          <button
            onClick={() => onOpenDetails(currentStory)}
            className="flex flex-col items-center gap-1 text-white group"
          >
            <div className="w-11 h-11 rounded-full flex items-center justify-center bg-black/50 border border-white/15 backdrop-blur-md text-white/90 group-hover:bg-black/70 active:scale-90 transition-transform">
              <Info className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold drop-shadow">Detay</span>
          </button>
        </div>

        {/* Bottom Content Area */}
        <div className="relative z-20 p-4 sm:p-5 pr-16 bg-gradient-to-t from-black via-black/80 to-transparent">
          {/* Category Tag */}
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
              {currentStory.categoryLabel}
            </span>
            <span className="text-white/40">·</span>
            <span className="text-xs text-slate-300">{currentStory.timestamp}</span>
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold text-white leading-tight mb-2 drop-shadow-md">
            {currentStory.headline}
          </h3>

          {/* 59s Written Bullet Digest */}
          <div className="space-y-1.5 mb-3">
            {currentStory.bullets.map((bullet, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                <span className="line-clamp-2">{bullet}</span>
              </div>
            ))}
          </div>

          {/* Spiker Voice Script Bar */}
          <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-between text-xs text-white">
            <div className="flex items-center gap-2 truncate pr-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span className="truncate italic text-[11px] text-slate-200">
                &ldquo;{currentStory.audioScript}&rdquo;
              </span>
            </div>
            <span className="text-[10px] font-mono shrink-0 text-amber-400">
              {currentStory.readTimeSec}s
            </span>
          </div>
        </div>

        {/* Up / Down Navigation Floaters for Desktop/Tablet */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2">
          <button
            onClick={handlePrev}
            className="p-2 rounded-full bg-black/60 border border-white/20 text-white/80 hover:text-white hover:bg-black/90 active:scale-95 transition-all"
            title="Önceki Reels"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-full bg-black/60 border border-white/20 text-white/80 hover:text-white hover:bg-black/90 active:scale-95 transition-all"
            title="Sonraki Reels"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
