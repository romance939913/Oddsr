import React from 'react';
import { connect } from "react-redux";
import { fetchCappers } from '../../actions/capper_actions'
import { logout } from '../../actions/session_actions';
import RingLoader from "react-spinners/RingLoader";
import './feed.css';

const mapStateToProps = (state, ownProps) => ({
  history: ownProps.history,
  loggedIn: state.session.isAuthenticated,
  username: state.session.user.username,
  cappers: state.entities.cappers
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  fetchCappers: () => dispatch(fetchCappers())
})

class Leaderboard extends React.Component {
  constructor(props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    this.props.fetchCappers();
  }

  handleLogout() {
    this.props.logout();
  }

  render() {
    if (this.props.cappers.length === 0) {
      return (
        <div className="sweet-loading">
          <RingLoader
            size={150}
            color={"#123abc"}
          />
        </div>
      )
    }

    let cappersArr = [];
    this.props.cappers.forEach(capper => {
      cappersArr.push(
        <ul>
          <li>{capper.username}</li>
          <li>record: {capper.wins} - {capper.losses}</li>
        </ul>
      )
    })

    return (
      <div>
        <h1>Oddsr Leaderboard</h1>
        <a className="nav-logout" onClick={this.handleLogout}>Logout</a>
        <div>
          {cappersArr}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);