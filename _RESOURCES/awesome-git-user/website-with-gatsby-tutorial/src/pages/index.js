import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import PostBlock from "../components/postblock";
import PostList from "../components/postlist";
import "../styles/index.scss";

const Index = ({ data }) => {
  console.log(data);
  const posts = data ? data.allMarkdownRemark.edges : "";
  const entertainmentPosts = [];
  const politicsPosts = [];
  const sportsPosts = [];

  for (let i = 0; i < posts.length; i++) {
    if (
      posts[i].node.frontmatter.tags.includes("entertainment") &&
      entertainmentPosts.length < 2
    ) {
      entertainmentPosts.push(posts[i]);
    }
    if (
      posts[i].node.frontmatter.tags.includes("politics") &&
      politicsPosts.length < 2
    ) {
      politicsPosts.push(posts[i]);
    }
    if (
      posts[i].node.frontmatter.tags.includes("sports") &&
      sportsPosts.length < 2
    ) {
      sportsPosts.push(posts[i]);
    }
  }

  return (
    <Layout>
      <div className="index">
        <div className="index-main">
          <div className="index-main-post">
            <PostBlock post={posts[0]} />
          </div>
          <div className="index-main-postlist">
            <h3>Entertainment</h3>
            <PostList posts={entertainmentPosts} />
            <hr />
            <h3>Politics</h3>
            <PostList posts={politicsPosts} />
            <hr />
            <h3>Sports</h3>
            <PostList posts={sportsPosts} />
            <hr />
            <br />
            <br />
            <Link to="/archive" style={{ fontStyle: "normal" }}>
              <h3>Browse Archive</h3>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;

export const query = graphql`
  query HomeQuery {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
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
          html
        }
      }
    }
  }
`;
