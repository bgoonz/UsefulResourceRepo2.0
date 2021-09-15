import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Wrapper from "../../components/wrapper"
import Spacer from "../../components/spacer"

const InstaIndividualPost = ({ data }) => {
  const { caption, timestamp, permalink, localFile } = data.instaNode
  const title = caption ? caption.split("#")[0] : ""
  const date = new Date(timestamp * 1000).toLocaleDateString(`en-GB`)

  return (
    <Wrapper>
      <main className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none sm:max-w-none lg:max-w-none xl:max-w-none">
        {title && <h1 style={{ marginBottom: "0.25em" }}>{title}</h1>}
        <p className="text-gray-600" style={{ marginTop: 0 }}>
          {date} - <a href={permalink}>Original Source</a>
        </p>
        <Spacer />
        <GatsbyImage image={localFile.childImageSharp.gatsbyImageData} alt={title} />
      </main>
    </Wrapper>
  )
}

export default InstaIndividualPost

export const query = graphql`
  query($timestamp: Int!) {
    instaNode(timestamp: { eq: $timestamp }) {
      permalink
      timestamp
      caption
      localFile {
        childImageSharp {
          gatsbyImageData(maxWidth: 848, placeholder: DOMINANT_COLOR, quality: 90, layout: FLUID)
        }
      }
    }
  }
`
