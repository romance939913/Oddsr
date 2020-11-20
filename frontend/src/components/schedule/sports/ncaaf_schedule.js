import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import * as gameActions from '../../../actions/game_actions';
import './ncaafSchedule.css'

class SelectedGame extends React.Component {
  constructor(props) {
    super(props)
    this.selectTheGame = this.selectTheGame.bind(this);
  }

  selectTheGame(e) {
    let gameHomeTeam = this.props.ncaaf.schedule[e.currentTarget.id];
    if (gameHomeTeam.HomeTeamId === this.props.game.HomeTeamId) {
      this.props.clearGame()
    } else {
      this.props.selectGame(gameHomeTeam);
    }
  }

  render() {
    let scheduleArray = [];
    Object.values(this.props.ncaaf.schedule).forEach((game, idx) => {
      // if (game.PregameOdds.length === 0) return;
      // if (!game.PregameOdds[0].SportsbookUrl) return;
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
          onClick={this.selectTheGame}
        >
          <div className="schedule-game-matchup-container">
            <div className="schedule-game-homeTeam-container">
              <p>{this.props.ncaaf.teams[game.HomeTeamId].School}</p>
              <div className="schedule-game-teamName-container">
                <p>{this.props.ncaaf.teams[game.HomeTeamId].Name}</p>
                <p> {homeTeamRank}</p>
              </div>
              <img className="schedule-game-img" src={this.props.ncaaf.teams[game.HomeTeamId].TeamLogoUrl} />
              <p className="schedule-game-team-record">({this.props.ncaaf.teams[game.HomeTeamId].Wins}
                - {this.props.ncaaf.teams[game.HomeTeamId].Losses})</p>
            </div>
            <p className="schedule-game-vs">vs.</p>
            <div className="schedule-game-awayTeam-container">
              <p>{this.props.ncaaf.teams[game.AwayTeamId].School}</p>
              <div className="schedule-game-teamName-container">
                <p>{this.props.ncaaf.teams[game.AwayTeamId].Name}</p>
                <p> {homeTeamRank}</p>
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
  ncaaf: state.entities.schedule.ncaaf,
  game: state.entities.game
});

const mapDispatchToProps = dispatch => ({
  selectGame: (game) => dispatch(gameActions.receiveGame(game)),
  clearGame: () => dispatch(gameActions.clearGame())
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectedGame);