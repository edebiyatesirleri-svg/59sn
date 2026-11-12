'use client';

import React from 'react';
import Image from 'next/image';
import { Play, Volume2, ChevronRight, Clock, MapPin } from 'lucide-react';
import { NewsItem } from '@/lib/newsData';

interface NewsCardProps {
  item: NewsItem;
  index: number;
  onOpenDetails: (item: NewsItem) => void;
  onPlayThis: (item: NewsItem) => void;
  speakStory: (text: string) => void;
  isCurrentAudio: boolean;
}

export const NewsCard: React.FC<NewsCardProps> = ({
  item,
  index,
  onOpenDetails,
  onPlayThis,
  speakStory,
  isCurrentAudio,
}) => {
  return (
    <article className="group bg-slate-900/80 rounded-2xl border border-slate-800/90 overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all duration-200 hover:shadow-xl">
      {/* Top Image Box */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
        <Image
          src={item.image}
          alt={item.headline}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Live Location & Read Time Badge */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs text-white">
          <span className="flex items-center gap-1 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 font-mono text-[11px]">
            <MapPin className="w-3 h-3 text-rose-400" />
            {item.location}
          </span>
          <span className="flex items-center gap-1 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 font-mono text-[11px]">
            <Clock className="w-3 h-3 text-amber-400" />
            {item.readTimeSec}s
          </span>
        </div>

        {/* Floating Quick Play on Media */}
        <button
          onClick={() => onPlayThis(item)}
          className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-rose-600/90 hover:bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-600/30 group-hover:scale-110 active:scale-95 transition-all"
          title="Bu Haberi 59s Oynatıcıda Aç"
        >
          <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
        </button>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata line (Clean, unboxed text per constitution §1.A) */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
            <span className="font-semibold text-rose-400 uppercase tracking-wider text-[11px]">
              {item.categoryLabel}
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>{item.timestamp}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-500">{item.kicker}</span>
          </div>

          {/* Headline */}
          <h3
            onClick={() => onOpenDetails(item)}
            className="text-base sm:text-lg font-bold text-white group-hover:text-rose-400 transition-colors leading-snug cursor-pointer mb-3"
          >
            {item.headline}
          </h3>

          {/* 3 Digest Bullets */}
          <ul className="space-y-2 mb-4">
            {item.bullets.map((bullet, bIdx) => (
              <li key={bIdx} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 mt-1.5 shrink-0" />
                <span className="line-clamp-2">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
          {/* Audio voice preview */}
          <button
            onClick={() => speakStory(item.audioScript)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              isCurrentAudio
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                : 'bg-slate-800/70 text-slate-300 border-slate-700 hover:text-white'
            }`}
            title="Spiker Seslendirmesini Dinle"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Dinle ({item.readTimeSec}s)</span>
          </button>

          {/* Deep dive detail button */}
          <button
            onClick={() => onOpenDetails(item)}
            className="flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <span>Detaylar</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
};
