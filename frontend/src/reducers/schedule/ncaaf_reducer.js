import { RECEIVE_NCAAF_SCHEDULE,
  RECEIVE_NCAAF_WEEK,
  RECEIVE_NCAAF_SEASON,
  RECEIVE_NCAAF_TEAMS } from '../../actions/schedule/ncaaf_actions';

const ncaafReducer = (state = [], action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_NCAAF_SCHEDULE:
      nextState['schedule'] = {}
      action.schedule.data.forEach(game => {
        nextState['schedule'][game.HomeTeamName] = game;
      })
      return nextState;
    case RECEIVE_NCAAF_WEEK:
      nextState['week'] = action.week.data;
      return nextState;
    case RECEIVE_NCAAF_SEASON:
      nextState['season'] = action.season.data;
      return nextState;
    case RECEIVE_NCAAF_TEAMS:
      nextState['teams'] = {}
      action.teams.data.forEach(team => {
        nextState['teams'][team.TeamID] = team
      })
      return nextState;
    default:
      return state;
  }
};

export default ncaafReducer;