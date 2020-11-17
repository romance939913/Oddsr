import { RECEIVE_ALL_CAPPERS } from '../../actions/capper_actions';
import { CREATE_PICK } from '../../actions/pick_actions'

const cappersReducer = (state = [], action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_ALL_CAPPERS:
      action.cappers.data.forEach(obj => {
        nextState[obj._id] = obj;
      })
      return nextState;
    case CREATE_PICK:
      // console.log(nextState)
      // debugger
    default:
      return state;
  }
};

export default cappersReducer;