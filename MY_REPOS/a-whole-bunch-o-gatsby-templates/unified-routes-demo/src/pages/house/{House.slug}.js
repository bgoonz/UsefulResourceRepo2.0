import * as React from 'react'
import { graphql, Link } from 'gatsby'

const House = ({ data: { house } }) => (
  <React.Fragment>
    <header>
      <Link to="/">Back to home</Link>
      <h1>{house.name}</h1>
    </header>
    <main>
      <div>Mascot: {house.mascot}</div>
      <div>Head of House:</div>
      <ul>
        <li>Name: {house.headOfHouse.name}</li>
        <li>Role: {house.headOfHouse.role}</li>
        <li>Role: {house.headOfHouse.species}</li>
      </ul>
    </main>
  </React.Fragment>
)

export default House

export const query = graphql`
  query($id: String!) {
    house(id: { eq: $id }) {
      name
      mascot
      headOfHouse {
        name
        role
        species
      }
    }
  }
`
