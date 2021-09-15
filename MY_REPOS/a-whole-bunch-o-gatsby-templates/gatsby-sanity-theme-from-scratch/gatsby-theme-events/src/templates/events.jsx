import React from 'react'
import { graphql } from 'gatsby'
import List from '../components/list'
import Layout from '../components/layout'

const Events = ({ data }) => (
  <Layout>
    <List events={data.allSanityEvent.nodes} />
  </Layout>
)

export default Events

export const query = graphql`
  query {
    allSanityEvent {
      nodes {
        location
        name
        externalLink
        description
        date
      }
    }
  }
`
