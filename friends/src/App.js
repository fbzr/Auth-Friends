import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// components
import Login from './components/auth/Login';
import FriendsList from './components/FriendsList';

function App() {
  return (
    <Router>
      App
      <Route exact path='/login'>
        <Login />
      </Route>
      <Route exact path='/friends' component={FriendsList} />
    </Router>
  );
}

export default App;
