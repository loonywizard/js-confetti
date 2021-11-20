// Type definitions for js-confetti
// TypeScript Version: 4.1.2

export = JSConfetti;

interface IAddConfettiConfig {
  confettiRadius?: number,
  confettiNumber?: number,
  confettiColors?: string[],
  emojis?: string[],
  emojiSize?: number,
}

declare class JSConfetti {
  constructor();

  addConfetti(confettiConfig?: IAddConfettiConfig): void;
}
