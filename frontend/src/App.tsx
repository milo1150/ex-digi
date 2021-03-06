import React from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';

const API_URL: string = window.location.href;
const App: React.FC = () => {
  console.log(API_URL);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/" component={Login} />
        <Route exact={true} path="/register" component={Register} />
        <Route exact={true} path="/profile" component={Profile} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
