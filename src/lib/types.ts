export type Difficulty = 'facil' | 'medio' | 'dificil';

export interface Stem {
  number: number;
  name: string;
  category: 'drums' | 'synth' | 'bass' | 'guitar' | 'vocals' | 'other';
  audioPath: string;
  unlocked: boolean;
}

export interface Song {
  id: string;
  cardCode: string;
  title: string;
  artist: string;
  releaseYear: number;
  youtubeViews: string;
  difficulty: Difficulty;
  difficultyLabel?: string;
  genre: string;
  spotifyUrl: string;
  coverImage: string;
  hint?: string;
  stems: Stem[];
}

export interface GameState {
  currentStemNumber: number;
  isPlaying: boolean;
  isRevealed: boolean;
  score: number;
}
