import { combineReducers } from 'redux'

import { START_TIMER, STOP_TIMER, RESET_TIMER } from '../actions'


const initialTicking = false
const initialShotTime = 24000


const tickingReducer = (state = initialTicking, action) => {
  switch(action.type) {
    case START_TIMER:
      return true

    case STOP_TIMER:
      return false
  }

  return state
}

const shotTimeReducer = (state = initialShotTime, action) => {
  switch(action.type) {
    case RESET_TIMER:
      return initialShotTime

    case STOP_TIMER:
      return state - action.elapsedTime
  }

  return state
}


const rootReducer = combineReducers({
  ticking: tickingReducer,
  shotTime: shotTimeReducer
})

export default rootReducer
