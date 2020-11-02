import { combineReducers } from 'redux';

import cappersReducer from './cappers/cappers_reducer';
import capperReducer from './cappers/capper_reducer';
import spreadsReducer from './schedules/spreads_reducer';
import pickReducer from './picks/pick_reducer'

export default combineReducers({
  cappers: cappersReducer,
  capper: capperReducer,
  spreads: spreadsReducer,
  pick: pickReducer
});