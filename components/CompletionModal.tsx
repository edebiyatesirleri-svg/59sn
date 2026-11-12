'use client';

import React from 'react';
import { CheckCircle2, RotateCcw, Share2, Sparkles, X, LayoutGrid } from 'lucide-react';

interface CompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestart: () => void;
  onOpenGrid: () => void;
}

export const CompletionModal: React.FC<CompletionModalProps> = ({
  isOpen,
  onClose,
  onRestart,
  onOpenGrid,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(
        'Bugün Türkiye ve dünya gündemini tam 59 saniyede tükettim! Sen de dene: 59 Saniyede Ülke Gündemi'
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl text-slate-100 text-center">
        {/* Celebration icon */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 mx-auto flex items-center justify-center text-white shadow-xl shadow-emerald-500/20 mb-4 animate-bounce">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
          Süre Tamamlandı
        </span>

        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1 mb-2">
          Gündemi 59 Saniyede Bitirdiniz!
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xs mx-auto mb-6">
          Siyaset, ekonomi, teknoloji, spor ve kültür alanlarındaki en kritik 15 maddeyi başarıyla taradınız.
        </p>

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-950/80 border border-slate-800 mb-6">
          <div className="text-center">
            <div className="text-[11px] text-slate-400">Tüketilen Süre</div>
            <div className="text-lg font-bold text-white font-mono mt-0.5">59sn</div>
          </div>
          <div className="text-center border-x border-slate-800">
            <div className="text-[11px] text-slate-400">Kategori</div>
            <div className="text-lg font-bold text-amber-400 font-mono mt-0.5">5 Alan</div>
          </div>
          <div className="text-center">
            <div className="text-[11px] text-slate-400">Özet Madde</div>
            <div className="text-lg font-bold text-emerald-400 font-mono mt-0.5">15 Madde</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={() => {
              onClose();
              onRestart();
            }}
            className="w-full py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-600/20 transition-all active:scale-[0.98]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>59 Saniyeyi Yeniden Başlat</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenGrid();
              }}
              className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Kartlara Göz At</span>
            </button>

            <button
              onClick={handleShare}
              className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Kopyalandı!' : 'Özeti Paylaş'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
