import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";
import "../pages/styles/posts.css";

export default function TagTemplate({ pageContext, data }) {
  const posts = data.posts.edges;
  const { tag } = pageContext;
  const { totalCount } = data.posts;
  const tagHeader = `${tag}: ${totalCount} post${
    totalCount === 1 ? "" : "s"
  }`.replace("-", " ");

  return (
    <Layout>
      <Seo title={tag} />
      <div className="posts">
        <h1 className="tags-title">{tagHeader}</h1>
        {posts.length &&
          posts.map((post, i) => {
            return (
              <article className="article">
                <Link to={post.node.fields.slug}>
                  <h2 className="article-title">
                    {post.node.frontmatter.title}
                  </h2>
                </Link>

                <small>{post.node.frontmatter.date}</small>
                <hr />
                <p className="article-body">{post.node.excerpt}</p>
                <div className="article-tags">
                  {post.node.frontmatter.tags.map((tag, i) => {
                    return (
                      <Link to={`/tags/${tag.toLowerCase()}/`}>
                        <small>{tag}</small>
                      </Link>
                    );
                  })}
                </div>
              </article>
            );
          })}
      </div>
    </Layout>
  );
}

export const query = graphql`
  query tagTemplateQuery($tag: String) {
    posts: allMarkdownRemark(
      limit: 200
      filter: {
        frontmatter: { tags: { in: [$tag] } }
        fileAbsolutePath: { regex: "/post/" }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          html
          excerpt(pruneLength: 300)
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            tags
            pagetype
            image {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
      group(field: frontmatter___tags) {
        fieldValue
      }
    }
  }
`;
