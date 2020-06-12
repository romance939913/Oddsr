import React from 'react';
import { connect } from 'react-redux';
import { clearCapper } from '../../actions/capper_actions';
import './selectedCapper.css';

const mapStateToProps = (state, ownProps) => ({
  capper: state.entities.capper
})

const mapDispatchToProps = dispatch => ({
  clearCapper: () => dispatch(clearCapper())
})

class SelectedCapper extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.capper.length === 0) return null;

    return (
      <div className="selected-capper-component-container">
        <p>{this.props.capper.username}</p>
        <p>{this.props.capper.bio}</p>
        <p>sports: {`${this.props.capper.sports}`}</p>
        <p>recors: {this.props.capper.wins}-
          {this.props.capper.losses}-
          {this.props.capper.pushes}
        </p>
        
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedCapper);