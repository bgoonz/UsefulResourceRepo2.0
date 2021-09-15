import * as React from 'react'
import { graphql } from 'gatsby'
import {
  Heading,
  Box,
  Text,
  Button,
  useColorMode,
  Container,
} from '@chakra-ui/react'
import { StaticImage } from 'gatsby-plugin-image'
import Link from '../components/link'
import Layout from '../components/layout'
import { SkipNavContent } from '../components/skip-nav'

const IndexPage = ({ data }) => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Layout>
      <SkipNavContent>
        <Container py={12}>
          <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
          <Heading as="h1">Title of my page</Heading>
          <Button onClick={toggleColorMode}>
            Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
          </Button>
          <Link to="/page-2/">To page 2</Link>
          <Text mt="6" fontSize="21px">
            Edit me 123
          </Text>
          <Text mt="6" fontSize="21px">
            Edit me 123 123
          </Text>
          <Box height="12" />
          <StaticImage
            src="../images/362.jpg"
            alt="Instagram Photo"
            height={500}
            width={500}
          />
        </Container>
      </SkipNavContent>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
  }
`
