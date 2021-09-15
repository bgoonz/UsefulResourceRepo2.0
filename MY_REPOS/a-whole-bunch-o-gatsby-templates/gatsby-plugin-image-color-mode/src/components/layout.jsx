import * as React from 'react'
import { SkipNavLink } from './skip-nav'

const Layout = ({ children }) => {
  return (
    <>
     <SkipNavLink />
      <p>some navigation goes here</p>
      {children} 
    </>
  )
}

export default Layout
