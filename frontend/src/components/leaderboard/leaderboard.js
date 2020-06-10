import React from 'react';
import { connect } from "react-redux";
import { fetchCappers } from '../../actions/capper_actions'
import { logout } from '../../actions/session_actions';
import RingLoader from "react-spinners/RingLoader";
import './leaderboard.css';

import Nav from '../nav/nav';

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
    this.state = {
      selected: 1
    }
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    this.props.fetchCappers();
  }

  handleLogout() {
    this.props.logout();
  }

  selectCapper(capper) {
    console.log(capper)
    debugger
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
    this.props.cappers.forEach((capper, i) => {
      cappersArr.push(
        <ul 
          className="leaderboard-capper-container" 
          key={`capper-${capper.username}}`}
          onClick={(pojo) => this.selectCapper(pojo)}
        >
          <li className="capper-list-item">{capper.username}</li>
          <li className="capper-list-item">Record: {capper.wins} - {capper.losses} - {capper.pushes}</li>
          <li className="capper-list-item">Bio: {capper.bio}</li>
        </ul>
      )
    })

    return (
      <div className="leaderboard-component-conteiner">
        <Nav />
        <div className="leaderboard-container">
          <div className="capper-list-container">
            {cappersArr}
          </div>
          <div className="selected-capper-container">
            
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);