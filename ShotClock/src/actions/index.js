// Action Types
export const START_TIMER = 'START_TIMER'
export const STOP_TIMER = 'STOP_TIMER'
export const RESET_SHOT_TIME = 'RESET_SHOT_TIME'
export const FORCE_SHOT_TIME = 'FORCE_SHOT_TIME'


// Action objects
export const startTimer = () => ({type: START_TIMER})
export const stopTimer = (elapsedTime) => ({type: STOP_TIMER, elapsedTime})
export const resetShotTime = () => ({type: RESET_SHOT_TIME})
export const forceShotTime = (time) => ({type: FORCE_SHOT_TIME, time})
