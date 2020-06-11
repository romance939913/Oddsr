import * as CapperAPIUtil from '../util/capper_util';

export const RECEIVE_ALL_CAPPERS = "RECEIVE_ALL_CAPPERS";
export const RECEIVE_CAPPER = "RECEIVE_CAPPER";
export const CLEAR_CAPPER = "CLEAR_CAPPER";

export const receiveCappers = cappers => ({
  type: RECEIVE_ALL_CAPPERS,
  cappers
});

export const receiveCapper = capper => ({
  type: RECEIVE_CAPPER,
  capper
});

export const clearCapper = capper => ({
  type: CLEAR_CAPPER,
  capper
});

export const fetchCappers = () => dispatch => (
  CapperAPIUtil.getCappers()
    .then(cappers => dispatch(receiveCappers(cappers)))
    .catch(err => console.log(err))
);
