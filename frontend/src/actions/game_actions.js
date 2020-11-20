import * as APIUtil from '../util/pick_util';

export const CREATE_PICK = "CREATE_PICK"
export const RECEIVE_GAME = "RECEIVE_GAME";
export const CLEAR_GAME = "CLEAR_GAME";

export const receiveGame = game => ({
  type: RECEIVE_GAME,
  game
});

export const clearGame = () => ({
  type: CLEAR_GAME,
});

export const createThePick = (pick) => ({
  type: CREATE_PICK,
  pick
});

export const createPick = pick => dispatch => (
  APIUtil.addPick(pick)
    .then(pick => dispatch(createThePick(pick)))
    .catch(err => console.log(err.response.data))
)
