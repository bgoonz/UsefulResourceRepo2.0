import FaTag from 'react-icons/lib/fa/tag';
import PropTypes from 'prop-types';
import React from 'react';
import { graphql } from 'gatsby';

import Article from '../components/Article';
import Heading from '../components/Article/Heading';
import Layout from '../components/Layout';
import List from '../components/List';

const CategoryTemplate = props => {
  const {
    pageContext: { category },
    data: {
      allMarkdownRemark: { totalCount, edges },
    },
  } = props;

  const items = edges.map(edge => edge.node);

  return (
    <Layout>
      <Article>
        <Heading>
          <React.Fragment>
            <span>Posts in category</span> <FaTag />
            <h1>{category}</h1>
            <p className="meta">
              There {totalCount > 1 ? 'are' : 'is'}{' '}
              <strong>{totalCount}</strong> post{totalCount > 1 ? 's' : ''} in
              the category.
            </p>
          </React.Fragment>
        </Heading>
        <List items={items} />
      </Article>
    </Layout>
  );
};

CategoryTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
};

export default CategoryTemplate;

export const categoryQuery = graphql`
  query CategoryTemplateQuery($category: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [fields___prefix], order: DESC }
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          excerpt
          timeToRead
          frontmatter {
            title
            category
          }
        }
      }
    }
  }
`;
