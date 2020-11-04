import { RECEIVE_NFL_SCHEDULE } from '../../actions/schedule/nfl_actions';
import { RECEIVE_NFL_WEEK } from '../../actions/schedule/nfl_actions'

const nflReducer = (state = [], action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_NFL_SCHEDULE:
      nextState['schedule'] = {}
      action.schedule.data.forEach(game => {
        nextState['schedule'][game.HomeTeamName] = game;
      })
      return nextState;
    case RECEIVE_NFL_WEEK:
      nextState['week'] = action.week.data;
      return nextState;
    default:
      return state;
  }
};

export default nflReducer;