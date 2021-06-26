// Type definitions for js-confetti
// TypeScript Version: 4.1.2

export = JSConfetti;

interface IAddConfettiConfig {
  confettiRadius?: number,
  confettiesNumber?: number,
  confettiColors?: string[],
  emojies?: string[],
}

declare class JSConfetti {
  constructor();

  addConfetti(confettiConfig?: IAddConfettiConfig): void;
}
