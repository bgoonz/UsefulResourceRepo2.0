import React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";
import Img from "gatsby-image";
import "../styles/post.scss";

const Post = ({ data }) => {
  console.log(data);
  const post = data.markdownRemark;
  return (
    <Layout>
      <div className="post">
        <div className="post-main">
          <h1 className="post-main-title">{post.frontmatter.title}</h1>
          <small className="post-main-date">{post.frontmatter.date}</small>
          <div className="post-main-tags">
            {post.frontmatter.tags.map((tag, i) => {
              return (
                <Link to={`/tags/${tag}`}>
                  <small>{tag}</small>
                </Link>
              );
            })}
          </div>
          <hr />
          <Img fluid={post.frontmatter.image.childImageSharp.fluid} />
          <div
            className="post-main-body"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Post;

export const query = graphql`
  query ($slug: String!) {
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
