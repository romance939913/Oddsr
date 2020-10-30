import { combineReducers } from 'redux';

import cappersReducer from './cappers/cappers_reducer';
import capperReducer from './cappers/capper_reducer';
import spreadsReducer from './schedules/spreads_reducer';

export default combineReducers({
  cappers: cappersReducer,
  capper: capperReducer,
  spreads: spreadsReducer
});