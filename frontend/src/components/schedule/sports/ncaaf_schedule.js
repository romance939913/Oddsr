import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import * as pickActions from '../../../actions/pick_actions';
import './ncaafSchedule.css'

class SelectedPick extends React.Component {
  constructor(props) {
    super(props)
    this.selectThePick = this.selectThePick.bind(this);
  }

  selectThePick(e) {
    let pickHomeTeam = this.props.ncaaf.schedule[e.currentTarget.id];
    if (pickHomeTeam.HomeTeamId === this.props.pick.HomeTeamId) {
      this.props.clearPick()
    } else {
      this.props.selectPick(pickHomeTeam);
    }
  }

  render() {
    let scheduleArray = [];
    Object.values(this.props.ncaaf.schedule).forEach((game, idx) => {
      if (game.PregameOdds.length === 0) return;
      if (!game.PregameOdds[0].SportsbookUrl) return;
      let homeTeamRank
      let awayTeamRank
      let homeTeamRankVar = this.props.ncaaf.teams[game.HomeTeamId].ApRank
      let awayTeamRankVar = this.props.ncaaf.teams[game.AwayTeamId].ApRank
      if (homeTeamRankVar) homeTeamRank = `#${homeTeamRankVar}`
      if (awayTeamRankVar) awayTeamRank = `#${awayTeamRankVar}`
      scheduleArray.push(
        <div
          className="schedule-game-container"
          key={idx}
          id={game.HomeTeamId}
          onClick={this.selectThePick}
        >
          <div className="schedule-game-matchup-container">
            <div className="schedule-game-homeTeam-container">
              <div className="schedule-game-teamName-container">
                <p>{game.HomeTeamName}</p>
                <p> {homeTeamRank}</p>
              </div>
              <img className="schedule-game-img" src={this.props.ncaaf.teams[game.HomeTeamId].TeamLogoUrl} />
              <p className="schedule-game-team-record">({this.props.ncaaf.teams[game.HomeTeamId].Wins}
                - {this.props.ncaaf.teams[game.HomeTeamId].Losses})</p>
            </div>
            <p className="schedule-game-vs">vs.</p>
            <div className="schedule-game-awayTeam-container">
              <div className="schedule-game-teamName-container">
                <p>{game.AwayTeamName}</p>
                <p>{awayTeamRank}</p>
              </div>
              <img className="schedule-game-img" src={this.props.ncaaf.teams[game.AwayTeamId].TeamLogoUrl} />
              <p className="schedule-game-team-record">({this.props.ncaaf.teams[game.AwayTeamId].Wins}
                - {this.props.ncaaf.teams[game.AwayTeamId].Losses})</p>
            </div>
          </div>
          <div className="schedule-game-dateTime">
            <p>{moment(game.DateTime).format("dddd, MMMM Do YYYY")}</p>
            <p>{moment(game.DateTime).format("h:mm a")}</p>
          </div>
        </div>
      )
    })

    return (
      <div>
        {scheduleArray}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  history: ownProps.history,
  loggedIn: state.session.isAuthenticated,
  username: state.session.user.username,
  nfl: state.entities.schedule.nfl,
  ncaaf: state.entities.schedule.ncaaf,
  pick: state.entities.pick
});

const mapDispatchToProps = dispatch => ({
  selectPick: (pick) => dispatch(pickActions.receivePick(pick)),
  clearPick: () => dispatch(pickActions.clearPick())
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectedPick);