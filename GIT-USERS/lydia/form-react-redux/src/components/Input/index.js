import React from 'react';
import PropTypes from 'prop-types';

const Input = ({label, onChangeHandler, value}) => (
  <div>
    <label>{label}</label>
    <input onChange={(event) => onChangeHandler(event.target.value)} value={value} />
  </div>
);

Input.propTypes = {
  label: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
}

export default Input;
