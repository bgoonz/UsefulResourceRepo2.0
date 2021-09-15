import * as React from "react"
import { graphql, Link } from "gatsby"
import Wrapper from "../components/wrapper"
import Insta from "../components/insta"
import Greetings from "../components/greetings"

const IndexPage = ({ data }) => {
  const notes = data.allMarkdownRemark.nodes
  const instagram = data.allInstaNode.nodes
  return (
    <Wrapper>
      <main className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none sm:max-w-none lg:max-w-none xl:max-w-none">
        <h2>Notes</h2>
        <ul>
          {notes.map((note) => (
            <li key={note.frontmatter.title}>
              <Link to={note.gatsbyPath}>{note.frontmatter.title}</Link>
            </li>
          ))}
        </ul>
        <Greetings />
        <h2>Instagram</h2>
        <div className="grid gap-8 grid-cols-2 index-page-grid">
          {instagram.map((i) => (
            <Insta
              key={i.id}
              caption={i.caption}
              timestamp={i.timestamp}
              image={i.localFile.childImageSharp.gatsbyImageData}
            />
          ))}
        </div>
      </main>
    </Wrapper>
  )
}

export default IndexPage

export const query = graphql`
  {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
      nodes {
        frontmatter {
          title
        }
        gatsbyPath(filePath: "/notes/{MarkdownRemark.frontmatter__title}")
      }
    }
    allInstaNode(sort: { fields: timestamp, order: DESC }) {
      nodes {
        id
        caption
        timestamp
        localFile {
          childImageSharp {
            gatsbyImageData(
              quality: 90
              maxWidth: 410
              layout: CONSTRAINED
              placeholder: DOMINANT_COLOR
              transformOptions: { cropFocus: CENTER }
              maxHeight: 410
            )
          }
        }
      }
    }
  }
`
