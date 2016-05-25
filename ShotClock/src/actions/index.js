// Action Types
export const START_TIMER = 'START_TIMER'
export const STOP_TIMER = 'STOP_TIMER'
export const RESET_TIMER = 'RESET_TIMER'


// Action objects
export const startTimer = () => ({type: START_TIMER})
export const stopTimer = (time) => ({type: STOP_TIMER, time})
export const resetTimer = () => ({type: RESET_TIMER})
