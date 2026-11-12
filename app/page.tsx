'use client';

import React, { useState } from 'react';
import {
  Play,
  Sparkles,
  Smartphone,
  LayoutGrid,
  Clock,
  Radio,
  Volume2,
  VolumeX,
  RotateCcw,
  SlidersHorizontal,
  Flame,
  Award
} from 'lucide-react';
import { INITIAL_NEWS, NewsItem } from '@/lib/newsData';
import { Navbar } from '@/components/Navbar';
import { TickerBar } from '@/components/TickerBar';
import { BlitzPlayer } from '@/components/BlitzPlayer';
import { ReelsView } from '@/components/ReelsView';
import { NewsCard } from '@/components/NewsCard';
import { NewsModal } from '@/components/NewsModal';
import { AiTopicModal } from '@/components/AiTopicModal';
import { CompletionModal } from '@/components/CompletionModal';
import { useTurkishSpeaker } from '@/hooks/useTurkishSpeaker';

export default function HomePage() {
  const [news, setNews] = useState<NewsItem[]>(INITIAL_NEWS);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'blitz' | 'reels' | 'grid'>('blitz');
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Modals
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState<boolean>(false);

  // Blitz player state
  const [isBlitzActive, setIsBlitzActive] = useState<boolean>(false);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);

  // Audio hook
  const { speak, stop, isPlaying: isAudioPlaying } = useTurkishSpeaker();

  // Filtered news for the grid
  const filteredNews =
    activeCategory === 'all'
      ? news
      : news.filter((item) => item.category === activeCategory);

  // Handle starting 59-second blitz
  const handleStartBlitz = () => {
    setViewMode('blitz');
    setCurrentIndex(0);
    setIsBlitzActive(true);
    if (!isAudioMuted && news[0]) {
      speak(news[0].audioScript);
    }
  };

  // When a card is played
  const handlePlayThisCard = (item: NewsItem) => {
    const idx = news.findIndex((n) => n.id === item.id);
    if (idx !== -1) {
      setCurrentIndex(idx);
    }
    setViewMode('blitz');
    setIsBlitzActive(true);
    if (!isAudioMuted) {
      speak(item.audioScript);
    }
  };

  // Apply new AI generated agenda
  const handleApplyNewAgenda = (newItems: NewsItem[]) => {
    setNews(newItems);
    setCurrentIndex(0);
    setIsBlitzActive(false);
    stop();
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar
        onStartBlitz={handleStartBlitz}
        onOpenAiModal={() => setIsAiModalOpen(true)}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        isBlitzActive={isBlitzActive}
      />

      {/* Breaking News Marquee */}
      <TickerBar news={news} onSelectNews={(item) => setSelectedNews(item)} />

      {/* Hero Headline & View Switcher Bar */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-500 mb-1 tracking-wide">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span>GÜNLÜK HIZLI BÜLTEN</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400 font-normal">Tam 59 Saniyede Tüket</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
              Türkiye ve Dünya Gündemi, 59 Saniyede.
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Vaktinizi almayan, net 3 maddelik yazılı özetler ve yapay zeka spikeriyle tasarlanmış dinamik haber akışı.
            </p>
          </div>

          {/* View Mode Segmented Controls */}
          <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl shrink-0">
            <button
              onClick={() => setViewMode('blitz')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'blitz'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="59 Saniyelik TV Stüdyo & Sayaç Oynatıcı"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>59s Stüdyo</span>
            </button>

            <button
              onClick={() => setViewMode('reels')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'reels'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Dikey Reels & Shorts Akışı"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Reels Akışı</span>
            </button>

            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'grid'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Genel Bakış Bento Kartları"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Kartlar ({news.length})</span>
            </button>
          </div>
        </div>

        {/* Category Filter Chips Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-3">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              activeCategory === 'all'
                ? 'bg-slate-100 text-slate-900 font-semibold'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Tüm 59s Gündemi ({news.length})
          </button>
          <button
            onClick={() => setActiveCategory('siyaset')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              activeCategory === 'siyaset'
                ? 'bg-rose-500 text-white font-semibold'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Siyaset & Diplomasi
          </button>
          <button
            onClick={() => setActiveCategory('ekonomi')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              activeCategory === 'ekonomi'
                ? 'bg-amber-500 text-slate-950 font-semibold'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Ekonomi & Piyasalar
          </button>
          <button
            onClick={() => setActiveCategory('teknoloji')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              activeCategory === 'teknoloji'
                ? 'bg-cyan-500 text-slate-950 font-semibold'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Teknoloji & Yapay Zeka
          </button>
          <button
            onClick={() => setActiveCategory('spor')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              activeCategory === 'spor'
                ? 'bg-emerald-500 text-slate-950 font-semibold'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Spor Dünyası
          </button>
          <button
            onClick={() => setActiveCategory('kultur')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              activeCategory === 'kultur'
                ? 'bg-purple-500 text-white font-semibold'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Kültür & Sanat
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Mode 1: 59-Second Blitz Player */}
        {viewMode === 'blitz' && (
          <div className="space-y-8 animate-fade-in">
            <BlitzPlayer
              news={news}
              currentIndex={currentIndex}
              onSelectIndex={setCurrentIndex}
              onOpenDetails={(item) => setSelectedNews(item)}
              onComplete={() => setIsCompletionModalOpen(true)}
              isBlitzActive={isBlitzActive}
              setIsBlitzActive={setIsBlitzActive}
              isAudioMuted={isAudioMuted}
              setIsAudioMuted={setIsAudioMuted}
              speakStory={(text) => speak(text)}
              stopAudio={stop}
              isAudioPlaying={isAudioPlaying}
            />

            {/* Quick overview of all 5 news items below the player for easy jumping */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white tracking-wide uppercase flex items-center gap-2">
                  <span className="w-2 h-2 rounded bg-rose-500" />
                  Bültendeki Diğer Başlıklar
                </h3>
                <span className="text-xs text-slate-400">
                  Tıklayarak doğrudan habere geçebilirsiniz
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {news.map((item, idx) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      if (isBlitzActive && !isAudioMuted) {
                        speak(item.audioScript);
                      }
                    }}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      idx === currentIndex
                        ? 'bg-rose-500/10 border-rose-500/50 shadow-md ring-1 ring-rose-500/30'
                        : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                          idx === currentIndex
                            ? 'bg-rose-600 text-white'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        0{idx + 1}
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] uppercase font-semibold text-rose-400 truncate">
                          {item.categoryLabel}
                        </div>
                        <div className="text-xs font-bold text-slate-200 truncate mt-0.5">
                          {item.headline}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] font-mono text-slate-500">
                        {item.readTimeSec}s
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mode 2: Reels / Shorts Vertical View */}
        {viewMode === 'reels' && (
          <div className="animate-fade-in">
            <ReelsView
              news={news}
              currentIndex={currentIndex}
              onSelectIndex={setCurrentIndex}
              onOpenDetails={(item) => setSelectedNews(item)}
              speakStory={(text) => speak(text)}
              stopAudio={stop}
              isAudioPlaying={isAudioPlaying}
            />
          </div>
        )}

        {/* Mode 3: Bento Grid Cards */}
        {viewMode === 'grid' && (
          <div className="animate-fade-in space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.map((item, idx) => (
                <NewsCard
                  key={item.id}
                  item={item}
                  index={idx}
                  onOpenDetails={(n) => setSelectedNews(n)}
                  onPlayThis={handlePlayThisCard}
                  speakStory={(text) => speak(text)}
                  isCurrentAudio={isAudioPlaying && currentIndex === idx}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Editorial Trust Banner & Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950/70 py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-rose-600 flex items-center justify-center font-bold text-white text-xs">
              59s
            </div>
            <div>
              <p className="font-semibold text-slate-300">
                59 Saniyede Ülke Gündemi
              </p>
              <p className="text-[11px] text-slate-500">
                Hızlı, tarafsız ve yapay zeka destekli Türkiye haber özeti bülteni.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-slate-400">
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>AI ile Özel Bülten</span>
            </button>
            <button
              onClick={handleStartBlitz}
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <Play className="w-3 h-3 text-rose-500" />
              <span>59 Saniyeyi Başlat</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <NewsModal
        item={selectedNews}
        onClose={() => setSelectedNews(null)}
        onPlayInBlitz={(item) => handlePlayThisCard(item)}
        speakStory={(text) => speak(text)}
        isAudioPlaying={isAudioPlaying}
      />

      <AiTopicModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onApplyNewAgenda={handleApplyNewAgenda}
      />

      <CompletionModal
        isOpen={isCompletionModalOpen}
        onClose={() => setIsCompletionModalOpen(false)}
        onRestart={handleStartBlitz}
        onOpenGrid={() => setViewMode('grid')}
      />
    </div>
  );
}
