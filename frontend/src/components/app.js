import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';

import Splash from './splash/splash';
import userLogin from './userSessions/login';
import userSignup from './userSessions/signup';
import CapperLogin from './capperSessions/login';
import CapperSignup from './capperSessions/signup';
import Leaderboard from './leaderboard/leaderboard';

const App = () => (
  <div>
    <Switch>
      <AuthRoute exact path="/" component={Splash}/>
      <AuthRoute exact path="/user/login" component={userLogin} />
      <AuthRoute exact path="/user/signup" component={userSignup} />
      <AuthRoute exact path="/capper/login" component={CapperLogin} />
      <AuthRoute exact path="/capper/signup" component={CapperSignup} />
      <ProtectedRoute exact path="/Leaderboard" component={Leaderboard}/>
    </Switch>
  </div>
);

export default App;