import React from 'react';
import { connect } from "react-redux";
import Pick from './pick';
import NFLSchedule from './sports/nfl_schedule';
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
      sport: 'nfl',
    }
    this.setSport = this.setSport.bind(this);
  }

  componentDidMount() {
    this.props.clearPick();
    this.props.fetchNFLTeams();
    this.props.fetchNFLSeason()
      .then(season => {
        this.props.fetchNFLWeek()
          .then(week => {
            this.props.fetchStandingsNFL(season.season.data)
              .then(standings => {
                this.props.fetchOddsNFL(week.week.data)
              })
          })
      })
    this.props.fetchNCAAFWeek()
      .then(week => {
        this.props.fetchOddsNCAAF(week.week.data)
      })
  }

  setSport(selectedSport) {
    this.props.clearPick();
    this.setState({
      sport: selectedSport
    })
    debugger
  }

  render() {
    if (!this.props.nfl.teams ||
      !this.props.nfl.season ||
      !this.props.nfl.week ||
      !this.props.nfl.schedule ||
      !this.props.nfl.standings ||
      !this.props.ncaaf.week ||
      !this.props.ncaaf.schedule) {
      return (
        <div>
          <Nav />
          <div className="sweet-loading">
            <RingLoader
              size={150}
              color={"#123abc"}
            />
          </div>
        </div>
      )
    }

    return (
      <div>
        <Nav />
        <div className="select-sport-container">
          <p 
            className="schedule-sport-select"
            onClick={() => this.setSport('nfl')}
          >NFL</p>
          <p 
            className="schedule-sport-select"
            onClick={() => this.setSport('ncaaf')}
          >NCAA Football</p>
        </div>
        <div className="schedule-and-pick-container">
          <div className="schedule-container">
            <NFLSchedule />
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
  nfl: state.entities.schedule.nfl,
  ncaaf: state.entities.schedule.ncaaf,
  pick: state.entities.pick
});

const mapDispatchToProps = dispatch => ({
  fetchNFLTeams: () => dispatch(nflActions.fetchNFLTeams()),
  fetchNFLSeason: () => dispatch(nflActions.fetchNFLSeason()),
  fetchNFLWeek: () => dispatch(nflActions.fetchNFLWeek()),
  fetchOddsNFL: (week) => dispatch(nflActions.fetchOddsNFL(week)),
  fetchStandingsNFL: (season) => dispatch(nflActions.fetchStandingsNFL(season)),
  fetchOddsNCAAF: (week) => dispatch(ncaaActions.fetchOddsNCAAF(week)),
  fetchNCAAFWeek: () => dispatch(ncaaActions.fetchNCAAFWeek()),
  selectPick: (pick) => dispatch(pickActions.receivePick(pick)),
  clearPick: () => dispatch(pickActions.clearPick()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);