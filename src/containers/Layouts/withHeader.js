/* eslint-disable react/prop-types */
import React from 'react';

const WithHeaderLayout = ({ component: Component }) => {
  return (
    <div>
      <h1>Header</h1>
      <Component />
    </div>
  );
};

export default WithHeaderLayout;
