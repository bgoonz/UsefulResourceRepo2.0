import { graphql } from 'gatsby';
import React from 'react';

import Article from '../components/Article';
import Bodytext from '../components/Article/Bodytext';
import Heading from '../components/Article/Heading';
import Layout from '../components/Layout';
import Blog from '../components/Blog';

const BlogPage = props => {
  const {
    location,
    data: {
      posts: { edges },
    },
  } = props;

  const posts = edges.map(edge => edge.node);

  return (
    <Layout location={location}>
      <Blog posts={posts} />
    </Layout>
  );
};

export default BlogPage;

export const query = graphql`
  query {
    posts: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "//posts/[0-9]+.*--/" } }
      sort: { fields: [fields___prefix], order: DESC }
    ) {
      edges {
        node {
          excerpt(pruneLength: 250)
          fields {
            slug
            prefix
            identifier
          }
          frontmatter {
            title
            category
            cover {
              children {
                ... on ImageSharp {
                  fluid(maxWidth: 800, maxHeight: 300, cropFocus: ENTROPY) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
