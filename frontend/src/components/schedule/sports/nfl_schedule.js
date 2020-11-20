import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import * as gameActions from '../../../actions/game_actions';
import './nflSchedule.css'

class SelectedGame extends React.Component {
  constructor(props) {
    super(props)
    this.selectTheGame = this.selectTheGame.bind(this);
  }

  selectTheGame(e) {
    let gameHomeTeam = this.props.nfl.schedule[e.currentTarget.id];
    if (gameHomeTeam.HomeTeamId === this.props.game.HomeTeamId) {
      this.props.clearGame()
    } else {
      this.props.selectGame(gameHomeTeam);
    }
  }

  render() {
    let scheduleArray = [];
    Object.values(this.props.nfl.schedule).forEach((game, idx) => {
      // if (game.PregameOdds.length === 0) return;
      // if (!game.PregameOdds[0].SportsbookUrl) return;
      scheduleArray.push(
        <div
          className="schedule-game-container"
          key={idx}
          id={game.HomeTeamId}
          onClick={this.selectTheGame}
        >
          <div className="schedule-game-matchup-container">
            <div className="schedule-game-homeTeam-container">
              <p>{this.props.nfl.teams[game.HomeTeamId].City}</p>
              <p>{this.props.nfl.teams[game.HomeTeamId].Name}</p>
              <img className="schedule-game-img" src={this.props.nfl.teams[game.HomeTeamId].WikipediaLogoUrl} />
              <p>({this.props.nfl.standings[game.HomeTeamId].Wins}
              - {this.props.nfl.standings[game.HomeTeamId].Losses})</p>
            </div>
            <p>vs.</p>
            <div className="schedule-game-awayTeam-container">
              <p>{this.props.nfl.teams[game.AwayTeamId].City}</p>
              <p>{this.props.nfl.teams[game.AwayTeamId].Name}</p>
              <img className="schedule-game-img" src={this.props.nfl.teams[game.AwayTeamId].WikipediaLogoUrl} />
              <p>({this.props.nfl.standings[game.AwayTeamId].Wins}
              - {this.props.nfl.standings[game.AwayTeamId].Losses})</p>
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
  game: state.entities.game,
});

const mapDispatchToProps = dispatch => ({
  selectGame: (game) => dispatch(gameActions.receiveGame(game)),
  clearGame: () => dispatch(gameActions.clearGame())
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectedGame);