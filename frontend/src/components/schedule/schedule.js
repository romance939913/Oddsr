import React from 'react';
import { connect } from "react-redux";
import Pick from './pick';
import * as scheduleActions from '../../actions/schedule/schedule_actions';
import * as nflActions from '../../actions/schedule/nfl_actions';
import * as ncaaActions from '../../actions/schedule/ncaaf_actions';
import * as pickActions from '../../actions/pick_actions';
import RingLoader from "react-spinners/RingLoader";
import Nav from '../nav/nav';
import './schedule.css'

class Schedule extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sport: 'americanfootball_nfl',
    }
    this.setSport = this.setSport.bind(this);
    this.selectThePick = this.selectThePick.bind(this);
  }

  componentDidMount() {
    this.props.clearPick();
    this.props.fetchNFLWeek()
      .then(week => {
        this.props.fetchOddsNFL(week.week.data)
      })
    this.props.fetchNCAAFWeek()
      .then(week => {
        this.props.fetchOddsNCAAF(week.week.data)
      })
    this.props.fetchSpreads('americanfootball_nfl');
    this.props.fetchSpreads('americanfootball_ncaaf');
  }

  setSport(selectedSport) {
    this.props.clearPick();
    this.setState({
      sport: selectedSport
    })
  }

  selectThePick(e) {
    let pickHomeTeam = this.props.spreads[this.state.sport][e.currentTarget.id];
    if (pickHomeTeam.home_team === this.props.pick.home_team) {
      this.props.clearPick()
    } else {
      this.props.selectPick(pickHomeTeam);
    }
  }

  render() {
    if (Object.keys(this.props.spreads) < 2) {
      return (
        <div className="sweet-loading">
          <RingLoader
            size={150}
            color={"#123abc"}
          />
        </div>
      )
    }

    const spreadsArray = [];
    if (this.props.spreads[this.state.sport]) {
      Object.values(this.props.spreads[this.state.sport]).forEach((game, idx) => {
        let spreadTeam0
        let spreadTeam1
        let site1 = 'no books available'
        if (!!game.sites[0]) {
          spreadTeam0 = game.sites[0].odds.spreads.points[0];
          spreadTeam1 = game.sites[0].odds.spreads.points[1];
          site1 = game.sites[0].site_key;
        }
        spreadsArray.push(
          <div 
            className="array-spread-box" 
            key={idx}
            id={game.home_team}
            onClick={(event) => this.selectThePick(event)}
          >
            <p>site: {site1}</p>
            <div className="schedule-teams-array">
              <p>{game.teams[0]} {spreadTeam0} vs.</p>
              <p> {game.teams[1]} {spreadTeam1}</p>
            </div>
          </div>
        )
      })
    }

    return (
      <div>
        <Nav />
        <div className="select-sport-container">
          <p 
            className="schedule-sport-select"
            onClick={() => this.setSport('americanfootball_nfl')}
          >NFL</p>
          <p 
            className="schedule-sport-select"
            onClick={() => this.setSport('americanfootball_ncaaf')}
          >NCAA Football</p>
        </div>
        <div className="spreads-picks-container">
          <div className="spreads">
            {spreadsArray}
          </div>
          <Pick />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  history: ownProps.history,
  loggedIn: state.session.isAuthenticated,
  username: state.session.user.username,
  spreads: state.entities.schedule.schedule,
  pick: state.entities.pick
});

const mapDispatchToProps = dispatch => ({
  fetchSpreads: (sport) => dispatch(scheduleActions.fetchSpreads(sport)),
  fetchOddsNFL: (week) => dispatch(nflActions.fetchOddsNFL(week)),
  fetchNFLWeek: () => dispatch(nflActions.fetchNFLWeek()),
  fetchOddsNCAAF: (week) => dispatch(ncaaActions.fetchOddsNCAAF(week)),
  fetchNCAAFWeek: () => dispatch(ncaaActions.fetchNCAAFWeek()),
  selectPick: (pick) => dispatch(pickActions.receivePick(pick)),
  clearPick: () => dispatch(pickActions.clearPick()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);