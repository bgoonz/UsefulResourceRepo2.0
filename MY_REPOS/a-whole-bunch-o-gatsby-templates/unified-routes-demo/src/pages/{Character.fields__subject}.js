import * as React from 'react'
import { graphql, Link } from 'gatsby'

const Subject = ({ data: { character }, pageContext: { fields__subject } }) => (
  <React.Fragment>
    <header>
      <Link to="/">Back to home</Link>
      <h1>{fields__subject}</h1>
    </header>
    <main>
      <div>Teacher: {character.name}</div>
      <div>Species: {character.species}</div>
      <div>House: {character.house}</div>
    </main>
  </React.Fragment>
)

export default Subject

export const query = graphql`
  query($fields__subject: String!) {
    character(fields: { subject: { eq: $fields__subject } }) {
      name
      species
      house
    }
  }
`
