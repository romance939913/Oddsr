import { combineReducers } from 'redux';

import nfl from './schedule/nfl_reducer';
import ncaaf from './schedule/ncaaf_reducer';

export default combineReducers({
  nfl: nfl,
  ncaaf: ncaaf,
});