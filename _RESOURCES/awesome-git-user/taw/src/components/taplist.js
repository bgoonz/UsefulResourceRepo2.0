import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import TapBeer from "../components/tapbeer";
import "../styles/taplist.scss";

const Taplist = () => {
  const data = useStaticQuery(graphql`
    query taplistQuery {
      allMarkdownRemark {
        totalCount
        edges {
          node {
            html
            frontmatter {
              title
              jtitle
              image {
                childImageSharp {
                  fluid(maxWidth: 800) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              style
              abv
              ibu
              brewery
              location
              half
              pint
              stem
              pagetype
              show
            }
          }
        }
      }
    }
  `);

  let beers = [];
  data.allMarkdownRemark.edges.forEach((item) => {
    if (
      item.node.frontmatter.pagetype === "beer" &&
      item.node.frontmatter.show === true
    ) {
      beers.push(item);
    }
  });
  console.log(beers);
  return (
    <div className="taplist">
      <h1 className="taplist-title">Today's Beers</h1>
      {beers.map((beer) => {
        return (
          <TapBeer
            image={beer.node.frontmatter.image}
            name={beer.node.frontmatter.title}
            jname={beer.node.frontmatter.jtitle}
            brewery={beer.node.frontmatter.brewery}
            location={beer.node.frontmatter.location}
            style={beer.node.frontmatter.style}
            ibu={beer.node.frontmatter.ibu}
            abv={beer.node.frontmatter.abv}
            half={beer.node.frontmatter.half}
            pint={beer.node.frontmatter.pint}
            stem={beer.node.frontmatter.stem}
            description={beer.node.html}
          />
        );
      })}
    </div>
  );
};

export default Taplist;
