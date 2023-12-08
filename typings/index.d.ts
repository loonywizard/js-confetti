// Type definitions for js-confetti
// TypeScript Version: 4.1.2

export default JSConfetti

interface IJSConfettiConfig {
  canvas?: HTMLCanvasElement,
}

interface IAddConfettiConfig {
  confettiRadius?: number,
  confettiNumber?: number,
  confettiColors?: string[],
  emojis?: string[],
  emojiSize?: number,
}

declare class JSConfetti {
  constructor(jsConfettiConfig?: IJSConfettiConfig);

  addConfetti(confettiConfig?: IAddConfettiConfig): Promise<void>;
  clearCanvas(): void;
  destroyCanvas(): void;
}
