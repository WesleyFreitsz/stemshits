'use client';

import React, { useEffect, useRef, useState } from 'react';
import { X, Camera, QrCode, AlertCircle, Disc3, Sparkles } from 'lucide-react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';

interface QRCodeScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanSuccess: (decodedText: string) => void;
}

export function QRCodeScannerModal({ isOpen, onClose, onScanSuccess }: QRCodeScannerModalProps) {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [manualCode, setManualCode] = useState('');
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    let isCancelled = false;
    let html5QrCode: Html5Qrcode | null = null;

    if (isOpen) {
      setCameraError(null);
      setIsInitializing(true);

      const startScanner = async () => {
        try {
          await new Promise((r) => setTimeout(r, 250));
          if (isCancelled) return;

          const readerElem = document.getElementById('qr-reader');
          if (!readerElem) return;

          html5QrCode = new Html5Qrcode('qr-reader', {
            formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
            verbose: false,
          });
          scannerRef.current = html5QrCode;

          const config = {
            fps: 10,
            qrbox: { width: 220, height: 220 },
            aspectRatio: 1.0,
          };

          await html5QrCode.start(
            { facingMode: 'environment' },
            config,
            (decodedText) => {
              if (html5QrCode && html5QrCode.isScanning) {
                html5QrCode.stop().catch(() => {});
              }
              onScanSuccess(decodedText);
              onClose();
            },
            () => {}
          );

          if (!isCancelled) {
            setIsInitializing(false);
          }
        } catch (err: any) {
          if (!isCancelled) {
            console.warn('Câmera indisponível ou permissão cancelada:', err?.message || err);
            setCameraError(
              'A câmera não pôde ser acessada. Digite o código impresso na carta (ex: CARD-001) para jogar:'
            );
            setIsInitializing(false);
          }
        }
      };

      startScanner();
    }

    return () => {
      isCancelled = true;
      if (scannerRef.current) {
        try {
          if (scannerRef.current.isScanning) {
            scannerRef.current.stop().catch(() => {}).finally(() => {
              try { scannerRef.current?.clear(); } catch (e) {}
              scannerRef.current = null;
            });
          } else {
            try { scannerRef.current.clear(); } catch (e) {}
            scannerRef.current = null;
          }
        } catch (e) {
          scannerRef.current = null;
        }
      }
    };
  }, [isOpen, onScanSuccess, onClose]);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualCode.trim()) {
      onScanSuccess(manualCode.trim());
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="scanner-modal-title"
    >
      <div 
        className="relative w-full max-w-md rounded-3xl bg-[#11111b] border border-white/15 p-6 text-white shadow-2xl shadow-black/80"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center z-10"
          aria-label="Fechar leitor de QR Code"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <h2 id="scanner-modal-title" className="font-display text-xl font-bold">
              Escanear QR Code da Carta
            </h2>
            <p className="text-xs text-zinc-400">Aponte a câmera para o QR Code da carta física</p>
          </div>
        </div>

        {/* Scanner Viewport */}
        <div className="relative overflow-hidden rounded-2xl bg-black/60 border border-white/10 aspect-video flex flex-col items-center justify-center mb-4">
          <div id="qr-reader" className="w-full h-full" />
          
          {isInitializing && !cameraError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 gap-3">
              <Disc3 className="w-8 h-8 text-amber-400 animate-spin" />
              <span className="text-xs text-zinc-300">Iniciando câmera...</span>
            </div>
          )}

          {cameraError && (
            <div className="p-4 text-center space-y-2">
              <AlertCircle className="w-6 h-6 text-amber-400 mx-auto" />
              <p className="text-xs text-zinc-300 max-w-xs mx-auto">{cameraError}</p>
            </div>
          )}
        </div>

        {/* Manual Code Fallback */}
        <form onSubmit={handleManualSubmit} className="space-y-2">
          <div className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">
            Ou digite o código da carta física:
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ex: CARD-001, CARD-002..."
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-sm cursor-pointer shadow-md shadow-amber-500/20 min-h-[44px]"
            >
              Jogar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
