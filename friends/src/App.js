import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// components
import Login from './components/Login';

function App() {
  return (
    <Router>
      App
      <Route exact path='/login'>
        <Login />
      </Route>
    </Router>
  );
}

export default App;
