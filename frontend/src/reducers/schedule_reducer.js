import { combineReducers } from 'redux';

import nfl from './schedule/nfl_reducer';
import ncaaf from './schedule/ncaaf_reducer';
import schedule from './schedule/schedule_reducer'

export default combineReducers({
  nfl: nfl,
  ncaaf: ncaaf,
  schedule: schedule,
});