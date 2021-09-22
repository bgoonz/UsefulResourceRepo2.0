import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import "../styles/tapbeer.scss";

const TapBeer = ({
  image,
  name,
  jname,
  brewery,
  location,
  style,
  ibu,
  abv,
  half,
  pint,
  stem,
  description,
}) => {
  const taw = useStaticQuery(graphql`
    query tapbeerQuery {
      file(relativePath: { eq: "taw_logo_rectangle.png" }) {
        childImageSharp {
          # Specify the image processing specifications right in the query.
          fluid(maxWidth: 600, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);
  console.log(taw);

  let price = [];
  if (stem) {
    price.push(<p>Stem: ¥{pint}</p>);
  } else {
    price.push(
      <p>
        Half: ¥{half}, Pint: ¥{pint}
      </p>
    );
  }
  return (
    <>
      <div className="tapbeer">
        <div className="tapbeer-top">
          <div className="tapbeer-top-image">
            <Img
              fluid={
                image
                  ? image.childImageSharp.fluid
                  : taw.file.childImageSharp.fluid
              }
              style={{ width: "100%" }}
            />
          </div>
          <div className="tapbeer-top-name">
            <p>{name}</p>
            <p>{jname}</p>
          </div>
        </div>
        <div className="tapbeer-center">
          <div className="tapbeer-center-origin">
            <p>{brewery}</p>
            <p>{location}</p>
          </div>
          <div className="tapbeer-center-details">
            <p>Style: {style}</p>
            <p>ABV: {abv}%</p>
            <p>IBU: {ibu}</p>
            {price}
          </div>
        </div>
        <div className="tapbeer-bottom">
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>
      </div>
    </>
  );
};

export default TapBeer;
