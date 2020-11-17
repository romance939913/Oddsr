import { RECEIVE_CAPPER,
          CLEAR_CAPPER } from '../../actions/capper_actions';

const capperReducer = (state = [], action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_CAPPER:
      return action.capper;
    case CLEAR_CAPPER:
      return [];
    default:
      return state;
  }
};

export default capperReducer;