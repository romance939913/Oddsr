import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';

import Splash from './splash/splash';
import Login from './userSessions/login';
import Leaderboard from './leaderboard/leaderboard';
import Signup from './userSessions/signup';
import CapperLogin from './capperSessions/login';
import CapperSignup from './capperSessions/signup';

const App = () => (
  <div>
    <Switch>
      <AuthRoute exact path="/" component={Splash}/>
      <AuthRoute exact path="/login" component={Login} />
      <AuthRoute exact path="/signup" component={Signup} />
      <AuthRoute exact path="/capper/login" component={CapperLogin} />
      <AuthRoute exact path="/capper/signup" component={CapperSignup} />
      <ProtectedRoute exact path="/Leaderboard" component={Leaderboard}/>
    </Switch>
  </div>
);

export default App;