'use client';

import React from 'react';
import Image from 'next/image';
import {
  X,
  Volume2,
  Share2,
  Play,
  Quote,
  TrendingUp,
  MapPin,
  Clock,
  Sparkles,
  Check
} from 'lucide-react';
import { NewsItem } from '@/lib/newsData';

interface NewsModalProps {
  item: NewsItem | null;
  onClose: () => void;
  onPlayInBlitz: (item: NewsItem) => void;
  speakStory: (text: string) => void;
  isAudioPlaying: boolean;
}

export const NewsModal: React.FC<NewsModalProps> = ({
  item,
  onClose,
  onPlayInBlitz,
  speakStory,
  isAudioPlaying,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!item) return null;

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(
        `${item.headline}\n\nÖzet:\n${item.bullets.join('\n')}\n\nKaynak: 59 Saniyede Ülke Gündemi`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl text-slate-100 flex flex-col no-scrollbar">
        {/* Top Sticky Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-4 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-rose-400 uppercase tracking-wide">
              {item.categoryLabel}
            </span>
            <span className="text-slate-600">·</span>
            <span className="flex items-center gap-1 text-slate-400">
              <MapPin className="w-3 h-3 text-slate-500" />
              {item.location}
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400">{item.timestamp}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            title="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Hero Image */}
        <div className="relative aspect-video w-full bg-black overflow-hidden shrink-0">
          <Image
            src={item.image}
            alt={item.headline}
            fill
            className="object-cover"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

          {/* Quick Play Trigger */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            <button
              onClick={() => {
                onPlayInBlitz(item);
                onClose();
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs shadow-lg transition-transform active:scale-95"
            >
              <Play className="w-3.5 h-3.5" fill="currentColor" />
              <span>59s Oynatıcıda Aç</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6">
          {/* Headline */}
          <div>
            <div className="text-xs font-semibold text-amber-400 mb-1">{item.kicker}</div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
              {item.headline}
            </h2>
          </div>

          {/* 59-Second Bullet Summary Section */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-rose-500" />
              59 Saniyede Öne Çıkanlar (3 Madde)
            </h3>
            <ul className="space-y-2.5">
              {item.bullets.map((b, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-200">
                  <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center shrink-0 font-mono text-xs font-bold mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Full Summary & Analysis */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              Derinlemesine Analiz & Arka Plan
            </h3>
            <p className="text-sm leading-relaxed text-slate-300">
              {item.fullSummary}
            </p>
          </div>

          {/* Key Figures Strip */}
          {item.keyFigures && item.keyFigures.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                Kilit Veriler ve Göstergeler
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {item.keyFigures.map((fig, fIdx) => (
                  <div
                    key={fIdx}
                    className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center"
                  >
                    <div className="text-[11px] text-slate-400">{fig.label}</div>
                    <div className="text-base font-bold text-amber-400 font-mono mt-1">
                      {fig.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Expert Quote */}
          {item.expertQuote && (
            <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/80 flex items-start gap-3">
              <Quote className="w-6 h-6 text-slate-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-xs sm:text-sm text-slate-300 italic">
                  &ldquo;{item.expertQuote.text}&rdquo;
                </p>
                <div className="text-[11px] text-slate-400 font-medium">
                  — {item.expertQuote.author}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Sticky Bar */}
        <div className="sticky bottom-0 z-20 p-4 bg-slate-900/90 backdrop-blur-md border-t border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => speakStory(item.audioScript)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium border border-slate-700 transition-colors"
            >
              <Volume2 className={`w-4 h-4 ${isAudioPlaying ? 'text-rose-400 animate-pulse' : ''}`} />
              <span>{isAudioPlaying ? 'Spiker Okuyor...' : 'Spikeri Dinle'}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? 'Kopyalandı!' : 'Metni Kopyala'}</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white text-xs font-medium transition-colors"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
