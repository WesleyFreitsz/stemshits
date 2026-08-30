'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Award, 
  Calendar, 
  Eye, 
  RotateCcw, 
  QrCode
} from 'lucide-react';
import { Song } from '@/lib/types';

interface RevealModalProps {
  isOpen: boolean;
  onClose: () => void;
  song: Song;
  earnedScore: number;
  unlockedCount: number;
  onPlayAgain: () => void;
  onScanNext: () => void;
}

export function RevealModal({
  isOpen,
  onClose,
  song,
  earnedScore,
  unlockedCount,
  onPlayAgain,
  onScanNext,
}: RevealModalProps) {
  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#ec4899', '#06b6d4', '#10b981', '#ffffff']
        });
      } catch (e) {}
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const getScoreMessage = () => {
    if (earnedScore === 5) return '👑 Ouvido Absoluto! Acertou só na bateria!';
    if (earnedScore === 4) return '⚡ Excelente! Acertou na 2ª camada!';
    if (earnedScore === 3) return '👏 Muito bom! Acertou na 3ª camada!';
    if (earnedScore === 2) return '👍 Bom palpite! Quase o arranjo completo!';
    return '🎤 Acertou com a voz principal!';
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-lg animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="reveal-title"
    >
      <div 
        className="relative w-full max-w-md max-h-[95vh] overflow-y-auto rounded-3xl bg-[#12121e] border border-white/20 p-5 sm:p-7 text-white shadow-2xl shadow-amber-500/10 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 p-2 rounded-full bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Fechar revelação"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Score Trophy */}
        <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-gradient-to-tr from-amber-400 to-pink-500 p-0.5 shadow-xl shadow-amber-500/25 mb-3">
          <div className="w-full h-full bg-[#12121e] rounded-[18px] sm:rounded-[22px] flex items-center justify-center text-amber-400">
            <Award className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
        </div>

        {/* Score Badge */}
        <div className="mb-1.5">
          <span className="px-3.5 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 font-display font-extrabold text-xs sm:text-sm tracking-wider inline-block">
            +{earnedScore} {earnedScore === 1 ? 'PONTO CONQUISTADO' : 'PONTOS CONQUISTADOS'}
          </span>
        </div>
        <p className="text-[11px] sm:text-xs text-zinc-400 mb-4">{getScoreMessage()}</p>

        {/* Song Card Details */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 space-y-3 mb-4 text-left">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
              Resposta Revelada
            </span>
            <h3 id="reveal-title" className="font-display text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
              {song.title}
            </h3>
            <p className="text-sm sm:text-base font-semibold text-zinc-300">
              {song.artist}
            </p>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-xs">
            <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white/5">
              <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <div>
                <div className="text-zinc-400 text-[9px]">Ano</div>
                <div className="font-bold text-white text-xs">{song.releaseYear}</div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white/5">
              <Eye className="w-3.5 h-3.5 text-pink-400 shrink-0" />
              <div>
                <div className="text-zinc-400 text-[9px]">Views YouTube</div>
                <div className="font-bold text-white text-xs">{song.youtubeViews}</div>
              </div>
            </div>
          </div>

          {/* Hint / Trivia */}
          {song.hint && (
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200 leading-relaxed">
              💡 {song.hint}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <button
            onClick={onPlayAgain}
            type="button"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl sm:rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs sm:text-sm font-semibold text-zinc-200 hover:text-white transition-all cursor-pointer min-h-[46px]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Jogar de Novo</span>
          </button>

          <button
            onClick={onScanNext}
            type="button"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-black text-xs sm:text-sm font-extrabold shadow-md shadow-amber-500/20 transition-all cursor-pointer min-h-[46px]"
          >
            <QrCode className="w-4 h-4 text-black" />
            <span>Escanear Outra</span>
          </button>
        </div>
      </div>
    </div>
  );
}
