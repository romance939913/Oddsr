import React from 'react';
import { connect } from 'react-redux';
import { receivePick,
          clearPick } from '../../actions/pick_actions';

class SelectedPick extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <div>
        Yo       
      </div>
    )
  }
}
  
const mapStateToProps = (state, ownProps) => ({
  pick: state.entities.pick
})

const mapDispatchToProps = dispatch => ({
  receivePick: (pick) => dispatch(receivePick(pick)),
  clearPick: () => dispatch(clearPick())
})
  
export default connect(mapStateToProps, mapDispatchToProps)(SelectedPick);