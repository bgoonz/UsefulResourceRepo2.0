import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import Layout from "../components/layout";
import Seo from "../components/seo";
import "./styles/project.css";

export default function projectTemplate({ data }) {
  const project = data.markdownRemark;
  const imageTags = [];
  data.tech.edges.forEach((edge, i) => {
    imageTags.push([edge.node.frontmatter.tag, edge]);
  });

  return (
    <Layout>
      <Seo title={project.frontmatter.title} />
      <div className="project-template">
        <h1 className="portfolio-title">
          project: {project.frontmatter.title}
        </h1>
        <div className="single-project">
          <h2 className="single-project-title">{project.frontmatter.title}</h2>
          <div className="single-project-tech">
            {project.frontmatter.tags &&
              project.frontmatter.tags.map((tag, i) => {
                let imgurl;
                imageTags.forEach((item, i) => {
                  if (item[0] === tag) {
                    imgurl = item[1].node.frontmatter.image.publicURL;
                  }
                });
                return (
                  <img
                    key={i}
                    width={24}
                    className="projects-list-project-tech-tagimg"
                    src={imgurl}
                    alt=""
                  />
                );
              })}
          </div>
          <Img
            className="single-project-image"
            fluid={project.frontmatter.image.childImageSharp.fluid}
            alt={project.frontmatter.title}
          />
          <div
            className="single-project-body"
            dangerouslySetInnerHTML={{ __html: project.html }}
          />
          <hr className="single-project-divider" />
        </div>
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query projectQuery($slug: String!) {
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
    tech: allMarkdownRemark(
      sort: { fields: frontmatter___id, order: ASC }
      filter: { fileAbsolutePath: { regex: "/tech/" } }
    ) {
      totalCount
      edges {
        node {
          html
          frontmatter {
            title
            tag
            image {
              publicURL
            }
            pagetype
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
