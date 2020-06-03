import React from 'react';
import { connect } from 'react-redux';
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
          <ul>{errorsArr}</ul>
          <Link to="/">Back to Splash Page</Link>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);