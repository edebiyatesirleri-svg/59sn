'use client';

import React from 'react';
import { Flame } from 'lucide-react';
import { NewsItem } from '@/lib/newsData';

interface TickerBarProps {
  news: NewsItem[];
  onSelectNews: (item: NewsItem) => void;
}

export const TickerBar: React.FC<TickerBarProps> = ({ news, onSelectNews }) => {
  return (
    <div className="w-full bg-slate-950/90 border-b border-slate-800/80 overflow-hidden text-xs py-1.5 flex items-center">
      <div className="flex items-center gap-1.5 px-3 py-0.5 bg-rose-600 text-white font-bold tracking-wider shrink-0 uppercase text-[10px] ml-2 rounded">
        <Flame className="w-3 h-3 animate-bounce" />
        <span>Son Dakika</span>
      </div>

      <div className="relative overflow-hidden flex-1 ml-3">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-slate-300">
          {news.concat(news).map((item, idx) => (
            <button
              key={`${item.id}-${idx}`}
              onClick={() => onSelectNews(item)}
              className="inline-flex items-center gap-2 hover:text-white transition-colors cursor-pointer group"
            >
              <span className="text-rose-400 font-semibold uppercase text-[10px]">
                [{item.categoryLabel.split(' ')[0]}]
              </span>
              <span className="group-hover:underline text-slate-200">{item.headline}</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-400 text-[11px]">{item.location}</span>
              <span className="text-slate-700">·</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
