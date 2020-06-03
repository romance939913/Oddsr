import React from 'react';
import { connect } from "react-redux";
import { logout } from '../../actions/session_actions';
import './leaderboard.css';

const mapStateToProps = (state, ownProps) => ({
  history: ownProps.history,
  loggedIn: state.session.isAuthenticated,
  username: state.session.user.username
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

class Leaderboard extends React.Component {
  constructor(props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.logout();
  }

  render() {
    return (
      <div>
        <h1>Oddsr Leaderboard</h1>
        <a className="nav-logout" onClick={this.handleLogout}>Logout</a>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);