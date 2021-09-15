import * as React from 'react'
import { Link, graphql } from 'gatsby'
import { pokemons } from '../list'

const Index = ({ data }) => {
  return (
    <React.Fragment>
      <header>
        <h1>Unified Routes Experiments</h1>
      </header>
      <main>
        <h2>PokéAPI</h2>
        <h3>List of Pokémon</h3>
        <p>
          This overview will link to client-only pages that will dynamically fetch the information via the given ID.
        </p>
        <ul>
          {pokemons.map((entry) => (
            <li key={entry.name}>
              <Link to={`/pokemon/${entry.id}`}>{entry.name}</Link>
            </li>
          ))}
        </ul>
        <h2>Harry Potter</h2>
        <p>This is an overview of all the houses:</p>
        <ul>
          {data.allHouse.nodes.map((house) => (
            <li key={house.name}>
              <Link to={`/house/${house.slug}`}>{house.name}</Link>
            </li>
          ))}
        </ul>
        <p>Overview of all subjects:</p>
        <ul>
          {data.allCharacter.nodes.map((char) => (
            <li key={char.fields.subject}>
              <Link to={`/${char.fields.subject.toLowerCase()}`}>{char.fields.subject}</Link>
            </li>
          ))}
        </ul>
        <h2>Fruits</h2>
        <p>List of some cool "fruits":</p>
        <ul>
          {data.allFruits.nodes.map((fruit) => (
            <li key={fruit.slug}>
              <Link to={`/fruits/${fruit.slug}`}>{fruit.name}</Link>
            </li>
          ))}
        </ul>
      </main>
    </React.Fragment>
  )
}

export default Index

export const query = graphql`
  {
    allHouse {
      nodes {
        name
        slug
      }
    }
    allCharacter {
      nodes {
        fields {
          subject
        }
      }
    }
    allFruits {
      nodes {
        slug
        name
      }
    }
  }
`
