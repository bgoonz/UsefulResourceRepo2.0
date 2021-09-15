import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import MenuItem from './MenuItem';

const Menu = props => {
  const { items } = props;

  return (
    <nav className="menu">
      <ul>
        {items.map(item => {
          const { label, to, icon } = item;
          return <MenuItem key={label} label={label} to={to} icon={icon} />;
        })}
      </ul>
    </nav>
  );
};

Menu.propTypes = {
  items: PropTypes.array.isRequired,
};

export default Menu;
