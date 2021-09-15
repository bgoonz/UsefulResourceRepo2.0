import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import PostListItem from './PostListItem';

const PostList = styled.ul`
  list-style: none;

  a {
    color: ${props => props.theme.colors.header};
    text-decoration: none;
  }
`;

const PostListComponent = ({ posts }) => {
  return (
    <PostList>
      {posts.map(post => {
        const { date } = post;

        return <PostListItem key={date} post={post} />;
      })}
    </PostList>
  );
};

PostListComponent.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default PostListComponent;
