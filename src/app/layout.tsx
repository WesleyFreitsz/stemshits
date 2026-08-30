import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'STEMSHITS | Jogo de Adivinhação Musical por Instrumentos',
  description: 'Escaneie a carta física com o QR Code, ouça a música separada por camadas de instrumentos e pontue adivinhando com o menor número de faixas!',
  keywords: ['stemshits', 'hitster', 'jogo musical', 'board game', 'stems', 'the weeknd', 'spotify'],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#08080d',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark bg-[#08080d]">
      <body className="min-h-screen bg-[#08080d] text-slate-100 antialiased selection:bg-amber-400 selection:text-black">
        {children}
      </body>
    </html>
  );
}
