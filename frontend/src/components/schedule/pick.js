import React from 'react';
import { connect } from 'react-redux';
import { parseDomain, fromUrl } from "parse-domain";
import * as pickActions from '../../actions/pick_actions';
import './pick.css'

class SelectedPick extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.pick.length === 0) return null;

    const sitesArray = [];
    this.props.pick.PregameOdds.forEach((book, idx) => {
      if (!book.SportsbookUrl) return;
      const { domain } = parseDomain(fromUrl(book.SportsbookUrl));
      sitesArray.push(
        <div
          key={idx}
          className="selected-pick-site-container"
        >
          <p className="selected-pick-site-name">{domain}</p>
          <div className="selected-pick-spread-container">
            <p className="selected-pick-bet-type">Spread</p>
            <p>{this.props.pick.HomeTeamName}: {book.HomePointSpread}</p>
            <p>{this.props.pick.AwayTeamName}: {book.AwayPointSpread}</p>
          </div>
          <div className="selected-pick-moneyline-container">
            <p className="selected-pick-bet-type">Money Line</p>
            <p>{this.props.pick.HomeTeamName}: {book.HomeMoneyLine}</p>
            <p>{this.props.pick.AwayTeamName}: {book.AwayMoneyLine}</p>
          </div>
        </div>
      )
    })

    return (
      <div className="selected-pick-container">
        <div className="selected-pick-teams-container">
          <p>{this.props.pick.HomeTeamName} vs.</p>
          <p> {this.props.pick.AwayTeamName}</p>
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
  receivePick: (pick) => dispatch(pickActions.receivePick(pick)),
  clearPick: () => dispatch(pickActions.clearPick())
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectedPick);