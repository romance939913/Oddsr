import { RECEIVE_ALL_CAPPERS } from '../../actions/capper_actions';

const capperReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_CAPPERS:
      return action.cappers.data;
    default:
      return state;
  }
};

export default capperReducer;