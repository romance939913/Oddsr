import React from 'react';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { Link } from 'react-router-dom';
import { signup, clearSessionErrors } from '../../actions/session_actions';

const mapStateToProps = (state, ownProps) => ({
  errors: state.errors.session
});

const mapDispatchToProps = dispatch => ({
  signup: (user) => dispatch(signup(user)),
  clearSignupErrors: () => dispatch(clearSessionErrors())
})

class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      password2: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.responseSuccessGoogle = this.responseSuccessGoogle.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);

  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.signup(user)
  }

  responseSuccessGoogle(response) {
    let user = {
      username: response.Tt.sW,
      email: response.Tt.Du,
      password: `google-${response.googleId}`,
      password2: `google-${response.googleId}`
    }
    this.props.signup(user);
  }

  responseFacebook(response) {
    let user = {
      username: response.name,
      email: response.email,
      password: `fb-${response.id}`,
      password2: `fb-${response.id}`
    }
    this.props.signup(user);
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

    const responseErrorGoogle = (response) => {
      console.log('google signup error');
    }

    return (
      <div>
        <h1>Set yourself up for victory today</h1>
        <p>Get insights from the top minds in sports, starting for free today</p>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="username"
            className="signup-input-form"
            value={this.state.username}
            onChange={this.update("username")}
          />
          <input
            type="text"
            placeholder="email address"
            className="signup-input-field"
            value={this.state.email}
            onChange={this.update('email')}
          />
          <input
            type="password"
            placeholder="password (min. 7 characters)"
            className="signup-input-field"
            value={this.state.password}
            onChange={this.update('password')}
          />
          <input
            type="password"
            placeholder="password confirmation"
            className="signup-input-field"
            value={this.state.password2}
            onChange={this.update('password2')}
          />
          <input
            type="submit"
            value="Get Started"
            className="signup-input-field signup-submit"
          />
        </form>
        <GoogleLogin
          clientId="590527218773-92a9untpqntbcajbpab9eju8gql06m2c.apps.googleusercontent.com"
          buttonText="Use Google Credentials"
          onSuccess={this.responseSuccessGoogle}
          onFailure={responseErrorGoogle}
          cookiePolicy={'single_host_origin'}
        />
        <FacebookLogin
          appId="1115979958774257"
          autoLoad={false}
          fields="name,email,picture"
          callback={this.responseFacebook} 
        />
        <ul>{errorsArr}</ul>
        <Link to="/login">Already a user? Login here</Link>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);