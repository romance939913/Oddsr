import React from 'react';
import { Link } from 'react-router-dom';

// const mapStateToProps = (state, ownProps) => ({
//   history: ownProps.history,
//   loggedIn: state.session.isAuthenticated,
//   username: state.session.user.username
// });

// const mapDispatchToProps = dispatch => ({
//   logout: () => dispatch(logout())
// })

class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      buying_power: ''
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
            type="submit"
            value="Get Started"
            className="signup-input-field signup-submit"
          />
        </form>
      </div>
    );
  }
}

export default Signup;