import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}

const IndexPage = ({ data }) => {
  return (
    <main style={pageStyles}>
      <title>Home Page</title>
      <h1>Images:</h1>
      <div>
        {data.allImageSharp.nodes.map(image => (
          <GatsbyImage image={image.gatsbyImageData} alt="" />
        ))}
      </div>
    </main>
  )
}

export default IndexPage

export const query = graphql`
{
  allImageSharp {
    nodes {
      id
      gatsbyImageData(width: 800)
    }
  }
}
`
