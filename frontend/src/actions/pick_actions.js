import * as APIUtil from '../util/pick_util';

export const CREATE_PICK = "CREATE_PICK"
export const RECEIVE_PICK = "RECEIVE_PICK";
export const CLEAR_PICK = "CLEAR_PICK";

export const receivePick = pick => ({
  type: RECEIVE_PICK,
  pick
});

export const clearPick = () => ({
  type: CLEAR_PICK,
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
