/* eslint-disable import/no-unresolved */
import Dashboard from 'containers/Dashboard';
import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

const Main = () => {
  const match = useRouteMatch();
  // console.log(match.url);

  return (
    <Switch>
      <Redirect exact from={match.url} to={`${match.url}/dashboard`} />

      <Route exact path={`${match.url}/dashboard`} component={Dashboard} />
      <Route path={`${match.url}/user/:userId`} />
      <Route path={`${match.url}/article/:articleId`} />
    </Switch>
  );
};

export default Main;
