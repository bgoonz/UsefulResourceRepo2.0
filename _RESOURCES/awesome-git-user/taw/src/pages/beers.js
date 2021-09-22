import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Footer from "../components/footer";
import BeerCard from "../components/beercard";
import "../styles/beers.scss";

const Beers = ({ data }) => {
  let beers = [];
  data.allMarkdownRemark.edges.forEach((edge, i) => {
    if (edge.node.frontmatter.pagetype === "beer") {
      beers.push(edge);
    }
  });

  return (
    <Layout>
      <div className="beers">
        <div className="beers-main">
          <h1 className="beers-main-title">OUR BEERS</h1>
          <div className="beers-main-body">
            {beers.map((beer, i) => {
              return <BeerCard key={i} beer={beer} />;
            })}
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

export default Beers;

export const pageQuery = graphql`
  query beerQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          html
          excerpt(pruneLength: 400)
          frontmatter {
            title
            jtitle
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
