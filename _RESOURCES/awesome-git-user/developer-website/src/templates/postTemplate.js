import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";
import "./styles/post.css";

export default function postTemplate({ data }) {
  const post = data.markdownRemark;

  return (
    <Layout>
      <Seo title={post.frontmatter.title} />
      <div className="single-post">
        <div className="post-main">
          <h1 className="post-title">{post.frontmatter.title}</h1>
          <small>{post.frontmatter.date}</small>
          <hr />
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
          <div className="article-tags">
            {post.frontmatter.tags.map((tag, j) => {
              return (
                <Link key={j} to={`/tags/${tag.toLowerCase()}/`}>
                  <small>{tag}</small>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query postQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
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
`;
