import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../actions/session_actions';

const mapStateToProps = (state, ownProps) => ({
  errors: state.errors.session
});

const mapDispatchToProps = dispatch => ({
  login: (user) => dispatch(login(user))
}) 

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.login(user)
  }

  update(field) {
    return e => {
      this.setState({ [field]: e.currentTarget.value })
    }
  }

  renderErrors() {
    return (
      <ul>
        {Object.keys(this.props.errors).map((error, i) => (
          <li key={`error-${i}`}>
            {this.props.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  render() {
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
            {this.renderErrors()}
          </form>
          <Link to="/">Back to Splash Page</Link>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);