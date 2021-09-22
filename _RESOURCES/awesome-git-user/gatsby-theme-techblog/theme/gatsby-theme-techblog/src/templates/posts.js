import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Layout from "../components/layout";
import PostList from "../components/post-list";

const PostsTemplate = () => {
  const data = useStaticQuery(graphql`
    query {
      allMdx(sort: { fields: frontmatter___date, order: DESC }) {
        nodes {
          id
          frontmatter {
            title
            tags
            date
            published
          }
          fields {
            slug
          }
          excerpt(pruneLength: 200)
        }
      }
    }
  `);
  const posts = data.allMdx.nodes;
  return (
    <Layout>
      <PostList posts={posts} />
    </Layout>
  );
};

export default PostsTemplate;
