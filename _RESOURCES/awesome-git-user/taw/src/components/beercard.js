import React from "react";
import Img from "gatsby-image";
import "../styles/beercard.scss";

const BeerCard = ({ beer }) => {
  return (
    <div className="beercard">
      <div className="beercard-image">
        <Img
          fluid={beer.node.frontmatter.image.childImageSharp.fluid}
          alt={beer.node.frontmatter.title}
          style={{ overflow: "visible", width: "100%" }}
        />
      </div>
      <div className="beercard-heading">
        <h2 className="beercard-heading-title">
          {beer.node.frontmatter.title}
        </h2>
        <h3 className="beercard-heading-jtitle">
          {beer.node.frontmatter.jtitle}
        </h3>
      </div>
      <hr />
      <div
        className="beercard-description"
        dangerouslySetInnerHTML={{ __html: beer.node.html }}
      />
      <hr />
    </div>
  );
};

export default BeerCard;
