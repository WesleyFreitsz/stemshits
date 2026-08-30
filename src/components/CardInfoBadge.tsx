'use client';

import React from 'react';
import { Calendar, Eye, ShieldCheck, Tag, Sparkles } from 'lucide-react';
import { Difficulty } from '@/lib/types';

interface CardInfoBadgeProps {
  cardCode: string;
  releaseYear: number;
  youtubeViews: string;
  difficulty: Difficulty;
  difficultyLabel?: string;
  genre: string;
}

export function CardInfoBadge({
  cardCode,
  releaseYear,
  youtubeViews,
  difficulty,
  difficultyLabel,
  genre,
}: CardInfoBadgeProps) {
  const getDifficultyBadge = (diff: Difficulty) => {
    switch (diff) {
      case 'facil':
        return {
          label: difficultyLabel || 'Fácil',
          bg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
          dot: 'bg-emerald-400',
        };
      case 'medio':
        return {
          label: difficultyLabel || 'Médio',
          bg: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
          dot: 'bg-amber-400',
        };
      case 'dificil':
        return {
          label: difficultyLabel || 'Difícil',
          bg: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
          dot: 'bg-rose-400',
        };
    }
  };

  const diffInfo = getDifficultyBadge(difficulty);

  return (
    <div className="w-full flex flex-col xs:flex-row items-center justify-between gap-2.5 p-3 sm:p-4 rounded-2xl bg-white/[0.04] border border-white/10 shadow-inner">
      {/* Card Code */}
      <div className="flex items-center gap-2 w-full xs:w-auto justify-between xs:justify-start">
        <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-extrabold uppercase tracking-wider bg-white/10 text-zinc-100 border border-white/15">
          {cardCode}
        </span>
        <span className="text-[11px] font-semibold text-zinc-400">
          Dicas da Carta
        </span>
      </div>

      {/* Clues Badges */}
      <div className="flex flex-wrap items-center justify-center xs:justify-end gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold w-full xs:w-auto">
        {/* Dificuldade */}
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border ${diffInfo.bg}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${diffInfo.dot} animate-pulse`} />
          <span className="font-bold">{diffInfo.label}</span>
        </div>

        {/* Ano de Lançamento */}
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
          <Calendar className="w-3 h-3 text-cyan-400" />
          <span><strong>{releaseYear}</strong></span>
        </div>

        {/* YouTube Views */}
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-pink-500/10 text-pink-300 border border-pink-500/30">
          <Eye className="w-3 h-3 text-pink-400" />
          <span>{youtubeViews}</span>
        </div>
      </div>
    </div>
  );
}
