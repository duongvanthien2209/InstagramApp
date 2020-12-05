/* eslint-disable react/prop-types */
import React from 'react';

const DefaultLayout = ({ component: Component }) => {
  return (
    <div>
      <Component />
    </div>
  );
};

export default DefaultLayout;
