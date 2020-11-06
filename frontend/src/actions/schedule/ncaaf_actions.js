import * as ncaafAPIUtil from '../../util/schedule/ncaaf';

export const RECEIVE_NCAAF_TEAMS = "RECEIVE_NCAAF_TEAMS";
export const RECEIVE_NCAAF_SEASON = "RECEIVE_NCAAF_SEASON";
export const RECEIVE_NCAAF_WEEK = "RECEIVE_NCAAF_WEEK";
export const RECEIVE_NCAAF_SCHEDULE = "RECEIVE_NCAAF_SCHEDULE";

export const receiveNCAAFTeams = teams => ({
    type: RECEIVE_NCAAF_TEAMS,
    teams
});

export const receiveNCAAFSeason = season => ({
    type: RECEIVE_NCAAF_SEASON,
    season
});

export const receiveNCAAFWeek = week => ({
    type: RECEIVE_NCAAF_WEEK,
    week
});

export const receiveNCAAFSchedule = schedule => ({
    type: RECEIVE_NCAAF_SCHEDULE,
    schedule
});

export const fetchNCAAFTeams = () => dispatch => (
    ncaafAPIUtil.fetchTeams()
        .then(teams => dispatch(receiveNCAAFTeams(teams)))
        .catch(err => console.log(err))
)

export const fetchNCAAFSeason = () => dispatch => (
    ncaafAPIUtil.fetchCurrentSeason()
        .then(season => dispatch(receiveNCAAFSeason(season)))
        .catch(err => console.log(err))
)

export const fetchNCAAFWeek = () => dispatch => (
    ncaafAPIUtil.fetchCurrentWeek()
        .then(week => dispatch(receiveNCAAFWeek(week)))
        .catch(err => console.log(err))
)

export const fetchOddsNCAAF = (week, season) => dispatch => (
    ncaafAPIUtil.fetchPreGameOdds(week, season)
        .then(Schedule => dispatch(receiveNCAAFSchedule(Schedule)))
        .catch(err => console.log(err))
)