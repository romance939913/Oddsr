import React from 'react';
import { connect } from "react-redux";
import { logout } from '../../actions/session_actions';
import { Link } from 'react-router-dom';
import NavSearch from './nav_search';
import './nav.css';

const mapStateToProps = (state, ownProps) => ({
  history: ownProps.history,
  loggedIn: state.session.isAuthenticated,
  username: state.session.user.username,
  cappers: state.entities.cappers
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
})

class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.logout();
  }

  render() {

    return (
      <div className="nav-component-container">
        <Link
          to="/leaderboard">Oddsr
        </Link>
        <div>
          <NavSearch />
        </div>
        <a className="nav-logout" onClick={this.handleLogout}>Logout</a>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);