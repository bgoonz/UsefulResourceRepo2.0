import * as React from 'react'
import useFetch from 'use-http'
import { Link } from 'gatsby'

const Pokemon = (props) => {
  const id = props.params.id
  const options = {}

  const { loading, error, data = [] } = useFetch(`https://pokeapi.co/api/v2/pokemon/${id}`, options, [])

  if (error) {
    return (
      <main>
        <h1>Error!</h1>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </main>
    )
  }

  if (loading) {
    return <main>Loading...</main>
  }

  if (data) {
    const { name, species, stats, order, weight, height } = data

    return (
      <React.Fragment>
        <header>
          <Link to="/">Back to home</Link>
          <h1>{name}</h1>
        </header>
        <main>
          <div>Species: {species.name}</div>
          <div>Order: {order}</div>
          <div>Weight: {weight}</div>
          <div>Height: {height}</div>
          <div>Stats:</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
            {stats.map((s) => (
              <div key={s.stat.name}>
                <div>
                  {s.stat.name} ({s.base_stat}/{s.effort})
                </div>
              </div>
            ))}
          </div>
        </main>
      </React.Fragment>
    )
  }

  return <main>Nothing :surprisedpikachuface:</main>
}

export default Pokemon
