import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const Auth = ({ component: Component, path, loggedIn, type, exact }) => {
  let redirectRoute = type === 'capper' ? '/schedule' : '/leaderboard'
  return (
    <Route path={path} exact={exact} render={(props) => (
      !loggedIn ? (
        <Component {...props} />
      ) : (
          <Redirect to={redirectRoute} />
        )
    )} />
  )
};

const Protected = ({ component: Component, loggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      loggedIn ? (
        <Component {...props} />
      ) : (
          <Redirect to="/" />
        )
    }
  />
);

const Capper = ({ component: Component, loggedIn, type, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      loggedIn && type === 'capper' ? (
        <Component {...props} />
      ) : (
          <Redirect to="/" />
        )
    }
  />
);


const mapStateToProps = (state, ownProps) => {
  let typeVar
  if (!!state.session.user) {
    typeVar = state.session.user.type
  }
  return (
    { 
      loggedIn: state.session.isAuthenticated,
      type: typeVar
    }
  )
};

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
export const CapperRoute = withRouter(connect(mapStateToProps)(Capper));