import React from 'react';
import { connect } from 'react-redux';
import { receivePick,
          clearPick } from '../../actions/pick_actions';
import './pick.css'

class SelectedPick extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    if (this.props.pick.length === 0) return null;

    const sitesArray = [];
    this.props.pick.sites.forEach((site, idx) => {
      sitesArray.push(
        <div 
          key={idx}
          className="selected-pick-site-container"  
        >
          <p className="">{site.site_key}</p>
          <div>
            <p>{this.props.pick.teams[0]}: {site.odds.spreads.points[0]}</p>
            <p>{this.props.pick.teams[1]}: {site.odds.spreads.points[1]}</p>
          </div>
        </div>
      )
    })

    return (
      <div className="selected-pick-container">
        <div className="selected-pick-teams-container">
          <p>{this.props.pick.teams[0]} vs.</p>
          <p> {this.props.pick.teams[1]}</p>
        </div>
        {sitesArray}
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