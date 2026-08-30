// ==========================================================
// Cumulative Stem Audio Engine (Plays 1 cumulative track at a time)
// ==========================================================

export class SingleTrackStemEngine {
  private audioElements: Map<number, HTMLAudioElement> = new Map();
  private currentStemNumber: number = 1;
  private isPlaying: boolean = false;
  private onStateChange?: (isPlaying: boolean, currentStem: number) => void;
  private isCleanedUp: boolean = false;

  constructor(onStateChange?: (isPlaying: boolean, currentStem: number) => void) {
    this.onStateChange = onStateChange;
  }

  public loadStems(stems: { number: number; audioPath: string }[]): Promise<void> {
    this.cleanup();
    this.isCleanedUp = false;
    this.currentStemNumber = 1;
    this.isPlaying = false;

    return new Promise((resolve) => {
      stems.forEach((stem) => {
        const audio = new Audio();
        audio.src = stem.audioPath;
        audio.preload = 'auto';
        audio.loop = true;

        audio.onended = () => {
          if (!audio.loop) {
            this.isPlaying = false;
            this.onStateChange?.(false, this.currentStemNumber);
          }
        };

        this.audioElements.set(stem.number, audio);
      });

      resolve();
    });
  }

  public getCurrentAudio(): HTMLAudioElement | undefined {
    return this.audioElements.get(this.currentStemNumber);
  }

  public async play(): Promise<void> {
    if (this.isCleanedUp) return;
    const current = this.getCurrentAudio();
    if (!current) return;

    try {
      await current.play();
      this.isPlaying = true;
      this.onStateChange?.(true, this.currentStemNumber);
    } catch (err) {
      console.warn('Playback request error (waiting for user gesture):', err);
      this.isPlaying = false;
      this.onStateChange?.(false, this.currentStemNumber);
    }
  }

  public pause(): void {
    const current = this.getCurrentAudio();
    if (current) {
      current.pause();
    }
    this.isPlaying = false;
    this.onStateChange?.(false, this.currentStemNumber);
  }

  public togglePlay(): void {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public switchToStem(targetStemNumber: number): void {
    if (targetStemNumber === this.currentStemNumber) return;

    const currentAudio = this.getCurrentAudio();
    const nextAudio = this.audioElements.get(targetStemNumber);

    if (!nextAudio) return;

    const wasPlaying = this.isPlaying;
    let preservedTime = 0;

    if (currentAudio) {
      preservedTime = currentAudio.currentTime;
      currentAudio.pause();
    }

    this.currentStemNumber = targetStemNumber;

    // Sincroniza o ponto da música para continuar sem descontinuidade
    try {
      if (nextAudio.duration && isFinite(nextAudio.duration)) {
        nextAudio.currentTime = preservedTime % nextAudio.duration;
      } else {
        nextAudio.currentTime = preservedTime;
      }
    } catch (e) {
      // Ignora caso currentTime precise de carregamento prévio
    }

    if (wasPlaying) {
      nextAudio.play().then(() => {
        this.isPlaying = true;
        this.onStateChange?.(true, this.currentStemNumber);
      }).catch((e) => {
        console.warn('Erro ao tocar nova faixa:', e);
      });
    } else {
      this.onStateChange?.(false, this.currentStemNumber);
    }
  }

  public reset(): void {
    this.pause();
    this.audioElements.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
    this.currentStemNumber = 1;
    this.isPlaying = false;
    this.onStateChange?.(false, 1);
  }

  public getCurrentStemNumber(): number {
    return this.currentStemNumber;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public cleanup(): void {
    this.isCleanedUp = true;
    this.pause();
    this.audioElements.forEach((audio) => {
      audio.pause();
      audio.src = '';
      audio.load();
    });
    this.audioElements.clear();
  }
}

// Alias para compatibilidade
export const MultiStemAudioEngine = SingleTrackStemEngine;
