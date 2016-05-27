// Action Types
export const START_TIMER = 'START_TIMER'
export const STOP_TIMER = 'STOP_TIMER'
export const RESET_TIMER = 'RESET_TIMER'


// Action objects
export const startTimer = () => ({type: START_TIMER})
export const stopTimer = (elapsedTime) => ({type: STOP_TIMER, elapsedTime})
export const resetTimer = () => ({type: RESET_TIMER})
