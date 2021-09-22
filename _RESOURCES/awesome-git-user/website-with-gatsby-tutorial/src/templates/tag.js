import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import Img from "gatsby-image";
import "../styles/tag.scss";

const Tag = ({ pageContext, data }) => {
  const { tag } = pageContext;
  const { edges, totalCount } = data.allMarkdownRemark;
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`;

  return (
    <Layout>
      <div className="tag">
        <h1 className="tag-title">{tagHeader}</h1>
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
      </div>
    </Layout>
  );
};

export default Tag;

export const pageQuery = graphql`
  query tagQuery($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
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
