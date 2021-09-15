import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Post from "../components/post";

export const query = graphql`
  query ($postID: String!) {
    mdx(id: { eq: $postID }) {
      frontmatter {
        title
        tags
        date(formatString: "MMMM DD, YYYY")
        published
      }
      fields {
        slug
      }
      id
      body
    }
  }
`;

const PostTemplate = ({ data: { mdx } }) => {
  return (
    <Layout>
      <Post {...mdx} />
    </Layout>
  );
};

export default PostTemplate;
