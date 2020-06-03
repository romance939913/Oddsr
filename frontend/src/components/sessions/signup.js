import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signup } from '../../actions/session_actions';

const mapStateToProps = (state, ownProps) => ({
  errors: state.errors.session
});

const mapDispatchToProps = dispatch => ({
  signup: (user) => dispatch(signup(user))
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
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.signup(user)
  }

  update(field) {
    return e => {
      this.setState({ [field]: e.currentTarget.value })
    }
  }

  render() {
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
        <Link to="/login">Already a user? Login here</Link>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);