import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import Layout from "../components/layout";
import Seo from "../components/seo";
import "./styles/portfolio.css";

export default function Portfolio({ data }) {
  const projects = data.project.edges;
  const imageTags = [];
  data.tech.edges.forEach((edge, i) => {
    imageTags.push([edge.node.frontmatter.tag, edge]);
  });

  return (
    <Layout>
      <Seo title="Portfolio" />
      <div className="portfolio">
        <h1 className="portfolio-title">portfolio</h1>
        {projects.length &&
          projects.map((project, i) => {
            return (
              <div key={i} className="project">
                <Link to={project.node.fields.slug}>
                  <h2 className="project-title">
                    {project.node.frontmatter.title}
                  </h2>
                </Link>
                <div className="project-tech">
                  {project.node.frontmatter.tags &&
                    project.node.frontmatter.tags.map((tag, j) => {
                      let imgurl;
                      imageTags.forEach((item, i) => {
                        if (item[0] === tag) {
                          imgurl = item[1].node.frontmatter.image.publicURL;
                        }
                      });
                      return (
                        <img
                          key={j}
                          width={24}
                          className="projects-list-project-tech-tagimg"
                          src={imgurl}
                          alt=""
                        />
                      );
                    })}
                </div>
                <Img
                  className="project-image"
                  fluid={project.node.frontmatter.image.childImageSharp.fluid}
                />
                <div>{project.node.excerpt}</div>
                <Link to={project.node.fields.slug}>
                  <button className="portfolio-project-button">
                    Go to project page
                  </button>
                </Link>
                <hr className="project-divider" />
              </div>
            );
          })}
      </div>
    </Layout>
  );
}

export const query = graphql`
  query portfolioQuery {
    site {
      siteMetadata {
        title
      }
    }
    project: allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { fileAbsolutePath: { regex: "/project/" } }
    ) {
      totalCount
      edges {
        node {
          html
          excerpt(pruneLength: 70)
          frontmatter {
            title
            projectUrl
            codeUrl
            description
            tags
            image {
              childImageSharp {
                fluid(maxWidth: 800, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            pagetype
          }
          fields {
            slug
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
