import React from 'react'
import { parseOptions, removeDuplicates } from './utils'

export const onRenderBody = ({ setHeadComponents }, pluginOptions) => {
  const { domains: domainList } = pluginOptions

  if (!pluginOptions || !domainList) {
    throw new Error('gatsby-plugin-preconnect: Missing `options.domains`')
  }

  if (!Array.isArray(domainList)) {
    throw new Error('gatsby-plugin-preconnect: `options.domains` is not an array')
  }

  const parsedDomains = removeDuplicates(parseOptions(domainList))

  setHeadComponents(
    parsedDomains.map(({ domain, crossOrigin }) =>
      React.createElement('link', {
        crossOrigin: crossOrigin,
        href: domain,
        key: `${domain}-${crossOrigin}`,
        rel: 'preconnect',
      })
    )
  )
}
