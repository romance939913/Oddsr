import { RECEIVE_NCAAF_SCHEDULE } from '../../actions/schedule/ncaaf_actions';
import { RECEIVE_NCAAF_WEEK } from '../../actions/schedule/ncaaf_actions'

const ncaafReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_NCAAF_SCHEDULE:
      nextState['schedule'] = action.schedule.data;
      return nextState;
    case RECEIVE_NCAAF_WEEK:
      nextState['week'] = action.week.data;
      return nextState;
    default:
      return state;
  }
};

export default ncaafReducer;