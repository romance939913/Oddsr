import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { parseDomain, fromUrl } from "parse-domain";
import * as pickActions from '../../actions/game_actions';
import './game.css'

class SelectedGame extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false
    }
    this.chooseBet = this.chooseBet.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  chooseBet(e) {
    let selectedPick = this.props.game.PregameOdds[e.currentTarget.id]
    let payload = {
      capperId: this.props.capper.id,
      sport: this.props.sport,
      betType: e.currentTarget.innerHTML,
      team: 'pickedTeam',
      spread: `home: ${selectedPick.HomePointSpread}, away: ${selectedPick.AwayPointSpread}`,
      globalGameId: this.props.game.GlobalGameId,
      gameOddId: selectedPick.GameOddId
    }
    this.props.createPick(payload)
  }

  openModal() {
    this.setState({
      modalIsOpen: true
    })
  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    })
  }

  render() {
    if (this.props.game.length === 0) return null;

    const sitesArray = [];
    this.props.game.PregameOdds.forEach((book, idx) => {
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
              onClick={this.openModal}>Spread</p>
            <p>{this.props.game.HomeTeamName}: {book.HomePointSpread}</p>
            <p>{this.props.game.AwayTeamName}: {book.AwayPointSpread}</p>
          </div>
          <div className="selected-pick-moneyline-container">
            <p 
              className="selected-pick-bet-type"
              id={idx}
              onClick={this.openModal}>Money Line</p>
            <p>{this.props.game.HomeTeamName}: {book.HomeMoneyLine}</p>
            <p>{this.props.game.AwayTeamName}: {book.AwayMoneyLine}</p>
          </div>
        </div>
      )
    })

    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
      }
    };

    return (
      <div className="selected-pick-container">
        <div className="selected-pick-teams-container">
          <p>{this.props.game.HomeTeamName} vs.</p>
          <p> {this.props.game.AwayTeamName}</p>
        </div>
        {sitesArray}
        <Modal
          isOpen={this.state.modalIsOpen}
          // onAfterOpen={afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 /*ref={_subtitle => (subtitle = _subtitle)}*/>Hello</h2>
          <button onClick={this.closeModal}>close</button>
          <div>I am a modal</div>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  game: state.entities.game,
  capper: state.session.user
})

const mapDispatchToProps = dispatch => ({
  createPick: (pick) => dispatch(pickActions.createPick(pick))
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectedGame);