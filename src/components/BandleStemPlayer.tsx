'use client';

import React, { useEffect, useState, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Lock, 
  Unlock, 
  Drum, 
  Piano, 
  Mic, 
  Sparkles, 
  Eye, 
  Disc3, 
  Award, 
  Zap, 
  Guitar, 
  Volume2 
} from 'lucide-react';
import { Song, Stem } from '@/lib/types';
import { SingleTrackStemEngine } from '@/lib/audio-engine';

interface BandleStemPlayerProps {
  song: Song;
  onReveal: (score: number, unlockedCount: number) => void;
}

export function BandleStemPlayer({ song, onReveal }: BandleStemPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeStemNumber, setActiveStemNumber] = useState<number>(1);
  const [maxUnlockedStem, setMaxUnlockedStem] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);
  const engineRef = useRef<SingleTrackStemEngine | null>(null);

  // Inicializar o Audio Engine
  useEffect(() => {
    const engine = new SingleTrackStemEngine((playing, currentStem) => {
      setIsPlaying(playing);
      setActiveStemNumber(currentStem);
    });
    engineRef.current = engine;

    const load = async () => {
      setIsLoading(true);
      await engine.loadStems(
        song.stems.map((s) => ({
          number: s.number,
          audioPath: s.audioPath,
        }))
      );
      setIsLoading(false);
    };

    load();

    return () => {
      engine.cleanup();
      engineRef.current = null;
    };
  }, [song]);

  // Desbloquear próximo instrumento
  const handleUnlockNextStem = () => {
    const nextNumber = maxUnlockedStem + 1;
    if (nextNumber <= song.stems.length) {
      setMaxUnlockedStem(nextNumber);
      setActiveStemNumber(nextNumber);
      engineRef.current?.switchToStem(nextNumber);

      if (!isPlaying) {
        engineRef.current?.play();
      }
    }
  };

  // Alternar entre faixas já desbloqueadas
  const handleSelectUnlockedStem = (stemNum: number) => {
    if (stemNum <= maxUnlockedStem) {
      setActiveStemNumber(stemNum);
      engineRef.current?.switchToStem(stemNum);
    }
  };

  const handleTogglePlay = () => {
    if (engineRef.current) {
      engineRef.current.togglePlay();
    }
  };

  const handleReset = () => {
    if (engineRef.current) {
      engineRef.current.reset();
      setMaxUnlockedStem(1);
      setActiveStemNumber(1);
      setIsPlaying(false);
    }
  };

  // Pausa a música ao revelar
  const handleRevealClick = () => {
    if (engineRef.current) {
      engineRef.current.pause();
    }
    setIsPlaying(false);
    onReveal(currentScore, maxUnlockedStem);
  };

  const currentScore = Math.max(1, 6 - maxUnlockedStem);

  const getStemIcon = (category: string, name: string) => {
    const lowerName = name.toLowerCase();
    if (category === 'drums' || lowerName.includes('bateria')) {
      return <Drum className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />;
    }
    if (category === 'vocals' || lowerName.includes('voz') || lowerName.includes('vocal')) {
      return <Mic className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400" />;
    }
    if (category === 'guitar' || lowerName.includes('guitarra') || lowerName.includes('cordas') || lowerName.includes('violão')) {
      return <Guitar className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />;
    }
    return <Piano className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />;
  };

  const nextStemToUnlock = song.stems.find((s) => s.number === maxUnlockedStem + 1);
  const activeStemObj = song.stems.find((s) => s.number === activeStemNumber);

  return (
    <div className="w-full space-y-4 sm:space-y-6 pb-24 sm:pb-0">
      {/* Vinyl / Turntable Hero Section */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#161626] to-[#0e0e1a] border border-white/10 p-4 sm:p-7 shadow-2xl">
        {/* Glow ambient */}
        <div className="absolute -top-24 -right-24 w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-pink-500/15 blur-3xl pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          {/* Turntable / Vinyl Visualizer */}
          <div className="flex items-center gap-3.5 sm:gap-5 w-full sm:w-auto">
            <div className="relative flex items-center justify-center shrink-0">
              {/* Glowing Outer Ring */}
              <div 
                className={`w-20 h-20 sm:w-28 sm:h-28 rounded-full p-1 transition-all duration-700 ${
                  isPlaying 
                    ? 'bg-gradient-to-tr from-amber-500 via-pink-500 to-cyan-400 shadow-lg shadow-amber-500/30' 
                    : 'bg-zinc-800 border border-white/10'
                }`}
              >
                {/* Vinyl Body */}
                <div 
                  className={`w-full h-full rounded-full bg-[#0a0a0f] flex items-center justify-center border-2 sm:border-4 border-zinc-900 ${
                    isPlaying ? 'animate-spin-slow' : ''
                  }`}
                  style={{
                    backgroundImage: 'radial-gradient(circle, #1a1a24 10%, transparent 20%), radial-gradient(circle, #12121c 40%, transparent 50%)'
                  }}
                >
                  {/* Center Label */}
                  <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-amber-400 to-pink-500 flex items-center justify-center text-black font-extrabold shadow-md">
                    <Disc3 className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                  </div>
                </div>
              </div>

              {/* Live Status Indicator */}
              {isPlaying && (
                <div className="absolute -bottom-1.5 px-2 py-0.5 rounded-full bg-emerald-500 text-black text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
                  Tocando #{activeStemNumber}
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-400">
                  STEMSHITS
                </span>
                <span className="text-[10px] text-zinc-500">•</span>
                <span className="text-[10px] sm:text-xs text-zinc-400 truncate">
                  Faixa {activeStemNumber} de {song.stems.length}
                </span>
              </div>
              <h2 className="font-display text-base sm:text-2xl font-extrabold text-white truncate">
                {activeStemObj ? activeStemObj.name : 'Ouça e Adivinhe'}
              </h2>
              <p className="text-[11px] sm:text-xs text-zinc-400 mt-0.5 line-clamp-1">
                {maxUnlockedStem === 1 
                  ? 'Adivinhe só na bateria para +5 pontos!' 
                  : `Camada ${maxUnlockedStem} ativa (+${currentScore} pts)`}
              </p>
            </div>
          </div>

          {/* Current Score Badge */}
          <div className="flex sm:flex-col items-center justify-between sm:justify-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-500/10 to-pink-500/10 border border-amber-500/30 text-center w-full sm:w-auto sm:min-w-[140px]">
            <span className="text-[10px] sm:text-[11px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
              <Award className="w-3.5 h-3.5" /> Pontos em Jogo
            </span>
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
              +{currentScore} {currentScore === 1 ? 'Pt' : 'Pts'}
            </div>
            <span className="text-[10px] text-zinc-400 hidden sm:inline-block mt-0.5">
              {maxUnlockedStem === 1 ? '⭐ Rodada Perfeita!' : `Nível ${maxUnlockedStem}/5`}
            </span>
          </div>
        </div>

        {/* Master Playback Controls */}
        <div className="mt-4 sm:mt-6 pt-4 border-t border-white/10 flex items-center justify-center gap-2.5 sm:gap-3">
          <button
            onClick={handleTogglePlay}
            disabled={isLoading}
            type="button"
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl font-display font-extrabold text-sm sm:text-base text-black bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-lg shadow-amber-500/25 transition-all transform active:scale-95 cursor-pointer min-h-[48px]"
            aria-label={isPlaying ? 'Pausar reprodução' : 'Iniciar reprodução'}
          >
            {isLoading ? (
              <>
                <Disc3 className="w-5 h-5 animate-spin" />
                <span>Carregando...</span>
              </>
            ) : isPlaying ? (
              <>
                <Pause className="w-5 h-5 fill-current" />
                <span>Pausar</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                <span>Tocar Faixa Ativa</span>
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            type="button"
            className="flex items-center justify-center gap-1.5 px-3.5 py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer min-h-[48px] shrink-0"
            title="Reiniciar para a 1ª faixa"
            aria-label="Reiniciar para a primeira faixa"
          >
            <RotateCcw className="w-4 h-4 text-zinc-400" />
            <span className="hidden xs:inline">Reiniciar</span>
          </button>
        </div>
      </div>

      {/* Progressive Stems List */}
      <div className="space-y-2 sm:space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-display text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-400" /> Camadas da Música
          </h3>
          <span className="text-[11px] sm:text-xs text-zinc-400">
            Toque 1 faixa por vez
          </span>
        </div>

        <div className="grid gap-2 sm:gap-2.5">
          {song.stems.map((stem) => {
            const isUnlocked = stem.number <= maxUnlockedStem;
            const isActive = isUnlocked && activeStemNumber === stem.number;
            const isNextToUnlock = nextStemToUnlock?.number === stem.number;

            return (
              <div
                key={stem.number}
                onClick={() => isUnlocked && handleSelectUnlockedStem(stem.number)}
                className={`relative flex items-center justify-between p-3 sm:p-3.5 rounded-xl sm:rounded-2xl transition-all duration-200 ${
                  isActive
                    ? 'bg-[#181829] border-2 border-amber-400/70 shadow-md shadow-amber-500/10'
                    : isUnlocked
                    ? 'bg-[#12121e] border border-white/10 hover:border-white/25 active:bg-white/5 cursor-pointer'
                    : 'bg-white/[0.02] border border-white/5 opacity-50'
                }`}
              >
                {/* Left: Stem Info */}
                <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isActive
                        ? 'bg-amber-400 text-black font-bold shadow-md shadow-amber-500/30'
                        : isUnlocked
                        ? 'bg-white/10 text-white'
                        : 'bg-white/5 text-zinc-600'
                    }`}
                  >
                    {isUnlocked ? (
                      getStemIcon(stem.category, stem.name)
                    ) : (
                      <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-500" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] sm:text-xs font-bold text-zinc-400">
                        Nível #{stem.number}
                      </span>
                      {isActive && isPlaying && (
                        <div className="flex items-center gap-0.5 h-2.5">
                          <span className="w-0.5 sm:w-1 bg-amber-400 rounded-full eq-bar-1" />
                          <span className="w-0.5 sm:w-1 bg-amber-400 rounded-full eq-bar-2" />
                          <span className="w-0.5 sm:w-1 bg-amber-400 rounded-full eq-bar-3" />
                        </div>
                      )}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white truncate">
                      {isUnlocked ? stem.name : 'Instrumento Bloqueado'}
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="shrink-0 ml-2">
                  {isActive ? (
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[11px] font-bold">
                      <Volume2 className="w-3 h-3 text-amber-400" />
                      <span>Tocando</span>
                    </div>
                  ) : isUnlocked ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectUnlockedStem(stem.number);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-zinc-300 text-[11px] font-semibold border border-white/10 cursor-pointer min-h-[36px]"
                    >
                      Ouvir
                    </button>
                  ) : isNextToUnlock ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUnlockNextStem();
                      }}
                      type="button"
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500/20 to-pink-500/20 hover:from-amber-500/30 border border-amber-500/40 text-amber-300 text-[11px] font-bold transition-all cursor-pointer min-h-[40px]"
                    >
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>Desbloquear (-1)</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-1 text-[11px] text-zinc-500 font-semibold px-2">
                      <Lock className="w-3 h-3" />
                      <span>Trancado</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sticky Bottom Action Bar for Mobile & Desktop */}
      <div className="fixed sm:static bottom-0 left-0 right-0 z-30 p-3 sm:p-0 bg-[#0c0c14]/95 sm:bg-transparent backdrop-blur-xl sm:backdrop-blur-none border-t sm:border-t-0 border-white/10 flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
        {nextStemToUnlock && (
          <button
            onClick={handleUnlockNextStem}
            type="button"
            className="w-full sm:w-1/2 flex items-center justify-center gap-2 py-3 sm:py-3.5 px-4 rounded-xl sm:rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-zinc-100 font-bold text-xs sm:text-sm transition-all cursor-pointer min-h-[46px]"
          >
            <Unlock className="w-4 h-4 text-cyan-400" />
            <span>Ouvir Próxima Camada (+{nextStemToUnlock.name})</span>
          </button>
        )}

        <button
          onClick={handleRevealClick}
          type="button"
          className="w-full sm:flex-1 flex items-center justify-center gap-2 py-3 sm:py-3.5 px-5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:from-pink-400 hover:to-amber-400 text-white font-display font-extrabold text-xs sm:text-base shadow-xl shadow-pink-500/20 transition-all transform active:scale-98 cursor-pointer min-h-[48px]"
        >
          <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Revelar Artista & Resposta ({currentScore} Pts)</span>
        </button>
      </div>
    </div>
  );
}
