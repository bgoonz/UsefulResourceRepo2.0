import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

const MenuItem = props => {
  const { label, to, icon: Icon } = props;

  return (
    <li className="menuItem">
      <Link to={to}>
        {Icon && <Icon />}
        {label}
      </Link>
    </li>
  );
};

MenuItem.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default MenuItem;
