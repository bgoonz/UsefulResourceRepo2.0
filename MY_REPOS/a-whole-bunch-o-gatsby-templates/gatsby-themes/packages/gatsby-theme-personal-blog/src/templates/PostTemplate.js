import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Article from '../components/shared/Article';

export const postQuery = graphql`
  query PostBySlug($slug: String!) {
    post: mdx(fields: { slug: { eq: $slug } }) {
      id
      code {
        body
      }
      fields {
        slug
        date
      }
      frontmatter {
        title
        subTitle
      }
    }
  }
`;

const PostTemplate = ({ data }) => {
  const {
    post: {
      code: { body },
      frontmatter: { title, subTitle },
    },
  } = data;

  const post = {
    title,
    subTitle,
    body,
  };

  return <Article post={post} />;
};

PostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
};

export default PostTemplate;
