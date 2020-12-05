/* eslint-disable import/no-unresolved */
import Login from 'containers/Login';
import Main from 'containers/Main';
import Register from 'containers/Register';
import React from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/main" />
        <PrivateRoute path="/main" component={Main} />
        <PublicRoute exact path="/login" component={Login} />
        <PublicRoute exact path="/register" component={Register} />
      </Switch>
    </Router>
  );
};

export default Routes;
