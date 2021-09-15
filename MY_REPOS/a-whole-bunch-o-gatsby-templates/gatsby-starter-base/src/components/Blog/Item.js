import { Link } from 'gatsby';
import FaCalendar from 'react-icons/lib/fa/calendar';
import FaTag from 'react-icons/lib/fa/tag';
import FaUser from 'react-icons/lib/fa/user';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import React from 'react';

const Item = props => {
  const {
    post: {
      excerpt,
      fields: { slug, prefix },
      frontmatter: { title, category },
    },
  } = props;

  return (
    <li>
      <Link to={slug} key={slug} className="link">
        <h1>{title}</h1>
        <p className="meta">
          <span>
            <FaCalendar size={18} /> {prefix}
          </span>
          <span>
            <FaUser size={18} /> greg lobinski
          </span>
          {category && (
            <span>
              <FaTag size={18} /> {category}
            </span>
          )}
        </p>
      </Link>
    </li>
  );
};

Item.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Item;
