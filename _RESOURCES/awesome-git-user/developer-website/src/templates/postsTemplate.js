import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";
import "../pages/styles/posts.css";

export default function PostsTemplate(props) {
  const posts = props.data.allMarkdownRemark.edges;

  const { currentPage, numPages } = props.pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage =
    currentPage - 1 === 1 ? "/posts" : `/posts/${currentPage - 1}`;
  const nextPage = `/posts/${currentPage + 1}`;

  return (
    <Layout>
      <Seo title="All Posts" />
      <div className="posts">
        <h1 className="posts-title">all posts</h1>
        {posts.length &&
          posts.map((post, i) => {
            return (
              <article key={i} className="article">
                <Link to={post.node.fields.slug}>
                  <h2 className="article-title">
                    {post.node.frontmatter.title}
                  </h2>
                </Link>

                <small>{post.node.frontmatter.date}</small>
                <hr />
                <p className="article-body">{post.node.excerpt}</p>
                <div className="article-tags">
                  {post.node.frontmatter.tags.map((tag, j) => {
                    return (
                      <Link key={j} to={`/tags/${tag.toLowerCase()}/`}>
                        <small>{tag}</small>
                      </Link>
                    );
                  })}
                </div>
              </article>
            );
          })}
        <div className="pagi-navi">
          {!isFirst && (
            <Link to={prevPage} rel="prev">
              <span className="prev-page">← Previous Page</span>
            </Link>
          )}
          {!isLast && (
            <Link to={nextPage} rel="next">
              <span className="next-page">Next Page →</span>
            </Link>
          )}
        </div>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query postsTemplateQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      limit: $limit
      skip: $skip
      filter: { fileAbsolutePath: { regex: "/posts/" } }
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
