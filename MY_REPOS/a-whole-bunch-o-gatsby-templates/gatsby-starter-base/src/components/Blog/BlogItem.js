import { Link } from 'gatsby';
import FaCalendar from 'react-icons/lib/fa/calendar';
import FaTag from 'react-icons/lib/fa/tag';
import FaUser from 'react-icons/lib/fa/user';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import React from 'react';

const BlogItem = props => {
  const {
    post: {
      excerpt,
      fields: { slug, prefix },
      frontmatter: {
        title,
        category,
        cover: {
          children: [{ fluid }],
        },
      },
    },
  } = props;

  console.log(fluid);

  return (
    <li className="blogItem">
      <Link to={slug} key={slug} className="link">
        <Img fluid={fluid} />
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
        <p>{excerpt}</p>
      </Link>
    </li>
  );
};

BlogItem.propTypes = {
  post: PropTypes.object.isRequired,
};

export default BlogItem;
