interface I2DCoordinates {
  x: number,
  y: number,
}


type IPosition = I2DCoordinates


type IRadius = I2DCoordinates


type ISpeed = I2DCoordinates

/*
 * Arguments object for JSConfetti constructor
 */
interface IJSConfettiConfig {
  canvas?: HTMLCanvasElement,
}


/*
 * Arguments object for addConfetti() method
 */
interface IAddConfettiConfig {
  confettiRadius?: number,
  confettiNumber?: number,
  confettiColors?: string[],

  // emojis could be used as confetti
  // confettiColors will be ignored if emojis array provided
  emojis?: string[],
  emojiSize?: number,


  // if provided, confetti would be fired from specified position on the screen,
  // otherwise they would be fired from the sides of the screen (default behaviour)
  confettiDispatchPosition?: IPosition | null,

  // @deprecated: wrong plural forms were used
  emojies?: string[],
  confettiesNumber?: number,
}


type INormalizedAddConfettiConfig = {
  confettiRadius: number,
  confettiNumber: number,
  confettiColors: string[],
  emojis: string[],
  emojiSize: number,
  confettiDispatchPosition?: IPosition | null,
}


export {
  IPosition,
  IRadius,
  ISpeed,
  IJSConfettiConfig,
  IAddConfettiConfig,
  INormalizedAddConfettiConfig,
}
