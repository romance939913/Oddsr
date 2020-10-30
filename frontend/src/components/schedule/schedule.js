import React from 'react';
import { connect } from "react-redux";
import * as scheduleActions from '../../actions/schedule_actions'
import RingLoader from "react-spinners/RingLoader";
import Nav from '../nav/nav';
import './schedule.css'

class Schedule extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sport: 'americanfootball_nfl',
    }
    this.setSport = this.setSport.bind(this)
  }

  componentDidMount() {
    this.props.fetchSpreads('americanfootball_nfl');
    this.props.fetchSpreads('americanfootball_ncaaf');
  }

  setSport(e) {
    this.setState({
      sport: e.target.value
    })
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
      this.props.spreads[this.state.sport].forEach(game => {
        let spreadTeam0
        let spreadTeam1
        let site1 = 'not available'
        if (!!game.sites[0]) {
          spreadTeam0 = game.sites[0].odds.spreads.points[0];
          spreadTeam1 = game.sites[0].odds.spreads.points[1];
          site1 = game.sites[0].site_key;
        }
        spreadsArray.push(
          <div className="array-spread-box">
            <p>{site1}</p>
            <div className="schedule-teams-array">
              <p>{game.teams[0]} {spreadTeam0} vs. </p>
              <p>{game.teams[1]} {spreadTeam1}</p>
            </div>
          </div>
        )
      })
    }

    return (
      <div>
        <Nav />
        <div>
        <select 
          name="sports" 
          id="sports" 
          value={this.state.sport} 
          onChange={(event) => this.setSport(event)}
        >
          <option value="americanfootball_nfl">Football</option>
          <option value="americanfootball_ncaaf">NCAA Football</option>
        </select>
        </div>
        <div className="spreads">
          {spreadsArray}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  history: ownProps.history,
  loggedIn: state.session.isAuthenticated,
  username: state.session.user.username,
  spreads: state.entities.spreads
});

const mapDispatchToProps = dispatch => ({
  fetchSpreads: (sport) => dispatch(scheduleActions.fetchSpreads(sport))
})

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);