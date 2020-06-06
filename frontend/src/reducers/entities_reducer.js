import { combineReducers } from 'redux';

import capperReducer from './cappers/cappers_reducer';

export default combineReducers({
  cappers: capperReducer
});