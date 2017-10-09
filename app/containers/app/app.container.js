import PropTypes from 'prop-types';
import React from 'react';
import { renderRoutes } from 'react-router-config';

import './app.container.scss';

export default function App(props) {
  const { route } = props;

  return (
    <div>
      {renderRoutes(route.routes)}
    </div>
  );
}

App.propTypes = {
  route: PropTypes.shape({
    routes: PropTypes.array.isRequired,
  }).isRequired,
};
