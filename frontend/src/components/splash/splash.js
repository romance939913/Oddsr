import React from 'react';
import { Link } from 'react-router-dom';
import './splash.css'

class MainPage extends React.Component {

  render() {
    return (
      <div>
        <div className="splash-nav-bar">
          <h1 className="splash-title">Oddsr</h1>
          <div className="splash-session-links">
            <Link
              className="splash-navigation-session login-link"
              to="/login">Login</Link>
            <Link
              className="splash-navigation-session signup-link"
              to="/signup">Sign Up</Link>
          </div>
        </div>
        <div className="jumbotron-background-container">
          <div className="jumbotron-container">
            <h2 className="jumbotron-header">A Free Market Economy for Beating Vegas</h2>
          </div>
          <div className="splash-jumbotron-background">
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;