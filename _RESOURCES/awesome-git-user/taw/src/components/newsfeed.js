import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import "../styles/newsfeed.scss";

const NewsFeed = ({ news }) => {
  const taw = useStaticQuery(graphql`
    query tawQuery {
      file(relativePath: { eq: "TAW_logo.png" }) {
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
  return (
    <div>
      {news.map((item, i) => {
        return (
          <div key={i} className="newsfeed">
            <div className="newsfeed-top">
              <div className="newsfeed-top-thumb">
                <Img
                  fluid={
                    item.node.frontmatter.image
                      ? item.node.frontmatter.image.childImageSharp.fluid
                      : taw.file.childImageSharp.fluid
                  }
                  alt={item.node.frontmatter.title}
                  style={{ border: "1px solid white", width: "90px" }}
                />
              </div>
              <div className="newsfeed-top-heading">
                <Link
                  className="newsfeed-top-heading-link"
                  to={item.node.fields.slug}
                >
                  <h2>{item.node.frontmatter.title}</h2>
                </Link>
                <small>{item.node.frontmatter.date}</small>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NewsFeed;
