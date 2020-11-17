import React from 'react';
import { connect } from 'react-redux';
import { parseDomain, fromUrl } from "parse-domain";
import * as pickActions from '../../actions/pick_actions';
import './pick.css'

class SelectedPick extends React.Component {
  constructor(props) {
    super(props)
    this.chooseBet = this.chooseBet.bind(this)
  }

  chooseBet(e) {
    let selectedPick = this.props.pick.PregameOdds[e.currentTarget.id]
    if (e.currentTarget.innerHTML === 'Spread') {
      let payload = {
        capperId: this.props.capper.id,
        betType: 'Spread',
        team: 'pickedTeam',
        spread: `home: ${selectedPick.HomePointSpread}, away: ${selectedPick.AwayPointSpread}`,
        globalGameId: this.props.pick.GlobalGameId,
        gameOddId: selectedPick.GameOddId
      }
      console.log(payload)
      debugger
      this.props.createPick(payload)
    } else {
      let payload = {
        capperId: this.props.capper.id,
        betType: 'MoneyLine',
        team: 'pickedTeam',
        spread: `home: ${selectedPick.HomeMoneyLine}, away: ${selectedPick.AwayMoneyLine}`,
        globalGameId: this.props.pick.GlobalGameId,
        gameOddId: selectedPick.GameOddId
      }
      console.log(payload)
      debugger
      // this.props.createPick(payload)
    }
  }

  render() {
    if (this.props.pick.length === 0) return null;

    const sitesArray = [];
    this.props.pick.PregameOdds.forEach((book, idx) => {
      // if (!book.SportsbookUrl) return;
      const { domain } = parseDomain(fromUrl(book.SportsbookUrl));
      sitesArray.push(
        <div
          key={idx}
          className="selected-pick-site-container"
        >
          <p className="selected-pick-site-name">{domain}</p>
          <div className="selected-pick-spread-container">
            <p 
              className="selected-pick-bet-type"
              id={idx}
              onClick={this.chooseBet}>Spread</p>
            <p>{this.props.pick.HomeTeamName}: {book.HomePointSpread}</p>
            <p>{this.props.pick.AwayTeamName}: {book.AwayPointSpread}</p>
          </div>
          <div className="selected-pick-moneyline-container">
            <p 
              className="selected-pick-bet-type"
              id={idx}
              onClick={this.chooseBet}>Money Line</p>
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
  pick: state.entities.pick,
  capper: state.session.user
})

const mapDispatchToProps = dispatch => ({
  receivePick: (pick) => dispatch(pickActions.receivePick(pick)),
  clearPick: () => dispatch(pickActions.clearPick()),
  createPick: (pick) => dispatch(pickActions.createPick(pick))
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectedPick);