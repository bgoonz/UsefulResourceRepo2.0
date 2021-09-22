import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import "../styles/header.scss";

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "aleworks_logo_2018.png" }) {
        childImageSharp {
          # Specify a fluid image and fragment
          # The default maxWidth is 800 pixels
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);
  return (
    <div className="header">
      <div className="header-contents">
        <Link to="/">
          <div className="header-contents-logo">
            <Img
              style={{ width: "100%", overflow: "visible" }}
              fluid={data.file.childImageSharp.fluid}
            />
          </div>
        </Link>
        <Link className="header-contents-link" to="/beers">
          Beers
        </Link>
        <Link className="header-contents-link" to="/brewery">
          Brewery
        </Link>
        <Link className="header-contents-link" to="/taprooms">
          Taprooms
        </Link>
      </div>
    </div>
  );
};

export default Header;
