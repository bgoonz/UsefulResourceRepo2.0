import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

const ListItem = props => {
  const { title, to } = props;

  return (
    <li className="listItem">
      <Link to={to}>{title}</Link>
    </li>
  );
};

ListItem.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default ListItem;
