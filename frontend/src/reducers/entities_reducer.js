import { combineReducers } from 'redux';

import cappersReducer from './cappers/cappers_reducer';
import capperReducer from './cappers/capper_reducer';

export default combineReducers({
  cappers: cappersReducer,
  capper: capperReducer
});