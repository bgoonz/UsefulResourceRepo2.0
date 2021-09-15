import * as React from 'react'
import { graphql, Link } from 'gatsby'

const Fruit = ({ data: { fruits } }) => (
  <React.Fragment>
    <header>
      <Link to="/">Back to home</Link>
      <h1>{fruits.name}</h1>
    </header>
    <main>
      <div>Shape: {fruits.shape}</div>
      <div>Lit Level: {fruits.litLevel}</div>
      <div>Healthy: {fruits.healthy ? 'why aye' : 'nope'}</div>
    </main>
  </React.Fragment>
)

export default Fruit

export const query = graphql`
  query($slug: String!) {
    fruits(slug: { eq: $slug }) {
      name
      shape
      litLevel
      healthy
    }
  }
`
