import * as CapperAPIUtil from '../util/capper_util';

export const RECEIVE_ALL_CAPPERS = "RECEIVE_ALL_CAPPERS";

export const receiveCappers = cappers => ({
  type: RECEIVE_ALL_CAPPERS,
  cappers
});

export const fetchCappers = () => dispatch => (
  CapperAPIUtil.getCappers()
    .then(cappers => dispatch(receiveCappers(cappers)))
    .catch(err => console.log(err))
);