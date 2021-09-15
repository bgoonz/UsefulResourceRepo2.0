import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import 'prismjs/themes/prism-okaidia.css';

import config from '../../content/meta/config';
import Layout from '../components/Layout';
import Post from '../components/Post';
import Seo from '../components/Seo';

const PostTemplate = props => {
  const {
    data: {
      post,
      post: {
        fields: { slug },
        frontmatter: { title },
      },
      authorNote: { html: authorNote },
    },
    pageContext: { next, prev },
  } = props;

  const { siteUrl } = config;

  return (
    <Layout>
      <Post
        post={post}
        next={next}
        prev={prev}
        authorNote={authorNote}
        siteUrl={siteUrl}
      />
      <Seo title={title} path={slug} />
    </Layout>
  );
};

PostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
};

export default PostTemplate;

export const query = graphql`
  query PostTemplateQuery($slug: String!) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fileAbsolutePath
      fields {
        slug
        prefix
      }
      frontmatter {
        title
        category
      }
    }
    authorNote: markdownRemark(fileAbsolutePath: { regex: "/authorNote/" }) {
      html
    }
  }
`;
