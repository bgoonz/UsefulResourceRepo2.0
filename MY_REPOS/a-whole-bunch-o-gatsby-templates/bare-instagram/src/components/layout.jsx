import * as React from 'react'

const Layout = ({ children, className }) => {
  return <main className={`p-6 pb-20 ${className}`}>{children}</main>
}

export default Layout
