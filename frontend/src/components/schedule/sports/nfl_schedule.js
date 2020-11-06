import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import * as pickActions from '../../../actions/pick_actions';
import './nflSchedule.css'

class SelectedPick extends React.Component {
  constructor(props) {
    super(props)
    this.selectThePick = this.selectThePick.bind(this);
  }

  selectThePick(e) {
    let pickHomeTeam = this.props.nfl.schedule[e.currentTarget.id];
    if (pickHomeTeam.HomeTeamId === this.props.pick.HomeTeamId) {
      this.props.clearPick()
    } else {
      this.props.selectPick(pickHomeTeam);
    }
  }

  render() {
    let scheduleArray = [];
    Object.values(this.props.nfl.schedule).forEach((game, idx) => {
      if (game.PregameOdds.length === 0) return;
      if (!game.PregameOdds[0].SportsbookUrl) return;
      scheduleArray.push(
        <div
          className="schedule-game-container"
          key={idx}
          id={game.HomeTeamId}
          onClick={this.selectThePick}
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
  pick: state.entities.pick,
});

const mapDispatchToProps = dispatch => ({
  selectPick: (pick) => dispatch(pickActions.receivePick(pick)),
  clearPick: () => dispatch(pickActions.clearPick())
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectedPick);