export const RECEIVE_PICK = "RECEIVE_PICK";
export const CLEAR_PICK = "CLEAR_PICK";

export const receivePick = pick => ({
  type: RECEIVE_PICK,
  pick
});

export const clearPick = () => ({
  type: CLEAR_PICK,
});
