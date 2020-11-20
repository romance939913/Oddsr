import { RECEIVE_GAME,
          CLEAR_GAME } from '../../actions/game_actions';

const gameReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_GAME:
      return action.game;
    case CLEAR_GAME:
      return [];
    default:
      return state;
  }
};

export default gameReducer;