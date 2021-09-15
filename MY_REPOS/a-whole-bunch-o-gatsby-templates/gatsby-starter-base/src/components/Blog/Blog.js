import PropTypes from 'prop-types';
import React from 'react';

import BlogItem from './BlogItem';

const Blog = props => {
  const { posts } = props;

  return (
    <div className="blog">
      <ul>
        {posts.map(post => {
          const {
            fields: { identifier },
          } = post;
          return <BlogItem key={identifier} post={post} />;
        })}
      </ul>
    </div>
  );
};

Blog.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default Blog;
