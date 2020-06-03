import React from 'react';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { Link } from 'react-router-dom';
import { login, clearSessionErrors } from '../../actions/session_actions';

const mapStateToProps = (state, ownProps) => ({
  errors: state.errors.session
});

const mapDispatchToProps = dispatch => ({
  login: (user) => dispatch(login(user)),
  clearLoginErrors: () => dispatch(clearSessionErrors())
}) 

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.login(user);
    setTimeout(() => { this.props.clearLoginErrors() }, 3000);
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
        <li key={`error-${i}`}>{err}</li>
      )
    })

    const responseFacebook = (response) => {
      console.log(response);
    }
    
    const responseSuccessGoogle = (response) => {
      let user = {
        email: response.Tt.Du,
        password: `google-${response.googleId}`,
      }
      this.props.login(user)
    }

    const responseErrorGoogle = (response) => {
      console.log('poopy');
      console.log(response);
    }

    return (
      <div>
        <div>
          <h1>Welcome Back!</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="email address"
              className="signup-input-field"
              value={this.state.email}
              onChange={this.update('email')}
            />
            <input
              type="password"
              placeholder="password"
              className="signup-input-field"
              value={this.state.password}
              onChange={this.update('password')}
            />
            <input
              type="submit"
              value="Get Started"
              className="signup-input-field signup-submit"
            />
          </form>
          <GoogleLogin
            clientId="590527218773-92a9untpqntbcajbpab9eju8gql06m2c.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={responseSuccessGoogle}
            onFailure={responseErrorGoogle}
            cookiePolicy={'single_host_origin'}
          />
          <FacebookLogin
            appId="1088597931155576"
            autoLoad={true}
            fields="name,email,picture"
            onClick={componentClicked}
            callback={responseFacebook} />
          <ul>{errorsArr}</ul>
          <Link to="/">Back to Splash Page</Link>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);