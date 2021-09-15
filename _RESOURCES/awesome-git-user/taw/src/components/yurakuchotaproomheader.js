import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import Img from "gatsby-image";
import "../styles/taproomheader.scss";

const YurakuchoTaproomHeader = () => {
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
    <div className="taproomheader">
      <div className="taproomheader-contents">
        <Link to="/">
          <div className="taproomheader-contents-logo">
            <Img
              style={{ width: "100%", overflow: "visible" }}
              fluid={data.file.childImageSharp.fluid}
            />
          </div>
        </Link>
        <h1 className="taproomheader-contents-title">Yurakucho Taproom</h1>
        <div className="taproomheader-contents-links">
          <Link
            className="taproomheader-contents-links-link"
            to="/itabashi-taproom#taplist"
          >
            Taplist
          </Link>
          <Link
            className="taproomheader-contents-links-link"
            to="/itabashi-taproom#food"
          >
            Food
          </Link>
        </div>
      </div>
    </div>
  );
};

export default YurakuchoTaproomHeader;
