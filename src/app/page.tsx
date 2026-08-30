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
  Zap,
  Volume2,
  Award
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

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-14 space-y-10 sm:space-y-14">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#141424] to-[#0b0b14] border border-white/10 p-6 sm:p-12 shadow-2xl text-center">
          {/* Ambient Lights */}
          <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-pink-500/15 blur-3xl pointer-events-none" />

          <div className="relative max-w-2xl mx-auto space-y-5 sm:space-y-6">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] sm:text-xs font-extrabold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Jogo de Cartas & Instrumentos</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
              STEMS<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-pink-500 to-cyan-400">HITS</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-base md:text-lg text-zinc-300 max-w-xl mx-auto leading-relaxed">
              Pegue uma carta física da mesa, aponte a câmera para o <strong>QR Code</strong> e adivinhe a música pelas camadas de instrumentos.
            </p>

            {/* Central Action Button */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setIsScannerOpen(true)}
                type="button"
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-display font-extrabold text-base text-black bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-2xl shadow-amber-500/30 transition-all transform active:scale-98 cursor-pointer min-h-[52px]"
              >
                <QrCode className="w-5 h-5 text-black" />
                <span>Escanear QR Code da Carta</span>
              </button>
            </div>
          </div>
        </section>

        {/* 3 Step Visual Guide */}
        <section className="space-y-4">
          <h2 className="font-display text-lg sm:text-2xl font-extrabold text-white text-center sm:text-left flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" /> Como Funciona a Partida
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {/* Step 1 */}
            <div className="p-5 rounded-2xl sm:rounded-3xl bg-white/[0.03] border border-white/10 space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-display font-extrabold text-amber-400 text-base">
                1
              </div>
              <h3 className="font-display text-base font-bold text-white">
                Escaneie o QR Code
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                O jogador da vez pega a carta física e lê o QR Code com a câmera do celular. O app carrega a rodada instantaneamente.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl sm:rounded-3xl bg-white/[0.03] border border-white/10 space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-display font-extrabold text-cyan-400 text-base">
                2
              </div>
              <h3 className="font-display text-base font-bold text-white">
                Ouça os Instrumentos
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                A faixa começa tocando apenas a bateria. Arrisque o palpite ou desbloqueie novas camadas (-1 ponto por instrumento).
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl sm:rounded-3xl bg-white/[0.03] border border-white/10 space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center font-display font-extrabold text-pink-400 text-base">
                3
              </div>
              <h3 className="font-display text-base font-bold text-white">
                Revele e Pontue
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Dê seu palpite! Clique em revelar para pausar o áudio, conferir o artista e somar seus pontos no placar.
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
