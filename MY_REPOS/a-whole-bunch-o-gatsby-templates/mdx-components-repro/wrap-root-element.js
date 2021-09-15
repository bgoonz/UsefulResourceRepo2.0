import React from 'react'
import { MDXProvider } from '@mdx-js/react'

const components = {
  p: props => <p {...props} style={{ color: `red` }} />
}

export const wrapRootElement = ({ element }) => <MDXProvider components={components}>{element}</MDXProvider>