import React from 'react';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { Link } from 'react-router-dom';
import { capperLogin, clearSessionErrors } from '../../actions/session_actions';
import './login.css';

const mapStateToProps = (state, ownProps) => ({
  errors: state.errors.session
});

const mapDispatchToProps = dispatch => ({
  login: (capper) => dispatch(capperLogin(capper)),
  clearLoginErrors: () => dispatch(clearSessionErrors())
})

class CapperLogin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.responseSuccessGoogle = this.responseSuccessGoogle.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const capper = Object.assign({}, this.state);
    this.props.login(capper);
  }

  responseSuccessGoogle(response) {
    let capper = {
      email: response.profileObj.email,
      password: `g$${response.profileObj.googleId}`,
    }
    this.props.login(capper)
  }

  responseFacebook(response) {
    const capper = {
      email: response.email,
      password: `fb-${response.id}`
    }
    this.props.login(capper);
  }

  update(field) {
    return e => {
      this.setState({ [field]: e.currentTarget.value })
    }
  }

  render() {
    let errorsArr = [];
    Object.values(this.props.errors).forEach((err, i) => {
      errorsArr.push(
        <p className="login-error" key={`error-${i}`}>{err}</p>
      )
    })

    const responseErrorGoogle = (response) => {
      console.log('google login error');
    }

    return (
      <div className="login-component-container">
        <div className="welcome-background-img-capper">
        </div>
        <div className="login-container">
          <div>
            <h1>Broadcast your picks</h1>
            <form 
              className="login-form-container"
              onSubmit={this.handleSubmit}
            >
              <input
                type="text"
                placeholder="email address"
                className="login-input-field"
                value={this.state.email}
                onChange={this.update('email')}
              />
              <input
                type="password"
                placeholder="password"
                className="login-input-field"
                value={this.state.password}
                onChange={this.update('password')}
              />
              <input
                type="submit"
                value="Get Started"
                className="login-input-field signup-submit"
              />
            </form>
            <div className="oauth-login-container">
              <GoogleLogin
                clientId="590527218773-92a9untpqntbcajbpab9eju8gql06m2c.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={this.responseSuccessGoogle}
                onFailure={responseErrorGoogle}
                cookiePolicy={'single_host_origin'}
                render={renderProps => (
                  <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className="oauth-signup google-signup"
                  >Google Credentials</button>
                )}
              />
              <FacebookLogin
                appId="1115979958774257"
                autoLoad={false}
                fields="name,email,picture"
                callback={this.responseFacebook}
                render={renderProps => (
                  <button
                    className="oauth-signup facebook-signup"
                    onClick={renderProps.onClick}
                  >Facebook Credentials</button>
                )}
              />
            </div>
            <Link 
              to="/"
              className="link-to-splash"
            >Back to Splash Page</Link>
            <div className="login-errors">
              {errorsArr}
              <p className="clear-element">y</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CapperLogin);