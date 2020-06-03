import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';

import Splash from './splash/splash';
import Login from './sessions/login';
import Leaderboard from './feed/leaderboard';

const App = () => (
  <div>
    <Route exact path="/" component={Splash}/>
    <Switch>
      <AuthRoute exact path="/login" component={Login} />
      <ProtectedRoute exact path="/leaderboard" component={Leaderboard}/>

    </Switch>
  </div>
);

export default App;