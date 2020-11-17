import React from 'react';
import { connect } from 'react-redux';
import { clearCapper } from '../../actions/capper_actions';
import './selectedCapper.css';

class SelectedCapper extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.capper.length === 0) return null;

    let picksArr = [];
    let dataArray = this.props.capper.picks

    if (this.props.capper.picks) {
      dataArray.slice(Math.max(dataArray.length - 5, 0)).forEach((pick, idx) => {
        picksArr.push(
          <div className="selected-capper-pick" key={idx}>
            <p>date: {pick.date.split("T")[0]}</p>
            <p>Pick: {pick.team}</p>
            <p>Spread: {pick.spread}</p>
            <p>Units: {pick.units}</p>
            <p>Outcome:</p>
          </div>
        )
      });
    }

    return (
      <div className="selected-capper-component-container">
        <p>{this.props.capper.username}</p>
        <p>{this.props.capper.bio}</p>
        <p>sports: {`${this.props.capper.sports}`}</p>
        <p>record: {this.props.capper.wins}-
          {this.props.capper.losses}-
          {this.props.capper.pushes}
        </p>
        <p>Picks</p>
        {picksArr}
        
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  capper: state.entities.capper
})

const mapDispatchToProps = dispatch => ({
  clearCapper: () => dispatch(clearCapper())
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectedCapper);