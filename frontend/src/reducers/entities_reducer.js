import { combineReducers } from 'redux';

import cappersReducer from './cappers/cappers_reducer';
import capperReducer from './cappers/capper_reducer';
import schedule from './schedule_reducer';
import gameReducer from './game/game_reducer'

export default combineReducers({
  cappers: cappersReducer,
  capper: capperReducer,
  schedule: schedule,
  game: gameReducer
});