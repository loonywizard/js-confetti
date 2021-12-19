// Type definitions for js-confetti
// TypeScript Version: 4.1.2

export = JSConfetti;

interface IImage {
  src: CanvasImageSource,
  width?: number,
  height?: number,
}

interface IAddConfettiConfig {
  confettiRadius?: number,
  confettiNumber?: number,
  confettiColors?: string[],
  emojis?: string[],
  emojiSize?: number,
  images?: IImage[],
}

declare class JSConfetti {
  constructor();

  addConfetti(confettiConfig?: IAddConfettiConfig): Promise<void>;
}
