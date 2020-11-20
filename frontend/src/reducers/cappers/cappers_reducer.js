import { RECEIVE_ALL_CAPPERS } from '../../actions/capper_actions';

const cappersReducer = (state = [], action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_ALL_CAPPERS:
      action.cappers.data.forEach(obj => {
        nextState[obj._id] = obj;
      })
      return nextState;
    default:
      return state;
  }
};

export default cappersReducer;