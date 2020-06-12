import React from 'react';
import { Link } from 'react-router-dom';
import './splashBody.css';

class SplashBody extends React.Component {

  render() {
    return (
      <div className="capper-session-container">
        <div className="capper-session-header-container">
          <h1 className="capper-session-header">Build your Clout: Sign up as a Capper today</h1>
        </div>
        <div>
          <Link
            className="splash-capper-session capper-signup-link"
            to="/capper/signup">Get Started
            </Link>
          <Link
            className="splash-capper-session capper-login-link"
            to="/capper/login">Login
            </Link>
        </div>
      </div>
    )
  }
}

export default SplashBody;