import React from 'react';
import PropTypes from 'prop-types';

import Icon from './Icon';

const IconSearch = ({width}) => (
  <Icon width={width}>
    <path
      fill="#fff"
      d="M17.054 15.027h-1.067l-.379-.365a8.745 8.745 0 002.122-5.716A8.784 8.784 0 008.946.162 8.784 8.784 0 00.162 8.946a8.783 8.783 0 008.784 8.784 8.745 8.745 0 005.716-2.122l.365.378v1.068l6.757 6.743 2.013-2.013-6.743-6.757zm-8.108 0a6.073 6.073 0 01-6.081-6.081 6.073 6.073 0 016.08-6.081 6.073 6.073 0 016.082 6.08 6.073 6.073 0 01-6.081 6.082z"
    />
  </Icon>
);

IconSearch.propTypes = {
  width: PropTypes.string,
};

export default IconSearch;
