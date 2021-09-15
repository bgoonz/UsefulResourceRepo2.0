import * as React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

const Seo = ({ meta }) => (
  <Helmet>
    <html lang="en" />
    <title>{meta.title}</title>
    <meta name="description" content={meta.description} />
    <meta name="og:title" content={meta.title} />
    <meta name="og:url" content={meta.url} />
    <meta name="og:description" content={meta.description} />
    <meta name="og:image" content={`${meta.url}${meta.image}`} />
    <meta property="og:type" content="website" />
    <meta property="og:image:alt" content={meta.description} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={meta.title} />
    <meta name="twitter:url" content={meta.url} />
    <meta name="twitter:description" content={meta.description} />
    <meta name="twitter:image" content={`${meta.url}${meta.image}`} />
    <meta name="twitter:image:alt" content={meta.description} />
    <meta name="twitter:creator" content={meta.author} />
    <link
      rel="icon"
      href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>📈</text></svg>"
    />
  </Helmet>
)

export default Seo

export const metaFragment = graphql`
  fragment meta on Site {
    siteMetadata {
      title
      url
      repo
      github
      twitter
      homepage
      image
      description
      author
    }
  }
`
