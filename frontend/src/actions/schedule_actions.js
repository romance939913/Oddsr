import * as scheduleAPIUtil from '../util/schedule_util';

export const RECEIVE_SPREADS = "RECEIVE_SPREADS";

export const receiveSpreads = spreads => ({
  type: RECEIVE_SPREADS,
  spreads
});

export const fetchSpreads = (sport) => dispatch => (
  scheduleAPIUtil.getSpreads(sport)
    .then(spreads => dispatch(receiveSpreads(spreads)))
    .catch(err => console.log(err))
);