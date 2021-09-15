/** @jsx jsx */
import React from "react"
import { jsx, Styled } from 'theme-ui'
import { graphql } from 'gatsby'

// Compile error: Remove the } from ({ data })
const IndexPage = ({ data }) => {
  // React.useEffect(() => {
  //   setTimeout(() => {
  //     window.blabla()
  //   }, 100)

  //   setTimeout(() => {
  //     window.blabla2()
  //   }, 150)
  // })

  // Runtime error
  // const foo = null;foo.bar = 'bar'

  return (
    <main>
      <title>Home Page</title>
      <div
        sx={{
          fontWeight: 'bold',
          fontSize: 4,
          color: 'yellow',
        }}
      >
        Hello
      </div>
      <p>Test 3</p>
      <Styled.p>Test 123</Styled.p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  )
}

export default IndexPage

export const query = graphql`
  {
    site {
      buildTime
      siteMetadata {
        title
      }
    }
  }
`
