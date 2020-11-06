import { RECEIVE_NFL_SCHEDULE,
  RECEIVE_NFL_SEASON,
  RECEIVE_NFL_WEEK,
  RECEIVE_NFL_STANDINGS,
  RECEIVE_NFL_TEAMS } from '../../actions/schedule/nfl_actions';

const nflReducer = (state = [], action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_NFL_SCHEDULE:
      nextState['schedule'] = {}
      action.schedule.data.forEach(game => {
        nextState['schedule'][game.HomeTeamId] = game;
      })
      return nextState;
    case RECEIVE_NFL_STANDINGS:
      nextState['standings'] = {}
      action.standings.data.forEach(standing => {
        nextState['standings'][standing.TeamID] = standing;
      })
      return nextState;
    case RECEIVE_NFL_TEAMS:
      nextState['teams'] = {}
      action.teams.data.forEach(team => {
        nextState['teams'][team.TeamID] = team;
      })
      return nextState;
    case RECEIVE_NFL_WEEK:
      nextState['week'] = action.week.data;
      return nextState;
    case RECEIVE_NFL_SEASON:
      nextState['season'] = action.season.data;
      return nextState;
    default:
      return state;
  }
};

export default nflReducer;