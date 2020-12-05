/* eslint-disable import/no-unresolved */
import DefaultLayout from 'containers/Layouts/default';
import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const PublicRoute = ({ path, component }) => {
  return (
    <Route path={path} render={() => <DefaultLayout component={component} />} />
  );
};

PublicRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
};

export default PublicRoute;
