'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { RulesModal } from '@/components/RulesModal';
import { QRCodeScannerModal } from '@/components/QRCodeScannerModal';
import { PhysicalCardPreviewModal } from '@/components/PhysicalCardPreviewModal';
import { 
  Disc3, 
  QrCode, 
  Sparkles, 
  HelpCircle, 
  Layers, 
  Zap
} from 'lucide-react';
import { Song } from '@/lib/types';

const ALL_DECK_SONGS: Song[] = [
  {
    id: 'blinding-lights',
    cardCode: 'CARD-001',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    releaseYear: 2019,
    youtubeViews: '1.0B Views',
    difficulty: 'facil',
    difficultyLabel: 'Fácil (par 1)',
    genre: 'Synthwave / Synth-pop',
    spotifyUrl: 'https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b',
    coverImage: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=600&auto=format&fit=crop&q=80',
    hint: 'Lançada em 2019, bateu recordes da Billboard com sintetizadores inesquecíveis.',
    stems: [
      { number: 1, name: 'Bateria', category: 'drums', audioPath: '/audio/blinding-lights/1.mp3', unlocked: true },
      { number: 2, name: 'Sintetizador 1 + 2', category: 'synth', audioPath: '/audio/blinding-lights/2.mp3', unlocked: false },
      { number: 3, name: 'Sintetizador 3', category: 'synth', audioPath: '/audio/blinding-lights/3.mp3', unlocked: false },
      { number: 4, name: 'Sintetizador 4', category: 'synth', audioPath: '/audio/blinding-lights/4.mp3', unlocked: false },
      { number: 5, name: 'Voz Principal', category: 'vocals', audioPath: '/audio/blinding-lights/5.mp3', unlocked: false },
    ]
  },
  {
    id: 'party-rock-anthem',
    cardCode: 'CARD-002',
    title: 'Party Rock Anthem',
    artist: 'LMFAO ft. Lauren Bennett, GoonRock',
    releaseYear: 2011,
    youtubeViews: '2.6B Views',
    difficulty: 'dificil',
    difficultyLabel: 'Difícil (par 4)',
    genre: 'Electro Pop / Dance',
    spotifyUrl: 'https://open.spotify.com/track/0IkKz2J9ayMu9neAio4VgG',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
    hint: 'O hino eletrônico de 2011 que consagrou o shuffle dance.',
    stems: [
      { number: 1, name: 'Bateria', category: 'drums', audioPath: '/audio/party-rock-anthem/1.mp3', unlocked: true },
      { number: 2, name: 'Baixo', category: 'bass', audioPath: '/audio/party-rock-anthem/2.mp3', unlocked: false },
      { number: 3, name: 'Sintetizador 1', category: 'synth', audioPath: '/audio/party-rock-anthem/3.mp3', unlocked: false },
      { number: 4, name: 'Sintetizador 2', category: 'synth', audioPath: '/audio/party-rock-anthem/4.mp3', unlocked: false },
      { number: 5, name: 'Voz', category: 'vocals', audioPath: '/audio/party-rock-anthem/5.mp3', unlocked: false },
    ]
  },
  {
    id: 'every-breath-you-take',
    cardCode: 'CARD-003',
    title: 'Every Breath You Take',
    artist: 'The Police',
    releaseYear: 1983,
    youtubeViews: '1.7B Views',
    difficulty: 'facil',
    difficultyLabel: 'Fácil (par 2)',
    genre: 'Classic Rock / New Wave',
    spotifyUrl: 'https://open.spotify.com/track/1JSTJqkT5qHq89iSSzpkQA',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
    hint: 'Um dos maiores clássicos dos anos 80.',
    stems: [
      { number: 1, name: 'Bateria', category: 'drums', audioPath: '/audio/every-breath-you-take/1.mp3', unlocked: true },
      { number: 2, name: 'Baixo', category: 'bass', audioPath: '/audio/every-breath-you-take/2.mp3', unlocked: false },
      { number: 3, name: 'Órgão + Cordas', category: 'synth', audioPath: '/audio/every-breath-you-take/3.mp3', unlocked: false },
      { number: 4, name: 'Guitarra', category: 'guitar', audioPath: '/audio/every-breath-you-take/4.mp3', unlocked: false },
      { number: 5, name: 'Voz', category: 'vocals', audioPath: '/audio/every-breath-you-take/5.mp3', unlocked: false },
    ]
  },
  {
    id: 'bad-guy',
    cardCode: 'CARD-004',
    title: 'Bad Guy',
    artist: 'Billie Eilish',
    releaseYear: 2019,
    youtubeViews: '1.3B Views',
    difficulty: 'facil',
    difficultyLabel: 'Fácil (par 1)',
    genre: 'Electropop / Alternative',
    spotifyUrl: 'https://open.spotify.com/track/2Fxmhks0bxGSBdJ92v4426',
    coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80',
    hint: 'Hit vencedor de Grammys com batida marcante e atmosfera minimalista.',
    stems: [
      { number: 1, name: 'Bateria', category: 'drums', audioPath: '/audio/bad-guy/1.mp3', unlocked: true },
      { number: 2, name: 'Baixo', category: 'bass', audioPath: '/audio/bad-guy/2.mp3', unlocked: false },
      { number: 3, name: 'Vocais de Apoio 1', category: 'vocals', audioPath: '/audio/bad-guy/3.mp3', unlocked: false },
      { number: 4, name: 'Vocais de Apoio 2', category: 'vocals', audioPath: '/audio/bad-guy/4.mp3', unlocked: false },
      { number: 5, name: 'Voz Principal', category: 'vocals', audioPath: '/audio/bad-guy/5.mp3', unlocked: false },
    ]
  },
  {
    id: 'counting-stars',
    cardCode: 'CARD-005',
    title: 'Counting Stars',
    artist: 'OneRepublic',
    releaseYear: 2013,
    youtubeViews: '4.4B Views',
    difficulty: 'facil',
    difficultyLabel: 'Fácil (par 2)',
    genre: 'Pop Rock / Folk Pop',
    spotifyUrl: 'https://open.spotify.com/track/2tpWsVSb9UEmDRxAl1zhX1',
    coverImage: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=600&auto=format&fit=crop&q=80',
    hint: 'Com mais de 4 bilhões de visualizações, um dos maiores hinos pop rock de 2013.',
    stems: [
      { number: 1, name: 'Bateria + Baixo', category: 'drums', audioPath: '/audio/counting-stars/1.mp3', unlocked: true },
      { number: 2, name: 'Piano', category: 'synth', audioPath: '/audio/counting-stars/2.mp3', unlocked: false },
      { number: 3, name: 'Violão + Cordas', category: 'guitar', audioPath: '/audio/counting-stars/3.mp3', unlocked: false },
      { number: 4, name: 'Sintetizador', category: 'synth', audioPath: '/audio/counting-stars/4.mp3', unlocked: false },
      { number: 5, name: 'Voz', category: 'vocals', audioPath: '/audio/counting-stars/5.mp3', unlocked: false },
    ]
  },
  {
    id: 'roar',
    cardCode: 'CARD-006',
    title: 'Roar',
    artist: 'Katy Perry',
    releaseYear: 2013,
    youtubeViews: '4.3B Views',
    difficulty: 'medio',
    difficultyLabel: 'Médio (par 3)',
    genre: 'Power Pop',
    spotifyUrl: 'https://open.spotify.com/track/6F5c583bxiGEbVfZJUMxCn',
    coverImage: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=600&auto=format&fit=crop&q=80',
    hint: 'Hino pop motivacional estrondoso com mais de 4 bilhões de views.',
    stems: [
      { number: 1, name: 'Bateria', category: 'drums', audioPath: '/audio/roar/1.mp3', unlocked: true },
      { number: 2, name: 'Baixo', category: 'bass', audioPath: '/audio/roar/2.mp3', unlocked: false },
      { number: 3, name: 'Sintetizador 1 + 2', category: 'synth', audioPath: '/audio/roar/3.mp3', unlocked: false },
      { number: 4, name: 'Guitarra 1 + 2', category: 'guitar', audioPath: '/audio/roar/4.mp3', unlocked: false },
      { number: 5, name: 'Voz', category: 'vocals', audioPath: '/audio/roar/5.mp3', unlocked: false },
    ]
  },
  {
    id: 'born-this-way',
    cardCode: 'CARD-007',
    title: 'Born This Way',
    artist: 'Lady Gaga',
    releaseYear: 2011,
    youtubeViews: '326M Views',
    difficulty: 'facil',
    difficultyLabel: 'Fácil (par 2)',
    genre: 'Electropop / Dance-pop',
    spotifyUrl: 'https://open.spotify.com/track/3ZE3wv8V3w2T2e79nfSVeg',
    coverImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80',
    hint: 'Hino icônico de empoderamento e batida eletrizante dos anos 2010.',
    stems: [
      { number: 1, name: 'Bateria + Baixo', category: 'drums', audioPath: '/audio/born-this-way/1.mp3', unlocked: true },
      { number: 2, name: 'Sintetizador', category: 'synth', audioPath: '/audio/born-this-way/2.mp3', unlocked: false },
      { number: 3, name: 'Guitarra', category: 'guitar', audioPath: '/audio/born-this-way/3.mp3', unlocked: false },
      { number: 4, name: 'Vocais de Apoio', category: 'vocals', audioPath: '/audio/born-this-way/4.mp3', unlocked: false },
      { number: 5, name: 'Voz', category: 'vocals', audioPath: '/audio/born-this-way/5.mp3', unlocked: false },
    ]
  },
  {
    id: 'sweet-home-alabama',
    cardCode: 'CARD-008',
    title: 'Sweet Home Alabama',
    artist: 'Lynyrd Skynyrd',
    releaseYear: 1974,
    youtubeViews: '143M Views',
    difficulty: 'facil',
    difficultyLabel: 'Fácil (par 2)',
    genre: 'Southern Rock',
    spotifyUrl: 'https://open.spotify.com/track/7e89621qvXCYwgdi257GLV',
    coverImage: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80',
    hint: 'O riff de guitarra e piano sulista mais famoso da história do rock.',
    stems: [
      { number: 1, name: 'Bateria', category: 'drums', audioPath: '/audio/sweet-home-alabama/1.mp3', unlocked: true },
      { number: 2, name: 'Baixo', category: 'bass', audioPath: '/audio/sweet-home-alabama/2.mp3', unlocked: false },
      { number: 3, name: 'Piano', category: 'synth', audioPath: '/audio/sweet-home-alabama/3.mp3', unlocked: false },
      { number: 4, name: 'Guitarra', category: 'guitar', audioPath: '/audio/sweet-home-alabama/4.mp3', unlocked: false },
      { number: 5, name: 'Voz', category: 'vocals', audioPath: '/audio/sweet-home-alabama/5.mp3', unlocked: false },
    ]
  },
  {
    id: 'hotline-bling',
    cardCode: 'CARD-009',
    title: 'Hotline Bling',
    artist: 'Drake',
    releaseYear: 2015,
    youtubeViews: '2.1B Views',
    difficulty: 'facil',
    difficultyLabel: 'Fácil (par 1)',
    genre: 'R&B / Hip-hop',
    spotifyUrl: 'https://open.spotify.com/track/0wwPcA6wtMf6HUM3IRdeP7',
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
    hint: 'Hit global de 2015 com samples de órgão e batida suave.',
    stems: [
      { number: 1, name: 'Bateria', category: 'drums', audioPath: '/audio/hotline-bling/1.mp3', unlocked: true },
      { number: 2, name: 'Baixo', category: 'bass', audioPath: '/audio/hotline-bling/2.mp3', unlocked: false },
      { number: 3, name: 'Sintetizador', category: 'synth', audioPath: '/audio/hotline-bling/3.mp3', unlocked: false },
      { number: 4, name: 'Órgão', category: 'synth', audioPath: '/audio/hotline-bling/4.mp3', unlocked: false },
      { number: 5, name: 'Voz', category: 'vocals', audioPath: '/audio/hotline-bling/5.mp3', unlocked: false },
    ]
  },
  {
    id: 'moves-like-jagger',
    cardCode: 'CARD-010',
    title: 'Moves Like Jagger',
    artist: 'Maroon 5 ft. Christina Aguilera',
    releaseYear: 2010,
    youtubeViews: '852M Views',
    difficulty: 'dificil',
    difficultyLabel: 'Difícil (par 4)',
    genre: 'Dance-pop / Funk-pop',
    spotifyUrl: 'https://open.spotify.com/track/7LcfA9hZyzs2jN97Sj99rC',
    coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80',
    hint: 'Batida eletro-funk com o assobio lendário e vocais marcantes.',
    stems: [
      { number: 1, name: 'Bateria', category: 'drums', audioPath: '/audio/moves-like-jagger/1.mp3', unlocked: true },
      { number: 2, name: 'Baixo', category: 'bass', audioPath: '/audio/moves-like-jagger/2.mp3', unlocked: false },
      { number: 3, name: 'Sintetizador', category: 'synth', audioPath: '/audio/moves-like-jagger/3.mp3', unlocked: false },
      { number: 4, name: 'Guitarra + Assobio', category: 'guitar', audioPath: '/audio/moves-like-jagger/4.mp3', unlocked: false },
      { number: 5, name: 'Voz', category: 'vocals', audioPath: '/audio/moves-like-jagger/5.mp3', unlocked: false },
    ]
  }
];

export default function HomePage() {
  const router = useRouter();
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isCardDeckOpen, setIsCardDeckOpen] = useState(false);
  const [selectedDeckSong, setSelectedDeckSong] = useState<Song>(ALL_DECK_SONGS[0]);

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
        onOpenCardDeck={() => setIsCardDeckOpen(true)}
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

            {/* Action Buttons */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setIsScannerOpen(true)}
                type="button"
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-display font-extrabold text-base text-black bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-2xl shadow-amber-500/30 transition-all transform active:scale-98 cursor-pointer min-h-[50px]"
              >
                <QrCode className="w-5 h-5 text-black" />
                <span>Escanear QR Code da Carta</span>
              </button>

              <button
                onClick={() => setIsCardDeckOpen(true)}
                type="button"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-zinc-200 hover:text-white font-bold text-sm sm:text-base transition-all cursor-pointer min-h-[50px]"
              >
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Ver Cartas & QR Codes (Simulador)</span>
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

      <PhysicalCardPreviewModal
        isOpen={isCardDeckOpen}
        onClose={() => setIsCardDeckOpen(false)}
        song={selectedDeckSong}
        allSongs={ALL_DECK_SONGS}
        onSelectSong={(song) => setSelectedDeckSong(song)}
      />
    </div>
  );
}
