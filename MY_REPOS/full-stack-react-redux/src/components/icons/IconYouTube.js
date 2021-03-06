itimport React from 'react';
import PropTypes from 'prop-types';

import Icon from './Icon';

const IconYouTube = ({colorMode, theme}) => (
  <Icon social accent="#CD201F">
    <path d="M20.708 42.072c-9.523-.175-12.775-.333-14.774-.745-1.352-.273-2.528-.88-3.39-1.762-.666-.667-1.195-1.685-1.606-3.096-.353-1.177-.49-2.155-.686-4.546-.3-5.395-.37-9.806 0-14.735.306-2.721.455-5.952 2.488-7.837a6.67 6.67 0 013.331-1.685C8.031 7.294 16.378 7 25.02 7c8.621 0 16.986.294 18.948.666 1.566.294 3.036 1.175 3.898 2.312 1.856 2.918 1.888 6.547 2.077 9.386.078 1.352.078 9.032 0 10.385-.294 4.486-.53 6.073-1.195 7.719-.412 1.039-.764 1.587-1.372 2.194a6.573 6.573 0 01-3.488 1.783c-8.24.62-15.238.755-23.18.627zm12.619-18.026c-4.585-2.45-8.974-4.721-13.462-7.073v14.069c4.722-2.567 9.7-4.919 13.481-7.015l-.02.02z" />
  </Icon>
);

IconYouTube.propTypes = {
  colorMode: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
};

export default IconYouTube;
