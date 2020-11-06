import React from 'react';
import { connect } from 'react-redux';
import * as pickActions from '../../../actions/pick_actions';
import './nflSchedule.css'

class SelectedPick extends React.Component {
  constructor(props) {
    super(props)
    this.selectThePick = this.selectThePick.bind(this);
  }

  selectThePick(e) {
    let pickHomeTeam = this.props.nfl.schedule[e.currentTarget.id];
    if (pickHomeTeam.HomeTeamName === this.props.pick.HomeTeamName) {
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
          id={game.HomeTeamName}
          onClick={this.selectThePick}
        >
          <div className="schedule-game-teamName-container">
            <p>{game.HomeTeamName}</p>
            <img className="schedule-game-home-team-img" src={this.props.nfl.teams[game.HomeTeamName].WikipediaLogoUrl} />
            <p>({this.props.nfl.standings[game.HomeTeamName].Wins}
            - {this.props.nfl.standings[game.HomeTeamName].Losses})</p>
            <p>vs.</p>
            <p>{game.AwayTeamName}</p>
            <img className="schedule-game-home-team-img" src={this.props.nfl.teams[game.AwayTeamName].WikipediaLogoUrl} />
            <p>({this.props.nfl.standings[game.AwayTeamName].Wins}
            - {this.props.nfl.standings[game.AwayTeamName].Losses})</p>
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