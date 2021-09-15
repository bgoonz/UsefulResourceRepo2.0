//Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CirclePicker } from 'react-color';
//Internals
import './styles.css';

const ColorButtons = ({changeColor}) =>  (
  <div className="color-buttons-wrapper">
    <h1>Controls</h1>
    <h3>Choose your color:</h3>
    <CirclePicker onChange={changeColor}  />
  </div>
);

ColorButtons.propTypes = {
  changeColor: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
}

export default ColorButtons;
