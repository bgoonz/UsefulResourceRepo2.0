import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import Img from "gatsby-image";
import "../styles/tag.scss";

const AllPosts = ({ pageContext, data }) => {
  const { edges, totalCount } = data.allMarkdownRemark;

  const { currentPage, numPages } = pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage =
    currentPage - 1 === 1 ? "/archive" : `/archive/${currentPage - 1}`;
  const nextPage = `/archive/${currentPage + 1}`;

  return (
    <Layout>
      <div className="tag">
        <h1 className="tag-title">All Posts</h1>
        {edges.map(({ node }) => {
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
        {!isFirst && (
          <div style={{ float: "left" }}>
            <Link to={prevPage}>&#8592; Previous Page</Link>
          </div>
        )}
        {!isLast && (
          <div style={{ float: "right" }}>
            <Link to={nextPage}>Next Page &#8594;</Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AllPosts;

export const pageQuery = graphql`
  query allpostsQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      limit: $limit
      skip: $skip
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
