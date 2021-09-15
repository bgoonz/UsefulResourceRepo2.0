import React from "react";
import Layout from "../components/Layout";
import { graphql } from "gatsby";
import "./blog.scss";
import Seo from "../components/Seo";

export default function Blog({ data }) {
  const {
    html,
    frontmatter: { title, subtitle, coverImage, slug },
  } = data.markdownRemark;
  const seo = {
    title,
    subtitle,
    image: coverImage,
    url: `/blogs/${slug}`,
  };
  return (
    <Layout seo={seo}>
      <Seo {...seo} />
      <div className="blog-content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div dangerouslySetInnerHTML={{ __html: html }}></div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query ($slug: String) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        slug
        title
        subtitle
        coverImage
      }
    }
  }
`;
