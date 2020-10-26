import React from 'react';
import { connect } from "react-redux";
import { fetchCappers, 
  receiveCapper,
  clearCapper } from '../../actions/capper_actions'
import RingLoader from "react-spinners/RingLoader";
import './leaderboard.css';

import Nav from '../nav/nav';
import SelectCapper from './selectedCapper';

class Leaderboard extends React.Component {
  constructor(props) {
    super(props)
    this.selectCapper = this.selectCapper.bind(this);
    this.createLeaderboard = this.createLeaderboard.bind(this);
  }

  componentDidMount() {
    this.props.fetchCappers();
    this.props.clearCapper();
  }

  createLeaderboard() {
    let arr = [];
    Object.values(this.props.cappers).forEach((capper, idx) => {
      arr.push(
        <ul
          className="leaderboard-capper-container"
          id={`${capper._id}`}
          key={`capper-${idx}`}
          onClick={this.selectCapper}
        >
          <li className="capper-list-item">{capper.username}</li>
          <li className="capper-list-item">Record: {capper.wins} - {capper.losses} - {capper.pushes}</li>
          <li className="capper-list-item">Bio: {capper.bio}</li>
        </ul>
      )
    })
    return arr;
  }

  selectCapper(e) {
    let selectedCapper = this.props.cappers[e.currentTarget.id];
    if (this.props.capper._id === selectedCapper._id) {
      this.props.clearCapper()
    } else {
      this.props.receiveCapper(selectedCapper);
    }
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

    let cappersArr = this.createLeaderboard();

    return (
      <div className="leaderboard-component-conteiner">
        <Nav />
        <div className="leaderboard-container">
          <div className="capper-list-container">
            {cappersArr}
          </div>
          <div className="leaderboard-side-profile">
            <SelectCapper />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  history: ownProps.history,
  loggedIn: state.session.isAuthenticated,
  username: state.session.user.username,
  cappers: state.entities.cappers,
  capper: state.entities.capper
});

const mapDispatchToProps = dispatch => ({
  fetchCappers: () => dispatch(fetchCappers()),
  receiveCapper: (capper) => dispatch(receiveCapper(capper)),
  clearCapper: () => dispatch(clearCapper())
})

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);