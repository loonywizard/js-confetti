// Type definitions for js-confetti
// TypeScript Version: 4.1.2

export default JSConfetti

interface I2DCoordinates {
  x: number,
  y: number,
}


type IPosition = I2DCoordinates

interface IJSConfettiConfig {
  canvas?: HTMLCanvasElement,
}

interface IAddConfettiConfig {
  confettiRadius?: number,
  confettiNumber?: number,
  confettiColors?: string[],
  emojis?: string[],
  emojiSize?: number,
  // if provided, confetti would be fired from specified position on the screen,
  // otherwise they would be fired from the sides of the screen (default behaviour)
  confettiDispatchPosition?: IPosition | null,
}

declare class JSConfetti {
  constructor(jsConfettiConfig?: IJSConfettiConfig);

  addConfetti(confettiConfig?: IAddConfettiConfig): Promise<void>;
  addConfettiAtPosition(confettiConfig?: IAddConfettiConfig): Promise<void>;
  clearCanvas(): void;
  destroyCanvas(): void;
}
