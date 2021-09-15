import React from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import siteMetadata from '../site.json'

const SEOContainer = ({ title, description, image, article }) => {
  const { pathname } = useLocation()

  const {
    defaultTitle,
    defaultDescription,
    siteUrl,
    defaultImage,
    twitterUsername
  } = siteMetadata

  const seo = {
    title: title ? `${title} • ${defaultTitle}` : defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname}`
  }

  return (
    <Helmet
      title={
        process.env.NODE_ENV === 'development'
          ? `(Dev) ${seo.title}`
          : seo.title
      }
    >
      <meta name='description' content={seo.description} />
      <meta name='image' content={seo.image} />

      {seo.url && <meta property='og:url' content={seo.url} />}

      {(article ? true : null) && <meta property='og:type' content='article' />}

      {seo.title && <meta property='og:title' content={seo.title} />}

      {seo.description && (
        <meta property='og:description' content={seo.description} />
      )}

      {seo.image && <meta property='og:image' content={seo.image} />}

      <meta name='twitter:card' content='summary_large_image' />

      {twitterUsername && (
        <meta name='twitter:creator' content={twitterUsername} />
      )}

      {seo.title && <meta name='twitter:title' content={seo.title} />}

      {seo.description && (
        <meta name='twitter:description' content={seo.description} />
      )}

      {seo.image && <meta name='twitter:image' content={seo.image} />}
    </Helmet>
  )
}

SEOContainer.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  article: PropTypes.bool
}

SEOContainer.defaultProps = {
  title: null,
  description: null,
  image: null,
  article: false
}

export default SEOContainer
