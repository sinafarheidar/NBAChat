import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';

import Signup from './components/Signup'
import Signin from './components/Signin'
import Private from './components/Private'
import JoinRoom from './components/JoinRoom'

import PrivateRoute from './components/auth/PrivateRoute'

function App() {
  return (
    <Router>
      <Nav></Nav>
      <div className="container">
        <br></br>
        <Switch>
          <Route exact path='/' component={JoinRoom} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/signin' component={Signin} />
          <PrivateRoute exact path='/private' component={Private} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
