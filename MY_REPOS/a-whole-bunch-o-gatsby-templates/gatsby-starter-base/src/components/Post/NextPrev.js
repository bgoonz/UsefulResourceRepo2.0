import { Link } from 'gatsby';
import FaArrowLeft from 'react-icons/lib/fa/arrow-left';
import FaArrowRight from 'react-icons/lib/fa/arrow-right';
import PropTypes from 'prop-types';
import React from 'react';

const NextPrev = props => {
  const {
    next: {
      fields: { prefix: nextPrefix, slug: nextSlug } = {},
      frontmatter: { title: nextTitle } = {},
    } = {},
    prev: {
      fields: { prefix: prevPrefix, slug: prevSlug } = {},
      frontmatter: { title: prevTitle } = {},
    } = {},
  } = props;

  return (
    <div className="nextPrev">
      {nextSlug && (
        <Link to={nextSlug}>
          <p>
            <FaArrowRight />
            {nextTitle} <time>{nextPrefix} </time>
          </p>
        </Link>
      )}
      {prevSlug && (
        <Link to={prevSlug}>
          <p>
            <FaArrowLeft />
            {prevTitle} <time>{prevPrefix}</time>
          </p>
        </Link>
      )}
    </div>
  );
};

NextPrev.propTypes = {
  next: PropTypes.object,
  prev: PropTypes.object,
};

export default NextPrev;
