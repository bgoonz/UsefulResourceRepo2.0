//Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
//Internals
import ColorButtons from './ColorButtons';
import UserGuide from './UserGuide';
import './styles.css';

const UserMenu = ({changeColor, className}) => (
  <div className="um-wrapper">
    <ColorButtons changeColor={changeColor} className={className} />
    <UserGuide />
  </div>
)

UserMenu.propTypes = {
  changeColor: PropTypes.func.isRequired,
}

export default UserMenu;
