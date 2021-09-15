import { Link } from 'gatsby';
import FaCalendar from 'react-icons/lib/fa/calendar';
import FaTag from 'react-icons/lib/fa/tag';
import FaUser from 'react-icons/lib/fa/user';
import PropTypes from 'prop-types';
import React from 'react';

const Meta = props => {
  const { prefix, category } = props;

  return (
    <p className="meta">
      <span>
        <FaCalendar /> {prefix}
      </span>
      <span>
        <FaUser /> greg lobinski
      </span>
      {category && (
        <span>
          <FaTag />
          <Link to={`/category/${category}`}>{category}</Link>
        </span>
      )}
    </p>
  );
};

Meta.propTypes = {
  prefix: PropTypes.string.isRequired,
  category: PropTypes.string,
};

export default Meta;
