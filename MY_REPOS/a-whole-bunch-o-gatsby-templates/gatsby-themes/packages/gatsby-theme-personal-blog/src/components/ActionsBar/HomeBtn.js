import React from 'react';
import PropTypes from 'prop-types';

import { FiHome } from 'react-icons/fi';

import IconButton from './IconButton';

const HomeBtn = ({ navigatorState, slideInNavigator }) => {
  return navigatorState === 'aside' ? (
    <IconButton to="/" onClick={slideInNavigator}>
      <FiHome />
    </IconButton>
  ) : null;
};

HomeBtn.propTypes = {
  navigatorState: PropTypes.string.isRequired,
  slideInNavigator: PropTypes.func.isRequired,
};

export default HomeBtn;
