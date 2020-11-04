import * as scheduleAPIUtil from '../../util/schedule/schedule_util';
import * as nflAPIUtil from '../../util/schedule/nfl';

export const RECEIVE_SPREADS = "RECEIVE_SPREADS";
export const RECEIVE_NFL_SCHEDULE = "RECEIVE_NFL_SCHEDULE";
export const RECEIVE_NFL_WEEK = "RECEIVE_NFL_WEEK";

export const receiveSpreads = spreads => ({
  type: RECEIVE_SPREADS,
  spreads
});

export const receiveNFLSchedule = schedule => ({
  type: RECEIVE_NFL_SCHEDULE,
  schedule
});

export const receiveNFLWeek = week => ({
  type: RECEIVE_NFL_WEEK,
  week
});

export const fetchSpreads = (sport) => dispatch => (
  scheduleAPIUtil.getSpreads(sport)
    .then(spreads => dispatch(receiveSpreads(spreads)))
    .catch(err => console.log(err))
);

export const fetchOddsNFL = (week) => dispatch => (
  nflAPIUtil.preGameOddsNFL(week)
    .then(Schedule => dispatch(receiveNFLSchedule(Schedule)))
    .catch(err => console.log(err))
)

export const fetchNFLWeek = () => dispatch => (
  nflAPIUtil.getWeekNFL()
    .then(week => dispatch(receiveNFLWeek(week)))
    .catch(err => console.log(err))
)