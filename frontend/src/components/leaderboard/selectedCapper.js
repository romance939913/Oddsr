import React from 'react';
import { connect } from 'react-redux';
import { clearCapper } from '../../actions/capper_actions'

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
      <p>Hi</p>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedCapper);