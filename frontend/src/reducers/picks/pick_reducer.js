import { RECEIVE_PICK,
          CLEAR_PICK } from '../../actions/pick_actions';

const pickReducer = (state = [], action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_PICK:
      return action.pick;
    case CLEAR_PICK:
      return [];
    default:
      return state;
  }
};

export default pickReducer;