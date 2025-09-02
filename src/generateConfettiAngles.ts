import {generateRandomNumber} from "./generateRandomNumber"
import {
  MAX_CONFETTI_ANGLE_IN_DEGREES,
  MIN_CONFETTI_ANGLE_IN_DEGREES,
  MAX_CONFETTI_ANGLE_FIRED_FROM_SPEICIFIED_POSITION_IN_DEGREES
} from "./consts"


function convertDegreesToRadians(degreesToRadians: number) {
  return degreesToRadians * Math.PI / 180
}

/*
 * determine the angle at which confetti is being dispatched
 *
 * for confetti that are dispatched from the sides of the screen, there's a min and max angle at which they could fly
 * for confetti that are dispatched from the specific position (like mouse click), the angle ranges from -max to max
 *
 * the angle is stored in radians, but degrees are used in constants for convenience
 *
 * examples:
 * - 0 means that confetti would fly straight up
 * - 0.7 means that confetti would start flying approximately 40 degrees to the right
 */
function generateConfettiInitialFlightAngleFiredFromLeftSideOfTheScreen() {
  return convertDegreesToRadians(generateRandomNumber(MAX_CONFETTI_ANGLE_IN_DEGREES, MIN_CONFETTI_ANGLE_IN_DEGREES))
}

function generateConfettiInitialFlightAngleFiredFromRightSideOfTheScreen() {
  return convertDegreesToRadians(generateRandomNumber(-MIN_CONFETTI_ANGLE_IN_DEGREES, -MAX_CONFETTI_ANGLE_IN_DEGREES))
}

function generateConfettiInitialFlightAngleFiredFromSpecificPosition() {
  return convertDegreesToRadians(
    generateRandomNumber(
      -MAX_CONFETTI_ANGLE_FIRED_FROM_SPEICIFIED_POSITION_IN_DEGREES,
      MAX_CONFETTI_ANGLE_FIRED_FROM_SPEICIFIED_POSITION_IN_DEGREES))
}

/*
 * WHAT IS THIS?
 */
function generateConfettiRotationAngleFiredFromLeftSideOfTheScreen() {
  return generateRandomNumber(0, 0.2, 3)
}

function generateConfettiRotationAngleFiredFromRightSideOfTheScreen() {
  return generateRandomNumber(-0.2, 0, 3)
}


export {
  generateConfettiInitialFlightAngleFiredFromLeftSideOfTheScreen,
  generateConfettiInitialFlightAngleFiredFromRightSideOfTheScreen,
  generateConfettiInitialFlightAngleFiredFromSpecificPosition,

  generateConfettiRotationAngleFiredFromLeftSideOfTheScreen,
  generateConfettiRotationAngleFiredFromRightSideOfTheScreen,
}
