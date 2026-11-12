'use client';

import React, { useState } from 'react';
import { X, Sparkles, Loader2, RefreshCw, Send, CheckCircle } from 'lucide-react';
import { NewsItem } from '@/lib/newsData';

interface AiTopicModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyNewAgenda: (newItems: NewsItem[]) => void;
}

export const AiTopicModal: React.FC<AiTopicModalProps> = ({
  isOpen,
  onClose,
  onApplyNewAgenda,
}) => {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const quickTopics = [
    'Tüm Türkiye Gündemini Yenile',
    'Ekonomi, Enflasyon ve Borsa',
    'Yapay Zeka ve Çip Teknolojileri',
    'Süper Lig ve Avrupa Kupaları',
    'Dış Politika ve Barış Diplomasisi',
  ];

  const handleGenerate = async (customPrompt?: string) => {
    const selectedTopic = customPrompt !== undefined ? customPrompt : topic;
    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/gemini/agenda', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: selectedTopic === 'Tüm Türkiye Gündemini Yenile' ? '' : selectedTopic,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Bülten oluşturulamadı.');
      }

      if (Array.isArray(data.items) && data.items.length > 0) {
        onApplyNewAgenda(data.items);
        onClose();
      } else {
        throw new Error('Dönen veri geçerli bir bülten formatında değil.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(
        err.message || 'Yapay zeka bülteni oluşturulurken bağlantı hatası oluştu.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="absolute inset-0" onClick={() => !isLoading && onClose()} />

      <div className="relative z-10 w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Yapay Zeka ile 59sn Gündemi Hazırla
              </h2>
              <p className="text-xs text-slate-400">
                Gemini, belirleyeceğiniz konuyu 59 saniyede tüketilebilecek 5 habere dönüştürür
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isLoading}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-40"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input area */}
        <div className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Özel Odak / Konu Başlığı (İsteğe Bağlı)
            </label>
            <div className="relative">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Örn: Teknoloji yatırımları, Küresel piyasalar, Formula 1..."
                disabled={isLoading}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleGenerate();
                }}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
              <button
                onClick={() => handleGenerate()}
                disabled={isLoading}
                className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:bg-slate-800 text-slate-950 font-semibold text-xs flex items-center gap-1 transition-colors"
              >
                {isLoading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* Quick suggestions */}
          <div>
            <span className="block text-xs text-slate-400 mb-2">
              Veya hazır konulardan birini seçin:
            </span>
            <div className="flex flex-wrap gap-2">
              {quickTopics.map((t, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setTopic(t);
                    handleGenerate(t);
                  }}
                  disabled={isLoading}
                  className="px-3 py-1.5 rounded-lg bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-white text-xs border border-slate-800 hover:border-slate-700 transition-colors disabled:opacity-50 text-left"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Loading state indicator */}
          {isLoading && (
            <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/30 flex items-center gap-3 animate-pulse">
              <Loader2 className="w-5 h-5 text-amber-400 animate-spin shrink-0" />
              <div className="text-xs text-slate-300">
                <span className="font-semibold text-amber-400">Gemini 59 saniyelik bülteni hazırlıyor...</span>
                <span className="block text-[11px] text-slate-400 mt-0.5">
                  5 kategori taranıyor, özet maddeler ve seslendirme metni kaleme alınıyor.
                </span>
              </div>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs">
              {errorMessage}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Google Gemini 2.5 Flash ile desteklenmektedir</span>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
          >
            İptal
          </button>
        </div>
      </div>
    </div>
  );
};
