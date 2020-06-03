import React from 'react';
import { Link } from 'react-router-dom';
import './splash.css'

class MainPage extends React.Component {

  render() {
    return (
      <div>
        <div className="splash-nav-bar">
          <h1>Oddsr</h1>
          <div className="splash-session-links">
            <Link
              className="splash-navigation-loginin"
              to="/login">Login</Link>
            <Link
              className="splash-navigation-sign-up"
              to="/signup">Sign Up</Link>
          </div>
        </div>
        <div className="splash-background-container">
          <div className="splash-jumbotron-content">
            <h2>A Free Market Economy for Beating Vegas</h2>
            <p>Build you Brand: Join as a Capper today see if you can climb the leaderboard!</p>
          </div>
          <div className="splash-jumbotron-background">
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;