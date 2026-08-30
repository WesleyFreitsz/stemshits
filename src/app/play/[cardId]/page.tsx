'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { RulesModal } from '@/components/RulesModal';
import { QRCodeScannerModal } from '@/components/QRCodeScannerModal';
import { CardInfoBadge } from '@/components/CardInfoBadge';
import { BandleStemPlayer } from '@/components/BandleStemPlayer';
import { RevealModal } from '@/components/RevealModal';
import { Song } from '@/lib/types';
import { Disc3, ArrowLeft, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function PlayCardPage() {
  const params = useParams();
  const router = useRouter();
  const cardId = (params?.cardId as string) || 'CARD-001';

  const [song, setSong] = useState<Song | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modals state
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isRevealOpen, setIsRevealOpen] = useState(false);
  const [earnedScore, setEarnedScore] = useState(5);
  const [unlockedCount, setUnlockedCount] = useState(1);

  // Carregar dados da música / carta
  useEffect(() => {
    const fetchSong = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/songs/${encodeURIComponent(cardId)}`);
        if (!res.ok) {
          throw new Error('Carta não encontrada');
        }
        const data = await res.json();
        setSong(data);
      } catch (err: any) {
        console.warn('Erro ao buscar carta:', err);
        setError('Não foi possível carregar a carta solicitada.');
      } finally {
        setLoading(false);
      }
    };

    fetchSong();
  }, [cardId]);

  const handleScanSuccess = (decoded: string) => {
    let cleanCode = decoded;
    if (decoded.includes('/play/')) {
      cleanCode = decoded.split('/play/')[1].split('?')[0];
    }
    router.push(`/play/${encodeURIComponent(cleanCode)}`);
  };

  const handleReveal = (score: number, count: number) => {
    setEarnedScore(score);
    setUnlockedCount(count);
    setIsRevealOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#08080d] text-white flex flex-col selection:bg-amber-500 selection:text-black">
      {/* Navigation */}
      <Navbar
        onOpenRules={() => setIsRulesOpen(true)}
        onOpenScanner={() => setIsScannerOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-4 sm:py-8 space-y-4 sm:space-y-6">
        {/* Top Header / Back Link */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Início</span>
          </Link>

          <span className="text-xs text-zinc-400 font-mono bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
            {song ? song.cardCode : cardId}
          </span>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
            <Disc3 className="w-12 h-12 text-amber-400 animate-spin" />
            <p className="text-sm font-semibold text-zinc-300">Carregando carta e instrumentos...</p>
          </div>
        )}

        {/* Content State */}
        {!loading && song && (
          <>
            {/* Clues Card Info Badge */}
            <CardInfoBadge
              cardCode={song.cardCode}
              releaseYear={song.releaseYear}
              youtubeViews={song.youtubeViews}
              difficulty={song.difficulty}
              difficultyLabel={song.difficultyLabel}
              genre={song.genre}
            />

            {/* Core Bandle Stem Player */}
            <BandleStemPlayer
              song={song}
              onReveal={handleReveal}
            />
          </>
        )}

        {/* Error State */}
        {!loading && !song && (
          <div className="p-8 rounded-3xl bg-rose-950/20 border border-rose-500/30 text-center space-y-3">
            <AlertCircle className="w-10 h-10 text-rose-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">Carta não encontrada</h3>
            <p className="text-sm text-zinc-400">Escaneie o QR Code da carta física para jogar.</p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setIsScannerOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-amber-400 text-black font-bold text-sm cursor-pointer min-h-[44px]"
              >
                Escanear QR Code
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Modals */}
      <RulesModal
        isOpen={isRulesOpen}
        onClose={() => setIsRulesOpen(false)}
      />

      <QRCodeScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanSuccess={handleScanSuccess}
      />

      {song && (
        <RevealModal
          isOpen={isRevealOpen}
          onClose={() => setIsRevealOpen(false)}
          song={song}
          earnedScore={earnedScore}
          unlockedCount={unlockedCount}
          onPlayAgain={() => setIsRevealOpen(false)}
          onScanNext={() => {
            setIsRevealOpen(false);
            setIsScannerOpen(true);
          }}
        />
      )}
    </div>
  );
}
