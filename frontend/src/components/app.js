import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';

import Splash from './splash/splash';
import Login from './sessions/login';
import Leaderboard from './feed/leaderboard';
import Signup from './sessions/signup';

const App = () => (
  <div>
    <Switch>
      <AuthRoute exact path="/" component={Splash}/>
      <AuthRoute exact path="/login" component={Login} />
      <AuthRoute exact path="/signup" component={Signup} />
      <ProtectedRoute exact path="/leaderboard" component={Leaderboard}/>
    </Switch>
  </div>
);

export default App;