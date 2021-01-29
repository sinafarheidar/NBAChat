import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';

import Signup from './components/Signup'
import Signin from './components/Signin'
import JoinRoom from './components/JoinRoom'
import ChatRoom from './components/ChatRoom'
import PrivateRoute from './components/auth/PrivateRoute'

function App() {
  return (
    <div>
    <Router>
      <Nav></Nav>
      <div className="container">
        <br></br>
        <Switch>
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/signin' component={Signin} />
          <PrivateRoute exact path='/' component={JoinRoom} />
          <PrivateRoute path='/room/:chatroom' component={ChatRoom} />
        </Switch>
      </div>
    </Router>
    </div>
  );
}

export default App;
