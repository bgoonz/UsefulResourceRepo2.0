import * as React from 'react'
import { graphql } from 'gatsby'
import { Heading, Container } from '@chakra-ui/react'
import Link from '../components/link'
import Layout from '../components/layout'
import { SkipNavContent } from '../components/skip-nav'

const PageTwo = ({ data }) => {
  return (
    <Layout>
      <SkipNavContent>
        <Container py={12}>
          <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
          <Heading as="h1">Page 2</Heading>
          <Link to="/">To homepage</Link>
        </Container>
      </SkipNavContent>
    </Layout>
  )
}

export default PageTwo

export const query = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
  }
`
