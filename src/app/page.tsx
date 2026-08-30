'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { RulesModal } from '@/components/RulesModal';
import { QRCodeScannerModal } from '@/components/QRCodeScannerModal';
import { 
  Disc3, 
  QrCode, 
  Sparkles, 
  HelpCircle, 
  Award, 
  Drum, 
  Piano, 
  Mic, 
  Zap,
  ArrowRight
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const handleScanSuccess = (decoded: string) => {
    let cleanCode = decoded;
    if (decoded.includes('/play/')) {
      cleanCode = decoded.split('/play/')[1].split('?')[0];
    }
    router.push(`/play/${encodeURIComponent(cleanCode)}`);
  };

  return (
    <div className="min-h-screen bg-[#08080d] text-white flex flex-col selection:bg-amber-500 selection:text-black">
      {/* Navigation */}
      <Navbar
        onOpenRules={() => setIsRulesOpen(true)}
        onOpenScanner={() => setIsScannerOpen(true)}
      />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12 sm:space-y-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#141424] to-[#0b0b14] border border-white/10 p-8 sm:p-14 shadow-2xl text-center">
          {/* Ambient Lights */}
          <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-pink-500/15 blur-3xl pointer-events-none" />

          <div className="relative max-w-2xl mx-auto space-y-6">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-extrabold uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Jogo de Cartas & Instrumentos</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
              STEMS<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-pink-500 to-cyan-400">HITS</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-zinc-300 max-w-xl mx-auto leading-relaxed">
              Pegue uma carta física da mesa, aponte a câmera para o <strong>QR Code</strong> e adivinhe a música pelas camadas de instrumentos.
            </p>

            {/* Big Scanner Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                onClick={() => setIsScannerOpen(true)}
                type="button"
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-display font-extrabold text-lg text-black bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-2xl shadow-amber-500/30 transition-all transform active:scale-98 cursor-pointer min-h-[56px]"
              >
                <QrCode className="w-6 h-6 text-black" />
                <span>Escanear QR Code da Carta</span>
              </button>

              <button
                onClick={() => setIsRulesOpen(true)}
                type="button"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold text-sm sm:text-base transition-all cursor-pointer min-h-[56px]"
              >
                <HelpCircle className="w-5 h-5 text-amber-400" />
                <span>Regras & Pontuação</span>
              </button>
            </div>
          </div>
        </section>

        {/* 3 Step Visual Guide */}
        <section className="space-y-4">
          <h2 className="font-display text-xl sm:text-2xl font-extrabold text-white text-center sm:text-left flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" /> Como Funciona a Partida
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Step 1 */}
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-display font-extrabold text-amber-400 text-lg">
                1
              </div>
              <h3 className="font-display text-lg font-bold text-white">
                Escaneie o QR Code
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                O jogador da vez pega a carta física e lê o QR Code com a câmera. O app carrega a rodada instantaneamente.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-display font-extrabold text-cyan-400 text-lg">
                2
              </div>
              <h3 className="font-display text-lg font-bold text-white">
                Ouça os Instrumentos
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                A faixa começa tocando apenas a bateria. Você pode arriscar o palpite ou desbloquear o próximo instrumento (-1 ponto por camada).
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center font-display font-extrabold text-pink-400 text-lg">
                3
              </div>
              <h3 className="font-display text-lg font-bold text-white">
                Revele e Pontue
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Dê seu palpite! Clique em revelar para pausar o áudio, conferir o artista, somar seus pontos e ouvir no Spotify.
              </p>
            </div>
          </div>
        </section>
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
    </div>
  );
}
