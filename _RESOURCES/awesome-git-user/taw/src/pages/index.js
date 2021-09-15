import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import Footer from "../components/footer";
import NewsFeed from "../components/newsfeed";
import Img from "gatsby-image";
import "../styles/index.scss";
import "typeface-rubik";
import "typeface-raleway";

const Index = ({ data }) => {
  let news = [];
  data.allMarkdownRemark.edges.forEach((edge, i) => {
    if (edge.node.frontmatter.pagetype === "news" && news.length < 3) {
      news.push(edge);
    }
  });

  return (
    <Layout>
      <div className="index">
        <div className="index-main">
          <div className="index-main-image">
            <Img
              style={{ width: "100%" }}
              fluid={data.file.childImageSharp.fluid}
              alt="Craft revolution not just evolution"
            />
          </div>
          <div className="index-main-card">
            <h1>THE LATEST NEWS</h1>
            <NewsFeed news={news} />
            <div className="index-main-card-links">
              <a
                href="https://www.saketry.com/tokyoaleworks.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button>BUY OUR BEER ONLINE</button>
              </a>
              <Link to="/taprooms">
                <button>DRINK AT OUR TAPROOMS</button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

export default Index;

export const pageQuery = graphql`
  query indexQuery {
    file(relativePath: { eq: "TAW_logo.png" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        fluid(maxWidth: 600, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          html
          excerpt(pruneLength: 400)
          frontmatter {
            title
            date
            tags
            image {
              childImageSharp {
                fluid(maxWidth: 800) {
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
  }
`;
