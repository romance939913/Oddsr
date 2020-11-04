import { RECEIVE_SPREADS } from '../../actions/schedule/schedule_actions';
import { RECEIVE_NFL_SCHEDULE } from '../../actions/schedule/schedule_actions'


const scheduleReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_SPREADS:
      nextState[action.spreads.data.data[0].sport_key] = {};
      action.spreads.data.data.forEach(game => {
        nextState[action.spreads.data.data[0].sport_key][game.home_team] = game;
      })
      return nextState;
    case RECEIVE_NFL_SCHEDULE:
      return nextState['nfl'] = action.schedule;
    default:
      return state;
  }
};

export default scheduleReducer;