import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ formInfo }) => (
  <button onClick={() => { console.log(formInfo)}}>Log your data</button>
);

Button.propTypes = {
  formInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
  }).isRequired,
}

export default Button;
