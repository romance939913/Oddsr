import { RECEIVE_SPREADS } from '../../actions/schedule_actions';

const spreadsReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_SPREADS:
      nextState[action.spreads.data.data[0].sport_key] = action.spreads.data.data;
      return nextState
    default:
      return state;
  }
};

export default spreadsReducer;