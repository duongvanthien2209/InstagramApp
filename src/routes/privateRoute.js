/* eslint-disable import/no-unresolved */
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import WithHeaderLayout from 'containers/Layouts/withHeader';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ path, component }) => {
  const { isLogin } = useSelector((state) => state.auth);

  return isLogin ? (
    <Route
      path={path}
      render={() => <WithHeaderLayout component={component} />}
    />
  ) : (
    <Redirect from="/main" to="/login" />
  );
};

PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
};

export default PrivateRoute;
