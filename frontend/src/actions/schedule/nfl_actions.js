import * as nflAPIUtil from '../../util/schedule/nfl';

export const RECEIVE_NFL_SCHEDULE = "RECEIVE_NFL_SCHEDULE";
export const RECEIVE_NFL_WEEK = "RECEIVE_NFL_WEEK";

export const receiveNFLSchedule = schedule => ({
    type: RECEIVE_NFL_SCHEDULE,
    schedule
});

export const receiveNFLWeek = week => ({
    type: RECEIVE_NFL_WEEK,
    week
});

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