'use client';

import React, { useEffect } from 'react';
import { X, Award, Drum, Piano, Mic, Flame, ShieldAlert, Sparkles, Guitar } from 'lucide-react';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RulesModal({ isOpen, onClose }: RulesModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="rules-title"
    >
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#11111b] border border-white/15 p-6 sm:p-8 text-white shadow-2xl shadow-black/80"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Fechar modal de regras"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h2 id="rules-title" className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
              Regras & Pontuação
            </h2>
            <p className="text-sm text-zinc-400">Como jogar o STEMSHITS e pontuar na mesa</p>
          </div>
        </div>

        {/* Section 1: Como Funciona */}
        <div className="space-y-6">
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10">
            <h3 className="font-display text-lg font-bold text-amber-400 mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5" /> Como Funciona a Rodada
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed">
              O jogador ou time da vez pega uma carta física e <strong>escaneia o QR Code</strong> com a câmera do celular.
              A música começa a tocar <strong>apenas com o 1º instrumento (Bateria)</strong>. O jogador pode arriscar o palpite imediatamente para ganhar o máximo de pontos ou pedir para desbloquear mais camadas antes de responder.
            </p>
          </div>

          {/* Section 2: Tabela de Pontos */}
          <div>
            <h3 className="font-display text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-400" /> Sistema de Pontuação por Camadas
            </h3>
            <div className="grid gap-2.5">
              {/* Level 1 */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Drum className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">1 Instrumento (Bateria)</div>
                    <div className="text-xs text-emerald-400">Acertou ouvindo apenas o 1º instrumento</div>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-500 text-black font-extrabold text-xs tracking-wider">
                  +5 PONTOS
                </div>
              </div>

              {/* Level 2 */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                    <Piano className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">2 Instrumentos (+ Baixo / Sintetizador)</div>
                    <div className="text-xs text-cyan-300">Desbloqueou a segunda camada</div>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-cyan-400 text-black font-extrabold text-xs tracking-wider">
                  +4 PONTOS
                </div>
              </div>

              {/* Level 3 */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <Piano className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">3 Instrumentos (+ Sintetizador / Cordas)</div>
                    <div className="text-xs text-amber-300">Desbloqueou a terceira camada</div>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-amber-400 text-black font-extrabold text-xs tracking-wider">
                  +3 PONTOS
                </div>
              </div>

              {/* Level 4 */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-orange-950/30 border border-orange-500/30">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center">
                    <Guitar className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">4 Instrumentos (+ Sintetizador / Guitarra)</div>
                    <div className="text-xs text-orange-300">Arranjo instrumental quase completo</div>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-orange-500 text-black font-extrabold text-xs tracking-wider">
                  +2 PONTOS
                </div>
              </div>

              {/* Level 5 */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-pink-950/30 border border-pink-500/30">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center">
                    <Mic className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">5 Instrumentos (+ Voz Principal)</div>
                    <div className="text-xs text-pink-300">Música completa com vocal tocando</div>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-pink-500 text-black font-extrabold text-xs tracking-wider">
                  +1 PONTO
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Dificuldade das Cartas */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
            <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-cyan-400" /> Dificuldade das Cartas & Par
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <span className="font-bold text-emerald-400">🟢 Fácil (par 1-2):</span> Linhas de bateria ou baixo lendárias conhecidas mundialmente.
              </div>
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <span className="font-bold text-amber-400">🟡 Médio (par 3):</span> Instrumentos iniciais mais sutis que exigem mais atenção.
              </div>
              <div className="p-3 rounded-xl bg-pink-500/10 border border-pink-500/20">
                <span className="font-bold text-pink-400">🔴 Difícil (par 4-5):</span> Batidas genéricas que precisam de várias camadas para identificar.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            type="button"
            className="px-6 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-black cursor-pointer shadow-lg shadow-amber-500/20 min-h-[44px]"
          >
            Entendido, Vamos Jogar!
          </button>
        </div>
      </div>
    </div>
  );
}
