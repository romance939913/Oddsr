import * as nflAPIUtil from '../../util/schedule/nfl';

export const RECEIVE_NFL_TEAMS = "RECEIVE_NFL_TEAMS";
export const RECEIVE_NFL_SEASON = "RECEIVE_NFL_SEASON";
export const RECEIVE_NFL_WEEK = "RECEIVE_NFL_WEEK";
export const RECEIVE_NFL_SCHEDULE = "RECEIVE_NFL_SCHEDULE";
export const RECEIVE_NFL_STANDINGS = "RECEIVE_NFL_STANDINGS";

export const receiveNFLTeams = teams => ({
    type: RECEIVE_NFL_TEAMS,
    teams
});

export const receiveNFLSeason = season => ({
    type: RECEIVE_NFL_SEASON,
    season
});

export const receiveNFLWeek = week => ({
    type: RECEIVE_NFL_WEEK,
    week
});

export const receiveNFLSchedule = schedule => ({
    type: RECEIVE_NFL_SCHEDULE,
    schedule
});

export const receiveNFLStandings = standings => ({
    type: RECEIVE_NFL_STANDINGS,
    standings
});

export const fetchNFLTeams = () => dispatch => (
    nflAPIUtil.fetchTeams()
        .then(teams => dispatch(receiveNFLTeams(teams)))
        .catch(err => console.log(err))
)

export const fetchNFLSeason = () => dispatch => (
    nflAPIUtil.fetchCurrentSeason()
        .then(season => dispatch(receiveNFLSeason(season)))
        .catch(err => console.log(err))
)

export const fetchNFLWeek = () => dispatch => (
    nflAPIUtil.fetchCurrentWeek()
        .then(week => dispatch(receiveNFLWeek(week)))
        .catch(err => console.log(err))
)

export const fetchOddsNFL = (week) => dispatch => (
    nflAPIUtil.fetchPreGameOdds(week)
        .then(schedule => dispatch(receiveNFLSchedule(schedule)))
        .catch(err => console.log(err))
)

export const fetchStandingsNFL = (season) => dispatch => (
    nflAPIUtil.fetchStandings(season)
        .then(standings => dispatch(receiveNFLStandings(standings)))
        .catch(err => console.log(err))
)