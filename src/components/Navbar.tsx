'use client';

import React from 'react';
import { Disc3, QrCode, HelpCircle } from 'lucide-react';
import Link from 'next/link';

interface NavbarProps {
  onOpenRules: () => void;
  onOpenScanner: () => void;
}

export function Navbar({ onOpenRules, onOpenScanner }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#08080d]/90 backdrop-blur-xl">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <div className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-pink-500 shadow-md shadow-amber-500/20 text-black shrink-0">
            <Disc3 className="w-5 h-5 sm:w-5 sm:h-5 text-black animate-spin-slow" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-cyan-400 rounded-full border-2 border-[#08080d]" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black text-base sm:text-lg tracking-tight text-white uppercase leading-none">
              STEMS<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-pink-500 to-cyan-400">HITS</span>
            </span>
          </div>
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Regras Button */}
          <button
            onClick={onOpenRules}
            type="button"
            className="flex items-center gap-1 px-2.5 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-zinc-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer whitespace-nowrap min-h-[40px]"
            aria-label="Regras e Pontuação"
          >
            <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="hidden sm:inline">Regras & Pontos</span>
            <span className="sm:hidden">Regras</span>
          </button>

          {/* Scanner Button */}
          <button
            onClick={onOpenScanner}
            type="button"
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold text-black bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 shadow-md shadow-amber-500/20 transition-all cursor-pointer whitespace-nowrap min-h-[40px]"
            aria-label="Escanear QR Code"
          >
            <QrCode className="w-4 h-4 text-black shrink-0" />
            <span className="hidden sm:inline">Escanear QR Code</span>
            <span className="sm:hidden">Escanear</span>
          </button>
        </div>
      </div>
    </header>
  );
}
