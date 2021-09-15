import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import 'prismjs/themes/prism-okaidia.css';

import Layout from '../components/Layout';
import Page from '../components/Page';
import Seo from '../components/Seo';

const PageTemplate = props => {
  console.log(props);
  const {
    data: {
      page,
      page: {
        frontmatter: { title },
        fields: { slug },
      },
    },
  } = props;

  return (
    <Layout>
      <Page page={page} />
      <Seo title={title} path={slug} />
    </Layout>
  );
};

PageTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
};

export default PageTemplate;

export const query = graphql`
  query PageTemplateQuery($slug: String!) {
    page: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fileAbsolutePath
      fields {
        slug
        prefix
      }
      frontmatter {
        title
      }
    }
  }
`;
