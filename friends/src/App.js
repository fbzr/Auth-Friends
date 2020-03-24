import React from 'react';
import { Route, useHistory } from 'react-router-dom';
// mui
import { CssBaseline, Grid } from '@material-ui/core';
// components
import Login from './components/auth/Login';
import FriendsList from './components/FriendsList';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';

function App() {
  const history = useHistory();

  const handleLogin = token => {
    localStorage.setItem('token', token);
    history.push('/friends');
  }

  return (
    <>
      <CssBaseline />
      <Grid container direction='column' alignItems='center'>
        <Header />
        <Route exact path='/login'>
          <Login handleLogin={handleLogin} />
        </Route>
        <PrivateRoute exact path='/friends' component={FriendsList} />
      </Grid>
    </>
  );
}

export default App;
