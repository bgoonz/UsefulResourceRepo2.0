import React from 'react'
import { Bar } from 'react-chartjs-2'
import graphql2chartjs from 'graphql2chartjs'
import { graphql } from 'gatsby'

const convertConnectionQuery = (arr, type) =>
  arr.map(a => ({
    label: a.label,
    data: a[type].totalCount,
  }))

const Index = ({ data: { swapi } }) => {
  const {
    allPeople: { people },
    allPlanets: { planets },
  } = swapi

  const pplConv = convertConnectionQuery(people, 'filmConnection')
  const planetsConv = convertConnectionQuery(planets, 'filmConnection')
  const pplFilms = {
    number_of_movies: [...pplConv],
  }
  const planetsFilms = {
    number_of_movies: [...planetsConv],
  }

  const g2c_01 = new graphql2chartjs(pplFilms, 'bar')
  const g2c_02 = new graphql2chartjs(planetsFilms, 'bar')

  return (
    <div>
      <h1>Gatsby graphql2chartjs example with SWAPI</h1>
      <h2>Number of movies a character appeared in:</h2>
      <div>
        <Bar data={g2c_01.data} />
      </div>
      <h2>Number of movies a planet appeared in:</h2>
      <div>
        <Bar data={g2c_02.data} />
      </div>
    </div>
  )
}

export default Index

export const query = graphql`
  query Index {
    swapi {
      allPeople(first: 25) {
        people {
          label: name
          filmConnection {
            totalCount
          }
        }
      }
      allPlanets(first: 25) {
        planets {
          label: name
          filmConnection {
            totalCount
          }
        }
      }
    }
  }
`
