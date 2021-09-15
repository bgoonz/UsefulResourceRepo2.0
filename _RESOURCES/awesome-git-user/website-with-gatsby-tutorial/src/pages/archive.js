import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import Img from "gatsby-image";
import "../styles/tag.scss";

const Archive = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;
  const total = data.allMarkdownRemark.totalCount;

  const currentPage = 1;
  const postsPerPage = 3;
  const nextPage = `${currentPage + 1}`;
  const hasNextPage = total > postsPerPage;

  return (
    <Layout>
      <div className="tag">
        <h1 className="tag-title">{total} Posts</h1>
        {posts.map(({ node }) => {
          const { slug } = node.fields;
          const { title } = node.frontmatter;
          return (
            <div className="tag-post" key={slug}>
              <Link to={slug}>
                <h1 className="tag-post-title">{title}</h1>
              </Link>
              <small className="tag-post-date">{node.frontmatter.date}</small>
              <hr />
              <div className="tag-post-image">
                <Img fluid={node.frontmatter.image.childImageSharp.fluid} />
              </div>
              <p className="tag-post-body">{node.excerpt}</p>
            </div>
          );
        })}
        {hasNextPage && (
          <div style={{ float: "right" }}>
            <Link to={nextPage}>
              <span>Next Page &#8594;</span>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Archive;

export const pageQuery = graphql`
  query archiveQuery {
    allMarkdownRemark(
      limit: 3
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          excerpt(pruneLength: 700)
          frontmatter {
            author
            date(formatString: "MMMM DD, YYYY")
            published
            title
            tags
            image {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
