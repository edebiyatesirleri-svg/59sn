'use client';

import React from 'react';
import { Play, Sparkles, Radio } from 'lucide-react';

interface NavbarProps {
  onStartBlitz: () => void;
  onOpenAiModal: () => void;
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  isBlitzActive: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onStartBlitz,
  onOpenAiModal,
  activeCategory,
  onSelectCategory,
  isBlitzActive,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#090d16]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onSelectCategory('all')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center font-bold text-white text-sm shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform">
              59s
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-white group-hover:text-rose-400 transition-colors whitespace-nowrap">
                59 Saniyede Ülke Gündemi
              </span>
              <span className="text-[11px] text-slate-400 flex items-center gap-1.5 whitespace-nowrap">
                <Radio className="w-3 h-3 text-rose-500 animate-pulse" />
                Canlı Türkiye & Dünya Bülteni
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-slate-400">
          <button
            onClick={() => onSelectCategory('all')}
            className={`transition-colors whitespace-nowrap hover:text-white ${
              activeCategory === 'all' ? 'text-white font-semibold' : ''
            }`}
          >
            Gündem Özeti
          </button>
          <button
            onClick={() => onSelectCategory('siyaset')}
            className={`transition-colors whitespace-nowrap hover:text-white ${
              activeCategory === 'siyaset' ? 'text-rose-400 font-semibold' : ''
            }`}
          >
            Siyaset
          </button>
          <button
            onClick={() => onSelectCategory('ekonomi')}
            className={`transition-colors whitespace-nowrap hover:text-white ${
              activeCategory === 'ekonomi' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            Ekonomi
          </button>
          <button
            onClick={() => onSelectCategory('teknoloji')}
            className={`transition-colors whitespace-nowrap hover:text-white ${
              activeCategory === 'teknoloji' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            Teknoloji
          </button>
          <button
            onClick={() => onSelectCategory('spor')}
            className={`transition-colors whitespace-nowrap hover:text-white ${
              activeCategory === 'spor' ? 'text-emerald-400 font-semibold' : ''
            }`}
          >
            Spor
          </button>
          <button
            onClick={() => onSelectCategory('kultur')}
            className={`transition-colors whitespace-nowrap hover:text-white ${
              activeCategory === 'kultur' ? 'text-purple-400 font-semibold' : ''
            }`}
          >
            Kültür & Yaşam
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onOpenAiModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 transition-colors whitespace-nowrap"
            title="Yapay zeka ile anlık yeni 59sn bülteni hazırla"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">AI ile Yenile</span>
          </button>

          <button
            onClick={onStartBlitz}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white transition-all shadow-md whitespace-nowrap ${
              isBlitzActive
                ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/30 ring-2 ring-amber-400/50'
                : 'bg-rose-600 hover:bg-rose-500 shadow-rose-600/30'
            }`}
          >
            <Play className={`w-3.5 h-3.5 ${isBlitzActive ? 'animate-spin' : ''}`} fill="currentColor" />
            <span>{isBlitzActive ? '59sn Akışta' : '59 Saniyede Başlat'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
