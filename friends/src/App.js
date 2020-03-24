import React from 'react';
import { Route, useHistory } from 'react-router-dom';
// components
import Login from './components/auth/Login';
import FriendsList from './components/FriendsList';

function App() {
  const history = useHistory();

  const handleLogin = token => {
    localStorage.setItem('token', token);
    history.push('/friends');
  }

  return (
    <div>
      App
      <Route exact path='/login'>
        <Login handleLogin={handleLogin} />
      </Route>
      <Route exact path='/friends' component={FriendsList} />
    </div>
  );
}

export default App;
