'use client';

import React, { useState, useEffect } from 'react';
import { X, QrCode, RotateCw, Printer, Sparkles, Disc3, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Song } from '@/lib/types';

interface PhysicalCardPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  song: Song;
  allSongs?: Song[];
  onSelectSong?: (song: Song) => void;
}

export function PhysicalCardPreviewModal({ 
  isOpen, 
  onClose, 
  song: initialSong,
  allSongs = [],
  onSelectSong
}: PhysicalCardPreviewModalProps) {
  const [selectedSong, setSelectedSong] = useState<Song>(initialSong);
  const [isFlipped, setIsFlipped] = useState(false);
  const [hostUrl, setHostUrl] = useState('');

  useEffect(() => {
    setSelectedSong(initialSong);
  }, [initialSong]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHostUrl(`${window.location.origin}/play/${selectedSong.cardCode}`);
    }
  }, [selectedSong]);

  if (!isOpen) return null;

  const getDifficultyDisplay = (song: Song) => {
    return song.difficultyLabel || (song.difficulty === 'facil' ? '🟢 FÁCIL' : '🔴 DIFÍCIL');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="card-deck-title"
    >
      <div 
        className="relative w-full max-w-lg rounded-3xl bg-[#11111b] border border-white/15 p-6 text-white shadow-2xl shadow-black/80 flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center z-10"
          aria-label="Fechar visualizador de cartas"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="text-center mb-4">
          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest">
            Simulador de Carta Física (Estilo Hitster)
          </span>
          <h2 id="card-deck-title" className="font-display text-xl sm:text-2xl font-extrabold text-white">
            Carta #{selectedSong.cardCode}
          </h2>
          <p className="text-xs text-zinc-400">
            Escaneie com a câmera de outro celular para testar na mesa de jogo!
          </p>
        </div>

        {/* Song Selector Pills (if multiple) */}
        {allSongs.length > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-1.5 mb-4">
            {allSongs.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setSelectedSong(s);
                  setIsFlipped(false);
                  onSelectSong?.(s);
                }}
                className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  selectedSong.id === s.id
                    ? 'bg-amber-400 text-black shadow-md shadow-amber-500/20'
                    : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10'
                }`}
              >
                {s.cardCode}
              </button>
            ))}
          </div>
        )}

        {/* 3D Physical Card */}
        <div 
          className={`relative w-72 sm:w-80 h-[420px] rounded-3xl p-6 transition-all duration-500 shadow-2xl flex flex-col justify-between cursor-pointer ${
            isFlipped 
              ? 'bg-gradient-to-br from-[#1e102d] via-[#141224] to-[#0d0d17] border-2 border-pink-500/40 shadow-pink-500/10' 
              : 'bg-gradient-to-br from-[#19192b] via-[#12121f] to-[#090911] border-2 border-amber-500/40 shadow-amber-500/10'
          }`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {!isFlipped ? (
            /* FRENTE DA CARTA (O que o jogador vê na mesa) */
            <>
              {/* Header */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-extrabold px-2.5 py-1 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  {selectedSong.cardCode}
                </span>
                <span className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {getDifficultyDisplay(selectedSong)}
                </span>
              </div>

              {/* QR Code Center Box */}
              <div className="my-auto flex flex-col items-center justify-center p-3.5 rounded-2xl bg-white text-black shadow-xl">
                <QRCodeSVG
                  value={hostUrl || `http://localhost:3000/play/${selectedSong.cardCode}`}
                  size={150}
                  level="H"
                  includeMargin={false}
                />
                <span className="text-[10px] font-bold text-zinc-600 mt-2 font-mono uppercase">
                  Aponte a câmera
                </span>
              </div>

              {/* Bottom Clues */}
              <div className="space-y-1 pt-2 border-t border-white/10 text-center">
                <div className="text-xs font-extrabold text-white tracking-tight">
                  📅 Ano: <span className="text-cyan-400">{selectedSong.releaseYear}</span> | 👁️ <span className="text-pink-400">{selectedSong.youtubeViews}</span>
                </div>
                <div className="text-[10px] text-zinc-400">
                  Clique para virar e ver a resposta
                </div>
              </div>
            </>
          ) : (
            /* VERSO DA CARTA (Gabarito) */
            <div className="h-full flex flex-col items-center justify-between py-3 text-center">
              <span className="text-xs font-bold text-pink-400 uppercase tracking-widest">
                Gabarito / Verso
              </span>

              <div className="my-auto space-y-2.5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-pink-500 flex items-center justify-center mx-auto text-black shadow-lg">
                  <Disc3 className="w-7 h-7 text-black animate-spin-slow" />
                </div>

                <h3 className="font-display text-xl font-black text-white px-2">
                  {selectedSong.title}
                </h3>
                <p className="text-sm font-bold text-zinc-300">
                  {selectedSong.artist}
                </p>

                <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-[11px] font-semibold text-zinc-300">
                  {selectedSong.genre} ({selectedSong.releaseYear})
                </div>
              </div>

              <div className="text-[10px] text-zinc-400">
                Clique para virar de volta para o QR Code
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={() => setIsFlipped(!isFlipped)}
            type="button"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold transition-all cursor-pointer min-h-[44px]"
          >
            <RotateCw className="w-4 h-4" />
            <span>Virar Carta ({isFlipped ? 'Ver QR Code' : 'Ver Gabarito'})</span>
          </button>
        </div>
      </div>
    </div>
  );
}
